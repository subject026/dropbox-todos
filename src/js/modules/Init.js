import * as LocalStorageController from "./LocalStorageController";
import * as UIController from "./UIController";
import * as DBController from "./DropboxController";
import * as EventsController from "./EventsController";
import * as StateController from "./StateController";

export default async function init() {
  UIController.renderList(StateController.getState());
  EventsController.bindEvents();
}
