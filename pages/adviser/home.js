import React from "react";
import { NextSeo } from "next-seo";

import CustomDrawerBottom from "../../components/adviser/drawerBottom";
import styles from "../../styles/adviser/Adviser.module.css";

export default function Home() {
	return (
		<>
			<NextSeo title="Home" />
			<CustomDrawerBottom pageTitle="Home">
				<div className={styles.container}>home page</div>
			</CustomDrawerBottom>
		</>
	);
}
