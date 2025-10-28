import type { MaybeArray, MaybeDate, MaybeFalsy, MaybeNumeric, MaybeRegex } from "../src";
import { describe, expectTypeOf, it } from "vitest";

describe("test types", () => {
  it("should typecheck prime", () => {
    expectTypeOf<MaybeNumeric>(1);
    expectTypeOf<MaybeNumeric>("1");

    expectTypeOf<MaybeRegex>(/\d+/);
    expectTypeOf<MaybeRegex>("\d+");
    // eslint-disable-next-line prefer-regex-literals
    expectTypeOf<MaybeRegex>(new RegExp("\d+"));

    expectTypeOf<MaybeFalsy>(false);
    expectTypeOf<MaybeFalsy>(null);
    expectTypeOf<MaybeFalsy>(undefined);
    expectTypeOf<MaybeFalsy>("");
    expectTypeOf<MaybeFalsy>(0);

    expectTypeOf<MaybeFalsy>(void 0);

    expectTypeOf<MaybeDate>(new Date());
    expectTypeOf<MaybeDate>(Date.now());
    expectTypeOf<MaybeDate>(Date.now().toString());
    expectTypeOf<MaybeDate>(new Date().getTime());

    expectTypeOf<MaybeArray<number>>([1, 2, 3]);
    expectTypeOf<MaybeArray<number>>(1);
  });
});
