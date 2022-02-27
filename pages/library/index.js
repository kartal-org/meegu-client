import { useRouter } from 'next/router';
import { useState } from 'react';
import React from 'react';
import Cookies from 'js-cookie';

import PageLayout from '../../layouts/pageLayout';
import ArticleCard from '../../components/reusable/articleCard';
import styles from './library.module.scss';

import fileImg from '../../public/file_illustration.svg';

import { Button } from '@mui/material';

function index({ libItems }) {
	const [libraryList, setLibraryList] = useState(libItems);
	const router = useRouter();

	function viewFile(item) {
		console.log(item);
		router.push(`/articles/${item}`);
	}

	async function deleteFile(libItem) {
		// e.preventDefault();
		const response = await fetch(process.env.BACKEND_API_UR + `/libraries/${libItem}/`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('access_token')}`,
			},
		});
		const result = await response.json();
		setLibraryList(libraryList.filter((val) => val.id !== result.id));
	}

	return (
		<>
			<div className={styles.library}>
				{libraryList?.map((lib) => (
					<article
						key={lib.id}
						// onClick={() => viewFile(lib.article.id)}
					>
						<ArticleCard
							title={lib.article.title}
							subtitle='PDF'
							content={lib.article.abstract}
							illustration={fileImg}
							actions={
								<>
									<Button variant='contained'>Open</Button>
								</>
							}
						>
							<Button onClick={() => deleteFile(lib.id)}> Remove from Library</Button>
						</ArticleCard>
					</article>
				))}
			</div>
		</>
	);
}

export async function getServerSideProps(context) {
	const { req, query } = context;
	const articleID = query.id;
	const props = {};

	const request = await fetch(process.env.BACKEND_API_UR + `/libraries/`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${req.cookies.access_token}`,
		},
	});
	const result = await request.json();
	console.log(result);
	props.libItems = result;

	return { props };
}

index.Layout = PageLayout;
export default index;
