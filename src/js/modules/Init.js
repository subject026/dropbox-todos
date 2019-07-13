import { renderList } from "./View";
import { bindEvents } from "./Controller";
import { getState } from "./Model";

export default async function init() {
  renderList(getState());
  bindEvents();
}
