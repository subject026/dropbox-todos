import { Dropbox } from "dropbox";

import { getTokenLocal } from "./LocalStorageController";

/**
 * Returns array of remote app folder file details
 */
export async function DBGetFilesList() {
  const dbx = new Dropbox({ accessToken: getTokenLocal(), fetch });
  let res;
  try {
    res = await dbx.filesListFolder({ path: "" });
    return res.entries;
  } catch (err) {
    console.log(err);
  }
}

/**
 * Returns parsed JSON file from remote DB app folder
 */
export async function DBGetData(path) {
  const dbx = new Dropbox({ accessToken: getTokenLocal(), fetch });
  let data;
  try {
    data = await dbx.filesDownload({ path });
  } catch (err) {
    console.log(err);
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
export async function DBSaveData(data) {
  const dbx = new Dropbox({ accessToken: getTokenLocal(), fetch });
  const blob = new Blob([JSON.stringify(data)], {
    type: "application/json"
  });
  let res;
  try {
    res = dbx.filesUpload({
      path: `/${Date.now()}_todos.json`,
      contents: blob
    });
    return res;
  } catch (err) {
    return err;
  }
}
