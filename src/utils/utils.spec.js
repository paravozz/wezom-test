/* eslint-disable */
import {
	countGenders,
	getGenderPredominateMessage,
	countNationalities,
	getFullName,
	getGenderName,
	mapGenderToItsName,
	paginateCollection,
} from 'utils';


describe('Utils:', () => {
	describe('countGenders', () => {
		it('should count correctly', () => {
			const modifiedContacts = [...contacts];
			modifiedContacts[modifiedContacts.length - 1].gender = undefined;

			expect(countGenders(modifiedContacts)).toEqual({
				male: 1,
				female: 1,
				indeterminate: 1,
			});
		});

		it('should return zeros for empty list', () => {
			expect(countGenders([])).toEqual({
				male: 0,
				female: 0,
				indeterminate: 0,
			});
		});
	});

	describe('mapGenderToItsName', () => {
		it('should contain correct data', () => {
			expect(mapGenderToItsName).toEqual({
				male: 'Men',
				female: 'Women',
				indeterminate: 'Indeterminate',
			})
		});
	});

	describe('getGenderName', () => {
		it('should map to indeterminate if no value passed', () => {
			expect(getGenderName(undefined)).toEqual(mapGenderToItsName.indeterminate);
		});

		it('should map to proper name', () => {
			expect(getGenderName('female')).toEqual(mapGenderToItsName['female']);
		});
	});

	describe('getGenderPredominateMessage', () => {
		let genderStats = countGenders(contacts);

		it('should return valid message', () => {
			const genderName = getGenderName('female');

			expect(getGenderPredominateMessage(genderStats)).toEqual(`${genderName} predominate`);
		});
	});

	describe('countNationalities', () => {
		it('should return correct data', () => {
			expect(countNationalities(contacts)).toEqual({
				NZ: 1,
				GB: 1,
				AU: 1,
			});

			const modifiedContacts = [...contacts];
			modifiedContacts[modifiedContacts.length - 1].nat = 'NZ';


			expect(countNationalities(modifiedContacts)).toEqual({
				NZ: 2,
				AU: 1,
			});
		})
	});

	describe('getFullName', () => {
		it('should return correct data', () => {
			const contactName = contacts[0].name;
			expect(getFullName(contactName.title, contactName.first, contactName.last)).toBe('Mrs Hazel Chen');
		})
	});

	describe('paginateCollection', () => {
		it('should slice correct amount of data', () => {
			expect(paginateCollection(contacts, 1, 1)).toEqual([contacts[1]])
		})
	})
});
