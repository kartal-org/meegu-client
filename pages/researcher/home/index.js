import React from "react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

import CustomDrawerBottom from "../../../components/researcher/drawerBottom";
import styles from "../../../styles/researcher/Workspace.module.css";

import { Chip } from "@mui/material";

export default function Home() {
	const router = useRouter();
	console.log(router);

	//chip
	const handleClick = () => {
		console.info("You clicked the Chip.");
	};

	const chips = [
		{
			id: 1,
			label: "All",
		},
		{
			id: 2,
			label: "Education",
		},
		{
			id: 3,
			label: "Science",
		},
		{
			id: 4,
			label: "Technology",
		},
	];

	const items = [
		{
			id: 1,
			name: "Workspace Name",
		},
		{
			id: 2,
			name: "Workspace Name",
		},
		{
			id: 3,
			name: "Workspace Name",
		},
		{
			id: 4,
			name: "Workspace Name",
		},
		{
			id: 5,
			name: "Workspace Name",
		},
		{
			id: 6,
			name: "Workspace Name",
		},
		{
			id: 7,
			name: "Workspace Name",
		},
	];

	return (
		<>
			<NextSeo title="Home" />
			<CustomDrawerBottom pageTitle="Home">
				<div className={styles.container}>
					<div className={styles.chips}>
						{chips.map((item) => (
							<Chip
								label={item.label}
								variant="outlined"
								onClick={handleClick}
							/>
						))}
					</div>

					<div className={styles.parent}>
						{items.map((item) => (
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
						))}
					</div>
				</div>
			</CustomDrawerBottom>
		</>
	);
}
