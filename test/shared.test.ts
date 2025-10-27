import { describe, expect, it } from "vitest";
import { capitalize, decamelize, isArray, isIterable, isNumber, isObject, isString, kebabCase, snakeCase, unique } from "../src/shared";

describe("test shared", () => {
  it("isIterable", () => {
    expect(isIterable([])).toBe(true);
    expect(isIterable(new Set())).toBe(true);
    expect(isIterable("")).toBe(false);
    expect(isIterable({})).toBe(false);
  });

  it("isObject", () => {
    expect(isObject({})).toBe(true);
    expect(isObject([])).toBe(true);
    expect(isObject("")).toBe(false);
    expect(isObject(1)).toBe(false);
    expect(isObject(null)).toBe(false);
    expect(isObject(undefined)).toBe(false);
  });

  it("isString", () => {
    expect(isString("")).toBe(true);
    expect(isString([])).toBe(false);
    expect(isString({})).toBe(false);
    expect(isString(1)).toBe(false);
    expect(isString(null)).toBe(false);
    expect(isString(undefined)).toBe(false);
  });

  it("isArray", () => {
    expect(isArray([])).toBe(true);
    expect(isArray(new Set())).toBe(false);
    expect(isArray({})).toBe(false);
    expect(isArray("")).toBe(false);
    expect(isArray(1)).toBe(false);
    expect(isArray(null)).toBe(false);
    expect(isArray(undefined)).toBe(false);
  });

  it("isNumber", () => {
    expect(isNumber(1)).toBe(true);
    expect(isNumber([])).toBe(false);
    expect(isNumber({})).toBe(false);
    expect(isNumber("")).toBe(false);
    expect(isNumber(null)).toBe(false);
    expect(isNumber(undefined)).toBe(false);
  });

  it("unique", () => {
    expect(unique([1, 2, 3, 3, 4, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  it("case", () => {
    expect(snakeCase("fooBar")).toBe("foo_bar");
    expect(kebabCase("fooBar")).toBe("foo-bar");
    expect(capitalize("fooBar")).toBe("FooBar");
    expect(decamelize("fooBar", "_")).toBe("foo_bar");
    expect(decamelize("fooBar", "-")).toBe("foo-bar");
  });
});
