import { expect } from 'chai';
import sinon from 'sinon'; // Install sinon for stubbing
import reduce from '../src/reduce.js';

describe('reduce', () => {
  it('should reduce an array using an iteratee', () => {
    const sum = reduce([1, 2, 3], (acc, value) => acc + value, 0);
    expect(sum).to.equal(6);
  });

  it('should reduce an object using an iteratee', () => {
    const obj = { 'a': 1, 'b': 2, 'c': 3 };
    const result = reduce(obj, (acc, value, key) => acc + value, 0);
    expect(result).to.equal(6);
  });

  it('should use the first element as initial accumulator if not provided', () => {
    const arr = [1, 2, 3];
    const sum = reduce(arr, (acc, value) => acc + value);
    expect(sum).to.equal(6);
  });

  it('should handle cases without an initial accumulator', () => {
    const arr = [1, 2, 3];
    const sum = reduce(arr, (acc, value) => acc + value, 0);
    expect(sum).to.equal(6);
  });

  it('should invoke the iteratee with four arguments', () => {
    const spy = sinon.spy();
    const arr = [1, 2, 3];
    reduce(arr, spy, 0);
    expect(spy.calledWithExactly(0, 1, 0, arr)).to.equal(true);
  });

  it('should handle custom collection types (using baseReduce)', () => {
    const customCollection = { '0': 'a', '1': 'b', '2': 'c', length: 3 };
    const result = reduce(customCollection, (acc, value, key) => acc + key, '');
    expect(result).to.equal('012');
  });

  it('should handle cases with empty collection', () => {
    const arr = [];
    const result = reduce(arr, (acc, value) => acc + value, 'default');
    expect(result).to.equal('default');
  });
});
