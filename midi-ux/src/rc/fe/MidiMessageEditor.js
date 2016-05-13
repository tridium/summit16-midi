/**
 * @module nmodule/midi/rc/fe/MidiMessageEditor
 */
define(['baja!',
        'baja!midi:MidiMessage',
        'underscore',
        'nmodule/webEditors/rc/fe/baja/BaseEditor'], function (
         baja,
         types,
         _,
         BaseEditor) {

  'use strict';

  /**
   * Editor to allow hand-entering hex codes to form a `midi:MidiMessage`
   * instance.
   *
   * @class
   * @extends module:nmodule/webEditors/rc/fe/baja/BaseEditor
   * @alias module:nmodule/midi/rc/fe/MidiMessageEditor
   */
  var MidiMessageEditor = function MidiMessageEditor() {
    BaseEditor.apply(this, arguments);
  };
  MidiMessageEditor.prototype = Object.create(BaseEditor.prototype);
  MidiMessageEditor.prototype.constructor = MidiMessageEditor;

  /**
   * Set up text field and arm event handlers.
   * @param {jQuery} dom
   */
  MidiMessageEditor.prototype.doInitialize = function (dom) {
    var that = this;
    dom.html('<input type="text">');
    dom.on('change', 'input', function () {
      that.setModified(true);
      return false;
    });
  };

  /**
   * Load the hex codes of the `MidiMessage` into the text editor.
   * @param {module:nmodule/midi/rc/baja/MidiMessage} msg
   */
  MidiMessageEditor.prototype.doLoad = function (msg) {
    this.jq().children('input').val(msg.encodeToString());
  };

  /**
   * Read a `MidiMessage` instance from the user-entered hex codes.
   * @returns {module:nmodule/midi/rc/baja/MidiMessage}
   */
  MidiMessageEditor.prototype.doRead = function () {
    var str = this.jq().children('input').val(),
        bytes = str.split(' ').map(function (s) { return parseInt(s, 16); });
    if (_.some(bytes, isNaN)) { throw new Error('invalid string: ' + str); }
    return baja.$('midi:MidiMessage', bytes);
  };

  return MidiMessageEditor;
});