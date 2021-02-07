import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/sidebar-left'
import Header from '../../components/header'
import ChatList from '../../components/chat-list'
import ChatArea from '../../components/chat-area'
import { useSelector } from 'react-redux'
import DataModal from '../../components/data-modal'
import Table from '../../components/data-table'
import { Images } from '../../assets/images';
import ChatSocketServer from '../../utils/chatSocketServer';
import ChatHttpServer from '../../utils/chatHttpServer';
import './index.scss';

const Chat = (props) => {
  // const userDetails = useSelector(state => state.todoDataReducer)
  const [userId, setUserId] = useState(ChatHttpServer.getUserId());
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(async () => {
    setUserId(await ChatHttpServer.getUserId())
  }, []);

  const updateSelectedUser = (user) => {
    setSelectedUser(user)
  }

  const getChatListJSX = () => {
    return (
      <ChatList userId={userId} updateSelectedUser={updateSelectedUser}></ChatList>
    )
  }


  const getChatAreaJSX = () => {
    return (
      <ChatArea userId={userId} newSelectedUser={selectedUser}></ChatArea>
    )
  }

  return (
    <div className="body__container">
      <div className="chat__container">
        <div className="chat__list">
          <div className="search__box">
            <div className="element__container">
              <img src={Images.searchIcon} />
              <input type="text" placeholder="Search or start a new chat" />
            </div>
          </div>
          {getChatListJSX()}
        </div>
          {getChatAreaJSX()}
      </div>
    </div>
  );
}

export default Chat;


