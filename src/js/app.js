import "../scss/index.scss";

import { getTokenLocal, setTokenLocal } from "./modules/LocalStorageController";
import { DOM, renderAuthenticateLink, loading, render } from "./modules/UIController";
import * as DBController from "./modules/DropboxController";
import * as StateController from "./modules/TodosController";
import * as UIController from "./modules/UIController";

/**
 * initialise app on page load
 */
async function init() {
  loading.render();
  const urlToken = window.location.hash; // if there's a hash a verification link has been followed
  if (urlToken) {
    const token = urlToken.split("access_token=")[1].split("&")[0];
    setTokenLocal(token);
    history.pushState("", document.title, "/");
  }
  const accessToken = getTokenLocal();
  if (accessToken) {
    // 1. Check DB for json data
    const filesList = await DBController.getFilesList();
    if (filesList.length) {
      // there is a list of files - get the most recent one
      const sortedTimestamps = filesList
        .map((entry, i) => [entry.name.split("_")[0], i])
        .sort((a, b) => {
          if (a[0] > b[0]) return -1;
          return 0;
        });
      // first item now has index of newest data file in list
      const index = sortedTimestamps[0][1];
      const path = filesList[index].path_lower;
      // get the data
      const data = await DBController.getData(path);
      // load into app state
      StateController.stateLoadData(data);
    } else {
      StateController.initState();
    }
    loading.remove();
    render(StateController.getState());
    bindEvents();
  } else {
    // render authenticate link
    renderAuthenticateLink();
  }
}

function handleAddTodo(event) {
  event.preventDefault();
  const todoText = document.addTodoForm.todoText.value;
  if (!todoText.length) return; // empty input
  const newTodo = StateController.addTodo(todoText);
  UIController.addTodo(newTodo);
  document.addTodoForm.todoText.value = "";
}

function handleListClick(event) {
  let listEl;
  switch (event.target.dataset.type) {
    case "delete-button":
      listEl = event.target.closest(DOM.listItem);
      StateController.removeTodo(listEl.dataset.id);
      UIController.removeTodo(listEl.dataset.id);
      break;
    case "checkbox":
      listEl = event.target.closest(DOM.listItem);
      StateController.toggleTodo(listEl.dataset.id);
      break;
    default:
    // do nothing
  }
}

function handleListFocus(event) {
  // !!! Stop return from moving to new line
  document.addEventListener("keyup", event => {
    StateController.updateTitle(event.target.textContent);
  });
}

function bindEvents() {
  const list = document.querySelector(DOM.list);
  const listForm = document.querySelector(DOM.listForm);

  listForm.addEventListener("submit", handleAddTodo);
  list.addEventListener("click", handleListClick);
  list.addEventListener("focusin", handleListFocus);
}

init();
