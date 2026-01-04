import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useFetchOrdersQuery } from "./orderApi";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

export default function OrderPage() {
  const { data: orders } = useFetchOrdersQuery();

  const navigate = useNavigate();

  if (!orders) return <Typography variant="h5">No orders available</Typography>;

  return (
    <Container maxWidth="md">
      <Typography variant="h5" align="center" gutterBottom></Typography>
      <Paper sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Order</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                hover
                onClick={() => navigate(`/orders/${order.id}`)}
                style={{ cursor: "pointer" }}
              >
                <TableCell align="center">#{order.id}</TableCell>
                <TableCell>
                  {new Date(order.orderDate).toLocaleDateString()}
                </TableCell>
                <TableCell>${(order.total / 100).toFixed(2)}</TableCell>
                <TableCell>{order.orderStatus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
