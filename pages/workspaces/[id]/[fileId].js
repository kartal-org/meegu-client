import React, { useState } from 'react';
import PageLayout from '../../../layouts/pageLayout';

//validation
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import styles from '../../../styles/workspaces/oneFile.module.scss';
import { emphasize } from '@mui/material';
import Cookies from 'js-cookie';
import { useUser } from '../../../contexts/userProvider';

import { useRouter } from 'next/router';

function OneFile({ file, comments }) {
	const [commentList, setCommentList] = useState(comments);
	const user = useUser();
	const router = useRouter();
	const {
		register, // register inputs
		handleSubmit, // handle form submit
		resetField,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: file.name,
			richText: file.richText,
			status: file.status,
			isActive: file.isActive,
		},
	});
	const {
		register: commentRegister, // register inputs
		handleSubmit: commentSubmit, // handle form submit
		reset: commentReset,
		formState: { errors: commentErrors },
	} = useForm({});

	async function editFile(data, e) {
		e.preventDefault();
		console.log(data);
		const response = await fetch(process.env.BACKEND_API_UR + `/workspaces/files/${file.id}/`, {
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${Cookies.get('access_token')}`,
				'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
				accept: '*/*',
			},
			body: JSON.stringify({ name: data.name, status: data.status, richText: data.richText }),
		});
		const result = await response.json();
		const { data: fileResult } = result;

		setValue('name', fileResult.name);
		setValue('richText', fileResult.richText);
		setValue('status', fileResult.status);
		console.log(fileResult);
	}
	async function createComment(data, e) {
		e.preventDefault();
		console.log(data);
		const request = await fetch(process.env.BACKEND_API_UR + `/classrooms/comments`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('access_token')}`,
			},
			body: JSON.stringify({ author: user.id, content: data.content, file: file.id }),
		});
		const result = await request.json();
		console.log(result);
		setCommentList([...commentList, result]);
		commentReset({ content: '' });
	}

	async function deleteFile(e) {
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
		router.replace(`/workspaces/${file.workspace}/`);
	}
	return (
		<div>
			<section className={styles.file}>
				<h1>File Info</h1>
				<form className={styles.file_form} onSubmit={handleSubmit(editFile)}>
					<div className={styles.file_form_field}>
						<label htmlFor='name'>File Name: </label>
						<input type='text' {...register('name')} />
					</div>
					<div className={styles.file_form_field}>
						<label htmlFor='richText'>Content: </label>
						<input type='text' {...register('richText')} />
					</div>
					<div className={styles.file_form_field}>
						<label htmlFor='status'>Status: </label>
						<select name='status' {...register('status')}>
							<option value='ongoing'>Ongoing</option>
							<option value='accepted'>Accepted</option>
							<option value='submitted'>Submitted</option>
							<option value='rejected'>Rejected</option>
							<option value='published'>Published</option>
						</select>
					</div>
					<div className={styles.file_form_field}>
						<label htmlFor='isActive'>Is Active: </label>
						<input type='checkbox' {...register('isActive')} />
					</div>
					<button type='submit'>Save Edit</button>
					<button onClick={deleteFile}>Delete File</button>
				</form>
			</section>
			<section>
				<h1>Comment Section</h1>
				<form onSubmit={commentSubmit(createComment)}>
					<div className={styles.form_field}>
						<textarea
							name='comment'
							rows='4'
							cols='50'
							placeholder='Type to comment'
							{...commentRegister('content')}
						></textarea>
					</div>
					<button type='submit'>Comment</button>
				</form>
				<div className={styles.list}>
					{commentList?.map((comment) => (
						<article key={comment.id} className={styles.comment}>
							<p className={styles.comment_author}>
								<strong>
									{comment.author.first_name} {comment.author.last_name}
								</strong>
							</p>
							<p className={styles.comment_content}>{comment.content}</p>
							<p className={styles.comment_date}>
								<em>{comment.dateUpdated}</em>
							</p>
							<hr />
						</article>
					))}
				</div>
			</section>
		</div>
	);
}

export async function getServerSideProps(context) {
	const { req, res, query } = context;
	const { fileId } = query;
	const { access_token } = req.cookies;
	const props = {};

	const HEADER = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${access_token}`,
	};

	const fileInfoRequest = await fetch(process.env.BACKEND_API_UR + `/workspaces/files/${fileId}`, {
		method: 'GET',
		headers: HEADER,
	});

	const fileInfo = await fileInfoRequest.json();
	props.file = fileInfo.data;

	const commentsRequest = await fetch(
		process.env.BACKEND_API_UR + `/classrooms/comments?file=${fileId}`,
		{
			method: 'GET',
			headers: HEADER,
		}
	);

	const commentsResult = await commentsRequest.json();
	console.log(commentsResult);
	props.comments = commentsResult;
	return { props };
}

OneFile.Layout = PageLayout;

export default OneFile;
