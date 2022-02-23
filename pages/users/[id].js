import React, { useEffect, useState } from 'react';
import PageLayout from '../../layouts/pageLayout';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import styles from './profile.module.scss';

import Image from 'next/image';
import Cookies from 'js-cookie';
import { useRef } from 'react';
import Profile from '../../components/reusable/profile';
import { Button, TextField } from '@mui/material';
import CustomizedDialogs from '../../components/reusable/dialog2';
import ChipList from '../../components/reusable/chips';
import { useUser } from '../../contexts/userProvider';

const Input = styled('input')({
	display: 'none',
});

function UserProfile({ account }) {
	const [profile, setProfile] = useState(account);
	const [profilePicPreview, setProfilePicPreview] = useState(profile.profileImage);
	const [coverPhotoPreview, setcoverPhotoPreview] = useState(profile.profileCover);
	const profilePictureBtn = useRef();
	const user = useUser();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			profileImage: profile.profileImage,
			profileCover: profile.profileCover,
			first_name: profile.first_name,
			last_name: profile.last_name,
			email: profile.email,
			about: profile.about,
			type: profile.type,
			username: profile.username,
		},
	});

	function onChangeCoverPhoto(e) {
		e.preventDefault();

		const reader = new FileReader();
		reader.onload = () => {
			if (reader.readyState === 2) {
				setcoverPhotoPreview(reader.result);
			}
		};
		reader.readAsDataURL(e.target.files[0]);
		setcoverPhoto(e.target.files[0]);
	}
	function onChangeProfilePhoto(e) {
		e.preventDefault();

		const reader = new FileReader();
		reader.onload = () => {
			if (reader.readyState === 2) {
				setProfilePicPreview(reader.result);
			}
		};
		reader.readAsDataURL(e.target.files[0]);
		setProfilePic(e.target.files[0]);
	}
	async function editProfile(data, e) {
		const { first_name, last_name, username, about, profileImage, profileCover, email } = data;

		const formData = new FormData();
		formData.append('first_name', first_name);
		formData.append('last_name', last_name);
		formData.append('username', username);
		formData.append('email', email);
		formData.append('about', about);
		if (profile.profileImage !== profilePicPreview) {
			//profile pic is changed
			console.log('profile', profilePic);
			formData.append('profileImage', profilePic, profilePic.name);
		}
		if (profile.profileCover !== coverPhotoPreview) {
			//cover has changed
			console.log('cover', coverPhoto);

			formData.append('profileImage', coverPhoto, coverPhoto.name);
		}

		const response = await fetch(process.env.BACKEND_API_UR + `/users/${account.id}/`, {
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${Cookies.get('access_token')}`,
			},
			body: formData,
		});
		const result = await response.json();
		setProfile(result);
		console.log(result);
	}
	return (
		<div>
			<Profile
				name={profile.first_name + ' ' + profile.last_name}
				cover={profile.profileCover}
				pic={profile.profileImage}
			>
				<div className={styles.split}>
					<div>
						<h3>{profile.first_name + ' ' + profile.last_name}</h3>
						<p style={{ textTransform: 'capitalize' }}>
							<em>{profile.type}</em>
						</p>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, in.</p>
					</div>
					<CustomizedDialogs
						openBtn={<Button>Edit</Button>}
						title='Edit Profile'
						primaryAction={<Button onClick={handleSubmit(editProfile)}>Save Changes</Button>}
					>
						<form className={styles.editProfile__form} onSubmit={handleSubmit(editProfile)}>
							<TextField fullWidth label='Profile Picture' {...register('profileImage')} />
							<TextField fullWidth label='Profile Cover' {...register('profileCover')} />
							<TextField fullWidth label='First Name' {...register('first_name')} />
							<TextField fullWidth label='Last Name' {...register('last_name')} />
							<TextField fullWidth label='Username' {...register('username')} />
							<TextField fullWidth label='Email' {...register('email')} />
							<TextField
								fullWidth
								multiline
								minRows={4}
								label='About'
								{...register('about')}
							/>
						</form>
					</CustomizedDialogs>
				</div>
			</Profile>
			<section>
				<ChipList
					chips={[
						{
							label: 'Additional Information',
							value: 'info',
							route: `/users/${user?.id}`,
						},
						{
							label: 'Works',
							value: 'works',
							route: `/users/${user?.id}?tab=works`,
						},
					]}
					defaultVal='info'
				/>
			</section>
		</div>
	);
}

export async function getServerSideProps(context) {
	const { query, req } = context;
	const accessToken = req.cookies.access_token;
	const userID = query.id;
	const tab = query.tab;
	const props = {};

	const requestUser = await fetch(process.env.BACKEND_API_UR + `/users/${userID}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${accessToken}`,
			'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
			accept: '*/*',
		},
	});
	const resultUser = await requestUser.json();
	console.log(resultUser);
	props.account = resultUser;

	// if(tab==="works"){

	// }

	return { props };
}
UserProfile.Layout = PageLayout;

export default UserProfile;
