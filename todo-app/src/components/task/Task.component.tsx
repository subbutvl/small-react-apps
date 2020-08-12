import React from "react";
import Button from "../button/Button.component";

interface TaskProps {
  name: string;
  onTaskRemove: () => void;
  onTaskClick: React.MouseEventHandler<HTMLElement>;
  isCompleted: boolean;
}

const Task = ({ name, onTaskRemove, onTaskClick, isCompleted }: TaskProps) => {
  return (
    <div
      className={`alert d-flex justify-content-between align-items-center p-2 mt-3 user-select-none ${
        isCompleted ? "alert-success" : "alert-primary"
      } `}
      role='alert'
      onClick={onTaskClick}
    >
      {name} {isCompleted && "(Completed \u2713)"}
      <div className='remove-task'>
        <Button type='remove' onClick={onTaskRemove} />
      </div>
    </div>
  );
};

export default Task;
