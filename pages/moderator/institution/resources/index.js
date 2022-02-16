import { NextSeo } from "next-seo";
import { useState } from "react";

import CustomDrawerBottom from "../../../../components/moderator/drawerBottom";
import InstitutionTabs from "../../../../components/moderator/institutionTabs";
import styles from "../../../../styles/moderator/Moderator.module.css";

import {
	Avatar,
	IconButton,
	Chip,
	Button,
	Rating,
	Typography,
} from "@mui/material";

import { AiOutlineSetting } from "react-icons/ai";

export default function Resources() {
	const [value, setValue] = useState(4);

	const depts = [
		{
			id: 1,
			name: "BS Information Technology",
		},
		{
			id: 2,
			name: "BS Political Science",
		},
		{
			id: 3,
			name: "BS Civil Engineering",
		},
	];

	const cards = [
		{
			id: 1,
			name: "File Name",
			institutionName: "Cebu Technological University - MC",
			content:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit.Aliquam finibus nibh eu nibh vestibulum, vel vulputatetortor ornare. Fusce dolor lacus, rutrum ut ligula eget,ornare commodo eros. Nunc non mauris facilisis, auctor leoa, molestie libero. Pellentesque gravida lorem vulputnisi aliquam ornare. Proin felis nibh, blandit non sapienut, dignissim pellentesque magna. ",
		},
		{
			id: 2,
			name: "File Name",
			institutionName: "Cebu Technological University - MC",
			content:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit.Aliquam finibus nibh eu nibh vestibulum, vel vulputatetortor ornare. Fusce dolor lacus, rutrum ut ligula eget,ornare commodo eros. Nunc non mauris facilisis, auctor leoa, molestie libero. Pellentesque gravida lorem vulputnisi aliquam ornare. Proin felis nibh, blandit non sapienut, dignissim pellentesque magna. ",
		},
		{
			id: 3,
			name: "File Name",
			institutionName: "Cebu Technological University - MC",
			content:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit.Aliquam finibus nibh eu nibh vestibulum, vel vulputatetortor ornare. Fusce dolor lacus, rutrum ut ligula eget,ornare commodo eros. Nunc non mauris facilisis, auctor leoa, molestie libero. Pellentesque gravida lorem vulputnisi aliquam ornare. Proin felis nibh, blandit non sapienut, dignissim pellentesque magna. ",
		},
		{
			id: 4,
			name: "File Name",
			institutionName: "Cebu Technological University - MC",
			content:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit.Aliquam finibus nibh eu nibh vestibulum, vel vulputatetortor ornare. Fusce dolor lacus, rutrum ut ligula eget,ornare commodo eros. Nunc non mauris facilisis, auctor leoa, molestie libero. Pellentesque gravida lorem vulputnisi aliquam ornare. Proin felis nibh, blandit non sapienut, dignissim pellentesque magna. ",
		},
	];
	return (
		<>
			<NextSeo title="Resources" />
			<CustomDrawerBottom pageTitle="Institution">
				<div className={styles.container}>
					<div className={styles.infoCover}>asdgh</div>
					<div className={styles.infoLayout}>
						<div className="flex items-center justify-center">
							<Avatar
								alt="Remy Sharp"
								sx={{ width: "70px", height: "70px" }}
								src="https://images.unsplash.com/photo-1613679074971-91fc27180061?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
							/>
						</div>
						<div className="">
							<div className="flex items-center">
								<p className="text-xl font-semibold text-gray-600">John Doe</p>
							</div>

							<p className="mt-1 text-xs text-gray-400 line-clamp-2">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
								nec faucibus lectus. Sed pulvinar pretium justo, sit amet dictum
								dolor efficitur eget.
							</p>
						</div>
						<div className="flex items-center justify-end">
							<IconButton>
								<AiOutlineSetting />
							</IconButton>
						</div>
					</div>
					<InstitutionTabs activeTab="resources">
						<div className={styles.detailsLayout}>
							<div className="space-y-4">
								{cards.map((item) => (
									<div className={styles.resourceCard}>
										<div className="w-full flex space-x-5">
											<div className={styles.resourceImg}>
												<img
													alt="workspace"
													src="https://cdn-icons-png.flaticon.com/128/2942/2942912.png"
												/>
											</div>
											<div className="w-full">
												<p className="text-xl text-gray-600 font-bold">
													{item.name}
												</p>

												<p className="text-sm text-gray-500 mb-3">
													{item.institutionName}
												</p>

												<p className="text-sm line-clamp-3 text-justify">
													{item.content}
												</p>
											</div>
										</div>
									</div>
								))}
							</div>

							<div className="">
								<div className="flex justify-end mb-5">
									<Button variant="outlined">Add Resources</Button>
								</div>

								<div className="space-y-3">
									{depts.map((item) => (
										<div className={styles.deptCard}>{item.name}</div>
									))}
								</div>
							</div>
						</div>
					</InstitutionTabs>
				</div>
			</CustomDrawerBottom>
		</>
	);
}
