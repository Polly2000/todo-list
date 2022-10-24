import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import './App.scss';
import List from '../List/List';
import Tasks from '../Tasks/Tasks';
import AddList from '../AddList/AddList';
import { ReactComponent as ListSvg } from '../../assets/img/list.svg';

const App = () => {

  const [lists, setLists] = useState<any | null>(null); 
  const [colors, setColors] = useState<any | null>(null);
  const [activeItem, setActiveItem] = useState<any | null>(null);

  const location = useLocation();

  const navigate = useNavigate()
  const goHome = () => navigate('/');
  const goList = (id: number) => {
    navigate(`/lists/${id}`);
  }

  useEffect(() => {
    const listId = location.pathname.split('lists/')[1];
    if (lists) {
      const list = lists.find((list:any) => list.id === Number(listId));
      setActiveItem(list);
    }
  }, [lists, location.pathname])


  useEffect(() => {
    axios
      .get('http://localhost:3001/lists?_expand=color&_embed=tasks')
      .then(({ data }) => {
        setLists(data);
      });
    axios
      .get('http://localhost:3001/colors')
      .then(({ data }) => {
      setColors(data);
    });
  }, []);

  const onEditListTitle = (id:any, title:any) => {
    const newList = lists.map((item:any) => {
      if (item.id === id) {
        item.name = title;
      }
      return item;
    });
    setLists(newList);
  };

  const onAddTask = (listId: any, taskObj: any) => {
    const newList = lists.map((item:any) => {
      if (item.id === listId) {
        item.tasks = [...item.tasks, taskObj];
      }
      return item;
    });
    setLists(newList);
  };

  const onRemoveTask = (listId: number, taskId: number) => {
    if (window.confirm('Вы действительно хотите удалить задачу?')) {
      const newList = lists.map((item:any) => {
        if (item.id === listId) {
          item.tasks = item.tasks.filter((task:any) => task.id !== taskId)
        }
        return item;
    });
    setLists(newList);
    axios
      .delete('http://localhost:3001/tasks/' + taskId)
      .catch(() => {
        alert('Не удалось удалить задачу :с')
      });
    }
  };
  
  const onEditTask = (listId: any, taskObj: any) => {
    const newTaskText = window.prompt('Введите текст задачи..', taskObj.text);

    if (!newTaskText) { 
      return;
    }

      const newList = lists.map((list:any) => {
        if (list.id === listId) {
          list.tasks = list.tasks.map((task:any) => {
            if (task.id === taskObj.id) {
              task.text = newTaskText;
            }
            return task;
          })
        }
        return list;
    });
    setLists(newList);
    axios
      .patch('http://localhost:3001/tasks/' + taskObj.id, { text: taskObj.text })
      .catch(() => {
        alert('Не удалось удалить задачу :с')
      });
  };

  const onAddList = (obj: any) => {
    const newList = [...lists, obj];
    setLists(newList);
  };

  return (
      <div className='todo container'>
      <div className='todo__sidebar'>
        <List 
          onClickItem={() => {
            goHome();
          }}
          items={[
            {
              active: !activeItem,
              icon: <ListSvg />,
              name: 'Все задачи',
            },
          ]}
          isRemovable={false}
        />
        {lists ? (
          <List 
            items={lists}
            onRemove={(id:any) => {
              const newList = lists.filter((item:any) => item.id !== id); 
              setLists(newList);
            }}
            onClickItem={(list:any) => {
              goList(list.id);
            }}
            activeItem={activeItem}
            isRemovable
          />
        ) : (
          'Загрузка...'
        )}
          
        <AddList 
          onAdd={onAddList} 
          colors={colors} 
        />
      </div>

      <div className='todo__tasks'>
      <Routes>
        <Route 
          path='/'
          element={
            lists && lists.map((list: any) => (
              <Tasks 
                key={list}
                list={list} 
                onEditTitle={onEditListTitle}
                onAddTask={onAddTask}
                onRemoveTask={onRemoveTask}
                withoutEmpty
              />
            ))
          }
        
        />
        <Route 
          path='/lists/:id' 
          element={lists && activeItem && (
            <Tasks 
              list={activeItem} 
              onEditTitle={onEditListTitle}
              onAddTask={onAddTask}
              onRemoveTask={onRemoveTask}
              onEditTask={onEditTask}
            />
          )}
        />
          
      </Routes>
        
      </div>
    </div>
    
  );
}

export default App;