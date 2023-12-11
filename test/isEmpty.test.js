import { expect } from 'chai';
import sinon from 'sinon'; // Install sinon for stubbing
import isEmpty from '../src/isEmpty.js';
import getTag from '../src/.internal/getTag.js'; 
import isArrayLike from '../src/isArrayLike.js'; 
import isBuffer from '../src/isBuffer.js'; 
import isArguments from '../src/isArguments.js';
import isTypedArray from '../src/isTypedArray.js'; 
import isPrototype from '../src/.internal/isPrototype.js'; 

describe('isEmpty', () => {
  it('should return true for null and undefined', () => {
    expect(isEmpty(null)).to.equal(true);
    expect(isEmpty(undefined)).to.equal(true);
  });

  it('should return true for empty array-like values', () => {
    const stubArrayLike = sinon.stub(isArrayLike, 'isArrayLike').returns(true);

    expect(isEmpty([])).to.equal(true);
    expect(isEmpty('')).to.equal(true);
    expect(isEmpty(Buffer.alloc(0))).to.equal(true);
    expect(isEmpty(new Uint8Array())).to.equal(true);
    expect(isEmpty(arguments)).to.equal(true);

    stubArrayLike.restore();
  });

  it('should return false for non-empty array-like values', () => {
    const stubArrayLike = sinon.stub(isArrayLike, 'isArrayLike').returns(true);

    expect(isEmpty([1, 2, 3])).to.equal(false);
    expect(isEmpty('abc')).to.equal(false);
    expect(isEmpty(Buffer.from('abc'))).to.equal(false);
    expect(isEmpty(new Uint8Array([1, 2, 3]))).to.equal(false);
    expect(isEmpty(arguments)).to.equal(false);

    stubArrayLike.restore();
  });

  it('should return true for empty maps and sets', () => {
    const stubGetTag = sinon.stub(getTag, 'getTag');
    stubGetTag.withArgs(new Map()).returns('[object Map]');
    stubGetTag.withArgs(new Set()).returns('[object Set]');

    expect(isEmpty(new Map())).to.equal(true);
    expect(isEmpty(new Set())).to.equal(true);

    stubGetTag.restore();
  });

  it('should return false for non-empty maps and sets', () => {
    const stubGetTag = sinon.stub(getTag, 'getTag');
    stubGetTag.withArgs(new Map([[1, 'one']])).returns('[object Map]');
    stubGetTag.withArgs(new Set([1, 2, 3])).returns('[object Set]');

    expect(isEmpty(new Map([[1, 'one']]))).to.equal(false);
    expect(isEmpty(new Set([1, 2, 3]))).to.equal(false);

    stubGetTag.restore();
  });

  it('should return true for empty objects and prototype objects', () => {
    const stubGetTag = sinon.stub(getTag, 'getTag');
    stubGetTag.withArgs({}).returns('[object Object]');

    const emptyObject = Object.create(null);
    expect(isEmpty(emptyObject)).to.equal(true);
    expect(isEmpty({})).to.equal(true);

    stubGetTag.restore();
  });

  it('should return false for non-empty objects', () => {
    const stubGetTag = sinon.stub(getTag, 'getTag');
    stubGetTag.withArgs({ key: 'value' }).returns('[object Object]');

    const nonEmptyObject = { key: 'value' };
    expect(isEmpty(nonEmptyObject)).to.equal(false);

    stubGetTag.restore();
  });

  it('should handle other types gracefully and return false', () => {
    expect(isEmpty(42)).to.equal(false);
    expect(isEmpty(true)).to.equal(false);
    expect(isEmpty(() => {})).to.equal(false);
  });

  it('should handle non-object values gracefully and return false', () => {
    const stubGetTag = sinon.stub(getTag, 'getTag');
    stubGetTag.returns('[object SomethingElse]');

    expect(isEmpty('string')).to.equal(false);
    expect(isEmpty(42)).to.equal(false);
    expect(isEmpty(true)).to.equal(false);
    expect(isEmpty(() => {})).to.equal(false);

    stubGetTag.restore();
  });
});
