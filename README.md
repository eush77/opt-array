[![npm](https://nodei.co/npm/opt-array.png)](https://nodei.co/npm/opt-array/)

# opt-array

[![Dependency Status][david-badge]][david]

The minimal option parser that returns options in array, so that you can process your options in the order they appear in.

If you don't really care about the order, you are better off using [minimist](http://npm.im/minimist).

Supported formats:

- `-abc` — multiple short options merged into a single argument;
- `-a value` — short option with value;
- `-n2` — short option with numeric value, merged into a single argument;
- `--long-option` — long option;
- `--long-option value` — long option with value;
- `--long-option=value` — long option with value as a single argument;
- `--no-long-option` — long option with value `false`;
- `-- other args` — arguments after `--` are not recognized as options.

[david]: https://david-dm.org/eush77/opt-array
[david-badge]: https://david-dm.org/eush77/opt-array.png

## Example

```js
var optArray = require('opt-array');

optArray(['-abc', '-i', 'file', '4', '-n2', '--no-verbose', '--depth=4', '--', '-s', 'A'])

//=> [{ option: 'a', value: true },
//    { option: 'b', value: true },
//    { option: 'c', value: true },
//    { option: 'i', value: 'file' },
//    { value: '4' },
//    { option: 'n', value: 2 },
//    { option: 'verbose', value: false },
//    { option: 'depth', value: 4 },
//    { value: '-s' },
//    { value: 'A' }]
```

## API

### `optv = optArray(argv)`

Returns array of options and positional arguments.

Each entry may have the following keys:

```js
{
  option: 'name', // string, for options only
  value: 'value' // string, number (for numeric-looking values), true, or false
}
```

## Install

```
npm install opt-array
```

## License

MIT
