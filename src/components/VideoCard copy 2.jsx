import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import Player from "xgplayer";
import React, { useEffect } from "react";


import {
  demoThumbnailUrl,
  demoVideoUrl,
  demoVideoTitle,
  demoChannelUrl,
  demoChannelTitle,
} from "../utils/constants";

const VideoCard = ({
  video: {
    id: { videoId },
    snippet,
    statistics,
  },
  md,
  lg,
  hmd,
}) => {
  const thumbnailUrl = snippet?.thumbnails?.high?.url || demoThumbnailUrl;
  const videoTitle = snippet?.title || demoVideoTitle;
  
  const views = statistics?.viewCount 
    ? parseInt(statistics.viewCount).toLocaleString() 
    : "N/A";

  const uploadDate = snippet?.publishedAt 
    ? format(new Date(snippet.publishedAt), "dd-MM-yyyy") 
    : "N/A";

    useEffect(() => {
      // Initialize xgplayer when the component mounts
      const player = new Player({
        id: "xgplayer-container", // The container ID
        url: "http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4", // Static video URL
        autoplay: false,
        width: "100%",
        height: "180px",
      });
  
      return () => {
        player.destroy(); // Cleanup the player when the component unmounts
      };
    }, []);

  return (
    <Card
      sx={{
        width: { xs: "100%", sm: "320px", md: md, lg: lg },
        boxShadow: "none",
        borderRadius: 5,
        bgcolor: "#181818", 
      }}
    >
      <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
        <CardMedia
          image={thumbnailUrl}
          alt={videoTitle}
          sx={{
            width: { xs: "100%", sm: "320px", md: md, lg: lg },
            height: { xs: "180px", md: hmd },
          }}
        />

        <CardContent sx={{ 
          backgroundColor: "#111111",
          height: { xs: "100px", md: hmd },
          p: 2 
        }}>
          <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
            {videoTitle.slice(0, 60) || demoVideoTitle.slice(0, 60)}
          </Typography>

        {/* Channel Name */}
          <Link to={snippet?.channelId ? `/channel/${snippet.channelId}` : demoChannelUrl}>
           
            <Typography variant="subtitle2" color="gray" mt={1}>
              {snippet?.channelTitle || demoChannelTitle}
              <CheckCircle sx={{ fontSize: 12, color: "gray", ml: 0.5 }} />
            </Typography>
          
          </Link>

          {/*  view count & date */}
          <Typography variant="caption" color="gray" sx={{ display: "block", mt: 1 }}>
            {`${views} views • ${uploadDate}`}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
};


export default VideoCard;