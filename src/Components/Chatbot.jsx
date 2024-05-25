import React, { useState } from "react";
import { Box, IconButton, TextField, Button, Typography } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [suggestions] = useState([
    "Best channels for React.js",
    "Best coding channels",
    "Top 5 programming languages",
  ]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    const userMessage = { sender: "user", text: message };
    setMessages([...messages, userMessage]);

    const options = {
      method: "POST",
      url: "https://chat-gpt26.p.rapidapi.com/",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "2feae43139msh91d8e953f8663a7p1aa1bcjsne33d5897f08b",
        "X-RapidAPI-Host": "chat-gpt26.p.rapidapi.com",
      },
      data: {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      },
    };

    try {
      const response = await axios.request(options);
      const botMessage = {
        sender: "bot",
        text: response.data.choices[0].message.content,
      };
      setMessages([...messages, botMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages([
        ...messages,
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
          backgroundColor: "white",
          "&:hover": { backgroundColor: "lightgray" },
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
            width: 300,
            height: 400,
            backgroundColor: "#fff",
            borderRadius: 2,
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
            p: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
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
                    message.sender === "user" ? "lightblue" : "lightgray",
                  borderRadius: 2,
                  p: 1,
                  maxWidth: "80%",
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
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => sendMessage(input)}
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1">Suggestions:</Typography>
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outlined"
                onClick={() => handleSuggestionClick(suggestion)}
                sx={{ mt: 1 }}
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
