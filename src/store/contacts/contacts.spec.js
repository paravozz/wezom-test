/* eslint-disable */
import { runSaga } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import { notification } from 'antd';
import {
	fetchContacts,
	contactsWatcher,
	changeFilters,
	filtersWatcher,
	setPagination,
	paginationWatcher,
} from './sagas';
import {
	OActionTypes,
	fetchContacts as fetchContactsAction,
	filterContacts as filterContactsAction,
	setPagination as setPaginationAction,
} from './actions';
import { Api } from 'services';
import { initialState, reducer } from './reducer';


describe('Contacts', () => {
	describe('sagas', () => {
		describe('contactsWatcher', () => {
			const genObject = contactsWatcher();

			it('should wait for latest fetchContactsRequested action and call fetchContacts', () => {
				expect(genObject.next().value)
					.toEqual(takeLatest(OActionTypes.fetchContactsRequested, fetchContacts));
			});

			it('should be done on next iteration', () => {
				expect(genObject.next().done).toBeTruthy();
			});

			it('should call api and dispatch success action', async () => {
				const dispatched = [];

				const requestedCount = 3;
				const requestAction = {
					type: OActionTypes.fetchContactsRequested,
					payload: { count: requestedCount }
				};
				const resultAction = {
					type: OActionTypes.fetchContactsSucceed,
					payload: {
						contacts: contacts.slice(0, requestedCount),
						totalCount: requestedCount,
					}
				};

				const requestContacts = jest.spyOn(Api, 'fetchContacts')
					.mockImplementationOnce(
						() => Promise.resolve({
							data: resultAction.payload.contacts,
							count: resultAction.payload.totalCount,
						}),
					);

				await runSaga({
					dispatch: (action) => dispatched.push(action),
				}, fetchContacts, requestAction);

				expect(requestContacts).toHaveBeenCalledTimes(1);
				expect(requestContacts).toHaveBeenCalledWith(requestedCount);

				expect(dispatched).toEqual([resultAction]);
				requestContacts.mockClear();
			});

			it('should call api and dispatch error action', async () => {
				const dispatched = [];

				const requestedCount = 3;
				const requestAction = {
					type: OActionTypes.fetchContactsRequested,
					payload: { count: requestedCount }
				};
				const resultAction = {
					type: OActionTypes.fetchContactsFailed,
					message: 'error message',
				};

				const notificationSpy = jest.spyOn(notification, 'error');
				const requestContacts = jest.spyOn(Api, 'fetchContacts')
					.mockImplementationOnce(
						() => Promise.reject(resultAction.payload.message),
					);

				await runSaga({
					dispatch: (action) => dispatched.push(action),
				}, fetchContacts, requestAction);

				expect(requestContacts).toHaveBeenCalledTimes(1);
				expect(requestContacts).toHaveBeenCalledWith(requestedCount);

				expect(notificationSpy).toHaveBeenCalledTimes(1);

				expect(dispatched.length).toEqual(1);
				expect(dispatched[0]).toHaveProperty('type', resultAction.type);
				requestContacts.mockClear();
				notificationSpy.mockClear();
			});
		});

		describe('filtersWatcher', () => {
			const genObject = filtersWatcher();

			it('should wait for latest filtersChangeRequested action and call changeFilters', () => {
				expect(genObject.next().value)
					.toEqual(takeLatest(OActionTypes.filtersChangeRequested, changeFilters));
			});

			it('should be done on next iteration', () => {
				expect(genObject.next().done).toBeTruthy();
			});

			it('should call dispatch filtersChanged action', async () => {
				const dispatched = [];

				const requestAction = {
					type: OActionTypes.filtersChangeRequested,
					payload: {
						filters: {
							name: '123',
							gender: '321',
							nat: ['au'],
							author: 'xxx',
						},
					},
				};
				const resultAction = {
					type: OActionTypes.filtersChanged,
					payload: requestAction.payload,
				};

				await runSaga({
					dispatch: (action) => dispatched.push(action),
				}, changeFilters, requestAction);

				expect(dispatched).toEqual([resultAction]);
			});

			it('should call dispatch filtersReset action', async () => {
				const dispatched = [];

				const requestAction = {
					type: OActionTypes.filtersChangeRequested,
					payload: {
						filters: undefined,
					},
				};
				const resultAction = {
					type: OActionTypes.filtersReset,
					payload: requestAction.payload,
				};

				await runSaga({
					dispatch: (action) => dispatched.push(action),
				}, changeFilters, requestAction);

				expect(dispatched).toEqual([resultAction]);
			});
		});

		describe('paginationWatcher', () => {
			const genObject = paginationWatcher();

			it('should wait for latest paginationRequested action and call setPagination', () => {
				expect(genObject.next().value)
					.toEqual(takeLatest(OActionTypes.paginationRequested, setPagination));
			});

			it('should be done on next iteration', () => {
				expect(genObject.next().done).toBeTruthy();
			});

			it('should call dispatch paginationSet action', async () => {
				const dispatched = [];

				const requestAction = {
					type: OActionTypes.paginationRequested,
					payload: {
						limit: 10,
						offset: 10,
					},
				};
				const resultAction = {
					type: OActionTypes.paginationSet,
					payload: requestAction.payload,
				};

				await runSaga({
					dispatch: (action) => dispatched.push(action),
				}, setPagination, requestAction);

				expect(dispatched).toEqual([resultAction]);
			});
		});
	});


	describe('actions', () => {
		test('fetchContactsAction should create appropriate action', () => {
			expect(fetchContactsAction(42)).toEqual({
				type: OActionTypes.fetchContactsRequested,
				payload: {
					count: 42,
				},
			});
		});

		test('filterContactsAction should create appropriate action', () => {
			expect(filterContactsAction({ name: 'test' })).toEqual({
				type: OActionTypes.filtersChangeRequested,
				payload: {
					filters: {
						name: 'test',
					},
				},
			});
		});

		test('setPaginationAction should create appropriate action', () => {
			expect(setPaginationAction({ limit: 1, offset: 1 })).toEqual({
				type: OActionTypes.paginationRequested,
				payload: {
					pagination: {
						limit: 1,
						offset: 1,
					},
				},
			});
		});
	});

	describe('reducer', () => {
		it('should return the initial state', () => {
			expect(reducer(undefined, {})).toEqual(initialState);
		});

		it('should handle fetchContactsRequested', () => {
			expect(
				reducer({}, { type: OActionTypes.fetchContactsRequested }),
			).toEqual({ ...{}, loading: true });
		});

		it('should handle fetchContactsSucceed', () => {
			expect(
				reducer({}, { type: OActionTypes.fetchContactsSucceed, payload: { contacts: [1, 2], totalCount: 2 } }),
			).toEqual({ ...{}, ...{ contacts: [1, 2], totalCount: 2 }, loading: false });
		});

		it('should handle fetchContactsFailed', () => {
			expect(
				reducer({}, { type: OActionTypes.fetchContactsFailed }),
			).toEqual({ ...{}, loading: false });
		});

		it('should handle filtersChanged', () => {
			expect(
				reducer({}, { type: OActionTypes.filtersChanged, payload: { filters: 42 } }),
			).toEqual({ ...{}, ...{ filters: 42 }});
		});

		it('should handle filtersReset', () => {
			expect(
				reducer({}, { type: OActionTypes.filtersReset }),
			).toEqual({ ...{}, filters: initialState.filters });
		});

		it('should handle paginationSet', () => {
			expect(
				reducer({}, { type: OActionTypes.paginationSet, payload: { pagination: 42 } }),
			).toEqual({ ...{}, pagination: 42 });
		});
	});
});
