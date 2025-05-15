import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia, Menu, MenuItem, IconButton } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Player from "xgplayer";
import React, { useEffect, useState } from "react";

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

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAddToPlaylist = () => {
    const playlists = JSON.parse(localStorage.getItem("playlists")) || [];
    const selectedPlaylist = prompt(
      `Available Playlists:\n${playlists.map((p) => p.name).join("\n")}\n\nEnter playlist name:`
    );
    const playlist = playlists.find((p) => p.name === selectedPlaylist);
    if (playlist) {
      playlist.videos.push({ videoId, snippet });
      localStorage.setItem("playlists", JSON.stringify(playlists));
      alert("Video added to playlist!");
    } else {
      alert("Playlist not found!");
    }
    handleMenuClose();
  };

  useEffect(() => {
    // Initialize xgplayer when the component mounts
    const player = new Player({
      id: "xgplayer-container", // The container ID
      url: "http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4", // Static video URL
      autoplay: true,
      width: "100%",
      height: "100%",
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
      </Link>
      <CardContent sx={{ 
        backgroundColor: "#111111",
        height: { xs: "100px", md: hmd },
        p: 2,
        position: "relative",
      }}>
        <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
          {videoTitle.slice(0, 60) || demoVideoTitle.slice(0, 60)}
        </Typography>
        {/* Three-dots menu */}
        <IconButton
          onClick={handleMenuOpen}
          sx={{ position: "absolute", top: 8, right: 8, color: "#fff" }}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          PaperProps={{
            style: {
              backgroundColor: "#333",
              color: "#fff",
            },
          }}
        >
          <MenuItem onClick={handleAddToPlaylist}>Add to Playlist</MenuItem>
        </Menu>
        {/* Channel Name */}
        <Link to={snippet?.channelId ? `/channel/${snippet.channelId}` : demoChannelUrl}>
          <Typography variant="subtitle2" color="gray" mt={1}>
            {snippet?.channelTitle || demoChannelTitle}
            <CheckCircle sx={{ fontSize: 12, color: "gray", ml: 0.5 }} />
          </Typography>
        </Link>
        {/* View count & date */}
        <Typography variant="caption" color="gray" sx={{ display: "block", mt: 1 }}>
          {`${views} views • ${uploadDate}`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default VideoCard;