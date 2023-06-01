import { Suite } from "benchmark";
import classnames from "classnames";
import classcat from "classcat";
import clsx from "clsx";
import consola from "consola";
import { cls as old } from "tslx";
import { cls } from "../dist/index.cjs";

function bench(name, ...args) {
  consola.log(`\n# ${name}`);
  new Suite()
    .add("classcat*   ", () => classcat.apply(classcat, [args]))
    .add("classnames  ", () => classnames.apply(classnames, args))
    .add("clsx        ", () => clsx.apply(clsx, args))
    .add("tslx old    ", () => old.apply(old, args))
    .add("tslx        ", () => cls.apply(cls, args))
    .on("cycle", e => consola.log(`  ${e.target}`))
    .run();
}

bench(
  "Strings",
  "foo", "", "bar", "baz", "bax", "bux"
);

bench(
  "Objects",
  { foo: true, bar: true, bax: true, bux: false },
  { baz: true, bax: false, bux: true }
);

bench(
  "Arrays",
  ["foo", "bar"],
  ["baz", "bax", "bux"]
);

bench(
  "Nested Arrays",
  ["foo", ["bar"]],
  ["baz", ["bax", ["bux"]]]
);

bench(
  "Nested Arrays w/ Objects",
  ["foo", { bar: true, bax: true, bux: false }],
  ["bax", { bax: false, bux: true }]
);

bench(
  "Mixed",
  "foo", "bar",
  { bax: true, bux: false },
  ["baz", { bax: false, bux: true }]
);

bench(
  "Mixed (Bad Data)",
  "foo", "bar",
  undefined, null, NaN,
  () => {},
  { bax: true, bux: false, 123: true },
  ["baz", { bax: false, bux: true, abc: null }, {}]
);
