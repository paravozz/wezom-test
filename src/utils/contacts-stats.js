import { getGenderName } from './contacts';

export function countGenders(contacts) {
	const results = {
		male: 0,
		female: 0,
		indeterminate: 0,
	};

	for (const contact of contacts) {
		if (!contact.gender || !['male', 'female'].includes(contact.gender)) {
			results.indeterminate += 1;
			continue;
		}

		results[contact.gender] += 1;
	}

	return results;
}

export function getGenderPredominateMessage(genderStats) {
	const [maxKey] = (
		Object.entries(genderStats)
			.reduce(([prevKey, prevValue], [currentKey, currentValue]) => (
				prevValue > currentValue ? [prevKey, prevValue] : [currentKey, currentValue]
			))
	);

	return `${getGenderName(maxKey)} predominate`
}

export function countNationalities(contacts) {
	const results = {};

	for (const contact of contacts) {
		if (Object.keys(results).includes(contact.nat)) {
			results[contact.nat] += 1;
		} else {
			results[contact.nat] = 0;
		}
	}

	return results;
}
