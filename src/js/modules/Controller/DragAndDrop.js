import { DOM } from "../View";
import * as View from "../View";
import * as State from "../Model";

export function handleDragStart(event) {
  event.dataTransfer.setData("text", event.target.dataset.id);
}

export function handleDragEnter(event) {
  // event.target may be svg > path so make sure we've got the actual svg
  const binEl = event.target.closest(DOM.sel.noteBin);
  binEl.classList.toggle(DOM.cls.iconNoteBinHovered);
}

// need to prevent default dragover behaviour to allow drop
export function handleDragOver(event) {
  event.preventDefault();
}

export function handleDragLeave(event) {
  event.preventDefault();
  const binEl = event.target.closest(DOM.sel.noteBin);
  binEl.classList.toggle(DOM.cls.iconNoteBinHovered);
}

export function handleDragDrop(event) {
  event.preventDefault();
  const id = event.dataTransfer.getData("text");
  State.removeTodo(id);
  View.removeTodo(id);
  const binEl = event.target.closest(DOM.sel.noteBin);
  binEl.classList.toggle(DOM.cls.iconNoteBinHovered);
}
