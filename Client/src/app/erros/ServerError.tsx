import { Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

type ServerErr = { title?: string; detail?: string };
export default function ServerError() {
  const { state } = useLocation() as { state?: { error?: ServerErr } };
  const err = state?.error;

  return (
    <Paper>
      {err ? (
        <>
          <Typography
            gutterBottom
            variant="h3"
            sx={{ px: 4, pt: 2 }}
            color="secondary"
          >
            {err.title ?? "Server Error"}
          </Typography>
          <Divider />
          {err.detail && (
            <Typography variant="body1" sx={{ p: 4 }}>
              {err.detail}
            </Typography>
          )}
        </>
      ) : (
        <Typography variant="h5" sx={{ p: 4 }} color="error">
          Server Error
        </Typography>
      )}
    </Paper>
  );
}
