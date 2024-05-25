import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";

import { fetchapi } from "../utils/fetchapi";
import Videos from "./Videos";

const SearchFeed = () => {
  const [videos, setVideos] = useState(null);
  const { searchTerm } = useParams();

  useEffect(() => {
    if (searchTerm) {
      fetchapi(`search?part=snippet&q=${searchTerm}`).then((data) =>
        setVideos(data.items)
      );
    }
  }, [searchTerm]);

  return (
    <Box p={2} minHeight="95vh">
      <Typography variant="h4" fontWeight={900} color="white" mb={3} ml={18}>
        Search Results for{" "}
        <span style={{ color: "#FF0000" }}>{searchTerm}</span>
      </Typography>
      <Box ml={18}>
        <Box sx={{ mr: { sm: "100px" } }} />
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default SearchFeed;
