import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import Cookies from "js-cookie";

import { useUser } from "../../contexts/userProvider";
import CustomTabs from "../../components/reusable/tabs";
import Profile from "../../components/reusable/profile";
import PageLayout from "../../layouts/pageLayout";
import styles from "../../styles/institutions.module.scss";
import CustomizedDialogs from "../../components/reusable/dialog2";

import { TextField, Button } from "@mui/material";

import ArticlesTab from "../../components/adviser/tabs/articlesTab";
import ResourcesTab from "../../components/adviser/tabs/resourcesTab";
import PeoplesTab from "../../components/adviser/tabs/peoplesTab";
import SubscriptionTab from "../../components/adviser/tabs/subscriptionTab";

function InsideInstitution({ institution }) {
	const [institutionProfile, setInstitutionProfile] = useState(institution);
	const [profilePicPreview, setProfilePicPreview] = useState(
		institutionProfile.profileImage
	);
	const [coverPhotoPreview, setcoverPhotoPreview] = useState(
		institutionProfile.profileCover
	);
	const profilePictureBtn = useRef();
	const user = useUser();

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
					tabs={[
						{
							label: "Articles",
							value: "articles",
							content: <ArticlesTab />,
							// content: (
							// 	<ArticlesTab fileList={fileList} setFileList={setFileList} />
							// ),
						},
						{
							label: "Resources",
							value: "resources",
							content: <ResourcesTab />,
							// content: <ResourcesTab fileList={fileList} setFileList={setFileList} />,
						},
						{
							label: "People",
							value: "peoples",
							content: <PeoplesTab />,
							// content: <PeoplesTab fileList={fileList} setFileList={setFileList} />,
						},
						{
							label: "Subscription",
							value: "subscription",
							content: <SubscriptionTab />,
							// content: <SubscriptionTab fileList={fileList} setFileList={setFileList} />,
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
