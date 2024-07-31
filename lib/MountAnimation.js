"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var MountAnimation = function (_a) {
    var children = _a.children, mount = _a.mount, params = _a.params, _b = _a.duration, duration = _b === void 0 ? 0 : _b;
    var _c = (0, react_1.useState)(0), load = _c[0], setLoad = _c[1];
    var _d = (0, react_1.useState)(null), element = _d[0], setElement = _d[1];
    var memoElement = (0, react_1.useCallback)(function (param) { return children(param); }, [mount]);
    var elementRef = (0, react_1.useRef)(null);
    var timeOutRef = (0, react_1.useRef)();
    var enEvent = (0, react_1.useCallback)(function () { return setElement(null); }, []);
    var listener = function (e) { return e.target === elementRef.current && enEvent(); };
    (0, react_1.useEffect)(function () {
        if (mount && (params === null || params === void 0 ? void 0 : params.init) && !element) {
            var initChildren = children(__assign({ state: 'init', ref: elementRef }, params === null || params === void 0 ? void 0 : params.init));
            if (initChildren) {
                setElement(initChildren);
                setTimeout(function () { return setLoad(function (v) { return ++v; }); }, 50);
            }
        }
        else if (mount) {
            var openChildren = children(__assign({ state: 'open', ref: elementRef }, params.open));
            if (openChildren) {
                setElement(openChildren);
                if (elementRef.current) {
                    elementRef.current.removeEventListener('animationend', listener);
                    elementRef.current.removeEventListener('transitionend', listener);
                }
                timeOutRef.current && clearTimeout(timeOutRef.current);
            }
        }
        else if (element) {
            var closeChildren = memoElement(__assign({ state: 'close', ref: elementRef }, params === null || params === void 0 ? void 0 : params.close));
            if (closeChildren) {
                setElement(closeChildren);
                if (elementRef.current) {
                    elementRef.current.addEventListener('animationend', listener);
                    elementRef.current.addEventListener('transitionend', listener);
                }
                if (duration)
                    timeOutRef.current = setTimeout(enEvent, duration);
            }
        }
    }, [children, mount, load]);
    return element;
};
exports.default = MountAnimation;
