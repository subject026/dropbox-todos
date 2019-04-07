import { Dropbox } from "dropbox";

export const DOM = {
  header: ".header",
  buttonAuthenticate: "#button-authenticate",
  main: ".main",
  loadingTodos: ".loading-todos"
};

export function renderAuthenticateLink() {
  const dbx = new Dropbox({ clientId: "e45k6j9mvumew4x" });
  var authUrl = dbx.getAuthenticationUrl("http://localhost:1111");
  const el = `
  <a href="${authUrl}">Authenticate</a>
  `;
  document.querySelector(DOM.header).insertAdjacentHTML("beforeend", el);
}

export const loading = {
  html: `<span class="${DOM.loadingTodos}">Loading todos...</span>`,
  render() {
    document.querySelector(DOM.main).innerHTML = this.html;
  },
  remove() {
    const loadingEl = document.querySelector(DOM.loadingTodos);
    document.querySelector(DOM.loadingTodos).parentNode.removeChild(loadingEl);
  }
};
