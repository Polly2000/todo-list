import React, { FC } from 'react';
import classNames from 'classnames';

import './List.scss';
import removeSvg from '../../assets/img/remove.svg';
import Badge from '../Badge/Badge';
import axios from 'axios';

interface IList {
    items: any,
    isRemovable: boolean,
    onClick?: any,
    onRemove?: any,
    onClickItem?: any,
    activeItem?: any,
    mode?: any,
}

const List: FC<IList> = 
({
    items,
    isRemovable,
    onClick,
    onRemove,
    onClickItem,
    activeItem,
    mode,
}) => {

    const removeList = (item: any) => {
        if (window.confirm('Вы действительно хотите удалить список?')) {
          axios
            .delete('http://localhost:3001/lists/' + item.id)
            .then(() => {
              onRemove(item.id); // удаление списка из бекенда, но не из стейта
            })
        }
      }
    
      return(
        <div>
          <ul className='list' onClick={onClick}>
            {items.map( (item:any, index:any) => 
                <li 
                  key={index} 
                  className={mode === 'dark' ? 'activeDark' : classNames(item.className, { 
                    active: item.active ? item.active : activeItem && activeItem.id === item.id})}
                  onClick={onClickItem ? () => onClickItem(item) : onClickItem}
                >
                  <i>
                    { item.icon ? item.icon : (
                      <Badge color={item.color.name} />
                    )}
                  </i>
                  {/* <span> {item.name} {item.tasks && `(${item.tasks.length})`} </span> */} 
                  <span> {item.name} </span>
                  {isRemovable && (
                    <img 
                      className='list__remove-icon' 
                      src={removeSvg} 
                      alt='Remove icon'
                      onClick={() => removeList(item)}
                    />
                  )}
                </li>
            )}
          </ul>
        </div>
      )
    }
    export default List;