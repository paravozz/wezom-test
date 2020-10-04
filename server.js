// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// middlewares
server.use((req, res, next) => {
	if (req.query.results) {
		req.query._limit = req.query.results;
	}
	next();
});
server.use(middlewares);

// routes
router.render = (req, res) => {
	res.jsonp({
		results: res.locals.data,
		info: {
			results: res.locals.data.length,
		}
	})
};
server.use(jsonServer.rewriter({
	'/api/1.3/': '/contacts',
	'/api/1.3/?seed=:seed': '/contacts',
}));
server.use(router);

// loop
server.listen(3004, () => {
	console.log('JSON Server is running')
});
