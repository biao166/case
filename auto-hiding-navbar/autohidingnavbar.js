(function(win, doc, undefined) {
    'use strict';

    var _scrollThrottleTimer = null,
        _resizeThrottleTimer = null,
        _throttleDelay = 70,
        _lastScrollHandlerRun = 0,
        _previousScrollTop = null,
        _winHeight = win.innerHeight,
        _visible = true,
        _hideOffset,
        defaults = {
            disableAutohide: false,
            showOnUpscroll: true,
            showOnBottom: true,
            hideOffset: 'auto', // "auto" means the navbar height
            animationDuration: 200
        };

    var dummyStyle = document.createElement('div').style,
        vendor = (function() {
            var vendors = 't,webkitT,MozT,msT,OT'.split(','),
                t,
                i = 0,
                l = vendors.length;
            for (; i < l; i++) {
                t = vendors[i] + 'ransform';
                if (t in dummyStyle) {
                    return vendors[i].substr(0, vendors[i].length - 1);
                }
            }
            return false;
        })(),
        prefixStyle = function(style) {
            if (vendor === '') return style;
            style = style.charAt(0).toUpperCase() + style.substr(1);
            return vendor + style;
        },
        transform = prefixStyle('transform'),
        transitionDuration = prefixStyle('transitionDuration'),
        translate = function(elem, x, y, duration) {
            x = x || 0;
            y = y || 0;
            elem.style[transitionDuration] = duration + 'ms';
            elem.style[transform] = 'translate3d(' + x + 'px, ' + y + 'px, 0px)';
        },

        extend = function(obj) {
            var source, prop;
            for (var i = 1, length = arguments.length; i < length; i++) {
                source = arguments[i];
                for (prop in source) {
                    if (hasOwnProperty.call(source, prop)) {
                        obj[prop] = source[prop];
                    }
                }
            }
            return obj;
        };

    function hide(autoNav) {
        if (!_visible) {
            return;
        }

        translate(autoNav.element, 0, -autoNav.elementHeight, autoNav.settings.animationDuration);
        _visible = false;
    }

    function show(autoNav) {
        if (_visible) {
            return;
        }

        translate(autoNav.element, 0, 0, autoNav.settings.animationDuration);
        _visible = true;
    }

    function detectState(autoNav) {
        var scrollTop = window.document.body.scrollTop,
            scrollDelta = scrollTop - _previousScrollTop;

        _previousScrollTop = scrollTop;

        if (scrollDelta < 0) {
            if (_visible) {
                return;
            }

            if (autoNav.settings.showOnUpscroll || scrollTop <= _hideOffset) {
                show(autoNav);
            }
        } else if (scrollDelta > 0) {
            if (!_visible) {
                if (autoNav.settings.showOnBottom && scrollTop + _winHeight === document.body.clientHeight) {
                    show(autoNav);
                }
                return;
            }

            if (scrollTop >= _hideOffset) {
                hide(autoNav);
            }
        }
    }

    function AutoNav(element, options) {
        this.element = doc.querySelector(element);
        this.elementHeight = this.element.offsetHeight;
        this.settings = extend({}, defaults, options);
        this.init();
        dummyStyle = null;
    }

    AutoNav.prototype = {
        init: function() {
            _hideOffset = this.settings.hideOffset === 'auto' ? this.elementHeight : this.settings.hideOffset;

            this._bind();
            return this.element;
        },

        _bind: function() {
            doc.addEventListener('scroll', this, false);
            win.addEventListener('resize', this, false);
        },

        _unbind: function() {
            doc.removeEventListener('scroll', this, false);
            win.removeEventListener('resize', this, false);
        },

        handleEvent: function(event) {
            console.log(event);

            var me = this;

            if (this.settings.disableAutohide) {
                return;
            }

            if (event.type == 'scroll') {
                if (Date.now() - _lastScrollHandlerRun > _throttleDelay) {
                    _lastScrollHandlerRun = Date.now();
                    detectState(me);
                } else {
                    clearTimeout(_scrollThrottleTimer);
                    _scrollThrottleTimer = setTimeout(function() {
                        _lastScrollHandlerRun = Date.now();
                        detectState(me);
                    }, _throttleDelay);
                }
            } else if (event.type == 'resize') {
                clearTimeout(_resizeThrottleTimer);
                _resizeThrottleTimer = setTimeout(function() {
                    _winHeight = window.innerHeight;
                }, _throttleDelay);
            }
        },

        show: function() {
            show(this);
            return this.element;
        },
        hide: function() {
            hide(this);
            return this.element;
        },
        destroy: function() {
            this._unbind();
            show(this);
            return this.element;
        }
    };

    win.AutoHidingNavbar = AutoNav;
})(window, document);
