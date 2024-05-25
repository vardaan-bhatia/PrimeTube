import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PlanPage = () => {
  const navigate = useNavigate();

  const handlePayClick = (amount) => {
    const options = {
      key: "rzp_test_oUfbqC4lUeA9Sa", // Replace with your Razorpay key
      amount: amount * 100, // Amount in paise
      currency: "INR",
      name: "PrimeTube Premium",
      description: `Upgrade to Premium (${
        amount === 999 ? "Yearly" : "Monthly"
      })`,
      image: "https://cdn-icons-png.flaticon.com/512/3670/3670163.png", // Adjust path if necessary
      handler: function (response) {
        alert(
          `Payment successful. Razorpay Payment ID: ${response.razorpay_payment_id}`
        );
        navigate("/confirmation"); // Navigate to the confirmation page
      },
      prefill: {
        name: "Your Name",
        email: "your-email@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Your Address",
      },
      theme: {
        color: "#315BC1",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

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
      <Typography variant="h4" gutterBottom>
        PrimeTube Premium Plans
      </Typography>
      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          ₹119 per month
        </Typography>
        <Button
          onClick={() => handlePayClick(119)}
          sx={{
            color: "white",
            backgroundColor: "#FC1503",
            textTransform: "none",
            padding: "10px 20px",
            fontSize: "1rem",
            "&:hover": {
              backgroundColor: "#d91403", // Darker red on hover
            },
          }}
        >
          Click to Pay Monthly
        </Button>
      </Box>
      <Typography variant="h6" gutterBottom>
        ₹999 per year
      </Typography>
      <Button
        onClick={() => handlePayClick(999)}
        sx={{
          color: "white",
          backgroundColor: "#FC1503",
          textTransform: "none",
          padding: "10px 20px",
          fontSize: "1rem",
          "&:hover": {
            backgroundColor: "#d91403", // Darker red on hover
          },
        }}
      >
        Click to Pay Yearly
      </Button>
    </Box>
  );
};

export default PlanPage;
