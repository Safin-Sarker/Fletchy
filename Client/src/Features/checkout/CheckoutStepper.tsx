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

const steps = ["Address", "Payment", "Review"];

export default function CheckoutStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const { data: { name, ...restAddress } = {} as Address, isLoading } =
    useFetchAddressQuery();
  const [updateUserAddress] = useUpdateUserAddressMutation();
  const [saveAddressChecked, setSaveAddressChecked] = useState(false);
  const elements = useElements();
  const stripe = useStripe();
  const [addressCompleted, setAddressCompleted] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const { total } = useBasketinfo();
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

    setActiveStep(activeStep + 1);
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
          <PaymentElement onChange={handlePaymentChange} />
        </Box>
        <Box sx={{ display: activeStep === 2 ? "block" : "none" }}>
          <Review confirmationToken={confirmationToken} />
        </Box>
      </Box>

      <Box display="flex" paddingTop={2} justifyContent="space -between">
        <Button onClick={handleback}>Back</Button>
        <Button
          onClick={handlenext}
          disabled={
            (activeStep === 0 && !addressCompleted) ||
            (activeStep === 1 && !paymentCompleted)
          }
        >
          {activeStep === steps.length - 1
            ? `Pay ${currencyFormat(total)}`
            : "Next"}
        </Button>
      </Box>
    </Paper>
  );
}
