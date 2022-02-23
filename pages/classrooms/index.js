import React, { useState } from "react";
import PageLayout from "../../layouts/pageLayout";
import Link from "next/link";

// import styles from "../../styles/adviser/Adviser.module.css";
import styles from "../../styles/classrooms.module.scss";

function index({ classrooms }) {
	console.log(classrooms);

	return (
		<>
			Classrooms
			<div className={styles.cardContainer}>
				{classrooms.map((classroom) => (
					<Link key={classroom.id} href={`/classrooms/${classroom.id}`}>
						<div className={styles.card}>
							<div className={styles.cardImg}>
								<img
									alt="workspace"
									src="https://cdn-icons-png.flaticon.com/128/4052/4052378.png"
								/>
							</div>
							<p>{classroom.name}</p>
						</div>
					</Link>
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
