import React, { useRef } from 'react';
import { createRequest } from '../../../axios/axiosInstances';
import Cookies from 'js-cookie';

//validation
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import styles from '../../../styles/workspaces/oneWorkspace.module.scss';
import PageLayout from '../../../layouts/pageLayout';
import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUser } from '../../../contexts/userProvider';

import ChipList from '../../../components/reusable/chips';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { Avatar, Button, TextField } from '@mui/material';
import Modal from '../../../components/modal';
import CustomizedDialogs from '../../../components/reusable/dialog2';
import CustomTabs from '../../../components/reusable/tabs';
import UtilityCard from '../../../components/reusable/utilityCard';

import fileIllustration from '../../../public/file_illustration.svg';
import CreateFile from '../../../components/researcher/createFile';
import ImportResource from '../../../components/researcher/importResource';
import { useWorkspaceFilters } from '../../../hooks/useWorkspaceFilters';
import { useEffect } from 'react';

const HEADER = {
	'Content-Type': 'application/json',
	Authorization: `Bearer ${Cookies.get('access_token')}`,
};

function OneWorkspace({ workspace, files }) {
	const user = useUser();
	const validationMsg = Yup.object().shape({
		name: Yup.string().required('Workspace Name is required.'),
	});

	const router = useRouter();
	const addFileForm = useRef();
	const [advisers, setAdvisers] = useState([]);
	const [fileList, setFileList] = useState(files);
	const [users, setUsers] = useState([]);
	const [selectedAdviser, setSelectedAdviser] = useState();
	const [selectedUser, setSelectedUser] = useState({});
	const [members, setMembers] = useState(workspace.members);
	const [workspaceInfo, setWorkspaceInfo] = useState(workspace);

	useEffect(() => {
		setFileList(files);
	}, [files]);

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
	});

	async function editWorkspace(data, e) {
		e.preventDefault();
		console.log(data);
		const response = await fetch(process.env.BACKEND_API_UR + `/workspaces/${workspace.id}/`, {
			method: 'PATCH',
			headers: HEADER,
			body: JSON.stringify({
				name: data.name,
			}),
		});
		const result = await response.json();

		setValue('name', result.data.name);
		// setValue('members', result.data.members);
	}

	async function searchAdviser(text) {
		setAdvisers([]);
		if (text != '') {
			const requestAdviser = await createRequest(`/users?type=adviser&name=${text}`, 'get', {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('access_token')}`,
			});

			if (requestAdviser.error) return console.log(requestAdviser.error);
			const { data } = requestAdviser;
			setAdvisers(data.data);
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
			console.log(data);
			setUsers(data.data);
		} else {
			setUsers([]);
		}
	}

	async function editAdviser(data) {
		console.log(data.id);

		const response = await fetch(process.env.BACKEND_API_UR + `/workspaces/${workspace.id}/`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('access_token')}`,
			},
			body: JSON.stringify({ adviser: data.id }),
		});
		const update = await response.json();
		console.log(update);

		setValue('adviser', update.data.adviser.first_name + ' ' + update.data.adviser.last_name);
		alert('Adviser Added take a look at the workspace info');
		setTimeout(() => {
			setSelectedAdviser('');
			setAdvisers([]);
		}, 3000);
	}

	async function addMember(data) {
		console.log(data.id);
		const memberIds = members.map((val) => val.id);
		const dataToSend = [...memberIds, data.id];
		const response = await fetch(process.env.BACKEND_API_UR + `/workspaces/${workspace.id}/`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('access_token')}`,
			},
			body: JSON.stringify({ members: dataToSend }),
		});
		const update = await response.json();
		console.log(update.data);
		setMembers(update.data.members);
		alert('Member Added take a look at the workspace info');
		setTimeout(() => {
			setUsers([]);
		}, 3000);
	}

	async function deleteWorkspace(e) {
		e.preventDefault();
		const response = await fetch(process.env.BACKEND_API_UR + `/workspaces/${workspace.id}/`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('access_token')}`,
			},
			body: JSON.stringify({ isActive: false }),
		});
		const result = await response.json();
		console.log(result);

		return router.replace(`/workspaces?user=${user.id}`);
	}
	async function deleteFile(file, e) {
		e.preventDefault();
		const response = await fetch(process.env.BACKEND_API_UR + `/workspaces/files/${file.id}/`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('access_token')}`,
			},
			body: JSON.stringify({ isActive: false }),
		});
		const result = await response.json();
		const { data } = result;
		setFileList(fileList.filter((val) => val.id !== data.id));
	}

	return (
		<div>
			<header className={styles.page__header}>
				<h1 className={styles.page__title}>{workspace.name}</h1>
				<div className={styles.page__tools}>
					<ChipList
						chips={useWorkspaceFilters()}
						defaultVal={router.query.status ? router.query.status : 'all'}
					/>
					<div>
						<CustomizedDialogs
							maxWidth='md'
							openBtn={<Button variant='contained'>Add File</Button>}
							title='Add File'
						>
							<CustomTabs
								tabs={[
									{
										label: 'Create File',
										value: 'create',
										content: <CreateFile fileList={fileList} setFileList={setFileList} />,
									},
									{
										label: 'Import Resources',
										value: 'import',
										content: (
											<ImportResource fileList={fileList} setFileList={setFileList} />
										),
									},
								]}
								defaultVal='create'
							/>
						</CustomizedDialogs>
						<CustomizedDialogs
							title='Workspace Info'
							openBtn={<Button>Workspace Info</Button>}
							primaryAction={
								<Button onClick={handleSubmit(editWorkspace)}>Save Changes</Button>
							}
						>
							<form>
								<TextField fullWidth label='Workspace Name' {...register('name')} />

								<h3>Creator: </h3>
								<Avatar src={workspaceInfo.creator.profileImage} />
								<p>
									{workspaceInfo.creator.first_name} {workspaceInfo.creator.last_name}
								</p>
								<h3>Adviser: </h3>
								<Avatar src={workspaceInfo.adviser.profileImage} />
								<p>
									{workspaceInfo.adviser.first_name} {workspaceInfo.adviser.last_name}
								</p>
								<h3>Members:</h3>
								<ul>
									{workspaceInfo.members.map((member) => (
										<li key={member.id}>
											<Avatar src={member.profileImage} />
											<p>
												{member.first_name} {member.last_name}
											</p>
										</li>
									))}
								</ul>
								{/* <TextField fullWidth label='Creator' disabled {...register('creator')} />
								<TextField fullWidth label='Adviser' disabled {...register('adviser')} /> */}
								<CustomizedDialogs
									title='Add Adviser'
									openBtn={<Button>Edit Adviser</Button>}
									primaryAction={<Button>Add</Button>}
								>
									<p>Type something and select from the results to add</p>
									<TextField
										label='Type to Search Adviser'
										fullWidth
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
								</CustomizedDialogs>
							</form>
						</CustomizedDialogs>
					</div>
				</div>
			</header>
			<main>
				<div className='card-container'>
					{fileList?.map((val) => (
						<UtilityCard
							key={val.id}
							title={val.name}
							illustration={fileIllustration}
							actions={
								<>
									<Button
										variant='contained'
										onClick={() => {
											router.push(`/workspaces/${workspace.id}/${val.id}`);
										}}
										className={`${styles.fileCard_action_btn} ${styles.primary}`}
									>
										Open
									</Button>
									<Button
										variant='contained'
										color='error'
										onClick={(e) => deleteFile(val, e)}
										className={`${styles.fileCard_action_btn} ${styles.error}`}
									>
										Delete
									</Button>
								</>
							}
						/>
					))}
				</div>
			</main>
			{/* <h1>Workspace Info</h1>
			<form onSubmit={handleSubmit(editWorkspace)}>
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
				<div className='form_field'>
					<select name='members' multiple {...register('members')}>
						{members.map((val) => (
							<option key={val.id} value={val.id}>
								{val.first_name + ' ' + val.last_name}
							</option>
						))}
					</select>
					<label htmlFor='members'> Members: </label>
				</div>
				<button type='submit'>Save Workspace</button>
				<button onClick={(e) => deleteWorkspace(e)}>Delete workspace</button>
			</form>
			<h1>Add Workspace File Form</h1>
			
			<h1>Workspace File List</h1>
			<section className={styles.fileList}>
				{fileList?.map((val) => (
					<div key={val.id} className={styles.fileCard}>
						<h2 className={styles.fileCard_title}>{val.name}</h2>
						<div className={styles.fileCard_action}>
							<button
								onClick={() => {
									router.push(`/workspaces/${workspace.id}/${val.id}`);
								}}
								className={`${styles.fileCard_action_btn} ${styles.primary}`}
							>
								Open
							</button>
							<button
								onClick={(e) => deleteFile(val, e)}
								className={`${styles.fileCard_action_btn} ${styles.error}`}
							>
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
				{users?.map((val) => (
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
			</div> */}
		</div>
	);
}

export async function getServerSideProps(context) {
	const { query, req } = context;
	const accessToken = req.cookies.access_token;
	const workspaceID = query.id;
	const { status } = query;
	let fileQueryLink = status
		? `/workspaces/files?workspace=${workspaceID}&status=${status}`
		: `/workspaces/files?workspace=${workspaceID}`;

	const props = {};

	// Workspace Instance

	const response = await createRequest(`/workspaces/${workspaceID}`, 'get', {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${accessToken}`,
	});

	const { data: workspace } = response.data;
	// console.log(workspace);

	props.workspace = workspace;

	// Files

	const responseFile = await createRequest(fileQueryLink, 'get', {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${accessToken}`,
	});

	const { error: error2 } = responseFile;

	const { data: files } = responseFile.data;
	props.files = files;
	console.log(files);

	return { props };
}

OneWorkspace.Layout = PageLayout;

export default OneWorkspace;
