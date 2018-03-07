import qs from 'qs'

const isObject = x => Object.prototype.toString.call(x) === '[object Object]'

/**
 * Parses query strings using qs library,
 * but modifies the result so that it correctly parses
 * array of objects without indices. See tests for an example.
 *
 * NOTE: this doesn't work recursively.
 *
 * @see https://github.com/ljharb/qs/issues/215
 * @see https://github.com/ljharb/qs/issues/252
 * @param  {string} queryString - Query string to parse.
 * @param  {Object} qsOpts      - Options for qs library.
 * @return {Object} Parsed object.
 */
export const parseQueryString = ({ queryString, qsOpts }) => {
  const tempResult = qs.parse(queryString, qsOpts)
  Object.keys(tempResult).forEach(queryKey => {
    const value = tempResult[queryKey]

    // Is value an array of 1 object where each value is an array?
    // Example:
    // [{ a: [1, 2], b: [3, 4] }]
    if (
      Array.isArray(value) &&
      value.length === 1 &&
      isObject(value[0]) &&
      Object.keys(value[0]).every(k => Array.isArray(value[0][k]))
    ) {
      const newValue = []
      // If so, turn it into an array of multiple objects
      // [{ a: [1, 2], b: [3, 4] }] becomes
      // [{ a: 1, b: 2 }, { a: 3, b: 4 }]
      Object.keys(value[0]).forEach(key => {
        value[0][key].forEach((itemInArray, i) => {
          newValue[i] = newValue[i] || {}
          newValue[i][key] = itemInArray
        })
      })
      tempResult[queryKey] = newValue
    } else {
      tempResult[queryKey] = value
    }
  })
  return tempResult
}
