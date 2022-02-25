import React from "react";
import ArticleCard from "../reusable/articleCard";
import styles from "./tabs/tabs.module.scss";

import fileImg from "../../public/file_illustration.svg";

import { Button } from "@mui/material";

function SelectFile({ recommendationList, setRecommendationList }) {
	return (
		<>
			<div>
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

export default SelectFile;
