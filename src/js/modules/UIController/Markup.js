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
      <section class="list__header">
        <h3 class="list__title" data-type="list-title">${state.title}</h3>
      </section>
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
    <section class="checkbox-container">
      <input type="checkbox" id="checkbox-${id}" data-type="checkbox"${isComplete ? "checked" : ""}>
      <label for="checkbox-${id}" class="list__label">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="11" cy="11" r="11" fill="#EDEDED"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 11C0 17.0751 4.92487 22 11 22C17.0751 22 22 17.0751 22 11C22 4.92487 17.0751 0 11 0C4.92487 0 0 4.92487 0 11ZM20 11C20 15.9706 15.9706 20 11 20C6.02944 20 2 15.9706 2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11Z" fill="#707070"/>
      </svg>

      <svg class="checkbox checkbox${
        isComplete ? "--checked" : ""
      }"width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="11" cy="11" r="11" fill="#D5FFD1"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11C22 17.0751 17.0751 22 11 22ZM11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20ZM14.2929 7.29289L9 12.5858L6.70711 10.2929L5.29289 11.7071L9 15.4142L15.7071 8.70711L14.2929 7.29289Z" fill="#707070"/>
      </svg>      
      </label>
      </section>
    <div class="list__item__details" data-type="todo-text">${title}</div>
  </li>`;
}
