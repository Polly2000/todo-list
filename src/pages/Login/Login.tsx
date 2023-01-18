import { Typography, TextField, Paper } from "@mui/material";
import { Link } from 'react-router-dom';

import './Login.scss';

const Login = () => {
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
        />
        <TextField className='fieldLogin' label="Введи пароль" color='success' type="password" autoComplete="current-password" fullWidth />
        <div className='flex'>
          <button className='button'>
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