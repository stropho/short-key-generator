/*global describe, expect, it, beforeEach*/
import characterRange from './../../src/character-range';

describe('unit:characterRange', () => {
  it('characterRange is a function', () => {
    expect(characterRange).to.be.a('function');
  });

  it('creates a range from small to big with default step 1', () => {
    let actualResult = characterRange('a', 'c');
    let expectedResult = ['a', 'b', 'c'];

    expect(actualResult).to.deep.equal(expectedResult);
  });

  it('creates a range from big to small with default step 1', () => {
    let actualResult = characterRange('c', 'a');
    let expectedResult = ['c', 'b', 'a'];

    expect(actualResult).to.deep.equal(expectedResult);
  });

  it('creates a range from small to big with step 2', () => {
    let actualResult = characterRange('a', 'e', 2);
    let expectedResult = ['a', 'c', 'e'];

    expect(actualResult).to.deep.equal(expectedResult);
  });

  it('creates a range from big to small with step 2', () => {
    let actualResult = characterRange('e', 'a', 2);
    let expectedResult = ['e', 'c', 'a'];

    expect(actualResult).to.deep.equal(expectedResult);
  });

  it('creates 1-character array', () => {
    let actualResult = characterRange('x', 'x');
    let expectedResult = ['x'];

    expect(actualResult).to.deep.equal(expectedResult);
  });

  it('automatically floors `step`, so it is an integer', () => {
    let actualResult = characterRange('a', 'e', 2.2);
    let expectedResult = ['a', 'c', 'e'];

    expect(actualResult).to.deep.equal(expectedResult);
  });

  it('automatically changes `step` to a non-zero integer', () => {
    let actualResult = characterRange('a', 'c', 0);
    let expectedResult = ['a', 'b', 'c'];

    expect(actualResult).to.deep.equal(expectedResult);
  });

  it('automatically floors `step` to a non-zero integer', () => {
    let actualResult = characterRange('a', 'c', 0.2);
    let expectedResult = ['a', 'b', 'c'];

    expect(actualResult).to.deep.equal(expectedResult);
  });

});

describe('unit:characterRange:invalidArgs', () => {
  it('returns empty array for invalid first character', () => {
    let actualResult = characterRange('', 'c');
    let expectedResult = [];

    expect(actualResult).to.deep.equal(expectedResult);
  });

  it('returns empty array for invalid last character', () => {
    let actualResult = characterRange('a', '');
    let expectedResult = [];

    expect(actualResult).to.deep.equal(expectedResult);
  });

  it('converts any value to string', () => {
    let actualResult = characterRange('m', null);
    let expectedResult = ['m', 'n'];

    expect(actualResult).to.deep.equal(expectedResult);
  });
});
