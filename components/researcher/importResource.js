import React, { useState } from 'react';
import styles from './resource.module.scss';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';

//validation
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Cookies from 'js-cookie';

function ImportResource() {
	const [resourceList, setResourceList] = useState([]);
	const {
		register,
		handleSubmit,
		resetField,
		formState: { errors },
	} = useForm({});
	async function searchResource(data, e) {
		const access_token = Cookies.get('access_token');
		e.preventDefault();
		console.log(data);
		// request = get /resources?forStudent=true&search=data.searchText
		const request = await fetch(
			process.env.BACKEND_API_UR + `/resources?forStudent=${true}&search=${data.searchText}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${access_token}`,
					'Content-Type': 'application/json',
				},
			}
		);
		const result = await request.json();
		console.log(result);
	}
	return (
		<div>
			<header className={styles.header}>
				<form onSubmit={handleSubmit(searchResource)} className={styles.searchbox}>
					<input
						className={styles.searchinput}
						type='search'
						placeholder='Search Resources'
						{...register('searchText')}
					/>

					<IconButton type='submit' sx={{ p: '10px' }} aria-label='search'>
						<SearchIcon />
					</IconButton>
				</form>
			</header>
			<main className={styles.container}>
				{resourceList?.map((resource) => (
					<article key={resource.id} className={styles.card}>
						<h3>{resource.title}</h3>
						<p>{resource.institution.name}</p>
						<p>{resource.description}</p>
						<button>Import</button>
						<button>Open</button>
					</article>
				))}
			</main>
		</div>
	);
}

export default ImportResource;
