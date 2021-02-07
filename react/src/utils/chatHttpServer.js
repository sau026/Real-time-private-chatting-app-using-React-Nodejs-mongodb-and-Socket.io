import * as axios from 'axios';
 
class ChatHttpServer {

    getUserId() {
        return new Promise((resolve, reject) => {
            try {
                resolve(localStorage.getItem('userId'));
            } catch (error) {
                reject(error);
            }
        });
    }

    userSessionCheck(userId) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.post('http://localhost:4000/userSessionCheck', {
                    userId: userId
                });
                resolve(response.data);
            } catch (error) {
                reject(error);
            }
        });
    }

    getMessages(userId, toUserId) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.post('http://localhost:4000/getMessages', {
                    userId: userId,
                    toUserId: toUserId
                });
                resolve(response.data);
            } catch (error) {
                reject(error);
            }
        });
    }
}

export default new ChatHttpServer();
