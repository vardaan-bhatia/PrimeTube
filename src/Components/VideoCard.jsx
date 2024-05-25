import React from "react";
import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia, Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import {
  demoThumbnailUrl,
  demoVideoUrl,
  demoVideoTitle,
  demoChannelUrl,
  demoChannelTitle,
} from "../utils/constants";

// Function to format ISO 8601 duration to HH:MM:SS
const formatDuration = (duration) => {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const hours = (parseInt(match[1]) || 0).toString().padStart(2, "0");
  const minutes = (parseInt(match[2]) || 0).toString().padStart(2, "0");
  const seconds = (parseInt(match[3]) || 0).toString().padStart(2, "0");
  return hours > 0 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
};

const VideoCard = ({
  video: {
    id: { videoId },
    snippet,
    contentDetails,
  },
}) => (
  <Card
    sx={{
      width: { xs: "100%", sm: "358px", md: "290px" },
      boxShadow: "none",
      borderRadius: 0,
      mb: 1,
      position: "relative",
    }}
  >
    <Link to={videoId ? `/video/${videoId}` : `/video/cV2gBU6hKfY`}>
      <CardMedia
        image={snippet?.thumbnails?.high?.url || demoThumbnailUrl}
        alt={snippet?.title}
        sx={{ width: { xs: "100%", sm: "300px" }, height: 170 }}
      />
      {contentDetails && (
        <Box
          sx={{
            position: "absolute",
            bottom: 8,
            right: 8,
            bgcolor: "rgba(0, 0, 0, 0.7)",
            borderRadius: "5px",
            px: 1,
            py: 0.5,
          }}
        >
          <Typography variant="body2" color="#FFF">
            {formatDuration(contentDetails.duration)}
          </Typography>
        </Box>
      )}
    </Link>
    <CardContent sx={{ backgroundColor: "#1E1E1E", height: "106px" }}>
      <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
        <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
          {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
        </Typography>
      </Link>
      <Link
        to={
          snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl
        }
      >
        <Typography variant="subtitle3" color="#9E9FA5">
          {snippet?.channelTitle || demoChannelTitle}
          <CheckCircleIcon
            sx={{
              fontSize: "15px",
              color: "#9E9FA5",
              ml: "5px",
              mt: "1px",
            }}
          />
        </Typography>
      </Link>
    </CardContent>
  </Card>
);

export default VideoCard;
