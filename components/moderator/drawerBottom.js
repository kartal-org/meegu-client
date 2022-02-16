import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import Link from "next/link";
import {
	Box,
	CssBaseline,
	Toolbar,
	Typography,
	Divider,
	IconButton,
	List,
	ListItemButton,
	ListItemIcon,
	ListItem,
	ListItemText,
	Tooltip,
	Fab,
	Paper,
	BottomNavigation,
	BottomNavigationAction,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";

import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineCompass } from "react-icons/ai";
import { AiOutlineRead } from "react-icons/ai";
import { AiOutlineBank } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";
import PrimarySearchAppBar from "./toolbar";

const StyledFab = styled(Fab)({
	position: "absolute",
	zIndex: 1,
	top: -30,
	left: 0,
	right: 0,
	margin: "0 auto",
});

export default function CustomDrawerBottom(props) {
	const router = useRouter();
	const { pageTitle } = props;

	const navs = [
		{
			text: "Home",
			icon: <AiOutlineHome className="w-7 h-7" />,
			value: "home",
			path: "/moderator/home",
		},
		{
			text: "Library",
			icon: <AiOutlineRead className="w-7 h-7 " />,
			value: "library",
			path: "/moderator/library",
		},
		{
			text: "Institution",
			icon: <AiOutlineBank className="w-7 h-7 " />,
			value: "institution",
			path: "/moderator/institution",
		},
		{
			text: "Discover",
			icon: <AiOutlineCompass className="w-7 h-7 " />,
			value: "discover",
			path: "/moderator/discover",
		},
		{
			text: "Messages",
			icon: <AiOutlineComment className="w-7 h-7 " />,
			valkue: "messages",
			path: "/moderator/messages",
		},
	];

	return (
		<>
			<Box sx={{ display: "flex" }}>
				<CssBaseline />
				<Box
					component="main"
					sx={{
						flexGrow: 1,
						p: 3,
						minHeight: "100vh",
					}}
				>
					<PrimarySearchAppBar>
						<Typography
							variant="h6"
							noWrap
							component="div"
							sx={{ marginLeft: "10px", color: "rgba(55, 65, 81, 1)" }}
						>
							{pageTitle}
						</Typography>
					</PrimarySearchAppBar>
					{props.children}
				</Box>
				<MuiAppBar
					position="fixed"
					elevation={0}
					color="transparent"
					sx={{
						top: "auto",
						bottom: 30,
						alignItems: "center",
						// bgcolor: "white",
					}}
				>
					<List
						sx={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
							bgcolor: "#e6e6e6",
							borderRadius: "20px",
						}}
					>
						{navs.map((item, index) => (
							<Link href={item.path}>
								<Tooltip title={item.text} placement="top" sx={{ m: 1 }}>
									{item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
								</Tooltip>
							</Link>
						))}
					</List>
				</MuiAppBar>
			</Box>
		</>
	);
}
