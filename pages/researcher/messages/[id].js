import { NextSeo } from "next-seo";

import CustomDrawerBottom from "../../../components/researcher/drawerBottom";
import styles from "../../../styles/researcher/Workspace.module.css";

import { Avatar, IconButton, Chip } from "@mui/material";

import { AiOutlineSetting } from "react-icons/ai";

export default function ContactInformation() {
	//chip
	const handleClick = () => {
		console.info("You clicked the Chip.");
	};

	const chips = [
		{
			id: 1,
			label: "Information",
		},
		{
			id: 2,
			label: "Works",
		},
	];

	return (
		<>
			<NextSeo title="Messages" />
			<CustomDrawerBottom pageTitle="Messages">
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
								<p className="text-xs text-gray-400 ml-3 mr-1">┃</p>
								<p className="text-xs text-gray-400">Researcher</p>
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

					<div className="">
						<div className={styles.chips}>
							{chips.map((item) => (
								<Chip
									label={item.label}
									variant="outlined"
									onClick={handleClick}
								/>
							))}
						</div>

						<div className="border-2 border-gray-300 p-3 mt-5 rounded-md">
							details
						</div>
					</div>
				</div>
			</CustomDrawerBottom>
		</>
	);
}
