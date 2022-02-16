import { NextSeo } from "next-seo";
import { styled, alpha } from "@mui/material/styles";
import { useRouter } from "next/router";
import Link from "next/link";

import CustomDrawerBottom from "../../../components/adviser/drawerBottom";
import styles from "../../../styles/adviser/Adviser.module.css";

import { Button, IconButton, InputBase } from "@mui/material";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { AiOutlineSearch } from "react-icons/ai";

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

export default function Classroom() {
	const router = useRouter();
	console.log(router);

	const items = [
		{
			id: 1,
			name: "Workspace Name",
		},
		{
			id: 2,
			name: "Workspace Name",
		},
	];
	return (
		<>
			<NextSeo title="Classroom" />
			<CustomDrawerBottom pageTitle="Classroom">
				<div className={styles.container}>
					<div className="w-full flex justify-between items-center">
						<Search>
							<SearchIconWrapper>
								<AiOutlineSearch />
							</SearchIconWrapper>
							<StyledInputBase
								placeholder="Search…"
								inputProps={{ "aria-label": "search" }}
							/>
						</Search>

						<IconButton aria-label="filter">
							<FilterAltIcon />
						</IconButton>
					</div>
					<div className={styles.parent}>
						{items.map((item) => (
							<Link key={item.id} href={`/adviser/classroom/${item.id}`}>
								<div className={styles.item}>
									<div className={styles.card}>
										<div className={styles.cardImg}>
											<img
												alt="workspace"
												src="https://cdn-icons.flaticon.com/png/128/3162/premium/3162618.png?token=exp=1644814694~hmac=4ad6993daeb8b7fb8ade683c86c4f350"
											/>
										</div>
										<p className="text-center">{item.name}</p>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			</CustomDrawerBottom>
		</>
	);
}
