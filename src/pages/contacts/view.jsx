import React from 'react';

import { Radio, Row, Col, Typography, Pagination, Tooltip, Button } from 'antd';
import { DatabaseOutlined, AppstoreOutlined, ReloadOutlined } from '@ant-design/icons';

import { getFromStorage, randomIntegerInRange, setToStorage } from 'utils';
import {
	TabularContacts,
	StatsForContacts,
	FiltersForContacts,
} from 'components';
import { TiledContacts } from '../../components/contacts/tiled';


const __VIEW_MODE_KEY__ = 'app__view_mode';


const View = (props) => {
	const {
		totalCount,
		fetchContacts,
		pagination,
		setPagination,
		contacts,
	} = props;

	const [viewMode, setViewMode] = React.useState(getFromStorage(__VIEW_MODE_KEY__) || 'tabular');

	function fetchContactsRemote() {
		fetchContacts(totalCount || randomIntegerInRange(1, 1000));
	}


	React.useEffect(() => {
		fetchContactsRemote();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	React.useEffect(() => {
		setToStorage(__VIEW_MODE_KEY__, viewMode);
	}, [viewMode]);


	const radioOptions = [
		{ label: <DatabaseOutlined />, value: 'tabular' },
		{ label: <AppstoreOutlined />, value: 'tiled' },
	];

	const componentForViewMode = {
		tiled: (
			<>
				<TiledContacts />
				<Pagination
					onChange={(page, pageSize) => (
						setPagination({
							offset: pageSize * (page - 1),
							limit: pageSize,
						})
					)}
					current={pagination.offset / pagination.limit + 1}
					pageSize={pagination.limit}
					pageSizeOptions={[6, 12, 24, 36, 48]}
					total={contacts.length}
				/>
			</>
		),
		tabular: <TabularContacts />,
	};


	return (
		<div className={'page page--contacts'}>
			<Row justify="space-between">
				<Typography.Title level={2}>Contacts</Typography.Title>
				<Col>
					<Tooltip title="Reload data">
				  		<Button
							type="dashed"
							shape="circle"
							icon={<ReloadOutlined />}
							onClick={() => fetchContactsRemote()}
						/>
					</Tooltip>
					<Radio.Group
						options={radioOptions}
						onChange={(e) => setViewMode(e.target.value)}
						value={viewMode}
						optionType="button"
						buttonStyle="solid"
					/>
				</Col>
			</Row>
			<FiltersForContacts />
			{componentForViewMode[viewMode]}
			<StatsForContacts />
		</div>
	);
};


export { View };
