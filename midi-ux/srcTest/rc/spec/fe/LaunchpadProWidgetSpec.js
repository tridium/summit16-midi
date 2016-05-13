/*jshint browser: true */
define(['baja!',
        'baja!midi:MidiDevice,midi:MidiMessage',
        'd3',
        'jquery',
        'Promise',
        'underscore',
        'nmodule/js/rc/jasmine/promiseUtils',
        'nmodule/midi/rc/fe/LaunchpadProWidget',
        'nmodule/midiTest/rc/mockBajaOps'], function (
         baja,
         types,
         d3,
         $,
         Promise,
         _,
         promiseUtils,
         LaunchpadProWidget,
         ops) {

  'use strict';

  var doPromise = promiseUtils.doPromise,
      waitInterval = promiseUtils.waitInterval;

  describe('nmodule/midi/rc/fe/LaunchpadProWidget', function () {
    var ed, dom,

        PINK = 'hsl(0, 35%, 60%)',
        BLUE = 'hsl(185, 40%, 40%)',
        GRAY = 'hsl(0, 0%, 49%)',
        FADE_TIME = 150;

    function initFromParams(params) {
      ed = new LaunchpadProWidget(params);
      dom = $('<div/>');
      return ed.initialize(dom);
    }

    function allButtons() {
      return d3.select(dom.children('svg')[0]).selectAll('rect.squareButton');
    }

    function buttonAt(x, y) {
      return allButtons().filter(function (btn) {
        return btn.x === x && btn.y === y;
      })[0][0];
    }

    function noteOn(noteNumber, velocity) {
      ed.$handleMidiMessage(baja.$('midi:MidiMessage', [
        0x90, noteNumber, velocity
      ]));
    }

    function noteOff(noteNumber) {
      noteOn(noteNumber, 0);
    }

    beforeEach(function () {
      doPromise(initFromParams());
      this.addMatchers({
        toHaveFillColor: function (expected) {
          var fill = this.actual.getAttribute('fill');

          this.message = function (expected) {
            return 'Expected ' + fill + ' to be close to color ' + expected + '.';
          };

          var rgb = d3.rgb(expected),
              actualRgb = d3.rgb(fill),
              threshold = 0x20;
          return Math.abs(rgb.r - actualRgb.r) < threshold &&
                 Math.abs(rgb.g - actualRgb.g) < threshold &&
                 Math.abs(rgb.b - actualRgb.b) < threshold;
        }
      });
    });

    afterEach(function () {
      doPromise(Promise.resolve(ed.isInitialized() && ed.destroy()));
    });

    describe('#doInitialize()', function () {
      function isRootNote(btn) { return btn.noteNumber % 12 === 0; }
      function isWhiteKey(btn) {
        return _.contains([ 2, 4, 5, 7, 9, 11 ], btn.noteNumber % 12);
      }
      function isBlackKey(btn) {
        return !isRootNote(btn) && !isWhiteKey(btn);
      }

      it('creates 64 svg buttons', function () {
        expect(allButtons()[0].length).toBe(64);
      });

      it('sets root notes to pink', function () {
        allButtons().filter(isRootNote)
          .each(function () {
            expect(this).toHaveFillColor(PINK);
          });
      });

      it('sets white keys to blue', function () {
        allButtons().filter(isWhiteKey)
          .each(function () {
            expect(this).toHaveFillColor(BLUE);
          });
      });

      it('sets black keys to gray', function () {
        allButtons().filter(isBlackKey)
          .each(function () {
            expect(this).toHaveFillColor(GRAY);
          });
      });

      it('adds "LaunchpadPro" class', function () {
        expect(dom.hasClass('LaunchpadPro')).toBe(true);
      });
    });

    describe('when a topic is fired', function () {
      var device, sub;
      beforeEach(function () {
        device = baja.$('midi:MidiDevice');
        sub = ed.getSubscriber();
        doPromise(ed.load(device));
      });

      it('handles a note-on MidiMessage', function () {
        ops.fireTopic(device, 'message',
          baja.$('midi:MidiMessage', [ 0x90, 0x24, 0x7f ]), sub);
        doPromise(waitInterval(5)
          .then(function () {
            expect(buttonAt(0, 7)).toHaveFillColor('#f99');
          }));
      });

      it('handles a note-off MidiMessage', function () {
        noteOn(0x24, 127);
        ops.fireTopic(device, 'message',
          baja.$('midi:MidiMessage', [ 0x80, 0x24 ]), sub);
        doPromise(waitInterval(5)
          .then(function () {
            expect(buttonAt(0, 7)).toHaveFillColor(PINK);
          }));
      });
    });

    describe('when a key is pressed', function () {
      it('blinks bottom left button to red', function () {
        noteOn(0x24, 127);
        doPromise(waitInterval(5)
          .then(function () {
            expect(buttonAt(0, 7)).toHaveFillColor('#f99');
          }));
      });

      it('blinks top right button to purple', function () {
        noteOn(0x4e, 127);
        doPromise(waitInterval(5)
          .then(function () {
            expect(buttonAt(7, 0)).toHaveFillColor('#f9f');
          }));
      });

      it('blinks all buttons matching the pressed note number', function () {
        noteOn(0x34, 127);
        doPromise(waitInterval(5)
          .then(function () {
            expect(buttonAt(6, 5)).toHaveFillColor('#af9');
            expect(buttonAt(1, 4)).toHaveFillColor('#af9');
          }));
      });

      it('does not change color much if key pressed lightly', function () {
        noteOn(0x26, 10);
        doPromise(waitInterval(5)
          .then(function () {
            expect(buttonAt(2, 7)).toHaveFillColor(BLUE);
          }));
      });
    });

    describe('when a key is released', function () {
      it('does nothing if key was not already pressed', function () {
        noteOff(0x24);
        doPromise(waitInterval(5)
          .then(function () {
            expect(buttonAt(0, 7)).toHaveFillColor(PINK);
          }));
      });

      it('gradually fades button back to base color', function () {
        noteOn(0x26, 127); //lowest D
        var btn = buttonAt(2, 7);
        doPromise(waitInterval(5)
          .then(function () {
            expect(btn).toHaveFillColor('#fb9');
            noteOff(0x26);
            return waitInterval(5);
          })
          .then(function () {
            expect(btn).toHaveFillColor('#fb9');
            return waitInterval(FADE_TIME);
          })
          .then(function () {
            expect(btn).toHaveFillColor(BLUE);
          }));
      });
    });

    describe('#doDestroy()', function () {
      it('removes "LaunchpadPro" class', function () {
        doPromise(ed.destroy()
          .then(function () {
            expect(dom.hasClass('LaunchpadPro')).toBe(false);
          }));
      });
    });
  });
});