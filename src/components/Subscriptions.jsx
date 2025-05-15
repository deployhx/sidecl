import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const savedSubscriptions = JSON.parse(localStorage.getItem("subscriptions")) || [];
    setSubscriptions(savedSubscriptions);
  }, []);

  if (!subscriptions.length) {
    return (
      <Box sx={{ width: "100%", textAlign: "center", mt: 5 }}>
        <Typography variant="h5" color="gray">
          No subscriptions yet!
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
        Subscribed Channels
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={2}>
        {subscriptions.map((channel) => (
          <Card
            key={channel.channelId}
            sx={{
              width: "300px",
              bgcolor: "#181818",
              color: "white",
              borderRadius: "10px",
            }}
          >
            <Link to={`/channel/${channel.channelId}`}>
              <CardMedia
                image={channel.profilePicture}
                alt={channel.channelTitle}
                sx={{
                  height: "180px",
                  borderRadius: "10px 10px 0 0",
                }}
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {channel.channelTitle}
                </Typography>
              </CardContent>
            </Link>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Subscriptions;