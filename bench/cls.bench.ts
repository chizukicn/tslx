import classcat from "classcat";
import classnames from "classnames";
import clsx from "clsx";
import { bench, describe } from "vitest";
// eslint-disable-next-line antfu/no-import-dist
import { cls } from "../dist/index";
import pkg from "../package.json";

function getVersion(dep: string) {
  const version = pkg.dependencies[dep] || pkg.devDependencies[dep];
  return version.replace(/[^\d.]/g, "");
}

const versions = {
  classcat: getVersion("classcat"),
  classnames: getVersion("classnames"),
  clsx: getVersion("clsx"),
  tslx: pkg.version
};

function benchTask(name: string, ...args: any[]) {
  describe(name, () => {
    bench(`tslx(${versions.tslx})`, () => {
      cls(...args);
    });

    bench(`classnames(${versions.classnames})`, () => {
      classnames(...args);
    });

    bench(`clsx(${versions.clsx})`, () => {
      clsx(...args);
    });

    bench(`classcat(${versions.classcat})`, () => {
      classcat(args);
    });
  });
}

benchTask(
  "Strings",
  "foo",
  "",
  "bar",
  "baz",
  "bax",
  "bux"
);
benchTask(
  "Objects",
  { foo: true, bar: true, bax: true, bux: false },
  { baz: true, bax: false, bux: true }
);
benchTask(
  "Arrays",
  ["foo", "bar"],
  ["baz", "bax", "bux"]
);

benchTask(
  "Nested Arrays",
  ["foo", ["bar"]],
  ["baz", ["bax", ["bux"]]]
);

benchTask(
  "Nested Arrays w/ Objects",
  ["foo", { bar: true, bax: true, bux: false }],
  ["bax", { bax: false, bux: true }]
);

benchTask(
  "Mixed",
  "foo",
  "bar",
  { bax: true, bux: false },
  ["baz", { bax: false, bux: true }]
);

benchTask(
  "Mixed (Bad Data)",
  "foo",
  "bar",
  undefined,
  null,
  Number.NaN,
  () => { },
  { bax: true, bux: false, 123: true },
  ["baz", { bax: false, bux: true, abc: null }, {}]
);
