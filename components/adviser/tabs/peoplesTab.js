import React from "react";
import PageLayout from "../../../layouts/pageLayout";
import PeopleCard from "../../reusable/peopleCard";
import styles from "./tabs.module.scss";

import fileImg from "../../../public/Files.png";

function PeoplesTab() {
	return (
		<>
			<div className={styles.peopleContainer}>
				<PeopleCard
					name="Maria Thania Sinogaya"
					role="Adviser"
					avatar={fileImg}
				></PeopleCard>
				<PeopleCard
					name="Maria Thania Sinogaya"
					role="Adviser"
					avatar={fileImg}
				></PeopleCard>
			</div>
		</>
	);
}

export default PeoplesTab;
