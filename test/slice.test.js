import { expect } from 'chai';
import slice from '../src/slice.js';

describe('slice', () => {
  it('should slice an array with positive indices', () => {
    const array = [1, 2, 3, 4];
    const result = slice(array, 1, 3);
    expect(result).to.deep.equal([2, 3]);
  });

  it('should slice an array with negative start index', () => {
    const array = [1, 2, 3, 4];
    const result = slice(array, -2);
    expect(result).to.deep.equal([3, 4]);
  });

  it('should slice an array with negative end index', () => {
    const array = [1, 2, 3, 4];
    const result = slice(array, 1, -1);
    expect(result).to.deep.equal([2, 3]);
  });

  it('should slice an array with negative start and end indices', () => {
    const array = [1, 2, 3, 4];
    const result = slice(array, -3, -1);
    expect(result).to.deep.equal([2, 3]);
  });

  it('should handle default values for start and end', () => {
    const array = [1, 2, 3, 4];
    const result = slice(array);
    expect(result).to.deep.equal([1, 2, 3, 4]);
  });

  it('should handle negative start index greater than array length', () => {
    const array = [1, 2, 3, 4];
    const result = slice(array, -10);
    expect(result).to.deep.equal([1, 2, 3, 4]);
  });

  it('should handle negative end index greater than array length', () => {
    const array = [1, 2, 3, 4];
    const result = slice(array, 1, -10);
    expect(result).to.deep.equal([]);
  });

  it('should handle empty arrays', () => {
    const array = [];
    const result = slice(array);
    expect(result).to.deep.equal([]);
  });

  it('should handle start index greater than end index', () => {
    const array = [1, 2, 3, 4];
    const result = slice(array, 3, 1);
    expect(result).to.deep.equal([]);
  });
});
