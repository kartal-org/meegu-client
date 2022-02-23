import React, { useState } from "react";
import PageLayout from "../../layouts/pageLayout";
import Link from "next/link";

import workspaceIllustration from "../../public/workspace-illustration.png";

import styles from "../../styles/classrooms.module.scss";
import UtilityCard from "../../components/reusable/utilityCard";

import { Button } from "@mui/material";

function index({ classrooms }) {
	console.log(classrooms);

	return (
		<>
			<h1 className={styles.page_title}>Classrooms</h1>

			<div className={styles.cardContainer}>
				{classrooms.map((classroom) => (
					<UtilityCard
						title={classroom.name}
						illustration={workspaceIllustration}
						actions={
							<>
								<Link href={`/classrooms/${classroom.id}/`}>
									<Button variant="contained">Open</Button>
								</Link>
							</>
						}
					></UtilityCard>
				))}
			</div>
		</>
	);
}

export async function getServerSideProps(context) {
	const { req, res } = context;
	const access_token = req.cookies.access_token;
	const props = {};

	const response = await fetch(
		process.env.BACKEND_API_UR + `/workspaces?isAdviser=${true}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${access_token}`,
			},
		}
	);

	const result = await response.json();
	// console.log(result);
	props.classrooms = result;

	return { props };
}

index.Layout = PageLayout;
export default index;
