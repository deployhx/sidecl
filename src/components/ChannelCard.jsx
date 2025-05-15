import React from "react";
import { Link } from "react-router-dom";
import { Typography, CardContent, CardMedia, Box, Button } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { demoChannelTitle, demoProfilePicture } from "../utils/constants";

const ChannelCard = ({ channelDetails, marginTop }) => {
  const profilePicture =
    channelDetails?.snippet?.thumbnails?.high?.url || demoProfilePicture;
  const channelTitle = channelDetails?.snippet?.title || demoChannelTitle;
  const channelId = channelDetails?.id?.channelId;

  const handleSubscribe = () => {
    const subscriptions = JSON.parse(localStorage.getItem("subscriptions")) || [];
    if (!subscriptions.some((sub) => sub.channelId === channelId)) {
      subscriptions.push({ channelId, channelTitle, profilePicture });
      localStorage.setItem("subscriptions", JSON.stringify(subscriptions));
      alert("Subscribed!");
    } else {
      alert("Already subscribed!");
    }
  };

  return (
    <Box
      sx={{
        boxShadow: "none",
        borderRadius: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: { xs: "300px", sm: "320px" },
        height: "326px",
        margin: "auto",
        marginTop: marginTop,
      }}
    >
      <Link to={`/channel/${channelId}`}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <CardMedia
            image={profilePicture}
            alt={channelTitle}
            sx={{
              borderRadius: "50%",
              height: "180px",
              width: "180px",
              mb: 2,
              border: "1px solid #e3e3e3",
            }}
          />
          <Typography variant="h6">
            {channelTitle}
            <CheckCircle sx={{ fontSize: 12, color: "gray", ml: "5px" }} />
          </Typography>
        </CardContent>
      </Link>
      <Button
        variant="contained"
        color="secondary"
        sx={{ mt: 2 }}
        onClick={handleSubscribe}
      >
        Subscribe
      </Button>
    </Box>
  );
};

export default ChannelCard;