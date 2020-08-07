import React from "react";
import Button from "../button/Button.component";

interface TextInputProps {
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  handleChange: React.FormEventHandler<HTMLInputElement>;
  currentTaskName: string;
}

export default function TextInput(props: TextInputProps) {
  const { handleSubmit, handleChange, currentTaskName } = props;
  return (
    <form onSubmit={handleSubmit} className='w-50'>
      <div className='form-group d-flex align-items-center'>
        <input
          type='text'
          name='taskName'
          id='taskName'
          className='form-control mr-3'
          placeholder='Enter task name here..'
          aria-describedby='helpId'
          value={currentTaskName}
          onChange={handleChange}
          autoComplete='off'
        />
        <div>
          <Button type='add' />
        </div>
      </div>
    </form>
  );
}
