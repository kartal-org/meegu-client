import { NextSeo } from "next-seo";
import Link from "next/link";
import { useRouter } from "next/router";
import { styled, alpha } from "@mui/material/styles";

import CustomDrawerBottom from "../../../components/adviser/drawerBottom";
import styles from "../../../styles/adviser/Adviser.module.css";

import {
	Chip,
	InputBase,
	Avatar,
	Divider,
	IconButton,
	TextField,
} from "@mui/material";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineEllipsis } from "react-icons/ai";
import { AiOutlineSend } from "react-icons/ai";

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

export default function Messages() {
	const contacts = [
		{
			id: 1,
			name: "Maria Thania Sinogaya",
			message:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aeneannec faucibus lectus. Sed pulvinar pretium justo, sit amet dictum",
		},
		{
			id: 2,
			name: "Maria Thania Sinogaya",
			message:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aeneannec faucibus lectus. Sed pulvinar pretium justo, sit amet dictum",
		},
	];

	const convo = [
		{
			id: 1,
			name: "Maria Thania Sinogaya",
			message: "aksjdgkgj aksjdgakrslgjrw aklsjgasklgjasgkj",
		},
		{
			id: 2,
			name: "Maria Thania Sinogaya",
			message: "aksjdgkgj aksjdgakrslgjrw aklsjgasklgjasgkj",
		},
	];
	return (
		<>
			<NextSeo title="Messages" />
			<CustomDrawerBottom pageTitle="Messages">
				<div className={styles.container}>
					<div className={styles.layout}>
						<div className={styles.messages}>
							<div className={styles.messageHead}>
								<div className="flex items-center">
									<p className="text-3xl font-bold text-gray-600">Room Name</p>
								</div>
								<div className="flex justify-end items-center">
									<IconButton>
										<AiOutlineEllipsis />
									</IconButton>
								</div>
							</div>

							<div className={styles.convoLayout}>
								<div className="">
									<div
										className="p-3 overflow-y-auto"
										style={{ maxHeight: "340px", minHeight: "340px" }}
									>
										{convo.map((item) => (
											<div className="">
												<div className={styles.convoCard}>
													<div className={styles.convoDetail}>
														<div className="flex justify-center">
															<Avatar
																alt="Remy Sharp"
																sx={{ width: "40px", height: "40px" }}
																src="https://images.unsplash.com/photo-1613679074971-91fc27180061?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
															/>
														</div>
														<div className="">
															<p className="text-gray-600 font-bold">
																{item.name}
															</p>
															<p className="mt-1 text-xs">{item.message}</p>
														</div>
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
								<div className={styles.inputLayout}>
									<div className="p-2 flex items-center">
										<TextField
											id="outlined-multiline-static"
											multiline
											rows={2}
											sx={{ width: "100%" }}
										/>
									</div>
									<div className="flex items-center p-2 justify-center">
										<IconButton>
											<AiOutlineSend />
										</IconButton>
									</div>
								</div>
							</div>
						</div>

						<div className={styles.contacts}>
							<div className="mb-3">
								<Search>
									<SearchIconWrapper>
										<AiOutlineSearch />
									</SearchIconWrapper>
									<StyledInputBase
										placeholder="Search…"
										inputProps={{ "aria-label": "search" }}
									/>
								</Search>
							</div>
							<div
								className="overflow-y-auto p-3"
								style={{ maxHeight: "500px", minHeight: "500px" }}
							>
								{contacts.map((item) => (
									<Link key={item.id} href={`/researcher/messages/${item.id}`}>
										<div className="">
											<div className={styles.contactCard}>
												<div className={styles.contactDetail}>
													<div className="flex justify-center">
														<Avatar
															alt="Remy Sharp"
															sx={{ width: "60px", height: "60px" }}
															src="https://images.unsplash.com/photo-1613679074971-91fc27180061?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
														/>
													</div>
													<div className="">
														<p className="text-gray-600 font-bold">
															{item.name}
														</p>
														<p className="mt-1 text-xs line-clamp-2">
															{item.message}
														</p>
													</div>
												</div>
											</div>
											<Divider sx={{ m: 1 }} />
										</div>
									</Link>
								))}
							</div>
						</div>
					</div>
				</div>
			</CustomDrawerBottom>
		</>
	);
}
