import React, { useState, useEffect } from "react";
import { Stack, Typography, Box, IconButton, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MicIcon from "@mui/icons-material/Mic";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { logo } from "../utils/constants";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [loading, setLoading] = useState(false);
  const [voiceSearchOpen, setVoiceSearchOpen] = useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const navigate = useNavigate();

  useEffect(() => {
    if (transcript && !listening) {
      // Ensure transcript is not empty
      if (transcript.trim()) {
        navigate(`/search/${transcript.trim()}`);
      }
      setVoiceSearchOpen(false);
    }
  }, [transcript, listening, navigate]);

  const handleLogoClick = () => {
    setLoading(true);
    setTimeout(() => {
      window.location.href = "/"; // Navigate to the home page and refresh
    }, 1000);
  };

  const handleVoiceSearch = () => {
    if (!browserSupportsSpeechRecognition) {
      alert("Sorry, your browser does not support speech recognition.");
      return;
    }

    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      setVoiceSearchOpen(true);
      SpeechRecognition.startListening({ continuous: false });
    }
  };

  const handlePremiumClick = () => {
    navigate("/premium-plan");
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      p={2}
      sx={{
        position: "sticky",
        background: "#0F0F0F",
        top: 0,
        zIndex: 2,
        justifyContent: "space-between",
      }}
    >
      <Box display="flex" alignItems="center">
        <Box
          display="flex"
          alignItems="center"
          onClick={handleLogoClick}
          sx={{ cursor: "pointer" }}
        >
          <img src={logo} alt="logo" height={26} />
          <Typography variant="h5" color="white" fontWeight="bold" ml={0.3}>
            PrimeTube
          </Typography>
        </Box>
        <Button
          onClick={handlePremiumClick}
          sx={{
            color: "white",
            textTransform: "none",
            ml: "8px",
            backgroundColor: "#FC1503",
            fontSize: "0.875rem", // Smaller font size
            padding: "4px",
            width: "70px",
            height: "16px",
            fontFamily: "roboto",
            "&:hover": {
              backgroundColor: "#d91403", // Darker red on hover
            },
          }}
        >
          Premium
        </Button>
      </Box>
      <Stack direction="row" alignItems="center">
        <IconButton
          color="inherit"
          onClick={handleVoiceSearch}
          sx={{
            backgroundColor: listening ? "red" : "white",
            borderRadius: "50%",
            p: 1,
            marginRight: 1,
            animation: listening ? "pulse 1s infinite" : "none",
            "@keyframes pulse": {
              "0%": { transform: "scale(1)" },
              "50%": { transform: "scale(1.1)" },
              "100%": { transform: "scale(1)" },
            },
            "&:hover": { backgroundColor: listening ? "red" : "lightgrey" },
          }}
        >
          <MicIcon sx={{ color: listening ? "white" : "red" }} />
        </IconButton>
        <SearchBar query={transcript} />
      </Stack>
      {loading && (
        <Box
          sx={{
            height: "2.5px",
            width: "60%",
            background: "#FC1503",
            position: "absolute",
            top: 0,
            left: 0,
            animation: "loading 7s linear infinite",
            "@keyframes loading": {
              "0%": { left: "-50%" },
              "100%": { left: "100%" },
            },
          }}
        />
      )}
    </Stack>
  );
};

export default Navbar;
