'use strict';


module.exports = function (value) {
  if (typeof value != 'string') {
    return value;
  }

  var asNumber = Number.parseInt(value);
  return String(asNumber) == value ? asNumber : value;
};
