import React from "react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

import CustomDrawerBottom from "../../../components/adviser/drawerBottom";
import styles from "../../../styles/adviser/Adviser.module.css";

import { Chip } from "@mui/material";

export default function Home() {
	const router = useRouter();
	console.log(router);

	return (
		<>
			<NextSeo title="Home" />
			<CustomDrawerBottom pageTitle="Home">
				<div className={styles.container}>adviser home</div>
			</CustomDrawerBottom>
		</>
	);
}
