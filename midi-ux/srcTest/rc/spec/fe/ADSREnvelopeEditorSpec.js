define(['baja!',
        'baja!midi:ADSREnvelope',
        'jquery',
        'Promise',
        'underscore',
        'nmodule/js/rc/jasmine/promiseUtils',
        'nmodule/midi/rc/fe/ADSREnvelopeEditor',
        'nmodule/midi/rc/fe/RangeSlider'], function (
         baja,
         types,
         $,
         Promise,
         _,
         promiseUtils,
         ADSREnvelopeEditor,
         RangeSlider) {

  'use strict';

  var doPromise = promiseUtils.doPromise,
      addCustomMatchers = promiseUtils.addCustomMatchers;

  describe('nmodule/midi/rc/fe/ADSREnvelopeEditor', function () {
    var ed, dom;

    function initFromParams(params) {
      ed = new ADSREnvelopeEditor(params);
      dom = $('<div/>');
      return ed.initialize(dom);
    }

    beforeEach(function () {
      doPromise(initFromParams());
      addCustomMatchers(this);
    });

    describe('#doLoad()', function () {
      it('creates a RangeSlider for attack, delay, sustain, and release', function () {
        doPromise(ed.load(baja.$('midi:ADSREnvelope'))
          .then(function () {
            _.each(ed.getChildWidgets(), function (w) {
              expect(w).toEqual(jasmine.any(RangeSlider));
            });
          }));
      });

      it('loads each field into corresponding slider', function () {
        var a = 101, d = 505, s = 0.9, r = 55,
            env = baja.$('midi:ADSREnvelope', {
              attack: a, delay: d, sustain: s, release: r
            });

        doPromise(ed.load(env)
          .then(function () {
            expect(_.map(ed.getChildWidgets(), function (w) { return w.value(); }))
              .toEqual([ a, d, s, r ]);
          }));
      });
    });

    describe('#doSave()', function () {
      it('commits changes to the loaded ADSREnvelope', function () {
        var a = 101, d = 505, s = 0.9, r = 55,
            vals = [ a, d, s, r ],
            env = baja.$('midi:ADSREnvelope');

        doPromise(ed.load(env)
          .then(function () {
            return Promise.all(_.map(ed.getChildWidgets(), function (w, i) {
              w.setModified(true);
              return w.load(vals[i]);
            }));
          })
          .then(function () {
            return ed.save();
          })
          .then(function () {
            expect(env.get('attack')).toBe(a);
            expect(env.get('delay')).toBe(d);
            expect(env.get('sustain')).toBe(s);
            expect(env.get('release')).toBe(r);
          }));
      });
    });
  });
});