import useAdmin from "../hooks/useAdmin";
import { useEffect, useState } from "react";
import useSingleMessage from "../hooks/useSingleMessage";
import MessageSidebar from "../componnents/AdminMessage/MessageSidebar";
import AdminMainChat from "../componnents/AdminMessage/AdminMainChat";
/* eslint-disable react/no-unescaped-entities */
import { Link, NavLink, useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { Tooltip } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { MdHome, MdPlayArrow } from "react-icons/md";
import { MdMoveToInbox } from "react-icons/md";
import { IoMdPeople } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";
import { SiChatbot } from "react-icons/si";
import useIsModerator from "../hooks/useIsModerator";
import Loading from "../componnents/loading/Loading";
import { Outlet } from "react-router-dom";
const SupportLayout = () => {
  // received isAdmin from src/hooks/useAdmin file
  const { isAdmin } = useAdmin();
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
    padding: theme.spacing(0, 0),
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
  const [open, setOpen] = useState(true);

  const [selectedList, setSelectedList] = useState("");

  const handleListClick = (to) => {
    setSelectedList(to);
  };

  if (!isModerator) {
    return <Loading data={isModerator} />;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer variant="permanent" open={true}>
        <List>
          {isModerator?.isModerator &&
            [
              { icon: <MdHome />, to: "/support/home", tooltip: "Home" },
              { icon: <MdMoveToInbox />, to: "/support/chat", tooltip: "Chat" },
              {
                icon: <IoMdPeople />,
                to: "/support/people",
                tooltip: "People",
              },
              { icon: <MdOutlineMail />, to: "/support/spam", tooltip: "Spam" },
              {
                icon: <SiChatbot />,
                to: "/support/AiChat",
                tooltip: "AI Chat",
              },
            ].map((text) => (
              <ListItem key={text.to} disablePadding sx={{ display: "block" }}>
                <Tooltip title={text.tooltip} placement="right">
                  <NavLink
                    to={text.to}
                    className={`bg-[#0066FF]`}
                    onClick={() => handleListClick(text.to)}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 52,
                        justifyContent: "initial",
                        px: 2.5,
                        transition: "opacity 0.5s ease",
                        backgroundColor:
                          selectedList === text.to ? "#0066FF " : "",
                        text: selectedList === text.to ? "#FFF " : "",
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
                </Tooltip>
              </ListItem>
            ))}
        </List>
        {/* <List className="lg:hidden">
          <MessageSidebar refetches={refetch} setEmail={setEmail} />
        </List> */}
      </Drawer>
      <List variant="permanent" open={true}>
        {selectedList === "/support/chat" && (
          <DrawerHeaderWrapper>
            <DrawerHeader
              className="hover:cursor-pointer "
              onClick={() => setOpen(!open)}
            >
              <MdPlayArrow
                className={`text-xl transition-all duration-200 ${
                  open ? "rotate-90" : ""
                }`}
              ></MdPlayArrow>
              <p className="font-cursive uppercase text-xl ml-2 ">Inbox</p>
            </DrawerHeader>
          </DrawerHeaderWrapper>
        )}
        <Divider />

        {selectedList === "/support/chat" && (
          <List className="border-r border-gray-300">
            {open &&
              isModerator?.isModerator &&
              [
                { icon: "👏", name: "UnSeen", to: "unSeen" },
                { icon: "📊", name: "My Open", to: "myOpen" },
                { icon: "✅", name: "Solved", to: "solved" },
              ].map((text, index) => (
                <ListItem
                  key={text}
                  disablePadding
                  sx={{
                    width: "225px",
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  <Link to={text.to}>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: "initial",
                        px: 1.5,
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
                  </Link>
                </ListItem>
              ))}
            <List></List>
          </List>
        )}
      </List>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography>
          {selectedList === "/support/chat" ? (
            <AdminMainChat messages={messages} refetch={refetch} />
          ) : (
            <Outlet></Outlet>
          )}
        </Typography>
      </Box>
    </Box>
  );
};

export default SupportLayout;
