import generateID from "./generateID";

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
  switch (action) {
    case "HYDRATE":
      const { title, todos } = data;
      newState.title = title;
      newState.todos = todos;
      return newState;
    case "ADD":
      newState.todos.push(data);
      return newState;
    case "TOGGLE":
      const { id } = data;
      const index = newState.todos.findIndex(todo => todo.id === id);
      newState.todos[index].isComplete = !newState.todos[index].isComplete;
      return newState;
    default:
      return newState;
  }
}

let state = {};

export const initialState = {
  title: "New todo List",
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

export function updateTitle(data) {
  state.title = data;
  DBController.saveData(state);
}

export function editTodoText(id, newText) {
  const index = state.todos.findIndex(todo => todo.id === id);
  state.todos[index].todo = newText.trim();
  DBController.saveData(state);
}

export function toggleTodo(id) {
  const index = state.todos.findIndex(todo => todo.id === id);
  state.todos[index].isComplete = !state.todos[index].isComplete;
  DBController.saveData(state);
}

export function removeTodo(id) {
  const index = state.todos.findIndex(todo => todo.id === id);
  state.todos = [...state.todos.slice(0, index), ...state.todos.slice(index + 1)];
  DBController.saveData(state);
}

export function getState() {
  return { ...state };
}
