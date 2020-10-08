/* eslint-disable */
import { Api } from 'services';


describe('Api', () => {
	describe('getApiUrl', () => {
		const OLD_ENV = { ...process.env };

		beforeEach(() => {
			jest.resetModules();
			process.env = { ...OLD_ENV };
		});

		it('should be default if no .env vars', () => {
			delete process.env.REACT_APP_API_URL;
			delete process.env.REACT_APP_API_VERSION;
			delete process.env.REACT_APP_API_CONTACTS_SEED_KEY;

			expect(Api.getApiUrl()).toBe('https://randomuser.me/api/1.3?seed=default-seed');
		});

		it('should consist of .env vars', () => {
			expect(process.env.REACT_APP_API_URL).toBe('http://localhost:3004');
			expect(process.env.REACT_APP_API_VERSION).toBe('1.3');
			expect(process.env.REACT_APP_API_CONTACTS_SEED_KEY).toBe('wezom-react-redux-test');

			expect(Api.getApiUrl()).toBe('http://localhost:3004/api/1.3/?seed=wezom-react-redux-test')
		})
	});

	describe('fetchContacts', () => {
		it('should fetch and return correct data and count', async () => {
			expect((await Api.fetchContacts(3))).toEqual({
				data: contacts,
				count: 3,
			});
		});
	});
});
