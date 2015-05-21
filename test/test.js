'use strict';

var optArray = require('..');

var test = require('tape');


test('example', function (t) {
  var optv = optArray(['-abc', '-i', 'file', '4', '-n2', '--no-verbose',
                       '--depth=4', '--', '-s', 'A']);

  t.deepEqual(optv, [{ option: 'a', value: true },
                     { option: 'b', value: true },
                     { option: 'c', value: true },
                     { option: 'i', value: 'file' },
                     { value: '4' },
                     { option: 'n', value: 2 },
                     { option: 'verbose', value: false },
                     { option: 'depth', value: 4 },
                     { value: '-s' },
                     { value: 'A' }]);
  t.end();
});
