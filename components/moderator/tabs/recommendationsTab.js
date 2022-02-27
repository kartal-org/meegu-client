import React from "react";

import styles from "./recommendation.module.scss";

import ArticleCard from "../../reusable/articleCard";
import fileImg from "../../../public/file_illustration.svg";

import { Button } from "@mui/material";
function RecommendationsTab({ recommendationList, setRecommendationList }) {
	return (
		<>
			<div className={styles.container}>
				{recommendationList?.map((item) => (
					<div className={styles.containerItem}>
						<ArticleCard
							title={item.title}
							subtitle={item.adviser.first_name + " " + item.adviser.last_name}
							content={item.description}
							illustration={fileImg}
							actions={
								<>
									{/* <Link href={`/institutions/}`}> */}
									<Button variant="contained">Open</Button>
									{/* </Link> */}
								</>
							}
						></ArticleCard>
					</div>
				))}
			</div>
		</>
	);
}

export default RecommendationsTab;
