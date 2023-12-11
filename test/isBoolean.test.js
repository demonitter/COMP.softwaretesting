import { expect } from 'chai';
import isBoolean from '../src/isBoolean.js';

describe('isBoolean', () => {
  it('should return true for boolean values', () => {
    expect(isBoolean(true)).to.equal(true);
    expect(isBoolean(false)).to.equal(true);
  });

  it('should return false for non-boolean values', () => {
    expect(isBoolean(null)).to.equal(false);
    expect(isBoolean(undefined)).to.equal(false);
    expect(isBoolean(0)).to.equal(false);
    expect(isBoolean(1)).to.equal(false);
    expect(isBoolean('')).to.equal(false);
    expect(isBoolean('true')).to.equal(false);
    expect(isBoolean('false')).to.equal(false);
    expect(isBoolean([])).to.equal(false);
    expect(isBoolean({})).to.equal(false);
    expect(isBoolean(() => {})).to.equal(false);
  });
});
