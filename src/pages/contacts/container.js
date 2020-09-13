import { compose } from 'redux';
import { connect } from 'react-redux';
import { View } from './view';
import { fetchContacts, setPagination } from 'store/contacts/actions';
import {
	contactsCollection,
	loadingSelector,
	totalCountSelector,
	paginationSelector,
} from 'store/contacts/selectors';

const mapStateToProps = (state) => {
	return {
		contacts: contactsCollection(state),
		totalCount: totalCountSelector(state),
		loading: loadingSelector(state),
		pagination: paginationSelector(state),
	};
};

const mapDispatchToProps = {
	fetchContacts,
	setPagination,
};

const PageContacts = compose(
	connect(mapStateToProps, mapDispatchToProps),
)(View);

export { PageContacts };
