/**
 * @module nmodule/midi/rc/fe/ADSREnvelopeEditor
 */
define(['baja!',
        'nmodule/midi/rc/fe/RangeSlider',
        'nmodule/webEditors/rc/fe/baja/ComplexCompositeEditor',
        'css!nmodule/midi/rc/midi'], function (
         baja,
         RangeSlider,
         ComplexCompositeEditor) {

  'use strict';

  /**
   * This editor uses the (as yet, private) `ComplexCompositeEditor` API to
   * instantiate child editors for every slot on a `midi:ADSREnvelope` instance.
   * @class
   * @extends module:nmodule/webEditors/rc/fe/baja/ComplexCompositeEditor
   * @alias module:nmodule/midi/rc/fe/ADSREnvelopeEditor
   */
  var ADSREnvelopeEditor = function ADSREnvelopeEditor() {
    ComplexCompositeEditor.apply(this, arguments);
  };
  ADSREnvelopeEditor.prototype = Object.create(ComplexCompositeEditor.prototype);
  ADSREnvelopeEditor.prototype.constructor = ADSREnvelopeEditor;

  /**
   * For every value on the `ADSREnvelope`, instantiate a `RangeSlider` editor.
   * @returns {Function}
   */
  ADSREnvelopeEditor.prototype.getSlotFilter = function () {
    return function (slot) {
      return {
        type: RangeSlider,
        properties: {
          label: this.getDisplayName(slot)
        }
      };
    };
  };

  return ADSREnvelopeEditor;
});