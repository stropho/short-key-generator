import characterRange from './character-range';
import {create as sequentialKeyGen, ctor as SequentialKeyGen} from './sequential-key-gen';
import {create as keyMap, ctor as KeyMap} from './key-map';

/**
*  @module short-key-generator
*/

export default keyMap;
export {
  characterRange,
  sequentialKeyGen,
  keyMap,
  // constructors - just in case somebody needs them
  SequentialKeyGen,
  KeyMap
};
