import test from 'ava'
import sample from '../dist/index'

test('foo', t => {
  t.truthy(sample.a === 1)
})
