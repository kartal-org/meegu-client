import React, { useState } from "react";
import Link from "next/link";

import ArticleCard from "../../../components/reusable/articleCard";
import DeptCard from "../../../components/reusable/deptCard";
import CustomizedDialogs from "../../reusable/dialog2";

import styles from "./tabs.module.scss";
import fileImg from "../../../public/file_illustration.svg";
import emptyIllustration from "../../../public/no_data_illustration.svg";

import { Button } from "@mui/material";
import CustomTabs from "../../reusable/tabs";
import SelectFile from "../selectFile";
import UploadFile from "../uploadFile";
import Image from "next/image";

function ArticlesTab({
	recommendationList,
	setRecommendationList,
	institution,
	articles,
	canPublish,
}) {
	const [articleList, setArticleList] = useState(articles);

	return (
		<>
			<div className={styles.container}>
				<div className={styles.containerItem}>
					<div className={styles.createBtn}>
						{canPublish && (
							<CustomizedDialogs
								openBtn={<Button>Add Article</Button>}
								title="Add Article"
								primaryAction={<Button>Done</Button>}
							>
								<CustomTabs
									tabs={[
										{
											label: "Upload File",
											value: "upload",
											content: (
												<UploadFile
													institutionID={institution.id}
													articleList={articleList}
													setArticleList={setArticleList}
												/>
											),
										},
										{
											label: "Select from recommendations",
											value: "select from recommendations",
											content: (
												<SelectFile
													institutionID={institution.id}
													recommendationList={recommendationList}
													setRecommendationList={setRecommendationList}
													articleList={articleList}
													setArticleList={setArticleList}
												/>
											),
										},
									]}
								/>
							</CustomizedDialogs>
						)}
					</div>

					{articleList.length > 0 ? (
						<div>
							{articleList.map((item) => (
								<ArticleCard
									key={item.id}
									title={item.title}
									subtitle="PDF"
									content={item.abstract}
									illustration={fileImg}
									// actions={
									// 	<>
									// 		<Button variant='contained'>Open</Button>
									// 	</>
									// }
								></ArticleCard>
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
								You have not published any articles yet.{" "}
								<strong>Publish now </strong>
							</p>
						</div>
					)}
				</div>

				<div className={styles.containerItem}>
					<DeptCard deptName="Deparment 1"></DeptCard>
				</div>
			</div>
		</>
	);
}

export default ArticlesTab;
