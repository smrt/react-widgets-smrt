'use strict';

exports.__esModule = true;
exports.pick = pick;
exports.pickElementProps = pickElementProps;
exports.omitOwn = omitOwn;

var whitelist = ['style', 'className', 'role', 'id', 'autocomplete', 'size', 'tabIndex', 'maxLength', 'name'];

var whitelistRegex = [/^aria-/, /^data-/, /^on[A-Z]\w+/];

function pick(props, componentClass) {
  var keys = Object.keys(componentClass.propTypes);
  var result = {};
  Object.keys(props).forEach(function (key) {
    if (keys.indexOf(key) === -1) return;
    result[key] = props[key];
  });
  return result;
}

function pickElementProps(component) {
  var props = omitOwn(component);
  var result = {};
  Object.keys(props).forEach(function (key) {
    if (whitelist.indexOf(key) !== -1 || whitelistRegex.some(function (r) {
      return !!key.match(r);
    })) result[key] = props[key];
  });

  return result;
}

function omitOwn(component) {
  var initial = Object.keys(component.constructor.propTypes);

  for (var _len = arguments.length, others = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    others[_key - 1] = arguments[_key];
  }

  var keys = others.reduce(function (arr, compClass) {
    return [].concat(arr, Object.keys(compClass.propTypes));
  }, initial);

  var result = {};
  Object.keys(component.props).forEach(function (key) {
    if (keys.indexOf(key) !== -1) return;
    result[key] = component.props[key];
  });
  return result;
}