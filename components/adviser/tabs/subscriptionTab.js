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
	const [transactionList, setTransactionList] = useState([]);
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

	async function fetchTransactions() {
		const request = await fetch(process.env.BACKEND_API_UR + `/transactions`, {
			headers: {
				Authorization: `Bearer ${Cookies.get("access_token")}`,
			},
		});
		const result = await request.json();
		console.log("transaction", result);
		setTransactionList(result);
	}

	useEffect(() => {
		fetchPlans();
		fetchTransactions();
	}, []);
	return (
		<>
			<div className={styles.subscriptionContainer}>
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
						title={transactionList[0] ? transactionList[0].plan.name : "None"}
						subtitle="Latest Subscription Plan"
					></SubsCard>

					<div className={styles.transactionList}>
						{transactionList?.map((item) => (
							<div className={styles.transaction}>
								<img
									alt="Transaction Icon"
									className={styles.transaction_icon}
								></img>
								<div>
									<p className={styles.transaction_highlight}>
										You've successfully subscribe to our {item.plan.name}!
									</p>
									<p className={styles.transaction_message}>
										Please enjoy the services we offer!
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}

export default SubscriptionTab;
