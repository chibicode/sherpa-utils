import test from 'ava'
import { parseQueryString } from '../dist/index'

test('Parses regular queries correctly', t => {
  const queryString = ['key1=1', 'key2=2', 'key3=3'].join('&')
  t.deepEqual(parseQueryString({ queryString }), {
    key1: '1',
    key2: '2',
    key3: '3'
  })
})

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

test('Parses array of 2 objects with empty keys correctly', t => {
  const queryString = [
    'key[][a]=1',
    'key[][b]=2',
    'key[][c]=3',
    'key[][d]=',
    'key[][a]=4',
    'key[][b]=5',
    'key[][c]=',
    'key[][d]=6'
  ].join('&')
  t.deepEqual(parseQueryString({ queryString }), {
    key: [
      {
        a: '1',
        b: '2',
        c: '3',
        d: ''
      },
      {
        a: '4',
        b: '5',
        c: '',
        d: '6'
      }
    ]
  })
})
