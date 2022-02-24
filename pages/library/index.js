import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';
import PageLayout from '../../layouts/pageLayout';

function index({ libItems }) {
	const [libraryList, setLibraryList] = useState(libItems);
	const router = useRouter();
	function viewFile(item) {
		console.log(item);
		router.push(`/articles/${item}`);
	}
	return (
		<div>
			Library
			{libraryList?.map((lib) => (
				<article key={lib.id} onClick={() => viewFile(lib.article.id)}>
					{lib.article.title}
				</article>
			))}
		</div>
	);
}

export async function getServerSideProps(context) {
	const { req, query } = context;
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
