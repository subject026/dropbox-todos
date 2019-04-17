import { generateId } from "./util";
import * as DBController from "./DropboxController";

const state = {};

class Todo {
  constructor(todo, isComplete = false) {
    this.todo = todo;
    this.isComplete = isComplete;
    this.id = generateId();
  }
}

export function initState() {
  state.title = "New todo list";
  state.todos = [];
  DBController.saveData(state);
}

export function stateLoadData(data) {
  state.title = data.title;
  state.todos = [...data.todos];
}

export function addTodo(todo, isComplete) {
  const newTodo = new Todo(todo, isComplete);
  state.todos.push(newTodo);
  DBController.saveData(state);
  return newTodo;
}

export function removeTodo(id) {
  // find index of todo
  const index = state.todos.findIndex(todo => todo.id === id);
  state.todos = [...state.todos.slice(0, index), ...state.todos.slice(index + 1)];
  DBController.saveData(state);
}

export function toggleTodo(id) {
  const index = state.todos.findIndex(todo => todo.id === id);
  state.todos[index].isComplete = !state.todos[index].isComplete;
  DBController.saveData(state);
}

export function getState() {
  return { ...state };
}
