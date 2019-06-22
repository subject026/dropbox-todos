function adder(a, b) {
  return a + b;
}

describe("Let's make some tests!!!", () => {
  it("Function should add 2 numbers together", () => {
    const result = adder(1, 1);
    expect(result).toBe(2);
  });
});
