import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import PageLayout from "../../../layouts/pageLayout";
import styles from "../../../styles/classrooms.module.scss";
import UtilityCard from "../../../components/reusable/utilityCard";
import ChipList from "../../../components/reusable/chips";

import { Button } from "@mui/material";

import fileIllustration from "../../../public/file_illustration.svg";
import useClassroomFileFilters from "../../../hooks/useClassroomFileFilters";

function ClassroomInside({ classroom, files, classroomId, recommended }) {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: classroom?.name,
		},
	});

	return (
		<>
			<header className={styles.page_header}>
				<h1 className={styles.page_title}>{classroom.name}</h1>
				<div className={styles.page_tools}>
					<ChipList
						chips={useClassroomFileFilters()}
						defaultVal={router.query.status ? router.query.status : "submitted"}
					/>
				</div>
			</header>
			<main>
				{/* <div className={styles.cardContainer}>
					{files.map((file) => (
						<UtilityCard
							title={file.name}
							illustration={fileIllustration}
							actions={
								<>
									<Link href={`/classrooms/${classroom.id}/${file.id}`}>
										<Button variant="contained">Open</Button>
									</Link>
								</>
							}
						></UtilityCard>
					))}
				</div> */}
				<div className={styles.cardContainer}>
					{recommended?.map((item) => (
						<UtilityCard
							title={item.title}
							illustration={fileIllustration}
							actions={
								<>
									<Link href={`/classrooms/${classroom.id}/${item.file.id}`}>
										<Button variant="contained">Open</Button>
									</Link>
								</>
							}
						>
							<div className="bg-blue-100">{item.description}</div>
						</UtilityCard>
					))}
				</div>
			</main>
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
	props.classroom = result.data;

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

	//get recommendations
	const responseRecommendations = await fetch(
		process.env.BACKEND_API_UR + `/classrooms/?workspace=${classroomId}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${access_token}`,
			},
		}
	);
	const resultRecommended = await responseRecommendations.json();
	console.log(resultRecommended);
	props.recommended = resultRecommended;

	return { props };
}

ClassroomInside.Layout = PageLayout;
export default ClassroomInside;
