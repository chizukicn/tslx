# tslx

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]
[![JSDocs][jsdocs-src]][jsdocs-href]

This is my package description.

## Usage

Install package:

```sh
# npm
npm install tslx

# yarn
yarn add tslx

# pnpm
pnpm install tslx
```

Import:

```js
// ESM
import { cls } from "tslx";

// CommonJS
// const { cls } = require("tslx");

cls("foo", "bar", {
  "text-white": true,
  "bg-red": false,
});
// => "foo bar text-white"
```

## Development

- Clone this repository
- Install latest LTS version of [Node.js](https://nodejs.org/en/)
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`
- Install dependencies using `pnpm install`
- Run interactive tests using `pnpm dev`

## License

Made with 💛

Published under [MIT License](./LICENSE).

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/tslx?style=flat&colorA=18181B&colorB=F0DB4F
[npm-version-href]: https://npmjs.com/package/tslx
[npm-downloads-src]: https://img.shields.io/npm/dm/tslx?style=flat&colorA=18181B&colorB=F0DB4F
[npm-downloads-href]: https://npmjs.com/package/tslx
[codecov-src]: https://img.shields.io/codecov/c/gh/unjs/tslx/main?style=flat&colorA=18181B&colorB=F0DB4F
[codecov-href]: https://codecov.io/gh/unjs/tslx
[bundle-src]: https://img.shields.io/bundlephobia/minzip/tslx?style=flat&colorA=18181B&colorB=F0DB4F
[bundle-href]: https://bundlephobia.com/result?p=tslx
[license-src]: https://img.shields.io/github/license/unjs/tslx.svg?style=flat&colorA=18181B&colorB=F0DB4F
[license-href]: https://github.com/unjs/tslx/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsDocs.io-reference-18181B?style=flat&colorA=18181B&colorB=F0DB4F
[jsdocs-href]: https://www.jsdocs.io/package/tslx
