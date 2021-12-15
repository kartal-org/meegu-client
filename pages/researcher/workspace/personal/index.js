import Link from 'next/link';
import { useRouter } from 'next/router';
import CustomDrawer from '../../../../components/researcher/drawer';
import WorkspaceTabs from '../../../../components/researcher/workspaceTabs';

export default function PersonalWorkspace() {
	return (
		<div>
			<CustomDrawer pageTitle='Workspaces'>
				<WorkspaceTabs activeTab='personal'>Personal</WorkspaceTabs>
			</CustomDrawer>
		</div>
	);
}
