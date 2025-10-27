import { describe, expect, it } from "vitest";
import { range } from "../src/range";

describe("test range", () => {
  it("test range", () => {
    expect(range(5)).toEqual([0, 1, 2, 3, 4]);
    expect(range(1, 5)).toEqual([1, 2, 3, 4]);
    expect(range("abc")).toEqual(["a", "b", "c"]);
  });
});
