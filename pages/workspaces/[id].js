import React from 'react';
import { createRequest } from '../../axios/axiosInstances';
import Cookies from 'js-cookie';

//validation
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import styles from '../../styles/workspaces/oneWorkspace.module.scss';
import PageLayout from '../../layouts/pageLayout';
import { useState } from 'react';

function OneWorkspace({ workspace, files }) {
	const validationMsg = Yup.object().shape({
		name: Yup.string().required('Workspace Name is required.'),
	});

	const [advisers, setAdvisers] = useState([]);
	const [users, setUsers] = useState([]);
	const [selectedAdviser, setSelectedAdviser] = useState();
	const [selectedUser, setSelectedUser] = useState({});

	const members = workspace.members.map((value) => value.first_name + ' ' + value.last_name);

	// workspace info form
	const {
		register,
		handleSubmit,
		resetField,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: workspace.name,
			creator: workspace.creator.first_name + ' ' + workspace.creator.last_name,
			adviser: workspace.adviser
				? workspace.adviser.first_name + ' ' + workspace.adviser.last_name
				: null,
			members: members,
		},
		resolver: yupResolver(validationMsg),
	});

	async function searchAdviser(text) {
		setAdvisers([]);
		if (text != '') {
			const requestAdviser = await createRequest(`/users?type=adviser&name=${text}`, 'get', {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('access_token')}`,
			});

			if (requestAdviser.error) return console.log(requestAdviser.error);
			const { data } = requestAdviser;
			setAdvisers(data);
		} else {
			setAdvisers([]);
		}
	}
	async function searchResearcher(text) {
		setUsers([]);
		if (text != '') {
			const requestResearcher = await createRequest(
				`/users?type=researcher&name=${text}`,
				'get',
				{
					'Content-Type': 'application/json',
					Authorization: `Bearer ${Cookies.get('access_token')}`,
				}
			);

			if (requestResearcher.error) return console.log(requestResearcher.error);
			const { data } = requestResearcher;
			setUsers(data);
		} else {
			setUsers([]);
		}
	}

	async function editAdviser(data) {
		console.log(data.id);
	}

	async function addMember(data) {
		console.log(data.id);
	}

	return (
		<div>
			<h1>Workspace Info</h1>
			<form>
				<div className='form_field'>
					<label htmlFor='name'> Workspace name: </label>
					<input type='text' name='name' {...register('name')} />
				</div>
				<div className='form_field'>
					<label htmlFor='creator'>Creator: </label>
					<input type='text' name='creator' {...register('creator')} disabled />
				</div>
				<div className='form_field'>
					<label htmlFor='adviser'>Adviser: </label>
					<input type='text' name='adviser' {...register('adviser')} disabled />
				</div>
				<div className='form_field'></div>
				<div className='form_field'>
					{/* <form>
						<input type='text' placeholder='Search User...' />
						<button type='submit'>Add Member</button>
					</form> */}

					<select name='members' multiple {...register('members')}>
						{members.map((val) => (
							<option key={val} val={val}>
								{val}
							</option>
						))}
					</select>
					<label htmlFor='members'> Members: </label>
				</div>
				<button type='submit'>Save Workspace</button>
				<button>Delete workspace</button>
			</form>

			<h1>Workspace File List</h1>
			<section className={styles.fileList}>
				{files?.map((val) => (
					<div key={val.id} className={styles.fileCard}>
						<h2 className={styles.fileCard_title}>{val.name}</h2>
						<div className={styles.fileCard_action}>
							<button className={`${styles.fileCard_action_btn} ${styles.primary}`}>
								Open
							</button>
							<button className={`${styles.fileCard_action_btn} ${styles.error}`}>
								Delete
							</button>
						</div>
					</div>
				))}
			</section>
			<h1>Add Adviser Form</h1>
			<p>Type something and select from the results to add</p>
			<form>
				<label htmlFor='adviser'> Add Adviser: </label>
				<input
					type='text'
					placeholder='Search User...'
					name='adviser'
					value={
						selectedAdviser
							? selectedAdviser.first_name + ' ' + selectedAdviser.last_name
							: ''
					}
					onChange={(e) => {
						const text = e.currentTarget.value;
						let timer;
						const waitTime = 300;

						// Clear timer
						clearTimeout(timer);

						// Wait for X ms and then process the request
						timer = setTimeout(() => {
							searchAdviser(text);
						}, waitTime);
					}}
				/>
			</form>

			<div className={styles.adviser_list}>
				{advisers.map((val) => (
					<p
						key={val.id}
						onClick={() => {
							console.log('hoy');
							setSelectedAdviser(val);
							editAdviser(val);
						}}
					>
						{val.first_name} {val.last_name}
					</p>
				))}
			</div>
			<h1>Add Member Form</h1>
			<p>Type something and select from the results to add</p>
			<form>
				<label htmlFor='member'> Add Member: </label>
				<input
					type='text'
					placeholder='Search User...'
					name='member'
					onChange={(e) => {
						const text = e.currentTarget.value;
						let timer;
						const waitTime = 300;

						// Clear timer
						clearTimeout(timer);

						// Wait for X ms and then process the request
						timer = setTimeout(() => {
							searchResearcher(text);
						}, waitTime);
					}}
				/>
			</form>

			<div className={styles.adviser_list}>
				{users.map((val) => (
					<p
						key={val.id}
						onClick={() => {
							console.log('hoy');
							setSelectedUser('adviser', val.first_name + ' ' + val.last_name);
							addMember(val);
						}}
					>
						{val.first_name} {val.last_name}
					</p>
				))}
			</div>
		</div>
	);
}

export async function getServerSideProps(context) {
	const { query, req } = context;
	const accessToken = req.cookies.access_token;
	const workspaceID = query.id;

	const props = {};

	// Workspace Instance

	const response = await createRequest(`/workspaces/${workspaceID}`, 'get', {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${accessToken}`,
	});

	const { error } = response;
	if (error) {
		props.workspace = {};
	}
	if (response.data) {
		const { data: workspace } = response.data;
		if (workspace) {
			props.workspace = workspace;
		}
	}

	// Files

	const responseFile = await createRequest(`/workspaces/files?workspace=${workspaceID}`, 'get', {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${accessToken}`,
	});

	const { error: error2 } = responseFile;

	if (error2) {
		props.files = [];
	} else {
		const { data: files } = responseFile.data;
		props.files = files;
	}

	// console.log(props);

	return { props };
}

OneWorkspace.Layout = PageLayout;

export default OneWorkspace;
