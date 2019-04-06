import "../scss/index.scss";

import { getTokenLocal, setTokenLocal } from "./modules/LocalStorageController";
import { authenticate } from "./modules/DropboxController";
import { DOM, renderAuthenticateLink } from "./modules/UIController";

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
  const urlToken = window.location.hash;
  if (urlToken) {
    const token = urlToken.split("access_token=")[1].split("&")[0];
    setTokenLocal(token);
    history.pushState("", document.title, "/");
  }
  const accessToken = getTokenLocal();
  if (accessToken) {
    // 1. Check DB for json data
    // 2. if json data:
    // - update state based on data
    // 3. if no json data:
    // - initialise json file in DB
    // - initialise state
    // render todos from state
  } else {
    // render authenticate link
    renderAuthenticateLink();
  }
}

init();
