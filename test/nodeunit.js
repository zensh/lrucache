'use strict';
/*global module, process, Promise, noneFn*/

var LRUCache = require('../lrucache.js'),
  x = {a:1, b:2};


exports.lrucache = function (test) {

  var cache = LRUCache(100);
  test.strictEqual(cache.info().length, 0);
  test.strictEqual(cache.info().capacity, 100);

  test.strictEqual(cache.has('a'), false);
  test.strictEqual(cache.get('a'), undefined);

  cache.set('a', x);
  test.strictEqual(cache.info().length, 1);

  test.strictEqual(cache.has('a'), true);
  test.deepEqual(cache.get('a'), {a:1, b:2});

  cache.set('b', []);
  test.strictEqual(cache.info().length, 2);
  test.deepEqual(cache.get('b'), []);

  cache.set('c', null);
  test.strictEqual(cache.info().length, 3);
  test.strictEqual(cache.get('c'), null);

  test.deepEqual(cache.keys(), ['c', 'b', 'a']);
  cache.get('b');
  test.deepEqual(cache.keys(), ['b', 'c', 'a']);
  cache.remove('c');
  test.strictEqual(cache.get('c'), undefined);
  test.deepEqual(cache.keys(), ['b', 'a']);

  cache.update('a', function (a) {
    test.deepEqual(a, {a:1, b:2});
    a.a = 2;
    return a;
  });
  cache.update('c', function (a) {
    test.ok(false);
  });
  test.deepEqual(cache.get('a'), {a:2, b:2});
  test.notStrictEqual(cache.get('a'), x);
  test.deepEqual(cache.keys(), ['a', 'b']);

  test.done();
};
