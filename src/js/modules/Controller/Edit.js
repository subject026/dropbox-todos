import { DOM } from "../View";
import * as View from "../View";
import * as State from "../Model";

export function handleListDoubleClick(event) {
  const el = event.target;
  const elType = el.dataset.type;
  if (elType === "list-title" || elType === "todo-text") {
    // if details or title
    View.editNodeOn(el);
    document.addEventListener("keydown", function handleKeydown(event) {
      if (event.key === "Enter" || event.key === "Escape") {
        event.preventDefault();
        document.removeEventListener("keydown", handleKeydown);
        el.blur();
      }
    });
  }
}

// Editing either todo or list title
export function handleTextInput(event) {
  const el = event.target;
  // will either be editing list title or todo text
  switch (el.dataset.type) {
    case "list-title":
      State.updateTitle(event.target.textContent);
      break;
    case "todo-text":
      const id = event.target.closest(DOM.listItem).dataset.id;
      const newText = el.textContent;
      State.editTodoText(id, newText);
      break;
    default:
    // do nothing
  }
}

export function handleBlur(event) {
  const trimmed = event.target.textContent.trim();
  event.target.textContent = trimmed;
  View.editNodeOff(event.target);
}

export function handleCheckboxToggle(event) {
  const listEl = event.target.closest(DOM.listItem);
  // will also fire when todo is added - no listEl in this case
  if (listEl) {
    State.toggleTodo(listEl.dataset.id);
    listEl.classList.toggle("list__item--checked");
  }
}
