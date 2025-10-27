import { describe, expect, it } from "vitest";
import { cls } from "../src/cls";

describe("test cls", () => {
  it("test classnames", () => {
    expect(cls({
      foo: true,
      bar: false
    }, "baz", ["p-4 foo  m-3", {
      absolute: true,
      relative: false
    }], null, undefined, Number.NaN)).toBe("foo baz p-4 foo  m-3 absolute");

    expect(cls(new Set([
      "foo",
      "bar",
      "baz",
      "bar"
    ]))).toBe("foo bar baz");
  });
});
