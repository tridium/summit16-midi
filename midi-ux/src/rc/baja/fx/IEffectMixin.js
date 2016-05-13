/**
 * @module nmodule/midi/rc/baja/fx/IEffectMixin
 */
define(['baja!', 'underscore'], function (baja, _) {
  'use strict';

  function isFunction(func) { return typeof func === 'function'; }

  /**
   * Apply this function to BajaScript type extensions for types that implement
   * `midi:IEffect`.
   *
   * This mixin provides functionality for starting up and stopping effects
   * processing via the Web Audio API. Each component class with this mixin
   * will have an input and output node for wiring together.
   *
   * @mixin
   * @alias module:nmodule/midi/rc/baja/fx/IEffectMixin
   * @extends baja.Component
   */
  var IEffectMixin = {
    /**
     * This function must be implemented. On startup, your effect should
     * generate, at minimum, an input `AudioNode`. It can also specify a
     * separate output `AudioNode`; otherwise, the same node will be used
     * for both input and output.
     *
     * @abstract
     * @returns {Array.<AudioNode>} array containing input and output nodes
     * (length 2) or just one node for both (length 1).
     */
    $startEffect: function () {
      throw new Error('not implemented');
    },

    /**
     * Optionally, shutdown and disconnect any audio nodes being used when the
     * effect is shut down. Input and output audio nodes will always be
     * disconnected.
     * @abstract
     */
    $stopEffect: function () {

    },

    /**
     * Update the state of your effects processing nodes based on this
     * `IEffect` component's slot values. Will be called automatically on
     * startup and `changed` events.
     * @abstract
     */
    $updateEffect: function () {
      throw new Error('not implemented');
    },

    /**
     * Return true if effect processing is started.
     * @returns {boolean}
     */
    isEffectStarted: function () {
      return !!this.$effectStarted;
    },

    /**
     * Start up effect processing. This must be called before the input and
     * output nodes will exist.
     */
    startEffect: function () {
      if (this.$effectStarted) { return; }

      var that = this,
          nodes = that.$startEffect();

      if (!Array.isArray(nodes) || nodes.length < 1) {
        throw new Error('$startEffect must return array of 1 or 2 nodes');
      }

      that.$inNode = nodes[0];
      that.$outNode = nodes[1] || nodes[0];

      that.attach('changed', that.$changedHandler = function () {
        that.updateEffect();
      });

      that.$effectStarted = true;
      that.$updateEffect();
    },

    /**
     * Shut down effects processing and disconnect input and output nodes.
     */
    stopEffect: function () {
      if (!this.$effectStarted) { return; }

      if (isFunction(this.$stopEffect)) { this.$stopEffect(); }

      this.getInputNode().disconnect();
      this.getOutputNode().disconnect();
      this.detach('changed', this.$changedHandler);

      this.$effectStarted = false;
    },

    /**
     * Updates current effect parameters. This will automatically be called in
     * response to BajaScript `changed` events on the `IEffect`. Will have no
     * effect if the effect is not yet started.
     */
    updateEffect: function () {
      if (this.$effectStarted) {
        this.$updateEffect();
      }
    },

    /**
     * Get the input AudioNode. Wire other nodes to this node to apply effects
     * to their output.
     * @returns {AudioNode}
     */
    getInputNode: function () {
      return this.$inNode;
    },

    /**
     * Get the output AudioNode. Wire this to other effects, or to the main
     * audio destination.
     * @returns {AudioNode}
     */
    getOutputNode: function () {
      return this.$outNode;
    }
  };


  function addMixin(comp) {
    if (!baja.hasType(comp, 'baja:Component')) {
      throw new Error('can only apply to Component instances');
    }

    if (!isFunction(comp.$startEffect) ||
        !isFunction(comp.$updateEffect)) {
      throw new Error('component must have $startEffect and $updateEffect functions');
    }

    _.each(IEffectMixin, function (func, name) {
      comp[name] = comp[name] || func;
    });
  }

  return addMixin;
});