function todos(state) {
  let markup = "";
  state.todos.forEach(item => {
    markup += todo(item);
  });
  return markup;
}

export function authLink(url) {
  return `
  <a href="${url}">Connect to Dropbox</a>
  `;
}

export function list(state) {
  return `
    <section class="list">
      <h3 class="list__title" data-type="list-title">${state.title}</h3>
      <ul class="list__todos">
        ${todos(state)}
      </ul>
      <form name="addTodoForm" class="list__form">
        <input name="todoText" type="text" />
        <button type="submit">Add todo</button>
      </form>
    </section>`;
}

export function todo({ id, title, isComplete }) {
  return `
  <li class="list__item" data-id="${id}" draggable="true">
    <input type="checkbox" data-type="checkbox"${isComplete ? "checked" : ""}>
    <div class="list__item__details" data-type="todo-text">${title}</div>
  </li>`;
}
