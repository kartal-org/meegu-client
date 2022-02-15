import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

import CustomDrawer from "../../../../components/adviser/drawer";
import ClassroomWorkspaceTabs from "../../../../components/adviser/ClassroomWorkspaceTabs";
import CardHolder from "../../../../components/reusable/cardholder";

import { Card, CardActions, Tooltip, Fab, Button } from "@mui/material";

import { MdOutlineCommentBank } from "react-icons/md";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import DialogComponent from "../../../../components/reusable/dialog";

export default function ClassroomWorkspace(props) {
	const items = [
		{
			id: 1,
			name: "Workspace Name",
		},
		{
			id: 2,
			name: "Workspace Name",
		},
	];

	return (
		<div>
			<CustomDrawer pageTitle="Workspaces">
				<ClassroomWorkspaceTabs activeTab="workspace">
					{/* {items.map((val) => (
						<Link key={val.id} href={`/researcher/workspace/shared/hello${val.id}`}>
							<Card sx={{ minWidth: 275, mb: 2 }}>
								<CardContent>{val.title}</CardContent>
								<CardActions>
									<Button size='small'>Learn More fdf</Button>
								</CardActions>
							</Card>
						</Link>
					))} */}
					<div class="grid grid-cols-12 gap-4">
						<div
							class="col-span-11 px-3 py-1 overflow-y-auto"
							style={{ maxHeight: "670px" }}
						>
							<div class="flex flex-col w-full space-y-4">
								<CardHolder>
									{items.map((item) => (
										<Link
											key={item.id}
											href={`/adviser/classroom/workspace/workspace-${item.id}`}
										>
											<Card
												sx={{
													width: "220px",
													height: "170px",
													py: 3,
													border: 1,
													borderColor: "#ebebeb",
													mr: 1,
													mb: 2,
													cursor: "pointer",
												}}
											>
												<div className="flex flex-col space-y-4">
													<div className="flex justify-center">
														<img
															alt="folder"
															className="w-20 h-20"
															src="https://cdn-icons-png.flaticon.com/512/6397/6397033.png"
														/>
													</div>
													<button className="w-full text-center text-gray-400 text-sm">
														{item.name}
													</button>
												</div>
											</Card>
										</Link>
									))}
								</CardHolder>
							</div>
						</div>

						<div className="" style={{ minHeight: "590px" }}>
							<div class="relative h-full w-full">
								<div class="absolute inset-x-0 bottom-0 flex flex-col space-y-3 p-1 justify-center items-center">
									<DialogComponent
										title="Add File"
										button={
											<Tooltip title="Add File" placement="left">
												<Fab color="secondary" aria-label="add">
													<HiOutlineDocumentAdd className="h-6 w-6" />
												</Fab>
											</Tooltip>
										}
									>
										file
									</DialogComponent>
								</div>
							</div>
						</div>
					</div>
				</ClassroomWorkspaceTabs>
			</CustomDrawer>
		</div>
	);
}
