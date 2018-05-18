import React from 'react';
import AjaxTable from '../Common/AjaxTable';

const CharacterIndex = () => (
	<div>
		<AjaxTable
			url="/character/recieve"
			name="Characters"
			headers={['ID', 'Name', 'Created At', 'Updated At']}
		/>
	</div>
);

export default CharacterIndex;
