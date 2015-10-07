'use strict';

var toValue = require('./src/to-value');


var extract = {
  optionsAndArguments: function (argv) {
    var optv = [];
    while (this.optionOrArgument(argv, optv));
    optv.forEach(function (arg) {
      if (arg.option) {
        arg.value = toValue(arg.value);
      }
    });
    return optv;
  },
  optionOrArgument: function (argv, optv) {
    if (!argv.length) {
      return false;
    }

    var option = argv.shift();
    var match;

    if (option[0] != '-') {
      return this.argument(option, argv, optv);
    }
    else if (option == '--') {
      // End-of-options mark.
      return this.endOfOptionsMark(argv, optv);
    }
    else if (match = option.match(/^--([^-].*?)=(.+)$/)) {
      // Long option with value.
      argv.unshift(match[2]);
      return this.longOption(match[1], argv, optv);
    }
    else if (match = option.match(/^--([^=-][^=]*)$/)) {
      // Long option.
      return this.longOption(match[1], argv, optv);
    }
    else if (match = option.match(/^-([a-zA-Z])(\d)$/)) {
      // Short option with numeric value.
      argv.unshift(match[2]);
      return this.shortOption(match[1], argv, optv);
    }
    else if (match = option.match(/^-([a-zA-Z]+)$/)) {
      // Short options.
      return this.shortOption(match[1], argv, optv);
    }
    else {
      return this.argument(option, argv, optv);
    }
  },
  argument: function (argument, argv, optv) {
    optv.push({ value: argument });
    return true;
  },
  endOfOptionsMark: function (argv, optv) {
    [].push.apply(optv, argv.map(function (arg) {
      return { value: arg };
    }));
    return false;
  },
  longOption: function (option, argv, optv) {
    var match;

    if (match = option.match(/^no-(.*)$/)) {
      // Boolean option, false.
      optv.push({
        option: match[1],
        value: false
      });
    }
    else if (!argv.length || argv[0][0] == '-') {
      // Boolean option, true.
      optv.push({
        option: option,
        value: true
      });
    }
    else {
      // Next argument is this option's value.
      optv.push({
        option: option,
        value: argv.shift()
      });
    }
    return true;
  },
  shortOption: function (option, argv, optv) {
    if (option.length > 1) {
      // Multiple boolean options.
      [].push.apply(optv, option.split('').map(function (key) {
        return {
          option: key,
          value: true
        };
      }));
      return true;
    }
    else if (!argv.length || argv[0][0] == '-') {
      // Boolean option.
      optv.push({
        option: option,
        value: true
      });
    }
    else {
      // Next argument is this option's value.
      optv.push({
        option: option,
        value: argv.shift()
      });
    }
    return true;
  }
};


module.exports = extract.optionsAndArguments.bind(extract);
