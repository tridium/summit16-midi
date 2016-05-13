/**
 * @module nmodule/midi/rc/fe/SlotSelector
 */
define(['baja!',
        'bajaux/mixin/subscriberMixIn',
        'underscore',
        'nmodule/webEditors/rc/fe/baja/BaseEditor'], function (
         baja,
         subscriberMixIn,
         _,
         BaseEditor) {

  'use strict';

  /**
   * Editor allowing the selection of a particular slot on a `Component`.
   *
   * Supports the following `bajaux` `Properties`:
   *
   * - `targetType` (string): if specified, only slots of this type spec will be
   *   available for selection.
   *
   * @class
   * @extends nmodule/webEditors/rc/fe/baja/BaseEditor
   * @alias module:nmodule/midi/rc/fe/SlotSelector
   */
  var SlotSelector = function SlotSelector() {
    BaseEditor.apply(this, arguments);
    subscriberMixIn(this);
  };
  SlotSelector.prototype = Object.create(BaseEditor.prototype);
  SlotSelector.prototype.constructor = SlotSelector;

  /**
   * Get the current target type, or `null` if none specified.
   * @private
   * @returns {string|null}
   */
  SlotSelector.prototype.$getTargetType = function () {
    var prop = this.properties().getValue('targetType');
    return prop && String(prop);
  };

  /**
   * For each available slot on the `Component`, add an `option` to the
   * `select` tag.
   *
   * @private
   * @param {baja.Component} comp
   */
  SlotSelector.prototype.$buildOptions = function (comp) {
    var that = this,
        targetType = that.$getTargetType(),
        select = that.jq().children('select'),
        selected = select.val();

    var options = _.map(comp.getSlots().properties().toArray(), function (prop) {
      if (!targetType || prop.getType().is(targetType)) {
        return '<option value="' + prop.getName() + '">' +
          _.escape(comp.getDisplayName(prop)) + '</option>';
      }
    });

    select.html(_.compact(options).join(''));
    if (selected) { select.val(selected); }
  };

  /**
   * Set up a `select` tag and arm Baja event handlers to keep the options up
   * to date when slots on the subscribed `Component` are changed.
   * @param {jQuery} dom
   */
  SlotSelector.prototype.doInitialize = function (dom) {
    var that = this, sub = that.getSubscriber();
    dom.html('<select></select>');
    dom.on('change', 'select', function () {
      that.setModified(true);
      return false;
    });

    sub.attach('added', function () { that.$buildOptions(this); });
    sub.attach('removed', function () { that.$buildOptions(this); });
    sub.attach('renamed', function () { that.$buildOptions(this); });
    sub.attach('reordered', function () { that.$buildOptions(this); });
  };

  /**
   * Sets the currently selected slot.
   * @param {string|baja.Slot} slot
   */
  SlotSelector.prototype.setSelectedSlot = function (slot) {
    this.jq().children('select').val(String(slot));
  };

  /**
   * Set up available options for matching slots on this `Component`.
   * @param comp
   */
  SlotSelector.prototype.doLoad = function (comp) {
    this.$buildOptions(comp);
  };

  /**
   * Read the value of the currently selected slot (not the slot name itself),
   * or `null` if could not be read (e.g. component has no slots).
   * @returns {baja.Value}
   */
  SlotSelector.prototype.doRead = function () {
    return this.value().get(this.jq().children('select').val() || '');
  };

  return SlotSelector;
});