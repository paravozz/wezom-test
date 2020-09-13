import { compose } from 'redux';
import { connect } from 'react-redux';
import { View } from './view';
import {
	contactsCollection,
	loadingSelector,
	paginationSelector,
} from 'store/contacts/selectors';

const mapStateToProps = (state) => {
	return {
		contacts: contactsCollection(state),
		loading: loadingSelector(state),
		pagination: paginationSelector(state),
	};
};

const mapDispatchToProps = null;

const TiledContacts = compose(
	connect(mapStateToProps, mapDispatchToProps),
)(View);

export { TiledContacts };
