import reduce from './reduce.js'

describe('Known values', () => {
  test('reduces an array of numbers to their sum', () => {
    const input = [1, 2, 3]
    const expectedOutput = 6
    const sum = (accumulator, value) => accumulator + value

    expect(reduce(input, sum)).toEqual(expectedOutput)
  })

  test('reduces an array of objects to an object with their properties', () => {
    const input = [{ name: 'Alice', age: 30 }, { name: 'Bob', age: 40 }]
    const expectedOutput = { Alice: 30, Bob: 40 }
    const reducer = (accumulator, value) => {
      accumulator[value.name] = value.age
      return accumulator
    }

    expect(reduce(input, reducer, {})).toEqual(expectedOutput)
  })

  test('reduces an array of strings to a concatenated string', () => {
    const input = ['foo', 'bar', 'baz']
    const expectedOutput = 'foobarbaz'
    const reducer = (accumulator, value) => accumulator + value

    expect(reduce(input, reducer, '')).toEqual(expectedOutput)
  })

  test('reduces an object to a single value', () => {
    const input = { a: 1, b: 2, c: 3 }
    const expectedOutput = 6
    const reducer = (accumulator, value) => accumulator + value

    expect(reduce(input, reducer, 0)).toEqual(expectedOutput)
  })

  test('reduces an object to an array of its values', () => {
    const input = { a: 1, b: 2, c: 3 }
    const expectedOutput = [1, 2, 3]
    const reducer = (accumulator, value) => {
      accumulator.push(value)
      return accumulator
    }

    expect(reduce(input, reducer, [])).toEqual(expectedOutput)
  })

  test('reduces an object to an array of its keys', () => {
    const input = { a: 1, b: 2, c: 3 }
    const expectedOutput = ['a', 'b', 'c']
    const reducer = (accumulator, value, key) => {
      accumulator.push(key)
      return accumulator
    }

    expect(reduce(input, reducer, [])).toEqual(expectedOutput)
  })

  test('reduces an object to an array of its entries', () => {
    const input = { a: 1, b: 2, c: 3 }
    const expectedOutput = [['a', 1], ['b', 2], ['c', 3]]
    const reducer = (accumulator, value, key) => {
      accumulator.push([key, value])
      return accumulator
    }

    expect(reduce(input, reducer, [])).toEqual(expectedOutput)
  })
});

describe('Edge cases', () => {
  test('reduces an empty array to an initial value', () => {
    const input = []
    const expectedOutput = 0
    const reducer = (accumulator, value) => accumulator + value

    expect(reduce(input, reducer, 0)).toEqual(expectedOutput)
  })

  test('reduces arguments to a single value', () => {
    const input = (function() { return arguments })(1, 2, 3)
    const expectedOutput = 6
    const reducer = (accumulator, value) => accumulator + value

    expect(reduce(input, reducer, 0)).toEqual(expectedOutput)
  });

  test('reduces null to an initial value', () => {
    const input = null
    const expectedOutput = 0
    const reducer = (accumulator, value) => accumulator + value

    expect(reduce(input, reducer, 0)).toEqual(expectedOutput)
  });
});

describe('Invalid inputs', () => {
  test('throws an error when the collection is undefined', () => {
    const input = undefined
    const reducer = (accumulator, value) => accumulator + value

    expect(() => reduce(input, reducer, 0)).toThrow(TypeError)
  });

  test('throws an error when the collection is a function', () => {
    const input = () => {}
    const reducer = (accumulator, value) => accumulator + value

    expect(() => reduce(input, reducer, 0)).toThrow(TypeError)
  });

  test('throws an error when the collection is a number', () => {
    const input = 1
    const reducer = (accumulator, value) => accumulator + value

    expect(() => reduce(input, reducer, 0)).toThrow(TypeError)
  });

  test('throws an error when the collection is a string', () => {
    const input = 'foo'
    const reducer = (accumulator, value) => accumulator + value

    expect(() => reduce(input, reducer, 0)).toThrow(TypeError)
  });
});