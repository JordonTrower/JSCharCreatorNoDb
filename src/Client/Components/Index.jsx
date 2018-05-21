import React from 'react';
import AjaxTable from './Common/AjaxTable';

const Index = () => (
	<div className="col-md-12 d-flex row">
		<div className="col-md-12">
			<AjaxTable
				url="/character/recieve"
				name="Characters"
				headers={['ID', 'Name', 'Race Id', 'Stats', '']}
			/>
		</div>
		<div className="col-md-12">
			<AjaxTable
				url="/character/get-weapons"
				name="Weapons"
				headers={[
					'ID',
					'Name',
					'Cost',
					'Weight',
					'Range',
					'Damange',
					'Prof'
				]}
			/>
		</div>
		<div className="col-md-12">
			<AjaxTable
				url="/character/get-armor"
				name="Armors"
				headers={[
					'ID',
					'Name',
					'Cost',
					'Weight',
					'Strength Requirement',
					'Armor Class',
					'Stealth Disadvantage'
				]}
			/>
		</div>
	</div>
);

export default Index;
