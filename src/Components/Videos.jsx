import React from "react";
import { Stack, Box } from "@mui/material";
import { ChannelCard, VideoCard } from "./";

const Videos = ({ videos }) => {
  if (videos === null) {
    return <div>Loading videos...</div>;
  }
  return (
    <Stack
      direction={"row"}
      flexWrap="wrap"
      justifyContent="start"
      gap={2}
      alignItems="start"
    >
      {videos.map((item, idx) => (
        <Box key={idx}>
          {item.id.videoId && <VideoCard video={item} />}
          {item.id.channelId && <ChannelCard channelDetail={item} />}
        </Box>
      ))}
    </Stack>
  );
};

export default Videos;
