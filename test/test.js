'use strict';

var optArray = require('..');

var test = require('tape');


test('example', function (t) {
  var optv = optArray(['-abc', '-i', 'file', '4', '-n2', '--no-verbose',
                       '--depth=4', '--', '-s', 'A']);

  t.deepEqual(optv, [{ key: 'a', value: true },
                     { key: 'b', value: true },
                     { key: 'c', value: true },
                     { key: 'i', value: 'file' },
                     { value: '4' },
                     { key: 'n', value: 2 },
                     { key: 'verbose', value: false },
                     { key: 'depth', value: 4 },
                     { value: '-s' },
                     { value: 'A' }]);
  t.end();
});
