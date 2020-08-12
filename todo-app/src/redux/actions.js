import { ADD_TASK, REMOVE_TASK, MARK_TASK_COMPLETE } from "./types";

export const addTask = (taskName) => ({
  type: ADD_TASK,
  payload: {
    taskName,
  },
});

export const removeTask = (taskID) => ({
  type: REMOVE_TASK,
  payload: {
    taskID,
  },
});

export const markTaskComplete = (taskID) => ({
  type: MARK_TASK_COMPLETE,
  payload: { taskID },
});
