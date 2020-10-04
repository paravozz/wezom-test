/* eslint-disable */
import React from 'react';
import { View as Filters } from './view.jsx';
import { Row } from 'antd';


const setUp = (props) => shallow(<Filters {...props} />);
const setUpRendered = (props) => render(<Filters {...props} />);

describe('Filters', () => {
	let component;

	const defaultFilters = {
		name: '',
		gender: '',
		nat: [],
		author: '',
	};

	beforeEach(() => {
		jest.resetModules();
		component = setUp({ filters: defaultFilters });
	});

	it('should render without crashing', () => {
		component = setUpRendered({ filters: defaultFilters });
		expect(component).toMatchSnapshot();
	});

	it('should render box', () => {
		expect((component.find('.box')?.length)).toBe(1);
	});
});
