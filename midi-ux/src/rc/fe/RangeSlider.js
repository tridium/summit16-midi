/**
 * @module nmodule/midi/rc/fe/RangeSlider
 */
define(['jquery',
        'nmodule/webEditors/rc/fe/baja/BaseEditor',
        'hbs!nmodule/midi/rc/fe/template/RangeSlider',
        'css!nmodule/midi/rc/midi'], function (
         $,
         BaseEditor,
         template) {

  'use strict';

  /**
   * Editor for a `Number`, based around an HTML5 `type="range"` input.
   * Supports the following `bajaux` `Properties`:
   *
   * - `label` (string): display label for the slider
   * - `min` (number): minimum value for the slider - default `0`
   * - `max` (number): maximum value for the slider - default `1000`
   * - `step` (number): step value for the slider - default `(max - min) / 1000`
   *
   * @class
   * @extends module:nmodule/webEditors/rc/fe/baja/BaseEditor
   * @alias module:nmodule/midi/rc/fe/RangeSlider
   */
  var RangeSlider = function RangeSlider() {
    BaseEditor.apply(this, arguments);
    var props = this.properties();
    if (!props.get('min')) { props.add({ name: 'min', value: 0 }); }
    if (!props.get('max')) { props.add({ name: 'max', value: 1000 }); }
    if (!props.get('step')) {
      props.add({
        name: 'step',
        value: (props.getValue('max') - props.getValue('min')) / 1000
      });
    }
  };
  RangeSlider.prototype = Object.create(BaseEditor.prototype);
  RangeSlider.prototype.constructor = RangeSlider;

  /**
   * Get the slider input element.
   * @private
   * @returns {jQuery}
   */
  RangeSlider.prototype.$getInput = function () {
    return this.jq().find('input');
  };

  /**
   * Updates the floating text display showing the current number value.
   * @private
   */
  RangeSlider.prototype.$updateDisplay = function () {
    var that = this,
        div = that.jq().find('.display'),
        val = parseFloat(that.$getInput().val()),
        props = that.properties(),
        min = props.getValue('min'),
        max = props.getValue('max'),
        midpoint = (max + min) / 2;

    if (val > midpoint) {
      div.css({ left: 0, right: '' });
    } else {
      div.css({ left: '', right: 0 });
    }

    div.text(val);
  };

  /**
   * Adds `RangeSlider` CSS class, sets up the slider HTML, and arms event
   * handlers.
   * @param {jQuery} dom
   */
  RangeSlider.prototype.doInitialize = function (dom) {
    var that = this,
        props = that.properties();

    dom
      .addClass('RangeSlider')
      .html(template({
        id: that.generateId(),
        label: props.getValue('label'),
        min: props.getValue('min').valueOf().toFixed(1),
        max: props.getValue('max').valueOf().toFixed(1),
        step: props.getValue('step')
      }));

    dom.on('change input', 'input', function () {
      that.$updateDisplay();
      that.setModified(true);
      return false;
    });

    dom.on('mousewheel', 'input', function (e) {
      var step = that.properties().getValue('step');
      // calling doLoad and doRead is nonstandard, and bypasses the extra
      // functionality of load() and read(). remember that load() and read()
      // are *always* asynchronous and return Promises.
      that.doLoad(that.doRead() + step * (e.originalEvent.wheelDelta > 0 ? 1 : -1));
      that.setModified(true);
      return false;
    });
  };

  /**
   * Sets the slider value and updates display.
   * @param {number} value
   */
  RangeSlider.prototype.doLoad = function (value) {
    this.$getInput().val(String(value));
    return this.$updateDisplay();
  };

  /**
   * Read the currently entered value.
   * @returns {Number}
   */
  RangeSlider.prototype.doRead = function () {
    return parseFloat(this.$getInput().val());
  };

  /**
   * Enables/disables the input.
   * @param {boolean} enabled
   */
  RangeSlider.prototype.doEnabled = function (enabled) {
    this.$getInput().prop('disabled', !enabled);
  };

  /**
   * Sets the input to readonly/writable.
   * @param {boolean} readonly
   */
  RangeSlider.prototype.doReadonly = function (readonly) {
    this.$getInput().prop('readonly', readonly);
  };

  /**
   * Removes `RangeSlider` CSS class.
   */
  RangeSlider.prototype.doDestroy = function () {
    this.jq().removeClass('RangeSlider');
  };

  return RangeSlider;
});