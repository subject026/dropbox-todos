import DOM from "./DOM";
import * as Markup from "./Markup";

const mainEl = document.querySelector(DOM.sel.main);
let listEl; // value set once list rendered

export function renderBuildStamp(stamp) {
  const footerEl = document.querySelector(DOM.footer);
  footerEl.innerHTML = `<div>Built ${new Date(stamp).toLocaleString()}</div>`;
}

export function renderAuthenticateLink() {
  const url = DropboxController.getAuthenticationLink();
  const el = Markup.authLink(url);
  document.querySelector(DOM.main).insertAdjacentHTML("beforeend", el);
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

/**
 *  List
 */

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

/**
 * Editmode
 */

export function editNodeOn(node) {
  node.contentEditable = true;
  node.classList.toggle("list__item__details--edit");
  node.focus();
  /* From MDN:

  When an HTML document has been switched to designMode, its document object exposes an execCommand method to run commands that manipulate the current editable region, such as form inputs or contentEditable elements.
  */
  // select all element text:
  document.execCommand("selectAll", false, null);
}

export function editNodeOff(node) {
  node.contentEditable = false;
  node.classList.toggle("list__item__details--edit");
}
