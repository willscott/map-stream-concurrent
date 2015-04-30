map-stream-concurrent
=====================

A concurrent extension to map-stream. Allows you to run a `map` function over
the chunks of a stream with n-way parallelism.

```javascript
var mapConcurrent = require('map-stream-concurrent');

mapConcurrent(10, function (data, callback) {
  // transform data
  callback(null, data);
});
```

