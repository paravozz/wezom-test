import { createAction } from '../utils';


export const OActionTypes = {
	fetchContactsRequested: 'CONTACTS_FETCH_REQUESTED',
	fetchContactsSucceed: 'CONTACTS_FETCH_SUCCEEDED',
	fetchContactsFailed: 'CONTACTS_FETCH_FAILED',

	filtersChangeRequested: 'CONTACTS_FILTERS_CHANGE_REQUESTED',
	filtersChanged: 'CONTACTS_FILTERS_CHANGED',
	filtersReset: 'CONTACTS_FILTERS_RESET',

	paginationRequested: 'CONTACTS_PAGINATION_REQUESTED',
	paginationSet: 'CONTACTS_PAGINATION_SET',
};


export const fetchContacts = (count) => (
	createAction(OActionTypes.fetchContactsRequested)({ count })
);

export const filterContacts = (filters) => (
	createAction(OActionTypes.filtersChangeRequested)({ filters })
);

export const setPagination = (pagination) => (
	createAction(OActionTypes.paginationRequested)({ pagination })
);
