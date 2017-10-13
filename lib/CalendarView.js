'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp, _class2, _temp3;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _dates = require('./util/dates');

var _dates2 = _interopRequireDefault(_dates);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VIEW_UNITS = ['month', 'year', 'decade', 'century'];

function clamp(date, min, max) {
  return _dates2.default.max(_dates2.default.min(date, max), min);
}

var CalendarView = (_temp = _class = function (_React$Component) {
  _inherits(CalendarView, _React$Component);

  function CalendarView() {
    _classCallCheck(this, CalendarView);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  CalendarView.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        activeId = _props.activeId,
        props = _objectWithoutProperties(_props, ['className', 'activeId']);

    return _react2.default.createElement('table', _extends({}, props, {
      role: 'grid',
      tabIndex: '-1',
      'aria-activedescendant': activeId || null,
      className: (0, _classnames2.default)(className, 'rw-nav-view', 'rw-calendar-grid')
    }));
  };

  return CalendarView;
}(_react2.default.Component), _class.propTypes = {
  activeId: _propTypes2.default.string
}, _temp);
var CalendarViewCell = (_temp3 = _class2 = function (_React$Component2) {
  _inherits(CalendarViewCell, _React$Component2);

  function CalendarViewCell() {
    var _temp2, _this2, _ret;

    _classCallCheck(this, CalendarViewCell);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp2 = (_this2 = _possibleConstructorReturn(this, _React$Component2.call.apply(_React$Component2, [this].concat(args))), _this2), _this2.handleChange = function () {
      var _this2$props = _this2.props,
          onChange = _this2$props.onChange,
          min = _this2$props.min,
          max = _this2$props.max,
          date = _this2$props.date;

      onChange(clamp(date, min, max));
    }, _temp2), _possibleConstructorReturn(_this2, _ret);
  }

  CalendarViewCell.prototype.isEqual = function isEqual(date) {
    return _dates2.default.eq(this.props.date, date, this.props.unit);
  };

  CalendarViewCell.prototype.isEmpty = function isEmpty() {
    var _props2 = this.props,
        unit = _props2.unit,
        min = _props2.min,
        max = _props2.max,
        date = _props2.date;

    return !_dates2.default.inRange(date, min, max, unit);
  };

  CalendarViewCell.prototype.isNow = function isNow() {
    return this.props.now && this.isEqual(this.props.now);
  };

  CalendarViewCell.prototype.isFocused = function isFocused() {
    return !this.props.disabled && !this.isEmpty() && this.isEqual(this.props.focused);
  };

  CalendarViewCell.prototype.isSelected = function isSelected() {
    return this.props.selected && this.isEqual(this.props.selected);
  };

  CalendarViewCell.prototype.isOffView = function isOffView() {
    var _props3 = this.props,
        viewUnit = _props3.viewUnit,
        focused = _props3.focused,
        date = _props3.date;

    return date && focused && viewUnit && _dates2.default[viewUnit](date) !== _dates2.default[viewUnit](focused);
  };

  CalendarViewCell.prototype.render = function render() {
    var _props4 = this.props,
        children = _props4.children,
        activeId = _props4.activeId,
        label = _props4.label,
        disabled = _props4.disabled;

    var isDisabled = disabled || this.isEmpty();

    return _react2.default.createElement(
      'td',
      {
        role: 'gridcell',
        id: this.isFocused() ? activeId : null,
        title: label,
        'aria-label': label,
        'aria-readonly': disabled,
        'aria-selected': this.isSelected(),
        onClick: !isDisabled ? this.handleChange : undefined,
        className: (0, _classnames2.default)('rw-cell', this.isNow() && 'rw-now', isDisabled && 'rw-state-disabled', this.isEmpty() && 'rw-cell-not-allowed', this.isOffView() && 'rw-cell-off-range', this.isFocused() && 'rw-state-focus', this.isSelected() && 'rw-state-selected')
      },
      children
    );
  };

  return CalendarViewCell;
}(_react2.default.Component), _class2.propTypes = {
  id: _propTypes2.default.string,
  activeId: _propTypes2.default.string.isRequired,
  label: _propTypes2.default.string,
  now: _propTypes2.default.instanceOf(Date),
  date: _propTypes2.default.instanceOf(Date),
  selected: _propTypes2.default.instanceOf(Date),
  focused: _propTypes2.default.instanceOf(Date),
  min: _propTypes2.default.instanceOf(Date),
  max: _propTypes2.default.instanceOf(Date),
  unit: _propTypes2.default.oneOf(['day'].concat(VIEW_UNITS)),
  viewUnit: _propTypes2.default.oneOf(VIEW_UNITS),
  onChange: _propTypes2.default.func.isRequired,
  disabled: _propTypes2.default.bool
}, _temp3);


CalendarView.Body = function (props) {
  return _react2.default.createElement('tbody', _extends({ className: 'rw-calendar-body' }, props));
};
CalendarView.Row = function (props) {
  return _react2.default.createElement('tr', _extends({ role: 'row' }, props));
};
CalendarView.Cell = CalendarViewCell;

exports.default = CalendarView;
module.exports = exports['default'];