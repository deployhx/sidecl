import { Hidden, Stack, Button, IconButton, useMediaQuery, useTheme, Drawer } from "@mui/material";
import { Link } from "react-router-dom";
import { Menu, Close } from "@mui/icons-material";
import { useState } from "react";
import logo from "../assets/logo.png";
import SearchBar from "./SearchBar";
import { Typography } from "@mui/material";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  return (
    <Stack
      direction="row"
      alignItems="center"
      p={isMobile ? 1 : 2}
      sx={{
        position: "sticky",
        top: 0,
        zIndex: "1000",
        justifyContent: "space-between",
        background: "rgba(0, 0, 0, 0.66)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(10.6px)",
        height: { xs: "60px", sm: "70px" }
      }}
    >
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <img src={logo} alt="logo" height={isMobile ? 35 : 45} />
        <Hidden smDown>
          <Typography fontWeight="bold" ml={1} sx={{ color: "white" }} display="flex" flexDirection="row">
            <Typography variant="h4" sx={{color: "#dddddd"}} >Sideway</Typography>
            <Typography variant="h4" sx={{ color: "#af0" }}>Clone </Typography>
          </Typography>
        </Hidden>
      </Link>
      
      {isMobile ? (
        <>
          <IconButton 
            color="inherit" 
            onClick={() => setDrawerOpen(true)}
            sx={{ color: "white" }}
          >
            <Menu />
          </IconButton>
          
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            PaperProps={{
              sx: { width: "80%", bgcolor: "#111" }
            }}
          >
            <Stack p={2} spacing={2}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h6" color="white">Menu</Typography>
                <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: "white" }}>
                  <Close />
                </IconButton>
              </Stack>
              
              <SearchBar />
              
              <Button
                component={Link}
                to="/subscriptions"
                variant="contained"
                color="success"
                fullWidth
                onClick={() => setDrawerOpen(false)}
              >
                Subscriptions
              </Button>
            </Stack>
          </Drawer>
        </>
      ) : (
        <Stack direction="row" alignItems="center" spacing={2}>
          <SearchBar />
          <Button
            component={Link}
            to="/subscriptions"
            variant="contained"
            color="success"
          >
            Subscriptions
          </Button>
        </Stack>
      )}
    </Stack>
  );
};

export default Navbar;