import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack, Grid, Avatar } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Videos from "./Videos";
import Loader from "./Loader";
import { fetchapi } from "../utils/fetchapi";
import ChannelCard from "./ChannelCard";

// Function to format numbers
const formatNumber = (num) => {
  if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
  return num;
};

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const [channelDetail, setChannelDetail] = useState(null);
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchapi(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setVideoDetail(data.items[0])
    );

    fetchapi(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => setVideos(data.items)
    );

    fetchapi(`videos?part=snippet&id=${id}`)
      .then((data) => data?.items?.[0]?.snippet?.channelId)
      .then((channelId) =>
        fetchapi(`channels?part=snippet&id=${channelId}`).then((data) =>
          setChannelDetail(data.items[0])
        )
      );

    // Fetch comments data
    fetchapi(`commentThreads?part=snippet&videoId=${id}&maxResults=10`).then(
      (data) => setComments(data.items)
    );
  }, [id]);

  if (!videoDetail?.snippet || !channelDetail) return <Loader />;

  const {
    snippet: { title, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  return (
    <Box minHeight="95vh" overflow="hidden">
      <Grid container>
        <Grid item xs={12} md={8} style={{ position: "relative" }}>
          <Box position="sticky" top={0} zIndex={1} ml={10} mt={0.5}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
          </Box>
          <Box
            position="sticky"
            top={0}
            zIndex={1}
            bgcolor="#0F0F0F"
            px={2}
            ml={8}
            mt={2}
          >
            <Typography color="#fff" variant="h5" fontWeight="bold">
              {title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ color: "#fff" }}
              py={1}
            >
              <Box display="flex" alignItems="center">
                {channelDetail.snippet.thumbnails && (
                  <img
                    src={channelDetail.snippet.thumbnails.high.url}
                    alt={channelTitle}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      marginRight: 10,
                    }}
                  />
                )}
                <Typography variant="subtitle1" color="#fff">
                  {channelTitle}
                </Typography>{" "}
                <CheckCircleIcon
                  sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                />
              </Box>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {formatNumber(parseInt(viewCount))} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {formatNumber(parseInt(likeCount))} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
          {/* Render comments */}
          <Box mt={3} ml={8} bgcolor="#1f1f1f" p={2}>
            {comments.slice(0, 60).map((comment) => (
              <Box
                key={comment.id}
                bgcolor="#1f1f1f"
                p={2}
                borderRadius={10}
                mb={2}
                display="flex"
                alignItems="center"
              >
                <Avatar
                  alt={
                    comment.snippet.topLevelComment.snippet.authorDisplayName
                  }
                  src={
                    comment.snippet.topLevelComment.snippet
                      .authorProfileImageUrl
                  }
                  sx={{ width: 40, height: 40, marginRight: 2 }}
                />
                <Box>
                  <Typography variant="body1" color="#fff" fontWeight="bold">
                    {comment.snippet.topLevelComment.snippet.authorDisplayName}
                  </Typography>
                  <Typography variant="body2" color="#fff">
                    {comment.snippet.topLevelComment.snippet.textOriginal}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={4} sx={{ paddingLeft: { md: 6 } }}>
          <Box overflow="auto">
            <Typography variant="h5" color="#fff" fontWeight="bold" mb={2}>
              Related Videos
            </Typography>
            <Videos videos={videos} direction="column" />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VideoDetail;
