/* eslint-disable */
import React from 'react';
import { View as Stats } from './view.jsx';
import { Row } from 'antd';
import { countNationalities, countGenders, getGenderPredominateMessage } from 'utils';


jest.mock('utils');
const setUp = (props) => shallow(<Stats {...props} />);
const setUpRendered = (props) => render(<Stats {...props} />);

describe('Stats', () => {
	let component;

	beforeEach(() => {
		jest.resetModules();
		component = setUp();

		countGenders.mockReturnValue({
			male: 1,
			female: 2,
			indeterminate: 0,
		});
		getGenderPredominateMessage.mockReturnValue('Female predominate');
		countNationalities.mockReturnValue({
			NZ: 1,
			GB: 1,
			AU: 1,
		});
	});

	it('should render without crashing', () => {
		component = setUpRendered({ contacts });
		expect(component).toMatchSnapshot();
	});

	it('should render without redux props', () => {
		expect(component)
	});

	it('should contain if no props provided Row', () => {
		expect((component.find(Row))?.length).toBe(1);
	});

	it('should call calculation functions', () => {
		component = setUp({ contacts });

		expect(countGenders).toBeCalled();
		expect(countGenders).toBeCalledWith(contacts);

		expect(getGenderPredominateMessage).toBeCalled();
		expect(getGenderPredominateMessage).toBeCalledWith(countGenders());

		expect(countNationalities).toBeCalled();
		expect(countNationalities).toBeCalledWith(contacts);
	});
});
