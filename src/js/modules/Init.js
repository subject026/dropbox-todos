import { renderList, renderBuildStamp } from "./View";
import { bindEvents } from "./Controller";
import { getState } from "./Model";

export default function init() {
  renderList(getState());
  bindEvents();
  // render build date time if env is prod
  if (BUILD_STAMP) {
    renderBuildStamp(BUILD_STAMP);
  }
}
