import characterRange from './character-range';

let defaultOpts = {
  alphabet: characterRange('A', 'Z'),
  initCounter: 0,
  glueFn: keyFragments => keyFragments.join('')
};

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

function sequentialKeyGenFactory(options) {
  return new SequentialKeyGen(options);
}

export {
  SequentialKeyGen as ctor,
  sequentialKeyGenFactory as create
};

export default sequentialKeyGenFactory;
