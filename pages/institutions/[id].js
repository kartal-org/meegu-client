import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import Cookies from "js-cookie";

import { useUser } from "../../contexts/userProvider";
import CustomTabs from "../../components/reusable/tabs";
import Profile from "../../components/reusable/profile";
import PageLayout from "../../layouts/pageLayout";
import styles from "../../styles/institutions.module.scss";
import CustomizedDialogs from "../../components/reusable/dialog2";

import {
	TextField,
	Button,
	Alert,
	AlertTitle,
	IconButton,
} from "@mui/material";

import ArticlesTab from "../../components/adviser/tabs/articlesTab";
import ResourcesTab from "../../components/adviser/tabs/resourcesTab";
import PeoplesTab from "../../components/adviser/tabs/peoplesTab";
import SubscriptionTab from "../../components/adviser/tabs/subscriptionTab";

import CloseIcon from "@mui/icons-material/Close";

import { blue } from "@mui/material/colors";

function InsideInstitution({
	institution,
	recommendations,
	articles,
	resources,
	members,
}) {
	const color = blue[300];

	const [institutionProfile, setInstitutionProfile] = useState(institution);
	const [profilePicPreview, setProfilePicPreview] = useState(
		institutionProfile.profileImage
	);
	const [coverPhotoPreview, setcoverPhotoPreview] = useState(
		institutionProfile.profileCover
	);
	const profilePictureBtn = useRef();
	const user = useUser();

	const [recommendationList, setRecommendationList] = useState(recommendations);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: {
			profileImage: institutionProfile?.profileImage,
			profileCover: institutionProfile?.profileCover,
			name: institutionProfile?.name,
			about: institutionProfile?.about,
			contact: institutionProfile?.contact,
			address: institutionProfile?.address,
			email: institutionProfile?.email,
		},
	});

	async function editInstitutionProfile(data, e) {
		const { name, contact, address, about, profileImage, profileCover, email } =
			data;

		const formData = new FormData();
		formData.append("name", name);
		formData.append("address", address);
		formData.append("contact", contact);
		formData.append("email", email);
		formData.append("about", about);

		if (institutionProfile.profileImage !== profilePicPreview) {
			//profile pic is changed
			console.log("profile", profilePic);
			formData.append("profileImage", profilePic, profilePic.name);
		}
		if (institutionProfile.profileCover !== coverPhotoPreview) {
			//cover has changed
			console.log("cover", coverPhoto);

			formData.append("profileImage", coverPhoto, coverPhoto.name);
		}

		const responseEdit = await fetch(
			process.env.BACKEND_API_UR + `/institutions/${institution.id}/`,
			{
				method: "PATCH",
				headers: {
					Authorization: `Bearer ${Cookies.get("access_token")}`,
				},
				body: formData,
			}
		);
		const resultEdit = await responseEdit.json();
		setInstitutionProfile(resultEdit);
		console.log(resultEdit);
	}

	return (
		<>
			{/* <div className={styles.alert}>kasdjg</div> */}
			<Alert
				severity="info"
				variant="filled"
				action={
					<IconButton
						aria-label="close"
						color="inherit"
						size="small"
						// onClick={() => {
						// 	setOpen(false);
						// }}
					>
						<CloseIcon fontSize="inherit" />
					</IconButton>
				}
				sx={{ mb: 3 }}
			>
				<AlertTitle>Info</AlertTitle>
				This is an Info alert — <strong>check it out!</strong>
			</Alert>
			<Profile
				name={institutionProfile.name}
				cover={institutionProfile.profileCover}
				pic={institutionProfile.profileImage}
			>
				<div className={styles.split}>
					<div>
						<h3>{institutionProfile.name}</h3>
						<p>{institutionProfile.about}</p>
					</div>

					<CustomizedDialogs
						openBtn={<Button>Edit</Button>}
						title="Edit Profile"
						primaryAction={
							<Button onClick={handleSubmit(editInstitutionProfile)}>
								Save Changes
							</Button>
						}
					>
						<form
							className={styles.editProfile_form}
							// onSubmit={handleSubmit(editProfile)}
						>
							<TextField
								fullWidth
								label="Profile Picture"
								{...register("profileImage")}
							/>
							<TextField
								fullWidth
								label="Profile Cover"
								{...register("profileCover")}
							/>
							<TextField
								fullWidth
								label="Institution Name"
								{...register("name")}
							/>
							<TextField
								fullWidth
								label="About"
								multiline
								rows={2}
								{...register("about")}
							/>
							<TextField fullWidth label="Contact" {...register("contact")} />
							<TextField fullWidth label="Address" {...register("address")} />
							<TextField fullWidth label="Email" {...register("email")} />
						</form>
					</CustomizedDialogs>
				</div>
			</Profile>

			<div className={styles.profileContent}>
				<CustomTabs
					defaultValue="articles"
					tabs={[
						{
							label: "Articles",
							value: "articles",
							content: (
								<ArticlesTab
									institution={institution}
									recommendationList={recommendationList}
									setRecommendationList={setRecommendationList}
									articles={articles}
								/>
							),
						},
						{
							label: "Resources",
							value: "resources",
							content: (
								<ResourcesTab resources={resources} institution={institution} />
							),
						},
						{
							label: "People",
							value: "peoples",
							content: <PeoplesTab members={members} />,
						},
						{
							label: "Subscription",
							value: "subscription",
							content: <SubscriptionTab />,
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

	console.log("id:", institutionID);
	const responseInstitutionDetail = await fetch(
		process.env.BACKEND_API_UR + `/institutions/${institutionID}`,
		{
			method: "GET",
			headers: {
				// "Content-Type": "application/json",
				Authorization: `Bearer ${access_token}`,
			},
		}
	);
	const resultDetail = await responseInstitutionDetail.json();
	// console.log(resultDetail);
	props.institution = resultDetail;

	//response for get recos
	const responseGetRecommendation = await fetch(
		process.env.BACKEND_API_UR + `/classrooms?institution=${institutionID}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${access_token}`,
			},
		}
	);
	const resultRecommendation = await responseGetRecommendation.json();
	// console.log(resultRecommendation);
	props.recommendations = resultRecommendation;

	//response for get articles
	const responseGetArticles = await fetch(
		process.env.BACKEND_API_UR + `/publications?institutions=${institutionID}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${access_token}`,
			},
		}
	);
	const resultArticle = await responseGetArticles.json();
	// console.log('articles', resultArticle);
	props.articles = resultArticle;

	//response for get resources
	const responseGetResources = await fetch(
		process.env.BACKEND_API_UR + `/resources?institution=${institutionID}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${access_token}`,
			},
		}
	);
	const resultResource = await responseGetResources.json();
	// console.log(resultResource);
	props.resources = resultResource;

	//response for get institution members
	const responseGetMembers = await fetch(
		process.env.BACKEND_API_UR +
			`/institutions/members?institution=${institutionID}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${access_token}`,
			},
		}
	);
	const resultMember = await responseGetMembers.json();
	console.log("members", resultMember);
	props.members = resultMember;

	// console.log(institutionID);
	// props.institution = []
	return { props };
}

InsideInstitution.Layout = PageLayout;
export default InsideInstitution;
