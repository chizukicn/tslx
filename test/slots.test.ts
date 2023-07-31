import { expect, test } from "vitest";
import { renderSlot } from "../src/slots";

test("test slots", () => {
  const slots = {
    foo: (props: Record<string, any>) => props
  };
  expect(renderSlot(slots, "foo", {
    foo: "bar"
  })).toEqual({ foo: "bar" });
  expect(renderSlot(slots, "bar")).toBeUndefined();

  expect(renderSlot(slots, "bar", undefined, () => "fallback")).toBe("fallback");

  expect(renderSlot(slots, "bar", undefined, () => undefined)).toBeUndefined();
});

