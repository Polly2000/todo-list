import React, { useState, FC } from 'react';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';

import './Tasks.scss';
import addSvg from '../../assets/img/add.svg';

interface IAddTaskForm {
  list: any,
  onAddTask?: any,
}

const AddTaskForm: FC<IAddTaskForm> = 
({ 
  list,
  onAddTask,
 }) => {

  const theme = useTheme();
  const [visibleForm, setVisibleForm] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const toggleFormVisible = () => {
    setVisibleForm(!visibleForm);
    setInputValue('');
  }

  const addTask = () => {
    if (!inputValue) { 
      alert('Enter the name of the task')
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
      .catch((e:any) => alert('Error adding task'))
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
          <span> New task </span>
        </div>
        ):(
        <div className={theme.palette.mode === 'dark' ? 'tasksDark__form-block' : "tasks__form-block"}>
          <input
            className={theme.palette.mode === 'dark' ? 'fieldDark' : 'field'}
            type='text'
            placeholder='Enter task text..'
            onChange={event => setInputValue(event.target.value)}
          />
          <button 
            disabled={isLoading}
            className='button'
            onClick={addTask}
          >
            {isLoading ? 'Adding...' : 'Add'}
          </button>
          <button 
            className={theme.palette.mode === 'dark' ? 'button buttonDark_grey' : 'button button_grey'}
            onClick={toggleFormVisible}
          >
            Cancel
          </button>
        </div>
        )
      }
      
    </div>
  )
}

export default AddTaskForm;
