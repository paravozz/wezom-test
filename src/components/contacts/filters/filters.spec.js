/* eslint-disable */
import React from 'react';
import { View as Filters } from './view.jsx';
import { Input, Select } from 'antd';

import * as actions from 'store/contacts/actions';


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

	test('filters should filter as expected', () => {
		const filterContactsMock = jest.fn((...args) => {});
		component = setUp({ filters: defaultFilters, filterContacts: filterContactsMock });

		const searchComponent = component.find(Input.Search);
		const selectGenderComponent = component.findWhere((el) => el.props().id === 'genderSelect');
		const selectNatComponent = component.findWhere((el) => el.props().id === 'natSelect');

		expect(searchComponent.props().value).toBe(defaultFilters.name);
		expect(selectGenderComponent.props().value).toBe(defaultFilters.gender || undefined);
		expect(selectNatComponent.props().value).toBe(defaultFilters.nat);

		searchComponent.simulate('change', { target: { value: 'test-search' } });
		expect(filterContactsMock).toBeCalledWith({ ...defaultFilters, name: 'test-search' });
		filterContactsMock.mockReset();

		selectGenderComponent.simulate('change', 'male');
		expect(filterContactsMock).toBeCalledWith({ ...defaultFilters, gender: 'male' });
		filterContactsMock.mockReset();

		selectNatComponent.simulate('change', 'RU');
		expect(filterContactsMock).toBeCalledWith({ ...defaultFilters, nat: 'RU' });
		filterContactsMock.mockReset();

		filterContactsMock.mockClear();
	})
});
