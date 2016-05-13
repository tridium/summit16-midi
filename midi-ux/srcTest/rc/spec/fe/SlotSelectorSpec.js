define(['baja!',
        'jquery',
        'Promise',
        'underscore',
        'nmodule/js/rc/jasmine/promiseUtils',
        'nmodule/midi/rc/fe/SlotSelector',
        'nmodule/midiTest/rc/mockBajaOps'], function (
         baja,
         $,
         Promise,
         _,
         promiseUtils,
         SlotSelector,
         ops) {

  'use strict';

  var doPromise = promiseUtils.doPromise,
      addCustomMatchers = promiseUtils.addCustomMatchers;

  describe('nmodule/midi/rc/fe/SlotSelector', function () {
    var ed, dom, select;

    function initFromParams(params) {
      ed = new SlotSelector(params);
      dom = $('<div/>');
      return ed.initialize(dom)
        .then(function () { select = dom.find('select'); });
    }

    beforeEach(function () {
      addCustomMatchers(this);
      doPromise(initFromParams());
    });

    afterEach(function () {
      doPromise(Promise.resolve(ed.isInitialized() && ed.destroy()));
    });

    describe('#doInitialize()', function () {
      describe('event handler', function () {
        it('marks editor as modified when selection changed', function () {
          select.trigger('change');
          expect(ed.isModified()).toBe(true);
        });

        describe('for baja events', function () {
          var comp, sub;
          beforeEach(function () {
            comp = baja.$('baja:Component', {
              a: 'aVal', b: 'bVal', c: 'cVal'
            });
            sub = ed.getSubscriber();
            doPromise(ed.load(comp));
          });

          it('rebuilds for added slot', function () {
            ops.add(comp, 'd', 'dVal', sub);
            expect(select.text()).toBe('abcd');
          });

          it('rebuilds for removed slot', function () {
            ops.remove(comp, 'c', sub);
            expect(select.text()).toBe('ab');
          });

          it('rebuilds for renamed slot', function () {
            ops.rename(comp, 'b', 'newB', sub);
            expect(select.text()).toBe('anewBc');
          });

          it('rebuilds for reordered slots', function () {
            ops.reorder(comp, [ 'c', 'a', 'b' ], sub);
            expect(select.text()).toBe('cab');
          });
        });
      });
    });

    describe('#doLoad()', function () {
      it('creates a select option for all slots if no targetType', function () {
        doPromise(ed.load(baja.$('baja:Component', {
          a: 'aVal', b: 'bVal', c: 'cVal'
        }))
          .then(function () {
            var options = select.children('option');
            expect(options.length).toBe(3);
            expect(options.eq(0).text()).toBe('a');
            expect(options.eq(0).val()).toBe('a');
            expect(options.eq(1).text()).toBe('b');
            expect(options.eq(1).val()).toBe('b');
            expect(options.eq(2).text()).toBe('c');
            expect(options.eq(2).val()).toBe('c');
          }));
      });

      it('creates a select option only for slots matching targetType', function () {
        doPromise(initFromParams({ properties: { targetType: 'baja:String' } })
          .then(function () {
            return ed.load(baja.$('baja:Component', {
              string: 'string', double: 0, boolean: false
            }));
          })
          .then(function () {
            expect(select.children('option').length).toBe(1);
            expect(select.text()).toBe('string');
          }));
      });

      it('safely escapes slot name', function () {
        var comp = baja.$('baja:Component');
        comp.add({ slot: baja.SlotPath.escape('<br/>'), value: 'val' });
        doPromise(ed.load(comp)
          .then(function () {
            expect(select.children('option').val())
              .toBe(baja.SlotPath.escape('<br/>'));
          }));
      });

      it('safely escapes display name', function () {
        var comp = baja.$('baja:Component', { a: 'a' });
        spyOn(comp, 'getDisplayName').andReturn('<br/>');
        doPromise(ed.load(comp)
          .then(function () {
            expect(select.children('option').text()).toBe('<br/>');
          }));
      });
    });

    describe('#doRead()', function () {
      it('returns the value of the selected slot', function () {
        var comp = baja.$('baja:Component', {
          a: 'aVal', b: 'bVal', c: 'cVal'
        });

        expect(ed.load(comp)
          .then(function () {
            select.val('c');
            return ed.read();
          }))
          .toBeResolvedWith('cVal');
      });
    });

    describe('#setSelectedSlot()', function () {
      it('does nothing if no component loaded yet', function () {
        ed.setSelectedSlot('a');
        expect(select.val()).toBe(null);
      });

      it('sets the currently selected slot of loaded component', function () {
        expect(ed.load(baja.$('baja:Component', { a: 'aVal', b: 'bVal' }))
          .then(function () {
            ed.setSelectedSlot('b');
            return ed.read();
          })).toBeResolvedWith('bVal');
      });

      it('does nothing if slot is not on component', function () {
        expect(ed.load(baja.$('baja:Component', { a: 'aVal', b: 'bVal' }))
          .then(function () {
            ed.setSelectedSlot('x');
            return ed.read();
          })).toBeResolvedWith('aVal');
      });
    });
  });
});