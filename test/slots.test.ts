import { describe, expect, it } from "vitest";
import { renderSlot } from "../src/slots";

describe("test slots", () => {
  it("test renderSlot", () => {
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
});
