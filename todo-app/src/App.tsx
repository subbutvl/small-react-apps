import React, { Component, FormEvent } from "react";
import TextInput from "./components/text-input/TextInput.component";
import Task from "./components/task/Task.component";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

interface Task {
  id: number;
  name: string;
  isCompleted: boolean;
}

interface AppState {
  tasks: Array<Task>;
  currentTaskName: string;
}
class App extends Component<any, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      tasks: [],
      currentTaskName: "",
    };
  }

  addTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const { currentTaskName, tasks } = this.state;

    const isInvalidTask =
      !currentTaskName.length ||
      tasks.find((task) => task.name === currentTaskName);

    if (isInvalidTask) return;

    this.setState(() => {
      const newTask: Task = {
        id: Math.trunc(Math.random() * 1000000),
        name: currentTaskName,
        isCompleted: false,
      };

      return {
        tasks: [...tasks, newTask],
        currentTaskName: "",
      };
    });
  };

  removeTask = (taskID: number) => (event: any) => {
    event.stopPropagation();

    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => task.id !== taskID),
    }));
  };

  markTaskComplete = (taskID: number) => {
    const selectedTask = this.state.tasks.find((task) => task.id === taskID);

    if (selectedTask) {
      selectedTask.isCompleted = !selectedTask.isCompleted;
    }

    this.setState({
      tasks: this.state.tasks,
    });
  };

  updateTaskName = (event: FormEvent<HTMLInputElement>) => {
    const currentTaskName = event.currentTarget.value;

    this.setState({
      currentTaskName,
    });
  };

  render() {
    const { tasks, currentTaskName } = this.state;

    return (
      <div className='App'>
        <div className='container'>
          <header className='text-center'>
            {/* Heading */}
            <h1 className='mt-5 text-uppercase'> Todo App </h1>
            <h5 className='mt-3'>
              Please enter the task name in the input below
            </h5>
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
              <TextInput
                handleSubmit={this.addTask}
                handleChange={this.updateTaskName}
                currentTaskName={currentTaskName}
              />
            </div>
            {/* Task list */}
            <div className='w-50 m-auto'>
              {tasks.map((task) => (
                <Task
                  name={task.name}
                  isCompleted={task.isCompleted}
                  key={task.id}
                  removeTask={this.removeTask(task.id)}
                  markTaskComplete={this.markTaskComplete.bind(this, task.id)}
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default App;
