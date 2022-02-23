import React from 'react';

//validation
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import UtilityCard from '../reusable/utilityCard';
import workspaceIllustration from '../../public/workspace-illustration.png';
import styles from './createFile.module.scss';
import CustomizedDialogs from '../reusable/dialog2';
import { Button } from '@mui/material';
function CreateFile() {
	return (
		<div className={styles.container}>
			<CustomizedDialogs
				openBtn={
					<UtilityCard
						title='Create Document File'
						illustration={workspaceIllustration}
					></UtilityCard>
				}
				title='Create Document File'
				primaryAction={<Button>Create</Button>}
			>
				Hello
			</CustomizedDialogs>

			<CustomizedDialogs
				openBtn={
					<UtilityCard title='Upload File' illustration={workspaceIllustration}></UtilityCard>
				}
				title='Upload File'
				primaryAction={<Button>Upload</Button>}
			>
				Hello
			</CustomizedDialogs>
		</div>
	);
}

export default CreateFile;
