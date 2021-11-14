import React from "react";

import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

import HomeIcon from "@mui/icons-material/Home";
import MicIcon from "@mui/icons-material/Mic";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PersonIcon from "@mui/icons-material/Person";

import styled from "styled-components";

const drawerWidth = 78;

export const Layout = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Container>
      {/* NavBar */}
      <AppBar
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          background: "#040404",
        }}
      >
        <Toolbar>
          <WrapContent>
            <Button
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{
                color: "#ffffff",
              }}
            >
              <PersonIcon />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              sx={{
                "& .MuiPaper-root": {
                  background: "#040404",
                  color: "#ffffff",
                },
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </WrapContent>
        </Toolbar>
      </AppBar>
      {/* SideBar */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "#040404",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <WrapLinks>
          <img src="https://rb.gy/xkacau" alt="logo" />
          <Link>
            <HomeIcon />
          </Link>
          <Link>
            <MicIcon />
          </Link>
          <Link>
            <LibraryMusicIcon />
          </Link>
          <Link>
            <PlaylistAddIcon />
          </Link>
        </WrapLinks>
      </Drawer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

const WrapLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    padding: 0;
    width: 70px;
    max-height: 65px;
    font-size: 0;
    cursor: pointer;
    display: inline-block;
  }
`;

const Link = styled.a`
  cursor: pointer;
  margin-top: 25px;
  margin-bottom: 20px;
`;

const WrapContent = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;
