// lrucache v0.1.1
//
// **Github:** https://github.com/zensh/lrucache
//
// **License:** MIT

/* global module, define, Buffer */
;(function (root, factory) {
  'use strict';

  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else {
    root.LRUCache = factory();
  }
}(this, function () {
  'use strict';

  var buffer = typeof Buffer === 'function' ? function (value) {
    return new Buffer(JSON.stringify(value));
  } : function (value) {
    return JSON.stringify(value);
  };

  // 更新链表，把get或put方法操作的key提到链表head，即表示最新
  function refresh(linkedList, entry) {
    if (entry === linkedList.head) return;
    if (!linkedList.end) {
      linkedList.end = entry;
    } else if (linkedList.end === entry) {
      linkedList.end = entry.n;
    }

    link(entry.n, entry.p);
    link(entry, linkedList.head);
    linkedList.head = entry;
    linkedList.head.n = null;
  }

  // 对两个链表对象建立链接，形成一条链
  function link(nextEntry, prevEntry) {
    if (nextEntry === prevEntry) return;
    if (nextEntry) nextEntry.p = prevEntry;
    if (prevEntry) prevEntry.n = nextEntry;
  }

  function LRUCache(capacity) {
    if (!(this instanceof LRUCache)) return new LRUCache(capacity);
    this.capacity = capacity > 0 ? capacity : Number.MAX_VALUE;
    this.removeAll();
  }

  var prototype = LRUCache.prototype;

  prototype.get = function (key) {
    var lruEntry = this.hash[key];
    if (!lruEntry) return;
    refresh(this.linkedList, lruEntry);
    return JSON.parse(this.data[key].toString());
  };

  prototype.set = function (key, value) {
    var lruEntry = this.hash[key];
    if (value === undefined) return this;
    if (!lruEntry) {
      this.hash[key] = {key: key};
      this.linkedList.length += 1;
      lruEntry = this.hash[key];
    }
    refresh(this.linkedList, lruEntry);
    this.data[key] = buffer(value);
    if (this.linkedList.length > this.capacity) this.remove(this.linkedList.end.key);
    return this;
  };

  prototype.update = function (key, parse) {
    if (this.has(key)) {
      var data = this.get(key);
      this.set(key, parse(data));
    }
    return this;
  };

  prototype.remove = function (key) {
    var lruEntry = this.hash[key];
    if (!lruEntry) return this;
    if (lruEntry === this.linkedList.head) this.linkedList.head = lruEntry.p;
    if (lruEntry === this.linkedList.end) this.linkedList.end = lruEntry.n;
    link(lruEntry.n, lruEntry.p);
    delete this.hash[key];
    delete this.data[key];
    this.linkedList.length -= 1;
    return this;
  };

  prototype.removeAll = function () {
    this.data = {};
    this.hash = {};
    this.linkedList = {
      length: 0,
      head: null,
      end: null
    };
    return this;
  };

  prototype.info = function () {
    return {
      capacity: this.capacity,
      length: this.linkedList.length
    };
  };

  prototype.keys = function () {
    var keys = [], lruEntry = this.linkedList.head;
    while (lruEntry) {
      keys.push(lruEntry.key);
      lruEntry = lruEntry.p;
    }
    return keys;
  };

  prototype.has = function (key) {
    return !!this.hash[key];
  };

  return LRUCache;
}));