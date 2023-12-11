import { expect } from 'chai';
import sinon from 'sinon'; // Install sinon for stubbing
import isSymbol from '../src/isSymbol.js';
import getTag from '../src/.internal/getTag.js'; 

describe('isSymbol', () => {
  it('should return true for Symbol primitives', () => {
    expect(isSymbol(Symbol.iterator)).to.equal(true);
   
  });

  it('should return false for non-Symbol values', () => {
    expect(isSymbol('abc')).to.equal(false);
    expect(isSymbol(42)).to.equal(false);
    expect(isSymbol(true)).to.equal(false);
    expect(isSymbol({})).to.equal(false);
    expect(isSymbol(null)).to.equal(false);
    expect(isSymbol(undefined)).to.equal(false);
    
  });

  it('should return true for Symbol objects with matching internal tag', () => {
    const stubGetTag = sinon.stub(getTag, 'getTag');
    stubGetTag.withArgs(Object(Symbol.iterator)).returns('[object Symbol]');

    expect(isSymbol(Object(Symbol.iterator))).to.equal(true);

    stubGetTag.restore();
  });

  it('should return false for Symbol objects without matching internal tag', () => {
    const stubGetTag = sinon.stub(getTag, 'getTag');
    stubGetTag.returns('[object SomethingElse]');

    expect(isSymbol(Object(Symbol.iterator))).to.equal(false);

    stubGetTag.restore();
  });
});
