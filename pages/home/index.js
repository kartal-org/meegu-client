import { useRouter } from "next/router";
import React from "react";

import styles from "./home.module.scss";

import ArticleCard from "../../components/reusable/articleCard";
import ChipList from "../../components/reusable/chips";
import fileImg from "../../public/file_illustration.svg";
import PageLayout from "../../layouts/pageLayout";

import { Button } from "@mui/material";
import { useHomeFilters } from "../../hooks/useHomeFilters";

function index({ articles }) {
	const router = useRouter();
	function viewFile(item) {
		console.log(item);
		router.push(`/articles/${item}`);
	}
	return (
		<>
			<div className={styles.chips}>
				<ChipList
					chips={useHomeFilters()}
					defaultVal={router.query.status ? router.query.status : "all"}
				/>
			</div>
			<div className={styles.home}>
				{articles?.map((article) => (
					<div onClick={() => viewFile(article.id)} key={article.id}>
						<ArticleCard
							title={article.title}
							subtitle="PDF"
							content={article.abstract}
							illustration={fileImg}
							actions={
								<>
									<Button variant="contained">Open</Button>
								</>
							}
						></ArticleCard>
					</div>
				))}
			</div>
		</>
	);
}

export async function getServerSideProps({ req, query }) {
	const props = {};

	const request = await fetch(process.env.BACKEND_API_UR + "/publications", {
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
