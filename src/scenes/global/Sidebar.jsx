import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";
import { tokens } from "../../Theme";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import img from "../../../public/R.gif";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const animateMenu = {
  initial: { x: -300, y: -20 },
  final: { x: 0, y: 0 },
  transition: { damping: 10, bounce: 0.6 },
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 1200);
  const [selected, setSelected] = useState("Dashboard");

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth <= 1200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const dataItems = [
    { title: "Manage team", to: "/team", icon: PeopleAltOutlinedIcon },
    { title: "Contacts", to: "/contacts", icon: ContactsOutlinedIcon },
    {
      title: "Invoices balances",
      to: "/invoices",
      icon: ReceiptLongOutlinedIcon,
    },
  ];
  const pagesItems = [
    { title: "Profile form", to: "/form", icon: PersonOutlineOutlinedIcon },
    { title: "Calendar", to: "/calendar", icon: CalendarMonthOutlinedIcon },
    { title: "FAQ page", to: "/faq", icon: HelpOutlineOutlinedIcon },
  ];
  const chartItems = [
    { title: "Bar chart", to: "/bar", icon: InsertChartOutlinedIcon },
    { title: "Pie chart", to: "/pie", icon: PieChartOutlineOutlinedIcon },
    { title: "Line chart", to: "/line", icon: TimelineOutlinedIcon },
    { title: "Geography chart", to: "/geography", icon: MapOutlinedIcon },
  ];

  const renderCategory = (items, title, delay, iconSize) => {
    return (
      <motion.div
        variants={animateMenu}
        initial="initial"
        animate="final"
        transition={{ delay, damping: 10 }}
      >
        <Typography
          variant="h6"
          className={`${isCollapsed ? "hidden" : ""}`}
          color={colors.blueAccent[400]}
          fontWeight="bold"
          fontSize={"1rem"}
        >
          {title}
        </Typography>

        {items.map((data, index) => (
          <Item
            key={index}
            title={data.title}
            to={data.to}
            icon={<data.icon sx={{ fontSize: iconSize }} />}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </motion.div>
    );
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 25px 0px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
      className="h-screen"
    >
      <ProSidebar collapsed={isCollapsed} width={250} className="">
        <Menu iconShape="square">
          {/* Menu button and user name */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={
              isCollapsed ? (
                <MenuOutlinedIcon
                  sx={{ fontSize: "2rem", color: colors.grey[300] }}
                />
              ) : undefined
            }
            className={`${isCollapsed ? "" : "ml-1"} text-${colors.grey[100]}`}
          >
            {!isCollapsed && (
              <Box className="flex justify-between items-center">
                <Typography variant="h3" color={colors.grey[100]}>
                  ASSASSIN
                </Typography>

                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon
                    sx={{ fontSize: "1.7rem", color: colors.grey[300] }}
                  />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* Avatar and name */}
          {!isCollapsed && (
            <Box className="flex flex-col items-center justify-center mt-5">
              <Box
                className={`rounded-full overflow-hidden hover:shadow-lg hover:shadow-slate-400/50`}
              >
                <img src={img} className="w-[120px] h-[75px]" />
              </Box>
              <Box
                className={`flex flex-col items-center justify-center gap-y-1 mt-3`}
              >
                <Typography variant="h2" color={colors.grey[100]}>
                  Youcef Jr
                </Typography>
                <Typography
                  variant="h5"
                  color={colors.greenAccent[500]}
                  fontWeight="bold"
                >
                  Trying to figure it out
                </Typography>
              </Box>
            </Box>
          )}

          {/* Menu items */}
          <motion.div
            className={`flex flex-col justify-between ${
              isCollapsed ? "mt-[4rem]" : "px-[10%] pt-[8%]"
            } space-y-7`}
            variants={animateMenu}
            initial="initial"
            animate="final"
            transition="transition"
          >
            <motion.div
              variants={animateMenu}
              initial="initial"
              animate="final"
              transition={{ delay: 0.1 }}
            >
              <Item
                title={isCollapsed ? "" : "Dashboard"}
                to="/"
                icon={<HomeOutlinedIcon sx={{ fontSize: "1.7rem" }} />}
                selected={selected}
                setSelected={setSelected}
                fontSize="large"
              />
            </motion.div>

            {renderCategory(dataItems, "Data", 0.15, "1.4rem")}
            {renderCategory(pagesItems, "Pages", 0.2, "1.4rem")}
            {renderCategory(chartItems, "Charts", 0.25, "1.4rem")}
          </motion.div>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
