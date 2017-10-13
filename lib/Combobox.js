'use strict';

exports.__esModule = true;

var _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _class3, _temp;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _uncontrollable = require('uncontrollable');

var _uncontrollable2 = _interopRequireDefault(_uncontrollable);

var _Widget = require('./Widget');

var _Widget2 = _interopRequireDefault(_Widget);

var _WidgetPicker = require('./WidgetPicker');

var _WidgetPicker2 = _interopRequireDefault(_WidgetPicker);

var _List = require('./List');

var _List2 = _interopRequireDefault(_List);

var _Popup = require('./Popup');

var _Popup2 = _interopRequireDefault(_Popup);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _ComboboxInput = require('./ComboboxInput');

var _ComboboxInput2 = _interopRequireDefault(_ComboboxInput);

var _messages = require('./messages');

var _focusManager = require('./util/focusManager');

var _focusManager2 = _interopRequireDefault(_focusManager);

var _listDataManager = require('./util/listDataManager');

var _listDataManager2 = _interopRequireDefault(_listDataManager);

var _PropTypes = require('./util/PropTypes');

var CustomPropTypes = _interopRequireWildcard(_PropTypes);

var _accessorManager = require('./util/accessorManager');

var _accessorManager2 = _interopRequireDefault(_accessorManager);

var _scrollManager = require('./util/scrollManager');

var _scrollManager2 = _interopRequireDefault(_scrollManager);

var _withRightToLeft = require('./util/withRightToLeft');

var _withRightToLeft2 = _interopRequireDefault(_withRightToLeft);

var _ = require('./util/_');

var _Props = require('./util/Props');

var Props = _interopRequireWildcard(_Props);

var _Filter = require('./util/Filter');

var Filter = _interopRequireWildcard(_Filter);

var _interaction = require('./util/interaction');

var _widgetHelpers = require('./util/widgetHelpers');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var propTypes = _extends({}, Filter.propTypes, {
  value: _propTypes2.default.any,
  onChange: _propTypes2.default.func,
  open: _propTypes2.default.bool,
  onToggle: _propTypes2.default.func,

  itemComponent: CustomPropTypes.elementType,
  listComponent: CustomPropTypes.elementType,
  groupComponent: CustomPropTypes.elementType,
  groupBy: CustomPropTypes.accessor,

  data: _propTypes2.default.array,
  valueField: CustomPropTypes.accessor,
  textField: CustomPropTypes.accessor,
  name: _propTypes2.default.string,

  /**
   *
   * @type {(dataItem: ?any, metadata: { originalEvent: SyntheticEvent }) => void}
   */
  onSelect: _propTypes2.default.func,

  autoFocus: _propTypes2.default.bool,
  disabled: CustomPropTypes.disabled.acceptsArray,
  readOnly: CustomPropTypes.disabled,

  /**
   * When `true` the Combobox will suggest, or fill in, values as you type. The suggestions
   * are always "startsWith", meaning it will search from the start of the `textField` property
   */
  suggest: Filter.propTypes.filter,
  busy: _propTypes2.default.bool,
  delay: _propTypes2.default.number,

  dropUp: _propTypes2.default.bool,
  popupTransition: CustomPropTypes.elementType,

  placeholder: _propTypes2.default.string,

  inputProps: _propTypes2.default.object,
  listProps: _propTypes2.default.object,
  messages: _propTypes2.default.shape({
    openCombobox: CustomPropTypes.message,
    emptyList: CustomPropTypes.message,
    emptyFilter: CustomPropTypes.message
  })

  /**
   * ---
   * shortcuts:
   *   - { key: alt + down arrow, label: open combobox }
   *   - { key: alt + up arrow, label: close combobox }
   *   - { key: down arrow, label: move focus to next item }
   *   - { key: up arrow, label: move focus to previous item }
   *   - { key: home, label: move focus to first item }
   *   - { key: end, label: move focus to last item }
   *   - { key: enter, label: select focused item }
   *   - { key: any key, label: search list for item starting with key }
   * ---
   *
   * Select an item from the list, or input a custom value. The Combobox can also make suggestions as you type.
  
   * @public
   */
});
var Combobox = (0, _withRightToLeft2.default)(_class = (_class2 = (_temp = _class3 = function (_React$Component) {
  _inherits(Combobox, _React$Component);

  function Combobox(props, context) {
    _classCallCheck(this, Combobox);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

    _this.handleFocusChanged = function (focused) {
      if (!focused && _this.refs.input) _this.refs.input.accept();
      if (!focused) _this.close();
    };

    _initDefineProp(_this, 'handleSelect', _descriptor, _this);

    _this.handleInputKeyDown = function (_ref) {
      var key = _ref.key;

      _this._deleting = key === 'Backspace' || key === 'Delete';
      _this._isTyping = true;
    };

    _this.handleInputChange = function (event) {
      var suggestion = _this.suggest(event.target.value);

      _this.change(suggestion, true, event);
      _this.open();
    };

    _initDefineProp(_this, 'handleKeyDown', _descriptor2, _this);

    _initDefineProp(_this, 'toggle', _descriptor3, _this);

    _this.messages = (0, _messages.getMessages)(props.messages);
    _this.inputId = (0, _widgetHelpers.instanceId)(_this, '_input');
    _this.listId = (0, _widgetHelpers.instanceId)(_this, '_listbox');
    _this.activeId = (0, _widgetHelpers.instanceId)(_this, '_listbox_active_option');

    _this.list = (0, _listDataManager2.default)(_this);
    _this.accessors = (0, _accessorManager2.default)(_this);
    _this.handleScroll = (0, _scrollManager2.default)(_this);
    _this.focusManager = (0, _focusManager2.default)(_this, {
      didHandle: _this.handleFocusChanged
    });

    _this.state = _extends({}, _this.getStateFromProps(props), {
      open: false
    });
    return _this;
  }

  Combobox.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    var isSuggesting = this.refs.input && this.refs.input.isSuggesting(),
        stateChanged = !(0, _.isShallowEqual)(nextState, this.state),
        valueChanged = !(0, _.isShallowEqual)(nextProps, this.props);

    return isSuggesting || stateChanged || valueChanged;
  };

  Combobox.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.messages = (0, _messages.getMessages)(nextProps.messages);
    this.setState(this.getStateFromProps(nextProps));
  };

  Combobox.prototype.getStateFromProps = function getStateFromProps(props) {
    var accessors = this.accessors,
        list = this.list;
    var value = props.value,
        data = props.data,
        filter = props.filter;


    var index = accessors.indexOf(data, value);
    var dataItem = index === -1 ? value : data[index];
    var itemText = accessors.text(dataItem);

    var searchTerm = void 0;
    // filter only when the value is not an item in the data list
    if (index === -1 || this.refs.input && this.refs.input.isSuggesting()) {
      searchTerm = itemText;
    }

    data = Filter.filter(data, _extends({ searchTerm: searchTerm }, props));

    var focusedIndex = index;
    // index may have changed after filtering
    if (index !== -1) {
      index = accessors.indexOf(data, value);
      focusedIndex = index;
    } else {
      // value isn't a dataItem so find the close match
      focusedIndex = Filter.indexOf(data, {
        searchTerm: searchTerm,
        textField: accessors.text,
        filter: filter || true
      });
    }

    list.setData(data);

    return {
      data: data,
      selectedItem: list.nextEnabled(data[index]),
      focusedItem: list.nextEnabled(~focusedIndex ? data[focusedIndex] : data[0])
    };
  };

  Combobox.prototype.renderInput = function renderInput() {
    var _props = this.props,
        suggest = _props.suggest,
        filter = _props.filter,
        busy = _props.busy,
        name = _props.name,
        data = _props.data,
        value = _props.value,
        autoFocus = _props.autoFocus,
        tabIndex = _props.tabIndex,
        placeholder = _props.placeholder,
        inputProps = _props.inputProps,
        disabled = _props.disabled,
        readOnly = _props.readOnly,
        open = _props.open;


    var valueItem = this.accessors.findOrSelf(data, value);

    var completeType = suggest ? filter ? 'both' : 'inline' : filter ? 'list' : '';

    return _react2.default.createElement(_ComboboxInput2.default, _extends({}, inputProps, {
      ref: 'input',
      role: 'combobox',
      name: name,
      id: this.inputId,
      autoFocus: autoFocus,
      tabIndex: tabIndex,
      suggest: suggest,
      disabled: disabled === true,
      readOnly: readOnly === true,
      'aria-busy': !!busy,
      'aria-owns': this.listId,
      'aria-autocomplete': completeType,
      'aria-activedescendant': open ? this.activeId : null,
      'aria-expanded': open,
      'aria-haspopup': true,
      placeholder: placeholder,
      value: this.accessors.text(valueItem),
      onChange: this.handleInputChange,
      onKeyDown: this.handleInputKeyDown
    }));
  };

  Combobox.prototype.renderList = function renderList(messages) {
    var activeId = this.activeId,
        inputId = this.inputId,
        listId = this.listId,
        accessors = this.accessors;
    var _props2 = this.props,
        open = _props2.open,
        data = _props2.data;
    var _state = this.state,
        selectedItem = _state.selectedItem,
        focusedItem = _state.focusedItem;


    var List = this.props.listComponent;
    var props = this.list.defaultProps();

    return _react2.default.createElement(List, _extends({
      ref: 'list'
    }, props, {
      id: listId,
      activeId: activeId,
      valueAccessor: accessors.value,
      textAccessor: accessors.text,
      selectedItem: selectedItem,
      focusedItem: open ? focusedItem : null,
      'aria-hidden': !open,
      'aria-labelledby': inputId,
      'aria-live': open && 'polite',
      onSelect: this.handleSelect,
      onMove: this.handleScroll,
      messages: {
        emptyList: data.length ? messages.emptyFilter : messages.emptyList
      }
    }));
  };

  Combobox.prototype.render = function render() {
    var _this2 = this;

    var _props3 = this.props,
        className = _props3.className,
        popupTransition = _props3.popupTransition,
        busy = _props3.busy,
        dropUp = _props3.dropUp,
        open = _props3.open;
    var focused = this.state.focused;


    var disabled = this.props.disabled === true,
        readOnly = this.props.readOnly === true;

    var elementProps = Props.pickElementProps(this);
    var shouldRenderPopup = open || (0, _widgetHelpers.isFirstFocusedRender)(this);

    var messages = this.messages;

    return _react2.default.createElement(
      _Widget2.default,
      _extends({}, elementProps, {
        open: open,
        dropUp: dropUp,
        focused: focused,
        disabled: disabled,
        readOnly: readOnly,
        onBlur: this.focusManager.handleBlur,
        onFocus: this.focusManager.handleFocus,
        onKeyDown: this.handleKeyDown,
        className: (0, _classnames2.default)(className, 'rw-combobox')
      }),
      _react2.default.createElement(
        _WidgetPicker2.default,
        null,
        this.renderInput(),
        _react2.default.createElement(_Select2.default, {
          bordered: true,
          busy: busy,
          icon: 'caret-down',
          onClick: this.toggle,
          disabled: disabled || readOnly,
          label: messages.openCombobox(this.props)
        })
      ),
      shouldRenderPopup && _react2.default.createElement(
        _Popup2.default,
        {
          open: open,
          dropUp: dropUp,
          transition: popupTransition,
          onEntering: function onEntering() {
            return _this2.refs.list.forceUpdate();
          }
        },
        _react2.default.createElement(
          'div',
          null,
          this.renderList(messages)
        )
      )
    );
  };

  Combobox.prototype.focus = function focus() {
    if (this.refs.input) this.refs.input.focus();
  };

  Combobox.prototype.change = function change(nextValue, typing, originalEvent) {
    var _props4 = this.props,
        onChange = _props4.onChange,
        lastValue = _props4.value;

    this._typedChange = !!typing;
    (0, _widgetHelpers.notify)(onChange, [nextValue, {
      lastValue: lastValue,
      originalEvent: originalEvent
    }]);
  };

  Combobox.prototype.open = function open() {
    if (!this.props.open) (0, _widgetHelpers.notify)(this.props.onToggle, true);
  };

  Combobox.prototype.close = function close() {
    if (this.props.open) (0, _widgetHelpers.notify)(this.props.onToggle, false);
  };

  Combobox.prototype.suggest = function suggest(searchTerm) {
    var _props5 = this.props,
        textField = _props5.textField,
        suggest = _props5.suggest,
        minLength = _props5.minLength;
    var data = this.state.data;


    if (!this._deleting) return Filter.suggest(data, {
      minLength: minLength,
      textField: textField,
      searchTerm: searchTerm,
      filter: suggest,
      caseSensitive: false
    });

    return searchTerm;
  };

  return Combobox;
}(_react2.default.Component), _class3.propTypes = propTypes, _class3.defaultProps = {
  data: [],
  value: '',
  open: false,
  suggest: false,
  filter: false,
  delay: 500,
  listComponent: _List2.default
}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'handleSelect', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this3 = this;

    return function (data, originalEvent) {
      _this3.close();
      (0, _widgetHelpers.notify)(_this3.props.onSelect, [data, { originalEvent: originalEvent }]);
      _this3.change(data, false, originalEvent);
      _this3.focus();
    };
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'handleKeyDown', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this4 = this;

    return function (e) {
      var key = e.key,
          altKey = e.altKey;
      var list = _this4.list;
      var _props6 = _this4.props,
          open = _props6.open,
          onKeyDown = _props6.onKeyDown;
      var _state2 = _this4.state,
          focusedItem = _state2.focusedItem,
          selectedItem = _state2.selectedItem;


      (0, _widgetHelpers.notify)(onKeyDown, [e]);

      if (e.defaultPrevented) return;

      var select = function select(item) {
        return item != null && _this4.handleSelect(item, e);
      };
      var focusItem = function focusItem(item) {
        return _this4.setState({ focusedItem: item });
      };

      if (key === 'End' && open) {
        e.preventDefault();
        focusItem(list.last());
      } else if (key === 'Home' && open) {
        e.preventDefault();
        focusItem(list.first());
      } else if (key === 'Escape' && open) {
        e.preventDefault();
        _this4.close();
      } else if (key === 'Enter' && open) {
        e.preventDefault();
        select(_this4.state.focusedItem);
      } else if (key === 'Tab') {
        _this4.refs.input.accept();
      } else if (key === 'ArrowDown') {
        e.preventDefault();
        if (altKey) return _this4.open();

        if (open) focusItem(list.next(focusedItem));else select(list.next(selectedItem));
      } else if (key === 'ArrowUp') {
        e.preventDefault();
        if (altKey) return _this4.close();

        if (open) focusItem(list.prev(focusedItem));else select(list.prev(selectedItem));
      }
    };
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'toggle', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this5 = this;

    return function () {
      _this5.focus();

      _this5.props.open ? _this5.close() : _this5.open();
    };
  }
})), _class2)) || _class;

exports.default = (0, _uncontrollable2.default)(Combobox, { open: 'onToggle', value: 'onChange' }, ['focus']);
module.exports = exports['default'];