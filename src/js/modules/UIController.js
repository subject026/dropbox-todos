import { Dropbox } from "dropbox";

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
  const dbx = new Dropbox({ clientId: "e45k6j9mvumew4x" });
  var authUrl = dbx.getAuthenticationUrl("http://localhost:1111");
  const el = `
  <a href="${authUrl}">Authenticate</a>
  `;
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

function listMarkup(state) {
  return `
    <section class="list">
      <h3 class="list__title" contenteditable=true>${state.title}</h3>
      <ul class="list__todos">
        ${todosMarkup(state)}
      </ul>
      <form name="addTodoForm" class="list__form">
        <input name="todoText" type="text" />
        <button type="submit">Add todo</button>
      </form>
    </section>`;
}

function todoMarkup(todo) {
  return `
  <li class="list__item" data-id="${todo.id}" draggable="true">
    <input type="checkbox" data-type="checkbox"${todo.isComplete ? "checked" : ""}>
    <div class="list__item__details" contenteditable="true">${todo.todo}</div>
  </li>`;
}

function todosMarkup(state) {
  let markup = "";
  state.todos.forEach(todo => {
    markup += todoMarkup(todo);
  });
  return markup;
}

export function render(state) {
  mainEl.innerHTML = listMarkup(state);
  listEl = document.querySelector(DOM.todos);
}

export function addTodo(todo) {
  listEl.insertAdjacentHTML("beforeend", todoMarkup(todo));
}

export function removeTodo(id) {
  const listEl = document.querySelector(`[data-id="${id}"]`);
  listEl.parentElement.removeChild(listEl);
}
