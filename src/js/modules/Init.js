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
      // there is a list of files - get the path_lower val of most recent one
      const newestFile = filesList.reduce(
        (acc, item) => {
          const timestamp = parseInt(item.name.split("_")[0]);
          if (timestamp > acc.timestamp) {
            acc.timestamp = timestamp.toString();
            acc.path_lower = item.path_lower;
          }
          return acc;
        },
        { timestamp: 0, path_lower: "" }
      );
      const { path_lower } = newestFile;
      // get the data
      const data = await DBController.getData(path_lower);
      // load into app state
      StateController.init(data);
    } else {
      StateController.init();
    }
    UIController.loading.remove();
    UIController.renderList(StateController.getState());
    EventsController.bindEvents();
  } else {
    UIController.loading.remove();
    UIController.renderAuthenticateLink();
  }
}
