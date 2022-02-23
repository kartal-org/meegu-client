import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Cookies from 'js-cookie';

import { TextField, Button, InputLabel, MenuItem, FormControl, Select } from '@mui/material';

import PageLayout from '../../../layouts/pageLayout';
import { useUser } from '../../../contexts/userProvider';

function FileInside({ file, comments, institutions }) {
	const user = useUser();
	const [commentList, setCommentList] = useState(comments);
	const [institutionList, setInstitutionList] = useState(institutions);
	const [selectedInstitution, setSelectedInstitution] = useState();

	const handleChange = (event) => {
		setSelectedInstitution(event.target.value);
	};
	// const [age, setAge] = useState("");

	// const handleChange = (event) => {
	// 	setAge(event.target.value);
	// };

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: file?.name,
		},
	});

	const {
		register: registerComment,
		handleSubmit: handleSubmitComment,
		setValue: setValueComment,
		formState: { errors: errorCom },
	} = useForm({});

	const {
		register: registerRecommend,
		handleSubmit: handleSubmitRecommend,
		setValue: setValueRecommend,
		formState: { errors: errorReco },
	} = useForm({});

	async function addComment(comment_data, e) {
		e.preventDefault();
		console.log(comment_data);

		const { content } = comment_data;

		const responseComment = await fetch(process.env.BACKEND_API_UR + `/classrooms/comments`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('access_token')}`,
			},
			body: JSON.stringify({
				author: user.id,
				file: file.id,
				content,
			}),
		});
		const resultComment = await responseComment.json();
		console.log(resultComment);

		setCommentList([resultComment, ...commentList]);
	}
	async function addRecommendation(data, e) {
		e.preventDefault();
		console.log(data);

		// const response = await fetch(process.env.BACKEND_API_UR + `/classrooms`, {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 		Authorization: `Bearer ${Cookies.get("access_token")}`,
		// 	},
		// 	body: JSON.stringify({
		// 		title: data.title,
		// 		description: data.desc,
		// 		adviser: user.id,
		// 		institution: 2,
		// 	}),
		// });

		// const result = await response.json();
		// console.log(result);
		// alert("recommendation success");
	}

	return (
		<>
			This is inside the file
			<div className='border-2 border-blue-300 p-5'>
				<form autoComplete='off'>
					<TextField
						fullWidth
						id='outlined-basic'
						label='File Name'
						variant='outlined'
						{...register('name')}
						autoFocus
					/>
				</form>
			</div>
			<div className='border-4 border-red-400 p-8 mt-6 space-y-4'>
				Create comment here
				<form
					autoComplete='off'
					onSubmit={handleSubmitComment(addComment)}
					className='space-y-4 mt-3'
				>
					<TextField
						fullWidth
						id='outlined-basic'
						label='Comment'
						variant='outlined'
						{...registerComment('content')}
					/>
					<Button type='submit'>Create</Button>
				</form>
			</div>
			<div className='border-4 border-red-400 p-8 mt-6 space-y-4'>
				Comment List
				{commentList?.map((comment) => (
					<div key={comment.id} className='bg-blue-100 p-2'>
						<p className='text-sm'>{comment.content}</p>
						<div className='flex space-x-2'>
							<p className='text-xs'>{comment.author.first_name}</p>
							<p className='text-xs'>{comment.author.last_name}</p>
						</div>
					</div>
				))}
			</div>
			<div className='mt-3 mb-3 border-2 border-gray-500 p-6'>
				{/* <Button variant="text">recommend</Button> */}
				create recommendation here
				<form
					autoComplete='off'
					onSubmit={handleSubmitRecommend(addRecommendation)}
					className='space-y-4 mt-3'
				>
					<TextField
						fullWidth
						id='outlined-basic'
						label='Title'
						variant='outlined'
						{...registerRecommend('title')}
					/>
					<TextField
						fullWidth
						id='outlined-basic'
						label='Description'
						variant='outlined'
						multiline
						rows={4}
						{...registerRecommend('desc')}
					/>
					<FormControl fullWidth>
						<InputLabel id='demo-simple-select-label'>institution</InputLabel>
						<Select
							labelId='demo-simple-select-label'
							id='demo-simple-select'
							value={selectedInstitution}
							label='Institution'
							onChange={handleChange}
						>
							{/* <MenuItem value={10}>Ten</MenuItem>
							<MenuItem value={20}>Twenty</MenuItem>
							<MenuItem value={30}>Thirty</MenuItem> */}
							{institutionList?.map((item) => (
								<MenuItem value={item.id} key={item.id}>
									<div className='bg-red-100 p-2'>
										<p>{item.name}</p>
									</div>
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<Button type='submit'>Create</Button>
				</form>
			</div>
			<div className='mt-5 mb-5 border-2 border-gray-500 p-6'>
				<p> Instituitions here </p>

				{institutions?.map((item) => (
					<div key={item.id} className='bg-red-100 p-2'>
						<p>{item.name}</p>
					</div>
				))}
			</div>
		</>
	);
}

export async function getServerSideProps(context) {
	const { req, res, query } = context;
	const access_token = req.cookies.access_token;
	const fileID = query.fileID;
	const props = {};

	//response for file detail
	const response = await fetch(process.env.BACKEND_API_UR + `/workspaces/files/${fileID}/`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${access_token}`,
		},
	});

	const result = await response.json();
	console.log(result);
	props.file = result.data;

	//response for comment
	const responseComment = await fetch(
		process.env.BACKEND_API_UR + `/classrooms/comments?file=${fileID}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${access_token}`,
			},
		}
	);

	const resultComment = await responseComment.json();
	console.log(resultComment);
	props.comments = resultComment;

	//response for get institution
	const responseGetInstitution = await fetch(
		process.env.BACKEND_API_UR + `/institutions?isStaff=${true}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${access_token}`,
			},
		}
	);

	const resultInstitution = await responseGetInstitution.json();
	console.log(resultInstitution);
	props.institutions = resultInstitution;

	return { props };
}

FileInside.Layout = PageLayout;
export default FileInside;
