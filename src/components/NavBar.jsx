import { Link } from "react-router-dom";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";
import TrophyIcon from "@mui/icons-material/EmojiEvents";

const navLinks = [
  { label: "Matchday List", to: "/" },
  { label: "Teams", to: "/teams" },
  { label: "Group Standings", to: "/groups" },
  { label: "Knockout Stages", to: "/standings" },
];

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "var(--dark-grey)",
        borderBottom: "3px solid var(--gold)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: { xs: 1, sm: 2 }, // smaller padding on mobile
        }}
      >
        <Typography variant="h4" component="div" fontWeight="bold">
          World Cup <span style={{ color: "var(--gold)" }}>2026</span> Tracker{" "}
          <TrophyIcon
            sx={{
              fontSize: "1em",
              verticalAlign: "middle",
              color: "var(--gold)",
            }}
          />
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              aria-label="Open navigation menu"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
            >
              <List
                sx={{
                  width: 200,
                  backgroundColor: "var(--dark-grey)",
                  height: "100%",
                  position: "relative",
                }}
              >
                <ListItem sx={{ marginBottom: "32px" }}>
                  <IconButton
                    aria-label="Close navigation menu"
                    onClick={() => setDrawerOpen(false)}
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      color: "white",
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </ListItem>
                <nav>
                  {navLinks.map((link) => (
                    <ListItem key={link.to} disablePadding>
                      <ListItemButton
                        sx={{
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          marginBottom: "8px",
                          "&:hover": {
                            color: "var(--gold)",
                            fontWeight: "bold",
                            transition: "color 0.1s, font-weight 0.1s",
                            backgroundColor: "transparent",
                          },
                        }}
                        component={Link}
                        to={link.to}
                        onClick={() => setDrawerOpen(false)}
                      >
                        <ListItemText
                          primary={link.label}
                          sx={{
                            color: "white",
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </nav>
              </List>
            </Drawer>
          </>
        ) : (
          <div>
            {navLinks.map((link) => (
              <Button
                key={link.to}
                color="inherit"
                component={Link}
                to={link.to}
                sx={{
                  "&:hover": {
                    color: "var(--gold)",
                    scale: "1.05",
                    textShadow: "0 0 5px var(--dark-black)",
                    backgroundColor: "transparent",
                    transition: "color 0.1s, scale 0.2s, text-shadow 0.1s",
                  },
                }}
              >
                {link.label}
              </Button>
            ))}
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
