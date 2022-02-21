import React from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import Link from "next/link";

import { TextField, Button } from "@mui/material";

import PageLayout from "../../layouts/pageLayout";
import { useUser } from "../../contexts/userProvider";

function index({ institutions }) {
	const user = useUser();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({});

	async function createInstitution(data, e) {
		e.preventDefault();
		console.log(data);
	}

	return (
		<>
			Institutions moderator here
			<div className="mt-5 mb-5 border-2 border-gray-500 p-6">
				<p> Instituitions here </p>

				{institutions?.map((item) => (
					<Link key={item.id} href={`/institutions/${item.id}`}>
						<a>
							<div className="bg-red-100 p-2 mb-3">
								<p>{item.name}</p>
								<p>{item.address}</p>
								<p>{item.email}</p>
							</div>
						</a>
					</Link>
				))}
			</div>
			<div className="mt-7 mb-7 border-2 border-gray-500 p-6">
				<p> Create Instituitions here </p>

				<form
					autoComplete="off"
					onSubmit={handleSubmit(createInstitution)}
					className="space-y-4 mt-3"
				>
					<TextField
						fullWidth
						id="outlined-basic"
						label="Insitution Name"
						variant="outlined"
						{...register("name")}
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
						label="Adress"
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
					<Button type="submit">Create</Button>
				</form>
			</div>
		</>
	);
}

export async function getServerSideProps(context) {
	const { req, res, query } = context;
	const access_token = req.cookies.access_token;
	const props = {};

	//response for get institution
	const responseGetInstitution = await fetch(
		process.env.BACKEND_API_UR + `/institutions?isOwner=${true}/`,
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

index.Layout = PageLayout;
export default index;
