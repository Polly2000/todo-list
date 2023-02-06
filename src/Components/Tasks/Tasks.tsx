import React, { FC} from 'react';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';

import './Tasks.scss';
import editSvg from '../../assets/img/edit.svg';
import AddTaskForm from './AddTaskForm';
import Task from './Task';

interface ITasks {
  list: any,
  onEditTitle: any,
  onAddTask: any,
  onRemoveTask?: any,
  onEditTask?: any,
  withoutEmpty?: any,
  onCompleteTask?: any,
}

const Tasks: FC<ITasks> = 
({ 
  list,
  onEditTitle, 
  onAddTask, 
  onRemoveTask,
  onEditTask,
  withoutEmpty,
  onCompleteTask,
}) => {

  const theme = useTheme();
  const editTitle = () => {
    const newTitle = window.prompt('Folder name', list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios
      .patch('http://localhost:3001/lists/' + list.id, {
          name: newTitle
        })
      .catch(() => {
        alert('Failed to update folder name')
      });
    }
  }

  return (
    <div className='tasks'>
      <h2 style={{color: list.color.hex}} className={theme.palette.mode === 'dark' ? 'tasksDark__title' : 'tasks__title'}>
        { list.name }
        <img 
          onClick={editTitle} 
          src={editSvg} 
          alt='Edit icon' 
        />
      </h2>

      <div className="tasks__items">
        {!withoutEmpty && list.tasks && !list.tasks.length && (   
          <h2>No tasks</h2>
        )}
        {list.tasks && list.tasks.map((task:any) => (
            <Task 
              key={task.id}
              list={list}
              onRemove={onRemoveTask}
              onEdit={onEditTask}
              {...task}
              onComplete={onCompleteTask}
            />
          ))
        }
        <AddTaskForm
          key={list.id}
          list={list}
          onAddTask={onAddTask}
        />
      </div>

    </div>
  )
}

export default Tasks;