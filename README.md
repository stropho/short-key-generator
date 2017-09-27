
# Contributing

## Install

```sh
## Clone the repo and install dependencies
$ git clone ...
$ npm i
```

### Basic concept

* JavaScript ES6
* ES6 Transpiler
  - [babel](https://babeljs.io/)
* Build system
  - [gulp](http://gulpjs.com/)
* Test framework
  - [mocha](https://mochajs.org/)
  - [istanbul](https://istanbul.js.org/) & [nyc](https://github.com/istanbuljs/nyc)
* Code style
  - [idiomatic](https://github.com/rwaldron/idiomatic.js/)
  - [eslint](http://eslint.org/) (using JS code style idiomatic)

## Script Tasks

### build

> Build the code from `./src`, store in `./dist`

```sh
$ npm run build
```

### Test

```sh
## Unit tests
$ npm run test:unit

## All tests
$ npm run test
```

### Test coverage

```sh
$ npm run coverage
```

### Linting

```sh
## Lint `./src`
$ npm run lint

## Lint './test`
$ npm run lint:test
```
