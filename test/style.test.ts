import { expect, test } from "vitest";
import { style, unit_f } from "../src/style";

test("test unit_f", () => {
  expect(unit_f(1)).toBe("1px");
  expect(unit_f("1")).toBe("1px");
  expect(unit_f("1rem")).toBe("1rem");
  expect(unit_f("1px", "rem")).toBe("1px");
  expect(unit_f("1rem", "%")).toBe("1rem");
});

test("test style", () => {
  expect(style({
    color: "red",
    fontSize: "1rem",
    margin: 0,
    padding: "1rem"
  })).toBe("color: red; font-size: 1rem; margin: 0; padding: 1rem;");
});
