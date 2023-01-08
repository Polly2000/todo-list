import { NavLink } from 'react-router-dom';

import './NotAuth.scss';
import todoPng from './todo.png';
import todoText from './todo-text.png';
import requirement from './requirement.png';

const NotAuth = () => {
  return(
    <div className='container notAuth_block'>     
      <h1 className='title'>TODO APP</h1>
      <p className='text'>Твой персональный помощник</p>
      <div className='icons'>
        <img src={todoPng} alt="Todo"></img>
        <img src={todoText} alt="Todo"></img>
        <img src={requirement} alt="Todo"></img>
      </div>
      <div className='buttons'>
        <NavLink to='/registration' className="link">
          <button className='button oneButton'>Войти</button>
        </NavLink>
        <NavLink to='/login' className="link">
          <button className='button oneButton'>Зарегестрироваться</button>
        </NavLink>
      </div>
    </div>
  )
}

export default NotAuth;