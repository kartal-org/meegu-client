import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

import CustomDrawerBottom from "../../../components/moderator/drawerBottom";
import styles from "../../../styles/moderator/Moderator.module.css";

import {
	IconButton,
	Button,
	MenuItem,
	FormControl,
	Select,
} from "@mui/material";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AddIcon from "@mui/icons-material/Add";

export default function Institution() {
	const [value, setValue] = useState("");

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	const items = [
		{
			id: 1,
			name: "Institution Name",
		},
		{
			id: 2,
			name: "Institution Name",
		},
	];

	return (
		<>
			<NextSeo title="Institution" />
			<CustomDrawerBottom pageTitle="Institution">
				<div className={styles.container}>
					<div className={styles.headOne}>
						<div className="">
							<div className="">
								<FormControl sx={{ width: "200px" }}>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={value}
										onChange={handleChange}
									>
										<MenuItem value={10}>Value n</MenuItem>
										<MenuItem value={20}>Value n</MenuItem>
										<MenuItem value={30}>Value n</MenuItem>
									</Select>
								</FormControl>
							</div>
						</div>
						<div className="flex items-center space-x-2">
							<IconButton aria-label="filter">
								<FilterAltIcon />
							</IconButton>
							<Button variant="outlined" startIcon={<AddIcon />}>
								Create
							</Button>
						</div>
					</div>

					<div className={styles.parent}>
						{items.map((item) => (
							<Link key={item.id} href={`/moderator/institution/${item.id}`}>
								<div className={styles.item}>
									<div className={styles.card}>
										<div className={styles.cardImg}>
											<img
												alt="institution"
												src="https://cdn-icons-png.flaticon.com/128/904/904810.png"
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
