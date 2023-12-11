import { expect } from 'chai';
import isLength from '../src/isLength.js';

describe('isLength', () => {
  it('should return true for valid lengths', () => {
    expect(isLength(0)).to.equal(true);
    expect(isLength(1)).to.equal(true);
    expect(isLength(100)).to.equal(true);
    
  });

  it('should return false for invalid lengths', () => {
    expect(isLength(-1)).to.equal(false);
    expect(isLength(1.5)).to.equal(false);
    expect(isLength(-Infinity)).to.equal(false);
    expect(isLength(NaN)).to.equal(false);
    expect(isLength('3')).to.equal(false);
    expect(isLength(true)).to.equal(false);
    expect(isLength(null)).to.equal(false);
    
  });

  it('should return false for values greater than MAX_SAFE_INTEGER', () => {
    const largeValue = MAX_SAFE_INTEGER + 1;
    expect(isLength(largeValue)).to.equal(false);
  });
});
