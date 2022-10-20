import React, {FC} from 'react';
import './Badge.scss';
import classNames from 'classnames';

interface IBadge {
  color?: any,
  onClick?: any,
  className?: any
}

const Badge:FC<IBadge> = ({
  color, onClick, className
}) => {
  return(
    <i 
      onClick={onClick} 
      className={classNames('badge', {[`badge__${color}`] : color}, className)}></i>
  )
}

export default Badge;