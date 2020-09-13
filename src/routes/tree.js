import {
	PageHome,
	PageContacts,
} from 'pages';

const routes = {
	'home': {
		path: '/',
		page: PageHome,
		name: 'Home',
		link () {
			return this.path;
		},
		exact: true,
	},
	'contacts': {
		path: '/contacts',
		page: PageContacts,
		name: 'Contacts',
		link () {
			return this.path;
		},
		exact: true,
	},
};

const __ROOT_ROUTE__ = routes.home.link();
const __CONTACTS_ROUTE__ = routes.contacts.link();

export { routes, __ROOT_ROUTE__, __CONTACTS_ROUTE__ };
