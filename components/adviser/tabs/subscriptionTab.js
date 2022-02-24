import React from "react";
import SubsCard from "../../reusable/subsCard";

import styles from "./tabs.module.scss";

function SubscriptionTab() {
	return (
		<>
			<div className={styles.Subscriptioncontainer}>
				<div className={styles.subsContainerItem}>fghkgh</div>

				<div className={styles.subsContainerItem}>
					<SubsCard
						title="Subscription Plan"
						subtitle="Current Subscription Plan"
					></SubsCard>
				</div>
			</div>
		</>
	);
}

export default SubscriptionTab;
