import React from 'react';
import { Table, Typography, Tag, Avatar, Empty } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';
import { CountryData, getFullName } from 'utils';
import { Copyable } from 'components/utils';


function renderFullName({ title, first, last }) {
	return getFullName(title, first, last);
}

function renderAvatar(pictureUrl) {
	return (
		<Avatar size={40} icon={<UserOutlined />} src={pictureUrl} />
	);
}

function renderBirthday({ date, age }) {
	return (
		<div>
			{moment(date).format('dddd, M/D/YYYY, H:m:s A')}
			<br />
			{age} years
		</div>
	);
}

function renderEmail(email) {
	return (
		<Copyable text={email}>
			<Typography.Link ellipsis href={`mailto:${email}`}>
				{email}
			</Typography.Link>
		</Copyable>
	);
}

function renderPhone(phone) {
	return (
		<Copyable text={phone}>
			<Typography.Link ellipsis href={`tel:${phone}`}>
				{phone}
			</Typography.Link>
		</Copyable>
	);
}

function renderLocation({ country, street, city, state, postcode }) {
	return (
		<Copyable
			text={(
				`[${country}] `
				+ `${street.number} ${street.name}, `
				+ `${city}, ${state} ${postcode}`
			)}
		>
			<Typography.Paragraph ellipsis={{ rows: 3 }}>
				<strong>/{country}/</strong>
				<br />
				{(
					`${street.number}, ${street.name}`
					+ `${city}, ${state} ${postcode}`
				)}
			</Typography.Paragraph>
		</Copyable>
	);
}

function renderNationality(nat) {
	return (
		<Tag color={CountryData[nat].color}>{CountryData[nat].name}</Tag>
	)
}

export function renderDataSource(contacts) {
	return contacts
		.map((contact, index) => ({
			key: index,
			avatar: renderAvatar(contact.picture.thumbnail),
			fullName: renderFullName(contact.name),
			birthday: renderBirthday(contact.dob),
			email: renderEmail(contact.email),
			phone: renderPhone(contact.phone),
			location: renderLocation(contact.location),
			nationality: renderNationality(contact.nat),
		}));
}

const View = (props) => {
	const { contacts, loading } = props;

	if (!contacts) {
		return (
			<>
				<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
			</>
		)
	}

	const columns = [
		{
			title: 'Avatar',
			dataIndex: 'avatar',
			key: 'avatar',
			fixed: 'left',
			width: 80,
		},
		{
			title: 'Full name',
			dataIndex: 'fullName',
			key: 'fullName',
			width: 155,
			sorter: (a, b) => a.fullName.length - b.fullName.length,
			sortDirections: ['descend', 'ascend'],
		},
		{
			title: 'Birthday',
			dataIndex: 'birthday',
			key: 'birthday',
			width: 250,
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
			width: 155,
		},
		{
			title: 'Phone',
			dataIndex: 'phone',
			key: 'phone',
			width: 155,
		},
		{
			title: 'Location',
			dataIndex: 'location',
			key: 'location',
			width: 250,
		},
		{
			title: 'Nationality',
			dataIndex: 'nationality',
			key: 'nationality',
			width: 155,
			align: 'right',
		},
	];


	return (
		<Table
			dataSource={renderDataSource(contacts)}
			columns={columns}
			scroll={{ x: '100vw' }}
			loading={loading}
			pagination={{ position: ['bottomCenter'] }}
		/>
	);
};


export { View };
