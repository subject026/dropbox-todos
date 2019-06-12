import { Dropbox } from "dropbox";

import { getTokenLocal } from "../LocalStorageController";

let instance;

export default {
  getInstance: function() {
    if (!instance) {
      console.log("instantiating dbx...");
      instance = new Dropbox({ accessToken: getTokenLocal(), fetch });
    }
    return instance;
  }
};
