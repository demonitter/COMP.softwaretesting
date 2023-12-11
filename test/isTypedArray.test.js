import { expect } from 'chai';
import sinon from 'sinon'; // Install sinon for stubbing
import isTypedArray from '../src/isTypedArray.js';
import getTag from '../src/.internal/getTag.js'; 
import nodeTypes from '../src/.internal/nodeTypes.js'; 
import isObjectLike from '../src/isObjectLike.js'; 

describe('isTypedArray', () => {
  it('should return true for typed arrays', () => {
    expect(isTypedArray(new Uint8Array())).to.equal(true);
    
  });

  it('should return false for non-typed arrays', () => {
    expect(isTypedArray([])).to.equal(false);
    expect(isTypedArray({})).to.equal(false);
    expect(isTypedArray('string')).to.equal(false);
    expect(isTypedArray(null)).to.equal(false);
    expect(isTypedArray(undefined)).to.equal(false);
    
  });

  it('should use nodeIsTypedArray if available', () => {
    const stub = sinon.stub().returns(true);
    const originalNodeIsTypedArray = nodeTypes.isTypedArray;
    nodeTypes.isTypedArray = stub;

    expect(isTypedArray([])).to.equal(true);

    nodeTypes.isTypedArray = originalNodeIsTypedArray; // Restore original value
    stub.restore();
  });

  it('should fallback to isObjectLike and reTypedTag', () => {
    const stubIsObjectLike = sinon.stub().returns(true);
    const stubGetTag = sinon.stub().returns('[object Float32Array]');

    const originalIsObjectLike = isObjectLike;
    const originalGetTag = getTag;

    isObjectLike = stubIsObjectLike;
    getTag = stubGetTag;

    expect(isTypedArray([])).to.equal(true);

    isObjectLike = originalIsObjectLike; // Restore original value
    getTag = originalGetTag;
    stubIsObjectLike.restore();
    stubGetTag.restore();
  });
});
