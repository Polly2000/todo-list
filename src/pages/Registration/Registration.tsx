import { useState } from "react";
import { Typography, TextField, Paper } from "@mui/material";
import { Link } from 'react-router-dom';
import axios from "axios";

import './Registration.scss';

// axios.defaults.withCredentials = true;

const Registration = () => {

  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleName = (name: string) => {
    setUserName(name);
    console.log(name);
  }

  const handleEmail = (email: string) => {
    setEmail(email);
    console.log(email);
  }

  const handlePassword = (password: string) => {
    setPassword(password);
    console.log(password);
  }

  // const registerHandler = async () => {
  //   try {
  //     await axios
  //             .post('http://localhost:5000/api/auth/registration', {
  //               userName: userName,
  //               email: email,
  //               password: password
  //             }, {
  //               headers: {
  //                 'Content-Type': 'application/json'
  //               }
  //             })
  //             .then(response => console.log(response))
  //   } catch(err) {
  //     console.log(err);
  //   }
  // }

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
        {/* <TextField className='fieldRegistration' label="Повтори пароль" color='success' type="password" autoComplete="current-password" fullWidth /> */}
        <div className='flex'>
          <button 
            className='button' 
            // onClick={registerHandler}
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