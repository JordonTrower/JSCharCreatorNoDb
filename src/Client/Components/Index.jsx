import React from 'react';
import AjaxTable from './Common/AjaxTable';

const Index = () => (
	<div className="col-md-12 d-flex row">
		<div className="col-md-6">
			<AjaxTable
				url="/character/recieve"
				name="Users"
				headers={['ID', 'Email', 'First Name', 'Last Name']}
			/>
		</div>
		<div className="col-md-6">
			<AjaxTable
				url="/Items"
				name="Items"
				headers={[
					'ID',
					'Item Name',
					'Price',
					'Created At',
					'Updated At'
				]}
			/>
		</div>
	</div>
);

export default Index;
