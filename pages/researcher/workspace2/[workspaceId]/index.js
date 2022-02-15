import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import CustomDrawerBottom from "../../../../components/researcher/drawerBottom";
import WorkspaceSelect from "../../../../components/researcher/workspaceSelect";

import styles from "../../../../styles/researcher/Workspace.module.css";
import { styled } from "@mui/material/styles";

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

import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";

import DialogComponent from "../../../../components/reusable/dialog";
import WorkspaceTabs from "../../../../components/researcher/workspaceTabs";

export default function WorkspaceTwoDetails() {
	const router = useRouter();
	console.log(router);

	//chip
	const handleClick = () => {
		console.info("You clicked the Chip.");
	};

	const chipItems = [
		{
			id: 1,
			label: "All",
		},
		{
			id: 2,
			label: "Ongoing",
		},
		{
			id: 3,
			label: "Submitted",
		},
		{
			id: 4,
			label: "Accepted",
		},
		{
			id: 5,
			label: "Rejected",
		},
		{
			id: 6,
			label: "Published",
		},
	];

	const cardItems = [
		{
			id: 1,
			fileId: 1,
			name: "File Name",
		},
		{
			id: 2,
			fileId: 2,
			name: "File Name",
		},
		{
			id: 3,
			fileId: 3,
			name: "File Name",
		},
	];

	const choices = [
		{
			id: 1,
			image: (
				<>
					<img
						alt="workspace"
						src="https://cdn-icons.flaticon.com/png/128/4546/premium/4546682.png?token=exp=1644829607~hmac=bec291a69d37a616a435f277e8d8e31e"
					/>
				</>
			),
			text: "Create File",
		},
		{
			id: 2,
			image: (
				<>
					<img
						alt="workspace"
						src="https://cdn-icons.flaticon.com/png/512/4701/premium/4701346.png?token=exp=1644829547~hmac=2ab6ab79f7dd03a6d2f6a0ca8543286b"
					/>
				</>
			),
			text: "Upload File",
		},
	];

	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<>
			<CustomDrawerBottom pageTitle="Inside Personal Workspace">
				<div className={styles.container}>
					<div className={styles.chips}>
						{chipItems.map((item) => (
							<Chip
								label={item.label}
								variant="outlined"
								onClick={handleClick}
							/>
						))}
					</div>

					<div className="mt-5 flex justify-end space-x-4">
						<DialogComponent
							title="Create File"
							button={
								<Tooltip title="Create File">
									<Fab color="secondary" aria-label="add">
										<AddIcon sx={{ width: "35px", height: "35px" }} />
									</Fab>
								</Tooltip>
							}
						>
							<div className={styles.parentTwo}>
								{choices.map((item) => (
									<div className={styles.item}>
										<div className={styles.card}>
											<div className={styles.cardImg}>{item.image}</div>
											<p className="text-center">{item.text}</p>
										</div>
									</div>
								))}
							</div>
						</DialogComponent>

						<DialogComponent
							title="Import File"
							button={
								<Tooltip title="Import File">
									<Fab color="secondary" aria-label="add">
										<ImportExportIcon sx={{ width: "35px", height: "35px" }} />
									</Fab>
								</Tooltip>
							}
						>
							<div className="bg-gray-300 flex justify-end mb-3">
								search bar
							</div>

							<div className="space-y-3">
								<div className={styles.cardTwo}>
									<div className="w-full flex space-x-5">
										<div className={styles.cardTwoImg}>
											<img
												alt="workspace"
												src="https://cdn-icons-png.flaticon.com/128/2942/2942912.png"
											/>
										</div>
										<div className="w-full">
											<p className="text-2xl text-gray-600 font-bold">
												File Name
											</p>

											<p className="text-sm text-gray-500 mb-3">
												Institution Name
											</p>

											<p className="text-sm line-clamp-3 text-justify">
												Lorem ipsum dolor sit amet, consectetur adipiscing elit.
												Aenean nec faucibus lectus. Sed pulvinar pretium justo,
												sit amet dictum dolor efficitur eget. Donec sed felis
												nec purus porttitor consequat sed at turpis. Vivamus
												lacinia, magna eget euismod ultrices, mauris neque
												mollis enim, ullamcorper volutpat lorem nisi eget leo.
												Morbi eu magna dui. Quisque sed feugiat tortor.
											</p>
										</div>
									</div>
								</div>
							</div>
						</DialogComponent>
					</div>

					<div className={styles.parent}>
						{cardItems.map((item) => (
							<Link
								key={item.fileId}
								href={`/researcher/workspace2/${item.id}/${item.fileId}`}
							>
								<div className={styles.item}>
									<div className={styles.card}>
										<div className={styles.cardImg}>
											<img
												alt="file"
												src="https://cdn-icons-png.flaticon.com/128/2942/2942912.png"
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
