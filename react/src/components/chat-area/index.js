import React, { useState, useEffect, useRef } from 'react';
import { Images } from '../../assets/images';
import ChatHttpServer from '../../utils/chatHttpServer';
import './index.scss';
import chatSocketServer from '../../utils/chatSocketServer';
import { useImmer } from 'use-immer';

const ChatArea = (props) => {
  const [selectedUser, setSelectedUser] = useState(null);
  // const [conversations, setConversations] = useImmer([]);
  const [conversations, setConversations] = useState([]);
  const messageContainer = React.createRef();

  useEffect(async () => {
    const userId = await ChatHttpServer.getUserId();
      chatSocketServer.receiveMessage()
      chatSocketServer.eventEmitter.on('add-message-response', receiveSocketMessages);
      localStorage.removeItem("newUserSelected");
  }, []);

  let selectedUserId = props.newSelectedUser.id
  const prevProps = usePreviousProps({ selectedUserId });

  useEffect(() => {
    if (prevProps && (prevProps.selectedUserId === '' || (props.newSelectedUser.id !== prevProps.selectedUserId))) {
      getMessages();
      localStorage.setItem('newUserSelected', JSON.stringify(props.newSelectedUser))
    }
  }, [props.newSelectedUser])

  function usePreviousProps(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const receiveSocketMessages = (socketResponse) => {
    const selectedUserData = JSON.parse(localStorage.getItem('newUserSelected'))      
    if (selectedUserData && (selectedUserData.id !== null && selectedUserData.id === socketResponse.fromUserId)) {
      setConversations(prev => ([...prev, socketResponse]));
      // this.scrollMessageContainer();
    }
  }

  const getMessages = async () => {
    try {
      const { userId, newSelectedUser } = props;
      const messageResponse = await ChatHttpServer.getMessages(userId, newSelectedUser.id);
      if (!messageResponse.error) {
        setConversations(messageResponse.messages)
        // this.scrollMessageContainer();
      } else {
        alert('Unable to fetch messages');
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  const sendMessage = (event) => {
    if (event.key === 'Enter') {
      const message = event.target.value;
      const { userId, newSelectedUser } = props;
      if (message === '' || message === undefined || message === null) {
        alert(`Message can't be empty.`);
      } else if (userId === '') {
        this.router.navigate(['/']);
      } else if (newSelectedUser === undefined) {
        alert(`Select a user to chat.`);
      } else {
        sendAndUpdateMessages({
          fromUserId: userId,
          message: (message).trim(),
          toUserId: newSelectedUser.id,
        });
        event.target.value = '';
      }
    }
  }

  const sendAndUpdateMessages = (message) => {
    try {
      chatSocketServer.sendMessage(message);
      setConversations([...conversations, message])
      scrollMessageContainer();
    } catch (error) {
      alert(`Can't send your message`);
    }
  }

  const scrollMessageContainer = () => {
    if (messageContainer.current !== null) {
      try {
          messageContainer.current.scrollTop =  (messageContainer.current.scrollHeight + 61);
          // setTimeout(() => {
          //   messageContainer.current.scrollTop =  1000000;
          // }, 1000);
      } catch (error) {
        console.warn(error);
      }
    }
  }

  const getMessagesJSX = () => {
    if (props.newSelectedUser !== null) {
      return (
      <div className="conversation" id="conversation" ref={messageContainer}>
        {conversations.length > 0 && conversations.map((ele, i) => {
          return (
            <div className={`${alignMessages(ele.toUserId) ? 'message_box_right' : 'message_box_left'}`}>
              <div className={`${alignMessages(ele.toUserId) ? 'message__box__sender' : 'message__box__receiver'}`} key={i}>
                <span>{ele.message}</span>
              </div>
            </div>
          )
        })}
      </div>
      )
    }    
  }

  const getInitialConversationJSX = () => {
    if (props.newSelectedUser !== null) {
      return (
        <div className="conversation initial_chat_banner">
          <p className="heading">
           {props.newSelectedUser ? <span className="sub-heading"> You have not chatted with {props.newSelectedUser.username} in a while! Say Hi.</span>:'This app connects you to your contacts.'}
          </p>			
          <img src={Images.chatIcon} alt="user" />
        </div>
      )
    }    
  }

  const alignMessages = (toUserId) => {
    const { userId } = props;
    return userId !== toUserId;
  }

  return (
    <div className="chat__area" style={{background:props.newSelectedUser ? '#fff' : '#d5d5d51f'}}>
      {props.newSelectedUser ? <div className="chat__header">
        <img src={Images.user} alt="user" />
        <span> {props.newSelectedUser.username}</span>
      </div>:null}
      {conversations.length > 0 ? getMessagesJSX() : getInitialConversationJSX()}
      {props.newSelectedUser ? <div className="form__control">
        <input type="text" placeholder="Type a message" onKeyPress={sendMessage}></input>
        {/* <button onClick={sendMessage}>Send</button> */}
      </div>:null}
    </div>
  );
}

export default ChatArea;
