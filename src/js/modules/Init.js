import { renderList, renderNav, renderBuildStamp } from "./View";
import { bindEvents } from "./Controller";
import { getState, getTokenLocal } from "./Model";

export default function init() {
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

  // render todo list
  renderList(getState());

  // render nav link
  renderNav(getTokenLocal());
  bindEvents();
  // render build date time if env is prod
  if (BUILD_STAMP) {
    renderBuildStamp(BUILD_STAMP);
  }
}
