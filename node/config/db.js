"use strict";
/**
 * MongDB class file for database connection
 * 
 * @remarks
 * We can use Mongoose here, for the sake of simplicity I have used pure MongoDB module to run queries.
 * 		With the help of Mongoose, we could have added
 * 		1. MongoDB collection schema [Very Important]
 * 		2. We could have used Middleware, Validation
 * 		3. And there are a lot of other useful features
 * 
 */
const mongodb = require('mongodb');

class Db{

    /**
     * constructor() method will initialize the MongoDB client
	 * @param {None}
     * @remarks
	 * 	This method will create Two Properties of the class 
     *	this.mongoClient & this.ObjectID, which will be used later 
     *	in the application for quries and storing the data.
     */
	constructor(){
		this.mongoClient = mongodb.MongoClient;
		this.ObjectID = mongodb.ObjectID;
	}

    /**
     * onConnect() will connect to mongoDNB client 
	 * @param {None}
	 * @returns {Promise}
	 * 
     * @remarks
	 * 	This method will return a promise along with the
	 * 	Database connection object (dbClient) and ObjectID Object.
     */ 
	onConnect(){
		const mongoURL = process.env.MONGODB_CONNECTION_URL;
		return new Promise( (resolve, reject) => {
			this.mongoClient.connect(mongoURL, (err, dbClient) => {
				if (err) {
					reject(err);
				} else {
					resolve([dbClient,this.ObjectID]);
				}
			});
		});
	}
}

/**
 * Module for connecting to MongDB database
 * @module Db
 * @type {class}
 */
module.exports = new Db();