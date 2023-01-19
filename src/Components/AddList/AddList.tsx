import React, { FC, useState, useEffect } from 'react';
import axios from 'axios';

import './AddList.scss';
import { ReactComponent as PlusSvg } from './../../assets/img/plus.svg';
import List from '../List/List';
import Badge from '../Badge/Badge';
import closeSvg from '../../assets/img/close.svg';

interface IAddList {
    onAdd: any,
    colors: any,
    mode: any,
}

const AddList: FC<IAddList> = ({
    colors, onAdd, mode
  }) => {

  
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [selectedColor, setSelectColor] = useState(3); 
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');
  
    useEffect(() => {
      if (Array.isArray(colors)) {
        setSelectColor(colors[0]._id);
      }
    }, [colors]);
  
    const onClose = () => {
      setVisiblePopup(false); // чтобы закрылось после добавления списка окно
      setInputValue(''); // обнулился ввод
      setSelectColor(colors[0]._id); // сделали чтобы 1 цвет был
    }
  
    const addList = () => {
      if (!inputValue) {
        alert('Пожалуйста, введите название папки')
        return; // обрывает функцию, тк пользователь ничего не ввел
      }
      setIsLoading(true); // говорим, что идет загрузка
      axios
        .post('http://localhost:3001/lists', {
          name: inputValue,
          colorId: selectedColor
        })
        .then(({ data }) => {
          const color = colors.filter((c:any) => c._id === selectedColor)[0]; // получаем название цвета
          const listObj = { ...data, color: { name: color.name, hex: color.hex } };
          onAdd(listObj);
          onClose();
        })
        .catch(() => alert('Ошибка при добавлении списка :с'))
        .finally(() => {
          setIsLoading(false); // после успешного запроса говорим что загрузка равна фолз, то есть, все
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
              name: 'Добавить папку',
            }
          ]}
          isRemovable={false}
        />
        {/* если визиблПопап тру - то появится окошко */}
        { visiblePopup && (
          <div className={mode === 'dark' ? 'add-listDark__popup' : 'add-list__popup'}>
            <img
              onClick={onClose}
              src={closeSvg} 
              alt='Close button' 
              className='add-list__popup-close-btn'>
            </img>
          <input
            value={inputValue}
            onChange={(e:any) => setInputValue(e.target.value)}
            className={mode === 'dark' ? 'fieldDark' : 'field'}
            type='text'
            placeholder='Название папки'
          />
          <div className='add-list__popup-colors'>
            {
              colors.map((color: any) => 
              <Badge className={selectedColor === color._id && 'badge_active'}
                key={color.id}
                color={color.name} 
                onClick={() => setSelectColor(color._id)}
              />)
            }
          </div>
          <button 
            className='button'
            onClick={addList}
          > 
            {isLoading ? 'Добавление...' : 'Добавить'}
          </button>
        </div>)}
      </div>
    )
  }
  
export default AddList;