import { renderList, renderNav, renderBuildStamp } from "./View";
import { bindEvents } from "./Controller";
import { getState, getTokenLocal, setTokenLocal } from "./Model";

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

  // if there's a hash save token to local storage
  const urlToken = window.location.hash;
  if (urlToken) {
    const token = urlToken.split("access_token=")[1].split("&")[0];
    setTokenLocal(token);
    history.pushState("", document.title, "/");
  }

  renderList(getState());

  renderNav(getTokenLocal());

  bindEvents();

  // !!! move this to bottom of nav
  // render build date time if env is prod
  if (BUILD_STAMP) {
    renderBuildStamp(BUILD_STAMP);
  }
}
