import React from "react";
import SubsCard from "../../reusable/subsCard";

import styles from "./tabs.module.scss";
// import { PayPalButtons } from '@paypal/react-paypal-js';
import Paypal from "../../../helpers/paypal";
import CustomizedDialogs from "../../reusable/dialog2";
import { Button } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import UtilityCard from "../../reusable/utilityCard";
import promoPic from "../../../public/classroom.png";
import { useRouter } from "next/router";

function SubscriptionTab() {
	const [plans, setPlans] = useState([]);
	const router = useRouter();

	async function fetchPlans() {
		const request = await fetch(
			process.env.BACKEND_API_UR + `/transactions/plans`,
			{
				headers: {
					Authorization: `Bearer ${Cookies.get("access_token")}`,
				},
			}
		);
		const result = await request.json();
		console.log(result);
		setPlans(result);
	}

	useEffect(() => {
		fetchPlans();
	}, []);
	return (
		<>
			<div className={styles.subscriptionContainer}>
				{/* <CustomizedDialogs
					title="Buy Subscription"
					openBtn={<Button>Buy Subscription</Button>}
					maxWidth="md"
				>
					<h3>Please Select Your Plan </h3>
					<br />
					<div className="card-container">
						{plans?.map((plan) => (
							<CustomizedDialogs
								key={plan.id}
								title="Buy Subscription"
								openBtn={
									<UtilityCard illustration={promoPic} title={plan.name}>
										<p>
											<em>PHP {plan.price}</em>
										</p>
										<p>{plan.description}</p>
									</UtilityCard>
								}
							>
								<Paypal institution={router.query.id} plan={plan} />
							</CustomizedDialogs>
						))}
					</div>
				</CustomizedDialogs> */}

				<div className={styles.subsContainerItem}>
					<div>
						<CustomizedDialogs
							title="Buy Subscription"
							openBtn={<Button>Buy Subscription</Button>}
							maxWidth="md"
						>
							<h3>Please Select Your Plan </h3>
							<br />
							<div className="card-container">
								{plans?.map((plan) => (
									<CustomizedDialogs
										key={plan.id}
										title="Buy Subscription"
										openBtn={
											<UtilityCard illustration={promoPic} title={plan.name}>
												<p>
													<em>PHP {plan.price}</em>
												</p>
												<p>{plan.description}</p>
											</UtilityCard>
										}
									>
										<Paypal institution={router.query.id} plan={plan} />
									</CustomizedDialogs>
								))}
							</div>
						</CustomizedDialogs>
					</div>
				</div>

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
