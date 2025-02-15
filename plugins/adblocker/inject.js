/* eslint-disable */

// Source: https://addons.mozilla.org/en-US/firefox/addon/adblock-for-youtube/
// https://robwu.nl/crxviewer/?crx=https%3A%2F%2Faddons.mozilla.org%2Fen-US%2Ffirefox%2Faddon%2Fadblock-for-youtube%2F

/*
  Parts of this code is derived from set-constant.js:
  https://github.com/gorhill/uBlock/blob/5de0ce975753b7565759ac40983d31978d1f84ca/assets/resources/scriptlets.js#L704
  */
module.exports = () => {
  {
    const pruner = function (o) {
      delete o.playerAds;
      delete o.adPlacements;
      //
      if (o.playerResponse) {
        delete o.playerResponse.playerAds;
        delete o.playerResponse.adPlacements;
      }

      //
      return o;
    };

    JSON.parse = new Proxy(JSON.parse, {
      apply() {
        return pruner(Reflect.apply(...arguments));
      },
    });

    Response.prototype.json = new Proxy(Response.prototype.json, {
      apply() {
        return Reflect.apply(...arguments).then((o) => pruner(o));
      },
    });
  }

  (function () {
    let cValue = 'undefined';
    const chain = 'playerResponse.adPlacements';
    const thisScript = document.currentScript;
    //
    switch (cValue) {
      case 'null': {
        cValue = null;
        break;
      }

      case "''": {
        cValue = '';
        break;
      }

      case 'true': {
        cValue = true;
        break;
      }

      case 'false': {
        cValue = false;
        break;
      }

      case 'undefined': {
        cValue = undefined;
        break;
      }

      case 'noopFunc': {
        cValue = function () {
        };

        break;
      }

      case 'trueFunc': {
        cValue = function () {
          return true;
        };

        break;
      }

      case 'falseFunc': {
        cValue = function () {
          return false;
        };

        break;
      }

      default: {
        if (/^\d+$/.test(cValue)) {
          cValue = Number.parseFloat(cValue);
          //
          if (isNaN(cValue)) {
            return;
          }

          if (Math.abs(cValue) > 0x7F_FF) {
            return;
          }
        } else {
          return;
        }
      }
    }

    //
    let aborted = false;
    const mustAbort = function (v) {
      if (aborted) {
        return true;
      }

      aborted
        = v !== undefined
        && v !== null
        && cValue !== undefined
        && cValue !== null
        && typeof v !== typeof cValue;
      return aborted;
    };

    /*
    Support multiple trappers for the same property:
    https://github.com/uBlockOrigin/uBlock-issues/issues/156
    */

    const trapProp = function (owner, prop, configurable, handler) {
      if (handler.init(owner[prop]) === false) {
        return;
      }

      //
      const odesc = Object.getOwnPropertyDescriptor(owner, prop);
      let previousGetter;
      let previousSetter;
      if (odesc instanceof Object) {
        if (odesc.configurable === false) {
          return;
        }

        if (odesc.get instanceof Function) {
          previousGetter = odesc.get;
        }

        if (odesc.set instanceof Function) {
          previousSetter = odesc.set;
        }
      }

      //
      Object.defineProperty(owner, prop, {
        configurable,
        get() {
          if (previousGetter !== undefined) {
            previousGetter();
          }

          //
          return handler.getter();
        },
        set(a) {
          if (previousSetter !== undefined) {
            previousSetter(a);
          }

          //
          handler.setter(a);
        },
      });
    };

    const trapChain = function (owner, chain) {
      const pos = chain.indexOf('.');
      if (pos === -1) {
        trapProp(owner, chain, false, {
          v: undefined,
          getter() {
            return document.currentScript === thisScript ? this.v : cValue;
          },
          setter(a) {
            if (mustAbort(a) === false) {
              return;
            }

            cValue = a;
          },
          init(v) {
            if (mustAbort(v)) {
              return false;
            }

            //
            this.v = v;
            return true;
          },
        });
        //
        return;
      }

      //
      const prop = chain.slice(0, pos);
      const v = owner[prop];
      //
      chain = chain.slice(pos + 1);
      if (v instanceof Object || (typeof v === 'object' && v !== null)) {
        trapChain(v, chain);
        return;
      }

      //
      trapProp(owner, prop, true, {
        v: undefined,
        getter() {
          return this.v;
        },
        setter(a) {
          this.v = a;
          if (a instanceof Object) {
            trapChain(a, chain);
          }
        },
        init(v) {
          this.v = v;
          return true;
        },
      });
    };

    //
    trapChain(window, chain);
  })();

  (function () {
    let cValue = 'undefined';
    const thisScript = document.currentScript;
    const chain = 'ytInitialPlayerResponse.adPlacements';
    //
    switch (cValue) {
      case 'null': {
        cValue = null;
        break;
      }

      case "''": {
        cValue = '';
        break;
      }

      case 'true': {
        cValue = true;
        break;
      }

      case 'false': {
        cValue = false;
        break;
      }

      case 'undefined': {
        cValue = undefined;
        break;
      }

      case 'noopFunc': {
        cValue = function () {
        };

        break;
      }

      case 'trueFunc': {
        cValue = function () {
          return true;
        };

        break;
      }

      case 'falseFunc': {
        cValue = function () {
          return false;
        };

        break;
      }

      default: {
        if (/^\d+$/.test(cValue)) {
          cValue = Number.parseFloat(cValue);
          //
          if (isNaN(cValue)) {
            return;
          }

          if (Math.abs(cValue) > 0x7F_FF) {
            return;
          }
        } else {
          return;
        }
      }
    }

    //
    let aborted = false;
    const mustAbort = function (v) {
      if (aborted) {
        return true;
      }

      aborted
        = v !== undefined
        && v !== null
        && cValue !== undefined
        && cValue !== null
        && typeof v !== typeof cValue;
      return aborted;
    };

    /*
    Support multiple trappers for the same property:
    https://github.com/uBlockOrigin/uBlock-issues/issues/156
    */

    const trapProp = function (owner, prop, configurable, handler) {
      if (handler.init(owner[prop]) === false) {
        return;
      }

      //
      const odesc = Object.getOwnPropertyDescriptor(owner, prop);
      let previousGetter;
      let previousSetter;
      if (odesc instanceof Object) {
        if (odesc.configurable === false) {
          return;
        }

        if (odesc.get instanceof Function) {
          previousGetter = odesc.get;
        }

        if (odesc.set instanceof Function) {
          previousSetter = odesc.set;
        }
      }

      //
      Object.defineProperty(owner, prop, {
        configurable,
        get() {
          if (previousGetter !== undefined) {
            previousGetter();
          }

          //
          return handler.getter();
        },
        set(a) {
          if (previousSetter !== undefined) {
            previousSetter(a);
          }

          //
          handler.setter(a);
        },
      });
    };

    const trapChain = function (owner, chain) {
      const pos = chain.indexOf('.');
      if (pos === -1) {
        trapProp(owner, chain, false, {
          v: undefined,
          getter() {
            return document.currentScript === thisScript ? this.v : cValue;
          },
          setter(a) {
            if (mustAbort(a) === false) {
              return;
            }

            cValue = a;
          },
          init(v) {
            if (mustAbort(v)) {
              return false;
            }

            //
            this.v = v;
            return true;
          },
        });
        //
        return;
      }

      //
      const prop = chain.slice(0, pos);
      const v = owner[prop];
      //
      chain = chain.slice(pos + 1);
      if (v instanceof Object || (typeof v === 'object' && v !== null)) {
        trapChain(v, chain);
        return;
      }

      //
      trapProp(owner, prop, true, {
        v: undefined,
        getter() {
          return this.v;
        },
        setter(a) {
          this.v = a;
          if (a instanceof Object) {
            trapChain(a, chain);
          }
        },
        init(v) {
          this.v = v;
          return true;
        },
      });
    };

    //
    trapChain(window, chain);
  })();
};
