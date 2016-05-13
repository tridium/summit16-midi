define(['jquery',
        'Promise',
        'nmodule/js/rc/jasmine/promiseUtils',
        'nmodule/midi/rc/fe/RangeSlider'], function (
         $,
         Promise,
         promiseUtils,
         RangeSlider) {

  'use strict';

  var doPromise = promiseUtils.doPromise,
      addCustomMatchers = promiseUtils.addCustomMatchers;

  describe('nmodule/midi/rc/fe/RangeSlider', function () {
    var ed, dom, input;

    function initFromParams(params) {
      ed = new RangeSlider(params);
      dom = $('<div/>');
      return ed.initialize(dom)
        .then(function () { input = dom.find('input'); });
    }

    beforeEach(function () {
      doPromise(initFromParams());
      addCustomMatchers(this);
    });

    afterEach(function () {
      doPromise(Promise.resolve(ed.isInitialized() && ed.destroy()));
    });

    describe('#doInitialize()', function () {
      it('adds RangeSlider class', function () {
        expect(dom.hasClass('RangeSlider')).toBe(true);
      });

      it('creates an input with type = range', function () {
        expect(input.attr('type')).toBe('range');
      });

      it('sets min, max, and step to defaults of 0/1000/1', function () {
        expect(parseFloat(input.attr('min'))).toBe(0);
        expect(parseFloat(input.attr('max'))).toBe(1000);
        expect(parseFloat(input.attr('step'))).toBe(1);
      });

      it('sets min, max, and step from Properties', function () {
        doPromise(initFromParams({
          properties: { min: 50, max: 150, step: 5 }
        })
          .then(function () {
            expect(parseFloat(input.attr('min'))).toBe(50);
            expect(parseFloat(input.attr('max'))).toBe(150);
            expect(parseFloat(input.attr('step'))).toBe(5);
          }));
      });

      describe('event handler', function () {
        beforeEach(function () {
          doPromise(ed.load(500));
        });

        describe('for input change', function () {
          it('sets self to modified', function () {
            input.trigger('change');
            expect(ed.isModified()).toBe(true);
          });

          it('updates display', function () {
            input.val('750').trigger('change');
            expect(dom.text()).toMatch(/750/);
          });
        });

        describe('for mousewheel', function () {
          it('increments by step for mousewheel up', function () {
            ed.properties().setValue('step', 100);
            input.trigger($.Event('mousewheel', {
              originalEvent: { wheelDelta: 1 }
            }));
            expect(input.val()).toBe('600');
          });

          it('decrements by step for mousewheel down', function () {
            ed.properties().setValue('step', 50);
            input.trigger($.Event('mousewheel', {
              originalEvent: { wheelDelta: -1 }
            }));
            expect(input.val()).toBe('450');
          });
        });
      });
    });

    describe('#doLoad()', function () {
      it('updates input value and display text', function () {
        doPromise(ed.load(244)
          .then(function () {
            expect(input.val()).toBe('244');
            expect(dom.text()).toMatch('244');
          }));
      });

      it('aligns display to the right if value less than midpoint', function () {
        doPromise(ed.load(499)
          .then(function () {
            var display = dom.find('.display');
            expect(display.css('left')).toBe('');
            expect(display.css('right')).toBe('0px');
          }));
      });

      it('aligns display to the left if value greater than midpoint', function () {
        doPromise(ed.load(501)
          .then(function () {
            var display = dom.find('.display');
            expect(display.css('left')).toBe('0px');
            expect(display.css('right')).toBe('');
          }));
      });
    });

    describe('#doRead()', function () {
      it('reads current slider value', function () {
        input.val('401');
        expect(ed.read()).toBeResolvedWith(401);
      });
    });

    describe('#doEnabled()', function () {
      it('enables input when true', function () {
        doPromise(ed.setEnabled(true)
          .then(function () {
            expect(input.prop('disabled')).toBe(false);
          }));
      });

      it('disables input when false', function () {
        doPromise(ed.setEnabled(false)
          .then(function () {
            expect(input.prop('disabled')).toBe(true);
          }));
      });
    });

    describe('#doReadonly()', function () {
      it('sets input readonly when true', function () {
        doPromise(ed.setReadonly(true)
          .then(function () {
            expect(input.prop('readonly')).toBe(true);
          }));
      });

      it('sets input writable when false', function () {
        doPromise(ed.setReadonly(false)
          .then(function () {
            expect(input.prop('readonly')).toBe(false);
          }));
      });
    });

    describe('#doDestroy()', function () {
      it('removes RangeSlider class', function () {
        doPromise(ed.destroy()
          .then(function () {
            expect(dom.hasClass('RangeSlider')).toBe(false);
          }));
      });
    });
  });
});