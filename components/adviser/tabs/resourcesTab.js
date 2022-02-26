import React, { useState } from 'react';
import Link from 'next/link';

import ArticleCard from '../../../components/reusable/articleCard';
import DeptCard from '../../../components/reusable/deptCard';

import styles from './tabs.module.scss';
import fileImg from '../../../public/file_illustration.svg';

import { Button } from '@mui/material';
import CustomizedDialogs from '../../reusable/dialog2';
import CustomTabs from '../../reusable/tabs';
import UploadResource from '../uploadResource';

function ResourcesTab({ institution, resources }) {
	const [resourceList, setResourceList] = useState(resources);
	console.log(institution.id);
	return (
		<>
			<div className={styles.container}>
				<div className={styles.containerItem}>
					<div className={styles.createBtn}>
						<CustomizedDialogs
							openBtn={<Button>Add Resource</Button>}
							title='Add Resource'
							primaryAction={<Button>Done</Button>}
						>
							<CustomTabs
								tabs={[
									{
										label: 'Upload Resource',
										value: 'upload',
										content: (
											<UploadResource
												institutionID={institution.id}
												resourceList={resourceList}
												setResourceList={setResourceList}
											/>
										),
									},
									{
										label: 'Use Quill',
										value: 'quill',
										content: 'add textfield here then redirect',
									},
								]}
							/>
						</CustomizedDialogs>
					</div>
					{resourceList.map((item) => (
						<ArticleCard
							key={item.id}
							title={item.name}
							subtitle='Resource'
							content={item.description}
							illustration={fileImg}
							// actions={
							// 	<>
							// 		{/* <Link href={`/institutions/}`}> */}
							// 		<Button variant='contained'>Open</Button>
							// 		{/* </Link> */}
							// 	</>
							// }
						></ArticleCard>
					))}
				</div>

				<div className={styles.containerItem}>
					<DeptCard deptName='Deparment 1'></DeptCard>
				</div>
			</div>
		</>
	);
}

export default ResourcesTab;
