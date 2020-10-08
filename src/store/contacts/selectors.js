import { createSelector } from 'reselect';
import { getFullName } from '../../utils';

export const contactsSelector = state => state.contacts.contacts;
export const totalCountSelector = state => state.contacts.totalCount;
export const loadingSelector = state => state.contacts.loading;
export const filtersSelector = state => state.contacts.filters;
export const paginationSelector = state => state.contacts.pagination;

export const contactsCollection = createSelector(
	contactsSelector,
	filtersSelector,
	(contacts, filters) => {
		let filtered = [...contacts];

		if (filters.name) {
			filtered = filtered.filter(c => (
				getFullName(c.name.title, c.name.first, c.name.last)
					.toLowerCase()
					.includes(filters.name.toLowerCase())
			));
		}

		if (filters.gender) {
			filtered = filtered.filter(c => c.gender === filters.gender);
		}

		if (filters.nat && filters.nat.length) {
			filtered = filtered.filter(c => filters.nat.includes(c.nat));
		}

		if (filters.author) {
			// fixme: IDK what to filter here :(
			filtered = filtered.filter(c => c.author === filters.author)
		}


		return filtered;
	}
);
