import { NextSeo } from "next-seo";

import CustomDrawerBottom from "../../../components/adviser/drawerBottom";
import styles from "../../../styles/adviser/Adviser.module.css";

import { Button, IconButton } from "@mui/material";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AddIcon from "@mui/icons-material/Add";

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

export default function AdviserLibrary() {
	return (
		<>
			<NextSeo title="Library" />
			<CustomDrawerBottom pageTitle="Library">
				<div className={styles.container}>
					<div className="w-full flex justify-end items-center">
						<IconButton aria-label="filter">
							<FilterAltIcon />
						</IconButton>
						<Button variant="outlined" startIcon={<AddIcon />}>
							Add
						</Button>
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
