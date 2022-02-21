import React, { useState } from "react";
import PageLayout from "../../layouts/pageLayout";
import Link from "next/link";

function index({ classrooms }) {
	console.log(classrooms);

	// const [classroomList, setClassrooms] = useState(classrooms ? classrooms : []);
	return (
		<>
			Classrooms
			<div className="bg-red-100 mt-5 p-3">
				{classrooms.map((classroom) => (
					<Link key={classroom.id} href={`/classrooms/${classroom.id}`}>
						<a>
							<div className="border-2 border-gray-500 p-2">
								<p className="text-xl font-bold">{classroom.name}</p>
							</div>
						</a>
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
