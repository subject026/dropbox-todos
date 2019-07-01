import { generateID, getTodoIndex } from "./Util";
import { getAppData, setAppData } from "../LocalStorageController";

// import * as DBController from "../DropboxController";

/**
 * `update` updates app state based on the specified `action`
 * @param {String} action - the desired action
 * @param {Object} data - data required to carry out action
 * @param {Object} state - the existing app state
 * @return {Object} newState - the new updated app state
 */

export function update(action, data, state) {
  const newState = JSON.parse(JSON.stringify(state));
  let index;
  switch (action) {
    case "HYDRATE":
      newState.timestamp = data.timestamp;
      newState.title = data.title;
      newState.todos = data.todos;
      return newState;
    case "LIST_TITLE":
      newState.timestamp = Date.now();
      newState.title = data.title;
      return newState;
    case "ADD":
      newState.timestamp = Date.now();
      newState.todos.push(data);
      return newState;
    case "TOGGLE":
      newState.timestamp = Date.now();
      index = getTodoIndex(newState.todos, data.id);
      newState.todos[index].isComplete = !newState.todos[index].isComplete;
      return newState;
    case "TODO_TITLE":
      newState.timestamp = Date.now();
      index = getTodoIndex(newState.todos, data.id);
      newState.todos[index].title = data.title;
      return newState;
    case "DELETE":
      newState.timestamp = Date.now();
      index = getTodoIndex(newState.todos, data.id);
      newState.todos = [...newState.todos.slice(0, index), ...newState.todos.slice(index + 1)];
      return newState;
    default:
      return newState;
  }
}

export const initialState = {
  timestamp: null,
  title: "New List",
  todos: []
};

/**
 * API
 */

export function addTodo(title) {
  const newTodo = {
    id: generateID(),
    title,
    isComplete: false
  };
  setAppData(update("ADD", newTodo, getAppData()));
  return newTodo;
}

export function updateTitle(title) {
  setAppData(update("LIST_TITLE", { title }, getAppData()));
}

export function editTodoText(id, title) {
  setAppData(update("TODO_TITLE", { id, title }, getAppData()));
}

export function toggleTodo(id) {
  setAppData(update("TOGGLE", { id }, getAppData()));
}

export function removeTodo(id) {
  setAppData(update("DELETE", { id }, getAppData()));
}

export function getState() {
  // initialise if there's no app data
  if (!getAppData()) {
    initialState.timestamp = Date.now();
    setAppData(initialState);
  }
  return getAppData();
}
