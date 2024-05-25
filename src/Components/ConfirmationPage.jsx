import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ConfirmationPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000); // Redirect after 5 seconds

    return () => clearTimeout(timer); // Clear timeout if the component unmounts
  }, [navigate]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#0F0F0F"
      color="white"
      textAlign="center"
      p={2}
    >
      <CheckCircleIcon sx={{ fontSize: 80, color: "#FC1503" }} />
      <Typography variant="h4" gutterBottom>
        Now You Are a Premium Member of PrimeTube
      </Typography>
      <Typography variant="h6" gutterBottom>
        Redirecting to the home page in a few seconds...
      </Typography>
    </Box>
  );
};

export default ConfirmationPage;
