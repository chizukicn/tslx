import { describe, expect, it } from "vitest";
import { cls, style, unit_f } from "../src";

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
});
