import { Dropbox } from "dropbox";

import DBX from "./DBX";
import { getState } from "../State";

let saveTimeout;

export function getAuthenticationLink() {
  const dbx = new Dropbox({ clientId: "e45k6j9mvumew4x" });
  const authUrl = dbx.getAuthenticationUrl(APP_URL);
  return authUrl;
}

/**
 * Returns array of remote app folder file details
 */
export async function getFilesListDB() {
  const dbx = DBX.getInstance();
  let res;
  try {
    res = await dbx.filesListFolder({ path: "" });
    return res.entries;
  } catch (err) {
    console.error(err);
  }
}

export async function hasNewerDataDB() {
  const filesList = await getFilesListDB();
  const newestFile = filesList.reduce(
    (acc, item) => {
      const timestamp = parseInt(item.name.split("_")[0]);
      if (timestamp > acc.timestamp) {
        acc.timestamp = timestamp.toString();
        acc.path_lower = item.path_lower;
      }
      return acc;
    },
    { timestamp: 0, path_lower: "" }
  );
  if (newestFile.timestamp > getState().timestamp) {
    return newestFile.path_lower;
  } else {
    return false;
  }
}

/**
 * Returns parsed JSON file from remote DB app folder
 */
export async function getDataDB(path) {
  const dbx = DBX.getInstance();
  let data;
  try {
    data = await dbx.filesDownload({ path });
  } catch (err) {
    console.error(err);
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(JSON.parse(reader.result));
    };
    reader.onerror = () => {
      reject(new Error("Error reading json file"));
    };
    reader.readAsText(data.fileBlob);
  });
}

/**
 * Save todos data as JSON file to DB app folder
 */
export async function saveDataDB(data) {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(function() {
    postData(data);
  }, 3000);
}

async function postData(data) {
  const dbx = DBX.getInstance();
  const blob = new Blob([JSON.stringify(data)], {
    type: "application/json"
  });
  let res;
  try {
    res = await dbx.filesUpload({
      path: `/${data.timestamp}_todos.json`,
      contents: blob
    });
  } catch (err) {
    console.error(err);
  }
}
