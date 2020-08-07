import React, { MouseEventHandler } from "react";
import addIcon from "../../assets/add-svgrepo-com.svg";
import removeIcon from "../../assets/cross-svgrepo-com.svg";

interface ButtonProps {
  type: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button(props: ButtonProps) {
  const { type, handleClick } = props;

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
