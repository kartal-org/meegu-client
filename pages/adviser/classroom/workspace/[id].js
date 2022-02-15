import CustomDrawer from "../../../../components/adviser/drawer";
import ClassroomWorkspaceTabs from "../../../../components/adviser/ClassroomWorkspaceTabs";
import DialogComponent from "../../../../components/reusable/dialog";
import CardHolder from "../../../../components/reusable/cardholder";

import { useRouter } from "next/router";
import React, { useState } from "react";

import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Tooltip,
	Fab,
	TablePagination,
	IconButton,
	Button,
	TextField,
	Divider,
	Chip,
	Avatar,
	InputBase,
	Card,
	Slide,
	AppBar,
	Toolbar,
	Dialog,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";

import { MdOutlineCommentBank } from "react-icons/md";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { CgImport } from "react-icons/cg";

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: "#f7f3f0",
	"&:hover": {
		backgroundColor: "#f7f3f0",
	},
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(1),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "12ch",
			"&:focus": {
				width: "20ch",
			},
		},
	},
}));

export default function ClassroomWorkspaceDetail(props) {
	const router = useRouter();
	console.log(router);

	return (
		<>
			<CustomDrawer pageTitle="Workspaces">
				<ClassroomWorkspaceTabs activeTab="workspaces"></ClassroomWorkspaceTabs>
				sdg
			</CustomDrawer>
		</>
	);
}
