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

const Input = styled('input')({
	display: 'none',
});

function UserProfile({ account }) {
	const [profilePic, setProfilePic] = useState(account.profileImage);
	const [coverPhoto, setcoverPhoto] = useState(account.profileCover);
	const [profilePicPreview, setProfilePicPreview] = useState(account.profileImage);
	const [coverPhotoPreview, setcoverPhotoPreview] = useState(account.profileCover);
	const profilePictureBtn = useRef();

	const {
		register,
		handleSubmit,
		resetField,
		getValues,
		watch,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: {
			profileImage: profilePic,
			profileCover: coverPhoto,
			first_name: account.first_name,
			last_name: account.last_name,
			email: account.email,
			about: account.about,
			type: account.type,
			username: account.username,
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
		console.log(first_name);
		console.log(coverPhoto);
		const formData = new FormData();
		formData.append('first_name', first_name);
		formData.append('last_name', last_name);
		formData.append('username', username);
		formData.append('email', email);
		formData.append('about', about);
		if (profilePic !== profilePicPreview) {
			//profile pic is changed
			console.log('profile', profilePic);
			formData.append('profileImage', profilePic, profilePic.name);
		}
		if (coverPhoto !== coverPhotoPreview) {
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
		console.log(result);
	}
	return (
		<div>
			<section>
				<h1>Account Info</h1>
				<form onSubmit={handleSubmit(editProfile)}>
					<div>
						<label htmlFor='profileImage'>
							<input
								ref={profilePictureBtn}
								type='file'
								id='profileImage'
								{...register('profileImage')}
								onInput={(e) => onChangeProfilePhoto(e)}
							/>

							{/* <Avatar alt='Profile Picture' src={profilePic} /> */}
							<div className={styles.profile_img}>
								<Image
									src={profilePicPreview}
									alt='Profile Picture'
									// className={styles.profile_img}
									layout='fill'
									objectFit='cover'
								/>
							</div>
						</label>
					</div>
					<div>
						<Image
							src={coverPhotoPreview}
							alt='Cover Photo'
							width={500}
							height={300}
							className={styles.profile_cover}
						/>
						<label htmlFor='profile_cover'>
							<input
								type='file'
								id='profile_cover'
								onInput={(e) => onChangeCoverPhoto(e)}
								{...register('profileCover')}
							/>
						</label>
					</div>
					<div>
						<label htmlFor='first_name'>First Name: </label>
						<input type='text' {...register('first_name')} />
					</div>
					<div>
						<label htmlFor='last_name'>Last Name: </label>
						<input type='text' {...register('last_name')} />
					</div>
					<div>
						<label htmlFor='username'>Username: </label>
						<input type='text' {...register('username')} />
					</div>
					<div>
						<label htmlFor='email'>Email: </label>
						<input type='email' {...register('email')} />
					</div>
					<div>
						<label htmlFor='about'>About: </label>
						<textarea name='about' {...register('about')} cols='30' rows='10'></textarea>
					</div>
					<button type='submit'>Edit Profile</button>
				</form>
			</section>
		</div>
	);
}

export async function getServerSideProps(context) {
	const { query, req } = context;
	const accessToken = req.cookies.access_token;
	const userID = query.id;
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

	return { props };
}
UserProfile.Layout = PageLayout;

export default UserProfile;
