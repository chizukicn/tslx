import { expect, test } from "vitest";
import { each } from "../src/each";

test("test each", () => {
  expect(each(5, (item) => item)).toEqual([1, 2, 3, 4, 5]);
  expect(each([0, 1, 2, 3], (_, index) => index)).toEqual([0, 1, 2, 3]);
  expect(each("abc", (s) => s)).toEqual(["a", "b", "c"]);
  expect(each({ a: 1, b: 2, c: 3 }, (item, key) => `${item}-${key}`)).toEqual(["1-a", "2-b", "3-c"]);

  // invalid value
  expect(each(null, (item) => item)).toEqual([]);
  expect(each(undefined, (item) => item)).toEqual([]);
  expect(each(0, (item) => item)).toEqual([]);
  expect(each("", (item) => item)).toEqual([]);
  expect(each(false, (item) => item)).toEqual([]);
  expect(each(true, (item) => item)).toEqual([]);
  expect(each(Number.NaN, (item) => item)).toEqual([]);
  expect(each(String, (item) => item)).toEqual([]);
  expect(each(Symbol, (item) => item)).toEqual([]);
  expect(each(() => [1, 2, 3, 4], (item) => item)).toEqual([]);
});
