import React from "react";
import CustomDrawerBottom from "../../components/researcher/drawerBottom";
import { NextSeo } from "next-seo";

export default function Home() {
	return (
		<>
			<NextSeo title="Home" />
			<CustomDrawerBottom pageTitle="Home">Home</CustomDrawerBottom>
		</>
	);
}
