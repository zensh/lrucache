LRUCache v0.1.0
====
LRU Cache in node/browser.


## Install

**Node.js:**

    npm install lrucache

**bower:**

    bower install lrucache

**Browser:**

    <script src="/pathTo/lrucache.js"></script>

## API

    var LRUCache = require('lrucache');

### LRUCache([capacity])

`LRUCache` 构造函数。

+ **capacity:** Number，可选，设置 LRUCache 的容量，未设置则为无限容量。

    var cache = LRUCache(100);


### LRUCache.prototype.get(key)

    var a = cache.get('a');

### LRUCache.prototype.set(key, value)

    cache.set('a', [1, 2, 3]);

### LRUCache.prototype.update(key, fn)

如果缓存 `a` 不存在，则不会执行。

    cache.update('a', function (a) {
      a.push(4);
      return a;
    });

### LRUCache.prototype.remove(key)

    cache.remove('a');

### LRUCache.prototype.removeAll(key)

    cache.removeAll();

### LRUCache.prototype.keys()

    cache.keys();

### LRUCache.prototype.has(key)

    cache.has('a');

### LRUCache.prototype.info()

    cache.info();
