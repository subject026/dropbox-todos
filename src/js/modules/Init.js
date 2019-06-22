import * as LocalStorageController from "./LocalStorageController";
import * as UIController from "./UIController";
import * as DBController from "./DropboxController";
import * as EventsController from "./EventsController";
import * as StateController from "./StateController";

export default async function init() {
  UIController.loading.render();
  const urlToken = window.location.hash; // if there's a hash a verification link has been followed
  if (urlToken) {
    const token = urlToken.split("access_token=")[1].split("&")[0];
    LocalStorageController.setTokenLocal(token);
    history.pushState("", document.title, "/");
  }
  const accessToken = LocalStorageController.getTokenLocal();
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
      StateController.init(data);
    } else {
      StateController.init();
    }
    UIController.loading.remove();
    UIController.renderList(StateController.getState());
    console.log(StateController.getState());
    EventsController.bindEvents();
  } else {
    UIController.loading.remove();
    UIController.renderAuthenticateLink();
  }
}
