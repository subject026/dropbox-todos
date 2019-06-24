import { getTodoIndex } from "../Util";

const testArr = [{ id: "A1" }, { id: "B2" }, { id: "C3" }, { id: "D4" }, { id: "E5" }];

describe("State Util Functions - getTodoIndex", () => {
  it("Should return correct array index based on id passed in", () => {
    const result = getTodoIndex(testArr, "C3");
    expect(result).toEqual(2);
  });

  it("Should return ??? if item with no array item has id passed in", () => {
    const result = getTodoIndex(testArr, "XYZ");
    expect(result).toBe(false);
  });
});
