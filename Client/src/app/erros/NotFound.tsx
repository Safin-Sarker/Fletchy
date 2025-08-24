import { SearchOff } from "@mui/icons-material";
import { Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Paper
      sx={{
        height: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 6,
      }}
    >
      <SearchOff sx={{ fontsizxe: 100 }} color="primary" />
      <Typography gutterBottom variant="h3">
        oops - we could no find what you were looking for
      </Typography>
      <Button fullWidth component={Link} to="/catalog">
        Go back to Shop
      </Button>
    </Paper>
  );
}
