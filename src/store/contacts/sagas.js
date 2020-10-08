import { call, put, takeLatest } from 'redux-saga/effects';

import { Api } from 'services';

import { notification } from 'antd';
import { OActionTypes } from './actions';


export function* fetchContacts(action) {
	const { count } = action.payload;

	try {
		const { data, count: resultsCount } = yield call(Api.fetchContacts, count);

		yield put({
			type: OActionTypes.fetchContactsSucceed,
			payload: {
				contacts: data,
				totalCount: resultsCount,
			}
		});
	} catch (e) {
		notification.error({
			message: 'Error while fetching contacts data',
			description: e.message,
		});

		yield put({
			type: OActionTypes.fetchContactsFailed,
			message: e.message,
		});
	}
}

export function* contactsWatcher() {
  yield takeLatest(OActionTypes.fetchContactsRequested, fetchContacts);
}


export function* changeFilters(action) {
	yield put({
		type: (
			action.payload.filters
				? OActionTypes.filtersChanged
				: OActionTypes.filtersReset
		),
		payload: action.payload,
	});
}

export function* filtersWatcher() {
  yield takeLatest(OActionTypes.filtersChangeRequested, changeFilters);
}


export function* setPagination(action) {
	yield put({
		type: OActionTypes.paginationSet,
		payload: action.payload,
	});
}

export function* paginationWatcher() {
  yield takeLatest(OActionTypes.paginationRequested, setPagination);
}
