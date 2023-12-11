import isEmpty from './isEmpty.js'

describe('Known values', () => {
  test('null is empty', () => {
    expect(isEmpty(null)).toBe(true)
  })

  test('true is empty', () => {
    expect(isEmpty(true)).toBe(true)
  })

  test('false is empty', () => {
      expect(isEmpty(false)).toBe(true)
    })

  test('1 is empty', () => {
    expect(isEmpty(1)).toBe(true)
  })

  test('10 is empty', () => {
      expect(isEmpty(10)).toBe(true)
    })

  test('an empty array is empty', () => {
    expect(isEmpty([])).toBe(true)
  })

  test('an array with elements is not empty', () => {
    expect(isEmpty([1, 2, 3])).toBe(false)
  })

  test('an empty string is empty', () => {
    expect(isEmpty('')).toBe(true)
  })

  test('a non-empty string is not empty', () => {
    expect(isEmpty('abc')).toBe(false)
  })

  test('an empty object is empty', () => {
    expect(isEmpty({})).toBe(true)
  })

  test('an object with properties is not empty', () => {
    const obj = { 'a': 1}
    expect(isEmpty(obj)).toBe(false)
  })

  test('an empty map is empty', () => {
    expect(isEmpty(new Map())).toBe(true)
  })

  test('a map with entries is not empty', () => {
    const map = new Map()
    map.set('a', 1)
    expect(isEmpty(map)).toBe(false)
  })

  test('an empty set is empty', () => {
    expect(isEmpty(new Set())).toBe(true)
  })

  test('a set with values is not empty', () => {
    const set = new Set()
    set.add(1)
    expect(isEmpty(set)).toBe(false)
  })

  test('an empty prototype is empty', () => {
    function testConstructor(x,y) {
      this.x = x
      this.y = y
    }
    expect(isEmpty(testConstructor.prototype)).toBe(true)
  })

  test('arguments object is empty', () => {
    function testArgs() {
      expect(isEmpty(arguments)).toBe(true)
    }
    testArgs()
  })

  test('function is empty', () => {
    function testFunc() {}
    expect(isEmpty(testFunc)).toBe(true)
  })

  test('Prototype is empty', () => {
    const obj = { 'a': 1 }
    const copy = Object.create(obj)
    expect(isEmpty(copy)).toBe(true)
  });
});