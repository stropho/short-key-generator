/*global describe, expect, it, beforeEach*/
import sequentialKeyGen from './../../src/sequential-key-gen';
import range from './../../src/character-range';

describe('unit:sequentialKeyGen', () => {
  it('returns unique keys', () => {
    let generated = {};
    let keyGen = sequentialKeyGen();

    for (let i = 0; i < 1000; i++) {
      let newKey = keyGen.getNextKey();
      expect(generated).to.not.have.property(newKey);

      generated[newKey] = true;
    }
  });

});
describe('unit:sequentialKeyGen:options', () => {

  let generateKeys = (keyGen, amount) => {
    let keyGenKeys = [];
    for (let i = 0; i < amount; i++) {
      keyGenKeys.push(keyGen.getNextKey());
    }

    return keyGenKeys;
  };

  let generateTwoSetsOfKeys = (keyGen, customKeyGen, amount = 1000) => {
    return [
      generateKeys(keyGen, amount),
      generateKeys(customKeyGen, amount)
    ];
  };

  describe('defaults', () => {
    it('has default alphabet', () => {
      let keyGen = sequentialKeyGen();
      let customKeyGen = sequentialKeyGen({alphabet: range('A', 'Z')});
      let keyGenKeys,
        customKeyGenKeys;

      [keyGenKeys, customKeyGenKeys] = generateTwoSetsOfKeys(keyGen, customKeyGen);

      expect(keyGenKeys).to.deep.equal(customKeyGenKeys);

    });

    it('has default counter start value', () => {
      let keyGen = sequentialKeyGen();
      let customKeyGen = sequentialKeyGen({initCounter: 0});
      let keyGenKeys,
        customKeyGenKeys;

      [keyGenKeys, customKeyGenKeys] = generateTwoSetsOfKeys(keyGen, customKeyGen);

      expect(keyGenKeys).to.deep.equal(customKeyGenKeys);
    });

    it('has default glue fn', () => {
      let keyGen = sequentialKeyGen();
      let customKeyGen = sequentialKeyGen({glueFn: keyFragments => keyFragments.join('')});
      let keyGenKeys,
        customKeyGenKeys;

      [keyGenKeys, customKeyGenKeys] = generateTwoSetsOfKeys(keyGen, customKeyGen);

      expect(keyGenKeys).to.deep.equal(customKeyGenKeys);
    });

  });

  describe('explicit', () => {
    it('accepts explicit alphabet', () => {
      let keyGen = sequentialKeyGen({alphabet: 'abc'.split('')});
      let expectedResult = 'a|b|c|ba|bb|bc|ca|cb|cc|baa'.split('|');
      let actualResultGenKeys = generateKeys(keyGen, 10);

      expect(actualResultGenKeys).to.deep.equal(expectedResult);

    });

    it('accepts explicit multi-character alphabet', () => {
      let keyGen = sequentialKeyGen({alphabet: '_|xx|yy'.split('|')});
      let expectedResult = '_|xx|yy|xx_|xxxx|xxyy|yy_|yyxx|yyyy|xx__'.split('|');
      let actualResultGenKeys = generateKeys(keyGen, 10);

      expect(actualResultGenKeys).to.deep.equal(expectedResult);
    });


    it('accepts explicit counter start value', () => {
      let keyGen = sequentialKeyGen({initCounter: 3});
      let expectedResult = 'D|E|F|G|H'.split('|');
      let actualResultGenKeys = generateKeys(keyGen, 5);

      expect(actualResultGenKeys).to.deep.equal(expectedResult);
    });


    it('accepts explicit glue fn', () => {
      let keyGen = sequentialKeyGen({
        // 'Z' + 1
        initCounter: 26,
        glueFn: keyFragments => 'prefix_' + keyFragments.join('*')
      });
      let expectedResult = [
        'prefix_B*A',
        'prefix_B*B',
        'prefix_B*C',
        'prefix_B*D',
        'prefix_B*E',
      ];
      let actualResultGenKeys = generateKeys(keyGen, 5);

      expect(actualResultGenKeys).to.deep.equal(expectedResult);
    });
  });


});
