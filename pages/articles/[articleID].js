import React from 'react';
import PdfViewer from '../../components/pdfViewer';
import PageLayout from '../../layouts/pageLayout';

function ArticleViewer({ article }) {
	const file = article.recommendation ? article.recommendation.file.pdf : article.pdf;

	return (
		<div>
			<PdfViewer file={file} />
		</div>
	);
}

export async function getServerSideProps(context) {
	const { req, query } = context;
	const props = {};

	const request = await fetch(process.env.BACKEND_API_UR + `/publications/${query.articleID}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${req.cookies.access_token}`,
		},
	});
	const result = await request.json();
	console.log(result);
	props.article = result;

	return { props };
}
ArticleViewer.Layout = PageLayout;
export default ArticleViewer;
