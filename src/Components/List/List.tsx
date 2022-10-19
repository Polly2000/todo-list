import React, { FC } from 'react';

import './List.scss';
import removeSvg from '../../assets/img/remove.svg';

interface IList {
    items: any,
    isRemovable: boolean,
    onClick?: any,
    onRemove?: any,
    onClickItem?: any,
    activeItem?: any
}

const List: FC<IList> = 
({
    items,
    isRemovable,
    onClick,
    onRemove,
    onClickItem,
    activeItem
}) => {

    return(
        <div>
            <ul className='list active'>
                {items.map( (item: any, index: any) =>
                    <li
                        key={index}
                    >
                        {/* тут будет бадж */}
                        <i></i>
                        <span>Все задачи</span>
                        <img
                            className='list__remove-icon'
                            src={removeSvg}
                            alt='Remove icon'
                        />
                    </li>
                )}
            </ul>
        </div>
    )
}

export default List;