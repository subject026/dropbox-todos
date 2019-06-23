import { initialState, update } from "../index";

const testTodos = [
  { id: "1", title: "first todo item", isComplete: false },
  { id: "2", title: "second todo item", isComplete: true },
  { id: "3", title: "third todo item", isComplete: true },
  { id: "4", title: "fourth todo item", isComplete: false }
];

describe("State Update Function", () => {
  it("'null' action should return state unchanged", () => {
    const result = update(null, {}, initialState);
    expect(result).not.toBe(initialState); // should return a new obj
    expect(result).toEqual(initialState); // new obj should match state passed in
  });

  it("ADD action should add new todo items to state", () => {
    let newState = JSON.parse(JSON.stringify(initialState));
    testTodos.forEach(todo => {
      newState = update("ADD", todo, newState);
    });
    expect(newState.todos).toHaveLength(4);
    expect(newState.todos[0]).toEqual(testTodos[0]);
    expect(newState.todos[1]).toEqual(testTodos[1]);
    expect(newState.todos[2]).toEqual(testTodos[2]);
    expect(newState.todos[3]).toEqual(testTodos[3]);
  });

  it("TOGGLE action should toggle isComplete value", () => {
    let stateWithTodos = JSON.parse(JSON.stringify(initialState));
    testTodos.forEach(todo => {
      stateWithTodos = update("ADD", todo, stateWithTodos);
    });
    // false to true
    let toggledState = update("TOGGLE", { id: testTodos[0].id }, stateWithTodos);
    expect(toggledState.todos[0].isComplete).toBe(true);
    // true to false
    toggledState = update("TOGGLE", { id: testTodos[2].id }, toggledState);
    expect(toggledState.todos[2].isComplete).toBe(false);
  });

  xit("TODO_TITLE action should update a todo's title", () => {});

  xit("LIST_TITLE action should update the list's title", () => {});
});
