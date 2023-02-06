import React, { FC, useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';

import './AddList.scss';
import { ReactComponent as PlusSvg } from './../../assets/img/plus.svg';
import List from '../List/List';
import Badge from '../Badge/Badge';
import closeSvg from '../../assets/img/close.svg';

interface IAddList {
  onAdd: any,
  colors: any,
}

const AddList: FC<IAddList> = ({
    colors, onAdd
}) => {

  const theme = useTheme();
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, setSelectColor] = useState(3); 
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (Array.isArray(colors)) {
      setSelectColor(colors[0].id);
    }
  }, [colors]);

  const onClose = () => {
    setVisiblePopup(false);
    setInputValue('');
    setSelectColor(colors[0].id);
  }

  const addList = () => {
    if (!inputValue) {
      alert('Enter folder name')
      return; // обрывает функцию, тк пользователь ничего не ввел
    }
    setIsLoading(true);
    axios
      .post('http://localhost:3001/lists', {
        name: inputValue,
        colorId: selectedColor
      })
      .then(({ data }) => {
        const color = colors.filter((c:any) => c.id === selectedColor)[0]; 
        const listObj = { ...data, color: { name: color.name, hex: color.hex }, tasks: [] };
        onAdd(listObj);
        onClose();
      })
      .catch((err) => alert('Error adding folder'))
      .finally(() => {
        setIsLoading(false);
      })
  }

  return(
    <div className='add-list'>
      <List 
        onClick={() => setVisiblePopup(!visiblePopup)}
        items={[
          {
            className: 'add-list__button',
            icon: <PlusSvg />,
            name: 'Add folder',
          }
        ]}
        isRemovable={false}
      />
      { visiblePopup && (
        <div className={theme.palette.mode === 'dark' ? 'add-listDark__popup' : 'add-list__popup'}>
          <img
            onClick={onClose}
            src={closeSvg} 
            alt='Close button' 
            className='add-list__popup-close-btn'>
          </img>
        <input
          value={inputValue}
          onChange={(e:any) => setInputValue(e.target.value)}
          className={theme.palette.mode === 'dark' ? 'fieldDark' : 'field'}
          type='text'
          placeholder='Folder name'
        />
        <div className='add-list__popup-colors'>
          {
            colors.map((color: any) => 
            <Badge className={selectedColor === color.id && 'badge_active'}
              key={color.id}
              color={color.name} 
              onClick={() => setSelectColor(color.id)}
            />)
          }
        </div>
        <button 
          className='button'
          onClick={addList}
        > 
          {isLoading ? 'Adding...' : 'Add'}
        </button>
      </div>)}
    </div>
  )
}
  
export default AddList;