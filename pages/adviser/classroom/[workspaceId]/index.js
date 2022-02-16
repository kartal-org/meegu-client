import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { styled } from "@mui/material/styles";

import CustomDrawerBottom from "../../../../components/adviser/drawerBottom";
import styles from "../../../../styles/adviser/Adviser.module.css";

import {
	Box,
	Button,
	Chip,
	IconButton,
	Tooltip,
	TabsList,
	TabPanel,
	Tabs,
	Tab,
	Fab,
} from "@mui/material";

import FilterAltIcon from "@mui/icons-material/FilterAlt";

export default function ClassroomWorkspace() {
	const router = useRouter();
	console.log(router);

	//chip
	const handleClick = () => {
		console.info("You clicked the Chip.");
	};

	const chips = [
		{
			id: 1,
			label: "Submissions",
		},
		{
			id: 2,
			label: "Recommendations",
		},
	];

	const items = [
		{
			id: 1,
			name: "File Name",
		},
		{
			id: 2,
			name: "File Name",
		},
	];

	return (
		<>
			<CustomDrawerBottom pageTitle="Inside Workspace">
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
											src="https://cdn-icons-png.flaticon.com/128/2942/2942912.png"
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
