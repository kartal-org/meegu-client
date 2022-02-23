import PageLayout from "../../../layouts/pageLayout";
import Link from "next/link";

import styles from "../../../styles/classrooms.module.scss";

function ClassroomInside({ classrooms, files, classroomId }) {
	return (
		<>
			classroom inside
			<div className={styles.cardContainer}>
				{files.map((file) => (
					<Link key={file.id} href={`/classrooms/${classrooms.id}/${file.id}`}>
						<div className={styles.card}>
							<div className={styles.cardImg}>
								<img
									alt="workspace"
									src="https://cdn-icons-png.flaticon.com/128/4334/4334444.png"
								/>
							</div>
							<p>{file.name}</p>
						</div>
					</Link>
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
