import { initialState, update } from "../index";

describe("State Update Function", () => {
  it("'null' action should return state unchanged", () => {
    const result = update(null, {}, initialState);
    expect(result).not.toBe(initialState); // should return a new obj
    expect(result).toEqual(initialState); // new obj should match state passed in
  });

  it("ADD action should add new todo to state", () => {
    const newTodo = { id: "1", title: "first todo item", isComplete: false };
    const result = update("ADD", newTodo, initialState);
    expect(result.todos).toHaveLength(1);
    expect(result.todos[0]).toBe(newTodo);
  });

  it("TOGGLE action should toggle isComplete value", () => {
    const newTodo = { id: "1", title: "first todo item", isComplete: false };
    const stateWithTodo = update("ADD", newTodo, initialState);
    // toggle to true
    const toggledState1 = update("TOGGLE", { id: newTodo.id }, stateWithTodo);
    expect(toggledState1.todos[0].isComplete).toBe(true);
    // back to false
    const toggledState2 = update("TOGGLE", { id: newTodo.id }, toggledState1);
    expect(toggledState2.todos[0].isComplete).toBe(false);
  });
});
