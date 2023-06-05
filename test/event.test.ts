import { expect, test } from "vitest";
import { mitt } from "../src/event";

test("emitter", () => {
  const emitter = mitt();
  emitter.on("foo", () => {
    expect(true).toBe(true);
  });

  emitter.emit("foo");

  emitter.off("foo");

  expect(emitter.all.size).toBe(0);
});
