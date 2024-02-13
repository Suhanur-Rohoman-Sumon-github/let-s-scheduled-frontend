import useAdmin from "../hooks/useAdmin";
import Loading from "../componnents/loading/Loading";
import { useEffect, useState } from "react";
import useSingleMessage from "../hooks/useSingleMessage";
import MessageSidebar from "../componnents/AdminMessage/MessageSidebar";
import AdminMainChat from "../componnents/AdminMessage/AdminMainChat";
/* eslint-disable react/no-unescaped-entities */
import { NavLink, Outlet } from "react-router-dom";
import { adminDashBoardNavData, userDashBoardNavData } from "../data/Data";
import { MdMessage } from "react-icons/md";
import { PiHandsClappingLight } from "react-icons/pi";

import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { MdHome } from "react-icons/md";
import { MdMoveToInbox } from "react-icons/md";
import { IoMdPeople } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";
import { SiChatbot } from "react-icons/si";
import useIsModerator from "../hooks/useIsModerator";

const SupportLayout = () => {
  // received isAdmin from src/hooks/useAdmin file

  const { isModerator } = useIsModerator();
  // use loading stat to handle smooth facing
  <Loading data={isModerator} />;
  const [email, setEmail] = useState("");
  const { messages, refetch } = useSingleMessage(email);

  useEffect(() => {
    refetch();
  }, [email, refetch]);

  const drawerWidth = 60;

  const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
    transitionDelay: "0.5s", // Adjust the delay as needed
  });

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));

  const DrawerHeaderWrapper = styled("div")(({ theme }) => ({
    minHeight: 50, // Set your desired height here
    padding: theme.spacing(0, 1),
    marginTop: -10,
  }));

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }));

  const theme = useTheme();

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer variant="permanent" open={true}>
        <List>
          {isModerator?.isModerator &&
            [
              { icon: <MdHome></MdHome>, to: "/support/home" },
              { icon: <MdMoveToInbox></MdMoveToInbox> },
              { icon: <IoMdPeople></IoMdPeople> },
              { icon: <MdOutlineMail></MdOutlineMail> },
              { icon: <SiChatbot></SiChatbot> },
            ].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <NavLink to={text.to} className="bg-gray-500">
                  <ListItemButton
                    sx={{
                      minHeight: 52,
                      justifyContent: "initial",
                      px: 2.5,
                      transition: "opacity 0.5s ease",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: 3,
                        justifyContent: "center",
                        fontSize: "24px",
                      }}
                    >
                      {text.icon}
                    </ListItemIcon>
                  </ListItemButton>
                </NavLink>
              </ListItem>
            ))}
        </List>
        <List className="lg:hidden">
          <MessageSidebar refetches={refetch} setEmail={setEmail} />
        </List>
      </Drawer>
      <List variant="permanent" open={true}>
        <DrawerHeaderWrapper>
          <DrawerHeader>
            <p className="text-center font-cursive uppercase text-xl">Inbox</p>
          </DrawerHeader>
        </DrawerHeaderWrapper>
        <Divider />

        <List>
          {isModerator?.isModerator &&
            [
              { icon: "👏", name: "UnSeen", to: "" },
              { icon: "📊", name: "My Open", to: "" },
              { icon: "✅", name: "Solved", to: "" },
            ].map((text, index) => (
              <ListItem
                key={text}
                disablePadding
                sx={{
                  display: "block",
                  width: "250px",
                  borderBottom: "1px solid #ccc",
                }}
              >
                <NavLink to={text.to}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: "initial",
                      px: 2.5,
                      transition: "opacity 0.5s ease",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: 3,
                        justifyContent: "center",
                      }}
                    >
                      {text.icon}
                    </ListItemIcon>
                    <ListItemText primary={text.name} />
                  </ListItemButton>
                </NavLink>
              </ListItem>
            ))}
        </List>
        <List className="lg:hidden">
          <MessageSidebar refetches={refetch} setEmail={setEmail} />
        </List>
      </List>
      <List className="hidden lg:flex">
        <MessageSidebar refetches={refetch} setEmail={setEmail} />
      </List>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography>
          <AdminMainChat messages={messages} refetch={refetch} />
        </Typography>
      </Box>
    </Box>
  );
};

export default SupportLayout;
