import { useRouter } from 'next/router';
import React from 'react';
import PageLayout from '../../layouts/pageLayout';

function index({ articles }) {
	const router = useRouter();
	function viewFile(item) {
		console.log(item);
		router.push(`/articles/${item}`);
	}
	return (
		<div>
			Home
			{articles?.map((article) => (
				<div onClick={() => viewFile(article.id)} key={article.id}>
					{article.title}
				</div>
			))}
		</div>
	);
}

export async function getServerSideProps({ req, query }) {
	const props = {};

	const request = await fetch(process.env.BACKEND_API_UR + '/publications', {
		headers: {
			Authorization: `Bearer ${req.cookies.access_token}`,
		},
	});
	const result = await request.json();
	console.log(result);
	props.articles = result;
	return { props };
}

index.Layout = PageLayout;
export default index;
