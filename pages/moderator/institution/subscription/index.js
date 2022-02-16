import { NextSeo } from "next-seo";
import { useState } from "react";
import { Doughnut } from "react-chartjs-2";

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
} from "@mui/material";

import { AiOutlineSetting } from "react-icons/ai";

export default function Subscription() {
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

	return (
		<>
			<NextSeo title="Subscription" />
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
					<InstitutionTabs activeTab="subscription">
						<div className={styles.subscriptionLayout}>
							<div className="bg-green-100 p-3">
								chart here
								{/* <Doughnut
									height={400}
									width={400}
									data={{
										labels: ["Used", "Free"],
										datasets: [
											{
												label: "Storage",
												data: [80, 20],
												backgroundColor: ["yellow", "blue"],
											},
										],
									}}
								/> */}
							</div>

							<div className="">
								<div className={styles.subscriptionCard}>
									<p className="text-gray-400 text-sm">Current Subscription</p>
									<p className="text-white font-semibold text-xl">
										Current Subscription Name
									</p>

									<div className="mt-3 flex justify-end items-center">
										<Button variant="contained">See transactions</Button>
									</div>
								</div>
							</div>
						</div>
					</InstitutionTabs>
				</div>
			</CustomDrawerBottom>
		</>
	);
}
