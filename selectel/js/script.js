"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* @preserve
 * The MIT License (MIT)
 * 
 * Copyright (c) 2013-2017 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */

/**
 * bluebird build version 3.5.0
 * Features enabled: core, race, call_get, generators, map, nodeify, promisify, props, reduce, settle, some, using, timers, filter, any, each
*/
!function (t) {
  if ("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module) module.exports = t();else if ("function" == typeof define && define.amd) define([], t);else {
    var e;
    "undefined" != typeof window ? e = window : "undefined" != typeof global ? e = global : "undefined" != typeof self && (e = self), e.Promise = t();
  }
}(function () {
  var t, e, n;
  return function r(t, e, n) {
    function i(s, a) {
      if (!e[s]) {
        if (!t[s]) {
          var c = "function" == typeof _dereq_ && _dereq_;
          if (!a && c) return c(s, !0);
          if (o) return o(s, !0);
          var l = new Error("Cannot find module '" + s + "'");
          throw l.code = "MODULE_NOT_FOUND", l;
        }

        var u = e[s] = {
          exports: {}
        };
        t[s][0].call(u.exports, function (e) {
          var n = t[s][1][e];
          return i(n ? n : e);
        }, u, u.exports, r, t, e, n);
      }

      return e[s].exports;
    }

    for (var o = "function" == typeof _dereq_ && _dereq_, s = 0; s < n.length; s++) {
      i(n[s]);
    }

    return i;
  }({
    1: [function (t, e, n) {
      "use strict";

      e.exports = function (t) {
        function e(t) {
          var e = new n(t),
              r = e.promise();
          return e.setHowMany(1), e.setUnwrap(), e.init(), r;
        }

        var n = t._SomePromiseArray;
        t.any = function (t) {
          return e(t);
        }, t.prototype.any = function () {
          return e(this);
        };
      };
    }, {}],
    2: [function (t, e, n) {
      "use strict";

      function r() {
        this._customScheduler = !1, this._isTickUsed = !1, this._lateQueue = new u(16), this._normalQueue = new u(16), this._haveDrainedQueues = !1, this._trampolineEnabled = !0;
        var t = this;
        this.drainQueues = function () {
          t._drainQueues();
        }, this._schedule = l;
      }

      function i(t, e, n) {
        this._lateQueue.push(t, e, n), this._queueTick();
      }

      function o(t, e, n) {
        this._normalQueue.push(t, e, n), this._queueTick();
      }

      function s(t) {
        this._normalQueue._pushOne(t), this._queueTick();
      }

      var a;

      try {
        throw new Error();
      } catch (c) {
        a = c;
      }

      var l = t("./schedule"),
          u = t("./queue"),
          p = t("./util");
      r.prototype.setScheduler = function (t) {
        var e = this._schedule;
        return this._schedule = t, this._customScheduler = !0, e;
      }, r.prototype.hasCustomScheduler = function () {
        return this._customScheduler;
      }, r.prototype.enableTrampoline = function () {
        this._trampolineEnabled = !0;
      }, r.prototype.disableTrampolineIfNecessary = function () {
        p.hasDevTools && (this._trampolineEnabled = !1);
      }, r.prototype.haveItemsQueued = function () {
        return this._isTickUsed || this._haveDrainedQueues;
      }, r.prototype.fatalError = function (t, e) {
        e ? (process.stderr.write("Fatal " + (t instanceof Error ? t.stack : t) + "\n"), process.exit(2)) : this.throwLater(t);
      }, r.prototype.throwLater = function (t, e) {
        if (1 === arguments.length && (e = t, t = function t() {
          throw e;
        }), "undefined" != typeof setTimeout) setTimeout(function () {
          t(e);
        }, 0);else try {
          this._schedule(function () {
            t(e);
          });
        } catch (n) {
          throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n");
        }
      }, p.hasDevTools ? (r.prototype.invokeLater = function (t, e, n) {
        this._trampolineEnabled ? i.call(this, t, e, n) : this._schedule(function () {
          setTimeout(function () {
            t.call(e, n);
          }, 100);
        });
      }, r.prototype.invoke = function (t, e, n) {
        this._trampolineEnabled ? o.call(this, t, e, n) : this._schedule(function () {
          t.call(e, n);
        });
      }, r.prototype.settlePromises = function (t) {
        this._trampolineEnabled ? s.call(this, t) : this._schedule(function () {
          t._settlePromises();
        });
      }) : (r.prototype.invokeLater = i, r.prototype.invoke = o, r.prototype.settlePromises = s), r.prototype._drainQueue = function (t) {
        for (; t.length() > 0;) {
          var e = t.shift();

          if ("function" == typeof e) {
            var n = t.shift(),
                r = t.shift();
            e.call(n, r);
          } else e._settlePromises();
        }
      }, r.prototype._drainQueues = function () {
        this._drainQueue(this._normalQueue), this._reset(), this._haveDrainedQueues = !0, this._drainQueue(this._lateQueue);
      }, r.prototype._queueTick = function () {
        this._isTickUsed || (this._isTickUsed = !0, this._schedule(this.drainQueues));
      }, r.prototype._reset = function () {
        this._isTickUsed = !1;
      }, e.exports = r, e.exports.firstLineError = a;
    }, {
      "./queue": 26,
      "./schedule": 29,
      "./util": 36
    }],
    3: [function (t, e, n) {
      "use strict";

      e.exports = function (t, e, n, r) {
        var i = !1,
            o = function o(t, e) {
          this._reject(e);
        },
            s = function s(t, e) {
          e.promiseRejectionQueued = !0, e.bindingPromise._then(o, o, null, this, t);
        },
            a = function a(t, e) {
          0 === (50397184 & this._bitField) && this._resolveCallback(e.target);
        },
            c = function c(t, e) {
          e.promiseRejectionQueued || this._reject(t);
        };

        t.prototype.bind = function (o) {
          i || (i = !0, t.prototype._propagateFrom = r.propagateFromFunction(), t.prototype._boundValue = r.boundValueFunction());
          var l = n(o),
              u = new t(e);

          u._propagateFrom(this, 1);

          var p = this._target();

          if (u._setBoundTo(l), l instanceof t) {
            var h = {
              promiseRejectionQueued: !1,
              promise: u,
              target: p,
              bindingPromise: l
            };
            p._then(e, s, void 0, u, h), l._then(a, c, void 0, u, h), u._setOnCancel(l);
          } else u._resolveCallback(p);

          return u;
        }, t.prototype._setBoundTo = function (t) {
          void 0 !== t ? (this._bitField = 2097152 | this._bitField, this._boundTo = t) : this._bitField = -2097153 & this._bitField;
        }, t.prototype._isBound = function () {
          return 2097152 === (2097152 & this._bitField);
        }, t.bind = function (e, n) {
          return t.resolve(n).bind(e);
        };
      };
    }, {}],
    4: [function (t, e, n) {
      "use strict";

      function r() {
        try {
          Promise === o && (Promise = i);
        } catch (t) {}

        return o;
      }

      var i;
      "undefined" != typeof Promise && (i = Promise);
      var o = t("./promise")();
      o.noConflict = r, e.exports = o;
    }, {
      "./promise": 22
    }],
    5: [function (t, e, n) {
      "use strict";

      var r = Object.create;

      if (r) {
        var i = r(null),
            o = r(null);
        i[" size"] = o[" size"] = 0;
      }

      e.exports = function (e) {
        function n(t, n) {
          var r;

          if (null != t && (r = t[n]), "function" != typeof r) {
            var i = "Object " + a.classString(t) + " has no method '" + a.toString(n) + "'";
            throw new e.TypeError(i);
          }

          return r;
        }

        function r(t) {
          var e = this.pop(),
              r = n(t, e);
          return r.apply(t, this);
        }

        function i(t) {
          return t[this];
        }

        function o(t) {
          var e = +this;
          return 0 > e && (e = Math.max(0, e + t.length)), t[e];
        }

        var s,
            a = t("./util"),
            c = a.canEvaluate;
        a.isIdentifier;
        e.prototype.call = function (t) {
          var e = [].slice.call(arguments, 1);
          return e.push(t), this._then(r, void 0, void 0, e, void 0);
        }, e.prototype.get = function (t) {
          var e,
              n = "number" == typeof t;
          if (n) e = o;else if (c) {
            var r = s(t);
            e = null !== r ? r : i;
          } else e = i;
          return this._then(e, void 0, void 0, t, void 0);
        };
      };
    }, {
      "./util": 36
    }],
    6: [function (t, e, n) {
      "use strict";

      e.exports = function (e, n, r, i) {
        var o = t("./util"),
            s = o.tryCatch,
            a = o.errorObj,
            c = e._async;
        e.prototype["break"] = e.prototype.cancel = function () {
          if (!i.cancellation()) return this._warn("cancellation is disabled");

          for (var t = this, e = t; t._isCancellable();) {
            if (!t._cancelBy(e)) {
              e._isFollowing() ? e._followee().cancel() : e._cancelBranched();
              break;
            }

            var n = t._cancellationParent;

            if (null == n || !n._isCancellable()) {
              t._isFollowing() ? t._followee().cancel() : t._cancelBranched();
              break;
            }

            t._isFollowing() && t._followee().cancel(), t._setWillBeCancelled(), e = t, t = n;
          }
        }, e.prototype._branchHasCancelled = function () {
          this._branchesRemainingToCancel--;
        }, e.prototype._enoughBranchesHaveCancelled = function () {
          return void 0 === this._branchesRemainingToCancel || this._branchesRemainingToCancel <= 0;
        }, e.prototype._cancelBy = function (t) {
          return t === this ? (this._branchesRemainingToCancel = 0, this._invokeOnCancel(), !0) : (this._branchHasCancelled(), this._enoughBranchesHaveCancelled() ? (this._invokeOnCancel(), !0) : !1);
        }, e.prototype._cancelBranched = function () {
          this._enoughBranchesHaveCancelled() && this._cancel();
        }, e.prototype._cancel = function () {
          this._isCancellable() && (this._setCancelled(), c.invoke(this._cancelPromises, this, void 0));
        }, e.prototype._cancelPromises = function () {
          this._length() > 0 && this._settlePromises();
        }, e.prototype._unsetOnCancel = function () {
          this._onCancelField = void 0;
        }, e.prototype._isCancellable = function () {
          return this.isPending() && !this._isCancelled();
        }, e.prototype.isCancellable = function () {
          return this.isPending() && !this.isCancelled();
        }, e.prototype._doInvokeOnCancel = function (t, e) {
          if (o.isArray(t)) for (var n = 0; n < t.length; ++n) {
            this._doInvokeOnCancel(t[n], e);
          } else if (void 0 !== t) if ("function" == typeof t) {
            if (!e) {
              var r = s(t).call(this._boundValue());
              r === a && (this._attachExtraTrace(r.e), c.throwLater(r.e));
            }
          } else t._resultCancelled(this);
        }, e.prototype._invokeOnCancel = function () {
          var t = this._onCancel();

          this._unsetOnCancel(), c.invoke(this._doInvokeOnCancel, this, t);
        }, e.prototype._invokeInternalOnCancel = function () {
          this._isCancellable() && (this._doInvokeOnCancel(this._onCancel(), !0), this._unsetOnCancel());
        }, e.prototype._resultCancelled = function () {
          this.cancel();
        };
      };
    }, {
      "./util": 36
    }],
    7: [function (t, e, n) {
      "use strict";

      e.exports = function (e) {
        function n(t, n, a) {
          return function (c) {
            var l = a._boundValue();

            t: for (var u = 0; u < t.length; ++u) {
              var p = t[u];

              if (p === Error || null != p && p.prototype instanceof Error) {
                if (c instanceof p) return o(n).call(l, c);
              } else if ("function" == typeof p) {
                var h = o(p).call(l, c);
                if (h === s) return h;
                if (h) return o(n).call(l, c);
              } else if (r.isObject(c)) {
                for (var f = i(p), _ = 0; _ < f.length; ++_) {
                  var d = f[_];
                  if (p[d] != c[d]) continue t;
                }

                return o(n).call(l, c);
              }
            }

            return e;
          };
        }

        var r = t("./util"),
            i = t("./es5").keys,
            o = r.tryCatch,
            s = r.errorObj;
        return n;
      };
    }, {
      "./es5": 13,
      "./util": 36
    }],
    8: [function (t, e, n) {
      "use strict";

      e.exports = function (t) {
        function e() {
          this._trace = new e.CapturedTrace(r());
        }

        function n() {
          return i ? new e() : void 0;
        }

        function r() {
          var t = o.length - 1;
          return t >= 0 ? o[t] : void 0;
        }

        var i = !1,
            o = [];
        return t.prototype._promiseCreated = function () {}, t.prototype._pushContext = function () {}, t.prototype._popContext = function () {
          return null;
        }, t._peekContext = t.prototype._peekContext = function () {}, e.prototype._pushContext = function () {
          void 0 !== this._trace && (this._trace._promiseCreated = null, o.push(this._trace));
        }, e.prototype._popContext = function () {
          if (void 0 !== this._trace) {
            var t = o.pop(),
                e = t._promiseCreated;
            return t._promiseCreated = null, e;
          }

          return null;
        }, e.CapturedTrace = null, e.create = n, e.deactivateLongStackTraces = function () {}, e.activateLongStackTraces = function () {
          var n = t.prototype._pushContext,
              o = t.prototype._popContext,
              s = t._peekContext,
              a = t.prototype._peekContext,
              c = t.prototype._promiseCreated;
          e.deactivateLongStackTraces = function () {
            t.prototype._pushContext = n, t.prototype._popContext = o, t._peekContext = s, t.prototype._peekContext = a, t.prototype._promiseCreated = c, i = !1;
          }, i = !0, t.prototype._pushContext = e.prototype._pushContext, t.prototype._popContext = e.prototype._popContext, t._peekContext = t.prototype._peekContext = r, t.prototype._promiseCreated = function () {
            var t = this._peekContext();

            t && null == t._promiseCreated && (t._promiseCreated = this);
          };
        }, e;
      };
    }, {}],
    9: [function (t, e, n) {
      "use strict";

      e.exports = function (e, n) {
        function r(t, e) {
          return {
            promise: e
          };
        }

        function i() {
          return !1;
        }

        function o(t, e, n) {
          var r = this;

          try {
            t(e, n, function (t) {
              if ("function" != typeof t) throw new TypeError("onCancel must be a function, got: " + H.toString(t));

              r._attachCancellationCallback(t);
            });
          } catch (i) {
            return i;
          }
        }

        function s(t) {
          if (!this._isCancellable()) return this;

          var e = this._onCancel();

          void 0 !== e ? H.isArray(e) ? e.push(t) : this._setOnCancel([e, t]) : this._setOnCancel(t);
        }

        function a() {
          return this._onCancelField;
        }

        function c(t) {
          this._onCancelField = t;
        }

        function l() {
          this._cancellationParent = void 0, this._onCancelField = void 0;
        }

        function u(t, e) {
          if (0 !== (1 & e)) {
            this._cancellationParent = t;
            var n = t._branchesRemainingToCancel;
            void 0 === n && (n = 0), t._branchesRemainingToCancel = n + 1;
          }

          0 !== (2 & e) && t._isBound() && this._setBoundTo(t._boundTo);
        }

        function p(t, e) {
          0 !== (2 & e) && t._isBound() && this._setBoundTo(t._boundTo);
        }

        function h() {
          var t = this._boundTo;
          return void 0 !== t && t instanceof e ? t.isFulfilled() ? t.value() : void 0 : t;
        }

        function f() {
          this._trace = new S(this._peekContext());
        }

        function _(t, e) {
          if (N(t)) {
            var n = this._trace;
            if (void 0 !== n && e && (n = n._parent), void 0 !== n) n.attachExtraTrace(t);else if (!t.__stackCleaned__) {
              var r = j(t);
              H.notEnumerableProp(t, "stack", r.message + "\n" + r.stack.join("\n")), H.notEnumerableProp(t, "__stackCleaned__", !0);
            }
          }
        }

        function d(t, e, n, r, i) {
          if (void 0 === t && null !== e && W) {
            if (void 0 !== i && i._returnedNonUndefined()) return;
            if (0 === (65535 & r._bitField)) return;
            n && (n += " ");
            var o = "",
                s = "";

            if (e._trace) {
              for (var a = e._trace.stack.split("\n"), c = w(a), l = c.length - 1; l >= 0; --l) {
                var u = c[l];

                if (!U.test(u)) {
                  var p = u.match(M);
                  p && (o = "at " + p[1] + ":" + p[2] + ":" + p[3] + " ");
                  break;
                }
              }

              if (c.length > 0) for (var h = c[0], l = 0; l < a.length; ++l) {
                if (a[l] === h) {
                  l > 0 && (s = "\n" + a[l - 1]);
                  break;
                }
              }
            }

            var f = "a promise was created in a " + n + "handler " + o + "but was not returned from it, see http://goo.gl/rRqMUw" + s;

            r._warn(f, !0, e);
          }
        }

        function v(t, e) {
          var n = t + " is deprecated and will be removed in a future version.";
          return e && (n += " Use " + e + " instead."), y(n);
        }

        function y(t, n, r) {
          if (ot.warnings) {
            var i,
                o = new L(t);
            if (n) r._attachExtraTrace(o);else if (ot.longStackTraces && (i = e._peekContext())) i.attachExtraTrace(o);else {
              var s = j(o);
              o.stack = s.message + "\n" + s.stack.join("\n");
            }
            tt("warning", o) || E(o, "", !0);
          }
        }

        function m(t, e) {
          for (var n = 0; n < e.length - 1; ++n) {
            e[n].push("From previous event:"), e[n] = e[n].join("\n");
          }

          return n < e.length && (e[n] = e[n].join("\n")), t + "\n" + e.join("\n");
        }

        function g(t) {
          for (var e = 0; e < t.length; ++e) {
            (0 === t[e].length || e + 1 < t.length && t[e][0] === t[e + 1][0]) && (t.splice(e, 1), e--);
          }
        }

        function b(t) {
          for (var e = t[0], n = 1; n < t.length; ++n) {
            for (var r = t[n], i = e.length - 1, o = e[i], s = -1, a = r.length - 1; a >= 0; --a) {
              if (r[a] === o) {
                s = a;
                break;
              }
            }

            for (var a = s; a >= 0; --a) {
              var c = r[a];
              if (e[i] !== c) break;
              e.pop(), i--;
            }

            e = r;
          }
        }

        function w(t) {
          for (var e = [], n = 0; n < t.length; ++n) {
            var r = t[n],
                i = "    (No stack trace)" === r || q.test(r),
                o = i && nt(r);
            i && !o && ($ && " " !== r.charAt(0) && (r = "    " + r), e.push(r));
          }

          return e;
        }

        function C(t) {
          for (var e = t.stack.replace(/\s+$/g, "").split("\n"), n = 0; n < e.length; ++n) {
            var r = e[n];
            if ("    (No stack trace)" === r || q.test(r)) break;
          }

          return n > 0 && "SyntaxError" != t.name && (e = e.slice(n)), e;
        }

        function j(t) {
          var e = t.stack,
              n = t.toString();
          return e = "string" == typeof e && e.length > 0 ? C(t) : ["    (No stack trace)"], {
            message: n,
            stack: "SyntaxError" == t.name ? e : w(e)
          };
        }

        function E(t, e, n) {
          if ("undefined" != typeof console) {
            var r;

            if (H.isObject(t)) {
              var i = t.stack;
              r = e + Q(i, t);
            } else r = e + String(t);

            "function" == typeof D ? D(r, n) : ("function" == typeof console.log || "object" == _typeof(console.log)) && console.log(r);
          }
        }

        function k(t, e, n, r) {
          var i = !1;

          try {
            "function" == typeof e && (i = !0, "rejectionHandled" === t ? e(r) : e(n, r));
          } catch (o) {
            I.throwLater(o);
          }

          "unhandledRejection" === t ? tt(t, n, r) || i || E(n, "Unhandled rejection ") : tt(t, r);
        }

        function F(t) {
          var e;
          if ("function" == typeof t) e = "[function " + (t.name || "anonymous") + "]";else {
            e = t && "function" == typeof t.toString ? t.toString() : H.toString(t);
            var n = /\[object [a-zA-Z0-9$_]+\]/;
            if (n.test(e)) try {
              var r = JSON.stringify(t);
              e = r;
            } catch (i) {}
            0 === e.length && (e = "(empty array)");
          }
          return "(<" + x(e) + ">, no stack trace)";
        }

        function x(t) {
          var e = 41;
          return t.length < e ? t : t.substr(0, e - 3) + "...";
        }

        function T() {
          return "function" == typeof it;
        }

        function P(t) {
          var e = t.match(rt);
          return e ? {
            fileName: e[1],
            line: parseInt(e[2], 10)
          } : void 0;
        }

        function R(t, e) {
          if (T()) {
            for (var n, r, i = t.stack.split("\n"), o = e.stack.split("\n"), s = -1, a = -1, c = 0; c < i.length; ++c) {
              var l = P(i[c]);

              if (l) {
                n = l.fileName, s = l.line;
                break;
              }
            }

            for (var c = 0; c < o.length; ++c) {
              var l = P(o[c]);

              if (l) {
                r = l.fileName, a = l.line;
                break;
              }
            }

            0 > s || 0 > a || !n || !r || n !== r || s >= a || (nt = function nt(t) {
              if (B.test(t)) return !0;
              var e = P(t);
              return e && e.fileName === n && s <= e.line && e.line <= a ? !0 : !1;
            });
          }
        }

        function S(t) {
          this._parent = t, this._promisesCreated = 0;
          var e = this._length = 1 + (void 0 === t ? 0 : t._length);
          it(this, S), e > 32 && this.uncycle();
        }

        var O,
            A,
            D,
            V = e._getDomain,
            I = e._async,
            L = t("./errors").Warning,
            H = t("./util"),
            N = H.canAttachTrace,
            B = /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/,
            U = /\((?:timers\.js):\d+:\d+\)/,
            M = /[\/<\(](.+?):(\d+):(\d+)\)?\s*$/,
            q = null,
            Q = null,
            $ = !1,
            G = !(0 == H.env("BLUEBIRD_DEBUG") || !H.env("BLUEBIRD_DEBUG") && "development" !== H.env("NODE_ENV")),
            z = !(0 == H.env("BLUEBIRD_WARNINGS") || !G && !H.env("BLUEBIRD_WARNINGS")),
            X = !(0 == H.env("BLUEBIRD_LONG_STACK_TRACES") || !G && !H.env("BLUEBIRD_LONG_STACK_TRACES")),
            W = 0 != H.env("BLUEBIRD_W_FORGOTTEN_RETURN") && (z || !!H.env("BLUEBIRD_W_FORGOTTEN_RETURN"));
        e.prototype.suppressUnhandledRejections = function () {
          var t = this._target();

          t._bitField = -1048577 & t._bitField | 524288;
        }, e.prototype._ensurePossibleRejectionHandled = function () {
          0 === (524288 & this._bitField) && (this._setRejectionIsUnhandled(), I.invokeLater(this._notifyUnhandledRejection, this, void 0));
        }, e.prototype._notifyUnhandledRejectionIsHandled = function () {
          k("rejectionHandled", O, void 0, this);
        }, e.prototype._setReturnedNonUndefined = function () {
          this._bitField = 268435456 | this._bitField;
        }, e.prototype._returnedNonUndefined = function () {
          return 0 !== (268435456 & this._bitField);
        }, e.prototype._notifyUnhandledRejection = function () {
          if (this._isRejectionUnhandled()) {
            var t = this._settledValue();

            this._setUnhandledRejectionIsNotified(), k("unhandledRejection", A, t, this);
          }
        }, e.prototype._setUnhandledRejectionIsNotified = function () {
          this._bitField = 262144 | this._bitField;
        }, e.prototype._unsetUnhandledRejectionIsNotified = function () {
          this._bitField = -262145 & this._bitField;
        }, e.prototype._isUnhandledRejectionNotified = function () {
          return (262144 & this._bitField) > 0;
        }, e.prototype._setRejectionIsUnhandled = function () {
          this._bitField = 1048576 | this._bitField;
        }, e.prototype._unsetRejectionIsUnhandled = function () {
          this._bitField = -1048577 & this._bitField, this._isUnhandledRejectionNotified() && (this._unsetUnhandledRejectionIsNotified(), this._notifyUnhandledRejectionIsHandled());
        }, e.prototype._isRejectionUnhandled = function () {
          return (1048576 & this._bitField) > 0;
        }, e.prototype._warn = function (t, e, n) {
          return y(t, e, n || this);
        }, e.onPossiblyUnhandledRejection = function (t) {
          var e = V();
          A = "function" == typeof t ? null === e ? t : H.domainBind(e, t) : void 0;
        }, e.onUnhandledRejectionHandled = function (t) {
          var e = V();
          O = "function" == typeof t ? null === e ? t : H.domainBind(e, t) : void 0;
        };

        var K = function K() {};

        e.longStackTraces = function () {
          if (I.haveItemsQueued() && !ot.longStackTraces) throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");

          if (!ot.longStackTraces && T()) {
            var t = e.prototype._captureStackTrace,
                r = e.prototype._attachExtraTrace;
            ot.longStackTraces = !0, K = function K() {
              if (I.haveItemsQueued() && !ot.longStackTraces) throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");
              e.prototype._captureStackTrace = t, e.prototype._attachExtraTrace = r, n.deactivateLongStackTraces(), I.enableTrampoline(), ot.longStackTraces = !1;
            }, e.prototype._captureStackTrace = f, e.prototype._attachExtraTrace = _, n.activateLongStackTraces(), I.disableTrampolineIfNecessary();
          }
        }, e.hasLongStackTraces = function () {
          return ot.longStackTraces && T();
        };

        var J = function () {
          try {
            if ("function" == typeof CustomEvent) {
              var t = new CustomEvent("CustomEvent");
              return H.global.dispatchEvent(t), function (t, e) {
                var n = new CustomEvent(t.toLowerCase(), {
                  detail: e,
                  cancelable: !0
                });
                return !H.global.dispatchEvent(n);
              };
            }

            if ("function" == typeof Event) {
              var t = new Event("CustomEvent");
              return H.global.dispatchEvent(t), function (t, e) {
                var n = new Event(t.toLowerCase(), {
                  cancelable: !0
                });
                return n.detail = e, !H.global.dispatchEvent(n);
              };
            }

            var t = document.createEvent("CustomEvent");
            return t.initCustomEvent("testingtheevent", !1, !0, {}), H.global.dispatchEvent(t), function (t, e) {
              var n = document.createEvent("CustomEvent");
              return n.initCustomEvent(t.toLowerCase(), !1, !0, e), !H.global.dispatchEvent(n);
            };
          } catch (e) {}

          return function () {
            return !1;
          };
        }(),
            Y = function () {
          return H.isNode ? function () {
            return process.emit.apply(process, arguments);
          } : H.global ? function (t) {
            var e = "on" + t.toLowerCase(),
                n = H.global[e];
            return n ? (n.apply(H.global, [].slice.call(arguments, 1)), !0) : !1;
          } : function () {
            return !1;
          };
        }(),
            Z = {
          promiseCreated: r,
          promiseFulfilled: r,
          promiseRejected: r,
          promiseResolved: r,
          promiseCancelled: r,
          promiseChained: function promiseChained(t, e, n) {
            return {
              promise: e,
              child: n
            };
          },
          warning: function warning(t, e) {
            return {
              warning: e
            };
          },
          unhandledRejection: function unhandledRejection(t, e, n) {
            return {
              reason: e,
              promise: n
            };
          },
          rejectionHandled: r
        },
            tt = function tt(t) {
          var e = !1;

          try {
            e = Y.apply(null, arguments);
          } catch (n) {
            I.throwLater(n), e = !0;
          }

          var r = !1;

          try {
            r = J(t, Z[t].apply(null, arguments));
          } catch (n) {
            I.throwLater(n), r = !0;
          }

          return r || e;
        };

        e.config = function (t) {
          if (t = Object(t), "longStackTraces" in t && (t.longStackTraces ? e.longStackTraces() : !t.longStackTraces && e.hasLongStackTraces() && K()), "warnings" in t) {
            var n = t.warnings;
            ot.warnings = !!n, W = ot.warnings, H.isObject(n) && "wForgottenReturn" in n && (W = !!n.wForgottenReturn);
          }

          if ("cancellation" in t && t.cancellation && !ot.cancellation) {
            if (I.haveItemsQueued()) throw new Error("cannot enable cancellation after promises are in use");
            e.prototype._clearCancellationData = l, e.prototype._propagateFrom = u, e.prototype._onCancel = a, e.prototype._setOnCancel = c, e.prototype._attachCancellationCallback = s, e.prototype._execute = o, et = u, ot.cancellation = !0;
          }

          return "monitoring" in t && (t.monitoring && !ot.monitoring ? (ot.monitoring = !0, e.prototype._fireEvent = tt) : !t.monitoring && ot.monitoring && (ot.monitoring = !1, e.prototype._fireEvent = i)), e;
        }, e.prototype._fireEvent = i, e.prototype._execute = function (t, e, n) {
          try {
            t(e, n);
          } catch (r) {
            return r;
          }
        }, e.prototype._onCancel = function () {}, e.prototype._setOnCancel = function (t) {}, e.prototype._attachCancellationCallback = function (t) {}, e.prototype._captureStackTrace = function () {}, e.prototype._attachExtraTrace = function () {}, e.prototype._clearCancellationData = function () {}, e.prototype._propagateFrom = function (t, e) {};

        var et = p,
            nt = function nt() {
          return !1;
        },
            rt = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;

        H.inherits(S, Error), n.CapturedTrace = S, S.prototype.uncycle = function () {
          var t = this._length;

          if (!(2 > t)) {
            for (var e = [], n = {}, r = 0, i = this; void 0 !== i; ++r) {
              e.push(i), i = i._parent;
            }

            t = this._length = r;

            for (var r = t - 1; r >= 0; --r) {
              var o = e[r].stack;
              void 0 === n[o] && (n[o] = r);
            }

            for (var r = 0; t > r; ++r) {
              var s = e[r].stack,
                  a = n[s];

              if (void 0 !== a && a !== r) {
                a > 0 && (e[a - 1]._parent = void 0, e[a - 1]._length = 1), e[r]._parent = void 0, e[r]._length = 1;
                var c = r > 0 ? e[r - 1] : this;
                t - 1 > a ? (c._parent = e[a + 1], c._parent.uncycle(), c._length = c._parent._length + 1) : (c._parent = void 0, c._length = 1);

                for (var l = c._length + 1, u = r - 2; u >= 0; --u) {
                  e[u]._length = l, l++;
                }

                return;
              }
            }
          }
        }, S.prototype.attachExtraTrace = function (t) {
          if (!t.__stackCleaned__) {
            this.uncycle();

            for (var e = j(t), n = e.message, r = [e.stack], i = this; void 0 !== i;) {
              r.push(w(i.stack.split("\n"))), i = i._parent;
            }

            b(r), g(r), H.notEnumerableProp(t, "stack", m(n, r)), H.notEnumerableProp(t, "__stackCleaned__", !0);
          }
        };

        var it = function () {
          var t = /^\s*at\s*/,
              e = function e(t, _e) {
            return "string" == typeof t ? t : void 0 !== _e.name && void 0 !== _e.message ? _e.toString() : F(_e);
          };

          if ("number" == typeof Error.stackTraceLimit && "function" == typeof Error.captureStackTrace) {
            Error.stackTraceLimit += 6, q = t, Q = e;
            var n = Error.captureStackTrace;
            return nt = function nt(t) {
              return B.test(t);
            }, function (t, e) {
              Error.stackTraceLimit += 6, n(t, e), Error.stackTraceLimit -= 6;
            };
          }

          var r = new Error();
          if ("string" == typeof r.stack && r.stack.split("\n")[0].indexOf("stackDetection@") >= 0) return q = /@/, Q = e, $ = !0, function (t) {
            t.stack = new Error().stack;
          };
          var i;

          try {
            throw new Error();
          } catch (o) {
            i = "stack" in o;
          }

          return "stack" in r || !i || "number" != typeof Error.stackTraceLimit ? (Q = function Q(t, e) {
            return "string" == typeof t ? t : "object" != _typeof(e) && "function" != typeof e || void 0 === e.name || void 0 === e.message ? F(e) : e.toString();
          }, null) : (q = t, Q = e, function (t) {
            Error.stackTraceLimit += 6;

            try {
              throw new Error();
            } catch (e) {
              t.stack = e.stack;
            }

            Error.stackTraceLimit -= 6;
          });
        }([]);

        "undefined" != typeof console && "undefined" != typeof console.warn && (D = function D(t) {
          console.warn(t);
        }, H.isNode && process.stderr.isTTY ? D = function D(t, e) {
          var n = e ? "[33m" : "[31m";
          console.warn(n + t + "[0m\n");
        } : H.isNode || "string" != typeof new Error().stack || (D = function D(t, e) {
          console.warn("%c" + t, e ? "color: darkorange" : "color: red");
        }));
        var ot = {
          warnings: z,
          longStackTraces: !1,
          cancellation: !1,
          monitoring: !1
        };
        return X && e.longStackTraces(), {
          longStackTraces: function longStackTraces() {
            return ot.longStackTraces;
          },
          warnings: function warnings() {
            return ot.warnings;
          },
          cancellation: function cancellation() {
            return ot.cancellation;
          },
          monitoring: function monitoring() {
            return ot.monitoring;
          },
          propagateFromFunction: function propagateFromFunction() {
            return et;
          },
          boundValueFunction: function boundValueFunction() {
            return h;
          },
          checkForgottenReturns: d,
          setBounds: R,
          warn: y,
          deprecated: v,
          CapturedTrace: S,
          fireDomEvent: J,
          fireGlobalEvent: Y
        };
      };
    }, {
      "./errors": 12,
      "./util": 36
    }],
    10: [function (t, e, n) {
      "use strict";

      e.exports = function (t) {
        function e() {
          return this.value;
        }

        function n() {
          throw this.reason;
        }

        t.prototype["return"] = t.prototype.thenReturn = function (n) {
          return n instanceof t && n.suppressUnhandledRejections(), this._then(e, void 0, void 0, {
            value: n
          }, void 0);
        }, t.prototype["throw"] = t.prototype.thenThrow = function (t) {
          return this._then(n, void 0, void 0, {
            reason: t
          }, void 0);
        }, t.prototype.catchThrow = function (t) {
          if (arguments.length <= 1) return this._then(void 0, n, void 0, {
            reason: t
          }, void 0);

          var e = arguments[1],
              r = function r() {
            throw e;
          };

          return this.caught(t, r);
        }, t.prototype.catchReturn = function (n) {
          if (arguments.length <= 1) return n instanceof t && n.suppressUnhandledRejections(), this._then(void 0, e, void 0, {
            value: n
          }, void 0);
          var r = arguments[1];
          r instanceof t && r.suppressUnhandledRejections();

          var i = function i() {
            return r;
          };

          return this.caught(n, i);
        };
      };
    }, {}],
    11: [function (t, e, n) {
      "use strict";

      e.exports = function (t, e) {
        function n() {
          return o(this);
        }

        function r(t, n) {
          return i(t, n, e, e);
        }

        var i = t.reduce,
            o = t.all;
        t.prototype.each = function (t) {
          return i(this, t, e, 0)._then(n, void 0, void 0, this, void 0);
        }, t.prototype.mapSeries = function (t) {
          return i(this, t, e, e);
        }, t.each = function (t, r) {
          return i(t, r, e, 0)._then(n, void 0, void 0, t, void 0);
        }, t.mapSeries = r;
      };
    }, {}],
    12: [function (t, e, n) {
      "use strict";

      function r(t, e) {
        function n(r) {
          return this instanceof n ? (p(this, "message", "string" == typeof r ? r : e), p(this, "name", t), void (Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : Error.call(this))) : new n(r);
        }

        return u(n, Error), n;
      }

      function i(t) {
        return this instanceof i ? (p(this, "name", "OperationalError"), p(this, "message", t), this.cause = t, this.isOperational = !0, void (t instanceof Error ? (p(this, "message", t.message), p(this, "stack", t.stack)) : Error.captureStackTrace && Error.captureStackTrace(this, this.constructor))) : new i(t);
      }

      var o,
          s,
          a = t("./es5"),
          c = a.freeze,
          l = t("./util"),
          u = l.inherits,
          p = l.notEnumerableProp,
          h = r("Warning", "warning"),
          f = r("CancellationError", "cancellation error"),
          _ = r("TimeoutError", "timeout error"),
          d = r("AggregateError", "aggregate error");

      try {
        o = TypeError, s = RangeError;
      } catch (v) {
        o = r("TypeError", "type error"), s = r("RangeError", "range error");
      }

      for (var y = "join pop push shift unshift slice filter forEach some every map indexOf lastIndexOf reduce reduceRight sort reverse".split(" "), m = 0; m < y.length; ++m) {
        "function" == typeof Array.prototype[y[m]] && (d.prototype[y[m]] = Array.prototype[y[m]]);
      }

      a.defineProperty(d.prototype, "length", {
        value: 0,
        configurable: !1,
        writable: !0,
        enumerable: !0
      }), d.prototype.isOperational = !0;
      var g = 0;
      d.prototype.toString = function () {
        var t = Array(4 * g + 1).join(" "),
            e = "\n" + t + "AggregateError of:\n";
        g++, t = Array(4 * g + 1).join(" ");

        for (var n = 0; n < this.length; ++n) {
          for (var r = this[n] === this ? "[Circular AggregateError]" : this[n] + "", i = r.split("\n"), o = 0; o < i.length; ++o) {
            i[o] = t + i[o];
          }

          r = i.join("\n"), e += r + "\n";
        }

        return g--, e;
      }, u(i, Error);
      var b = Error.__BluebirdErrorTypes__;
      b || (b = c({
        CancellationError: f,
        TimeoutError: _,
        OperationalError: i,
        RejectionError: i,
        AggregateError: d
      }), a.defineProperty(Error, "__BluebirdErrorTypes__", {
        value: b,
        writable: !1,
        enumerable: !1,
        configurable: !1
      })), e.exports = {
        Error: Error,
        TypeError: o,
        RangeError: s,
        CancellationError: b.CancellationError,
        OperationalError: b.OperationalError,
        TimeoutError: b.TimeoutError,
        AggregateError: b.AggregateError,
        Warning: h
      };
    }, {
      "./es5": 13,
      "./util": 36
    }],
    13: [function (t, e, n) {
      var r = function () {
        "use strict";

        return void 0 === this;
      }();

      if (r) e.exports = {
        freeze: Object.freeze,
        defineProperty: Object.defineProperty,
        getDescriptor: Object.getOwnPropertyDescriptor,
        keys: Object.keys,
        names: Object.getOwnPropertyNames,
        getPrototypeOf: Object.getPrototypeOf,
        isArray: Array.isArray,
        isES5: r,
        propertyIsWritable: function propertyIsWritable(t, e) {
          var n = Object.getOwnPropertyDescriptor(t, e);
          return !(n && !n.writable && !n.set);
        }
      };else {
        var i = {}.hasOwnProperty,
            o = {}.toString,
            s = {}.constructor.prototype,
            a = function a(t) {
          var e = [];

          for (var n in t) {
            i.call(t, n) && e.push(n);
          }

          return e;
        },
            c = function c(t, e) {
          return {
            value: t[e]
          };
        },
            l = function l(t, e, n) {
          return t[e] = n.value, t;
        },
            u = function u(t) {
          return t;
        },
            p = function p(t) {
          try {
            return Object(t).constructor.prototype;
          } catch (e) {
            return s;
          }
        },
            h = function h(t) {
          try {
            return "[object Array]" === o.call(t);
          } catch (e) {
            return !1;
          }
        };

        e.exports = {
          isArray: h,
          keys: a,
          names: a,
          defineProperty: l,
          getDescriptor: c,
          freeze: u,
          getPrototypeOf: p,
          isES5: r,
          propertyIsWritable: function propertyIsWritable() {
            return !0;
          }
        };
      }
    }, {}],
    14: [function (t, e, n) {
      "use strict";

      e.exports = function (t, e) {
        var n = t.map;
        t.prototype.filter = function (t, r) {
          return n(this, t, r, e);
        }, t.filter = function (t, r, i) {
          return n(t, r, i, e);
        };
      };
    }, {}],
    15: [function (t, e, n) {
      "use strict";

      e.exports = function (e, n, r) {
        function i(t, e, n) {
          this.promise = t, this.type = e, this.handler = n, this.called = !1, this.cancelPromise = null;
        }

        function o(t) {
          this.finallyHandler = t;
        }

        function s(t, e) {
          return null != t.cancelPromise ? (arguments.length > 1 ? t.cancelPromise._reject(e) : t.cancelPromise._cancel(), t.cancelPromise = null, !0) : !1;
        }

        function a() {
          return l.call(this, this.promise._target()._settledValue());
        }

        function c(t) {
          return s(this, t) ? void 0 : (h.e = t, h);
        }

        function l(t) {
          var i = this.promise,
              l = this.handler;

          if (!this.called) {
            this.called = !0;
            var u = this.isFinallyHandler() ? l.call(i._boundValue()) : l.call(i._boundValue(), t);
            if (u === r) return u;

            if (void 0 !== u) {
              i._setReturnedNonUndefined();

              var f = n(u, i);

              if (f instanceof e) {
                if (null != this.cancelPromise) {
                  if (f._isCancelled()) {
                    var _ = new p("late cancellation observer");

                    return i._attachExtraTrace(_), h.e = _, h;
                  }

                  f.isPending() && f._attachCancellationCallback(new o(this));
                }

                return f._then(a, c, void 0, this, void 0);
              }
            }
          }

          return i.isRejected() ? (s(this), h.e = t, h) : (s(this), t);
        }

        var u = t("./util"),
            p = e.CancellationError,
            h = u.errorObj,
            f = t("./catch_filter")(r);
        return i.prototype.isFinallyHandler = function () {
          return 0 === this.type;
        }, o.prototype._resultCancelled = function () {
          s(this.finallyHandler);
        }, e.prototype._passThrough = function (t, e, n, r) {
          return "function" != typeof t ? this.then() : this._then(n, r, void 0, new i(this, e, t), void 0);
        }, e.prototype.lastly = e.prototype["finally"] = function (t) {
          return this._passThrough(t, 0, l, l);
        }, e.prototype.tap = function (t) {
          return this._passThrough(t, 1, l);
        }, e.prototype.tapCatch = function (t) {
          var n = arguments.length;
          if (1 === n) return this._passThrough(t, 1, void 0, l);
          var r,
              i = new Array(n - 1),
              o = 0;

          for (r = 0; n - 1 > r; ++r) {
            var s = arguments[r];
            if (!u.isObject(s)) return e.reject(new TypeError("tapCatch statement predicate: expecting an object but got " + u.classString(s)));
            i[o++] = s;
          }

          i.length = o;
          var a = arguments[r];
          return this._passThrough(f(i, a, this), 1, void 0, l);
        }, i;
      };
    }, {
      "./catch_filter": 7,
      "./util": 36
    }],
    16: [function (t, e, n) {
      "use strict";

      e.exports = function (e, n, r, i, o, s) {
        function a(t, n, r) {
          for (var o = 0; o < n.length; ++o) {
            r._pushContext();

            var s = f(n[o])(t);

            if (r._popContext(), s === h) {
              r._pushContext();

              var a = e.reject(h.e);
              return r._popContext(), a;
            }

            var c = i(s, r);
            if (c instanceof e) return c;
          }

          return null;
        }

        function c(t, n, i, o) {
          if (s.cancellation()) {
            var a = new e(r),
                c = this._finallyPromise = new e(r);
            this._promise = a.lastly(function () {
              return c;
            }), a._captureStackTrace(), a._setOnCancel(this);
          } else {
            var l = this._promise = new e(r);

            l._captureStackTrace();
          }

          this._stack = o, this._generatorFunction = t, this._receiver = n, this._generator = void 0, this._yieldHandlers = "function" == typeof i ? [i].concat(_) : _, this._yieldedPromise = null, this._cancellationPhase = !1;
        }

        var l = t("./errors"),
            u = l.TypeError,
            p = t("./util"),
            h = p.errorObj,
            f = p.tryCatch,
            _ = [];
        p.inherits(c, o), c.prototype._isResolved = function () {
          return null === this._promise;
        }, c.prototype._cleanup = function () {
          this._promise = this._generator = null, s.cancellation() && null !== this._finallyPromise && (this._finallyPromise._fulfill(), this._finallyPromise = null);
        }, c.prototype._promiseCancelled = function () {
          if (!this._isResolved()) {
            var t,
                n = "undefined" != typeof this._generator["return"];
            if (n) this._promise._pushContext(), t = f(this._generator["return"]).call(this._generator, void 0), this._promise._popContext();else {
              var r = new e.CancellationError("generator .return() sentinel");
              e.coroutine.returnSentinel = r, this._promise._attachExtraTrace(r), this._promise._pushContext(), t = f(this._generator["throw"]).call(this._generator, r), this._promise._popContext();
            }
            this._cancellationPhase = !0, this._yieldedPromise = null, this._continue(t);
          }
        }, c.prototype._promiseFulfilled = function (t) {
          this._yieldedPromise = null, this._promise._pushContext();
          var e = f(this._generator.next).call(this._generator, t);
          this._promise._popContext(), this._continue(e);
        }, c.prototype._promiseRejected = function (t) {
          this._yieldedPromise = null, this._promise._attachExtraTrace(t), this._promise._pushContext();
          var e = f(this._generator["throw"]).call(this._generator, t);
          this._promise._popContext(), this._continue(e);
        }, c.prototype._resultCancelled = function () {
          if (this._yieldedPromise instanceof e) {
            var t = this._yieldedPromise;
            this._yieldedPromise = null, t.cancel();
          }
        }, c.prototype.promise = function () {
          return this._promise;
        }, c.prototype._run = function () {
          this._generator = this._generatorFunction.call(this._receiver), this._receiver = this._generatorFunction = void 0, this._promiseFulfilled(void 0);
        }, c.prototype._continue = function (t) {
          var n = this._promise;
          if (t === h) return this._cleanup(), this._cancellationPhase ? n.cancel() : n._rejectCallback(t.e, !1);
          var r = t.value;
          if (t.done === !0) return this._cleanup(), this._cancellationPhase ? n.cancel() : n._resolveCallback(r);
          var o = i(r, this._promise);
          if (!(o instanceof e) && (o = a(o, this._yieldHandlers, this._promise), null === o)) return void this._promiseRejected(new u("A value %s was yielded that could not be treated as a promise\n\n    See http://goo.gl/MqrFmX\n\n".replace("%s", String(r)) + "From coroutine:\n" + this._stack.split("\n").slice(1, -7).join("\n")));
          o = o._target();
          var s = o._bitField;
          0 === (50397184 & s) ? (this._yieldedPromise = o, o._proxy(this, null)) : 0 !== (33554432 & s) ? e._async.invoke(this._promiseFulfilled, this, o._value()) : 0 !== (16777216 & s) ? e._async.invoke(this._promiseRejected, this, o._reason()) : this._promiseCancelled();
        }, e.coroutine = function (t, e) {
          if ("function" != typeof t) throw new u("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");
          var n = Object(e).yieldHandler,
              r = c,
              i = new Error().stack;
          return function () {
            var e = t.apply(this, arguments),
                o = new r(void 0, void 0, n, i),
                s = o.promise();
            return o._generator = e, o._promiseFulfilled(void 0), s;
          };
        }, e.coroutine.addYieldHandler = function (t) {
          if ("function" != typeof t) throw new u("expecting a function but got " + p.classString(t));

          _.push(t);
        }, e.spawn = function (t) {
          if (s.deprecated("Promise.spawn()", "Promise.coroutine()"), "function" != typeof t) return n("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");
          var r = new c(t, this),
              i = r.promise();
          return r._run(e.spawn), i;
        };
      };
    }, {
      "./errors": 12,
      "./util": 36
    }],
    17: [function (t, e, n) {
      "use strict";

      e.exports = function (e, n, r, i, o, s) {
        var a = t("./util");
        a.canEvaluate, a.tryCatch, a.errorObj;

        e.join = function () {
          var t,
              e = arguments.length - 1;

          if (e > 0 && "function" == typeof arguments[e]) {
            t = arguments[e];
            var r;
          }

          var i = [].slice.call(arguments);
          t && i.pop();
          var r = new n(i).promise();
          return void 0 !== t ? r.spread(t) : r;
        };
      };
    }, {
      "./util": 36
    }],
    18: [function (t, e, n) {
      "use strict";

      e.exports = function (e, n, r, i, o, s) {
        function a(t, e, n, r) {
          this.constructor$(t), this._promise._captureStackTrace();
          var i = l();
          this._callback = null === i ? e : u.domainBind(i, e), this._preservedValues = r === o ? new Array(this.length()) : null, this._limit = n, this._inFlight = 0, this._queue = [], f.invoke(this._asyncInit, this, void 0);
        }

        function c(t, n, i, o) {
          if ("function" != typeof n) return r("expecting a function but got " + u.classString(n));
          var s = 0;

          if (void 0 !== i) {
            if ("object" != _typeof(i) || null === i) return e.reject(new TypeError("options argument must be an object but it is " + u.classString(i)));
            if ("number" != typeof i.concurrency) return e.reject(new TypeError("'concurrency' must be a number but it is " + u.classString(i.concurrency)));
            s = i.concurrency;
          }

          return s = "number" == typeof s && isFinite(s) && s >= 1 ? s : 0, new a(t, n, s, o).promise();
        }

        var l = e._getDomain,
            u = t("./util"),
            p = u.tryCatch,
            h = u.errorObj,
            f = e._async;
        u.inherits(a, n), a.prototype._asyncInit = function () {
          this._init$(void 0, -2);
        }, a.prototype._init = function () {}, a.prototype._promiseFulfilled = function (t, n) {
          var r = this._values,
              o = this.length(),
              a = this._preservedValues,
              c = this._limit;

          if (0 > n) {
            if (n = -1 * n - 1, r[n] = t, c >= 1 && (this._inFlight--, this._drainQueue(), this._isResolved())) return !0;
          } else {
            if (c >= 1 && this._inFlight >= c) return r[n] = t, this._queue.push(n), !1;
            null !== a && (a[n] = t);

            var l = this._promise,
                u = this._callback,
                f = l._boundValue();

            l._pushContext();

            var _ = p(u).call(f, t, n, o),
                d = l._popContext();

            if (s.checkForgottenReturns(_, d, null !== a ? "Promise.filter" : "Promise.map", l), _ === h) return this._reject(_.e), !0;
            var v = i(_, this._promise);

            if (v instanceof e) {
              v = v._target();
              var y = v._bitField;
              if (0 === (50397184 & y)) return c >= 1 && this._inFlight++, r[n] = v, v._proxy(this, -1 * (n + 1)), !1;
              if (0 === (33554432 & y)) return 0 !== (16777216 & y) ? (this._reject(v._reason()), !0) : (this._cancel(), !0);
              _ = v._value();
            }

            r[n] = _;
          }

          var m = ++this._totalResolved;
          return m >= o ? (null !== a ? this._filter(r, a) : this._resolve(r), !0) : !1;
        }, a.prototype._drainQueue = function () {
          for (var t = this._queue, e = this._limit, n = this._values; t.length > 0 && this._inFlight < e;) {
            if (this._isResolved()) return;
            var r = t.pop();

            this._promiseFulfilled(n[r], r);
          }
        }, a.prototype._filter = function (t, e) {
          for (var n = e.length, r = new Array(n), i = 0, o = 0; n > o; ++o) {
            t[o] && (r[i++] = e[o]);
          }

          r.length = i, this._resolve(r);
        }, a.prototype.preservedValues = function () {
          return this._preservedValues;
        }, e.prototype.map = function (t, e) {
          return c(this, t, e, null);
        }, e.map = function (t, e, n, r) {
          return c(t, e, n, r);
        };
      };
    }, {
      "./util": 36
    }],
    19: [function (t, e, n) {
      "use strict";

      e.exports = function (e, n, r, i, o) {
        var s = t("./util"),
            a = s.tryCatch;
        e.method = function (t) {
          if ("function" != typeof t) throw new e.TypeError("expecting a function but got " + s.classString(t));
          return function () {
            var r = new e(n);
            r._captureStackTrace(), r._pushContext();

            var i = a(t).apply(this, arguments),
                s = r._popContext();

            return o.checkForgottenReturns(i, s, "Promise.method", r), r._resolveFromSyncValue(i), r;
          };
        }, e.attempt = e["try"] = function (t) {
          if ("function" != typeof t) return i("expecting a function but got " + s.classString(t));
          var r = new e(n);
          r._captureStackTrace(), r._pushContext();
          var c;

          if (arguments.length > 1) {
            o.deprecated("calling Promise.try with more than 1 argument");
            var l = arguments[1],
                u = arguments[2];
            c = s.isArray(l) ? a(t).apply(u, l) : a(t).call(u, l);
          } else c = a(t)();

          var p = r._popContext();

          return o.checkForgottenReturns(c, p, "Promise.try", r), r._resolveFromSyncValue(c), r;
        }, e.prototype._resolveFromSyncValue = function (t) {
          t === s.errorObj ? this._rejectCallback(t.e, !1) : this._resolveCallback(t, !0);
        };
      };
    }, {
      "./util": 36
    }],
    20: [function (t, e, n) {
      "use strict";

      function r(t) {
        return t instanceof Error && u.getPrototypeOf(t) === Error.prototype;
      }

      function i(t) {
        var e;

        if (r(t)) {
          e = new l(t), e.name = t.name, e.message = t.message, e.stack = t.stack;

          for (var n = u.keys(t), i = 0; i < n.length; ++i) {
            var o = n[i];
            p.test(o) || (e[o] = t[o]);
          }

          return e;
        }

        return s.markAsOriginatingFromRejection(t), t;
      }

      function o(t, e) {
        return function (n, r) {
          if (null !== t) {
            if (n) {
              var o = i(a(n));
              t._attachExtraTrace(o), t._reject(o);
            } else if (e) {
              var s = [].slice.call(arguments, 1);

              t._fulfill(s);
            } else t._fulfill(r);

            t = null;
          }
        };
      }

      var s = t("./util"),
          a = s.maybeWrapAsError,
          c = t("./errors"),
          l = c.OperationalError,
          u = t("./es5"),
          p = /^(?:name|message|stack|cause)$/;
      e.exports = o;
    }, {
      "./errors": 12,
      "./es5": 13,
      "./util": 36
    }],
    21: [function (t, e, n) {
      "use strict";

      e.exports = function (e) {
        function n(t, e) {
          var n = this;
          if (!o.isArray(t)) return r.call(n, t, e);
          var i = a(e).apply(n._boundValue(), [null].concat(t));
          i === c && s.throwLater(i.e);
        }

        function r(t, e) {
          var n = this,
              r = n._boundValue(),
              i = void 0 === t ? a(e).call(r, null) : a(e).call(r, null, t);

          i === c && s.throwLater(i.e);
        }

        function i(t, e) {
          var n = this;

          if (!t) {
            var r = new Error(t + "");
            r.cause = t, t = r;
          }

          var i = a(e).call(n._boundValue(), t);
          i === c && s.throwLater(i.e);
        }

        var o = t("./util"),
            s = e._async,
            a = o.tryCatch,
            c = o.errorObj;

        e.prototype.asCallback = e.prototype.nodeify = function (t, e) {
          if ("function" == typeof t) {
            var o = r;
            void 0 !== e && Object(e).spread && (o = n), this._then(o, i, void 0, this, t);
          }

          return this;
        };
      };
    }, {
      "./util": 36
    }],
    22: [function (t, e, n) {
      "use strict";

      e.exports = function () {
        function n() {}

        function r(t, e) {
          if (null == t || t.constructor !== i) throw new m("the promise constructor cannot be invoked directly\n\n    See http://goo.gl/MqrFmX\n");
          if ("function" != typeof e) throw new m("expecting a function but got " + f.classString(e));
        }

        function i(t) {
          t !== b && r(this, t), this._bitField = 0, this._fulfillmentHandler0 = void 0, this._rejectionHandler0 = void 0, this._promise0 = void 0, this._receiver0 = void 0, this._resolveFromExecutor(t), this._promiseCreated(), this._fireEvent("promiseCreated", this);
        }

        function o(t) {
          this.promise._resolveCallback(t);
        }

        function s(t) {
          this.promise._rejectCallback(t, !1);
        }

        function a(t) {
          var e = new i(b);
          e._fulfillmentHandler0 = t, e._rejectionHandler0 = t, e._promise0 = t, e._receiver0 = t;
        }

        var c,
            l = function l() {
          return new m("circular promise resolution chain\n\n    See http://goo.gl/MqrFmX\n");
        },
            u = function u() {
          return new i.PromiseInspection(this._target());
        },
            p = function p(t) {
          return i.reject(new m(t));
        },
            h = {},
            f = t("./util");

        c = f.isNode ? function () {
          var t = process.domain;
          return void 0 === t && (t = null), t;
        } : function () {
          return null;
        }, f.notEnumerableProp(i, "_getDomain", c);

        var _ = t("./es5"),
            d = t("./async"),
            v = new d();

        _.defineProperty(i, "_async", {
          value: v
        });

        var y = t("./errors"),
            m = i.TypeError = y.TypeError;
        i.RangeError = y.RangeError;
        var g = i.CancellationError = y.CancellationError;
        i.TimeoutError = y.TimeoutError, i.OperationalError = y.OperationalError, i.RejectionError = y.OperationalError, i.AggregateError = y.AggregateError;

        var b = function b() {},
            w = {},
            C = {},
            j = t("./thenables")(i, b),
            E = t("./promise_array")(i, b, j, p, n),
            k = t("./context")(i),
            F = k.create,
            x = t("./debuggability")(i, k),
            T = (x.CapturedTrace, t("./finally")(i, j, C)),
            P = t("./catch_filter")(C),
            R = t("./nodeback"),
            S = f.errorObj,
            O = f.tryCatch;

        return i.prototype.toString = function () {
          return "[object Promise]";
        }, i.prototype.caught = i.prototype["catch"] = function (t) {
          var e = arguments.length;

          if (e > 1) {
            var n,
                r = new Array(e - 1),
                i = 0;

            for (n = 0; e - 1 > n; ++n) {
              var o = arguments[n];
              if (!f.isObject(o)) return p("Catch statement predicate: expecting an object but got " + f.classString(o));
              r[i++] = o;
            }

            return r.length = i, t = arguments[n], this.then(void 0, P(r, t, this));
          }

          return this.then(void 0, t);
        }, i.prototype.reflect = function () {
          return this._then(u, u, void 0, this, void 0);
        }, i.prototype.then = function (t, e) {
          if (x.warnings() && arguments.length > 0 && "function" != typeof t && "function" != typeof e) {
            var n = ".then() only accepts functions but was passed: " + f.classString(t);
            arguments.length > 1 && (n += ", " + f.classString(e)), this._warn(n);
          }

          return this._then(t, e, void 0, void 0, void 0);
        }, i.prototype.done = function (t, e) {
          var n = this._then(t, e, void 0, void 0, void 0);

          n._setIsFinal();
        }, i.prototype.spread = function (t) {
          return "function" != typeof t ? p("expecting a function but got " + f.classString(t)) : this.all()._then(t, void 0, void 0, w, void 0);
        }, i.prototype.toJSON = function () {
          var t = {
            isFulfilled: !1,
            isRejected: !1,
            fulfillmentValue: void 0,
            rejectionReason: void 0
          };
          return this.isFulfilled() ? (t.fulfillmentValue = this.value(), t.isFulfilled = !0) : this.isRejected() && (t.rejectionReason = this.reason(), t.isRejected = !0), t;
        }, i.prototype.all = function () {
          return arguments.length > 0 && this._warn(".all() was passed arguments but it does not take any"), new E(this).promise();
        }, i.prototype.error = function (t) {
          return this.caught(f.originatesFromRejection, t);
        }, i.getNewLibraryCopy = e.exports, i.is = function (t) {
          return t instanceof i;
        }, i.fromNode = i.fromCallback = function (t) {
          var e = new i(b);

          e._captureStackTrace();

          var n = arguments.length > 1 ? !!Object(arguments[1]).multiArgs : !1,
              r = O(t)(R(e, n));
          return r === S && e._rejectCallback(r.e, !0), e._isFateSealed() || e._setAsyncGuaranteed(), e;
        }, i.all = function (t) {
          return new E(t).promise();
        }, i.cast = function (t) {
          var e = j(t);
          return e instanceof i || (e = new i(b), e._captureStackTrace(), e._setFulfilled(), e._rejectionHandler0 = t), e;
        }, i.resolve = i.fulfilled = i.cast, i.reject = i.rejected = function (t) {
          var e = new i(b);
          return e._captureStackTrace(), e._rejectCallback(t, !0), e;
        }, i.setScheduler = function (t) {
          if ("function" != typeof t) throw new m("expecting a function but got " + f.classString(t));
          return v.setScheduler(t);
        }, i.prototype._then = function (t, e, n, r, o) {
          var s = void 0 !== o,
              a = s ? o : new i(b),
              l = this._target(),
              u = l._bitField;

          s || (a._propagateFrom(this, 3), a._captureStackTrace(), void 0 === r && 0 !== (2097152 & this._bitField) && (r = 0 !== (50397184 & u) ? this._boundValue() : l === this ? void 0 : this._boundTo), this._fireEvent("promiseChained", this, a));
          var p = c();

          if (0 !== (50397184 & u)) {
            var h,
                _,
                d = l._settlePromiseCtx;

            0 !== (33554432 & u) ? (_ = l._rejectionHandler0, h = t) : 0 !== (16777216 & u) ? (_ = l._fulfillmentHandler0, h = e, l._unsetRejectionIsUnhandled()) : (d = l._settlePromiseLateCancellationObserver, _ = new g("late cancellation observer"), l._attachExtraTrace(_), h = e), v.invoke(d, l, {
              handler: null === p ? h : "function" == typeof h && f.domainBind(p, h),
              promise: a,
              receiver: r,
              value: _
            });
          } else l._addCallbacks(t, e, a, r, p);

          return a;
        }, i.prototype._length = function () {
          return 65535 & this._bitField;
        }, i.prototype._isFateSealed = function () {
          return 0 !== (117506048 & this._bitField);
        }, i.prototype._isFollowing = function () {
          return 67108864 === (67108864 & this._bitField);
        }, i.prototype._setLength = function (t) {
          this._bitField = -65536 & this._bitField | 65535 & t;
        }, i.prototype._setFulfilled = function () {
          this._bitField = 33554432 | this._bitField, this._fireEvent("promiseFulfilled", this);
        }, i.prototype._setRejected = function () {
          this._bitField = 16777216 | this._bitField, this._fireEvent("promiseRejected", this);
        }, i.prototype._setFollowing = function () {
          this._bitField = 67108864 | this._bitField, this._fireEvent("promiseResolved", this);
        }, i.prototype._setIsFinal = function () {
          this._bitField = 4194304 | this._bitField;
        }, i.prototype._isFinal = function () {
          return (4194304 & this._bitField) > 0;
        }, i.prototype._unsetCancelled = function () {
          this._bitField = -65537 & this._bitField;
        }, i.prototype._setCancelled = function () {
          this._bitField = 65536 | this._bitField, this._fireEvent("promiseCancelled", this);
        }, i.prototype._setWillBeCancelled = function () {
          this._bitField = 8388608 | this._bitField;
        }, i.prototype._setAsyncGuaranteed = function () {
          v.hasCustomScheduler() || (this._bitField = 134217728 | this._bitField);
        }, i.prototype._receiverAt = function (t) {
          var e = 0 === t ? this._receiver0 : this[4 * t - 4 + 3];
          return e === h ? void 0 : void 0 === e && this._isBound() ? this._boundValue() : e;
        }, i.prototype._promiseAt = function (t) {
          return this[4 * t - 4 + 2];
        }, i.prototype._fulfillmentHandlerAt = function (t) {
          return this[4 * t - 4 + 0];
        }, i.prototype._rejectionHandlerAt = function (t) {
          return this[4 * t - 4 + 1];
        }, i.prototype._boundValue = function () {}, i.prototype._migrateCallback0 = function (t) {
          var e = (t._bitField, t._fulfillmentHandler0),
              n = t._rejectionHandler0,
              r = t._promise0,
              i = t._receiverAt(0);

          void 0 === i && (i = h), this._addCallbacks(e, n, r, i, null);
        }, i.prototype._migrateCallbackAt = function (t, e) {
          var n = t._fulfillmentHandlerAt(e),
              r = t._rejectionHandlerAt(e),
              i = t._promiseAt(e),
              o = t._receiverAt(e);

          void 0 === o && (o = h), this._addCallbacks(n, r, i, o, null);
        }, i.prototype._addCallbacks = function (t, e, n, r, i) {
          var o = this._length();

          if (o >= 65531 && (o = 0, this._setLength(0)), 0 === o) this._promise0 = n, this._receiver0 = r, "function" == typeof t && (this._fulfillmentHandler0 = null === i ? t : f.domainBind(i, t)), "function" == typeof e && (this._rejectionHandler0 = null === i ? e : f.domainBind(i, e));else {
            var s = 4 * o - 4;
            this[s + 2] = n, this[s + 3] = r, "function" == typeof t && (this[s + 0] = null === i ? t : f.domainBind(i, t)), "function" == typeof e && (this[s + 1] = null === i ? e : f.domainBind(i, e));
          }
          return this._setLength(o + 1), o;
        }, i.prototype._proxy = function (t, e) {
          this._addCallbacks(void 0, void 0, e, t, null);
        }, i.prototype._resolveCallback = function (t, e) {
          if (0 === (117506048 & this._bitField)) {
            if (t === this) return this._rejectCallback(l(), !1);
            var n = j(t, this);
            if (!(n instanceof i)) return this._fulfill(t);
            e && this._propagateFrom(n, 2);

            var r = n._target();

            if (r === this) return void this._reject(l());
            var o = r._bitField;

            if (0 === (50397184 & o)) {
              var s = this._length();

              s > 0 && r._migrateCallback0(this);

              for (var a = 1; s > a; ++a) {
                r._migrateCallbackAt(this, a);
              }

              this._setFollowing(), this._setLength(0), this._setFollowee(r);
            } else if (0 !== (33554432 & o)) this._fulfill(r._value());else if (0 !== (16777216 & o)) this._reject(r._reason());else {
              var c = new g("late cancellation observer");
              r._attachExtraTrace(c), this._reject(c);
            }
          }
        }, i.prototype._rejectCallback = function (t, e, n) {
          var r = f.ensureErrorObject(t),
              i = r === t;

          if (!i && !n && x.warnings()) {
            var o = "a promise was rejected with a non-error: " + f.classString(t);

            this._warn(o, !0);
          }

          this._attachExtraTrace(r, e ? i : !1), this._reject(t);
        }, i.prototype._resolveFromExecutor = function (t) {
          if (t !== b) {
            var e = this;
            this._captureStackTrace(), this._pushContext();

            var n = !0,
                r = this._execute(t, function (t) {
              e._resolveCallback(t);
            }, function (t) {
              e._rejectCallback(t, n);
            });

            n = !1, this._popContext(), void 0 !== r && e._rejectCallback(r, !0);
          }
        }, i.prototype._settlePromiseFromHandler = function (t, e, n, r) {
          var i = r._bitField;

          if (0 === (65536 & i)) {
            r._pushContext();

            var o;
            e === w ? n && "number" == typeof n.length ? o = O(t).apply(this._boundValue(), n) : (o = S, o.e = new m("cannot .spread() a non-array: " + f.classString(n))) : o = O(t).call(e, n);

            var s = r._popContext();

            i = r._bitField, 0 === (65536 & i) && (o === C ? r._reject(n) : o === S ? r._rejectCallback(o.e, !1) : (x.checkForgottenReturns(o, s, "", r, this), r._resolveCallback(o)));
          }
        }, i.prototype._target = function () {
          for (var t = this; t._isFollowing();) {
            t = t._followee();
          }

          return t;
        }, i.prototype._followee = function () {
          return this._rejectionHandler0;
        }, i.prototype._setFollowee = function (t) {
          this._rejectionHandler0 = t;
        }, i.prototype._settlePromise = function (t, e, r, o) {
          var s = t instanceof i,
              a = this._bitField,
              c = 0 !== (134217728 & a);
          0 !== (65536 & a) ? (s && t._invokeInternalOnCancel(), r instanceof T && r.isFinallyHandler() ? (r.cancelPromise = t, O(e).call(r, o) === S && t._reject(S.e)) : e === u ? t._fulfill(u.call(r)) : r instanceof n ? r._promiseCancelled(t) : s || t instanceof E ? t._cancel() : r.cancel()) : "function" == typeof e ? s ? (c && t._setAsyncGuaranteed(), this._settlePromiseFromHandler(e, r, o, t)) : e.call(r, o, t) : r instanceof n ? r._isResolved() || (0 !== (33554432 & a) ? r._promiseFulfilled(o, t) : r._promiseRejected(o, t)) : s && (c && t._setAsyncGuaranteed(), 0 !== (33554432 & a) ? t._fulfill(o) : t._reject(o));
        }, i.prototype._settlePromiseLateCancellationObserver = function (t) {
          var e = t.handler,
              n = t.promise,
              r = t.receiver,
              o = t.value;
          "function" == typeof e ? n instanceof i ? this._settlePromiseFromHandler(e, r, o, n) : e.call(r, o, n) : n instanceof i && n._reject(o);
        }, i.prototype._settlePromiseCtx = function (t) {
          this._settlePromise(t.promise, t.handler, t.receiver, t.value);
        }, i.prototype._settlePromise0 = function (t, e, n) {
          var r = this._promise0,
              i = this._receiverAt(0);

          this._promise0 = void 0, this._receiver0 = void 0, this._settlePromise(r, t, i, e);
        }, i.prototype._clearCallbackDataAtIndex = function (t) {
          var e = 4 * t - 4;
          this[e + 2] = this[e + 3] = this[e + 0] = this[e + 1] = void 0;
        }, i.prototype._fulfill = function (t) {
          var e = this._bitField;

          if (!((117506048 & e) >>> 16)) {
            if (t === this) {
              var n = l();
              return this._attachExtraTrace(n), this._reject(n);
            }

            this._setFulfilled(), this._rejectionHandler0 = t, (65535 & e) > 0 && (0 !== (134217728 & e) ? this._settlePromises() : v.settlePromises(this));
          }
        }, i.prototype._reject = function (t) {
          var e = this._bitField;
          if (!((117506048 & e) >>> 16)) return this._setRejected(), this._fulfillmentHandler0 = t, this._isFinal() ? v.fatalError(t, f.isNode) : void ((65535 & e) > 0 ? v.settlePromises(this) : this._ensurePossibleRejectionHandled());
        }, i.prototype._fulfillPromises = function (t, e) {
          for (var n = 1; t > n; n++) {
            var r = this._fulfillmentHandlerAt(n),
                i = this._promiseAt(n),
                o = this._receiverAt(n);

            this._clearCallbackDataAtIndex(n), this._settlePromise(i, r, o, e);
          }
        }, i.prototype._rejectPromises = function (t, e) {
          for (var n = 1; t > n; n++) {
            var r = this._rejectionHandlerAt(n),
                i = this._promiseAt(n),
                o = this._receiverAt(n);

            this._clearCallbackDataAtIndex(n), this._settlePromise(i, r, o, e);
          }
        }, i.prototype._settlePromises = function () {
          var t = this._bitField,
              e = 65535 & t;

          if (e > 0) {
            if (0 !== (16842752 & t)) {
              var n = this._fulfillmentHandler0;
              this._settlePromise0(this._rejectionHandler0, n, t), this._rejectPromises(e, n);
            } else {
              var r = this._rejectionHandler0;
              this._settlePromise0(this._fulfillmentHandler0, r, t), this._fulfillPromises(e, r);
            }

            this._setLength(0);
          }

          this._clearCancellationData();
        }, i.prototype._settledValue = function () {
          var t = this._bitField;
          return 0 !== (33554432 & t) ? this._rejectionHandler0 : 0 !== (16777216 & t) ? this._fulfillmentHandler0 : void 0;
        }, i.defer = i.pending = function () {
          x.deprecated("Promise.defer", "new Promise");
          var t = new i(b);
          return {
            promise: t,
            resolve: o,
            reject: s
          };
        }, f.notEnumerableProp(i, "_makeSelfResolutionError", l), t("./method")(i, b, j, p, x), t("./bind")(i, b, j, x), t("./cancel")(i, E, p, x), t("./direct_resolve")(i), t("./synchronous_inspection")(i), t("./join")(i, E, j, b, v, c), i.Promise = i, i.version = "3.5.0", t("./map.js")(i, E, p, j, b, x), t("./call_get.js")(i), t("./using.js")(i, p, j, F, b, x), t("./timers.js")(i, b, x), t("./generators.js")(i, p, b, j, n, x), t("./nodeify.js")(i), t("./promisify.js")(i, b), t("./props.js")(i, E, j, p), t("./race.js")(i, b, j, p), t("./reduce.js")(i, E, p, j, b, x), t("./settle.js")(i, E, x), t("./some.js")(i, E, p), t("./filter.js")(i, b), t("./each.js")(i, b), t("./any.js")(i), f.toFastProperties(i), f.toFastProperties(i.prototype), a({
          a: 1
        }), a({
          b: 2
        }), a({
          c: 3
        }), a(1), a(function () {}), a(void 0), a(!1), a(new i(b)), x.setBounds(d.firstLineError, f.lastLineError), i;
      };
    }, {
      "./any.js": 1,
      "./async": 2,
      "./bind": 3,
      "./call_get.js": 5,
      "./cancel": 6,
      "./catch_filter": 7,
      "./context": 8,
      "./debuggability": 9,
      "./direct_resolve": 10,
      "./each.js": 11,
      "./errors": 12,
      "./es5": 13,
      "./filter.js": 14,
      "./finally": 15,
      "./generators.js": 16,
      "./join": 17,
      "./map.js": 18,
      "./method": 19,
      "./nodeback": 20,
      "./nodeify.js": 21,
      "./promise_array": 23,
      "./promisify.js": 24,
      "./props.js": 25,
      "./race.js": 27,
      "./reduce.js": 28,
      "./settle.js": 30,
      "./some.js": 31,
      "./synchronous_inspection": 32,
      "./thenables": 33,
      "./timers.js": 34,
      "./using.js": 35,
      "./util": 36
    }],
    23: [function (t, e, n) {
      "use strict";

      e.exports = function (e, n, r, i, o) {
        function s(t) {
          switch (t) {
            case -2:
              return [];

            case -3:
              return {};

            case -6:
              return new Map();
          }
        }

        function a(t) {
          var r = this._promise = new e(n);
          t instanceof e && r._propagateFrom(t, 3), r._setOnCancel(this), this._values = t, this._length = 0, this._totalResolved = 0, this._init(void 0, -2);
        }

        var c = t("./util");
        c.isArray;
        return c.inherits(a, o), a.prototype.length = function () {
          return this._length;
        }, a.prototype.promise = function () {
          return this._promise;
        }, a.prototype._init = function l(t, n) {
          var o = r(this._values, this._promise);

          if (o instanceof e) {
            o = o._target();
            var a = o._bitField;
            if (this._values = o, 0 === (50397184 & a)) return this._promise._setAsyncGuaranteed(), o._then(l, this._reject, void 0, this, n);
            if (0 === (33554432 & a)) return 0 !== (16777216 & a) ? this._reject(o._reason()) : this._cancel();
            o = o._value();
          }

          if (o = c.asArray(o), null === o) {
            var u = i("expecting an array or an iterable object but got " + c.classString(o)).reason();
            return void this._promise._rejectCallback(u, !1);
          }

          return 0 === o.length ? void (-5 === n ? this._resolveEmptyArray() : this._resolve(s(n))) : void this._iterate(o);
        }, a.prototype._iterate = function (t) {
          var n = this.getActualLength(t.length);
          this._length = n, this._values = this.shouldCopyValues() ? new Array(n) : this._values;

          for (var i = this._promise, o = !1, s = null, a = 0; n > a; ++a) {
            var c = r(t[a], i);
            c instanceof e ? (c = c._target(), s = c._bitField) : s = null, o ? null !== s && c.suppressUnhandledRejections() : null !== s ? 0 === (50397184 & s) ? (c._proxy(this, a), this._values[a] = c) : o = 0 !== (33554432 & s) ? this._promiseFulfilled(c._value(), a) : 0 !== (16777216 & s) ? this._promiseRejected(c._reason(), a) : this._promiseCancelled(a) : o = this._promiseFulfilled(c, a);
          }

          o || i._setAsyncGuaranteed();
        }, a.prototype._isResolved = function () {
          return null === this._values;
        }, a.prototype._resolve = function (t) {
          this._values = null, this._promise._fulfill(t);
        }, a.prototype._cancel = function () {
          !this._isResolved() && this._promise._isCancellable() && (this._values = null, this._promise._cancel());
        }, a.prototype._reject = function (t) {
          this._values = null, this._promise._rejectCallback(t, !1);
        }, a.prototype._promiseFulfilled = function (t, e) {
          this._values[e] = t;
          var n = ++this._totalResolved;
          return n >= this._length ? (this._resolve(this._values), !0) : !1;
        }, a.prototype._promiseCancelled = function () {
          return this._cancel(), !0;
        }, a.prototype._promiseRejected = function (t) {
          return this._totalResolved++, this._reject(t), !0;
        }, a.prototype._resultCancelled = function () {
          if (!this._isResolved()) {
            var t = this._values;
            if (this._cancel(), t instanceof e) t.cancel();else for (var n = 0; n < t.length; ++n) {
              t[n] instanceof e && t[n].cancel();
            }
          }
        }, a.prototype.shouldCopyValues = function () {
          return !0;
        }, a.prototype.getActualLength = function (t) {
          return t;
        }, a;
      };
    }, {
      "./util": 36
    }],
    24: [function (t, e, n) {
      "use strict";

      e.exports = function (e, n) {
        function r(t) {
          return !C.test(t);
        }

        function i(t) {
          try {
            return t.__isPromisified__ === !0;
          } catch (e) {
            return !1;
          }
        }

        function o(t, e, n) {
          var r = f.getDataPropertyOrDefault(t, e + n, b);
          return r ? i(r) : !1;
        }

        function s(t, e, n) {
          for (var r = 0; r < t.length; r += 2) {
            var i = t[r];
            if (n.test(i)) for (var o = i.replace(n, ""), s = 0; s < t.length; s += 2) {
              if (t[s] === o) throw new m("Cannot promisify an API that has normal methods with '%s'-suffix\n\n    See http://goo.gl/MqrFmX\n".replace("%s", e));
            }
          }
        }

        function a(t, e, n, r) {
          for (var a = f.inheritedDataKeys(t), c = [], l = 0; l < a.length; ++l) {
            var u = a[l],
                p = t[u],
                h = r === j ? !0 : j(u, p, t);
            "function" != typeof p || i(p) || o(t, u, e) || !r(u, p, t, h) || c.push(u, p);
          }

          return s(c, e, n), c;
        }

        function c(t, r, i, o, s, a) {
          function c() {
            var i = r;
            r === h && (i = this);
            var o = new e(n);

            o._captureStackTrace();

            var s = "string" == typeof u && this !== l ? this[u] : t,
                c = _(o, a);

            try {
              s.apply(i, d(arguments, c));
            } catch (p) {
              o._rejectCallback(v(p), !0, !0);
            }

            return o._isFateSealed() || o._setAsyncGuaranteed(), o;
          }

          var l = function () {
            return this;
          }(),
              u = t;

          return "string" == typeof u && (t = o), f.notEnumerableProp(c, "__isPromisified__", !0), c;
        }

        function l(t, e, n, r, i) {
          for (var o = new RegExp(E(e) + "$"), s = a(t, e, o, n), c = 0, l = s.length; l > c; c += 2) {
            var u = s[c],
                p = s[c + 1],
                _ = u + e;

            if (r === k) t[_] = k(u, h, u, p, e, i);else {
              var d = r(p, function () {
                return k(u, h, u, p, e, i);
              });
              f.notEnumerableProp(d, "__isPromisified__", !0), t[_] = d;
            }
          }

          return f.toFastProperties(t), t;
        }

        function u(t, e, n) {
          return k(t, e, void 0, t, null, n);
        }

        var p,
            h = {},
            f = t("./util"),
            _ = t("./nodeback"),
            d = f.withAppended,
            v = f.maybeWrapAsError,
            y = f.canEvaluate,
            m = t("./errors").TypeError,
            g = "Async",
            b = {
          __isPromisified__: !0
        },
            w = ["arity", "length", "name", "arguments", "caller", "callee", "prototype", "__isPromisified__"],
            C = new RegExp("^(?:" + w.join("|") + ")$"),
            j = function j(t) {
          return f.isIdentifier(t) && "_" !== t.charAt(0) && "constructor" !== t;
        },
            E = function E(t) {
          return t.replace(/([$])/, "\\$");
        },
            k = y ? p : c;

        e.promisify = function (t, e) {
          if ("function" != typeof t) throw new m("expecting a function but got " + f.classString(t));
          if (i(t)) return t;
          e = Object(e);
          var n = void 0 === e.context ? h : e.context,
              o = !!e.multiArgs,
              s = u(t, n, o);
          return f.copyDescriptors(t, s, r), s;
        }, e.promisifyAll = function (t, e) {
          if ("function" != typeof t && "object" != _typeof(t)) throw new m("the target of promisifyAll must be an object or a function\n\n    See http://goo.gl/MqrFmX\n");
          e = Object(e);
          var n = !!e.multiArgs,
              r = e.suffix;
          "string" != typeof r && (r = g);
          var i = e.filter;
          "function" != typeof i && (i = j);
          var o = e.promisifier;
          if ("function" != typeof o && (o = k), !f.isIdentifier(r)) throw new RangeError("suffix must be a valid identifier\n\n    See http://goo.gl/MqrFmX\n");

          for (var s = f.inheritedDataKeys(t), a = 0; a < s.length; ++a) {
            var c = t[s[a]];
            "constructor" !== s[a] && f.isClass(c) && (l(c.prototype, r, i, o, n), l(c, r, i, o, n));
          }

          return l(t, r, i, o, n);
        };
      };
    }, {
      "./errors": 12,
      "./nodeback": 20,
      "./util": 36
    }],
    25: [function (t, e, n) {
      "use strict";

      e.exports = function (e, n, r, i) {
        function o(t) {
          var e,
              n = !1;
          if (void 0 !== a && t instanceof a) e = p(t), n = !0;else {
            var r = u.keys(t),
                i = r.length;
            e = new Array(2 * i);

            for (var o = 0; i > o; ++o) {
              var s = r[o];
              e[o] = t[s], e[o + i] = s;
            }
          }
          this.constructor$(e), this._isMap = n, this._init$(void 0, n ? -6 : -3);
        }

        function s(t) {
          var n,
              s = r(t);
          return l(s) ? (n = s instanceof e ? s._then(e.props, void 0, void 0, void 0, void 0) : new o(s).promise(), s instanceof e && n._propagateFrom(s, 2), n) : i("cannot await properties of a non-object\n\n    See http://goo.gl/MqrFmX\n");
        }

        var a,
            c = t("./util"),
            l = c.isObject,
            u = t("./es5");
        "function" == typeof Map && (a = Map);

        var p = function () {
          function t(t, r) {
            this[e] = t, this[e + n] = r, e++;
          }

          var e = 0,
              n = 0;
          return function (r) {
            n = r.size, e = 0;
            var i = new Array(2 * r.size);
            return r.forEach(t, i), i;
          };
        }(),
            h = function h(t) {
          for (var e = new a(), n = t.length / 2 | 0, r = 0; n > r; ++r) {
            var i = t[n + r],
                o = t[r];
            e.set(i, o);
          }

          return e;
        };

        c.inherits(o, n), o.prototype._init = function () {}, o.prototype._promiseFulfilled = function (t, e) {
          this._values[e] = t;
          var n = ++this._totalResolved;

          if (n >= this._length) {
            var r;
            if (this._isMap) r = h(this._values);else {
              r = {};

              for (var i = this.length(), o = 0, s = this.length(); s > o; ++o) {
                r[this._values[o + i]] = this._values[o];
              }
            }
            return this._resolve(r), !0;
          }

          return !1;
        }, o.prototype.shouldCopyValues = function () {
          return !1;
        }, o.prototype.getActualLength = function (t) {
          return t >> 1;
        }, e.prototype.props = function () {
          return s(this);
        }, e.props = function (t) {
          return s(t);
        };
      };
    }, {
      "./es5": 13,
      "./util": 36
    }],
    26: [function (t, e, n) {
      "use strict";

      function r(t, e, n, r, i) {
        for (var o = 0; i > o; ++o) {
          n[o + r] = t[o + e], t[o + e] = void 0;
        }
      }

      function i(t) {
        this._capacity = t, this._length = 0, this._front = 0;
      }

      i.prototype._willBeOverCapacity = function (t) {
        return this._capacity < t;
      }, i.prototype._pushOne = function (t) {
        var e = this.length();

        this._checkCapacity(e + 1);

        var n = this._front + e & this._capacity - 1;
        this[n] = t, this._length = e + 1;
      }, i.prototype.push = function (t, e, n) {
        var r = this.length() + 3;
        if (this._willBeOverCapacity(r)) return this._pushOne(t), this._pushOne(e), void this._pushOne(n);
        var i = this._front + r - 3;

        this._checkCapacity(r);

        var o = this._capacity - 1;
        this[i + 0 & o] = t, this[i + 1 & o] = e, this[i + 2 & o] = n, this._length = r;
      }, i.prototype.shift = function () {
        var t = this._front,
            e = this[t];
        return this[t] = void 0, this._front = t + 1 & this._capacity - 1, this._length--, e;
      }, i.prototype.length = function () {
        return this._length;
      }, i.prototype._checkCapacity = function (t) {
        this._capacity < t && this._resizeTo(this._capacity << 1);
      }, i.prototype._resizeTo = function (t) {
        var e = this._capacity;
        this._capacity = t;
        var n = this._front,
            i = this._length,
            o = n + i & e - 1;
        r(this, 0, this, e, o);
      }, e.exports = i;
    }, {}],
    27: [function (t, e, n) {
      "use strict";

      e.exports = function (e, n, r, i) {
        function o(t, o) {
          var c = r(t);
          if (c instanceof e) return a(c);
          if (t = s.asArray(t), null === t) return i("expecting an array or an iterable object but got " + s.classString(t));
          var l = new e(n);
          void 0 !== o && l._propagateFrom(o, 3);

          for (var u = l._fulfill, p = l._reject, h = 0, f = t.length; f > h; ++h) {
            var _ = t[h];
            (void 0 !== _ || h in t) && e.cast(_)._then(u, p, void 0, l, null);
          }

          return l;
        }

        var s = t("./util"),
            a = function a(t) {
          return t.then(function (e) {
            return o(e, t);
          });
        };

        e.race = function (t) {
          return o(t, void 0);
        }, e.prototype.race = function () {
          return o(this, void 0);
        };
      };
    }, {
      "./util": 36
    }],
    28: [function (t, e, n) {
      "use strict";

      e.exports = function (e, n, r, i, o, s) {
        function a(t, n, r, i) {
          this.constructor$(t);
          var s = h();
          this._fn = null === s ? n : f.domainBind(s, n), void 0 !== r && (r = e.resolve(r), r._attachCancellationCallback(this)), this._initialValue = r, this._currentCancellable = null, i === o ? this._eachValues = Array(this._length) : 0 === i ? this._eachValues = null : this._eachValues = void 0, this._promise._captureStackTrace(), this._init$(void 0, -5);
        }

        function c(t, e) {
          this.isFulfilled() ? e._resolve(t) : e._reject(t);
        }

        function l(t, e, n, i) {
          if ("function" != typeof e) return r("expecting a function but got " + f.classString(e));
          var o = new a(t, e, n, i);
          return o.promise();
        }

        function u(t) {
          this.accum = t, this.array._gotAccum(t);
          var n = i(this.value, this.array._promise);
          return n instanceof e ? (this.array._currentCancellable = n, n._then(p, void 0, void 0, this, void 0)) : p.call(this, n);
        }

        function p(t) {
          var n = this.array,
              r = n._promise,
              i = _(n._fn);

          r._pushContext();

          var o;
          o = void 0 !== n._eachValues ? i.call(r._boundValue(), t, this.index, this.length) : i.call(r._boundValue(), this.accum, t, this.index, this.length), o instanceof e && (n._currentCancellable = o);

          var a = r._popContext();

          return s.checkForgottenReturns(o, a, void 0 !== n._eachValues ? "Promise.each" : "Promise.reduce", r), o;
        }

        var h = e._getDomain,
            f = t("./util"),
            _ = f.tryCatch;
        f.inherits(a, n), a.prototype._gotAccum = function (t) {
          void 0 !== this._eachValues && null !== this._eachValues && t !== o && this._eachValues.push(t);
        }, a.prototype._eachComplete = function (t) {
          return null !== this._eachValues && this._eachValues.push(t), this._eachValues;
        }, a.prototype._init = function () {}, a.prototype._resolveEmptyArray = function () {
          this._resolve(void 0 !== this._eachValues ? this._eachValues : this._initialValue);
        }, a.prototype.shouldCopyValues = function () {
          return !1;
        }, a.prototype._resolve = function (t) {
          this._promise._resolveCallback(t), this._values = null;
        }, a.prototype._resultCancelled = function (t) {
          return t === this._initialValue ? this._cancel() : void (this._isResolved() || (this._resultCancelled$(), this._currentCancellable instanceof e && this._currentCancellable.cancel(), this._initialValue instanceof e && this._initialValue.cancel()));
        }, a.prototype._iterate = function (t) {
          this._values = t;
          var n,
              r,
              i = t.length;
          if (void 0 !== this._initialValue ? (n = this._initialValue, r = 0) : (n = e.resolve(t[0]), r = 1), this._currentCancellable = n, !n.isRejected()) for (; i > r; ++r) {
            var o = {
              accum: null,
              value: t[r],
              index: r,
              length: i,
              array: this
            };
            n = n._then(u, void 0, void 0, o, void 0);
          }
          void 0 !== this._eachValues && (n = n._then(this._eachComplete, void 0, void 0, this, void 0)), n._then(c, c, void 0, n, this);
        }, e.prototype.reduce = function (t, e) {
          return l(this, t, e, null);
        }, e.reduce = function (t, e, n, r) {
          return l(t, e, n, r);
        };
      };
    }, {
      "./util": 36
    }],
    29: [function (t, e, n) {
      "use strict";

      var r,
          i = t("./util"),
          o = function o() {
        throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n");
      },
          s = i.getNativePromise();

      if (i.isNode && "undefined" == typeof MutationObserver) {
        var a = global.setImmediate,
            c = process.nextTick;
        r = i.isRecentNode ? function (t) {
          a.call(global, t);
        } : function (t) {
          c.call(process, t);
        };
      } else if ("function" == typeof s && "function" == typeof s.resolve) {
        var l = s.resolve();

        r = function r(t) {
          l.then(t);
        };
      } else r = "undefined" == typeof MutationObserver || "undefined" != typeof window && window.navigator && (window.navigator.standalone || window.cordova) ? "undefined" != typeof setImmediate ? function (t) {
        setImmediate(t);
      } : "undefined" != typeof setTimeout ? function (t) {
        setTimeout(t, 0);
      } : o : function () {
        var t = document.createElement("div"),
            e = {
          attributes: !0
        },
            n = !1,
            r = document.createElement("div"),
            i = new MutationObserver(function () {
          t.classList.toggle("foo"), n = !1;
        });
        i.observe(r, e);

        var o = function o() {
          n || (n = !0, r.classList.toggle("foo"));
        };

        return function (n) {
          var r = new MutationObserver(function () {
            r.disconnect(), n();
          });
          r.observe(t, e), o();
        };
      }();

      e.exports = r;
    }, {
      "./util": 36
    }],
    30: [function (t, e, n) {
      "use strict";

      e.exports = function (e, n, r) {
        function i(t) {
          this.constructor$(t);
        }

        var o = e.PromiseInspection,
            s = t("./util");
        s.inherits(i, n), i.prototype._promiseResolved = function (t, e) {
          this._values[t] = e;
          var n = ++this._totalResolved;
          return n >= this._length ? (this._resolve(this._values), !0) : !1;
        }, i.prototype._promiseFulfilled = function (t, e) {
          var n = new o();
          return n._bitField = 33554432, n._settledValueField = t, this._promiseResolved(e, n);
        }, i.prototype._promiseRejected = function (t, e) {
          var n = new o();
          return n._bitField = 16777216, n._settledValueField = t, this._promiseResolved(e, n);
        }, e.settle = function (t) {
          return r.deprecated(".settle()", ".reflect()"), new i(t).promise();
        }, e.prototype.settle = function () {
          return e.settle(this);
        };
      };
    }, {
      "./util": 36
    }],
    31: [function (t, e, n) {
      "use strict";

      e.exports = function (e, n, r) {
        function i(t) {
          this.constructor$(t), this._howMany = 0, this._unwrap = !1, this._initialized = !1;
        }

        function o(t, e) {
          if ((0 | e) !== e || 0 > e) return r("expecting a positive integer\n\n    See http://goo.gl/MqrFmX\n");
          var n = new i(t),
              o = n.promise();
          return n.setHowMany(e), n.init(), o;
        }

        var s = t("./util"),
            a = t("./errors").RangeError,
            c = t("./errors").AggregateError,
            l = s.isArray,
            u = {};
        s.inherits(i, n), i.prototype._init = function () {
          if (this._initialized) {
            if (0 === this._howMany) return void this._resolve([]);

            this._init$(void 0, -5);

            var t = l(this._values);
            !this._isResolved() && t && this._howMany > this._canPossiblyFulfill() && this._reject(this._getRangeError(this.length()));
          }
        }, i.prototype.init = function () {
          this._initialized = !0, this._init();
        }, i.prototype.setUnwrap = function () {
          this._unwrap = !0;
        }, i.prototype.howMany = function () {
          return this._howMany;
        }, i.prototype.setHowMany = function (t) {
          this._howMany = t;
        }, i.prototype._promiseFulfilled = function (t) {
          return this._addFulfilled(t), this._fulfilled() === this.howMany() ? (this._values.length = this.howMany(), 1 === this.howMany() && this._unwrap ? this._resolve(this._values[0]) : this._resolve(this._values), !0) : !1;
        }, i.prototype._promiseRejected = function (t) {
          return this._addRejected(t), this._checkOutcome();
        }, i.prototype._promiseCancelled = function () {
          return this._values instanceof e || null == this._values ? this._cancel() : (this._addRejected(u), this._checkOutcome());
        }, i.prototype._checkOutcome = function () {
          if (this.howMany() > this._canPossiblyFulfill()) {
            for (var t = new c(), e = this.length(); e < this._values.length; ++e) {
              this._values[e] !== u && t.push(this._values[e]);
            }

            return t.length > 0 ? this._reject(t) : this._cancel(), !0;
          }

          return !1;
        }, i.prototype._fulfilled = function () {
          return this._totalResolved;
        }, i.prototype._rejected = function () {
          return this._values.length - this.length();
        }, i.prototype._addRejected = function (t) {
          this._values.push(t);
        }, i.prototype._addFulfilled = function (t) {
          this._values[this._totalResolved++] = t;
        }, i.prototype._canPossiblyFulfill = function () {
          return this.length() - this._rejected();
        }, i.prototype._getRangeError = function (t) {
          var e = "Input array must contain at least " + this._howMany + " items but contains only " + t + " items";
          return new a(e);
        }, i.prototype._resolveEmptyArray = function () {
          this._reject(this._getRangeError(0));
        }, e.some = function (t, e) {
          return o(t, e);
        }, e.prototype.some = function (t) {
          return o(this, t);
        }, e._SomePromiseArray = i;
      };
    }, {
      "./errors": 12,
      "./util": 36
    }],
    32: [function (t, e, n) {
      "use strict";

      e.exports = function (t) {
        function e(t) {
          void 0 !== t ? (t = t._target(), this._bitField = t._bitField, this._settledValueField = t._isFateSealed() ? t._settledValue() : void 0) : (this._bitField = 0, this._settledValueField = void 0);
        }

        e.prototype._settledValue = function () {
          return this._settledValueField;
        };

        var n = e.prototype.value = function () {
          if (!this.isFulfilled()) throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\n\n    See http://goo.gl/MqrFmX\n");
          return this._settledValue();
        },
            r = e.prototype.error = e.prototype.reason = function () {
          if (!this.isRejected()) throw new TypeError("cannot get rejection reason of a non-rejected promise\n\n    See http://goo.gl/MqrFmX\n");
          return this._settledValue();
        },
            i = e.prototype.isFulfilled = function () {
          return 0 !== (33554432 & this._bitField);
        },
            o = e.prototype.isRejected = function () {
          return 0 !== (16777216 & this._bitField);
        },
            s = e.prototype.isPending = function () {
          return 0 === (50397184 & this._bitField);
        },
            a = e.prototype.isResolved = function () {
          return 0 !== (50331648 & this._bitField);
        };

        e.prototype.isCancelled = function () {
          return 0 !== (8454144 & this._bitField);
        }, t.prototype.__isCancelled = function () {
          return 65536 === (65536 & this._bitField);
        }, t.prototype._isCancelled = function () {
          return this._target().__isCancelled();
        }, t.prototype.isCancelled = function () {
          return 0 !== (8454144 & this._target()._bitField);
        }, t.prototype.isPending = function () {
          return s.call(this._target());
        }, t.prototype.isRejected = function () {
          return o.call(this._target());
        }, t.prototype.isFulfilled = function () {
          return i.call(this._target());
        }, t.prototype.isResolved = function () {
          return a.call(this._target());
        }, t.prototype.value = function () {
          return n.call(this._target());
        }, t.prototype.reason = function () {
          var t = this._target();

          return t._unsetRejectionIsUnhandled(), r.call(t);
        }, t.prototype._value = function () {
          return this._settledValue();
        }, t.prototype._reason = function () {
          return this._unsetRejectionIsUnhandled(), this._settledValue();
        }, t.PromiseInspection = e;
      };
    }, {}],
    33: [function (t, e, n) {
      "use strict";

      e.exports = function (e, n) {
        function r(t, r) {
          if (u(t)) {
            if (t instanceof e) return t;
            var i = o(t);

            if (i === l) {
              r && r._pushContext();
              var c = e.reject(i.e);
              return r && r._popContext(), c;
            }

            if ("function" == typeof i) {
              if (s(t)) {
                var c = new e(n);
                return t._then(c._fulfill, c._reject, void 0, c, null), c;
              }

              return a(t, i, r);
            }
          }

          return t;
        }

        function i(t) {
          return t.then;
        }

        function o(t) {
          try {
            return i(t);
          } catch (e) {
            return l.e = e, l;
          }
        }

        function s(t) {
          try {
            return p.call(t, "_promise0");
          } catch (e) {
            return !1;
          }
        }

        function a(t, r, i) {
          function o(t) {
            a && (a._resolveCallback(t), a = null);
          }

          function s(t) {
            a && (a._rejectCallback(t, p, !0), a = null);
          }

          var a = new e(n),
              u = a;
          i && i._pushContext(), a._captureStackTrace(), i && i._popContext();
          var p = !0,
              h = c.tryCatch(r).call(t, o, s);
          return p = !1, a && h === l && (a._rejectCallback(h.e, !0, !0), a = null), u;
        }

        var c = t("./util"),
            l = c.errorObj,
            u = c.isObject,
            p = {}.hasOwnProperty;
        return r;
      };
    }, {
      "./util": 36
    }],
    34: [function (t, e, n) {
      "use strict";

      e.exports = function (e, n, r) {
        function i(t) {
          this.handle = t;
        }

        function o(t) {
          return clearTimeout(this.handle), t;
        }

        function s(t) {
          throw clearTimeout(this.handle), t;
        }

        var a = t("./util"),
            c = e.TimeoutError;

        i.prototype._resultCancelled = function () {
          clearTimeout(this.handle);
        };

        var l = function l(t) {
          return u(+this).thenReturn(t);
        },
            u = e.delay = function (t, o) {
          var s, a;
          return void 0 !== o ? (s = e.resolve(o)._then(l, null, null, t, void 0), r.cancellation() && o instanceof e && s._setOnCancel(o)) : (s = new e(n), a = setTimeout(function () {
            s._fulfill();
          }, +t), r.cancellation() && s._setOnCancel(new i(a)), s._captureStackTrace()), s._setAsyncGuaranteed(), s;
        };

        e.prototype.delay = function (t) {
          return u(t, this);
        };

        var p = function p(t, e, n) {
          var r;
          r = "string" != typeof e ? e instanceof Error ? e : new c("operation timed out") : new c(e), a.markAsOriginatingFromRejection(r), t._attachExtraTrace(r), t._reject(r), null != n && n.cancel();
        };

        e.prototype.timeout = function (t, e) {
          t = +t;
          var n,
              a,
              c = new i(setTimeout(function () {
            n.isPending() && p(n, e, a);
          }, t));
          return r.cancellation() ? (a = this.then(), n = a._then(o, s, void 0, c, void 0), n._setOnCancel(c)) : n = this._then(o, s, void 0, c, void 0), n;
        };
      };
    }, {
      "./util": 36
    }],
    35: [function (t, e, n) {
      "use strict";

      e.exports = function (e, n, r, i, o, s) {
        function a(t) {
          setTimeout(function () {
            throw t;
          }, 0);
        }

        function c(t) {
          var e = r(t);
          return e !== t && "function" == typeof t._isDisposable && "function" == typeof t._getDisposer && t._isDisposable() && e._setDisposable(t._getDisposer()), e;
        }

        function l(t, n) {
          function i() {
            if (s >= l) return u._fulfill();
            var o = c(t[s++]);

            if (o instanceof e && o._isDisposable()) {
              try {
                o = r(o._getDisposer().tryDispose(n), t.promise);
              } catch (p) {
                return a(p);
              }

              if (o instanceof e) return o._then(i, a, null, null, null);
            }

            i();
          }

          var s = 0,
              l = t.length,
              u = new e(o);
          return i(), u;
        }

        function u(t, e, n) {
          this._data = t, this._promise = e, this._context = n;
        }

        function p(t, e, n) {
          this.constructor$(t, e, n);
        }

        function h(t) {
          return u.isDisposer(t) ? (this.resources[this.index]._setDisposable(t), t.promise()) : t;
        }

        function f(t) {
          this.length = t, this.promise = null, this[t - 1] = null;
        }

        var _ = t("./util"),
            d = t("./errors").TypeError,
            v = t("./util").inherits,
            y = _.errorObj,
            m = _.tryCatch,
            g = {};

        u.prototype.data = function () {
          return this._data;
        }, u.prototype.promise = function () {
          return this._promise;
        }, u.prototype.resource = function () {
          return this.promise().isFulfilled() ? this.promise().value() : g;
        }, u.prototype.tryDispose = function (t) {
          var e = this.resource(),
              n = this._context;
          void 0 !== n && n._pushContext();
          var r = e !== g ? this.doDispose(e, t) : null;
          return void 0 !== n && n._popContext(), this._promise._unsetDisposable(), this._data = null, r;
        }, u.isDisposer = function (t) {
          return null != t && "function" == typeof t.resource && "function" == typeof t.tryDispose;
        }, v(p, u), p.prototype.doDispose = function (t, e) {
          var n = this.data();
          return n.call(t, t, e);
        }, f.prototype._resultCancelled = function () {
          for (var t = this.length, n = 0; t > n; ++n) {
            var r = this[n];
            r instanceof e && r.cancel();
          }
        }, e.using = function () {
          var t = arguments.length;
          if (2 > t) return n("you must pass at least 2 arguments to Promise.using");
          var i = arguments[t - 1];
          if ("function" != typeof i) return n("expecting a function but got " + _.classString(i));
          var o,
              a = !0;
          2 === t && Array.isArray(arguments[0]) ? (o = arguments[0], t = o.length, a = !1) : (o = arguments, t--);

          for (var c = new f(t), p = 0; t > p; ++p) {
            var d = o[p];

            if (u.isDisposer(d)) {
              var v = d;
              d = d.promise(), d._setDisposable(v);
            } else {
              var g = r(d);
              g instanceof e && (d = g._then(h, null, null, {
                resources: c,
                index: p
              }, void 0));
            }

            c[p] = d;
          }

          for (var b = new Array(c.length), p = 0; p < b.length; ++p) {
            b[p] = e.resolve(c[p]).reflect();
          }

          var w = e.all(b).then(function (t) {
            for (var e = 0; e < t.length; ++e) {
              var n = t[e];
              if (n.isRejected()) return y.e = n.error(), y;
              if (!n.isFulfilled()) return void w.cancel();
              t[e] = n.value();
            }

            C._pushContext(), i = m(i);

            var r = a ? i.apply(void 0, t) : i(t),
                o = C._popContext();

            return s.checkForgottenReturns(r, o, "Promise.using", C), r;
          }),
              C = w.lastly(function () {
            var t = new e.PromiseInspection(w);
            return l(c, t);
          });
          return c.promise = C, C._setOnCancel(c), C;
        }, e.prototype._setDisposable = function (t) {
          this._bitField = 131072 | this._bitField, this._disposer = t;
        }, e.prototype._isDisposable = function () {
          return (131072 & this._bitField) > 0;
        }, e.prototype._getDisposer = function () {
          return this._disposer;
        }, e.prototype._unsetDisposable = function () {
          this._bitField = -131073 & this._bitField, this._disposer = void 0;
        }, e.prototype.disposer = function (t) {
          if ("function" == typeof t) return new p(t, this, i());
          throw new d();
        };
      };
    }, {
      "./errors": 12,
      "./util": 36
    }],
    36: [function (t, e, n) {
      "use strict";

      function r() {
        try {
          var t = P;
          return P = null, t.apply(this, arguments);
        } catch (e) {
          return T.e = e, T;
        }
      }

      function i(t) {
        return P = t, r;
      }

      function o(t) {
        return null == t || t === !0 || t === !1 || "string" == typeof t || "number" == typeof t;
      }

      function s(t) {
        return "function" == typeof t || "object" == _typeof(t) && null !== t;
      }

      function a(t) {
        return o(t) ? new Error(v(t)) : t;
      }

      function c(t, e) {
        var n,
            r = t.length,
            i = new Array(r + 1);

        for (n = 0; r > n; ++n) {
          i[n] = t[n];
        }

        return i[n] = e, i;
      }

      function l(t, e, n) {
        if (!F.isES5) return {}.hasOwnProperty.call(t, e) ? t[e] : void 0;
        var r = Object.getOwnPropertyDescriptor(t, e);
        return null != r ? null == r.get && null == r.set ? r.value : n : void 0;
      }

      function u(t, e, n) {
        if (o(t)) return t;
        var r = {
          value: n,
          configurable: !0,
          enumerable: !1,
          writable: !0
        };
        return F.defineProperty(t, e, r), t;
      }

      function p(t) {
        throw t;
      }

      function h(t) {
        try {
          if ("function" == typeof t) {
            var e = F.names(t.prototype),
                n = F.isES5 && e.length > 1,
                r = e.length > 0 && !(1 === e.length && "constructor" === e[0]),
                i = A.test(t + "") && F.names(t).length > 0;
            if (n || r || i) return !0;
          }

          return !1;
        } catch (o) {
          return !1;
        }
      }

      function f(t) {
        function e() {}

        e.prototype = t;

        for (var n = 8; n--;) {
          new e();
        }

        return t;
      }

      function _(t) {
        return D.test(t);
      }

      function d(t, e, n) {
        for (var r = new Array(t), i = 0; t > i; ++i) {
          r[i] = e + i + n;
        }

        return r;
      }

      function v(t) {
        try {
          return t + "";
        } catch (e) {
          return "[no string representation]";
        }
      }

      function y(t) {
        return null !== t && "object" == _typeof(t) && "string" == typeof t.message && "string" == typeof t.name;
      }

      function m(t) {
        try {
          u(t, "isOperational", !0);
        } catch (e) {}
      }

      function g(t) {
        return null == t ? !1 : t instanceof Error.__BluebirdErrorTypes__.OperationalError || t.isOperational === !0;
      }

      function b(t) {
        return y(t) && F.propertyIsWritable(t, "stack");
      }

      function w(t) {
        return {}.toString.call(t);
      }

      function C(t, e, n) {
        for (var r = F.names(t), i = 0; i < r.length; ++i) {
          var o = r[i];
          if (n(o)) try {
            F.defineProperty(e, o, F.getDescriptor(t, o));
          } catch (s) {}
        }
      }

      function j(t) {
        return N ? process.env[t] : void 0;
      }

      function E() {
        if ("function" == typeof Promise) try {
          var t = new Promise(function () {});
          if ("[object Promise]" === {}.toString.call(t)) return Promise;
        } catch (e) {}
      }

      function k(t, e) {
        return t.bind(e);
      }

      var F = t("./es5"),
          x = "undefined" == typeof navigator,
          T = {
        e: {}
      },
          P,
          R = "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : void 0 !== this ? this : null,
          S = function S(t, e) {
        function n() {
          this.constructor = t, this.constructor$ = e;

          for (var n in e.prototype) {
            r.call(e.prototype, n) && "$" !== n.charAt(n.length - 1) && (this[n + "$"] = e.prototype[n]);
          }
        }

        var r = {}.hasOwnProperty;
        return n.prototype = e.prototype, t.prototype = new n(), t.prototype;
      },
          O = function () {
        var t = [Array.prototype, Object.prototype, Function.prototype],
            e = function e(_e2) {
          for (var n = 0; n < t.length; ++n) {
            if (t[n] === _e2) return !0;
          }

          return !1;
        };

        if (F.isES5) {
          var n = Object.getOwnPropertyNames;
          return function (t) {
            for (var r = [], i = Object.create(null); null != t && !e(t);) {
              var o;

              try {
                o = n(t);
              } catch (s) {
                return r;
              }

              for (var a = 0; a < o.length; ++a) {
                var c = o[a];

                if (!i[c]) {
                  i[c] = !0;
                  var l = Object.getOwnPropertyDescriptor(t, c);
                  null != l && null == l.get && null == l.set && r.push(c);
                }
              }

              t = F.getPrototypeOf(t);
            }

            return r;
          };
        }

        var r = {}.hasOwnProperty;
        return function (n) {
          if (e(n)) return [];
          var i = [];

          t: for (var o in n) {
            if (r.call(n, o)) i.push(o);else {
              for (var s = 0; s < t.length; ++s) {
                if (r.call(t[s], o)) continue t;
              }

              i.push(o);
            }
          }

          return i;
        };
      }(),
          A = /this\s*\.\s*\S+\s*=/,
          D = /^[a-z$_][a-z$_0-9]*$/i,
          V = function () {
        return "stack" in new Error() ? function (t) {
          return b(t) ? t : new Error(v(t));
        } : function (t) {
          if (b(t)) return t;

          try {
            throw new Error(v(t));
          } catch (e) {
            return e;
          }
        };
      }(),
          I = function I(t) {
        return F.isArray(t) ? t : null;
      };

      if ("undefined" != typeof Symbol && Symbol.iterator) {
        var L = "function" == typeof Array.from ? function (t) {
          return Array.from(t);
        } : function (t) {
          for (var e, n = [], r = t[Symbol.iterator](); !(e = r.next()).done;) {
            n.push(e.value);
          }

          return n;
        };

        I = function I(t) {
          return F.isArray(t) ? t : null != t && "function" == typeof t[Symbol.iterator] ? L(t) : null;
        };
      }

      var H = "undefined" != typeof process && "[object process]" === w(process).toLowerCase(),
          N = "undefined" != typeof process && "undefined" != typeof process.env,
          B = {
        isClass: h,
        isIdentifier: _,
        inheritedDataKeys: O,
        getDataPropertyOrDefault: l,
        thrower: p,
        isArray: F.isArray,
        asArray: I,
        notEnumerableProp: u,
        isPrimitive: o,
        isObject: s,
        isError: y,
        canEvaluate: x,
        errorObj: T,
        tryCatch: i,
        inherits: S,
        withAppended: c,
        maybeWrapAsError: a,
        toFastProperties: f,
        filledRange: d,
        toString: v,
        canAttachTrace: b,
        ensureErrorObject: V,
        originatesFromRejection: g,
        markAsOriginatingFromRejection: m,
        classString: w,
        copyDescriptors: C,
        hasDevTools: "undefined" != typeof chrome && chrome && "function" == typeof chrome.loadTimes,
        isNode: H,
        hasEnvVariables: N,
        env: j,
        global: R,
        getNativePromise: E,
        domainBind: k
      };
      B.isRecentNode = B.isNode && function () {
        var t = process.versions.node.split(".").map(Number);
        return 0 === t[0] && t[1] > 10 || t[0] > 0;
      }(), B.isNode && B.toFastProperties(process);

      try {
        throw new Error();
      } catch (U) {
        B.lastLineError = U;
      }

      e.exports = B;
    }, {
      "./es5": 13
    }]
  }, {}, [4])(4);
}), "undefined" != typeof window && null !== window ? window.P = window.Promise : "undefined" != typeof self && null !== self && (self.P = self.Promise);

(function (self) {
  'use strict';

  if (self.fetch) {
    return;
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && function () {
      try {
        new Blob();
        return true;
      } catch (e) {
        return false;
      }
    }(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  };

  if (support.arrayBuffer) {
    var viewClasses = ['[object Int8Array]', '[object Uint8Array]', '[object Uint8ClampedArray]', '[object Int16Array]', '[object Uint16Array]', '[object Int32Array]', '[object Uint32Array]', '[object Float32Array]', '[object Float64Array]'];

    var isDataView = function isDataView(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj);
    };

    var isArrayBufferView = ArrayBuffer.isView || function (obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
    };
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }

    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name');
    }

    return name.toLowerCase();
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }

    return value;
  } // Build a destructive iterator for the value list


  function iteratorFor(items) {
    var iterator = {
      next: function next() {
        var value = items.shift();
        return {
          done: value === undefined,
          value: value
        };
      }
    };

    if (support.iterable) {
      iterator[Symbol.iterator] = function () {
        return iterator;
      };
    }

    return iterator;
  }

  function Headers(headers) {
    this.map = {};

    if (headers instanceof Headers) {
      headers.forEach(function (value, name) {
        this.append(name, value);
      }, this);
    } else if (Array.isArray(headers)) {
      headers.forEach(function (header) {
        this.append(header[0], header[1]);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function (name) {
        this.append(name, headers[name]);
      }, this);
    }
  }

  Headers.prototype.append = function (name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var oldValue = this.map[name];
    this.map[name] = oldValue ? oldValue + ',' + value : value;
  };

  Headers.prototype['delete'] = function (name) {
    delete this.map[normalizeName(name)];
  };

  Headers.prototype.get = function (name) {
    name = normalizeName(name);
    return this.has(name) ? this.map[name] : null;
  };

  Headers.prototype.has = function (name) {
    return this.map.hasOwnProperty(normalizeName(name));
  };

  Headers.prototype.set = function (name, value) {
    this.map[normalizeName(name)] = normalizeValue(value);
  };

  Headers.prototype.forEach = function (callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this);
      }
    }
  };

  Headers.prototype.keys = function () {
    var items = [];
    this.forEach(function (value, name) {
      items.push(name);
    });
    return iteratorFor(items);
  };

  Headers.prototype.values = function () {
    var items = [];
    this.forEach(function (value) {
      items.push(value);
    });
    return iteratorFor(items);
  };

  Headers.prototype.entries = function () {
    var items = [];
    this.forEach(function (value, name) {
      items.push([name, value]);
    });
    return iteratorFor(items);
  };

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'));
    }

    body.bodyUsed = true;
  }

  function fileReaderReady(reader) {
    return new Promise(function (resolve, reject) {
      reader.onload = function () {
        resolve(reader.result);
      };

      reader.onerror = function () {
        reject(reader.error);
      };
    });
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsArrayBuffer(blob);
    return promise;
  }

  function readBlobAsText(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsText(blob);
    return promise;
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf);
    var chars = new Array(view.length);

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i]);
    }

    return chars.join('');
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0);
    } else {
      var view = new Uint8Array(buf.byteLength);
      view.set(new Uint8Array(buf));
      return view.buffer;
    }
  }

  function Body() {
    this.bodyUsed = false;

    this._initBody = function (body) {
      this._bodyInit = body;

      if (!body) {
        this._bodyText = '';
      } else if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString();
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer); // IE 10-11 can't handle a DataView body.

        this._bodyInit = new Blob([this._bodyArrayBuffer]);
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body);
      } else {
        throw new Error('unsupported BodyInit type');
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8');
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type);
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
      }
    };

    if (support.blob) {
      this.blob = function () {
        var rejected = consumed(this);

        if (rejected) {
          return rejected;
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob);
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]));
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob');
        } else {
          return Promise.resolve(new Blob([this._bodyText]));
        }
      };

      this.arrayBuffer = function () {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
        } else {
          return this.blob().then(readBlobAsArrayBuffer);
        }
      };
    }

    this.text = function () {
      var rejected = consumed(this);

      if (rejected) {
        return rejected;
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob);
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text');
      } else {
        return Promise.resolve(this._bodyText);
      }
    };

    if (support.formData) {
      this.formData = function () {
        return this.text().then(decode);
      };
    }

    this.json = function () {
      return this.text().then(JSON.parse);
    };

    return this;
  } // HTTP methods whose capitalization should be normalized


  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return methods.indexOf(upcased) > -1 ? upcased : method;
  }

  function Request(input, options) {
    options = options || {};
    var body = options.body;

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read');
      }

      this.url = input.url;
      this.credentials = input.credentials;

      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }

      this.method = input.method;
      this.mode = input.mode;

      if (!body && input._bodyInit != null) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = String(input);
    }

    this.credentials = options.credentials || this.credentials || 'omit';

    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }

    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.referrer = null;

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests');
    }

    this._initBody(body);
  }

  Request.prototype.clone = function () {
    return new Request(this, {
      body: this._bodyInit
    });
  };

  function decode(body) {
    var form = new FormData();
    body.trim().split('&').forEach(function (bytes) {
      if (bytes) {
        var split = bytes.split('=');
        var name = split.shift().replace(/\+/g, ' ');
        var value = split.join('=').replace(/\+/g, ' ');
        form.append(decodeURIComponent(name), decodeURIComponent(value));
      }
    });
    return form;
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers();
    rawHeaders.split(/\r?\n/).forEach(function (line) {
      var parts = line.split(':');
      var key = parts.shift().trim();

      if (key) {
        var value = parts.join(':').trim();
        headers.append(key, value);
      }
    });
    return headers;
  }

  Body.call(Request.prototype);

  function Response(bodyInit, options) {
    if (!options) {
      options = {};
    }

    this.type = 'default';
    this.status = 'status' in options ? options.status : 200;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = 'statusText' in options ? options.statusText : 'OK';
    this.headers = new Headers(options.headers);
    this.url = options.url || '';

    this._initBody(bodyInit);
  }

  Body.call(Response.prototype);

  Response.prototype.clone = function () {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    });
  };

  Response.error = function () {
    var response = new Response(null, {
      status: 0,
      statusText: ''
    });
    response.type = 'error';
    return response;
  };

  var redirectStatuses = [301, 302, 303, 307, 308];

  Response.redirect = function (url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code');
    }

    return new Response(null, {
      status: status,
      headers: {
        location: url
      }
    });
  };

  self.Headers = Headers;
  self.Request = Request;
  self.Response = Response;

  self.fetch = function (input, init) {
    return new Promise(function (resolve, reject) {
      var request = new Request(input, init);
      var xhr = new XMLHttpRequest();

      xhr.onload = function () {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        };
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options));
      };

      xhr.onerror = function () {
        reject(new TypeError('Network request failed'));
      };

      xhr.ontimeout = function () {
        reject(new TypeError('Network request failed'));
      };

      xhr.open(request.method, request.url, true);

      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob';
      }

      request.headers.forEach(function (value, name) {
        xhr.setRequestHeader(name, value);
      });
      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    });
  };

  self.fetch.polyfill = true;
})(typeof self !== 'undefined' ? self : void 0);
'use strict'; // Фильтр

var range = document.querySelector('#range');
var gpuCheckbox = document.querySelector('#gpu');
var raidCheckbox = document.querySelector('#raid');
var ssdCheckbox = document.querySelector('#ssd');
var resultWrap = document.querySelector('.result__wrap');
var loader = document.querySelector('.loader');
var error = document.querySelector('.error');
var myData = []; // получает данные

function getData() {
  return fetch('https://api.jsonbin.io/b/5df3c10a2c714135cda0bf0f/1').then(function (response) {
    if (response.ok) {
      // после загрузки скрываем loader
      loader.setAttribute('style', 'display: none'); // получаем данные

      return response.json();
    } else {
      loader.setAttribute('style', 'display: none');
      error.setAttribute('style', 'display: block');
      throw new Error('Данные не были получены, ошибка: ' + response.status);
    }
  }).then(function (data) {
    // записываем в переменную
    myData = data;
    return data;
  })["catch"](function (err) {
    console.log(err);
  });
} // основной фильтр


var filter = function filter(data) {
  var rangeValue = Number(document.querySelector('#range').value);
  var result = data.filter(function (el) {
    return rangeValue === el.cpu.cores * el.cpu.count && filterGPU(el) && filterRAID(el) && filterSSD(el);
  });
  render(result);
}; // фильтр GPU


function filterGPU(el) {
  if (gpuCheckbox.checked) {
    return el.gpu ? true : false;
  } else {
    return true;
  }
} // фильтр RAID


function filterRAID(el) {
  if (raidCheckbox.checked) {
    return el.disk.count >= 2 ? true : false;
  } else {
    return true;
  }
} // фильтр SSD


function filterSSD(el) {
  if (ssdCheckbox.checked) {
    return el.disk.type === 'SSD' ? true : false;
  } else {
    return true;
  }
} // Рендер результата


function render(data) {
  resultWrap.innerHTML = ""; // если результат filter() пустой

  if (data.length === 0) {
    var p = document.createElement('p');
    p.className = 'result__error';
    p.innerHTML = "\u041D\u0435\u0442 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432";
    resultWrap.appendChild(p);
  } else {
    data.forEach(function (el) {
      var div = document.createElement('div');
      div.className = 'result__block';
      div.innerHTML = "\n        <div class=\"result__item result__item--cpu\">\n          <p>".concat(el.name, "</p>\n          <span>").concat(el.cpu.name, ", ").concat(el.cpu.count * el.cpu.cores, " \u044F\u0434\u0435\u0440</span>\n        </div>\n        <div class=\"result__item\">\n          <p>").concat(el.ram, "</p>\n        </div>\n        <div class=\"result__item\">\n          <p>").concat(el.disk.count, " x ").concat(el.disk.value, " ").concat(el.disk.type, "</p>\n        </div>\n        <div class=\"result__item\">\n          <p>").concat(el.gpu ? el.gpu : '', "</p>\n        </div>\n        <div class=\"result__item result__item--price\">\n          <p>").concat((el.price / 100).toLocaleString(), " \u20BD/\u043C\u0435\u0441\u044F\u0446</p>\n          <button class=\"btn result__btn\">\u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C</button>\n        </div>\n        ");
      resultWrap.appendChild(div);
    });
  }
} // Склонение числительных


function declOfNum(number, titles) {
  var cases = [2, 0, 1, 1, 1, 2];
  return number + ' ' + titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
} // изменетя значение input[type="range"]


function changeValue(e) {
  var target = e.target.value;
  var rangeValue = document.querySelector('.config__range-value');
  rangeValue.innerHTML = declOfNum(Math.floor(target), ['ядро', 'ядра', 'ядер']);
}

getData().then(function (data) {
  filter(data);
});
range.addEventListener('change', function (e) {
  changeValue(e);
  filter(myData);
});
raidCheckbox.addEventListener('change', function () {
  filter(myData);
});
gpuCheckbox.addEventListener('change', function () {
  filter(myData);
});
ssdCheckbox.addEventListener('change', function () {
  filter(myData);
});