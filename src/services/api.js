import { randomIntegerInRange } from '../utils';


export const getApiUrl = () => (
	(process.env.REACT_APP_API_URL && process.env.REACT_APP_API_VERSION && process.env.REACT_APP_API_CONTACTS_SEED_KEY)
		? (
			`${process.env.REACT_APP_API_URL}/api`
			+ `/${process.env.REACT_APP_API_VERSION}`
			+ `/?seed=${process.env.REACT_APP_API_CONTACTS_SEED_KEY}`
		) : 'https://randomuser.me/api/1.3?seed=default-seed'
);


export async function fetchContacts(count = randomIntegerInRange(1, 1000)) {
	const response = await fetch(`${getApiUrl()}&results=${count}`);
	const jsonResponse = await response.json();

	return {
		data: jsonResponse.results,
		count: jsonResponse.info.results,
	};
}
