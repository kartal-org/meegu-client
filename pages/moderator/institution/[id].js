import { NextSeo } from "next-seo";

import CustomDrawerBottom from "../../../components/moderator/drawerBottom";
import InstitutionTabs from "../../../components/moderator/institutionTabs";
import styles from "../../../styles/moderator/Moderator.module.css";

import { Avatar, IconButton, Chip, Button } from "@mui/material";

import { AiOutlineSetting } from "react-icons/ai";

export default function InstitutionDetails() {
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
	return (
		<>
			<NextSeo title="Institution" />
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
					<InstitutionTabs>
						{/* <div className={styles.detailsLayout}>
							<div className="bg-red-100">alksdjf</div>

							<div className="">
								<div className="flex justify-end mb-5">
									<Button variant="outlined">Add Article</Button>
								</div>

								<div className="space-y-3">
									{depts.map((item) => (
										<div className={styles.deptCard}>{item.name}</div>
									))}
								</div>
							</div>
						</div> */}
					</InstitutionTabs>
				</div>
			</CustomDrawerBottom>
		</>
	);
}
