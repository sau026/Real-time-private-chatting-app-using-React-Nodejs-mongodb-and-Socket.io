const CONSTANTS = require('../config/constants');

/**
 * QueryHandler class for executing MongoDB queries
 * @class
 */
class QueryHandler{

	constructor(){
		this.Mongodb = require("./../config/db");
    }
    
    getUserByUsername(username){
		return new Promise( async (resolve, reject) => {
			try {
				const [DB, ObjectID] = await this.Mongodb.onConnect();
				DB.collection('users').find({
					username :  username
				}).toArray( (error, result) => {
					DB.close();
					if( error ){
						reject(error);
					}
					resolve(result[0]);
				});
			} catch (error) {
				reject(error)
			}	
		});
	}
    
    registerUser(data){
        return new Promise( async (resolve, reject) => {
            try {
                const [DB,ObjectID] = await this.Mongodb.onConnect();
                DB.collection('users').insertOne(data, (err, result) =>{
                    DB.close();
                    if( err ){
                        reject(err);
                    }
                    resolve(result);
                });
            } catch (error) {
                reject(error)
            }   
        });
	}
	
	getUserInfo({userId,socketId = false}){
		let queryProjection = null;
		if(socketId){
			queryProjection = {
				"socketId" : true
			}
		} else {
			queryProjection = {
				"username" : true,
				"online" : true,
				'_id': false,
				'id': '$_id'
			}
		}
		return new Promise( async (resolve, reject) => {
			try {
				const [DB, ObjectID] = await this.Mongodb.onConnect();
				DB.collection('users').aggregate([{
					$match:  {
						_id : ObjectID(userId)
					}
				},{
					$project : queryProjection
				}
				]).toArray( (err, result) => {
					DB.close();
					if( err ){
						reject(err);
					}
					socketId ? resolve(result[0]['socketId']) : resolve(result);
				});
			} catch (error) {
				reject(error)
			}
		});
	}

    addSocketId({userId, socketId}){
		const data = {
			id : userId,
			value : {
				$set :{
					socketId : socketId,
					online : 'Y'
				}
			}
		};
		return new Promise( async (resolve, reject) => {
			try {
				const [DB, ObjectID] = await this.Mongodb.onConnect();
				DB.collection('users').update( { _id : ObjectID(data.id)}, data.value ,(err, result) => {
					DB.close();
					if( err ){
						reject(err);
					}
					resolve(result);
				});
			} catch (error) {
				reject(error)
			}
		});
	}

	getChatList(userId){
		return new Promise( async (resolve, reject) => {
			try {
				const [DB, ObjectID] = await this.Mongodb.onConnect();
				DB.collection('users').aggregate([{
					$match: {
						'socketId': { $ne : userId}
					}
				},{
					$project:{
						"username" : true,
						"online" : true,
						'_id': false,
						'id': '$_id'
					}
				}
				]).toArray( (err, result) => {
					DB.close();
					if( err ){
						reject(err);
					}
					resolve(result);
				});
			} catch (error) {
				reject(error)
			}
		});
	}

	insertMessages(messagePacket){
		return new Promise( async (resolve, reject) => {
			try {
				const [DB, ObjectID] = await this.Mongodb.onConnect();
				DB.collection('messages').insertOne(messagePacket, (err, result) =>{
					DB.close();
					if( err ){
						reject(err);
					}
					resolve(result);
				});
			} catch (error) {
				reject(error)
			}
		});
	}


	userSessionCheck(data){
		return new Promise( async (resolve, reject) => {
			try {
				const [DB, ObjectID] = await this.Mongodb.onConnect();
				DB.collection('users').findOne( { _id : ObjectID(data.userId) , online : 'Y'}, (err, result) => {
					DB.close();
					if( err ){
						reject(err);
					}
					resolve(result);
				});	
			} catch (error) {
				reject(error)
			}
		});
	}

	getMessages({userId, toUserId}){
		const data = {
				'$or' : [
					{ '$and': [
						{
							'toUserId': userId
						},{
							'fromUserId': toUserId
						}
					]
				},{
					'$and': [ 
						{
							'toUserId': toUserId
						}, {
							'fromUserId': userId
						}
					]
				},
			]
		};	    
		return new Promise( async (resolve, reject) => {
			try {
				const [DB, ObjectID] = await this.Mongodb.onConnect();
				DB.collection('messages').find(data).sort({'timestamp':1}).toArray( (err, result) => {
					DB.close();
					if( err ){
						reject(err);
					}
					resolve(result);
				});
			} catch (error) {
				reject(error)
			}
		});
	}
}


/**
 * Module for executing MongoDB queries
 * @module QueryHandler
 * @type {class}
 */
module.exports = new QueryHandler();