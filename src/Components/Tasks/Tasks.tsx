import React, { FC} from 'react';
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
    mode?: any,
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
  mode
}) => {

  const editTitle = () => {
    const newTitle = window.prompt('Название списка', list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios
      .patch('https://todo-json-server-0xkx.onrender.com/lists/' + list.id, {
          name: newTitle
        })
      .catch(() => {
        alert('Не удалось обновить название списка')
      });
    }
  }

  return (
    <div className='tasks'>
      <h2 style={{color: list.color.hex}} className={mode === 'dark' ? 'tasksDark__title' : 'tasks__title'}>
        { list.name }
        <img 
          onClick={editTitle} 
          src={editSvg} 
          alt='Edit icon' 
        />
      </h2>

      <div className="tasks__items">
        {!withoutEmpty && list.tasks && !list.tasks.length && (   
          <h2>Задачи отсутствуют</h2>
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
          mode={mode}
        />
      </div>

    </div>
  )
}

export default Tasks;