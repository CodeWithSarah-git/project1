import React from "react";
import { Box, Typography, Container, Paper } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

function Photos() {
  return (
    <Container maxWidth="md" sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: "center", borderRadius: 3, bgcolor: "#ffcc80" }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <WarningAmberIcon sx={{ fontSize: 100, color: "#d84315" }} />
          <Typography variant="h3" sx={{ mt: 2, fontWeight: "bold", color: "#bf360c" }}>
            האתר בשיפוצים
          </Typography>
          <Typography variant="h6" sx={{ mt: 1, color: "#6d4c41" }}>
            אנו עובדים קשה לשדרג את החוויה שלכם. תחזרו לבדוק אותנו בקרוב!
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Photos;