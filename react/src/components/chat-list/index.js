import React, { useState, useEffect } from 'react';
import { Images } from '../../assets/images';
import ChatSocketServer from '../../utils/chatSocketServer';
import ChatHttpServer from '../../utils/chatHttpServer';
import './index.scss';

const ChatList = (props) => {
  // const [userId, setUserId] = useState(null)
  const [chatList, setChatList] = useState(null);
  const [chatListUsers, setChatListUsers] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null)

  useEffect(async () => {
    const userData = []
    setChatList(userData)
    const userId = await ChatHttpServer.getUserId();
    ChatSocketServer.establishSocketConnection(userId);
    ChatSocketServer.getChatList(userId);
    ChatSocketServer.eventEmitter.on('chat-list-response', createChatListUsers);
  }, []);

  const createChatListUsers = (chatListResponse) => {
    if (!chatListResponse.error) {
      let chatListUsers = [];
      if (chatListResponse.singleUser) {
        if (chatListUsers.length > 0) {
          chatListUsers = chatListUsers.filter(function (obj) {
            return obj.id !== chatListResponse.chatList[0].id;
          });
        }
        /* Adding new online user into chat list array */
        chatListUsers = [...chatListUsers, ...chatListResponse.chatList];
      } else if (chatListResponse.userDisconnected) {
        const loggedOutUser = chatListUsers.findIndex((obj) => obj.id === chatListResponse.userid);
        if (loggedOutUser >= 0) {
          chatListUsers[loggedOutUser].online = 'N';
        }
      } else {
        /* Updating entire chat list if user logs in. */
        chatListUsers = chatListResponse.chatList;
      }
      setChatListUsers(chatListUsers);
    } else {
      alert(`Unable to load Chat list, Redirecting to Login.`);
    }
  }

  const selectedUser = (user, i) => {
    setActiveIndex(i);
    setSelectedUserId(user.id);
    props.updateSelectedUser(user)
  }

  return (
    <div className="user__list" id="style-15">
      {
        chatListUsers && chatListUsers.map((ele, i) => {
          return (
            <div className={`${i == activeIndex ? "active single__user" : "single__user"}`} onClick={() => selectedUser(ele, i)}>
              <img src={Images.user}
                alt="user" />
              <div className="user__name___box">
                <span>{ele.username}</span>
                {ele.online === 'Y' ? <span className="circle__green"></span> : null}
              </div>
            </div>
          )
        })
      }
    </div>
  );
}

export default ChatList;
