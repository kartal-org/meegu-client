import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

import CustomDrawerBottom from "../../../components/moderator/drawerBottom";
import styles from "../../../styles/moderator/Moderator.module.css";

export default function Home() {
	return (
		<>
			<NextSeo title="Home" />
			<CustomDrawerBottom pageTitle="Home">
				<div className={styles.container}>moderator</div>
			</CustomDrawerBottom>
		</>
	);
}
