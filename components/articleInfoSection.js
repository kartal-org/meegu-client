import React from 'react';

function ArticleInfoSection({ article }) {
	return (
		<div>
			<div>
				<h4>Article Title: {article.title}</h4>
				<h4>Institution: {article.institution.name}</h4>
				<h4>Abstract: {article.abstract}</h4>
				<h4>Citations: {article.citation}</h4>
			</div>
		</div>
	);
}

export default ArticleInfoSection;
