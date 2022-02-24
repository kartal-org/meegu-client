import React from "react";
import Link from "next/link";

import ArticleCard from "../../../components/reusable/articleCard";
import DeptCard from "../../../components/reusable/deptCard";

import styles from "./tabs.module.scss";
import fileImg from "../../../public/Files.png";

import { Button } from "@mui/material";

export default function ArticlesTab() {
	return (
		<>
			<div className={styles.container}>
				<div className={styles.containerItem}>
					<div className={styles.createBtn}>
						<Button>Add Article</Button>
					</div>
					<ArticleCard
						title="Article 1"
						subtitle="Maria Thania Sinogaya"
						content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper magna sit amet metus posuere aliquet. Nullam auctor ligula nec odio iaculis, et auctor sem accumsan. Duis vel efficitur mi. Sed rutrum lectus et nunc maximus vulputate. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam a porta quam, sit amet aliquet nisl. Nulla et erat interdum turpis gravida blandit ac vitae purus. Fusce scelerisque odio vitae diam semper, eu luctus mauris gravida."
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

				<div className={styles.containerItem}>
					<DeptCard deptName="Deparment 1"></DeptCard>
				</div>
			</div>
		</>
	);
}
