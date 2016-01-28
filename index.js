var es = require('event-stream');

module.exports = function mapStreamConcurrent (n, mapper, options) {
  var queued = 0,
      done = false,
      stream,
      checkdone = function () {
        if (queued === 0 && done) {
          stream.queue(null);
        }
      },
      finish = function (data) {
        queued -= 1;
        if (data !== null && data !== undefined) {
          stream.queue(data);
        }
        stream.resume();
        checkdone();
      };
  var stream = es.through(function write(data) {
    queued += 1;
    mapper(data, finish);
    if (queued >= n) {
      this.pause();
    }
  }, function end() {
    done = true;
    checkdone();
  });
  return stream;
};
