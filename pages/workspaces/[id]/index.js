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

	// file form
	const {
		register: fileRegister,
		handleSubmit: fileSubmit,
		formState: { errors: fileErrors },
	} = useForm({});

	async function editWorkspace(data, e) {
		e.preventDefault();
		console.log(data);
		const response = await fetch(process.env.BACKEND_API_UR + `/workspaces/${workspace.id}/`, {
			method: 'PATCH',
			headers: HEADER,
			body: JSON.stringify({
				name: data.name,
				members: data.members,
			}),
		});
		const result = await response.json();

		setValue('name', result.data.name);
		setValue('members', result.data.members);
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

	async function addFile(data, e) {
		e.preventDefault();
		console.log(data.pdf[0]);
		const formData = new FormData();
		formData.append('name', data.name);
		formData.append('richText', data.richText);
		formData.append('status', data.status);
		formData.append('name', data.name);
		formData.append('pdf', data.pdf[0], data.pdf[0].name);
		formData.append('workspace', workspace.id);
		formData.append('isActive', true);

		const response = await fetch(process.env.BACKEND_API_UR + `/workspaces/files`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${Cookies.get('access_token')}`,
			},
			body: formData,
		});
		const result = await response.json();
		const { data: file } = result;
		console.log(file);
		setFileList([...fileList, file]);
		addFileForm.current.reset();
	}

	return (
		<div>
			<h1>Workspace Info</h1>
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
			<form ref={addFileForm} onSubmit={fileSubmit(addFile)}>
				<div>
					<label htmlFor='name'>File Name:</label>
					<input type='text' name='name' {...fileRegister('name')} />
				</div>
				<div>
					<label htmlFor='pdf'>Upload File</label>

					<input type='file' name='pdf' {...fileRegister('pdf')} />
				</div>
				<div>
					<label htmlFor='richText'>Template Content(quill):</label>
					<textarea
						name='richText'
						{...fileRegister('richText')}
						cols='30'
						rows='10'
					></textarea>
				</div>
				<div>
					<label htmlFor='status'>Status: </label>
					<select name='status' {...fileRegister('status')}>
						<option value='ongoing'>Ongoing</option>
						<option value='accepted'>Accepted</option>
						<option value='submitted'>Submitted</option>
						<option value='rejected'>Rejected</option>
						<option value='published'>Published</option>
					</select>
				</div>

				<button type='submit'>Add File</button>
			</form>

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

	return { props };
}

OneWorkspace.Layout = PageLayout;

export default OneWorkspace;
