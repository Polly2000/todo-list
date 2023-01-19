import { useState, useContext } from "react";
import { Typography, TextField, Paper } from "@mui/material";
import { Link } from 'react-router-dom';
import axios from "axios";

import './Login.scss';
import { AuthContext } from "../../context/AuthContext";

const Login = () => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleEmail = (email: string) => {
    setEmail(email);
  }

  const handlePassword = (password: string) => {
    setPassword(password);
  }

  const { login } = useContext(AuthContext);

    const loginHandler = async () => {
    try {
      await axios
              .post('http://localhost:5000/login', {
                email: email,
                password: password
              }, {
                headers: {
                  'Content-Type': 'application/json'
                }
              })
              .then((res) => {
                if (res.status === 200 || res.status === 201) {
                  // navigate('/login');
                  login(res.data.token, res.data.userId);
                }
              })
    } catch(err) {
      console.log(err);
    }
  }


  return(
    <div className="containerLogin">
      <div className='center'>
        <h1 className='title'>TODO APP</h1>
        <p className='text'>Твой персональный помощник</p>
      </div>
      <Paper className='root'>
        <Typography className='titleEnter' variant="h5">
          Вход в аккаунт
        </Typography>
        <TextField
          className='fieldLogin'
          label="Введи email"
          color='success'
          fullWidth
          onChange={(e) => handleEmail(e.target.value)}
        />
        <TextField 
          className='fieldLogin' 
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
            onClick={loginHandler}
          >
            Войти
          </button>
          <Link to='/registration' className='link'>
            У меня нет аккаунта
          </Link>
        </div>
      </Paper>
    </div>
  )
}

export default Login;