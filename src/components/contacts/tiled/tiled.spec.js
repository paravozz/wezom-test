/* eslint-disable */
import React from 'react';
import { View as TiledContacts } from './view.jsx';
import { Empty, Card, Spin } from 'antd';
import { paginateCollection } from 'utils';


jest.mock('utils');
const setUp = (props) => shallow(<TiledContacts {...props} />);
const setUpRendered = (props) => render(<TiledContacts {...props} />);

describe('TiledContacts', () => {
	let component;

	beforeEach(() => {
		jest.resetModules();
		component = setUp();
	});

	it('should render without crashing', () => {
		component = setUpRendered({ contacts });
		expect(component).toMatchSnapshot();
	});

	it('should render without redux props', () => {
		expect(component)
	});

	it('should contain Empty', () => {
		expect((component.find(Empty))?.length).toBe(1);
	});

	it('should contain Spin if loading is true', () => {
		component = setUp({ loading: true });
		expect((component.find(Spin))?.length).toBe(1);
	});

	it('should render contacts', () => {
		component = setUp({ contacts });

		expect((component.find(Empty))?.length).toBe(0);
		expect((component.find(Card))?.length).toBe(contacts.length);
	});

	it('should paginate collection if pagination prop is provided', () => {
		const pagination = { limit: 1, offset: 1 };
		paginateCollection.mockReturnValue([contacts[1]]);

		component = setUp({ contacts, pagination });

		expect(paginateCollection).toBeCalled();
		expect(paginateCollection).toBeCalledWith(contacts, pagination.offset, pagination.limit);
	});

	it('should return original collection if no pagination prop is provided', () => {
		component = setUp({ contacts });

		expect(paginateCollection).not.toBeCalled();
	});
});
