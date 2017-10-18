/*global describe, expect, it, beforeEach*/
import {
  characterRange,
  keyMap,
  sequentialKeyGen,
  KeyMap,
  SequentialKeyGen
} from './../../src/index';
import defaultExport from './../../src/index';

describe('expected exported variables', () => {

  it('contains characterRange fn', () => {
    expect(characterRange).to.be.a('function');
  });

  it('contains sequentialKeyGen fn', () => {
    expect(sequentialKeyGen).to.be.a('function');
  });

  it('contains keyMap fn', () => {
    expect(keyMap).to.be.a('function');
  });

  it('exports keyMap as default', () => {
    expect(defaultExport).to.be.equal(keyMap);
  });

  it('contains KeyMap fn', () => {
    expect(keyMap).to.be.a('function');
  });

  it('KeyMap seems to be a constructor', () => {
    expect(() => new KeyMap()).to.not.throw()
  });

  it('contains SequentialKeyGen fn', () => {
    expect(SequentialKeyGen).to.be.a('function');
  });

  it('SequentialKeyGen seems to be a constructor', () => {
    expect(() => new SequentialKeyGen()).to.not.throw();
  });

});
