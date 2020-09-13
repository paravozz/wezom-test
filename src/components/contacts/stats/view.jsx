import React from 'react';
import { Typography, Col, Row, Statistic, Descriptions } from 'antd';
import {
	countGenders,
	getGenderPredominateMessage,
	countNationalities,
	CountryData,
} from 'utils';


const View = (props) => {
	const { contacts, loading } = props;

	if (loading) {
		return (
			<Row className="box" />
		);
	}

	function renderNationalitiesStats(_contacts) {
		const natCount = countNationalities(_contacts);

		return (
			<Descriptions title="Nationalities">
				{Object.entries(natCount).map(([key, value]) => (
					<Descriptions.Item key={key} label={CountryData[key].name}>
						{value} contacts
					</Descriptions.Item>
				))}
			</Descriptions>
		);
	}

	const genderStats = countGenders(contacts);
	const genderPredominateMessage = getGenderPredominateMessage(genderStats);

	return (
		<div className="box">
			<Typography.Title level={3}>Statistic</Typography.Title>
			<Row gutter={24}>
				<Col className="_flex-noshrink">
					<Statistic title="Collection size" value={contacts.length} />
				</Col>
				<Col className="_flex-noshrink">
					<Row gutter={12}>
						<Col span={6}>
							<Statistic title="Males" value={genderStats.male} />
						</Col>
						<Col span={6}>
							<Statistic title="Females" value={genderStats.female} />
						</Col>
						<Col span={6}>
							<Statistic title="Indeterminate" value={genderStats.indeterminate} />
						</Col>
						<Col span={24}>
							<Typography.Text mark>
								{genderPredominateMessage}
							</Typography.Text>
						</Col>
					</Row>
				</Col>
			</Row>
			<br />
			<Row>
				{renderNationalitiesStats(contacts)}
			</Row>
		</div>
	);
};


export { View };
