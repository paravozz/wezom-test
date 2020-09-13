import React from 'react';
import { Row, Input, Select, Col, Checkbox, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { CountryData } from 'utils';
import { getGenderName } from 'utils';


const View = (props) => {
	const {
		loading,
		filters,
		filterContacts,
	} = props;

	return (
		<div className="box">
			<Row align="middle">
				<Col className="_flex-grow">
					<Row gutter={[6, 6]} align="middle">
						<Col xs={24} lg={11}>
							<Row>
								<Input.Search
									loading={loading}
									placeholder="Search by full name"
									size="large"
									onChange={e => filterContacts({ ...filters, name: e.target.value })}
									value={filters.name}
								/>
							</Row>
						</Col>
						<Col xs={24} sm={10} lg={4}>
							<Row>
								<Select
									loading={loading}
									style={{ width: '100%' }}
									allowClear
									placeholder="Gender"
									size="large"
									onChange={value => filterContacts({ ...filters, gender: value })}
									value={filters.gender || undefined}
								>
									{['male', 'female', 'indeterminate'].map(k => (
										<Select.Option key={k} value={k}>
											{getGenderName(k)}
										</Select.Option>
									))}
								</Select>
							</Row>
						</Col>
						<Col xs={24} sm={14} lg={5}>
							<Row>
								<Select
									loading={loading}
									style={{ width: '100%' }}
									mode="multiple"
									maxTagCount={2}
									allowClear
									size="large"
									placeholder="Nationality"
									onChange={value => filterContacts({ ...filters, nat: value })}
									value={filters.nat}
								>
									{Object.entries(CountryData).map(([key, data]) => (
										<Select.Option key={key} value={key}>{data.name}</Select.Option>
									))}
								</Select>
							</Row>
						</Col>
						<Col xs={24} sm={6} lg={4}>
							<Row>
								<Checkbox
									disabled={loading}
									onChange={(e) => filterContacts({ ...filters, author: e.target.checked })}
								>
									I am creator
								</Checkbox>
							</Row>
						</Col>
					</Row>
				</Col>
				<Col className="_flex-noshrink">
					<Row>
						<Button
							disabled={loading}
							onClick={() => filterContacts(null)}
							type="link"
						>
							<CloseOutlined /> Clear
						</Button>
					</Row>
				</Col>
			</Row>
		</div>
	);
};


export { View };
