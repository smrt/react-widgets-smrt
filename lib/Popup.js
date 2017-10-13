'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class2, _temp2;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SlideDownTransition = require('./SlideDownTransition');

var _SlideDownTransition2 = _interopRequireDefault(_SlideDownTransition);

var _PropTypes = require('./util/PropTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StaticContainer = function (_React$Component) {
  _inherits(StaticContainer, _React$Component);

  function StaticContainer() {
    var _temp, _this, _ret;

    _classCallCheck(this, StaticContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.shouldComponentUpdate = function (_ref) {
      var shouldUpdate = _ref.shouldUpdate;
      return !!shouldUpdate;
    }, _this.render = function () {
      return _this.props.children;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return StaticContainer;
}(_react2.default.Component);

var Popup = (_temp2 = _class2 = function (_React$Component2) {
  _inherits(Popup, _React$Component2);

  function Popup() {
    _classCallCheck(this, Popup);

    return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
  }

  Popup.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        dropUp = _props.dropUp,
        open = _props.open,
        Transition = _props.transition,
        props = _objectWithoutProperties(_props, ['className', 'dropUp', 'open', 'transition']);

    var child = _react2.default.Children.only(this.props.children);

    return _react2.default.createElement(
      Transition,
      _extends({}, props, {
        'in': open,
        dropUp: dropUp,
        className: (0, _classnames2.default)(className, 'rw-popup-container')
      }),
      _react2.default.createElement(
        StaticContainer,
        { shouldUpdate: open },
        (0, _react.cloneElement)(child, {
          className: (0, _classnames2.default)(child.props.className, 'rw-popup')
        })
      )
    );
  };

  return Popup;
}(_react2.default.Component), _class2.propTypes = {
  open: _propTypes2.default.bool,
  dropUp: _propTypes2.default.bool,
  onEntering: _propTypes2.default.func,
  onEntered: _propTypes2.default.func,
  transition: _PropTypes.elementType
}, _class2.defaultProps = {
  open: false,
  transition: _SlideDownTransition2.default
}, _temp2);
exports.default = Popup;
module.exports = exports['default'];