import { createReducer } from '../utils';
import { OActionTypes as contacts } from './actions';

export const initialState = {
	contacts: [],
	totalCount: null,
	loading: false,
	filters: {
		name: '',
		gender: '',
		nat: [],
		author: '',
	},
	pagination: {
		limit: 6,
		offset: 0,
	}
};

export const reducer = createReducer(initialState, {
	[contacts.fetchContactsRequested](state) {
		return { ...state, loading: true };
	},
	[contacts.fetchContactsSucceed](state, action) {
		return { ...state, ...action.payload, loading: false };
	},
	[contacts.fetchContactsFailed](state) {
		return { ...state, loading: false };
	},

	[contacts.filtersChanged](state, action) {
		return { ...state, filters: action.payload.filters };
	},
	[contacts.filtersReset](state) {
		return { ...state, filters: initialState.filters };
	},

	[contacts.paginationSet](state, action) {
		return { ...state, pagination: action.payload.pagination }
	}
});
