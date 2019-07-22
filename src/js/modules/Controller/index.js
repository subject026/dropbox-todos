import { DOM } from "../View";

import { handleAddTodoSubmit } from "./ListForm";
import { handleListDoubleClick, handleBlur, handleTextInput, handleCheckboxToggle } from "./Edit";
import { handleDragStart, handleDragEnter, handleDragOver, handleDragLeave, handleDragDrop } from "./DragAndDrop";

function handleNavToggle(nav, overlay) {
  return function() {
    nav.classList.toggle(DOM.cls.navIsVisible);
    overlay.classList.toggle(DOM.cls.overlayIsHidden);
  };
}

export function bindEvents() {
  const navToggle = document.querySelector(DOM.sel.navToggle);
  const nav = document.querySelector(DOM.sel.nav);
  const overlay = document.querySelector(DOM.sel.overlay);
  navToggle.addEventListener("click", handleNavToggle(nav, overlay));

  const list = document.querySelector(DOM.list);
  const listForm = document.querySelector(DOM.listForm);
  const noteBin = document.querySelector(DOM.sel.noteBin);

  listForm.addEventListener("submit", handleAddTodoSubmit);
  list.addEventListener("change", handleCheckboxToggle);
  list.addEventListener("dblclick", handleListDoubleClick);
  list.addEventListener("input", handleTextInput);
  list.addEventListener("focusout", handleBlur);

  // Drag & Drop
  list.addEventListener("dragstart", handleDragStart);
  noteBin.addEventListener("dragenter", handleDragEnter);
  noteBin.addEventListener("dragleave", handleDragLeave);
  noteBin.addEventListener("dragover", handleDragOver);
  noteBin.addEventListener("drop", handleDragDrop);
}
