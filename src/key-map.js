import BiMap from 'bidirectional-map';
import sequentialKeyGen from './sequential-key-gen';
import {entriesToObject} from './utils';

/**
*  @module short-key-generator
*  @typicalname ~
*/
/**
* @class
*/
class KeyMap {
  constructor(keyGen, opts) {
    this.keyGen = keyGen;
    this.biMap = new BiMap(opts && opts.initInvertedMap || {});
  }

  /**
  * Get an existing short key for provided long key. If it doesn't exist,
  * new short key is created
  * @param {string} longKey
  * @return {string}
  */
  getOrCreate(longKey) {
    if (this.biMap.hasValue(longKey)) {
      return this.getKey(longKey)
    }

    let newKey;
    do {
      newKey = this.keyGen.getNextKey();
    } while (this.biMap.has(newKey));

    this.biMap.set(newKey, longKey);

    return newKey;
  }

  /**
  * Get an existing short key for provided long key
  * @param {string} longKey
  * @return {string|undefined} undefined if there is no entry for longKey
  */
  getKey(longKey) {
    return this.biMap.getKey(longKey);
  }

  /**
  * Utility method to rename object keys
  * @param {Object} obj
  * @return {Object} new object with original values
  */
  mapObjectKeys(obj) {
    return Object.keys(obj).reduce((acc, longKey) => {
      let shortKey = this.getOrCreate(longKey);
      acc[shortKey] = obj[longKey];
      return acc;
    }, {});

  }

  /**
  * @return {Object} map of all entries: `{longKey: shortKey}`
  */
  getMap() {
    return entriesToObject(this.biMap.entries(), true);
  }

  /**
  * @return {Object} map of all entries: `{shortKey: longKey}`
  */
  getInvertedMap() {
    return entriesToObject(this.biMap.entries());
  }
}

/**
* Function creating new instance of KeyMap
* @param [options.initInvertedMap=Object()] {Object.<string,string>} initialize map, e.g. `{shortKey: 'longKey'}`
* @param [options.alphabet=['A'-'Z']] {Array.<string>} strings used to generate new keys
* @param [options.initCounter=0] {number} use if you want to skip a few keys at the beginning
* @param [options.glueFn= fragments => fragments.join('')] {function} keys are created
*    with one or more strings from the alphabet.
*    By default, they are combined with `.join('')`
* @return {KeyMap}
*/
function keyMap(options = {}) {
  let {initInvertedMap, ...keyOpts} = options;
  let mapOpts = {initInvertedMap};
  return new KeyMap(sequentialKeyGen(keyOpts), mapOpts);
}

export {
  KeyMap as ctor,
  keyMap as create
};

export default keyMap;
