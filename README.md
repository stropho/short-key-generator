# Short key generator
[![Build Status](https://travis-ci.org/stropho/short-key-generator.svg?branch=master)](https://travis-ci.org/stropho/short-key-generator)
[![Coverage Status](https://coveralls.io/repos/github/stropho/short-key-generator/badge.svg?branch=travis)](https://coveralls.io/github/stropho/short-key-generator?branch=travis)
## Why?
To reduce size of JSON with a large data set that is transmitted over the network.
I've seen this in quite a few projects - always done from scratch and usually not very well.

### Problem
```js
var toSend = {
  data: [
    {
      selfExplanatoryKey1: 11,
      selfExplanatoryKey2: 22,
      ...
      selfExplanatoryKeyN: 997
    },
    {
      selfExplanatoryKey1: 66,
      selfExplanatoryKey2: 77,
      ...
    },
  ]
};
```
The stringified JSON gets very large because of the long self-explanatory keys.

### Solution
```js
var toSend = {
  data: [
    {
      A: 11,
      B: 22,
      ...
      Cm: 997
    },
    {
      A: 66,
      B: 77,
      ...
    },
  ],
  map: {
    selfExplanatoryKey1: 'A',
    selfExplanatoryKey2: 'B',
    ....
    selfExplanatoryKeyN: 'Cm'
  }
};
```

## Basic Usage

```js
var keyMapFactory = require('short-key-generator');
var keyMap = keyMapFactory();
keyMap.getOrCreate('selfExplanatoryKey1'); // 'A'
keyMap.getOrCreate('selfExplanatoryKey2'); // 'B'
keyMap.getOrCreate('selfExplanatoryKey1'); // 'A'

// map object keys and keep the values unchanged
keyMap.mapObjectKeys({
  selfExplanatoryKey2: 1,
  selfExplanatoryKey3: {selfExplanatoryKey4: 2}
}); // {'B': 1, 'C': {selfExplanatoryKey4: 2}}

keyMap.getMap();
// returns
//  {
//    selfExplanatoryKey1: 'A',
//    selfExplanatoryKey2: 'B',
//    selfExplanatoryKey3: 'C'
//  }

// if you need inverted map like {A: 'selfExplanatoryKey1'}, use
keyMap.getIvertedMap();
```
## API Reference
The default export of this module is [~keyMap()](#module_short-key-generator..keyMap).
That and probably [~characterRange()](#module_short-key-generator..characterRange)
are the only things you need. The other module members (classes) are exported
just in case you feel like you want to extend them and it is not worth a pull request.


* [short-key-generator](#module_short-key-generator)
    * [~KeyMap](#module_short-key-generator..KeyMap)
        * [.getOrCreate(longKey)](#module_short-key-generator..KeyMap+getOrCreate) ⇒ <code>string</code>
        * [.getKey(longKey)](#module_short-key-generator..KeyMap+getKey) ⇒ <code>string</code> &#124; <code>undefined</code>
        * [.mapObjectKeys(obj)](#module_short-key-generator..KeyMap+mapObjectKeys) ⇒ <code>Object</code>
        * [.getMap()](#module_short-key-generator..KeyMap+getMap) ⇒ <code>Object</code>
        * [.getInvertedMap()](#module_short-key-generator..KeyMap+getInvertedMap) ⇒ <code>Object</code>
    * [~SequentialKeyGen](#module_short-key-generator..SequentialKeyGen)
        * [.getNextKey()](#module_short-key-generator..SequentialKeyGen+getNextKey) ⇒ <code>string</code>
    * [~characterRange(firstChar, lastChar, optStep)](#module_short-key-generator..characterRange) ⇒ <code>Array.&lt;string&gt;</code>
    * [~keyMap()](#module_short-key-generator..keyMap) ⇒ <code>KeyMap</code>
    * [~sequentialKeyGen()](#module_short-key-generator..sequentialKeyGen) ⇒ <code>SequentialKeyGen</code>

<a name="module_short-key-generator..KeyMap"></a>

### ~~KeyMap
**Kind**: inner class of <code>[short-key-generator](#module_short-key-generator)</code>  

* [~KeyMap](#module_short-key-generator..KeyMap)
    * [.getOrCreate(longKey)](#module_short-key-generator..KeyMap+getOrCreate) ⇒ <code>string</code>
    * [.getKey(longKey)](#module_short-key-generator..KeyMap+getKey) ⇒ <code>string</code> &#124; <code>undefined</code>
    * [.mapObjectKeys(obj)](#module_short-key-generator..KeyMap+mapObjectKeys) ⇒ <code>Object</code>
    * [.getMap()](#module_short-key-generator..KeyMap+getMap) ⇒ <code>Object</code>
    * [.getInvertedMap()](#module_short-key-generator..KeyMap+getInvertedMap) ⇒ <code>Object</code>

<a name="module_short-key-generator..KeyMap+getOrCreate"></a>

#### keyMap.getOrCreate(longKey) ⇒ <code>string</code>
Get an existing short key for provided long key. If it doesn't exist,
new short key is created

**Kind**: instance method of <code>[KeyMap](#module_short-key-generator..KeyMap)</code>  

| Param | Type |
| --- | --- |
| longKey | <code>string</code> | 

<a name="module_short-key-generator..KeyMap+getKey"></a>

#### keyMap.getKey(longKey) ⇒ <code>string</code> &#124; <code>undefined</code>
Get an existing short key for provided long key

**Kind**: instance method of <code>[KeyMap](#module_short-key-generator..KeyMap)</code>  
**Returns**: <code>string</code> &#124; <code>undefined</code> - undefined if there is no entry for longKey  

| Param | Type |
| --- | --- |
| longKey | <code>string</code> | 

<a name="module_short-key-generator..KeyMap+mapObjectKeys"></a>

#### keyMap.mapObjectKeys(obj) ⇒ <code>Object</code>
Utility method to rename object keys

**Kind**: instance method of <code>[KeyMap](#module_short-key-generator..KeyMap)</code>  
**Returns**: <code>Object</code> - new object with original values  

| Param | Type |
| --- | --- |
| obj | <code>Object</code> | 

<a name="module_short-key-generator..KeyMap+getMap"></a>

#### keyMap.getMap() ⇒ <code>Object</code>
**Kind**: instance method of <code>[KeyMap](#module_short-key-generator..KeyMap)</code>  
**Returns**: <code>Object</code> - map of all entries: `{longKey: shortKey}`  
<a name="module_short-key-generator..KeyMap+getInvertedMap"></a>

#### keyMap.getInvertedMap() ⇒ <code>Object</code>
**Kind**: instance method of <code>[KeyMap](#module_short-key-generator..KeyMap)</code>  
**Returns**: <code>Object</code> - map of all entries: `{shortKey: longKey}`  
<a name="module_short-key-generator..SequentialKeyGen"></a>

### ~~SequentialKeyGen
**Kind**: inner class of <code>[short-key-generator](#module_short-key-generator)</code>  
<a name="module_short-key-generator..SequentialKeyGen+getNextKey"></a>

#### sequentialKeyGen.getNextKey() ⇒ <code>string</code>
Generate new key

**Kind**: instance method of <code>[SequentialKeyGen](#module_short-key-generator..SequentialKeyGen)</code>  
<a name="module_short-key-generator..characterRange"></a>

### ~~characterRange(firstChar, lastChar, optStep) ⇒ <code>Array.&lt;string&gt;</code>
Utility function to create a range/array of characters

**Kind**: inner method of <code>[short-key-generator](#module_short-key-generator)</code>  
**Returns**: <code>Array.&lt;string&gt;</code> - array of characters  

| Param | Type | Description |
| --- | --- | --- |
| firstChar | <code>string</code> | first character of the desired range   - first character of the provided string is used   - non-strings are coverted to string   - if no character (empty string) is provided, empty array is returned |
| lastChar | <code>string</code> | last character of the desired range; same behavior as firstChar |
| optStep | <code>string</code> | step - default is one, decimals are floored, 0 converted to 1 |

<a name="module_short-key-generator..keyMap"></a>

### ~~keyMap() ⇒ <code>KeyMap</code>
Function creating new instance of KeyMap

**Kind**: inner method of <code>[short-key-generator](#module_short-key-generator)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options.initInvertedMap] | <code>Object.&lt;string, string&gt;</code> | <code>Object()</code> | initialize map, e.g. `{shortKey: 'longKey'}` |
| [options.alphabet] | <code>Array.&lt;string&gt;</code> | <code>[&#x27;A&#x27;-&#x27;Z&#x27;]</code> | strings used to generate new keys |
| [options.initCounter] | <code>number</code> | <code>0</code> | use if you want to skip a few keys at the beginning |
| [options.glueFn] | <code>function</code> | <code>fragments =&gt; fragments.join(&#x27;&#x27;)</code> | keys are created    with one or more strings from the alphabet.    By default, they are combined with `.join('')` |

<a name="module_short-key-generator..sequentialKeyGen"></a>

### ~~sequentialKeyGen() ⇒ <code>SequentialKeyGen</code>
Function creating new instance of SequentialKeyGen
Exported as member `sequentialKeyGen`

**Kind**: inner method of <code>[short-key-generator](#module_short-key-generator)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options.alphabet] | <code>Array.&lt;string&gt;</code> | <code>[&#x27;A&#x27;-&#x27;Z&#x27;]</code> | strings used to generate new keys |
| [options.initCounter] | <code>number</code> | <code>0</code> | use if you want to skip a few keys at the beginning |
| [options.glueFn] | <code>function</code> | <code>fragments =&gt; fragments.join(&#x27;&#x27;)</code> | keys are created    with one or more strings from the alphabet.    By default, they are combined with `.join('')` |


## Contributing
Feel free to suggest new features or create pull requests (PR).
With PR, keep the test coverage at 100% ;)

### Clone the repo and develop new feature or bug fix
```sh
$ git clone https://github.com/stropho/short-key-generator.git
$ cd short-key-generator
$ npm i
$ npm run test:unit:watch
```
Tests autamatically run on change in `src/` or `test/` folder.

To run other tasks like linter, coverage or build, simply run
```sh
$ npm run all
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

### Script Tasks

#### build

> Build the code from `./src`, store in `./dist`

```sh
$ npm run build
```

#### Test

```sh
## Unit tests
$ npm run test:unit

## All tests and linter for test files
$ npm run test
```

#### Test coverage

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
