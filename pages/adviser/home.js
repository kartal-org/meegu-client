import React from "react";
import CustomDrawer from "../../components/adviser/drawer";
// import CustomDrawer from "../../components/researcher/drawer";
import { NextSeo } from "next-seo";

export default function Home() {
	return (
		<>
			<NextSeo title="Home" />
			<CustomDrawer pageTitle="Home">Home adviser</CustomDrawer>
		</>
	);
}
