/* eslint-disable */
import React from 'react';
import { View as TabularContacts, renderDataSource } from './view.jsx';
import { Table, Empty } from 'antd';


const setUp = (props) => shallow(<TabularContacts {...props} />);
const setUpRendered = (props) => render(<TabularContacts {...props} />);

describe('TabularContacts', () => {
	let component;

	beforeEach(() => {
		component = setUp();
	});

	it('should render and match snapshot', () => {
		component = setUpRendered({ contacts });
		expect(component).toMatchSnapshot();
	});

	it('should render without redux props', () => {
		expect(component)
	});

	it('should contain Empty component if rendered without props', () => {
		expect((component.find(Empty))?.length).toBe(1);
	});

	it('should render contacts tabular', () => {
		component = setUp({ contacts });
		expect((component.find(Empty))?.length).toBe(0);

		const renderedDataSource = renderDataSource(contacts);
		expect(component.find(Table).props().dataSource).toEqual(renderedDataSource);
	});
});
