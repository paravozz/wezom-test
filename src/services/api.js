import { randomIntegerInRange } from '../utils';


export async function fetchContacts(count = randomIntegerInRange(1, 1000), seed = 'hi-wezom-hire-me') {
	const response = await fetch(`https://randomuser.me/api/1.3?seed=${seed}&results=${count}`);
	const jsonResponse = await response.json();

	return {
		data: jsonResponse.results,
		count: jsonResponse.info.results,
	};
}
