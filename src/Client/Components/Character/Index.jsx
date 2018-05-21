import React from 'react';
import AjaxTable from '../Common/AjaxTable';

const CharacterIndex = () => (
	<div>
		<AjaxTable
			url="/character/recieve"
			name="Characters"
			buttonUrl="/character/view"
			headers={['ID', 'Name', 'Race', 'Level', 'Class', 'Stats', '']}
		/>
	</div>
);

export default CharacterIndex;
