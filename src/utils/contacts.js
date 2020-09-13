export function getFullName(title, first, last) {
	return `${title} ${first} ${last}`;
}

const mapGenderToItsName = {
	male: 'Men',
	female: 'Women',
	indeterminate: 'Indeterminate',
};

export function getGenderName(gender) {
	if (!gender) {
		return mapGenderToItsName.indeterminate;
	}

	return mapGenderToItsName[gender];
}

export function paginateCollection(collection, offset = 0, limit = 10) {
	return collection.slice(offset, offset + limit);
}
