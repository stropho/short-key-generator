/*global describe, expect, it, beforeEach*/
import exported from './../../src/index';

describe('expected exported variables', () => {

  it('contains characterRange fn', () => {
    expect(exported.characterRange).to.be.a('function');
  });

  it('contains sequentialKeyGen fn', () => {
    expect(exported.sequentialKeyGen).to.be.a('function');
  });

  it('contains keyMap fn', () => {
    expect(exported.keyMap).to.be.a('function');
  });

});
