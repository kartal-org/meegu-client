import React, { useState } from "react";
import PageLayout from "../../../layouts/pageLayout";
import PeopleCard from "../../reusable/peopleCard";
import styles from "./tabs.module.scss";

import fileImg from "../../../public/Files.png";

function PeoplesTab({ institution, members }) {
	const [membersList, setMembersList] = useState(members);
	return (
		<>
			<div className={styles.peopleContainer}>
				{membersList.map((item) => (
					<PeopleCard
						name={item.name}
						role="Adviser"
						avatar={fileImg}
					></PeopleCard>
				))}
				{/* <PeopleCard
					name="Maria Thania Sinogaya"
					role="Adviser"
					avatar={fileImg}
				></PeopleCard>
				<PeopleCard
					name="Maria Thania Sinogaya"
					role="Adviser"
					avatar={fileImg}
				></PeopleCard> */}
			</div>
		</>
	);
}

export default PeoplesTab;
