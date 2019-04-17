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
  const newTodo = new Todo(todo, isComplete);
  state.todos.push(newTodo);
  return newTodo;
}

export function removeTodo(id) {
  // find index of todo
  const index = state.todos.findIndex(todo => todo.id === id);
  state.todos = [...state.todos.slice(0, index), ...state.todos.slice(index + 1)];
}

export function toggleTodo(id) {
  const index = state.todos.findIndex(todo => todo.id === id);
  state.todos[index].isComplete = !state.todos[index].isComplete;
}

export function getTodos() {
  return [...state.todos];
}

export function getState() {
  return { ...state };
}
