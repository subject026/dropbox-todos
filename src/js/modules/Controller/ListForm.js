import * as View from "../View";
import * as State from "../Model";

export function handleAddTodoSubmit(event) {
  event.preventDefault();
  const todoText = document.addTodoForm.todoText.value;
  if (!todoText.length) return;
  const newTodo = State.addTodo(todoText);
  View.addTodo(newTodo);
  document.addTodoForm.todoText.value = "";
  document.addTodoForm.todoText.focus();
}
