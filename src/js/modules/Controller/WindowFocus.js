import { getState } from "../Model";

export function handleWindowFocus() {
  // check DB for more recent data
  console.log(getState().timestamp);
}
