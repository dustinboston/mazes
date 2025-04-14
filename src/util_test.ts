import { describe, expect, it, spyOn } from "bun:test";
import { sample } from "./util";

describe("sample", () => {
  it("should return an element from the array", () => {
    const array = [1, 2, 3, 4, 5];
    const result = sample(array);
    expect(array).toContain(result);
  });

  it("should return undefined for an empty array", () => {
    const array: number[] = [];
    const result = sample(array);
    expect(result).toBeUndefined();
  });

  it("should return the only element if the array has one element", () => {
    const array = [42];
    const result = sample(array);
    expect(result).toBe(42);
  });

  it("should randomly select an element from the array", () => {
    const array = ["a", "b", "c"];
    const spy = spyOn(global.Math, "random").mockReturnValue(0.5); // Mock random to always pick the middle element
    const result = sample(array);
    expect(result).toBe("b");
    spy.mockRestore();
  });
});
