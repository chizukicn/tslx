import { describe, expect, it } from "vitest";
import { cls, each, range, style, unit_f } from "../src";

describe("tslx", () => {
  it("test classnames", () => {
    expect(cls({
      foo: true,
      bar: false
    }, "baz", ["p-4 foo  m-3", {
      absolute: true,
      relative: false
    }]).join(" ")).toBe("foo baz p-4 m-3 absolute");
  });

  it("test unit_f", () => {
    expect(unit_f(1)).toBe("1px");
    expect(unit_f("1")).toBe("1px");
    expect(unit_f("1rem")).toBe("1rem");
    expect(unit_f("1px", "rem")).toBe("1px");
    expect(unit_f("1rem", "%")).toBe("1rem");
  });

  it("test style", () => {
    expect(style({
      color: "red",
      fontSize: "1rem",
      margin: 0,
      padding: "1rem"
    })).toBe("color: red; font-size: 1rem; margin: 0; padding: 1rem;");
  });

  it("test range", () => {
    expect(range(5)).toEqual([0, 1, 2, 3, 4]);
    expect(range(1, 5)).toEqual([1, 2, 3, 4]);
    expect(range("abc")).toEqual(["a", "b", "c"]);
  });

  it("test each", () => {
    expect(each(5, (item) => item)).toEqual([1, 2, 3, 4, 5]);
    expect(each([0, 1, 2, 3], (_, index) => index)).toEqual([0, 1, 2, 3]);
    expect(each("abc", (_, index) => index)).toEqual([0, 1, 2]);
    expect(each({ a: 1, b: 2, c: 3 }, (item, key) => `${item}-${key}`)).toEqual(["1-a", "2-b", "3-c"]);
  });
});
