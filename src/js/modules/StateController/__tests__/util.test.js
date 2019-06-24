import { getTodoIndex, generateID } from "../Util";

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

// Tested 20,000 ids - all unique

// describe("generateID should generate a unique ID", () => {
//   xit("array of ids should have no duplicates", () => {
//     const idArr = [];
//     for (let i = 0; i < 20000; i++) {
//       idArr.push(generateID());
//     }
//     const result = idArr.reduce(
//       (acc, item) => {
//         if (acc.checked.includes(item)) acc.duplicates.push(item);
//         acc.checked.push(item);
//         return acc;
//       },
//       { checked: [], duplicates: [] }
//     );
//     expect(result.duplicates).toHaveLength(0);
//   });
// });
