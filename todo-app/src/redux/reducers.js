import { combineReducers } from "redux";
import { ADD_TASK, REMOVE_TASK, MARK_TASK_COMPLETE } from "./types";

const tasksReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TASK: {
      const { taskName } = action.payload;
      const isInvalidTask =
        !taskName.length || state.find((task) => task.name === taskName);

      if (isInvalidTask) return state;
      const newTask = {
        id: Math.trunc(Math.random() * 1000000),
        name: taskName,
        isCompleted: false,
      };

      return [...state, newTask];
    }
    case REMOVE_TASK: {
      const { taskID } = action.payload;

      return state.filter((task) => task.id !== taskID);
    }
    case MARK_TASK_COMPLETE: {
      const { taskID } = action.payload;
      const taskIndex = state.findIndex((task) => task.id === taskID);
      const oldSelectedTask = state[taskIndex];
      const newSelectedTask = {
        ...oldSelectedTask,
        isCompleted: !oldSelectedTask.isCompleted,
      };

      return [
        ...state.slice(0, taskIndex),
        newSelectedTask,
        ...state.slice(taskIndex + 1),
      ];
    }

    default:
      return state;
  }
};

export default combineReducers({
  tasks: tasksReducer,
});
