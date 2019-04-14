import { generateId } from "./util";

const state = {};

class Todo {
  constructor(todo, isComplete = false) {
    this.todo = todo;
    this.isComplete = isComplete;
    this.id = generateId();
  }
}

export function initState() {
  state.lastUpdated = Date.now();
  state.title = "New todo list";
  state.todos = [];
}

export function stateLoadData(data) {
  state.title = data.title;
  state.lastUpdated = data.lastUpdated;
  state.todos = [...data.todos];
}

export function addTodo(todo, isComplete) {
  state.todos.push(new Todo(todo, isComplete));
}

export function getTodos() {
  return [...state.todos];
}

export function getState() {
  return { ...state };
}
