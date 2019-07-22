import { renderList, renderNav, renderBuildStamp } from "./View";
import { bindEvents } from "./Controller";
import { getState, getTokenLocal, setTokenLocal, getFilesListDB, getDataDB } from "./Model";
import { loadState } from "./Model/State/index";

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
    history.pushState("", document.title, "/");
  }

  renderList(getState());

  const dbToken = getTokenLocal();
  renderNav(dbToken);

  bindEvents();

  // check DB for data
  if (dbToken) {
    /*
      - no data in DB yet                 -> save local data and carry on with automatic backups
    
      - there is already app data in DB 

        - has local data been changed from initial state?

          - data still initial state      -> pull in DB data and populate local state/render list

          - local data has changed from initial state:

            - use local & lose DB data?
            - use DB data & lose local?

    */
    const filesList = await getFilesListDB();
    if (filesList.length) {
      // has local data changed?
      if (getState().timestamp > 0) {
        // offer choice between keeping and using local/DB data
      } else {
        // use DB data
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
        // load into app state and re-render list
        loadState(data);
        renderList(getState());
      }
    } else {
      // save local data to DB
    }
    //   // there is a list of files - get the path_lower val of most recent one
  }

  if (NODE_ENV === "production") {
    // render build date time if env is prod
    renderBuildStamp();
  }
}
