'use strict'

var tman = require('tman')
var assert = require('assert')
var LRUCache = require('../index.js')
var x = {a: 1, b: 2}

tman.it('LRUCache', function () {
  var cache = LRUCache(100)
  assert.strictEqual(cache.info().length, 0)
  assert.strictEqual(cache.info().capacity, 100)
  assert.strictEqual(cache.has('a'), false)
  assert.strictEqual(cache.get('a'), undefined)

  cache.set('a', x)
  assert.strictEqual(cache.info().length, 1)
  assert.strictEqual(cache.has('a'), true)
  assert.strictEqual(cache.get('a'), x)

  cache.set('b', [])
  assert.strictEqual(cache.info().length, 2)
  assert.deepEqual(cache.get('b'), [])

  cache.set('c', null)
  assert.strictEqual(cache.info().length, 3)
  assert.strictEqual(cache.get('c'), null)

  assert.deepEqual(cache.keys(), ['c', 'b', 'a'])
  cache.get('b')
  assert.deepEqual(cache.keys(), ['b', 'c', 'a'])
  cache.remove('c')
  assert.strictEqual(cache.get('c'), undefined)
  assert.deepEqual(cache.keys(), ['b', 'a'])

  cache.update('a', function (a) {
    assert.strictEqual(a, x)
    a.a = 2
    return a
  })
  cache.update('c', function (a) {
    assert.strictEqual(true, false)
  })

  assert.deepEqual(cache.get('a'), {a: 2, b: 2})
  assert.deepEqual(cache.keys(), ['a', 'b'])
  assert.deepEqual(cache.popStale(), ['b', []])
  assert.deepEqual(cache.keys(), ['a'])
})
