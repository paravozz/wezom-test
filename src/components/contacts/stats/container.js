import { compose } from 'redux';
import { connect } from 'react-redux';
import { View } from './view';
import {
	contactsCollection,
	loadingSelector,
} from 'store/contacts/selectors';

const mapStateToProps = (state) => {
	return {
		contacts: contactsCollection(state),
		loading: loadingSelector(state),
	};
};

const mapDispatchToProps = null;

const StatsForContacts = compose(
	connect(mapStateToProps, mapDispatchToProps),
)(View);

export { StatsForContacts };
