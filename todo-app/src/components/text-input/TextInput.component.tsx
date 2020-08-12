import React, { useState, FormEvent } from "react";
import Button from "../button/Button.component";
import PropTypes from "prop-types";

interface TextInputProps {
  onSubmit: (value: string) => void;
}

const TextInput = ({ onSubmit }: TextInputProps) => {
  const [value, setValue] = useState("");
  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setValue("");
    onSubmit(value);
  };

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
          value={value}
          onChange={handleChange}
          autoComplete='off'
        />
        <div>
          <Button type='add' />
        </div>
      </div>
    </form>
  );
};

// TextInput.propTypes = { onSubmit: PropTypes.func.isRequired };

export default TextInput;
