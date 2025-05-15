import { useState, useEffect } from "react";
import { Box, LinearProgress, Stack, Typography, Button} from "@mui/material";
import { Sidebar, Videos } from ".";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const FILTERS = [
  { value: "relevance", label: "Relevance" },
  { value: "date", label: "Upload Date" },
  { value: "viewCount", label: "View Count" },
  { value: "rating", label: "Rating" },
];

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);
  const [filter, setFilter] = useState("relevance");

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}&order=${filter}`).then((data) => {
      setVideos(data.items);
    });
  }, [selectedCategory, filter]);

  if (!videos?.length)
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress sx={{ backgroundColor: "#263229" }} />
      </Box>
    );

  return (
    <Stack sx={{ flexDirection: { xs: "column", md: "row" } }}>
      <Box
        sx={{
          height: { xs: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { xs: 0, md: 2 },
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </Box>
      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: "white" }}
        >
          {selectedCategory} Videos
        </Typography>

        {/* Redesigned Filter Section */}
        <Box
          sx={{
            mb: 4,
            p: 2,
            borderRadius: 2,
            backgroundColor: "#1e1e1e",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            {FILTERS.map((f) => (
              <Button
                key={f.value}
                onClick={() => setFilter(f.value)}
                sx={{
                  borderRadius: "30px", // Oval shape
                  minWidth: 160,
                  height: 50,
                  px: 4,
                  fontWeight: filter === f.value ? "bold" : "normal",
                  backgroundColor: filter === f.value ? "#4caf50" : "#333",
                  color: filter === f.value ? "#fff" : "#bdbdbd",
                  textTransform: "none",
                  boxShadow: filter === f.value ? "0px 6px 12px rgba(0, 0, 0, 0.4)" : "none",
                  border: filter === f.value ? "2px solid #4caf50" : "2px solid transparent",
                  "&:hover": {
                    backgroundColor: "#4caf50",
                    color: "#fff",
                    border: "2px solid #4caf50",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                {f.label}
              </Button>
            ))}
          </Box>
        </Box>

        <Videos videos={videos} />
      </Box>
    </Stack>
  );
};

export default Feed;