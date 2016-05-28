LRUCache
====
LRU Cache for node.js/browser.

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads][downloads-image]][downloads-url]

使用链表实现的 LRU 缓存。`get`、`set` 和 `update` 方法会更新 LRU 优先级

## Install

**Node.js:**

```
npm install lrucache
```

**bower:**

```
bower install lrucache
```

**Browser:**

```
<script src="/pathTo/lrucache.js"></script>
```

## API

```js
var LRUCache = require('lrucache')
```

### Class LRUCache([capacity])

+ `capacity`: : *Optional*, Type: `Number`, Default: `Number.MAX_SAFE_INTEGER`.

```js
var cache = LRUCache(100)
```

### LRUCache.prototype.get(key)

Return `value`.

```js
var a = cache.get('a')
```

### LRUCache.prototype.set(key, value)

Return `this`.

```js
cache.set('a', [1, 2, 3])
```

### LRUCache.prototype.update(key, fn)

Return `this`, It only run when key exists.

```js
cache.update('a', function (a) {
  a.push(4)
  return a
})
```

### LRUCache.prototype.remove(key)

Return `this`.

```js
cache.remove('a')
```

### LRUCache.prototype.removeAll(key)

Return `this`.

```js
cache.removeAll()
```

### LRUCache.prototype.keys()

Return a array of `keys`.

```
cache.keys()
```

### LRUCache.prototype.has(key)

Return `true` or `false`.

```js
cache.has('a')
```

### LRUCache.prototype.staleKey()

Return the stalest `key` or `null`.

```js
var staleKey = cache.staleKey()
```

### LRUCache.prototype.popStale()

Return the stalest `data` or `null`.

```js
var staleDate = cache.popStale()
```

### LRUCache.prototype.info()

Return `info`.

```js
cache.info()
```

[npm-url]: https://npmjs.org/package/lrucache
[npm-image]: http://img.shields.io/npm/v/lrucache.svg

[travis-url]: https://travis-ci.org/zensh/lrucache
[travis-image]: http://img.shields.io/travis/zensh/lrucache.svg

[downloads-url]: https://npmjs.org/package/lrucache
[downloads-image]: http://img.shields.io/npm/dm/lrucache.svg?style=flat-square
