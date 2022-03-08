import React, { useEffect, useState } from 'react';
import styles from './resource.module.scss';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, Button, IconButton, TextField } from '@mui/material';

//validation
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { Box } from '@mui/system';

const access_token = Cookies.get('access_token');

import ArticleCard from '../reusable/articleCard';
import pdfImg from '../../public/pdf-file.png';
import templateImg from '../../public/template-file.png';

function ImportResource() {
	const [resourceList, setResourceList] = useState([]);
	const [selectedResource, setSelectedResource] = useState();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		resetField,
		formState: { errors },
	} = useForm({});
	async function getResource(searchText) {
		const queryLink = searchText
			? `/resources?forStudent=${true}&search=${searchText}`
			: `/resources?forStudent=${true}`;
		// request = get /resources?forStudent=true&search=data.searchText
		const request = await fetch(process.env.BACKEND_API_UR + queryLink, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${access_token}`,
				'Content-Type': 'application/json',
			},
		});
		const result = await request.json();
		console.log(result);
		setResourceList(result);
	}

	function searchResource(data, e) {
		e.preventDefault();
		getResource(data.searchText);
	}

	useEffect(() => {
		getResource();
	}, []);

	async function importResource(resource) {
		console.log(resource);
		console.log(router.query.id);
		const request = await fetch(process.env.BACKEND_API_UR + '/resources/import', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${access_token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				resource,
				workspace: router.query.id,
			}),
		});
		const result = await request.json();
		console.log(result);
		router.reload();
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
				{resourceList.length > 0 ? (
					<>
						{resourceList?.map((resource) => (
							<article key={resource.id}>
								{resource.pdf ? (
									<ArticleCard
										title={resource.name}
										subtitle={resource.institution.name}
										content={resource.description}
										illustration={pdfImg}
										actions={
											<>
												<Button
													onClick={() =>
														router.push(
															`/resources/${resource.id}?workspace=${router.query.id}`
														)
													}
												>
													Open
												</Button>
											</>
										}
									>
										<Button onClick={() => importResource(resource.id)}>Import</Button>
									</ArticleCard>
								) : (
									<ArticleCard
										title={resource.name}
										subtitle={resource.institution.name}
										content={resource.description}
										illustration={templateImg}
										actions={
											<>
												<Button
													onClick={() =>
														router.push(
															`/resources/${resource.id}?workspace=${router.query.id}`
														)
													}
												>
													Open
												</Button>
											</>
										}
									>
										<Button onClick={() => importResource(resource.id)}>Import</Button>
									</ArticleCard>
								)}
							</article>
						))}
					</>
				) : (
					<p>No resources available</p>
				)}
			</main>
		</div>
	);
}

export default ImportResource;
