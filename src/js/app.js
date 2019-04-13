import "../scss/index.scss";

import { getTokenLocal, setTokenLocal } from "./modules/LocalStorageController";
import { DBGetFilesList, DBGetData, DBSaveData } from "./modules/DropboxController";
import { DOM, renderAuthenticateLink, loading, render } from "./modules/UIController";
import { initState, stateLoadData, getState, getTodos, addTodo } from "./modules/TodosController";

/* Init

  - check whether app is authenticated
  - if it is 
    - check DB for json data
    - if data
      - update app state
      - render todos from app state
    - if no data
      - initialise json data in DB as empty
      - update app state 

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
      console.log("dataaaaaa: ", data);
      stateLoadData(data);
      // render todos based on app state
      loading.remove();
      render(getState());
      // bind click handler
      bindEvents();
    } else {
      // no json file - save a fresh one based on initial app state
      initState();
      DBSaveData(getState());
      // render todos based on state
      loading.remove();
      render(getState());
      bindEvents();
    }
    // 2. if json data:
    // - update state based on data
    // 3. if no json data:
    // - initialise json file in DB
    // - initialise state
    // render todos from state
  } else {
    // render authenticate link
    renderAuthenticateLink();
  }
}

function handleAddTodo(event) {
  event.preventDefault();
  console.log(event);
}

function bindEvents() {
  document.querySelector(DOM.listForm).addEventListener("submit", handleAddTodo);
}

init();
