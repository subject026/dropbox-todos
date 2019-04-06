import { Dropbox } from "dropbox";

export const DOM = {
  header: "#header",
  buttonAuthenticate: "#button-authenticate"
};

export function renderAuthenticateLink() {
  const dbx = new Dropbox({ clientId: "e45k6j9mvumew4x" });
  var authUrl = dbx.getAuthenticationUrl("http://localhost:1111");
  const el = `
  <a href="${authUrl}">Authenticate</a>
  `;
  document.querySelector(DOM.header).insertAdjacentHTML("beforeend", el);
}
