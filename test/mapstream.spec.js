var mapper = require('../'),
    es = require('event-stream'),
    expect = require('chai').expect;

describe("map-stream-concurrent", function() {
  it ("runs concurrently", function(done) {
    var items = [];
    for (var i = 0; i < 100; i += 1) {
      items.push(100);
    }
    var readstream = es.from(items);
    var startTime = Date.now();

    readstream.pipe(mapper(10, function(item, cb) {
      setTimeout(cb.bind({}, 'done'), item);
    })).pipe(es.writeArray(function (err, array) {
      expect(array.length).to.equal(100);
      var endTime = Date.now();
      expect(endTime - startTime).to.be.within(900, 1100);
      done();
    }));
  });
});
