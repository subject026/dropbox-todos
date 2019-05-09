import * as StateController from "../StateController";
import * as UIController from "../UIController";

function handleAddTodo(event) {
  event.preventDefault();
  const todoText = document.addTodoForm.todoText.value;
  if (!todoText.length) return; // empty input
  const newTodo = StateController.addTodo(todoText);
  UIController.addTodo(newTodo);
  document.addTodoForm.todoText.value = "";
}

function handleListClick(event) {
  let listEl;
  switch (event.target.dataset.type) {
    case "delete-button":
      listEl = event.target.closest(UIController.DOM.listItem);
      StateController.removeTodo(listEl.dataset.id);
      UIController.removeTodo(listEl.dataset.id);
      break;
    case "checkbox":
      listEl = event.target.closest(UIController.DOM.listItem);
      StateController.toggleTodo(listEl.dataset.id);
      break;
    default:
    // do nothing
  }
}

//
//  Editing Items / Title
//
function handleListDoubleClick(event) {
  const el = event.target;
  const elType = el.dataset.type;
  if (elType === "item-details" || elType === "list-title") {
    // if details or title
    UIController.makeEditable(el);
    document.addEventListener("keydown", function(event) {
      if (event.key === "Enter" || event.key === "Escape") {
        event.preventDefault();
        el.blur();
      }
    });
  }
}

function handleBlur(event) {
  const trimmed = event.target.textContent.trim();
  event.target.textContent = trimmed;
  UIController.makeUnEditable(event.target);
}

function handleTextInput(event) {
  const el = event.target;
  switch (el.dataset.type) {
    case "list-title":
      StateController.updateTitle(event.target.textContent);
      break;
    case "item-details":
      const id = event.target.closest(UIController.DOM.listItem).dataset.id;
      const newText = el.textContent;
      StateController.editTodoText(id, newText);
      break;
    default:
    // do nothing
  }
}

//
//  Drag & Drop Handlers
//
function handleDragStart(event) {
  event.dataTransfer.setData("text", event.target.dataset.id);
}

function handleDragEnter(event) {
  event.target.classList.toggle("note-bin--hovered");
}

// need to handle dragover to allow drop
function handleDragOver(event) {
  event.preventDefault();
}

function handleDragLeave(event) {
  event.preventDefault();
  event.target.classList.toggle("note-bin--hovered");
}

function handleDrop(event) {
  event.preventDefault();
  const id = event.dataTransfer.getData("text");
  StateController.removeTodo(id);
  UIController.removeTodo(id);
  event.target.classList.toggle("note-bin--hovered");
}

export function bindEvents() {
  const list = document.querySelector(UIController.DOM.list);
  const listForm = document.querySelector(UIController.DOM.listForm);
  const noteBin = document.querySelector(UIController.DOM.noteBin);

  listForm.addEventListener("submit", handleAddTodo);
  list.addEventListener("click", handleListClick);
  list.addEventListener("dblclick", handleListDoubleClick);
  list.addEventListener("input", handleTextInput);
  list.addEventListener("focusout", handleBlur);

  // Drag & Drop
  list.addEventListener("dragstart", handleDragStart);
  noteBin.addEventListener("dragenter", handleDragEnter);
  noteBin.addEventListener("dragleave", handleDragLeave);
  noteBin.addEventListener("dragover", handleDragOver);
  noteBin.addEventListener("drop", handleDrop);
}
