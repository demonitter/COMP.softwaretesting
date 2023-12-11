import { expect } from 'chai';
import sinon from 'sinon'; // Install sinon for stubbing
import isObjectLike from '../src/isObjectLike.js';

describe('isObjectLike', () => {
  it('should return true for object-like values', () => {
    expect(isObjectLike({})).to.equal(true);
    expect(isObjectLike([])).to.equal(true);
    expect(isObjectLike(new Date())).to.equal(true);
    expect(isObjectLike(/abc/)).to.equal(true);
    
  });

  it('should return false for non-object-like values', () => {
    expect(isObjectLike(null)).to.equal(false);
    expect(isObjectLike(undefined)).to.equal(false);
    expect(isObjectLike(42)).to.equal(false);
    expect(isObjectLike('string')).to.equal(false);
    expect(isObjectLike(true)).to.equal(false);
    expect(isObjectLike(() => {})).to.equal(false);
    
  });
});
