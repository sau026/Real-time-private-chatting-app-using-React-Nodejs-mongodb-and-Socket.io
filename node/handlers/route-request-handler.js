const CONSTANTS = require('../config/constants');
const queryHandler = require('./query-handler')
const jwt = require("jsonwebtoken")

const jwtKey = "my_secret_key"
const jwtExpirySeconds = 300
/**
 * RouteHandler class for handling the HTTP routes
 * @class
 */
class RouteHandler {

    /**
     * Responsible for fetching bid for the Ads SLots
     * @param {expressRequestObject} request
     * @param {expressResponseObject} response
     */

    async loginRouteHandler(request, response) {
        const data = {
            username: (request.body.username).toLowerCase(),
            password: request.body.password
        };
        if (data.username === '' || data.username === null) {
            response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
                error: true,
                message: CONSTANTS.USERNAME_NOT_FOUND
            });
        } else if (data.password === '' || data.password === null) {
            response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
                error: true,
                message: CONSTANTS.PASSWORD_NOT_FOUND
            });
        } else {
            try {
                const result = await queryHandler.getUserByUsername(data.username);
                if (result === null || result === undefined) {
                    response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
                        error: true,
                        message: CONSTANTS.USER_LOGIN_FAILED
                    });
                } else {
                    if (data.password === result.password) {
                        const username = data.username;
                        const token = jwt.sign({ username }, jwtKey, {
                            algorithm: "HS256",
                            expiresIn: jwtExpirySeconds,
                        })
                        response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                            error: false,
                            userId: result._id,
                            message: CONSTANTS.USER_LOGIN_OK,
                            JWT: token
                        });
                    } else {
                        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
                            error: true,
                            message: CONSTANTS.USER_LOGIN_FAILED
                        });
                    }
                }
            } catch (error) {
                console.log('saurabh cheL: erreeee:111111111111111:::::::::::', error)
                response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
                    error: true,
                    message: CONSTANTS.USER_LOGIN_FAILED
                });
            }
        }
    }

    async registerRouteHandler(request, response) {
        const data = {
            username: (request.body.username).toLowerCase(),
            password: request.body.password
        };
        if (data.username === '') {
            response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
                error: true,
                message: CONSTANTS.USERNAME_NOT_FOUND
            });
        } else if (data.password === '') {
            response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
                error: true,
                message: CONSTANTS.PASSWORD_NOT_FOUND
            });
        } else {
            try {
                const result = await queryHandler.registerUser(data);
                if (result === null || result === undefined) {
                    response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                        error: false,
                        message: CONSTANTS.USER_REGISTRATION_FAILED
                    });
                } else {
                    response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                        error: false,
                        userId: result.insertedId,
                        message: CONSTANTS.USER_REGISTRATION_OK
                    });
                }
            } catch (error) {
                response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
                    error: true,
                    message: CONSTANTS.SERVER_ERROR_MESSAGE
                });
            }
        }
    }

    async userSessionCheckRouteHandler(request, response){
		let userId = request.body.userId;
		if (userId === '') {
			response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
				error : true,
				message : CONSTANTS.USERID_NOT_FOUND
			});
		} else {
			try {
				const result = await queryHandler.userSessionCheck({ userId : userId });
				response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
					error : false,
					username : result.username,
					message : CONSTANTS.USER_LOGIN_OK
				});
			} catch(error) {
				response.status(CONSTANTS.SERVER_NOT_ALLOWED_HTTP_CODE).json({
					error : true,
					message : CONSTANTS.USER_NOT_LOGGED_IN
				});
			}
		}
	}

	async getMessagesRouteHandler(request, response){
		const userId = request.body.userId;
		const toUserId = request.body.toUserId;
		if (userId == '') {
			response.status(CONSTANTS.SERVER_ERROR_HTTP_CODE).json({
				error : true,
				message : CONSTANTS.USERID_NOT_FOUND
			});
		} else{
			try {
				const messagesResponse = await queryHandler.getMessages({
					userId:userId,
					toUserId: toUserId
				});
				response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
					error : false,
					messages : messagesResponse
				});
			} catch ( error ){
				response.status(CONSTANTS.SERVER_NOT_ALLOWED_HTTP_CODE).json({
					error : true,
					messages : CONSTANTS.USER_NOT_LOGGED_IN
				});
			}
		}
	}

    routeNotFoundHandler(request, response) {
        response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
            error: true,
            message: CONSTANTS.ROUTE_NOT_FOUND
        });
    }
}


/**
 * Module for handling the HTTP routes
 * @module RouteHandler
 * @type {class}
 */
module.exports = new RouteHandler();