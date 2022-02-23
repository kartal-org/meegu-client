import React from 'react';

//validation
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import UtilityCard from '../reusable/utilityCard';
import workspaceIllustration from '../../public/workspace-illustration.png';
import styles from './createFile.module.scss';
import CustomizedDialogs from '../reusable/dialog2';
import { Button, TextField } from '@mui/material';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const HEADER = {
	Authorization: `Bearer ${Cookies.get('access_token')}`,
	// 'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
	// accept: '*/*',
};
function CreateFile({ setFileList, fileList }) {
	const { register, handleSubmit, reset, getValues } = useForm();
	const router = useRouter();

	async function createFile(data, e) {
		e.preventDefault();
		const { name } = data;
		const formData = new FormData();
		formData.append('name', name);
		formData.append('isActive', true);
		formData.append('workspace', parseInt(router.query.id));
		const request = await fetch(process.env.BACKEND_API_UR + `/workspaces/files`, {
			method: 'POST',
			headers: HEADER,
			body: formData,
		});
		const result = await request.json();
		console.log(result);
		setFileList([...fileList, result.data]);
	}

	async function uploadFile() {}
	return (
		<div className={styles.container}>
			<CustomizedDialogs
				openBtn={
					<UtilityCard
						title='Create Document File'
						illustration={workspaceIllustration}
					></UtilityCard>
				}
				title='Create Document File'
				primaryAction={<Button onClick={handleSubmit(createFile)}>Create</Button>}
			>
				<form onSubmit={handleSubmit(createFile)}>
					<TextField fullWidth label='File Name' {...register('name')} />
				</form>
			</CustomizedDialogs>

			<CustomizedDialogs
				openBtn={
					<UtilityCard title='Upload File' illustration={workspaceIllustration}></UtilityCard>
				}
				title='Upload File'
				primaryAction={<Button>Upload</Button>}
			>
				<input type='file' />
			</CustomizedDialogs>
		</div>
	);
}

export default CreateFile;
