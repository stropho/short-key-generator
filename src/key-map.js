import BiMap from 'bidirectional-map';
import sequentialKeyGen from './sequential-key-gen';
import {entriesToObject} from './utils';

class KeyMap {
  constructor(keyGen, opts) {
    this.keyGen = keyGen;
    this.biMap = new BiMap(opts && opts.initInvertedMap || {});
  }

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

  getKey(longKey) {
    return this.biMap.getKey(longKey);
  }

  mapObjectKeys(obj) {
    return Object.keys(obj).reduce((acc, longKey) => {
      let shortKey = this.getOrCreate(longKey);
      acc[shortKey] = obj[longKey];
      return acc;
    }, {});

  }

  getMap() {
    return entriesToObject(this.biMap.entries(), true);
  }

  getInvertedMap() {
    return entriesToObject(this.biMap.entries());
  }
}

/**
* Function creating new instance of KeyMap
* Exported as member `keyMap`
* @alias keyMap
* @param [options.initInvertedMap={}] {Object.<string>} initialize map, e.g. `{shortKey: 'longKey'}`
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
