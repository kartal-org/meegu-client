import React from 'react';
import PdfViewer from '../../components/pdfViewer';
import PageLayout from '../../layouts/pageLayout';

function ArticleViewer({ article }) {
	const pdfFile = article.recommendation ? article.recommendation.file.pdf : article.pdf;
	const richTextFile = article.recommendation
		? article.recommendation.file.richText
		: article.richText;

	return (
		<div className={styles.page__container}>
			<header className={styles.page__header}>
				<h1 className={styles.article__title}>{article.title}</h1>
			</header>
			<main className={styles.page__content}>
				{pdfFile ? (
					<PdfViewer file={pdfFile} />
				) : (
					<div
						className='article-content'
						dangerouslySetInnerHTML={{ __html: richTextFile }}
					/>
				)}
			</main>
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
