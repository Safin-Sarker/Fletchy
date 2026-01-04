import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import Review from "./Review";
import {
  useFetchAddressQuery,
  useUpdateUserAddressMutation,
} from "../account/accountApi";
import type { Address } from "../../app/Models/user";
import type {
  ConfirmationToken,
  StripeAddressElementChangeEvent,
  StripePaymentElementChangeEvent,
} from "@stripe/stripe-js";
import { useBasketinfo } from "../../lib/hooks/useBasket";
import { currencyFormat } from "../../lib/util";
import { toast } from "react-toastify";
import { ca } from "zod/v4/locales";
import { useNavigate } from "react-router";
import { LoadingButton } from "@mui/lab";
import { useCreateOrderMutation } from "../orders/orderApi";

const steps = ["Address", "Payment", "Review"];

export default function CheckoutStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [createOrder] = useCreateOrderMutation();
  const { basket } = useBasketinfo();
  const { data: { name, ...restAddress } = {} as Address, isLoading } =
    useFetchAddressQuery();
  const [updateUserAddress] = useUpdateUserAddressMutation();
  const [saveAddressChecked, setSaveAddressChecked] = useState(false);
  const elements = useElements();
  const stripe = useStripe();
  const [addressCompleted, setAddressCompleted] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { total, clearBasket } = useBasketinfo();
  const navigate = useNavigate();
  const [confirmationToken, setConfirmationToken] =
    useState<ConfirmationToken | null>(null);

  const handlenext = async () => {
    if (activeStep === 0 && saveAddressChecked && elements) {
      const address = await getStripeAddress();
      if (address) await updateUserAddress(address);
    }
    if (activeStep === 1) {
      if (!elements || !stripe) return;
      const result = await elements.submit();
      if (result.error) return toast.error(result.error.message);

      const stripeResult = await stripe.createConfirmationToken({ elements });
      if (stripeResult.error) return toast.error(stripeResult.error.message);
      setConfirmationToken(stripeResult.confirmationToken);
    }
    if (activeStep === 2) {
      await confirmPayment();
    }
    if (activeStep < 2) setActiveStep(activeStep + 1);
  };

  const confirmPayment = async () => {
    setSubmitting(true);
    try {
      if (!confirmationToken || !basket?.clientSecret)
        throw new Error("Unable to confirm payment");

      const orderModel = await createOrderModel();

      const orderResult = await createOrder(orderModel);

      const paymentResult = await stripe?.confirmPayment({
        clientSecret: basket.clientSecret,
        redirect: "if_required",
        confirmParams: {
          confirmation_token: confirmationToken.id,
        },
      });

      if (paymentResult?.paymentIntent?.status === "succeeded") {
        navigate("/checkout/success", { state: orderResult });
        clearBasket();
      } else if (paymentResult?.error) {
        throw new Error(paymentResult.error.message);
      } else {
        throw new Error("Something went wrong ");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      setActiveStep((step) => step - 1);
    } finally {
      setSubmitting(false);
    }
  };

  const createOrderModel = async () => {
    const shippingAddress = await getStripeAddress();
    const card = confirmationToken?.payment_method_preview.card;

    if (!shippingAddress || !card) throw new Error("Unable to create order");

    const paymentSummary = {
      last4Digits: card.last4,
      brand: card.brand,
      exp_month: card.exp_month,
      exp_year: card.exp_year,
    };

    return { shippingAddress, paymentSummary };
  };

  const getStripeAddress = async () => {
    const addressElement = elements?.getElement("address");
    if (!addressElement) return null;
    const {
      value: { name, address },
    } = await addressElement.getValue();

    if (name && address) {
      return { ...address, name };

      return null;
    }
  };

  const handleback = () => {
    setActiveStep(activeStep - 1);
  };

  const handleAddressChange = (event: StripeAddressElementChangeEvent) => {
    setAddressCompleted(event.complete);
  };

  const handlePaymentChange = (event: StripePaymentElementChangeEvent) => {
    setPaymentCompleted(event.complete);
  };

  if (isLoading)
    return <Typography variant="h6">Loading checkout...</Typography>;
  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
        {steps.map((label, index) => {
          return (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Box sx={{ mt: 2 }}>
        <Box sx={{ display: activeStep === 0 ? "block" : "none" }}>
          <AddressElement
            options={{
              mode: "shipping",
              defaultValues: {
                name: name,
                address: restAddress,
              },
            }}
            onChange={handleAddressChange}
          />
          <FormControlLabel
            sx={{ display: "flex", justifyContent: "end" }}
            control={
              <Checkbox
                checked={saveAddressChecked}
                onChange={(e) => setSaveAddressChecked(e.target.checked)}
              />
            }
            label="Save as default address"
          />
        </Box>
        <Box sx={{ display: activeStep === 1 ? "block" : "none" }}>
          <PaymentElement
            onChange={handlePaymentChange}
            options={{
              wallets: { applePay: "never", googlePay: "never" },
            }}
          />
        </Box>
        <Box sx={{ display: activeStep === 2 ? "block" : "none" }}>
          <Review confirmationToken={confirmationToken} />
        </Box>
      </Box>

      <Box display="flex" paddingTop={2} justifyContent="space -between">
        <Button onClick={handleback}>Back</Button>
        <LoadingButton
          onClick={handlenext}
          disabled={
            (activeStep === 0 && !addressCompleted) ||
            (activeStep === 1 && !paymentCompleted) ||
            submitting
          }
          loading={submitting}
        >
          {activeStep === steps.length - 1
            ? `Pay ${currencyFormat(total)}`
            : "Next"}
        </LoadingButton>
      </Box>
    </Paper>
  );
}
