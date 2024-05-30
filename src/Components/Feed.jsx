import { Stack, Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import React from "react";
import { fetchapi } from "../utils/fetchapi";
import Sidebar from "./Sidebar";
import Videos from "./Videos";
import Chatbot from "./Chatbot";

const Feed = () => {
  const [selectedCategory, setselectedCategory] = useState("New");
  const [videos, setvideos] = useState([]);

  useEffect(() => {
    fetchapi(`search?part=snippet&q=${selectedCategory}`).then((data) =>
      setvideos(data.items)
    );
  }, [selectedCategory]);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        sx={{
          height: { sx: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setselectedCategory={setselectedCategory}
        />
        <Typography
          className="copyright"
          variant="body2"
          sx={{ mt: 1.5, color: "White" }}
        >
          Copyright 2024 @VardaanBhatia
        </Typography>
      </Box>
      <Box
        p={2}
        sx={{
          overflowY: "auto",
          height: "90vh",
          flex: "2",
          display: "flex",
          flexDirection: "column", // Ensure content stacks vertically
        }}
      >
        <Box mb={2}>
          <Typography
            variant="h5"
            fontWeight={"bold"}
            mb={2}
            sx={{ color: "white", whiteSpace: "nowrap" }}
          >
            {selectedCategory}
            <span style={{ color: "red" }}> Videos</span>
          </Typography>
        </Box>
        <Videos videos={videos} />
      </Box>
      <Chatbot />
    </Stack>
  );
};

export default Feed;
