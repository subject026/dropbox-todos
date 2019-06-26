import { generateID, getTodoIndex } from "./Util";

import * as DBController from "../DropboxController";

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
      newState.title = data.title;
      newState.todos = data.todos;
      return newState;
    case "LIST_TITLE":
      newState.title = data.title;
      return newState;
    case "ADD":
      newState.todos.push(data);
      return newState;
    case "TOGGLE":
      index = getTodoIndex(newState.todos, data.id);
      newState.todos[index].isComplete = !newState.todos[index].isComplete;
      return newState;
    case "TODO_TITLE":
      index = getTodoIndex(newState.todos, data.id);
      newState.todos[index].title = data.title;
      return newState;
    case "DELETE":
      index = getTodoIndex(newState.todos, data.id);
      newState.todos = [...newState.todos.slice(0, index), ...newState.todos.slice(index + 1)];
      return newState;
    default:
      return newState;
  }
}

let state = {};

export const initialState = {
  title: "New List",
  todos: []
};

/**
 * API
 */

export function init(data) {
  if (data) {
    state = update("HYDRATE", data, state);
  } else {
    state = initialState;
    DBController.saveData(state);
  }
}

export function addTodo(title) {
  const newTodo = {
    id: generateID(),
    title,
    isComplete: false
  };
  state = update("ADD", newTodo, state);
  DBController.saveData(state);
  return newTodo;
}

export function updateTitle(title) {
  state = update("LIST_TITLE", { title }, state);
  DBController.saveData(state);
}

export function editTodoText(id, title) {
  state = update("TODO_TITLE", { id, title }, state);
  DBController.saveData(state);
}

export function toggleTodo(id) {
  state = update("TOGGLE", { id }, state);
  DBController.saveData(state);
}

export function removeTodo(id) {
  state = update("DELETE", { id }, state);
  DBController.saveData(state);
}

export function getState() {
  return JSON.parse(JSON.stringify(state));
}
