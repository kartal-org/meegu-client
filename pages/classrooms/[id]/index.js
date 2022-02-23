import PageLayout from "../../../layouts/pageLayout";
import Link from "next/link";

import styles from "../../../styles/classrooms.module.scss";
import UtilityCard from "../../../components/reusable/utilityCard";

import { Button } from "@mui/material";

import fileIllustration from "../../../public/file_illustration.svg";

function ClassroomInside({ classrooms, files, classroomId }) {
	return (
		<>
			classroom inside
			<div className={styles.cardContainer}>
				{files.map((file) => (
					<UtilityCard
						title={file.name}
						illustration={fileIllustration}
						actions={
							<>
								<Link href={`/classrooms/${classrooms.id}/${file.id}`}>
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
	const { req, res, query } = context;
	const access_token = req.cookies.access_token;
	const classroomId = query.id;
	const props = {};

	const response = await fetch(
		process.env.BACKEND_API_UR + `/workspaces/${classroomId}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${access_token}`,
			},
		}
	);

	const result = await response.json();
	console.log(result);
	props.classrooms = result.data;

	const responseFileSubmitted = await fetch(
		process.env.BACKEND_API_UR +
			`/workspaces/files?workspace=${classroomId}&status=submitted`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${access_token}`,
			},
		}
	);
	const result2 = await responseFileSubmitted.json();
	console.log(result2);
	props.files = result2.data;

	return { props };
}

ClassroomInside.Layout = PageLayout;
export default ClassroomInside;
