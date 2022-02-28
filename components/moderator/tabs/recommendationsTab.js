import React from "react";

import styles from "./recommendation.module.scss";

import ArticleCard from "../../reusable/articleCard";
import fileImg from "../../../public/file_illustration.svg";
import emptyIllustration from "../../../public/no_data_illustration.svg";

import Image from "next/image";
import { Button } from "@mui/material";

function RecommendationsTab({ recommendationList, setRecommendationList }) {
	return (
		<>
			<div className={styles.mainContainer}>
				{recommendationList.length > 0 ? (
					<div className={styles.container}>
						{recommendationList?.map((item) => (
							<div className={styles.containerItem}>
								<ArticleCard
									title={item.title}
									subtitle={
										item.adviser.first_name + " " + item.adviser.last_name
									}
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
				) : (
					<div className={styles.emptyContainer}>
						<div className={styles.illustration}>
							<Image
								src={emptyIllustration}
								layout="fill"
								objectFit="contain"
								className={styles.illustration}
							></Image>
						</div>
						<p>
							You have no recommended files yet.{" "}
							{/* <strong>Publish now </strong> */}
						</p>
					</div>
				)}
			</div>
		</>
	);
}

export default RecommendationsTab;
