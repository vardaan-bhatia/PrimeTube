import React, { useState } from "react";
import { Box, IconButton, TextField, Button, Typography } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [suggestions] = useState([
    "Best channels for React.js",
    "Best coding channels",
    "Top 5 programming languages",
  ]);

  const genAI = new GoogleGenerativeAI(
    "AIzaSyCz3UfO7za07lp3m0uoIT5Gol9Ry4xZPf0"
  );

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    const userMessage = { sender: "user", text: message };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent({ prompt: message });
      const response = await result.text();

      const botMessage = {
        sender: "bot",
        text: response,
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Error fetching response" },
      ]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    sendMessage(suggestion);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 1000,
      }}
    >
      <IconButton
        color="primary"
        onClick={toggleChat}
        sx={{
          backgroundColor: "#FF0000",
          "&:hover": { backgroundColor: "#CC0000" },
          color: "white",
        }}
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </IconButton>
      {isOpen && (
        <Box
          sx={{
            position: "fixed",
            bottom: 80,
            right: 20,
            width: 320,
            height: 450,
            backgroundColor: "#FFFFFF",
            borderRadius: 4,
            boxShadow: 5,
            display: "flex",
            flexDirection: "column",
            p: 2,
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontSize: "1.2rem", color: "#FF0000" }}
          >
            Chat with AI
          </Typography>
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              mb: 2,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  alignSelf:
                    message.sender === "user" ? "flex-end" : "flex-start",
                  backgroundColor:
                    message.sender === "user" ? "#FF0000" : "#F5F5F5",
                  borderRadius: 2,
                  p: 1,
                  maxWidth: "80%",
                  fontSize: "1rem",
                  color: message.sender === "user" ? "white" : "black",
                }}
              >
                <Typography variant="body2">{message.text}</Typography>
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 1,
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={input}
              onChange={handleInputChange}
              onKeyPress={(e) => {
                if (e.key === "Enter") sendMessage(input);
              }}
              sx={{ bgcolor: "white" }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#FF0000",
                color: "white",
                "&:hover": { backgroundColor: "#CC0000" },
              }}
              onClick={() => {
                sendMessage(input);
                setInput("");
              }}
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontSize: "1rem", color: "#FF0000" }}
            >
              Suggestions:
            </Typography>
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outlined"
                onClick={() => {
                  handleSuggestionClick(suggestion);
                  setInput("");
                }}
                sx={{
                  mt: 1,
                  fontSize: "0.8rem",
                  textTransform: "none",
                  color: "#FF0000",
                  borderColor: "#FF0000",
                  "&:hover": {
                    backgroundColor: "#FFEBEB",
                    borderColor: "#CC0000",
                  },
                }}
              >
                {suggestion}
              </Button>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Chatbot;
