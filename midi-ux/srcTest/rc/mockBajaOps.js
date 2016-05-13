define(['baja!'], function (baja) {

  'use strict';

  function fireHandlers(comp, sub, event) {
    var args = Array.prototype.slice.call(arguments, 3);
    comp.fireHandlers.apply(comp, [ event, baja.error, comp ].concat(args));
    if (sub) {
      sub.fireHandlers.apply(sub, [ event, baja.error, comp ].concat(args));
    }
  }

  /**
   * baja event handlers don't fire on unsubscribed components. Rather
   * than mount a component instance in the station, we just fake it out
   * instead by manually triggering the appropriate component events, *as if*
   * the component were mounted. If a subscriber is provided, it will fire the
   * events as well. Note this is based on private API.
   *
   * @exports nmodule/midiTest/rc/mockBajaOps
   */
  var exports = {};

  /**
   * Add a new component slot.
   * @param {baja.Component} comp
   * @param {string} slot
   * @param {baja.Value} val
   * @param {baja.Subscriber} [sub] subscriber "mock-subscribed" to component
   */
  exports.add = function (comp, slot, val, sub) {
    comp.add({ slot: slot, value: val });
    fireHandlers(comp, sub, 'added', comp.getSlot(slot));
  };

  /**
   * Fire a component Topic.
   * @param {baja.Component} comp
   * @param {string} slot
   * @param {baja.Value} val
   * @param {baja.Subscriber} [sub] subscriber "mock-subscribed" to component
   */
  exports.fireTopic = function (comp, slot, val, sub) {
    fireHandlers(comp, sub, 'topicFired', comp.getSlot(slot), val);
  };

  /**
   * Remove a component slot.
   * @param {baja.Component} comp
   * @param {string} slot
   * @param {baja.Subscriber} [sub] subscriber "mock-subscribed" to component
   */
  exports.remove = function (comp, slot, sub) {
    var oldSlot = comp.getSlot(slot),
        oldVal = comp.get(slot);
    comp.remove({ slot: slot });
    fireHandlers(comp, sub, 'removed', oldSlot, oldVal);
  };

  /**
   * Reorder component slots.
   * @param {baja.Component} comp
   * @param {Array.<String>} props
   * @param {baja.Subscriber} [sub] subscriber "mock-subscribed" to component
   */
  exports.reorder = function (comp, props, sub) {
    comp.reorder({ dynamicProperties: props });
    fireHandlers(comp, sub, 'reordered');
  };

  /**
   * Rename a component slot.
   * @param {baja.Component} comp
   * @param {string} slot
   * @param {string} newName
   * @param {baja.Subscriber} [sub] subscriber "mock-subscribed" to component
   */
  exports.rename = function (comp, slot, newName, sub) {
    var oldName = comp.getSlot(slot).getName();
    comp.rename({ slot: slot, newName: newName, cx: { displayName: newName } });
    fireHandlers(comp, sub, 'renamed', comp.getSlot(newName), oldName);
  };

  /**
   * Set a slot value.
   * @param {baja.Component} comp
   * @param {string} slot
   * @param {baja.Value} val
   * @param {baja.Subscriber} [sub] subscriber "mock-subscribed" to component
   */
  exports.set = function (comp, slot, val, sub) {
    comp.set({ slot: slot, value: val });
    fireHandlers(comp, sub, 'changed', comp.getSlot(slot));
  };

  return exports;
});