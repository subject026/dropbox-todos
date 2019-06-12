export function getTokenLocal() {
  return localStorage.getItem("dropboxTodoToken");
}

export function setTokenLocal(token) {
  localStorage.setItem("dropboxTodoToken", token);
}
