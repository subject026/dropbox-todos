class Todo {
  constructor(todo, isComplete = false) {
    this.todo = todo;
    this.isComplete = isComplete;
  }
}

/**
 * App state
 */

const state = {};

export function initState() {
  state.lastUpdated = Date.now();
  state.todos = [];
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
