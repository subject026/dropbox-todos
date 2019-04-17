import "../scss/index.scss";

import { getTokenLocal, setTokenLocal } from "./modules/LocalStorageController";
import { DBGetFilesList, DBGetData, DBSaveData } from "./modules/DropboxController";
import { DOM, renderAuthenticateLink, loading, render } from "./modules/UIController";
import * as StateController from "./modules/TodosController";
import * as UIController from "./modules/UIController";

/**
 * initialise app on page load
 */
async function init() {
  loading.render();
  const urlToken = window.location.hash;
  if (urlToken) {
    const token = urlToken.split("access_token=")[1].split("&")[0];
    setTokenLocal(token);
    history.pushState("", document.title, "/");
  }
  const accessToken = getTokenLocal();
  if (accessToken) {
    // 1. Check DB for json data
    const filesList = await DBGetFilesList();
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
      const data = await DBGetData(path);
      // load into app state
      StateController.stateLoadData(data);
    } else {
      StateController.initState();
      DBSaveData(StateController.getState());
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
  DBSaveData(StateController.getState());
}

function handleListClick(event) {
  switch (event.target.dataset.type) {
    case "delete-button":
      const listEl = event.target.closest(DOM.listItem);
      // remove from state
      StateController.removeTodo(listEl.dataset.id);
      // remove from DOM
      UIController.removeTodo(listEl.dataset.id);
      // update DB data
      DBSaveData(StateController.getState());
      break;
    default:
    // do nothing
  }
}

function bindEvents() {
  document.querySelector(DOM.listForm).addEventListener("submit", handleAddTodo);
  document.querySelector(DOM.list).addEventListener("click", handleListClick);
}

init();
