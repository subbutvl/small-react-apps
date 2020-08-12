import React, { MouseEventHandler, ReactEventHandler } from "react";
import addIcon from "../../assets/add-svgrepo-com.svg";
import removeIcon from "../../assets/cross-svgrepo-com.svg";

interface ButtonProps {
  type: string;
  onClick?: () => void;
}

export default function Button({ type, onClick }: ButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick && onClick();
  };
  return type === "add" ? (
    <button className='button rounded-circle p-0' type='submit'>
      <img className='button__icon' src={addIcon} alt='Add task' />
    </button>
  ) : type === "remove" ? (
    <button className='button rounded-circle p-0' onClick={handleClick}>
      <img className='button__icon' src={removeIcon} alt='Remove task' />
    </button>
  ) : null;
}
