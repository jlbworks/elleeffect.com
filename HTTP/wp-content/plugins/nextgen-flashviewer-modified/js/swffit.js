/**
*	swffit v2.4 beta (2010/01/18) <http://swffit.millermedeiros.com/>
*	Copyright (c) 2010 Miller Medeiros <http://www.millermedeiros.com/>
*	This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
*/
var swffit = function() {
    var win = window,
    doc = document,
    html = doc.getElementsByTagName("html")[0],
    AGENT = navigator.userAgent.toLowerCase(),
    WK = /webkit/.test(AGENT),
    IE = /msie/.test(AGENT) && !win.opera,
    FF = /firefox/.test(AGENT) && !win.opera,
    UNDEF = "undefined",
    _ft,
    _re,
    _t,
    _mw,
    _mh,
    _xw,
    _xh,
    _hc,
    _vc,
    _ow,
    _oh;
    swfobject.createCSS("object", "position:absolute; outline:none");
    function fit(t, mw, mh, xw, xh, hc, vc) {
        mw = mw || _ow;
        mh = mh || _oh;
        xw = xw || null;
        xh = xh || null;
        hc = (hc || hc == null);
        vc = (vc || vc == null);
        configure({
            target: t,
            minWid: mw,
            minHei: mh,
            maxWid: xw,
            maxHei: xh,
            hCenter: hc,
            vCenter: vc
        });
    }
    function configure(o) {
        var evalNum = function(v, p) {
            return (typeof o[p] != UNDEF) ? o[p] : v;
        },
        evalBool = function(v, p) {
            return (o[p] || (v && typeof o[p] == UNDEF));
        };
        _mw = evalNum(_mw, "minWid");
        _mh = evalNum(_mh, "minHei");
        _xw = evalNum(_xw, "maxWid");
        _xh = evalNum(_xh, "maxHei");
        _hc = evalBool(_hc, "hCenter");
        _vc = evalBool(_vc, "vCenter");
        if (o.target && (o.target != _t)) {
            _t = o.target;
            swfobject.addDomLoadEvent(initFit);
            if (IE) {
                swfobject.addLoadEvent(initFit);
            }
        } else {
            startFit();
        }
    }
    function initFit() {
        if (!html.style.overflowX) {
            controlScroll(0, 0);
        }
        if (!html.style.overflowY) {
            controlScroll(0, 1);
        }
        html.style.height = doc.body.style.height = "100%";
        doc.body.style.margin = doc.body.style.padding = 0;
        var st = "width:100%; height:100%";
        st += (IE) ? "; overflow:hidden": "";
        swfobject.createCSS("#" + _t, st);
        _ft = doc.getElementById(_t);
        _ft = (_ft != UNDEF && FF && /object/.test(_ft.innerHTML)) ? doc.getElementById(_t).getElementsByTagName("object")[0] : _ft;
        _ow = _ft.width;
        _oh = _ft.height;
        _mw = _mw || _ow;
        _mh = _mh || _oh;
        startFit();
    }
    function startFit() {
        setSize();
        if (!_re) {
            swffit.addResizeEvent(setSize);
            _re = 1;
        }
    }
    function stopFit(w, h) {
        if (_re) {
            swffit.removeResizeEvent(setSize);
            _re = 0;
            setStyle("top", "auto");
            setStyle("left", "auto");
            setStyle("marginTop", 0);
            setStyle("marginLeft", 0);
            w = w || "100%";
            h = h || "100%";
            setWidth(w);
            setHeight(h);
            forceRedraw();
        }
    }
    function forceRedraw() {
        if (WK) {
            _ft.style.paddingBottom = "1px";
            _ft.style.paddingBottom = "0";
        }
    }
    function controlResizeEvent(a, fn) {
        var p = (a) ? ["addEventListener", "attachEvent"] : ["removeEventListener", "detachEvent"];
        if (win[p[0]]) {
            win[p[0]]("resize", fn, false);
        } else {
            if (win[p[1]]) {
                win[p[1]]("onresize", fn);
            }
        }
    }
    function setWidth(w) {
        var v = (isNaN(w)) ? w: w + "px";
        setStyle("width", v);
    }
    function setHeight(h) {
        var v = (isNaN(h)) ? h: h + "px";
        setStyle("height", v);
    }
    function setStyle(p, v) {
        _ft.style[p] = v;
    }
    function setSize() {
        var iw = (win.innerWidth) ? win.innerWidth: ((doc.documentElement.clientWidth) ? doc.documentElement.clientWidth: doc.body.clientWidth),
        ih = (win.innerHeight) ? win.innerHeight: ((doc.documentElement.clientHeight) ? doc.documentElement.clientHeight: doc.body.clientHeight);
        iw -= (!IE && ih <= _mh) ? 18: 0;
        ih -= (!IE && iw <= _mw) ? 18: 0;
        if (_xw && iw >= _xw) {
            setWidth(_xw);
            setPosition(0, 1);
        } else {
            if (iw > _mw && (iw < _xw || !_xw)) {
                setWidth("100%");
            } else {
                setWidth(_mw);
            }
            setPosition(0, 0);
        }
        if (_xh && ih >= _xh) {
            setHeight(_xh);
            setPosition(1, 1);
        } else {
            if (ih > _mh && (ih < _xh || !_xh)) {
                setHeight("100%");
            } else {
                setHeight(_mh);
            }
            setPosition(1, 0);
        }
        forceRedraw();
    }
    function setPosition(t, x) {
        var p,
        m;
        if (t) {
            p = (x && _vc) ? "50%": "auto";
            m = (x && _vc) ? -(_xh * 0.5) + "px": 0;
            setStyle("top", p);
            setStyle("marginTop", m);
        } else {
            p = (x && _hc) ? "50%": "auto";
            m = (x && _hc) ? -(_xw * 0.5) + "px": 0;
            setStyle("left", p);
            setStyle("marginLeft", m);
        }
    }
    function controlScroll(s, v) {
        var p = (v) ? "overflowY": "overflowX";
        html.style[p] = (s) ? "scroll": "auto";
    }
    function getValueOf(p) {
        var o = {
            target: _t,
            minWid: _mw,
            minHei: _mh,
            maxWid: _xw,
            maxHei: _xh,
            hCenter: _hc,
            vCenter: _vc
        };
        return o[p];
    }
    return {
        fit: fit,
        configure: configure,
        startFit: startFit,
        stopFit: stopFit,
        getValueOf: getValueOf,
        addResizeEvent: function(fn) {
            controlResizeEvent(1, fn);
        },
        removeResizeEvent: function(fn) {
            controlResizeEvent(0, fn);
        },
        showScrollH: function() {
            controlScroll(1, 0);
        },
        showScrollV: function() {
            controlScroll(1, 1);
        },
        getScrollTop: function() {
            return doc.body.scrollTop ? doc.body.scrollTop: (win.pageYOffset ? win.pageYOffset: (doc.body.parentElement ? doc.body.parentElement.scrollTop: 0));
        },
        getScrollLeft: function() {
            return doc.body.scrollLeft ? doc.body.scrollLeft: (win.pageXOffset ? win.pageXOffset: (doc.body.parentElement ? doc.body.parentElement.scrollLeft: 0));
        }
    };
} ();