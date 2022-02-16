import { NextSeo } from "next-seo";
import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";

import CustomDrawerBottom from "../../../../components/moderator/drawerBottom";
import InstitutionTabs from "../../../../components/moderator/institutionTabs";
import styles from "../../../../styles/moderator/Moderator.module.css";

import {
	Avatar,
	IconButton,
	Chip,
	Button,
	Rating,
	Typography,
	InputBase,
} from "@mui/material";

import { AiOutlineSetting } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.25),
	"&:hover": {
		backgroundColor: "#f2f2f2",
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

export default function People() {
	const [value, setValue] = useState(4);

	const depts = [
		{
			id: 1,
			name: "BS Information Technology",
		},
		{
			id: 2,
			name: "BS Political Science",
		},
		{
			id: 3,
			name: "BS Civil Engineering",
		},
	];

	const people = [
		{
			id: 1,
			name: "Maria Teresita Consolidad",
			role: "Member",
		},
		{
			id: 2,
			name: "Maria Teresita Consolidad",
			role: "Member",
		},
		{
			id: 3,
			name: "Maria Teresita Consolidad",
			role: "Member",
		},
	];

	const cards = [
		{
			id: 1,
			name: "File Name",
			institutionName: "Cebu Technological University - MC",
			content:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit.Aliquam finibus nibh eu nibh vestibulum, vel vulputatetortor ornare. Fusce dolor lacus, rutrum ut ligula eget,ornare commodo eros. Nunc non mauris facilisis, auctor leoa, molestie libero. Pellentesque gravida lorem vulputnisi aliquam ornare. Proin felis nibh, blandit non sapienut, dignissim pellentesque magna. ",
		},
		{
			id: 2,
			name: "File Name",
			institutionName: "Cebu Technological University - MC",
			content:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit.Aliquam finibus nibh eu nibh vestibulum, vel vulputatetortor ornare. Fusce dolor lacus, rutrum ut ligula eget,ornare commodo eros. Nunc non mauris facilisis, auctor leoa, molestie libero. Pellentesque gravida lorem vulputnisi aliquam ornare. Proin felis nibh, blandit non sapienut, dignissim pellentesque magna. ",
		},
		{
			id: 3,
			name: "File Name",
			institutionName: "Cebu Technological University - MC",
			content:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit.Aliquam finibus nibh eu nibh vestibulum, vel vulputatetortor ornare. Fusce dolor lacus, rutrum ut ligula eget,ornare commodo eros. Nunc non mauris facilisis, auctor leoa, molestie libero. Pellentesque gravida lorem vulputnisi aliquam ornare. Proin felis nibh, blandit non sapienut, dignissim pellentesque magna. ",
		},
		{
			id: 4,
			name: "File Name",
			institutionName: "Cebu Technological University - MC",
			content:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit.Aliquam finibus nibh eu nibh vestibulum, vel vulputatetortor ornare. Fusce dolor lacus, rutrum ut ligula eget,ornare commodo eros. Nunc non mauris facilisis, auctor leoa, molestie libero. Pellentesque gravida lorem vulputnisi aliquam ornare. Proin felis nibh, blandit non sapienut, dignissim pellentesque magna. ",
		},
	];
	return (
		<>
			<NextSeo title="People" />
			<CustomDrawerBottom pageTitle="Institution">
				<div className={styles.container}>
					<div className={styles.infoCover}>asdgh</div>
					<div className={styles.infoLayout}>
						<div className="flex items-center justify-center">
							<Avatar
								alt="Remy Sharp"
								sx={{ width: "70px", height: "70px" }}
								src="https://images.unsplash.com/photo-1613679074971-91fc27180061?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
							/>
						</div>
						<div className="">
							<div className="flex items-center">
								<p className="text-xl font-semibold text-gray-600">John Doe</p>
							</div>

							<p className="mt-1 text-xs text-gray-400 line-clamp-2">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
								nec faucibus lectus. Sed pulvinar pretium justo, sit amet dictum
								dolor efficitur eget.
							</p>
						</div>
						<div className="flex items-center justify-end">
							<IconButton>
								<AiOutlineSetting />
							</IconButton>
						</div>
					</div>
					<InstitutionTabs activeTab="people">
						<div className="flex justify-end space-x-3 mb-5">
							<p className="bg-white flex items-center">
								<IconButton>
									<AddCircleOutlineIcon />
								</IconButton>
							</p>
							<p className="flex items-center">
								<Search>
									<SearchIconWrapper>
										<AiOutlineSearch />
									</SearchIconWrapper>
									<StyledInputBase
										placeholder="Search…"
										inputProps={{ "aria-label": "search" }}
									/>
								</Search>
							</p>
							<p className="flex items-center">
								{" "}
								<IconButton>
									<FilterAltIcon />
								</IconButton>
							</p>
						</div>

						<div className={styles.peopleParent}>
							{people.map((item) => (
								<div className={styles.peopleCard}>
									<div className="">
										<Avatar
											alt="Remy Sharp"
											src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
										/>
									</div>
									<div className="">
										<p className="font-semibold">{item.name}</p>
										<p className="text-sm">{item.role}</p>
									</div>
								</div>
							))}
						</div>
					</InstitutionTabs>
				</div>
			</CustomDrawerBottom>
		</>
	);
}
