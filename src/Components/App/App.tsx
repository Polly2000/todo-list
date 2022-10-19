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

  // const location = useLocation();

  const navigate = useNavigate();
  const goHome = () => navigate('/');
  const goList = (id: number) => {
    navigate(`/lists/${id}`);
  }

  return (
    <div className='app container'>
      <div className='app__sidebar'>
        <List
          onClickItem={() => {
            goHome();
          }}
          items={[
            {
              active: !activeItem,
              icon: <ListSvg />,
              name: 'All tasks'
            },
          ]}
          isRemovable={false}
        />
        {/* <List 
          items={}
        /> */}
      </div>
      <div className='app__tasks'>
        <Tasks />
      </div>
    </div>
  );
}

export default App;
