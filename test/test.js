'use strict';

var optArray = require('..');

var test = require('tape');


test('example', function (t) {
  var optv = optArray([
    '-abc',
    '-i', 'file',
    '4',
    '-n2',
    '--no-verbose',
    '--depth=4',
    '--headers.Accept=application/vnd.github.v3+json',
    '--expr= two * three = six',
    '--expr', 'two * three = six',
    '--*=asterisk',
    '--', '-s', 'A'
  ]);

  t.deepEqual(optv, [
    { option: 'a', value: true },
    { option: 'b', value: true },
    { option: 'c', value: true },
    { option: 'i', value: 'file' },
    { value: '4' },
    { option: 'n', value: 2 },
    { option: 'verbose', value: false },
    { option: 'depth', value: 4 },
    { option: 'headers.Accept', value: 'application/vnd.github.v3+json' },
    { option: 'expr', value: ' two * three = six' },
    { option: 'expr', value: 'two * three = six' },
    { option: '*', value: 'asterisk' },
    { value: '-s' },
    { value: 'A' }
  ]);

  t.end();
});
