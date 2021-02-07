import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar-left'
import Header from '../../components/header'
import ChatList from '../../components/chat-list'
import { useSelector } from 'react-redux'
import DataModal from '../../components/data-modal'
import Table from '../../components/data-table'
import { Images } from'../../assets/images';
import axios from 'axios';
import './index.scss';

const Login = (props) => {

  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  const setFormData = evt => {
    const name = evt.target.name;
    const value = evt.target.value;
    switch (name) {
      case 'email': {
        setEmail(value);
        break;
      }
      case 'password': {
        setPassword(value);
        break;
      }
      default:
    }
  }

  const checkLoginData = () => {
    axios.post('http://localhost:4000/login', {
      "username":email,
	    "password":password
    })
    .then(function (response) {
      localStorage.setItem('token', response.data.JWT);
      localStorage.setItem('userId', response.data.userId);
      props.history.push('/chat');
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div>
        <div className="login__container">
          <div className="form__control">
            <label>Username</label>
            <input id="username" type="text" name="email" onChange={setFormData} />
          </div>
          <div className="form__control">
            <label>Password</label>
            <input id="password" type="password" name="password" onChange={setFormData} />
          </div>          
          <button onClick={checkLoginData}>Login</button>
        </div>
      </div>
  );
}

export default Login;


