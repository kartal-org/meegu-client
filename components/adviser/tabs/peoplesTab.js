import React, { useState } from "react";
import PageLayout from "../../../layouts/pageLayout";
import PeopleCard from "../../reusable/peopleCard";
import styles from "./tabs.module.scss";

import fileImg from "../../../public/Files.png";
import { Button, TextField } from "@mui/material";
import CustomizedDialogs from "../../reusable/dialog2";

function PeoplesTab({ members }) {
	const [membersList, setMembersList] = useState(members);
	return (
		<>
			<div className={styles.addPeopleBtn}>
				<CustomizedDialogs
					title="Add People"
					primaryAction={<Button>Add</Button>}
					openBtn={<Button>Add People</Button>}
				>
					<form className={styles.addPeopleForm}>
						<TextField fullWidth label="Username" />
					</form>
				</CustomizedDialogs>
			</div>
			<div className={styles.peopleContainer}>
				{membersList.map((member) => (
					<PeopleCard
						key={member.id}
						name={`${member.user.first_name} ${member.user.last_name}`}
						role={member.user.type}
						avatar={member.user.profileImage}
					></PeopleCard>
				))}
			</div>
		</>
	);
}

export default PeoplesTab;
