/* eslint-disable no-unused-vars */
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
import useAdmin from "../hooks/useAdmin";
import useCategoryMessages from "../hooks/useCategoryMessages";
import { useMyOpenes, useSolvedes, useUnseens } from "../utils/CatagoryData";
const SupportLayout = () => {
  const { isModerator } = useIsModerator();
  // use loading stat to handle smooth facing
  <Loading data={isModerator} />;
  const [email, setEmail] = useState("");
  const { messages } = useSingleMessage(email);
  const { isAdmin } = useAdmin();

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
    padding: theme.spacing(0, 2),
    ...theme.mixins.toolbar,
  }));

  const DrawerHeaderWrapper = styled("div")(({ theme }) => ({
    minHeight: 50, // Set your desired height here
    padding: theme.spacing(0, 0),
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

  const [open, setOpen] = useState(true);
  const [selectedList, setSelectedList] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const { categoryMessages, refetch } =
    useCategoryMessages(selectedSubcategory);
  console.log(categoryMessages);
  useEffect(() => {
    refetch();
  }, [refetch]);
  const handleListClick = (to) => {
    setSelectedList(to);
  };
  const handleSubcategoryClick = (to) => {
    setSelectedSubcategory(to);
  };
  const { unSeen, unSeenRefetch } = useUnseens();
  const { myOpen, myOpenRefetch } = useMyOpenes();
  const { solved, solvedRefetch } = useSolvedes();
  useEffect(() => {
    unSeenRefetch();
    myOpenRefetch();
    solvedRefetch();
  }, [unSeenRefetch, myOpenRefetch, solvedRefetch]);
  if (!isModerator) {
    return <Loading data={isModerator} />;
  }

  return (
    <Box sx={{ display: "flex" }}>
      {isModerator?.isModerator && (
        <Drawer variant="permanent" open={true}>
          <List>
            {[
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
                  <p>{}</p>
                </Tooltip>
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}
      {isAdmin?.isAdmin && (
        <Drawer variant="permanent" open={true}>
          <List>
            {[
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
                  <p>{}</p>
                </Tooltip>
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}
      {isModerator?.isModerator && (
        <List variant="permanent" open={true}>
          {selectedList === "/support/chat" && (
            <DrawerHeaderWrapper>
              <DrawerHeader
                className="hover:cursor-pointer border-r border-gray-300 w-52"
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
                  {
                    icon: "👏",
                    name: "UnSeen",
                    to: "unSeen",
                    length: unSeen.length,
                  },
                  {
                    icon: "📊",
                    name: "My Open",
                    to: "myOpen",
                    length: myOpen.length,
                  },
                  {
                    icon: "✅",
                    name: "Solved",
                    to: "solved",
                    length: solved.length,
                  },
                ].map((text, index) => (
                  <ListItem
                    key={text}
                    disablePadding
                    sx={{
                      width: "full",
                      borderBottom: "1px solid #ccc",
                    }}
                  >
                    <NavLink
                      onClick={() => handleSubcategoryClick(text.to)}
                      to={`/support/${text.to}`}
                      className="w-full"
                    >
                      <ListItemButton
                        sx={{
                          minHeight: 48,
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
                        <div className="badge badge-accent">{text.length}</div>
                      </ListItemButton>
                    </NavLink>
                  </ListItem>
                ))}
              {/* <List>
              <ModaretorChat
                subCategory={subCategory}
                refetches={refetch}
                setEmail={setEmail}
              />
            </List> */}
            </List>
          )}
        </List>
      )}
      {isAdmin?.isAdmin && (
        <List variant="permanent" open={true}>
          {selectedList === "/support/chat" && (
            <DrawerHeaderWrapper>
              <DrawerHeader
                className="hover:cursor-pointer border-r border-gray-300 w-52"
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
                isAdmin?.isAdmin &&
                [
                  {
                    icon: "👏",
                    name: "UnSeen",
                    to: "unSeen",
                    length: unSeen.length,
                  },
                  {
                    icon: "📊",
                    name: "My Open",
                    to: "myOpen",
                    length: myOpen.length,
                  },
                  {
                    icon: "✅",
                    name: "Solved",
                    to: "solved",
                    length: solved.length,
                  },
                ].map((text, index) => (
                  <ListItem
                    key={text}
                    disablePadding
                    sx={{
                      width: "full",
                      borderBottom: "1px solid #ccc",
                    }}
                  >
                    <NavLink
                      onClick={() => handleSubcategoryClick(text.to)}
                      to={`/support/${text.to}`}
                      className="w-full"
                    >
                      <ListItemButton
                        sx={{
                          minHeight: 48,
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
                        <div className="badge badge-accent">{text.length}</div>
                      </ListItemButton>
                    </NavLink>
                  </ListItem>
                ))}
              {/* <List>
              <ModaretorChat
                subCategory={subCategory}
                refetches={refetch}
                setEmail={setEmail}
              />
            </List> */}
            </List>
          )}
        </List>
      )}

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography>
          <Outlet></Outlet>
        </Typography>
      </Box>
    </Box>
  );
};

export default SupportLayout;
