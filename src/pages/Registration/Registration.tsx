import { useState } from 'react';
import { Typography, TextField, Paper } from "@mui/material";

import './Registration.scss';

const Registration = () => {

  return(
    <div className="containerRegistration">
      <div className='test'>
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
        />
        <TextField
          className='fieldRegistration'
          label="Твой email"
          fullWidth
          color='success'
        />
        <TextField className='fieldRegistration' label="Введи пароль" color='success' type="password" autoComplete="current-password" fullWidth />
        <TextField className='fieldRegistration' label="Повтори пароль" color='success' type="password" autoComplete="current-password" fullWidth />
        <button className='button'>
          Зарегестрироваться
        </button>
      </Paper>
    </div>
  )
}

export default Registration;