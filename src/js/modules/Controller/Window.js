import { getState, loadState, hasNewerDataDB, getDataDB } from "../Model";
import { toggleLoadingOverlay, renderList } from "../View";

let interval;

export async function checkAndRefresh() {
  // check DB for more recent data
  const path_lower = await hasNewerDataDB();
  if (path_lower) {
    // DB has newer data
    toggleLoadingOverlay();
    const data = await getDataDB(path_lower);
    // load into app state and re-render list
    loadState(data);
    renderList(getState());
    toggleLoadingOverlay();
  }
}

export function startPingInterval() {
  interval = setInterval(checkAndRefresh, 1000);
}

export function handleWindowFocus() {
  // initial check
  checkAndRefresh();
  startPingInterval();
}

export function handleWindowBlur() {
  clearInterval(interval);
}
