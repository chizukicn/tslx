import { expect, test } from "vitest";
import { cssvar, em, percent, px, rem, style, unit_f, vh, vw } from "../src/style";

test("test unit_f", () => {
  expect(unit_f(1)).toBe("1px");
  expect(unit_f("1")).toBe("1px");
  expect(unit_f("1rem")).toBe("1rem");
  expect(unit_f("1px", "rem")).toBe("1px");
  expect(unit_f("1rem", "%")).toBe("1rem");
  expect(unit_f("1rem", "px")).toBe("1rem");
  expect(px(1)).toBe("1px");
  expect(px("1rem")).toBe("1rem");
  expect(rem(1)).toBe("1rem");
  expect(rem("1px")).toBe("1px");
  expect(em(1)).toBe("1em");
  expect(em("1px")).toBe("1px");
  expect(vw(1)).toBe("1vw");
  expect(vw("1px")).toBe("1px");
  expect(vh(1)).toBe("1vh");
  expect(vh("1px")).toBe("1px");
  expect(percent(1)).toBe("1%");
  expect(percent("1px")).toBe("1px");
});

test("test style", () => {
  expect(style({
    color: "red",
    fontSize: "1rem",
    margin: 0,
    padding: "1rem"
  })).toBe("color: red; font-size: 1rem; margin: 0; padding: 1rem;");
  expect(cssvar("foo", "bar")).toBe("--foo: bar;");
});
