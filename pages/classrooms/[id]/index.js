import PageLayout from "../../../layouts/pageLayout";
import Link from "next/link";

function ClassroomInside({ classrooms, files, classroomId }) {
	return (
		<>
			classroom inside
			<div className="bg-red-100 mt-5 p-3">
				{files.map((file) => (
					<Link key={file.id} href={`/classrooms/${classrooms.id}/${file.id}`}>
						<a>
							<div className="border-2 border-gray-500 p-2">
								<p className="text-xl font-bold">{file.name}</p>
							</div>
						</a>
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
