(function($){
    'use strict';

    var Simple = {};

    var Events = Simple.Events = {

        on: function(event, callback, context) {
            var callbacks = this._callbacks || (this._callbacks = {});
            var events = callbacks[event] || (callbacks[event] = []);
            events.push({
                callback: callback,
                context: context
            });
        },

        off: function(event, callback, context) {
            if (!callback && !context) {
                delete this._callbacks[event];
            }
            var events = this._callbacks[event] || [];
            for (var i = 0; i < events.length; i++) {
                if (!(callback && events[i].callback !== callback || context && events[i].context !== context)) {
                    events.splice(i, 1);
                }
            }
        },

        trigger: function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            var callbacks = this._callbacks || {};
            var events = callbacks[event] || [];
            for (var i = 0; i < events.length; i++) {
                events[i].callback.apply(events[i].context || this, args);
            }
        }
    };

    Simple.events = $.extend({}, Events);

    var View = Simple.View = function(options) {
        this.el = options.el || this.el;
        this.$el = $(this.el);
        this.delegateEvents();
        this.initialize(options);
    };

    $.extend(View.prototype, Events, {

        initialize: function() {},

        render: function() {},

        $: function(selector) {
            return this.$el.find(selector);
        },

        delegateEvents: function() {
            if (!this.events) {
                return;
            }
            for (var key in this.events) {
                var methodName = this.events[key],
                    method = $.proxy(this[methodName], this),
                    match = key.match(/^(\w+)(:?\s+(.*))?$/),
                    eventName = match[1],
                    selector = match[2];
                this.$el.on(eventName, selector, method);
            }
        }

    });

    var Model = Simple.Model = function(options) {
        this.attributes = this.defaults || {};
        this.attrs(options || {});
        this.initialize(options);
    };

    $.extend(Model.prototype, Events, {

        initialize: function() {},

        attr: function(name, value) {
            if (typeof value === "undefined") {
                return this.attributes[name];
            } else {
                this.attributes[name] = value;
            }
        },

        attrs: function(attributes) {
            if (typeof attributes === "undefined") {
                return $.extend({}, this.attributes);
            } else {
                $.extend(this.attributes, attributes);
            }
        }
    });

    var Ctor = function() {};

    View.extend = Model.extend = function(properties) {
        var parent = this;
        var child = function() {
            parent.apply(this, arguments);
        };

        Ctor.prototype = parent.prototype;
        child.prototype = new Ctor;
        $.extend(child.prototype, properties);
        child.extend = parent.extend;
        return child;
    };

    this.Simple = Simple;
}).call(this, $);
