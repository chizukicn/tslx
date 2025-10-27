import { expect, it } from "vitest";
import { mitt } from "../src/event";

it("emitter", () => {
  const emitter = mitt();
  emitter.on("foo", () => {
    expect(true).toBe(true);
  });

  emitter.emit("foo");

  emitter.on("foo", () => {
    // second handler
    expect(true).toBe(true);
  });

  emitter.off("foo");

  const off = emitter.on("other", () => {
    expect(true).toBe(true);
  });

  expect(emitter.all.size).toBe(1);

  off();

  expect(emitter.all.size).toBe(0);

  emitter.once("once", () => {
    expect(true).toBe(true);
  });

  expect(emitter.all.size).toBe(1);

  emitter.emit("once");

  expect(emitter.all.size).toBe(0);

  emitter.listen({
    foo: () => {
      expect(true).toBe(true);
    }
  });

  emitter.emit("foo");
  expect(emitter.all.size).toBe(1);
});
