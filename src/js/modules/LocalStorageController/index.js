export function getTokenLocal() {
  return localStorage.getItem("dropboxTodoToken");
}

export function setTokenLocal(token) {
  localStorage.setItem("dropboxTodoToken", token);
}

export function getAppData() {
  let data;
  try {
    data = JSON.parse(localStorage.getItem("appData"));
  } catch (err) {
    console.error(err);
  }
  return data;
}

export function setAppData(data) {
  try {
    localStorage.setItem("appData", JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
}