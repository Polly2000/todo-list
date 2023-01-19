import React, { useState, useEffect, createContext, useContext } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import './App.scss';
import List from '../List/List';
import Tasks from '../Tasks/Tasks';
import AddList from '../AddList/AddList';
import NotAuth from '../../pages/NotAuth/NotAuth';
import Login from '../../pages/Login/Login';
import Registration from '../../pages/Registration/Registration';
import { ReactComponent as ListSvg } from '../../assets/img/list.svg';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

const App = () => {

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

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
      // .get('http://localhost:3001/colors')
      .get('http://localhost:5000/colors')
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

  const onCompleteTask = (listId: any, taskId: any, completed: any) => {
    const newList = lists.map((list:any) => {
      if (list.id === listId) {
        list.tasks = list.tasks.map((task:any) => {
          if (task.id === taskId) {
            task.completed = completed;
          }
          return task;
        })
      }
      return list;
  });
  setLists(newList);
  axios
    .patch('http://localhost:3001/tasks/' + taskId, { completed })
    .catch(() => {
      alert('Не удалось обновить задачу :с')
    });
  }
  
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
        alert('Не удалось изменить название задачи :с')
      });
  };

  const onAddList = (obj: any) => {
    const newList = [...lists, obj];
    setLists(newList);
  };

  // lists && lists.map((list:any) => {
  //   return console.log(list);
  // })

  const isAuth = true;

  return (
      <div>
        { isAuth ?
        (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'background.default',
              color: 'text.primary',
              borderRadius: 1,
            }}
          >
            <div className="container">
              <div className="header">
                <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                  {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
                <p>login</p>
              </div>
            </div>

            <div className={theme.palette.mode === 'dark' ? 'todoDark container' : 'todo container'}>
              <div className={theme.palette.mode === 'dark' ? 'todoDark__sidebar' : 'todo__sidebar'}>
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
                  mode={theme.palette.mode}
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
                    mode={theme.palette.mode}
                  />
                ) : (
                  'Загрузка...'
                )}
                  
                <AddList 
                  onAdd={onAddList} 
                  colors={colors}
                  mode={theme.palette.mode}
                />
              </div>
              <div className='todo__tasks'>
              <Routes>
                <Route 
                  path='/'
                  element={
                    lists && lists.map((list: any) => (
                      <Tasks 
                        key={list.id}
                        list={list} 
                        onEditTitle={onEditListTitle}
                        onAddTask={onAddTask}
                        onRemoveTask={onRemoveTask}
                        onEditTask={onEditTask}
                        onCompleteTask={onCompleteTask}
                        withoutEmpty
                        mode={theme.palette.mode}
                      />
                    ))
                  }
                
                />
                <Route 
                  path='/lists/:id'
                  element={lists && activeItem && (
                    <Tasks 
                      key={activeItem}
                      list={activeItem} 
                      onEditTitle={onEditListTitle}
                      onAddTask={onAddTask}
                      onRemoveTask={onRemoveTask}
                      onEditTask={onEditTask}
                      onCompleteTask={onCompleteTask}
                      mode={theme.palette.mode}
                    />
                  )}
                /> 
              </Routes>
              </div>
            </div>
          </Box> 
        )
          :
        (
          // <NotAuth />
          <Routes>
            <Route path='/' element={<NotAuth />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/registration' element={<Registration />}/>
          </Routes>
        )
      }
      </div>    
  );
}

// export default App;

export default function ToggleColorMode() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  useEffect(() => {
    const test = localStorage.getItem('mode') as string;
    setMode(JSON.parse(test))
  }, []);

  useEffect(() => {
    localStorage.setItem('mode', JSON.stringify(mode));
  }, [mode]);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}