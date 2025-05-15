import { useState, useEffect } from "react";
import { 
  Box, 
  Stack, 
  IconButton, 
  Typography, 
  Drawer, 
  Link, 
  useMediaQuery, 
  useTheme 
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import { categories } from "../utils/constants";

const Sidebar = ({ selectedCategory, setSelectedCategory }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [playlists, setPlaylists] = useState(
    JSON.parse(localStorage.getItem("playlists")) || []
  );

  // Update sidebar state when screen size changes
  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  // Handle category selection, close drawer on mobile
  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    if (isMobile) {
      setIsDrawerOpen(false);
    }
  };

  // Handle playlist creation
  const createPlaylist = () => {
    const playlistName = prompt("Enter playlist name:");
    if (playlistName) {
      const newPlaylist = { id: Date.now(), name: playlistName, videos: [] };
      const updatedPlaylists = [...playlists, newPlaylist];
      setPlaylists(updatedPlaylists);
      localStorage.setItem("playlists", JSON.stringify(updatedPlaylists));
    }
  };

  // View playlist contents
  const viewPlaylist = (playlist) => {
    alert(`Playlist: ${playlist.name}\nVideos:\n${playlist.videos.map((v) => v.snippet.title).join("\n")}`);
  };

  // Compact sidebar for desktop only
  const CompactSidebar = () => (
    <Box 
      sx={{ 
        width: 56, 
        height: "100%", 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        p: 1, 
        bgcolor: "#181818" 
      }}
    >
      <IconButton 
        onClick={() => setIsSidebarOpen(true)} 
        sx={{ mb: 2 }}
      >
        <MenuIcon sx={{ color: "white" }} />
      </IconButton>
      <Stack spacing={2} sx={{ flex: 1 }}>
        {categories.slice(0, 4).map((category) => (
          <IconButton
            key={category.name}
            onClick={() => handleCategoryClick(category.name)}
            sx={{
              color: category.name === selectedCategory ? "#aaff00" : "#f1f1f1",
              bgcolor: category.name === selectedCategory ? "#263229" : "transparent",
              borderRadius: 2,
              width: 40,
              height: 40,
              mx: "auto"
            }}
          >
            {category.icon}
          </IconButton>
        ))}
      </Stack>
    </Box>
  );

  // Full sidebar for desktop expanded view
  const FullSidebar = () => (
    <Box
      sx={{
        width: { xs: 260, md: 260 },
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#181818",
        position: "relative",
      }}
    >
      {/* Close Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
        <IconButton onClick={() => setIsSidebarOpen(false)}>
          <CloseIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>

      {/* Sidebar Content */}
      <Stack
        direction="column"
        sx={{
          overflowY: "auto",
          flex: 1,
          gap: 1,
          px: 1,
        }}
      >
        {/* Categories */}
        {categories.map((category) => (
          <button
            className="category-btn"
            onClick={() => handleCategoryClick(category.name)}
            style={{
              background: category.name === selectedCategory && "#263229",
              color: "white",
              width: "100%",
              textAlign: "left",
              display: "flex",
              alignItems: "center",
              border: "none",
              outline: "none",
              cursor: "pointer",
              padding: "10px 16px",
              borderRadius: 6,
              marginBottom: 2,
            }}
            key={category.name}
          >
            <span style={{
              color: category.name === selectedCategory ? "#aaff00" : "#f1f1f1",
              marginRight: "15px",
            }}>
              {category.icon}
            </span>
            <span style={{
              opacity: category.name === selectedCategory ? "1" : "0.8",
            }}>
              {category.name}
            </span>
          </button>
        ))}
      </Stack>
      
      {/* Footer */}
      <Box sx={{ 
        mt: 3, 
        pt: 3, 
        borderTop: "1px solid #333",
        fontSize: "13px",
        color: "#aaa",
        px: 1
      }}>
        <Stack spacing={2}>
          {/* Playlists & Collections Section */}
          <Box>
            <Typography variant="subtitle2" sx={{ color: "#fff", mb: 1 }}>
              Playlists & Collections
            </Typography>
            <Stack spacing={1}>
              <button
                className="category-btn"
                onClick={createPlaylist}
                style={{
                  color: "white",
                  width: "100%",
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  border: "none",
                  outline: "none",
                  cursor: "pointer",
                  padding: "6px 16px",
                  borderRadius: 6,
                  fontSize: "14px"
                }}
              >
                <PlaylistAddIcon sx={{ mr: 1, fontSize: 18 }} />
                Create Playlist
              </button>
              <button
                className="category-btn"
                onClick={() => {}}
                style={{
                  color: "white",
                  width: "100%",
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  border: "none",
                  outline: "none",
                  cursor: "pointer",
                  padding: "6px 16px",
                  borderRadius: 6,
                  fontSize: "14px"
                }}
              >
                <VideoLibraryIcon sx={{ mr: 1, fontSize: 18 }} />
                Saved Videos
              </button>
              
              {/* Display user playlists */}
              {playlists.map((playlist) => (
                <button
                  key={playlist.id}
                  className="category-btn"
                  onClick={() => viewPlaylist(playlist)}
                  style={{
                    color: "white",
                    width: "100%",
                    textAlign: "left",
                    display: "flex",
                    alignItems: "center",
                    border: "none",
                    outline: "none",
                    cursor: "pointer",
                    padding: "6px 16px",
                    borderRadius: 6,
                    fontSize: "14px"
                  }}
                >
                  <PlaylistAddIcon sx={{ mr: 1, fontSize: 18 }} />
                  {playlist.name}
                </button>
              ))}
            </Stack>
          </Box>
          
          {/* Footer Links */}
          <Box sx={{ fontSize: "12px", lineHeight: 1.5 }}>
            <Box sx={{ mb: 1 }}>
              <Link href="#" sx={{ color: "#aaa", mr: 1, textDecoration: "none" }}>Settings</Link>
              <Link href="#" sx={{ color: "#aaa", mr: 1, textDecoration: "none" }}>Report history</Link>
              <Link href="#" sx={{ color: "#aaa", mr: 1, textDecoration: "none" }}>Help</Link>
              <Link href="#" sx={{ color: "#aaa", textDecoration: "none" }}>Send feedback</Link>
            </Box>
            
            <Box sx={{ mb: 1 }}>
              <Link href="#" sx={{ color: "#aaa", mr: 1, textDecoration: "none" }}>About</Link>
              <Link href="#" sx={{ color: "#aaa", mr: 1, textDecoration: "none" }}>Press</Link>
              <Link href="#" sx={{ color: "#aaa", mr: 1, textDecoration: "none" }}>Copyright</Link>
              <Link href="#" sx={{ color: "#aaa", mr: 1, textDecoration: "none" }}>Contact us</Link>
              <Link href="#" sx={{ color: "#aaa", mr: 1, textDecoration: "none" }}>Creators</Link>
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Link href="#" sx={{ color: "#aaa", mr: 1, textDecoration: "none" }}>Terms</Link>
              <Link href="#" sx={{ color: "#aaa", mr: 1, textDecoration: "none" }}>Privacy</Link>
              <Link href="#" sx={{ color: "#aaa", mr: 1, textDecoration: "none" }}>Policy & Safety</Link>
            </Box>
            
            <Typography variant="caption" sx={{ color: "#666" }}>
              © 2025 SidewayClone
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Desktop view: show compact or full sidebar based on state */}
      {!isMobile && (
        isSidebarOpen ? <FullSidebar /> : <CompactSidebar />
      )}
      
      {/* Mobile: Only menu button in the corner */}
      {isMobile && (
        <>
          {/* Mobile Menu Button - centered at bottom of screen */}
          <IconButton
            onClick={() => setIsDrawerOpen(true)}
            sx={{
              position: "fixed",
              left: "50%",
              bottom: 20,
              transform: "translateX(-50%)",
              zIndex: 1100,
              bgcolor: "#181818",
              color: "white",
              width: 50,
              height: 50,
              boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
              borderRadius: '50%',
              "&:hover": {
                bgcolor: "#263229",
              }
            }}
          >
            <MenuIcon />
          </IconButton>
          
          {/* Full-screen drawer for mobile */}
          <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            PaperProps={{
              sx: {
                width: "100%",
                bgcolor: "#181818",
              }
            }}
          >
            <Box
              sx={{
                p: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #333"
              }}
            >
              <Typography variant="h6" color="white">Categories</Typography>
              <IconButton onClick={() => setIsDrawerOpen(false)}>
                <CloseIcon sx={{ color: "white" }} />
              </IconButton>
            </Box>
            
            <Box sx={{ p: 2, overflowY: "auto" }}>
              {categories.map((category) => (
                <button
                  className="category-btn"
                  onClick={() => handleCategoryClick(category.name)}
                  style={{
                    background: category.name === selectedCategory && "#263229",
                    color: "white",
                    width: "100%",
                    textAlign: "left",
                    display: "flex",
                    alignItems: "center",
                    border: "none",
                    outline: "none",
                    cursor: "pointer",
                    padding: "12px 16px",
                    borderRadius: 6,
                    marginBottom: 8,
                  }}
                  key={category.name}
                >
                  <span style={{
                    color: category.name === selectedCategory ? "#aaff00" : "#f1f1f1",
                    marginRight: "15px",
                  }}>
                    {category.icon}
                  </span>
                  <span style={{
                    opacity: category.name === selectedCategory ? "1" : "0.8",
                    fontSize: "16px"
                  }}>
                    {category.name}
                  </span>
                </button>
              ))}
            </Box>

            {/* Mobile Footer */}
            <Box sx={{ 
              mt: 3, 
              pt: 3, 
              borderTop: "1px solid #333",
              fontSize: "13px",
              color: "#aaa",
              px: 2
            }}>
              {/* Playlists & Collections Section */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ color: "#fff", mb: 1 }}>
                  Playlists & Collections
                </Typography>
                <Stack spacing={1}>
                  <button
                    className="category-btn"
                    onClick={createPlaylist}
                    style={{
                      color: "white",
                      width: "100%",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      border: "none",
                      outline: "none",
                      cursor: "pointer",
                      padding: "10px 16px",
                      borderRadius: 6,
                      fontSize: "14px"
                    }}
                  >
                    <PlaylistAddIcon sx={{ mr: 1, fontSize: 20 }} />
                    Create Playlist
                  </button>
                  <button
                    className="category-btn"
                    onClick={() => {}}
                    style={{
                      color: "white",
                      width: "100%",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      border: "none",
                      outline: "none",
                      cursor: "pointer",
                      padding: "10px 16px",
                      borderRadius: 6,
                      fontSize: "14px"
                    }}
                  >
                    <VideoLibraryIcon sx={{ mr: 1, fontSize: 20 }} />
                    Saved Videos
                  </button>

                  {/* Display user playlists */}
                  {playlists.map((playlist) => (
                    <button
                      key={playlist.id}
                      className="category-btn"
                      onClick={() => viewPlaylist(playlist)}
                      style={{
                        color: "white",
                        width: "100%",
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                        border: "none",
                        outline: "none",
                        cursor: "pointer",
                        padding: "10px 16px",
                        borderRadius: 6,
                        fontSize: "14px"
                      }}
                    >
                      <PlaylistAddIcon sx={{ mr: 1, fontSize: 20 }} />
                      {playlist.name}
                    </button>
                  ))}
                </Stack>
              </Box>

              <Box sx={{ fontSize: "12px", lineHeight: 1.8 }}>
                <Box sx={{ mb: 2 }}>
                  <Link href="#" sx={{ color: "#aaa", mr: 1, textDecoration: "none" }}>Settings</Link>
                  <Link href="#" sx={{ color: "#aaa", mr: 1, textDecoration: "none" }}>Report history</Link>
                  <Link href="#" sx={{ color: "#aaa", mr: 1, textDecoration: "none" }}>Help</Link>
                  <Link href="#" sx={{ color: "#aaa", textDecoration: "none" }}>Send feedback</Link>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Link href="#" sx={{ color: "#aaa", mr: 1, textDecoration: "none" }}>About</Link>
                  <Link href="#" sx={{ color: "#aaa", mr: 1, textDecoration: "none" }}>Press</Link>
                  <Link href="#" sx={{ color: "#aaa", mr: 1, textDecoration: "none" }}>Copyright</Link>
                  <Link href="#" sx={{ color: "#aaa", mr: 1, textDecoration: "none" }}>Contact us</Link>
                  <Link href="#" sx={{ color: "#aaa", mr: 1, textDecoration: "none" }}>Creators</Link>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Link href="#" sx={{ color: "#aaa", mr: 1, textDecoration: "none" }}>Terms</Link>
                  <Link href="#" sx={{ color: "#aaa", mr: 1, textDecoration: "none" }}>Privacy</Link>
                  <Link href="#" sx={{ color: "#aaa", mr: 1, textDecoration: "none" }}>Policy & Safety</Link>
                </Box>
                
                <Typography variant="caption" sx={{ color: "#666" }}>
                  © 2025 SidewayClone. Rights not reserved.
                </Typography>
              </Box>
            </Box>
          </Drawer>
        </>
      )}
    </>
  );
};

export default Sidebar;