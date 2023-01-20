import { Link } from 'react-router-dom';

import './NotAuth.scss';
import todoPng from './todo.png';
import todoText from './todo-text.png';
import requirement from './requirement.png';

const NotAuth = () => {
  return(
    <div className='container notAuth_block'>     
      <h1 className='title'>TODO APP</h1>
      <p className='text'>Твой персональный помощник</p>
      <div>
        <img src={todoPng} alt='Todo'></img>
        <img src={todoText} alt='Todo'></img>
        <img src={requirement} alt='Todo'></img>
      </div>
      <div className='buttons'>
        <Link to='/login' className='link'>
          <button className='buttonAuth oneButton'>Войти</button>
        </Link>
        <Link to='/registration' className='link'>
          <button className='buttonAuth buttonAuth_grey oneButton'>Зарегестрироваться</button>
        </Link>
      </div>
    </div>
  )
}

export default NotAuth;