import "../scss/index.scss";

import { getTokenLocal } from "./modules/LocalStorageController";
import { authenticate } from "./modules/DropboxController";
import { DOM, renderAuthenticateButton } from "./modules/UIController";

const state = {};

/* Init

  - check whether app is authenticated
  - if it is 
    - check DB for json data
    - if data
      - update app state
      - render todos from app state
    - if no data
      - initialise json data in DB as empty
      - update app state 

*/

function init() {
  const accessToken = getTokenLocal();
  if (accessToken) {
    // Get data from DB
    // update state
    // render todos from state
  } else {
    // render authenticate button
    renderAuthenticateButton();
    // bind to auth method
    document.querySelector(DOM.buttonAuthenticate).addEventListener("click", authenticate);
  }
}

init();
