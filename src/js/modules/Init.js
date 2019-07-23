import { renderList, renderNav, renderBuildStamp, toggleLoadingOverlay } from "./View";
import { bindEvents } from "./Controller";
import { getState, getTokenLocal, setTokenLocal, getFilesListDB, getDataDB, saveDataDB } from "./Model";
import { loadState } from "./Model/State/index";
import { startPingInterval } from "./Controller/Window";

export default async function init() {
  // register SW
  if ("serviceWorker" in navigator) {
    // register our service worker
    navigator.serviceWorker
      .register("./sw.js")
      .then(() => {
        console.log("SW registered ⚙️");
      })
      .catch(err => {
        console.error(err);
      });
  }

  // if there's a hash save token to local storage
  const urlToken = window.location.hash;
  if (urlToken) {
    const token = urlToken.split("access_token=")[1].split("&")[0];
    setTokenLocal(token);
    history.pushState("", document.title, APP_URL);
  }

  renderList(getState());

  const dbToken = getTokenLocal();
  renderNav(dbToken);

  bindEvents();

  // check DB for data
  if (dbToken) {
    const filesList = await getFilesListDB();
    if (filesList.length) {
      // has local data changed?
      if (getState().timestamp > 0) {
        // there is some local data - keeping for now
        // !!! give choice to keep/discard local data
      } else {
        // no local data - pull data from DB
        toggleLoadingOverlay();
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

        const data = await getDataDB(newestFile.path_lower);
        loadState(data);
        renderList(getState());
        toggleLoadingOverlay();
      }
    } else {
      // no existing DB data, save local data if it's been changed since init
      if (getState().timestamp > 0) saveDataDB(getState());
    }
    // start pinging API for new data
    startPingInterval();
  }

  if (NODE_ENV === "production") {
    // render build date time if env is prod
    renderBuildStamp();
  }
}
