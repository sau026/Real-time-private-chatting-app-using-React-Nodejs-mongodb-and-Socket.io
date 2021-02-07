const routeHandler = require('./../handlers/route-request-handler');
var cors = require('cors')

class Routes{

	constructor(app){
		/**
		 * Getting the instance of the express Object.
		 */
		this.app = app;
	}

	/**
	 * Registering the routes.
	 */
	appRoutes(){
		this.app.post('/register',cors(), routeHandler.registerRouteHandler);
		this.app.post('/login', cors(), routeHandler.loginRouteHandler);
		this.app.post('/getMessages', cors(), routeHandler.getMessagesRouteHandler);
		this.app.post('/userSessionCheck', cors(), routeHandler.userSessionCheckRouteHandler);
		/**
		 * Handling 404 Route
		 */
		this.app.get('*', routeHandler.routeNotFoundHandler);		
	}

	routesConfig(){
		this.appRoutes();
	}
}
module.exports = Routes;