import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import PdfViewer from '../../components/pdfViewer';
import QuillEditor from '../../components/quillEditor';
import { useSnackBarUpdate } from '../../contexts/useSnackBar';
import PageLayout from '../../layouts/pageLayout';
import styles from './resourceViewer.module.scss';
import Cookies from 'js-cookie';

function ResourceViewer({ resource }) {
	const [quillContent, setQuillContent] = useState(resource.richText);
	const router = useRouter();
	const snackBarUpdate = useSnackBarUpdate();
	console.log(resource);
	async function importResource(resource) {
		const request = await fetch(process.env.BACKEND_API_UR + '/resources/import', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${Cookies.get('access_token')}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				resource,
				workspace: router.query.workspace,
			}),
		});
		const result = await request.json();
		console.log(result);
		snackBarUpdate(true, 'Resource Imported!');
	}
	return (
		<div className={styles.page}>
			<div className={styles.page_header}>
				<h1 className={styles.resource__title}>{resource.name}</h1>
				<Button onClick={() => importResource(resource.id)}>Import Resource</Button>
			</div>
			<div className={styles.page__content}>
				{resource.pdf && <PdfViewer file={resource.pdf} />}
				{!resource.pdf && <QuillEditor initialData={quillContent} setData={setQuillContent} />}
			</div>
		</div>
	);
}

export async function getServerSideProps({ req, query }) {
	const props = {};
	const { access_token } = req.cookies;
	const { id } = query;

	const request = await fetch(process.env.BACKEND_API_UR + `/resources/${id}`, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	});
	const result = await request.json();
	props.resource = result;

	return { props };
}
ResourceViewer.Layout = PageLayout;

export default ResourceViewer;
