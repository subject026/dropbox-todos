import { renderList, renderBuildStamp } from "./View";
import { bindEvents } from "./Controller";
import { getState } from "./Model";

export default function init() {
  // register SW
  if ("serviceWorker" in navigator) {
    // register our service worker
    navigator.serviceWorker
      .register("./sw.js")
      .then(registration => {
        console.log("SW registered: ", registration);
      })
      .catch(err => {
        console.error(err);
      });
  }

  renderList(getState());
  bindEvents();
  // render build date time if env is prod
  if (BUILD_STAMP) {
    renderBuildStamp(BUILD_STAMP);
  }
}
