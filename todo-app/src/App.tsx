import React, { Component, FormEvent } from "react";
import { connect, RootStateOrAny } from "react-redux";
import { addTask, removeTask, markTaskComplete } from "./redux/actions";
import TextInput from "./components/text-input/TextInput.component";
import Task from "./components/task/Task.component";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

interface Task {
  id: number;
  name: string;
  isCompleted: boolean;
}

const TextInputDisplay = connect(null, (dispatch) => ({
  onSubmit: (taskName: string) => dispatch(addTask(taskName)),
}))(TextInput);

const TaskList = ({ tasks, onTaskRemove, onTaskClick }: any) => {
  return (
    <div className='w-50 m-auto'>
      {tasks.map((task: Task) => (
        <Task
          name={task.name}
          isCompleted={task.isCompleted}
          key={task.id}
          onTaskRemove={() => onTaskRemove(task.id)}
          onTaskClick={() => onTaskClick(task.id)}
        />
      ))}
    </div>
  );
};

const TaskDisplay = connect(
  (state: RootStateOrAny) => ({
    tasks: state.tasks,
  }),
  (dispatch) => ({
    onTaskRemove: (taskID: string) => dispatch(removeTask(taskID)),
    onTaskClick: (taskId: string) => dispatch(markTaskComplete(taskId)),
  })
)(TaskList);

const App = () => (
  <div className='App'>
    <div className='container'>
      <header className='text-center'>
        {/* Heading */}
        <h1 className='mt-5 text-uppercase'> Todo App </h1>
        <h5 className='mt-3'>Please enter the task name in the input below</h5>
      </header>
      <main>
        {/* Hint */}
        <div className='hint text-center mt-5'>
          <div>
            <h3 className='badge badge-warning badge-pill'>Usage</h3>
          </div>
          <div className='border round-sm d-inline-block p-2'>
            <p className='m-0 text-muted'>
              Click the "X" button to remove a task from todo list.
            </p>
            <p className='m-0 mt-3 text-muted'>
              Click a task to mark it as complete.
            </p>
          </div>
        </div>
        {/* Task name input */}
        <div className='mt-5 d-flex justify-content-center'>
          <TextInputDisplay />
        </div>
        {/* Task list */}
        <TaskDisplay />
      </main>
    </div>
  </div>
);

export default App;
