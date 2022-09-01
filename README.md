# Envaid

![NPM Version](https://img.shields.io/npm/v/envaid?style=flat-square)
![Total Downloads](https://img.shields.io/npm/dt/envaid?style=flat-square)

Improve your experience with environment variables using Envaid and its killer features:

- Fallback: specify a default value to use when a variable does not exist in the environment.
- Parsing: Automatically parse integers, floats, booleans, JSON objects and arrays.

Envaid is based on [Strapi](https://github.com/strapi/strapi)'s env-helper.

## Getting Started

Getting started with Envaid is super easy.

First, install the `envaid` package with your favorite package manager.

```bash
# If you use NPM
npm install envaid

# If you use Yarn
yarn add envaid

# If you use PNPM
pnpm install envaid
```

Then, import `envaid` into your project.

```js
const env = require("envaid");

// Or, if you prefer ES modules

import env from "envaid";
```

## Table of Contents

- [The `env` function](#the-env-function)
- [The `env.int` function](#the-envint-function)
- [The `env.float` function](#the-envfloat-function)
- [The `env.bool` function](#the-envbool-function)
- [The `env.json` function](#the-envjson-function)
- [The `env.array` function](#the-envarray-function)

## Documentation

#### The `env` function

Retrieves a variable from the environment and returns the variable or `defaultValue` when the variable is not set.

`defaultType` can be a variable of any type.

Examples:

```js
// Returns the value of process.env.JWT_SECRET

const jwtSecret = envaid("JWT_SECRET");
```

```js
// Returns the value of process.env.JWT_SECRET if it is set, or test otherwise

const jwtSecret = env("JWT_SECRET", "test");
```

#### The `env.int` function

Retrieves a variable from the environment and parses it into an integer, or returns `defaultValue` when the variable is not set.

`defaultValue` must be either a `number` or `undefined`.

Examples:

```js
// Returns the value of MAX_CONCURRENT_PROCESSES as an integer or undefined if the variable is not set

const maxConcurrentProcesses = env.int("MAX_CONCURRENT_PROCESSES");
```

```js
// Returns the value of MAX_CONCURRENT_PROCESSES as an integer or 2 if the variable is not set

const maxConcurrentProcesses = env.int("MAX_CONCURRENT_PROCESSES", 2);
```

#### The `env.float` function

Retrieves a variable from the environment and parses it into a floating point number, or returns `defaultValue` when the variable is not set.

`defaultValue` must be either a `number` or `undefined`.

Examples:

```js
// Returns the value of PI_VALUE as a float or undefined if the variable is not set

const pi = env.float("PI_VALUE");
```

```js
// Returns the value of PI_VALUE as an integer or 3.14 if the variable is not set

const pi = env.float("PI_VALUE", 3.14);
```

#### The `env.bool` function

Retrieves a variable from the environment and parses it into a boolean value or returns `defaultValue` when the variable is not set.

Values `TRUE`, `true`, `1`, `YES`, `yes`, `ON`, and `on` are parsed as `true`.

Values `FALSE`, `false`, `0`, `NO`, `no`, `OFF`, and `off` are parsed as `false`.

`defaultValue` must be either a `boolean` or `undefined`.

Examples:

```js
// Returns the value of NOTIFICATIONS_ENABLED as a boolean or undefined if the variable is not set

const notificationsEnabled = env.bool("NOTIFICATIONS_ENABLED");
```

```js
//  Returns the value of NOTIFICATIONS_ENABLED as a boolean or true if the variable is not set

const maxConcurrentProcesses = env.bool("NOTIFICATIONS_ENABLED", true);
```

#### The `env.json` function

Retrieves a variable from the environment and parses it into a JSON object or returns `defaultValue` when the variable is not set.

`defaultValue` can be a variable of any type.

Examples:

```js
// Returns the value of CONFIG as a JSON object or undefined if the variable is not set

const config = env.json("CONFIG");
```

```js
// Returns the value of CONFIG as a JSON object or { foo: "bar" } if the variable is not set

const config = env.json("CONFIG", { foo: "bar" });
```

#### The `env.array` function

Retrieves a variable from the environment and parses it into an array or returns `defaultValue` when the variable is not set.

Opening and closing brackets, if any, are automatically stripped away from the variables.

`defaultValue` can be an array of any kind or `undefined`.

`env.array` also accepts a `trim` optional parameter, which defines whether the environment variable and each array element should be trimmed before being returned.

`trim` is defaulted to `true`.

Examples:

```js
// Returns the value of APP_KEYS as an array or undefined if the variable is not set

const appKeys = env.json("APP_KEYS");
```

```js
// Returns the value of APP_KEYS as an array or ["foo", "bar"] if the variable is not set

const appKeys = env.json("APP_KEYS", ["foo", "bar"]);
```

```js
// Returns the value of process.env.APP_KEYS without trimming it nor the member it parses
// Eg. APP_KEYS = " foo, bar" would return [" foo", " bar"]

const appKeys = env.json("APP_KEYS", undefined, false);
```
