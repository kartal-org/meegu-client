import { useForm } from "react-hook-form";

import PageLayout from "../../layouts/pageLayout";

import { TextField, Button } from "@mui/material";

function InsideInstitution({ institution }) {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: institution?.name,
		},
	});

	return (
		<>
			<div className="border-2 border-blue-300 p-5">
				<form autoComplete="off">
					<TextField
						fullWidth
						id="outlined-basic"
						label="Institution Name"
						variant="outlined"
						{...register("name")}
						autoFocus
					/>
				</form>
			</div>
		</>
	);
}

export async function getServerSideProps(context) {
	const { req, res, query } = context;
	const access_token = req.cookies.access_token;
	const institutionID = query.id;
	const props = {};

	const responseInstitutionDetail = await fetch(
		process.env.BACKEND_API_UR + `/institutions/${institutionID}/`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${access_token}`,
			},
		}
	);
	const resultDetail = await responseInstitutionDetail.json();
	console.log(resultDetail);
	props.institution = resultDetail;

	return { props };
}

InsideInstitution.Layout = PageLayout;
export default InsideInstitution;
