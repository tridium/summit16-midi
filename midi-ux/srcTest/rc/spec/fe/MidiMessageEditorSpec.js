define(['baja!',
        'baja!midi:MidiMessage',
        'jquery',
        'Promise',
        'nmodule/js/rc/jasmine/promiseUtils',
        'nmodule/midi/rc/fe/MidiMessageEditor'], function (
         baja,
         types,
         $,
         Promise,
         promiseUtils,
         MidiMessageEditor) {

  'use strict';

  var doPromise = promiseUtils.doPromise,
      addCustomMatchers = promiseUtils.addCustomMatchers;

  describe('nmodule/midi/rc/fe/MidiMessageEditor', function () {
    var ed, dom, input;

    function initFromParams(params) {
      ed = new MidiMessageEditor(params);
      dom = $('<div/>');
      return ed.initialize(dom)
        .then(function () {
          input = dom.children('input');
        });
    }

    beforeEach(function () {
      addCustomMatchers(this);
      doPromise(initFromParams());
    });

    afterEach(function () {
      doPromise(Promise.resolve(ed.isInitialized() && ed.destroy()));
    });

    describe('#doInitialize()', function () {
      it('creates a text input', function () {
        expect(input.prop('tagName').toLowerCase()).toBe('input');
      });

      describe('event handler', function () {
        it('sets editor to modified when text input is changed', function () {
          input.trigger('change');
          expect(ed.isModified()).toBe(true);
        });
      });
    });

    describe('#doLoad()', function () {
      it('loads hex encoding into text field', function () {
        doPromise(ed.load(baja.$('midi:MidiMessage', [ 0x55, 0xf4 ]))
          .then(function () {
            expect(input.val()).toBe('55 f4');
          }));
      });
    });

    describe('#doRead()', function () {
      it('reads a MidiMessage instance from hex bytes in the text field', function () {
        input.val('46 9a');
        expect(ed.read())
          .toBeResolvedWith(baja.$('midi:MidiMessage', [ 0x46, 0x9a ]));
      });

      it('rejects if not a valid MidiMessage string', function () {
        input.val('so not hex');
        expect(ed.read())
          .toBeRejectedWith(new Error('invalid string: so not hex'));
      });
    });
  });
});