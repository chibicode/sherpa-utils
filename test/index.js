import test from 'ava'
import { parseQueryString } from '../dist/index'

test('Parses object queries correctly', t => {
  const queryString = ['key[a]=1', 'key[b]=2', 'key[c]=3', 'key[d]=4'].join('&')
  t.deepEqual(parseQueryString({ queryString }), {
    key: {
      a: '1',
      b: '2',
      c: '3',
      d: '4'
    }
  })
})

test('Parses array of 1 object correctly', t => {
  const queryString = [
    'key[][a]=1',
    'key[][b]=2',
    'key[][c]=3',
    'key[][d]=4'
  ].join('&')
  t.deepEqual(parseQueryString({ queryString }), {
    key: [
      {
        a: '1',
        b: '2',
        c: '3',
        d: '4'
      }
    ]
  })
})

test('Parses array of 2 objects correctly', t => {
  const queryString = [
    'key[][a]=1',
    'key[][b]=2',
    'key[][c]=3',
    'key[][d]=4',
    'key[][a]=5',
    'key[][b]=6',
    'key[][c]=7',
    'key[][d]=8'
  ].join('&')
  t.deepEqual(parseQueryString({ queryString }), {
    key: [
      {
        a: '1',
        b: '2',
        c: '3',
        d: '4'
      },
      {
        a: '5',
        b: '6',
        c: '7',
        d: '8'
      }
    ]
  })
})
