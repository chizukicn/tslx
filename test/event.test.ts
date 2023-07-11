import { expect, test } from "vitest";
import { mitt } from "../src/event";

test("emitter", () => {
  const emitter = mitt();
  const off = emitter.on("foo", () => {
    expect(true).toBe(true);
  });

  emitter.emit("foo");

  off();

  expect(emitter.all.size).toBe(0);
});
