import PageLayout from "../../../layouts/pageLayout";
import { useForm } from "react-hook-form";

import { TextField, Button } from "@mui/material";
import { useUser } from "../../../contexts/userProvider";
import Cookies from "js-cookie";

function FileInside({ file, comments, institutions }) {
	const user = useUser();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: file?.name,
		},
	});

	const {
		register: registerRecommend,
		handleSubmit: handleSubmitRecommend,
		setValue: setValueRecommend,
		formState: { errors: errorReco },
	} = useForm({});

	async function addRecommendation(data, e) {
		e.preventDefault();
		console.log(data);

		// const response = await fetch(process.env.BACKEND_API_UR + `/classrooms`, {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 		Authorization: `Bearer ${Cookies.get("access_token")}`,
		// 	},
		// 	body: JSON.stringify({
		// 		title: data.title,
		// 		description: data.desc,
		// 		adviser: user.id,
		// 		institution: 2,
		// 	}),
		// });

		// const result = await response.json();
		// console.log(result);
		// alert("recommendation success");
	}

	return (
		<>
			This is inside the file
			<div className="border-2 border-blue-300 p-5">
				<form autoComplete="off">
					<TextField
						fullWidth
						id="outlined-basic"
						label="File Name"
						variant="outlined"
						{...register("name")}
						autoFocus
					/>
				</form>
			</div>
			<div className="border-4 border-red-400 p-8 mt-6 space-y-4">
				Comment List
				{comments?.map((comment) => (
					<div className="bg-blue-100 p-2">
						<p className="text-sm">{comment.content}</p>
						<div className="flex space-x-2">
							<p className="text-xs">{comment.author.first_name}</p>
							<p className="text-xs">{comment.author.last_name}</p>
						</div>
					</div>
				))}
			</div>
			<div className="mt-3 mb-3 border-2 border-gray-500 p-6">
				{/* <Button variant="text">recommend</Button> */}
				create recommendation here
				<form
					autoComplete="off"
					onSubmit={handleSubmitRecommend(addRecommendation)}
					className="space-y-4 mt-3"
				>
					<TextField
						fullWidth
						id="outlined-basic"
						label="Title"
						variant="outlined"
						{...registerRecommend("title")}
					/>
					<TextField
						fullWidth
						id="outlined-basic"
						label="Description"
						variant="outlined"
						multiline
						rows={4}
						{...registerRecommend("desc")}
					/>
					<Button type="submit">Create</Button>
				</form>
			</div>
			<div className="mt-5 mb-5 border-2 border-gray-500 p-6">
				<p> Instituitions here </p>

				{institutions?.map((item) => (
					<div className="bg-red-100 p-2">
						<p>{item.name}</p>
						<p>{item.address}</p>
						<p>{item.creator}</p>
					</div>
				))}
			</div>
		</>
	);
}

export async function getServerSideProps(context) {
	const { req, res, query } = context;
	const access_token = req.cookies.access_token;
	const fileID = query.fileID;
	const props = {};

	//response for file detail
	const response = await fetch(
		process.env.BACKEND_API_UR + `/workspaces/files/${fileID}/`,
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
	props.file = result.data;

	//response for comment
	const responseComment = await fetch(
		process.env.BACKEND_API_UR + `/classrooms/comments?file=${fileID}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${access_token}`,
			},
		}
	);

	const resultComment = await responseComment.json();
	console.log(resultComment);
	props.comments = resultComment;

	//response for get institution
	const responseGetInstitution = await fetch(
		process.env.BACKEND_API_UR + `/institutions?isStaff=${true}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${access_token}`,
			},
		}
	);

	const resultInstitution = await responseGetInstitution.json();
	console.log(resultInstitution);
	props.institutions = resultInstitution;

	return { props };
}

FileInside.Layout = PageLayout;
export default FileInside;
