import React, { useState, FC } from 'react'
import axios from 'axios';

import './Tasks.scss';
import addSvg from '../../assets/img/add.svg';

interface IAddTaskForm {
  list: any,
  onAddTask?: any
}

const AddTaskForm: FC<IAddTaskForm> = 
({ 
  list,
  onAddTask
 }) => {

  const [visibleForm, setVisibleForm] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const toggleFormVisible = () => {
    setVisibleForm(!visibleForm);
    setInputValue('');
  }

  const addTask = () => {
    if (!inputValue) { 
      alert('Пожалуйста, введите название таска')// если значение инпута пустое, то заканчиваем функцию
      return;
    }
    const obj = {
      "listId": list.id,
      "text": inputValue,
      "completed": false
    };
    setIsLoading(true);
    axios
      .post('http://localhost:3001/tasks', obj)
      .then(({ data }) => {
        onAddTask(list.id, data)
        toggleFormVisible();
      })
      .catch((e:any) => alert('Ошибка при добавлении задачи :с'))
      .finally(() => {
        setIsLoading(false);
      })
  }

  return (
    <div className="tasks__form">
      {!visibleForm ? (
        <div 
          className="tasks__form-new"
          onClick={toggleFormVisible}
        >
          <img src={addSvg} alt='Add icon' />
          <span> Новая задача </span>
        </div>
        ):(
        <div className="tasks__form-block">
          <input
            className='field'
            type='text'
            placeholder='Введите текст задачи..'
            onChange={event => setInputValue(event.target.value)}
          />
          <button 
            disabled={isLoading}
            className='button'
            onClick={addTask}
          >
            {isLoading ? 'Добавление...' : 'Добавить задачу'}
          </button>
          <button 
            className='button button_grey'
            onClick={toggleFormVisible}
          >
            Отмена
          </button>
        </div>
        )
      }
      
    </div>
  )
}

export default AddTaskForm;
