import React from "react";
import Button from "../button/Button.component";

interface TaskProps {
  name: string;
  removeTask: React.MouseEventHandler<HTMLElement>;
  markTaskComplete: React.MouseEventHandler<HTMLElement>;
  isCompleted: boolean;
}

export default function Task(props: TaskProps) {
  const { name, removeTask, markTaskComplete, isCompleted } = props;
  return (
    <div
      className={`alert d-flex justify-content-between align-items-center p-2 mt-3 user-select-none ${
        isCompleted ? "alert-success" : "alert-primary"
      } `}
      role='alert'
      onClick={markTaskComplete}
    >
      {name} {isCompleted && "(Completed \u2713)"}
      <div className='remove-task'>
        <Button type='remove' handleClick={removeTask} />
      </div>
    </div>
  );
}
