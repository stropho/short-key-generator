/*global describe, expect, it, beforeEach*/
import createKeyMap from './../../src/key-map';

describe('unit:keyMap:init', () => {
  let keyMap = createKeyMap();
  let expectedResult = {}

  it('creates keyMap returning empty map', () => {
    let emptyMap = keyMap.getMap();

    expect(emptyMap).to.be.deep.equal(expectedResult);
  });

  it('creates keyMap returning empty invertedMap', () => {
    let emptyMap = keyMap.getInvertedMap();

    expect(emptyMap).to.be.deep.equal(expectedResult);
  });

});

describe('unit:keyMap:getOrCreate', () => {
  let keyMap = createKeyMap();
  keyMap.getOrCreate('longKey1');
  keyMap.getOrCreate('longKey2');
  keyMap.getOrCreate('constructor');

  it('returns existing key for already used longKey', () => {
    let actualExistingKey = keyMap.getOrCreate('longKey2');
    expect(actualExistingKey).to.be.equal('B');
  });

  it('create new short keys', () => {
    let actualGeneratedMap = keyMap.getMap();

    expect(actualGeneratedMap).to.be.deep.equal({
      'longKey1': 'A',
      'longKey2': 'B',
      'constructor': 'C',
    });
  });

  it('create new short keys and return invertedMap', () => {
    let actualGeneratedMap = keyMap.getInvertedMap();

    expect(actualGeneratedMap).to.be.deep.equal({
      'A': 'longKey1',
      'B': 'longKey2',
      'C': 'constructor'
    });
  });

});

describe('unit:keyMap:getKey', () => {
  let keyMap = createKeyMap();
  keyMap.getOrCreate('longKey1');

  it('returns existing key', () => {
    let actualResult = keyMap.getKey('longKey1');

    expect(actualResult).to.be.deep.equal('A');
  });

  it('returns undefined for a not existing key', () => {
    let actualResult = keyMap.getKey('longKeyXYZ');

    expect(actualResult).to.be.equal(void 0);
  });

});

describe('unit:keyMap:mapObjectKeys', () => {
  let objectHasValue = (obj, val) => {
    for (let key in obj) {
      if (obj[key] === val) {
        return true;
      }
    }
    return false;
  };

  let srcObj = {
    'longKey1': 'X',
    'longKey2': {
      'Y': 'c'
    }
  };
  let srcObj2 = {
    'longKey1': 'xxx',
    'longKey99': 'Y'
  };

  let expectedShortKeys = ['A', 'B'];

  describe('use one source object', () => {

    it('maps new short keys for an object', () => {
      let mappedObj = createKeyMap().mapObjectKeys(srcObj);
      let actualNewKeys = Object.keys(mappedObj);
      actualNewKeys.sort();

      expect(actualNewKeys).to.deep.equal(expectedShortKeys);
    });

    it('has same the values as the source object', () => {
      let mappedObj = createKeyMap().mapObjectKeys(srcObj);

      expect(objectHasValue(srcObj, mappedObj.A)).to.be.true;
      expect(objectHasValue(srcObj, mappedObj.B)).to.be.true;
    });

    it('maps same object keys multiple times', () => {
      // here, we basically combine 2 previous it()
      let keyMap = createKeyMap();
      let mappedObj;

      mappedObj = keyMap.mapObjectKeys(srcObj);
      expect(objectHasValue(srcObj, mappedObj.A)).to.be.true;
      expect(objectHasValue(srcObj, mappedObj.B)).to.be.true;

      mappedObj = keyMap.mapObjectKeys(srcObj);
      expect(objectHasValue(srcObj, mappedObj.A)).to.be.true;
      expect(objectHasValue(srcObj, mappedObj.B)).to.be.true;

      mappedObj = keyMap.mapObjectKeys(srcObj);
      expect(objectHasValue(srcObj, mappedObj.A)).to.be.true;
      expect(objectHasValue(srcObj, mappedObj.B)).to.be.true;

      let actualNewKeys = Object.keys(mappedObj);
      actualNewKeys.sort();

      expect(actualNewKeys).to.deep.equal(expectedShortKeys);

    });
  });

  describe('use multiple objects with similar keys', () => {
    let keyMap = createKeyMap();
    let mappedObj;

    mappedObj = keyMap.mapObjectKeys(srcObj);
    expect(objectHasValue(srcObj, mappedObj.A)).to.be.true;
    expect(objectHasValue(srcObj, mappedObj.B)).to.be.true;

    mappedObj = keyMap.mapObjectKeys(srcObj2);
    let map = keyMap.getInvertedMap()
    expect('C' in map).to.be.true;
    expect('D' in map).to.be.false;

    mappedObj = keyMap.mapObjectKeys(srcObj);
    expect(objectHasValue(srcObj, mappedObj.A)).to.be.true;
    expect(objectHasValue(srcObj, mappedObj.B)).to.be.true;
  });

});

describe('unit:keyMap:options', () => {
  let srcObj = {
    'longKey1': 'X',
    'longKey2': {
      'Y': 'c'
    }
  };
  let srcLongKey = 'veryLongKey';
  let srcLongKey2 = 'veryLongKey2';

  describe('defaults', () => {
    let keyMap = createKeyMap();

    let mappedObj = keyMap.mapObjectKeys(srcObj);
    let newShortKey = keyMap.getOrCreate(srcLongKey);

    it('maps object keys with default settings like alphabet', () => {
      expect('A' in mappedObj).to.be.true;
      expect('B' in mappedObj).to.be.true;
      expect(newShortKey).to.be.equal('C');
    });

  });

  describe('explicit for keyMap', () => {
    let keyMap = createKeyMap({
      initInvertedMap: {
        'QQ': srcLongKey2
      }
    });

    it('creates new short key for unknown long key', () => {
      let newShortKey = keyMap.getOrCreate(srcLongKey);
      expect(newShortKey).to.be.equal('A');
    });

    it('return existing short key for long key that was know at init', () => {
      let newShortKey = keyMap.getOrCreate(srcLongKey2);
      expect(newShortKey).to.be.equal('QQ');
    });
  });

  describe('explicit for keyGen', () => {
    it('creates keys based on another alphabet', () => {
      let keyMap = createKeyMap({
        alphabet: ['XX', 'YY']
      });
      let newShortKeys = [];

      newShortKeys.push(keyMap.getOrCreate(`${Math.random()}`));
      newShortKeys.push(keyMap.getOrCreate(`${Math.random()}`));
      newShortKeys.push(keyMap.getOrCreate(`${Math.random()}`));

      expect(newShortKeys).to.deep.equal(['XX', 'YY', 'YYXX']);
    });

    it('skips some possible keys', () => {
      let keyMap = createKeyMap({
        initCounter: 36
      });
      let newShortKeys = [];

      newShortKeys.push(keyMap.getOrCreate(`${Math.random()}`));
      newShortKeys.push(keyMap.getOrCreate(`${Math.random()}`));
      newShortKeys.push(keyMap.getOrCreate(`${Math.random()}`));

      expect(newShortKeys).to.deep.equal('BK|BL|BM'.split('|'));
    });

    it('skips some possible keys, custom alphabet', () => {
      let keyMap = createKeyMap({
        initCounter: 3,
        alphabet: '_|A|B'.split('|')
      });
      let newShortKeys = [];

      newShortKeys.push(keyMap.getOrCreate(`${Math.random()}`));
      newShortKeys.push(keyMap.getOrCreate(`${Math.random()}`));
      newShortKeys.push(keyMap.getOrCreate(`${Math.random()}`));

      expect(newShortKeys).to.deep.equal('A_|AA|AB'.split('|'));
    });

    it('creates keys with custom glueFn', () => {
      let keyMap = createKeyMap({
        initCounter: 3,
        alphabet: '_|A|B'.split('|'),
        glueFn: keyFragments => 'prefix_' + keyFragments.join('*')
      });
      let newShortKeys = [];

      newShortKeys.push(keyMap.getOrCreate(`${Math.random()}`));
      newShortKeys.push(keyMap.getOrCreate(`${Math.random()}`));
      newShortKeys.push(keyMap.getOrCreate(`${Math.random()}`));

      expect(newShortKeys).to.deep.equal('prefix_A*_|prefix_A*A|prefix_A*B'.split('|'));
    });

  });
});
