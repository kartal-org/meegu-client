import { useForm } from "react-hook-form";

import PageLayout from "../../layouts/pageLayout";
import CustomTabs from "../../components/reusable/tabs";

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
			about: institution?.about,
			contact: institution?.contact,
			address: institution?.address,
			email: institution?.email,
		},
	});

	return (
		<>
			<div className="border-2 border-blue-300 p-5">
				<form autoComplete="off" className="space-y-3">
					<TextField
						fullWidth
						id="outlined-basic"
						label="Institution Name"
						variant="outlined"
						{...register("name")}
						autoFocus
					/>
					<TextField
						fullWidth
						id="outlined-basic"
						label="About"
						variant="outlined"
						multiline
						rows={2}
						{...register("about")}
					/>
					<TextField
						fullWidth
						id="outlined-basic"
						label="Contact"
						variant="outlined"
						{...register("contact")}
					/>
					<TextField
						fullWidth
						id="outlined-basic"
						label="Address"
						variant="outlined"
						{...register("address")}
					/>
					<TextField
						fullWidth
						id="outlined-basic"
						label="Email"
						variant="outlined"
						{...register("email")}
					/>

					<Button variant="outlined">Save</Button>
					<Button variant="outlined">Edit</Button>
				</form>

				<CustomTabs
					tabs={[
						{
							label: "Articles",
							value: "articles",
							// content: <CreateFile fileList={fileList} setFileList={setFileList} />,
						},
					]}
				/>
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
