import * as StateController from "../StateController";
import * as UIController from "../UIController";

function handleAddTodo(event) {
  event.preventDefault();
  console.log("form submit firing");
  const todoText = document.addTodoForm.todoText.value;
  if (!todoText.length) return; // empty input
  const newTodo = StateController.addTodo(todoText);
  UIController.addTodo(newTodo);
  document.addTodoForm.todoText.value = "";
}

function handleCheckboxToggle(event) {
  const listEl = event.target.closest(UIController.DOM.listItem);
  // will also fire when todo is added - no listEl in this case
  if (listEl) {
    StateController.toggleTodo(listEl.dataset.id);
    listEl.querySelector(".checkbox").classList.toggle("checkbox--checked");
  }
}

//
//  Editing Items / Title
//
function handleListDoubleClick(event) {
  const el = event.target;
  const elType = el.dataset.type;
  if (elType === "list-title" || elType === "todo-text") {
    // if details or title
    UIController.makeEditable(el);
    document.addEventListener("keydown", function handleKeydown(event) {
      if (event.key === "Enter" || event.key === "Escape") {
        event.preventDefault();
        document.removeEventListener("keydown", handleKeydown);
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
  // will either be editing list title or todo text
  switch (el.dataset.type) {
    case "list-title":
      StateController.updateTitle(event.target.textContent);
      break;
    case "todo-text":
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

// need to prevent default dragover behaviour to allow drop
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
  list.addEventListener("change", handleCheckboxToggle);
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
