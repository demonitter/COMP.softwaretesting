import { expect } from 'chai';
import sinon from 'sinon'; // Install sinon for stubbing
import memoize from '../src/memoize.js';

describe('memoize', () => {
  it('should memoize results without resolver', () => {
    const spy = sinon.spy((a, b) => a + b);
    const memoized = memoize(spy);

    expect(memoized(2, 3)).to.equal(5);
    expect(spy.calledOnce).to.equal(true);

    expect(memoized(2, 3)).to.equal(5);
    expect(spy.calledOnce).to.equal(true);
  });

  it('should memoize results with resolver', () => {
    const spy = sinon.spy((a, b) => a + b);
    const resolver = (a, b) => a; 
    const memoized = memoize(spy, resolver);

    expect(memoized(2, 3)).to.equal(2);
    expect(spy.calledOnce).to.equal(true);


    expect(memoized(2, 4)).to.equal(2);
    expect(spy.calledOnce).to.equal(true);

    
    expect(memoized(3, 4)).to.equal(7);
    expect(spy.calledTwice).to.equal(true);
  });

  it('should throw an error for invalid arguments', () => {
    expect(() => memoize()).to.throw(TypeError, 'Expected a function');
    expect(() => memoize(42)).to.throw(TypeError, 'Expected a function');
    expect(() => memoize(() => {}, 'not a function')).to.throw(TypeError, 'Expected a function');
  });

  it('should allow custom cache implementation', () => {
    const customCache = {
      has: sinon.stub().returns(false),
      get: sinon.stub(),
      set: sinon.stub().returns(customCache),
    };

    memoize.Cache = function () {
      return customCache;
    };

    const spy = sinon.spy((a, b) => a + b);
    const memoized = memoize(spy);

    expect(memoized(2, 3)).to.equal(5);
    expect(customCache.has.calledOnce).to.equal(true);
    expect(customCache.get.called).to.equal(false);
    expect(customCache.set.calledOnce).to.equal(true);

   
    memoize.Cache = Map;
  });
});
