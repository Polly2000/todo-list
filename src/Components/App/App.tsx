import React from 'react';

import './App.scss';
import List from '../List/List';
import Main from '../Tasks/Tasks';

const App = () => {
  return (
    <div className='app container'>
      <div className='app__sidebar'>
        <List />
      </div>
      <div className='app__tasks'>
        <Main />
      </div>
    </div>
  );
}

export default App;
