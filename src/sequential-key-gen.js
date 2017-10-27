import characterRange from './character-range';

/**
*  @module short-key-generator
*  @typicalname ~
*/

let defaultOpts = {
  alphabet: characterRange('A', 'Z'),
  initCounter: 0,
  glueFn: keyFragments => keyFragments.join('')
};

/**
* @class
*/
class SequentialKeyGen {

  constructor(opts = {}) {
    this.alphabet = (opts.alphabet || defaultOpts.alphabet).map(String);
    this.alphabetSize = this.alphabet.length;

    this.counter = +opts.initCounter || defaultOpts.initCounter;

    this.glueFn = opts.glueFn || defaultOpts.glueFn;
  }

  _codeToFragment(code) {
    return this.alphabet[code];
  }

  _getNextKey(keyFragmentsCodes) {
    let nextKey = this.glueFn(
      keyFragmentsCodes.map(this._codeToFragment, this)
    );

    return nextKey;
  }
  /**
  * Generate new key
  * @return {string}
  */
  getNextKey() {
    let keyFragmentsCodes = [];
    let remainingValue = this.counter++;

    // do-while - because we always want to create at least 1 fragment
    do {
      let remainder = remainingValue % this.alphabetSize;
      // subtracting `remainder` keeps `remainingValue` always integer
      remainingValue = (remainingValue - remainder) / this.alphabetSize;
      keyFragmentsCodes.unshift(remainder);
    } while (remainingValue > 0);

    return this._getNextKey(keyFragmentsCodes);
  }
}

/**
* Function creating new instance of SequentialKeyGen
* Exported as member `sequentialKeyGen`
* @param [options.alphabet=['A'-'Z']] {Array.<string>} strings used to generate new keys
* @param [options.initCounter=0] {number} use if you want to skip a few keys at the beginning
* @param [options.glueFn= fragments => fragments.join('')] {function} keys are created
*    with one or more strings from the alphabet.
*    By default, they are combined with `.join('')`
* @return {SequentialKeyGen}
*/
function sequentialKeyGen(options) {
  return new SequentialKeyGen(options);
}

export {
  SequentialKeyGen as ctor,
  sequentialKeyGen as create
};

export default sequentialKeyGen;
