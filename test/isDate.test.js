import { expect } from 'chai';
import sinon from 'sinon'; // Install sinon for stubbing
import isDate from'../src/isDate.js';
import getTag from'../src/.internal/getTag.js';

describe('isDate', () => {
  it('should return true for Date objects', () => {
    expect(isDate(new Date())).to.equal(true);
  });

  it('should return false for non-Date objects', () => {
    expect(isDate('Mon April 23 2012')).to.equal(false);
    
  });

  it('should use nodeIsDate if available', () => {
    const stub = sinon.stub().returns(true);
    const originalNodeIsDate = nodeTypes.isDate;
    nodeTypes.isDate = stub;

    expect(isDate('some value')).to.equal(true);

    nodeTypes.isDate = originalNodeIsDate; 
    stub.restore();
  });

  it('should fallback to isObjectLike and getTag', () => {
    const stubIsObjectLike = sinon.stub().returns(true);
    const stubGetTag = sinon.stub().returns('[object Date]');

    const originalIsObjectLike = isObjectLike;
    const originalGetTag = getTag;

    isObjectLike = stubIsObjectLike;
    getTag = stubGetTag;

    expect(isDate('some value')).to.equal(true);

    isObjectLike = originalIsObjectLike; 
    getTag = originalGetTag;
    stubIsObjectLike.restore();
    stubGetTag.restore();
  });
});
