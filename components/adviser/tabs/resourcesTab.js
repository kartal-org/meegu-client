import React, { useState } from 'react';
import Link from 'next/link';

import ArticleCard from '../../../components/reusable/articleCard';
import DeptCard from '../../../components/reusable/deptCard';

import styles from './tabs.module.scss';
import fileImg from '../../../public/file_illustration.svg';
import emptyIllustration from '../../../public/no_data_illustration.svg';

import Image from 'next/image';
import { Button } from '@mui/material';
import CustomizedDialogs from '../../reusable/dialog2';
import CustomTabs from '../../reusable/tabs';
import UploadResource from '../uploadResource';

function ResourcesTab({ institution, resources }) {
	const [resourceList, setResourceList] = useState(resources);
	console.log(institution.id);
	return (
		<>
			<div className={`${styles.container} ${styles.articles}`}>
				<div className={styles.containerItem}>
					<div className={styles.createBtn}>
						<CustomizedDialogs
							openBtn={<Button>Create Resource</Button>}
							title='Add Resource'
							primaryAction={<Button>Done</Button>}
						>
							<CustomTabs
								defaultVal='upload'
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
					{resourceList.length > 0 ? (
						<div>
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
					) : (
						<div className={styles.emptyContainer}>
							<div className={styles.illustration}>
								<Image
									src={emptyIllustration}
									layout='fill'
									objectFit='contain'
									className={styles.illustration}
								></Image>
							</div>
							<p>
								You have no resources yet. <strong>Create now </strong>
							</p>
						</div>
					)}
				</div>

				{/* <div className={styles.containerItem}>
					<DeptCard deptName="Deparment 1"></DeptCard>
				</div> */}
			</div>
		</>
	);
}

export default ResourcesTab;
