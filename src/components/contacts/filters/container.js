import { compose } from 'redux';
import { connect } from 'react-redux';
import { View } from './view';
import { filterContacts } from 'store/contacts/actions';
import { loadingSelector, filtersSelector } from 'store/contacts/selectors';


const mapStateToProps = (state) => {
	return {
		filters: filtersSelector(state),
		loading: loadingSelector(state),
	};
};

const mapDispatchToProps = {
	filterContacts,
};

const FiltersForContacts = compose(
	connect(mapStateToProps, mapDispatchToProps),
)(View);

export { FiltersForContacts };
