export const DOM = {
  header: "#header",
  buttonAuthenticate: "#button-authenticate"
};

export function renderAuthenticateButton() {
  const el = `
  <button type="button" id="button-authenticate">Authenticate</button>
  `;
  document.querySelector(DOM.header).insertAdjacentHTML("beforeend", el);
}
