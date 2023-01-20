import { useState } from "react";
import { Typography, TextField, Paper } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

import './Registration.scss';

const Registration = () => {

  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleName = (name: string) => {
    setUserName(name);
  }

  const handleEmail = (email: string) => {
    setEmail(email);
  }

  const handlePassword = (password: string) => {
    setPassword(password);
  }

  const registerHandler = async () => {
    try {
      await axios
              .post('http://localhost:5000/registration', {
                name: userName,
                email: email,
                password: password
              }, {
                headers: {
                  'Content-Type': 'application/json'
                }
              })
              .then((res) => {
                if (res.status === 200 || res.status === 201) {
                  navigate('/login');
                }
              })
    } catch(err) {
      console.log(err);
    }
  }

  return(
    <div className="containerRegistration">
      <div className='center'>
        <h1 className='title'>TODO APP</h1>
        <p className='text'>Твой персональный помощник</p>
      </div>
      <Paper className='root'>
        <Typography className='titleRegistration' variant="h5">
          Регистрация
        </Typography>
        <TextField
          className='fieldRegistration'
          label="Твоё имя"
          fullWidth
          color='success'
          onChange={(e) => handleName(e.target.value)}
        />
        <TextField
          className='fieldRegistration'
          label="Твой email"
          fullWidth
          color='success'
          onChange={(e) => handleEmail(e.target.value)}
        />
        <TextField 
          className='fieldRegistration' 
          label="Введи пароль" 
          color='success' 
          type="password" 
          autoComplete="current-password" 
          fullWidth
          onChange={(e) => handlePassword(e.target.value)}
        />
        <div className='flex'>
          <button 
            className='button' 
            onClick={registerHandler}
          >
            Зарегестрироваться
          </button>
          <Link to='/login' className='link'>
            У меня есть аккаунт
          </Link>
        </div>
      </Paper>
    </div>
  )
}

export default Registration;