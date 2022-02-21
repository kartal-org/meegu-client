import React, { useState } from 'react';
import PageLayout from '../../layouts/pageLayout';
import { useUser } from '../../contexts/userProvider';
import { createRequest } from '../../axios/axiosInstances';
import styles from '../../styles/workspaces.module.scss';
import { FormControl, MenuItem, Select, TextField, Typography } from '@mui/material';
import Modal from '../../components/modal';
import Cookies from 'js-cookie';
import Link from 'next/link';

//validation
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { useRouter } from 'next/router';

const Header = {
	'Content-Type': 'application/json',
	Authorization: `Bearer ${Cookies.get('access_token')}`,
};

function index({ workspaces, type }) {
	const user = useUser();
	const router = useRouter();
	const [workspaceList, setWorkspaceList] = useState(workspaces ? workspaces : []);
	const [workspaceType, setWorkspaceType] = useState(type ? type : 'all');

	const handleChange = (event) => {
		setWorkspaceType(event.target.value);
	};

	const validationMsg = Yup.object().shape({
		name: Yup.string().required('Workspace Name is required.'),
	});

	const {
		register, // register inputs
		handleSubmit, // handle form submit
		resetField,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationMsg),
		
	});

	async function addWorkspace(data) {
		const formData = new FormData();
		formData.append('name', data.name);
		formData.append('creator', user.id);
		formData.append('members', [user.id]);
		formData.append('isActive', true);

		const response = await createRequest('/workspaces/', 'post', Header, formData);

		resetField('name');

		setWorkspaceList([...workspaceList, response.data]);
	}

	async function deleteWorkspace(workspace) {
		const response = await createRequest(`/workspaces/${workspace}/`, 'patch', Header, {
			isActive: false,
		});
		console.log(response);
		const newList = workspaceList.filter((item) => item.id != response.data.data.id);
		console.log(newList);
		setWorkspaceList(newList);
	}

	function filterOwnerShip(e) {
		if (e.target.value == 'all') return router.push(`/workspaces?user=${user.id}`);
		router.push(`/workspaces?user=${user.id}&type=${e.target.value}`);
	}

	return (
		<>
			<h1 className={styles.page_title}>Workspaces</h1>
			<div className={styles.header}>
				<FormControl>
					<Select
						labelId='demo-simple-select-label'
						id='demo-simple-select'
						value={workspaceType}
						onChange={(e) => {
							handleChange(e);
							filterOwnerShip(e);
						}}
					>
						<MenuItem value='all'>All Workspaces</MenuItem>
						<MenuItem value='personal'>Personal Workspaces</MenuItem>
						<MenuItem value='shared'>Shared Workspaces</MenuItem>
					</Select>
				</FormControl>
				<Modal
					title='Add Workspace'
					button='Add Workspace'
					maxWidth='lg'
					// primaryAction={{ label: 'Create', action: handleSubmit(addWorkspace) }}
				>
					<form
						className={styles.add_workspace_form}
						onSubmit={handleSubmit(addWorkspace)}
						autoComplete='off'
					>
						<TextField
							fullWidth
							id='outlined-basic'
							label='Workspace Name'
							variant='outlined'
							{...register('name')}
							error={errors.name ? true : false}
							autoFocus
						/>
						<Typography sx={{ fontSize: '12px', color: 'red', fontStyle: 'italic' }}>
							{errors.name?.message}
						</Typography>
						<button type='submit'>Create Workspace</button>
					</form>
				</Modal>
			</div>
			<div className={styles.workspace_container}>
				{workspaceList.map((workspace) => (
					<article className={styles.workspace}>
						<h2 className={styles.workspace_title}>{workspace.name}</h2>
						<Link href={`/workspaces/${workspace.id}/`}>
							<button>Open</button>
						</Link>
						<button onClick={() => deleteWorkspace(workspace.id)}>Delete</button>
					</article>
				))}
			</div>
		</>
	);
}
export async function getServerSideProps(context) {
	const { req, res, query } = context;
	const userID = query.user;
	const type = query.type;
	const access_token = req.cookies.access_token;
	let workspaces;
	let error;

	let response;
	switch (type) {
		case 'personal':
			response = await createRequest(`/workspaces?isOwner=${true}`, 'get', {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${access_token}`,
			});
			break;
		case 'shared':
			response = await createRequest(`/workspaces?isOwner=${false}`, 'get', {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${access_token}`,
			});
			break;

		default:
			response = await createRequest(`/workspaces`, 'get', {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${access_token}`,
			});
			break;
	}

	if (response.error) {
		console.log(response.error);
	}
	if (response.data) {
		workspaces = response.data;
	}

	return {
		props: {
			workspaces: workspaces ? workspaces : null,
			type: type ? type : null,
		}, // will be passed to the page component as props
	};
}
index.Layout = PageLayout;
export default index;
