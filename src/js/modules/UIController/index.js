import * as DropboxController from "../DropboxController";
import * as Markup from "./Markup";

export const DOM = {
  header: ".header",
  buttonAuthenticate: "#button-authenticate",
  noteBin: ".note-bin",
  main: ".main",
  loadingTodos: ".loading-todos",
  list: ".list",
  listTitle: ".list__title",
  todos: ".list__todos",
  listItem: ".list__item",
  listForm: ".list__form"
};

const mainEl = document.querySelector(DOM.main);
let listEl;

export function renderAuthenticateLink() {
  const url = DropboxController.getAuthenticationLink();
  const el = Markup.authLink(url);
  document.querySelector(DOM.header).insertAdjacentHTML("beforeend", el);
}

export const loading = {
  html: `<span class="loading-todos">Loading todos...</span>`,
  render() {
    document.querySelector(DOM.main).innerHTML = this.html;
  },
  remove() {
    const loadingEl = document.querySelector(DOM.loadingTodos);
    document.querySelector(DOM.loadingTodos).parentNode.removeChild(loadingEl);
  }
};

export function renderList(state) {
  mainEl.innerHTML = Markup.list(state);
  listEl = document.querySelector(DOM.todos);
}

export function addTodo(todo) {
  listEl.insertAdjacentHTML("beforeend", Markup.todo(todo));
}

export function removeTodo(id) {
  const listEl = document.querySelector(`[data-id="${id}"]`);
  listEl.parentElement.removeChild(listEl);
}

//
// edit mode
//

export function makeEditable(node) {
  node.contentEditable = true;
  node.classList.toggle("list__item__details--edit");
  node.focus();
  /* From MDN:

  When an HTML document has been switched to designMode, its document object exposes an execCommand method to run commands that manipulate the current editable region, such as form inputs or contentEditable elements.
  */
  // select all element text:
  document.execCommand("selectAll", false, null);
}

export function makeUnEditable(node) {
  node.contentEditable = false;
  node.classList.toggle("list__item__details--edit");
}
