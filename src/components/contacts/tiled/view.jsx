import React from 'react';
import { Typography, Tag, Row, Col, Card, Divider, Empty, Spin } from 'antd';
import { CountryData, getFullName, paginateCollection } from 'utils';
import { Copyable } from 'components/utils';


const View = (props) => {
	const { contacts, loading, pagination } = props;

	if (!contacts.length || loading) {
		return (
			<>
				{loading && <Spin />}
				<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
			</>
		)
	}

	function renderFullName({ title, first, last }) {
		return getFullName(title, first, last);
	}

	function renderAvatar(pictureUrl) {
		return (
			<img src={pictureUrl} alt="contact-cover" />
		);
	}

	function renderBirthday({ age }) {
		return `${age} years`
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

	const _contacts = (
		paginateCollection(contacts, pagination.offset, pagination.limit)
			.map((contact, index) => ({
				key: index,
				avatar: renderAvatar(contact.picture.large),
				fullName: renderFullName(contact.name),
				birthday: renderBirthday(contact.dob),
				email: renderEmail(contact.email),
				phone: renderPhone(contact.phone),
				location: renderLocation(contact.location),
				nationality: renderNationality(contact.nat),
			}))
	);

	return (
		<Row gutter={[8, 8]}>
			{_contacts.map(contact => (
				<div key={contact.key} style={{ width: '33.3333%', maxWidth: '33.3333%' }}>
					<Col>
						<Card
							hoverable
							cover={contact.avatar}
						>
							<Card.Meta
								title={(
									<Typography.Text>
										<Typography.Text>{contact.fullName}</Typography.Text>
										&nbsp;
										<Typography.Text type="secondary">
											({contact.birthday})
										</Typography.Text>
									</Typography.Text>
								)}
								description={(
									<>
										{contact.email}
										{contact.phone}
										{contact.location}
										<Divider/>
										{contact.nationality}
									</>
								)}
							/>
						</Card>
					</Col>
				</div>
			))}
		</Row>
	);
};


export { View };
