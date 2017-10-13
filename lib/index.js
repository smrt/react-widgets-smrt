'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/* eslint-disable global-require */
var configure = require('./configure');

module.exports = _extends({}, configure, {
  DropdownList: require('./DropdownList'),
  Combobox: require('./Combobox'),
  Calendar: require('./Calendar'),
  DatePicker: require('./DatePicker'),
  TimePicker: require('./TimePicker'),
  DateTimePicker: require('./DateTimePicker'),
  NumberPicker: require('./NumberPicker'),
  Multiselect: require('./Multiselect'),
  SelectList: require('./SelectList'),

  utils: {
    SlideTransitionGroup: require('./SlideTransitionGroup'),
    SlideDownTransition: require('./SlideDownTransition')
  }
});