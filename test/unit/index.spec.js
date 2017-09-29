/*global describe, expect, it, beforeEach*/
import exported from './../../src/index';

describe('expected exported variables', () => {

  it('contains characterRange fn', () => {
    expect(exported.characterRange).to.be.a('function');
  });

});
