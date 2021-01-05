/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./R4/Files/Templates/Designs/R4/Assets/_src/js/r4.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./R4/Files/Templates/Designs/R4/Assets/_src/js/r4.js":
/*!************************************************************!*\
  !*** ./R4/Files/Templates/Designs/R4/Assets/_src/js/r4.js ***!
  \************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tiny_slider_src_tiny_slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tiny-slider/src/tiny-slider */ "./node_modules/tiny-slider/src/tiny-slider.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! regenerator-runtime/runtime */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__);
// import bootstrap from 'bootstrap';


window.tns = tiny_slider_src_tiny_slider__WEBPACK_IMPORTED_MODULE_0__["tns"];
window.InitSliders = InitSliders;

function InitSliders() {
  console.log('Sliders Ready');
  var sliders = document.querySelectorAll('.js-slider');

  for (var i = 0; i < sliders.length; ++i) {
    var sliderContainer = sliders[i];
    var closestColumn = sliderContainer.closest("[class^='col-']");
    var colMdClassIndex = closestColumn.getAttribute("class").search("col-md-") + 7;
    var parentColumnSize = closestColumn.getAttribute("class").charAt(colMdClassIndex) + closestColumn.getAttribute("class").charAt(colMdClassIndex + 1);
    var edgePadding = 50;
    var itemsInSlider = 5;

    if (parentColumnSize == 12) {
      itemsInSlider = 5;
    }

    if (parentColumnSize == 10 || parentColumnSize == 9 || parentColumnSize == 8) {
      itemsInSlider = 4;
    }

    if (parentColumnSize == 6) {
      itemsInSlider = 2;
    }

    if (parentColumnSize == 4) {
      itemsInSlider = 1;
      edgePadding = 0;
    }

    if (parentColumnSize == 3 || parentColumnSize == 2 || parentColumnSize == 1) {
      itemsInSlider = 1;
      edgePadding = 0;
    }

    var slider = Object(tiny_slider_src_tiny_slider__WEBPACK_IMPORTED_MODULE_0__["tns"])({
      container: sliderContainer,
      center: false,
      items: 1,
      gutter: 16,
      loop: true,
      arrowKeys: true,
      lazyload: true,
      edgePadding: edgePadding,
      responsive: {
        992: {
          items: itemsInSlider
        }
      },
      mouseDrag: true,
      controls: true,
      controlsText: ['<div class="tns-controls-icon" style="height:3em; width: 3em;"><svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-arrow-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/></svg></div>', '<div class="tns-controls-icon" style="height:3em; width: 3em;"><svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-arrow-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/></svg></div>'],
      navPosition: 'bottom'
    });
  }
}

document.addEventListener('DOMContentLoaded', function () {
  InitSliders();
});

/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var runtime = function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.

  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }

  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.

    generator._invoke = makeInvokeMethod(innerFn, self, context);
    return generator;
  }

  exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.

  var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.


  var IteratorPrototype = {};

  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"); // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  exports.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }

    genFun.prototype = Object.create(Gp);
    return genFun;
  }; // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.


  exports.awrap = function (arg) {
    return {
      __await: arg
    };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;

        if (value && _typeof(value) === "object" && hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function (error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    } // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).


    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };

  exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.

  exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;
    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        } // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;

        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);

          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;
        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);
        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;
        var record = tryCatch(innerFn, self, context);

        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };
        } else if (record.type === "throw") {
          state = GenStateCompleted; // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.

          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  } // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.


  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (!info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

      context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.

      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }
    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    } // The delegate iterator is finished, so forget it and continue with
    // the outer generator.


    context.delegate = null;
    return ContinueSentinel;
  } // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.


  defineIteratorMethods(Gp);
  define(Gp, toStringTagSymbol, "Generator"); // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.

  Gp[iteratorSymbol] = function () {
    return this;
  };

  Gp.toString = function () {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{
      tryLoc: "root"
    }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function (object) {
    var keys = [];

    for (var key in object) {
      keys.push(key);
    }

    keys.reverse(); // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.

    return function next() {
      while (keys.length) {
        var key = keys.pop();

        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      } // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.


      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];

      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;
          return next;
        };

        return next.next = next;
      }
    } // Return an iterator with no values.


    return {
      next: doneResult
    };
  }

  exports.values = values;

  function doneResult() {
    return {
      value: undefined,
      done: true
    };
  }

  Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      this.prev = 0;
      this.next = 0; // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.

      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;
      this.method = "next";
      this.arg = undefined;
      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },
    stop: function stop() {
      this.done = true;
      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;

      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;

      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      } // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.


      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  }; // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.

  return exports;
}( // If this script is executing as a CommonJS module, use module.exports
// as the regeneratorRuntime namespace. Otherwise create a new empty
// object. Either way, the resulting object will be used to initialize
// the regeneratorRuntime variable at the top of this file.
( false ? undefined : _typeof(module)) === "object" ? module.exports : {});

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/addCSSRule.js":
/*!************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/addCSSRule.js ***!
  \************************************************************/
/*! exports provided: addCSSRule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addCSSRule", function() { return addCSSRule; });
/* harmony import */ var _raf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./raf.js */ "./node_modules/tiny-slider/src/helpers/raf.js");
// cross browsers addRule method

function addCSSRule(sheet, selector, rules, index) {
  // return raf(function() {
  'insertRule' in sheet ? sheet.insertRule(selector + '{' + rules + '}', index) : sheet.addRule(selector, rules, index); // });
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/addClass.js":
/*!**********************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/addClass.js ***!
  \**********************************************************/
/*! exports provided: addClass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addClass", function() { return addClass; });
/* harmony import */ var _hasClass_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hasClass.js */ "./node_modules/tiny-slider/src/helpers/hasClass.js");

var addClass = _hasClass_js__WEBPACK_IMPORTED_MODULE_0__["classListSupport"] ? function (el, str) {
  if (!Object(_hasClass_js__WEBPACK_IMPORTED_MODULE_0__["hasClass"])(el, str)) {
    el.classList.add(str);
  }
} : function (el, str) {
  if (!Object(_hasClass_js__WEBPACK_IMPORTED_MODULE_0__["hasClass"])(el, str)) {
    el.className += ' ' + str;
  }
};


/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/addEvents.js":
/*!***********************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/addEvents.js ***!
  \***********************************************************/
/*! exports provided: addEvents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addEvents", function() { return addEvents; });
/* harmony import */ var _passiveOption_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./passiveOption.js */ "./node_modules/tiny-slider/src/helpers/passiveOption.js");

function addEvents(el, obj, preventScrolling) {
  for (var prop in obj) {
    var option = ['touchstart', 'touchmove'].indexOf(prop) >= 0 && !preventScrolling ? _passiveOption_js__WEBPACK_IMPORTED_MODULE_0__["passiveOption"] : false;
    el.addEventListener(prop, obj[prop], option);
  }
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/arrayFromNodeList.js":
/*!*******************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/arrayFromNodeList.js ***!
  \*******************************************************************/
/*! exports provided: arrayFromNodeList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arrayFromNodeList", function() { return arrayFromNodeList; });
function arrayFromNodeList(nl) {
  var arr = [];

  for (var i = 0, l = nl.length; i < l; i++) {
    arr.push(nl[i]);
  }

  return arr;
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/caf.js":
/*!*****************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/caf.js ***!
  \*****************************************************/
/*! exports provided: caf */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "caf", function() { return caf; });
var win = window;
var caf = win.cancelAnimationFrame || win.mozCancelAnimationFrame || function (id) {
  clearTimeout(id);
};

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/calc.js":
/*!******************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/calc.js ***!
  \******************************************************/
/*! exports provided: calc */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calc", function() { return calc; });
/* harmony import */ var _getBody_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBody.js */ "./node_modules/tiny-slider/src/helpers/getBody.js");
/* harmony import */ var _setFakeBody_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setFakeBody.js */ "./node_modules/tiny-slider/src/helpers/setFakeBody.js");
/* harmony import */ var _resetFakeBody_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./resetFakeBody.js */ "./node_modules/tiny-slider/src/helpers/resetFakeBody.js");
// get css-calc 
// @return - false | calc | -webkit-calc | -moz-calc
// @usage - var calc = getCalc(); 



function calc() {
  var doc = document,
      body = Object(_getBody_js__WEBPACK_IMPORTED_MODULE_0__["getBody"])(),
      docOverflow = Object(_setFakeBody_js__WEBPACK_IMPORTED_MODULE_1__["setFakeBody"])(body),
      div = doc.createElement('div'),
      result = false;
  body.appendChild(div);

  try {
    var str = '(10px * 10)',
        vals = ['calc' + str, '-moz-calc' + str, '-webkit-calc' + str],
        val;

    for (var i = 0; i < 3; i++) {
      val = vals[i];
      div.style.width = val;

      if (div.offsetWidth === 100) {
        result = val.replace(str, '');
        break;
      }
    }
  } catch (e) {}

  body.fake ? Object(_resetFakeBody_js__WEBPACK_IMPORTED_MODULE_2__["resetFakeBody"])(body, docOverflow) : div.remove();
  return result;
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/checkStorageValue.js":
/*!*******************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/checkStorageValue.js ***!
  \*******************************************************************/
/*! exports provided: checkStorageValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkStorageValue", function() { return checkStorageValue; });
function checkStorageValue(value) {
  return ['true', 'false'].indexOf(value) >= 0 ? JSON.parse(value) : value;
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/classListSupport.js":
/*!******************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/classListSupport.js ***!
  \******************************************************************/
/*! exports provided: classListSupport */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "classListSupport", function() { return classListSupport; });
var classListSupport = ('classList' in document.createElement('_'));

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/createStyleSheet.js":
/*!******************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/createStyleSheet.js ***!
  \******************************************************************/
/*! exports provided: createStyleSheet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createStyleSheet", function() { return createStyleSheet; });
// create and append style sheet
function createStyleSheet(media, nonce) {
  // Create the <style> tag
  var style = document.createElement("style"); // style.setAttribute("type", "text/css");
  // Add a media (and/or media query) here if you'd like!
  // style.setAttribute("media", "screen")
  // style.setAttribute("media", "only screen and (max-width : 1024px)")

  if (media) {
    style.setAttribute("media", media);
  } // Add nonce attribute for Content Security Policy


  if (nonce) {
    style.setAttribute("nonce", nonce);
  } // WebKit hack :(
  // style.appendChild(document.createTextNode(""));
  // Add the <style> element to the page


  document.querySelector('head').appendChild(style);
  return style.sheet ? style.sheet : style.styleSheet;
}
;

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/docElement.js":
/*!************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/docElement.js ***!
  \************************************************************/
/*! exports provided: docElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "docElement", function() { return docElement; });
var docElement = document.documentElement;

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/events.js":
/*!********************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/events.js ***!
  \********************************************************/
/*! exports provided: Events */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Events", function() { return Events; });
function Events() {
  return {
    topics: {},
    on: function on(eventName, fn) {
      this.topics[eventName] = this.topics[eventName] || [];
      this.topics[eventName].push(fn);
    },
    off: function off(eventName, fn) {
      if (this.topics[eventName]) {
        for (var i = 0; i < this.topics[eventName].length; i++) {
          if (this.topics[eventName][i] === fn) {
            this.topics[eventName].splice(i, 1);
            break;
          }
        }
      }
    },
    emit: function emit(eventName, data) {
      data.type = eventName;

      if (this.topics[eventName]) {
        this.topics[eventName].forEach(function (fn) {
          fn(data, eventName);
        });
      }
    }
  };
}
;

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/extend.js":
/*!********************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/extend.js ***!
  \********************************************************/
/*! exports provided: extend */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extend", function() { return extend; });
function extend() {
  var obj,
      name,
      copy,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length;

  for (; i < length; i++) {
    if ((obj = arguments[i]) !== null) {
      for (name in obj) {
        copy = obj[name];

        if (target === copy) {
          continue;
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }

  return target;
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/forEach.js":
/*!*********************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/forEach.js ***!
  \*********************************************************/
/*! exports provided: forEach */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forEach", function() { return forEach; });
// https://toddmotto.com/ditch-the-array-foreach-call-nodelist-hack/
function forEach(arr, callback, scope) {
  for (var i = 0, l = arr.length; i < l; i++) {
    callback.call(scope, arr[i], i);
  }
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/getAttr.js":
/*!*********************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/getAttr.js ***!
  \*********************************************************/
/*! exports provided: getAttr */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAttr", function() { return getAttr; });
function getAttr(el, attr) {
  return el.getAttribute(attr);
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/getBody.js":
/*!*********************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/getBody.js ***!
  \*********************************************************/
/*! exports provided: getBody */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBody", function() { return getBody; });
function getBody() {
  var doc = document,
      body = doc.body;

  if (!body) {
    body = doc.createElement('body');
    body.fake = true;
  }

  return body;
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/getCssRulesLength.js":
/*!*******************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/getCssRulesLength.js ***!
  \*******************************************************************/
/*! exports provided: getCssRulesLength */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCssRulesLength", function() { return getCssRulesLength; });
function getCssRulesLength(sheet) {
  var rule = 'insertRule' in sheet ? sheet.cssRules : sheet.rules;
  return rule.length;
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/getEndProperty.js":
/*!****************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/getEndProperty.js ***!
  \****************************************************************/
/*! exports provided: getEndProperty */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEndProperty", function() { return getEndProperty; });
// get transitionend, animationend based on transitionDuration
// @propin: string
// @propOut: string, first-letter uppercase
// Usage: getEndProperty('WebkitTransitionDuration', 'Transition') => webkitTransitionEnd
function getEndProperty(propIn, propOut) {
  var endProp = false;

  if (/^Webkit/.test(propIn)) {
    endProp = 'webkit' + propOut + 'End';
  } else if (/^O/.test(propIn)) {
    endProp = 'o' + propOut + 'End';
  } else if (propIn) {
    endProp = propOut.toLowerCase() + 'end';
  }

  return endProp;
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/getSlideId.js":
/*!************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/getSlideId.js ***!
  \************************************************************/
/*! exports provided: getSlideId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSlideId", function() { return getSlideId; });
function getSlideId() {
  var id = window.tnsId;
  window.tnsId = !id ? 1 : id + 1;
  return 'tns' + window.tnsId;
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/getTouchDirection.js":
/*!*******************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/getTouchDirection.js ***!
  \*******************************************************************/
/*! exports provided: getTouchDirection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTouchDirection", function() { return getTouchDirection; });
function getTouchDirection(angle, range) {
  var direction = false,
      gap = Math.abs(90 - Math.abs(angle));

  if (gap >= 90 - range) {
    direction = 'horizontal';
  } else if (gap <= range) {
    direction = 'vertical';
  }

  return direction;
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/has3DTransforms.js":
/*!*****************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/has3DTransforms.js ***!
  \*****************************************************************/
/*! exports provided: has3DTransforms */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "has3DTransforms", function() { return has3DTransforms; });
/* harmony import */ var _getBody_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBody.js */ "./node_modules/tiny-slider/src/helpers/getBody.js");
/* harmony import */ var _setFakeBody_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setFakeBody.js */ "./node_modules/tiny-slider/src/helpers/setFakeBody.js");
/* harmony import */ var _resetFakeBody_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./resetFakeBody.js */ "./node_modules/tiny-slider/src/helpers/resetFakeBody.js");



function has3DTransforms(tf) {
  if (!tf) {
    return false;
  }

  if (!window.getComputedStyle) {
    return false;
  }

  var doc = document,
      body = Object(_getBody_js__WEBPACK_IMPORTED_MODULE_0__["getBody"])(),
      docOverflow = Object(_setFakeBody_js__WEBPACK_IMPORTED_MODULE_1__["setFakeBody"])(body),
      el = doc.createElement('p'),
      has3d,
      cssTF = tf.length > 9 ? '-' + tf.slice(0, -9).toLowerCase() + '-' : '';
  cssTF += 'transform'; // Add it to the body to get the computed style

  body.insertBefore(el, null);
  el.style[tf] = 'translate3d(1px,1px,1px)';
  has3d = window.getComputedStyle(el).getPropertyValue(cssTF);
  body.fake ? Object(_resetFakeBody_js__WEBPACK_IMPORTED_MODULE_2__["resetFakeBody"])(body, docOverflow) : el.remove();
  return has3d !== undefined && has3d.length > 0 && has3d !== "none";
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/hasAttr.js":
/*!*********************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/hasAttr.js ***!
  \*********************************************************/
/*! exports provided: hasAttr */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasAttr", function() { return hasAttr; });
function hasAttr(el, attr) {
  return el.hasAttribute(attr);
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/hasClass.js":
/*!**********************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/hasClass.js ***!
  \**********************************************************/
/*! exports provided: classListSupport, hasClass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasClass", function() { return hasClass; });
/* harmony import */ var _classListSupport_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classListSupport.js */ "./node_modules/tiny-slider/src/helpers/classListSupport.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "classListSupport", function() { return _classListSupport_js__WEBPACK_IMPORTED_MODULE_0__["classListSupport"]; });


var hasClass = _classListSupport_js__WEBPACK_IMPORTED_MODULE_0__["classListSupport"] ? function (el, str) {
  return el.classList.contains(str);
} : function (el, str) {
  return el.className.indexOf(str) >= 0;
};


/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/hideElement.js":
/*!*************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/hideElement.js ***!
  \*************************************************************/
/*! exports provided: hideElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hideElement", function() { return hideElement; });
function hideElement(el, forceHide) {
  if (el.style.display !== 'none') {
    el.style.display = 'none';
  }
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/isNodeList.js":
/*!************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/isNodeList.js ***!
  \************************************************************/
/*! exports provided: isNodeList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNodeList", function() { return isNodeList; });
function isNodeList(el) {
  // Only NodeList has the "item()" function
  return typeof el.item !== "undefined";
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/isVisible.js":
/*!***********************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/isVisible.js ***!
  \***********************************************************/
/*! exports provided: isVisible */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isVisible", function() { return isVisible; });
function isVisible(el) {
  return window.getComputedStyle(el).display !== 'none';
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/jsTransform.js":
/*!*************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/jsTransform.js ***!
  \*************************************************************/
/*! exports provided: jsTransform */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jsTransform", function() { return jsTransform; });
function jsTransform(element, attr, prefix, postfix, to, duration, callback) {
  var tick = Math.min(duration, 10),
      unit = to.indexOf('%') >= 0 ? '%' : 'px',
      to = to.replace(unit, ''),
      from = Number(element.style[attr].replace(prefix, '').replace(postfix, '').replace(unit, '')),
      positionTick = (to - from) / duration * tick,
      running;
  setTimeout(moveElement, tick);

  function moveElement() {
    duration -= tick;
    from += positionTick;
    element.style[attr] = prefix + from + unit + postfix;

    if (duration > 0) {
      setTimeout(moveElement, tick);
    } else {
      callback();
    }
  }
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/mediaquerySupport.js":
/*!*******************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/mediaquerySupport.js ***!
  \*******************************************************************/
/*! exports provided: mediaquerySupport */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mediaquerySupport", function() { return mediaquerySupport; });
/* harmony import */ var _getBody_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBody.js */ "./node_modules/tiny-slider/src/helpers/getBody.js");
/* harmony import */ var _setFakeBody_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setFakeBody.js */ "./node_modules/tiny-slider/src/helpers/setFakeBody.js");
/* harmony import */ var _resetFakeBody_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./resetFakeBody.js */ "./node_modules/tiny-slider/src/helpers/resetFakeBody.js");



function mediaquerySupport() {
  if (window.matchMedia || window.msMatchMedia) {
    return true;
  }

  var doc = document,
      body = Object(_getBody_js__WEBPACK_IMPORTED_MODULE_0__["getBody"])(),
      docOverflow = Object(_setFakeBody_js__WEBPACK_IMPORTED_MODULE_1__["setFakeBody"])(body),
      div = doc.createElement('div'),
      style = doc.createElement('style'),
      rule = '@media all and (min-width:1px){.tns-mq-test{position:absolute}}',
      position;
  style.type = 'text/css';
  div.className = 'tns-mq-test';
  body.appendChild(style);
  body.appendChild(div);

  if (style.styleSheet) {
    style.styleSheet.cssText = rule;
  } else {
    style.appendChild(doc.createTextNode(rule));
  }

  position = window.getComputedStyle ? window.getComputedStyle(div).position : div.currentStyle['position'];
  body.fake ? Object(_resetFakeBody_js__WEBPACK_IMPORTED_MODULE_2__["resetFakeBody"])(body, docOverflow) : div.remove();
  return position === "absolute";
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/passiveOption.js":
/*!***************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/passiveOption.js ***!
  \***************************************************************/
/*! exports provided: passiveOption */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "passiveOption", function() { return passiveOption; });
// Test via a getter in the options object to see if the passive property is accessed
var supportsPassive = false;

try {
  var opts = Object.defineProperty({}, 'passive', {
    get: function get() {
      supportsPassive = true;
    }
  });
  window.addEventListener("test", null, opts);
} catch (e) {}

var passiveOption = supportsPassive ? {
  passive: true
} : false;

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/percentageLayout.js":
/*!******************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/percentageLayout.js ***!
  \******************************************************************/
/*! exports provided: percentageLayout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "percentageLayout", function() { return percentageLayout; });
/* harmony import */ var _getBody_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBody.js */ "./node_modules/tiny-slider/src/helpers/getBody.js");
/* harmony import */ var _setFakeBody_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setFakeBody.js */ "./node_modules/tiny-slider/src/helpers/setFakeBody.js");
/* harmony import */ var _resetFakeBody_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./resetFakeBody.js */ "./node_modules/tiny-slider/src/helpers/resetFakeBody.js");
// get subpixel support value
// @return - boolean



function percentageLayout() {
  // check subpixel layout supporting
  var doc = document,
      body = Object(_getBody_js__WEBPACK_IMPORTED_MODULE_0__["getBody"])(),
      docOverflow = Object(_setFakeBody_js__WEBPACK_IMPORTED_MODULE_1__["setFakeBody"])(body),
      wrapper = doc.createElement('div'),
      outer = doc.createElement('div'),
      str = '',
      count = 70,
      perPage = 3,
      supported = false;
  wrapper.className = "tns-t-subp2";
  outer.className = "tns-t-ct";

  for (var i = 0; i < count; i++) {
    str += '<div></div>';
  }

  outer.innerHTML = str;
  wrapper.appendChild(outer);
  body.appendChild(wrapper);
  supported = Math.abs(wrapper.getBoundingClientRect().left - outer.children[count - perPage].getBoundingClientRect().left) < 2;
  body.fake ? Object(_resetFakeBody_js__WEBPACK_IMPORTED_MODULE_2__["resetFakeBody"])(body, docOverflow) : wrapper.remove();
  return supported;
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/raf.js":
/*!*****************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/raf.js ***!
  \*****************************************************/
/*! exports provided: raf */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "raf", function() { return raf; });
var win = window;
var raf = win.requestAnimationFrame || win.webkitRequestAnimationFrame || win.mozRequestAnimationFrame || win.msRequestAnimationFrame || function (cb) {
  return setTimeout(cb, 16);
};

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/removeAttrs.js":
/*!*************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/removeAttrs.js ***!
  \*************************************************************/
/*! exports provided: removeAttrs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeAttrs", function() { return removeAttrs; });
/* harmony import */ var _isNodeList_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isNodeList.js */ "./node_modules/tiny-slider/src/helpers/isNodeList.js");

function removeAttrs(els, attrs) {
  els = Object(_isNodeList_js__WEBPACK_IMPORTED_MODULE_0__["isNodeList"])(els) || els instanceof Array ? els : [els];
  attrs = attrs instanceof Array ? attrs : [attrs];
  var attrLength = attrs.length;

  for (var i = els.length; i--;) {
    for (var j = attrLength; j--;) {
      els[i].removeAttribute(attrs[j]);
    }
  }
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/removeCSSRule.js":
/*!***************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/removeCSSRule.js ***!
  \***************************************************************/
/*! exports provided: removeCSSRule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeCSSRule", function() { return removeCSSRule; });
/* harmony import */ var _raf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./raf.js */ "./node_modules/tiny-slider/src/helpers/raf.js");
// cross browsers addRule method

function removeCSSRule(sheet, index) {
  // return raf(function() {
  'deleteRule' in sheet ? sheet.deleteRule(index) : sheet.removeRule(index); // });
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/removeClass.js":
/*!*************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/removeClass.js ***!
  \*************************************************************/
/*! exports provided: removeClass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeClass", function() { return removeClass; });
/* harmony import */ var _hasClass_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hasClass.js */ "./node_modules/tiny-slider/src/helpers/hasClass.js");

var removeClass = _hasClass_js__WEBPACK_IMPORTED_MODULE_0__["classListSupport"] ? function (el, str) {
  if (Object(_hasClass_js__WEBPACK_IMPORTED_MODULE_0__["hasClass"])(el, str)) {
    el.classList.remove(str);
  }
} : function (el, str) {
  if (Object(_hasClass_js__WEBPACK_IMPORTED_MODULE_0__["hasClass"])(el, str)) {
    el.className = el.className.replace(str, '');
  }
};


/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/removeEvents.js":
/*!**************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/removeEvents.js ***!
  \**************************************************************/
/*! exports provided: removeEvents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeEvents", function() { return removeEvents; });
/* harmony import */ var _passiveOption_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./passiveOption.js */ "./node_modules/tiny-slider/src/helpers/passiveOption.js");

function removeEvents(el, obj) {
  for (var prop in obj) {
    var option = ['touchstart', 'touchmove'].indexOf(prop) >= 0 ? _passiveOption_js__WEBPACK_IMPORTED_MODULE_0__["passiveOption"] : false;
    el.removeEventListener(prop, obj[prop], option);
  }
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/resetFakeBody.js":
/*!***************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/resetFakeBody.js ***!
  \***************************************************************/
/*! exports provided: resetFakeBody */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetFakeBody", function() { return resetFakeBody; });
/* harmony import */ var _docElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./docElement.js */ "./node_modules/tiny-slider/src/helpers/docElement.js");

function resetFakeBody(body, docOverflow) {
  if (body.fake) {
    body.remove();
    _docElement_js__WEBPACK_IMPORTED_MODULE_0__["docElement"].style.overflow = docOverflow; // Trigger layout so kinetic scrolling isn't disabled in iOS6+
    // eslint-disable-next-line

    _docElement_js__WEBPACK_IMPORTED_MODULE_0__["docElement"].offsetHeight;
  }
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/setAttrs.js":
/*!**********************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/setAttrs.js ***!
  \**********************************************************/
/*! exports provided: setAttrs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAttrs", function() { return setAttrs; });
/* harmony import */ var _isNodeList_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isNodeList.js */ "./node_modules/tiny-slider/src/helpers/isNodeList.js");

function setAttrs(els, attrs) {
  els = Object(_isNodeList_js__WEBPACK_IMPORTED_MODULE_0__["isNodeList"])(els) || els instanceof Array ? els : [els];

  if (Object.prototype.toString.call(attrs) !== '[object Object]') {
    return;
  }

  for (var i = els.length; i--;) {
    for (var key in attrs) {
      els[i].setAttribute(key, attrs[key]);
    }
  }
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/setFakeBody.js":
/*!*************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/setFakeBody.js ***!
  \*************************************************************/
/*! exports provided: setFakeBody */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setFakeBody", function() { return setFakeBody; });
/* harmony import */ var _docElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./docElement.js */ "./node_modules/tiny-slider/src/helpers/docElement.js");

function setFakeBody(body) {
  var docOverflow = '';

  if (body.fake) {
    docOverflow = _docElement_js__WEBPACK_IMPORTED_MODULE_0__["docElement"].style.overflow; //avoid crashing IE8, if background image is used

    body.style.background = ''; //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible

    body.style.overflow = _docElement_js__WEBPACK_IMPORTED_MODULE_0__["docElement"].style.overflow = 'hidden';
    _docElement_js__WEBPACK_IMPORTED_MODULE_0__["docElement"].appendChild(body);
  }

  return docOverflow;
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/setLocalStorage.js":
/*!*****************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/setLocalStorage.js ***!
  \*****************************************************************/
/*! exports provided: setLocalStorage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setLocalStorage", function() { return setLocalStorage; });
function setLocalStorage(storage, key, value, access) {
  if (access) {
    try {
      storage.setItem(key, value);
    } catch (e) {}
  }

  return value;
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/showElement.js":
/*!*************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/showElement.js ***!
  \*************************************************************/
/*! exports provided: showElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showElement", function() { return showElement; });
function showElement(el, forceHide) {
  if (el.style.display === 'none') {
    el.style.display = '';
  }
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/toDegree.js":
/*!**********************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/toDegree.js ***!
  \**********************************************************/
/*! exports provided: toDegree */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toDegree", function() { return toDegree; });
function toDegree(y, x) {
  return Math.atan2(y, x) * (180 / Math.PI);
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/helpers/whichProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/tiny-slider/src/helpers/whichProperty.js ***!
  \***************************************************************/
/*! exports provided: whichProperty */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "whichProperty", function() { return whichProperty; });
function whichProperty(props) {
  if (typeof props === 'string') {
    var arr = [props],
        Props = props.charAt(0).toUpperCase() + props.substr(1),
        prefixes = ['Webkit', 'Moz', 'ms', 'O'];
    prefixes.forEach(function (prefix) {
      if (prefix !== 'ms' || props === 'transform') {
        arr.push(prefix + Props);
      }
    });
    props = arr;
  }

  var el = document.createElement('fakeelement'),
      len = props.length;

  for (var i = 0; i < props.length; i++) {
    var prop = props[i];

    if (el.style[prop] !== undefined) {
      return prop;
    }
  }

  return false; // explicit for ie9-
}

/***/ }),

/***/ "./node_modules/tiny-slider/src/tiny-slider.js":
/*!*****************************************************!*\
  !*** ./node_modules/tiny-slider/src/tiny-slider.js ***!
  \*****************************************************/
/*! exports provided: tns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tns", function() { return tns; });
/* harmony import */ var _helpers_raf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/raf.js */ "./node_modules/tiny-slider/src/helpers/raf.js");
/* harmony import */ var _helpers_caf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/caf.js */ "./node_modules/tiny-slider/src/helpers/caf.js");
/* harmony import */ var _helpers_extend_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers/extend.js */ "./node_modules/tiny-slider/src/helpers/extend.js");
/* harmony import */ var _helpers_checkStorageValue_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers/checkStorageValue.js */ "./node_modules/tiny-slider/src/helpers/checkStorageValue.js");
/* harmony import */ var _helpers_setLocalStorage_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./helpers/setLocalStorage.js */ "./node_modules/tiny-slider/src/helpers/setLocalStorage.js");
/* harmony import */ var _helpers_getSlideId_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./helpers/getSlideId.js */ "./node_modules/tiny-slider/src/helpers/getSlideId.js");
/* harmony import */ var _helpers_calc_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./helpers/calc.js */ "./node_modules/tiny-slider/src/helpers/calc.js");
/* harmony import */ var _helpers_percentageLayout_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./helpers/percentageLayout.js */ "./node_modules/tiny-slider/src/helpers/percentageLayout.js");
/* harmony import */ var _helpers_mediaquerySupport_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./helpers/mediaquerySupport.js */ "./node_modules/tiny-slider/src/helpers/mediaquerySupport.js");
/* harmony import */ var _helpers_createStyleSheet_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./helpers/createStyleSheet.js */ "./node_modules/tiny-slider/src/helpers/createStyleSheet.js");
/* harmony import */ var _helpers_addCSSRule_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./helpers/addCSSRule.js */ "./node_modules/tiny-slider/src/helpers/addCSSRule.js");
/* harmony import */ var _helpers_removeCSSRule_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./helpers/removeCSSRule.js */ "./node_modules/tiny-slider/src/helpers/removeCSSRule.js");
/* harmony import */ var _helpers_getCssRulesLength_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./helpers/getCssRulesLength.js */ "./node_modules/tiny-slider/src/helpers/getCssRulesLength.js");
/* harmony import */ var _helpers_toDegree_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./helpers/toDegree.js */ "./node_modules/tiny-slider/src/helpers/toDegree.js");
/* harmony import */ var _helpers_getTouchDirection_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./helpers/getTouchDirection.js */ "./node_modules/tiny-slider/src/helpers/getTouchDirection.js");
/* harmony import */ var _helpers_forEach_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./helpers/forEach.js */ "./node_modules/tiny-slider/src/helpers/forEach.js");
/* harmony import */ var _helpers_hasClass_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./helpers/hasClass.js */ "./node_modules/tiny-slider/src/helpers/hasClass.js");
/* harmony import */ var _helpers_addClass_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./helpers/addClass.js */ "./node_modules/tiny-slider/src/helpers/addClass.js");
/* harmony import */ var _helpers_removeClass_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./helpers/removeClass.js */ "./node_modules/tiny-slider/src/helpers/removeClass.js");
/* harmony import */ var _helpers_hasAttr_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./helpers/hasAttr.js */ "./node_modules/tiny-slider/src/helpers/hasAttr.js");
/* harmony import */ var _helpers_getAttr_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./helpers/getAttr.js */ "./node_modules/tiny-slider/src/helpers/getAttr.js");
/* harmony import */ var _helpers_setAttrs_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./helpers/setAttrs.js */ "./node_modules/tiny-slider/src/helpers/setAttrs.js");
/* harmony import */ var _helpers_removeAttrs_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./helpers/removeAttrs.js */ "./node_modules/tiny-slider/src/helpers/removeAttrs.js");
/* harmony import */ var _helpers_arrayFromNodeList_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./helpers/arrayFromNodeList.js */ "./node_modules/tiny-slider/src/helpers/arrayFromNodeList.js");
/* harmony import */ var _helpers_hideElement_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./helpers/hideElement.js */ "./node_modules/tiny-slider/src/helpers/hideElement.js");
/* harmony import */ var _helpers_showElement_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./helpers/showElement.js */ "./node_modules/tiny-slider/src/helpers/showElement.js");
/* harmony import */ var _helpers_isVisible_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./helpers/isVisible.js */ "./node_modules/tiny-slider/src/helpers/isVisible.js");
/* harmony import */ var _helpers_whichProperty_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./helpers/whichProperty.js */ "./node_modules/tiny-slider/src/helpers/whichProperty.js");
/* harmony import */ var _helpers_has3DTransforms_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./helpers/has3DTransforms.js */ "./node_modules/tiny-slider/src/helpers/has3DTransforms.js");
/* harmony import */ var _helpers_getEndProperty_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./helpers/getEndProperty.js */ "./node_modules/tiny-slider/src/helpers/getEndProperty.js");
/* harmony import */ var _helpers_addEvents_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./helpers/addEvents.js */ "./node_modules/tiny-slider/src/helpers/addEvents.js");
/* harmony import */ var _helpers_removeEvents_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./helpers/removeEvents.js */ "./node_modules/tiny-slider/src/helpers/removeEvents.js");
/* harmony import */ var _helpers_events_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./helpers/events.js */ "./node_modules/tiny-slider/src/helpers/events.js");
/* harmony import */ var _helpers_jsTransform_js__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./helpers/jsTransform.js */ "./node_modules/tiny-slider/src/helpers/jsTransform.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// Object.keys
if (!Object.keys) {
  Object.keys = function (object) {
    var keys = [];

    for (var name in object) {
      if (Object.prototype.hasOwnProperty.call(object, name)) {
        keys.push(name);
      }
    }

    return keys;
  };
} // ChildNode.remove


if (!("remove" in Element.prototype)) {
  Element.prototype.remove = function () {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  };
}



































var tns = function tns(options) {
  options = Object(_helpers_extend_js__WEBPACK_IMPORTED_MODULE_2__["extend"])({
    container: '.slider',
    mode: 'carousel',
    axis: 'horizontal',
    items: 1,
    gutter: 0,
    edgePadding: 0,
    fixedWidth: false,
    autoWidth: false,
    viewportMax: false,
    slideBy: 1,
    center: false,
    controls: true,
    controlsPosition: 'top',
    controlsText: ['prev', 'next'],
    controlsContainer: false,
    prevButton: false,
    nextButton: false,
    nav: true,
    navPosition: 'top',
    navContainer: false,
    navAsThumbnails: false,
    arrowKeys: false,
    speed: 300,
    autoplay: false,
    autoplayPosition: 'top',
    autoplayTimeout: 5000,
    autoplayDirection: 'forward',
    autoplayText: ['start', 'stop'],
    autoplayHoverPause: false,
    autoplayButton: false,
    autoplayButtonOutput: true,
    autoplayResetOnVisibility: true,
    animateIn: 'tns-fadeIn',
    animateOut: 'tns-fadeOut',
    animateNormal: 'tns-normal',
    animateDelay: false,
    loop: true,
    rewind: false,
    autoHeight: false,
    responsive: false,
    lazyload: false,
    lazyloadSelector: '.tns-lazy-img',
    touch: true,
    mouseDrag: false,
    swipeAngle: 15,
    nested: false,
    preventActionWhenRunning: false,
    preventScrollOnTouch: false,
    freezable: true,
    onInit: false,
    useLocalStorage: true,
    nonce: false
  }, options || {});
  var doc = document,
      win = window,
      KEYS = {
    ENTER: 13,
    SPACE: 32,
    LEFT: 37,
    RIGHT: 39
  },
      tnsStorage = {},
      localStorageAccess = options.useLocalStorage;

  if (localStorageAccess) {
    // check browser version and local storage access
    var browserInfo = navigator.userAgent;
    var uid = new Date();

    try {
      tnsStorage = win.localStorage;

      if (tnsStorage) {
        tnsStorage.setItem(uid, uid);
        localStorageAccess = tnsStorage.getItem(uid) == uid;
        tnsStorage.removeItem(uid);
      } else {
        localStorageAccess = false;
      }

      if (!localStorageAccess) {
        tnsStorage = {};
      }
    } catch (e) {
      localStorageAccess = false;
    }

    if (localStorageAccess) {
      // remove storage when browser version changes
      if (tnsStorage['tnsApp'] && tnsStorage['tnsApp'] !== browserInfo) {
        ['tC', 'tPL', 'tMQ', 'tTf', 't3D', 'tTDu', 'tTDe', 'tADu', 'tADe', 'tTE', 'tAE'].forEach(function (item) {
          tnsStorage.removeItem(item);
        });
      } // update browserInfo


      localStorage['tnsApp'] = browserInfo;
    }
  }

  var CALC = tnsStorage['tC'] ? Object(_helpers_checkStorageValue_js__WEBPACK_IMPORTED_MODULE_3__["checkStorageValue"])(tnsStorage['tC']) : Object(_helpers_setLocalStorage_js__WEBPACK_IMPORTED_MODULE_4__["setLocalStorage"])(tnsStorage, 'tC', Object(_helpers_calc_js__WEBPACK_IMPORTED_MODULE_6__["calc"])(), localStorageAccess),
      PERCENTAGELAYOUT = tnsStorage['tPL'] ? Object(_helpers_checkStorageValue_js__WEBPACK_IMPORTED_MODULE_3__["checkStorageValue"])(tnsStorage['tPL']) : Object(_helpers_setLocalStorage_js__WEBPACK_IMPORTED_MODULE_4__["setLocalStorage"])(tnsStorage, 'tPL', Object(_helpers_percentageLayout_js__WEBPACK_IMPORTED_MODULE_7__["percentageLayout"])(), localStorageAccess),
      CSSMQ = tnsStorage['tMQ'] ? Object(_helpers_checkStorageValue_js__WEBPACK_IMPORTED_MODULE_3__["checkStorageValue"])(tnsStorage['tMQ']) : Object(_helpers_setLocalStorage_js__WEBPACK_IMPORTED_MODULE_4__["setLocalStorage"])(tnsStorage, 'tMQ', Object(_helpers_mediaquerySupport_js__WEBPACK_IMPORTED_MODULE_8__["mediaquerySupport"])(), localStorageAccess),
      TRANSFORM = tnsStorage['tTf'] ? Object(_helpers_checkStorageValue_js__WEBPACK_IMPORTED_MODULE_3__["checkStorageValue"])(tnsStorage['tTf']) : Object(_helpers_setLocalStorage_js__WEBPACK_IMPORTED_MODULE_4__["setLocalStorage"])(tnsStorage, 'tTf', Object(_helpers_whichProperty_js__WEBPACK_IMPORTED_MODULE_27__["whichProperty"])('transform'), localStorageAccess),
      HAS3DTRANSFORMS = tnsStorage['t3D'] ? Object(_helpers_checkStorageValue_js__WEBPACK_IMPORTED_MODULE_3__["checkStorageValue"])(tnsStorage['t3D']) : Object(_helpers_setLocalStorage_js__WEBPACK_IMPORTED_MODULE_4__["setLocalStorage"])(tnsStorage, 't3D', Object(_helpers_has3DTransforms_js__WEBPACK_IMPORTED_MODULE_28__["has3DTransforms"])(TRANSFORM), localStorageAccess),
      TRANSITIONDURATION = tnsStorage['tTDu'] ? Object(_helpers_checkStorageValue_js__WEBPACK_IMPORTED_MODULE_3__["checkStorageValue"])(tnsStorage['tTDu']) : Object(_helpers_setLocalStorage_js__WEBPACK_IMPORTED_MODULE_4__["setLocalStorage"])(tnsStorage, 'tTDu', Object(_helpers_whichProperty_js__WEBPACK_IMPORTED_MODULE_27__["whichProperty"])('transitionDuration'), localStorageAccess),
      TRANSITIONDELAY = tnsStorage['tTDe'] ? Object(_helpers_checkStorageValue_js__WEBPACK_IMPORTED_MODULE_3__["checkStorageValue"])(tnsStorage['tTDe']) : Object(_helpers_setLocalStorage_js__WEBPACK_IMPORTED_MODULE_4__["setLocalStorage"])(tnsStorage, 'tTDe', Object(_helpers_whichProperty_js__WEBPACK_IMPORTED_MODULE_27__["whichProperty"])('transitionDelay'), localStorageAccess),
      ANIMATIONDURATION = tnsStorage['tADu'] ? Object(_helpers_checkStorageValue_js__WEBPACK_IMPORTED_MODULE_3__["checkStorageValue"])(tnsStorage['tADu']) : Object(_helpers_setLocalStorage_js__WEBPACK_IMPORTED_MODULE_4__["setLocalStorage"])(tnsStorage, 'tADu', Object(_helpers_whichProperty_js__WEBPACK_IMPORTED_MODULE_27__["whichProperty"])('animationDuration'), localStorageAccess),
      ANIMATIONDELAY = tnsStorage['tADe'] ? Object(_helpers_checkStorageValue_js__WEBPACK_IMPORTED_MODULE_3__["checkStorageValue"])(tnsStorage['tADe']) : Object(_helpers_setLocalStorage_js__WEBPACK_IMPORTED_MODULE_4__["setLocalStorage"])(tnsStorage, 'tADe', Object(_helpers_whichProperty_js__WEBPACK_IMPORTED_MODULE_27__["whichProperty"])('animationDelay'), localStorageAccess),
      TRANSITIONEND = tnsStorage['tTE'] ? Object(_helpers_checkStorageValue_js__WEBPACK_IMPORTED_MODULE_3__["checkStorageValue"])(tnsStorage['tTE']) : Object(_helpers_setLocalStorage_js__WEBPACK_IMPORTED_MODULE_4__["setLocalStorage"])(tnsStorage, 'tTE', Object(_helpers_getEndProperty_js__WEBPACK_IMPORTED_MODULE_29__["getEndProperty"])(TRANSITIONDURATION, 'Transition'), localStorageAccess),
      ANIMATIONEND = tnsStorage['tAE'] ? Object(_helpers_checkStorageValue_js__WEBPACK_IMPORTED_MODULE_3__["checkStorageValue"])(tnsStorage['tAE']) : Object(_helpers_setLocalStorage_js__WEBPACK_IMPORTED_MODULE_4__["setLocalStorage"])(tnsStorage, 'tAE', Object(_helpers_getEndProperty_js__WEBPACK_IMPORTED_MODULE_29__["getEndProperty"])(ANIMATIONDURATION, 'Animation'), localStorageAccess); // get element nodes from selectors

  var supportConsoleWarn = win.console && typeof win.console.warn === "function",
      tnsList = ['container', 'controlsContainer', 'prevButton', 'nextButton', 'navContainer', 'autoplayButton'],
      optionsElements = {};
  tnsList.forEach(function (item) {
    if (typeof options[item] === 'string') {
      var str = options[item],
          el = doc.querySelector(str);
      optionsElements[item] = str;

      if (el && el.nodeName) {
        options[item] = el;
      } else {
        if (supportConsoleWarn) {
          console.warn('Can\'t find', options[item]);
        }

        return;
      }
    }
  }); // make sure at least 1 slide

  if (options.container.children.length < 1) {
    if (supportConsoleWarn) {
      console.warn('No slides found in', options.container);
    }

    return;
  } // update options


  var responsive = options.responsive,
      nested = options.nested,
      carousel = options.mode === 'carousel' ? true : false;

  if (responsive) {
    // apply responsive[0] to options and remove it
    if (0 in responsive) {
      options = Object(_helpers_extend_js__WEBPACK_IMPORTED_MODULE_2__["extend"])(options, responsive[0]);
      delete responsive[0];
    }

    var responsiveTem = {};

    for (var key in responsive) {
      var val = responsive[key]; // update responsive
      // from: 300: 2
      // to:
      //   300: {
      //     items: 2
      //   }

      val = typeof val === 'number' ? {
        items: val
      } : val;
      responsiveTem[key] = val;
    }

    responsive = responsiveTem;
    responsiveTem = null;
  } // update options


  function updateOptions(obj) {
    for (var key in obj) {
      if (!carousel) {
        if (key === 'slideBy') {
          obj[key] = 'page';
        }

        if (key === 'edgePadding') {
          obj[key] = false;
        }

        if (key === 'autoHeight') {
          obj[key] = false;
        }
      } // update responsive options


      if (key === 'responsive') {
        updateOptions(obj[key]);
      }
    }
  }

  if (!carousel) {
    updateOptions(options);
  } // === define and set variables ===


  if (!carousel) {
    options.axis = 'horizontal';
    options.slideBy = 'page';
    options.edgePadding = false;
    var animateIn = options.animateIn,
        animateOut = options.animateOut,
        animateDelay = options.animateDelay,
        animateNormal = options.animateNormal;
  }

  var horizontal = options.axis === 'horizontal' ? true : false,
      outerWrapper = doc.createElement('div'),
      innerWrapper = doc.createElement('div'),
      middleWrapper,
      container = options.container,
      containerParent = container.parentNode,
      containerHTML = container.outerHTML,
      slideItems = container.children,
      slideCount = slideItems.length,
      breakpointZone,
      windowWidth = getWindowWidth(),
      isOn = false;

  if (responsive) {
    setBreakpointZone();
  }

  if (carousel) {
    container.className += ' tns-vpfix';
  } // fixedWidth: viewport > rightBoundary > indexMax


  var autoWidth = options.autoWidth,
      fixedWidth = getOption('fixedWidth'),
      edgePadding = getOption('edgePadding'),
      gutter = getOption('gutter'),
      viewport = getViewportWidth(),
      center = getOption('center'),
      items = !autoWidth ? Math.floor(getOption('items')) : 1,
      slideBy = getOption('slideBy'),
      viewportMax = options.viewportMax || options.fixedWidthViewportWidth,
      arrowKeys = getOption('arrowKeys'),
      speed = getOption('speed'),
      rewind = options.rewind,
      loop = rewind ? false : options.loop,
      autoHeight = getOption('autoHeight'),
      controls = getOption('controls'),
      controlsText = getOption('controlsText'),
      nav = getOption('nav'),
      touch = getOption('touch'),
      mouseDrag = getOption('mouseDrag'),
      autoplay = getOption('autoplay'),
      autoplayTimeout = getOption('autoplayTimeout'),
      autoplayText = getOption('autoplayText'),
      autoplayHoverPause = getOption('autoplayHoverPause'),
      autoplayResetOnVisibility = getOption('autoplayResetOnVisibility'),
      sheet = Object(_helpers_createStyleSheet_js__WEBPACK_IMPORTED_MODULE_9__["createStyleSheet"])(null, getOption('nonce')),
      lazyload = options.lazyload,
      lazyloadSelector = options.lazyloadSelector,
      slidePositions,
      // collection of slide positions
  slideItemsOut = [],
      cloneCount = loop ? getCloneCountForLoop() : 0,
      slideCountNew = !carousel ? slideCount + cloneCount : slideCount + cloneCount * 2,
      hasRightDeadZone = (fixedWidth || autoWidth) && !loop ? true : false,
      rightBoundary = fixedWidth ? getRightBoundary() : null,
      updateIndexBeforeTransform = !carousel || !loop ? true : false,
      // transform
  transformAttr = horizontal ? 'left' : 'top',
      transformPrefix = '',
      transformPostfix = '',
      // index
  getIndexMax = function () {
    if (fixedWidth) {
      return function () {
        return center && !loop ? slideCount - 1 : Math.ceil(-rightBoundary / (fixedWidth + gutter));
      };
    } else if (autoWidth) {
      return function () {
        for (var i = 0; i < slideCountNew; i++) {
          if (slidePositions[i] >= -rightBoundary) {
            return i;
          }
        }
      };
    } else {
      return function () {
        if (center && carousel && !loop) {
          return slideCount - 1;
        } else {
          return loop || carousel ? Math.max(0, slideCountNew - Math.ceil(items)) : slideCountNew - 1;
        }
      };
    }
  }(),
      index = getStartIndex(getOption('startIndex')),
      indexCached = index,
      displayIndex = getCurrentSlide(),
      indexMin = 0,
      indexMax = !autoWidth ? getIndexMax() : null,
      // resize
  resizeTimer,
      preventActionWhenRunning = options.preventActionWhenRunning,
      swipeAngle = options.swipeAngle,
      moveDirectionExpected = swipeAngle ? '?' : true,
      running = false,
      onInit = options.onInit,
      events = new _helpers_events_js__WEBPACK_IMPORTED_MODULE_32__["Events"](),
      // id, class
  newContainerClasses = ' tns-slider tns-' + options.mode,
      slideId = container.id || Object(_helpers_getSlideId_js__WEBPACK_IMPORTED_MODULE_5__["getSlideId"])(),
      disable = getOption('disable'),
      disabled = false,
      freezable = options.freezable,
      freeze = freezable && !autoWidth ? getFreeze() : false,
      frozen = false,
      controlsEvents = {
    'click': onControlsClick,
    'keydown': onControlsKeydown
  },
      navEvents = {
    'click': onNavClick,
    'keydown': onNavKeydown
  },
      hoverEvents = {
    'mouseover': mouseoverPause,
    'mouseout': mouseoutRestart
  },
      visibilityEvent = {
    'visibilitychange': onVisibilityChange
  },
      docmentKeydownEvent = {
    'keydown': onDocumentKeydown
  },
      touchEvents = {
    'touchstart': onPanStart,
    'touchmove': onPanMove,
    'touchend': onPanEnd,
    'touchcancel': onPanEnd
  },
      dragEvents = {
    'mousedown': onPanStart,
    'mousemove': onPanMove,
    'mouseup': onPanEnd,
    'mouseleave': onPanEnd
  },
      hasControls = hasOption('controls'),
      hasNav = hasOption('nav'),
      navAsThumbnails = autoWidth ? true : options.navAsThumbnails,
      hasAutoplay = hasOption('autoplay'),
      hasTouch = hasOption('touch'),
      hasMouseDrag = hasOption('mouseDrag'),
      slideActiveClass = 'tns-slide-active',
      slideClonedClass = 'tns-slide-cloned',
      imgCompleteClass = 'tns-complete',
      imgEvents = {
    'load': onImgLoaded,
    'error': onImgFailed
  },
      imgsComplete,
      liveregionCurrent,
      preventScroll = options.preventScrollOnTouch === 'force' ? true : false; // controls


  if (hasControls) {
    var controlsContainer = options.controlsContainer,
        controlsContainerHTML = options.controlsContainer ? options.controlsContainer.outerHTML : '',
        prevButton = options.prevButton,
        nextButton = options.nextButton,
        prevButtonHTML = options.prevButton ? options.prevButton.outerHTML : '',
        nextButtonHTML = options.nextButton ? options.nextButton.outerHTML : '',
        prevIsButton,
        nextIsButton;
  } // nav


  if (hasNav) {
    var navContainer = options.navContainer,
        navContainerHTML = options.navContainer ? options.navContainer.outerHTML : '',
        navItems,
        pages = autoWidth ? slideCount : getPages(),
        pagesCached = 0,
        navClicked = -1,
        navCurrentIndex = getCurrentNavIndex(),
        navCurrentIndexCached = navCurrentIndex,
        navActiveClass = 'tns-nav-active',
        navStr = 'Carousel Page ',
        navStrCurrent = ' (Current Slide)';
  } // autoplay


  if (hasAutoplay) {
    var autoplayDirection = options.autoplayDirection === 'forward' ? 1 : -1,
        autoplayButton = options.autoplayButton,
        autoplayButtonHTML = options.autoplayButton ? options.autoplayButton.outerHTML : '',
        autoplayHtmlStrings = ['<span class=\'tns-visually-hidden\'>', ' animation</span>'],
        autoplayTimer,
        animating,
        autoplayHoverPaused,
        autoplayUserPaused,
        autoplayVisibilityPaused;
  }

  if (hasTouch || hasMouseDrag) {
    var initPosition = {},
        lastPosition = {},
        translateInit,
        disX,
        disY,
        panStart = false,
        rafIndex,
        getDist = horizontal ? function (a, b) {
      return a.x - b.x;
    } : function (a, b) {
      return a.y - b.y;
    };
  } // disable slider when slidecount <= items


  if (!autoWidth) {
    resetVariblesWhenDisable(disable || freeze);
  }

  if (TRANSFORM) {
    transformAttr = TRANSFORM;
    transformPrefix = 'translate';

    if (HAS3DTRANSFORMS) {
      transformPrefix += horizontal ? '3d(' : '3d(0px, ';
      transformPostfix = horizontal ? ', 0px, 0px)' : ', 0px)';
    } else {
      transformPrefix += horizontal ? 'X(' : 'Y(';
      transformPostfix = ')';
    }
  }

  if (carousel) {
    container.className = container.className.replace('tns-vpfix', '');
  }

  initStructure();
  initSheet();
  initSliderTransform(); // === COMMON FUNCTIONS === //

  function resetVariblesWhenDisable(condition) {
    if (condition) {
      controls = nav = touch = mouseDrag = arrowKeys = autoplay = autoplayHoverPause = autoplayResetOnVisibility = false;
    }
  }

  function getCurrentSlide() {
    var tem = carousel ? index - cloneCount : index;

    while (tem < 0) {
      tem += slideCount;
    }

    return tem % slideCount + 1;
  }

  function getStartIndex(ind) {
    ind = ind ? Math.max(0, Math.min(loop ? slideCount - 1 : slideCount - items, ind)) : 0;
    return carousel ? ind + cloneCount : ind;
  }

  function getAbsIndex(i) {
    if (i == null) {
      i = index;
    }

    if (carousel) {
      i -= cloneCount;
    }

    while (i < 0) {
      i += slideCount;
    }

    return Math.floor(i % slideCount);
  }

  function getCurrentNavIndex() {
    var absIndex = getAbsIndex(),
        result;
    result = navAsThumbnails ? absIndex : fixedWidth || autoWidth ? Math.ceil((absIndex + 1) * pages / slideCount - 1) : Math.floor(absIndex / items); // set active nav to the last one when reaches the right edge

    if (!loop && carousel && index === indexMax) {
      result = pages - 1;
    }

    return result;
  }

  function getItemsMax() {
    // fixedWidth or autoWidth while viewportMax is not available
    if (autoWidth || fixedWidth && !viewportMax) {
      return slideCount - 1; // most cases
    } else {
      var str = fixedWidth ? 'fixedWidth' : 'items',
          arr = [];

      if (fixedWidth || options[str] < slideCount) {
        arr.push(options[str]);
      }

      if (responsive) {
        for (var bp in responsive) {
          var tem = responsive[bp][str];

          if (tem && (fixedWidth || tem < slideCount)) {
            arr.push(tem);
          }
        }
      }

      if (!arr.length) {
        arr.push(0);
      }

      return Math.ceil(fixedWidth ? viewportMax / Math.min.apply(null, arr) : Math.max.apply(null, arr));
    }
  }

  function getCloneCountForLoop() {
    var itemsMax = getItemsMax(),
        result = carousel ? Math.ceil((itemsMax * 5 - slideCount) / 2) : itemsMax * 4 - slideCount;
    result = Math.max(itemsMax, result);
    return hasOption('edgePadding') ? result + 1 : result;
  }

  function getWindowWidth() {
    return win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth;
  }

  function getInsertPosition(pos) {
    return pos === 'top' ? 'afterbegin' : 'beforeend';
  }

  function getClientWidth(el) {
    if (el == null) {
      return;
    }

    var div = doc.createElement('div'),
        rect,
        width;
    el.appendChild(div);
    rect = div.getBoundingClientRect();
    width = rect.right - rect.left;
    div.remove();
    return width || getClientWidth(el.parentNode);
  }

  function getViewportWidth() {
    var gap = edgePadding ? edgePadding * 2 - gutter : 0;
    return getClientWidth(containerParent) - gap;
  }

  function hasOption(item) {
    if (options[item]) {
      return true;
    } else {
      if (responsive) {
        for (var bp in responsive) {
          if (responsive[bp][item]) {
            return true;
          }
        }
      }

      return false;
    }
  } // get option:
  // fixed width: viewport, fixedWidth, gutter => items
  // others: window width => all variables
  // all: items => slideBy


  function getOption(item, ww) {
    if (ww == null) {
      ww = windowWidth;
    }

    if (item === 'items' && fixedWidth) {
      return Math.floor((viewport + gutter) / (fixedWidth + gutter)) || 1;
    } else {
      var result = options[item];

      if (responsive) {
        for (var bp in responsive) {
          // bp: convert string to number
          if (ww >= parseInt(bp)) {
            if (item in responsive[bp]) {
              result = responsive[bp][item];
            }
          }
        }
      }

      if (item === 'slideBy' && result === 'page') {
        result = getOption('items');
      }

      if (!carousel && (item === 'slideBy' || item === 'items')) {
        result = Math.floor(result);
      }

      return result;
    }
  }

  function getSlideMarginLeft(i) {
    return CALC ? CALC + '(' + i * 100 + '% / ' + slideCountNew + ')' : i * 100 / slideCountNew + '%';
  }

  function getInnerWrapperStyles(edgePaddingTem, gutterTem, fixedWidthTem, speedTem, autoHeightBP) {
    var str = '';

    if (edgePaddingTem !== undefined) {
      var gap = edgePaddingTem;

      if (gutterTem) {
        gap -= gutterTem;
      }

      str = horizontal ? 'margin: 0 ' + gap + 'px 0 ' + edgePaddingTem + 'px;' : 'margin: ' + edgePaddingTem + 'px 0 ' + gap + 'px 0;';
    } else if (gutterTem && !fixedWidthTem) {
      var gutterTemUnit = '-' + gutterTem + 'px',
          dir = horizontal ? gutterTemUnit + ' 0 0' : '0 ' + gutterTemUnit + ' 0';
      str = 'margin: 0 ' + dir + ';';
    }

    if (!carousel && autoHeightBP && TRANSITIONDURATION && speedTem) {
      str += getTransitionDurationStyle(speedTem);
    }

    return str;
  }

  function getContainerWidth(fixedWidthTem, gutterTem, itemsTem) {
    if (fixedWidthTem) {
      return (fixedWidthTem + gutterTem) * slideCountNew + 'px';
    } else {
      return CALC ? CALC + '(' + slideCountNew * 100 + '% / ' + itemsTem + ')' : slideCountNew * 100 / itemsTem + '%';
    }
  }

  function getSlideWidthStyle(fixedWidthTem, gutterTem, itemsTem) {
    var width;

    if (fixedWidthTem) {
      width = fixedWidthTem + gutterTem + 'px';
    } else {
      if (!carousel) {
        itemsTem = Math.floor(itemsTem);
      }

      var dividend = carousel ? slideCountNew : itemsTem;
      width = CALC ? CALC + '(100% / ' + dividend + ')' : 100 / dividend + '%';
    }

    width = 'width:' + width; // inner slider: overwrite outer slider styles

    return nested !== 'inner' ? width + ';' : width + ' !important;';
  }

  function getSlideGutterStyle(gutterTem) {
    var str = ''; // gutter maybe interger || 0
    // so can't use 'if (gutter)'

    if (gutterTem !== false) {
      var prop = horizontal ? 'padding-' : 'margin-',
          dir = horizontal ? 'right' : 'bottom';
      str = prop + dir + ': ' + gutterTem + 'px;';
    }

    return str;
  }

  function getCSSPrefix(name, num) {
    var prefix = name.substring(0, name.length - num).toLowerCase();

    if (prefix) {
      prefix = '-' + prefix + '-';
    }

    return prefix;
  }

  function getTransitionDurationStyle(speed) {
    return getCSSPrefix(TRANSITIONDURATION, 18) + 'transition-duration:' + speed / 1000 + 's;';
  }

  function getAnimationDurationStyle(speed) {
    return getCSSPrefix(ANIMATIONDURATION, 17) + 'animation-duration:' + speed / 1000 + 's;';
  }

  function initStructure() {
    var classOuter = 'tns-outer',
        classInner = 'tns-inner',
        hasGutter = hasOption('gutter');
    outerWrapper.className = classOuter;
    innerWrapper.className = classInner;
    outerWrapper.id = slideId + '-ow';
    innerWrapper.id = slideId + '-iw'; // set container properties

    if (container.id === '') {
      container.id = slideId;
    }

    newContainerClasses += PERCENTAGELAYOUT || autoWidth ? ' tns-subpixel' : ' tns-no-subpixel';
    newContainerClasses += CALC ? ' tns-calc' : ' tns-no-calc';

    if (autoWidth) {
      newContainerClasses += ' tns-autowidth';
    }

    newContainerClasses += ' tns-' + options.axis;
    container.className += newContainerClasses; // add constrain layer for carousel

    if (carousel) {
      middleWrapper = doc.createElement('div');
      middleWrapper.id = slideId + '-mw';
      middleWrapper.className = 'tns-ovh';
      outerWrapper.appendChild(middleWrapper);
      middleWrapper.appendChild(innerWrapper);
    } else {
      outerWrapper.appendChild(innerWrapper);
    }

    if (autoHeight) {
      var wp = middleWrapper ? middleWrapper : innerWrapper;
      wp.className += ' tns-ah';
    }

    containerParent.insertBefore(outerWrapper, container);
    innerWrapper.appendChild(container); // add id, class, aria attributes
    // before clone slides

    Object(_helpers_forEach_js__WEBPACK_IMPORTED_MODULE_15__["forEach"])(slideItems, function (item, i) {
      Object(_helpers_addClass_js__WEBPACK_IMPORTED_MODULE_17__["addClass"])(item, 'tns-item');

      if (!item.id) {
        item.id = slideId + '-item' + i;
      }

      if (!carousel && animateNormal) {
        Object(_helpers_addClass_js__WEBPACK_IMPORTED_MODULE_17__["addClass"])(item, animateNormal);
      }

      Object(_helpers_setAttrs_js__WEBPACK_IMPORTED_MODULE_21__["setAttrs"])(item, {
        'aria-hidden': 'true',
        'tabindex': '-1'
      });
    }); // ## clone slides
    // carousel: n + slides + n
    // gallery:      slides + n

    if (cloneCount) {
      var fragmentBefore = doc.createDocumentFragment(),
          fragmentAfter = doc.createDocumentFragment();

      for (var j = cloneCount; j--;) {
        var num = j % slideCount,
            cloneFirst = slideItems[num].cloneNode(true);
        Object(_helpers_addClass_js__WEBPACK_IMPORTED_MODULE_17__["addClass"])(cloneFirst, slideClonedClass);
        Object(_helpers_removeAttrs_js__WEBPACK_IMPORTED_MODULE_22__["removeAttrs"])(cloneFirst, 'id');
        fragmentAfter.insertBefore(cloneFirst, fragmentAfter.firstChild);

        if (carousel) {
          var cloneLast = slideItems[slideCount - 1 - num].cloneNode(true);
          Object(_helpers_addClass_js__WEBPACK_IMPORTED_MODULE_17__["addClass"])(cloneLast, slideClonedClass);
          Object(_helpers_removeAttrs_js__WEBPACK_IMPORTED_MODULE_22__["removeAttrs"])(cloneLast, 'id');
          fragmentBefore.appendChild(cloneLast);
        }
      }

      container.insertBefore(fragmentBefore, container.firstChild);
      container.appendChild(fragmentAfter);
      slideItems = container.children;
    }
  }

  function initSliderTransform() {
    // ## images loaded/failed
    if (hasOption('autoHeight') || autoWidth || !horizontal) {
      var imgs = container.querySelectorAll('img'); // add img load event listener

      Object(_helpers_forEach_js__WEBPACK_IMPORTED_MODULE_15__["forEach"])(imgs, function (img) {
        var src = img.src;

        if (!lazyload) {
          // not data img
          if (src && src.indexOf('data:image') < 0) {
            img.src = '';
            Object(_helpers_addEvents_js__WEBPACK_IMPORTED_MODULE_30__["addEvents"])(img, imgEvents);
            Object(_helpers_addClass_js__WEBPACK_IMPORTED_MODULE_17__["addClass"])(img, 'loading');
            img.src = src; // data img
          } else {
            imgLoaded(img);
          }
        }
      }); // set imgsComplete

      Object(_helpers_raf_js__WEBPACK_IMPORTED_MODULE_0__["raf"])(function () {
        imgsLoadedCheck(Object(_helpers_arrayFromNodeList_js__WEBPACK_IMPORTED_MODULE_23__["arrayFromNodeList"])(imgs), function () {
          imgsComplete = true;
        });
      }); // reset imgs for auto height: check visible imgs only

      if (hasOption('autoHeight')) {
        imgs = getImageArray(index, Math.min(index + items - 1, slideCountNew - 1));
      }

      lazyload ? initSliderTransformStyleCheck() : Object(_helpers_raf_js__WEBPACK_IMPORTED_MODULE_0__["raf"])(function () {
        imgsLoadedCheck(Object(_helpers_arrayFromNodeList_js__WEBPACK_IMPORTED_MODULE_23__["arrayFromNodeList"])(imgs), initSliderTransformStyleCheck);
      });
    } else {
      // set container transform property
      if (carousel) {
        doContainerTransformSilent();
      } // update slider tools and events


      initTools();
      initEvents();
    }
  }

  function initSliderTransformStyleCheck() {
    if (autoWidth && slideCount > 1) {
      // check styles application
      var num = loop ? index : slideCount - 1;

      (function stylesApplicationCheck() {
        var left = slideItems[num].getBoundingClientRect().left;
        var right = slideItems[num - 1].getBoundingClientRect().right;
        Math.abs(left - right) <= 1 ? initSliderTransformCore() : setTimeout(function () {
          stylesApplicationCheck();
        }, 16);
      })();
    } else {
      initSliderTransformCore();
    }
  }

  function initSliderTransformCore() {
    // run Fn()s which are rely on image loading
    if (!horizontal || autoWidth) {
      setSlidePositions();

      if (autoWidth) {
        rightBoundary = getRightBoundary();

        if (freezable) {
          freeze = getFreeze();
        }

        indexMax = getIndexMax(); // <= slidePositions, rightBoundary <=

        resetVariblesWhenDisable(disable || freeze);
      } else {
        updateContentWrapperHeight();
      }
    } // set container transform property


    if (carousel) {
      doContainerTransformSilent();
    } // update slider tools and events


    initTools();
    initEvents();
  }

  function initSheet() {
    // gallery:
    // set animation classes and left value for gallery slider
    if (!carousel) {
      for (var i = index, l = index + Math.min(slideCount, items); i < l; i++) {
        var item = slideItems[i];
        item.style.left = (i - index) * 100 / items + '%';
        Object(_helpers_addClass_js__WEBPACK_IMPORTED_MODULE_17__["addClass"])(item, animateIn);
        Object(_helpers_removeClass_js__WEBPACK_IMPORTED_MODULE_18__["removeClass"])(item, animateNormal);
      }
    } // #### LAYOUT
    // ## INLINE-BLOCK VS FLOAT
    // ## PercentageLayout:
    // slides: inline-block
    // remove blank space between slides by set font-size: 0
    // ## Non PercentageLayout:
    // slides: float
    //         margin-right: -100%
    //         margin-left: ~
    // Resource: https://docs.google.com/spreadsheets/d/147up245wwTXeQYve3BRSAD4oVcvQmuGsFteJOeA5xNQ/edit?usp=sharing


    if (horizontal) {
      if (PERCENTAGELAYOUT || autoWidth) {
        Object(_helpers_addCSSRule_js__WEBPACK_IMPORTED_MODULE_10__["addCSSRule"])(sheet, '#' + slideId + ' > .tns-item', 'font-size:' + win.getComputedStyle(slideItems[0]).fontSize + ';', Object(_helpers_getCssRulesLength_js__WEBPACK_IMPORTED_MODULE_12__["getCssRulesLength"])(sheet));
        Object(_helpers_addCSSRule_js__WEBPACK_IMPORTED_MODULE_10__["addCSSRule"])(sheet, '#' + slideId, 'font-size:0;', Object(_helpers_getCssRulesLength_js__WEBPACK_IMPORTED_MODULE_12__["getCssRulesLength"])(sheet));
      } else if (carousel) {
        Object(_helpers_forEach_js__WEBPACK_IMPORTED_MODULE_15__["forEach"])(slideItems, function (slide, i) {
          slide.style.marginLeft = getSlideMarginLeft(i);
        });
      }
    } // ## BASIC STYLES


    if (CSSMQ) {
      // middle wrapper style
      if (TRANSITIONDURATION) {
        var str = middleWrapper && options.autoHeight ? getTransitionDurationStyle(options.speed) : '';
        Object(_helpers_addCSSRule_js__WEBPACK_IMPORTED_MODULE_10__["addCSSRule"])(sheet, '#' + slideId + '-mw', str, Object(_helpers_getCssRulesLength_js__WEBPACK_IMPORTED_MODULE_12__["getCssRulesLength"])(sheet));
      } // inner wrapper styles


      str = getInnerWrapperStyles(options.edgePadding, options.gutter, options.fixedWidth, options.speed, options.autoHeight);
      Object(_helpers_addCSSRule_js__WEBPACK_IMPORTED_MODULE_10__["addCSSRule"])(sheet, '#' + slideId + '-iw', str, Object(_helpers_getCssRulesLength_js__WEBPACK_IMPORTED_MODULE_12__["getCssRulesLength"])(sheet)); // container styles

      if (carousel) {
        str = horizontal && !autoWidth ? 'width:' + getContainerWidth(options.fixedWidth, options.gutter, options.items) + ';' : '';

        if (TRANSITIONDURATION) {
          str += getTransitionDurationStyle(speed);
        }

        Object(_helpers_addCSSRule_js__WEBPACK_IMPORTED_MODULE_10__["addCSSRule"])(sheet, '#' + slideId, str, Object(_helpers_getCssRulesLength_js__WEBPACK_IMPORTED_MODULE_12__["getCssRulesLength"])(sheet));
      } // slide styles


      str = horizontal && !autoWidth ? getSlideWidthStyle(options.fixedWidth, options.gutter, options.items) : '';

      if (options.gutter) {
        str += getSlideGutterStyle(options.gutter);
      } // set gallery items transition-duration


      if (!carousel) {
        if (TRANSITIONDURATION) {
          str += getTransitionDurationStyle(speed);
        }

        if (ANIMATIONDURATION) {
          str += getAnimationDurationStyle(speed);
        }
      }

      if (str) {
        Object(_helpers_addCSSRule_js__WEBPACK_IMPORTED_MODULE_10__["addCSSRule"])(sheet, '#' + slideId + ' > .tns-item', str, Object(_helpers_getCssRulesLength_js__WEBPACK_IMPORTED_MODULE_12__["getCssRulesLength"])(sheet));
      } // non CSS mediaqueries: IE8
      // ## update inner wrapper, container, slides if needed
      // set inline styles for inner wrapper & container
      // insert stylesheet (one line) for slides only (since slides are many)

    } else {
      // middle wrapper styles
      update_carousel_transition_duration(); // inner wrapper styles

      innerWrapper.style.cssText = getInnerWrapperStyles(edgePadding, gutter, fixedWidth, autoHeight); // container styles

      if (carousel && horizontal && !autoWidth) {
        container.style.width = getContainerWidth(fixedWidth, gutter, items);
      } // slide styles


      var str = horizontal && !autoWidth ? getSlideWidthStyle(fixedWidth, gutter, items) : '';

      if (gutter) {
        str += getSlideGutterStyle(gutter);
      } // append to the last line


      if (str) {
        Object(_helpers_addCSSRule_js__WEBPACK_IMPORTED_MODULE_10__["addCSSRule"])(sheet, '#' + slideId + ' > .tns-item', str, Object(_helpers_getCssRulesLength_js__WEBPACK_IMPORTED_MODULE_12__["getCssRulesLength"])(sheet));
      }
    } // ## MEDIAQUERIES


    if (responsive && CSSMQ) {
      for (var bp in responsive) {
        // bp: convert string to number
        bp = parseInt(bp);
        var opts = responsive[bp],
            str = '',
            middleWrapperStr = '',
            innerWrapperStr = '',
            containerStr = '',
            slideStr = '',
            itemsBP = !autoWidth ? getOption('items', bp) : null,
            fixedWidthBP = getOption('fixedWidth', bp),
            speedBP = getOption('speed', bp),
            edgePaddingBP = getOption('edgePadding', bp),
            autoHeightBP = getOption('autoHeight', bp),
            gutterBP = getOption('gutter', bp); // middle wrapper string

        if (TRANSITIONDURATION && middleWrapper && getOption('autoHeight', bp) && 'speed' in opts) {
          middleWrapperStr = '#' + slideId + '-mw{' + getTransitionDurationStyle(speedBP) + '}';
        } // inner wrapper string


        if ('edgePadding' in opts || 'gutter' in opts) {
          innerWrapperStr = '#' + slideId + '-iw{' + getInnerWrapperStyles(edgePaddingBP, gutterBP, fixedWidthBP, speedBP, autoHeightBP) + '}';
        } // container string


        if (carousel && horizontal && !autoWidth && ('fixedWidth' in opts || 'items' in opts || fixedWidth && 'gutter' in opts)) {
          containerStr = 'width:' + getContainerWidth(fixedWidthBP, gutterBP, itemsBP) + ';';
        }

        if (TRANSITIONDURATION && 'speed' in opts) {
          containerStr += getTransitionDurationStyle(speedBP);
        }

        if (containerStr) {
          containerStr = '#' + slideId + '{' + containerStr + '}';
        } // slide string


        if ('fixedWidth' in opts || fixedWidth && 'gutter' in opts || !carousel && 'items' in opts) {
          slideStr += getSlideWidthStyle(fixedWidthBP, gutterBP, itemsBP);
        }

        if ('gutter' in opts) {
          slideStr += getSlideGutterStyle(gutterBP);
        } // set gallery items transition-duration


        if (!carousel && 'speed' in opts) {
          if (TRANSITIONDURATION) {
            slideStr += getTransitionDurationStyle(speedBP);
          }

          if (ANIMATIONDURATION) {
            slideStr += getAnimationDurationStyle(speedBP);
          }
        }

        if (slideStr) {
          slideStr = '#' + slideId + ' > .tns-item{' + slideStr + '}';
        } // add up


        str = middleWrapperStr + innerWrapperStr + containerStr + slideStr;

        if (str) {
          sheet.insertRule('@media (min-width: ' + bp / 16 + 'em) {' + str + '}', sheet.cssRules.length);
        }
      }
    }
  }

  function initTools() {
    // == slides ==
    updateSlideStatus(); // == live region ==

    outerWrapper.insertAdjacentHTML('afterbegin', '<div class="tns-liveregion tns-visually-hidden" aria-live="polite" aria-atomic="true">slide <span class="current">' + getLiveRegionStr() + '</span>  of ' + slideCount + '</div>');
    liveregionCurrent = outerWrapper.querySelector('.tns-liveregion .current'); // == autoplayInit ==

    if (hasAutoplay) {
      var txt = autoplay ? 'stop' : 'start';

      if (autoplayButton) {
        Object(_helpers_setAttrs_js__WEBPACK_IMPORTED_MODULE_21__["setAttrs"])(autoplayButton, {
          'data-action': txt
        });
      } else if (options.autoplayButtonOutput) {
        outerWrapper.insertAdjacentHTML(getInsertPosition(options.autoplayPosition), '<button type="button" data-action="' + txt + '">' + autoplayHtmlStrings[0] + txt + autoplayHtmlStrings[1] + autoplayText[0] + '</button>');
        autoplayButton = outerWrapper.querySelector('[data-action]');
      } // add event


      if (autoplayButton) {
        Object(_helpers_addEvents_js__WEBPACK_IMPORTED_MODULE_30__["addEvents"])(autoplayButton, {
          'click': toggleAutoplay
        });
      }

      if (autoplay) {
        startAutoplay();

        if (autoplayHoverPause) {
          Object(_helpers_addEvents_js__WEBPACK_IMPORTED_MODULE_30__["addEvents"])(container, hoverEvents);
        }

        if (autoplayResetOnVisibility) {
          Object(_helpers_addEvents_js__WEBPACK_IMPORTED_MODULE_30__["addEvents"])(container, visibilityEvent);
        }
      }
    } // == navInit ==


    if (hasNav) {
      var initIndex = !carousel ? 0 : cloneCount; // customized nav
      // will not hide the navs in case they're thumbnails

      if (navContainer) {
        Object(_helpers_setAttrs_js__WEBPACK_IMPORTED_MODULE_21__["setAttrs"])(navContainer, {
          'aria-label': 'Carousel Pagination'
        });
        navItems = navContainer.children;
        Object(_helpers_forEach_js__WEBPACK_IMPORTED_MODULE_15__["forEach"])(navItems, function (item, i) {
          Object(_helpers_setAttrs_js__WEBPACK_IMPORTED_MODULE_21__["setAttrs"])(item, {
            'data-nav': i,
            'tabindex': '-1',
            'aria-label': navStr + (i + 1),
            'aria-controls': slideId
          });
        }); // generated nav
      } else {
        var navHtml = '',
            hiddenStr = navAsThumbnails ? '' : 'style="display:none"';

        for (var i = 0; i < slideCount; i++) {
          // hide nav items by default
          navHtml += '<button type="button" data-nav="' + i + '" tabindex="-1" aria-controls="' + slideId + '" ' + hiddenStr + ' aria-label="' + navStr + (i + 1) + '"></button>';
        }

        navHtml = '<div class="tns-nav" aria-label="Carousel Pagination">' + navHtml + '</div>';
        outerWrapper.insertAdjacentHTML(getInsertPosition(options.navPosition), navHtml);
        navContainer = outerWrapper.querySelector('.tns-nav');
        navItems = navContainer.children;
      }

      updateNavVisibility(); // add transition

      if (TRANSITIONDURATION) {
        var prefix = TRANSITIONDURATION.substring(0, TRANSITIONDURATION.length - 18).toLowerCase(),
            str = 'transition: all ' + speed / 1000 + 's';

        if (prefix) {
          str = '-' + prefix + '-' + str;
        }

        Object(_helpers_addCSSRule_js__WEBPACK_IMPORTED_MODULE_10__["addCSSRule"])(sheet, '[aria-controls^=' + slideId + '-item]', str, Object(_helpers_getCssRulesLength_js__WEBPACK_IMPORTED_MODULE_12__["getCssRulesLength"])(sheet));
      }

      Object(_helpers_setAttrs_js__WEBPACK_IMPORTED_MODULE_21__["setAttrs"])(navItems[navCurrentIndex], {
        'aria-label': navStr + (navCurrentIndex + 1) + navStrCurrent
      });
      Object(_helpers_removeAttrs_js__WEBPACK_IMPORTED_MODULE_22__["removeAttrs"])(navItems[navCurrentIndex], 'tabindex');
      Object(_helpers_addClass_js__WEBPACK_IMPORTED_MODULE_17__["addClass"])(navItems[navCurrentIndex], navActiveClass); // add events

      Object(_helpers_addEvents_js__WEBPACK_IMPORTED_MODULE_30__["addEvents"])(navContainer, navEvents);
    } // == controlsInit ==


    if (hasControls) {
      if (!controlsContainer && (!prevButton || !nextButton)) {
        outerWrapper.insertAdjacentHTML(getInsertPosition(options.controlsPosition), '<div class="tns-controls" aria-label="Carousel Navigation" tabindex="0"><button type="button" data-controls="prev" tabindex="-1" aria-controls="' + slideId + '">' + controlsText[0] + '</button><button type="button" data-controls="next" tabindex="-1" aria-controls="' + slideId + '">' + controlsText[1] + '</button></div>');
        controlsContainer = outerWrapper.querySelector('.tns-controls');
      }

      if (!prevButton || !nextButton) {
        prevButton = controlsContainer.children[0];
        nextButton = controlsContainer.children[1];
      }

      if (options.controlsContainer) {
        Object(_helpers_setAttrs_js__WEBPACK_IMPORTED_MODULE_21__["setAttrs"])(controlsContainer, {
          'aria-label': 'Carousel Navigation',
          'tabindex': '0'
        });
      }

      if (options.controlsContainer || options.prevButton && options.nextButton) {
        Object(_helpers_setAttrs_js__WEBPACK_IMPORTED_MODULE_21__["setAttrs"])([prevButton, nextButton], {
          'aria-controls': slideId,
          'tabindex': '-1'
        });
      }

      if (options.controlsContainer || options.prevButton && options.nextButton) {
        Object(_helpers_setAttrs_js__WEBPACK_IMPORTED_MODULE_21__["setAttrs"])(prevButton, {
          'data-controls': 'prev'
        });
        Object(_helpers_setAttrs_js__WEBPACK_IMPORTED_MODULE_21__["setAttrs"])(nextButton, {
          'data-controls': 'next'
        });
      }

      prevIsButton = isButton(prevButton);
      nextIsButton = isButton(nextButton);
      updateControlsStatus(); // add events

      if (controlsContainer) {
        Object(_helpers_addEvents_js__WEBPACK_IMPORTED_MODULE_30__["addEvents"])(controlsContainer, controlsEvents);
      } else {
        Object(_helpers_addEvents_js__WEBPACK_IMPORTED_MODULE_30__["addEvents"])(prevButton, controlsEvents);
        Object(_helpers_addEvents_js__WEBPACK_IMPORTED_MODULE_30__["addEvents"])(nextButton, controlsEvents);
      }
    } // hide tools if needed


    disableUI();
  }

  function initEvents() {
    // add events
    if (carousel && TRANSITIONEND) {
      var eve = {};
      eve[TRANSITIONEND] = onTransitionEnd;
      Object(_helpers_addEvents_js__WEBPACK_IMPORTED_MODULE_30__["addEvents"])(container, eve);
    }

    if (touch) {
      Object(_helpers_addEvents_js__WEBPACK_IMPORTED_MODULE_30__["addEvents"])(container, touchEvents, options.preventScrollOnTouch);
    }

    if (mouseDrag) {
      Object(_helpers_addEvents_js__WEBPACK_IMPORTED_MODULE_30__["addEvents"])(container, dragEvents);
    }

    if (arrowKeys) {
      Object(_helpers_addEvents_js__WEBPACK_IMPORTED_MODULE_30__["addEvents"])(doc, docmentKeydownEvent);
    }

    if (nested === 'inner') {
      events.on('outerResized', function () {
        resizeTasks();
        events.emit('innerLoaded', info());
      });
    } else if (responsive || fixedWidth || autoWidth || autoHeight || !horizontal) {
      Object(_helpers_addEvents_js__WEBPACK_IMPORTED_MODULE_30__["addEvents"])(win, {
        'resize': onResize
      });
    }

    if (autoHeight) {
      if (nested === 'outer') {
        events.on('innerLoaded', doAutoHeight);
      } else if (!disable) {
        doAutoHeight();
      }
    }

    doLazyLoad();

    if (disable) {
      disableSlider();
    } else if (freeze) {
      freezeSlider();
    }

    events.on('indexChanged', additionalUpdates);

    if (nested === 'inner') {
      events.emit('innerLoaded', info());
    }

    if (typeof onInit === 'function') {
      onInit(info());
    }

    isOn = true;
  }

  function destroy() {
    // sheet
    sheet.disabled = true;

    if (sheet.ownerNode) {
      sheet.ownerNode.remove();
    } // remove win event listeners


    Object(_helpers_removeEvents_js__WEBPACK_IMPORTED_MODULE_31__["removeEvents"])(win, {
      'resize': onResize
    }); // arrowKeys, controls, nav

    if (arrowKeys) {
      Object(_helpers_removeEvents_js__WEBPACK_IMPORTED_MODULE_31__["removeEvents"])(doc, docmentKeydownEvent);
    }

    if (controlsContainer) {
      Object(_helpers_removeEvents_js__WEBPACK_IMPORTED_MODULE_31__["removeEvents"])(controlsContainer, controlsEvents);
    }

    if (navContainer) {
      Object(_helpers_removeEvents_js__WEBPACK_IMPORTED_MODULE_31__["removeEvents"])(navContainer, navEvents);
    } // autoplay


    Object(_helpers_removeEvents_js__WEBPACK_IMPORTED_MODULE_31__["removeEvents"])(container, hoverEvents);
    Object(_helpers_removeEvents_js__WEBPACK_IMPORTED_MODULE_31__["removeEvents"])(container, visibilityEvent);

    if (autoplayButton) {
      Object(_helpers_removeEvents_js__WEBPACK_IMPORTED_MODULE_31__["removeEvents"])(autoplayButton, {
        'click': toggleAutoplay
      });
    }

    if (autoplay) {
      clearInterval(autoplayTimer);
    } // container


    if (carousel && TRANSITIONEND) {
      var eve = {};
      eve[TRANSITIONEND] = onTransitionEnd;
      Object(_helpers_removeEvents_js__WEBPACK_IMPORTED_MODULE_31__["removeEvents"])(container, eve);
    }

    if (touch) {
      Object(_helpers_removeEvents_js__WEBPACK_IMPORTED_MODULE_31__["removeEvents"])(container, touchEvents);
    }

    if (mouseDrag) {
      Object(_helpers_removeEvents_js__WEBPACK_IMPORTED_MODULE_31__["removeEvents"])(container, dragEvents);
    } // cache Object values in options && reset HTML


    var htmlList = [containerHTML, controlsContainerHTML, prevButtonHTML, nextButtonHTML, navContainerHTML, autoplayButtonHTML];
    tnsList.forEach(function (item, i) {
      var el = item === 'container' ? outerWrapper : options[item];

      if (_typeof(el) === 'object' && el) {
        var prevEl = el.previousElementSibling ? el.previousElementSibling : false,
            parentEl = el.parentNode;
        el.outerHTML = htmlList[i];
        options[item] = prevEl ? prevEl.nextElementSibling : parentEl.firstElementChild;
      }
    }); // reset variables

    tnsList = animateIn = animateOut = animateDelay = animateNormal = horizontal = outerWrapper = innerWrapper = container = containerParent = containerHTML = slideItems = slideCount = breakpointZone = windowWidth = autoWidth = fixedWidth = edgePadding = gutter = viewport = items = slideBy = viewportMax = arrowKeys = speed = rewind = loop = autoHeight = sheet = lazyload = slidePositions = slideItemsOut = cloneCount = slideCountNew = hasRightDeadZone = rightBoundary = updateIndexBeforeTransform = transformAttr = transformPrefix = transformPostfix = getIndexMax = index = indexCached = indexMin = indexMax = resizeTimer = swipeAngle = moveDirectionExpected = running = onInit = events = newContainerClasses = slideId = disable = disabled = freezable = freeze = frozen = controlsEvents = navEvents = hoverEvents = visibilityEvent = docmentKeydownEvent = touchEvents = dragEvents = hasControls = hasNav = navAsThumbnails = hasAutoplay = hasTouch = hasMouseDrag = slideActiveClass = imgCompleteClass = imgEvents = imgsComplete = controls = controlsText = controlsContainer = controlsContainerHTML = prevButton = nextButton = prevIsButton = nextIsButton = nav = navContainer = navContainerHTML = navItems = pages = pagesCached = navClicked = navCurrentIndex = navCurrentIndexCached = navActiveClass = navStr = navStrCurrent = autoplay = autoplayTimeout = autoplayDirection = autoplayText = autoplayHoverPause = autoplayButton = autoplayButtonHTML = autoplayResetOnVisibility = autoplayHtmlStrings = autoplayTimer = animating = autoplayHoverPaused = autoplayUserPaused = autoplayVisibilityPaused = initPosition = lastPosition = translateInit = disX = disY = panStart = rafIndex = getDist = touch = mouseDrag = null; // check variables
    // [animateIn, animateOut, animateDelay, animateNormal, horizontal, outerWrapper, innerWrapper, container, containerParent, containerHTML, slideItems, slideCount, breakpointZone, windowWidth, autoWidth, fixedWidth, edgePadding, gutter, viewport, items, slideBy, viewportMax, arrowKeys, speed, rewind, loop, autoHeight, sheet, lazyload, slidePositions, slideItemsOut, cloneCount, slideCountNew, hasRightDeadZone, rightBoundary, updateIndexBeforeTransform, transformAttr, transformPrefix, transformPostfix, getIndexMax, index, indexCached, indexMin, indexMax, resizeTimer, swipeAngle, moveDirectionExpected, running, onInit, events, newContainerClasses, slideId, disable, disabled, freezable, freeze, frozen, controlsEvents, navEvents, hoverEvents, visibilityEvent, docmentKeydownEvent, touchEvents, dragEvents, hasControls, hasNav, navAsThumbnails, hasAutoplay, hasTouch, hasMouseDrag, slideActiveClass, imgCompleteClass, imgEvents, imgsComplete, controls, controlsText, controlsContainer, controlsContainerHTML, prevButton, nextButton, prevIsButton, nextIsButton, nav, navContainer, navContainerHTML, navItems, pages, pagesCached, navClicked, navCurrentIndex, navCurrentIndexCached, navActiveClass, navStr, navStrCurrent, autoplay, autoplayTimeout, autoplayDirection, autoplayText, autoplayHoverPause, autoplayButton, autoplayButtonHTML, autoplayResetOnVisibility, autoplayHtmlStrings, autoplayTimer, animating, autoplayHoverPaused, autoplayUserPaused, autoplayVisibilityPaused, initPosition, lastPosition, translateInit, disX, disY, panStart, rafIndex, getDist, touch, mouseDrag ].forEach(function(item) { if (item !== null) { console.log(item); } });

    for (var a in this) {
      if (a !== 'rebuild') {
        this[a] = null;
      }
    }

    isOn = false;
  } // === ON RESIZE ===
  // responsive || fixedWidth || autoWidth || !horizontal


  function onResize(e) {
    Object(_helpers_raf_js__WEBPACK_IMPORTED_MODULE_0__["raf"])(function () {
      resizeTasks(getEvent(e));
    });
  }

  function resizeTasks(e) {
    if (!isOn) {
      return;
    }

    if (nested === 'outer') {
      events.emit('outerResized', info(e));
    }

    windowWidth = getWindowWidth();
    var bpChanged,
        breakpointZoneTem = breakpointZone,
        needContainerTransform = false;

    if (responsive) {
      setBreakpointZone();
      bpChanged = breakpointZoneTem !== breakpointZone; // if (hasRightDeadZone) { needContainerTransform = true; } // *?

      if (bpChanged) {
        events.emit('newBreakpointStart', info(e));
      }
    }

    var indChanged,
        itemsChanged,
        itemsTem = items,
        disableTem = disable,
        freezeTem = freeze,
        arrowKeysTem = arrowKeys,
        controlsTem = controls,
        navTem = nav,
        touchTem = touch,
        mouseDragTem = mouseDrag,
        autoplayTem = autoplay,
        autoplayHoverPauseTem = autoplayHoverPause,
        autoplayResetOnVisibilityTem = autoplayResetOnVisibility,
        indexTem = index;

    if (bpChanged) {
      var fixedWidthTem = fixedWidth,
          autoHeightTem = autoHeight,
          controlsTextTem = controlsText,
          centerTem = center,
          autoplayTextTem = autoplayText;

      if (!CSSMQ) {
        var gutterTem = gutter,
            edgePaddingTem = edgePadding;
      }
    } // get option:
    // fixed width: viewport, fixedWidth, gutter => items
    // others: window width => all variables
    // all: items => slideBy


    arrowKeys = getOption('arrowKeys');
    controls = getOption('controls');
    nav = getOption('nav');
    touch = getOption('touch');
    center = getOption('center');
    mouseDrag = getOption('mouseDrag');
    autoplay = getOption('autoplay');
    autoplayHoverPause = getOption('autoplayHoverPause');
    autoplayResetOnVisibility = getOption('autoplayResetOnVisibility');

    if (bpChanged) {
      disable = getOption('disable');
      fixedWidth = getOption('fixedWidth');
      speed = getOption('speed');
      autoHeight = getOption('autoHeight');
      controlsText = getOption('controlsText');
      autoplayText = getOption('autoplayText');
      autoplayTimeout = getOption('autoplayTimeout');

      if (!CSSMQ) {
        edgePadding = getOption('edgePadding');
        gutter = getOption('gutter');
      }
    } // update options


    resetVariblesWhenDisable(disable);
    viewport = getViewportWidth(); // <= edgePadding, gutter

    if ((!horizontal || autoWidth) && !disable) {
      setSlidePositions();

      if (!horizontal) {
        updateContentWrapperHeight(); // <= setSlidePositions

        needContainerTransform = true;
      }
    }

    if (fixedWidth || autoWidth) {
      rightBoundary = getRightBoundary(); // autoWidth: <= viewport, slidePositions, gutter
      // fixedWidth: <= viewport, fixedWidth, gutter

      indexMax = getIndexMax(); // autoWidth: <= rightBoundary, slidePositions
      // fixedWidth: <= rightBoundary, fixedWidth, gutter
    }

    if (bpChanged || fixedWidth) {
      items = getOption('items');
      slideBy = getOption('slideBy');
      itemsChanged = items !== itemsTem;

      if (itemsChanged) {
        if (!fixedWidth && !autoWidth) {
          indexMax = getIndexMax();
        } // <= items
        // check index before transform in case
        // slider reach the right edge then items become bigger


        updateIndex();
      }
    }

    if (bpChanged) {
      if (disable !== disableTem) {
        if (disable) {
          disableSlider();
        } else {
          enableSlider(); // <= slidePositions, rightBoundary, indexMax
        }
      }
    }

    if (freezable && (bpChanged || fixedWidth || autoWidth)) {
      freeze = getFreeze(); // <= autoWidth: slidePositions, gutter, viewport, rightBoundary
      // <= fixedWidth: fixedWidth, gutter, rightBoundary
      // <= others: items

      if (freeze !== freezeTem) {
        if (freeze) {
          doContainerTransform(getContainerTransformValue(getStartIndex(0)));
          freezeSlider();
        } else {
          unfreezeSlider();
          needContainerTransform = true;
        }
      }
    }

    resetVariblesWhenDisable(disable || freeze); // controls, nav, touch, mouseDrag, arrowKeys, autoplay, autoplayHoverPause, autoplayResetOnVisibility

    if (!autoplay) {
      autoplayHoverPause = autoplayResetOnVisibility = false;
    }

    if (arrowKeys !== arrowKeysTem) {
      arrowKeys ? Object(_helpers_addEvents_js__WEBPACK_IMPORTED_MODULE_30__["addEvents"])(doc, docmentKeydownEvent) : Object(_helpers_removeEvents_js__WEBPACK_IMPORTED_MODULE_31__["removeEvents"])(doc, docmentKeydownEvent);
    }

    if (controls !== controlsTem) {
      if (controls) {
        if (controlsContainer) {
          Object(_helpers_showElement_js__WEBPACK_IMPORTED_MODULE_25__["showElement"])(controlsContainer);
        } else {
          if (prevButton) {
            Object(_helpers_showElement_js__WEBPACK_IMPORTED_MODULE_25__["showElement"])(prevButton);
          }

          if (nextButton) {
            Object(_helpers_showElement_js__WEBPACK_IMPORTED_MODULE_25__["showElement"])(nextButton);
          }
        }
      } else {
        if (controlsContainer) {
          Object(_helpers_hideElement_js__WEBPACK_IMPORTED_MODULE_24__["hideElement"])(controlsContainer);
        } else {
          if (prevButton) {
            Object(_helpers_hideElement_js__WEBPACK_IMPORTED_MODULE_24__["hideElement"])(prevButton);
          }

          if (nextButton) {
            Object(_helpers_hideElement_js__WEBPACK_IMPORTED_MODULE_24__["hideElement"])(nextButton);
          }
        }
      }
    }

    if (nav !== navTem) {
      if (nav) {
        Object(_helpers_showElement_js__WEBPACK_IMPORTED_MODULE_25__["showElement"])(navContainer);
        updateNavVisibility();
      } else {
        Object(_helpers_hideElement_js__WEBPACK_IMPORTED_MODULE_24__["hideElement"])(navContainer);
      }
    }

    if (touch !== touchTem) {
      touch ? Object(_helpers_addEvents_js__WEBPACK_IMPORTED_MODULE_30__["addEvents"])(container, touchEvents, options.preventScrollOnTouch) : Object(_helpers_removeEvents_js__WEBPACK_IMPORTED_MODULE_31__["removeEvents"])(container, touchEvents);
    }

    if (mouseDrag !== mouseDragTem) {
      mouseDrag ? Object(_helpers_addEvents_js__WEBPACK_IMPORTED_MODULE_30__["addEvents"])(container, dragEvents) : Object(_helpers_removeEvents_js__WEBPACK_IMPORTED_MODULE_31__["removeEvents"])(container, dragEvents);
    }

    if (autoplay !== autoplayTem) {
      if (autoplay) {
        if (autoplayButton) {
          Object(_helpers_showElement_js__WEBPACK_IMPORTED_MODULE_25__["showElement"])(autoplayButton);
        }

        if (!animating && !autoplayUserPaused) {
          startAutoplay();
        }
      } else {
        if (autoplayButton) {
          Object(_helpers_hideElement_js__WEBPACK_IMPORTED_MODULE_24__["hideElement"])(autoplayButton);
        }

        if (animating) {
          stopAutoplay();
        }
      }
    }

    if (autoplayHoverPause !== autoplayHoverPauseTem) {
      autoplayHoverPause ? Object(_helpers_addEvents_js__WEBPACK_IMPORTED_MODULE_30__["addEvents"])(container, hoverEvents) : Object(_helpers_removeEvents_js__WEBPACK_IMPORTED_MODULE_31__["removeEvents"])(container, hoverEvents);
    }

    if (autoplayResetOnVisibility !== autoplayResetOnVisibilityTem) {
      autoplayResetOnVisibility ? Object(_helpers_addEvents_js__WEBPACK_IMPORTED_MODULE_30__["addEvents"])(doc, visibilityEvent) : Object(_helpers_removeEvents_js__WEBPACK_IMPORTED_MODULE_31__["removeEvents"])(doc, visibilityEvent);
    }

    if (bpChanged) {
      if (fixedWidth !== fixedWidthTem || center !== centerTem) {
        needContainerTransform = true;
      }

      if (autoHeight !== autoHeightTem) {
        if (!autoHeight) {
          innerWrapper.style.height = '';
        }
      }

      if (controls && controlsText !== controlsTextTem) {
        prevButton.innerHTML = controlsText[0];
        nextButton.innerHTML = controlsText[1];
      }

      if (autoplayButton && autoplayText !== autoplayTextTem) {
        var i = autoplay ? 1 : 0,
            html = autoplayButton.innerHTML,
            len = html.length - autoplayTextTem[i].length;

        if (html.substring(len) === autoplayTextTem[i]) {
          autoplayButton.innerHTML = html.substring(0, len) + autoplayText[i];
        }
      }
    } else {
      if (center && (fixedWidth || autoWidth)) {
        needContainerTransform = true;
      }
    }

    if (itemsChanged || fixedWidth && !autoWidth) {
      pages = getPages();
      updateNavVisibility();
    }

    indChanged = index !== indexTem;

    if (indChanged) {
      events.emit('indexChanged', info());
      needContainerTransform = true;
    } else if (itemsChanged) {
      if (!indChanged) {
        additionalUpdates();
      }
    } else if (fixedWidth || autoWidth) {
      doLazyLoad();
      updateSlideStatus();
      updateLiveRegion();
    }

    if (itemsChanged && !carousel) {
      updateGallerySlidePositions();
    }

    if (!disable && !freeze) {
      // non-mediaqueries: IE8
      if (bpChanged && !CSSMQ) {
        // middle wrapper styles
        // inner wrapper styles
        if (edgePadding !== edgePaddingTem || gutter !== gutterTem) {
          innerWrapper.style.cssText = getInnerWrapperStyles(edgePadding, gutter, fixedWidth, speed, autoHeight);
        }

        if (horizontal) {
          // container styles
          if (carousel) {
            container.style.width = getContainerWidth(fixedWidth, gutter, items);
          } // slide styles


          var str = getSlideWidthStyle(fixedWidth, gutter, items) + getSlideGutterStyle(gutter); // remove the last line and
          // add new styles

          Object(_helpers_removeCSSRule_js__WEBPACK_IMPORTED_MODULE_11__["removeCSSRule"])(sheet, Object(_helpers_getCssRulesLength_js__WEBPACK_IMPORTED_MODULE_12__["getCssRulesLength"])(sheet) - 1);
          Object(_helpers_addCSSRule_js__WEBPACK_IMPORTED_MODULE_10__["addCSSRule"])(sheet, '#' + slideId + ' > .tns-item', str, Object(_helpers_getCssRulesLength_js__WEBPACK_IMPORTED_MODULE_12__["getCssRulesLength"])(sheet));
        }
      } // auto height


      if (autoHeight) {
        doAutoHeight();
      }

      if (needContainerTransform) {
        doContainerTransformSilent();
        indexCached = index;
      }
    }

    if (bpChanged) {
      events.emit('newBreakpointEnd', info(e));
    }
  } // === INITIALIZATION FUNCTIONS === //


  function getFreeze() {
    if (!fixedWidth && !autoWidth) {
      var a = center ? items - (items - 1) / 2 : items;
      return slideCount <= a;
    }

    var width = fixedWidth ? (fixedWidth + gutter) * slideCount : slidePositions[slideCount],
        vp = edgePadding ? viewport + edgePadding * 2 : viewport + gutter;

    if (center) {
      vp -= fixedWidth ? (viewport - fixedWidth) / 2 : (viewport - (slidePositions[index + 1] - slidePositions[index] - gutter)) / 2;
    }

    return width <= vp;
  }

  function setBreakpointZone() {
    breakpointZone = 0;

    for (var bp in responsive) {
      bp = parseInt(bp); // convert string to number

      if (windowWidth >= bp) {
        breakpointZone = bp;
      }
    }
  } // (slideBy, indexMin, indexMax) => index


  var updateIndex = function () {
    return loop ? carousel ? // loop + carousel
    function () {
      var leftEdge = indexMin,
          rightEdge = indexMax;
      leftEdge += slideBy;
      rightEdge -= slideBy; // adjust edges when has edge paddings
      // or fixed-width slider with extra space on the right side

      if (edgePadding) {
        leftEdge += 1;
        rightEdge -= 1;
      } else if (fixedWidth) {
        if ((viewport + gutter) % (fixedWidth + gutter)) {
          rightEdge -= 1;
        }
      }

      if (cloneCount) {
        if (index > rightEdge) {
          index -= slideCount;
        } else if (index < leftEdge) {
          index += slideCount;
        }
      }
    } : // loop + gallery
    function () {
      if (index > indexMax) {
        while (index >= indexMin + slideCount) {
          index -= slideCount;
        }
      } else if (index < indexMin) {
        while (index <= indexMax - slideCount) {
          index += slideCount;
        }
      }
    } : // non-loop
    function () {
      index = Math.max(indexMin, Math.min(indexMax, index));
    };
  }();

  function disableUI() {
    if (!autoplay && autoplayButton) {
      Object(_helpers_hideElement_js__WEBPACK_IMPORTED_MODULE_24__["hideElement"])(autoplayButton);
    }

    if (!nav && navContainer) {
      Object(_helpers_hideElement_js__WEBPACK_IMPORTED_MODULE_24__["hideElement"])(navContainer);
    }

    if (!controls) {
      if (controlsContainer) {
        Object(_helpers_hideElement_js__WEBPACK_IMPORTED_MODULE_24__["hideElement"])(controlsContainer);
      } else {
        if (prevButton) {
          Object(_helpers_hideElement_js__WEBPACK_IMPORTED_MODULE_24__["hideElement"])(prevButton);
        }

        if (nextButton) {
          Object(_helpers_hideElement_js__WEBPACK_IMPORTED_MODULE_24__["hideElement"])(nextButton);
        }
      }
    }
  }

  function enableUI() {
    if (autoplay && autoplayButton) {
      Object(_helpers_showElement_js__WEBPACK_IMPORTED_MODULE_25__["showElement"])(autoplayButton);
    }

    if (nav && navContainer) {
      Object(_helpers_showElement_js__WEBPACK_IMPORTED_MODULE_25__["showElement"])(navContainer);
    }

    if (controls) {
      if (controlsContainer) {
        Object(_helpers_showElement_js__WEBPACK_IMPORTED_MODULE_25__["showElement"])(controlsContainer);
      } else {
        if (prevButton) {
          Object(_helpers_showElement_js__WEBPACK_IMPORTED_MODULE_25__["showElement"])(prevButton);
        }

        if (nextButton) {
          Object(_helpers_showElement_js__WEBPACK_IMPORTED_MODULE_25__["showElement"])(nextButton);
        }
      }
    }
  }

  function freezeSlider() {
    if (frozen) {
      return;
    } // remove edge padding from inner wrapper


    if (edgePadding) {
      innerWrapper.style.margin = '0px';
    } // add class tns-transparent to cloned slides


    if (cloneCount) {
      var str = 'tns-transparent';

      for (var i = cloneCount; i--;) {
        if (carousel) {
          Object(_helpers_addClass_js__WEBPACK_IMPORTED_MODULE_17__["addClass"])(slideItems[i], str);
        }

        Object(_helpers_addClass_js__WEBPACK_IMPORTED_MODULE_17__["addClass"])(slideItems[slideCountNew - i - 1], str);
      }
    } // update tools


    disableUI();
    frozen = true;
  }

  function unfreezeSlider() {
    if (!frozen) {
      return;
    } // restore edge padding for inner wrapper
    // for mordern browsers


    if (edgePadding && CSSMQ) {
      innerWrapper.style.margin = '';
    } // remove class tns-transparent to cloned slides


    if (cloneCount) {
      var str = 'tns-transparent';

      for (var i = cloneCount; i--;) {
        if (carousel) {
          Object(_helpers_removeClass_js__WEBPACK_IMPORTED_MODULE_18__["removeClass"])(slideItems[i], str);
        }

        Object(_helpers_removeClass_js__WEBPACK_IMPORTED_MODULE_18__["removeClass"])(slideItems[slideCountNew - i - 1], str);
      }
    } // update tools


    enableUI();
    frozen = false;
  }

  function disableSlider() {
    if (disabled) {
      return;
    }

    sheet.disabled = true;
    container.className = container.className.replace(newContainerClasses.substring(1), '');
    Object(_helpers_removeAttrs_js__WEBPACK_IMPORTED_MODULE_22__["removeAttrs"])(container, ['style']);

    if (loop) {
      for (var j = cloneCount; j--;) {
        if (carousel) {
          Object(_helpers_hideElement_js__WEBPACK_IMPORTED_MODULE_24__["hideElement"])(slideItems[j]);
        }

        Object(_helpers_hideElement_js__WEBPACK_IMPORTED_MODULE_24__["hideElement"])(slideItems[slideCountNew - j - 1]);
      }
    } // vertical slider


    if (!horizontal || !carousel) {
      Object(_helpers_removeAttrs_js__WEBPACK_IMPORTED_MODULE_22__["removeAttrs"])(innerWrapper, ['style']);
    } // gallery


    if (!carousel) {
      for (var i = index, l = index + slideCount; i < l; i++) {
        var item = slideItems[i];
        Object(_helpers_removeAttrs_js__WEBPACK_IMPORTED_MODULE_22__["removeAttrs"])(item, ['style']);
        Object(_helpers_removeClass_js__WEBPACK_IMPORTED_MODULE_18__["removeClass"])(item, animateIn);
        Object(_helpers_removeClass_js__WEBPACK_IMPORTED_MODULE_18__["removeClass"])(item, animateNormal);
      }
    } // update tools


    disableUI();
    disabled = true;
  }

  function enableSlider() {
    if (!disabled) {
      return;
    }

    sheet.disabled = false;
    container.className += newContainerClasses;
    doContainerTransformSilent();

    if (loop) {
      for (var j = cloneCount; j--;) {
        if (carousel) {
          Object(_helpers_showElement_js__WEBPACK_IMPORTED_MODULE_25__["showElement"])(slideItems[j]);
        }

        Object(_helpers_showElement_js__WEBPACK_IMPORTED_MODULE_25__["showElement"])(slideItems[slideCountNew - j - 1]);
      }
    } // gallery


    if (!carousel) {
      for (var i = index, l = index + slideCount; i < l; i++) {
        var item = slideItems[i],
            classN = i < index + items ? animateIn : animateNormal;
        item.style.left = (i - index) * 100 / items + '%';
        Object(_helpers_addClass_js__WEBPACK_IMPORTED_MODULE_17__["addClass"])(item, classN);
      }
    } // update tools


    enableUI();
    disabled = false;
  }

  function updateLiveRegion() {
    var str = getLiveRegionStr();

    if (liveregionCurrent.innerHTML !== str) {
      liveregionCurrent.innerHTML = str;
    }
  }

  function getLiveRegionStr() {
    var arr = getVisibleSlideRange(),
        start = arr[0] + 1,
        end = arr[1] + 1;
    return start === end ? start + '' : start + ' to ' + end;
  }

  function getVisibleSlideRange(val) {
    if (val == null) {
      val = getContainerTransformValue();
    }

    var start = index,
        end,
        rangestart,
        rangeend; // get range start, range end for autoWidth and fixedWidth

    if (center || edgePadding) {
      if (autoWidth || fixedWidth) {
        rangestart = -(parseFloat(val) + edgePadding);
        rangeend = rangestart + viewport + edgePadding * 2;
      }
    } else {
      if (autoWidth) {
        rangestart = slidePositions[index];
        rangeend = rangestart + viewport;
      }
    } // get start, end
    // - check auto width


    if (autoWidth) {
      slidePositions.forEach(function (point, i) {
        if (i < slideCountNew) {
          if ((center || edgePadding) && point <= rangestart + 0.5) {
            start = i;
          }

          if (rangeend - point >= 0.5) {
            end = i;
          }
        }
      }); // - check percentage width, fixed width
    } else {
      if (fixedWidth) {
        var cell = fixedWidth + gutter;

        if (center || edgePadding) {
          start = Math.floor(rangestart / cell);
          end = Math.ceil(rangeend / cell - 1);
        } else {
          end = start + Math.ceil(viewport / cell) - 1;
        }
      } else {
        if (center || edgePadding) {
          var a = items - 1;

          if (center) {
            start -= a / 2;
            end = index + a / 2;
          } else {
            end = index + a;
          }

          if (edgePadding) {
            var b = edgePadding * items / viewport;
            start -= b;
            end += b;
          }

          start = Math.floor(start);
          end = Math.ceil(end);
        } else {
          end = start + items - 1;
        }
      }

      start = Math.max(start, 0);
      end = Math.min(end, slideCountNew - 1);
    }

    return [start, end];
  }

  function doLazyLoad() {
    if (lazyload && !disable) {
      var arg = getVisibleSlideRange();
      arg.push(lazyloadSelector);
      getImageArray.apply(null, arg).forEach(function (img) {
        if (!Object(_helpers_hasClass_js__WEBPACK_IMPORTED_MODULE_16__["hasClass"])(img, imgCompleteClass)) {
          // stop propagation transitionend event to container
          var eve = {};

          eve[TRANSITIONEND] = function (e) {
            e.stopPropagation();
          };

          Object(_helpers_addEvents_js__WEBPACK_IMPORTED_MODULE_30__["addEvents"])(img, eve);
          Object(_helpers_addEvents_js__WEBPACK_IMPORTED_MODULE_30__["addEvents"])(img, imgEvents); // update src

          img.src = Object(_helpers_getAttr_js__WEBPACK_IMPORTED_MODULE_20__["getAttr"])(img, 'data-src'); // update srcset

          var srcset = Object(_helpers_getAttr_js__WEBPACK_IMPORTED_MODULE_20__["getAttr"])(img, 'data-srcset');

          if (srcset) {
            img.srcset = srcset;
          }

          Object(_helpers_addClass_js__WEBPACK_IMPORTED_MODULE_17__["addClass"])(img, 'loading');
        }
      });
    }
  }

  function onImgLoaded(e) {
    imgLoaded(getTarget(e));
  }

  function onImgFailed(e) {
    imgFailed(getTarget(e));
  }

  function imgLoaded(img) {
    Object(_helpers_addClass_js__WEBPACK_IMPORTED_MODULE_17__["addClass"])(img, 'loaded');
    imgCompleted(img);
  }

  function imgFailed(img) {
    Object(_helpers_addClass_js__WEBPACK_IMPORTED_MODULE_17__["addClass"])(img, 'failed');
    imgCompleted(img);
  }

  function imgCompleted(img) {
    Object(_helpers_addClass_js__WEBPACK_IMPORTED_MODULE_17__["addClass"])(img, imgCompleteClass);
    Object(_helpers_removeClass_js__WEBPACK_IMPORTED_MODULE_18__["removeClass"])(img, 'loading');
    Object(_helpers_removeEvents_js__WEBPACK_IMPORTED_MODULE_31__["removeEvents"])(img, imgEvents);
  }

  function getImageArray(start, end, imgSelector) {
    var imgs = [];

    if (!imgSelector) {
      imgSelector = 'img';
    }

    while (start <= end) {
      Object(_helpers_forEach_js__WEBPACK_IMPORTED_MODULE_15__["forEach"])(slideItems[start].querySelectorAll(imgSelector), function (img) {
        imgs.push(img);
      });
      start++;
    }

    return imgs;
  } // check if all visible images are loaded
  // and update container height if it's done


  function doAutoHeight() {
    var imgs = getImageArray.apply(null, getVisibleSlideRange());
    Object(_helpers_raf_js__WEBPACK_IMPORTED_MODULE_0__["raf"])(function () {
      imgsLoadedCheck(imgs, updateInnerWrapperHeight);
    });
  }

  function imgsLoadedCheck(imgs, cb) {
    // execute callback function if all images are complete
    if (imgsComplete) {
      return cb();
    } // check image classes


    imgs.forEach(function (img, index) {
      if (!lazyload && img.complete) {
        imgCompleted(img);
      } // Check image.complete


      if (Object(_helpers_hasClass_js__WEBPACK_IMPORTED_MODULE_16__["hasClass"])(img, imgCompleteClass)) {
        imgs.splice(index, 1);
      }
    }); // execute callback function if selected images are all complete

    if (!imgs.length) {
      return cb();
    } // otherwise execute this functiona again


    Object(_helpers_raf_js__WEBPACK_IMPORTED_MODULE_0__["raf"])(function () {
      imgsLoadedCheck(imgs, cb);
    });
  }

  function additionalUpdates() {
    doLazyLoad();
    updateSlideStatus();
    updateLiveRegion();
    updateControlsStatus();
    updateNavStatus();
  }

  function update_carousel_transition_duration() {
    if (carousel && autoHeight) {
      middleWrapper.style[TRANSITIONDURATION] = speed / 1000 + 's';
    }
  }

  function getMaxSlideHeight(slideStart, slideRange) {
    var heights = [];

    for (var i = slideStart, l = Math.min(slideStart + slideRange, slideCountNew); i < l; i++) {
      heights.push(slideItems[i].offsetHeight);
    }

    return Math.max.apply(null, heights);
  } // update inner wrapper height
  // 1. get the max-height of the visible slides
  // 2. set transitionDuration to speed
  // 3. update inner wrapper height to max-height
  // 4. set transitionDuration to 0s after transition done


  function updateInnerWrapperHeight() {
    var maxHeight = autoHeight ? getMaxSlideHeight(index, items) : getMaxSlideHeight(cloneCount, slideCount),
        wp = middleWrapper ? middleWrapper : innerWrapper;

    if (wp.style.height !== maxHeight) {
      wp.style.height = maxHeight + 'px';
    }
  } // get the distance from the top edge of the first slide to each slide
  // (init) => slidePositions


  function setSlidePositions() {
    slidePositions = [0];
    var attr = horizontal ? 'left' : 'top',
        attr2 = horizontal ? 'right' : 'bottom',
        base = slideItems[0].getBoundingClientRect()[attr];
    Object(_helpers_forEach_js__WEBPACK_IMPORTED_MODULE_15__["forEach"])(slideItems, function (item, i) {
      // skip the first slide
      if (i) {
        slidePositions.push(item.getBoundingClientRect()[attr] - base);
      } // add the end edge


      if (i === slideCountNew - 1) {
        slidePositions.push(item.getBoundingClientRect()[attr2] - base);
      }
    });
  } // update slide


  function updateSlideStatus() {
    var range = getVisibleSlideRange(),
        start = range[0],
        end = range[1];
    Object(_helpers_forEach_js__WEBPACK_IMPORTED_MODULE_15__["forEach"])(slideItems, function (item, i) {
      // show slides
      if (i >= start && i <= end) {
        if (Object(_helpers_hasAttr_js__WEBPACK_IMPORTED_MODULE_19__["hasAttr"])(item, 'aria-hidden')) {
          Object(_helpers_removeAttrs_js__WEBPACK_IMPORTED_MODULE_22__["removeAttrs"])(item, ['aria-hidden', 'tabindex']);
          Object(_helpers_addClass_js__WEBPACK_IMPORTED_MODULE_17__["addClass"])(item, slideActiveClass);
        } // hide slides

      } else {
        if (!Object(_helpers_hasAttr_js__WEBPACK_IMPORTED_MODULE_19__["hasAttr"])(item, 'aria-hidden')) {
          Object(_helpers_setAttrs_js__WEBPACK_IMPORTED_MODULE_21__["setAttrs"])(item, {
            'aria-hidden': 'true',
            'tabindex': '-1'
          });
          Object(_helpers_removeClass_js__WEBPACK_IMPORTED_MODULE_18__["removeClass"])(item, slideActiveClass);
        }
      }
    });
  } // gallery: update slide position


  function updateGallerySlidePositions() {
    var l = index + Math.min(slideCount, items);

    for (var i = slideCountNew; i--;) {
      var item = slideItems[i];

      if (i >= index && i < l) {
        // add transitions to visible slides when adjusting their positions
        Object(_helpers_addClass_js__WEBPACK_IMPORTED_MODULE_17__["addClass"])(item, 'tns-moving');
        item.style.left = (i - index) * 100 / items + '%';
        Object(_helpers_addClass_js__WEBPACK_IMPORTED_MODULE_17__["addClass"])(item, animateIn);
        Object(_helpers_removeClass_js__WEBPACK_IMPORTED_MODULE_18__["removeClass"])(item, animateNormal);
      } else if (item.style.left) {
        item.style.left = '';
        Object(_helpers_addClass_js__WEBPACK_IMPORTED_MODULE_17__["addClass"])(item, animateNormal);
        Object(_helpers_removeClass_js__WEBPACK_IMPORTED_MODULE_18__["removeClass"])(item, animateIn);
      } // remove outlet animation


      Object(_helpers_removeClass_js__WEBPACK_IMPORTED_MODULE_18__["removeClass"])(item, animateOut);
    } // removing '.tns-moving'


    setTimeout(function () {
      Object(_helpers_forEach_js__WEBPACK_IMPORTED_MODULE_15__["forEach"])(slideItems, function (el) {
        Object(_helpers_removeClass_js__WEBPACK_IMPORTED_MODULE_18__["removeClass"])(el, 'tns-moving');
      });
    }, 300);
  } // set tabindex on Nav


  function updateNavStatus() {
    // get current nav
    if (nav) {
      navCurrentIndex = navClicked >= 0 ? navClicked : getCurrentNavIndex();
      navClicked = -1;

      if (navCurrentIndex !== navCurrentIndexCached) {
        var navPrev = navItems[navCurrentIndexCached],
            navCurrent = navItems[navCurrentIndex];
        Object(_helpers_setAttrs_js__WEBPACK_IMPORTED_MODULE_21__["setAttrs"])(navPrev, {
          'tabindex': '-1',
          'aria-label': navStr + (navCurrentIndexCached + 1)
        });
        Object(_helpers_removeClass_js__WEBPACK_IMPORTED_MODULE_18__["removeClass"])(navPrev, navActiveClass);
        Object(_helpers_setAttrs_js__WEBPACK_IMPORTED_MODULE_21__["setAttrs"])(navCurrent, {
          'aria-label': navStr + (navCurrentIndex + 1) + navStrCurrent
        });
        Object(_helpers_removeAttrs_js__WEBPACK_IMPORTED_MODULE_22__["removeAttrs"])(navCurrent, 'tabindex');
        Object(_helpers_addClass_js__WEBPACK_IMPORTED_MODULE_17__["addClass"])(navCurrent, navActiveClass);
        navCurrentIndexCached = navCurrentIndex;
      }
    }
  }

  function getLowerCaseNodeName(el) {
    return el.nodeName.toLowerCase();
  }

  function isButton(el) {
    return getLowerCaseNodeName(el) === 'button';
  }

  function isAriaDisabled(el) {
    return el.getAttribute('aria-disabled') === 'true';
  }

  function disEnableElement(isButton, el, val) {
    if (isButton) {
      el.disabled = val;
    } else {
      el.setAttribute('aria-disabled', val.toString());
    }
  } // set 'disabled' to true on controls when reach the edges


  function updateControlsStatus() {
    if (!controls || rewind || loop) {
      return;
    }

    var prevDisabled = prevIsButton ? prevButton.disabled : isAriaDisabled(prevButton),
        nextDisabled = nextIsButton ? nextButton.disabled : isAriaDisabled(nextButton),
        disablePrev = index <= indexMin ? true : false,
        disableNext = !rewind && index >= indexMax ? true : false;

    if (disablePrev && !prevDisabled) {
      disEnableElement(prevIsButton, prevButton, true);
    }

    if (!disablePrev && prevDisabled) {
      disEnableElement(prevIsButton, prevButton, false);
    }

    if (disableNext && !nextDisabled) {
      disEnableElement(nextIsButton, nextButton, true);
    }

    if (!disableNext && nextDisabled) {
      disEnableElement(nextIsButton, nextButton, false);
    }
  } // set duration


  function resetDuration(el, str) {
    if (TRANSITIONDURATION) {
      el.style[TRANSITIONDURATION] = str;
    }
  }

  function getSliderWidth() {
    return fixedWidth ? (fixedWidth + gutter) * slideCountNew : slidePositions[slideCountNew];
  }

  function getCenterGap(num) {
    if (num == null) {
      num = index;
    }

    var gap = edgePadding ? gutter : 0;
    return autoWidth ? (viewport - gap - (slidePositions[num + 1] - slidePositions[num] - gutter)) / 2 : fixedWidth ? (viewport - fixedWidth) / 2 : (items - 1) / 2;
  }

  function getRightBoundary() {
    var gap = edgePadding ? gutter : 0,
        result = viewport + gap - getSliderWidth();

    if (center && !loop) {
      result = fixedWidth ? -(fixedWidth + gutter) * (slideCountNew - 1) - getCenterGap() : getCenterGap(slideCountNew - 1) - slidePositions[slideCountNew - 1];
    }

    if (result > 0) {
      result = 0;
    }

    return result;
  }

  function getContainerTransformValue(num) {
    if (num == null) {
      num = index;
    }

    var val;

    if (horizontal && !autoWidth) {
      if (fixedWidth) {
        val = -(fixedWidth + gutter) * num;

        if (center) {
          val += getCenterGap();
        }
      } else {
        var denominator = TRANSFORM ? slideCountNew : items;

        if (center) {
          num -= getCenterGap();
        }

        val = -num * 100 / denominator;
      }
    } else {
      val = -slidePositions[num];

      if (center && autoWidth) {
        val += getCenterGap();
      }
    }

    if (hasRightDeadZone) {
      val = Math.max(val, rightBoundary);
    }

    val += horizontal && !autoWidth && !fixedWidth ? '%' : 'px';
    return val;
  }

  function doContainerTransformSilent(val) {
    resetDuration(container, '0s');
    doContainerTransform(val);
  }

  function doContainerTransform(val) {
    if (val == null) {
      val = getContainerTransformValue();
    }

    container.style[transformAttr] = transformPrefix + val + transformPostfix;
  }

  function animateSlide(number, classOut, classIn, isOut) {
    var l = number + items;

    if (!loop) {
      l = Math.min(l, slideCountNew);
    }

    for (var i = number; i < l; i++) {
      var item = slideItems[i]; // set item positions

      if (!isOut) {
        item.style.left = (i - index) * 100 / items + '%';
      }

      if (animateDelay && TRANSITIONDELAY) {
        item.style[TRANSITIONDELAY] = item.style[ANIMATIONDELAY] = animateDelay * (i - number) / 1000 + 's';
      }

      Object(_helpers_removeClass_js__WEBPACK_IMPORTED_MODULE_18__["removeClass"])(item, classOut);
      Object(_helpers_addClass_js__WEBPACK_IMPORTED_MODULE_17__["addClass"])(item, classIn);

      if (isOut) {
        slideItemsOut.push(item);
      }
    }
  } // make transfer after click/drag:
  // 1. change 'transform' property for mordern browsers
  // 2. change 'left' property for legacy browsers


  var transformCore = function () {
    return carousel ? function () {
      resetDuration(container, '');

      if (TRANSITIONDURATION || !speed) {
        // for morden browsers with non-zero duration or
        // zero duration for all browsers
        doContainerTransform(); // run fallback function manually
        // when duration is 0 / container is hidden

        if (!speed || !Object(_helpers_isVisible_js__WEBPACK_IMPORTED_MODULE_26__["isVisible"])(container)) {
          onTransitionEnd();
        }
      } else {
        // for old browser with non-zero duration
        Object(_helpers_jsTransform_js__WEBPACK_IMPORTED_MODULE_33__["jsTransform"])(container, transformAttr, transformPrefix, transformPostfix, getContainerTransformValue(), speed, onTransitionEnd);
      }

      if (!horizontal) {
        updateContentWrapperHeight();
      }
    } : function () {
      slideItemsOut = [];
      var eve = {};
      eve[TRANSITIONEND] = eve[ANIMATIONEND] = onTransitionEnd;
      Object(_helpers_removeEvents_js__WEBPACK_IMPORTED_MODULE_31__["removeEvents"])(slideItems[indexCached], eve);
      Object(_helpers_addEvents_js__WEBPACK_IMPORTED_MODULE_30__["addEvents"])(slideItems[index], eve);
      animateSlide(indexCached, animateIn, animateOut, true);
      animateSlide(index, animateNormal, animateIn); // run fallback function manually
      // when transition or animation not supported / duration is 0

      if (!TRANSITIONEND || !ANIMATIONEND || !speed || !Object(_helpers_isVisible_js__WEBPACK_IMPORTED_MODULE_26__["isVisible"])(container)) {
        onTransitionEnd();
      }
    };
  }();

  function render(e, sliderMoved) {
    if (updateIndexBeforeTransform) {
      updateIndex();
    } // render when slider was moved (touch or drag) even though index may not change


    if (index !== indexCached || sliderMoved) {
      // events
      events.emit('indexChanged', info());
      events.emit('transitionStart', info());

      if (autoHeight) {
        doAutoHeight();
      } // pause autoplay when click or keydown from user


      if (animating && e && ['click', 'keydown'].indexOf(e.type) >= 0) {
        stopAutoplay();
      }

      running = true;
      transformCore();
    }
  }
  /*
   * Transfer prefixed properties to the same format
   * CSS: -Webkit-Transform => webkittransform
   * JS: WebkitTransform => webkittransform
   * @param {string} str - property
   *
   */


  function strTrans(str) {
    return str.toLowerCase().replace(/-/g, '');
  } // AFTER TRANSFORM
  // Things need to be done after a transfer:
  // 1. check index
  // 2. add classes to visible slide
  // 3. disable controls buttons when reach the first/last slide in non-loop slider
  // 4. update nav status
  // 5. lazyload images
  // 6. update container height


  function onTransitionEnd(event) {
    // check running on gallery mode
    // make sure trantionend/animationend events run only once
    if (carousel || running) {
      events.emit('transitionEnd', info(event));

      if (!carousel && slideItemsOut.length > 0) {
        for (var i = 0; i < slideItemsOut.length; i++) {
          var item = slideItemsOut[i]; // set item positions

          item.style.left = '';

          if (ANIMATIONDELAY && TRANSITIONDELAY) {
            item.style[ANIMATIONDELAY] = '';
            item.style[TRANSITIONDELAY] = '';
          }

          Object(_helpers_removeClass_js__WEBPACK_IMPORTED_MODULE_18__["removeClass"])(item, animateOut);
          Object(_helpers_addClass_js__WEBPACK_IMPORTED_MODULE_17__["addClass"])(item, animateNormal);
        }
      }
      /* update slides, nav, controls after checking ...
       * => legacy browsers who don't support 'event'
       *    have to check event first, otherwise event.target will cause an error
       * => or 'gallery' mode:
       *   + event target is slide item
       * => or 'carousel' mode:
       *   + event target is container,
       *   + event.property is the same with transform attribute
       */


      if (!event || !carousel && event.target.parentNode === container || event.target === container && strTrans(event.propertyName) === strTrans(transformAttr)) {
        if (!updateIndexBeforeTransform) {
          var indexTem = index;
          updateIndex();

          if (index !== indexTem) {
            events.emit('indexChanged', info());
            doContainerTransformSilent();
          }
        }

        if (nested === 'inner') {
          events.emit('innerLoaded', info());
        }

        running = false;
        indexCached = index;
      }
    }
  } // # ACTIONS


  function goTo(targetIndex, e) {
    if (freeze) {
      return;
    } // prev slideBy


    if (targetIndex === 'prev') {
      onControlsClick(e, -1); // next slideBy
    } else if (targetIndex === 'next') {
      onControlsClick(e, 1); // go to exact slide
    } else {
      if (running) {
        if (preventActionWhenRunning) {
          return;
        } else {
          onTransitionEnd();
        }
      }

      var absIndex = getAbsIndex(),
          indexGap = 0;

      if (targetIndex === 'first') {
        indexGap = -absIndex;
      } else if (targetIndex === 'last') {
        indexGap = carousel ? slideCount - items - absIndex : slideCount - 1 - absIndex;
      } else {
        if (typeof targetIndex !== 'number') {
          targetIndex = parseInt(targetIndex);
        }

        if (!isNaN(targetIndex)) {
          // from directly called goTo function
          if (!e) {
            targetIndex = Math.max(0, Math.min(slideCount - 1, targetIndex));
          }

          indexGap = targetIndex - absIndex;
        }
      } // gallery: make sure new page won't overlap with current page


      if (!carousel && indexGap && Math.abs(indexGap) < items) {
        var factor = indexGap > 0 ? 1 : -1;
        indexGap += index + indexGap - slideCount >= indexMin ? slideCount * factor : slideCount * 2 * factor * -1;
      }

      index += indexGap; // make sure index is in range

      if (carousel && loop) {
        if (index < indexMin) {
          index += slideCount;
        }

        if (index > indexMax) {
          index -= slideCount;
        }
      } // if index is changed, start rendering


      if (getAbsIndex(index) !== getAbsIndex(indexCached)) {
        render(e);
      }
    }
  } // on controls click


  function onControlsClick(e, dir) {
    if (running) {
      if (preventActionWhenRunning) {
        return;
      } else {
        onTransitionEnd();
      }
    }

    var passEventObject;

    if (!dir) {
      e = getEvent(e);
      var target = getTarget(e);

      while (target !== controlsContainer && [prevButton, nextButton].indexOf(target) < 0) {
        target = target.parentNode;
      }

      var targetIn = [prevButton, nextButton].indexOf(target);

      if (targetIn >= 0) {
        passEventObject = true;
        dir = targetIn === 0 ? -1 : 1;
      }
    }

    if (rewind) {
      if (index === indexMin && dir === -1) {
        goTo('last', e);
        return;
      } else if (index === indexMax && dir === 1) {
        goTo('first', e);
        return;
      }
    }

    if (dir) {
      index += slideBy * dir;

      if (autoWidth) {
        index = Math.floor(index);
      } // pass e when click control buttons or keydown


      render(passEventObject || e && e.type === 'keydown' ? e : null);
    }
  } // on nav click


  function onNavClick(e) {
    if (running) {
      if (preventActionWhenRunning) {
        return;
      } else {
        onTransitionEnd();
      }
    }

    e = getEvent(e);
    var target = getTarget(e),
        navIndex; // find the clicked nav item

    while (target !== navContainer && !Object(_helpers_hasAttr_js__WEBPACK_IMPORTED_MODULE_19__["hasAttr"])(target, 'data-nav')) {
      target = target.parentNode;
    }

    if (Object(_helpers_hasAttr_js__WEBPACK_IMPORTED_MODULE_19__["hasAttr"])(target, 'data-nav')) {
      var navIndex = navClicked = Number(Object(_helpers_getAttr_js__WEBPACK_IMPORTED_MODULE_20__["getAttr"])(target, 'data-nav')),
          targetIndexBase = fixedWidth || autoWidth ? navIndex * slideCount / pages : navIndex * items,
          targetIndex = navAsThumbnails ? navIndex : Math.min(Math.ceil(targetIndexBase), slideCount - 1);
      goTo(targetIndex, e);

      if (navCurrentIndex === navIndex) {
        if (animating) {
          stopAutoplay();
        }

        navClicked = -1; // reset navClicked
      }
    }
  } // autoplay functions


  function setAutoplayTimer() {
    autoplayTimer = setInterval(function () {
      onControlsClick(null, autoplayDirection);
    }, autoplayTimeout);
    animating = true;
  }

  function stopAutoplayTimer() {
    clearInterval(autoplayTimer);
    animating = false;
  }

  function updateAutoplayButton(action, txt) {
    Object(_helpers_setAttrs_js__WEBPACK_IMPORTED_MODULE_21__["setAttrs"])(autoplayButton, {
      'data-action': action
    });
    autoplayButton.innerHTML = autoplayHtmlStrings[0] + action + autoplayHtmlStrings[1] + txt;
  }

  function startAutoplay() {
    setAutoplayTimer();

    if (autoplayButton) {
      updateAutoplayButton('stop', autoplayText[1]);
    }
  }

  function stopAutoplay() {
    stopAutoplayTimer();

    if (autoplayButton) {
      updateAutoplayButton('start', autoplayText[0]);
    }
  } // programaitcally play/pause the slider


  function play() {
    if (autoplay && !animating) {
      startAutoplay();
      autoplayUserPaused = false;
    }
  }

  function pause() {
    if (animating) {
      stopAutoplay();
      autoplayUserPaused = true;
    }
  }

  function toggleAutoplay() {
    if (animating) {
      stopAutoplay();
      autoplayUserPaused = true;
    } else {
      startAutoplay();
      autoplayUserPaused = false;
    }
  }

  function onVisibilityChange() {
    if (doc.hidden) {
      if (animating) {
        stopAutoplayTimer();
        autoplayVisibilityPaused = true;
      }
    } else if (autoplayVisibilityPaused) {
      setAutoplayTimer();
      autoplayVisibilityPaused = false;
    }
  }

  function mouseoverPause() {
    if (animating) {
      stopAutoplayTimer();
      autoplayHoverPaused = true;
    }
  }

  function mouseoutRestart() {
    if (autoplayHoverPaused) {
      setAutoplayTimer();
      autoplayHoverPaused = false;
    }
  } // keydown events on document


  function onDocumentKeydown(e) {
    e = getEvent(e);
    var keyIndex = [KEYS.LEFT, KEYS.RIGHT].indexOf(e.keyCode);

    if (keyIndex >= 0) {
      onControlsClick(e, keyIndex === 0 ? -1 : 1);
    }
  } // on key control


  function onControlsKeydown(e) {
    e = getEvent(e);
    var keyIndex = [KEYS.LEFT, KEYS.RIGHT].indexOf(e.keyCode);

    if (keyIndex >= 0) {
      if (keyIndex === 0) {
        if (!prevButton.disabled) {
          onControlsClick(e, -1);
        }
      } else if (!nextButton.disabled) {
        onControlsClick(e, 1);
      }
    }
  } // set focus


  function setFocus(el) {
    el.focus();
  } // on key nav


  function onNavKeydown(e) {
    e = getEvent(e);
    var curElement = doc.activeElement;

    if (!Object(_helpers_hasAttr_js__WEBPACK_IMPORTED_MODULE_19__["hasAttr"])(curElement, 'data-nav')) {
      return;
    } // var code = e.keyCode,


    var keyIndex = [KEYS.LEFT, KEYS.RIGHT, KEYS.ENTER, KEYS.SPACE].indexOf(e.keyCode),
        navIndex = Number(Object(_helpers_getAttr_js__WEBPACK_IMPORTED_MODULE_20__["getAttr"])(curElement, 'data-nav'));

    if (keyIndex >= 0) {
      if (keyIndex === 0) {
        if (navIndex > 0) {
          setFocus(navItems[navIndex - 1]);
        }
      } else if (keyIndex === 1) {
        if (navIndex < pages - 1) {
          setFocus(navItems[navIndex + 1]);
        }
      } else {
        navClicked = navIndex;
        goTo(navIndex, e);
      }
    }
  }

  function getEvent(e) {
    e = e || win.event;
    return isTouchEvent(e) ? e.changedTouches[0] : e;
  }

  function getTarget(e) {
    return e.target || win.event.srcElement;
  }

  function isTouchEvent(e) {
    return e.type.indexOf('touch') >= 0;
  }

  function preventDefaultBehavior(e) {
    e.preventDefault ? e.preventDefault() : e.returnValue = false;
  }

  function getMoveDirectionExpected() {
    return Object(_helpers_getTouchDirection_js__WEBPACK_IMPORTED_MODULE_14__["getTouchDirection"])(Object(_helpers_toDegree_js__WEBPACK_IMPORTED_MODULE_13__["toDegree"])(lastPosition.y - initPosition.y, lastPosition.x - initPosition.x), swipeAngle) === options.axis;
  }

  function onPanStart(e) {
    if (running) {
      if (preventActionWhenRunning) {
        return;
      } else {
        onTransitionEnd();
      }
    }

    if (autoplay && animating) {
      stopAutoplayTimer();
    }

    panStart = true;

    if (rafIndex) {
      Object(_helpers_caf_js__WEBPACK_IMPORTED_MODULE_1__["caf"])(rafIndex);
      rafIndex = null;
    }

    var $ = getEvent(e);
    events.emit(isTouchEvent(e) ? 'touchStart' : 'dragStart', info(e));

    if (!isTouchEvent(e) && ['img', 'a'].indexOf(getLowerCaseNodeName(getTarget(e))) >= 0) {
      preventDefaultBehavior(e);
    }

    lastPosition.x = initPosition.x = $.clientX;
    lastPosition.y = initPosition.y = $.clientY;

    if (carousel) {
      translateInit = parseFloat(container.style[transformAttr].replace(transformPrefix, ''));
      resetDuration(container, '0s');
    }
  }

  function onPanMove(e) {
    if (panStart) {
      var $ = getEvent(e);
      lastPosition.x = $.clientX;
      lastPosition.y = $.clientY;

      if (carousel) {
        if (!rafIndex) {
          rafIndex = Object(_helpers_raf_js__WEBPACK_IMPORTED_MODULE_0__["raf"])(function () {
            panUpdate(e);
          });
        }
      } else {
        if (moveDirectionExpected === '?') {
          moveDirectionExpected = getMoveDirectionExpected();
        }

        if (moveDirectionExpected) {
          preventScroll = true;
        }
      }

      if ((typeof e.cancelable !== 'boolean' || e.cancelable) && preventScroll) {
        e.preventDefault();
      }
    }
  }

  function panUpdate(e) {
    if (!moveDirectionExpected) {
      panStart = false;
      return;
    }

    Object(_helpers_caf_js__WEBPACK_IMPORTED_MODULE_1__["caf"])(rafIndex);

    if (panStart) {
      rafIndex = Object(_helpers_raf_js__WEBPACK_IMPORTED_MODULE_0__["raf"])(function () {
        panUpdate(e);
      });
    }

    if (moveDirectionExpected === '?') {
      moveDirectionExpected = getMoveDirectionExpected();
    }

    if (moveDirectionExpected) {
      if (!preventScroll && isTouchEvent(e)) {
        preventScroll = true;
      }

      try {
        if (e.type) {
          events.emit(isTouchEvent(e) ? 'touchMove' : 'dragMove', info(e));
        }
      } catch (err) {}

      var x = translateInit,
          dist = getDist(lastPosition, initPosition);

      if (!horizontal || fixedWidth || autoWidth) {
        x += dist;
        x += 'px';
      } else {
        var percentageX = TRANSFORM ? dist * items * 100 / ((viewport + gutter) * slideCountNew) : dist * 100 / (viewport + gutter);
        x += percentageX;
        x += '%';
      }

      container.style[transformAttr] = transformPrefix + x + transformPostfix;
    }
  }

  function onPanEnd(e) {
    if (panStart) {
      if (rafIndex) {
        Object(_helpers_caf_js__WEBPACK_IMPORTED_MODULE_1__["caf"])(rafIndex);
        rafIndex = null;
      }

      if (carousel) {
        resetDuration(container, '');
      }

      panStart = false;
      var $ = getEvent(e);
      lastPosition.x = $.clientX;
      lastPosition.y = $.clientY;
      var dist = getDist(lastPosition, initPosition);

      if (Math.abs(dist)) {
        // drag vs click
        if (!isTouchEvent(e)) {
          // prevent "click"
          var target = getTarget(e);
          Object(_helpers_addEvents_js__WEBPACK_IMPORTED_MODULE_30__["addEvents"])(target, {
            'click': function preventClick(e) {
              preventDefaultBehavior(e);
              Object(_helpers_removeEvents_js__WEBPACK_IMPORTED_MODULE_31__["removeEvents"])(target, {
                'click': preventClick
              });
            }
          });
        }

        if (carousel) {
          rafIndex = Object(_helpers_raf_js__WEBPACK_IMPORTED_MODULE_0__["raf"])(function () {
            if (horizontal && !autoWidth) {
              var indexMoved = -dist * items / (viewport + gutter);
              indexMoved = dist > 0 ? Math.floor(indexMoved) : Math.ceil(indexMoved);
              index += indexMoved;
            } else {
              var moved = -(translateInit + dist);

              if (moved <= 0) {
                index = indexMin;
              } else if (moved >= slidePositions[slideCountNew - 1]) {
                index = indexMax;
              } else {
                var i = 0;

                while (i < slideCountNew && moved >= slidePositions[i]) {
                  index = i;

                  if (moved > slidePositions[i] && dist < 0) {
                    index += 1;
                  }

                  i++;
                }
              }
            }

            render(e, dist);
            events.emit(isTouchEvent(e) ? 'touchEnd' : 'dragEnd', info(e));
          });
        } else {
          if (moveDirectionExpected) {
            onControlsClick(e, dist > 0 ? -1 : 1);
          }
        }
      }
    } // reset


    if (options.preventScrollOnTouch === 'auto') {
      preventScroll = false;
    }

    if (swipeAngle) {
      moveDirectionExpected = '?';
    }

    if (autoplay && !animating) {
      setAutoplayTimer();
    }
  } // === RESIZE FUNCTIONS === //
  // (slidePositions, index, items) => vertical_conentWrapper.height


  function updateContentWrapperHeight() {
    var wp = middleWrapper ? middleWrapper : innerWrapper;
    wp.style.height = slidePositions[index + items] - slidePositions[index] + 'px';
  }

  function getPages() {
    var rough = fixedWidth ? (fixedWidth + gutter) * slideCount / viewport : slideCount / items;
    return Math.min(Math.ceil(rough), slideCount);
  }
  /*
   * 1. update visible nav items list
   * 2. add "hidden" attributes to previous visible nav items
   * 3. remove "hidden" attrubutes to new visible nav items
   */


  function updateNavVisibility() {
    if (!nav || navAsThumbnails) {
      return;
    }

    if (pages !== pagesCached) {
      var min = pagesCached,
          max = pages,
          fn = _helpers_showElement_js__WEBPACK_IMPORTED_MODULE_25__["showElement"];

      if (pagesCached > pages) {
        min = pages;
        max = pagesCached;
        fn = _helpers_hideElement_js__WEBPACK_IMPORTED_MODULE_24__["hideElement"];
      }

      while (min < max) {
        fn(navItems[min]);
        min++;
      } // cache pages


      pagesCached = pages;
    }
  }

  function info(e) {
    return {
      container: container,
      slideItems: slideItems,
      navContainer: navContainer,
      navItems: navItems,
      controlsContainer: controlsContainer,
      hasControls: hasControls,
      prevButton: prevButton,
      nextButton: nextButton,
      items: items,
      slideBy: slideBy,
      cloneCount: cloneCount,
      slideCount: slideCount,
      slideCountNew: slideCountNew,
      index: index,
      indexCached: indexCached,
      displayIndex: getCurrentSlide(),
      navCurrentIndex: navCurrentIndex,
      navCurrentIndexCached: navCurrentIndexCached,
      pages: pages,
      pagesCached: pagesCached,
      sheet: sheet,
      isOn: isOn,
      event: e || {}
    };
  }

  return {
    version: '2.9.3',
    getInfo: info,
    events: events,
    goTo: goTo,
    play: play,
    pause: pause,
    isOn: isOn,
    updateSliderHeight: updateInnerWrapperHeight,
    refresh: initSliderTransform,
    destroy: destroy,
    rebuild: function rebuild() {
      return tns(Object(_helpers_extend_js__WEBPACK_IMPORTED_MODULE_2__["extend"])(options, optionsElements));
    }
  };
};

/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (module) {
  if (!module.webpackPolyfill) {
    module.deprecate = function () {};

    module.paths = []; // module.parent = undefined by default

    if (!module.children) module.children = [];
    Object.defineProperty(module, "loaded", {
      enumerable: true,
      get: function get() {
        return module.l;
      }
    });
    Object.defineProperty(module, "id", {
      enumerable: true,
      get: function get() {
        return module.i;
      }
    });
    module.webpackPolyfill = 1;
  }

  return module;
};

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vUjQvRmlsZXMvVGVtcGxhdGVzL0Rlc2lnbnMvUjQvQXNzZXRzL19zcmMvanMvcjQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueS1zbGlkZXIvc3JjL2hlbHBlcnMvYWRkQ1NTUnVsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueS1zbGlkZXIvc3JjL2hlbHBlcnMvYWRkQ2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy9oZWxwZXJzL2FkZEV2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueS1zbGlkZXIvc3JjL2hlbHBlcnMvYXJyYXlGcm9tTm9kZUxpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy9oZWxwZXJzL2NhZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueS1zbGlkZXIvc3JjL2hlbHBlcnMvY2FsYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueS1zbGlkZXIvc3JjL2hlbHBlcnMvY2hlY2tTdG9yYWdlVmFsdWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy9oZWxwZXJzL2NsYXNzTGlzdFN1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy9oZWxwZXJzL2NyZWF0ZVN0eWxlU2hlZXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy9oZWxwZXJzL2RvY0VsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy9oZWxwZXJzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueS1zbGlkZXIvc3JjL2hlbHBlcnMvZXh0ZW5kLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90aW55LXNsaWRlci9zcmMvaGVscGVycy9mb3JFYWNoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90aW55LXNsaWRlci9zcmMvaGVscGVycy9nZXRBdHRyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90aW55LXNsaWRlci9zcmMvaGVscGVycy9nZXRCb2R5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90aW55LXNsaWRlci9zcmMvaGVscGVycy9nZXRDc3NSdWxlc0xlbmd0aC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueS1zbGlkZXIvc3JjL2hlbHBlcnMvZ2V0RW5kUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy9oZWxwZXJzL2dldFNsaWRlSWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy9oZWxwZXJzL2dldFRvdWNoRGlyZWN0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90aW55LXNsaWRlci9zcmMvaGVscGVycy9oYXMzRFRyYW5zZm9ybXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy9oZWxwZXJzL2hhc0F0dHIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy9oZWxwZXJzL2hhc0NsYXNzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90aW55LXNsaWRlci9zcmMvaGVscGVycy9oaWRlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueS1zbGlkZXIvc3JjL2hlbHBlcnMvaXNOb2RlTGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueS1zbGlkZXIvc3JjL2hlbHBlcnMvaXNWaXNpYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90aW55LXNsaWRlci9zcmMvaGVscGVycy9qc1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueS1zbGlkZXIvc3JjL2hlbHBlcnMvbWVkaWFxdWVyeVN1cHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy9oZWxwZXJzL3Bhc3NpdmVPcHRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy9oZWxwZXJzL3BlcmNlbnRhZ2VMYXlvdXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy9oZWxwZXJzL3JhZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueS1zbGlkZXIvc3JjL2hlbHBlcnMvcmVtb3ZlQXR0cnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy9oZWxwZXJzL3JlbW92ZUNTU1J1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy9oZWxwZXJzL3JlbW92ZUNsYXNzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90aW55LXNsaWRlci9zcmMvaGVscGVycy9yZW1vdmVFdmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy9oZWxwZXJzL3Jlc2V0RmFrZUJvZHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy9oZWxwZXJzL3NldEF0dHJzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90aW55LXNsaWRlci9zcmMvaGVscGVycy9zZXRGYWtlQm9keS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueS1zbGlkZXIvc3JjL2hlbHBlcnMvc2V0TG9jYWxTdG9yYWdlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90aW55LXNsaWRlci9zcmMvaGVscGVycy9zaG93RWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGlueS1zbGlkZXIvc3JjL2hlbHBlcnMvdG9EZWdyZWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy9oZWxwZXJzL3doaWNoUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Rpbnktc2xpZGVyL3NyYy90aW55LXNsaWRlci5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsInRucyIsIkluaXRTbGlkZXJzIiwiY29uc29sZSIsImxvZyIsInNsaWRlcnMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpIiwibGVuZ3RoIiwic2xpZGVyQ29udGFpbmVyIiwiY2xvc2VzdENvbHVtbiIsImNsb3Nlc3QiLCJjb2xNZENsYXNzSW5kZXgiLCJnZXRBdHRyaWJ1dGUiLCJzZWFyY2giLCJwYXJlbnRDb2x1bW5TaXplIiwiY2hhckF0IiwiZWRnZVBhZGRpbmciLCJpdGVtc0luU2xpZGVyIiwic2xpZGVyIiwiY29udGFpbmVyIiwiY2VudGVyIiwiaXRlbXMiLCJndXR0ZXIiLCJsb29wIiwiYXJyb3dLZXlzIiwibGF6eWxvYWQiLCJyZXNwb25zaXZlIiwibW91c2VEcmFnIiwiY29udHJvbHMiLCJjb250cm9sc1RleHQiLCJuYXZQb3NpdGlvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJydW50aW1lIiwiZXhwb3J0cyIsIk9wIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duIiwiaGFzT3duUHJvcGVydHkiLCJ1bmRlZmluZWQiLCIkU3ltYm9sIiwiU3ltYm9sIiwiaXRlcmF0b3JTeW1ib2wiLCJpdGVyYXRvciIsImFzeW5jSXRlcmF0b3JTeW1ib2wiLCJhc3luY0l0ZXJhdG9yIiwidG9TdHJpbmdUYWdTeW1ib2wiLCJ0b1N0cmluZ1RhZyIsImRlZmluZSIsIm9iaiIsImtleSIsInZhbHVlIiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJlcnIiLCJ3cmFwIiwiaW5uZXJGbiIsIm91dGVyRm4iLCJzZWxmIiwidHJ5TG9jc0xpc3QiLCJwcm90b0dlbmVyYXRvciIsIkdlbmVyYXRvciIsImdlbmVyYXRvciIsImNyZWF0ZSIsImNvbnRleHQiLCJDb250ZXh0IiwiX2ludm9rZSIsIm1ha2VJbnZva2VNZXRob2QiLCJ0cnlDYXRjaCIsImZuIiwiYXJnIiwidHlwZSIsImNhbGwiLCJHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0IiwiR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCIsIkdlblN0YXRlRXhlY3V0aW5nIiwiR2VuU3RhdGVDb21wbGV0ZWQiLCJDb250aW51ZVNlbnRpbmVsIiwiR2VuZXJhdG9yRnVuY3Rpb24iLCJHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSIsIkl0ZXJhdG9yUHJvdG90eXBlIiwiZ2V0UHJvdG8iLCJnZXRQcm90b3R5cGVPZiIsIk5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlIiwidmFsdWVzIiwiR3AiLCJjb25zdHJ1Y3RvciIsImRpc3BsYXlOYW1lIiwiZGVmaW5lSXRlcmF0b3JNZXRob2RzIiwiZm9yRWFjaCIsIm1ldGhvZCIsImlzR2VuZXJhdG9yRnVuY3Rpb24iLCJnZW5GdW4iLCJjdG9yIiwibmFtZSIsIm1hcmsiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsImF3cmFwIiwiX19hd2FpdCIsIkFzeW5jSXRlcmF0b3IiLCJQcm9taXNlSW1wbCIsImludm9rZSIsInJlc29sdmUiLCJyZWplY3QiLCJyZWNvcmQiLCJyZXN1bHQiLCJ0aGVuIiwidW53cmFwcGVkIiwiZXJyb3IiLCJwcmV2aW91c1Byb21pc2UiLCJlbnF1ZXVlIiwiY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmciLCJhc3luYyIsIlByb21pc2UiLCJpdGVyIiwibmV4dCIsImRvbmUiLCJzdGF0ZSIsIkVycm9yIiwiZG9uZVJlc3VsdCIsImRlbGVnYXRlIiwiZGVsZWdhdGVSZXN1bHQiLCJtYXliZUludm9rZURlbGVnYXRlIiwic2VudCIsIl9zZW50IiwiZGlzcGF0Y2hFeGNlcHRpb24iLCJhYnJ1cHQiLCJUeXBlRXJyb3IiLCJpbmZvIiwicmVzdWx0TmFtZSIsIm5leHRMb2MiLCJ0b1N0cmluZyIsInB1c2hUcnlFbnRyeSIsImxvY3MiLCJlbnRyeSIsInRyeUxvYyIsImNhdGNoTG9jIiwiZmluYWxseUxvYyIsImFmdGVyTG9jIiwidHJ5RW50cmllcyIsInB1c2giLCJyZXNldFRyeUVudHJ5IiwiY29tcGxldGlvbiIsInJlc2V0Iiwia2V5cyIsIm9iamVjdCIsInJldmVyc2UiLCJwb3AiLCJpdGVyYWJsZSIsIml0ZXJhdG9yTWV0aG9kIiwiaXNOYU4iLCJza2lwVGVtcFJlc2V0IiwicHJldiIsInNsaWNlIiwic3RvcCIsInJvb3RFbnRyeSIsInJvb3RSZWNvcmQiLCJydmFsIiwiZXhjZXB0aW9uIiwiaGFuZGxlIiwibG9jIiwiY2F1Z2h0IiwiaGFzQ2F0Y2giLCJoYXNGaW5hbGx5IiwiZmluYWxseUVudHJ5IiwiY29tcGxldGUiLCJmaW5pc2giLCJ0aHJvd24iLCJkZWxlZ2F0ZVlpZWxkIiwibW9kdWxlIiwicmVnZW5lcmF0b3JSdW50aW1lIiwiYWNjaWRlbnRhbFN0cmljdE1vZGUiLCJGdW5jdGlvbiIsImFkZENTU1J1bGUiLCJzaGVldCIsInNlbGVjdG9yIiwicnVsZXMiLCJpbmRleCIsImluc2VydFJ1bGUiLCJhZGRSdWxlIiwiYWRkQ2xhc3MiLCJjbGFzc0xpc3RTdXBwb3J0IiwiZWwiLCJzdHIiLCJoYXNDbGFzcyIsImNsYXNzTGlzdCIsImFkZCIsImNsYXNzTmFtZSIsImFkZEV2ZW50cyIsInByZXZlbnRTY3JvbGxpbmciLCJwcm9wIiwib3B0aW9uIiwiaW5kZXhPZiIsInBhc3NpdmVPcHRpb24iLCJhcnJheUZyb21Ob2RlTGlzdCIsIm5sIiwiYXJyIiwibCIsIndpbiIsImNhZiIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwibW96Q2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJpZCIsImNsZWFyVGltZW91dCIsImNhbGMiLCJkb2MiLCJib2R5IiwiZ2V0Qm9keSIsImRvY092ZXJmbG93Iiwic2V0RmFrZUJvZHkiLCJkaXYiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJ2YWxzIiwidmFsIiwic3R5bGUiLCJ3aWR0aCIsIm9mZnNldFdpZHRoIiwicmVwbGFjZSIsImUiLCJmYWtlIiwicmVzZXRGYWtlQm9keSIsInJlbW92ZSIsImNoZWNrU3RvcmFnZVZhbHVlIiwiSlNPTiIsInBhcnNlIiwiY3JlYXRlU3R5bGVTaGVldCIsIm1lZGlhIiwibm9uY2UiLCJzZXRBdHRyaWJ1dGUiLCJxdWVyeVNlbGVjdG9yIiwic3R5bGVTaGVldCIsImRvY0VsZW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJFdmVudHMiLCJ0b3BpY3MiLCJvbiIsImV2ZW50TmFtZSIsIm9mZiIsInNwbGljZSIsImVtaXQiLCJkYXRhIiwiZXh0ZW5kIiwiY29weSIsInRhcmdldCIsImFyZ3VtZW50cyIsImNhbGxiYWNrIiwic2NvcGUiLCJnZXRBdHRyIiwiYXR0ciIsImdldENzc1J1bGVzTGVuZ3RoIiwicnVsZSIsImNzc1J1bGVzIiwiZ2V0RW5kUHJvcGVydHkiLCJwcm9wSW4iLCJwcm9wT3V0IiwiZW5kUHJvcCIsInRlc3QiLCJ0b0xvd2VyQ2FzZSIsImdldFNsaWRlSWQiLCJ0bnNJZCIsImdldFRvdWNoRGlyZWN0aW9uIiwiYW5nbGUiLCJyYW5nZSIsImRpcmVjdGlvbiIsImdhcCIsIk1hdGgiLCJhYnMiLCJoYXMzRFRyYW5zZm9ybXMiLCJ0ZiIsImdldENvbXB1dGVkU3R5bGUiLCJoYXMzZCIsImNzc1RGIiwiaW5zZXJ0QmVmb3JlIiwiZ2V0UHJvcGVydHlWYWx1ZSIsImhhc0F0dHIiLCJoYXNBdHRyaWJ1dGUiLCJjb250YWlucyIsImhpZGVFbGVtZW50IiwiZm9yY2VIaWRlIiwiZGlzcGxheSIsImlzTm9kZUxpc3QiLCJpdGVtIiwiaXNWaXNpYmxlIiwianNUcmFuc2Zvcm0iLCJlbGVtZW50IiwicHJlZml4IiwicG9zdGZpeCIsInRvIiwiZHVyYXRpb24iLCJ0aWNrIiwibWluIiwidW5pdCIsImZyb20iLCJOdW1iZXIiLCJwb3NpdGlvblRpY2siLCJydW5uaW5nIiwic2V0VGltZW91dCIsIm1vdmVFbGVtZW50IiwibWVkaWFxdWVyeVN1cHBvcnQiLCJtYXRjaE1lZGlhIiwibXNNYXRjaE1lZGlhIiwicG9zaXRpb24iLCJjc3NUZXh0IiwiY3JlYXRlVGV4dE5vZGUiLCJjdXJyZW50U3R5bGUiLCJzdXBwb3J0c1Bhc3NpdmUiLCJvcHRzIiwiZ2V0IiwicGFzc2l2ZSIsInBlcmNlbnRhZ2VMYXlvdXQiLCJ3cmFwcGVyIiwib3V0ZXIiLCJjb3VudCIsInBlclBhZ2UiLCJzdXBwb3J0ZWQiLCJpbm5lckhUTUwiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJsZWZ0IiwiY2hpbGRyZW4iLCJyYWYiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ3ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJtb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJtc1JlcXVlc3RBbmltYXRpb25GcmFtZSIsImNiIiwicmVtb3ZlQXR0cnMiLCJlbHMiLCJhdHRycyIsIkFycmF5IiwiYXR0ckxlbmd0aCIsImoiLCJyZW1vdmVBdHRyaWJ1dGUiLCJyZW1vdmVDU1NSdWxlIiwiZGVsZXRlUnVsZSIsInJlbW92ZVJ1bGUiLCJyZW1vdmVDbGFzcyIsInJlbW92ZUV2ZW50cyIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJvdmVyZmxvdyIsIm9mZnNldEhlaWdodCIsInNldEF0dHJzIiwiYmFja2dyb3VuZCIsInNldExvY2FsU3RvcmFnZSIsInN0b3JhZ2UiLCJhY2Nlc3MiLCJzZXRJdGVtIiwic2hvd0VsZW1lbnQiLCJ0b0RlZ3JlZSIsInkiLCJ4IiwiYXRhbjIiLCJQSSIsIndoaWNoUHJvcGVydHkiLCJwcm9wcyIsIlByb3BzIiwidG9VcHBlckNhc2UiLCJzdWJzdHIiLCJwcmVmaXhlcyIsImxlbiIsIkVsZW1lbnQiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJvcHRpb25zIiwibW9kZSIsImF4aXMiLCJmaXhlZFdpZHRoIiwiYXV0b1dpZHRoIiwidmlld3BvcnRNYXgiLCJzbGlkZUJ5IiwiY29udHJvbHNQb3NpdGlvbiIsImNvbnRyb2xzQ29udGFpbmVyIiwicHJldkJ1dHRvbiIsIm5leHRCdXR0b24iLCJuYXYiLCJuYXZDb250YWluZXIiLCJuYXZBc1RodW1ibmFpbHMiLCJzcGVlZCIsImF1dG9wbGF5IiwiYXV0b3BsYXlQb3NpdGlvbiIsImF1dG9wbGF5VGltZW91dCIsImF1dG9wbGF5RGlyZWN0aW9uIiwiYXV0b3BsYXlUZXh0IiwiYXV0b3BsYXlIb3ZlclBhdXNlIiwiYXV0b3BsYXlCdXR0b24iLCJhdXRvcGxheUJ1dHRvbk91dHB1dCIsImF1dG9wbGF5UmVzZXRPblZpc2liaWxpdHkiLCJhbmltYXRlSW4iLCJhbmltYXRlT3V0IiwiYW5pbWF0ZU5vcm1hbCIsImFuaW1hdGVEZWxheSIsInJld2luZCIsImF1dG9IZWlnaHQiLCJsYXp5bG9hZFNlbGVjdG9yIiwidG91Y2giLCJzd2lwZUFuZ2xlIiwibmVzdGVkIiwicHJldmVudEFjdGlvbldoZW5SdW5uaW5nIiwicHJldmVudFNjcm9sbE9uVG91Y2giLCJmcmVlemFibGUiLCJvbkluaXQiLCJ1c2VMb2NhbFN0b3JhZ2UiLCJLRVlTIiwiRU5URVIiLCJTUEFDRSIsIkxFRlQiLCJSSUdIVCIsInRuc1N0b3JhZ2UiLCJsb2NhbFN0b3JhZ2VBY2Nlc3MiLCJicm93c2VySW5mbyIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsInVpZCIsIkRhdGUiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwicmVtb3ZlSXRlbSIsIkNBTEMiLCJQRVJDRU5UQUdFTEFZT1VUIiwiQ1NTTVEiLCJUUkFOU0ZPUk0iLCJIQVMzRFRSQU5TRk9STVMiLCJUUkFOU0lUSU9ORFVSQVRJT04iLCJUUkFOU0lUSU9OREVMQVkiLCJBTklNQVRJT05EVVJBVElPTiIsIkFOSU1BVElPTkRFTEFZIiwiVFJBTlNJVElPTkVORCIsIkFOSU1BVElPTkVORCIsInN1cHBvcnRDb25zb2xlV2FybiIsIndhcm4iLCJ0bnNMaXN0Iiwib3B0aW9uc0VsZW1lbnRzIiwibm9kZU5hbWUiLCJjYXJvdXNlbCIsInJlc3BvbnNpdmVUZW0iLCJ1cGRhdGVPcHRpb25zIiwiaG9yaXpvbnRhbCIsIm91dGVyV3JhcHBlciIsImlubmVyV3JhcHBlciIsIm1pZGRsZVdyYXBwZXIiLCJjb250YWluZXJQYXJlbnQiLCJjb250YWluZXJIVE1MIiwib3V0ZXJIVE1MIiwic2xpZGVJdGVtcyIsInNsaWRlQ291bnQiLCJicmVha3BvaW50Wm9uZSIsIndpbmRvd1dpZHRoIiwiZ2V0V2luZG93V2lkdGgiLCJpc09uIiwic2V0QnJlYWtwb2ludFpvbmUiLCJnZXRPcHRpb24iLCJ2aWV3cG9ydCIsImdldFZpZXdwb3J0V2lkdGgiLCJmbG9vciIsImZpeGVkV2lkdGhWaWV3cG9ydFdpZHRoIiwic2xpZGVQb3NpdGlvbnMiLCJzbGlkZUl0ZW1zT3V0IiwiY2xvbmVDb3VudCIsImdldENsb25lQ291bnRGb3JMb29wIiwic2xpZGVDb3VudE5ldyIsImhhc1JpZ2h0RGVhZFpvbmUiLCJyaWdodEJvdW5kYXJ5IiwiZ2V0UmlnaHRCb3VuZGFyeSIsInVwZGF0ZUluZGV4QmVmb3JlVHJhbnNmb3JtIiwidHJhbnNmb3JtQXR0ciIsInRyYW5zZm9ybVByZWZpeCIsInRyYW5zZm9ybVBvc3RmaXgiLCJnZXRJbmRleE1heCIsImNlaWwiLCJtYXgiLCJnZXRTdGFydEluZGV4IiwiaW5kZXhDYWNoZWQiLCJkaXNwbGF5SW5kZXgiLCJnZXRDdXJyZW50U2xpZGUiLCJpbmRleE1pbiIsImluZGV4TWF4IiwicmVzaXplVGltZXIiLCJtb3ZlRGlyZWN0aW9uRXhwZWN0ZWQiLCJldmVudHMiLCJuZXdDb250YWluZXJDbGFzc2VzIiwic2xpZGVJZCIsImRpc2FibGUiLCJkaXNhYmxlZCIsImZyZWV6ZSIsImdldEZyZWV6ZSIsImZyb3plbiIsImNvbnRyb2xzRXZlbnRzIiwib25Db250cm9sc0NsaWNrIiwib25Db250cm9sc0tleWRvd24iLCJuYXZFdmVudHMiLCJvbk5hdkNsaWNrIiwib25OYXZLZXlkb3duIiwiaG92ZXJFdmVudHMiLCJtb3VzZW92ZXJQYXVzZSIsIm1vdXNlb3V0UmVzdGFydCIsInZpc2liaWxpdHlFdmVudCIsIm9uVmlzaWJpbGl0eUNoYW5nZSIsImRvY21lbnRLZXlkb3duRXZlbnQiLCJvbkRvY3VtZW50S2V5ZG93biIsInRvdWNoRXZlbnRzIiwib25QYW5TdGFydCIsIm9uUGFuTW92ZSIsIm9uUGFuRW5kIiwiZHJhZ0V2ZW50cyIsImhhc0NvbnRyb2xzIiwiaGFzT3B0aW9uIiwiaGFzTmF2IiwiaGFzQXV0b3BsYXkiLCJoYXNUb3VjaCIsImhhc01vdXNlRHJhZyIsInNsaWRlQWN0aXZlQ2xhc3MiLCJzbGlkZUNsb25lZENsYXNzIiwiaW1nQ29tcGxldGVDbGFzcyIsImltZ0V2ZW50cyIsIm9uSW1nTG9hZGVkIiwib25JbWdGYWlsZWQiLCJpbWdzQ29tcGxldGUiLCJsaXZlcmVnaW9uQ3VycmVudCIsInByZXZlbnRTY3JvbGwiLCJjb250cm9sc0NvbnRhaW5lckhUTUwiLCJwcmV2QnV0dG9uSFRNTCIsIm5leHRCdXR0b25IVE1MIiwicHJldklzQnV0dG9uIiwibmV4dElzQnV0dG9uIiwibmF2Q29udGFpbmVySFRNTCIsIm5hdkl0ZW1zIiwicGFnZXMiLCJnZXRQYWdlcyIsInBhZ2VzQ2FjaGVkIiwibmF2Q2xpY2tlZCIsIm5hdkN1cnJlbnRJbmRleCIsImdldEN1cnJlbnROYXZJbmRleCIsIm5hdkN1cnJlbnRJbmRleENhY2hlZCIsIm5hdkFjdGl2ZUNsYXNzIiwibmF2U3RyIiwibmF2U3RyQ3VycmVudCIsImF1dG9wbGF5QnV0dG9uSFRNTCIsImF1dG9wbGF5SHRtbFN0cmluZ3MiLCJhdXRvcGxheVRpbWVyIiwiYW5pbWF0aW5nIiwiYXV0b3BsYXlIb3ZlclBhdXNlZCIsImF1dG9wbGF5VXNlclBhdXNlZCIsImF1dG9wbGF5VmlzaWJpbGl0eVBhdXNlZCIsImluaXRQb3NpdGlvbiIsImxhc3RQb3NpdGlvbiIsInRyYW5zbGF0ZUluaXQiLCJkaXNYIiwiZGlzWSIsInBhblN0YXJ0IiwicmFmSW5kZXgiLCJnZXREaXN0IiwiYSIsImIiLCJyZXNldFZhcmlibGVzV2hlbkRpc2FibGUiLCJpbml0U3RydWN0dXJlIiwiaW5pdFNoZWV0IiwiaW5pdFNsaWRlclRyYW5zZm9ybSIsImNvbmRpdGlvbiIsInRlbSIsImluZCIsImdldEFic0luZGV4IiwiYWJzSW5kZXgiLCJnZXRJdGVtc01heCIsImJwIiwiYXBwbHkiLCJpdGVtc01heCIsImlubmVyV2lkdGgiLCJjbGllbnRXaWR0aCIsImdldEluc2VydFBvc2l0aW9uIiwicG9zIiwiZ2V0Q2xpZW50V2lkdGgiLCJyZWN0IiwicmlnaHQiLCJ3dyIsInBhcnNlSW50IiwiZ2V0U2xpZGVNYXJnaW5MZWZ0IiwiZ2V0SW5uZXJXcmFwcGVyU3R5bGVzIiwiZWRnZVBhZGRpbmdUZW0iLCJndXR0ZXJUZW0iLCJmaXhlZFdpZHRoVGVtIiwic3BlZWRUZW0iLCJhdXRvSGVpZ2h0QlAiLCJndXR0ZXJUZW1Vbml0IiwiZGlyIiwiZ2V0VHJhbnNpdGlvbkR1cmF0aW9uU3R5bGUiLCJnZXRDb250YWluZXJXaWR0aCIsIml0ZW1zVGVtIiwiZ2V0U2xpZGVXaWR0aFN0eWxlIiwiZGl2aWRlbmQiLCJnZXRTbGlkZUd1dHRlclN0eWxlIiwiZ2V0Q1NTUHJlZml4IiwibnVtIiwic3Vic3RyaW5nIiwiZ2V0QW5pbWF0aW9uRHVyYXRpb25TdHlsZSIsImNsYXNzT3V0ZXIiLCJjbGFzc0lubmVyIiwiaGFzR3V0dGVyIiwid3AiLCJmcmFnbWVudEJlZm9yZSIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJmcmFnbWVudEFmdGVyIiwiY2xvbmVGaXJzdCIsImNsb25lTm9kZSIsImZpcnN0Q2hpbGQiLCJjbG9uZUxhc3QiLCJpbWdzIiwiaW1nIiwic3JjIiwiaW1nTG9hZGVkIiwiaW1nc0xvYWRlZENoZWNrIiwiZ2V0SW1hZ2VBcnJheSIsImluaXRTbGlkZXJUcmFuc2Zvcm1TdHlsZUNoZWNrIiwiZG9Db250YWluZXJUcmFuc2Zvcm1TaWxlbnQiLCJpbml0VG9vbHMiLCJpbml0RXZlbnRzIiwic3R5bGVzQXBwbGljYXRpb25DaGVjayIsImluaXRTbGlkZXJUcmFuc2Zvcm1Db3JlIiwic2V0U2xpZGVQb3NpdGlvbnMiLCJ1cGRhdGVDb250ZW50V3JhcHBlckhlaWdodCIsImZvbnRTaXplIiwic2xpZGUiLCJtYXJnaW5MZWZ0IiwidXBkYXRlX2Nhcm91c2VsX3RyYW5zaXRpb25fZHVyYXRpb24iLCJtaWRkbGVXcmFwcGVyU3RyIiwiaW5uZXJXcmFwcGVyU3RyIiwiY29udGFpbmVyU3RyIiwic2xpZGVTdHIiLCJpdGVtc0JQIiwiZml4ZWRXaWR0aEJQIiwic3BlZWRCUCIsImVkZ2VQYWRkaW5nQlAiLCJndXR0ZXJCUCIsInVwZGF0ZVNsaWRlU3RhdHVzIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiZ2V0TGl2ZVJlZ2lvblN0ciIsInR4dCIsInRvZ2dsZUF1dG9wbGF5Iiwic3RhcnRBdXRvcGxheSIsImluaXRJbmRleCIsIm5hdkh0bWwiLCJoaWRkZW5TdHIiLCJ1cGRhdGVOYXZWaXNpYmlsaXR5IiwiaXNCdXR0b24iLCJ1cGRhdGVDb250cm9sc1N0YXR1cyIsImRpc2FibGVVSSIsImV2ZSIsIm9uVHJhbnNpdGlvbkVuZCIsInJlc2l6ZVRhc2tzIiwib25SZXNpemUiLCJkb0F1dG9IZWlnaHQiLCJkb0xhenlMb2FkIiwiZGlzYWJsZVNsaWRlciIsImZyZWV6ZVNsaWRlciIsImFkZGl0aW9uYWxVcGRhdGVzIiwiZGVzdHJveSIsIm93bmVyTm9kZSIsImNsZWFySW50ZXJ2YWwiLCJodG1sTGlzdCIsInByZXZFbCIsInByZXZpb3VzRWxlbWVudFNpYmxpbmciLCJwYXJlbnRFbCIsIm5leHRFbGVtZW50U2libGluZyIsImZpcnN0RWxlbWVudENoaWxkIiwiZ2V0RXZlbnQiLCJicENoYW5nZWQiLCJicmVha3BvaW50Wm9uZVRlbSIsIm5lZWRDb250YWluZXJUcmFuc2Zvcm0iLCJpbmRDaGFuZ2VkIiwiaXRlbXNDaGFuZ2VkIiwiZGlzYWJsZVRlbSIsImZyZWV6ZVRlbSIsImFycm93S2V5c1RlbSIsImNvbnRyb2xzVGVtIiwibmF2VGVtIiwidG91Y2hUZW0iLCJtb3VzZURyYWdUZW0iLCJhdXRvcGxheVRlbSIsImF1dG9wbGF5SG92ZXJQYXVzZVRlbSIsImF1dG9wbGF5UmVzZXRPblZpc2liaWxpdHlUZW0iLCJpbmRleFRlbSIsImF1dG9IZWlnaHRUZW0iLCJjb250cm9sc1RleHRUZW0iLCJjZW50ZXJUZW0iLCJhdXRvcGxheVRleHRUZW0iLCJ1cGRhdGVJbmRleCIsImVuYWJsZVNsaWRlciIsImRvQ29udGFpbmVyVHJhbnNmb3JtIiwiZ2V0Q29udGFpbmVyVHJhbnNmb3JtVmFsdWUiLCJ1bmZyZWV6ZVNsaWRlciIsInN0b3BBdXRvcGxheSIsImhlaWdodCIsImh0bWwiLCJ1cGRhdGVMaXZlUmVnaW9uIiwidXBkYXRlR2FsbGVyeVNsaWRlUG9zaXRpb25zIiwidnAiLCJsZWZ0RWRnZSIsInJpZ2h0RWRnZSIsImVuYWJsZVVJIiwibWFyZ2luIiwiY2xhc3NOIiwiZ2V0VmlzaWJsZVNsaWRlUmFuZ2UiLCJzdGFydCIsImVuZCIsInJhbmdlc3RhcnQiLCJyYW5nZWVuZCIsInBhcnNlRmxvYXQiLCJwb2ludCIsImNlbGwiLCJzdG9wUHJvcGFnYXRpb24iLCJzcmNzZXQiLCJnZXRUYXJnZXQiLCJpbWdGYWlsZWQiLCJpbWdDb21wbGV0ZWQiLCJpbWdTZWxlY3RvciIsInVwZGF0ZUlubmVyV3JhcHBlckhlaWdodCIsInVwZGF0ZU5hdlN0YXR1cyIsImdldE1heFNsaWRlSGVpZ2h0Iiwic2xpZGVTdGFydCIsInNsaWRlUmFuZ2UiLCJoZWlnaHRzIiwibWF4SGVpZ2h0IiwiYXR0cjIiLCJiYXNlIiwibmF2UHJldiIsIm5hdkN1cnJlbnQiLCJnZXRMb3dlckNhc2VOb2RlTmFtZSIsImlzQXJpYURpc2FibGVkIiwiZGlzRW5hYmxlRWxlbWVudCIsInByZXZEaXNhYmxlZCIsIm5leHREaXNhYmxlZCIsImRpc2FibGVQcmV2IiwiZGlzYWJsZU5leHQiLCJyZXNldER1cmF0aW9uIiwiZ2V0U2xpZGVyV2lkdGgiLCJnZXRDZW50ZXJHYXAiLCJkZW5vbWluYXRvciIsImFuaW1hdGVTbGlkZSIsIm51bWJlciIsImNsYXNzT3V0IiwiY2xhc3NJbiIsImlzT3V0IiwidHJhbnNmb3JtQ29yZSIsInJlbmRlciIsInNsaWRlck1vdmVkIiwic3RyVHJhbnMiLCJldmVudCIsInByb3BlcnR5TmFtZSIsImdvVG8iLCJ0YXJnZXRJbmRleCIsImluZGV4R2FwIiwiZmFjdG9yIiwicGFzc0V2ZW50T2JqZWN0IiwidGFyZ2V0SW4iLCJuYXZJbmRleCIsInRhcmdldEluZGV4QmFzZSIsInNldEF1dG9wbGF5VGltZXIiLCJzZXRJbnRlcnZhbCIsInN0b3BBdXRvcGxheVRpbWVyIiwidXBkYXRlQXV0b3BsYXlCdXR0b24iLCJhY3Rpb24iLCJwbGF5IiwicGF1c2UiLCJoaWRkZW4iLCJrZXlJbmRleCIsImtleUNvZGUiLCJzZXRGb2N1cyIsImZvY3VzIiwiY3VyRWxlbWVudCIsImFjdGl2ZUVsZW1lbnQiLCJpc1RvdWNoRXZlbnQiLCJjaGFuZ2VkVG91Y2hlcyIsInNyY0VsZW1lbnQiLCJwcmV2ZW50RGVmYXVsdEJlaGF2aW9yIiwicHJldmVudERlZmF1bHQiLCJyZXR1cm5WYWx1ZSIsImdldE1vdmVEaXJlY3Rpb25FeHBlY3RlZCIsIiQiLCJjbGllbnRYIiwiY2xpZW50WSIsInBhblVwZGF0ZSIsImNhbmNlbGFibGUiLCJkaXN0IiwicGVyY2VudGFnZVgiLCJwcmV2ZW50Q2xpY2siLCJpbmRleE1vdmVkIiwibW92ZWQiLCJyb3VnaCIsInZlcnNpb24iLCJnZXRJbmZvIiwidXBkYXRlU2xpZGVySGVpZ2h0IiwicmVmcmVzaCIsInJlYnVpbGQiLCJ3ZWJwYWNrUG9seWZpbGwiLCJkZXByZWNhdGUiLCJwYXRocyJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUVBQSxNQUFNLENBQUNDLEdBQVAsR0FBYUEsK0RBQWI7QUFDQUQsTUFBTSxDQUFDRSxXQUFQLEdBQXFCQSxXQUFyQjs7QUFFQSxTQUFTQSxXQUFULEdBQXVCO0FBQ25CQyxTQUFPLENBQUNDLEdBQVIsQ0FBWSxlQUFaO0FBQ0EsTUFBSUMsT0FBTyxHQUFHQyxRQUFRLENBQUNDLGdCQUFULENBQTBCLFlBQTFCLENBQWQ7O0FBRUEsT0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHSCxPQUFPLENBQUNJLE1BQTVCLEVBQW9DLEVBQUVELENBQXRDLEVBQXlDO0FBQ3JDLFFBQUlFLGVBQWUsR0FBR0wsT0FBTyxDQUFDRyxDQUFELENBQTdCO0FBQ0EsUUFBSUcsYUFBYSxHQUFHRCxlQUFlLENBQUNFLE9BQWhCLENBQXdCLGlCQUF4QixDQUFwQjtBQUNBLFFBQUlDLGVBQWUsR0FBR0YsYUFBYSxDQUFDRyxZQUFkLENBQTJCLE9BQTNCLEVBQW9DQyxNQUFwQyxDQUEyQyxTQUEzQyxJQUF3RCxDQUE5RTtBQUNBLFFBQUlDLGdCQUFnQixHQUFHTCxhQUFhLENBQUNHLFlBQWQsQ0FBMkIsT0FBM0IsRUFBb0NHLE1BQXBDLENBQTJDSixlQUEzQyxJQUE4REYsYUFBYSxDQUFDRyxZQUFkLENBQTJCLE9BQTNCLEVBQW9DRyxNQUFwQyxDQUEyQ0osZUFBZSxHQUFHLENBQTdELENBQXJGO0FBQ0EsUUFBSUssV0FBVyxHQUFHLEVBQWxCO0FBRUEsUUFBSUMsYUFBYSxHQUFHLENBQXBCOztBQUVBLFFBQUlILGdCQUFnQixJQUFJLEVBQXhCLEVBQTRCO0FBQ3hCRyxtQkFBYSxHQUFHLENBQWhCO0FBQ0g7O0FBQ0QsUUFBSUgsZ0JBQWdCLElBQUksRUFBcEIsSUFBMEJBLGdCQUFnQixJQUFJLENBQTlDLElBQW1EQSxnQkFBZ0IsSUFBSSxDQUEzRSxFQUE4RTtBQUMxRUcsbUJBQWEsR0FBRyxDQUFoQjtBQUNIOztBQUNELFFBQUlILGdCQUFnQixJQUFJLENBQXhCLEVBQTJCO0FBQ3ZCRyxtQkFBYSxHQUFHLENBQWhCO0FBQ0g7O0FBQ0QsUUFBSUgsZ0JBQWdCLElBQUksQ0FBeEIsRUFBMkI7QUFDdkJHLG1CQUFhLEdBQUcsQ0FBaEI7QUFDQUQsaUJBQVcsR0FBRyxDQUFkO0FBQ0g7O0FBQ0QsUUFBSUYsZ0JBQWdCLElBQUksQ0FBcEIsSUFBeUJBLGdCQUFnQixJQUFJLENBQTdDLElBQWtEQSxnQkFBZ0IsSUFBSSxDQUExRSxFQUE2RTtBQUN6RUcsbUJBQWEsR0FBRyxDQUFoQjtBQUNBRCxpQkFBVyxHQUFHLENBQWQ7QUFDSDs7QUFFRCxRQUFJRSxNQUFNLEdBQUduQix1RUFBRyxDQUFDO0FBQ2JvQixlQUFTLEVBQUVYLGVBREU7QUFFYlksWUFBTSxFQUFFLEtBRks7QUFHYkMsV0FBSyxFQUFFLENBSE07QUFJYkMsWUFBTSxFQUFFLEVBSks7QUFLYkMsVUFBSSxFQUFFLElBTE87QUFNYkMsZUFBUyxFQUFFLElBTkU7QUFPYkMsY0FBUSxFQUFFLElBUEc7QUFRYlQsaUJBQVcsRUFBRUEsV0FSQTtBQVNiVSxnQkFBVSxFQUFFO0FBQ1IsYUFBSztBQUNETCxlQUFLLEVBQUVKO0FBRE47QUFERyxPQVRDO0FBY2JVLGVBQVMsRUFBRSxJQWRFO0FBZWJDLGNBQVEsRUFBRSxJQWZHO0FBZ0JiQyxrQkFBWSxFQUFFLENBQUMsZ1lBQUQsRUFDVixpWUFEVSxDQWhCRDtBQWtCYkMsaUJBQVcsRUFBRTtBQWxCQSxLQUFELENBQWhCO0FBb0JIO0FBQ0o7O0FBRUQxQixRQUFRLENBQUMyQixnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBVztBQUNyRC9CLGFBQVc7QUFDZCxDQUZELEU7Ozs7Ozs7Ozs7Ozs7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsSUFBSWdDLE9BQU8sR0FBSSxVQUFVQyxPQUFWLEVBQW1CO0FBQ2hDOztBQUVBLE1BQUlDLEVBQUUsR0FBR0MsTUFBTSxDQUFDQyxTQUFoQjtBQUNBLE1BQUlDLE1BQU0sR0FBR0gsRUFBRSxDQUFDSSxjQUFoQjtBQUNBLE1BQUlDLFNBQUosQ0FMZ0MsQ0FLakI7O0FBQ2YsTUFBSUMsT0FBTyxHQUFHLE9BQU9DLE1BQVAsS0FBa0IsVUFBbEIsR0FBK0JBLE1BQS9CLEdBQXdDLEVBQXREO0FBQ0EsTUFBSUMsY0FBYyxHQUFHRixPQUFPLENBQUNHLFFBQVIsSUFBb0IsWUFBekM7QUFDQSxNQUFJQyxtQkFBbUIsR0FBR0osT0FBTyxDQUFDSyxhQUFSLElBQXlCLGlCQUFuRDtBQUNBLE1BQUlDLGlCQUFpQixHQUFHTixPQUFPLENBQUNPLFdBQVIsSUFBdUIsZUFBL0M7O0FBRUEsV0FBU0MsTUFBVCxDQUFnQkMsR0FBaEIsRUFBcUJDLEdBQXJCLEVBQTBCQyxLQUExQixFQUFpQztBQUMvQmhCLFVBQU0sQ0FBQ2lCLGNBQVAsQ0FBc0JILEdBQXRCLEVBQTJCQyxHQUEzQixFQUFnQztBQUM5QkMsV0FBSyxFQUFFQSxLQUR1QjtBQUU5QkUsZ0JBQVUsRUFBRSxJQUZrQjtBQUc5QkMsa0JBQVksRUFBRSxJQUhnQjtBQUk5QkMsY0FBUSxFQUFFO0FBSm9CLEtBQWhDO0FBTUEsV0FBT04sR0FBRyxDQUFDQyxHQUFELENBQVY7QUFDRDs7QUFDRCxNQUFJO0FBQ0Y7QUFDQUYsVUFBTSxDQUFDLEVBQUQsRUFBSyxFQUFMLENBQU47QUFDRCxHQUhELENBR0UsT0FBT1EsR0FBUCxFQUFZO0FBQ1pSLFVBQU0sR0FBRyxnQkFBU0MsR0FBVCxFQUFjQyxHQUFkLEVBQW1CQyxLQUFuQixFQUEwQjtBQUNqQyxhQUFPRixHQUFHLENBQUNDLEdBQUQsQ0FBSCxHQUFXQyxLQUFsQjtBQUNELEtBRkQ7QUFHRDs7QUFFRCxXQUFTTSxJQUFULENBQWNDLE9BQWQsRUFBdUJDLE9BQXZCLEVBQWdDQyxJQUFoQyxFQUFzQ0MsV0FBdEMsRUFBbUQ7QUFDakQ7QUFDQSxRQUFJQyxjQUFjLEdBQUdILE9BQU8sSUFBSUEsT0FBTyxDQUFDdkIsU0FBUixZQUE2QjJCLFNBQXhDLEdBQW9ESixPQUFwRCxHQUE4REksU0FBbkY7QUFDQSxRQUFJQyxTQUFTLEdBQUc3QixNQUFNLENBQUM4QixNQUFQLENBQWNILGNBQWMsQ0FBQzFCLFNBQTdCLENBQWhCO0FBQ0EsUUFBSThCLE9BQU8sR0FBRyxJQUFJQyxPQUFKLENBQVlOLFdBQVcsSUFBSSxFQUEzQixDQUFkLENBSmlELENBTWpEO0FBQ0E7O0FBQ0FHLGFBQVMsQ0FBQ0ksT0FBVixHQUFvQkMsZ0JBQWdCLENBQUNYLE9BQUQsRUFBVUUsSUFBVixFQUFnQk0sT0FBaEIsQ0FBcEM7QUFFQSxXQUFPRixTQUFQO0FBQ0Q7O0FBQ0QvQixTQUFPLENBQUN3QixJQUFSLEdBQWVBLElBQWYsQ0F6Q2dDLENBMkNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxXQUFTYSxRQUFULENBQWtCQyxFQUFsQixFQUFzQnRCLEdBQXRCLEVBQTJCdUIsR0FBM0IsRUFBZ0M7QUFDOUIsUUFBSTtBQUNGLGFBQU87QUFBRUMsWUFBSSxFQUFFLFFBQVI7QUFBa0JELFdBQUcsRUFBRUQsRUFBRSxDQUFDRyxJQUFILENBQVF6QixHQUFSLEVBQWF1QixHQUFiO0FBQXZCLE9BQVA7QUFDRCxLQUZELENBRUUsT0FBT2hCLEdBQVAsRUFBWTtBQUNaLGFBQU87QUFBRWlCLFlBQUksRUFBRSxPQUFSO0FBQWlCRCxXQUFHLEVBQUVoQjtBQUF0QixPQUFQO0FBQ0Q7QUFDRjs7QUFFRCxNQUFJbUIsc0JBQXNCLEdBQUcsZ0JBQTdCO0FBQ0EsTUFBSUMsc0JBQXNCLEdBQUcsZ0JBQTdCO0FBQ0EsTUFBSUMsaUJBQWlCLEdBQUcsV0FBeEI7QUFDQSxNQUFJQyxpQkFBaUIsR0FBRyxXQUF4QixDQWhFZ0MsQ0FrRWhDO0FBQ0E7O0FBQ0EsTUFBSUMsZ0JBQWdCLEdBQUcsRUFBdkIsQ0FwRWdDLENBc0VoQztBQUNBO0FBQ0E7QUFDQTs7QUFDQSxXQUFTaEIsU0FBVCxHQUFxQixDQUFFOztBQUN2QixXQUFTaUIsaUJBQVQsR0FBNkIsQ0FBRTs7QUFDL0IsV0FBU0MsMEJBQVQsR0FBc0MsQ0FBRSxDQTVFUixDQThFaEM7QUFDQTs7O0FBQ0EsTUFBSUMsaUJBQWlCLEdBQUcsRUFBeEI7O0FBQ0FBLG1CQUFpQixDQUFDeEMsY0FBRCxDQUFqQixHQUFvQyxZQUFZO0FBQzlDLFdBQU8sSUFBUDtBQUNELEdBRkQ7O0FBSUEsTUFBSXlDLFFBQVEsR0FBR2hELE1BQU0sQ0FBQ2lELGNBQXRCO0FBQ0EsTUFBSUMsdUJBQXVCLEdBQUdGLFFBQVEsSUFBSUEsUUFBUSxDQUFDQSxRQUFRLENBQUNHLE1BQU0sQ0FBQyxFQUFELENBQVAsQ0FBVCxDQUFsRDs7QUFDQSxNQUFJRCx1QkFBdUIsSUFDdkJBLHVCQUF1QixLQUFLbkQsRUFENUIsSUFFQUcsTUFBTSxDQUFDcUMsSUFBUCxDQUFZVyx1QkFBWixFQUFxQzNDLGNBQXJDLENBRkosRUFFMEQ7QUFDeEQ7QUFDQTtBQUNBd0MscUJBQWlCLEdBQUdHLHVCQUFwQjtBQUNEOztBQUVELE1BQUlFLEVBQUUsR0FBR04sMEJBQTBCLENBQUM3QyxTQUEzQixHQUNQMkIsU0FBUyxDQUFDM0IsU0FBVixHQUFzQkQsTUFBTSxDQUFDOEIsTUFBUCxDQUFjaUIsaUJBQWQsQ0FEeEI7QUFFQUYsbUJBQWlCLENBQUM1QyxTQUFsQixHQUE4Qm1ELEVBQUUsQ0FBQ0MsV0FBSCxHQUFpQlAsMEJBQS9DO0FBQ0FBLDRCQUEwQixDQUFDTyxXQUEzQixHQUF5Q1IsaUJBQXpDO0FBQ0FBLG1CQUFpQixDQUFDUyxXQUFsQixHQUFnQ3pDLE1BQU0sQ0FDcENpQywwQkFEb0MsRUFFcENuQyxpQkFGb0MsRUFHcEMsbUJBSG9DLENBQXRDLENBbkdnQyxDQXlHaEM7QUFDQTs7QUFDQSxXQUFTNEMscUJBQVQsQ0FBK0J0RCxTQUEvQixFQUEwQztBQUN4QyxLQUFDLE1BQUQsRUFBUyxPQUFULEVBQWtCLFFBQWxCLEVBQTRCdUQsT0FBNUIsQ0FBb0MsVUFBU0MsTUFBVCxFQUFpQjtBQUNuRDVDLFlBQU0sQ0FBQ1osU0FBRCxFQUFZd0QsTUFBWixFQUFvQixVQUFTcEIsR0FBVCxFQUFjO0FBQ3RDLGVBQU8sS0FBS0osT0FBTCxDQUFhd0IsTUFBYixFQUFxQnBCLEdBQXJCLENBQVA7QUFDRCxPQUZLLENBQU47QUFHRCxLQUpEO0FBS0Q7O0FBRUR2QyxTQUFPLENBQUM0RCxtQkFBUixHQUE4QixVQUFTQyxNQUFULEVBQWlCO0FBQzdDLFFBQUlDLElBQUksR0FBRyxPQUFPRCxNQUFQLEtBQWtCLFVBQWxCLElBQWdDQSxNQUFNLENBQUNOLFdBQWxEO0FBQ0EsV0FBT08sSUFBSSxHQUNQQSxJQUFJLEtBQUtmLGlCQUFULElBQ0E7QUFDQTtBQUNBLEtBQUNlLElBQUksQ0FBQ04sV0FBTCxJQUFvQk0sSUFBSSxDQUFDQyxJQUExQixNQUFvQyxtQkFKN0IsR0FLUCxLQUxKO0FBTUQsR0FSRDs7QUFVQS9ELFNBQU8sQ0FBQ2dFLElBQVIsR0FBZSxVQUFTSCxNQUFULEVBQWlCO0FBQzlCLFFBQUkzRCxNQUFNLENBQUMrRCxjQUFYLEVBQTJCO0FBQ3pCL0QsWUFBTSxDQUFDK0QsY0FBUCxDQUFzQkosTUFBdEIsRUFBOEJiLDBCQUE5QjtBQUNELEtBRkQsTUFFTztBQUNMYSxZQUFNLENBQUNLLFNBQVAsR0FBbUJsQiwwQkFBbkI7QUFDQWpDLFlBQU0sQ0FBQzhDLE1BQUQsRUFBU2hELGlCQUFULEVBQTRCLG1CQUE1QixDQUFOO0FBQ0Q7O0FBQ0RnRCxVQUFNLENBQUMxRCxTQUFQLEdBQW1CRCxNQUFNLENBQUM4QixNQUFQLENBQWNzQixFQUFkLENBQW5CO0FBQ0EsV0FBT08sTUFBUDtBQUNELEdBVEQsQ0E3SGdDLENBd0loQztBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E3RCxTQUFPLENBQUNtRSxLQUFSLEdBQWdCLFVBQVM1QixHQUFULEVBQWM7QUFDNUIsV0FBTztBQUFFNkIsYUFBTyxFQUFFN0I7QUFBWCxLQUFQO0FBQ0QsR0FGRDs7QUFJQSxXQUFTOEIsYUFBVCxDQUF1QnRDLFNBQXZCLEVBQWtDdUMsV0FBbEMsRUFBK0M7QUFDN0MsYUFBU0MsTUFBVCxDQUFnQlosTUFBaEIsRUFBd0JwQixHQUF4QixFQUE2QmlDLE9BQTdCLEVBQXNDQyxNQUF0QyxFQUE4QztBQUM1QyxVQUFJQyxNQUFNLEdBQUdyQyxRQUFRLENBQUNOLFNBQVMsQ0FBQzRCLE1BQUQsQ0FBVixFQUFvQjVCLFNBQXBCLEVBQStCUSxHQUEvQixDQUFyQjs7QUFDQSxVQUFJbUMsTUFBTSxDQUFDbEMsSUFBUCxLQUFnQixPQUFwQixFQUE2QjtBQUMzQmlDLGNBQU0sQ0FBQ0MsTUFBTSxDQUFDbkMsR0FBUixDQUFOO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsWUFBSW9DLE1BQU0sR0FBR0QsTUFBTSxDQUFDbkMsR0FBcEI7QUFDQSxZQUFJckIsS0FBSyxHQUFHeUQsTUFBTSxDQUFDekQsS0FBbkI7O0FBQ0EsWUFBSUEsS0FBSyxJQUNMLFFBQU9BLEtBQVAsTUFBaUIsUUFEakIsSUFFQWQsTUFBTSxDQUFDcUMsSUFBUCxDQUFZdkIsS0FBWixFQUFtQixTQUFuQixDQUZKLEVBRW1DO0FBQ2pDLGlCQUFPb0QsV0FBVyxDQUFDRSxPQUFaLENBQW9CdEQsS0FBSyxDQUFDa0QsT0FBMUIsRUFBbUNRLElBQW5DLENBQXdDLFVBQVMxRCxLQUFULEVBQWdCO0FBQzdEcUQsa0JBQU0sQ0FBQyxNQUFELEVBQVNyRCxLQUFULEVBQWdCc0QsT0FBaEIsRUFBeUJDLE1BQXpCLENBQU47QUFDRCxXQUZNLEVBRUosVUFBU2xELEdBQVQsRUFBYztBQUNmZ0Qsa0JBQU0sQ0FBQyxPQUFELEVBQVVoRCxHQUFWLEVBQWVpRCxPQUFmLEVBQXdCQyxNQUF4QixDQUFOO0FBQ0QsV0FKTSxDQUFQO0FBS0Q7O0FBRUQsZUFBT0gsV0FBVyxDQUFDRSxPQUFaLENBQW9CdEQsS0FBcEIsRUFBMkIwRCxJQUEzQixDQUFnQyxVQUFTQyxTQUFULEVBQW9CO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBRixnQkFBTSxDQUFDekQsS0FBUCxHQUFlMkQsU0FBZjtBQUNBTCxpQkFBTyxDQUFDRyxNQUFELENBQVA7QUFDRCxTQU5NLEVBTUosVUFBU0csS0FBVCxFQUFnQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQU9QLE1BQU0sQ0FBQyxPQUFELEVBQVVPLEtBQVYsRUFBaUJOLE9BQWpCLEVBQTBCQyxNQUExQixDQUFiO0FBQ0QsU0FWTSxDQUFQO0FBV0Q7QUFDRjs7QUFFRCxRQUFJTSxlQUFKOztBQUVBLGFBQVNDLE9BQVQsQ0FBaUJyQixNQUFqQixFQUF5QnBCLEdBQXpCLEVBQThCO0FBQzVCLGVBQVMwQywwQkFBVCxHQUFzQztBQUNwQyxlQUFPLElBQUlYLFdBQUosQ0FBZ0IsVUFBU0UsT0FBVCxFQUFrQkMsTUFBbEIsRUFBMEI7QUFDL0NGLGdCQUFNLENBQUNaLE1BQUQsRUFBU3BCLEdBQVQsRUFBY2lDLE9BQWQsRUFBdUJDLE1BQXZCLENBQU47QUFDRCxTQUZNLENBQVA7QUFHRDs7QUFFRCxhQUFPTSxlQUFlLEdBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBQSxxQkFBZSxHQUFHQSxlQUFlLENBQUNILElBQWhCLENBQ2hCSywwQkFEZ0IsRUFFaEI7QUFDQTtBQUNBQSxnQ0FKZ0IsQ0FBSCxHQUtYQSwwQkFBMEIsRUFsQmhDO0FBbUJELEtBNUQ0QyxDQThEN0M7QUFDQTs7O0FBQ0EsU0FBSzlDLE9BQUwsR0FBZTZDLE9BQWY7QUFDRDs7QUFFRHZCLHVCQUFxQixDQUFDWSxhQUFhLENBQUNsRSxTQUFmLENBQXJCOztBQUNBa0UsZUFBYSxDQUFDbEUsU0FBZCxDQUF3QlEsbUJBQXhCLElBQStDLFlBQVk7QUFDekQsV0FBTyxJQUFQO0FBQ0QsR0FGRDs7QUFHQVgsU0FBTyxDQUFDcUUsYUFBUixHQUF3QkEsYUFBeEIsQ0F2TmdDLENBeU5oQztBQUNBO0FBQ0E7O0FBQ0FyRSxTQUFPLENBQUNrRixLQUFSLEdBQWdCLFVBQVN6RCxPQUFULEVBQWtCQyxPQUFsQixFQUEyQkMsSUFBM0IsRUFBaUNDLFdBQWpDLEVBQThDMEMsV0FBOUMsRUFBMkQ7QUFDekUsUUFBSUEsV0FBVyxLQUFLLEtBQUssQ0FBekIsRUFBNEJBLFdBQVcsR0FBR2EsT0FBZDtBQUU1QixRQUFJQyxJQUFJLEdBQUcsSUFBSWYsYUFBSixDQUNUN0MsSUFBSSxDQUFDQyxPQUFELEVBQVVDLE9BQVYsRUFBbUJDLElBQW5CLEVBQXlCQyxXQUF6QixDQURLLEVBRVQwQyxXQUZTLENBQVg7QUFLQSxXQUFPdEUsT0FBTyxDQUFDNEQsbUJBQVIsQ0FBNEJsQyxPQUE1QixJQUNIMEQsSUFERyxDQUNFO0FBREYsTUFFSEEsSUFBSSxDQUFDQyxJQUFMLEdBQVlULElBQVosQ0FBaUIsVUFBU0QsTUFBVCxFQUFpQjtBQUNoQyxhQUFPQSxNQUFNLENBQUNXLElBQVAsR0FBY1gsTUFBTSxDQUFDekQsS0FBckIsR0FBNkJrRSxJQUFJLENBQUNDLElBQUwsRUFBcEM7QUFDRCxLQUZELENBRko7QUFLRCxHQWJEOztBQWVBLFdBQVNqRCxnQkFBVCxDQUEwQlgsT0FBMUIsRUFBbUNFLElBQW5DLEVBQXlDTSxPQUF6QyxFQUFrRDtBQUNoRCxRQUFJc0QsS0FBSyxHQUFHN0Msc0JBQVo7QUFFQSxXQUFPLFNBQVM2QixNQUFULENBQWdCWixNQUFoQixFQUF3QnBCLEdBQXhCLEVBQTZCO0FBQ2xDLFVBQUlnRCxLQUFLLEtBQUszQyxpQkFBZCxFQUFpQztBQUMvQixjQUFNLElBQUk0QyxLQUFKLENBQVUsOEJBQVYsQ0FBTjtBQUNEOztBQUVELFVBQUlELEtBQUssS0FBSzFDLGlCQUFkLEVBQWlDO0FBQy9CLFlBQUljLE1BQU0sS0FBSyxPQUFmLEVBQXdCO0FBQ3RCLGdCQUFNcEIsR0FBTjtBQUNELFNBSDhCLENBSy9CO0FBQ0E7OztBQUNBLGVBQU9rRCxVQUFVLEVBQWpCO0FBQ0Q7O0FBRUR4RCxhQUFPLENBQUMwQixNQUFSLEdBQWlCQSxNQUFqQjtBQUNBMUIsYUFBTyxDQUFDTSxHQUFSLEdBQWNBLEdBQWQ7O0FBRUEsYUFBTyxJQUFQLEVBQWE7QUFDWCxZQUFJbUQsUUFBUSxHQUFHekQsT0FBTyxDQUFDeUQsUUFBdkI7O0FBQ0EsWUFBSUEsUUFBSixFQUFjO0FBQ1osY0FBSUMsY0FBYyxHQUFHQyxtQkFBbUIsQ0FBQ0YsUUFBRCxFQUFXekQsT0FBWCxDQUF4Qzs7QUFDQSxjQUFJMEQsY0FBSixFQUFvQjtBQUNsQixnQkFBSUEsY0FBYyxLQUFLN0MsZ0JBQXZCLEVBQXlDO0FBQ3pDLG1CQUFPNkMsY0FBUDtBQUNEO0FBQ0Y7O0FBRUQsWUFBSTFELE9BQU8sQ0FBQzBCLE1BQVIsS0FBbUIsTUFBdkIsRUFBK0I7QUFDN0I7QUFDQTtBQUNBMUIsaUJBQU8sQ0FBQzRELElBQVIsR0FBZTVELE9BQU8sQ0FBQzZELEtBQVIsR0FBZ0I3RCxPQUFPLENBQUNNLEdBQXZDO0FBRUQsU0FMRCxNQUtPLElBQUlOLE9BQU8sQ0FBQzBCLE1BQVIsS0FBbUIsT0FBdkIsRUFBZ0M7QUFDckMsY0FBSTRCLEtBQUssS0FBSzdDLHNCQUFkLEVBQXNDO0FBQ3BDNkMsaUJBQUssR0FBRzFDLGlCQUFSO0FBQ0Esa0JBQU1aLE9BQU8sQ0FBQ00sR0FBZDtBQUNEOztBQUVETixpQkFBTyxDQUFDOEQsaUJBQVIsQ0FBMEI5RCxPQUFPLENBQUNNLEdBQWxDO0FBRUQsU0FSTSxNQVFBLElBQUlOLE9BQU8sQ0FBQzBCLE1BQVIsS0FBbUIsUUFBdkIsRUFBaUM7QUFDdEMxQixpQkFBTyxDQUFDK0QsTUFBUixDQUFlLFFBQWYsRUFBeUIvRCxPQUFPLENBQUNNLEdBQWpDO0FBQ0Q7O0FBRURnRCxhQUFLLEdBQUczQyxpQkFBUjtBQUVBLFlBQUk4QixNQUFNLEdBQUdyQyxRQUFRLENBQUNaLE9BQUQsRUFBVUUsSUFBVixFQUFnQk0sT0FBaEIsQ0FBckI7O0FBQ0EsWUFBSXlDLE1BQU0sQ0FBQ2xDLElBQVAsS0FBZ0IsUUFBcEIsRUFBOEI7QUFDNUI7QUFDQTtBQUNBK0MsZUFBSyxHQUFHdEQsT0FBTyxDQUFDcUQsSUFBUixHQUNKekMsaUJBREksR0FFSkYsc0JBRko7O0FBSUEsY0FBSStCLE1BQU0sQ0FBQ25DLEdBQVAsS0FBZU8sZ0JBQW5CLEVBQXFDO0FBQ25DO0FBQ0Q7O0FBRUQsaUJBQU87QUFDTDVCLGlCQUFLLEVBQUV3RCxNQUFNLENBQUNuQyxHQURUO0FBRUwrQyxnQkFBSSxFQUFFckQsT0FBTyxDQUFDcUQ7QUFGVCxXQUFQO0FBS0QsU0FoQkQsTUFnQk8sSUFBSVosTUFBTSxDQUFDbEMsSUFBUCxLQUFnQixPQUFwQixFQUE2QjtBQUNsQytDLGVBQUssR0FBRzFDLGlCQUFSLENBRGtDLENBRWxDO0FBQ0E7O0FBQ0FaLGlCQUFPLENBQUMwQixNQUFSLEdBQWlCLE9BQWpCO0FBQ0ExQixpQkFBTyxDQUFDTSxHQUFSLEdBQWNtQyxNQUFNLENBQUNuQyxHQUFyQjtBQUNEO0FBQ0Y7QUFDRixLQXhFRDtBQXlFRCxHQXZUK0IsQ0F5VGhDO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSxXQUFTcUQsbUJBQVQsQ0FBNkJGLFFBQTdCLEVBQXVDekQsT0FBdkMsRUFBZ0Q7QUFDOUMsUUFBSTBCLE1BQU0sR0FBRytCLFFBQVEsQ0FBQ2hGLFFBQVQsQ0FBa0J1QixPQUFPLENBQUMwQixNQUExQixDQUFiOztBQUNBLFFBQUlBLE1BQU0sS0FBS3JELFNBQWYsRUFBMEI7QUFDeEI7QUFDQTtBQUNBMkIsYUFBTyxDQUFDeUQsUUFBUixHQUFtQixJQUFuQjs7QUFFQSxVQUFJekQsT0FBTyxDQUFDMEIsTUFBUixLQUFtQixPQUF2QixFQUFnQztBQUM5QjtBQUNBLFlBQUkrQixRQUFRLENBQUNoRixRQUFULENBQWtCLFFBQWxCLENBQUosRUFBaUM7QUFDL0I7QUFDQTtBQUNBdUIsaUJBQU8sQ0FBQzBCLE1BQVIsR0FBaUIsUUFBakI7QUFDQTFCLGlCQUFPLENBQUNNLEdBQVIsR0FBY2pDLFNBQWQ7QUFDQXNGLDZCQUFtQixDQUFDRixRQUFELEVBQVd6RCxPQUFYLENBQW5COztBQUVBLGNBQUlBLE9BQU8sQ0FBQzBCLE1BQVIsS0FBbUIsT0FBdkIsRUFBZ0M7QUFDOUI7QUFDQTtBQUNBLG1CQUFPYixnQkFBUDtBQUNEO0FBQ0Y7O0FBRURiLGVBQU8sQ0FBQzBCLE1BQVIsR0FBaUIsT0FBakI7QUFDQTFCLGVBQU8sQ0FBQ00sR0FBUixHQUFjLElBQUkwRCxTQUFKLENBQ1osZ0RBRFksQ0FBZDtBQUVEOztBQUVELGFBQU9uRCxnQkFBUDtBQUNEOztBQUVELFFBQUk0QixNQUFNLEdBQUdyQyxRQUFRLENBQUNzQixNQUFELEVBQVMrQixRQUFRLENBQUNoRixRQUFsQixFQUE0QnVCLE9BQU8sQ0FBQ00sR0FBcEMsQ0FBckI7O0FBRUEsUUFBSW1DLE1BQU0sQ0FBQ2xDLElBQVAsS0FBZ0IsT0FBcEIsRUFBNkI7QUFDM0JQLGFBQU8sQ0FBQzBCLE1BQVIsR0FBaUIsT0FBakI7QUFDQTFCLGFBQU8sQ0FBQ00sR0FBUixHQUFjbUMsTUFBTSxDQUFDbkMsR0FBckI7QUFDQU4sYUFBTyxDQUFDeUQsUUFBUixHQUFtQixJQUFuQjtBQUNBLGFBQU81QyxnQkFBUDtBQUNEOztBQUVELFFBQUlvRCxJQUFJLEdBQUd4QixNQUFNLENBQUNuQyxHQUFsQjs7QUFFQSxRQUFJLENBQUUyRCxJQUFOLEVBQVk7QUFDVmpFLGFBQU8sQ0FBQzBCLE1BQVIsR0FBaUIsT0FBakI7QUFDQTFCLGFBQU8sQ0FBQ00sR0FBUixHQUFjLElBQUkwRCxTQUFKLENBQWMsa0NBQWQsQ0FBZDtBQUNBaEUsYUFBTyxDQUFDeUQsUUFBUixHQUFtQixJQUFuQjtBQUNBLGFBQU81QyxnQkFBUDtBQUNEOztBQUVELFFBQUlvRCxJQUFJLENBQUNaLElBQVQsRUFBZTtBQUNiO0FBQ0E7QUFDQXJELGFBQU8sQ0FBQ3lELFFBQVEsQ0FBQ1MsVUFBVixDQUFQLEdBQStCRCxJQUFJLENBQUNoRixLQUFwQyxDQUhhLENBS2I7O0FBQ0FlLGFBQU8sQ0FBQ29ELElBQVIsR0FBZUssUUFBUSxDQUFDVSxPQUF4QixDQU5hLENBUWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLFVBQUluRSxPQUFPLENBQUMwQixNQUFSLEtBQW1CLFFBQXZCLEVBQWlDO0FBQy9CMUIsZUFBTyxDQUFDMEIsTUFBUixHQUFpQixNQUFqQjtBQUNBMUIsZUFBTyxDQUFDTSxHQUFSLEdBQWNqQyxTQUFkO0FBQ0Q7QUFFRixLQW5CRCxNQW1CTztBQUNMO0FBQ0EsYUFBTzRGLElBQVA7QUFDRCxLQXZFNkMsQ0F5RTlDO0FBQ0E7OztBQUNBakUsV0FBTyxDQUFDeUQsUUFBUixHQUFtQixJQUFuQjtBQUNBLFdBQU81QyxnQkFBUDtBQUNELEdBMVkrQixDQTRZaEM7QUFDQTs7O0FBQ0FXLHVCQUFxQixDQUFDSCxFQUFELENBQXJCO0FBRUF2QyxRQUFNLENBQUN1QyxFQUFELEVBQUt6QyxpQkFBTCxFQUF3QixXQUF4QixDQUFOLENBaFpnQyxDQWtaaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQXlDLElBQUUsQ0FBQzdDLGNBQUQsQ0FBRixHQUFxQixZQUFXO0FBQzlCLFdBQU8sSUFBUDtBQUNELEdBRkQ7O0FBSUE2QyxJQUFFLENBQUMrQyxRQUFILEdBQWMsWUFBVztBQUN2QixXQUFPLG9CQUFQO0FBQ0QsR0FGRDs7QUFJQSxXQUFTQyxZQUFULENBQXNCQyxJQUF0QixFQUE0QjtBQUMxQixRQUFJQyxLQUFLLEdBQUc7QUFBRUMsWUFBTSxFQUFFRixJQUFJLENBQUMsQ0FBRDtBQUFkLEtBQVo7O0FBRUEsUUFBSSxLQUFLQSxJQUFULEVBQWU7QUFDYkMsV0FBSyxDQUFDRSxRQUFOLEdBQWlCSCxJQUFJLENBQUMsQ0FBRCxDQUFyQjtBQUNEOztBQUVELFFBQUksS0FBS0EsSUFBVCxFQUFlO0FBQ2JDLFdBQUssQ0FBQ0csVUFBTixHQUFtQkosSUFBSSxDQUFDLENBQUQsQ0FBdkI7QUFDQUMsV0FBSyxDQUFDSSxRQUFOLEdBQWlCTCxJQUFJLENBQUMsQ0FBRCxDQUFyQjtBQUNEOztBQUVELFNBQUtNLFVBQUwsQ0FBZ0JDLElBQWhCLENBQXFCTixLQUFyQjtBQUNEOztBQUVELFdBQVNPLGFBQVQsQ0FBdUJQLEtBQXZCLEVBQThCO0FBQzVCLFFBQUk5QixNQUFNLEdBQUc4QixLQUFLLENBQUNRLFVBQU4sSUFBb0IsRUFBakM7QUFDQXRDLFVBQU0sQ0FBQ2xDLElBQVAsR0FBYyxRQUFkO0FBQ0EsV0FBT2tDLE1BQU0sQ0FBQ25DLEdBQWQ7QUFDQWlFLFNBQUssQ0FBQ1EsVUFBTixHQUFtQnRDLE1BQW5CO0FBQ0Q7O0FBRUQsV0FBU3hDLE9BQVQsQ0FBaUJOLFdBQWpCLEVBQThCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBLFNBQUtpRixVQUFMLEdBQWtCLENBQUM7QUFBRUosWUFBTSxFQUFFO0FBQVYsS0FBRCxDQUFsQjtBQUNBN0UsZUFBVyxDQUFDOEIsT0FBWixDQUFvQjRDLFlBQXBCLEVBQWtDLElBQWxDO0FBQ0EsU0FBS1csS0FBTCxDQUFXLElBQVg7QUFDRDs7QUFFRGpILFNBQU8sQ0FBQ2tILElBQVIsR0FBZSxVQUFTQyxNQUFULEVBQWlCO0FBQzlCLFFBQUlELElBQUksR0FBRyxFQUFYOztBQUNBLFNBQUssSUFBSWpHLEdBQVQsSUFBZ0JrRyxNQUFoQixFQUF3QjtBQUN0QkQsVUFBSSxDQUFDSixJQUFMLENBQVU3RixHQUFWO0FBQ0Q7O0FBQ0RpRyxRQUFJLENBQUNFLE9BQUwsR0FMOEIsQ0FPOUI7QUFDQTs7QUFDQSxXQUFPLFNBQVMvQixJQUFULEdBQWdCO0FBQ3JCLGFBQU82QixJQUFJLENBQUM1SSxNQUFaLEVBQW9CO0FBQ2xCLFlBQUkyQyxHQUFHLEdBQUdpRyxJQUFJLENBQUNHLEdBQUwsRUFBVjs7QUFDQSxZQUFJcEcsR0FBRyxJQUFJa0csTUFBWCxFQUFtQjtBQUNqQjlCLGNBQUksQ0FBQ25FLEtBQUwsR0FBYUQsR0FBYjtBQUNBb0UsY0FBSSxDQUFDQyxJQUFMLEdBQVksS0FBWjtBQUNBLGlCQUFPRCxJQUFQO0FBQ0Q7QUFDRixPQVJvQixDQVVyQjtBQUNBO0FBQ0E7OztBQUNBQSxVQUFJLENBQUNDLElBQUwsR0FBWSxJQUFaO0FBQ0EsYUFBT0QsSUFBUDtBQUNELEtBZkQ7QUFnQkQsR0F6QkQ7O0FBMkJBLFdBQVNoQyxNQUFULENBQWdCaUUsUUFBaEIsRUFBMEI7QUFDeEIsUUFBSUEsUUFBSixFQUFjO0FBQ1osVUFBSUMsY0FBYyxHQUFHRCxRQUFRLENBQUM3RyxjQUFELENBQTdCOztBQUNBLFVBQUk4RyxjQUFKLEVBQW9CO0FBQ2xCLGVBQU9BLGNBQWMsQ0FBQzlFLElBQWYsQ0FBb0I2RSxRQUFwQixDQUFQO0FBQ0Q7O0FBRUQsVUFBSSxPQUFPQSxRQUFRLENBQUNqQyxJQUFoQixLQUF5QixVQUE3QixFQUF5QztBQUN2QyxlQUFPaUMsUUFBUDtBQUNEOztBQUVELFVBQUksQ0FBQ0UsS0FBSyxDQUFDRixRQUFRLENBQUNoSixNQUFWLENBQVYsRUFBNkI7QUFDM0IsWUFBSUQsQ0FBQyxHQUFHLENBQUMsQ0FBVDtBQUFBLFlBQVlnSCxJQUFJLEdBQUcsU0FBU0EsSUFBVCxHQUFnQjtBQUNqQyxpQkFBTyxFQUFFaEgsQ0FBRixHQUFNaUosUUFBUSxDQUFDaEosTUFBdEIsRUFBOEI7QUFDNUIsZ0JBQUk4QixNQUFNLENBQUNxQyxJQUFQLENBQVk2RSxRQUFaLEVBQXNCakosQ0FBdEIsQ0FBSixFQUE4QjtBQUM1QmdILGtCQUFJLENBQUNuRSxLQUFMLEdBQWFvRyxRQUFRLENBQUNqSixDQUFELENBQXJCO0FBQ0FnSCxrQkFBSSxDQUFDQyxJQUFMLEdBQVksS0FBWjtBQUNBLHFCQUFPRCxJQUFQO0FBQ0Q7QUFDRjs7QUFFREEsY0FBSSxDQUFDbkUsS0FBTCxHQUFhWixTQUFiO0FBQ0ErRSxjQUFJLENBQUNDLElBQUwsR0FBWSxJQUFaO0FBRUEsaUJBQU9ELElBQVA7QUFDRCxTQWJEOztBQWVBLGVBQU9BLElBQUksQ0FBQ0EsSUFBTCxHQUFZQSxJQUFuQjtBQUNEO0FBQ0YsS0E3QnVCLENBK0J4Qjs7O0FBQ0EsV0FBTztBQUFFQSxVQUFJLEVBQUVJO0FBQVIsS0FBUDtBQUNEOztBQUNEekYsU0FBTyxDQUFDcUQsTUFBUixHQUFpQkEsTUFBakI7O0FBRUEsV0FBU29DLFVBQVQsR0FBc0I7QUFDcEIsV0FBTztBQUFFdkUsV0FBSyxFQUFFWixTQUFUO0FBQW9CZ0YsVUFBSSxFQUFFO0FBQTFCLEtBQVA7QUFDRDs7QUFFRHBELFNBQU8sQ0FBQy9CLFNBQVIsR0FBb0I7QUFDbEJvRCxlQUFXLEVBQUVyQixPQURLO0FBR2xCK0UsU0FBSyxFQUFFLGVBQVNRLGFBQVQsRUFBd0I7QUFDN0IsV0FBS0MsSUFBTCxHQUFZLENBQVo7QUFDQSxXQUFLckMsSUFBTCxHQUFZLENBQVosQ0FGNkIsQ0FHN0I7QUFDQTs7QUFDQSxXQUFLUSxJQUFMLEdBQVksS0FBS0MsS0FBTCxHQUFheEYsU0FBekI7QUFDQSxXQUFLZ0YsSUFBTCxHQUFZLEtBQVo7QUFDQSxXQUFLSSxRQUFMLEdBQWdCLElBQWhCO0FBRUEsV0FBSy9CLE1BQUwsR0FBYyxNQUFkO0FBQ0EsV0FBS3BCLEdBQUwsR0FBV2pDLFNBQVg7QUFFQSxXQUFLdUcsVUFBTCxDQUFnQm5ELE9BQWhCLENBQXdCcUQsYUFBeEI7O0FBRUEsVUFBSSxDQUFDVSxhQUFMLEVBQW9CO0FBQ2xCLGFBQUssSUFBSTFELElBQVQsSUFBaUIsSUFBakIsRUFBdUI7QUFDckI7QUFDQSxjQUFJQSxJQUFJLENBQUNqRixNQUFMLENBQVksQ0FBWixNQUFtQixHQUFuQixJQUNBc0IsTUFBTSxDQUFDcUMsSUFBUCxDQUFZLElBQVosRUFBa0JzQixJQUFsQixDQURBLElBRUEsQ0FBQ3lELEtBQUssQ0FBQyxDQUFDekQsSUFBSSxDQUFDNEQsS0FBTCxDQUFXLENBQVgsQ0FBRixDQUZWLEVBRTRCO0FBQzFCLGlCQUFLNUQsSUFBTCxJQUFhekQsU0FBYjtBQUNEO0FBQ0Y7QUFDRjtBQUNGLEtBM0JpQjtBQTZCbEJzSCxRQUFJLEVBQUUsZ0JBQVc7QUFDZixXQUFLdEMsSUFBTCxHQUFZLElBQVo7QUFFQSxVQUFJdUMsU0FBUyxHQUFHLEtBQUtoQixVQUFMLENBQWdCLENBQWhCLENBQWhCO0FBQ0EsVUFBSWlCLFVBQVUsR0FBR0QsU0FBUyxDQUFDYixVQUEzQjs7QUFDQSxVQUFJYyxVQUFVLENBQUN0RixJQUFYLEtBQW9CLE9BQXhCLEVBQWlDO0FBQy9CLGNBQU1zRixVQUFVLENBQUN2RixHQUFqQjtBQUNEOztBQUVELGFBQU8sS0FBS3dGLElBQVo7QUFDRCxLQXZDaUI7QUF5Q2xCaEMscUJBQWlCLEVBQUUsMkJBQVNpQyxTQUFULEVBQW9CO0FBQ3JDLFVBQUksS0FBSzFDLElBQVQsRUFBZTtBQUNiLGNBQU0wQyxTQUFOO0FBQ0Q7O0FBRUQsVUFBSS9GLE9BQU8sR0FBRyxJQUFkOztBQUNBLGVBQVNnRyxNQUFULENBQWdCQyxHQUFoQixFQUFxQkMsTUFBckIsRUFBNkI7QUFDM0J6RCxjQUFNLENBQUNsQyxJQUFQLEdBQWMsT0FBZDtBQUNBa0MsY0FBTSxDQUFDbkMsR0FBUCxHQUFheUYsU0FBYjtBQUNBL0YsZUFBTyxDQUFDb0QsSUFBUixHQUFlNkMsR0FBZjs7QUFFQSxZQUFJQyxNQUFKLEVBQVk7QUFDVjtBQUNBO0FBQ0FsRyxpQkFBTyxDQUFDMEIsTUFBUixHQUFpQixNQUFqQjtBQUNBMUIsaUJBQU8sQ0FBQ00sR0FBUixHQUFjakMsU0FBZDtBQUNEOztBQUVELGVBQU8sQ0FBQyxDQUFFNkgsTUFBVjtBQUNEOztBQUVELFdBQUssSUFBSTlKLENBQUMsR0FBRyxLQUFLd0ksVUFBTCxDQUFnQnZJLE1BQWhCLEdBQXlCLENBQXRDLEVBQXlDRCxDQUFDLElBQUksQ0FBOUMsRUFBaUQsRUFBRUEsQ0FBbkQsRUFBc0Q7QUFDcEQsWUFBSW1JLEtBQUssR0FBRyxLQUFLSyxVQUFMLENBQWdCeEksQ0FBaEIsQ0FBWjtBQUNBLFlBQUlxRyxNQUFNLEdBQUc4QixLQUFLLENBQUNRLFVBQW5COztBQUVBLFlBQUlSLEtBQUssQ0FBQ0MsTUFBTixLQUFpQixNQUFyQixFQUE2QjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSxpQkFBT3dCLE1BQU0sQ0FBQyxLQUFELENBQWI7QUFDRDs7QUFFRCxZQUFJekIsS0FBSyxDQUFDQyxNQUFOLElBQWdCLEtBQUtpQixJQUF6QixFQUErQjtBQUM3QixjQUFJVSxRQUFRLEdBQUdoSSxNQUFNLENBQUNxQyxJQUFQLENBQVkrRCxLQUFaLEVBQW1CLFVBQW5CLENBQWY7QUFDQSxjQUFJNkIsVUFBVSxHQUFHakksTUFBTSxDQUFDcUMsSUFBUCxDQUFZK0QsS0FBWixFQUFtQixZQUFuQixDQUFqQjs7QUFFQSxjQUFJNEIsUUFBUSxJQUFJQyxVQUFoQixFQUE0QjtBQUMxQixnQkFBSSxLQUFLWCxJQUFMLEdBQVlsQixLQUFLLENBQUNFLFFBQXRCLEVBQWdDO0FBQzlCLHFCQUFPdUIsTUFBTSxDQUFDekIsS0FBSyxDQUFDRSxRQUFQLEVBQWlCLElBQWpCLENBQWI7QUFDRCxhQUZELE1BRU8sSUFBSSxLQUFLZ0IsSUFBTCxHQUFZbEIsS0FBSyxDQUFDRyxVQUF0QixFQUFrQztBQUN2QyxxQkFBT3NCLE1BQU0sQ0FBQ3pCLEtBQUssQ0FBQ0csVUFBUCxDQUFiO0FBQ0Q7QUFFRixXQVBELE1BT08sSUFBSXlCLFFBQUosRUFBYztBQUNuQixnQkFBSSxLQUFLVixJQUFMLEdBQVlsQixLQUFLLENBQUNFLFFBQXRCLEVBQWdDO0FBQzlCLHFCQUFPdUIsTUFBTSxDQUFDekIsS0FBSyxDQUFDRSxRQUFQLEVBQWlCLElBQWpCLENBQWI7QUFDRDtBQUVGLFdBTE0sTUFLQSxJQUFJMkIsVUFBSixFQUFnQjtBQUNyQixnQkFBSSxLQUFLWCxJQUFMLEdBQVlsQixLQUFLLENBQUNHLFVBQXRCLEVBQWtDO0FBQ2hDLHFCQUFPc0IsTUFBTSxDQUFDekIsS0FBSyxDQUFDRyxVQUFQLENBQWI7QUFDRDtBQUVGLFdBTE0sTUFLQTtBQUNMLGtCQUFNLElBQUluQixLQUFKLENBQVUsd0NBQVYsQ0FBTjtBQUNEO0FBQ0Y7QUFDRjtBQUNGLEtBbkdpQjtBQXFHbEJRLFVBQU0sRUFBRSxnQkFBU3hELElBQVQsRUFBZUQsR0FBZixFQUFvQjtBQUMxQixXQUFLLElBQUlsRSxDQUFDLEdBQUcsS0FBS3dJLFVBQUwsQ0FBZ0J2SSxNQUFoQixHQUF5QixDQUF0QyxFQUF5Q0QsQ0FBQyxJQUFJLENBQTlDLEVBQWlELEVBQUVBLENBQW5ELEVBQXNEO0FBQ3BELFlBQUltSSxLQUFLLEdBQUcsS0FBS0ssVUFBTCxDQUFnQnhJLENBQWhCLENBQVo7O0FBQ0EsWUFBSW1JLEtBQUssQ0FBQ0MsTUFBTixJQUFnQixLQUFLaUIsSUFBckIsSUFDQXRILE1BQU0sQ0FBQ3FDLElBQVAsQ0FBWStELEtBQVosRUFBbUIsWUFBbkIsQ0FEQSxJQUVBLEtBQUtrQixJQUFMLEdBQVlsQixLQUFLLENBQUNHLFVBRnRCLEVBRWtDO0FBQ2hDLGNBQUkyQixZQUFZLEdBQUc5QixLQUFuQjtBQUNBO0FBQ0Q7QUFDRjs7QUFFRCxVQUFJOEIsWUFBWSxLQUNYOUYsSUFBSSxLQUFLLE9BQVQsSUFDQUEsSUFBSSxLQUFLLFVBRkUsQ0FBWixJQUdBOEYsWUFBWSxDQUFDN0IsTUFBYixJQUF1QmxFLEdBSHZCLElBSUFBLEdBQUcsSUFBSStGLFlBQVksQ0FBQzNCLFVBSnhCLEVBSW9DO0FBQ2xDO0FBQ0E7QUFDQTJCLG9CQUFZLEdBQUcsSUFBZjtBQUNEOztBQUVELFVBQUk1RCxNQUFNLEdBQUc0RCxZQUFZLEdBQUdBLFlBQVksQ0FBQ3RCLFVBQWhCLEdBQTZCLEVBQXREO0FBQ0F0QyxZQUFNLENBQUNsQyxJQUFQLEdBQWNBLElBQWQ7QUFDQWtDLFlBQU0sQ0FBQ25DLEdBQVAsR0FBYUEsR0FBYjs7QUFFQSxVQUFJK0YsWUFBSixFQUFrQjtBQUNoQixhQUFLM0UsTUFBTCxHQUFjLE1BQWQ7QUFDQSxhQUFLMEIsSUFBTCxHQUFZaUQsWUFBWSxDQUFDM0IsVUFBekI7QUFDQSxlQUFPN0QsZ0JBQVA7QUFDRDs7QUFFRCxhQUFPLEtBQUt5RixRQUFMLENBQWM3RCxNQUFkLENBQVA7QUFDRCxLQXJJaUI7QUF1SWxCNkQsWUFBUSxFQUFFLGtCQUFTN0QsTUFBVCxFQUFpQmtDLFFBQWpCLEVBQTJCO0FBQ25DLFVBQUlsQyxNQUFNLENBQUNsQyxJQUFQLEtBQWdCLE9BQXBCLEVBQTZCO0FBQzNCLGNBQU1rQyxNQUFNLENBQUNuQyxHQUFiO0FBQ0Q7O0FBRUQsVUFBSW1DLE1BQU0sQ0FBQ2xDLElBQVAsS0FBZ0IsT0FBaEIsSUFDQWtDLE1BQU0sQ0FBQ2xDLElBQVAsS0FBZ0IsVUFEcEIsRUFDZ0M7QUFDOUIsYUFBSzZDLElBQUwsR0FBWVgsTUFBTSxDQUFDbkMsR0FBbkI7QUFDRCxPQUhELE1BR08sSUFBSW1DLE1BQU0sQ0FBQ2xDLElBQVAsS0FBZ0IsUUFBcEIsRUFBOEI7QUFDbkMsYUFBS3VGLElBQUwsR0FBWSxLQUFLeEYsR0FBTCxHQUFXbUMsTUFBTSxDQUFDbkMsR0FBOUI7QUFDQSxhQUFLb0IsTUFBTCxHQUFjLFFBQWQ7QUFDQSxhQUFLMEIsSUFBTCxHQUFZLEtBQVo7QUFDRCxPQUpNLE1BSUEsSUFBSVgsTUFBTSxDQUFDbEMsSUFBUCxLQUFnQixRQUFoQixJQUE0Qm9FLFFBQWhDLEVBQTBDO0FBQy9DLGFBQUt2QixJQUFMLEdBQVl1QixRQUFaO0FBQ0Q7O0FBRUQsYUFBTzlELGdCQUFQO0FBQ0QsS0F4SmlCO0FBMEpsQjBGLFVBQU0sRUFBRSxnQkFBUzdCLFVBQVQsRUFBcUI7QUFDM0IsV0FBSyxJQUFJdEksQ0FBQyxHQUFHLEtBQUt3SSxVQUFMLENBQWdCdkksTUFBaEIsR0FBeUIsQ0FBdEMsRUFBeUNELENBQUMsSUFBSSxDQUE5QyxFQUFpRCxFQUFFQSxDQUFuRCxFQUFzRDtBQUNwRCxZQUFJbUksS0FBSyxHQUFHLEtBQUtLLFVBQUwsQ0FBZ0J4SSxDQUFoQixDQUFaOztBQUNBLFlBQUltSSxLQUFLLENBQUNHLFVBQU4sS0FBcUJBLFVBQXpCLEVBQXFDO0FBQ25DLGVBQUs0QixRQUFMLENBQWMvQixLQUFLLENBQUNRLFVBQXBCLEVBQWdDUixLQUFLLENBQUNJLFFBQXRDO0FBQ0FHLHVCQUFhLENBQUNQLEtBQUQsQ0FBYjtBQUNBLGlCQUFPMUQsZ0JBQVA7QUFDRDtBQUNGO0FBQ0YsS0FuS2lCO0FBcUtsQixhQUFTLGdCQUFTMkQsTUFBVCxFQUFpQjtBQUN4QixXQUFLLElBQUlwSSxDQUFDLEdBQUcsS0FBS3dJLFVBQUwsQ0FBZ0J2SSxNQUFoQixHQUF5QixDQUF0QyxFQUF5Q0QsQ0FBQyxJQUFJLENBQTlDLEVBQWlELEVBQUVBLENBQW5ELEVBQXNEO0FBQ3BELFlBQUltSSxLQUFLLEdBQUcsS0FBS0ssVUFBTCxDQUFnQnhJLENBQWhCLENBQVo7O0FBQ0EsWUFBSW1JLEtBQUssQ0FBQ0MsTUFBTixLQUFpQkEsTUFBckIsRUFBNkI7QUFDM0IsY0FBSS9CLE1BQU0sR0FBRzhCLEtBQUssQ0FBQ1EsVUFBbkI7O0FBQ0EsY0FBSXRDLE1BQU0sQ0FBQ2xDLElBQVAsS0FBZ0IsT0FBcEIsRUFBNkI7QUFDM0IsZ0JBQUlpRyxNQUFNLEdBQUcvRCxNQUFNLENBQUNuQyxHQUFwQjtBQUNBd0UseUJBQWEsQ0FBQ1AsS0FBRCxDQUFiO0FBQ0Q7O0FBQ0QsaUJBQU9pQyxNQUFQO0FBQ0Q7QUFDRixPQVh1QixDQWF4QjtBQUNBOzs7QUFDQSxZQUFNLElBQUlqRCxLQUFKLENBQVUsdUJBQVYsQ0FBTjtBQUNELEtBckxpQjtBQXVMbEJrRCxpQkFBYSxFQUFFLHVCQUFTcEIsUUFBVCxFQUFtQm5CLFVBQW5CLEVBQStCQyxPQUEvQixFQUF3QztBQUNyRCxXQUFLVixRQUFMLEdBQWdCO0FBQ2RoRixnQkFBUSxFQUFFMkMsTUFBTSxDQUFDaUUsUUFBRCxDQURGO0FBRWRuQixrQkFBVSxFQUFFQSxVQUZFO0FBR2RDLGVBQU8sRUFBRUE7QUFISyxPQUFoQjs7QUFNQSxVQUFJLEtBQUt6QyxNQUFMLEtBQWdCLE1BQXBCLEVBQTRCO0FBQzFCO0FBQ0E7QUFDQSxhQUFLcEIsR0FBTCxHQUFXakMsU0FBWDtBQUNEOztBQUVELGFBQU93QyxnQkFBUDtBQUNEO0FBck1pQixHQUFwQixDQWpnQmdDLENBeXNCaEM7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsU0FBTzlDLE9BQVA7QUFFRCxDQS9zQmMsRUFndEJiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQU8ySSxNQUFQLE9BQWtCLFFBQWxCLEdBQTZCQSxNQUFNLENBQUMzSSxPQUFwQyxHQUE4QyxFQXB0QmpDLENBQWY7O0FBdXRCQSxJQUFJO0FBQ0Y0SSxvQkFBa0IsR0FBRzdJLE9BQXJCO0FBQ0QsQ0FGRCxDQUVFLE9BQU84SSxvQkFBUCxFQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUMsVUFBUSxDQUFDLEdBQUQsRUFBTSx3QkFBTixDQUFSLENBQXdDL0ksT0FBeEM7QUFDRCxDOzs7Ozs7Ozs7Ozs7O0FDM3VCRDtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ08sU0FBU2dKLFVBQVQsQ0FBb0JDLEtBQXBCLEVBQTJCQyxRQUEzQixFQUFxQ0MsS0FBckMsRUFBNENDLEtBQTVDLEVBQW1EO0FBQ3hEO0FBQ0Usa0JBQWdCSCxLQUFoQixHQUNFQSxLQUFLLENBQUNJLFVBQU4sQ0FBaUJILFFBQVEsR0FBRyxHQUFYLEdBQWlCQyxLQUFqQixHQUF5QixHQUExQyxFQUErQ0MsS0FBL0MsQ0FERixHQUVFSCxLQUFLLENBQUNLLE9BQU4sQ0FBY0osUUFBZCxFQUF3QkMsS0FBeEIsRUFBK0JDLEtBQS9CLENBRkYsQ0FGc0QsQ0FLeEQ7QUFDRCxDOzs7Ozs7Ozs7Ozs7QUNSRDtBQUFBO0FBQUE7QUFBQTtBQUNBLElBQUlHLFFBQVEsR0FBR0MsNkRBQWdCLEdBQzNCLFVBQVVDLEVBQVYsRUFBY0MsR0FBZCxFQUFtQjtBQUNqQixNQUFJLENBQUNDLDZEQUFRLENBQUNGLEVBQUQsRUFBTUMsR0FBTixDQUFiLEVBQXlCO0FBQUVELE1BQUUsQ0FBQ0csU0FBSCxDQUFhQyxHQUFiLENBQWlCSCxHQUFqQjtBQUF3QjtBQUNwRCxDQUgwQixHQUkzQixVQUFVRCxFQUFWLEVBQWNDLEdBQWQsRUFBbUI7QUFDakIsTUFBSSxDQUFDQyw2REFBUSxDQUFDRixFQUFELEVBQU1DLEdBQU4sQ0FBYixFQUF5QjtBQUFFRCxNQUFFLENBQUNLLFNBQUgsSUFBZ0IsTUFBTUosR0FBdEI7QUFBNEI7QUFDeEQsQ0FOTDs7Ozs7Ozs7Ozs7OztBQ0RBO0FBQUE7QUFBQTtBQUFBO0FBRU8sU0FBU0ssU0FBVCxDQUFtQk4sRUFBbkIsRUFBdUJ4SSxHQUF2QixFQUE0QitJLGdCQUE1QixFQUE4QztBQUNuRCxPQUFLLElBQUlDLElBQVQsSUFBaUJoSixHQUFqQixFQUFzQjtBQUNwQixRQUFJaUosTUFBTSxHQUFHLENBQUMsWUFBRCxFQUFlLFdBQWYsRUFBNEJDLE9BQTVCLENBQW9DRixJQUFwQyxLQUE2QyxDQUE3QyxJQUFrRCxDQUFDRCxnQkFBbkQsR0FBc0VJLCtEQUF0RSxHQUFzRixLQUFuRztBQUNBWCxNQUFFLENBQUMxSixnQkFBSCxDQUFvQmtLLElBQXBCLEVBQTBCaEosR0FBRyxDQUFDZ0osSUFBRCxDQUE3QixFQUFxQ0MsTUFBckM7QUFDRDtBQUNGLEM7Ozs7Ozs7Ozs7OztBQ1BEO0FBQUE7QUFBTyxTQUFTRyxpQkFBVCxDQUE0QkMsRUFBNUIsRUFBZ0M7QUFDckMsTUFBSUMsR0FBRyxHQUFHLEVBQVY7O0FBQ0EsT0FBSyxJQUFJak0sQ0FBQyxHQUFHLENBQVIsRUFBV2tNLENBQUMsR0FBR0YsRUFBRSxDQUFDL0wsTUFBdkIsRUFBK0JELENBQUMsR0FBR2tNLENBQW5DLEVBQXNDbE0sQ0FBQyxFQUF2QyxFQUEyQztBQUN6Q2lNLE9BQUcsQ0FBQ3hELElBQUosQ0FBU3VELEVBQUUsQ0FBQ2hNLENBQUQsQ0FBWDtBQUNEOztBQUNELFNBQU9pTSxHQUFQO0FBQ0QsQzs7Ozs7Ozs7Ozs7O0FDTkQ7QUFBQTtBQUFBLElBQUlFLEdBQUcsR0FBRzNNLE1BQVY7QUFFTyxJQUFJNE0sR0FBRyxHQUFHRCxHQUFHLENBQUNFLG9CQUFKLElBQ1pGLEdBQUcsQ0FBQ0csdUJBRFEsSUFFWixVQUFTQyxFQUFULEVBQVk7QUFBRUMsY0FBWSxDQUFDRCxFQUFELENBQVo7QUFBbUIsQ0FGL0IsQzs7Ozs7Ozs7Ozs7O0FDRlA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVPLFNBQVNFLElBQVQsR0FBZ0I7QUFDckIsTUFBSUMsR0FBRyxHQUFHNU0sUUFBVjtBQUFBLE1BQ0k2TSxJQUFJLEdBQUdDLDJEQUFPLEVBRGxCO0FBQUEsTUFFSUMsV0FBVyxHQUFHQyxtRUFBVyxDQUFDSCxJQUFELENBRjdCO0FBQUEsTUFHSUksR0FBRyxHQUFHTCxHQUFHLENBQUNNLGFBQUosQ0FBa0IsS0FBbEIsQ0FIVjtBQUFBLE1BSUkxRyxNQUFNLEdBQUcsS0FKYjtBQU1BcUcsTUFBSSxDQUFDTSxXQUFMLENBQWlCRixHQUFqQjs7QUFDQSxNQUFJO0FBQ0YsUUFBSTNCLEdBQUcsR0FBRyxhQUFWO0FBQUEsUUFDSThCLElBQUksR0FBRyxDQUFDLFNBQVM5QixHQUFWLEVBQWUsY0FBY0EsR0FBN0IsRUFBa0MsaUJBQWlCQSxHQUFuRCxDQURYO0FBQUEsUUFFSStCLEdBRko7O0FBR0EsU0FBSyxJQUFJbk4sQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxDQUFwQixFQUF1QkEsQ0FBQyxFQUF4QixFQUE0QjtBQUMxQm1OLFNBQUcsR0FBR0QsSUFBSSxDQUFDbE4sQ0FBRCxDQUFWO0FBQ0ErTSxTQUFHLENBQUNLLEtBQUosQ0FBVUMsS0FBVixHQUFrQkYsR0FBbEI7O0FBQ0EsVUFBSUosR0FBRyxDQUFDTyxXQUFKLEtBQW9CLEdBQXhCLEVBQTZCO0FBQzNCaEgsY0FBTSxHQUFHNkcsR0FBRyxDQUFDSSxPQUFKLENBQVluQyxHQUFaLEVBQWlCLEVBQWpCLENBQVQ7QUFDQTtBQUNEO0FBQ0Y7QUFDRixHQVpELENBWUUsT0FBT29DLENBQVAsRUFBVSxDQUFFOztBQUVkYixNQUFJLENBQUNjLElBQUwsR0FBWUMsdUVBQWEsQ0FBQ2YsSUFBRCxFQUFPRSxXQUFQLENBQXpCLEdBQStDRSxHQUFHLENBQUNZLE1BQUosRUFBL0M7QUFFQSxTQUFPckgsTUFBUDtBQUNELEM7Ozs7Ozs7Ozs7OztBQ2hDRDtBQUFBO0FBQU8sU0FBU3NILGlCQUFULENBQTRCL0ssS0FBNUIsRUFBbUM7QUFDeEMsU0FBTyxDQUFDLE1BQUQsRUFBUyxPQUFULEVBQWtCZ0osT0FBbEIsQ0FBMEJoSixLQUExQixLQUFvQyxDQUFwQyxHQUF3Q2dMLElBQUksQ0FBQ0MsS0FBTCxDQUFXakwsS0FBWCxDQUF4QyxHQUE0REEsS0FBbkU7QUFDRCxDOzs7Ozs7Ozs7Ozs7QUNGRDtBQUFBO0FBQU8sSUFBSXFJLGdCQUFnQixJQUFHLGVBQWVwTCxRQUFRLENBQUNrTixhQUFULENBQXVCLEdBQXZCLENBQWxCLENBQXBCLEM7Ozs7Ozs7Ozs7OztBQ0FQO0FBQUE7QUFBQTtBQUNPLFNBQVNlLGdCQUFULENBQTJCQyxLQUEzQixFQUFrQ0MsS0FBbEMsRUFBeUM7QUFDOUM7QUFDQSxNQUFJYixLQUFLLEdBQUd0TixRQUFRLENBQUNrTixhQUFULENBQXVCLE9BQXZCLENBQVosQ0FGOEMsQ0FHOUM7QUFFQTtBQUNBO0FBQ0E7O0FBQ0EsTUFBSWdCLEtBQUosRUFBVztBQUFFWixTQUFLLENBQUNjLFlBQU4sQ0FBbUIsT0FBbkIsRUFBNEJGLEtBQTVCO0FBQXFDLEdBUkosQ0FVOUM7OztBQUNBLE1BQUlDLEtBQUosRUFBVztBQUFFYixTQUFLLENBQUNjLFlBQU4sQ0FBbUIsT0FBbkIsRUFBNEJELEtBQTVCO0FBQXFDLEdBWEosQ0FhOUM7QUFDQTtBQUVBOzs7QUFDQW5PLFVBQVEsQ0FBQ3FPLGFBQVQsQ0FBdUIsTUFBdkIsRUFBK0JsQixXQUEvQixDQUEyQ0csS0FBM0M7QUFFQSxTQUFPQSxLQUFLLENBQUN6QyxLQUFOLEdBQWN5QyxLQUFLLENBQUN6QyxLQUFwQixHQUE0QnlDLEtBQUssQ0FBQ2dCLFVBQXpDO0FBQ0Q7QUFBQSxDOzs7Ozs7Ozs7Ozs7QUNyQkQ7QUFBQTtBQUFPLElBQUlDLFVBQVUsR0FBR3ZPLFFBQVEsQ0FBQ3dPLGVBQTFCLEM7Ozs7Ozs7Ozs7OztBQ0FQO0FBQUE7QUFBTyxTQUFTQyxNQUFULEdBQWtCO0FBQ3ZCLFNBQU87QUFDTEMsVUFBTSxFQUFFLEVBREg7QUFFTEMsTUFBRSxFQUFFLFlBQVVDLFNBQVYsRUFBcUJ6SyxFQUFyQixFQUF5QjtBQUMzQixXQUFLdUssTUFBTCxDQUFZRSxTQUFaLElBQXlCLEtBQUtGLE1BQUwsQ0FBWUUsU0FBWixLQUEwQixFQUFuRDtBQUNBLFdBQUtGLE1BQUwsQ0FBWUUsU0FBWixFQUF1QmpHLElBQXZCLENBQTRCeEUsRUFBNUI7QUFDRCxLQUxJO0FBTUwwSyxPQUFHLEVBQUUsYUFBU0QsU0FBVCxFQUFvQnpLLEVBQXBCLEVBQXdCO0FBQzNCLFVBQUksS0FBS3VLLE1BQUwsQ0FBWUUsU0FBWixDQUFKLEVBQTRCO0FBQzFCLGFBQUssSUFBSTFPLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS3dPLE1BQUwsQ0FBWUUsU0FBWixFQUF1QnpPLE1BQTNDLEVBQW1ERCxDQUFDLEVBQXBELEVBQXdEO0FBQ3RELGNBQUksS0FBS3dPLE1BQUwsQ0FBWUUsU0FBWixFQUF1QjFPLENBQXZCLE1BQThCaUUsRUFBbEMsRUFBc0M7QUFDcEMsaUJBQUt1SyxNQUFMLENBQVlFLFNBQVosRUFBdUJFLE1BQXZCLENBQThCNU8sQ0FBOUIsRUFBaUMsQ0FBakM7QUFDQTtBQUNEO0FBQ0Y7QUFDRjtBQUNGLEtBZkk7QUFnQkw2TyxRQUFJLEVBQUUsY0FBVUgsU0FBVixFQUFxQkksSUFBckIsRUFBMkI7QUFDL0JBLFVBQUksQ0FBQzNLLElBQUwsR0FBWXVLLFNBQVo7O0FBQ0EsVUFBSSxLQUFLRixNQUFMLENBQVlFLFNBQVosQ0FBSixFQUE0QjtBQUMxQixhQUFLRixNQUFMLENBQVlFLFNBQVosRUFBdUJySixPQUF2QixDQUErQixVQUFTcEIsRUFBVCxFQUFhO0FBQzFDQSxZQUFFLENBQUM2SyxJQUFELEVBQU9KLFNBQVAsQ0FBRjtBQUNELFNBRkQ7QUFHRDtBQUNGO0FBdkJJLEdBQVA7QUF5QkQ7QUFBQSxDOzs7Ozs7Ozs7Ozs7QUMxQkQ7QUFBQTtBQUFPLFNBQVNLLE1BQVQsR0FBa0I7QUFDdkIsTUFBSXBNLEdBQUo7QUFBQSxNQUFTK0MsSUFBVDtBQUFBLE1BQWVzSixJQUFmO0FBQUEsTUFDSUMsTUFBTSxHQUFHQyxTQUFTLENBQUMsQ0FBRCxDQUFULElBQWdCLEVBRDdCO0FBQUEsTUFFSWxQLENBQUMsR0FBRyxDQUZSO0FBQUEsTUFHSUMsTUFBTSxHQUFHaVAsU0FBUyxDQUFDalAsTUFIdkI7O0FBS0EsU0FBT0QsQ0FBQyxHQUFHQyxNQUFYLEVBQW1CRCxDQUFDLEVBQXBCLEVBQXdCO0FBQ3RCLFFBQUksQ0FBQzJDLEdBQUcsR0FBR3VNLFNBQVMsQ0FBQ2xQLENBQUQsQ0FBaEIsTUFBeUIsSUFBN0IsRUFBbUM7QUFDakMsV0FBSzBGLElBQUwsSUFBYS9DLEdBQWIsRUFBa0I7QUFDaEJxTSxZQUFJLEdBQUdyTSxHQUFHLENBQUMrQyxJQUFELENBQVY7O0FBRUEsWUFBSXVKLE1BQU0sS0FBS0QsSUFBZixFQUFxQjtBQUNuQjtBQUNELFNBRkQsTUFFTyxJQUFJQSxJQUFJLEtBQUsvTSxTQUFiLEVBQXdCO0FBQzdCZ04sZ0JBQU0sQ0FBQ3ZKLElBQUQsQ0FBTixHQUFlc0osSUFBZjtBQUNEO0FBQ0Y7QUFDRjtBQUNGOztBQUNELFNBQU9DLE1BQVA7QUFDRCxDOzs7Ozs7Ozs7Ozs7QUNwQkQ7QUFBQTtBQUFBO0FBQ08sU0FBUzVKLE9BQVQsQ0FBa0I0RyxHQUFsQixFQUF1QmtELFFBQXZCLEVBQWlDQyxLQUFqQyxFQUF3QztBQUM3QyxPQUFLLElBQUlwUCxDQUFDLEdBQUcsQ0FBUixFQUFXa00sQ0FBQyxHQUFHRCxHQUFHLENBQUNoTSxNQUF4QixFQUFnQ0QsQ0FBQyxHQUFHa00sQ0FBcEMsRUFBdUNsTSxDQUFDLEVBQXhDLEVBQTRDO0FBQzFDbVAsWUFBUSxDQUFDL0ssSUFBVCxDQUFjZ0wsS0FBZCxFQUFxQm5ELEdBQUcsQ0FBQ2pNLENBQUQsQ0FBeEIsRUFBNkJBLENBQTdCO0FBQ0Q7QUFDRixDOzs7Ozs7Ozs7Ozs7QUNMRDtBQUFBO0FBQU8sU0FBU3FQLE9BQVQsQ0FBaUJsRSxFQUFqQixFQUFxQm1FLElBQXJCLEVBQTJCO0FBQ2hDLFNBQU9uRSxFQUFFLENBQUM3SyxZQUFILENBQWdCZ1AsSUFBaEIsQ0FBUDtBQUNELEM7Ozs7Ozs7Ozs7OztBQ0ZEO0FBQUE7QUFBTyxTQUFTMUMsT0FBVCxHQUFvQjtBQUN6QixNQUFJRixHQUFHLEdBQUc1TSxRQUFWO0FBQUEsTUFDSTZNLElBQUksR0FBR0QsR0FBRyxDQUFDQyxJQURmOztBQUdBLE1BQUksQ0FBQ0EsSUFBTCxFQUFXO0FBQ1RBLFFBQUksR0FBR0QsR0FBRyxDQUFDTSxhQUFKLENBQWtCLE1BQWxCLENBQVA7QUFDQUwsUUFBSSxDQUFDYyxJQUFMLEdBQVksSUFBWjtBQUNEOztBQUVELFNBQU9kLElBQVA7QUFDRCxDOzs7Ozs7Ozs7Ozs7QUNWRDtBQUFBO0FBQU8sU0FBUzRDLGlCQUFULENBQTJCNUUsS0FBM0IsRUFBa0M7QUFDdkMsTUFBSTZFLElBQUksR0FBSSxnQkFBZ0I3RSxLQUFqQixHQUEwQkEsS0FBSyxDQUFDOEUsUUFBaEMsR0FBMkM5RSxLQUFLLENBQUNFLEtBQTVEO0FBQ0EsU0FBTzJFLElBQUksQ0FBQ3ZQLE1BQVo7QUFDRCxDOzs7Ozs7Ozs7Ozs7QUNIRDtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDTyxTQUFTeVAsY0FBVCxDQUF3QkMsTUFBeEIsRUFBZ0NDLE9BQWhDLEVBQXlDO0FBQzlDLE1BQUlDLE9BQU8sR0FBRyxLQUFkOztBQUNBLE1BQUksVUFBVUMsSUFBVixDQUFlSCxNQUFmLENBQUosRUFBNEI7QUFDMUJFLFdBQU8sR0FBRyxXQUFXRCxPQUFYLEdBQXFCLEtBQS9CO0FBQ0QsR0FGRCxNQUVPLElBQUksS0FBS0UsSUFBTCxDQUFVSCxNQUFWLENBQUosRUFBdUI7QUFDNUJFLFdBQU8sR0FBRyxNQUFNRCxPQUFOLEdBQWdCLEtBQTFCO0FBQ0QsR0FGTSxNQUVBLElBQUlELE1BQUosRUFBWTtBQUNqQkUsV0FBTyxHQUFHRCxPQUFPLENBQUNHLFdBQVIsS0FBd0IsS0FBbEM7QUFDRDs7QUFDRCxTQUFPRixPQUFQO0FBQ0QsQzs7Ozs7Ozs7Ozs7O0FDZEQ7QUFBQTtBQUFPLFNBQVNHLFVBQVQsR0FBc0I7QUFDM0IsTUFBSXpELEVBQUUsR0FBRy9NLE1BQU0sQ0FBQ3lRLEtBQWhCO0FBQ0F6USxRQUFNLENBQUN5USxLQUFQLEdBQWUsQ0FBQzFELEVBQUQsR0FBTSxDQUFOLEdBQVVBLEVBQUUsR0FBRyxDQUE5QjtBQUVBLFNBQU8sUUFBUS9NLE1BQU0sQ0FBQ3lRLEtBQXRCO0FBQ0QsQzs7Ozs7Ozs7Ozs7O0FDTEQ7QUFBQTtBQUFPLFNBQVNDLGlCQUFULENBQTJCQyxLQUEzQixFQUFrQ0MsS0FBbEMsRUFBeUM7QUFDOUMsTUFBSUMsU0FBUyxHQUFHLEtBQWhCO0FBQUEsTUFDSUMsR0FBRyxHQUFHQyxJQUFJLENBQUNDLEdBQUwsQ0FBUyxLQUFLRCxJQUFJLENBQUNDLEdBQUwsQ0FBU0wsS0FBVCxDQUFkLENBRFY7O0FBR0EsTUFBSUcsR0FBRyxJQUFJLEtBQUtGLEtBQWhCLEVBQXVCO0FBQ3JCQyxhQUFTLEdBQUcsWUFBWjtBQUNELEdBRkQsTUFFTyxJQUFJQyxHQUFHLElBQUlGLEtBQVgsRUFBa0I7QUFDdkJDLGFBQVMsR0FBRyxVQUFaO0FBQ0Q7O0FBRUQsU0FBT0EsU0FBUDtBQUNELEM7Ozs7Ozs7Ozs7OztBQ1hEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFFTyxTQUFTSSxlQUFULENBQXlCQyxFQUF6QixFQUE0QjtBQUNqQyxNQUFJLENBQUNBLEVBQUwsRUFBUztBQUFFLFdBQU8sS0FBUDtBQUFlOztBQUMxQixNQUFJLENBQUNsUixNQUFNLENBQUNtUixnQkFBWixFQUE4QjtBQUFFLFdBQU8sS0FBUDtBQUFlOztBQUUvQyxNQUFJakUsR0FBRyxHQUFHNU0sUUFBVjtBQUFBLE1BQ0k2TSxJQUFJLEdBQUdDLDJEQUFPLEVBRGxCO0FBQUEsTUFFSUMsV0FBVyxHQUFHQyxtRUFBVyxDQUFDSCxJQUFELENBRjdCO0FBQUEsTUFHSXhCLEVBQUUsR0FBR3VCLEdBQUcsQ0FBQ00sYUFBSixDQUFrQixHQUFsQixDQUhUO0FBQUEsTUFJSTRELEtBSko7QUFBQSxNQUtJQyxLQUFLLEdBQUdILEVBQUUsQ0FBQ3pRLE1BQUgsR0FBWSxDQUFaLEdBQWdCLE1BQU15USxFQUFFLENBQUNwSCxLQUFILENBQVMsQ0FBVCxFQUFZLENBQUMsQ0FBYixFQUFnQnlHLFdBQWhCLEVBQU4sR0FBc0MsR0FBdEQsR0FBNEQsRUFMeEU7QUFPQWMsT0FBSyxJQUFJLFdBQVQsQ0FYaUMsQ0FhakM7O0FBQ0FsRSxNQUFJLENBQUNtRSxZQUFMLENBQWtCM0YsRUFBbEIsRUFBc0IsSUFBdEI7QUFFQUEsSUFBRSxDQUFDaUMsS0FBSCxDQUFTc0QsRUFBVCxJQUFlLDBCQUFmO0FBQ0FFLE9BQUssR0FBR3BSLE1BQU0sQ0FBQ21SLGdCQUFQLENBQXdCeEYsRUFBeEIsRUFBNEI0RixnQkFBNUIsQ0FBNkNGLEtBQTdDLENBQVI7QUFFQWxFLE1BQUksQ0FBQ2MsSUFBTCxHQUFZQyx1RUFBYSxDQUFDZixJQUFELEVBQU9FLFdBQVAsQ0FBekIsR0FBK0MxQixFQUFFLENBQUN3QyxNQUFILEVBQS9DO0FBRUEsU0FBUWlELEtBQUssS0FBSzNPLFNBQVYsSUFBdUIyTyxLQUFLLENBQUMzUSxNQUFOLEdBQWUsQ0FBdEMsSUFBMkMyUSxLQUFLLEtBQUssTUFBN0Q7QUFDRCxDOzs7Ozs7Ozs7Ozs7QUMxQkQ7QUFBQTtBQUFPLFNBQVNJLE9BQVQsQ0FBaUI3RixFQUFqQixFQUFxQm1FLElBQXJCLEVBQTJCO0FBQ2hDLFNBQU9uRSxFQUFFLENBQUM4RixZQUFILENBQWdCM0IsSUFBaEIsQ0FBUDtBQUNELEM7Ozs7Ozs7Ozs7OztBQ0ZEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBLElBQUlqRSxRQUFRLEdBQUdILHFFQUFnQixHQUMzQixVQUFVQyxFQUFWLEVBQWNDLEdBQWQsRUFBbUI7QUFBRSxTQUFPRCxFQUFFLENBQUNHLFNBQUgsQ0FBYTRGLFFBQWIsQ0FBc0I5RixHQUF0QixDQUFQO0FBQW9DLENBRDlCLEdBRTNCLFVBQVVELEVBQVYsRUFBY0MsR0FBZCxFQUFtQjtBQUFFLFNBQU9ELEVBQUUsQ0FBQ0ssU0FBSCxDQUFhSyxPQUFiLENBQXFCVCxHQUFyQixLQUE2QixDQUFwQztBQUF3QyxDQUZqRTs7Ozs7Ozs7Ozs7OztBQ0ZBO0FBQUE7QUFBTyxTQUFTK0YsV0FBVCxDQUFxQmhHLEVBQXJCLEVBQXlCaUcsU0FBekIsRUFBb0M7QUFDekMsTUFBSWpHLEVBQUUsQ0FBQ2lDLEtBQUgsQ0FBU2lFLE9BQVQsS0FBcUIsTUFBekIsRUFBaUM7QUFBRWxHLE1BQUUsQ0FBQ2lDLEtBQUgsQ0FBU2lFLE9BQVQsR0FBbUIsTUFBbkI7QUFBNEI7QUFDaEUsQzs7Ozs7Ozs7Ozs7O0FDRkQ7QUFBQTtBQUFPLFNBQVNDLFVBQVQsQ0FBb0JuRyxFQUFwQixFQUF3QjtBQUM3QjtBQUNBLFNBQU8sT0FBT0EsRUFBRSxDQUFDb0csSUFBVixLQUFtQixXQUExQjtBQUNELEM7Ozs7Ozs7Ozs7OztBQ0hEO0FBQUE7QUFBTyxTQUFTQyxTQUFULENBQW1CckcsRUFBbkIsRUFBdUI7QUFDNUIsU0FBTzNMLE1BQU0sQ0FBQ21SLGdCQUFQLENBQXdCeEYsRUFBeEIsRUFBNEJrRyxPQUE1QixLQUF3QyxNQUEvQztBQUNELEM7Ozs7Ozs7Ozs7OztBQ0ZEO0FBQUE7QUFBTyxTQUFTSSxXQUFULENBQXFCQyxPQUFyQixFQUE4QnBDLElBQTlCLEVBQW9DcUMsTUFBcEMsRUFBNENDLE9BQTVDLEVBQXFEQyxFQUFyRCxFQUF5REMsUUFBekQsRUFBbUUzQyxRQUFuRSxFQUE2RTtBQUNsRixNQUFJNEMsSUFBSSxHQUFHeEIsSUFBSSxDQUFDeUIsR0FBTCxDQUFTRixRQUFULEVBQW1CLEVBQW5CLENBQVg7QUFBQSxNQUNJRyxJQUFJLEdBQUlKLEVBQUUsQ0FBQ2hHLE9BQUgsQ0FBVyxHQUFYLEtBQW1CLENBQXBCLEdBQXlCLEdBQXpCLEdBQStCLElBRDFDO0FBQUEsTUFFSWdHLEVBQUUsR0FBR0EsRUFBRSxDQUFDdEUsT0FBSCxDQUFXMEUsSUFBWCxFQUFpQixFQUFqQixDQUZUO0FBQUEsTUFHSUMsSUFBSSxHQUFHQyxNQUFNLENBQUNULE9BQU8sQ0FBQ3RFLEtBQVIsQ0FBY2tDLElBQWQsRUFBb0IvQixPQUFwQixDQUE0Qm9FLE1BQTVCLEVBQW9DLEVBQXBDLEVBQXdDcEUsT0FBeEMsQ0FBZ0RxRSxPQUFoRCxFQUF5RCxFQUF6RCxFQUE2RHJFLE9BQTdELENBQXFFMEUsSUFBckUsRUFBMkUsRUFBM0UsQ0FBRCxDQUhqQjtBQUFBLE1BSUlHLFlBQVksR0FBRyxDQUFDUCxFQUFFLEdBQUdLLElBQU4sSUFBY0osUUFBZCxHQUF5QkMsSUFKNUM7QUFBQSxNQUtJTSxPQUxKO0FBT0FDLFlBQVUsQ0FBQ0MsV0FBRCxFQUFjUixJQUFkLENBQVY7O0FBQ0EsV0FBU1EsV0FBVCxHQUF1QjtBQUNyQlQsWUFBUSxJQUFJQyxJQUFaO0FBQ0FHLFFBQUksSUFBSUUsWUFBUjtBQUNBVixXQUFPLENBQUN0RSxLQUFSLENBQWNrQyxJQUFkLElBQXNCcUMsTUFBTSxHQUFHTyxJQUFULEdBQWdCRCxJQUFoQixHQUF1QkwsT0FBN0M7O0FBQ0EsUUFBSUUsUUFBUSxHQUFHLENBQWYsRUFBa0I7QUFDaEJRLGdCQUFVLENBQUNDLFdBQUQsRUFBY1IsSUFBZCxDQUFWO0FBQ0QsS0FGRCxNQUVPO0FBQ0w1QyxjQUFRO0FBQ1Q7QUFDRjtBQUNGLEM7Ozs7Ozs7Ozs7OztBQ25CRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRU8sU0FBU3FELGlCQUFULEdBQThCO0FBQ25DLE1BQUloVCxNQUFNLENBQUNpVCxVQUFQLElBQXFCalQsTUFBTSxDQUFDa1QsWUFBaEMsRUFBOEM7QUFDNUMsV0FBTyxJQUFQO0FBQ0Q7O0FBRUQsTUFBSWhHLEdBQUcsR0FBRzVNLFFBQVY7QUFBQSxNQUNJNk0sSUFBSSxHQUFHQywyREFBTyxFQURsQjtBQUFBLE1BRUlDLFdBQVcsR0FBR0MsbUVBQVcsQ0FBQ0gsSUFBRCxDQUY3QjtBQUFBLE1BR0lJLEdBQUcsR0FBR0wsR0FBRyxDQUFDTSxhQUFKLENBQWtCLEtBQWxCLENBSFY7QUFBQSxNQUlJSSxLQUFLLEdBQUdWLEdBQUcsQ0FBQ00sYUFBSixDQUFrQixPQUFsQixDQUpaO0FBQUEsTUFLSXdDLElBQUksR0FBRyxpRUFMWDtBQUFBLE1BTUltRCxRQU5KO0FBUUF2RixPQUFLLENBQUNqSixJQUFOLEdBQWEsVUFBYjtBQUNBNEksS0FBRyxDQUFDdkIsU0FBSixHQUFnQixhQUFoQjtBQUVBbUIsTUFBSSxDQUFDTSxXQUFMLENBQWlCRyxLQUFqQjtBQUNBVCxNQUFJLENBQUNNLFdBQUwsQ0FBaUJGLEdBQWpCOztBQUVBLE1BQUlLLEtBQUssQ0FBQ2dCLFVBQVYsRUFBc0I7QUFDcEJoQixTQUFLLENBQUNnQixVQUFOLENBQWlCd0UsT0FBakIsR0FBMkJwRCxJQUEzQjtBQUNELEdBRkQsTUFFTztBQUNMcEMsU0FBSyxDQUFDSCxXQUFOLENBQWtCUCxHQUFHLENBQUNtRyxjQUFKLENBQW1CckQsSUFBbkIsQ0FBbEI7QUFDRDs7QUFFRG1ELFVBQVEsR0FBR25ULE1BQU0sQ0FBQ21SLGdCQUFQLEdBQTBCblIsTUFBTSxDQUFDbVIsZ0JBQVAsQ0FBd0I1RCxHQUF4QixFQUE2QjRGLFFBQXZELEdBQWtFNUYsR0FBRyxDQUFDK0YsWUFBSixDQUFpQixVQUFqQixDQUE3RTtBQUVBbkcsTUFBSSxDQUFDYyxJQUFMLEdBQVlDLHVFQUFhLENBQUNmLElBQUQsRUFBT0UsV0FBUCxDQUF6QixHQUErQ0UsR0FBRyxDQUFDWSxNQUFKLEVBQS9DO0FBRUEsU0FBT2dGLFFBQVEsS0FBSyxVQUFwQjtBQUNELEM7Ozs7Ozs7Ozs7OztBQ2xDRDtBQUFBO0FBQUE7QUFDQSxJQUFJSSxlQUFlLEdBQUcsS0FBdEI7O0FBQ0EsSUFBSTtBQUNGLE1BQUlDLElBQUksR0FBR25SLE1BQU0sQ0FBQ2lCLGNBQVAsQ0FBc0IsRUFBdEIsRUFBMEIsU0FBMUIsRUFBcUM7QUFDOUNtUSxPQUFHLEVBQUUsZUFBVztBQUNkRixxQkFBZSxHQUFHLElBQWxCO0FBQ0Q7QUFINkMsR0FBckMsQ0FBWDtBQUtBdlQsUUFBTSxDQUFDaUMsZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0MsSUFBaEMsRUFBc0N1UixJQUF0QztBQUNELENBUEQsQ0FPRSxPQUFPeEYsQ0FBUCxFQUFVLENBQUU7O0FBQ1AsSUFBSTFCLGFBQWEsR0FBR2lILGVBQWUsR0FBRztBQUFFRyxTQUFPLEVBQUU7QUFBWCxDQUFILEdBQXVCLEtBQTFELEM7Ozs7Ozs7Ozs7OztBQ1ZQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRU8sU0FBU0MsZ0JBQVQsR0FBNEI7QUFDakM7QUFDQSxNQUFJekcsR0FBRyxHQUFHNU0sUUFBVjtBQUFBLE1BQ0k2TSxJQUFJLEdBQUdDLDJEQUFPLEVBRGxCO0FBQUEsTUFFSUMsV0FBVyxHQUFHQyxtRUFBVyxDQUFDSCxJQUFELENBRjdCO0FBQUEsTUFHSXlHLE9BQU8sR0FBRzFHLEdBQUcsQ0FBQ00sYUFBSixDQUFrQixLQUFsQixDQUhkO0FBQUEsTUFJSXFHLEtBQUssR0FBRzNHLEdBQUcsQ0FBQ00sYUFBSixDQUFrQixLQUFsQixDQUpaO0FBQUEsTUFLSTVCLEdBQUcsR0FBRyxFQUxWO0FBQUEsTUFNSWtJLEtBQUssR0FBRyxFQU5aO0FBQUEsTUFPSUMsT0FBTyxHQUFHLENBUGQ7QUFBQSxNQVFJQyxTQUFTLEdBQUcsS0FSaEI7QUFVQUosU0FBTyxDQUFDNUgsU0FBUixHQUFvQixhQUFwQjtBQUNBNkgsT0FBSyxDQUFDN0gsU0FBTixHQUFrQixVQUFsQjs7QUFFQSxPQUFLLElBQUl4TCxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHc1QsS0FBcEIsRUFBMkJ0VCxDQUFDLEVBQTVCLEVBQWdDO0FBQzlCb0wsT0FBRyxJQUFJLGFBQVA7QUFDRDs7QUFFRGlJLE9BQUssQ0FBQ0ksU0FBTixHQUFrQnJJLEdBQWxCO0FBQ0FnSSxTQUFPLENBQUNuRyxXQUFSLENBQW9Cb0csS0FBcEI7QUFDQTFHLE1BQUksQ0FBQ00sV0FBTCxDQUFpQm1HLE9BQWpCO0FBRUFJLFdBQVMsR0FBR2pELElBQUksQ0FBQ0MsR0FBTCxDQUFTNEMsT0FBTyxDQUFDTSxxQkFBUixHQUFnQ0MsSUFBaEMsR0FBdUNOLEtBQUssQ0FBQ08sUUFBTixDQUFlTixLQUFLLEdBQUdDLE9BQXZCLEVBQWdDRyxxQkFBaEMsR0FBd0RDLElBQXhHLElBQWdILENBQTVIO0FBRUFoSCxNQUFJLENBQUNjLElBQUwsR0FBWUMsdUVBQWEsQ0FBQ2YsSUFBRCxFQUFPRSxXQUFQLENBQXpCLEdBQStDdUcsT0FBTyxDQUFDekYsTUFBUixFQUEvQztBQUVBLFNBQU82RixTQUFQO0FBQ0QsQzs7Ozs7Ozs7Ozs7O0FDbENEO0FBQUE7QUFBQSxJQUFJckgsR0FBRyxHQUFHM00sTUFBVjtBQUVPLElBQUlxVSxHQUFHLEdBQUcxSCxHQUFHLENBQUMySCxxQkFBSixJQUNaM0gsR0FBRyxDQUFDNEgsMkJBRFEsSUFFWjVILEdBQUcsQ0FBQzZILHdCQUZRLElBR1o3SCxHQUFHLENBQUM4SCx1QkFIUSxJQUlaLFVBQVNDLEVBQVQsRUFBYTtBQUFFLFNBQU81QixVQUFVLENBQUM0QixFQUFELEVBQUssRUFBTCxDQUFqQjtBQUE0QixDQUp6QyxDOzs7Ozs7Ozs7Ozs7QUNGUDtBQUFBO0FBQUE7QUFBQTtBQUVPLFNBQVNDLFdBQVQsQ0FBcUJDLEdBQXJCLEVBQTBCQyxLQUExQixFQUFpQztBQUN0Q0QsS0FBRyxHQUFJOUMsaUVBQVUsQ0FBQzhDLEdBQUQsQ0FBVixJQUFtQkEsR0FBRyxZQUFZRSxLQUFuQyxHQUE0Q0YsR0FBNUMsR0FBa0QsQ0FBQ0EsR0FBRCxDQUF4RDtBQUNBQyxPQUFLLEdBQUlBLEtBQUssWUFBWUMsS0FBbEIsR0FBMkJELEtBQTNCLEdBQW1DLENBQUNBLEtBQUQsQ0FBM0M7QUFFQSxNQUFJRSxVQUFVLEdBQUdGLEtBQUssQ0FBQ3BVLE1BQXZCOztBQUNBLE9BQUssSUFBSUQsQ0FBQyxHQUFHb1UsR0FBRyxDQUFDblUsTUFBakIsRUFBeUJELENBQUMsRUFBMUIsR0FBK0I7QUFDN0IsU0FBSyxJQUFJd1UsQ0FBQyxHQUFHRCxVQUFiLEVBQXlCQyxDQUFDLEVBQTFCLEdBQStCO0FBQzdCSixTQUFHLENBQUNwVSxDQUFELENBQUgsQ0FBT3lVLGVBQVAsQ0FBdUJKLEtBQUssQ0FBQ0csQ0FBRCxDQUE1QjtBQUNEO0FBQ0Y7QUFDRixDOzs7Ozs7Ozs7Ozs7QUNaRDtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ08sU0FBU0UsYUFBVCxDQUF1Qi9KLEtBQXZCLEVBQThCRyxLQUE5QixFQUFxQztBQUMxQztBQUNFLGtCQUFnQkgsS0FBaEIsR0FDRUEsS0FBSyxDQUFDZ0ssVUFBTixDQUFpQjdKLEtBQWpCLENBREYsR0FFRUgsS0FBSyxDQUFDaUssVUFBTixDQUFpQjlKLEtBQWpCLENBRkYsQ0FGd0MsQ0FLMUM7QUFDRCxDOzs7Ozs7Ozs7Ozs7QUNSRDtBQUFBO0FBQUE7QUFBQTtBQUNBLElBQUkrSixXQUFXLEdBQUczSiw2REFBZ0IsR0FDOUIsVUFBVUMsRUFBVixFQUFjQyxHQUFkLEVBQW1CO0FBQ2pCLE1BQUlDLDZEQUFRLENBQUNGLEVBQUQsRUFBTUMsR0FBTixDQUFaLEVBQXdCO0FBQUVELE1BQUUsQ0FBQ0csU0FBSCxDQUFhcUMsTUFBYixDQUFvQnZDLEdBQXBCO0FBQTJCO0FBQ3RELENBSDZCLEdBSTlCLFVBQVVELEVBQVYsRUFBY0MsR0FBZCxFQUFtQjtBQUNqQixNQUFJQyw2REFBUSxDQUFDRixFQUFELEVBQUtDLEdBQUwsQ0FBWixFQUF1QjtBQUFFRCxNQUFFLENBQUNLLFNBQUgsR0FBZUwsRUFBRSxDQUFDSyxTQUFILENBQWErQixPQUFiLENBQXFCbkMsR0FBckIsRUFBMEIsRUFBMUIsQ0FBZjtBQUErQztBQUN6RSxDQU5MOzs7Ozs7Ozs7Ozs7O0FDREE7QUFBQTtBQUFBO0FBQUE7QUFFTyxTQUFTMEosWUFBVCxDQUFzQjNKLEVBQXRCLEVBQTBCeEksR0FBMUIsRUFBK0I7QUFDcEMsT0FBSyxJQUFJZ0osSUFBVCxJQUFpQmhKLEdBQWpCLEVBQXNCO0FBQ3BCLFFBQUlpSixNQUFNLEdBQUcsQ0FBQyxZQUFELEVBQWUsV0FBZixFQUE0QkMsT0FBNUIsQ0FBb0NGLElBQXBDLEtBQTZDLENBQTdDLEdBQWlERywrREFBakQsR0FBaUUsS0FBOUU7QUFDQVgsTUFBRSxDQUFDNEosbUJBQUgsQ0FBdUJwSixJQUF2QixFQUE2QmhKLEdBQUcsQ0FBQ2dKLElBQUQsQ0FBaEMsRUFBd0NDLE1BQXhDO0FBQ0Q7QUFDRixDOzs7Ozs7Ozs7Ozs7QUNQRDtBQUFBO0FBQUE7QUFBQTtBQUVPLFNBQVM4QixhQUFULENBQXdCZixJQUF4QixFQUE4QkUsV0FBOUIsRUFBMkM7QUFDaEQsTUFBSUYsSUFBSSxDQUFDYyxJQUFULEVBQWU7QUFDYmQsUUFBSSxDQUFDZ0IsTUFBTDtBQUNBVSw2REFBVSxDQUFDakIsS0FBWCxDQUFpQjRILFFBQWpCLEdBQTRCbkksV0FBNUIsQ0FGYSxDQUdiO0FBQ0E7O0FBQ0F3Qiw2REFBVSxDQUFDNEcsWUFBWDtBQUNEO0FBQ0YsQzs7Ozs7Ozs7Ozs7O0FDVkQ7QUFBQTtBQUFBO0FBQUE7QUFFTyxTQUFTQyxRQUFULENBQWtCZCxHQUFsQixFQUF1QkMsS0FBdkIsRUFBOEI7QUFDbkNELEtBQUcsR0FBSTlDLGlFQUFVLENBQUM4QyxHQUFELENBQVYsSUFBbUJBLEdBQUcsWUFBWUUsS0FBbkMsR0FBNENGLEdBQTVDLEdBQWtELENBQUNBLEdBQUQsQ0FBeEQ7O0FBQ0EsTUFBSXZTLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQmtHLFFBQWpCLENBQTBCNUQsSUFBMUIsQ0FBK0JpUSxLQUEvQixNQUEwQyxpQkFBOUMsRUFBaUU7QUFBRTtBQUFTOztBQUU1RSxPQUFLLElBQUlyVSxDQUFDLEdBQUdvVSxHQUFHLENBQUNuVSxNQUFqQixFQUF5QkQsQ0FBQyxFQUExQixHQUErQjtBQUM3QixTQUFJLElBQUk0QyxHQUFSLElBQWV5UixLQUFmLEVBQXNCO0FBQ3BCRCxTQUFHLENBQUNwVSxDQUFELENBQUgsQ0FBT2tPLFlBQVAsQ0FBb0J0TCxHQUFwQixFQUF5QnlSLEtBQUssQ0FBQ3pSLEdBQUQsQ0FBOUI7QUFDRDtBQUNGO0FBQ0YsQzs7Ozs7Ozs7Ozs7O0FDWEQ7QUFBQTtBQUFBO0FBQUE7QUFFTyxTQUFTa0ssV0FBVCxDQUFzQkgsSUFBdEIsRUFBNEI7QUFDakMsTUFBSUUsV0FBVyxHQUFHLEVBQWxCOztBQUNBLE1BQUlGLElBQUksQ0FBQ2MsSUFBVCxFQUFlO0FBQ2JaLGVBQVcsR0FBR3dCLHlEQUFVLENBQUNqQixLQUFYLENBQWlCNEgsUUFBL0IsQ0FEYSxDQUViOztBQUNBckksUUFBSSxDQUFDUyxLQUFMLENBQVcrSCxVQUFYLEdBQXdCLEVBQXhCLENBSGEsQ0FJYjs7QUFDQXhJLFFBQUksQ0FBQ1MsS0FBTCxDQUFXNEgsUUFBWCxHQUFzQjNHLHlEQUFVLENBQUNqQixLQUFYLENBQWlCNEgsUUFBakIsR0FBNEIsUUFBbEQ7QUFDQTNHLDZEQUFVLENBQUNwQixXQUFYLENBQXVCTixJQUF2QjtBQUNEOztBQUVELFNBQU9FLFdBQVA7QUFDRCxDOzs7Ozs7Ozs7Ozs7QUNkRDtBQUFBO0FBQU8sU0FBU3VJLGVBQVQsQ0FBeUJDLE9BQXpCLEVBQWtDelMsR0FBbEMsRUFBdUNDLEtBQXZDLEVBQThDeVMsTUFBOUMsRUFBc0Q7QUFDM0QsTUFBSUEsTUFBSixFQUFZO0FBQ1YsUUFBSTtBQUFFRCxhQUFPLENBQUNFLE9BQVIsQ0FBZ0IzUyxHQUFoQixFQUFxQkMsS0FBckI7QUFBOEIsS0FBcEMsQ0FBcUMsT0FBTzJLLENBQVAsRUFBVSxDQUFFO0FBQ2xEOztBQUNELFNBQU8zSyxLQUFQO0FBQ0QsQzs7Ozs7Ozs7Ozs7O0FDTEQ7QUFBQTtBQUFPLFNBQVMyUyxXQUFULENBQXFCckssRUFBckIsRUFBeUJpRyxTQUF6QixFQUFvQztBQUN6QyxNQUFJakcsRUFBRSxDQUFDaUMsS0FBSCxDQUFTaUUsT0FBVCxLQUFxQixNQUF6QixFQUFpQztBQUFFbEcsTUFBRSxDQUFDaUMsS0FBSCxDQUFTaUUsT0FBVCxHQUFtQixFQUFuQjtBQUF3QjtBQUM1RCxDOzs7Ozs7Ozs7Ozs7QUNGRDtBQUFBO0FBQU8sU0FBU29FLFFBQVQsQ0FBbUJDLENBQW5CLEVBQXNCQyxDQUF0QixFQUF5QjtBQUM5QixTQUFPcEYsSUFBSSxDQUFDcUYsS0FBTCxDQUFXRixDQUFYLEVBQWNDLENBQWQsS0FBb0IsTUFBTXBGLElBQUksQ0FBQ3NGLEVBQS9CLENBQVA7QUFDRCxDOzs7Ozs7Ozs7Ozs7QUNGRDtBQUFBO0FBQU8sU0FBU0MsYUFBVCxDQUF1QkMsS0FBdkIsRUFBNkI7QUFDbEMsTUFBSSxPQUFPQSxLQUFQLEtBQWlCLFFBQXJCLEVBQStCO0FBQzdCLFFBQUk5SixHQUFHLEdBQUcsQ0FBQzhKLEtBQUQsQ0FBVjtBQUFBLFFBQ0lDLEtBQUssR0FBR0QsS0FBSyxDQUFDdFYsTUFBTixDQUFhLENBQWIsRUFBZ0J3VixXQUFoQixLQUFnQ0YsS0FBSyxDQUFDRyxNQUFOLENBQWEsQ0FBYixDQUQ1QztBQUFBLFFBRUlDLFFBQVEsR0FBRyxDQUFDLFFBQUQsRUFBVyxLQUFYLEVBQWtCLElBQWxCLEVBQXdCLEdBQXhCLENBRmY7QUFJQUEsWUFBUSxDQUFDOVEsT0FBVCxDQUFpQixVQUFTc00sTUFBVCxFQUFpQjtBQUNoQyxVQUFJQSxNQUFNLEtBQUssSUFBWCxJQUFtQm9FLEtBQUssS0FBSyxXQUFqQyxFQUE4QztBQUM1QzlKLFdBQUcsQ0FBQ3hELElBQUosQ0FBU2tKLE1BQU0sR0FBR3FFLEtBQWxCO0FBQ0Q7QUFDRixLQUpEO0FBTUFELFNBQUssR0FBRzlKLEdBQVI7QUFDRDs7QUFFRCxNQUFJZCxFQUFFLEdBQUdyTCxRQUFRLENBQUNrTixhQUFULENBQXVCLGFBQXZCLENBQVQ7QUFBQSxNQUNJb0osR0FBRyxHQUFHTCxLQUFLLENBQUM5VixNQURoQjs7QUFFQSxPQUFJLElBQUlELENBQUMsR0FBRyxDQUFaLEVBQWVBLENBQUMsR0FBRytWLEtBQUssQ0FBQzlWLE1BQXpCLEVBQWlDRCxDQUFDLEVBQWxDLEVBQXFDO0FBQ25DLFFBQUkyTCxJQUFJLEdBQUdvSyxLQUFLLENBQUMvVixDQUFELENBQWhCOztBQUNBLFFBQUltTCxFQUFFLENBQUNpQyxLQUFILENBQVN6QixJQUFULE1BQW1CMUosU0FBdkIsRUFBa0M7QUFBRSxhQUFPMEosSUFBUDtBQUFjO0FBQ25EOztBQUVELFNBQU8sS0FBUCxDQXRCa0MsQ0FzQnBCO0FBQ2YsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2QkQ7QUFDQSxJQUFJLENBQUM5SixNQUFNLENBQUNnSCxJQUFaLEVBQWtCO0FBQ2hCaEgsUUFBTSxDQUFDZ0gsSUFBUCxHQUFjLFVBQVNDLE1BQVQsRUFBaUI7QUFDN0IsUUFBSUQsSUFBSSxHQUFHLEVBQVg7O0FBQ0EsU0FBSyxJQUFJbkQsSUFBVCxJQUFpQm9ELE1BQWpCLEVBQXlCO0FBQ3ZCLFVBQUlqSCxNQUFNLENBQUNDLFNBQVAsQ0FBaUJFLGNBQWpCLENBQWdDb0MsSUFBaEMsQ0FBcUMwRSxNQUFyQyxFQUE2Q3BELElBQTdDLENBQUosRUFBd0Q7QUFDdERtRCxZQUFJLENBQUNKLElBQUwsQ0FBVS9DLElBQVY7QUFDRDtBQUNGOztBQUNELFdBQU9tRCxJQUFQO0FBQ0QsR0FSRDtBQVNELEMsQ0FFRDs7O0FBQ0EsSUFBRyxFQUFFLFlBQVl3TixPQUFPLENBQUN2VSxTQUF0QixDQUFILEVBQW9DO0FBQ2xDdVUsU0FBTyxDQUFDdlUsU0FBUixDQUFrQjZMLE1BQWxCLEdBQTJCLFlBQVU7QUFDbkMsUUFBRyxLQUFLMkksVUFBUixFQUFvQjtBQUNsQixXQUFLQSxVQUFMLENBQWdCQyxXQUFoQixDQUE0QixJQUE1QjtBQUNEO0FBQ0YsR0FKRDtBQUtEOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRU8sSUFBSTlXLEdBQUcsR0FBRyxTQUFOQSxHQUFNLENBQVMrVyxPQUFULEVBQWtCO0FBQ2pDQSxTQUFPLEdBQUd6SCxpRUFBTSxDQUFDO0FBQ2ZsTyxhQUFTLEVBQUUsU0FESTtBQUVmNFYsUUFBSSxFQUFFLFVBRlM7QUFHZkMsUUFBSSxFQUFFLFlBSFM7QUFJZjNWLFNBQUssRUFBRSxDQUpRO0FBS2ZDLFVBQU0sRUFBRSxDQUxPO0FBTWZOLGVBQVcsRUFBRSxDQU5FO0FBT2ZpVyxjQUFVLEVBQUUsS0FQRztBQVFmQyxhQUFTLEVBQUUsS0FSSTtBQVNmQyxlQUFXLEVBQUUsS0FURTtBQVVmQyxXQUFPLEVBQUUsQ0FWTTtBQVdmaFcsVUFBTSxFQUFFLEtBWE87QUFZZlEsWUFBUSxFQUFFLElBWks7QUFhZnlWLG9CQUFnQixFQUFFLEtBYkg7QUFjZnhWLGdCQUFZLEVBQUUsQ0FBQyxNQUFELEVBQVMsTUFBVCxDQWRDO0FBZWZ5VixxQkFBaUIsRUFBRSxLQWZKO0FBZ0JmQyxjQUFVLEVBQUUsS0FoQkc7QUFpQmZDLGNBQVUsRUFBRSxLQWpCRztBQWtCZkMsT0FBRyxFQUFFLElBbEJVO0FBbUJmM1YsZUFBVyxFQUFFLEtBbkJFO0FBb0JmNFYsZ0JBQVksRUFBRSxLQXBCQztBQXFCZkMsbUJBQWUsRUFBRSxLQXJCRjtBQXNCZm5XLGFBQVMsRUFBRSxLQXRCSTtBQXVCZm9XLFNBQUssRUFBRSxHQXZCUTtBQXdCZkMsWUFBUSxFQUFFLEtBeEJLO0FBeUJmQyxvQkFBZ0IsRUFBRSxLQXpCSDtBQTBCZkMsbUJBQWUsRUFBRSxJQTFCRjtBQTJCZkMscUJBQWlCLEVBQUUsU0EzQko7QUE0QmZDLGdCQUFZLEVBQUUsQ0FBQyxPQUFELEVBQVUsTUFBVixDQTVCQztBQTZCZkMsc0JBQWtCLEVBQUUsS0E3Qkw7QUE4QmZDLGtCQUFjLEVBQUUsS0E5QkQ7QUErQmZDLHdCQUFvQixFQUFFLElBL0JQO0FBZ0NmQyw2QkFBeUIsRUFBRSxJQWhDWjtBQWlDZkMsYUFBUyxFQUFFLFlBakNJO0FBa0NmQyxjQUFVLEVBQUUsYUFsQ0c7QUFtQ2ZDLGlCQUFhLEVBQUUsWUFuQ0E7QUFvQ2ZDLGdCQUFZLEVBQUUsS0FwQ0M7QUFxQ2ZsWCxRQUFJLEVBQUUsSUFyQ1M7QUFzQ2ZtWCxVQUFNLEVBQUUsS0F0Q087QUF1Q2ZDLGNBQVUsRUFBRSxLQXZDRztBQXdDZmpYLGNBQVUsRUFBRSxLQXhDRztBQXlDZkQsWUFBUSxFQUFFLEtBekNLO0FBMENmbVgsb0JBQWdCLEVBQUUsZUExQ0g7QUEyQ2ZDLFNBQUssRUFBRSxJQTNDUTtBQTRDZmxYLGFBQVMsRUFBRSxLQTVDSTtBQTZDZm1YLGNBQVUsRUFBRSxFQTdDRztBQThDZkMsVUFBTSxFQUFFLEtBOUNPO0FBK0NmQyw0QkFBd0IsRUFBRSxLQS9DWDtBQWdEZkMsd0JBQW9CLEVBQUUsS0FoRFA7QUFpRGZDLGFBQVMsRUFBRSxJQWpESTtBQWtEZkMsVUFBTSxFQUFFLEtBbERPO0FBbURmQyxtQkFBZSxFQUFFLElBbkRGO0FBb0RmN0ssU0FBSyxFQUFFO0FBcERRLEdBQUQsRUFxRGJ1SSxPQUFPLElBQUksRUFyREUsQ0FBaEI7QUF1REEsTUFBSTlKLEdBQUcsR0FBRzVNLFFBQVY7QUFBQSxNQUNJcU0sR0FBRyxHQUFHM00sTUFEVjtBQUFBLE1BRUl1WixJQUFJLEdBQUc7QUFDTEMsU0FBSyxFQUFFLEVBREY7QUFFTEMsU0FBSyxFQUFFLEVBRkY7QUFHTEMsUUFBSSxFQUFFLEVBSEQ7QUFJTEMsU0FBSyxFQUFFO0FBSkYsR0FGWDtBQUFBLE1BUUlDLFVBQVUsR0FBRyxFQVJqQjtBQUFBLE1BU0lDLGtCQUFrQixHQUFHN0MsT0FBTyxDQUFDc0MsZUFUakM7O0FBV0EsTUFBSU8sa0JBQUosRUFBd0I7QUFDdEI7QUFDQSxRQUFJQyxXQUFXLEdBQUdDLFNBQVMsQ0FBQ0MsU0FBNUI7QUFDQSxRQUFJQyxHQUFHLEdBQUcsSUFBSUMsSUFBSixFQUFWOztBQUVBLFFBQUk7QUFDRk4sZ0JBQVUsR0FBR2pOLEdBQUcsQ0FBQ3dOLFlBQWpCOztBQUNBLFVBQUlQLFVBQUosRUFBZ0I7QUFDZEEsa0JBQVUsQ0FBQzdELE9BQVgsQ0FBbUJrRSxHQUFuQixFQUF3QkEsR0FBeEI7QUFDQUosMEJBQWtCLEdBQUdELFVBQVUsQ0FBQ1EsT0FBWCxDQUFtQkgsR0FBbkIsS0FBMkJBLEdBQWhEO0FBQ0FMLGtCQUFVLENBQUNTLFVBQVgsQ0FBc0JKLEdBQXRCO0FBQ0QsT0FKRCxNQUlPO0FBQ0xKLDBCQUFrQixHQUFHLEtBQXJCO0FBQ0Q7O0FBQ0QsVUFBSSxDQUFDQSxrQkFBTCxFQUF5QjtBQUFFRCxrQkFBVSxHQUFHLEVBQWI7QUFBa0I7QUFDOUMsS0FWRCxDQVVFLE9BQU01TCxDQUFOLEVBQVM7QUFDVDZMLHdCQUFrQixHQUFHLEtBQXJCO0FBQ0Q7O0FBRUQsUUFBSUEsa0JBQUosRUFBd0I7QUFDdEI7QUFDQSxVQUFJRCxVQUFVLENBQUMsUUFBRCxDQUFWLElBQXdCQSxVQUFVLENBQUMsUUFBRCxDQUFWLEtBQXlCRSxXQUFyRCxFQUFrRTtBQUNoRSxTQUFDLElBQUQsRUFBTyxLQUFQLEVBQWMsS0FBZCxFQUFxQixLQUFyQixFQUE0QixLQUE1QixFQUFtQyxNQUFuQyxFQUEyQyxNQUEzQyxFQUFtRCxNQUFuRCxFQUEyRCxNQUEzRCxFQUFtRSxLQUFuRSxFQUEwRSxLQUExRSxFQUFpRmpVLE9BQWpGLENBQXlGLFVBQVNrTSxJQUFULEVBQWU7QUFBRTZILG9CQUFVLENBQUNTLFVBQVgsQ0FBc0J0SSxJQUF0QjtBQUE4QixTQUF4STtBQUNELE9BSnFCLENBS3RCOzs7QUFDQW9JLGtCQUFZLENBQUMsUUFBRCxDQUFaLEdBQXlCTCxXQUF6QjtBQUNEO0FBQ0Y7O0FBRUQsTUFBSVEsSUFBSSxHQUFHVixVQUFVLENBQUMsSUFBRCxDQUFWLEdBQW1CeEwsdUZBQWlCLENBQUN3TCxVQUFVLENBQUMsSUFBRCxDQUFYLENBQXBDLEdBQXlEaEUsbUZBQWUsQ0FBQ2dFLFVBQUQsRUFBYSxJQUFiLEVBQW1CM00sNkRBQUksRUFBdkIsRUFBMkI0TSxrQkFBM0IsQ0FBbkY7QUFBQSxNQUNJVSxnQkFBZ0IsR0FBR1gsVUFBVSxDQUFDLEtBQUQsQ0FBVixHQUFvQnhMLHVGQUFpQixDQUFDd0wsVUFBVSxDQUFDLEtBQUQsQ0FBWCxDQUFyQyxHQUEyRGhFLG1GQUFlLENBQUNnRSxVQUFELEVBQWEsS0FBYixFQUFvQmpHLHFGQUFnQixFQUFwQyxFQUF3Q2tHLGtCQUF4QyxDQURqRztBQUFBLE1BRUlXLEtBQUssR0FBR1osVUFBVSxDQUFDLEtBQUQsQ0FBVixHQUFvQnhMLHVGQUFpQixDQUFDd0wsVUFBVSxDQUFDLEtBQUQsQ0FBWCxDQUFyQyxHQUEyRGhFLG1GQUFlLENBQUNnRSxVQUFELEVBQWEsS0FBYixFQUFvQjVHLHVGQUFpQixFQUFyQyxFQUF5QzZHLGtCQUF6QyxDQUZ0RjtBQUFBLE1BR0lZLFNBQVMsR0FBR2IsVUFBVSxDQUFDLEtBQUQsQ0FBVixHQUFvQnhMLHVGQUFpQixDQUFDd0wsVUFBVSxDQUFDLEtBQUQsQ0FBWCxDQUFyQyxHQUEyRGhFLG1GQUFlLENBQUNnRSxVQUFELEVBQWEsS0FBYixFQUFvQnRELGdGQUFhLENBQUMsV0FBRCxDQUFqQyxFQUFnRHVELGtCQUFoRCxDQUgxRjtBQUFBLE1BSUlhLGVBQWUsR0FBR2QsVUFBVSxDQUFDLEtBQUQsQ0FBVixHQUFvQnhMLHVGQUFpQixDQUFDd0wsVUFBVSxDQUFDLEtBQUQsQ0FBWCxDQUFyQyxHQUEyRGhFLG1GQUFlLENBQUNnRSxVQUFELEVBQWEsS0FBYixFQUFvQjNJLG9GQUFlLENBQUN3SixTQUFELENBQW5DLEVBQWdEWixrQkFBaEQsQ0FKaEc7QUFBQSxNQUtJYyxrQkFBa0IsR0FBR2YsVUFBVSxDQUFDLE1BQUQsQ0FBVixHQUFxQnhMLHVGQUFpQixDQUFDd0wsVUFBVSxDQUFDLE1BQUQsQ0FBWCxDQUF0QyxHQUE2RGhFLG1GQUFlLENBQUNnRSxVQUFELEVBQWEsTUFBYixFQUFxQnRELGdGQUFhLENBQUMsb0JBQUQsQ0FBbEMsRUFBMER1RCxrQkFBMUQsQ0FMckc7QUFBQSxNQU1JZSxlQUFlLEdBQUdoQixVQUFVLENBQUMsTUFBRCxDQUFWLEdBQXFCeEwsdUZBQWlCLENBQUN3TCxVQUFVLENBQUMsTUFBRCxDQUFYLENBQXRDLEdBQTZEaEUsbUZBQWUsQ0FBQ2dFLFVBQUQsRUFBYSxNQUFiLEVBQXFCdEQsZ0ZBQWEsQ0FBQyxpQkFBRCxDQUFsQyxFQUF1RHVELGtCQUF2RCxDQU5sRztBQUFBLE1BT0lnQixpQkFBaUIsR0FBR2pCLFVBQVUsQ0FBQyxNQUFELENBQVYsR0FBcUJ4TCx1RkFBaUIsQ0FBQ3dMLFVBQVUsQ0FBQyxNQUFELENBQVgsQ0FBdEMsR0FBNkRoRSxtRkFBZSxDQUFDZ0UsVUFBRCxFQUFhLE1BQWIsRUFBcUJ0RCxnRkFBYSxDQUFDLG1CQUFELENBQWxDLEVBQXlEdUQsa0JBQXpELENBUHBHO0FBQUEsTUFRSWlCLGNBQWMsR0FBR2xCLFVBQVUsQ0FBQyxNQUFELENBQVYsR0FBcUJ4TCx1RkFBaUIsQ0FBQ3dMLFVBQVUsQ0FBQyxNQUFELENBQVgsQ0FBdEMsR0FBNkRoRSxtRkFBZSxDQUFDZ0UsVUFBRCxFQUFhLE1BQWIsRUFBcUJ0RCxnRkFBYSxDQUFDLGdCQUFELENBQWxDLEVBQXNEdUQsa0JBQXRELENBUmpHO0FBQUEsTUFTSWtCLGFBQWEsR0FBR25CLFVBQVUsQ0FBQyxLQUFELENBQVYsR0FBb0J4TCx1RkFBaUIsQ0FBQ3dMLFVBQVUsQ0FBQyxLQUFELENBQVgsQ0FBckMsR0FBMkRoRSxtRkFBZSxDQUFDZ0UsVUFBRCxFQUFhLEtBQWIsRUFBb0IxSixrRkFBYyxDQUFDeUssa0JBQUQsRUFBcUIsWUFBckIsQ0FBbEMsRUFBc0VkLGtCQUF0RSxDQVQ5RjtBQUFBLE1BVUltQixZQUFZLEdBQUdwQixVQUFVLENBQUMsS0FBRCxDQUFWLEdBQW9CeEwsdUZBQWlCLENBQUN3TCxVQUFVLENBQUMsS0FBRCxDQUFYLENBQXJDLEdBQTJEaEUsbUZBQWUsQ0FBQ2dFLFVBQUQsRUFBYSxLQUFiLEVBQW9CMUosa0ZBQWMsQ0FBQzJLLGlCQUFELEVBQW9CLFdBQXBCLENBQWxDLEVBQW9FaEIsa0JBQXBFLENBVjdGLENBaEdpQyxDQTRHakM7O0FBQ0EsTUFBSW9CLGtCQUFrQixHQUFHdE8sR0FBRyxDQUFDeE0sT0FBSixJQUFlLE9BQU93TSxHQUFHLENBQUN4TSxPQUFKLENBQVkrYSxJQUFuQixLQUE0QixVQUFwRTtBQUFBLE1BQ0lDLE9BQU8sR0FBRyxDQUFDLFdBQUQsRUFBYyxtQkFBZCxFQUFtQyxZQUFuQyxFQUFpRCxZQUFqRCxFQUErRCxjQUEvRCxFQUErRSxnQkFBL0UsQ0FEZDtBQUFBLE1BRUlDLGVBQWUsR0FBRyxFQUZ0QjtBQUlBRCxTQUFPLENBQUN0VixPQUFSLENBQWdCLFVBQVNrTSxJQUFULEVBQWU7QUFDN0IsUUFBSSxPQUFPaUYsT0FBTyxDQUFDakYsSUFBRCxDQUFkLEtBQXlCLFFBQTdCLEVBQXVDO0FBQ3JDLFVBQUluRyxHQUFHLEdBQUdvTCxPQUFPLENBQUNqRixJQUFELENBQWpCO0FBQUEsVUFDSXBHLEVBQUUsR0FBR3VCLEdBQUcsQ0FBQ3lCLGFBQUosQ0FBa0IvQyxHQUFsQixDQURUO0FBRUF3UCxxQkFBZSxDQUFDckosSUFBRCxDQUFmLEdBQXdCbkcsR0FBeEI7O0FBRUEsVUFBSUQsRUFBRSxJQUFJQSxFQUFFLENBQUMwUCxRQUFiLEVBQXVCO0FBQ3JCckUsZUFBTyxDQUFDakYsSUFBRCxDQUFQLEdBQWdCcEcsRUFBaEI7QUFDRCxPQUZELE1BRU87QUFDTCxZQUFJc1Asa0JBQUosRUFBd0I7QUFBRTlhLGlCQUFPLENBQUMrYSxJQUFSLENBQWEsYUFBYixFQUE0QmxFLE9BQU8sQ0FBQ2pGLElBQUQsQ0FBbkM7QUFBNkM7O0FBQ3ZFO0FBQ0Q7QUFDRjtBQUNGLEdBYkQsRUFqSGlDLENBZ0lqQzs7QUFDQSxNQUFJaUYsT0FBTyxDQUFDM1YsU0FBUixDQUFrQitTLFFBQWxCLENBQTJCM1QsTUFBM0IsR0FBb0MsQ0FBeEMsRUFBMkM7QUFDekMsUUFBSXdhLGtCQUFKLEVBQXdCO0FBQUU5YSxhQUFPLENBQUMrYSxJQUFSLENBQWEsb0JBQWIsRUFBbUNsRSxPQUFPLENBQUMzVixTQUEzQztBQUF3RDs7QUFDbEY7QUFDQSxHQXBJK0IsQ0FzSWpDOzs7QUFDQSxNQUFJTyxVQUFVLEdBQUdvVixPQUFPLENBQUNwVixVQUF6QjtBQUFBLE1BQ0lxWCxNQUFNLEdBQUdqQyxPQUFPLENBQUNpQyxNQURyQjtBQUFBLE1BRUlxQyxRQUFRLEdBQUd0RSxPQUFPLENBQUNDLElBQVIsS0FBaUIsVUFBakIsR0FBOEIsSUFBOUIsR0FBcUMsS0FGcEQ7O0FBSUEsTUFBSXJWLFVBQUosRUFBZ0I7QUFDZDtBQUNBLFFBQUksS0FBS0EsVUFBVCxFQUFxQjtBQUNuQm9WLGFBQU8sR0FBR3pILGlFQUFNLENBQUN5SCxPQUFELEVBQVVwVixVQUFVLENBQUMsQ0FBRCxDQUFwQixDQUFoQjtBQUNBLGFBQU9BLFVBQVUsQ0FBQyxDQUFELENBQWpCO0FBQ0Q7O0FBRUQsUUFBSTJaLGFBQWEsR0FBRyxFQUFwQjs7QUFDQSxTQUFLLElBQUluWSxHQUFULElBQWdCeEIsVUFBaEIsRUFBNEI7QUFDMUIsVUFBSStMLEdBQUcsR0FBRy9MLFVBQVUsQ0FBQ3dCLEdBQUQsQ0FBcEIsQ0FEMEIsQ0FFMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBdUssU0FBRyxHQUFHLE9BQU9BLEdBQVAsS0FBZSxRQUFmLEdBQTBCO0FBQUNwTSxhQUFLLEVBQUVvTTtBQUFSLE9BQTFCLEdBQXlDQSxHQUEvQztBQUNBNE4sbUJBQWEsQ0FBQ25ZLEdBQUQsQ0FBYixHQUFxQnVLLEdBQXJCO0FBQ0Q7O0FBQ0QvTCxjQUFVLEdBQUcyWixhQUFiO0FBQ0FBLGlCQUFhLEdBQUcsSUFBaEI7QUFDRCxHQWhLZ0MsQ0FrS2pDOzs7QUFDQSxXQUFTQyxhQUFULENBQXdCclksR0FBeEIsRUFBNkI7QUFDM0IsU0FBSyxJQUFJQyxHQUFULElBQWdCRCxHQUFoQixFQUFxQjtBQUNuQixVQUFJLENBQUNtWSxRQUFMLEVBQWU7QUFDYixZQUFJbFksR0FBRyxLQUFLLFNBQVosRUFBdUI7QUFBRUQsYUFBRyxDQUFDQyxHQUFELENBQUgsR0FBVyxNQUFYO0FBQW9COztBQUM3QyxZQUFJQSxHQUFHLEtBQUssYUFBWixFQUEyQjtBQUFFRCxhQUFHLENBQUNDLEdBQUQsQ0FBSCxHQUFXLEtBQVg7QUFBbUI7O0FBQ2hELFlBQUlBLEdBQUcsS0FBSyxZQUFaLEVBQTBCO0FBQUVELGFBQUcsQ0FBQ0MsR0FBRCxDQUFILEdBQVcsS0FBWDtBQUFtQjtBQUNoRCxPQUxrQixDQU9uQjs7O0FBQ0EsVUFBSUEsR0FBRyxLQUFLLFlBQVosRUFBMEI7QUFBRW9ZLHFCQUFhLENBQUNyWSxHQUFHLENBQUNDLEdBQUQsQ0FBSixDQUFiO0FBQTBCO0FBQ3ZEO0FBQ0Y7O0FBQ0QsTUFBSSxDQUFDa1ksUUFBTCxFQUFlO0FBQUVFLGlCQUFhLENBQUN4RSxPQUFELENBQWI7QUFBeUIsR0EvS1QsQ0FrTGpDOzs7QUFDQSxNQUFJLENBQUNzRSxRQUFMLEVBQWU7QUFDYnRFLFdBQU8sQ0FBQ0UsSUFBUixHQUFlLFlBQWY7QUFDQUYsV0FBTyxDQUFDTSxPQUFSLEdBQWtCLE1BQWxCO0FBQ0FOLFdBQU8sQ0FBQzlWLFdBQVIsR0FBc0IsS0FBdEI7QUFFQSxRQUFJc1gsU0FBUyxHQUFHeEIsT0FBTyxDQUFDd0IsU0FBeEI7QUFBQSxRQUNJQyxVQUFVLEdBQUd6QixPQUFPLENBQUN5QixVQUR6QjtBQUFBLFFBRUlFLFlBQVksR0FBRzNCLE9BQU8sQ0FBQzJCLFlBRjNCO0FBQUEsUUFHSUQsYUFBYSxHQUFHMUIsT0FBTyxDQUFDMEIsYUFINUI7QUFJRDs7QUFFRCxNQUFJK0MsVUFBVSxHQUFHekUsT0FBTyxDQUFDRSxJQUFSLEtBQWlCLFlBQWpCLEdBQWdDLElBQWhDLEdBQXVDLEtBQXhEO0FBQUEsTUFDSXdFLFlBQVksR0FBR3hPLEdBQUcsQ0FBQ00sYUFBSixDQUFrQixLQUFsQixDQURuQjtBQUFBLE1BRUltTyxZQUFZLEdBQUd6TyxHQUFHLENBQUNNLGFBQUosQ0FBa0IsS0FBbEIsQ0FGbkI7QUFBQSxNQUdJb08sYUFISjtBQUFBLE1BSUl2YSxTQUFTLEdBQUcyVixPQUFPLENBQUMzVixTQUp4QjtBQUFBLE1BS0l3YSxlQUFlLEdBQUd4YSxTQUFTLENBQUN5VixVQUxoQztBQUFBLE1BTUlnRixhQUFhLEdBQUd6YSxTQUFTLENBQUMwYSxTQU45QjtBQUFBLE1BT0lDLFVBQVUsR0FBRzNhLFNBQVMsQ0FBQytTLFFBUDNCO0FBQUEsTUFRSTZILFVBQVUsR0FBR0QsVUFBVSxDQUFDdmIsTUFSNUI7QUFBQSxNQVNJeWIsY0FUSjtBQUFBLE1BVUlDLFdBQVcsR0FBR0MsY0FBYyxFQVZoQztBQUFBLE1BV0lDLElBQUksR0FBRyxLQVhYOztBQVlBLE1BQUl6YSxVQUFKLEVBQWdCO0FBQUUwYSxxQkFBaUI7QUFBSzs7QUFDeEMsTUFBSWhCLFFBQUosRUFBYztBQUFFamEsYUFBUyxDQUFDMkssU0FBVixJQUF1QixZQUF2QjtBQUFzQyxHQTNNckIsQ0E2TWpDOzs7QUFDQSxNQUFJb0wsU0FBUyxHQUFHSixPQUFPLENBQUNJLFNBQXhCO0FBQUEsTUFDSUQsVUFBVSxHQUFHb0YsU0FBUyxDQUFDLFlBQUQsQ0FEMUI7QUFBQSxNQUVJcmIsV0FBVyxHQUFHcWIsU0FBUyxDQUFDLGFBQUQsQ0FGM0I7QUFBQSxNQUdJL2EsTUFBTSxHQUFHK2EsU0FBUyxDQUFDLFFBQUQsQ0FIdEI7QUFBQSxNQUlJQyxRQUFRLEdBQUdDLGdCQUFnQixFQUovQjtBQUFBLE1BS0luYixNQUFNLEdBQUdpYixTQUFTLENBQUMsUUFBRCxDQUx0QjtBQUFBLE1BTUloYixLQUFLLEdBQUcsQ0FBQzZWLFNBQUQsR0FBYXJHLElBQUksQ0FBQzJMLEtBQUwsQ0FBV0gsU0FBUyxDQUFDLE9BQUQsQ0FBcEIsQ0FBYixHQUE4QyxDQU4xRDtBQUFBLE1BT0lqRixPQUFPLEdBQUdpRixTQUFTLENBQUMsU0FBRCxDQVB2QjtBQUFBLE1BUUlsRixXQUFXLEdBQUdMLE9BQU8sQ0FBQ0ssV0FBUixJQUF1QkwsT0FBTyxDQUFDMkYsdUJBUmpEO0FBQUEsTUFTSWpiLFNBQVMsR0FBRzZhLFNBQVMsQ0FBQyxXQUFELENBVHpCO0FBQUEsTUFVSXpFLEtBQUssR0FBR3lFLFNBQVMsQ0FBQyxPQUFELENBVnJCO0FBQUEsTUFXSTNELE1BQU0sR0FBRzVCLE9BQU8sQ0FBQzRCLE1BWHJCO0FBQUEsTUFZSW5YLElBQUksR0FBR21YLE1BQU0sR0FBRyxLQUFILEdBQVc1QixPQUFPLENBQUN2VixJQVpwQztBQUFBLE1BYUlvWCxVQUFVLEdBQUcwRCxTQUFTLENBQUMsWUFBRCxDQWIxQjtBQUFBLE1BY0l6YSxRQUFRLEdBQUd5YSxTQUFTLENBQUMsVUFBRCxDQWR4QjtBQUFBLE1BZUl4YSxZQUFZLEdBQUd3YSxTQUFTLENBQUMsY0FBRCxDQWY1QjtBQUFBLE1BZ0JJNUUsR0FBRyxHQUFHNEUsU0FBUyxDQUFDLEtBQUQsQ0FoQm5CO0FBQUEsTUFpQkl4RCxLQUFLLEdBQUd3RCxTQUFTLENBQUMsT0FBRCxDQWpCckI7QUFBQSxNQWtCSTFhLFNBQVMsR0FBRzBhLFNBQVMsQ0FBQyxXQUFELENBbEJ6QjtBQUFBLE1BbUJJeEUsUUFBUSxHQUFHd0UsU0FBUyxDQUFDLFVBQUQsQ0FuQnhCO0FBQUEsTUFvQkl0RSxlQUFlLEdBQUdzRSxTQUFTLENBQUMsaUJBQUQsQ0FwQi9CO0FBQUEsTUFxQklwRSxZQUFZLEdBQUdvRSxTQUFTLENBQUMsY0FBRCxDQXJCNUI7QUFBQSxNQXNCSW5FLGtCQUFrQixHQUFHbUUsU0FBUyxDQUFDLG9CQUFELENBdEJsQztBQUFBLE1BdUJJaEUseUJBQXlCLEdBQUdnRSxTQUFTLENBQUMsMkJBQUQsQ0F2QnpDO0FBQUEsTUF3QklwUixLQUFLLEdBQUdvRCxxRkFBZ0IsQ0FBQyxJQUFELEVBQU9nTyxTQUFTLENBQUMsT0FBRCxDQUFoQixDQXhCNUI7QUFBQSxNQXlCSTVhLFFBQVEsR0FBR3FWLE9BQU8sQ0FBQ3JWLFFBekJ2QjtBQUFBLE1BMEJJbVgsZ0JBQWdCLEdBQUc5QixPQUFPLENBQUM4QixnQkExQi9CO0FBQUEsTUEyQkk4RCxjQTNCSjtBQUFBLE1BMkJvQjtBQUNoQkMsZUFBYSxHQUFHLEVBNUJwQjtBQUFBLE1BNkJJQyxVQUFVLEdBQUdyYixJQUFJLEdBQUdzYixvQkFBb0IsRUFBdkIsR0FBNEIsQ0E3QmpEO0FBQUEsTUE4QklDLGFBQWEsR0FBRyxDQUFDMUIsUUFBRCxHQUFZVyxVQUFVLEdBQUdhLFVBQXpCLEdBQXNDYixVQUFVLEdBQUdhLFVBQVUsR0FBRyxDQTlCcEY7QUFBQSxNQStCSUcsZ0JBQWdCLEdBQUcsQ0FBQzlGLFVBQVUsSUFBSUMsU0FBZixLQUE2QixDQUFDM1YsSUFBOUIsR0FBcUMsSUFBckMsR0FBNEMsS0EvQm5FO0FBQUEsTUFnQ0l5YixhQUFhLEdBQUcvRixVQUFVLEdBQUdnRyxnQkFBZ0IsRUFBbkIsR0FBd0IsSUFoQ3REO0FBQUEsTUFpQ0lDLDBCQUEwQixHQUFJLENBQUM5QixRQUFELElBQWEsQ0FBQzdaLElBQWYsR0FBdUIsSUFBdkIsR0FBOEIsS0FqQy9EO0FBQUEsTUFrQ0k7QUFDQTRiLGVBQWEsR0FBRzVCLFVBQVUsR0FBRyxNQUFILEdBQVksS0FuQzFDO0FBQUEsTUFvQ0k2QixlQUFlLEdBQUcsRUFwQ3RCO0FBQUEsTUFxQ0lDLGdCQUFnQixHQUFHLEVBckN2QjtBQUFBLE1Bc0NJO0FBQ0FDLGFBQVcsR0FBSSxZQUFZO0FBQ3pCLFFBQUlyRyxVQUFKLEVBQWdCO0FBQ2QsYUFBTyxZQUFXO0FBQUUsZUFBTzdWLE1BQU0sSUFBSSxDQUFDRyxJQUFYLEdBQWtCd2EsVUFBVSxHQUFHLENBQS9CLEdBQW1DbEwsSUFBSSxDQUFDME0sSUFBTCxDQUFVLENBQUVQLGFBQUYsSUFBbUIvRixVQUFVLEdBQUczVixNQUFoQyxDQUFWLENBQTFDO0FBQStGLE9BQW5IO0FBQ0QsS0FGRCxNQUVPLElBQUk0VixTQUFKLEVBQWU7QUFDcEIsYUFBTyxZQUFXO0FBQ2hCLGFBQUssSUFBSTVXLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUd3YyxhQUFwQixFQUFtQ3hjLENBQUMsRUFBcEMsRUFBd0M7QUFDdEMsY0FBSW9jLGNBQWMsQ0FBQ3BjLENBQUQsQ0FBZCxJQUFxQixDQUFFMGMsYUFBM0IsRUFBMEM7QUFBRSxtQkFBTzFjLENBQVA7QUFBVztBQUN4RDtBQUNGLE9BSkQ7QUFLRCxLQU5NLE1BTUE7QUFDTCxhQUFPLFlBQVc7QUFDaEIsWUFBSWMsTUFBTSxJQUFJZ2EsUUFBVixJQUFzQixDQUFDN1osSUFBM0IsRUFBaUM7QUFDL0IsaUJBQU93YSxVQUFVLEdBQUcsQ0FBcEI7QUFDRCxTQUZELE1BRU87QUFDTCxpQkFBT3hhLElBQUksSUFBSTZaLFFBQVIsR0FBbUJ2SyxJQUFJLENBQUMyTSxHQUFMLENBQVMsQ0FBVCxFQUFZVixhQUFhLEdBQUdqTSxJQUFJLENBQUMwTSxJQUFMLENBQVVsYyxLQUFWLENBQTVCLENBQW5CLEdBQW1FeWIsYUFBYSxHQUFHLENBQTFGO0FBQ0Q7QUFDRixPQU5EO0FBT0Q7QUFDRixHQWxCYSxFQXZDbEI7QUFBQSxNQTBESTFSLEtBQUssR0FBR3FTLGFBQWEsQ0FBQ3BCLFNBQVMsQ0FBQyxZQUFELENBQVYsQ0ExRHpCO0FBQUEsTUEyRElxQixXQUFXLEdBQUd0UyxLQTNEbEI7QUFBQSxNQTRESXVTLFlBQVksR0FBR0MsZUFBZSxFQTVEbEM7QUFBQSxNQTZESUMsUUFBUSxHQUFHLENBN0RmO0FBQUEsTUE4RElDLFFBQVEsR0FBRyxDQUFDNUcsU0FBRCxHQUFhb0csV0FBVyxFQUF4QixHQUE2QixJQTlENUM7QUFBQSxNQStESTtBQUNBUyxhQWhFSjtBQUFBLE1BaUVJL0Usd0JBQXdCLEdBQUdsQyxPQUFPLENBQUNrQyx3QkFqRXZDO0FBQUEsTUFrRUlGLFVBQVUsR0FBR2hDLE9BQU8sQ0FBQ2dDLFVBbEV6QjtBQUFBLE1BbUVJa0YscUJBQXFCLEdBQUdsRixVQUFVLEdBQUcsR0FBSCxHQUFTLElBbkUvQztBQUFBLE1Bb0VJbkcsT0FBTyxHQUFHLEtBcEVkO0FBQUEsTUFxRUl3RyxNQUFNLEdBQUdyQyxPQUFPLENBQUNxQyxNQXJFckI7QUFBQSxNQXNFSThFLE1BQU0sR0FBRyxJQUFJcFAsMERBQUosRUF0RWI7QUFBQSxNQXVFSTtBQUNBcVAscUJBQW1CLEdBQUcscUJBQXFCcEgsT0FBTyxDQUFDQyxJQXhFdkQ7QUFBQSxNQXlFSW9ILE9BQU8sR0FBR2hkLFNBQVMsQ0FBQzBMLEVBQVYsSUFBZ0J5RCx5RUFBVSxFQXpFeEM7QUFBQSxNQTBFSThOLE9BQU8sR0FBRy9CLFNBQVMsQ0FBQyxTQUFELENBMUV2QjtBQUFBLE1BMkVJZ0MsUUFBUSxHQUFHLEtBM0VmO0FBQUEsTUE0RUluRixTQUFTLEdBQUdwQyxPQUFPLENBQUNvQyxTQTVFeEI7QUFBQSxNQTZFSW9GLE1BQU0sR0FBR3BGLFNBQVMsSUFBSSxDQUFDaEMsU0FBZCxHQUEwQnFILFNBQVMsRUFBbkMsR0FBd0MsS0E3RXJEO0FBQUEsTUE4RUlDLE1BQU0sR0FBRyxLQTlFYjtBQUFBLE1BK0VJQyxjQUFjLEdBQUc7QUFDZixhQUFTQyxlQURNO0FBRWYsZUFBV0M7QUFGSSxHQS9FckI7QUFBQSxNQW1GSUMsU0FBUyxHQUFHO0FBQ1YsYUFBU0MsVUFEQztBQUVWLGVBQVdDO0FBRkQsR0FuRmhCO0FBQUEsTUF1RklDLFdBQVcsR0FBRztBQUNaLGlCQUFhQyxjQUREO0FBRVosZ0JBQVlDO0FBRkEsR0F2RmxCO0FBQUEsTUEyRklDLGVBQWUsR0FBRztBQUFDLHdCQUFvQkM7QUFBckIsR0EzRnRCO0FBQUEsTUE0RklDLG1CQUFtQixHQUFHO0FBQUMsZUFBV0M7QUFBWixHQTVGMUI7QUFBQSxNQTZGSUMsV0FBVyxHQUFHO0FBQ1osa0JBQWNDLFVBREY7QUFFWixpQkFBYUMsU0FGRDtBQUdaLGdCQUFZQyxRQUhBO0FBSVosbUJBQWVBO0FBSkgsR0E3RmxCO0FBQUEsTUFrR09DLFVBQVUsR0FBRztBQUNkLGlCQUFhSCxVQURDO0FBRWQsaUJBQWFDLFNBRkM7QUFHZCxlQUFXQyxRQUhHO0FBSWQsa0JBQWNBO0FBSkEsR0FsR3BCO0FBQUEsTUF3R0lFLFdBQVcsR0FBR0MsU0FBUyxDQUFDLFVBQUQsQ0F4RzNCO0FBQUEsTUF5R0lDLE1BQU0sR0FBR0QsU0FBUyxDQUFDLEtBQUQsQ0F6R3RCO0FBQUEsTUEwR0lqSSxlQUFlLEdBQUdULFNBQVMsR0FBRyxJQUFILEdBQVVKLE9BQU8sQ0FBQ2EsZUExR2pEO0FBQUEsTUEyR0ltSSxXQUFXLEdBQUdGLFNBQVMsQ0FBQyxVQUFELENBM0czQjtBQUFBLE1BNEdJRyxRQUFRLEdBQUdILFNBQVMsQ0FBQyxPQUFELENBNUd4QjtBQUFBLE1BNkdJSSxZQUFZLEdBQUdKLFNBQVMsQ0FBQyxXQUFELENBN0c1QjtBQUFBLE1BOEdJSyxnQkFBZ0IsR0FBRyxrQkE5R3ZCO0FBQUEsTUErR0lDLGdCQUFnQixHQUFHLGtCQS9HdkI7QUFBQSxNQWdISUMsZ0JBQWdCLEdBQUcsY0FoSHZCO0FBQUEsTUFpSElDLFNBQVMsR0FBRztBQUNWLFlBQVFDLFdBREU7QUFFVixhQUFTQztBQUZDLEdBakhoQjtBQUFBLE1BcUhJQyxZQXJISjtBQUFBLE1Bc0hJQyxpQkF0SEo7QUFBQSxNQXVISUMsYUFBYSxHQUFHM0osT0FBTyxDQUFDbUMsb0JBQVIsS0FBaUMsT0FBakMsR0FBMkMsSUFBM0MsR0FBa0QsS0F2SHRFLENBOU1pQyxDQXVVakM7OztBQUNBLE1BQUkwRyxXQUFKLEVBQWlCO0FBQ2YsUUFBSXJJLGlCQUFpQixHQUFHUixPQUFPLENBQUNRLGlCQUFoQztBQUFBLFFBQ0lvSixxQkFBcUIsR0FBRzVKLE9BQU8sQ0FBQ1EsaUJBQVIsR0FBNEJSLE9BQU8sQ0FBQ1EsaUJBQVIsQ0FBMEJ1RSxTQUF0RCxHQUFrRSxFQUQ5RjtBQUFBLFFBRUl0RSxVQUFVLEdBQUdULE9BQU8sQ0FBQ1MsVUFGekI7QUFBQSxRQUdJQyxVQUFVLEdBQUdWLE9BQU8sQ0FBQ1UsVUFIekI7QUFBQSxRQUlJbUosY0FBYyxHQUFHN0osT0FBTyxDQUFDUyxVQUFSLEdBQXFCVCxPQUFPLENBQUNTLFVBQVIsQ0FBbUJzRSxTQUF4QyxHQUFvRCxFQUp6RTtBQUFBLFFBS0krRSxjQUFjLEdBQUc5SixPQUFPLENBQUNVLFVBQVIsR0FBcUJWLE9BQU8sQ0FBQ1UsVUFBUixDQUFtQnFFLFNBQXhDLEdBQW9ELEVBTHpFO0FBQUEsUUFNSWdGLFlBTko7QUFBQSxRQU9JQyxZQVBKO0FBUUQsR0FqVmdDLENBbVZqQzs7O0FBQ0EsTUFBSWpCLE1BQUosRUFBWTtBQUNWLFFBQUluSSxZQUFZLEdBQUdaLE9BQU8sQ0FBQ1ksWUFBM0I7QUFBQSxRQUNJcUosZ0JBQWdCLEdBQUdqSyxPQUFPLENBQUNZLFlBQVIsR0FBdUJaLE9BQU8sQ0FBQ1ksWUFBUixDQUFxQm1FLFNBQTVDLEdBQXdELEVBRC9FO0FBQUEsUUFFSW1GLFFBRko7QUFBQSxRQUdJQyxLQUFLLEdBQUcvSixTQUFTLEdBQUc2RSxVQUFILEdBQWdCbUYsUUFBUSxFQUg3QztBQUFBLFFBSUlDLFdBQVcsR0FBRyxDQUpsQjtBQUFBLFFBS0lDLFVBQVUsR0FBRyxDQUFDLENBTGxCO0FBQUEsUUFNSUMsZUFBZSxHQUFHQyxrQkFBa0IsRUFOeEM7QUFBQSxRQU9JQyxxQkFBcUIsR0FBR0YsZUFQNUI7QUFBQSxRQVFJRyxjQUFjLEdBQUcsZ0JBUnJCO0FBQUEsUUFTSUMsTUFBTSxHQUFHLGdCQVRiO0FBQUEsUUFVSUMsYUFBYSxHQUFHLGtCQVZwQjtBQVdELEdBaFdnQyxDQWtXakM7OztBQUNBLE1BQUk1QixXQUFKLEVBQWlCO0FBQ2YsUUFBSTlILGlCQUFpQixHQUFHbEIsT0FBTyxDQUFDa0IsaUJBQVIsS0FBOEIsU0FBOUIsR0FBMEMsQ0FBMUMsR0FBOEMsQ0FBQyxDQUF2RTtBQUFBLFFBQ0lHLGNBQWMsR0FBR3JCLE9BQU8sQ0FBQ3FCLGNBRDdCO0FBQUEsUUFFSXdKLGtCQUFrQixHQUFHN0ssT0FBTyxDQUFDcUIsY0FBUixHQUF5QnJCLE9BQU8sQ0FBQ3FCLGNBQVIsQ0FBdUIwRCxTQUFoRCxHQUE0RCxFQUZyRjtBQUFBLFFBR0krRixtQkFBbUIsR0FBRyxDQUFDLHNDQUFELEVBQXlDLG1CQUF6QyxDQUgxQjtBQUFBLFFBSUlDLGFBSko7QUFBQSxRQUtJQyxTQUxKO0FBQUEsUUFNSUMsbUJBTko7QUFBQSxRQU9JQyxrQkFQSjtBQUFBLFFBUUlDLHdCQVJKO0FBU0Q7O0FBRUQsTUFBSWxDLFFBQVEsSUFBSUMsWUFBaEIsRUFBOEI7QUFDNUIsUUFBSWtDLFlBQVksR0FBRyxFQUFuQjtBQUFBLFFBQ0lDLFlBQVksR0FBRyxFQURuQjtBQUFBLFFBRUlDLGFBRko7QUFBQSxRQUdJQyxJQUhKO0FBQUEsUUFJSUMsSUFKSjtBQUFBLFFBS0lDLFFBQVEsR0FBRyxLQUxmO0FBQUEsUUFNSUMsUUFOSjtBQUFBLFFBT0lDLE9BQU8sR0FBR2xILFVBQVUsR0FDbEIsVUFBU21ILENBQVQsRUFBWUMsQ0FBWixFQUFlO0FBQUUsYUFBT0QsQ0FBQyxDQUFDek0sQ0FBRixHQUFNME0sQ0FBQyxDQUFDMU0sQ0FBZjtBQUFtQixLQURsQixHQUVsQixVQUFTeU0sQ0FBVCxFQUFZQyxDQUFaLEVBQWU7QUFBRSxhQUFPRCxDQUFDLENBQUMxTSxDQUFGLEdBQU0yTSxDQUFDLENBQUMzTSxDQUFmO0FBQW1CLEtBVDFDO0FBVUQsR0ExWGdDLENBNFhqQzs7O0FBQ0EsTUFBSSxDQUFDa0IsU0FBTCxFQUFnQjtBQUFFMEwsNEJBQXdCLENBQUN4RSxPQUFPLElBQUlFLE1BQVosQ0FBeEI7QUFBOEM7O0FBRWhFLE1BQUkvRCxTQUFKLEVBQWU7QUFDYjRDLGlCQUFhLEdBQUc1QyxTQUFoQjtBQUNBNkMsbUJBQWUsR0FBRyxXQUFsQjs7QUFFQSxRQUFJNUMsZUFBSixFQUFxQjtBQUNuQjRDLHFCQUFlLElBQUk3QixVQUFVLEdBQUcsS0FBSCxHQUFXLFVBQXhDO0FBQ0E4QixzQkFBZ0IsR0FBRzlCLFVBQVUsR0FBRyxhQUFILEdBQW1CLFFBQWhEO0FBQ0QsS0FIRCxNQUdPO0FBQ0w2QixxQkFBZSxJQUFJN0IsVUFBVSxHQUFHLElBQUgsR0FBVSxJQUF2QztBQUNBOEIsc0JBQWdCLEdBQUcsR0FBbkI7QUFDRDtBQUVGOztBQUVELE1BQUlqQyxRQUFKLEVBQWM7QUFBRWphLGFBQVMsQ0FBQzJLLFNBQVYsR0FBc0IzSyxTQUFTLENBQUMySyxTQUFWLENBQW9CK0IsT0FBcEIsQ0FBNEIsV0FBNUIsRUFBeUMsRUFBekMsQ0FBdEI7QUFBcUU7O0FBQ3JGZ1YsZUFBYTtBQUNiQyxXQUFTO0FBQ1RDLHFCQUFtQixHQWhaYyxDQWtaakM7O0FBQ0EsV0FBU0gsd0JBQVQsQ0FBbUNJLFNBQW5DLEVBQThDO0FBQzVDLFFBQUlBLFNBQUosRUFBZTtBQUNicGhCLGNBQVEsR0FBRzZWLEdBQUcsR0FBR29CLEtBQUssR0FBR2xYLFNBQVMsR0FBR0gsU0FBUyxHQUFHcVcsUUFBUSxHQUFHSyxrQkFBa0IsR0FBR0cseUJBQXlCLEdBQUcsS0FBN0c7QUFDRDtBQUNGOztBQUVELFdBQVN1RixlQUFULEdBQTRCO0FBQzFCLFFBQUlxRixHQUFHLEdBQUc3SCxRQUFRLEdBQUdoUSxLQUFLLEdBQUd3UixVQUFYLEdBQXdCeFIsS0FBMUM7O0FBQ0EsV0FBTzZYLEdBQUcsR0FBRyxDQUFiLEVBQWdCO0FBQUVBLFNBQUcsSUFBSWxILFVBQVA7QUFBb0I7O0FBQ3RDLFdBQU9rSCxHQUFHLEdBQUNsSCxVQUFKLEdBQWlCLENBQXhCO0FBQ0Q7O0FBRUQsV0FBUzBCLGFBQVQsQ0FBd0J5RixHQUF4QixFQUE2QjtBQUMzQkEsT0FBRyxHQUFHQSxHQUFHLEdBQUdyUyxJQUFJLENBQUMyTSxHQUFMLENBQVMsQ0FBVCxFQUFZM00sSUFBSSxDQUFDeUIsR0FBTCxDQUFTL1EsSUFBSSxHQUFHd2EsVUFBVSxHQUFHLENBQWhCLEdBQW9CQSxVQUFVLEdBQUcxYSxLQUE5QyxFQUFxRDZoQixHQUFyRCxDQUFaLENBQUgsR0FBNEUsQ0FBckY7QUFDQSxXQUFPOUgsUUFBUSxHQUFHOEgsR0FBRyxHQUFHdEcsVUFBVCxHQUFzQnNHLEdBQXJDO0FBQ0Q7O0FBRUQsV0FBU0MsV0FBVCxDQUFzQjdpQixDQUF0QixFQUF5QjtBQUN2QixRQUFJQSxDQUFDLElBQUksSUFBVCxFQUFlO0FBQUVBLE9BQUMsR0FBRzhLLEtBQUo7QUFBWTs7QUFFN0IsUUFBSWdRLFFBQUosRUFBYztBQUFFOWEsT0FBQyxJQUFJc2MsVUFBTDtBQUFrQjs7QUFDbEMsV0FBT3RjLENBQUMsR0FBRyxDQUFYLEVBQWM7QUFBRUEsT0FBQyxJQUFJeWIsVUFBTDtBQUFrQjs7QUFFbEMsV0FBT2xMLElBQUksQ0FBQzJMLEtBQUwsQ0FBV2xjLENBQUMsR0FBQ3liLFVBQWIsQ0FBUDtBQUNEOztBQUVELFdBQVN1RixrQkFBVCxHQUErQjtBQUM3QixRQUFJOEIsUUFBUSxHQUFHRCxXQUFXLEVBQTFCO0FBQUEsUUFDSXZjLE1BREo7QUFHQUEsVUFBTSxHQUFHK1EsZUFBZSxHQUFHeUwsUUFBSCxHQUN0Qm5NLFVBQVUsSUFBSUMsU0FBZCxHQUEwQnJHLElBQUksQ0FBQzBNLElBQUwsQ0FBVSxDQUFDNkYsUUFBUSxHQUFHLENBQVosSUFBaUJuQyxLQUFqQixHQUF5QmxGLFVBQXpCLEdBQXNDLENBQWhELENBQTFCLEdBQ0lsTCxJQUFJLENBQUMyTCxLQUFMLENBQVc0RyxRQUFRLEdBQUcvaEIsS0FBdEIsQ0FGTixDQUo2QixDQVE3Qjs7QUFDQSxRQUFJLENBQUNFLElBQUQsSUFBUzZaLFFBQVQsSUFBcUJoUSxLQUFLLEtBQUswUyxRQUFuQyxFQUE2QztBQUFFbFgsWUFBTSxHQUFHcWEsS0FBSyxHQUFHLENBQWpCO0FBQXFCOztBQUVwRSxXQUFPcmEsTUFBUDtBQUNEOztBQUVELFdBQVN5YyxXQUFULEdBQXdCO0FBQ3RCO0FBQ0EsUUFBSW5NLFNBQVMsSUFBS0QsVUFBVSxJQUFJLENBQUNFLFdBQWpDLEVBQStDO0FBQzdDLGFBQU80RSxVQUFVLEdBQUcsQ0FBcEIsQ0FENkMsQ0FFL0M7QUFDQyxLQUhELE1BR087QUFDTCxVQUFJclEsR0FBRyxHQUFHdUwsVUFBVSxHQUFHLFlBQUgsR0FBa0IsT0FBdEM7QUFBQSxVQUNJMUssR0FBRyxHQUFHLEVBRFY7O0FBR0EsVUFBSTBLLFVBQVUsSUFBSUgsT0FBTyxDQUFDcEwsR0FBRCxDQUFQLEdBQWVxUSxVQUFqQyxFQUE2QztBQUFFeFAsV0FBRyxDQUFDeEQsSUFBSixDQUFTK04sT0FBTyxDQUFDcEwsR0FBRCxDQUFoQjtBQUF5Qjs7QUFFeEUsVUFBSWhLLFVBQUosRUFBZ0I7QUFDZCxhQUFLLElBQUk0aEIsRUFBVCxJQUFlNWhCLFVBQWYsRUFBMkI7QUFDekIsY0FBSXVoQixHQUFHLEdBQUd2aEIsVUFBVSxDQUFDNGhCLEVBQUQsQ0FBVixDQUFlNVgsR0FBZixDQUFWOztBQUNBLGNBQUl1WCxHQUFHLEtBQUtoTSxVQUFVLElBQUlnTSxHQUFHLEdBQUdsSCxVQUF6QixDQUFQLEVBQTZDO0FBQUV4UCxlQUFHLENBQUN4RCxJQUFKLENBQVNrYSxHQUFUO0FBQWdCO0FBQ2hFO0FBQ0Y7O0FBRUQsVUFBSSxDQUFDMVcsR0FBRyxDQUFDaE0sTUFBVCxFQUFpQjtBQUFFZ00sV0FBRyxDQUFDeEQsSUFBSixDQUFTLENBQVQ7QUFBYzs7QUFFakMsYUFBTzhILElBQUksQ0FBQzBNLElBQUwsQ0FBVXRHLFVBQVUsR0FBR0UsV0FBVyxHQUFHdEcsSUFBSSxDQUFDeUIsR0FBTCxDQUFTaVIsS0FBVCxDQUFlLElBQWYsRUFBcUJoWCxHQUFyQixDQUFqQixHQUE2Q3NFLElBQUksQ0FBQzJNLEdBQUwsQ0FBUytGLEtBQVQsQ0FBZSxJQUFmLEVBQXFCaFgsR0FBckIsQ0FBakUsQ0FBUDtBQUNEO0FBQ0Y7O0FBRUQsV0FBU3NRLG9CQUFULEdBQWlDO0FBQy9CLFFBQUkyRyxRQUFRLEdBQUdILFdBQVcsRUFBMUI7QUFBQSxRQUNJemMsTUFBTSxHQUFHd1UsUUFBUSxHQUFHdkssSUFBSSxDQUFDME0sSUFBTCxDQUFVLENBQUNpRyxRQUFRLEdBQUcsQ0FBWCxHQUFlekgsVUFBaEIsSUFBNEIsQ0FBdEMsQ0FBSCxHQUErQ3lILFFBQVEsR0FBRyxDQUFYLEdBQWV6SCxVQURuRjtBQUVBblYsVUFBTSxHQUFHaUssSUFBSSxDQUFDMk0sR0FBTCxDQUFTZ0csUUFBVCxFQUFtQjVjLE1BQW5CLENBQVQ7QUFFQSxXQUFPZ1osU0FBUyxDQUFDLGFBQUQsQ0FBVCxHQUEyQmhaLE1BQU0sR0FBRyxDQUFwQyxHQUF3Q0EsTUFBL0M7QUFDRDs7QUFFRCxXQUFTc1YsY0FBVCxHQUEyQjtBQUN6QixXQUFPelAsR0FBRyxDQUFDZ1gsVUFBSixJQUFrQnpXLEdBQUcsQ0FBQzRCLGVBQUosQ0FBb0I4VSxXQUF0QyxJQUFxRDFXLEdBQUcsQ0FBQ0MsSUFBSixDQUFTeVcsV0FBckU7QUFDRDs7QUFFRCxXQUFTQyxpQkFBVCxDQUE0QkMsR0FBNUIsRUFBaUM7QUFDL0IsV0FBT0EsR0FBRyxLQUFLLEtBQVIsR0FBZ0IsWUFBaEIsR0FBK0IsV0FBdEM7QUFDRDs7QUFFRCxXQUFTQyxjQUFULENBQXlCcFksRUFBekIsRUFBNkI7QUFDM0IsUUFBSUEsRUFBRSxJQUFJLElBQVYsRUFBZ0I7QUFBRTtBQUFTOztBQUMzQixRQUFJNEIsR0FBRyxHQUFHTCxHQUFHLENBQUNNLGFBQUosQ0FBa0IsS0FBbEIsQ0FBVjtBQUFBLFFBQW9Dd1csSUFBcEM7QUFBQSxRQUEwQ25XLEtBQTFDO0FBQ0FsQyxNQUFFLENBQUM4QixXQUFILENBQWVGLEdBQWY7QUFDQXlXLFFBQUksR0FBR3pXLEdBQUcsQ0FBQzJHLHFCQUFKLEVBQVA7QUFDQXJHLFNBQUssR0FBR21XLElBQUksQ0FBQ0MsS0FBTCxHQUFhRCxJQUFJLENBQUM3UCxJQUExQjtBQUNBNUcsT0FBRyxDQUFDWSxNQUFKO0FBQ0EsV0FBT04sS0FBSyxJQUFJa1csY0FBYyxDQUFDcFksRUFBRSxDQUFDbUwsVUFBSixDQUE5QjtBQUNEOztBQUVELFdBQVMyRixnQkFBVCxHQUE2QjtBQUMzQixRQUFJM0wsR0FBRyxHQUFHNVAsV0FBVyxHQUFHQSxXQUFXLEdBQUcsQ0FBZCxHQUFrQk0sTUFBckIsR0FBOEIsQ0FBbkQ7QUFDQSxXQUFPdWlCLGNBQWMsQ0FBQ2xJLGVBQUQsQ0FBZCxHQUFrQy9LLEdBQXpDO0FBQ0Q7O0FBRUQsV0FBU2dQLFNBQVQsQ0FBb0IvTixJQUFwQixFQUEwQjtBQUN4QixRQUFJaUYsT0FBTyxDQUFDakYsSUFBRCxDQUFYLEVBQW1CO0FBQ2pCLGFBQU8sSUFBUDtBQUNELEtBRkQsTUFFTztBQUNMLFVBQUluUSxVQUFKLEVBQWdCO0FBQ2QsYUFBSyxJQUFJNGhCLEVBQVQsSUFBZTVoQixVQUFmLEVBQTJCO0FBQ3pCLGNBQUlBLFVBQVUsQ0FBQzRoQixFQUFELENBQVYsQ0FBZXpSLElBQWYsQ0FBSixFQUEwQjtBQUFFLG1CQUFPLElBQVA7QUFBYztBQUMzQztBQUNGOztBQUNELGFBQU8sS0FBUDtBQUNEO0FBQ0YsR0E3ZmdDLENBK2ZqQztBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EsV0FBU3dLLFNBQVQsQ0FBb0J4SyxJQUFwQixFQUEwQm1TLEVBQTFCLEVBQThCO0FBQzVCLFFBQUlBLEVBQUUsSUFBSSxJQUFWLEVBQWdCO0FBQUVBLFFBQUUsR0FBRy9ILFdBQUw7QUFBbUI7O0FBRXJDLFFBQUlwSyxJQUFJLEtBQUssT0FBVCxJQUFvQm9GLFVBQXhCLEVBQW9DO0FBQ2xDLGFBQU9wRyxJQUFJLENBQUMyTCxLQUFMLENBQVcsQ0FBQ0YsUUFBUSxHQUFHaGIsTUFBWixLQUF1QjJWLFVBQVUsR0FBRzNWLE1BQXBDLENBQVgsS0FBMkQsQ0FBbEU7QUFFRCxLQUhELE1BR087QUFDTCxVQUFJc0YsTUFBTSxHQUFHa1EsT0FBTyxDQUFDakYsSUFBRCxDQUFwQjs7QUFFQSxVQUFJblEsVUFBSixFQUFnQjtBQUNkLGFBQUssSUFBSTRoQixFQUFULElBQWU1aEIsVUFBZixFQUEyQjtBQUN6QjtBQUNBLGNBQUlzaUIsRUFBRSxJQUFJQyxRQUFRLENBQUNYLEVBQUQsQ0FBbEIsRUFBd0I7QUFDdEIsZ0JBQUl6UixJQUFJLElBQUluUSxVQUFVLENBQUM0aEIsRUFBRCxDQUF0QixFQUE0QjtBQUFFMWMsb0JBQU0sR0FBR2xGLFVBQVUsQ0FBQzRoQixFQUFELENBQVYsQ0FBZXpSLElBQWYsQ0FBVDtBQUFnQztBQUMvRDtBQUNGO0FBQ0Y7O0FBRUQsVUFBSUEsSUFBSSxLQUFLLFNBQVQsSUFBc0JqTCxNQUFNLEtBQUssTUFBckMsRUFBNkM7QUFBRUEsY0FBTSxHQUFHeVYsU0FBUyxDQUFDLE9BQUQsQ0FBbEI7QUFBOEI7O0FBQzdFLFVBQUksQ0FBQ2pCLFFBQUQsS0FBY3ZKLElBQUksS0FBSyxTQUFULElBQXNCQSxJQUFJLEtBQUssT0FBN0MsQ0FBSixFQUEyRDtBQUFFakwsY0FBTSxHQUFHaUssSUFBSSxDQUFDMkwsS0FBTCxDQUFXNVYsTUFBWCxDQUFUO0FBQThCOztBQUUzRixhQUFPQSxNQUFQO0FBQ0Q7QUFDRjs7QUFFRCxXQUFTc2Qsa0JBQVQsQ0FBNkI1akIsQ0FBN0IsRUFBZ0M7QUFDOUIsV0FBTzhaLElBQUksR0FDVEEsSUFBSSxHQUFHLEdBQVAsR0FBYTlaLENBQUMsR0FBRyxHQUFqQixHQUF1QixNQUF2QixHQUFnQ3djLGFBQWhDLEdBQWdELEdBRHZDLEdBRVR4YyxDQUFDLEdBQUcsR0FBSixHQUFVd2MsYUFBVixHQUEwQixHQUY1QjtBQUdEOztBQUVELFdBQVNxSCxxQkFBVCxDQUFnQ0MsY0FBaEMsRUFBZ0RDLFNBQWhELEVBQTJEQyxhQUEzRCxFQUEwRUMsUUFBMUUsRUFBb0ZDLFlBQXBGLEVBQWtHO0FBQ2hHLFFBQUk5WSxHQUFHLEdBQUcsRUFBVjs7QUFFQSxRQUFJMFksY0FBYyxLQUFLN2hCLFNBQXZCLEVBQWtDO0FBQ2hDLFVBQUlxTyxHQUFHLEdBQUd3VCxjQUFWOztBQUNBLFVBQUlDLFNBQUosRUFBZTtBQUFFelQsV0FBRyxJQUFJeVQsU0FBUDtBQUFtQjs7QUFDcEMzWSxTQUFHLEdBQUc2UCxVQUFVLEdBQ2QsZUFBZTNLLEdBQWYsR0FBcUIsT0FBckIsR0FBK0J3VCxjQUEvQixHQUFnRCxLQURsQyxHQUVkLGFBQWFBLGNBQWIsR0FBOEIsT0FBOUIsR0FBd0N4VCxHQUF4QyxHQUE4QyxPQUZoRDtBQUdELEtBTkQsTUFNTyxJQUFJeVQsU0FBUyxJQUFJLENBQUNDLGFBQWxCLEVBQWlDO0FBQ3RDLFVBQUlHLGFBQWEsR0FBRyxNQUFNSixTQUFOLEdBQWtCLElBQXRDO0FBQUEsVUFDSUssR0FBRyxHQUFHbkosVUFBVSxHQUFHa0osYUFBYSxHQUFHLE1BQW5CLEdBQTRCLE9BQU9BLGFBQVAsR0FBdUIsSUFEdkU7QUFFQS9ZLFNBQUcsR0FBRyxlQUFlZ1osR0FBZixHQUFxQixHQUEzQjtBQUNEOztBQUVELFFBQUksQ0FBQ3RKLFFBQUQsSUFBYW9KLFlBQWIsSUFBNkIvSixrQkFBN0IsSUFBbUQ4SixRQUF2RCxFQUFpRTtBQUFFN1ksU0FBRyxJQUFJaVosMEJBQTBCLENBQUNKLFFBQUQsQ0FBakM7QUFBOEM7O0FBQ2pILFdBQU83WSxHQUFQO0FBQ0Q7O0FBRUQsV0FBU2taLGlCQUFULENBQTRCTixhQUE1QixFQUEyQ0QsU0FBM0MsRUFBc0RRLFFBQXRELEVBQWdFO0FBQzlELFFBQUlQLGFBQUosRUFBbUI7QUFDakIsYUFBTyxDQUFDQSxhQUFhLEdBQUdELFNBQWpCLElBQThCdkgsYUFBOUIsR0FBOEMsSUFBckQ7QUFDRCxLQUZELE1BRU87QUFDTCxhQUFPMUMsSUFBSSxHQUNUQSxJQUFJLEdBQUcsR0FBUCxHQUFhMEMsYUFBYSxHQUFHLEdBQTdCLEdBQW1DLE1BQW5DLEdBQTRDK0gsUUFBNUMsR0FBdUQsR0FEOUMsR0FFVC9ILGFBQWEsR0FBRyxHQUFoQixHQUFzQitILFFBQXRCLEdBQWlDLEdBRm5DO0FBR0Q7QUFDRjs7QUFFRCxXQUFTQyxrQkFBVCxDQUE2QlIsYUFBN0IsRUFBNENELFNBQTVDLEVBQXVEUSxRQUF2RCxFQUFpRTtBQUMvRCxRQUFJbFgsS0FBSjs7QUFFQSxRQUFJMlcsYUFBSixFQUFtQjtBQUNqQjNXLFdBQUssR0FBSTJXLGFBQWEsR0FBR0QsU0FBakIsR0FBOEIsSUFBdEM7QUFDRCxLQUZELE1BRU87QUFDTCxVQUFJLENBQUNqSixRQUFMLEVBQWU7QUFBRXlKLGdCQUFRLEdBQUdoVSxJQUFJLENBQUMyTCxLQUFMLENBQVdxSSxRQUFYLENBQVg7QUFBa0M7O0FBQ25ELFVBQUlFLFFBQVEsR0FBRzNKLFFBQVEsR0FBRzBCLGFBQUgsR0FBbUIrSCxRQUExQztBQUNBbFgsV0FBSyxHQUFHeU0sSUFBSSxHQUNWQSxJQUFJLEdBQUcsVUFBUCxHQUFvQjJLLFFBQXBCLEdBQStCLEdBRHJCLEdBRVYsTUFBTUEsUUFBTixHQUFpQixHQUZuQjtBQUdEOztBQUVEcFgsU0FBSyxHQUFHLFdBQVdBLEtBQW5CLENBYitELENBZS9EOztBQUNBLFdBQU9vTCxNQUFNLEtBQUssT0FBWCxHQUFxQnBMLEtBQUssR0FBRyxHQUE3QixHQUFtQ0EsS0FBSyxHQUFHLGNBQWxEO0FBQ0Q7O0FBRUQsV0FBU3FYLG1CQUFULENBQThCWCxTQUE5QixFQUF5QztBQUN2QyxRQUFJM1ksR0FBRyxHQUFHLEVBQVYsQ0FEdUMsQ0FHdkM7QUFDQTs7QUFDQSxRQUFJMlksU0FBUyxLQUFLLEtBQWxCLEVBQXlCO0FBQ3ZCLFVBQUlwWSxJQUFJLEdBQUdzUCxVQUFVLEdBQUcsVUFBSCxHQUFnQixTQUFyQztBQUFBLFVBQ0ltSixHQUFHLEdBQUduSixVQUFVLEdBQUcsT0FBSCxHQUFhLFFBRGpDO0FBRUE3UCxTQUFHLEdBQUdPLElBQUksR0FBSXlZLEdBQVIsR0FBYyxJQUFkLEdBQXFCTCxTQUFyQixHQUFpQyxLQUF2QztBQUNEOztBQUVELFdBQU8zWSxHQUFQO0FBQ0Q7O0FBRUQsV0FBU3VaLFlBQVQsQ0FBdUJqZixJQUF2QixFQUE2QmtmLEdBQTdCLEVBQWtDO0FBQ2hDLFFBQUlqVCxNQUFNLEdBQUdqTSxJQUFJLENBQUNtZixTQUFMLENBQWUsQ0FBZixFQUFrQm5mLElBQUksQ0FBQ3pGLE1BQUwsR0FBYzJrQixHQUFoQyxFQUFxQzdVLFdBQXJDLEVBQWI7O0FBQ0EsUUFBSTRCLE1BQUosRUFBWTtBQUFFQSxZQUFNLEdBQUcsTUFBTUEsTUFBTixHQUFlLEdBQXhCO0FBQThCOztBQUU1QyxXQUFPQSxNQUFQO0FBQ0Q7O0FBRUQsV0FBUzBTLDBCQUFULENBQXFDL00sS0FBckMsRUFBNEM7QUFDMUMsV0FBT3FOLFlBQVksQ0FBQ3hLLGtCQUFELEVBQXFCLEVBQXJCLENBQVosR0FBdUMsc0JBQXZDLEdBQWdFN0MsS0FBSyxHQUFHLElBQXhFLEdBQStFLElBQXRGO0FBQ0Q7O0FBRUQsV0FBU3dOLHlCQUFULENBQW9DeE4sS0FBcEMsRUFBMkM7QUFDekMsV0FBT3FOLFlBQVksQ0FBQ3RLLGlCQUFELEVBQW9CLEVBQXBCLENBQVosR0FBc0MscUJBQXRDLEdBQThEL0MsS0FBSyxHQUFHLElBQXRFLEdBQTZFLElBQXBGO0FBQ0Q7O0FBRUQsV0FBU2lMLGFBQVQsR0FBMEI7QUFDeEIsUUFBSXdDLFVBQVUsR0FBRyxXQUFqQjtBQUFBLFFBQ0lDLFVBQVUsR0FBRyxXQURqQjtBQUFBLFFBRUlDLFNBQVMsR0FBRzNGLFNBQVMsQ0FBQyxRQUFELENBRnpCO0FBSUFwRSxnQkFBWSxDQUFDMVAsU0FBYixHQUF5QnVaLFVBQXpCO0FBQ0E1SixnQkFBWSxDQUFDM1AsU0FBYixHQUF5QndaLFVBQXpCO0FBQ0E5SixnQkFBWSxDQUFDM08sRUFBYixHQUFrQnNSLE9BQU8sR0FBRyxLQUE1QjtBQUNBMUMsZ0JBQVksQ0FBQzVPLEVBQWIsR0FBa0JzUixPQUFPLEdBQUcsS0FBNUIsQ0FSd0IsQ0FVeEI7O0FBQ0EsUUFBSWhkLFNBQVMsQ0FBQzBMLEVBQVYsS0FBaUIsRUFBckIsRUFBeUI7QUFBRTFMLGVBQVMsQ0FBQzBMLEVBQVYsR0FBZXNSLE9BQWY7QUFBeUI7O0FBQ3BERCx1QkFBbUIsSUFBSTdELGdCQUFnQixJQUFJbkQsU0FBcEIsR0FBZ0MsZUFBaEMsR0FBa0Qsa0JBQXpFO0FBQ0FnSCx1QkFBbUIsSUFBSTlELElBQUksR0FBRyxXQUFILEdBQWlCLGNBQTVDOztBQUNBLFFBQUlsRCxTQUFKLEVBQWU7QUFBRWdILHlCQUFtQixJQUFJLGdCQUF2QjtBQUEwQzs7QUFDM0RBLHVCQUFtQixJQUFJLFVBQVVwSCxPQUFPLENBQUNFLElBQXpDO0FBQ0E3VixhQUFTLENBQUMySyxTQUFWLElBQXVCb1MsbUJBQXZCLENBaEJ3QixDQWtCeEI7O0FBQ0EsUUFBSTlDLFFBQUosRUFBYztBQUNaTSxtQkFBYSxHQUFHMU8sR0FBRyxDQUFDTSxhQUFKLENBQWtCLEtBQWxCLENBQWhCO0FBQ0FvTyxtQkFBYSxDQUFDN08sRUFBZCxHQUFtQnNSLE9BQU8sR0FBRyxLQUE3QjtBQUNBekMsbUJBQWEsQ0FBQzVQLFNBQWQsR0FBMEIsU0FBMUI7QUFFQTBQLGtCQUFZLENBQUNqTyxXQUFiLENBQXlCbU8sYUFBekI7QUFDQUEsbUJBQWEsQ0FBQ25PLFdBQWQsQ0FBMEJrTyxZQUExQjtBQUNELEtBUEQsTUFPTztBQUNMRCxrQkFBWSxDQUFDak8sV0FBYixDQUF5QmtPLFlBQXpCO0FBQ0Q7O0FBRUQsUUFBSTlDLFVBQUosRUFBZ0I7QUFDZCxVQUFJNk0sRUFBRSxHQUFHOUosYUFBYSxHQUFHQSxhQUFILEdBQW1CRCxZQUF6QztBQUNBK0osUUFBRSxDQUFDMVosU0FBSCxJQUFnQixTQUFoQjtBQUNEOztBQUVENlAsbUJBQWUsQ0FBQ3ZLLFlBQWhCLENBQTZCb0ssWUFBN0IsRUFBMkNyYSxTQUEzQztBQUNBc2EsZ0JBQVksQ0FBQ2xPLFdBQWIsQ0FBeUJwTSxTQUF6QixFQXBDd0IsQ0FzQ3hCO0FBQ0E7O0FBQ0F3RSx3RUFBTyxDQUFDbVcsVUFBRCxFQUFhLFVBQVNqSyxJQUFULEVBQWV2UixDQUFmLEVBQWtCO0FBQ3BDaUwsNEVBQVEsQ0FBQ3NHLElBQUQsRUFBTyxVQUFQLENBQVI7O0FBQ0EsVUFBSSxDQUFDQSxJQUFJLENBQUNoRixFQUFWLEVBQWM7QUFBRWdGLFlBQUksQ0FBQ2hGLEVBQUwsR0FBVXNSLE9BQU8sR0FBRyxPQUFWLEdBQW9CN2QsQ0FBOUI7QUFBa0M7O0FBQ2xELFVBQUksQ0FBQzhhLFFBQUQsSUFBYTVDLGFBQWpCLEVBQWdDO0FBQUVqTiw4RUFBUSxDQUFDc0csSUFBRCxFQUFPMkcsYUFBUCxDQUFSO0FBQWdDOztBQUNsRWhELDRFQUFRLENBQUMzRCxJQUFELEVBQU87QUFDYix1QkFBZSxNQURGO0FBRWIsb0JBQVk7QUFGQyxPQUFQLENBQVI7QUFJRCxLQVJNLENBQVAsQ0F4Q3dCLENBa0R4QjtBQUNBO0FBQ0E7O0FBQ0EsUUFBSStLLFVBQUosRUFBZ0I7QUFDZCxVQUFJNkksY0FBYyxHQUFHelksR0FBRyxDQUFDMFksc0JBQUosRUFBckI7QUFBQSxVQUNJQyxhQUFhLEdBQUczWSxHQUFHLENBQUMwWSxzQkFBSixFQURwQjs7QUFHQSxXQUFLLElBQUk1USxDQUFDLEdBQUc4SCxVQUFiLEVBQXlCOUgsQ0FBQyxFQUExQixHQUErQjtBQUM3QixZQUFJb1EsR0FBRyxHQUFHcFEsQ0FBQyxHQUFDaUgsVUFBWjtBQUFBLFlBQ0k2SixVQUFVLEdBQUc5SixVQUFVLENBQUNvSixHQUFELENBQVYsQ0FBZ0JXLFNBQWhCLENBQTBCLElBQTFCLENBRGpCO0FBRUF0YSw4RUFBUSxDQUFDcWEsVUFBRCxFQUFhMUYsZ0JBQWIsQ0FBUjtBQUNBekwsb0ZBQVcsQ0FBQ21SLFVBQUQsRUFBYSxJQUFiLENBQVg7QUFDQUQscUJBQWEsQ0FBQ3ZVLFlBQWQsQ0FBMkJ3VSxVQUEzQixFQUF1Q0QsYUFBYSxDQUFDRyxVQUFyRDs7QUFFQSxZQUFJMUssUUFBSixFQUFjO0FBQ1osY0FBSTJLLFNBQVMsR0FBR2pLLFVBQVUsQ0FBQ0MsVUFBVSxHQUFHLENBQWIsR0FBaUJtSixHQUFsQixDQUFWLENBQWlDVyxTQUFqQyxDQUEyQyxJQUEzQyxDQUFoQjtBQUNBdGEsZ0ZBQVEsQ0FBQ3dhLFNBQUQsRUFBWTdGLGdCQUFaLENBQVI7QUFDQXpMLHNGQUFXLENBQUNzUixTQUFELEVBQVksSUFBWixDQUFYO0FBQ0FOLHdCQUFjLENBQUNsWSxXQUFmLENBQTJCd1ksU0FBM0I7QUFDRDtBQUNGOztBQUVENWtCLGVBQVMsQ0FBQ2lRLFlBQVYsQ0FBdUJxVSxjQUF2QixFQUF1Q3RrQixTQUFTLENBQUMya0IsVUFBakQ7QUFDQTNrQixlQUFTLENBQUNvTSxXQUFWLENBQXNCb1ksYUFBdEI7QUFDQTdKLGdCQUFVLEdBQUczYSxTQUFTLENBQUMrUyxRQUF2QjtBQUNEO0FBRUY7O0FBRUQsV0FBUzZPLG1CQUFULEdBQWdDO0FBQzlCO0FBQ0EsUUFBSW5ELFNBQVMsQ0FBQyxZQUFELENBQVQsSUFBMkIxSSxTQUEzQixJQUF3QyxDQUFDcUUsVUFBN0MsRUFBeUQ7QUFDdkQsVUFBSXlLLElBQUksR0FBRzdrQixTQUFTLENBQUNkLGdCQUFWLENBQTJCLEtBQTNCLENBQVgsQ0FEdUQsQ0FHdkQ7O0FBQ0FzRiwwRUFBTyxDQUFDcWdCLElBQUQsRUFBTyxVQUFTQyxHQUFULEVBQWM7QUFDMUIsWUFBSUMsR0FBRyxHQUFHRCxHQUFHLENBQUNDLEdBQWQ7O0FBRUEsWUFBSSxDQUFDemtCLFFBQUwsRUFBZTtBQUNiO0FBQ0EsY0FBSXlrQixHQUFHLElBQUlBLEdBQUcsQ0FBQy9aLE9BQUosQ0FBWSxZQUFaLElBQTRCLENBQXZDLEVBQTBDO0FBQ3hDOFosZUFBRyxDQUFDQyxHQUFKLEdBQVUsRUFBVjtBQUNBbmEsb0ZBQVMsQ0FBQ2thLEdBQUQsRUFBTTdGLFNBQU4sQ0FBVDtBQUNBN1Usa0ZBQVEsQ0FBQzBhLEdBQUQsRUFBTSxTQUFOLENBQVI7QUFFQUEsZUFBRyxDQUFDQyxHQUFKLEdBQVVBLEdBQVYsQ0FMd0MsQ0FNMUM7QUFDQyxXQVBELE1BT087QUFDTEMscUJBQVMsQ0FBQ0YsR0FBRCxDQUFUO0FBQ0Q7QUFDRjtBQUNGLE9BaEJNLENBQVAsQ0FKdUQsQ0FzQnZEOztBQUNBOVIsaUVBQUcsQ0FBQyxZQUFVO0FBQUVpUyx1QkFBZSxDQUFDL1osd0ZBQWlCLENBQUMyWixJQUFELENBQWxCLEVBQTBCLFlBQVc7QUFBRXpGLHNCQUFZLEdBQUcsSUFBZjtBQUFzQixTQUE3RCxDQUFmO0FBQWdGLE9BQTdGLENBQUgsQ0F2QnVELENBeUJ2RDs7QUFDQSxVQUFJWCxTQUFTLENBQUMsWUFBRCxDQUFiLEVBQTZCO0FBQUVvRyxZQUFJLEdBQUdLLGFBQWEsQ0FBQ2piLEtBQUQsRUFBUXlGLElBQUksQ0FBQ3lCLEdBQUwsQ0FBU2xILEtBQUssR0FBRy9KLEtBQVIsR0FBZ0IsQ0FBekIsRUFBNEJ5YixhQUFhLEdBQUcsQ0FBNUMsQ0FBUixDQUFwQjtBQUE4RTs7QUFFN0dyYixjQUFRLEdBQUc2a0IsNkJBQTZCLEVBQWhDLEdBQXFDblMsMkRBQUcsQ0FBQyxZQUFVO0FBQUVpUyx1QkFBZSxDQUFDL1osd0ZBQWlCLENBQUMyWixJQUFELENBQWxCLEVBQTBCTSw2QkFBMUIsQ0FBZjtBQUEwRSxPQUF2RixDQUFoRDtBQUVELEtBOUJELE1BOEJPO0FBQ0w7QUFDQSxVQUFJbEwsUUFBSixFQUFjO0FBQUVtTCxrQ0FBMEI7QUFBSyxPQUYxQyxDQUlMOzs7QUFDQUMsZUFBUztBQUNUQyxnQkFBVTtBQUNYO0FBQ0Y7O0FBRUQsV0FBU0gsNkJBQVQsR0FBMEM7QUFDeEMsUUFBSXBQLFNBQVMsSUFBSTZFLFVBQVUsR0FBRyxDQUE5QixFQUFpQztBQUMvQjtBQUNBLFVBQUltSixHQUFHLEdBQUczakIsSUFBSSxHQUFHNkosS0FBSCxHQUFXMlEsVUFBVSxHQUFHLENBQXRDOztBQUVBLE9BQUMsU0FBUzJLLHNCQUFULEdBQWtDO0FBQ2pDLFlBQUl6UyxJQUFJLEdBQUc2SCxVQUFVLENBQUNvSixHQUFELENBQVYsQ0FBZ0JsUixxQkFBaEIsR0FBd0NDLElBQW5EO0FBQ0EsWUFBSThQLEtBQUssR0FBR2pJLFVBQVUsQ0FBQ29KLEdBQUcsR0FBRyxDQUFQLENBQVYsQ0FBb0JsUixxQkFBcEIsR0FBNEMrUCxLQUF4RDtBQUVDbFQsWUFBSSxDQUFDQyxHQUFMLENBQVNtRCxJQUFJLEdBQUc4UCxLQUFoQixLQUEwQixDQUEzQixHQUNFNEMsdUJBQXVCLEVBRHpCLEdBRUUvVCxVQUFVLENBQUMsWUFBVTtBQUFFOFQsZ0NBQXNCO0FBQUksU0FBdkMsRUFBeUMsRUFBekMsQ0FGWjtBQUdELE9BUEQ7QUFTRCxLQWJELE1BYU87QUFDTEMsNkJBQXVCO0FBQ3hCO0FBQ0Y7O0FBR0QsV0FBU0EsdUJBQVQsR0FBb0M7QUFDbEM7QUFDQSxRQUFJLENBQUNwTCxVQUFELElBQWVyRSxTQUFuQixFQUE4QjtBQUM1QjBQLHVCQUFpQjs7QUFFakIsVUFBSTFQLFNBQUosRUFBZTtBQUNiOEYscUJBQWEsR0FBR0MsZ0JBQWdCLEVBQWhDOztBQUNBLFlBQUkvRCxTQUFKLEVBQWU7QUFBRW9GLGdCQUFNLEdBQUdDLFNBQVMsRUFBbEI7QUFBdUI7O0FBQ3hDVCxnQkFBUSxHQUFHUixXQUFXLEVBQXRCLENBSGEsQ0FHYTs7QUFDMUJzRixnQ0FBd0IsQ0FBQ3hFLE9BQU8sSUFBSUUsTUFBWixDQUF4QjtBQUNELE9BTEQsTUFLTztBQUNMdUksa0NBQTBCO0FBQzNCO0FBQ0YsS0FiaUMsQ0FlbEM7OztBQUNBLFFBQUl6TCxRQUFKLEVBQWM7QUFBRW1MLGdDQUEwQjtBQUFLLEtBaEJiLENBa0JsQzs7O0FBQ0FDLGFBQVM7QUFDVEMsY0FBVTtBQUNYOztBQUVELFdBQVMzRCxTQUFULEdBQXNCO0FBQ3BCO0FBQ0E7QUFDQSxRQUFJLENBQUMxSCxRQUFMLEVBQWU7QUFDYixXQUFLLElBQUk5YSxDQUFDLEdBQUc4SyxLQUFSLEVBQWVvQixDQUFDLEdBQUdwQixLQUFLLEdBQUd5RixJQUFJLENBQUN5QixHQUFMLENBQVN5SixVQUFULEVBQXFCMWEsS0FBckIsQ0FBaEMsRUFBNkRmLENBQUMsR0FBR2tNLENBQWpFLEVBQW9FbE0sQ0FBQyxFQUFyRSxFQUF5RTtBQUN2RSxZQUFJdVIsSUFBSSxHQUFHaUssVUFBVSxDQUFDeGIsQ0FBRCxDQUFyQjtBQUNBdVIsWUFBSSxDQUFDbkUsS0FBTCxDQUFXdUcsSUFBWCxHQUFrQixDQUFDM1QsQ0FBQyxHQUFHOEssS0FBTCxJQUFjLEdBQWQsR0FBb0IvSixLQUFwQixHQUE0QixHQUE5QztBQUNBa0ssOEVBQVEsQ0FBQ3NHLElBQUQsRUFBT3lHLFNBQVAsQ0FBUjtBQUNBbkQsb0ZBQVcsQ0FBQ3RELElBQUQsRUFBTzJHLGFBQVAsQ0FBWDtBQUNEO0FBQ0YsS0FWbUIsQ0FZcEI7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7OztBQUNBLFFBQUkrQyxVQUFKLEVBQWdCO0FBQ2QsVUFBSWxCLGdCQUFnQixJQUFJbkQsU0FBeEIsRUFBbUM7QUFDakNsTSxrRkFBVSxDQUFDQyxLQUFELEVBQVEsTUFBTWtULE9BQU4sR0FBZ0IsY0FBeEIsRUFBd0MsZUFBZTFSLEdBQUcsQ0FBQ3dFLGdCQUFKLENBQXFCNkssVUFBVSxDQUFDLENBQUQsQ0FBL0IsRUFBb0NnTCxRQUFuRCxHQUE4RCxHQUF0RyxFQUEyR2pYLHdGQUFpQixDQUFDNUUsS0FBRCxDQUE1SCxDQUFWO0FBQ0FELGtGQUFVLENBQUNDLEtBQUQsRUFBUSxNQUFNa1QsT0FBZCxFQUF1QixjQUF2QixFQUF1Q3RPLHdGQUFpQixDQUFDNUUsS0FBRCxDQUF4RCxDQUFWO0FBQ0QsT0FIRCxNQUdPLElBQUltUSxRQUFKLEVBQWM7QUFDbkJ6Viw0RUFBTyxDQUFDbVcsVUFBRCxFQUFhLFVBQVVpTCxLQUFWLEVBQWlCem1CLENBQWpCLEVBQW9CO0FBQ3RDeW1CLGVBQUssQ0FBQ3JaLEtBQU4sQ0FBWXNaLFVBQVosR0FBeUI5QyxrQkFBa0IsQ0FBQzVqQixDQUFELENBQTNDO0FBQ0QsU0FGTSxDQUFQO0FBR0Q7QUFDRixLQW5DbUIsQ0FzQ3BCOzs7QUFDQSxRQUFJZ2EsS0FBSixFQUFXO0FBQ1Q7QUFDQSxVQUFJRyxrQkFBSixFQUF3QjtBQUN0QixZQUFJL08sR0FBRyxHQUFHZ1EsYUFBYSxJQUFJNUUsT0FBTyxDQUFDNkIsVUFBekIsR0FBc0NnTSwwQkFBMEIsQ0FBQzdOLE9BQU8sQ0FBQ2MsS0FBVCxDQUFoRSxHQUFrRixFQUE1RjtBQUNBNU0sa0ZBQVUsQ0FBQ0MsS0FBRCxFQUFRLE1BQU1rVCxPQUFOLEdBQWdCLEtBQXhCLEVBQStCelMsR0FBL0IsRUFBb0NtRSx3RkFBaUIsQ0FBQzVFLEtBQUQsQ0FBckQsQ0FBVjtBQUNELE9BTFEsQ0FPVDs7O0FBQ0FTLFNBQUcsR0FBR3lZLHFCQUFxQixDQUFDck4sT0FBTyxDQUFDOVYsV0FBVCxFQUFzQjhWLE9BQU8sQ0FBQ3hWLE1BQTlCLEVBQXNDd1YsT0FBTyxDQUFDRyxVQUE5QyxFQUEwREgsT0FBTyxDQUFDYyxLQUFsRSxFQUF5RWQsT0FBTyxDQUFDNkIsVUFBakYsQ0FBM0I7QUFDQTNOLGdGQUFVLENBQUNDLEtBQUQsRUFBUSxNQUFNa1QsT0FBTixHQUFnQixLQUF4QixFQUErQnpTLEdBQS9CLEVBQW9DbUUsd0ZBQWlCLENBQUM1RSxLQUFELENBQXJELENBQVYsQ0FUUyxDQVdUOztBQUNBLFVBQUltUSxRQUFKLEVBQWM7QUFDWjFQLFdBQUcsR0FBRzZQLFVBQVUsSUFBSSxDQUFDckUsU0FBZixHQUEyQixXQUFXME4saUJBQWlCLENBQUM5TixPQUFPLENBQUNHLFVBQVQsRUFBcUJILE9BQU8sQ0FBQ3hWLE1BQTdCLEVBQXFDd1YsT0FBTyxDQUFDelYsS0FBN0MsQ0FBNUIsR0FBa0YsR0FBN0csR0FBbUgsRUFBekg7O0FBQ0EsWUFBSW9aLGtCQUFKLEVBQXdCO0FBQUUvTyxhQUFHLElBQUlpWiwwQkFBMEIsQ0FBQy9NLEtBQUQsQ0FBakM7QUFBMkM7O0FBQ3JFNU0sa0ZBQVUsQ0FBQ0MsS0FBRCxFQUFRLE1BQU1rVCxPQUFkLEVBQXVCelMsR0FBdkIsRUFBNEJtRSx3RkFBaUIsQ0FBQzVFLEtBQUQsQ0FBN0MsQ0FBVjtBQUNELE9BaEJRLENBa0JUOzs7QUFDQVMsU0FBRyxHQUFHNlAsVUFBVSxJQUFJLENBQUNyRSxTQUFmLEdBQTJCNE4sa0JBQWtCLENBQUNoTyxPQUFPLENBQUNHLFVBQVQsRUFBcUJILE9BQU8sQ0FBQ3hWLE1BQTdCLEVBQXFDd1YsT0FBTyxDQUFDelYsS0FBN0MsQ0FBN0MsR0FBbUcsRUFBekc7O0FBQ0EsVUFBSXlWLE9BQU8sQ0FBQ3hWLE1BQVosRUFBb0I7QUFBRW9LLFdBQUcsSUFBSXNaLG1CQUFtQixDQUFDbE8sT0FBTyxDQUFDeFYsTUFBVCxDQUExQjtBQUE2QyxPQXBCMUQsQ0FxQlQ7OztBQUNBLFVBQUksQ0FBQzhaLFFBQUwsRUFBZTtBQUNiLFlBQUlYLGtCQUFKLEVBQXdCO0FBQUUvTyxhQUFHLElBQUlpWiwwQkFBMEIsQ0FBQy9NLEtBQUQsQ0FBakM7QUFBMkM7O0FBQ3JFLFlBQUkrQyxpQkFBSixFQUF1QjtBQUFFalAsYUFBRyxJQUFJMFoseUJBQXlCLENBQUN4TixLQUFELENBQWhDO0FBQTBDO0FBQ3BFOztBQUNELFVBQUlsTSxHQUFKLEVBQVM7QUFBRVYsa0ZBQVUsQ0FBQ0MsS0FBRCxFQUFRLE1BQU1rVCxPQUFOLEdBQWdCLGNBQXhCLEVBQXdDelMsR0FBeEMsRUFBNkNtRSx3RkFBaUIsQ0FBQzVFLEtBQUQsQ0FBOUQsQ0FBVjtBQUFtRixPQTFCckYsQ0E0Qlg7QUFDQTtBQUNBO0FBQ0E7O0FBQ0MsS0FoQ0QsTUFnQ087QUFDTDtBQUNBZ2MseUNBQW1DLEdBRjlCLENBSUw7O0FBQ0F4TCxrQkFBWSxDQUFDL04sS0FBYixDQUFtQndGLE9BQW5CLEdBQTZCaVIscUJBQXFCLENBQUNuakIsV0FBRCxFQUFjTSxNQUFkLEVBQXNCMlYsVUFBdEIsRUFBa0MwQixVQUFsQyxDQUFsRCxDQUxLLENBT0w7O0FBQ0EsVUFBSXlDLFFBQVEsSUFBSUcsVUFBWixJQUEwQixDQUFDckUsU0FBL0IsRUFBMEM7QUFDeEMvVixpQkFBUyxDQUFDdU0sS0FBVixDQUFnQkMsS0FBaEIsR0FBd0JpWCxpQkFBaUIsQ0FBQzNOLFVBQUQsRUFBYTNWLE1BQWIsRUFBcUJELEtBQXJCLENBQXpDO0FBQ0QsT0FWSSxDQVlMOzs7QUFDQSxVQUFJcUssR0FBRyxHQUFHNlAsVUFBVSxJQUFJLENBQUNyRSxTQUFmLEdBQTJCNE4sa0JBQWtCLENBQUM3TixVQUFELEVBQWEzVixNQUFiLEVBQXFCRCxLQUFyQixDQUE3QyxHQUEyRSxFQUFyRjs7QUFDQSxVQUFJQyxNQUFKLEVBQVk7QUFBRW9LLFdBQUcsSUFBSXNaLG1CQUFtQixDQUFDMWpCLE1BQUQsQ0FBMUI7QUFBcUMsT0FkOUMsQ0FnQkw7OztBQUNBLFVBQUlvSyxHQUFKLEVBQVM7QUFBRVYsa0ZBQVUsQ0FBQ0MsS0FBRCxFQUFRLE1BQU1rVCxPQUFOLEdBQWdCLGNBQXhCLEVBQXdDelMsR0FBeEMsRUFBNkNtRSx3RkFBaUIsQ0FBQzVFLEtBQUQsQ0FBOUQsQ0FBVjtBQUFtRjtBQUMvRixLQXpGbUIsQ0EyRnBCOzs7QUFDQSxRQUFJdkosVUFBVSxJQUFJNFksS0FBbEIsRUFBeUI7QUFDdkIsV0FBSyxJQUFJZ0osRUFBVCxJQUFlNWhCLFVBQWYsRUFBMkI7QUFDekI7QUFDQTRoQixVQUFFLEdBQUdXLFFBQVEsQ0FBQ1gsRUFBRCxDQUFiO0FBRUEsWUFBSWhRLElBQUksR0FBRzVSLFVBQVUsQ0FBQzRoQixFQUFELENBQXJCO0FBQUEsWUFDSTVYLEdBQUcsR0FBRyxFQURWO0FBQUEsWUFFSXdiLGdCQUFnQixHQUFHLEVBRnZCO0FBQUEsWUFHSUMsZUFBZSxHQUFHLEVBSHRCO0FBQUEsWUFJSUMsWUFBWSxHQUFHLEVBSm5CO0FBQUEsWUFLSUMsUUFBUSxHQUFHLEVBTGY7QUFBQSxZQU1JQyxPQUFPLEdBQUcsQ0FBQ3BRLFNBQUQsR0FBYW1GLFNBQVMsQ0FBQyxPQUFELEVBQVVpSCxFQUFWLENBQXRCLEdBQXNDLElBTnBEO0FBQUEsWUFPSWlFLFlBQVksR0FBR2xMLFNBQVMsQ0FBQyxZQUFELEVBQWVpSCxFQUFmLENBUDVCO0FBQUEsWUFRSWtFLE9BQU8sR0FBR25MLFNBQVMsQ0FBQyxPQUFELEVBQVVpSCxFQUFWLENBUnZCO0FBQUEsWUFTSW1FLGFBQWEsR0FBR3BMLFNBQVMsQ0FBQyxhQUFELEVBQWdCaUgsRUFBaEIsQ0FUN0I7QUFBQSxZQVVJa0IsWUFBWSxHQUFHbkksU0FBUyxDQUFDLFlBQUQsRUFBZWlILEVBQWYsQ0FWNUI7QUFBQSxZQVdJb0UsUUFBUSxHQUFHckwsU0FBUyxDQUFDLFFBQUQsRUFBV2lILEVBQVgsQ0FYeEIsQ0FKeUIsQ0FpQnpCOztBQUNBLFlBQUk3SSxrQkFBa0IsSUFBSWlCLGFBQXRCLElBQXVDVyxTQUFTLENBQUMsWUFBRCxFQUFlaUgsRUFBZixDQUFoRCxJQUFzRSxXQUFXaFEsSUFBckYsRUFBMkY7QUFDekY0VCwwQkFBZ0IsR0FBRyxNQUFNL0ksT0FBTixHQUFnQixNQUFoQixHQUF5QndHLDBCQUEwQixDQUFDNkMsT0FBRCxDQUFuRCxHQUErRCxHQUFsRjtBQUNELFNBcEJ3QixDQXNCekI7OztBQUNBLFlBQUksaUJBQWlCbFUsSUFBakIsSUFBeUIsWUFBWUEsSUFBekMsRUFBK0M7QUFDN0M2VCx5QkFBZSxHQUFHLE1BQU1oSixPQUFOLEdBQWdCLE1BQWhCLEdBQXlCZ0cscUJBQXFCLENBQUNzRCxhQUFELEVBQWdCQyxRQUFoQixFQUEwQkgsWUFBMUIsRUFBd0NDLE9BQXhDLEVBQWlEaEQsWUFBakQsQ0FBOUMsR0FBK0csR0FBakk7QUFDRCxTQXpCd0IsQ0EyQnpCOzs7QUFDQSxZQUFJcEosUUFBUSxJQUFJRyxVQUFaLElBQTBCLENBQUNyRSxTQUEzQixLQUF5QyxnQkFBZ0I1RCxJQUFoQixJQUF3QixXQUFXQSxJQUFuQyxJQUE0QzJELFVBQVUsSUFBSSxZQUFZM0QsSUFBL0csQ0FBSixFQUEySDtBQUN6SDhULHNCQUFZLEdBQUcsV0FBV3hDLGlCQUFpQixDQUFDMkMsWUFBRCxFQUFlRyxRQUFmLEVBQXlCSixPQUF6QixDQUE1QixHQUFnRSxHQUEvRTtBQUNEOztBQUNELFlBQUk3TSxrQkFBa0IsSUFBSSxXQUFXbkgsSUFBckMsRUFBMkM7QUFDekM4VCxzQkFBWSxJQUFJekMsMEJBQTBCLENBQUM2QyxPQUFELENBQTFDO0FBQ0Q7O0FBQ0QsWUFBSUosWUFBSixFQUFrQjtBQUNoQkEsc0JBQVksR0FBRyxNQUFNakosT0FBTixHQUFnQixHQUFoQixHQUFzQmlKLFlBQXRCLEdBQXFDLEdBQXBEO0FBQ0QsU0FwQ3dCLENBc0N6Qjs7O0FBQ0EsWUFBSSxnQkFBZ0I5VCxJQUFoQixJQUF5QjJELFVBQVUsSUFBSSxZQUFZM0QsSUFBbkQsSUFBNEQsQ0FBQzhILFFBQUQsSUFBYSxXQUFXOUgsSUFBeEYsRUFBOEY7QUFDNUYrVCxrQkFBUSxJQUFJdkMsa0JBQWtCLENBQUN5QyxZQUFELEVBQWVHLFFBQWYsRUFBeUJKLE9BQXpCLENBQTlCO0FBQ0Q7O0FBQ0QsWUFBSSxZQUFZaFUsSUFBaEIsRUFBc0I7QUFDcEIrVCxrQkFBUSxJQUFJckMsbUJBQW1CLENBQUMwQyxRQUFELENBQS9CO0FBQ0QsU0E1Q3dCLENBNkN6Qjs7O0FBQ0EsWUFBSSxDQUFDdE0sUUFBRCxJQUFhLFdBQVc5SCxJQUE1QixFQUFrQztBQUNoQyxjQUFJbUgsa0JBQUosRUFBd0I7QUFBRTRNLG9CQUFRLElBQUkxQywwQkFBMEIsQ0FBQzZDLE9BQUQsQ0FBdEM7QUFBa0Q7O0FBQzVFLGNBQUk3TSxpQkFBSixFQUF1QjtBQUFFME0sb0JBQVEsSUFBSWpDLHlCQUF5QixDQUFDb0MsT0FBRCxDQUFyQztBQUFpRDtBQUMzRTs7QUFDRCxZQUFJSCxRQUFKLEVBQWM7QUFBRUEsa0JBQVEsR0FBRyxNQUFNbEosT0FBTixHQUFnQixlQUFoQixHQUFrQ2tKLFFBQWxDLEdBQTZDLEdBQXhEO0FBQThELFNBbERyRCxDQW9EekI7OztBQUNBM2IsV0FBRyxHQUFHd2IsZ0JBQWdCLEdBQUdDLGVBQW5CLEdBQXFDQyxZQUFyQyxHQUFvREMsUUFBMUQ7O0FBRUEsWUFBSTNiLEdBQUosRUFBUztBQUNQVCxlQUFLLENBQUNJLFVBQU4sQ0FBaUIsd0JBQXdCaVksRUFBRSxHQUFHLEVBQTdCLEdBQWtDLE9BQWxDLEdBQTRDNVgsR0FBNUMsR0FBa0QsR0FBbkUsRUFBd0VULEtBQUssQ0FBQzhFLFFBQU4sQ0FBZXhQLE1BQXZGO0FBQ0Q7QUFDRjtBQUNGO0FBQ0Y7O0FBRUQsV0FBU2ltQixTQUFULEdBQXNCO0FBQ3BCO0FBQ0FtQixxQkFBaUIsR0FGRyxDQUlwQjs7QUFDQW5NLGdCQUFZLENBQUNvTSxrQkFBYixDQUFnQyxZQUFoQyxFQUE4Qyx1SEFBdUhDLGdCQUFnQixFQUF2SSxHQUE0SSxjQUE1SSxHQUE2SjlMLFVBQTdKLEdBQTBLLFFBQXhOO0FBQ0F5RSxxQkFBaUIsR0FBR2hGLFlBQVksQ0FBQy9NLGFBQWIsQ0FBMkIsMEJBQTNCLENBQXBCLENBTm9CLENBUXBCOztBQUNBLFFBQUlxUixXQUFKLEVBQWlCO0FBQ2YsVUFBSWdJLEdBQUcsR0FBR2pRLFFBQVEsR0FBRyxNQUFILEdBQVksT0FBOUI7O0FBQ0EsVUFBSU0sY0FBSixFQUFvQjtBQUNsQjNDLDhFQUFRLENBQUMyQyxjQUFELEVBQWlCO0FBQUMseUJBQWUyUDtBQUFoQixTQUFqQixDQUFSO0FBQ0QsT0FGRCxNQUVPLElBQUloUixPQUFPLENBQUNzQixvQkFBWixFQUFrQztBQUN2Q29ELG9CQUFZLENBQUNvTSxrQkFBYixDQUFnQ2pFLGlCQUFpQixDQUFDN00sT0FBTyxDQUFDZ0IsZ0JBQVQsQ0FBakQsRUFBNkUsd0NBQXdDZ1EsR0FBeEMsR0FBOEMsSUFBOUMsR0FBcURsRyxtQkFBbUIsQ0FBQyxDQUFELENBQXhFLEdBQThFa0csR0FBOUUsR0FBb0ZsRyxtQkFBbUIsQ0FBQyxDQUFELENBQXZHLEdBQTZHM0osWUFBWSxDQUFDLENBQUQsQ0FBekgsR0FBK0gsV0FBNU07QUFDQUUsc0JBQWMsR0FBR3FELFlBQVksQ0FBQy9NLGFBQWIsQ0FBMkIsZUFBM0IsQ0FBakI7QUFDRCxPQVBjLENBU2Y7OztBQUNBLFVBQUkwSixjQUFKLEVBQW9CO0FBQ2xCcE0sZ0ZBQVMsQ0FBQ29NLGNBQUQsRUFBaUI7QUFBQyxtQkFBUzRQO0FBQVYsU0FBakIsQ0FBVDtBQUNEOztBQUVELFVBQUlsUSxRQUFKLEVBQWM7QUFDWm1RLHFCQUFhOztBQUNiLFlBQUk5UCxrQkFBSixFQUF3QjtBQUFFbk0sa0ZBQVMsQ0FBQzVLLFNBQUQsRUFBWTRkLFdBQVosQ0FBVDtBQUFvQzs7QUFDOUQsWUFBSTFHLHlCQUFKLEVBQStCO0FBQUV0TSxrRkFBUyxDQUFDNUssU0FBRCxFQUFZK2QsZUFBWixDQUFUO0FBQXdDO0FBQzFFO0FBQ0YsS0E1Qm1CLENBOEJwQjs7O0FBQ0EsUUFBSVcsTUFBSixFQUFZO0FBQ1YsVUFBSW9JLFNBQVMsR0FBRyxDQUFDN00sUUFBRCxHQUFZLENBQVosR0FBZ0J3QixVQUFoQyxDQURVLENBRVY7QUFDQTs7QUFDQSxVQUFJbEYsWUFBSixFQUFrQjtBQUNoQmxDLDhFQUFRLENBQUNrQyxZQUFELEVBQWU7QUFBQyx3QkFBYztBQUFmLFNBQWYsQ0FBUjtBQUNBc0osZ0JBQVEsR0FBR3RKLFlBQVksQ0FBQ3hELFFBQXhCO0FBQ0F2Tyw0RUFBTyxDQUFDcWIsUUFBRCxFQUFXLFVBQVNuUCxJQUFULEVBQWV2UixDQUFmLEVBQWtCO0FBQ2xDa1YsZ0ZBQVEsQ0FBQzNELElBQUQsRUFBTztBQUNiLHdCQUFZdlIsQ0FEQztBQUViLHdCQUFZLElBRkM7QUFHYiwwQkFBY21oQixNQUFNLElBQUluaEIsQ0FBQyxHQUFHLENBQVIsQ0FIUDtBQUliLDZCQUFpQjZkO0FBSkosV0FBUCxDQUFSO0FBTUQsU0FQTSxDQUFQLENBSGdCLENBWWxCO0FBQ0MsT0FiRCxNQWFPO0FBQ0wsWUFBSStKLE9BQU8sR0FBRyxFQUFkO0FBQUEsWUFDSUMsU0FBUyxHQUFHeFEsZUFBZSxHQUFHLEVBQUgsR0FBUSxzQkFEdkM7O0FBRUEsYUFBSyxJQUFJclgsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR3liLFVBQXBCLEVBQWdDemIsQ0FBQyxFQUFqQyxFQUFxQztBQUNuQztBQUNBNG5CLGlCQUFPLElBQUkscUNBQXFDNW5CLENBQXJDLEdBQXdDLGlDQUF4QyxHQUE0RTZkLE9BQTVFLEdBQXNGLElBQXRGLEdBQTZGZ0ssU0FBN0YsR0FBeUcsZUFBekcsR0FBMkgxRyxNQUEzSCxJQUFxSW5oQixDQUFDLEdBQUcsQ0FBekksSUFBNkksYUFBeEo7QUFDRDs7QUFDRDRuQixlQUFPLEdBQUcsMkRBQTJEQSxPQUEzRCxHQUFxRSxRQUEvRTtBQUNBMU0sb0JBQVksQ0FBQ29NLGtCQUFiLENBQWdDakUsaUJBQWlCLENBQUM3TSxPQUFPLENBQUNoVixXQUFULENBQWpELEVBQXdFb21CLE9BQXhFO0FBRUF4USxvQkFBWSxHQUFHOEQsWUFBWSxDQUFDL00sYUFBYixDQUEyQixVQUEzQixDQUFmO0FBQ0F1UyxnQkFBUSxHQUFHdEosWUFBWSxDQUFDeEQsUUFBeEI7QUFDRDs7QUFFRGtVLHlCQUFtQixHQS9CVCxDQWlDVjs7QUFDQSxVQUFJM04sa0JBQUosRUFBd0I7QUFDdEIsWUFBSXhJLE1BQU0sR0FBR3dJLGtCQUFrQixDQUFDMEssU0FBbkIsQ0FBNkIsQ0FBN0IsRUFBZ0MxSyxrQkFBa0IsQ0FBQ2xhLE1BQW5CLEdBQTRCLEVBQTVELEVBQWdFOFAsV0FBaEUsRUFBYjtBQUFBLFlBQ0kzRSxHQUFHLEdBQUcscUJBQXFCa00sS0FBSyxHQUFHLElBQTdCLEdBQW9DLEdBRDlDOztBQUdBLFlBQUkzRixNQUFKLEVBQVk7QUFDVnZHLGFBQUcsR0FBRyxNQUFNdUcsTUFBTixHQUFlLEdBQWYsR0FBcUJ2RyxHQUEzQjtBQUNEOztBQUVEVixrRkFBVSxDQUFDQyxLQUFELEVBQVEscUJBQXFCa1QsT0FBckIsR0FBK0IsUUFBdkMsRUFBaUR6UyxHQUFqRCxFQUFzRG1FLHdGQUFpQixDQUFDNUUsS0FBRCxDQUF2RSxDQUFWO0FBQ0Q7O0FBRUR1Syw0RUFBUSxDQUFDd0wsUUFBUSxDQUFDSyxlQUFELENBQVQsRUFBNEI7QUFBQyxzQkFBY0ksTUFBTSxJQUFJSixlQUFlLEdBQUcsQ0FBdEIsQ0FBTixHQUFpQ0s7QUFBaEQsT0FBNUIsQ0FBUjtBQUNBak4sa0ZBQVcsQ0FBQ3VNLFFBQVEsQ0FBQ0ssZUFBRCxDQUFULEVBQTRCLFVBQTVCLENBQVg7QUFDQTlWLDRFQUFRLENBQUN5VixRQUFRLENBQUNLLGVBQUQsQ0FBVCxFQUE0QkcsY0FBNUIsQ0FBUixDQS9DVSxDQWlEVjs7QUFDQXpWLDhFQUFTLENBQUMyTCxZQUFELEVBQWVrSCxTQUFmLENBQVQ7QUFDRCxLQWxGbUIsQ0FzRnBCOzs7QUFDQSxRQUFJZSxXQUFKLEVBQWlCO0FBQ2YsVUFBSSxDQUFDckksaUJBQUQsS0FBdUIsQ0FBQ0MsVUFBRCxJQUFlLENBQUNDLFVBQXZDLENBQUosRUFBd0Q7QUFDdERnRSxvQkFBWSxDQUFDb00sa0JBQWIsQ0FBZ0NqRSxpQkFBaUIsQ0FBQzdNLE9BQU8sQ0FBQ08sZ0JBQVQsQ0FBakQsRUFBNkUscUpBQXFKOEcsT0FBckosR0FBOEosSUFBOUosR0FBcUt0YyxZQUFZLENBQUMsQ0FBRCxDQUFqTCxHQUF1TCxtRkFBdkwsR0FBNlFzYyxPQUE3USxHQUFzUixJQUF0UixHQUE2UnRjLFlBQVksQ0FBQyxDQUFELENBQXpTLEdBQStTLGlCQUE1WDtBQUVBeVYseUJBQWlCLEdBQUdrRSxZQUFZLENBQUMvTSxhQUFiLENBQTJCLGVBQTNCLENBQXBCO0FBQ0Q7O0FBRUQsVUFBSSxDQUFDOEksVUFBRCxJQUFlLENBQUNDLFVBQXBCLEVBQWdDO0FBQzlCRCxrQkFBVSxHQUFHRCxpQkFBaUIsQ0FBQ3BELFFBQWxCLENBQTJCLENBQTNCLENBQWI7QUFDQXNELGtCQUFVLEdBQUdGLGlCQUFpQixDQUFDcEQsUUFBbEIsQ0FBMkIsQ0FBM0IsQ0FBYjtBQUNEOztBQUVELFVBQUk0QyxPQUFPLENBQUNRLGlCQUFaLEVBQStCO0FBQzdCOUIsOEVBQVEsQ0FBQzhCLGlCQUFELEVBQW9CO0FBQzFCLHdCQUFjLHFCQURZO0FBRTFCLHNCQUFZO0FBRmMsU0FBcEIsQ0FBUjtBQUlEOztBQUVELFVBQUlSLE9BQU8sQ0FBQ1EsaUJBQVIsSUFBOEJSLE9BQU8sQ0FBQ1MsVUFBUixJQUFzQlQsT0FBTyxDQUFDVSxVQUFoRSxFQUE2RTtBQUMzRWhDLDhFQUFRLENBQUMsQ0FBQytCLFVBQUQsRUFBYUMsVUFBYixDQUFELEVBQTJCO0FBQ2pDLDJCQUFpQjJHLE9BRGdCO0FBRWpDLHNCQUFZO0FBRnFCLFNBQTNCLENBQVI7QUFJRDs7QUFFRCxVQUFJckgsT0FBTyxDQUFDUSxpQkFBUixJQUE4QlIsT0FBTyxDQUFDUyxVQUFSLElBQXNCVCxPQUFPLENBQUNVLFVBQWhFLEVBQTZFO0FBQzNFaEMsOEVBQVEsQ0FBQytCLFVBQUQsRUFBYTtBQUFDLDJCQUFrQjtBQUFuQixTQUFiLENBQVI7QUFDQS9CLDhFQUFRLENBQUNnQyxVQUFELEVBQWE7QUFBQywyQkFBa0I7QUFBbkIsU0FBYixDQUFSO0FBQ0Q7O0FBRURxSixrQkFBWSxHQUFHd0gsUUFBUSxDQUFDOVEsVUFBRCxDQUF2QjtBQUNBdUosa0JBQVksR0FBR3VILFFBQVEsQ0FBQzdRLFVBQUQsQ0FBdkI7QUFFQThRLDBCQUFvQixHQWxDTCxDQW9DZjs7QUFDQSxVQUFJaFIsaUJBQUosRUFBdUI7QUFDckJ2TCxnRkFBUyxDQUFDdUwsaUJBQUQsRUFBb0JtSCxjQUFwQixDQUFUO0FBQ0QsT0FGRCxNQUVPO0FBQ0wxUyxnRkFBUyxDQUFDd0wsVUFBRCxFQUFha0gsY0FBYixDQUFUO0FBQ0ExUyxnRkFBUyxDQUFDeUwsVUFBRCxFQUFhaUgsY0FBYixDQUFUO0FBQ0Q7QUFDRixLQWxJbUIsQ0FvSXBCOzs7QUFDQThKLGFBQVM7QUFDVjs7QUFFRCxXQUFTOUIsVUFBVCxHQUF1QjtBQUNyQjtBQUNBLFFBQUlyTCxRQUFRLElBQUlQLGFBQWhCLEVBQStCO0FBQzdCLFVBQUkyTixHQUFHLEdBQUcsRUFBVjtBQUNBQSxTQUFHLENBQUMzTixhQUFELENBQUgsR0FBcUI0TixlQUFyQjtBQUNBMWMsOEVBQVMsQ0FBQzVLLFNBQUQsRUFBWXFuQixHQUFaLENBQVQ7QUFDRDs7QUFFRCxRQUFJM1AsS0FBSixFQUFXO0FBQUU5TSw4RUFBUyxDQUFDNUssU0FBRCxFQUFZbWUsV0FBWixFQUF5QnhJLE9BQU8sQ0FBQ21DLG9CQUFqQyxDQUFUO0FBQWtFOztBQUMvRSxRQUFJdFgsU0FBSixFQUFlO0FBQUVvSyw4RUFBUyxDQUFDNUssU0FBRCxFQUFZdWUsVUFBWixDQUFUO0FBQW1DOztBQUNwRCxRQUFJbGUsU0FBSixFQUFlO0FBQUV1Syw4RUFBUyxDQUFDaUIsR0FBRCxFQUFNb1MsbUJBQU4sQ0FBVDtBQUFzQzs7QUFFdkQsUUFBSXJHLE1BQU0sS0FBSyxPQUFmLEVBQXdCO0FBQ3RCa0YsWUFBTSxDQUFDbFAsRUFBUCxDQUFVLGNBQVYsRUFBMEIsWUFBWTtBQUNwQzJaLG1CQUFXO0FBQ1h6SyxjQUFNLENBQUM5TyxJQUFQLENBQVksYUFBWixFQUEyQmhILElBQUksRUFBL0I7QUFDRCxPQUhEO0FBSUQsS0FMRCxNQUtPLElBQUl6RyxVQUFVLElBQUl1VixVQUFkLElBQTRCQyxTQUE1QixJQUF5Q3lCLFVBQXpDLElBQXVELENBQUM0QyxVQUE1RCxFQUF3RTtBQUM3RXhQLDhFQUFTLENBQUNVLEdBQUQsRUFBTTtBQUFDLGtCQUFVa2M7QUFBWCxPQUFOLENBQVQ7QUFDRDs7QUFFRCxRQUFJaFEsVUFBSixFQUFnQjtBQUNkLFVBQUlJLE1BQU0sS0FBSyxPQUFmLEVBQXdCO0FBQ3RCa0YsY0FBTSxDQUFDbFAsRUFBUCxDQUFVLGFBQVYsRUFBeUI2WixZQUF6QjtBQUNELE9BRkQsTUFFTyxJQUFJLENBQUN4SyxPQUFMLEVBQWM7QUFBRXdLLG9CQUFZO0FBQUs7QUFDekM7O0FBRURDLGNBQVU7O0FBQ1YsUUFBSXpLLE9BQUosRUFBYTtBQUFFMEssbUJBQWE7QUFBSyxLQUFqQyxNQUF1QyxJQUFJeEssTUFBSixFQUFZO0FBQUV5SyxrQkFBWTtBQUFLOztBQUV0RTlLLFVBQU0sQ0FBQ2xQLEVBQVAsQ0FBVSxjQUFWLEVBQTBCaWEsaUJBQTFCOztBQUNBLFFBQUlqUSxNQUFNLEtBQUssT0FBZixFQUF3QjtBQUFFa0YsWUFBTSxDQUFDOU8sSUFBUCxDQUFZLGFBQVosRUFBMkJoSCxJQUFJLEVBQS9CO0FBQXFDOztBQUMvRCxRQUFJLE9BQU9nUixNQUFQLEtBQWtCLFVBQXRCLEVBQWtDO0FBQUVBLFlBQU0sQ0FBQ2hSLElBQUksRUFBTCxDQUFOO0FBQWlCOztBQUNyRGdVLFFBQUksR0FBRyxJQUFQO0FBQ0Q7O0FBRUQsV0FBUzhNLE9BQVQsR0FBb0I7QUFDbEI7QUFDQWhlLFNBQUssQ0FBQ29ULFFBQU4sR0FBaUIsSUFBakI7O0FBQ0EsUUFBSXBULEtBQUssQ0FBQ2llLFNBQVYsRUFBcUI7QUFBRWplLFdBQUssQ0FBQ2llLFNBQU4sQ0FBZ0JqYixNQUFoQjtBQUEyQixLQUhoQyxDQUtsQjs7O0FBQ0FtSCxrRkFBWSxDQUFDM0ksR0FBRCxFQUFNO0FBQUMsZ0JBQVVrYztBQUFYLEtBQU4sQ0FBWixDQU5rQixDQVFsQjs7QUFDQSxRQUFJbm5CLFNBQUosRUFBZTtBQUFFNFQsb0ZBQVksQ0FBQ3BJLEdBQUQsRUFBTW9TLG1CQUFOLENBQVo7QUFBeUM7O0FBQzFELFFBQUk5SCxpQkFBSixFQUF1QjtBQUFFbEMsb0ZBQVksQ0FBQ2tDLGlCQUFELEVBQW9CbUgsY0FBcEIsQ0FBWjtBQUFrRDs7QUFDM0UsUUFBSS9HLFlBQUosRUFBa0I7QUFBRXRDLG9GQUFZLENBQUNzQyxZQUFELEVBQWVrSCxTQUFmLENBQVo7QUFBd0MsS0FYMUMsQ0FhbEI7OztBQUNBeEosa0ZBQVksQ0FBQ2pVLFNBQUQsRUFBWTRkLFdBQVosQ0FBWjtBQUNBM0osa0ZBQVksQ0FBQ2pVLFNBQUQsRUFBWStkLGVBQVosQ0FBWjs7QUFDQSxRQUFJL0csY0FBSixFQUFvQjtBQUFFL0Msb0ZBQVksQ0FBQytDLGNBQUQsRUFBaUI7QUFBQyxpQkFBUzRQO0FBQVYsT0FBakIsQ0FBWjtBQUEwRDs7QUFDaEYsUUFBSWxRLFFBQUosRUFBYztBQUFFc1IsbUJBQWEsQ0FBQ3RILGFBQUQsQ0FBYjtBQUErQixLQWpCN0IsQ0FtQmxCOzs7QUFDQSxRQUFJekcsUUFBUSxJQUFJUCxhQUFoQixFQUErQjtBQUM3QixVQUFJMk4sR0FBRyxHQUFHLEVBQVY7QUFDQUEsU0FBRyxDQUFDM04sYUFBRCxDQUFILEdBQXFCNE4sZUFBckI7QUFDQXJULG9GQUFZLENBQUNqVSxTQUFELEVBQVlxbkIsR0FBWixDQUFaO0FBQ0Q7O0FBQ0QsUUFBSTNQLEtBQUosRUFBVztBQUFFekQsb0ZBQVksQ0FBQ2pVLFNBQUQsRUFBWW1lLFdBQVosQ0FBWjtBQUF1Qzs7QUFDcEQsUUFBSTNkLFNBQUosRUFBZTtBQUFFeVQsb0ZBQVksQ0FBQ2pVLFNBQUQsRUFBWXVlLFVBQVosQ0FBWjtBQUFzQyxLQTFCckMsQ0E0QmxCOzs7QUFDQSxRQUFJMEosUUFBUSxHQUFHLENBQUN4TixhQUFELEVBQWdCOEUscUJBQWhCLEVBQXVDQyxjQUF2QyxFQUF1REMsY0FBdkQsRUFBdUVHLGdCQUF2RSxFQUF5Rlksa0JBQXpGLENBQWY7QUFFQTFHLFdBQU8sQ0FBQ3RWLE9BQVIsQ0FBZ0IsVUFBU2tNLElBQVQsRUFBZXZSLENBQWYsRUFBa0I7QUFDaEMsVUFBSW1MLEVBQUUsR0FBR29HLElBQUksS0FBSyxXQUFULEdBQXVCMkosWUFBdkIsR0FBc0MxRSxPQUFPLENBQUNqRixJQUFELENBQXREOztBQUVBLFVBQUksUUFBT3BHLEVBQVAsTUFBYyxRQUFkLElBQTBCQSxFQUE5QixFQUFrQztBQUNoQyxZQUFJNGQsTUFBTSxHQUFHNWQsRUFBRSxDQUFDNmQsc0JBQUgsR0FBNEI3ZCxFQUFFLENBQUM2ZCxzQkFBL0IsR0FBd0QsS0FBckU7QUFBQSxZQUNJQyxRQUFRLEdBQUc5ZCxFQUFFLENBQUNtTCxVQURsQjtBQUVBbkwsVUFBRSxDQUFDb1EsU0FBSCxHQUFldU4sUUFBUSxDQUFDOW9CLENBQUQsQ0FBdkI7QUFDQXdXLGVBQU8sQ0FBQ2pGLElBQUQsQ0FBUCxHQUFnQndYLE1BQU0sR0FBR0EsTUFBTSxDQUFDRyxrQkFBVixHQUErQkQsUUFBUSxDQUFDRSxpQkFBOUQ7QUFDRDtBQUNGLEtBVEQsRUEvQmtCLENBMkNsQjs7QUFDQXhPLFdBQU8sR0FBRzNDLFNBQVMsR0FBR0MsVUFBVSxHQUFHRSxZQUFZLEdBQUdELGFBQWEsR0FBRytDLFVBQVUsR0FBR0MsWUFBWSxHQUFHQyxZQUFZLEdBQUd0YSxTQUFTLEdBQUd3YSxlQUFlLEdBQUdDLGFBQWEsR0FBR0UsVUFBVSxHQUFHQyxVQUFVLEdBQUdDLGNBQWMsR0FBR0MsV0FBVyxHQUFHL0UsU0FBUyxHQUFHRCxVQUFVLEdBQUdqVyxXQUFXLEdBQUdNLE1BQU0sR0FBR2diLFFBQVEsR0FBR2piLEtBQUssR0FBRytWLE9BQU8sR0FBR0QsV0FBVyxHQUFHM1YsU0FBUyxHQUFHb1csS0FBSyxHQUFHYyxNQUFNLEdBQUduWCxJQUFJLEdBQUdvWCxVQUFVLEdBQUcxTixLQUFLLEdBQUd4SixRQUFRLEdBQUdpYixjQUFjLEdBQUdDLGFBQWEsR0FBR0MsVUFBVSxHQUFHRSxhQUFhLEdBQUdDLGdCQUFnQixHQUFHQyxhQUFhLEdBQUdFLDBCQUEwQixHQUFHQyxhQUFhLEdBQUdDLGVBQWUsR0FBR0MsZ0JBQWdCLEdBQUdDLFdBQVcsR0FBR2xTLEtBQUssR0FBR3NTLFdBQVcsR0FBR0csUUFBUSxHQUFHQyxRQUFRLEdBQUdDLFdBQVcsR0FBR2pGLFVBQVUsR0FBR2tGLHFCQUFxQixHQUFHckwsT0FBTyxHQUFHd0csTUFBTSxHQUFHOEUsTUFBTSxHQUFHQyxtQkFBbUIsR0FBR0MsT0FBTyxHQUFHQyxPQUFPLEdBQUdDLFFBQVEsR0FBR25GLFNBQVMsR0FBR29GLE1BQU0sR0FBR0UsTUFBTSxHQUFHQyxjQUFjLEdBQUdHLFNBQVMsR0FBR0csV0FBVyxHQUFHRyxlQUFlLEdBQUdFLG1CQUFtQixHQUFHRSxXQUFXLEdBQUdJLFVBQVUsR0FBR0MsV0FBVyxHQUFHRSxNQUFNLEdBQUdsSSxlQUFlLEdBQUdtSSxXQUFXLEdBQUdDLFFBQVEsR0FBR0MsWUFBWSxHQUFHQyxnQkFBZ0IsR0FBR0UsZ0JBQWdCLEdBQUdDLFNBQVMsR0FBR0csWUFBWSxHQUFHM2UsUUFBUSxHQUFHQyxZQUFZLEdBQUd5VixpQkFBaUIsR0FBR29KLHFCQUFxQixHQUFHbkosVUFBVSxHQUFHQyxVQUFVLEdBQUdxSixZQUFZLEdBQUdDLFlBQVksR0FBR3JKLEdBQUcsR0FBR0MsWUFBWSxHQUFHcUosZ0JBQWdCLEdBQUdDLFFBQVEsR0FBR0MsS0FBSyxHQUFHRSxXQUFXLEdBQUdDLFVBQVUsR0FBR0MsZUFBZSxHQUFHRSxxQkFBcUIsR0FBR0MsY0FBYyxHQUFHQyxNQUFNLEdBQUdDLGFBQWEsR0FBRzdKLFFBQVEsR0FBR0UsZUFBZSxHQUFHQyxpQkFBaUIsR0FBR0MsWUFBWSxHQUFHQyxrQkFBa0IsR0FBR0MsY0FBYyxHQUFHd0osa0JBQWtCLEdBQUd0Six5QkFBeUIsR0FBR3VKLG1CQUFtQixHQUFHQyxhQUFhLEdBQUdDLFNBQVMsR0FBR0MsbUJBQW1CLEdBQUdDLGtCQUFrQixHQUFHQyx3QkFBd0IsR0FBR0MsWUFBWSxHQUFHQyxZQUFZLEdBQUdDLGFBQWEsR0FBR0MsSUFBSSxHQUFHQyxJQUFJLEdBQUdDLFFBQVEsR0FBR0MsUUFBUSxHQUFHQyxPQUFPLEdBQUc1SixLQUFLLEdBQUdsWCxTQUFTLEdBQUcsSUFBenFELENBNUNrQixDQTZDbEI7QUFDQTs7QUFFQSxTQUFLLElBQUkrZ0IsQ0FBVCxJQUFjLElBQWQsRUFBb0I7QUFDbEIsVUFBSUEsQ0FBQyxLQUFLLFNBQVYsRUFBcUI7QUFBRSxhQUFLQSxDQUFMLElBQVUsSUFBVjtBQUFpQjtBQUN6Qzs7QUFDRHZHLFFBQUksR0FBRyxLQUFQO0FBQ0QsR0E5b0NnQyxDQWdwQ25DO0FBQ0U7OztBQUNBLFdBQVN3TSxRQUFULENBQW1CN2EsQ0FBbkIsRUFBc0I7QUFDcEJxRywrREFBRyxDQUFDLFlBQVU7QUFBRXVVLGlCQUFXLENBQUNnQixRQUFRLENBQUM1YixDQUFELENBQVQsQ0FBWDtBQUEyQixLQUF4QyxDQUFIO0FBQ0Q7O0FBRUQsV0FBUzRhLFdBQVQsQ0FBc0I1YSxDQUF0QixFQUF5QjtBQUN2QixRQUFJLENBQUNxTyxJQUFMLEVBQVc7QUFBRTtBQUFTOztBQUN0QixRQUFJcEQsTUFBTSxLQUFLLE9BQWYsRUFBd0I7QUFBRWtGLFlBQU0sQ0FBQzlPLElBQVAsQ0FBWSxjQUFaLEVBQTRCaEgsSUFBSSxDQUFDMkYsQ0FBRCxDQUFoQztBQUF1Qzs7QUFDakVtTyxlQUFXLEdBQUdDLGNBQWMsRUFBNUI7QUFDQSxRQUFJeU4sU0FBSjtBQUFBLFFBQ0lDLGlCQUFpQixHQUFHNU4sY0FEeEI7QUFBQSxRQUVJNk4sc0JBQXNCLEdBQUcsS0FGN0I7O0FBSUEsUUFBSW5vQixVQUFKLEVBQWdCO0FBQ2QwYSx1QkFBaUI7QUFDakJ1TixlQUFTLEdBQUdDLGlCQUFpQixLQUFLNU4sY0FBbEMsQ0FGYyxDQUdkOztBQUNBLFVBQUkyTixTQUFKLEVBQWU7QUFBRTFMLGNBQU0sQ0FBQzlPLElBQVAsQ0FBWSxvQkFBWixFQUFrQ2hILElBQUksQ0FBQzJGLENBQUQsQ0FBdEM7QUFBNkM7QUFDL0Q7O0FBRUQsUUFBSWdjLFVBQUo7QUFBQSxRQUNJQyxZQURKO0FBQUEsUUFFSWxGLFFBQVEsR0FBR3hqQixLQUZmO0FBQUEsUUFHSTJvQixVQUFVLEdBQUc1TCxPQUhqQjtBQUFBLFFBSUk2TCxTQUFTLEdBQUczTCxNQUpoQjtBQUFBLFFBS0k0TCxZQUFZLEdBQUcxb0IsU0FMbkI7QUFBQSxRQU1JMm9CLFdBQVcsR0FBR3ZvQixRQU5sQjtBQUFBLFFBT0l3b0IsTUFBTSxHQUFHM1MsR0FQYjtBQUFBLFFBUUk0UyxRQUFRLEdBQUd4UixLQVJmO0FBQUEsUUFTSXlSLFlBQVksR0FBRzNvQixTQVRuQjtBQUFBLFFBVUk0b0IsV0FBVyxHQUFHMVMsUUFWbEI7QUFBQSxRQVdJMlMscUJBQXFCLEdBQUd0UyxrQkFYNUI7QUFBQSxRQVlJdVMsNEJBQTRCLEdBQUdwUyx5QkFabkM7QUFBQSxRQWFJcVMsUUFBUSxHQUFHdGYsS0FiZjs7QUFlQSxRQUFJdWUsU0FBSixFQUFlO0FBQ2IsVUFBSXJGLGFBQWEsR0FBR3JOLFVBQXBCO0FBQUEsVUFDSTBULGFBQWEsR0FBR2hTLFVBRHBCO0FBQUEsVUFFSWlTLGVBQWUsR0FBRy9vQixZQUZ0QjtBQUFBLFVBR0lncEIsU0FBUyxHQUFHenBCLE1BSGhCO0FBQUEsVUFJSTBwQixlQUFlLEdBQUc3UyxZQUp0Qjs7QUFNQSxVQUFJLENBQUNxQyxLQUFMLEVBQVk7QUFDVixZQUFJK0osU0FBUyxHQUFHL2lCLE1BQWhCO0FBQUEsWUFDSThpQixjQUFjLEdBQUdwakIsV0FEckI7QUFFRDtBQUNGLEtBekNzQixDQTJDdkI7QUFDQTtBQUNBO0FBQ0E7OztBQUNBUSxhQUFTLEdBQUc2YSxTQUFTLENBQUMsV0FBRCxDQUFyQjtBQUNBemEsWUFBUSxHQUFHeWEsU0FBUyxDQUFDLFVBQUQsQ0FBcEI7QUFDQTVFLE9BQUcsR0FBRzRFLFNBQVMsQ0FBQyxLQUFELENBQWY7QUFDQXhELFNBQUssR0FBR3dELFNBQVMsQ0FBQyxPQUFELENBQWpCO0FBQ0FqYixVQUFNLEdBQUdpYixTQUFTLENBQUMsUUFBRCxDQUFsQjtBQUNBMWEsYUFBUyxHQUFHMGEsU0FBUyxDQUFDLFdBQUQsQ0FBckI7QUFDQXhFLFlBQVEsR0FBR3dFLFNBQVMsQ0FBQyxVQUFELENBQXBCO0FBQ0FuRSxzQkFBa0IsR0FBR21FLFNBQVMsQ0FBQyxvQkFBRCxDQUE5QjtBQUNBaEUsNkJBQXlCLEdBQUdnRSxTQUFTLENBQUMsMkJBQUQsQ0FBckM7O0FBRUEsUUFBSXNOLFNBQUosRUFBZTtBQUNidkwsYUFBTyxHQUFHL0IsU0FBUyxDQUFDLFNBQUQsQ0FBbkI7QUFDQXBGLGdCQUFVLEdBQUdvRixTQUFTLENBQUMsWUFBRCxDQUF0QjtBQUNBekUsV0FBSyxHQUFHeUUsU0FBUyxDQUFDLE9BQUQsQ0FBakI7QUFDQTFELGdCQUFVLEdBQUcwRCxTQUFTLENBQUMsWUFBRCxDQUF0QjtBQUNBeGEsa0JBQVksR0FBR3dhLFNBQVMsQ0FBQyxjQUFELENBQXhCO0FBQ0FwRSxrQkFBWSxHQUFHb0UsU0FBUyxDQUFDLGNBQUQsQ0FBeEI7QUFDQXRFLHFCQUFlLEdBQUdzRSxTQUFTLENBQUMsaUJBQUQsQ0FBM0I7O0FBRUEsVUFBSSxDQUFDL0IsS0FBTCxFQUFZO0FBQ1Z0WixtQkFBVyxHQUFHcWIsU0FBUyxDQUFDLGFBQUQsQ0FBdkI7QUFDQS9hLGNBQU0sR0FBRythLFNBQVMsQ0FBQyxRQUFELENBQWxCO0FBQ0Q7QUFDRixLQXRFc0IsQ0F1RXZCOzs7QUFDQXVHLDRCQUF3QixDQUFDeEUsT0FBRCxDQUF4QjtBQUVBOUIsWUFBUSxHQUFHQyxnQkFBZ0IsRUFBM0IsQ0ExRXVCLENBMEVROztBQUMvQixRQUFJLENBQUMsQ0FBQ2hCLFVBQUQsSUFBZXJFLFNBQWhCLEtBQThCLENBQUNrSCxPQUFuQyxFQUE0QztBQUMxQ3dJLHVCQUFpQjs7QUFDakIsVUFBSSxDQUFDckwsVUFBTCxFQUFpQjtBQUNmc0wsa0NBQTBCLEdBRFgsQ0FDZTs7QUFDOUJnRCw4QkFBc0IsR0FBRyxJQUF6QjtBQUNEO0FBQ0Y7O0FBQ0QsUUFBSTVTLFVBQVUsSUFBSUMsU0FBbEIsRUFBNkI7QUFDM0I4RixtQkFBYSxHQUFHQyxnQkFBZ0IsRUFBaEMsQ0FEMkIsQ0FDUztBQUNBOztBQUNwQ2EsY0FBUSxHQUFHUixXQUFXLEVBQXRCLENBSDJCLENBR0Q7QUFDQTtBQUMzQjs7QUFFRCxRQUFJcU0sU0FBUyxJQUFJMVMsVUFBakIsRUFBNkI7QUFDM0I1VixXQUFLLEdBQUdnYixTQUFTLENBQUMsT0FBRCxDQUFqQjtBQUNBakYsYUFBTyxHQUFHaUYsU0FBUyxDQUFDLFNBQUQsQ0FBbkI7QUFDQTBOLGtCQUFZLEdBQUcxb0IsS0FBSyxLQUFLd2pCLFFBQXpCOztBQUVBLFVBQUlrRixZQUFKLEVBQWtCO0FBQ2hCLFlBQUksQ0FBQzlTLFVBQUQsSUFBZSxDQUFDQyxTQUFwQixFQUErQjtBQUFFNEcsa0JBQVEsR0FBR1IsV0FBVyxFQUF0QjtBQUEyQixTQUQ1QyxDQUM2QztBQUM3RDtBQUNBOzs7QUFDQXlOLG1CQUFXO0FBQ1o7QUFDRjs7QUFFRCxRQUFJcEIsU0FBSixFQUFlO0FBQ2IsVUFBSXZMLE9BQU8sS0FBSzRMLFVBQWhCLEVBQTRCO0FBQzFCLFlBQUk1TCxPQUFKLEVBQWE7QUFDWDBLLHVCQUFhO0FBQ2QsU0FGRCxNQUVPO0FBQ0xrQyxzQkFBWSxHQURQLENBQ1c7QUFDakI7QUFDRjtBQUNGOztBQUVELFFBQUk5UixTQUFTLEtBQUt5USxTQUFTLElBQUkxUyxVQUFiLElBQTJCQyxTQUFoQyxDQUFiLEVBQXlEO0FBQ3ZEb0gsWUFBTSxHQUFHQyxTQUFTLEVBQWxCLENBRHVELENBQ2pDO0FBQ0E7QUFDQTs7QUFFdEIsVUFBSUQsTUFBTSxLQUFLMkwsU0FBZixFQUEwQjtBQUN4QixZQUFJM0wsTUFBSixFQUFZO0FBQ1YyTSw4QkFBb0IsQ0FBQ0MsMEJBQTBCLENBQUN6TixhQUFhLENBQUMsQ0FBRCxDQUFkLENBQTNCLENBQXBCO0FBQ0FzTCxzQkFBWTtBQUNiLFNBSEQsTUFHTztBQUNMb0Msd0JBQWM7QUFDZHRCLGdDQUFzQixHQUFHLElBQXpCO0FBQ0Q7QUFDRjtBQUNGOztBQUVEakgsNEJBQXdCLENBQUN4RSxPQUFPLElBQUlFLE1BQVosQ0FBeEIsQ0FoSXVCLENBZ0lzQjs7QUFDN0MsUUFBSSxDQUFDekcsUUFBTCxFQUFlO0FBQUVLLHdCQUFrQixHQUFHRyx5QkFBeUIsR0FBRyxLQUFqRDtBQUF5RDs7QUFFMUUsUUFBSTdXLFNBQVMsS0FBSzBvQixZQUFsQixFQUFnQztBQUM5QjFvQixlQUFTLEdBQ1B1Syx3RUFBUyxDQUFDaUIsR0FBRCxFQUFNb1MsbUJBQU4sQ0FERixHQUVQaEssOEVBQVksQ0FBQ3BJLEdBQUQsRUFBTW9TLG1CQUFOLENBRmQ7QUFHRDs7QUFDRCxRQUFJeGQsUUFBUSxLQUFLdW9CLFdBQWpCLEVBQThCO0FBQzVCLFVBQUl2b0IsUUFBSixFQUFjO0FBQ1osWUFBSTBWLGlCQUFKLEVBQXVCO0FBQ3JCeEIsc0ZBQVcsQ0FBQ3dCLGlCQUFELENBQVg7QUFDRCxTQUZELE1BRU87QUFDTCxjQUFJQyxVQUFKLEVBQWdCO0FBQUV6Qix3RkFBVyxDQUFDeUIsVUFBRCxDQUFYO0FBQTBCOztBQUM1QyxjQUFJQyxVQUFKLEVBQWdCO0FBQUUxQix3RkFBVyxDQUFDMEIsVUFBRCxDQUFYO0FBQTBCO0FBQzdDO0FBQ0YsT0FQRCxNQU9PO0FBQ0wsWUFBSUYsaUJBQUosRUFBdUI7QUFDckI3RixzRkFBVyxDQUFDNkYsaUJBQUQsQ0FBWDtBQUNELFNBRkQsTUFFTztBQUNMLGNBQUlDLFVBQUosRUFBZ0I7QUFBRTlGLHdGQUFXLENBQUM4RixVQUFELENBQVg7QUFBMEI7O0FBQzVDLGNBQUlDLFVBQUosRUFBZ0I7QUFBRS9GLHdGQUFXLENBQUMrRixVQUFELENBQVg7QUFBMEI7QUFDN0M7QUFDRjtBQUNGOztBQUNELFFBQUlDLEdBQUcsS0FBSzJTLE1BQVosRUFBb0I7QUFDbEIsVUFBSTNTLEdBQUosRUFBUztBQUNQM0Isb0ZBQVcsQ0FBQzRCLFlBQUQsQ0FBWDtBQUNBMFEsMkJBQW1CO0FBQ3BCLE9BSEQsTUFHTztBQUNMM1csb0ZBQVcsQ0FBQ2lHLFlBQUQsQ0FBWDtBQUNEO0FBQ0Y7O0FBQ0QsUUFBSW1CLEtBQUssS0FBS3dSLFFBQWQsRUFBd0I7QUFDdEJ4UixXQUFLLEdBQ0g5TSx3RUFBUyxDQUFDNUssU0FBRCxFQUFZbWUsV0FBWixFQUF5QnhJLE9BQU8sQ0FBQ21DLG9CQUFqQyxDQUROLEdBRUg3RCw4RUFBWSxDQUFDalUsU0FBRCxFQUFZbWUsV0FBWixDQUZkO0FBR0Q7O0FBQ0QsUUFBSTNkLFNBQVMsS0FBSzJvQixZQUFsQixFQUFnQztBQUM5QjNvQixlQUFTLEdBQ1BvSyx3RUFBUyxDQUFDNUssU0FBRCxFQUFZdWUsVUFBWixDQURGLEdBRVB0Syw4RUFBWSxDQUFDalUsU0FBRCxFQUFZdWUsVUFBWixDQUZkO0FBR0Q7O0FBQ0QsUUFBSTdILFFBQVEsS0FBSzBTLFdBQWpCLEVBQThCO0FBQzVCLFVBQUkxUyxRQUFKLEVBQWM7QUFDWixZQUFJTSxjQUFKLEVBQW9CO0FBQUVyQyxzRkFBVyxDQUFDcUMsY0FBRCxDQUFYO0FBQThCOztBQUNwRCxZQUFJLENBQUMySixTQUFELElBQWMsQ0FBQ0Usa0JBQW5CLEVBQXVDO0FBQUVnRyx1QkFBYTtBQUFLO0FBQzVELE9BSEQsTUFHTztBQUNMLFlBQUk3UCxjQUFKLEVBQW9CO0FBQUUxRyxzRkFBVyxDQUFDMEcsY0FBRCxDQUFYO0FBQThCOztBQUNwRCxZQUFJMkosU0FBSixFQUFlO0FBQUVzSixzQkFBWTtBQUFLO0FBQ25DO0FBQ0Y7O0FBQ0QsUUFBSWxULGtCQUFrQixLQUFLc1MscUJBQTNCLEVBQWtEO0FBQ2hEdFMsd0JBQWtCLEdBQ2hCbk0sd0VBQVMsQ0FBQzVLLFNBQUQsRUFBWTRkLFdBQVosQ0FETyxHQUVoQjNKLDhFQUFZLENBQUNqVSxTQUFELEVBQVk0ZCxXQUFaLENBRmQ7QUFHRDs7QUFDRCxRQUFJMUcseUJBQXlCLEtBQUtvUyw0QkFBbEMsRUFBZ0U7QUFDOURwUywrQkFBeUIsR0FDdkJ0TSx3RUFBUyxDQUFDaUIsR0FBRCxFQUFNa1MsZUFBTixDQURjLEdBRXZCOUosOEVBQVksQ0FBQ3BJLEdBQUQsRUFBTWtTLGVBQU4sQ0FGZDtBQUdEOztBQUVELFFBQUl5SyxTQUFKLEVBQWU7QUFDYixVQUFJMVMsVUFBVSxLQUFLcU4sYUFBZixJQUFnQ2xqQixNQUFNLEtBQUt5cEIsU0FBL0MsRUFBMEQ7QUFBRWhCLDhCQUFzQixHQUFHLElBQXpCO0FBQWdDOztBQUU1RixVQUFJbFIsVUFBVSxLQUFLZ1MsYUFBbkIsRUFBa0M7QUFDaEMsWUFBSSxDQUFDaFMsVUFBTCxFQUFpQjtBQUFFOEMsc0JBQVksQ0FBQy9OLEtBQWIsQ0FBbUIyZCxNQUFuQixHQUE0QixFQUE1QjtBQUFpQztBQUNyRDs7QUFFRCxVQUFJenBCLFFBQVEsSUFBSUMsWUFBWSxLQUFLK29CLGVBQWpDLEVBQWtEO0FBQ2hEclQsa0JBQVUsQ0FBQ3hELFNBQVgsR0FBdUJsUyxZQUFZLENBQUMsQ0FBRCxDQUFuQztBQUNBMlYsa0JBQVUsQ0FBQ3pELFNBQVgsR0FBdUJsUyxZQUFZLENBQUMsQ0FBRCxDQUFuQztBQUNEOztBQUVELFVBQUlzVyxjQUFjLElBQUlGLFlBQVksS0FBSzZTLGVBQXZDLEVBQXdEO0FBQ3RELFlBQUl4cUIsQ0FBQyxHQUFHdVgsUUFBUSxHQUFHLENBQUgsR0FBTyxDQUF2QjtBQUFBLFlBQ0l5VCxJQUFJLEdBQUduVCxjQUFjLENBQUNwRSxTQUQxQjtBQUFBLFlBRUkyQyxHQUFHLEdBQUc0VSxJQUFJLENBQUMvcUIsTUFBTCxHQUFjdXFCLGVBQWUsQ0FBQ3hxQixDQUFELENBQWYsQ0FBbUJDLE1BRjNDOztBQUdBLFlBQUkrcUIsSUFBSSxDQUFDbkcsU0FBTCxDQUFlek8sR0FBZixNQUF3Qm9VLGVBQWUsQ0FBQ3hxQixDQUFELENBQTNDLEVBQWdEO0FBQzlDNlgsd0JBQWMsQ0FBQ3BFLFNBQWYsR0FBMkJ1WCxJQUFJLENBQUNuRyxTQUFMLENBQWUsQ0FBZixFQUFrQnpPLEdBQWxCLElBQXlCdUIsWUFBWSxDQUFDM1gsQ0FBRCxDQUFoRTtBQUNEO0FBQ0Y7QUFDRixLQXBCRCxNQW9CTztBQUNMLFVBQUljLE1BQU0sS0FBSzZWLFVBQVUsSUFBSUMsU0FBbkIsQ0FBVixFQUF5QztBQUFFMlMsOEJBQXNCLEdBQUcsSUFBekI7QUFBZ0M7QUFDNUU7O0FBRUQsUUFBSUUsWUFBWSxJQUFJOVMsVUFBVSxJQUFJLENBQUNDLFNBQW5DLEVBQThDO0FBQzVDK0osV0FBSyxHQUFHQyxRQUFRLEVBQWhCO0FBQ0FrSCx5QkFBbUI7QUFDcEI7O0FBRUQwQixjQUFVLEdBQUcxZSxLQUFLLEtBQUtzZixRQUF2Qjs7QUFDQSxRQUFJWixVQUFKLEVBQWdCO0FBQ2Q3TCxZQUFNLENBQUM5TyxJQUFQLENBQVksY0FBWixFQUE0QmhILElBQUksRUFBaEM7QUFDQTBoQiw0QkFBc0IsR0FBRyxJQUF6QjtBQUNELEtBSEQsTUFHTyxJQUFJRSxZQUFKLEVBQWtCO0FBQ3ZCLFVBQUksQ0FBQ0QsVUFBTCxFQUFpQjtBQUFFZCx5QkFBaUI7QUFBSztBQUMxQyxLQUZNLE1BRUEsSUFBSS9SLFVBQVUsSUFBSUMsU0FBbEIsRUFBNkI7QUFDbEMyUixnQkFBVTtBQUNWbEIsdUJBQWlCO0FBQ2pCNEQsc0JBQWdCO0FBQ2pCOztBQUVELFFBQUl4QixZQUFZLElBQUksQ0FBQzNPLFFBQXJCLEVBQStCO0FBQUVvUSxpQ0FBMkI7QUFBSzs7QUFFakUsUUFBSSxDQUFDcE4sT0FBRCxJQUFZLENBQUNFLE1BQWpCLEVBQXlCO0FBQ3ZCO0FBQ0EsVUFBSXFMLFNBQVMsSUFBSSxDQUFDclAsS0FBbEIsRUFBeUI7QUFDdkI7QUFFQTtBQUNBLFlBQUl0WixXQUFXLEtBQUtvakIsY0FBaEIsSUFBa0M5aUIsTUFBTSxLQUFLK2lCLFNBQWpELEVBQTREO0FBQzFENUksc0JBQVksQ0FBQy9OLEtBQWIsQ0FBbUJ3RixPQUFuQixHQUE2QmlSLHFCQUFxQixDQUFDbmpCLFdBQUQsRUFBY00sTUFBZCxFQUFzQjJWLFVBQXRCLEVBQWtDVyxLQUFsQyxFQUF5Q2UsVUFBekMsQ0FBbEQ7QUFDRDs7QUFFRCxZQUFJNEMsVUFBSixFQUFnQjtBQUNkO0FBQ0EsY0FBSUgsUUFBSixFQUFjO0FBQ1pqYSxxQkFBUyxDQUFDdU0sS0FBVixDQUFnQkMsS0FBaEIsR0FBd0JpWCxpQkFBaUIsQ0FBQzNOLFVBQUQsRUFBYTNWLE1BQWIsRUFBcUJELEtBQXJCLENBQXpDO0FBQ0QsV0FKYSxDQU1kOzs7QUFDQSxjQUFJcUssR0FBRyxHQUFHb1osa0JBQWtCLENBQUM3TixVQUFELEVBQWEzVixNQUFiLEVBQXFCRCxLQUFyQixDQUFsQixHQUNBMmpCLG1CQUFtQixDQUFDMWpCLE1BQUQsQ0FEN0IsQ0FQYyxDQVVkO0FBQ0E7O0FBQ0EwVCwwRkFBYSxDQUFDL0osS0FBRCxFQUFRNEUsd0ZBQWlCLENBQUM1RSxLQUFELENBQWpCLEdBQTJCLENBQW5DLENBQWI7QUFDQUQsb0ZBQVUsQ0FBQ0MsS0FBRCxFQUFRLE1BQU1rVCxPQUFOLEdBQWdCLGNBQXhCLEVBQXdDelMsR0FBeEMsRUFBNkNtRSx3RkFBaUIsQ0FBQzVFLEtBQUQsQ0FBOUQsQ0FBVjtBQUNEO0FBQ0YsT0F6QnNCLENBMkJ2Qjs7O0FBQ0EsVUFBSTBOLFVBQUosRUFBZ0I7QUFBRWlRLG9CQUFZO0FBQUs7O0FBRW5DLFVBQUlpQixzQkFBSixFQUE0QjtBQUMxQnRELGtDQUEwQjtBQUMxQjdJLG1CQUFXLEdBQUd0UyxLQUFkO0FBQ0Q7QUFDRjs7QUFFRCxRQUFJdWUsU0FBSixFQUFlO0FBQUUxTCxZQUFNLENBQUM5TyxJQUFQLENBQVksa0JBQVosRUFBZ0NoSCxJQUFJLENBQUMyRixDQUFELENBQXBDO0FBQTJDO0FBQzdELEdBcjZDZ0MsQ0EyNkNqQzs7O0FBQ0EsV0FBU3lRLFNBQVQsR0FBc0I7QUFDcEIsUUFBSSxDQUFDdEgsVUFBRCxJQUFlLENBQUNDLFNBQXBCLEVBQStCO0FBQzdCLFVBQUl3TCxDQUFDLEdBQUd0aEIsTUFBTSxHQUFHQyxLQUFLLEdBQUcsQ0FBQ0EsS0FBSyxHQUFHLENBQVQsSUFBYyxDQUF6QixHQUE2QkEsS0FBM0M7QUFDQSxhQUFRMGEsVUFBVSxJQUFJMkcsQ0FBdEI7QUFDRDs7QUFFRCxRQUFJL1UsS0FBSyxHQUFHc0osVUFBVSxHQUFHLENBQUNBLFVBQVUsR0FBRzNWLE1BQWQsSUFBd0J5YSxVQUEzQixHQUF3Q1csY0FBYyxDQUFDWCxVQUFELENBQTVFO0FBQUEsUUFDSTBQLEVBQUUsR0FBR3pxQixXQUFXLEdBQUdzYixRQUFRLEdBQUd0YixXQUFXLEdBQUcsQ0FBNUIsR0FBZ0NzYixRQUFRLEdBQUdoYixNQUQvRDs7QUFHQSxRQUFJRixNQUFKLEVBQVk7QUFDVnFxQixRQUFFLElBQUl4VSxVQUFVLEdBQUcsQ0FBQ3FGLFFBQVEsR0FBR3JGLFVBQVosSUFBMEIsQ0FBN0IsR0FBaUMsQ0FBQ3FGLFFBQVEsSUFBSUksY0FBYyxDQUFDdFIsS0FBSyxHQUFHLENBQVQsQ0FBZCxHQUE0QnNSLGNBQWMsQ0FBQ3RSLEtBQUQsQ0FBMUMsR0FBb0Q5SixNQUF4RCxDQUFULElBQTRFLENBQTdIO0FBQ0Q7O0FBRUQsV0FBT3FNLEtBQUssSUFBSThkLEVBQWhCO0FBQ0Q7O0FBRUQsV0FBU3JQLGlCQUFULEdBQThCO0FBQzVCSixrQkFBYyxHQUFHLENBQWpCOztBQUNBLFNBQUssSUFBSXNILEVBQVQsSUFBZTVoQixVQUFmLEVBQTJCO0FBQ3pCNGhCLFFBQUUsR0FBR1csUUFBUSxDQUFDWCxFQUFELENBQWIsQ0FEeUIsQ0FDTjs7QUFDbkIsVUFBSXJILFdBQVcsSUFBSXFILEVBQW5CLEVBQXVCO0FBQUV0SCxzQkFBYyxHQUFHc0gsRUFBakI7QUFBc0I7QUFDaEQ7QUFDRixHQWw4Q2dDLENBbzhDakM7OztBQUNBLE1BQUl5SCxXQUFXLEdBQUksWUFBWTtBQUM3QixXQUFPeHBCLElBQUksR0FDVDZaLFFBQVEsR0FDTjtBQUNBLGdCQUFZO0FBQ1YsVUFBSXNRLFFBQVEsR0FBRzdOLFFBQWY7QUFBQSxVQUNJOE4sU0FBUyxHQUFHN04sUUFEaEI7QUFHQTROLGNBQVEsSUFBSXRVLE9BQVo7QUFDQXVVLGVBQVMsSUFBSXZVLE9BQWIsQ0FMVSxDQU9WO0FBQ0E7O0FBQ0EsVUFBSXBXLFdBQUosRUFBaUI7QUFDZjBxQixnQkFBUSxJQUFJLENBQVo7QUFDQUMsaUJBQVMsSUFBSSxDQUFiO0FBQ0QsT0FIRCxNQUdPLElBQUkxVSxVQUFKLEVBQWdCO0FBQ3JCLFlBQUksQ0FBQ3FGLFFBQVEsR0FBR2hiLE1BQVosS0FBcUIyVixVQUFVLEdBQUczVixNQUFsQyxDQUFKLEVBQStDO0FBQUVxcUIsbUJBQVMsSUFBSSxDQUFiO0FBQWlCO0FBQ25FOztBQUVELFVBQUkvTyxVQUFKLEVBQWdCO0FBQ2QsWUFBSXhSLEtBQUssR0FBR3VnQixTQUFaLEVBQXVCO0FBQ3JCdmdCLGVBQUssSUFBSTJRLFVBQVQ7QUFDRCxTQUZELE1BRU8sSUFBSTNRLEtBQUssR0FBR3NnQixRQUFaLEVBQXNCO0FBQzNCdGdCLGVBQUssSUFBSTJRLFVBQVQ7QUFDRDtBQUNGO0FBQ0YsS0F6QkssR0EwQk47QUFDQSxnQkFBVztBQUNULFVBQUkzUSxLQUFLLEdBQUcwUyxRQUFaLEVBQXNCO0FBQ3BCLGVBQU8xUyxLQUFLLElBQUl5UyxRQUFRLEdBQUc5QixVQUEzQixFQUF1QztBQUFFM1EsZUFBSyxJQUFJMlEsVUFBVDtBQUFzQjtBQUNoRSxPQUZELE1BRU8sSUFBSTNRLEtBQUssR0FBR3lTLFFBQVosRUFBc0I7QUFDM0IsZUFBT3pTLEtBQUssSUFBSTBTLFFBQVEsR0FBRy9CLFVBQTNCLEVBQXVDO0FBQUUzUSxlQUFLLElBQUkyUSxVQUFUO0FBQXNCO0FBQ2hFO0FBQ0YsS0FsQ00sR0FtQ1Q7QUFDQSxnQkFBVztBQUNUM1EsV0FBSyxHQUFHeUYsSUFBSSxDQUFDMk0sR0FBTCxDQUFTSyxRQUFULEVBQW1CaE4sSUFBSSxDQUFDeUIsR0FBTCxDQUFTd0wsUUFBVCxFQUFtQjFTLEtBQW5CLENBQW5CLENBQVI7QUFDRCxLQXRDSDtBQXVDRCxHQXhDaUIsRUFBbEI7O0FBMENBLFdBQVNtZCxTQUFULEdBQXNCO0FBQ3BCLFFBQUksQ0FBQzFRLFFBQUQsSUFBYU0sY0FBakIsRUFBaUM7QUFBRTFHLGtGQUFXLENBQUMwRyxjQUFELENBQVg7QUFBOEI7O0FBQ2pFLFFBQUksQ0FBQ1YsR0FBRCxJQUFRQyxZQUFaLEVBQTBCO0FBQUVqRyxrRkFBVyxDQUFDaUcsWUFBRCxDQUFYO0FBQTRCOztBQUN4RCxRQUFJLENBQUM5VixRQUFMLEVBQWU7QUFDYixVQUFJMFYsaUJBQUosRUFBdUI7QUFDckI3RixvRkFBVyxDQUFDNkYsaUJBQUQsQ0FBWDtBQUNELE9BRkQsTUFFTztBQUNMLFlBQUlDLFVBQUosRUFBZ0I7QUFBRTlGLHNGQUFXLENBQUM4RixVQUFELENBQVg7QUFBMEI7O0FBQzVDLFlBQUlDLFVBQUosRUFBZ0I7QUFBRS9GLHNGQUFXLENBQUMrRixVQUFELENBQVg7QUFBMEI7QUFDN0M7QUFDRjtBQUNGOztBQUVELFdBQVNvVSxRQUFULEdBQXFCO0FBQ25CLFFBQUkvVCxRQUFRLElBQUlNLGNBQWhCLEVBQWdDO0FBQUVyQyxrRkFBVyxDQUFDcUMsY0FBRCxDQUFYO0FBQThCOztBQUNoRSxRQUFJVixHQUFHLElBQUlDLFlBQVgsRUFBeUI7QUFBRTVCLGtGQUFXLENBQUM0QixZQUFELENBQVg7QUFBNEI7O0FBQ3ZELFFBQUk5VixRQUFKLEVBQWM7QUFDWixVQUFJMFYsaUJBQUosRUFBdUI7QUFDckJ4QixvRkFBVyxDQUFDd0IsaUJBQUQsQ0FBWDtBQUNELE9BRkQsTUFFTztBQUNMLFlBQUlDLFVBQUosRUFBZ0I7QUFBRXpCLHNGQUFXLENBQUN5QixVQUFELENBQVg7QUFBMEI7O0FBQzVDLFlBQUlDLFVBQUosRUFBZ0I7QUFBRTFCLHNGQUFXLENBQUMwQixVQUFELENBQVg7QUFBMEI7QUFDN0M7QUFDRjtBQUNGOztBQUVELFdBQVN1UixZQUFULEdBQXlCO0FBQ3ZCLFFBQUl2SyxNQUFKLEVBQVk7QUFBRTtBQUFTLEtBREEsQ0FHdkI7OztBQUNBLFFBQUl4ZCxXQUFKLEVBQWlCO0FBQUV5YSxrQkFBWSxDQUFDL04sS0FBYixDQUFtQm1lLE1BQW5CLEdBQTRCLEtBQTVCO0FBQW9DLEtBSmhDLENBTXZCOzs7QUFDQSxRQUFJalAsVUFBSixFQUFnQjtBQUNkLFVBQUlsUixHQUFHLEdBQUcsaUJBQVY7O0FBQ0EsV0FBSyxJQUFJcEwsQ0FBQyxHQUFHc2MsVUFBYixFQUF5QnRjLENBQUMsRUFBMUIsR0FBK0I7QUFDN0IsWUFBSThhLFFBQUosRUFBYztBQUFFN1AsZ0ZBQVEsQ0FBQ3VRLFVBQVUsQ0FBQ3hiLENBQUQsQ0FBWCxFQUFnQm9MLEdBQWhCLENBQVI7QUFBK0I7O0FBQy9DSCw4RUFBUSxDQUFDdVEsVUFBVSxDQUFDZ0IsYUFBYSxHQUFHeGMsQ0FBaEIsR0FBb0IsQ0FBckIsQ0FBWCxFQUFvQ29MLEdBQXBDLENBQVI7QUFDRDtBQUNGLEtBYnNCLENBZXZCOzs7QUFDQTZjLGFBQVM7QUFFVC9KLFVBQU0sR0FBRyxJQUFUO0FBQ0Q7O0FBRUQsV0FBUzJNLGNBQVQsR0FBMkI7QUFDekIsUUFBSSxDQUFDM00sTUFBTCxFQUFhO0FBQUU7QUFBUyxLQURDLENBR3pCO0FBQ0E7OztBQUNBLFFBQUl4ZCxXQUFXLElBQUlzWixLQUFuQixFQUEwQjtBQUFFbUIsa0JBQVksQ0FBQy9OLEtBQWIsQ0FBbUJtZSxNQUFuQixHQUE0QixFQUE1QjtBQUFpQyxLQUxwQyxDQU96Qjs7O0FBQ0EsUUFBSWpQLFVBQUosRUFBZ0I7QUFDZCxVQUFJbFIsR0FBRyxHQUFHLGlCQUFWOztBQUNBLFdBQUssSUFBSXBMLENBQUMsR0FBR3NjLFVBQWIsRUFBeUJ0YyxDQUFDLEVBQTFCLEdBQStCO0FBQzdCLFlBQUk4YSxRQUFKLEVBQWM7QUFBRWpHLHNGQUFXLENBQUMyRyxVQUFVLENBQUN4YixDQUFELENBQVgsRUFBZ0JvTCxHQUFoQixDQUFYO0FBQWtDOztBQUNsRHlKLG9GQUFXLENBQUMyRyxVQUFVLENBQUNnQixhQUFhLEdBQUd4YyxDQUFoQixHQUFvQixDQUFyQixDQUFYLEVBQW9Db0wsR0FBcEMsQ0FBWDtBQUNEO0FBQ0YsS0Fkd0IsQ0FnQnpCOzs7QUFDQWtnQixZQUFRO0FBRVJwTixVQUFNLEdBQUcsS0FBVDtBQUNEOztBQUVELFdBQVNzSyxhQUFULEdBQTBCO0FBQ3hCLFFBQUl6SyxRQUFKLEVBQWM7QUFBRTtBQUFTOztBQUV6QnBULFNBQUssQ0FBQ29ULFFBQU4sR0FBaUIsSUFBakI7QUFDQWxkLGFBQVMsQ0FBQzJLLFNBQVYsR0FBc0IzSyxTQUFTLENBQUMySyxTQUFWLENBQW9CK0IsT0FBcEIsQ0FBNEJxUSxtQkFBbUIsQ0FBQ2lILFNBQXBCLENBQThCLENBQTlCLENBQTVCLEVBQThELEVBQTlELENBQXRCO0FBQ0ExUSxnRkFBVyxDQUFDdFQsU0FBRCxFQUFZLENBQUMsT0FBRCxDQUFaLENBQVg7O0FBQ0EsUUFBSUksSUFBSixFQUFVO0FBQ1IsV0FBSyxJQUFJdVQsQ0FBQyxHQUFHOEgsVUFBYixFQUF5QjlILENBQUMsRUFBMUIsR0FBK0I7QUFDN0IsWUFBSXNHLFFBQUosRUFBYztBQUFFM0osc0ZBQVcsQ0FBQ3FLLFVBQVUsQ0FBQ2hILENBQUQsQ0FBWCxDQUFYO0FBQTZCOztBQUM3Q3JELG9GQUFXLENBQUNxSyxVQUFVLENBQUNnQixhQUFhLEdBQUdoSSxDQUFoQixHQUFvQixDQUFyQixDQUFYLENBQVg7QUFDRDtBQUNGLEtBWHVCLENBYXhCOzs7QUFDQSxRQUFJLENBQUN5RyxVQUFELElBQWUsQ0FBQ0gsUUFBcEIsRUFBOEI7QUFBRTNHLGtGQUFXLENBQUNnSCxZQUFELEVBQWUsQ0FBQyxPQUFELENBQWYsQ0FBWDtBQUF1QyxLQWQvQyxDQWdCeEI7OztBQUNBLFFBQUksQ0FBQ0wsUUFBTCxFQUFlO0FBQ2IsV0FBSyxJQUFJOWEsQ0FBQyxHQUFHOEssS0FBUixFQUFlb0IsQ0FBQyxHQUFHcEIsS0FBSyxHQUFHMlEsVUFBaEMsRUFBNEN6YixDQUFDLEdBQUdrTSxDQUFoRCxFQUFtRGxNLENBQUMsRUFBcEQsRUFBd0Q7QUFDdEQsWUFBSXVSLElBQUksR0FBR2lLLFVBQVUsQ0FBQ3hiLENBQUQsQ0FBckI7QUFDQW1VLG9GQUFXLENBQUM1QyxJQUFELEVBQU8sQ0FBQyxPQUFELENBQVAsQ0FBWDtBQUNBc0Qsb0ZBQVcsQ0FBQ3RELElBQUQsRUFBT3lHLFNBQVAsQ0FBWDtBQUNBbkQsb0ZBQVcsQ0FBQ3RELElBQUQsRUFBTzJHLGFBQVAsQ0FBWDtBQUNEO0FBQ0YsS0F4QnVCLENBMEJ4Qjs7O0FBQ0ErUCxhQUFTO0FBRVRsSyxZQUFRLEdBQUcsSUFBWDtBQUNEOztBQUVELFdBQVMyTSxZQUFULEdBQXlCO0FBQ3ZCLFFBQUksQ0FBQzNNLFFBQUwsRUFBZTtBQUFFO0FBQVM7O0FBRTFCcFQsU0FBSyxDQUFDb1QsUUFBTixHQUFpQixLQUFqQjtBQUNBbGQsYUFBUyxDQUFDMkssU0FBVixJQUF1Qm9TLG1CQUF2QjtBQUNBcUksOEJBQTBCOztBQUUxQixRQUFJaGxCLElBQUosRUFBVTtBQUNSLFdBQUssSUFBSXVULENBQUMsR0FBRzhILFVBQWIsRUFBeUI5SCxDQUFDLEVBQTFCLEdBQStCO0FBQzdCLFlBQUlzRyxRQUFKLEVBQWM7QUFBRXRGLHNGQUFXLENBQUNnRyxVQUFVLENBQUNoSCxDQUFELENBQVgsQ0FBWDtBQUE2Qjs7QUFDN0NnQixvRkFBVyxDQUFDZ0csVUFBVSxDQUFDZ0IsYUFBYSxHQUFHaEksQ0FBaEIsR0FBb0IsQ0FBckIsQ0FBWCxDQUFYO0FBQ0Q7QUFDRixLQVpzQixDQWN2Qjs7O0FBQ0EsUUFBSSxDQUFDc0csUUFBTCxFQUFlO0FBQ2IsV0FBSyxJQUFJOWEsQ0FBQyxHQUFHOEssS0FBUixFQUFlb0IsQ0FBQyxHQUFHcEIsS0FBSyxHQUFHMlEsVUFBaEMsRUFBNEN6YixDQUFDLEdBQUdrTSxDQUFoRCxFQUFtRGxNLENBQUMsRUFBcEQsRUFBd0Q7QUFDdEQsWUFBSXVSLElBQUksR0FBR2lLLFVBQVUsQ0FBQ3hiLENBQUQsQ0FBckI7QUFBQSxZQUNJd3JCLE1BQU0sR0FBR3hyQixDQUFDLEdBQUc4SyxLQUFLLEdBQUcvSixLQUFaLEdBQW9CaVgsU0FBcEIsR0FBZ0NFLGFBRDdDO0FBRUEzRyxZQUFJLENBQUNuRSxLQUFMLENBQVd1RyxJQUFYLEdBQWtCLENBQUMzVCxDQUFDLEdBQUc4SyxLQUFMLElBQWMsR0FBZCxHQUFvQi9KLEtBQXBCLEdBQTRCLEdBQTlDO0FBQ0FrSyw4RUFBUSxDQUFDc0csSUFBRCxFQUFPaWEsTUFBUCxDQUFSO0FBQ0Q7QUFDRixLQXRCc0IsQ0F3QnZCOzs7QUFDQUYsWUFBUTtBQUVSdk4sWUFBUSxHQUFHLEtBQVg7QUFDRDs7QUFFRCxXQUFTa04sZ0JBQVQsR0FBNkI7QUFDM0IsUUFBSTdmLEdBQUcsR0FBR21jLGdCQUFnQixFQUExQjs7QUFDQSxRQUFJckgsaUJBQWlCLENBQUN6TSxTQUFsQixLQUFnQ3JJLEdBQXBDLEVBQXlDO0FBQUU4VSx1QkFBaUIsQ0FBQ3pNLFNBQWxCLEdBQThCckksR0FBOUI7QUFBb0M7QUFDaEY7O0FBRUQsV0FBU21jLGdCQUFULEdBQTZCO0FBQzNCLFFBQUl0YixHQUFHLEdBQUd3ZixvQkFBb0IsRUFBOUI7QUFBQSxRQUNJQyxLQUFLLEdBQUd6ZixHQUFHLENBQUMsQ0FBRCxDQUFILEdBQVMsQ0FEckI7QUFBQSxRQUVJMGYsR0FBRyxHQUFHMWYsR0FBRyxDQUFDLENBQUQsQ0FBSCxHQUFTLENBRm5CO0FBR0EsV0FBT3lmLEtBQUssS0FBS0MsR0FBVixHQUFnQkQsS0FBSyxHQUFHLEVBQXhCLEdBQTZCQSxLQUFLLEdBQUcsTUFBUixHQUFpQkMsR0FBckQ7QUFDRDs7QUFFRCxXQUFTRixvQkFBVCxDQUErQnRlLEdBQS9CLEVBQW9DO0FBQ2xDLFFBQUlBLEdBQUcsSUFBSSxJQUFYLEVBQWlCO0FBQUVBLFNBQUcsR0FBR3lkLDBCQUEwQixFQUFoQztBQUFxQzs7QUFDeEQsUUFBSWMsS0FBSyxHQUFHNWdCLEtBQVo7QUFBQSxRQUFtQjZnQixHQUFuQjtBQUFBLFFBQXdCQyxVQUF4QjtBQUFBLFFBQW9DQyxRQUFwQyxDQUZrQyxDQUlsQzs7QUFDQSxRQUFJL3FCLE1BQU0sSUFBSUosV0FBZCxFQUEyQjtBQUN6QixVQUFJa1csU0FBUyxJQUFJRCxVQUFqQixFQUE2QjtBQUMzQmlWLGtCQUFVLEdBQUcsRUFBR0UsVUFBVSxDQUFDM2UsR0FBRCxDQUFWLEdBQWtCek0sV0FBckIsQ0FBYjtBQUNBbXJCLGdCQUFRLEdBQUdELFVBQVUsR0FBRzVQLFFBQWIsR0FBd0J0YixXQUFXLEdBQUcsQ0FBakQ7QUFDRDtBQUNGLEtBTEQsTUFLTztBQUNMLFVBQUlrVyxTQUFKLEVBQWU7QUFDYmdWLGtCQUFVLEdBQUd4UCxjQUFjLENBQUN0UixLQUFELENBQTNCO0FBQ0ErZ0IsZ0JBQVEsR0FBR0QsVUFBVSxHQUFHNVAsUUFBeEI7QUFDRDtBQUNGLEtBZmlDLENBaUJsQztBQUNBOzs7QUFDQSxRQUFJcEYsU0FBSixFQUFlO0FBQ2J3RixvQkFBYyxDQUFDL1csT0FBZixDQUF1QixVQUFTMG1CLEtBQVQsRUFBZ0IvckIsQ0FBaEIsRUFBbUI7QUFDeEMsWUFBSUEsQ0FBQyxHQUFHd2MsYUFBUixFQUF1QjtBQUNyQixjQUFJLENBQUMxYixNQUFNLElBQUlKLFdBQVgsS0FBMkJxckIsS0FBSyxJQUFJSCxVQUFVLEdBQUcsR0FBckQsRUFBMEQ7QUFBRUYsaUJBQUssR0FBRzFyQixDQUFSO0FBQVk7O0FBQ3hFLGNBQUk2ckIsUUFBUSxHQUFHRSxLQUFYLElBQW9CLEdBQXhCLEVBQTZCO0FBQUVKLGVBQUcsR0FBRzNyQixDQUFOO0FBQVU7QUFDMUM7QUFDRixPQUxELEVBRGEsQ0FRZjtBQUNDLEtBVEQsTUFTTztBQUVMLFVBQUkyVyxVQUFKLEVBQWdCO0FBQ2QsWUFBSXFWLElBQUksR0FBR3JWLFVBQVUsR0FBRzNWLE1BQXhCOztBQUNBLFlBQUlGLE1BQU0sSUFBSUosV0FBZCxFQUEyQjtBQUN6QmdyQixlQUFLLEdBQUduYixJQUFJLENBQUMyTCxLQUFMLENBQVcwUCxVQUFVLEdBQUNJLElBQXRCLENBQVI7QUFDQUwsYUFBRyxHQUFHcGIsSUFBSSxDQUFDME0sSUFBTCxDQUFVNE8sUUFBUSxHQUFDRyxJQUFULEdBQWdCLENBQTFCLENBQU47QUFDRCxTQUhELE1BR087QUFDTEwsYUFBRyxHQUFHRCxLQUFLLEdBQUduYixJQUFJLENBQUMwTSxJQUFMLENBQVVqQixRQUFRLEdBQUNnUSxJQUFuQixDQUFSLEdBQW1DLENBQXpDO0FBQ0Q7QUFFRixPQVRELE1BU087QUFDTCxZQUFJbHJCLE1BQU0sSUFBSUosV0FBZCxFQUEyQjtBQUN6QixjQUFJMGhCLENBQUMsR0FBR3JoQixLQUFLLEdBQUcsQ0FBaEI7O0FBQ0EsY0FBSUQsTUFBSixFQUFZO0FBQ1Y0cUIsaUJBQUssSUFBSXRKLENBQUMsR0FBRyxDQUFiO0FBQ0F1SixlQUFHLEdBQUc3Z0IsS0FBSyxHQUFHc1gsQ0FBQyxHQUFHLENBQWxCO0FBQ0QsV0FIRCxNQUdPO0FBQ0x1SixlQUFHLEdBQUc3Z0IsS0FBSyxHQUFHc1gsQ0FBZDtBQUNEOztBQUVELGNBQUkxaEIsV0FBSixFQUFpQjtBQUNmLGdCQUFJMmhCLENBQUMsR0FBRzNoQixXQUFXLEdBQUdLLEtBQWQsR0FBc0JpYixRQUE5QjtBQUNBMFAsaUJBQUssSUFBSXJKLENBQVQ7QUFDQXNKLGVBQUcsSUFBSXRKLENBQVA7QUFDRDs7QUFFRHFKLGVBQUssR0FBR25iLElBQUksQ0FBQzJMLEtBQUwsQ0FBV3dQLEtBQVgsQ0FBUjtBQUNBQyxhQUFHLEdBQUdwYixJQUFJLENBQUMwTSxJQUFMLENBQVUwTyxHQUFWLENBQU47QUFDRCxTQWpCRCxNQWlCTztBQUNMQSxhQUFHLEdBQUdELEtBQUssR0FBRzNxQixLQUFSLEdBQWdCLENBQXRCO0FBQ0Q7QUFDRjs7QUFFRDJxQixXQUFLLEdBQUduYixJQUFJLENBQUMyTSxHQUFMLENBQVN3TyxLQUFULEVBQWdCLENBQWhCLENBQVI7QUFDQUMsU0FBRyxHQUFHcGIsSUFBSSxDQUFDeUIsR0FBTCxDQUFTMlosR0FBVCxFQUFjblAsYUFBYSxHQUFHLENBQTlCLENBQU47QUFDRDs7QUFFRCxXQUFPLENBQUNrUCxLQUFELEVBQVFDLEdBQVIsQ0FBUDtBQUNEOztBQUVELFdBQVNwRCxVQUFULEdBQXVCO0FBQ3JCLFFBQUlwbkIsUUFBUSxJQUFJLENBQUMyYyxPQUFqQixFQUEwQjtBQUN4QixVQUFJNVosR0FBRyxHQUFHdW5CLG9CQUFvQixFQUE5QjtBQUNBdm5CLFNBQUcsQ0FBQ3VFLElBQUosQ0FBUzZQLGdCQUFUO0FBRUF5TixtQkFBYSxDQUFDOUMsS0FBZCxDQUFvQixJQUFwQixFQUEwQi9lLEdBQTFCLEVBQStCbUIsT0FBL0IsQ0FBdUMsVUFBVXNnQixHQUFWLEVBQWU7QUFDcEQsWUFBSSxDQUFDdGEsc0VBQVEsQ0FBQ3NhLEdBQUQsRUFBTTlGLGdCQUFOLENBQWIsRUFBc0M7QUFDcEM7QUFDQSxjQUFJcUksR0FBRyxHQUFHLEVBQVY7O0FBQ0FBLGFBQUcsQ0FBQzNOLGFBQUQsQ0FBSCxHQUFxQixVQUFVL00sQ0FBVixFQUFhO0FBQUVBLGFBQUMsQ0FBQ3llLGVBQUY7QUFBc0IsV0FBMUQ7O0FBQ0F4Z0Isa0ZBQVMsQ0FBQ2thLEdBQUQsRUFBTXVDLEdBQU4sQ0FBVDtBQUVBemMsa0ZBQVMsQ0FBQ2thLEdBQUQsRUFBTTdGLFNBQU4sQ0FBVCxDQU5vQyxDQVFwQzs7QUFDQTZGLGFBQUcsQ0FBQ0MsR0FBSixHQUFVdlcsb0VBQU8sQ0FBQ3NXLEdBQUQsRUFBTSxVQUFOLENBQWpCLENBVG9DLENBV3BDOztBQUNBLGNBQUl1RyxNQUFNLEdBQUc3YyxvRUFBTyxDQUFDc1csR0FBRCxFQUFNLGFBQU4sQ0FBcEI7O0FBQ0EsY0FBSXVHLE1BQUosRUFBWTtBQUFFdkcsZUFBRyxDQUFDdUcsTUFBSixHQUFhQSxNQUFiO0FBQXNCOztBQUVwQ2poQixnRkFBUSxDQUFDMGEsR0FBRCxFQUFNLFNBQU4sQ0FBUjtBQUNEO0FBQ0YsT0FsQkQ7QUFtQkQ7QUFDRjs7QUFFRCxXQUFTNUYsV0FBVCxDQUFzQnZTLENBQXRCLEVBQXlCO0FBQ3ZCcVksYUFBUyxDQUFDc0csU0FBUyxDQUFDM2UsQ0FBRCxDQUFWLENBQVQ7QUFDRDs7QUFFRCxXQUFTd1MsV0FBVCxDQUFzQnhTLENBQXRCLEVBQXlCO0FBQ3ZCNGUsYUFBUyxDQUFDRCxTQUFTLENBQUMzZSxDQUFELENBQVYsQ0FBVDtBQUNEOztBQUVELFdBQVNxWSxTQUFULENBQW9CRixHQUFwQixFQUF5QjtBQUN2QjFhLDBFQUFRLENBQUMwYSxHQUFELEVBQU0sUUFBTixDQUFSO0FBQ0EwRyxnQkFBWSxDQUFDMUcsR0FBRCxDQUFaO0FBQ0Q7O0FBRUQsV0FBU3lHLFNBQVQsQ0FBb0J6RyxHQUFwQixFQUF5QjtBQUN2QjFhLDBFQUFRLENBQUMwYSxHQUFELEVBQU0sUUFBTixDQUFSO0FBQ0EwRyxnQkFBWSxDQUFDMUcsR0FBRCxDQUFaO0FBQ0Q7O0FBRUQsV0FBUzBHLFlBQVQsQ0FBdUIxRyxHQUF2QixFQUE0QjtBQUMxQjFhLDBFQUFRLENBQUMwYSxHQUFELEVBQU05RixnQkFBTixDQUFSO0FBQ0FoTCxnRkFBVyxDQUFDOFEsR0FBRCxFQUFNLFNBQU4sQ0FBWDtBQUNBN1Esa0ZBQVksQ0FBQzZRLEdBQUQsRUFBTTdGLFNBQU4sQ0FBWjtBQUNEOztBQUVELFdBQVNpRyxhQUFULENBQXdCMkYsS0FBeEIsRUFBK0JDLEdBQS9CLEVBQW9DVyxXQUFwQyxFQUFpRDtBQUMvQyxRQUFJNUcsSUFBSSxHQUFHLEVBQVg7O0FBQ0EsUUFBSSxDQUFDNEcsV0FBTCxFQUFrQjtBQUFFQSxpQkFBVyxHQUFHLEtBQWQ7QUFBc0I7O0FBRTFDLFdBQU9aLEtBQUssSUFBSUMsR0FBaEIsRUFBcUI7QUFDbkJ0bUIsMEVBQU8sQ0FBQ21XLFVBQVUsQ0FBQ2tRLEtBQUQsQ0FBVixDQUFrQjNyQixnQkFBbEIsQ0FBbUN1c0IsV0FBbkMsQ0FBRCxFQUFrRCxVQUFVM0csR0FBVixFQUFlO0FBQUVELFlBQUksQ0FBQ2pkLElBQUwsQ0FBVWtkLEdBQVY7QUFBaUIsT0FBcEYsQ0FBUDtBQUNBK0YsV0FBSztBQUNOOztBQUVELFdBQU9oRyxJQUFQO0FBQ0QsR0Fod0RnQyxDQWt3RGpDO0FBQ0E7OztBQUNBLFdBQVM0QyxZQUFULEdBQXlCO0FBQ3ZCLFFBQUk1QyxJQUFJLEdBQUdLLGFBQWEsQ0FBQzlDLEtBQWQsQ0FBb0IsSUFBcEIsRUFBMEJ3SSxvQkFBb0IsRUFBOUMsQ0FBWDtBQUNBNVgsK0RBQUcsQ0FBQyxZQUFVO0FBQUVpUyxxQkFBZSxDQUFDSixJQUFELEVBQU82Ryx3QkFBUCxDQUFmO0FBQWtELEtBQS9ELENBQUg7QUFDRDs7QUFFRCxXQUFTekcsZUFBVCxDQUEwQkosSUFBMUIsRUFBZ0N4UixFQUFoQyxFQUFvQztBQUNsQztBQUNBLFFBQUkrTCxZQUFKLEVBQWtCO0FBQUUsYUFBTy9MLEVBQUUsRUFBVDtBQUFjLEtBRkEsQ0FJbEM7OztBQUNBd1IsUUFBSSxDQUFDcmdCLE9BQUwsQ0FBYSxVQUFVc2dCLEdBQVYsRUFBZTdhLEtBQWYsRUFBc0I7QUFDakMsVUFBSSxDQUFDM0osUUFBRCxJQUFhd2tCLEdBQUcsQ0FBQ3piLFFBQXJCLEVBQStCO0FBQUVtaUIsb0JBQVksQ0FBQzFHLEdBQUQsQ0FBWjtBQUFvQixPQURwQixDQUNxQjs7O0FBQ3RELFVBQUl0YSxzRUFBUSxDQUFDc2EsR0FBRCxFQUFNOUYsZ0JBQU4sQ0FBWixFQUFxQztBQUFFNkYsWUFBSSxDQUFDOVcsTUFBTCxDQUFZOUQsS0FBWixFQUFtQixDQUFuQjtBQUF3QjtBQUNoRSxLQUhELEVBTGtDLENBVWxDOztBQUNBLFFBQUksQ0FBQzRhLElBQUksQ0FBQ3psQixNQUFWLEVBQWtCO0FBQUUsYUFBT2lVLEVBQUUsRUFBVDtBQUFjLEtBWEEsQ0FhbEM7OztBQUNBTCwrREFBRyxDQUFDLFlBQVU7QUFBRWlTLHFCQUFlLENBQUNKLElBQUQsRUFBT3hSLEVBQVAsQ0FBZjtBQUE0QixLQUF6QyxDQUFIO0FBQ0Q7O0FBRUQsV0FBU3dVLGlCQUFULEdBQThCO0FBQzVCSCxjQUFVO0FBQ1ZsQixxQkFBaUI7QUFDakI0RCxvQkFBZ0I7QUFDaEJqRCx3QkFBb0I7QUFDcEJ3RSxtQkFBZTtBQUNoQjs7QUFHRCxXQUFTN0YsbUNBQVQsR0FBZ0Q7QUFDOUMsUUFBSTdMLFFBQVEsSUFBSXpDLFVBQWhCLEVBQTRCO0FBQzFCK0MsbUJBQWEsQ0FBQ2hPLEtBQWQsQ0FBb0IrTSxrQkFBcEIsSUFBMEM3QyxLQUFLLEdBQUcsSUFBUixHQUFlLEdBQXpEO0FBQ0Q7QUFDRjs7QUFFRCxXQUFTbVYsaUJBQVQsQ0FBNEJDLFVBQTVCLEVBQXdDQyxVQUF4QyxFQUFvRDtBQUNsRCxRQUFJQyxPQUFPLEdBQUcsRUFBZDs7QUFDQSxTQUFLLElBQUk1c0IsQ0FBQyxHQUFHMHNCLFVBQVIsRUFBb0J4Z0IsQ0FBQyxHQUFHcUUsSUFBSSxDQUFDeUIsR0FBTCxDQUFTMGEsVUFBVSxHQUFHQyxVQUF0QixFQUFrQ25RLGFBQWxDLENBQTdCLEVBQStFeGMsQ0FBQyxHQUFHa00sQ0FBbkYsRUFBc0ZsTSxDQUFDLEVBQXZGLEVBQTJGO0FBQ3pGNHNCLGFBQU8sQ0FBQ25rQixJQUFSLENBQWErUyxVQUFVLENBQUN4YixDQUFELENBQVYsQ0FBY2lWLFlBQTNCO0FBQ0Q7O0FBRUQsV0FBTzFFLElBQUksQ0FBQzJNLEdBQUwsQ0FBUytGLEtBQVQsQ0FBZSxJQUFmLEVBQXFCMkosT0FBckIsQ0FBUDtBQUNELEdBaHpEZ0MsQ0FrekRqQztBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSxXQUFTTCx3QkFBVCxHQUFxQztBQUNuQyxRQUFJTSxTQUFTLEdBQUd4VSxVQUFVLEdBQUdvVSxpQkFBaUIsQ0FBQzNoQixLQUFELEVBQVEvSixLQUFSLENBQXBCLEdBQXFDMHJCLGlCQUFpQixDQUFDblEsVUFBRCxFQUFhYixVQUFiLENBQWhGO0FBQUEsUUFDSXlKLEVBQUUsR0FBRzlKLGFBQWEsR0FBR0EsYUFBSCxHQUFtQkQsWUFEekM7O0FBR0EsUUFBSStKLEVBQUUsQ0FBQzlYLEtBQUgsQ0FBUzJkLE1BQVQsS0FBb0I4QixTQUF4QixFQUFtQztBQUFFM0gsUUFBRSxDQUFDOVgsS0FBSCxDQUFTMmQsTUFBVCxHQUFrQjhCLFNBQVMsR0FBRyxJQUE5QjtBQUFxQztBQUMzRSxHQTV6RGdDLENBOHpEakM7QUFDQTs7O0FBQ0EsV0FBU3ZHLGlCQUFULEdBQThCO0FBQzVCbEssa0JBQWMsR0FBRyxDQUFDLENBQUQsQ0FBakI7QUFDQSxRQUFJOU0sSUFBSSxHQUFHMkwsVUFBVSxHQUFHLE1BQUgsR0FBWSxLQUFqQztBQUFBLFFBQ0k2UixLQUFLLEdBQUc3UixVQUFVLEdBQUcsT0FBSCxHQUFhLFFBRG5DO0FBQUEsUUFFSThSLElBQUksR0FBR3ZSLFVBQVUsQ0FBQyxDQUFELENBQVYsQ0FBYzlILHFCQUFkLEdBQXNDcEUsSUFBdEMsQ0FGWDtBQUlBakssd0VBQU8sQ0FBQ21XLFVBQUQsRUFBYSxVQUFTakssSUFBVCxFQUFldlIsQ0FBZixFQUFrQjtBQUNwQztBQUNBLFVBQUlBLENBQUosRUFBTztBQUFFb2Msc0JBQWMsQ0FBQzNULElBQWYsQ0FBb0I4SSxJQUFJLENBQUNtQyxxQkFBTCxHQUE2QnBFLElBQTdCLElBQXFDeWQsSUFBekQ7QUFBaUUsT0FGdEMsQ0FHcEM7OztBQUNBLFVBQUkvc0IsQ0FBQyxLQUFLd2MsYUFBYSxHQUFHLENBQTFCLEVBQTZCO0FBQUVKLHNCQUFjLENBQUMzVCxJQUFmLENBQW9COEksSUFBSSxDQUFDbUMscUJBQUwsR0FBNkJvWixLQUE3QixJQUFzQ0MsSUFBMUQ7QUFBa0U7QUFDbEcsS0FMTSxDQUFQO0FBTUQsR0E1MERnQyxDQTgwRGpDOzs7QUFDQSxXQUFTMUYsaUJBQVQsR0FBOEI7QUFDNUIsUUFBSWpYLEtBQUssR0FBR3FiLG9CQUFvQixFQUFoQztBQUFBLFFBQ0lDLEtBQUssR0FBR3RiLEtBQUssQ0FBQyxDQUFELENBRGpCO0FBQUEsUUFFSXViLEdBQUcsR0FBR3ZiLEtBQUssQ0FBQyxDQUFELENBRmY7QUFJQS9LLHdFQUFPLENBQUNtVyxVQUFELEVBQWEsVUFBU2pLLElBQVQsRUFBZXZSLENBQWYsRUFBa0I7QUFDcEM7QUFDQSxVQUFJQSxDQUFDLElBQUkwckIsS0FBTCxJQUFjMXJCLENBQUMsSUFBSTJyQixHQUF2QixFQUE0QjtBQUMxQixZQUFJM2Esb0VBQU8sQ0FBQ08sSUFBRCxFQUFPLGFBQVAsQ0FBWCxFQUFrQztBQUNoQzRDLHNGQUFXLENBQUM1QyxJQUFELEVBQU8sQ0FBQyxhQUFELEVBQWdCLFVBQWhCLENBQVAsQ0FBWDtBQUNBdEcsZ0ZBQVEsQ0FBQ3NHLElBQUQsRUFBT29PLGdCQUFQLENBQVI7QUFDRCxTQUp5QixDQUs1Qjs7QUFDQyxPQU5ELE1BTU87QUFDTCxZQUFJLENBQUMzTyxvRUFBTyxDQUFDTyxJQUFELEVBQU8sYUFBUCxDQUFaLEVBQW1DO0FBQ2pDMkQsZ0ZBQVEsQ0FBQzNELElBQUQsRUFBTztBQUNiLDJCQUFlLE1BREY7QUFFYix3QkFBWTtBQUZDLFdBQVAsQ0FBUjtBQUlBc0Qsc0ZBQVcsQ0FBQ3RELElBQUQsRUFBT29PLGdCQUFQLENBQVg7QUFDRDtBQUNGO0FBQ0YsS0FqQk0sQ0FBUDtBQWtCRCxHQXQyRGdDLENBdzJEakM7OztBQUNBLFdBQVN1TCwyQkFBVCxHQUF3QztBQUN0QyxRQUFJaGYsQ0FBQyxHQUFHcEIsS0FBSyxHQUFHeUYsSUFBSSxDQUFDeUIsR0FBTCxDQUFTeUosVUFBVCxFQUFxQjFhLEtBQXJCLENBQWhCOztBQUNBLFNBQUssSUFBSWYsQ0FBQyxHQUFHd2MsYUFBYixFQUE0QnhjLENBQUMsRUFBN0IsR0FBa0M7QUFDaEMsVUFBSXVSLElBQUksR0FBR2lLLFVBQVUsQ0FBQ3hiLENBQUQsQ0FBckI7O0FBRUEsVUFBSUEsQ0FBQyxJQUFJOEssS0FBTCxJQUFjOUssQ0FBQyxHQUFHa00sQ0FBdEIsRUFBeUI7QUFDdkI7QUFDQWpCLDhFQUFRLENBQUNzRyxJQUFELEVBQU8sWUFBUCxDQUFSO0FBRUFBLFlBQUksQ0FBQ25FLEtBQUwsQ0FBV3VHLElBQVgsR0FBa0IsQ0FBQzNULENBQUMsR0FBRzhLLEtBQUwsSUFBYyxHQUFkLEdBQW9CL0osS0FBcEIsR0FBNEIsR0FBOUM7QUFDQWtLLDhFQUFRLENBQUNzRyxJQUFELEVBQU95RyxTQUFQLENBQVI7QUFDQW5ELG9GQUFXLENBQUN0RCxJQUFELEVBQU8yRyxhQUFQLENBQVg7QUFDRCxPQVBELE1BT08sSUFBSTNHLElBQUksQ0FBQ25FLEtBQUwsQ0FBV3VHLElBQWYsRUFBcUI7QUFDMUJwQyxZQUFJLENBQUNuRSxLQUFMLENBQVd1RyxJQUFYLEdBQWtCLEVBQWxCO0FBQ0ExSSw4RUFBUSxDQUFDc0csSUFBRCxFQUFPMkcsYUFBUCxDQUFSO0FBQ0FyRCxvRkFBVyxDQUFDdEQsSUFBRCxFQUFPeUcsU0FBUCxDQUFYO0FBQ0QsT0FkK0IsQ0FnQmhDOzs7QUFDQW5ELGtGQUFXLENBQUN0RCxJQUFELEVBQU8wRyxVQUFQLENBQVg7QUFDRCxLQXBCcUMsQ0FzQnRDOzs7QUFDQTNGLGNBQVUsQ0FBQyxZQUFXO0FBQ3BCak4sMEVBQU8sQ0FBQ21XLFVBQUQsRUFBYSxVQUFTclEsRUFBVCxFQUFhO0FBQy9CMEosb0ZBQVcsQ0FBQzFKLEVBQUQsRUFBSyxZQUFMLENBQVg7QUFDRCxPQUZNLENBQVA7QUFHRCxLQUpTLEVBSVAsR0FKTyxDQUFWO0FBS0QsR0FyNERnQyxDQXU0RGpDOzs7QUFDQSxXQUFTcWhCLGVBQVQsR0FBNEI7QUFDMUI7QUFDQSxRQUFJclYsR0FBSixFQUFTO0FBQ1A0SixxQkFBZSxHQUFHRCxVQUFVLElBQUksQ0FBZCxHQUFrQkEsVUFBbEIsR0FBK0JFLGtCQUFrQixFQUFuRTtBQUNBRixnQkFBVSxHQUFHLENBQUMsQ0FBZDs7QUFFQSxVQUFJQyxlQUFlLEtBQUtFLHFCQUF4QixFQUErQztBQUM3QyxZQUFJK0wsT0FBTyxHQUFHdE0sUUFBUSxDQUFDTyxxQkFBRCxDQUF0QjtBQUFBLFlBQ0lnTSxVQUFVLEdBQUd2TSxRQUFRLENBQUNLLGVBQUQsQ0FEekI7QUFHQTdMLDhFQUFRLENBQUM4WCxPQUFELEVBQVU7QUFDaEIsc0JBQVksSUFESTtBQUVoQix3QkFBYzdMLE1BQU0sSUFBSUYscUJBQXFCLEdBQUcsQ0FBNUI7QUFGSixTQUFWLENBQVI7QUFJQXBNLG9GQUFXLENBQUNtWSxPQUFELEVBQVU5TCxjQUFWLENBQVg7QUFFQWhNLDhFQUFRLENBQUMrWCxVQUFELEVBQWE7QUFBQyx3QkFBYzlMLE1BQU0sSUFBSUosZUFBZSxHQUFHLENBQXRCLENBQU4sR0FBaUNLO0FBQWhELFNBQWIsQ0FBUjtBQUNBak4sb0ZBQVcsQ0FBQzhZLFVBQUQsRUFBYSxVQUFiLENBQVg7QUFDQWhpQiw4RUFBUSxDQUFDZ2lCLFVBQUQsRUFBYS9MLGNBQWIsQ0FBUjtBQUVBRCw2QkFBcUIsR0FBR0YsZUFBeEI7QUFDRDtBQUNGO0FBQ0Y7O0FBRUQsV0FBU21NLG9CQUFULENBQStCL2hCLEVBQS9CLEVBQW1DO0FBQ2pDLFdBQU9BLEVBQUUsQ0FBQzBQLFFBQUgsQ0FBWTlLLFdBQVosRUFBUDtBQUNEOztBQUVELFdBQVNnWSxRQUFULENBQW1CNWMsRUFBbkIsRUFBdUI7QUFDckIsV0FBTytoQixvQkFBb0IsQ0FBQy9oQixFQUFELENBQXBCLEtBQTZCLFFBQXBDO0FBQ0Q7O0FBRUQsV0FBU2dpQixjQUFULENBQXlCaGlCLEVBQXpCLEVBQTZCO0FBQzNCLFdBQU9BLEVBQUUsQ0FBQzdLLFlBQUgsQ0FBZ0IsZUFBaEIsTUFBcUMsTUFBNUM7QUFDRDs7QUFFRCxXQUFTOHNCLGdCQUFULENBQTJCckYsUUFBM0IsRUFBcUM1YyxFQUFyQyxFQUF5Q2dDLEdBQXpDLEVBQThDO0FBQzVDLFFBQUk0YSxRQUFKLEVBQWM7QUFDWjVjLFFBQUUsQ0FBQzRTLFFBQUgsR0FBYzVRLEdBQWQ7QUFDRCxLQUZELE1BRU87QUFDTGhDLFFBQUUsQ0FBQytDLFlBQUgsQ0FBZ0IsZUFBaEIsRUFBaUNmLEdBQUcsQ0FBQ25GLFFBQUosRUFBakM7QUFDRDtBQUNGLEdBbjdEZ0MsQ0FxN0RqQzs7O0FBQ0EsV0FBU2dnQixvQkFBVCxHQUFpQztBQUMvQixRQUFJLENBQUMxbUIsUUFBRCxJQUFhOFcsTUFBYixJQUF1Qm5YLElBQTNCLEVBQWlDO0FBQUU7QUFBUzs7QUFFNUMsUUFBSW9zQixZQUFZLEdBQUk5TSxZQUFELEdBQWlCdEosVUFBVSxDQUFDOEcsUUFBNUIsR0FBdUNvUCxjQUFjLENBQUNsVyxVQUFELENBQXhFO0FBQUEsUUFDSXFXLFlBQVksR0FBSTlNLFlBQUQsR0FBaUJ0SixVQUFVLENBQUM2RyxRQUE1QixHQUF1Q29QLGNBQWMsQ0FBQ2pXLFVBQUQsQ0FEeEU7QUFBQSxRQUVJcVcsV0FBVyxHQUFJemlCLEtBQUssSUFBSXlTLFFBQVYsR0FBc0IsSUFBdEIsR0FBNkIsS0FGL0M7QUFBQSxRQUdJaVEsV0FBVyxHQUFJLENBQUNwVixNQUFELElBQVd0TixLQUFLLElBQUkwUyxRQUFyQixHQUFpQyxJQUFqQyxHQUF3QyxLQUgxRDs7QUFLQSxRQUFJK1AsV0FBVyxJQUFJLENBQUNGLFlBQXBCLEVBQWtDO0FBQ2hDRCxzQkFBZ0IsQ0FBQzdNLFlBQUQsRUFBZXRKLFVBQWYsRUFBMkIsSUFBM0IsQ0FBaEI7QUFDRDs7QUFDRCxRQUFJLENBQUNzVyxXQUFELElBQWdCRixZQUFwQixFQUFrQztBQUNoQ0Qsc0JBQWdCLENBQUM3TSxZQUFELEVBQWV0SixVQUFmLEVBQTJCLEtBQTNCLENBQWhCO0FBQ0Q7O0FBQ0QsUUFBSXVXLFdBQVcsSUFBSSxDQUFDRixZQUFwQixFQUFrQztBQUNoQ0Ysc0JBQWdCLENBQUM1TSxZQUFELEVBQWV0SixVQUFmLEVBQTJCLElBQTNCLENBQWhCO0FBQ0Q7O0FBQ0QsUUFBSSxDQUFDc1csV0FBRCxJQUFnQkYsWUFBcEIsRUFBa0M7QUFDaENGLHNCQUFnQixDQUFDNU0sWUFBRCxFQUFldEosVUFBZixFQUEyQixLQUEzQixDQUFoQjtBQUNEO0FBQ0YsR0ExOERnQyxDQTQ4RGpDOzs7QUFDQSxXQUFTdVcsYUFBVCxDQUF3QnRpQixFQUF4QixFQUE0QkMsR0FBNUIsRUFBaUM7QUFDL0IsUUFBSStPLGtCQUFKLEVBQXdCO0FBQUVoUCxRQUFFLENBQUNpQyxLQUFILENBQVMrTSxrQkFBVCxJQUErQi9PLEdBQS9CO0FBQXFDO0FBQ2hFOztBQUVELFdBQVNzaUIsY0FBVCxHQUEyQjtBQUN6QixXQUFPL1csVUFBVSxHQUFHLENBQUNBLFVBQVUsR0FBRzNWLE1BQWQsSUFBd0J3YixhQUEzQixHQUEyQ0osY0FBYyxDQUFDSSxhQUFELENBQTFFO0FBQ0Q7O0FBRUQsV0FBU21SLFlBQVQsQ0FBdUIvSSxHQUF2QixFQUE0QjtBQUMxQixRQUFJQSxHQUFHLElBQUksSUFBWCxFQUFpQjtBQUFFQSxTQUFHLEdBQUc5WixLQUFOO0FBQWM7O0FBRWpDLFFBQUl3RixHQUFHLEdBQUc1UCxXQUFXLEdBQUdNLE1BQUgsR0FBWSxDQUFqQztBQUNBLFdBQU80VixTQUFTLEdBQUcsQ0FBRW9GLFFBQVEsR0FBRzFMLEdBQVosSUFBb0I4TCxjQUFjLENBQUN3SSxHQUFHLEdBQUcsQ0FBUCxDQUFkLEdBQTBCeEksY0FBYyxDQUFDd0ksR0FBRCxDQUF4QyxHQUFnRDVqQixNQUFwRSxDQUFELElBQThFLENBQWpGLEdBQ2QyVixVQUFVLEdBQUcsQ0FBQ3FGLFFBQVEsR0FBR3JGLFVBQVosSUFBMEIsQ0FBN0IsR0FDUixDQUFDNVYsS0FBSyxHQUFHLENBQVQsSUFBYyxDQUZsQjtBQUdEOztBQUVELFdBQVM0YixnQkFBVCxHQUE2QjtBQUMzQixRQUFJck0sR0FBRyxHQUFHNVAsV0FBVyxHQUFHTSxNQUFILEdBQVksQ0FBakM7QUFBQSxRQUNJc0YsTUFBTSxHQUFJMFYsUUFBUSxHQUFHMUwsR0FBWixHQUFtQm9kLGNBQWMsRUFEOUM7O0FBR0EsUUFBSTVzQixNQUFNLElBQUksQ0FBQ0csSUFBZixFQUFxQjtBQUNuQnFGLFlBQU0sR0FBR3FRLFVBQVUsR0FBRyxFQUFHQSxVQUFVLEdBQUczVixNQUFoQixLQUEyQndiLGFBQWEsR0FBRyxDQUEzQyxJQUFnRG1SLFlBQVksRUFBL0QsR0FDakJBLFlBQVksQ0FBQ25SLGFBQWEsR0FBRyxDQUFqQixDQUFaLEdBQWtDSixjQUFjLENBQUNJLGFBQWEsR0FBRyxDQUFqQixDQURsRDtBQUVEOztBQUNELFFBQUlsVyxNQUFNLEdBQUcsQ0FBYixFQUFnQjtBQUFFQSxZQUFNLEdBQUcsQ0FBVDtBQUFhOztBQUUvQixXQUFPQSxNQUFQO0FBQ0Q7O0FBRUQsV0FBU3NrQiwwQkFBVCxDQUFxQ2hHLEdBQXJDLEVBQTBDO0FBQ3hDLFFBQUlBLEdBQUcsSUFBSSxJQUFYLEVBQWlCO0FBQUVBLFNBQUcsR0FBRzlaLEtBQU47QUFBYzs7QUFFakMsUUFBSXFDLEdBQUo7O0FBQ0EsUUFBSThOLFVBQVUsSUFBSSxDQUFDckUsU0FBbkIsRUFBOEI7QUFDNUIsVUFBSUQsVUFBSixFQUFnQjtBQUNkeEosV0FBRyxHQUFHLEVBQUd3SixVQUFVLEdBQUczVixNQUFoQixJQUEwQjRqQixHQUFoQzs7QUFDQSxZQUFJOWpCLE1BQUosRUFBWTtBQUFFcU0sYUFBRyxJQUFJd2dCLFlBQVksRUFBbkI7QUFBd0I7QUFDdkMsT0FIRCxNQUdPO0FBQ0wsWUFBSUMsV0FBVyxHQUFHM1QsU0FBUyxHQUFHdUMsYUFBSCxHQUFtQnpiLEtBQTlDOztBQUNBLFlBQUlELE1BQUosRUFBWTtBQUFFOGpCLGFBQUcsSUFBSStJLFlBQVksRUFBbkI7QUFBd0I7O0FBQ3RDeGdCLFdBQUcsR0FBRyxDQUFFeVgsR0FBRixHQUFRLEdBQVIsR0FBY2dKLFdBQXBCO0FBQ0Q7QUFDRixLQVRELE1BU087QUFDTHpnQixTQUFHLEdBQUcsQ0FBRWlQLGNBQWMsQ0FBQ3dJLEdBQUQsQ0FBdEI7O0FBQ0EsVUFBSTlqQixNQUFNLElBQUk4VixTQUFkLEVBQXlCO0FBQ3ZCekosV0FBRyxJQUFJd2dCLFlBQVksRUFBbkI7QUFDRDtBQUNGOztBQUVELFFBQUlsUixnQkFBSixFQUFzQjtBQUFFdFAsU0FBRyxHQUFHb0QsSUFBSSxDQUFDMk0sR0FBTCxDQUFTL1AsR0FBVCxFQUFjdVAsYUFBZCxDQUFOO0FBQXFDOztBQUU3RHZQLE9BQUcsSUFBSzhOLFVBQVUsSUFBSSxDQUFDckUsU0FBZixJQUE0QixDQUFDRCxVQUE5QixHQUE0QyxHQUE1QyxHQUFrRCxJQUF6RDtBQUVBLFdBQU94SixHQUFQO0FBQ0Q7O0FBRUQsV0FBUzhZLDBCQUFULENBQXFDOVksR0FBckMsRUFBMEM7QUFDeENzZ0IsaUJBQWEsQ0FBQzVzQixTQUFELEVBQVksSUFBWixDQUFiO0FBQ0E4cEIsd0JBQW9CLENBQUN4ZCxHQUFELENBQXBCO0FBQ0Q7O0FBRUQsV0FBU3dkLG9CQUFULENBQStCeGQsR0FBL0IsRUFBb0M7QUFDbEMsUUFBSUEsR0FBRyxJQUFJLElBQVgsRUFBaUI7QUFBRUEsU0FBRyxHQUFHeWQsMEJBQTBCLEVBQWhDO0FBQXFDOztBQUN4RC9wQixhQUFTLENBQUN1TSxLQUFWLENBQWdCeVAsYUFBaEIsSUFBaUNDLGVBQWUsR0FBRzNQLEdBQWxCLEdBQXdCNFAsZ0JBQXpEO0FBQ0Q7O0FBRUQsV0FBUzhRLFlBQVQsQ0FBdUJDLE1BQXZCLEVBQStCQyxRQUEvQixFQUF5Q0MsT0FBekMsRUFBa0RDLEtBQWxELEVBQXlEO0FBQ3ZELFFBQUkvaEIsQ0FBQyxHQUFHNGhCLE1BQU0sR0FBRy9zQixLQUFqQjs7QUFDQSxRQUFJLENBQUNFLElBQUwsRUFBVztBQUFFaUwsT0FBQyxHQUFHcUUsSUFBSSxDQUFDeUIsR0FBTCxDQUFTOUYsQ0FBVCxFQUFZc1EsYUFBWixDQUFKO0FBQWlDOztBQUU5QyxTQUFLLElBQUl4YyxDQUFDLEdBQUc4dEIsTUFBYixFQUFxQjl0QixDQUFDLEdBQUdrTSxDQUF6QixFQUE0QmxNLENBQUMsRUFBN0IsRUFBaUM7QUFDN0IsVUFBSXVSLElBQUksR0FBR2lLLFVBQVUsQ0FBQ3hiLENBQUQsQ0FBckIsQ0FENkIsQ0FHL0I7O0FBQ0EsVUFBSSxDQUFDaXVCLEtBQUwsRUFBWTtBQUFFMWMsWUFBSSxDQUFDbkUsS0FBTCxDQUFXdUcsSUFBWCxHQUFrQixDQUFDM1QsQ0FBQyxHQUFHOEssS0FBTCxJQUFjLEdBQWQsR0FBb0IvSixLQUFwQixHQUE0QixHQUE5QztBQUFvRDs7QUFFbEUsVUFBSW9YLFlBQVksSUFBSWlDLGVBQXBCLEVBQXFDO0FBQ25DN0ksWUFBSSxDQUFDbkUsS0FBTCxDQUFXZ04sZUFBWCxJQUE4QjdJLElBQUksQ0FBQ25FLEtBQUwsQ0FBV2tOLGNBQVgsSUFBNkJuQyxZQUFZLElBQUluWSxDQUFDLEdBQUc4dEIsTUFBUixDQUFaLEdBQThCLElBQTlCLEdBQXFDLEdBQWhHO0FBQ0Q7O0FBQ0RqWixrRkFBVyxDQUFDdEQsSUFBRCxFQUFPd2MsUUFBUCxDQUFYO0FBQ0E5aUIsNEVBQVEsQ0FBQ3NHLElBQUQsRUFBT3ljLE9BQVAsQ0FBUjs7QUFFQSxVQUFJQyxLQUFKLEVBQVc7QUFBRTVSLHFCQUFhLENBQUM1VCxJQUFkLENBQW1COEksSUFBbkI7QUFBMkI7QUFDekM7QUFDRixHQWxpRWdDLENBb2lFakM7QUFDQTtBQUNBOzs7QUFDQSxNQUFJMmMsYUFBYSxHQUFJLFlBQVk7QUFDL0IsV0FBT3BULFFBQVEsR0FDYixZQUFZO0FBQ1YyUyxtQkFBYSxDQUFDNXNCLFNBQUQsRUFBWSxFQUFaLENBQWI7O0FBQ0EsVUFBSXNaLGtCQUFrQixJQUFJLENBQUM3QyxLQUEzQixFQUFrQztBQUNoQztBQUNBO0FBQ0FxVCw0QkFBb0IsR0FIWSxDQUloQztBQUNBOztBQUNBLFlBQUksQ0FBQ3JULEtBQUQsSUFBVSxDQUFDOUYsd0VBQVMsQ0FBQzNRLFNBQUQsQ0FBeEIsRUFBcUM7QUFBRXNuQix5QkFBZTtBQUFLO0FBRTVELE9BUkQsTUFRTztBQUNMO0FBQ0ExVyxvRkFBVyxDQUFDNVEsU0FBRCxFQUFZZ2MsYUFBWixFQUEyQkMsZUFBM0IsRUFBNENDLGdCQUE1QyxFQUE4RDZOLDBCQUEwQixFQUF4RixFQUE0RnRULEtBQTVGLEVBQW1HNlEsZUFBbkcsQ0FBWDtBQUNEOztBQUVELFVBQUksQ0FBQ2xOLFVBQUwsRUFBaUI7QUFBRXNMLGtDQUEwQjtBQUFLO0FBQ25ELEtBakJZLEdBa0JiLFlBQVk7QUFDVmxLLG1CQUFhLEdBQUcsRUFBaEI7QUFFQSxVQUFJNkwsR0FBRyxHQUFHLEVBQVY7QUFDQUEsU0FBRyxDQUFDM04sYUFBRCxDQUFILEdBQXFCMk4sR0FBRyxDQUFDMU4sWUFBRCxDQUFILEdBQW9CMk4sZUFBekM7QUFDQXJULG9GQUFZLENBQUMwRyxVQUFVLENBQUM0QixXQUFELENBQVgsRUFBMEI4SyxHQUExQixDQUFaO0FBQ0F6Yyw4RUFBUyxDQUFDK1AsVUFBVSxDQUFDMVEsS0FBRCxDQUFYLEVBQW9Cb2QsR0FBcEIsQ0FBVDtBQUVBMkYsa0JBQVksQ0FBQ3pRLFdBQUQsRUFBY3BGLFNBQWQsRUFBeUJDLFVBQXpCLEVBQXFDLElBQXJDLENBQVo7QUFDQTRWLGtCQUFZLENBQUMvaUIsS0FBRCxFQUFRb04sYUFBUixFQUF1QkYsU0FBdkIsQ0FBWixDQVRVLENBV1Y7QUFDQTs7QUFDQSxVQUFJLENBQUN1QyxhQUFELElBQWtCLENBQUNDLFlBQW5CLElBQW1DLENBQUNsRCxLQUFwQyxJQUE2QyxDQUFDOUYsd0VBQVMsQ0FBQzNRLFNBQUQsQ0FBM0QsRUFBd0U7QUFBRXNuQix1QkFBZTtBQUFLO0FBQy9GLEtBaENIO0FBaUNELEdBbENtQixFQUFwQjs7QUFvQ0EsV0FBU2dHLE1BQVQsQ0FBaUIzZ0IsQ0FBakIsRUFBb0I0Z0IsV0FBcEIsRUFBaUM7QUFDL0IsUUFBSXhSLDBCQUFKLEVBQWdDO0FBQUU2TixpQkFBVztBQUFLLEtBRG5CLENBRy9COzs7QUFDQSxRQUFJM2YsS0FBSyxLQUFLc1MsV0FBVixJQUF5QmdSLFdBQTdCLEVBQTBDO0FBQ3hDO0FBQ0F6USxZQUFNLENBQUM5TyxJQUFQLENBQVksY0FBWixFQUE0QmhILElBQUksRUFBaEM7QUFDQThWLFlBQU0sQ0FBQzlPLElBQVAsQ0FBWSxpQkFBWixFQUErQmhILElBQUksRUFBbkM7O0FBQ0EsVUFBSXdRLFVBQUosRUFBZ0I7QUFBRWlRLG9CQUFZO0FBQUssT0FKSyxDQU14Qzs7O0FBQ0EsVUFBSTlHLFNBQVMsSUFBSWhVLENBQWIsSUFBa0IsQ0FBQyxPQUFELEVBQVUsU0FBVixFQUFxQjNCLE9BQXJCLENBQTZCMkIsQ0FBQyxDQUFDckosSUFBL0IsS0FBd0MsQ0FBOUQsRUFBaUU7QUFBRTJtQixvQkFBWTtBQUFLOztBQUVwRnpZLGFBQU8sR0FBRyxJQUFWO0FBQ0E2YixtQkFBYTtBQUNkO0FBQ0Y7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0UsV0FBU0csUUFBVCxDQUFtQmpqQixHQUFuQixFQUF3QjtBQUN0QixXQUFPQSxHQUFHLENBQUMyRSxXQUFKLEdBQWtCeEMsT0FBbEIsQ0FBMEIsSUFBMUIsRUFBZ0MsRUFBaEMsQ0FBUDtBQUNELEdBdG1FZ0MsQ0F3bUVqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSxXQUFTNGEsZUFBVCxDQUEwQm1HLEtBQTFCLEVBQWlDO0FBQy9CO0FBQ0E7QUFDQSxRQUFJeFQsUUFBUSxJQUFJekksT0FBaEIsRUFBeUI7QUFDdkJzTCxZQUFNLENBQUM5TyxJQUFQLENBQVksZUFBWixFQUE2QmhILElBQUksQ0FBQ3ltQixLQUFELENBQWpDOztBQUVBLFVBQUksQ0FBQ3hULFFBQUQsSUFBYXVCLGFBQWEsQ0FBQ3BjLE1BQWQsR0FBdUIsQ0FBeEMsRUFBMkM7QUFDekMsYUFBSyxJQUFJRCxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHcWMsYUFBYSxDQUFDcGMsTUFBbEMsRUFBMENELENBQUMsRUFBM0MsRUFBK0M7QUFDN0MsY0FBSXVSLElBQUksR0FBRzhLLGFBQWEsQ0FBQ3JjLENBQUQsQ0FBeEIsQ0FENkMsQ0FFN0M7O0FBQ0F1UixjQUFJLENBQUNuRSxLQUFMLENBQVd1RyxJQUFYLEdBQWtCLEVBQWxCOztBQUVBLGNBQUkyRyxjQUFjLElBQUlGLGVBQXRCLEVBQXVDO0FBQ3JDN0ksZ0JBQUksQ0FBQ25FLEtBQUwsQ0FBV2tOLGNBQVgsSUFBNkIsRUFBN0I7QUFDQS9JLGdCQUFJLENBQUNuRSxLQUFMLENBQVdnTixlQUFYLElBQThCLEVBQTlCO0FBQ0Q7O0FBQ0R2RixzRkFBVyxDQUFDdEQsSUFBRCxFQUFPMEcsVUFBUCxDQUFYO0FBQ0FoTixnRkFBUSxDQUFDc0csSUFBRCxFQUFPMkcsYUFBUCxDQUFSO0FBQ0Q7QUFDRjtBQUVEO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ00sVUFBSSxDQUFDb1csS0FBRCxJQUNBLENBQUN4VCxRQUFELElBQWF3VCxLQUFLLENBQUNyZixNQUFOLENBQWFxSCxVQUFiLEtBQTRCelYsU0FEekMsSUFFQXl0QixLQUFLLENBQUNyZixNQUFOLEtBQWlCcE8sU0FBakIsSUFBOEJ3dEIsUUFBUSxDQUFDQyxLQUFLLENBQUNDLFlBQVAsQ0FBUixLQUFpQ0YsUUFBUSxDQUFDeFIsYUFBRCxDQUYzRSxFQUU0RjtBQUUxRixZQUFJLENBQUNELDBCQUFMLEVBQWlDO0FBQy9CLGNBQUl3TixRQUFRLEdBQUd0ZixLQUFmO0FBQ0EyZixxQkFBVzs7QUFDWCxjQUFJM2YsS0FBSyxLQUFLc2YsUUFBZCxFQUF3QjtBQUN0QnpNLGtCQUFNLENBQUM5TyxJQUFQLENBQVksY0FBWixFQUE0QmhILElBQUksRUFBaEM7QUFFQW9lLHNDQUEwQjtBQUMzQjtBQUNGOztBQUVELFlBQUl4TixNQUFNLEtBQUssT0FBZixFQUF3QjtBQUFFa0YsZ0JBQU0sQ0FBQzlPLElBQVAsQ0FBWSxhQUFaLEVBQTJCaEgsSUFBSSxFQUEvQjtBQUFxQzs7QUFDL0R3SyxlQUFPLEdBQUcsS0FBVjtBQUNBK0ssbUJBQVcsR0FBR3RTLEtBQWQ7QUFDRDtBQUNGO0FBRUYsR0FscUVnQyxDQW9xRWpDOzs7QUFDQSxXQUFTMGpCLElBQVQsQ0FBZUMsV0FBZixFQUE0QmpoQixDQUE1QixFQUErQjtBQUM3QixRQUFJd1EsTUFBSixFQUFZO0FBQUU7QUFBUyxLQURNLENBRzdCOzs7QUFDQSxRQUFJeVEsV0FBVyxLQUFLLE1BQXBCLEVBQTRCO0FBQzFCclEscUJBQWUsQ0FBQzVRLENBQUQsRUFBSSxDQUFDLENBQUwsQ0FBZixDQUQwQixDQUc1QjtBQUNDLEtBSkQsTUFJTyxJQUFJaWhCLFdBQVcsS0FBSyxNQUFwQixFQUE0QjtBQUNqQ3JRLHFCQUFlLENBQUM1USxDQUFELEVBQUksQ0FBSixDQUFmLENBRGlDLENBR25DO0FBQ0MsS0FKTSxNQUlBO0FBQ0wsVUFBSTZFLE9BQUosRUFBYTtBQUNYLFlBQUlxRyx3QkFBSixFQUE4QjtBQUFFO0FBQVMsU0FBekMsTUFBK0M7QUFBRXlQLHlCQUFlO0FBQUs7QUFDdEU7O0FBRUQsVUFBSXJGLFFBQVEsR0FBR0QsV0FBVyxFQUExQjtBQUFBLFVBQ0k2TCxRQUFRLEdBQUcsQ0FEZjs7QUFHQSxVQUFJRCxXQUFXLEtBQUssT0FBcEIsRUFBNkI7QUFDM0JDLGdCQUFRLEdBQUcsQ0FBRTVMLFFBQWI7QUFDRCxPQUZELE1BRU8sSUFBSTJMLFdBQVcsS0FBSyxNQUFwQixFQUE0QjtBQUNqQ0MsZ0JBQVEsR0FBRzVULFFBQVEsR0FBR1csVUFBVSxHQUFHMWEsS0FBYixHQUFxQitoQixRQUF4QixHQUFtQ3JILFVBQVUsR0FBRyxDQUFiLEdBQWlCcUgsUUFBdkU7QUFDRCxPQUZNLE1BRUE7QUFDTCxZQUFJLE9BQU8yTCxXQUFQLEtBQXVCLFFBQTNCLEVBQXFDO0FBQUVBLHFCQUFXLEdBQUc5SyxRQUFRLENBQUM4SyxXQUFELENBQXRCO0FBQXNDOztBQUU3RSxZQUFJLENBQUN0bEIsS0FBSyxDQUFDc2xCLFdBQUQsQ0FBVixFQUF5QjtBQUN2QjtBQUNBLGNBQUksQ0FBQ2poQixDQUFMLEVBQVE7QUFBRWloQix1QkFBVyxHQUFHbGUsSUFBSSxDQUFDMk0sR0FBTCxDQUFTLENBQVQsRUFBWTNNLElBQUksQ0FBQ3lCLEdBQUwsQ0FBU3lKLFVBQVUsR0FBRyxDQUF0QixFQUF5QmdULFdBQXpCLENBQVosQ0FBZDtBQUFtRTs7QUFFN0VDLGtCQUFRLEdBQUdELFdBQVcsR0FBRzNMLFFBQXpCO0FBQ0Q7QUFDRixPQXJCSSxDQXVCTDs7O0FBQ0EsVUFBSSxDQUFDaEksUUFBRCxJQUFhNFQsUUFBYixJQUF5Qm5lLElBQUksQ0FBQ0MsR0FBTCxDQUFTa2UsUUFBVCxJQUFxQjN0QixLQUFsRCxFQUF5RDtBQUN2RCxZQUFJNHRCLE1BQU0sR0FBR0QsUUFBUSxHQUFHLENBQVgsR0FBZSxDQUFmLEdBQW1CLENBQUMsQ0FBakM7QUFDQUEsZ0JBQVEsSUFBSzVqQixLQUFLLEdBQUc0akIsUUFBUixHQUFtQmpULFVBQXBCLElBQW1DOEIsUUFBbkMsR0FBOEM5QixVQUFVLEdBQUdrVCxNQUEzRCxHQUFvRWxULFVBQVUsR0FBRyxDQUFiLEdBQWlCa1QsTUFBakIsR0FBMEIsQ0FBQyxDQUEzRztBQUNEOztBQUVEN2pCLFdBQUssSUFBSTRqQixRQUFULENBN0JLLENBK0JMOztBQUNBLFVBQUk1VCxRQUFRLElBQUk3WixJQUFoQixFQUFzQjtBQUNwQixZQUFJNkosS0FBSyxHQUFHeVMsUUFBWixFQUFzQjtBQUFFelMsZUFBSyxJQUFJMlEsVUFBVDtBQUFzQjs7QUFDOUMsWUFBSTNRLEtBQUssR0FBRzBTLFFBQVosRUFBc0I7QUFBRTFTLGVBQUssSUFBSTJRLFVBQVQ7QUFBc0I7QUFDL0MsT0FuQ0ksQ0FxQ0w7OztBQUNBLFVBQUlvSCxXQUFXLENBQUMvWCxLQUFELENBQVgsS0FBdUIrWCxXQUFXLENBQUN6RixXQUFELENBQXRDLEVBQXFEO0FBQ25EK1EsY0FBTSxDQUFDM2dCLENBQUQsQ0FBTjtBQUNEO0FBRUY7QUFDRixHQTV0RWdDLENBOHRFakM7OztBQUNBLFdBQVM0USxlQUFULENBQTBCNVEsQ0FBMUIsRUFBNkI0VyxHQUE3QixFQUFrQztBQUNoQyxRQUFJL1IsT0FBSixFQUFhO0FBQ1gsVUFBSXFHLHdCQUFKLEVBQThCO0FBQUU7QUFBUyxPQUF6QyxNQUErQztBQUFFeVAsdUJBQWU7QUFBSztBQUN0RTs7QUFDRCxRQUFJeUcsZUFBSjs7QUFFQSxRQUFJLENBQUN4SyxHQUFMLEVBQVU7QUFDUjVXLE9BQUMsR0FBRzRiLFFBQVEsQ0FBQzViLENBQUQsQ0FBWjtBQUNBLFVBQUl5QixNQUFNLEdBQUdrZCxTQUFTLENBQUMzZSxDQUFELENBQXRCOztBQUVBLGFBQU95QixNQUFNLEtBQUsrSCxpQkFBWCxJQUFnQyxDQUFDQyxVQUFELEVBQWFDLFVBQWIsRUFBeUJyTCxPQUF6QixDQUFpQ29ELE1BQWpDLElBQTJDLENBQWxGLEVBQXFGO0FBQUVBLGNBQU0sR0FBR0EsTUFBTSxDQUFDcUgsVUFBaEI7QUFBNkI7O0FBRXBILFVBQUl1WSxRQUFRLEdBQUcsQ0FBQzVYLFVBQUQsRUFBYUMsVUFBYixFQUF5QnJMLE9BQXpCLENBQWlDb0QsTUFBakMsQ0FBZjs7QUFDQSxVQUFJNGYsUUFBUSxJQUFJLENBQWhCLEVBQW1CO0FBQ2pCRCx1QkFBZSxHQUFHLElBQWxCO0FBQ0F4SyxXQUFHLEdBQUd5SyxRQUFRLEtBQUssQ0FBYixHQUFpQixDQUFDLENBQWxCLEdBQXNCLENBQTVCO0FBQ0Q7QUFDRjs7QUFFRCxRQUFJelcsTUFBSixFQUFZO0FBQ1YsVUFBSXROLEtBQUssS0FBS3lTLFFBQVYsSUFBc0I2RyxHQUFHLEtBQUssQ0FBQyxDQUFuQyxFQUFzQztBQUNwQ29LLFlBQUksQ0FBQyxNQUFELEVBQVNoaEIsQ0FBVCxDQUFKO0FBQ0E7QUFDRCxPQUhELE1BR08sSUFBSTFDLEtBQUssS0FBSzBTLFFBQVYsSUFBc0I0RyxHQUFHLEtBQUssQ0FBbEMsRUFBcUM7QUFDMUNvSyxZQUFJLENBQUMsT0FBRCxFQUFVaGhCLENBQVYsQ0FBSjtBQUNBO0FBQ0Q7QUFDRjs7QUFFRCxRQUFJNFcsR0FBSixFQUFTO0FBQ1B0WixXQUFLLElBQUlnTSxPQUFPLEdBQUdzTixHQUFuQjs7QUFDQSxVQUFJeE4sU0FBSixFQUFlO0FBQUU5TCxhQUFLLEdBQUd5RixJQUFJLENBQUMyTCxLQUFMLENBQVdwUixLQUFYLENBQVI7QUFBNEIsT0FGdEMsQ0FHUDs7O0FBQ0FxakIsWUFBTSxDQUFFUyxlQUFlLElBQUtwaEIsQ0FBQyxJQUFJQSxDQUFDLENBQUNySixJQUFGLEtBQVcsU0FBckMsR0FBbURxSixDQUFuRCxHQUF1RCxJQUF4RCxDQUFOO0FBQ0Q7QUFDRixHQWx3RWdDLENBb3dFakM7OztBQUNBLFdBQVMrUSxVQUFULENBQXFCL1EsQ0FBckIsRUFBd0I7QUFDdEIsUUFBSTZFLE9BQUosRUFBYTtBQUNYLFVBQUlxRyx3QkFBSixFQUE4QjtBQUFFO0FBQVMsT0FBekMsTUFBK0M7QUFBRXlQLHVCQUFlO0FBQUs7QUFDdEU7O0FBRUQzYSxLQUFDLEdBQUc0YixRQUFRLENBQUM1YixDQUFELENBQVo7QUFDQSxRQUFJeUIsTUFBTSxHQUFHa2QsU0FBUyxDQUFDM2UsQ0FBRCxDQUF0QjtBQUFBLFFBQTJCc2hCLFFBQTNCLENBTnNCLENBUXRCOztBQUNBLFdBQU83ZixNQUFNLEtBQUttSSxZQUFYLElBQTJCLENBQUNwRyxvRUFBTyxDQUFDL0IsTUFBRCxFQUFTLFVBQVQsQ0FBMUMsRUFBZ0U7QUFBRUEsWUFBTSxHQUFHQSxNQUFNLENBQUNxSCxVQUFoQjtBQUE2Qjs7QUFDL0YsUUFBSXRGLG9FQUFPLENBQUMvQixNQUFELEVBQVMsVUFBVCxDQUFYLEVBQWlDO0FBQy9CLFVBQUk2ZixRQUFRLEdBQUdoTyxVQUFVLEdBQUczTyxNQUFNLENBQUM5QyxvRUFBTyxDQUFDSixNQUFELEVBQVMsVUFBVCxDQUFSLENBQWxDO0FBQUEsVUFDSThmLGVBQWUsR0FBR3BZLFVBQVUsSUFBSUMsU0FBZCxHQUEwQmtZLFFBQVEsR0FBR3JULFVBQVgsR0FBd0JrRixLQUFsRCxHQUEwRG1PLFFBQVEsR0FBRy90QixLQUQzRjtBQUFBLFVBRUkwdEIsV0FBVyxHQUFHcFgsZUFBZSxHQUFHeVgsUUFBSCxHQUFjdmUsSUFBSSxDQUFDeUIsR0FBTCxDQUFTekIsSUFBSSxDQUFDME0sSUFBTCxDQUFVOFIsZUFBVixDQUFULEVBQXFDdFQsVUFBVSxHQUFHLENBQWxELENBRi9DO0FBR0ErUyxVQUFJLENBQUNDLFdBQUQsRUFBY2poQixDQUFkLENBQUo7O0FBRUEsVUFBSXVULGVBQWUsS0FBSytOLFFBQXhCLEVBQWtDO0FBQ2hDLFlBQUl0TixTQUFKLEVBQWU7QUFBRXNKLHNCQUFZO0FBQUs7O0FBQ2xDaEssa0JBQVUsR0FBRyxDQUFDLENBQWQsQ0FGZ0MsQ0FFZjtBQUNsQjtBQUNGO0FBQ0YsR0ExeEVnQyxDQTR4RWpDOzs7QUFDQSxXQUFTa08sZ0JBQVQsR0FBNkI7QUFDM0J6TixpQkFBYSxHQUFHME4sV0FBVyxDQUFDLFlBQVk7QUFDdEM3USxxQkFBZSxDQUFDLElBQUQsRUFBTzFHLGlCQUFQLENBQWY7QUFDRCxLQUYwQixFQUV4QkQsZUFGd0IsQ0FBM0I7QUFJQStKLGFBQVMsR0FBRyxJQUFaO0FBQ0Q7O0FBRUQsV0FBUzBOLGlCQUFULEdBQThCO0FBQzVCckcsaUJBQWEsQ0FBQ3RILGFBQUQsQ0FBYjtBQUNBQyxhQUFTLEdBQUcsS0FBWjtBQUNEOztBQUVELFdBQVMyTixvQkFBVCxDQUErQkMsTUFBL0IsRUFBdUM1SCxHQUF2QyxFQUE0QztBQUMxQ3RTLDBFQUFRLENBQUMyQyxjQUFELEVBQWlCO0FBQUMscUJBQWV1WDtBQUFoQixLQUFqQixDQUFSO0FBQ0F2WCxrQkFBYyxDQUFDcEUsU0FBZixHQUEyQjZOLG1CQUFtQixDQUFDLENBQUQsQ0FBbkIsR0FBeUI4TixNQUF6QixHQUFrQzlOLG1CQUFtQixDQUFDLENBQUQsQ0FBckQsR0FBMkRrRyxHQUF0RjtBQUNEOztBQUVELFdBQVNFLGFBQVQsR0FBMEI7QUFDeEJzSCxvQkFBZ0I7O0FBQ2hCLFFBQUluWCxjQUFKLEVBQW9CO0FBQUVzWCwwQkFBb0IsQ0FBQyxNQUFELEVBQVN4WCxZQUFZLENBQUMsQ0FBRCxDQUFyQixDQUFwQjtBQUFnRDtBQUN2RTs7QUFFRCxXQUFTbVQsWUFBVCxHQUF5QjtBQUN2Qm9FLHFCQUFpQjs7QUFDakIsUUFBSXJYLGNBQUosRUFBb0I7QUFBRXNYLDBCQUFvQixDQUFDLE9BQUQsRUFBVXhYLFlBQVksQ0FBQyxDQUFELENBQXRCLENBQXBCO0FBQWlEO0FBQ3hFLEdBdnpFZ0MsQ0F5ekVqQzs7O0FBQ0EsV0FBUzBYLElBQVQsR0FBaUI7QUFDZixRQUFJOVgsUUFBUSxJQUFJLENBQUNpSyxTQUFqQixFQUE0QjtBQUMxQmtHLG1CQUFhO0FBQ2JoRyx3QkFBa0IsR0FBRyxLQUFyQjtBQUNEO0FBQ0Y7O0FBQ0QsV0FBUzROLEtBQVQsR0FBa0I7QUFDaEIsUUFBSTlOLFNBQUosRUFBZTtBQUNic0osa0JBQVk7QUFDWnBKLHdCQUFrQixHQUFHLElBQXJCO0FBQ0Q7QUFDRjs7QUFFRCxXQUFTK0YsY0FBVCxHQUEyQjtBQUN6QixRQUFJakcsU0FBSixFQUFlO0FBQ2JzSixrQkFBWTtBQUNacEosd0JBQWtCLEdBQUcsSUFBckI7QUFDRCxLQUhELE1BR087QUFDTGdHLG1CQUFhO0FBQ2JoRyx3QkFBa0IsR0FBRyxLQUFyQjtBQUNEO0FBQ0Y7O0FBRUQsV0FBUzdDLGtCQUFULEdBQStCO0FBQzdCLFFBQUluUyxHQUFHLENBQUM2aUIsTUFBUixFQUFnQjtBQUNkLFVBQUkvTixTQUFKLEVBQWU7QUFDYjBOLHlCQUFpQjtBQUNqQnZOLGdDQUF3QixHQUFHLElBQTNCO0FBQ0Q7QUFDRixLQUxELE1BS08sSUFBSUEsd0JBQUosRUFBOEI7QUFDbkNxTixzQkFBZ0I7QUFDaEJyTiw4QkFBd0IsR0FBRyxLQUEzQjtBQUNEO0FBQ0Y7O0FBRUQsV0FBU2pELGNBQVQsR0FBMkI7QUFDekIsUUFBSThDLFNBQUosRUFBZTtBQUNiME4sdUJBQWlCO0FBQ2pCek4seUJBQW1CLEdBQUcsSUFBdEI7QUFDRDtBQUNGOztBQUVELFdBQVM5QyxlQUFULEdBQTRCO0FBQzFCLFFBQUk4QyxtQkFBSixFQUF5QjtBQUN2QnVOLHNCQUFnQjtBQUNoQnZOLHlCQUFtQixHQUFHLEtBQXRCO0FBQ0Q7QUFDRixHQXoyRWdDLENBMjJFakM7OztBQUNBLFdBQVMxQyxpQkFBVCxDQUE0QnZSLENBQTVCLEVBQStCO0FBQzdCQSxLQUFDLEdBQUc0YixRQUFRLENBQUM1YixDQUFELENBQVo7QUFDQSxRQUFJZ2lCLFFBQVEsR0FBRyxDQUFDelcsSUFBSSxDQUFDRyxJQUFOLEVBQVlILElBQUksQ0FBQ0ksS0FBakIsRUFBd0J0TixPQUF4QixDQUFnQzJCLENBQUMsQ0FBQ2lpQixPQUFsQyxDQUFmOztBQUVBLFFBQUlELFFBQVEsSUFBSSxDQUFoQixFQUFtQjtBQUNqQnBSLHFCQUFlLENBQUM1USxDQUFELEVBQUlnaUIsUUFBUSxLQUFLLENBQWIsR0FBaUIsQ0FBQyxDQUFsQixHQUFzQixDQUExQixDQUFmO0FBQ0Q7QUFDRixHQW4zRWdDLENBcTNFakM7OztBQUNBLFdBQVNuUixpQkFBVCxDQUE0QjdRLENBQTVCLEVBQStCO0FBQzdCQSxLQUFDLEdBQUc0YixRQUFRLENBQUM1YixDQUFELENBQVo7QUFDQSxRQUFJZ2lCLFFBQVEsR0FBRyxDQUFDelcsSUFBSSxDQUFDRyxJQUFOLEVBQVlILElBQUksQ0FBQ0ksS0FBakIsRUFBd0J0TixPQUF4QixDQUFnQzJCLENBQUMsQ0FBQ2lpQixPQUFsQyxDQUFmOztBQUVBLFFBQUlELFFBQVEsSUFBSSxDQUFoQixFQUFtQjtBQUNqQixVQUFJQSxRQUFRLEtBQUssQ0FBakIsRUFBb0I7QUFDbEIsWUFBSSxDQUFDdlksVUFBVSxDQUFDOEcsUUFBaEIsRUFBMEI7QUFBRUsseUJBQWUsQ0FBQzVRLENBQUQsRUFBSSxDQUFDLENBQUwsQ0FBZjtBQUF5QjtBQUN0RCxPQUZELE1BRU8sSUFBSSxDQUFDMEosVUFBVSxDQUFDNkcsUUFBaEIsRUFBMEI7QUFDL0JLLHVCQUFlLENBQUM1USxDQUFELEVBQUksQ0FBSixDQUFmO0FBQ0Q7QUFDRjtBQUNGLEdBajRFZ0MsQ0FtNEVqQzs7O0FBQ0EsV0FBU2tpQixRQUFULENBQW1CdmtCLEVBQW5CLEVBQXVCO0FBQ3JCQSxNQUFFLENBQUN3a0IsS0FBSDtBQUNELEdBdDRFZ0MsQ0F3NEVqQzs7O0FBQ0EsV0FBU25SLFlBQVQsQ0FBdUJoUixDQUF2QixFQUEwQjtBQUN4QkEsS0FBQyxHQUFHNGIsUUFBUSxDQUFDNWIsQ0FBRCxDQUFaO0FBQ0EsUUFBSW9pQixVQUFVLEdBQUdsakIsR0FBRyxDQUFDbWpCLGFBQXJCOztBQUNBLFFBQUksQ0FBQzdlLG9FQUFPLENBQUM0ZSxVQUFELEVBQWEsVUFBYixDQUFaLEVBQXNDO0FBQUU7QUFBUyxLQUh6QixDQUt4Qjs7O0FBQ0EsUUFBSUosUUFBUSxHQUFHLENBQUN6VyxJQUFJLENBQUNHLElBQU4sRUFBWUgsSUFBSSxDQUFDSSxLQUFqQixFQUF3QkosSUFBSSxDQUFDQyxLQUE3QixFQUFvQ0QsSUFBSSxDQUFDRSxLQUF6QyxFQUFnRHBOLE9BQWhELENBQXdEMkIsQ0FBQyxDQUFDaWlCLE9BQTFELENBQWY7QUFBQSxRQUNJWCxRQUFRLEdBQUczYyxNQUFNLENBQUM5QyxvRUFBTyxDQUFDdWdCLFVBQUQsRUFBYSxVQUFiLENBQVIsQ0FEckI7O0FBR0EsUUFBSUosUUFBUSxJQUFJLENBQWhCLEVBQW1CO0FBQ2pCLFVBQUlBLFFBQVEsS0FBSyxDQUFqQixFQUFvQjtBQUNsQixZQUFJVixRQUFRLEdBQUcsQ0FBZixFQUFrQjtBQUFFWSxrQkFBUSxDQUFDaFAsUUFBUSxDQUFDb08sUUFBUSxHQUFHLENBQVosQ0FBVCxDQUFSO0FBQW1DO0FBQ3hELE9BRkQsTUFFTyxJQUFJVSxRQUFRLEtBQUssQ0FBakIsRUFBb0I7QUFDekIsWUFBSVYsUUFBUSxHQUFHbk8sS0FBSyxHQUFHLENBQXZCLEVBQTBCO0FBQUUrTyxrQkFBUSxDQUFDaFAsUUFBUSxDQUFDb08sUUFBUSxHQUFHLENBQVosQ0FBVCxDQUFSO0FBQW1DO0FBQ2hFLE9BRk0sTUFFQTtBQUNMaE8sa0JBQVUsR0FBR2dPLFFBQWI7QUFDQU4sWUFBSSxDQUFDTSxRQUFELEVBQVd0aEIsQ0FBWCxDQUFKO0FBQ0Q7QUFDRjtBQUNGOztBQUVELFdBQVM0YixRQUFULENBQW1CNWIsQ0FBbkIsRUFBc0I7QUFDcEJBLEtBQUMsR0FBR0EsQ0FBQyxJQUFJckIsR0FBRyxDQUFDbWlCLEtBQWI7QUFDQSxXQUFPd0IsWUFBWSxDQUFDdGlCLENBQUQsQ0FBWixHQUFrQkEsQ0FBQyxDQUFDdWlCLGNBQUYsQ0FBaUIsQ0FBakIsQ0FBbEIsR0FBd0N2aUIsQ0FBL0M7QUFDRDs7QUFDRCxXQUFTMmUsU0FBVCxDQUFvQjNlLENBQXBCLEVBQXVCO0FBQ3JCLFdBQU9BLENBQUMsQ0FBQ3lCLE1BQUYsSUFBWTlDLEdBQUcsQ0FBQ21pQixLQUFKLENBQVUwQixVQUE3QjtBQUNEOztBQUVELFdBQVNGLFlBQVQsQ0FBdUJ0aUIsQ0FBdkIsRUFBMEI7QUFDeEIsV0FBT0EsQ0FBQyxDQUFDckosSUFBRixDQUFPMEgsT0FBUCxDQUFlLE9BQWYsS0FBMkIsQ0FBbEM7QUFDRDs7QUFFRCxXQUFTb2tCLHNCQUFULENBQWlDemlCLENBQWpDLEVBQW9DO0FBQ2xDQSxLQUFDLENBQUMwaUIsY0FBRixHQUFtQjFpQixDQUFDLENBQUMwaUIsY0FBRixFQUFuQixHQUF3QzFpQixDQUFDLENBQUMyaUIsV0FBRixHQUFnQixLQUF4RDtBQUNEOztBQUVELFdBQVNDLHdCQUFULEdBQXFDO0FBQ25DLFdBQU9sZ0Isd0ZBQWlCLENBQUN1RixzRUFBUSxDQUFDb00sWUFBWSxDQUFDbk0sQ0FBYixHQUFpQmtNLFlBQVksQ0FBQ2xNLENBQS9CLEVBQWtDbU0sWUFBWSxDQUFDbE0sQ0FBYixHQUFpQmlNLFlBQVksQ0FBQ2pNLENBQWhFLENBQVQsRUFBNkU2QyxVQUE3RSxDQUFqQixLQUE4R2hDLE9BQU8sQ0FBQ0UsSUFBN0g7QUFDRDs7QUFFRCxXQUFTdUksVUFBVCxDQUFxQnpSLENBQXJCLEVBQXdCO0FBQ3RCLFFBQUk2RSxPQUFKLEVBQWE7QUFDWCxVQUFJcUcsd0JBQUosRUFBOEI7QUFBRTtBQUFTLE9BQXpDLE1BQStDO0FBQUV5UCx1QkFBZTtBQUFLO0FBQ3RFOztBQUVELFFBQUk1USxRQUFRLElBQUlpSyxTQUFoQixFQUEyQjtBQUFFME4sdUJBQWlCO0FBQUs7O0FBRW5Eak4sWUFBUSxHQUFHLElBQVg7O0FBQ0EsUUFBSUMsUUFBSixFQUFjO0FBQ1o5VixpRUFBRyxDQUFDOFYsUUFBRCxDQUFIO0FBQ0FBLGNBQVEsR0FBRyxJQUFYO0FBQ0Q7O0FBRUQsUUFBSW1PLENBQUMsR0FBR2pILFFBQVEsQ0FBQzViLENBQUQsQ0FBaEI7QUFDQW1RLFVBQU0sQ0FBQzlPLElBQVAsQ0FBWWloQixZQUFZLENBQUN0aUIsQ0FBRCxDQUFaLEdBQWtCLFlBQWxCLEdBQWlDLFdBQTdDLEVBQTBEM0YsSUFBSSxDQUFDMkYsQ0FBRCxDQUE5RDs7QUFFQSxRQUFJLENBQUNzaUIsWUFBWSxDQUFDdGlCLENBQUQsQ0FBYixJQUFvQixDQUFDLEtBQUQsRUFBUSxHQUFSLEVBQWEzQixPQUFiLENBQXFCcWhCLG9CQUFvQixDQUFDZixTQUFTLENBQUMzZSxDQUFELENBQVYsQ0FBekMsS0FBNEQsQ0FBcEYsRUFBdUY7QUFDckZ5aUIsNEJBQXNCLENBQUN6aUIsQ0FBRCxDQUF0QjtBQUNEOztBQUVEcVUsZ0JBQVksQ0FBQ2xNLENBQWIsR0FBaUJpTSxZQUFZLENBQUNqTSxDQUFiLEdBQWlCMGEsQ0FBQyxDQUFDQyxPQUFwQztBQUNBek8sZ0JBQVksQ0FBQ25NLENBQWIsR0FBaUJrTSxZQUFZLENBQUNsTSxDQUFiLEdBQWlCMmEsQ0FBQyxDQUFDRSxPQUFwQzs7QUFDQSxRQUFJelYsUUFBSixFQUFjO0FBQ1pnSCxtQkFBYSxHQUFHZ0ssVUFBVSxDQUFDanJCLFNBQVMsQ0FBQ3VNLEtBQVYsQ0FBZ0J5UCxhQUFoQixFQUErQnRQLE9BQS9CLENBQXVDdVAsZUFBdkMsRUFBd0QsRUFBeEQsQ0FBRCxDQUExQjtBQUNBMlEsbUJBQWEsQ0FBQzVzQixTQUFELEVBQVksSUFBWixDQUFiO0FBQ0Q7QUFDRjs7QUFFRCxXQUFTcWUsU0FBVCxDQUFvQjFSLENBQXBCLEVBQXVCO0FBQ3JCLFFBQUl5VSxRQUFKLEVBQWM7QUFDWixVQUFJb08sQ0FBQyxHQUFHakgsUUFBUSxDQUFDNWIsQ0FBRCxDQUFoQjtBQUNBcVUsa0JBQVksQ0FBQ2xNLENBQWIsR0FBaUIwYSxDQUFDLENBQUNDLE9BQW5CO0FBQ0F6TyxrQkFBWSxDQUFDbk0sQ0FBYixHQUFpQjJhLENBQUMsQ0FBQ0UsT0FBbkI7O0FBRUEsVUFBSXpWLFFBQUosRUFBYztBQUNaLFlBQUksQ0FBQ29ILFFBQUwsRUFBZTtBQUFFQSxrQkFBUSxHQUFHck8sMkRBQUcsQ0FBQyxZQUFVO0FBQUUyYyxxQkFBUyxDQUFDaGpCLENBQUQsQ0FBVDtBQUFlLFdBQTVCLENBQWQ7QUFBOEM7QUFDaEUsT0FGRCxNQUVPO0FBQ0wsWUFBSWtRLHFCQUFxQixLQUFLLEdBQTlCLEVBQW1DO0FBQUVBLCtCQUFxQixHQUFHMFMsd0JBQXdCLEVBQWhEO0FBQXFEOztBQUMxRixZQUFJMVMscUJBQUosRUFBMkI7QUFBRXlDLHVCQUFhLEdBQUcsSUFBaEI7QUFBdUI7QUFDckQ7O0FBRUQsVUFBSSxDQUFDLE9BQU8zUyxDQUFDLENBQUNpakIsVUFBVCxLQUF3QixTQUF4QixJQUFxQ2pqQixDQUFDLENBQUNpakIsVUFBeEMsS0FBdUR0USxhQUEzRCxFQUEwRTtBQUN4RTNTLFNBQUMsQ0FBQzBpQixjQUFGO0FBQ0Q7QUFDRjtBQUNGOztBQUVELFdBQVNNLFNBQVQsQ0FBb0JoakIsQ0FBcEIsRUFBdUI7QUFDckIsUUFBSSxDQUFDa1EscUJBQUwsRUFBNEI7QUFDMUJ1RSxjQUFRLEdBQUcsS0FBWDtBQUNBO0FBQ0Q7O0FBQ0Q3ViwrREFBRyxDQUFDOFYsUUFBRCxDQUFIOztBQUNBLFFBQUlELFFBQUosRUFBYztBQUFFQyxjQUFRLEdBQUdyTywyREFBRyxDQUFDLFlBQVU7QUFBRTJjLGlCQUFTLENBQUNoakIsQ0FBRCxDQUFUO0FBQWUsT0FBNUIsQ0FBZDtBQUE4Qzs7QUFFOUQsUUFBSWtRLHFCQUFxQixLQUFLLEdBQTlCLEVBQW1DO0FBQUVBLDJCQUFxQixHQUFHMFMsd0JBQXdCLEVBQWhEO0FBQXFEOztBQUMxRixRQUFJMVMscUJBQUosRUFBMkI7QUFDekIsVUFBSSxDQUFDeUMsYUFBRCxJQUFrQjJQLFlBQVksQ0FBQ3RpQixDQUFELENBQWxDLEVBQXVDO0FBQUUyUyxxQkFBYSxHQUFHLElBQWhCO0FBQXVCOztBQUVoRSxVQUFJO0FBQ0YsWUFBSTNTLENBQUMsQ0FBQ3JKLElBQU4sRUFBWTtBQUFFd1osZ0JBQU0sQ0FBQzlPLElBQVAsQ0FBWWloQixZQUFZLENBQUN0aUIsQ0FBRCxDQUFaLEdBQWtCLFdBQWxCLEdBQWdDLFVBQTVDLEVBQXdEM0YsSUFBSSxDQUFDMkYsQ0FBRCxDQUE1RDtBQUFtRTtBQUNsRixPQUZELENBRUUsT0FBTXRLLEdBQU4sRUFBVyxDQUFFOztBQUVmLFVBQUl5UyxDQUFDLEdBQUdtTSxhQUFSO0FBQUEsVUFDSTRPLElBQUksR0FBR3ZPLE9BQU8sQ0FBQ04sWUFBRCxFQUFlRCxZQUFmLENBRGxCOztBQUVBLFVBQUksQ0FBQzNHLFVBQUQsSUFBZXRFLFVBQWYsSUFBNkJDLFNBQWpDLEVBQTRDO0FBQzFDakIsU0FBQyxJQUFJK2EsSUFBTDtBQUNBL2EsU0FBQyxJQUFJLElBQUw7QUFDRCxPQUhELE1BR087QUFDTCxZQUFJZ2IsV0FBVyxHQUFHMVcsU0FBUyxHQUFHeVcsSUFBSSxHQUFHM3ZCLEtBQVAsR0FBZSxHQUFmLElBQXNCLENBQUNpYixRQUFRLEdBQUdoYixNQUFaLElBQXNCd2IsYUFBNUMsQ0FBSCxHQUErRGtVLElBQUksR0FBRyxHQUFQLElBQWMxVSxRQUFRLEdBQUdoYixNQUF6QixDQUExRjtBQUNBMlUsU0FBQyxJQUFJZ2IsV0FBTDtBQUNBaGIsU0FBQyxJQUFJLEdBQUw7QUFDRDs7QUFFRDlVLGVBQVMsQ0FBQ3VNLEtBQVYsQ0FBZ0J5UCxhQUFoQixJQUFpQ0MsZUFBZSxHQUFHbkgsQ0FBbEIsR0FBc0JvSCxnQkFBdkQ7QUFDRDtBQUNGOztBQUVELFdBQVNvQyxRQUFULENBQW1CM1IsQ0FBbkIsRUFBc0I7QUFDcEIsUUFBSXlVLFFBQUosRUFBYztBQUNaLFVBQUlDLFFBQUosRUFBYztBQUNaOVYsbUVBQUcsQ0FBQzhWLFFBQUQsQ0FBSDtBQUNBQSxnQkFBUSxHQUFHLElBQVg7QUFDRDs7QUFDRCxVQUFJcEgsUUFBSixFQUFjO0FBQUUyUyxxQkFBYSxDQUFDNXNCLFNBQUQsRUFBWSxFQUFaLENBQWI7QUFBK0I7O0FBQy9Db2hCLGNBQVEsR0FBRyxLQUFYO0FBRUEsVUFBSW9PLENBQUMsR0FBR2pILFFBQVEsQ0FBQzViLENBQUQsQ0FBaEI7QUFDQXFVLGtCQUFZLENBQUNsTSxDQUFiLEdBQWlCMGEsQ0FBQyxDQUFDQyxPQUFuQjtBQUNBek8sa0JBQVksQ0FBQ25NLENBQWIsR0FBaUIyYSxDQUFDLENBQUNFLE9BQW5CO0FBQ0EsVUFBSUcsSUFBSSxHQUFHdk8sT0FBTyxDQUFDTixZQUFELEVBQWVELFlBQWYsQ0FBbEI7O0FBRUEsVUFBSXJSLElBQUksQ0FBQ0MsR0FBTCxDQUFTa2dCLElBQVQsQ0FBSixFQUFvQjtBQUNsQjtBQUNBLFlBQUksQ0FBQ1osWUFBWSxDQUFDdGlCLENBQUQsQ0FBakIsRUFBc0I7QUFDcEI7QUFDQSxjQUFJeUIsTUFBTSxHQUFHa2QsU0FBUyxDQUFDM2UsQ0FBRCxDQUF0QjtBQUNBL0Isa0ZBQVMsQ0FBQ3dELE1BQUQsRUFBUztBQUFDLHFCQUFTLFNBQVMyaEIsWUFBVCxDQUF1QnBqQixDQUF2QixFQUEwQjtBQUNwRHlpQixvQ0FBc0IsQ0FBQ3ppQixDQUFELENBQXRCO0FBQ0FzSCw0RkFBWSxDQUFDN0YsTUFBRCxFQUFTO0FBQUMseUJBQVMyaEI7QUFBVixlQUFULENBQVo7QUFDRDtBQUhpQixXQUFULENBQVQ7QUFJRDs7QUFFRCxZQUFJOVYsUUFBSixFQUFjO0FBQ1pvSCxrQkFBUSxHQUFHck8sMkRBQUcsQ0FBQyxZQUFXO0FBQ3hCLGdCQUFJb0gsVUFBVSxJQUFJLENBQUNyRSxTQUFuQixFQUE4QjtBQUM1QixrQkFBSWlhLFVBQVUsR0FBRyxDQUFFSCxJQUFGLEdBQVMzdkIsS0FBVCxJQUFrQmliLFFBQVEsR0FBR2hiLE1BQTdCLENBQWpCO0FBQ0E2dkIsd0JBQVUsR0FBR0gsSUFBSSxHQUFHLENBQVAsR0FBV25nQixJQUFJLENBQUMyTCxLQUFMLENBQVcyVSxVQUFYLENBQVgsR0FBb0N0Z0IsSUFBSSxDQUFDME0sSUFBTCxDQUFVNFQsVUFBVixDQUFqRDtBQUNBL2xCLG1CQUFLLElBQUkrbEIsVUFBVDtBQUNELGFBSkQsTUFJTztBQUNMLGtCQUFJQyxLQUFLLEdBQUcsRUFBR2hQLGFBQWEsR0FBRzRPLElBQW5CLENBQVo7O0FBQ0Esa0JBQUlJLEtBQUssSUFBSSxDQUFiLEVBQWdCO0FBQ2RobUIscUJBQUssR0FBR3lTLFFBQVI7QUFDRCxlQUZELE1BRU8sSUFBSXVULEtBQUssSUFBSTFVLGNBQWMsQ0FBQ0ksYUFBYSxHQUFHLENBQWpCLENBQTNCLEVBQWdEO0FBQ3JEMVIscUJBQUssR0FBRzBTLFFBQVI7QUFDRCxlQUZNLE1BRUE7QUFDTCxvQkFBSXhkLENBQUMsR0FBRyxDQUFSOztBQUNBLHVCQUFPQSxDQUFDLEdBQUd3YyxhQUFKLElBQXFCc1UsS0FBSyxJQUFJMVUsY0FBYyxDQUFDcGMsQ0FBRCxDQUFuRCxFQUF3RDtBQUN0RDhLLHVCQUFLLEdBQUc5SyxDQUFSOztBQUNBLHNCQUFJOHdCLEtBQUssR0FBRzFVLGNBQWMsQ0FBQ3BjLENBQUQsQ0FBdEIsSUFBNkIwd0IsSUFBSSxHQUFHLENBQXhDLEVBQTJDO0FBQUU1bEIseUJBQUssSUFBSSxDQUFUO0FBQWE7O0FBQzFEOUssbUJBQUM7QUFDRjtBQUNGO0FBQ0Y7O0FBRURtdUIsa0JBQU0sQ0FBQzNnQixDQUFELEVBQUlrakIsSUFBSixDQUFOO0FBQ0EvUyxrQkFBTSxDQUFDOU8sSUFBUCxDQUFZaWhCLFlBQVksQ0FBQ3RpQixDQUFELENBQVosR0FBa0IsVUFBbEIsR0FBK0IsU0FBM0MsRUFBc0QzRixJQUFJLENBQUMyRixDQUFELENBQTFEO0FBQ0QsV0F2QmEsQ0FBZDtBQXdCRCxTQXpCRCxNQXlCTztBQUNMLGNBQUlrUSxxQkFBSixFQUEyQjtBQUN6QlUsMkJBQWUsQ0FBQzVRLENBQUQsRUFBSWtqQixJQUFJLEdBQUcsQ0FBUCxHQUFXLENBQUMsQ0FBWixHQUFnQixDQUFwQixDQUFmO0FBQ0Q7QUFDRjtBQUNGO0FBQ0YsS0F4RG1CLENBMERwQjs7O0FBQ0EsUUFBSWxhLE9BQU8sQ0FBQ21DLG9CQUFSLEtBQWlDLE1BQXJDLEVBQTZDO0FBQUV3SCxtQkFBYSxHQUFHLEtBQWhCO0FBQXdCOztBQUN2RSxRQUFJM0gsVUFBSixFQUFnQjtBQUFFa0YsMkJBQXFCLEdBQUcsR0FBeEI7QUFBOEI7O0FBQ2hELFFBQUluRyxRQUFRLElBQUksQ0FBQ2lLLFNBQWpCLEVBQTRCO0FBQUV3TixzQkFBZ0I7QUFBSztBQUNwRCxHQTlqRmdDLENBZ2tGakM7QUFDQTs7O0FBQ0EsV0FBU3pJLDBCQUFULEdBQXVDO0FBQ3JDLFFBQUlyQixFQUFFLEdBQUc5SixhQUFhLEdBQUdBLGFBQUgsR0FBbUJELFlBQXpDO0FBQ0ErSixNQUFFLENBQUM5WCxLQUFILENBQVMyZCxNQUFULEdBQWtCM08sY0FBYyxDQUFDdFIsS0FBSyxHQUFHL0osS0FBVCxDQUFkLEdBQWdDcWIsY0FBYyxDQUFDdFIsS0FBRCxDQUE5QyxHQUF3RCxJQUExRTtBQUNEOztBQUVELFdBQVM4VixRQUFULEdBQXFCO0FBQ25CLFFBQUltUSxLQUFLLEdBQUdwYSxVQUFVLEdBQUcsQ0FBQ0EsVUFBVSxHQUFHM1YsTUFBZCxJQUF3QnlhLFVBQXhCLEdBQXFDTyxRQUF4QyxHQUFtRFAsVUFBVSxHQUFHMWEsS0FBdEY7QUFDQSxXQUFPd1AsSUFBSSxDQUFDeUIsR0FBTCxDQUFTekIsSUFBSSxDQUFDME0sSUFBTCxDQUFVOFQsS0FBVixDQUFULEVBQTJCdFYsVUFBM0IsQ0FBUDtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0UsV0FBU3FNLG1CQUFULEdBQWdDO0FBQzlCLFFBQUksQ0FBQzNRLEdBQUQsSUFBUUUsZUFBWixFQUE2QjtBQUFFO0FBQVM7O0FBRXhDLFFBQUlzSixLQUFLLEtBQUtFLFdBQWQsRUFBMkI7QUFDekIsVUFBSTdPLEdBQUcsR0FBRzZPLFdBQVY7QUFBQSxVQUNJM0QsR0FBRyxHQUFHeUQsS0FEVjtBQUFBLFVBRUkxYyxFQUFFLEdBQUd1UixvRUFGVDs7QUFJQSxVQUFJcUwsV0FBVyxHQUFHRixLQUFsQixFQUF5QjtBQUN2QjNPLFdBQUcsR0FBRzJPLEtBQU47QUFDQXpELFdBQUcsR0FBRzJELFdBQU47QUFDQTVjLFVBQUUsR0FBR2tOLG9FQUFMO0FBQ0Q7O0FBRUQsYUFBT2EsR0FBRyxHQUFHa0wsR0FBYixFQUFrQjtBQUNoQmpaLFVBQUUsQ0FBQ3ljLFFBQVEsQ0FBQzFPLEdBQUQsQ0FBVCxDQUFGO0FBQ0FBLFdBQUc7QUFDSixPQWR3QixDQWdCekI7OztBQUNBNk8saUJBQVcsR0FBR0YsS0FBZDtBQUNEO0FBQ0Y7O0FBRUQsV0FBUzlZLElBQVQsQ0FBZTJGLENBQWYsRUFBa0I7QUFDaEIsV0FBTztBQUNMM00sZUFBUyxFQUFFQSxTQUROO0FBRUwyYSxnQkFBVSxFQUFFQSxVQUZQO0FBR0xwRSxrQkFBWSxFQUFFQSxZQUhUO0FBSUxzSixjQUFRLEVBQUVBLFFBSkw7QUFLTDFKLHVCQUFpQixFQUFFQSxpQkFMZDtBQU1McUksaUJBQVcsRUFBRUEsV0FOUjtBQU9McEksZ0JBQVUsRUFBRUEsVUFQUDtBQVFMQyxnQkFBVSxFQUFFQSxVQVJQO0FBU0xuVyxXQUFLLEVBQUVBLEtBVEY7QUFVTCtWLGFBQU8sRUFBRUEsT0FWSjtBQVdMd0YsZ0JBQVUsRUFBRUEsVUFYUDtBQVlMYixnQkFBVSxFQUFFQSxVQVpQO0FBYUxlLG1CQUFhLEVBQUVBLGFBYlY7QUFjTDFSLFdBQUssRUFBRUEsS0FkRjtBQWVMc1MsaUJBQVcsRUFBRUEsV0FmUjtBQWdCTEMsa0JBQVksRUFBRUMsZUFBZSxFQWhCeEI7QUFpQkx5RCxxQkFBZSxFQUFFQSxlQWpCWjtBQWtCTEUsMkJBQXFCLEVBQUVBLHFCQWxCbEI7QUFtQkxOLFdBQUssRUFBRUEsS0FuQkY7QUFvQkxFLGlCQUFXLEVBQUVBLFdBcEJSO0FBcUJMbFcsV0FBSyxFQUFFQSxLQXJCRjtBQXNCTGtSLFVBQUksRUFBRUEsSUF0QkQ7QUF1Qkx5UyxXQUFLLEVBQUU5Z0IsQ0FBQyxJQUFJO0FBdkJQLEtBQVA7QUF5QkQ7O0FBRUQsU0FBTztBQUNMd2pCLFdBQU8sRUFBRSxPQURKO0FBRUxDLFdBQU8sRUFBRXBwQixJQUZKO0FBR0w4VixVQUFNLEVBQUVBLE1BSEg7QUFJTDZRLFFBQUksRUFBRUEsSUFKRDtBQUtMYSxRQUFJLEVBQUVBLElBTEQ7QUFNTEMsU0FBSyxFQUFFQSxLQU5GO0FBT0x6VCxRQUFJLEVBQUVBLElBUEQ7QUFRTHFWLHNCQUFrQixFQUFFM0Usd0JBUmY7QUFTTDRFLFdBQU8sRUFBRTFPLG1CQVRKO0FBVUxrRyxXQUFPLEVBQUVBLE9BVko7QUFXTHlJLFdBQU8sRUFBRSxtQkFBVztBQUNsQixhQUFPM3hCLEdBQUcsQ0FBQ3NQLGlFQUFNLENBQUN5SCxPQUFELEVBQVVvRSxlQUFWLENBQVAsQ0FBVjtBQUNEO0FBYkksR0FBUDtBQWVELENBcHBGTSxDOzs7Ozs7Ozs7OztBQ3pEUHRRLE1BQU0sQ0FBQzNJLE9BQVAsR0FBaUIsVUFBUzJJLE1BQVQsRUFBaUI7QUFDakMsTUFBSSxDQUFDQSxNQUFNLENBQUMrbUIsZUFBWixFQUE2QjtBQUM1Qi9tQixVQUFNLENBQUNnbkIsU0FBUCxHQUFtQixZQUFXLENBQUUsQ0FBaEM7O0FBQ0FobkIsVUFBTSxDQUFDaW5CLEtBQVAsR0FBZSxFQUFmLENBRjRCLENBRzVCOztBQUNBLFFBQUksQ0FBQ2puQixNQUFNLENBQUNzSixRQUFaLEVBQXNCdEosTUFBTSxDQUFDc0osUUFBUCxHQUFrQixFQUFsQjtBQUN0Qi9SLFVBQU0sQ0FBQ2lCLGNBQVAsQ0FBc0J3SCxNQUF0QixFQUE4QixRQUE5QixFQUF3QztBQUN2Q3ZILGdCQUFVLEVBQUUsSUFEMkI7QUFFdkNrUSxTQUFHLEVBQUUsZUFBVztBQUNmLGVBQU8zSSxNQUFNLENBQUM0QixDQUFkO0FBQ0E7QUFKc0MsS0FBeEM7QUFNQXJLLFVBQU0sQ0FBQ2lCLGNBQVAsQ0FBc0J3SCxNQUF0QixFQUE4QixJQUE5QixFQUFvQztBQUNuQ3ZILGdCQUFVLEVBQUUsSUFEdUI7QUFFbkNrUSxTQUFHLEVBQUUsZUFBVztBQUNmLGVBQU8zSSxNQUFNLENBQUN0SyxDQUFkO0FBQ0E7QUFKa0MsS0FBcEM7QUFNQXNLLFVBQU0sQ0FBQyttQixlQUFQLEdBQXlCLENBQXpCO0FBQ0E7O0FBQ0QsU0FBTy9tQixNQUFQO0FBQ0EsQ0FyQkQsQyIsImZpbGUiOiJyNC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vUjQvRmlsZXMvVGVtcGxhdGVzL0Rlc2lnbnMvUjQvQXNzZXRzL19zcmMvanMvcjQuanNcIik7XG4iLCIvLyBpbXBvcnQgYm9vdHN0cmFwIGZyb20gJ2Jvb3RzdHJhcCc7XHJcbmltcG9ydCB7IHRucyB9IGZyb20gJ3Rpbnktc2xpZGVyL3NyYy90aW55LXNsaWRlcic7XHJcbmltcG9ydCBcInJlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZVwiO1xyXG5cclxud2luZG93LnRucyA9IHRucztcclxud2luZG93LkluaXRTbGlkZXJzID0gSW5pdFNsaWRlcnM7XHJcblxyXG5mdW5jdGlvbiBJbml0U2xpZGVycygpIHtcclxuICAgIGNvbnNvbGUubG9nKCdTbGlkZXJzIFJlYWR5Jyk7XHJcbiAgICBsZXQgc2xpZGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1zbGlkZXInKTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlcnMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICB2YXIgc2xpZGVyQ29udGFpbmVyID0gc2xpZGVyc1tpXTtcclxuICAgICAgICB2YXIgY2xvc2VzdENvbHVtbiA9IHNsaWRlckNvbnRhaW5lci5jbG9zZXN0KFwiW2NsYXNzXj0nY29sLSddXCIpO1xyXG4gICAgICAgIHZhciBjb2xNZENsYXNzSW5kZXggPSBjbG9zZXN0Q29sdW1uLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpLnNlYXJjaChcImNvbC1tZC1cIikgKyA3O1xyXG4gICAgICAgIHZhciBwYXJlbnRDb2x1bW5TaXplID0gY2xvc2VzdENvbHVtbi5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKS5jaGFyQXQoY29sTWRDbGFzc0luZGV4KSArIGNsb3Nlc3RDb2x1bW4uZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikuY2hhckF0KGNvbE1kQ2xhc3NJbmRleCArIDEpO1xyXG4gICAgICAgIHZhciBlZGdlUGFkZGluZyA9IDUwO1xyXG5cclxuICAgICAgICB2YXIgaXRlbXNJblNsaWRlciA9IDU7XHJcblxyXG4gICAgICAgIGlmIChwYXJlbnRDb2x1bW5TaXplID09IDEyKSB7XHJcbiAgICAgICAgICAgIGl0ZW1zSW5TbGlkZXIgPSA1O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGFyZW50Q29sdW1uU2l6ZSA9PSAxMCB8fCBwYXJlbnRDb2x1bW5TaXplID09IDkgfHwgcGFyZW50Q29sdW1uU2l6ZSA9PSA4KSB7XHJcbiAgICAgICAgICAgIGl0ZW1zSW5TbGlkZXIgPSA0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGFyZW50Q29sdW1uU2l6ZSA9PSA2KSB7XHJcbiAgICAgICAgICAgIGl0ZW1zSW5TbGlkZXIgPSAyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGFyZW50Q29sdW1uU2l6ZSA9PSA0KSB7XHJcbiAgICAgICAgICAgIGl0ZW1zSW5TbGlkZXIgPSAxO1xyXG4gICAgICAgICAgICBlZGdlUGFkZGluZyA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwYXJlbnRDb2x1bW5TaXplID09IDMgfHwgcGFyZW50Q29sdW1uU2l6ZSA9PSAyIHx8IHBhcmVudENvbHVtblNpemUgPT0gMSkge1xyXG4gICAgICAgICAgICBpdGVtc0luU2xpZGVyID0gMTtcclxuICAgICAgICAgICAgZWRnZVBhZGRpbmcgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHNsaWRlciA9IHRucyh7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lcjogc2xpZGVyQ29udGFpbmVyLFxyXG4gICAgICAgICAgICBjZW50ZXI6IGZhbHNlLFxyXG4gICAgICAgICAgICBpdGVtczogMSxcclxuICAgICAgICAgICAgZ3V0dGVyOiAxNixcclxuICAgICAgICAgICAgbG9vcDogdHJ1ZSxcclxuICAgICAgICAgICAgYXJyb3dLZXlzOiB0cnVlLFxyXG4gICAgICAgICAgICBsYXp5bG9hZDogdHJ1ZSxcclxuICAgICAgICAgICAgZWRnZVBhZGRpbmc6IGVkZ2VQYWRkaW5nLFxyXG4gICAgICAgICAgICByZXNwb25zaXZlOiB7XHJcbiAgICAgICAgICAgICAgICA5OTI6IHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtczogaXRlbXNJblNsaWRlclxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBtb3VzZURyYWc6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbnRyb2xzOiB0cnVlLFxyXG4gICAgICAgICAgICBjb250cm9sc1RleHQ6IFsnPGRpdiBjbGFzcz1cInRucy1jb250cm9scy1pY29uXCIgc3R5bGU9XCJoZWlnaHQ6M2VtOyB3aWR0aDogM2VtO1wiPjxzdmcgd2lkdGg9XCIxLjVlbVwiIGhlaWdodD1cIjEuNWVtXCIgdmlld0JveD1cIjAgMCAxNiAxNlwiIGNsYXNzPVwiYmkgYmktYXJyb3ctbGVmdFwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+PHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNMTUgOGEuNS41IDAgMCAwLS41LS41SDIuNzA3bDMuMTQ3LTMuMTQ2YS41LjUgMCAxIDAtLjcwOC0uNzA4bC00IDRhLjUuNSAwIDAgMCAwIC43MDhsNCA0YS41LjUgMCAwIDAgLjcwOC0uNzA4TDIuNzA3IDguNUgxNC41QS41LjUgMCAwIDAgMTUgOHpcIi8+PC9zdmc+PC9kaXY+JyxcclxuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwidG5zLWNvbnRyb2xzLWljb25cIiBzdHlsZT1cImhlaWdodDozZW07IHdpZHRoOiAzZW07XCI+PHN2ZyB3aWR0aD1cIjEuNWVtXCIgaGVpZ2h0PVwiMS41ZW1cIiB2aWV3Qm94PVwiMCAwIDE2IDE2XCIgY2xhc3M9XCJiaSBiaS1hcnJvdy1yaWdodFwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+PHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNMSA4YS41LjUgMCAwIDEgLjUtLjVoMTEuNzkzbC0zLjE0Ny0zLjE0NmEuNS41IDAgMCAxIC43MDgtLjcwOGw0IDRhLjUuNSAwIDAgMSAwIC43MDhsLTQgNGEuNS41IDAgMCAxLS43MDgtLjcwOEwxMy4yOTMgOC41SDEuNUEuNS41IDAgMCAxIDEgOHpcIi8+PC9zdmc+PC9kaXY+J10sXHJcbiAgICAgICAgICAgIG5hdlBvc2l0aW9uOiAnYm90dG9tJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBJbml0U2xpZGVycygpO1xyXG59KTsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbnZhciBydW50aW1lID0gKGZ1bmN0aW9uIChleHBvcnRzKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBPcCA9IE9iamVjdC5wcm90b3R5cGU7XG4gIHZhciBoYXNPd24gPSBPcC5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIHVuZGVmaW5lZDsgLy8gTW9yZSBjb21wcmVzc2libGUgdGhhbiB2b2lkIDAuXG4gIHZhciAkU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sIDoge307XG4gIHZhciBpdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCI7XG4gIHZhciBhc3luY0l0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5hc3luY0l0ZXJhdG9yIHx8IFwiQEBhc3luY0l0ZXJhdG9yXCI7XG4gIHZhciB0b1N0cmluZ1RhZ1N5bWJvbCA9ICRTeW1ib2wudG9TdHJpbmdUYWcgfHwgXCJAQHRvU3RyaW5nVGFnXCI7XG5cbiAgZnVuY3Rpb24gZGVmaW5lKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIG9ialtrZXldO1xuICB9XG4gIHRyeSB7XG4gICAgLy8gSUUgOCBoYXMgYSBicm9rZW4gT2JqZWN0LmRlZmluZVByb3BlcnR5IHRoYXQgb25seSB3b3JrcyBvbiBET00gb2JqZWN0cy5cbiAgICBkZWZpbmUoe30sIFwiXCIpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBkZWZpbmUgPSBmdW5jdGlvbihvYmosIGtleSwgdmFsdWUpIHtcbiAgICAgIHJldHVybiBvYmpba2V5XSA9IHZhbHVlO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gSWYgb3V0ZXJGbiBwcm92aWRlZCBhbmQgb3V0ZXJGbi5wcm90b3R5cGUgaXMgYSBHZW5lcmF0b3IsIHRoZW4gb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IuXG4gICAgdmFyIHByb3RvR2VuZXJhdG9yID0gb3V0ZXJGbiAmJiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvciA/IG91dGVyRm4gOiBHZW5lcmF0b3I7XG4gICAgdmFyIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUocHJvdG9HZW5lcmF0b3IucHJvdG90eXBlKTtcbiAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTtcblxuICAgIC8vIFRoZSAuX2ludm9rZSBtZXRob2QgdW5pZmllcyB0aGUgaW1wbGVtZW50YXRpb25zIG9mIHRoZSAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMuXG4gICAgZ2VuZXJhdG9yLl9pbnZva2UgPSBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuXG4gICAgcmV0dXJuIGdlbmVyYXRvcjtcbiAgfVxuICBleHBvcnRzLndyYXAgPSB3cmFwO1xuXG4gIC8vIFRyeS9jYXRjaCBoZWxwZXIgdG8gbWluaW1pemUgZGVvcHRpbWl6YXRpb25zLiBSZXR1cm5zIGEgY29tcGxldGlvblxuICAvLyByZWNvcmQgbGlrZSBjb250ZXh0LnRyeUVudHJpZXNbaV0uY29tcGxldGlvbi4gVGhpcyBpbnRlcmZhY2UgY291bGRcbiAgLy8gaGF2ZSBiZWVuIChhbmQgd2FzIHByZXZpb3VzbHkpIGRlc2lnbmVkIHRvIHRha2UgYSBjbG9zdXJlIHRvIGJlXG4gIC8vIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIGJ1dCBpbiBhbGwgdGhlIGNhc2VzIHdlIGNhcmUgYWJvdXQgd2VcbiAgLy8gYWxyZWFkeSBoYXZlIGFuIGV4aXN0aW5nIG1ldGhvZCB3ZSB3YW50IHRvIGNhbGwsIHNvIHRoZXJlJ3Mgbm8gbmVlZFxuICAvLyB0byBjcmVhdGUgYSBuZXcgZnVuY3Rpb24gb2JqZWN0LiBXZSBjYW4gZXZlbiBnZXQgYXdheSB3aXRoIGFzc3VtaW5nXG4gIC8vIHRoZSBtZXRob2QgdGFrZXMgZXhhY3RseSBvbmUgYXJndW1lbnQsIHNpbmNlIHRoYXQgaGFwcGVucyB0byBiZSB0cnVlXG4gIC8vIGluIGV2ZXJ5IGNhc2UsIHNvIHdlIGRvbid0IGhhdmUgdG8gdG91Y2ggdGhlIGFyZ3VtZW50cyBvYmplY3QuIFRoZVxuICAvLyBvbmx5IGFkZGl0aW9uYWwgYWxsb2NhdGlvbiByZXF1aXJlZCBpcyB0aGUgY29tcGxldGlvbiByZWNvcmQsIHdoaWNoXG4gIC8vIGhhcyBhIHN0YWJsZSBzaGFwZSBhbmQgc28gaG9wZWZ1bGx5IHNob3VsZCBiZSBjaGVhcCB0byBhbGxvY2F0ZS5cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwibm9ybWFsXCIsIGFyZzogZm4uY2FsbChvYmosIGFyZykgfTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwidGhyb3dcIiwgYXJnOiBlcnIgfTtcbiAgICB9XG4gIH1cblxuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydCA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQgPSBcInN1c3BlbmRlZFlpZWxkXCI7XG4gIHZhciBHZW5TdGF0ZUV4ZWN1dGluZyA9IFwiZXhlY3V0aW5nXCI7XG4gIHZhciBHZW5TdGF0ZUNvbXBsZXRlZCA9IFwiY29tcGxldGVkXCI7XG5cbiAgLy8gUmV0dXJuaW5nIHRoaXMgb2JqZWN0IGZyb20gdGhlIGlubmVyRm4gaGFzIHRoZSBzYW1lIGVmZmVjdCBhc1xuICAvLyBicmVha2luZyBvdXQgb2YgdGhlIGRpc3BhdGNoIHN3aXRjaCBzdGF0ZW1lbnQuXG4gIHZhciBDb250aW51ZVNlbnRpbmVsID0ge307XG5cbiAgLy8gRHVtbXkgY29uc3RydWN0b3IgZnVuY3Rpb25zIHRoYXQgd2UgdXNlIGFzIHRoZSAuY29uc3RydWN0b3IgYW5kXG4gIC8vIC5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgcHJvcGVydGllcyBmb3IgZnVuY3Rpb25zIHRoYXQgcmV0dXJuIEdlbmVyYXRvclxuICAvLyBvYmplY3RzLiBGb3IgZnVsbCBzcGVjIGNvbXBsaWFuY2UsIHlvdSBtYXkgd2lzaCB0byBjb25maWd1cmUgeW91clxuICAvLyBtaW5pZmllciBub3QgdG8gbWFuZ2xlIHRoZSBuYW1lcyBvZiB0aGVzZSB0d28gZnVuY3Rpb25zLlxuICBmdW5jdGlvbiBHZW5lcmF0b3IoKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cblxuICAvLyBUaGlzIGlzIGEgcG9seWZpbGwgZm9yICVJdGVyYXRvclByb3RvdHlwZSUgZm9yIGVudmlyb25tZW50cyB0aGF0XG4gIC8vIGRvbid0IG5hdGl2ZWx5IHN1cHBvcnQgaXQuXG4gIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuICBJdGVyYXRvclByb3RvdHlwZVtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gIGlmIChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAmJlxuICAgICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmXG4gICAgICBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9XG4gICAgR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHcC5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IGRlZmluZShcbiAgICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSxcbiAgICB0b1N0cmluZ1RhZ1N5bWJvbCxcbiAgICBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgKTtcblxuICAvLyBIZWxwZXIgZm9yIGRlZmluaW5nIHRoZSAubmV4dCwgLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzIG9mIHRoZVxuICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICBkZWZpbmUocHJvdG90eXBlLCBtZXRob2QsIGZ1bmN0aW9uKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yXG4gICAgICA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8XG4gICAgICAgIC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAgICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgICAgICAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpID09PSBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gIH07XG5cbiAgZXhwb3J0cy5tYXJrID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgaWYgKE9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgICBkZWZpbmUoZ2VuRnVuLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JGdW5jdGlvblwiKTtcbiAgICB9XG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07XG5cbiAgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpYCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC5cbiAgZXhwb3J0cy5hd3JhcCA9IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiB7IF9fYXdhaXQ6IGFyZyB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yLCBQcm9taXNlSW1wbCkge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWNvcmQuYXJnO1xuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSAmJlxuICAgICAgICAgICAgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uKHVud3JhcHBlZCkge1xuICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uXG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAvLyBJZiBhIHJlamVjdGVkIFByb21pc2Ugd2FzIHlpZWxkZWQsIHRocm93IHRoZSByZWplY3Rpb24gYmFja1xuICAgICAgICAgIC8vIGludG8gdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBzbyBpdCBjYW4gYmUgaGFuZGxlZCB0aGVyZS5cbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlSW1wbChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID1cbiAgICAgICAgLy8gSWYgZW5xdWV1ZSBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIHdlIHdhbnQgdG8gd2FpdCB1bnRpbFxuICAgICAgICAvLyBhbGwgcHJldmlvdXMgUHJvbWlzZXMgaGF2ZSBiZWVuIHJlc29sdmVkIGJlZm9yZSBjYWxsaW5nIGludm9rZSxcbiAgICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgICAvLyBlbnF1ZXVlIGhhcyBub3QgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIGl0IGlzIGltcG9ydGFudCB0b1xuICAgICAgICAvLyBjYWxsIGludm9rZSBpbW1lZGlhdGVseSwgd2l0aG91dCB3YWl0aW5nIG9uIGEgY2FsbGJhY2sgdG8gZmlyZSxcbiAgICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgICAgLy8gYW55IG5lY2Vzc2FyeSBzZXR1cCBpbiBhIHByZWRpY3RhYmxlIHdheS4gVGhpcyBwcmVkaWN0YWJpbGl0eVxuICAgICAgICAvLyBpcyB3aHkgdGhlIFByb21pc2UgY29uc3RydWN0b3Igc3luY2hyb25vdXNseSBpbnZva2VzIGl0c1xuICAgICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgICAvLyBleGVjdXRlIGNvZGUgYmVmb3JlIHRoZSBmaXJzdCBhd2FpdC4gU2luY2Ugd2UgaW1wbGVtZW50IHNpbXBsZVxuICAgICAgICAvLyBhc3luYyBmdW5jdGlvbnMgaW4gdGVybXMgb2YgYXN5bmMgZ2VuZXJhdG9ycywgaXQgaXMgZXNwZWNpYWxseVxuICAgICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICAgIHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKFxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLFxuICAgICAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAgICAgLy8gaW52b2NhdGlvbnMgb2YgdGhlIGl0ZXJhdG9yLlxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnXG4gICAgICAgICkgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgIH1cblxuICAgIC8vIERlZmluZSB0aGUgdW5pZmllZCBoZWxwZXIgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byBpbXBsZW1lbnQgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiAoc2VlIGRlZmluZUl0ZXJhdG9yTWV0aG9kcykuXG4gICAgdGhpcy5faW52b2tlID0gZW5xdWV1ZTtcbiAgfVxuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG4gIEFzeW5jSXRlcmF0b3IucHJvdG90eXBlW2FzeW5jSXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICBleHBvcnRzLkFzeW5jSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yO1xuXG4gIC8vIE5vdGUgdGhhdCBzaW1wbGUgYXN5bmMgZnVuY3Rpb25zIGFyZSBpbXBsZW1lbnRlZCBvbiB0b3Agb2ZcbiAgLy8gQXN5bmNJdGVyYXRvciBvYmplY3RzOyB0aGV5IGp1c3QgcmV0dXJuIGEgUHJvbWlzZSBmb3IgdGhlIHZhbHVlIG9mXG4gIC8vIHRoZSBmaW5hbCByZXN1bHQgcHJvZHVjZWQgYnkgdGhlIGl0ZXJhdG9yLlxuICBleHBvcnRzLmFzeW5jID0gZnVuY3Rpb24oaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QsIFByb21pc2VJbXBsKSB7XG4gICAgaWYgKFByb21pc2VJbXBsID09PSB2b2lkIDApIFByb21pc2VJbXBsID0gUHJvbWlzZTtcblxuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3IoXG4gICAgICB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSxcbiAgICAgIFByb21pc2VJbXBsXG4gICAgKTtcblxuICAgIHJldHVybiBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbilcbiAgICAgID8gaXRlciAvLyBJZiBvdXRlckZuIGlzIGEgZ2VuZXJhdG9yLCByZXR1cm4gdGhlIGZ1bGwgaXRlcmF0b3IuXG4gICAgICA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7XG4gICAgICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQ7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVDb21wbGV0ZWQpIHtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQmUgZm9yZ2l2aW5nLCBwZXIgMjUuMy4zLjMuMyBvZiB0aGUgc3BlYzpcbiAgICAgICAgLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLWdlbmVyYXRvcnJlc3VtZVxuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuXG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgIGNvbnRleHQuYXJnID0gYXJnO1xuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICB2YXIgZGVsZWdhdGVSZXN1bHQgPSBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcbiAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCA9PT0gQ29udGludWVTZW50aW5lbCkgY29udGludWU7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGVSZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgIC8vIFNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICAgICAgY29udGV4dC5zZW50ID0gY29udGV4dC5fc2VudCA9IGNvbnRleHQuYXJnO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydCkge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAgIHRocm93IGNvbnRleHQuYXJnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBjb250ZXh0LmFyZyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZSA9IEdlblN0YXRlRXhlY3V0aW5nO1xuXG4gICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiKSB7XG4gICAgICAgICAgLy8gSWYgYW4gZXhjZXB0aW9uIGlzIHRocm93biBmcm9tIGlubmVyRm4sIHdlIGxlYXZlIHN0YXRlID09PVxuICAgICAgICAgIC8vIEdlblN0YXRlRXhlY3V0aW5nIGFuZCBsb29wIGJhY2sgZm9yIGFub3RoZXIgaW52b2NhdGlvbi5cbiAgICAgICAgICBzdGF0ZSA9IGNvbnRleHQuZG9uZVxuICAgICAgICAgICAgPyBHZW5TdGF0ZUNvbXBsZXRlZFxuICAgICAgICAgICAgOiBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAvLyBEaXNwYXRjaCB0aGUgZXhjZXB0aW9uIGJ5IGxvb3BpbmcgYmFjayBhcm91bmQgdG8gdGhlXG4gICAgICAgICAgLy8gY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZykgY2FsbCBhYm92ZS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gQ2FsbCBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF0oY29udGV4dC5hcmcpIGFuZCBoYW5kbGUgdGhlXG4gIC8vIHJlc3VsdCwgZWl0aGVyIGJ5IHJldHVybmluZyBhIHsgdmFsdWUsIGRvbmUgfSByZXN1bHQgZnJvbSB0aGVcbiAgLy8gZGVsZWdhdGUgaXRlcmF0b3IsIG9yIGJ5IG1vZGlmeWluZyBjb250ZXh0Lm1ldGhvZCBhbmQgY29udGV4dC5hcmcsXG4gIC8vIHNldHRpbmcgY29udGV4dC5kZWxlZ2F0ZSB0byBudWxsLCBhbmQgcmV0dXJuaW5nIHRoZSBDb250aW51ZVNlbnRpbmVsLlxuICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIG1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXTtcbiAgICBpZiAobWV0aG9kID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIEEgLnRocm93IG9yIC5yZXR1cm4gd2hlbiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIG5vIC50aHJvd1xuICAgICAgLy8gbWV0aG9kIGFsd2F5cyB0ZXJtaW5hdGVzIHRoZSB5aWVsZCogbG9vcC5cbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAvLyBOb3RlOiBbXCJyZXR1cm5cIl0gbXVzdCBiZSB1c2VkIGZvciBFUzMgcGFyc2luZyBjb21wYXRpYmlsaXR5LlxuICAgICAgICBpZiAoZGVsZWdhdGUuaXRlcmF0b3JbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgICAgLy8gY2hhbmNlIHRvIGNsZWFuIHVwLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcblxuICAgICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICAvLyBJZiBtYXliZUludm9rZURlbGVnYXRlKGNvbnRleHQpIGNoYW5nZWQgY29udGV4dC5tZXRob2QgZnJvbVxuICAgICAgICAgICAgLy8gXCJyZXR1cm5cIiB0byBcInRocm93XCIsIGxldCB0aGF0IG92ZXJyaWRlIHRoZSBUeXBlRXJyb3IgYmVsb3cuXG4gICAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgIFwiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAndGhyb3cnIG1ldGhvZFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcblxuICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuXG4gICAgaWYgKCEgaW5mbykge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdFwiKTtcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgLy8gQXNzaWduIHRoZSByZXN1bHQgb2YgdGhlIGZpbmlzaGVkIGRlbGVnYXRlIHRvIHRoZSB0ZW1wb3JhcnlcbiAgICAgIC8vIHZhcmlhYmxlIHNwZWNpZmllZCBieSBkZWxlZ2F0ZS5yZXN1bHROYW1lIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcblxuICAgICAgLy8gUmVzdW1lIGV4ZWN1dGlvbiBhdCB0aGUgZGVzaXJlZCBsb2NhdGlvbiAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYztcblxuICAgICAgLy8gSWYgY29udGV4dC5tZXRob2Qgd2FzIFwidGhyb3dcIiBidXQgdGhlIGRlbGVnYXRlIGhhbmRsZWQgdGhlXG4gICAgICAvLyBleGNlcHRpb24sIGxldCB0aGUgb3V0ZXIgZ2VuZXJhdG9yIHByb2NlZWQgbm9ybWFsbHkuIElmXG4gICAgICAvLyBjb250ZXh0Lm1ldGhvZCB3YXMgXCJuZXh0XCIsIGZvcmdldCBjb250ZXh0LmFyZyBzaW5jZSBpdCBoYXMgYmVlblxuICAgICAgLy8gXCJjb25zdW1lZFwiIGJ5IHRoZSBkZWxlZ2F0ZSBpdGVyYXRvci4gSWYgY29udGV4dC5tZXRob2Qgd2FzXG4gICAgICAvLyBcInJldHVyblwiLCBhbGxvdyB0aGUgb3JpZ2luYWwgLnJldHVybiBjYWxsIHRvIGNvbnRpbnVlIGluIHRoZVxuICAgICAgLy8gb3V0ZXIgZ2VuZXJhdG9yLlxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kICE9PSBcInJldHVyblwiKSB7XG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlLXlpZWxkIHRoZSByZXN1bHQgcmV0dXJuZWQgYnkgdGhlIGRlbGVnYXRlIG1ldGhvZC5cbiAgICAgIHJldHVybiBpbmZvO1xuICAgIH1cblxuICAgIC8vIFRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBpcyBmaW5pc2hlZCwgc28gZm9yZ2V0IGl0IGFuZCBjb250aW51ZSB3aXRoXG4gICAgLy8gdGhlIG91dGVyIGdlbmVyYXRvci5cbiAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgfVxuXG4gIC8vIERlZmluZSBHZW5lcmF0b3IucHJvdG90eXBlLntuZXh0LHRocm93LHJldHVybn0gaW4gdGVybXMgb2YgdGhlXG4gIC8vIHVuaWZpZWQgLl9pbnZva2UgaGVscGVyIG1ldGhvZC5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKTtcblxuICBkZWZpbmUoR3AsIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvclwiKTtcblxuICAvLyBBIEdlbmVyYXRvciBzaG91bGQgYWx3YXlzIHJldHVybiBpdHNlbGYgYXMgdGhlIGl0ZXJhdG9yIG9iamVjdCB3aGVuIHRoZVxuICAvLyBAQGl0ZXJhdG9yIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbiBpdC4gU29tZSBicm93c2VycycgaW1wbGVtZW50YXRpb25zIG9mIHRoZVxuICAvLyBpdGVyYXRvciBwcm90b3R5cGUgY2hhaW4gaW5jb3JyZWN0bHkgaW1wbGVtZW50IHRoaXMsIGNhdXNpbmcgdGhlIEdlbmVyYXRvclxuICAvLyBvYmplY3QgdG8gbm90IGJlIHJldHVybmVkIGZyb20gdGhpcyBjYWxsLiBUaGlzIGVuc3VyZXMgdGhhdCBkb2Vzbid0IGhhcHBlbi5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9pc3N1ZXMvMjc0IGZvciBtb3JlIGRldGFpbHMuXG4gIEdwW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEdwLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH07XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7IHRyeUxvYzogbG9jc1swXSB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7IHRyeUxvYzogXCJyb290XCIgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBleHBvcnRzLmtleXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICBrZXlzLnJldmVyc2UoKTtcblxuICAgIC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRvIGF2b2lkIGNyZWF0aW5nIGFuIGFkZGl0aW9uYWwgb2JqZWN0LCB3ZSBqdXN0IGhhbmcgdGhlIC52YWx1ZVxuICAgICAgLy8gYW5kIC5kb25lIHByb3BlcnRpZXMgb2ZmIHRoZSBuZXh0IGZ1bmN0aW9uIG9iamVjdCBpdHNlbGYuIFRoaXNcbiAgICAgIC8vIGFsc28gZW5zdXJlcyB0aGF0IHRoZSBtaW5pZmllciB3aWxsIG5vdCBhbm9ueW1pemUgdGhlIGZ1bmN0aW9uLlxuICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLCBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSB7XG4gICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHQudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcblxuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybiBhbiBpdGVyYXRvciB3aXRoIG5vIHZhbHVlcy5cbiAgICByZXR1cm4geyBuZXh0OiBkb25lUmVzdWx0IH07XG4gIH1cbiAgZXhwb3J0cy52YWx1ZXMgPSB2YWx1ZXM7XG5cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIH1cblxuICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcblxuICAgIHJlc2V0OiBmdW5jdGlvbihza2lwVGVtcFJlc2V0KSB7XG4gICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgdGhpcy5uZXh0ID0gMDtcbiAgICAgIC8vIFJlc2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcblxuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiZcbiAgICAgICAgICAgICAgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiZcbiAgICAgICAgICAgICAgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuXG4gICAgICB2YXIgcm9vdEVudHJ5ID0gdGhpcy50cnlFbnRyaWVzWzBdO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjtcbiAgICAgIGlmIChyb290UmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZWNvcmQudHlwZSA9IFwidGhyb3dcIjtcbiAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgY29udGV4dC5uZXh0ID0gbG9jO1xuXG4gICAgICAgIGlmIChjYXVnaHQpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhISBjYXVnaHQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSBcInJvb3RcIikge1xuICAgICAgICAgIC8vIEV4Y2VwdGlvbiB0aHJvd24gb3V0c2lkZSBvZiBhbnkgdHJ5IGJsb2NrIHRoYXQgY291bGQgaGFuZGxlXG4gICAgICAgICAgLy8gaXQsIHNvIHNldCB0aGUgY29tcGxldGlvbiB2YWx1ZSBvZiB0aGUgZW50aXJlIGZ1bmN0aW9uIHRvXG4gICAgICAgICAgLy8gdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG5cbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGFicnVwdDogZnVuY3Rpb24odHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiZcbiAgICAgICAgICAgIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJlxuICAgICAgICAgICh0eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICAgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJlxuICAgICAgICAgIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmXG4gICAgICAgICAgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICBmaW5hbGx5RW50cnkgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgIH0sXG5cbiAgICBjb21wbGV0ZTogZnVuY3Rpb24ocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcblxuICAgIGZpbmlzaDogZnVuY3Rpb24oZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbih0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24oaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfTtcblxuICAvLyBSZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlXG4gIC8vIG9yIG5vdCwgcmV0dXJuIHRoZSBydW50aW1lIG9iamVjdCBzbyB0aGF0IHdlIGNhbiBkZWNsYXJlIHRoZSB2YXJpYWJsZVxuICAvLyByZWdlbmVyYXRvclJ1bnRpbWUgaW4gdGhlIG91dGVyIHNjb3BlLCB3aGljaCBhbGxvd3MgdGhpcyBtb2R1bGUgdG8gYmVcbiAgLy8gaW5qZWN0ZWQgZWFzaWx5IGJ5IGBiaW4vcmVnZW5lcmF0b3IgLS1pbmNsdWRlLXJ1bnRpbWUgc2NyaXB0LmpzYC5cbiAgcmV0dXJuIGV4cG9ydHM7XG5cbn0oXG4gIC8vIElmIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZSwgdXNlIG1vZHVsZS5leHBvcnRzXG4gIC8vIGFzIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgbmFtZXNwYWNlLiBPdGhlcndpc2UgY3JlYXRlIGEgbmV3IGVtcHR5XG4gIC8vIG9iamVjdC4gRWl0aGVyIHdheSwgdGhlIHJlc3VsdGluZyBvYmplY3Qgd2lsbCBiZSB1c2VkIHRvIGluaXRpYWxpemVcbiAgLy8gdGhlIHJlZ2VuZXJhdG9yUnVudGltZSB2YXJpYWJsZSBhdCB0aGUgdG9wIG9mIHRoaXMgZmlsZS5cbiAgdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiA/IG1vZHVsZS5leHBvcnRzIDoge31cbikpO1xuXG50cnkge1xuICByZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xufSBjYXRjaCAoYWNjaWRlbnRhbFN0cmljdE1vZGUpIHtcbiAgLy8gVGhpcyBtb2R1bGUgc2hvdWxkIG5vdCBiZSBydW5uaW5nIGluIHN0cmljdCBtb2RlLCBzbyB0aGUgYWJvdmVcbiAgLy8gYXNzaWdubWVudCBzaG91bGQgYWx3YXlzIHdvcmsgdW5sZXNzIHNvbWV0aGluZyBpcyBtaXNjb25maWd1cmVkLiBKdXN0XG4gIC8vIGluIGNhc2UgcnVudGltZS5qcyBhY2NpZGVudGFsbHkgcnVucyBpbiBzdHJpY3QgbW9kZSwgd2UgY2FuIGVzY2FwZVxuICAvLyBzdHJpY3QgbW9kZSB1c2luZyBhIGdsb2JhbCBGdW5jdGlvbiBjYWxsLiBUaGlzIGNvdWxkIGNvbmNlaXZhYmx5IGZhaWxcbiAgLy8gaWYgYSBDb250ZW50IFNlY3VyaXR5IFBvbGljeSBmb3JiaWRzIHVzaW5nIEZ1bmN0aW9uLCBidXQgaW4gdGhhdCBjYXNlXG4gIC8vIHRoZSBwcm9wZXIgc29sdXRpb24gaXMgdG8gZml4IHRoZSBhY2NpZGVudGFsIHN0cmljdCBtb2RlIHByb2JsZW0uIElmXG4gIC8vIHlvdSd2ZSBtaXNjb25maWd1cmVkIHlvdXIgYnVuZGxlciB0byBmb3JjZSBzdHJpY3QgbW9kZSBhbmQgYXBwbGllZCBhXG4gIC8vIENTUCB0byBmb3JiaWQgRnVuY3Rpb24sIGFuZCB5b3UncmUgbm90IHdpbGxpbmcgdG8gZml4IGVpdGhlciBvZiB0aG9zZVxuICAvLyBwcm9ibGVtcywgcGxlYXNlIGRldGFpbCB5b3VyIHVuaXF1ZSBwcmVkaWNhbWVudCBpbiBhIEdpdEh1YiBpc3N1ZS5cbiAgRnVuY3Rpb24oXCJyXCIsIFwicmVnZW5lcmF0b3JSdW50aW1lID0gclwiKShydW50aW1lKTtcbn1cbiIsIi8vIGNyb3NzIGJyb3dzZXJzIGFkZFJ1bGUgbWV0aG9kXG5pbXBvcnQgeyByYWYgfSBmcm9tICcuL3JhZi5qcyc7XG5leHBvcnQgZnVuY3Rpb24gYWRkQ1NTUnVsZShzaGVldCwgc2VsZWN0b3IsIHJ1bGVzLCBpbmRleCkge1xuICAvLyByZXR1cm4gcmFmKGZ1bmN0aW9uKCkge1xuICAgICdpbnNlcnRSdWxlJyBpbiBzaGVldCA/XG4gICAgICBzaGVldC5pbnNlcnRSdWxlKHNlbGVjdG9yICsgJ3snICsgcnVsZXMgKyAnfScsIGluZGV4KSA6XG4gICAgICBzaGVldC5hZGRSdWxlKHNlbGVjdG9yLCBydWxlcywgaW5kZXgpO1xuICAvLyB9KTtcbn0iLCJpbXBvcnQgeyBjbGFzc0xpc3RTdXBwb3J0LCBoYXNDbGFzcyB9IGZyb20gJy4vaGFzQ2xhc3MuanMnO1xudmFyIGFkZENsYXNzID0gY2xhc3NMaXN0U3VwcG9ydCA/XG4gICAgZnVuY3Rpb24gKGVsLCBzdHIpIHtcbiAgICAgIGlmICghaGFzQ2xhc3MoZWwsICBzdHIpKSB7IGVsLmNsYXNzTGlzdC5hZGQoc3RyKTsgfVxuICAgIH0gOlxuICAgIGZ1bmN0aW9uIChlbCwgc3RyKSB7XG4gICAgICBpZiAoIWhhc0NsYXNzKGVsLCAgc3RyKSkgeyBlbC5jbGFzc05hbWUgKz0gJyAnICsgc3RyOyB9XG4gICAgfTtcblxuZXhwb3J0IHsgYWRkQ2xhc3MgfTsiLCJpbXBvcnQgeyBwYXNzaXZlT3B0aW9uIH0gZnJvbSAnLi9wYXNzaXZlT3B0aW9uLmpzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEV2ZW50cyhlbCwgb2JqLCBwcmV2ZW50U2Nyb2xsaW5nKSB7XG4gIGZvciAodmFyIHByb3AgaW4gb2JqKSB7XG4gICAgdmFyIG9wdGlvbiA9IFsndG91Y2hzdGFydCcsICd0b3VjaG1vdmUnXS5pbmRleE9mKHByb3ApID49IDAgJiYgIXByZXZlbnRTY3JvbGxpbmcgPyBwYXNzaXZlT3B0aW9uIDogZmFsc2U7XG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihwcm9wLCBvYmpbcHJvcF0sIG9wdGlvbik7XG4gIH1cbn0iLCJleHBvcnQgZnVuY3Rpb24gYXJyYXlGcm9tTm9kZUxpc3QgKG5sKSB7XG4gIHZhciBhcnIgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBubC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBhcnIucHVzaChubFtpXSk7XG4gIH1cbiAgcmV0dXJuIGFycjtcbn0iLCJ2YXIgd2luID0gd2luZG93O1xuXG5leHBvcnQgdmFyIGNhZiA9IHdpbi5jYW5jZWxBbmltYXRpb25GcmFtZVxuICB8fCB3aW4ubW96Q2FuY2VsQW5pbWF0aW9uRnJhbWVcbiAgfHwgZnVuY3Rpb24oaWQpeyBjbGVhclRpbWVvdXQoaWQpOyB9O1xuIiwiLy8gZ2V0IGNzcy1jYWxjIFxuLy8gQHJldHVybiAtIGZhbHNlIHwgY2FsYyB8IC13ZWJraXQtY2FsYyB8IC1tb3otY2FsY1xuLy8gQHVzYWdlIC0gdmFyIGNhbGMgPSBnZXRDYWxjKCk7IFxuaW1wb3J0IHsgZ2V0Qm9keSB9IGZyb20gJy4vZ2V0Qm9keS5qcyc7XG5pbXBvcnQgeyBzZXRGYWtlQm9keSB9IGZyb20gJy4vc2V0RmFrZUJvZHkuanMnO1xuaW1wb3J0IHsgcmVzZXRGYWtlQm9keSB9IGZyb20gJy4vcmVzZXRGYWtlQm9keS5qcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjYWxjKCkge1xuICB2YXIgZG9jID0gZG9jdW1lbnQsIFxuICAgICAgYm9keSA9IGdldEJvZHkoKSxcbiAgICAgIGRvY092ZXJmbG93ID0gc2V0RmFrZUJvZHkoYm9keSksXG4gICAgICBkaXYgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2JyksIFxuICAgICAgcmVzdWx0ID0gZmFsc2U7XG5cbiAgYm9keS5hcHBlbmRDaGlsZChkaXYpO1xuICB0cnkge1xuICAgIHZhciBzdHIgPSAnKDEwcHggKiAxMCknLFxuICAgICAgICB2YWxzID0gWydjYWxjJyArIHN0ciwgJy1tb3otY2FsYycgKyBzdHIsICctd2Via2l0LWNhbGMnICsgc3RyXSxcbiAgICAgICAgdmFsO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICB2YWwgPSB2YWxzW2ldO1xuICAgICAgZGl2LnN0eWxlLndpZHRoID0gdmFsO1xuICAgICAgaWYgKGRpdi5vZmZzZXRXaWR0aCA9PT0gMTAwKSB7IFxuICAgICAgICByZXN1bHQgPSB2YWwucmVwbGFjZShzdHIsICcnKTsgXG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfSBjYXRjaCAoZSkge31cbiAgXG4gIGJvZHkuZmFrZSA/IHJlc2V0RmFrZUJvZHkoYm9keSwgZG9jT3ZlcmZsb3cpIDogZGl2LnJlbW92ZSgpO1xuXG4gIHJldHVybiByZXN1bHQ7XG59IiwiZXhwb3J0IGZ1bmN0aW9uIGNoZWNrU3RvcmFnZVZhbHVlICh2YWx1ZSkge1xuICByZXR1cm4gWyd0cnVlJywgJ2ZhbHNlJ10uaW5kZXhPZih2YWx1ZSkgPj0gMCA/IEpTT04ucGFyc2UodmFsdWUpIDogdmFsdWU7XG59IiwiZXhwb3J0IHZhciBjbGFzc0xpc3RTdXBwb3J0ID0gJ2NsYXNzTGlzdCcgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnXycpOyIsIi8vIGNyZWF0ZSBhbmQgYXBwZW5kIHN0eWxlIHNoZWV0XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU3R5bGVTaGVldCAobWVkaWEsIG5vbmNlKSB7XG4gIC8vIENyZWF0ZSB0aGUgPHN0eWxlPiB0YWdcbiAgdmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICAvLyBzdHlsZS5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwidGV4dC9jc3NcIik7XG5cbiAgLy8gQWRkIGEgbWVkaWEgKGFuZC9vciBtZWRpYSBxdWVyeSkgaGVyZSBpZiB5b3UnZCBsaWtlIVxuICAvLyBzdHlsZS5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBcInNjcmVlblwiKVxuICAvLyBzdHlsZS5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBcIm9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoIDogMTAyNHB4KVwiKVxuICBpZiAobWVkaWEpIHsgc3R5bGUuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpOyB9XG5cbiAgLy8gQWRkIG5vbmNlIGF0dHJpYnV0ZSBmb3IgQ29udGVudCBTZWN1cml0eSBQb2xpY3lcbiAgaWYgKG5vbmNlKSB7IHN0eWxlLnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTsgfVxuXG4gIC8vIFdlYktpdCBoYWNrIDooXG4gIC8vIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiXCIpKTtcblxuICAvLyBBZGQgdGhlIDxzdHlsZT4gZWxlbWVudCB0byB0aGUgcGFnZVxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkJykuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXG4gIHJldHVybiBzdHlsZS5zaGVldCA/IHN0eWxlLnNoZWV0IDogc3R5bGUuc3R5bGVTaGVldDtcbn07IiwiZXhwb3J0IHZhciBkb2NFbGVtZW50ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50OyIsImV4cG9ydCBmdW5jdGlvbiBFdmVudHMoKSB7XG4gIHJldHVybiB7XG4gICAgdG9waWNzOiB7fSxcbiAgICBvbjogZnVuY3Rpb24gKGV2ZW50TmFtZSwgZm4pIHtcbiAgICAgIHRoaXMudG9waWNzW2V2ZW50TmFtZV0gPSB0aGlzLnRvcGljc1tldmVudE5hbWVdIHx8IFtdO1xuICAgICAgdGhpcy50b3BpY3NbZXZlbnROYW1lXS5wdXNoKGZuKTtcbiAgICB9LFxuICAgIG9mZjogZnVuY3Rpb24oZXZlbnROYW1lLCBmbikge1xuICAgICAgaWYgKHRoaXMudG9waWNzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnRvcGljc1tldmVudE5hbWVdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHRoaXMudG9waWNzW2V2ZW50TmFtZV1baV0gPT09IGZuKSB7XG4gICAgICAgICAgICB0aGlzLnRvcGljc1tldmVudE5hbWVdLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgZW1pdDogZnVuY3Rpb24gKGV2ZW50TmFtZSwgZGF0YSkge1xuICAgICAgZGF0YS50eXBlID0gZXZlbnROYW1lO1xuICAgICAgaWYgKHRoaXMudG9waWNzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgdGhpcy50b3BpY3NbZXZlbnROYW1lXS5mb3JFYWNoKGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgICAgZm4oZGF0YSwgZXZlbnROYW1lKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufTsiLCJleHBvcnQgZnVuY3Rpb24gZXh0ZW5kKCkge1xuICB2YXIgb2JqLCBuYW1lLCBjb3B5LFxuICAgICAgdGFyZ2V0ID0gYXJndW1lbnRzWzBdIHx8IHt9LFxuICAgICAgaSA9IDEsXG4gICAgICBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuXG4gIGZvciAoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoKG9iaiA9IGFyZ3VtZW50c1tpXSkgIT09IG51bGwpIHtcbiAgICAgIGZvciAobmFtZSBpbiBvYmopIHtcbiAgICAgICAgY29weSA9IG9ialtuYW1lXTtcblxuICAgICAgICBpZiAodGFyZ2V0ID09PSBjb3B5KSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH0gZWxzZSBpZiAoY29weSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGFyZ2V0W25hbWVdID0gY29weTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdGFyZ2V0O1xufSIsIi8vIGh0dHBzOi8vdG9kZG1vdHRvLmNvbS9kaXRjaC10aGUtYXJyYXktZm9yZWFjaC1jYWxsLW5vZGVsaXN0LWhhY2svXG5leHBvcnQgZnVuY3Rpb24gZm9yRWFjaCAoYXJyLCBjYWxsYmFjaywgc2NvcGUpIHtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcnIubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgY2FsbGJhY2suY2FsbChzY29wZSwgYXJyW2ldLCBpKTtcbiAgfVxufSIsImV4cG9ydCBmdW5jdGlvbiBnZXRBdHRyKGVsLCBhdHRyKSB7XG4gIHJldHVybiBlbC5nZXRBdHRyaWJ1dGUoYXR0cik7XG59IiwiZXhwb3J0IGZ1bmN0aW9uIGdldEJvZHkgKCkge1xuICB2YXIgZG9jID0gZG9jdW1lbnQsXG4gICAgICBib2R5ID0gZG9jLmJvZHk7XG5cbiAgaWYgKCFib2R5KSB7XG4gICAgYm9keSA9IGRvYy5jcmVhdGVFbGVtZW50KCdib2R5Jyk7XG4gICAgYm9keS5mYWtlID0gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBib2R5O1xufSIsImV4cG9ydCBmdW5jdGlvbiBnZXRDc3NSdWxlc0xlbmd0aChzaGVldCkge1xuICB2YXIgcnVsZSA9ICgnaW5zZXJ0UnVsZScgaW4gc2hlZXQpID8gc2hlZXQuY3NzUnVsZXMgOiBzaGVldC5ydWxlcztcbiAgcmV0dXJuIHJ1bGUubGVuZ3RoO1xufSIsIi8vIGdldCB0cmFuc2l0aW9uZW5kLCBhbmltYXRpb25lbmQgYmFzZWQgb24gdHJhbnNpdGlvbkR1cmF0aW9uXG4vLyBAcHJvcGluOiBzdHJpbmdcbi8vIEBwcm9wT3V0OiBzdHJpbmcsIGZpcnN0LWxldHRlciB1cHBlcmNhc2Vcbi8vIFVzYWdlOiBnZXRFbmRQcm9wZXJ0eSgnV2Via2l0VHJhbnNpdGlvbkR1cmF0aW9uJywgJ1RyYW5zaXRpb24nKSA9PiB3ZWJraXRUcmFuc2l0aW9uRW5kXG5leHBvcnQgZnVuY3Rpb24gZ2V0RW5kUHJvcGVydHkocHJvcEluLCBwcm9wT3V0KSB7XG4gIHZhciBlbmRQcm9wID0gZmFsc2U7XG4gIGlmICgvXldlYmtpdC8udGVzdChwcm9wSW4pKSB7XG4gICAgZW5kUHJvcCA9ICd3ZWJraXQnICsgcHJvcE91dCArICdFbmQnO1xuICB9IGVsc2UgaWYgKC9eTy8udGVzdChwcm9wSW4pKSB7XG4gICAgZW5kUHJvcCA9ICdvJyArIHByb3BPdXQgKyAnRW5kJztcbiAgfSBlbHNlIGlmIChwcm9wSW4pIHtcbiAgICBlbmRQcm9wID0gcHJvcE91dC50b0xvd2VyQ2FzZSgpICsgJ2VuZCc7XG4gIH1cbiAgcmV0dXJuIGVuZFByb3A7XG59IiwiZXhwb3J0IGZ1bmN0aW9uIGdldFNsaWRlSWQoKSB7XG4gIHZhciBpZCA9IHdpbmRvdy50bnNJZDtcbiAgd2luZG93LnRuc0lkID0gIWlkID8gMSA6IGlkICsgMTtcbiAgXG4gIHJldHVybiAndG5zJyArIHdpbmRvdy50bnNJZDtcbn0iLCJleHBvcnQgZnVuY3Rpb24gZ2V0VG91Y2hEaXJlY3Rpb24oYW5nbGUsIHJhbmdlKSB7XG4gIHZhciBkaXJlY3Rpb24gPSBmYWxzZSxcbiAgICAgIGdhcCA9IE1hdGguYWJzKDkwIC0gTWF0aC5hYnMoYW5nbGUpKTtcbiAgICAgIFxuICBpZiAoZ2FwID49IDkwIC0gcmFuZ2UpIHtcbiAgICBkaXJlY3Rpb24gPSAnaG9yaXpvbnRhbCc7XG4gIH0gZWxzZSBpZiAoZ2FwIDw9IHJhbmdlKSB7XG4gICAgZGlyZWN0aW9uID0gJ3ZlcnRpY2FsJztcbiAgfVxuXG4gIHJldHVybiBkaXJlY3Rpb247XG59IiwiaW1wb3J0IHsgZ2V0Qm9keSB9IGZyb20gJy4vZ2V0Qm9keS5qcyc7XG5pbXBvcnQgeyBzZXRGYWtlQm9keSB9IGZyb20gJy4vc2V0RmFrZUJvZHkuanMnO1xuaW1wb3J0IHsgcmVzZXRGYWtlQm9keSB9IGZyb20gJy4vcmVzZXRGYWtlQm9keS5qcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXMzRFRyYW5zZm9ybXModGYpe1xuICBpZiAoIXRmKSB7IHJldHVybiBmYWxzZTsgfVxuICBpZiAoIXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKSB7IHJldHVybiBmYWxzZTsgfVxuICBcbiAgdmFyIGRvYyA9IGRvY3VtZW50LFxuICAgICAgYm9keSA9IGdldEJvZHkoKSxcbiAgICAgIGRvY092ZXJmbG93ID0gc2V0RmFrZUJvZHkoYm9keSksXG4gICAgICBlbCA9IGRvYy5jcmVhdGVFbGVtZW50KCdwJyksXG4gICAgICBoYXMzZCxcbiAgICAgIGNzc1RGID0gdGYubGVuZ3RoID4gOSA/ICctJyArIHRmLnNsaWNlKDAsIC05KS50b0xvd2VyQ2FzZSgpICsgJy0nIDogJyc7XG5cbiAgY3NzVEYgKz0gJ3RyYW5zZm9ybSc7XG5cbiAgLy8gQWRkIGl0IHRvIHRoZSBib2R5IHRvIGdldCB0aGUgY29tcHV0ZWQgc3R5bGVcbiAgYm9keS5pbnNlcnRCZWZvcmUoZWwsIG51bGwpO1xuXG4gIGVsLnN0eWxlW3RmXSA9ICd0cmFuc2xhdGUzZCgxcHgsMXB4LDFweCknO1xuICBoYXMzZCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKS5nZXRQcm9wZXJ0eVZhbHVlKGNzc1RGKTtcblxuICBib2R5LmZha2UgPyByZXNldEZha2VCb2R5KGJvZHksIGRvY092ZXJmbG93KSA6IGVsLnJlbW92ZSgpO1xuXG4gIHJldHVybiAoaGFzM2QgIT09IHVuZGVmaW5lZCAmJiBoYXMzZC5sZW5ndGggPiAwICYmIGhhczNkICE9PSBcIm5vbmVcIik7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gaGFzQXR0cihlbCwgYXR0cikge1xuICByZXR1cm4gZWwuaGFzQXR0cmlidXRlKGF0dHIpO1xufSIsImltcG9ydCB7IGNsYXNzTGlzdFN1cHBvcnQgfSBmcm9tICcuL2NsYXNzTGlzdFN1cHBvcnQuanMnO1xuXG52YXIgaGFzQ2xhc3MgPSBjbGFzc0xpc3RTdXBwb3J0ID9cbiAgICBmdW5jdGlvbiAoZWwsIHN0cikgeyByZXR1cm4gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKHN0cik7IH0gOlxuICAgIGZ1bmN0aW9uIChlbCwgc3RyKSB7IHJldHVybiBlbC5jbGFzc05hbWUuaW5kZXhPZihzdHIpID49IDA7IH07XG5cbmV4cG9ydCB7IGNsYXNzTGlzdFN1cHBvcnQsIGhhc0NsYXNzIH07IiwiZXhwb3J0IGZ1bmN0aW9uIGhpZGVFbGVtZW50KGVsLCBmb3JjZUhpZGUpIHtcbiAgaWYgKGVsLnN0eWxlLmRpc3BsYXkgIT09ICdub25lJykgeyBlbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOyB9XG59IiwiZXhwb3J0IGZ1bmN0aW9uIGlzTm9kZUxpc3QoZWwpIHtcbiAgLy8gT25seSBOb2RlTGlzdCBoYXMgdGhlIFwiaXRlbSgpXCIgZnVuY3Rpb25cbiAgcmV0dXJuIHR5cGVvZiBlbC5pdGVtICE9PSBcInVuZGVmaW5lZFwiOyBcbn0iLCJleHBvcnQgZnVuY3Rpb24gaXNWaXNpYmxlKGVsKSB7XG4gIHJldHVybiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCkuZGlzcGxheSAhPT0gJ25vbmUnO1xufSIsImV4cG9ydCBmdW5jdGlvbiBqc1RyYW5zZm9ybShlbGVtZW50LCBhdHRyLCBwcmVmaXgsIHBvc3RmaXgsIHRvLCBkdXJhdGlvbiwgY2FsbGJhY2spIHtcbiAgdmFyIHRpY2sgPSBNYXRoLm1pbihkdXJhdGlvbiwgMTApLFxuICAgICAgdW5pdCA9ICh0by5pbmRleE9mKCclJykgPj0gMCkgPyAnJScgOiAncHgnLFxuICAgICAgdG8gPSB0by5yZXBsYWNlKHVuaXQsICcnKSxcbiAgICAgIGZyb20gPSBOdW1iZXIoZWxlbWVudC5zdHlsZVthdHRyXS5yZXBsYWNlKHByZWZpeCwgJycpLnJlcGxhY2UocG9zdGZpeCwgJycpLnJlcGxhY2UodW5pdCwgJycpKSxcbiAgICAgIHBvc2l0aW9uVGljayA9ICh0byAtIGZyb20pIC8gZHVyYXRpb24gKiB0aWNrLFxuICAgICAgcnVubmluZztcblxuICBzZXRUaW1lb3V0KG1vdmVFbGVtZW50LCB0aWNrKTtcbiAgZnVuY3Rpb24gbW92ZUVsZW1lbnQoKSB7XG4gICAgZHVyYXRpb24gLT0gdGljaztcbiAgICBmcm9tICs9IHBvc2l0aW9uVGljaztcbiAgICBlbGVtZW50LnN0eWxlW2F0dHJdID0gcHJlZml4ICsgZnJvbSArIHVuaXQgKyBwb3N0Zml4O1xuICAgIGlmIChkdXJhdGlvbiA+IDApIHsgXG4gICAgICBzZXRUaW1lb3V0KG1vdmVFbGVtZW50LCB0aWNrKTsgXG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuICB9XG59IiwiaW1wb3J0IHsgZ2V0Qm9keSB9IGZyb20gJy4vZ2V0Qm9keS5qcyc7XG5pbXBvcnQgeyBzZXRGYWtlQm9keSB9IGZyb20gJy4vc2V0RmFrZUJvZHkuanMnO1xuaW1wb3J0IHsgcmVzZXRGYWtlQm9keSB9IGZyb20gJy4vcmVzZXRGYWtlQm9keS5qcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtZWRpYXF1ZXJ5U3VwcG9ydCAoKSB7XG4gIGlmICh3aW5kb3cubWF0Y2hNZWRpYSB8fCB3aW5kb3cubXNNYXRjaE1lZGlhKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgXG4gIHZhciBkb2MgPSBkb2N1bWVudCxcbiAgICAgIGJvZHkgPSBnZXRCb2R5KCksXG4gICAgICBkb2NPdmVyZmxvdyA9IHNldEZha2VCb2R5KGJvZHkpLFxuICAgICAgZGl2ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgc3R5bGUgPSBkb2MuY3JlYXRlRWxlbWVudCgnc3R5bGUnKSxcbiAgICAgIHJ1bGUgPSAnQG1lZGlhIGFsbCBhbmQgKG1pbi13aWR0aDoxcHgpey50bnMtbXEtdGVzdHtwb3NpdGlvbjphYnNvbHV0ZX19JyxcbiAgICAgIHBvc2l0aW9uO1xuXG4gIHN0eWxlLnR5cGUgPSAndGV4dC9jc3MnO1xuICBkaXYuY2xhc3NOYW1lID0gJ3Rucy1tcS10ZXN0JztcblxuICBib2R5LmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgYm9keS5hcHBlbmRDaGlsZChkaXYpO1xuXG4gIGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcnVsZTtcbiAgfSBlbHNlIHtcbiAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2MuY3JlYXRlVGV4dE5vZGUocnVsZSkpO1xuICB9XG5cbiAgcG9zaXRpb24gPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSA/IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRpdikucG9zaXRpb24gOiBkaXYuY3VycmVudFN0eWxlWydwb3NpdGlvbiddO1xuXG4gIGJvZHkuZmFrZSA/IHJlc2V0RmFrZUJvZHkoYm9keSwgZG9jT3ZlcmZsb3cpIDogZGl2LnJlbW92ZSgpO1xuXG4gIHJldHVybiBwb3NpdGlvbiA9PT0gXCJhYnNvbHV0ZVwiO1xufVxuIiwiLy8gVGVzdCB2aWEgYSBnZXR0ZXIgaW4gdGhlIG9wdGlvbnMgb2JqZWN0IHRvIHNlZSBpZiB0aGUgcGFzc2l2ZSBwcm9wZXJ0eSBpcyBhY2Nlc3NlZFxudmFyIHN1cHBvcnRzUGFzc2l2ZSA9IGZhbHNlO1xudHJ5IHtcbiAgdmFyIG9wdHMgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdwYXNzaXZlJywge1xuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICBzdXBwb3J0c1Bhc3NpdmUgPSB0cnVlO1xuICAgIH1cbiAgfSk7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidGVzdFwiLCBudWxsLCBvcHRzKTtcbn0gY2F0Y2ggKGUpIHt9XG5leHBvcnQgdmFyIHBhc3NpdmVPcHRpb24gPSBzdXBwb3J0c1Bhc3NpdmUgPyB7IHBhc3NpdmU6IHRydWUgfSA6IGZhbHNlOyIsIi8vIGdldCBzdWJwaXhlbCBzdXBwb3J0IHZhbHVlXG4vLyBAcmV0dXJuIC0gYm9vbGVhblxuaW1wb3J0IHsgZ2V0Qm9keSB9IGZyb20gJy4vZ2V0Qm9keS5qcyc7XG5pbXBvcnQgeyBzZXRGYWtlQm9keSB9IGZyb20gJy4vc2V0RmFrZUJvZHkuanMnO1xuaW1wb3J0IHsgcmVzZXRGYWtlQm9keSB9IGZyb20gJy4vcmVzZXRGYWtlQm9keS5qcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBwZXJjZW50YWdlTGF5b3V0KCkge1xuICAvLyBjaGVjayBzdWJwaXhlbCBsYXlvdXQgc3VwcG9ydGluZ1xuICB2YXIgZG9jID0gZG9jdW1lbnQsXG4gICAgICBib2R5ID0gZ2V0Qm9keSgpLFxuICAgICAgZG9jT3ZlcmZsb3cgPSBzZXRGYWtlQm9keShib2R5KSxcbiAgICAgIHdyYXBwZXIgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICBvdXRlciA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICAgIHN0ciA9ICcnLFxuICAgICAgY291bnQgPSA3MCxcbiAgICAgIHBlclBhZ2UgPSAzLFxuICAgICAgc3VwcG9ydGVkID0gZmFsc2U7XG5cbiAgd3JhcHBlci5jbGFzc05hbWUgPSBcInRucy10LXN1YnAyXCI7XG4gIG91dGVyLmNsYXNzTmFtZSA9IFwidG5zLXQtY3RcIjtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICBzdHIgKz0gJzxkaXY+PC9kaXY+JztcbiAgfVxuXG4gIG91dGVyLmlubmVySFRNTCA9IHN0cjtcbiAgd3JhcHBlci5hcHBlbmRDaGlsZChvdXRlcik7XG4gIGJvZHkuYXBwZW5kQ2hpbGQod3JhcHBlcik7XG5cbiAgc3VwcG9ydGVkID0gTWF0aC5hYnMod3JhcHBlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0IC0gb3V0ZXIuY2hpbGRyZW5bY291bnQgLSBwZXJQYWdlXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0KSA8IDI7XG5cbiAgYm9keS5mYWtlID8gcmVzZXRGYWtlQm9keShib2R5LCBkb2NPdmVyZmxvdykgOiB3cmFwcGVyLnJlbW92ZSgpO1xuXG4gIHJldHVybiBzdXBwb3J0ZWQ7XG59IiwidmFyIHdpbiA9IHdpbmRvdztcblxuZXhwb3J0IHZhciByYWYgPSB3aW4ucmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gIHx8IHdpbi53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgfHwgd2luLm1velJlcXVlc3RBbmltYXRpb25GcmFtZVxuICB8fCB3aW4ubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgfHwgZnVuY3Rpb24oY2IpIHsgcmV0dXJuIHNldFRpbWVvdXQoY2IsIDE2KTsgfTtcbiIsImltcG9ydCB7IGlzTm9kZUxpc3QgfSBmcm9tIFwiLi9pc05vZGVMaXN0LmpzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVBdHRycyhlbHMsIGF0dHJzKSB7XG4gIGVscyA9IChpc05vZGVMaXN0KGVscykgfHwgZWxzIGluc3RhbmNlb2YgQXJyYXkpID8gZWxzIDogW2Vsc107XG4gIGF0dHJzID0gKGF0dHJzIGluc3RhbmNlb2YgQXJyYXkpID8gYXR0cnMgOiBbYXR0cnNdO1xuXG4gIHZhciBhdHRyTGVuZ3RoID0gYXR0cnMubGVuZ3RoO1xuICBmb3IgKHZhciBpID0gZWxzLmxlbmd0aDsgaS0tOykge1xuICAgIGZvciAodmFyIGogPSBhdHRyTGVuZ3RoOyBqLS07KSB7XG4gICAgICBlbHNbaV0ucmVtb3ZlQXR0cmlidXRlKGF0dHJzW2pdKTtcbiAgICB9XG4gIH1cbn0iLCIvLyBjcm9zcyBicm93c2VycyBhZGRSdWxlIG1ldGhvZFxuaW1wb3J0IHsgcmFmIH0gZnJvbSAnLi9yYWYuanMnO1xuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUNTU1J1bGUoc2hlZXQsIGluZGV4KSB7XG4gIC8vIHJldHVybiByYWYoZnVuY3Rpb24oKSB7XG4gICAgJ2RlbGV0ZVJ1bGUnIGluIHNoZWV0ID9cbiAgICAgIHNoZWV0LmRlbGV0ZVJ1bGUoaW5kZXgpIDpcbiAgICAgIHNoZWV0LnJlbW92ZVJ1bGUoaW5kZXgpO1xuICAvLyB9KTtcbn0iLCJpbXBvcnQgeyBjbGFzc0xpc3RTdXBwb3J0LCBoYXNDbGFzcyB9IGZyb20gJy4vaGFzQ2xhc3MuanMnO1xudmFyIHJlbW92ZUNsYXNzID0gY2xhc3NMaXN0U3VwcG9ydCA/XG4gICAgZnVuY3Rpb24gKGVsLCBzdHIpIHtcbiAgICAgIGlmIChoYXNDbGFzcyhlbCwgIHN0cikpIHsgZWwuY2xhc3NMaXN0LnJlbW92ZShzdHIpOyB9XG4gICAgfSA6XG4gICAgZnVuY3Rpb24gKGVsLCBzdHIpIHtcbiAgICAgIGlmIChoYXNDbGFzcyhlbCwgc3RyKSkgeyBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUucmVwbGFjZShzdHIsICcnKTsgfVxuICAgIH07XG5cbmV4cG9ydCB7IHJlbW92ZUNsYXNzIH07IiwiaW1wb3J0IHsgcGFzc2l2ZU9wdGlvbiB9IGZyb20gJy4vcGFzc2l2ZU9wdGlvbi5qcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVFdmVudHMoZWwsIG9iaikge1xuICBmb3IgKHZhciBwcm9wIGluIG9iaikge1xuICAgIHZhciBvcHRpb24gPSBbJ3RvdWNoc3RhcnQnLCAndG91Y2htb3ZlJ10uaW5kZXhPZihwcm9wKSA+PSAwID8gcGFzc2l2ZU9wdGlvbiA6IGZhbHNlO1xuICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIocHJvcCwgb2JqW3Byb3BdLCBvcHRpb24pO1xuICB9XG59IiwiaW1wb3J0IHsgZG9jRWxlbWVudCB9IGZyb20gJy4vZG9jRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNldEZha2VCb2R5IChib2R5LCBkb2NPdmVyZmxvdykge1xuICBpZiAoYm9keS5mYWtlKSB7XG4gICAgYm9keS5yZW1vdmUoKTtcbiAgICBkb2NFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gZG9jT3ZlcmZsb3c7XG4gICAgLy8gVHJpZ2dlciBsYXlvdXQgc28ga2luZXRpYyBzY3JvbGxpbmcgaXNuJ3QgZGlzYWJsZWQgaW4gaU9TNitcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICBkb2NFbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgfVxufSIsImltcG9ydCB7IGlzTm9kZUxpc3QgfSBmcm9tIFwiLi9pc05vZGVMaXN0LmpzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRBdHRycyhlbHMsIGF0dHJzKSB7XG4gIGVscyA9IChpc05vZGVMaXN0KGVscykgfHwgZWxzIGluc3RhbmNlb2YgQXJyYXkpID8gZWxzIDogW2Vsc107XG4gIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXR0cnMpICE9PSAnW29iamVjdCBPYmplY3RdJykgeyByZXR1cm47IH1cblxuICBmb3IgKHZhciBpID0gZWxzLmxlbmd0aDsgaS0tOykge1xuICAgIGZvcih2YXIga2V5IGluIGF0dHJzKSB7XG4gICAgICBlbHNbaV0uc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSk7XG4gICAgfVxuICB9XG59IiwiaW1wb3J0IHsgZG9jRWxlbWVudCB9IGZyb20gJy4vZG9jRWxlbWVudC5qcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRGYWtlQm9keSAoYm9keSkge1xuICB2YXIgZG9jT3ZlcmZsb3cgPSAnJztcbiAgaWYgKGJvZHkuZmFrZSkge1xuICAgIGRvY092ZXJmbG93ID0gZG9jRWxlbWVudC5zdHlsZS5vdmVyZmxvdztcbiAgICAvL2F2b2lkIGNyYXNoaW5nIElFOCwgaWYgYmFja2dyb3VuZCBpbWFnZSBpcyB1c2VkXG4gICAgYm9keS5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gICAgLy9TYWZhcmkgNS4xMy81LjEuNCBPU1ggc3RvcHMgbG9hZGluZyBpZiA6Oi13ZWJraXQtc2Nyb2xsYmFyIGlzIHVzZWQgYW5kIHNjcm9sbGJhcnMgYXJlIHZpc2libGVcbiAgICBib2R5LnN0eWxlLm92ZXJmbG93ID0gZG9jRWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgIGRvY0VsZW1lbnQuYXBwZW5kQ2hpbGQoYm9keSk7XG4gIH1cblxuICByZXR1cm4gZG9jT3ZlcmZsb3c7XG59IiwiZXhwb3J0IGZ1bmN0aW9uIHNldExvY2FsU3RvcmFnZShzdG9yYWdlLCBrZXksIHZhbHVlLCBhY2Nlc3MpIHtcbiAgaWYgKGFjY2Vzcykge1xuICAgIHRyeSB7IHN0b3JhZ2Uuc2V0SXRlbShrZXksIHZhbHVlKTsgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gdmFsdWU7XG59IiwiZXhwb3J0IGZ1bmN0aW9uIHNob3dFbGVtZW50KGVsLCBmb3JjZUhpZGUpIHtcbiAgaWYgKGVsLnN0eWxlLmRpc3BsYXkgPT09ICdub25lJykgeyBlbC5zdHlsZS5kaXNwbGF5ID0gJyc7IH1cbn0iLCJleHBvcnQgZnVuY3Rpb24gdG9EZWdyZWUgKHksIHgpIHtcbiAgcmV0dXJuIE1hdGguYXRhbjIoeSwgeCkgKiAoMTgwIC8gTWF0aC5QSSk7XG59IiwiZXhwb3J0IGZ1bmN0aW9uIHdoaWNoUHJvcGVydHkocHJvcHMpe1xuICBpZiAodHlwZW9mIHByb3BzID09PSAnc3RyaW5nJykge1xuICAgIHZhciBhcnIgPSBbcHJvcHNdLFxuICAgICAgICBQcm9wcyA9IHByb3BzLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcHJvcHMuc3Vic3RyKDEpLFxuICAgICAgICBwcmVmaXhlcyA9IFsnV2Via2l0JywgJ01veicsICdtcycsICdPJ107XG4gICAgICAgIFxuICAgIHByZWZpeGVzLmZvckVhY2goZnVuY3Rpb24ocHJlZml4KSB7XG4gICAgICBpZiAocHJlZml4ICE9PSAnbXMnIHx8IHByb3BzID09PSAndHJhbnNmb3JtJykge1xuICAgICAgICBhcnIucHVzaChwcmVmaXggKyBQcm9wcyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBwcm9wcyA9IGFycjtcbiAgfVxuXG4gIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zha2VlbGVtZW50JyksXG4gICAgICBsZW4gPSBwcm9wcy5sZW5ndGg7XG4gIGZvcih2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKyl7XG4gICAgdmFyIHByb3AgPSBwcm9wc1tpXTtcbiAgICBpZiggZWwuc3R5bGVbcHJvcF0gIT09IHVuZGVmaW5lZCApeyByZXR1cm4gcHJvcDsgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlOyAvLyBleHBsaWNpdCBmb3IgaWU5LVxufVxuIiwiLy8gT2JqZWN0LmtleXNcbmlmICghT2JqZWN0LmtleXMpIHtcbiAgT2JqZWN0LmtleXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIG5hbWUgaW4gb2JqZWN0KSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgbmFtZSkpIHtcbiAgICAgICAga2V5cy5wdXNoKG5hbWUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ga2V5cztcbiAgfTtcbn1cblxuLy8gQ2hpbGROb2RlLnJlbW92ZVxuaWYoIShcInJlbW92ZVwiIGluIEVsZW1lbnQucHJvdG90eXBlKSl7XG4gIEVsZW1lbnQucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKCl7XG4gICAgaWYodGhpcy5wYXJlbnROb2RlKSB7XG4gICAgICB0aGlzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcyk7XG4gICAgfVxuICB9O1xufVxuXG5pbXBvcnQgeyByYWYgfSBmcm9tICcuL2hlbHBlcnMvcmFmLmpzJztcbmltcG9ydCB7IGNhZiB9IGZyb20gJy4vaGVscGVycy9jYWYuanMnO1xuaW1wb3J0IHsgZXh0ZW5kIH0gZnJvbSAnLi9oZWxwZXJzL2V4dGVuZC5qcyc7XG5pbXBvcnQgeyBjaGVja1N0b3JhZ2VWYWx1ZSB9IGZyb20gJy4vaGVscGVycy9jaGVja1N0b3JhZ2VWYWx1ZS5qcyc7XG5pbXBvcnQgeyBzZXRMb2NhbFN0b3JhZ2UgfSBmcm9tICcuL2hlbHBlcnMvc2V0TG9jYWxTdG9yYWdlLmpzJztcbmltcG9ydCB7IGdldFNsaWRlSWQgfSBmcm9tICcuL2hlbHBlcnMvZ2V0U2xpZGVJZC5qcyc7XG5pbXBvcnQgeyBjYWxjIH0gZnJvbSAnLi9oZWxwZXJzL2NhbGMuanMnO1xuaW1wb3J0IHsgcGVyY2VudGFnZUxheW91dCB9IGZyb20gJy4vaGVscGVycy9wZXJjZW50YWdlTGF5b3V0LmpzJztcbmltcG9ydCB7IG1lZGlhcXVlcnlTdXBwb3J0IH0gZnJvbSAnLi9oZWxwZXJzL21lZGlhcXVlcnlTdXBwb3J0LmpzJztcbmltcG9ydCB7IGNyZWF0ZVN0eWxlU2hlZXQgfSBmcm9tICcuL2hlbHBlcnMvY3JlYXRlU3R5bGVTaGVldC5qcyc7XG5pbXBvcnQgeyBhZGRDU1NSdWxlIH0gZnJvbSAnLi9oZWxwZXJzL2FkZENTU1J1bGUuanMnO1xuaW1wb3J0IHsgcmVtb3ZlQ1NTUnVsZSB9IGZyb20gJy4vaGVscGVycy9yZW1vdmVDU1NSdWxlLmpzJztcbmltcG9ydCB7IGdldENzc1J1bGVzTGVuZ3RoIH0gZnJvbSAnLi9oZWxwZXJzL2dldENzc1J1bGVzTGVuZ3RoLmpzJztcbmltcG9ydCB7IHRvRGVncmVlIH0gZnJvbSAnLi9oZWxwZXJzL3RvRGVncmVlLmpzJztcbmltcG9ydCB7IGdldFRvdWNoRGlyZWN0aW9uIH0gZnJvbSAnLi9oZWxwZXJzL2dldFRvdWNoRGlyZWN0aW9uLmpzJztcbmltcG9ydCB7IGZvckVhY2ggfSBmcm9tICcuL2hlbHBlcnMvZm9yRWFjaC5qcyc7XG5pbXBvcnQgeyBoYXNDbGFzcyB9IGZyb20gJy4vaGVscGVycy9oYXNDbGFzcy5qcyc7XG5pbXBvcnQgeyBhZGRDbGFzcyB9IGZyb20gJy4vaGVscGVycy9hZGRDbGFzcy5qcyc7XG5pbXBvcnQgeyByZW1vdmVDbGFzcyB9IGZyb20gJy4vaGVscGVycy9yZW1vdmVDbGFzcy5qcyc7XG5pbXBvcnQgeyBoYXNBdHRyIH0gZnJvbSAnLi9oZWxwZXJzL2hhc0F0dHIuanMnO1xuaW1wb3J0IHsgZ2V0QXR0ciB9IGZyb20gJy4vaGVscGVycy9nZXRBdHRyLmpzJztcbmltcG9ydCB7IHNldEF0dHJzIH0gZnJvbSAnLi9oZWxwZXJzL3NldEF0dHJzLmpzJztcbmltcG9ydCB7IHJlbW92ZUF0dHJzIH0gZnJvbSAnLi9oZWxwZXJzL3JlbW92ZUF0dHJzLmpzJztcbmltcG9ydCB7IGFycmF5RnJvbU5vZGVMaXN0IH0gZnJvbSAnLi9oZWxwZXJzL2FycmF5RnJvbU5vZGVMaXN0LmpzJztcbmltcG9ydCB7IGhpZGVFbGVtZW50IH0gZnJvbSAnLi9oZWxwZXJzL2hpZGVFbGVtZW50LmpzJztcbmltcG9ydCB7IHNob3dFbGVtZW50IH0gZnJvbSAnLi9oZWxwZXJzL3Nob3dFbGVtZW50LmpzJztcbmltcG9ydCB7IGlzVmlzaWJsZSB9IGZyb20gJy4vaGVscGVycy9pc1Zpc2libGUuanMnO1xuaW1wb3J0IHsgd2hpY2hQcm9wZXJ0eSB9IGZyb20gJy4vaGVscGVycy93aGljaFByb3BlcnR5LmpzJztcbmltcG9ydCB7IGhhczNEVHJhbnNmb3JtcyB9IGZyb20gJy4vaGVscGVycy9oYXMzRFRyYW5zZm9ybXMuanMnO1xuaW1wb3J0IHsgZ2V0RW5kUHJvcGVydHkgfSBmcm9tICcuL2hlbHBlcnMvZ2V0RW5kUHJvcGVydHkuanMnO1xuaW1wb3J0IHsgYWRkRXZlbnRzIH0gZnJvbSAnLi9oZWxwZXJzL2FkZEV2ZW50cy5qcyc7XG5pbXBvcnQgeyByZW1vdmVFdmVudHMgfSBmcm9tICcuL2hlbHBlcnMvcmVtb3ZlRXZlbnRzLmpzJztcbmltcG9ydCB7IEV2ZW50cyB9IGZyb20gJy4vaGVscGVycy9ldmVudHMuanMnO1xuaW1wb3J0IHsganNUcmFuc2Zvcm0gfSBmcm9tICcuL2hlbHBlcnMvanNUcmFuc2Zvcm0uanMnO1xuXG5leHBvcnQgdmFyIHRucyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IGV4dGVuZCh7XG4gICAgY29udGFpbmVyOiAnLnNsaWRlcicsXG4gICAgbW9kZTogJ2Nhcm91c2VsJyxcbiAgICBheGlzOiAnaG9yaXpvbnRhbCcsXG4gICAgaXRlbXM6IDEsXG4gICAgZ3V0dGVyOiAwLFxuICAgIGVkZ2VQYWRkaW5nOiAwLFxuICAgIGZpeGVkV2lkdGg6IGZhbHNlLFxuICAgIGF1dG9XaWR0aDogZmFsc2UsXG4gICAgdmlld3BvcnRNYXg6IGZhbHNlLFxuICAgIHNsaWRlQnk6IDEsXG4gICAgY2VudGVyOiBmYWxzZSxcbiAgICBjb250cm9sczogdHJ1ZSxcbiAgICBjb250cm9sc1Bvc2l0aW9uOiAndG9wJyxcbiAgICBjb250cm9sc1RleHQ6IFsncHJldicsICduZXh0J10sXG4gICAgY29udHJvbHNDb250YWluZXI6IGZhbHNlLFxuICAgIHByZXZCdXR0b246IGZhbHNlLFxuICAgIG5leHRCdXR0b246IGZhbHNlLFxuICAgIG5hdjogdHJ1ZSxcbiAgICBuYXZQb3NpdGlvbjogJ3RvcCcsXG4gICAgbmF2Q29udGFpbmVyOiBmYWxzZSxcbiAgICBuYXZBc1RodW1ibmFpbHM6IGZhbHNlLFxuICAgIGFycm93S2V5czogZmFsc2UsXG4gICAgc3BlZWQ6IDMwMCxcbiAgICBhdXRvcGxheTogZmFsc2UsXG4gICAgYXV0b3BsYXlQb3NpdGlvbjogJ3RvcCcsXG4gICAgYXV0b3BsYXlUaW1lb3V0OiA1MDAwLFxuICAgIGF1dG9wbGF5RGlyZWN0aW9uOiAnZm9yd2FyZCcsXG4gICAgYXV0b3BsYXlUZXh0OiBbJ3N0YXJ0JywgJ3N0b3AnXSxcbiAgICBhdXRvcGxheUhvdmVyUGF1c2U6IGZhbHNlLFxuICAgIGF1dG9wbGF5QnV0dG9uOiBmYWxzZSxcbiAgICBhdXRvcGxheUJ1dHRvbk91dHB1dDogdHJ1ZSxcbiAgICBhdXRvcGxheVJlc2V0T25WaXNpYmlsaXR5OiB0cnVlLFxuICAgIGFuaW1hdGVJbjogJ3Rucy1mYWRlSW4nLFxuICAgIGFuaW1hdGVPdXQ6ICd0bnMtZmFkZU91dCcsXG4gICAgYW5pbWF0ZU5vcm1hbDogJ3Rucy1ub3JtYWwnLFxuICAgIGFuaW1hdGVEZWxheTogZmFsc2UsXG4gICAgbG9vcDogdHJ1ZSxcbiAgICByZXdpbmQ6IGZhbHNlLFxuICAgIGF1dG9IZWlnaHQ6IGZhbHNlLFxuICAgIHJlc3BvbnNpdmU6IGZhbHNlLFxuICAgIGxhenlsb2FkOiBmYWxzZSxcbiAgICBsYXp5bG9hZFNlbGVjdG9yOiAnLnRucy1sYXp5LWltZycsXG4gICAgdG91Y2g6IHRydWUsXG4gICAgbW91c2VEcmFnOiBmYWxzZSxcbiAgICBzd2lwZUFuZ2xlOiAxNSxcbiAgICBuZXN0ZWQ6IGZhbHNlLFxuICAgIHByZXZlbnRBY3Rpb25XaGVuUnVubmluZzogZmFsc2UsXG4gICAgcHJldmVudFNjcm9sbE9uVG91Y2g6IGZhbHNlLFxuICAgIGZyZWV6YWJsZTogdHJ1ZSxcbiAgICBvbkluaXQ6IGZhbHNlLFxuICAgIHVzZUxvY2FsU3RvcmFnZTogdHJ1ZSxcbiAgICBub25jZTogZmFsc2VcbiAgfSwgb3B0aW9ucyB8fCB7fSk7XG5cbiAgdmFyIGRvYyA9IGRvY3VtZW50LFxuICAgICAgd2luID0gd2luZG93LFxuICAgICAgS0VZUyA9IHtcbiAgICAgICAgRU5URVI6IDEzLFxuICAgICAgICBTUEFDRTogMzIsXG4gICAgICAgIExFRlQ6IDM3LFxuICAgICAgICBSSUdIVDogMzlcbiAgICAgIH0sXG4gICAgICB0bnNTdG9yYWdlID0ge30sXG4gICAgICBsb2NhbFN0b3JhZ2VBY2Nlc3MgPSBvcHRpb25zLnVzZUxvY2FsU3RvcmFnZTtcblxuICBpZiAobG9jYWxTdG9yYWdlQWNjZXNzKSB7XG4gICAgLy8gY2hlY2sgYnJvd3NlciB2ZXJzaW9uIGFuZCBsb2NhbCBzdG9yYWdlIGFjY2Vzc1xuICAgIHZhciBicm93c2VySW5mbyA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XG4gICAgdmFyIHVpZCA9IG5ldyBEYXRlO1xuXG4gICAgdHJ5IHtcbiAgICAgIHRuc1N0b3JhZ2UgPSB3aW4ubG9jYWxTdG9yYWdlO1xuICAgICAgaWYgKHRuc1N0b3JhZ2UpIHtcbiAgICAgICAgdG5zU3RvcmFnZS5zZXRJdGVtKHVpZCwgdWlkKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlQWNjZXNzID0gdG5zU3RvcmFnZS5nZXRJdGVtKHVpZCkgPT0gdWlkO1xuICAgICAgICB0bnNTdG9yYWdlLnJlbW92ZUl0ZW0odWlkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZUFjY2VzcyA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKCFsb2NhbFN0b3JhZ2VBY2Nlc3MpIHsgdG5zU3RvcmFnZSA9IHt9OyB9XG4gICAgfSBjYXRjaChlKSB7XG4gICAgICBsb2NhbFN0b3JhZ2VBY2Nlc3MgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAobG9jYWxTdG9yYWdlQWNjZXNzKSB7XG4gICAgICAvLyByZW1vdmUgc3RvcmFnZSB3aGVuIGJyb3dzZXIgdmVyc2lvbiBjaGFuZ2VzXG4gICAgICBpZiAodG5zU3RvcmFnZVsndG5zQXBwJ10gJiYgdG5zU3RvcmFnZVsndG5zQXBwJ10gIT09IGJyb3dzZXJJbmZvKSB7XG4gICAgICAgIFsndEMnLCAndFBMJywgJ3RNUScsICd0VGYnLCAndDNEJywgJ3RURHUnLCAndFREZScsICd0QUR1JywgJ3RBRGUnLCAndFRFJywgJ3RBRSddLmZvckVhY2goZnVuY3Rpb24oaXRlbSkgeyB0bnNTdG9yYWdlLnJlbW92ZUl0ZW0oaXRlbSk7IH0pO1xuICAgICAgfVxuICAgICAgLy8gdXBkYXRlIGJyb3dzZXJJbmZvXG4gICAgICBsb2NhbFN0b3JhZ2VbJ3Ruc0FwcCddID0gYnJvd3NlckluZm87XG4gICAgfVxuICB9XG5cbiAgdmFyIENBTEMgPSB0bnNTdG9yYWdlWyd0QyddID8gY2hlY2tTdG9yYWdlVmFsdWUodG5zU3RvcmFnZVsndEMnXSkgOiBzZXRMb2NhbFN0b3JhZ2UodG5zU3RvcmFnZSwgJ3RDJywgY2FsYygpLCBsb2NhbFN0b3JhZ2VBY2Nlc3MpLFxuICAgICAgUEVSQ0VOVEFHRUxBWU9VVCA9IHRuc1N0b3JhZ2VbJ3RQTCddID8gY2hlY2tTdG9yYWdlVmFsdWUodG5zU3RvcmFnZVsndFBMJ10pIDogc2V0TG9jYWxTdG9yYWdlKHRuc1N0b3JhZ2UsICd0UEwnLCBwZXJjZW50YWdlTGF5b3V0KCksIGxvY2FsU3RvcmFnZUFjY2VzcyksXG4gICAgICBDU1NNUSA9IHRuc1N0b3JhZ2VbJ3RNUSddID8gY2hlY2tTdG9yYWdlVmFsdWUodG5zU3RvcmFnZVsndE1RJ10pIDogc2V0TG9jYWxTdG9yYWdlKHRuc1N0b3JhZ2UsICd0TVEnLCBtZWRpYXF1ZXJ5U3VwcG9ydCgpLCBsb2NhbFN0b3JhZ2VBY2Nlc3MpLFxuICAgICAgVFJBTlNGT1JNID0gdG5zU3RvcmFnZVsndFRmJ10gPyBjaGVja1N0b3JhZ2VWYWx1ZSh0bnNTdG9yYWdlWyd0VGYnXSkgOiBzZXRMb2NhbFN0b3JhZ2UodG5zU3RvcmFnZSwgJ3RUZicsIHdoaWNoUHJvcGVydHkoJ3RyYW5zZm9ybScpLCBsb2NhbFN0b3JhZ2VBY2Nlc3MpLFxuICAgICAgSEFTM0RUUkFOU0ZPUk1TID0gdG5zU3RvcmFnZVsndDNEJ10gPyBjaGVja1N0b3JhZ2VWYWx1ZSh0bnNTdG9yYWdlWyd0M0QnXSkgOiBzZXRMb2NhbFN0b3JhZ2UodG5zU3RvcmFnZSwgJ3QzRCcsIGhhczNEVHJhbnNmb3JtcyhUUkFOU0ZPUk0pLCBsb2NhbFN0b3JhZ2VBY2Nlc3MpLFxuICAgICAgVFJBTlNJVElPTkRVUkFUSU9OID0gdG5zU3RvcmFnZVsndFREdSddID8gY2hlY2tTdG9yYWdlVmFsdWUodG5zU3RvcmFnZVsndFREdSddKSA6IHNldExvY2FsU3RvcmFnZSh0bnNTdG9yYWdlLCAndFREdScsIHdoaWNoUHJvcGVydHkoJ3RyYW5zaXRpb25EdXJhdGlvbicpLCBsb2NhbFN0b3JhZ2VBY2Nlc3MpLFxuICAgICAgVFJBTlNJVElPTkRFTEFZID0gdG5zU3RvcmFnZVsndFREZSddID8gY2hlY2tTdG9yYWdlVmFsdWUodG5zU3RvcmFnZVsndFREZSddKSA6IHNldExvY2FsU3RvcmFnZSh0bnNTdG9yYWdlLCAndFREZScsIHdoaWNoUHJvcGVydHkoJ3RyYW5zaXRpb25EZWxheScpLCBsb2NhbFN0b3JhZ2VBY2Nlc3MpLFxuICAgICAgQU5JTUFUSU9ORFVSQVRJT04gPSB0bnNTdG9yYWdlWyd0QUR1J10gPyBjaGVja1N0b3JhZ2VWYWx1ZSh0bnNTdG9yYWdlWyd0QUR1J10pIDogc2V0TG9jYWxTdG9yYWdlKHRuc1N0b3JhZ2UsICd0QUR1Jywgd2hpY2hQcm9wZXJ0eSgnYW5pbWF0aW9uRHVyYXRpb24nKSwgbG9jYWxTdG9yYWdlQWNjZXNzKSxcbiAgICAgIEFOSU1BVElPTkRFTEFZID0gdG5zU3RvcmFnZVsndEFEZSddID8gY2hlY2tTdG9yYWdlVmFsdWUodG5zU3RvcmFnZVsndEFEZSddKSA6IHNldExvY2FsU3RvcmFnZSh0bnNTdG9yYWdlLCAndEFEZScsIHdoaWNoUHJvcGVydHkoJ2FuaW1hdGlvbkRlbGF5JyksIGxvY2FsU3RvcmFnZUFjY2VzcyksXG4gICAgICBUUkFOU0lUSU9ORU5EID0gdG5zU3RvcmFnZVsndFRFJ10gPyBjaGVja1N0b3JhZ2VWYWx1ZSh0bnNTdG9yYWdlWyd0VEUnXSkgOiBzZXRMb2NhbFN0b3JhZ2UodG5zU3RvcmFnZSwgJ3RURScsIGdldEVuZFByb3BlcnR5KFRSQU5TSVRJT05EVVJBVElPTiwgJ1RyYW5zaXRpb24nKSwgbG9jYWxTdG9yYWdlQWNjZXNzKSxcbiAgICAgIEFOSU1BVElPTkVORCA9IHRuc1N0b3JhZ2VbJ3RBRSddID8gY2hlY2tTdG9yYWdlVmFsdWUodG5zU3RvcmFnZVsndEFFJ10pIDogc2V0TG9jYWxTdG9yYWdlKHRuc1N0b3JhZ2UsICd0QUUnLCBnZXRFbmRQcm9wZXJ0eShBTklNQVRJT05EVVJBVElPTiwgJ0FuaW1hdGlvbicpLCBsb2NhbFN0b3JhZ2VBY2Nlc3MpO1xuXG4gIC8vIGdldCBlbGVtZW50IG5vZGVzIGZyb20gc2VsZWN0b3JzXG4gIHZhciBzdXBwb3J0Q29uc29sZVdhcm4gPSB3aW4uY29uc29sZSAmJiB0eXBlb2Ygd2luLmNvbnNvbGUud2FybiA9PT0gXCJmdW5jdGlvblwiLFxuICAgICAgdG5zTGlzdCA9IFsnY29udGFpbmVyJywgJ2NvbnRyb2xzQ29udGFpbmVyJywgJ3ByZXZCdXR0b24nLCAnbmV4dEJ1dHRvbicsICduYXZDb250YWluZXInLCAnYXV0b3BsYXlCdXR0b24nXSxcbiAgICAgIG9wdGlvbnNFbGVtZW50cyA9IHt9O1xuXG4gIHRuc0xpc3QuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zW2l0ZW1dID09PSAnc3RyaW5nJykge1xuICAgICAgdmFyIHN0ciA9IG9wdGlvbnNbaXRlbV0sXG4gICAgICAgICAgZWwgPSBkb2MucXVlcnlTZWxlY3RvcihzdHIpO1xuICAgICAgb3B0aW9uc0VsZW1lbnRzW2l0ZW1dID0gc3RyO1xuXG4gICAgICBpZiAoZWwgJiYgZWwubm9kZU5hbWUpIHtcbiAgICAgICAgb3B0aW9uc1tpdGVtXSA9IGVsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHN1cHBvcnRDb25zb2xlV2FybikgeyBjb25zb2xlLndhcm4oJ0NhblxcJ3QgZmluZCcsIG9wdGlvbnNbaXRlbV0pOyB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIC8vIG1ha2Ugc3VyZSBhdCBsZWFzdCAxIHNsaWRlXG4gIGlmIChvcHRpb25zLmNvbnRhaW5lci5jaGlsZHJlbi5sZW5ndGggPCAxKSB7XG4gICAgaWYgKHN1cHBvcnRDb25zb2xlV2FybikgeyBjb25zb2xlLndhcm4oJ05vIHNsaWRlcyBmb3VuZCBpbicsIG9wdGlvbnMuY29udGFpbmVyKTsgfVxuICAgIHJldHVybjtcbiAgIH1cblxuICAvLyB1cGRhdGUgb3B0aW9uc1xuICB2YXIgcmVzcG9uc2l2ZSA9IG9wdGlvbnMucmVzcG9uc2l2ZSxcbiAgICAgIG5lc3RlZCA9IG9wdGlvbnMubmVzdGVkLFxuICAgICAgY2Fyb3VzZWwgPSBvcHRpb25zLm1vZGUgPT09ICdjYXJvdXNlbCcgPyB0cnVlIDogZmFsc2U7XG5cbiAgaWYgKHJlc3BvbnNpdmUpIHtcbiAgICAvLyBhcHBseSByZXNwb25zaXZlWzBdIHRvIG9wdGlvbnMgYW5kIHJlbW92ZSBpdFxuICAgIGlmICgwIGluIHJlc3BvbnNpdmUpIHtcbiAgICAgIG9wdGlvbnMgPSBleHRlbmQob3B0aW9ucywgcmVzcG9uc2l2ZVswXSk7XG4gICAgICBkZWxldGUgcmVzcG9uc2l2ZVswXTtcbiAgICB9XG5cbiAgICB2YXIgcmVzcG9uc2l2ZVRlbSA9IHt9O1xuICAgIGZvciAodmFyIGtleSBpbiByZXNwb25zaXZlKSB7XG4gICAgICB2YXIgdmFsID0gcmVzcG9uc2l2ZVtrZXldO1xuICAgICAgLy8gdXBkYXRlIHJlc3BvbnNpdmVcbiAgICAgIC8vIGZyb206IDMwMDogMlxuICAgICAgLy8gdG86XG4gICAgICAvLyAgIDMwMDoge1xuICAgICAgLy8gICAgIGl0ZW1zOiAyXG4gICAgICAvLyAgIH1cbiAgICAgIHZhbCA9IHR5cGVvZiB2YWwgPT09ICdudW1iZXInID8ge2l0ZW1zOiB2YWx9IDogdmFsO1xuICAgICAgcmVzcG9uc2l2ZVRlbVtrZXldID0gdmFsO1xuICAgIH1cbiAgICByZXNwb25zaXZlID0gcmVzcG9uc2l2ZVRlbTtcbiAgICByZXNwb25zaXZlVGVtID0gbnVsbDtcbiAgfVxuXG4gIC8vIHVwZGF0ZSBvcHRpb25zXG4gIGZ1bmN0aW9uIHVwZGF0ZU9wdGlvbnMgKG9iaikge1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgIGlmICghY2Fyb3VzZWwpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gJ3NsaWRlQnknKSB7IG9ialtrZXldID0gJ3BhZ2UnOyB9XG4gICAgICAgIGlmIChrZXkgPT09ICdlZGdlUGFkZGluZycpIHsgb2JqW2tleV0gPSBmYWxzZTsgfVxuICAgICAgICBpZiAoa2V5ID09PSAnYXV0b0hlaWdodCcpIHsgb2JqW2tleV0gPSBmYWxzZTsgfVxuICAgICAgfVxuXG4gICAgICAvLyB1cGRhdGUgcmVzcG9uc2l2ZSBvcHRpb25zXG4gICAgICBpZiAoa2V5ID09PSAncmVzcG9uc2l2ZScpIHsgdXBkYXRlT3B0aW9ucyhvYmpba2V5XSk7IH1cbiAgICB9XG4gIH1cbiAgaWYgKCFjYXJvdXNlbCkgeyB1cGRhdGVPcHRpb25zKG9wdGlvbnMpOyB9XG5cblxuICAvLyA9PT0gZGVmaW5lIGFuZCBzZXQgdmFyaWFibGVzID09PVxuICBpZiAoIWNhcm91c2VsKSB7XG4gICAgb3B0aW9ucy5heGlzID0gJ2hvcml6b250YWwnO1xuICAgIG9wdGlvbnMuc2xpZGVCeSA9ICdwYWdlJztcbiAgICBvcHRpb25zLmVkZ2VQYWRkaW5nID0gZmFsc2U7XG5cbiAgICB2YXIgYW5pbWF0ZUluID0gb3B0aW9ucy5hbmltYXRlSW4sXG4gICAgICAgIGFuaW1hdGVPdXQgPSBvcHRpb25zLmFuaW1hdGVPdXQsXG4gICAgICAgIGFuaW1hdGVEZWxheSA9IG9wdGlvbnMuYW5pbWF0ZURlbGF5LFxuICAgICAgICBhbmltYXRlTm9ybWFsID0gb3B0aW9ucy5hbmltYXRlTm9ybWFsO1xuICB9XG5cbiAgdmFyIGhvcml6b250YWwgPSBvcHRpb25zLmF4aXMgPT09ICdob3Jpem9udGFsJyA/IHRydWUgOiBmYWxzZSxcbiAgICAgIG91dGVyV3JhcHBlciA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICAgIGlubmVyV3JhcHBlciA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICAgIG1pZGRsZVdyYXBwZXIsXG4gICAgICBjb250YWluZXIgPSBvcHRpb25zLmNvbnRhaW5lcixcbiAgICAgIGNvbnRhaW5lclBhcmVudCA9IGNvbnRhaW5lci5wYXJlbnROb2RlLFxuICAgICAgY29udGFpbmVySFRNTCA9IGNvbnRhaW5lci5vdXRlckhUTUwsXG4gICAgICBzbGlkZUl0ZW1zID0gY29udGFpbmVyLmNoaWxkcmVuLFxuICAgICAgc2xpZGVDb3VudCA9IHNsaWRlSXRlbXMubGVuZ3RoLFxuICAgICAgYnJlYWtwb2ludFpvbmUsXG4gICAgICB3aW5kb3dXaWR0aCA9IGdldFdpbmRvd1dpZHRoKCksXG4gICAgICBpc09uID0gZmFsc2U7XG4gIGlmIChyZXNwb25zaXZlKSB7IHNldEJyZWFrcG9pbnRab25lKCk7IH1cbiAgaWYgKGNhcm91c2VsKSB7IGNvbnRhaW5lci5jbGFzc05hbWUgKz0gJyB0bnMtdnBmaXgnOyB9XG5cbiAgLy8gZml4ZWRXaWR0aDogdmlld3BvcnQgPiByaWdodEJvdW5kYXJ5ID4gaW5kZXhNYXhcbiAgdmFyIGF1dG9XaWR0aCA9IG9wdGlvbnMuYXV0b1dpZHRoLFxuICAgICAgZml4ZWRXaWR0aCA9IGdldE9wdGlvbignZml4ZWRXaWR0aCcpLFxuICAgICAgZWRnZVBhZGRpbmcgPSBnZXRPcHRpb24oJ2VkZ2VQYWRkaW5nJyksXG4gICAgICBndXR0ZXIgPSBnZXRPcHRpb24oJ2d1dHRlcicpLFxuICAgICAgdmlld3BvcnQgPSBnZXRWaWV3cG9ydFdpZHRoKCksXG4gICAgICBjZW50ZXIgPSBnZXRPcHRpb24oJ2NlbnRlcicpLFxuICAgICAgaXRlbXMgPSAhYXV0b1dpZHRoID8gTWF0aC5mbG9vcihnZXRPcHRpb24oJ2l0ZW1zJykpIDogMSxcbiAgICAgIHNsaWRlQnkgPSBnZXRPcHRpb24oJ3NsaWRlQnknKSxcbiAgICAgIHZpZXdwb3J0TWF4ID0gb3B0aW9ucy52aWV3cG9ydE1heCB8fCBvcHRpb25zLmZpeGVkV2lkdGhWaWV3cG9ydFdpZHRoLFxuICAgICAgYXJyb3dLZXlzID0gZ2V0T3B0aW9uKCdhcnJvd0tleXMnKSxcbiAgICAgIHNwZWVkID0gZ2V0T3B0aW9uKCdzcGVlZCcpLFxuICAgICAgcmV3aW5kID0gb3B0aW9ucy5yZXdpbmQsXG4gICAgICBsb29wID0gcmV3aW5kID8gZmFsc2UgOiBvcHRpb25zLmxvb3AsXG4gICAgICBhdXRvSGVpZ2h0ID0gZ2V0T3B0aW9uKCdhdXRvSGVpZ2h0JyksXG4gICAgICBjb250cm9scyA9IGdldE9wdGlvbignY29udHJvbHMnKSxcbiAgICAgIGNvbnRyb2xzVGV4dCA9IGdldE9wdGlvbignY29udHJvbHNUZXh0JyksXG4gICAgICBuYXYgPSBnZXRPcHRpb24oJ25hdicpLFxuICAgICAgdG91Y2ggPSBnZXRPcHRpb24oJ3RvdWNoJyksXG4gICAgICBtb3VzZURyYWcgPSBnZXRPcHRpb24oJ21vdXNlRHJhZycpLFxuICAgICAgYXV0b3BsYXkgPSBnZXRPcHRpb24oJ2F1dG9wbGF5JyksXG4gICAgICBhdXRvcGxheVRpbWVvdXQgPSBnZXRPcHRpb24oJ2F1dG9wbGF5VGltZW91dCcpLFxuICAgICAgYXV0b3BsYXlUZXh0ID0gZ2V0T3B0aW9uKCdhdXRvcGxheVRleHQnKSxcbiAgICAgIGF1dG9wbGF5SG92ZXJQYXVzZSA9IGdldE9wdGlvbignYXV0b3BsYXlIb3ZlclBhdXNlJyksXG4gICAgICBhdXRvcGxheVJlc2V0T25WaXNpYmlsaXR5ID0gZ2V0T3B0aW9uKCdhdXRvcGxheVJlc2V0T25WaXNpYmlsaXR5JyksXG4gICAgICBzaGVldCA9IGNyZWF0ZVN0eWxlU2hlZXQobnVsbCwgZ2V0T3B0aW9uKCdub25jZScpKSxcbiAgICAgIGxhenlsb2FkID0gb3B0aW9ucy5sYXp5bG9hZCxcbiAgICAgIGxhenlsb2FkU2VsZWN0b3IgPSBvcHRpb25zLmxhenlsb2FkU2VsZWN0b3IsXG4gICAgICBzbGlkZVBvc2l0aW9ucywgLy8gY29sbGVjdGlvbiBvZiBzbGlkZSBwb3NpdGlvbnNcbiAgICAgIHNsaWRlSXRlbXNPdXQgPSBbXSxcbiAgICAgIGNsb25lQ291bnQgPSBsb29wID8gZ2V0Q2xvbmVDb3VudEZvckxvb3AoKSA6IDAsXG4gICAgICBzbGlkZUNvdW50TmV3ID0gIWNhcm91c2VsID8gc2xpZGVDb3VudCArIGNsb25lQ291bnQgOiBzbGlkZUNvdW50ICsgY2xvbmVDb3VudCAqIDIsXG4gICAgICBoYXNSaWdodERlYWRab25lID0gKGZpeGVkV2lkdGggfHwgYXV0b1dpZHRoKSAmJiAhbG9vcCA/IHRydWUgOiBmYWxzZSxcbiAgICAgIHJpZ2h0Qm91bmRhcnkgPSBmaXhlZFdpZHRoID8gZ2V0UmlnaHRCb3VuZGFyeSgpIDogbnVsbCxcbiAgICAgIHVwZGF0ZUluZGV4QmVmb3JlVHJhbnNmb3JtID0gKCFjYXJvdXNlbCB8fCAhbG9vcCkgPyB0cnVlIDogZmFsc2UsXG4gICAgICAvLyB0cmFuc2Zvcm1cbiAgICAgIHRyYW5zZm9ybUF0dHIgPSBob3Jpem9udGFsID8gJ2xlZnQnIDogJ3RvcCcsXG4gICAgICB0cmFuc2Zvcm1QcmVmaXggPSAnJyxcbiAgICAgIHRyYW5zZm9ybVBvc3RmaXggPSAnJyxcbiAgICAgIC8vIGluZGV4XG4gICAgICBnZXRJbmRleE1heCA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChmaXhlZFdpZHRoKSB7XG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkgeyByZXR1cm4gY2VudGVyICYmICFsb29wID8gc2xpZGVDb3VudCAtIDEgOiBNYXRoLmNlaWwoLSByaWdodEJvdW5kYXJ5IC8gKGZpeGVkV2lkdGggKyBndXR0ZXIpKTsgfTtcbiAgICAgICAgfSBlbHNlIGlmIChhdXRvV2lkdGgpIHtcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlQ291bnROZXc7IGkrKykge1xuICAgICAgICAgICAgICBpZiAoc2xpZGVQb3NpdGlvbnNbaV0gPj0gLSByaWdodEJvdW5kYXJ5KSB7IHJldHVybiBpOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoY2VudGVyICYmIGNhcm91c2VsICYmICFsb29wKSB7XG4gICAgICAgICAgICAgIHJldHVybiBzbGlkZUNvdW50IC0gMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiBsb29wIHx8IGNhcm91c2VsID8gTWF0aC5tYXgoMCwgc2xpZGVDb3VudE5ldyAtIE1hdGguY2VpbChpdGVtcykpIDogc2xpZGVDb3VudE5ldyAtIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfSkoKSxcbiAgICAgIGluZGV4ID0gZ2V0U3RhcnRJbmRleChnZXRPcHRpb24oJ3N0YXJ0SW5kZXgnKSksXG4gICAgICBpbmRleENhY2hlZCA9IGluZGV4LFxuICAgICAgZGlzcGxheUluZGV4ID0gZ2V0Q3VycmVudFNsaWRlKCksXG4gICAgICBpbmRleE1pbiA9IDAsXG4gICAgICBpbmRleE1heCA9ICFhdXRvV2lkdGggPyBnZXRJbmRleE1heCgpIDogbnVsbCxcbiAgICAgIC8vIHJlc2l6ZVxuICAgICAgcmVzaXplVGltZXIsXG4gICAgICBwcmV2ZW50QWN0aW9uV2hlblJ1bm5pbmcgPSBvcHRpb25zLnByZXZlbnRBY3Rpb25XaGVuUnVubmluZyxcbiAgICAgIHN3aXBlQW5nbGUgPSBvcHRpb25zLnN3aXBlQW5nbGUsXG4gICAgICBtb3ZlRGlyZWN0aW9uRXhwZWN0ZWQgPSBzd2lwZUFuZ2xlID8gJz8nIDogdHJ1ZSxcbiAgICAgIHJ1bm5pbmcgPSBmYWxzZSxcbiAgICAgIG9uSW5pdCA9IG9wdGlvbnMub25Jbml0LFxuICAgICAgZXZlbnRzID0gbmV3IEV2ZW50cygpLFxuICAgICAgLy8gaWQsIGNsYXNzXG4gICAgICBuZXdDb250YWluZXJDbGFzc2VzID0gJyB0bnMtc2xpZGVyIHRucy0nICsgb3B0aW9ucy5tb2RlLFxuICAgICAgc2xpZGVJZCA9IGNvbnRhaW5lci5pZCB8fCBnZXRTbGlkZUlkKCksXG4gICAgICBkaXNhYmxlID0gZ2V0T3B0aW9uKCdkaXNhYmxlJyksXG4gICAgICBkaXNhYmxlZCA9IGZhbHNlLFxuICAgICAgZnJlZXphYmxlID0gb3B0aW9ucy5mcmVlemFibGUsXG4gICAgICBmcmVlemUgPSBmcmVlemFibGUgJiYgIWF1dG9XaWR0aCA/IGdldEZyZWV6ZSgpIDogZmFsc2UsXG4gICAgICBmcm96ZW4gPSBmYWxzZSxcbiAgICAgIGNvbnRyb2xzRXZlbnRzID0ge1xuICAgICAgICAnY2xpY2snOiBvbkNvbnRyb2xzQ2xpY2ssXG4gICAgICAgICdrZXlkb3duJzogb25Db250cm9sc0tleWRvd25cbiAgICAgIH0sXG4gICAgICBuYXZFdmVudHMgPSB7XG4gICAgICAgICdjbGljayc6IG9uTmF2Q2xpY2ssXG4gICAgICAgICdrZXlkb3duJzogb25OYXZLZXlkb3duXG4gICAgICB9LFxuICAgICAgaG92ZXJFdmVudHMgPSB7XG4gICAgICAgICdtb3VzZW92ZXInOiBtb3VzZW92ZXJQYXVzZSxcbiAgICAgICAgJ21vdXNlb3V0JzogbW91c2VvdXRSZXN0YXJ0XG4gICAgICB9LFxuICAgICAgdmlzaWJpbGl0eUV2ZW50ID0geyd2aXNpYmlsaXR5Y2hhbmdlJzogb25WaXNpYmlsaXR5Q2hhbmdlfSxcbiAgICAgIGRvY21lbnRLZXlkb3duRXZlbnQgPSB7J2tleWRvd24nOiBvbkRvY3VtZW50S2V5ZG93bn0sXG4gICAgICB0b3VjaEV2ZW50cyA9IHtcbiAgICAgICAgJ3RvdWNoc3RhcnQnOiBvblBhblN0YXJ0LFxuICAgICAgICAndG91Y2htb3ZlJzogb25QYW5Nb3ZlLFxuICAgICAgICAndG91Y2hlbmQnOiBvblBhbkVuZCxcbiAgICAgICAgJ3RvdWNoY2FuY2VsJzogb25QYW5FbmRcbiAgICAgIH0sIGRyYWdFdmVudHMgPSB7XG4gICAgICAgICdtb3VzZWRvd24nOiBvblBhblN0YXJ0LFxuICAgICAgICAnbW91c2Vtb3ZlJzogb25QYW5Nb3ZlLFxuICAgICAgICAnbW91c2V1cCc6IG9uUGFuRW5kLFxuICAgICAgICAnbW91c2VsZWF2ZSc6IG9uUGFuRW5kXG4gICAgICB9LFxuICAgICAgaGFzQ29udHJvbHMgPSBoYXNPcHRpb24oJ2NvbnRyb2xzJyksXG4gICAgICBoYXNOYXYgPSBoYXNPcHRpb24oJ25hdicpLFxuICAgICAgbmF2QXNUaHVtYm5haWxzID0gYXV0b1dpZHRoID8gdHJ1ZSA6IG9wdGlvbnMubmF2QXNUaHVtYm5haWxzLFxuICAgICAgaGFzQXV0b3BsYXkgPSBoYXNPcHRpb24oJ2F1dG9wbGF5JyksXG4gICAgICBoYXNUb3VjaCA9IGhhc09wdGlvbigndG91Y2gnKSxcbiAgICAgIGhhc01vdXNlRHJhZyA9IGhhc09wdGlvbignbW91c2VEcmFnJyksXG4gICAgICBzbGlkZUFjdGl2ZUNsYXNzID0gJ3Rucy1zbGlkZS1hY3RpdmUnLFxuICAgICAgc2xpZGVDbG9uZWRDbGFzcyA9ICd0bnMtc2xpZGUtY2xvbmVkJyxcbiAgICAgIGltZ0NvbXBsZXRlQ2xhc3MgPSAndG5zLWNvbXBsZXRlJyxcbiAgICAgIGltZ0V2ZW50cyA9IHtcbiAgICAgICAgJ2xvYWQnOiBvbkltZ0xvYWRlZCxcbiAgICAgICAgJ2Vycm9yJzogb25JbWdGYWlsZWRcbiAgICAgIH0sXG4gICAgICBpbWdzQ29tcGxldGUsXG4gICAgICBsaXZlcmVnaW9uQ3VycmVudCxcbiAgICAgIHByZXZlbnRTY3JvbGwgPSBvcHRpb25zLnByZXZlbnRTY3JvbGxPblRvdWNoID09PSAnZm9yY2UnID8gdHJ1ZSA6IGZhbHNlO1xuXG4gIC8vIGNvbnRyb2xzXG4gIGlmIChoYXNDb250cm9scykge1xuICAgIHZhciBjb250cm9sc0NvbnRhaW5lciA9IG9wdGlvbnMuY29udHJvbHNDb250YWluZXIsXG4gICAgICAgIGNvbnRyb2xzQ29udGFpbmVySFRNTCA9IG9wdGlvbnMuY29udHJvbHNDb250YWluZXIgPyBvcHRpb25zLmNvbnRyb2xzQ29udGFpbmVyLm91dGVySFRNTCA6ICcnLFxuICAgICAgICBwcmV2QnV0dG9uID0gb3B0aW9ucy5wcmV2QnV0dG9uLFxuICAgICAgICBuZXh0QnV0dG9uID0gb3B0aW9ucy5uZXh0QnV0dG9uLFxuICAgICAgICBwcmV2QnV0dG9uSFRNTCA9IG9wdGlvbnMucHJldkJ1dHRvbiA/IG9wdGlvbnMucHJldkJ1dHRvbi5vdXRlckhUTUwgOiAnJyxcbiAgICAgICAgbmV4dEJ1dHRvbkhUTUwgPSBvcHRpb25zLm5leHRCdXR0b24gPyBvcHRpb25zLm5leHRCdXR0b24ub3V0ZXJIVE1MIDogJycsXG4gICAgICAgIHByZXZJc0J1dHRvbixcbiAgICAgICAgbmV4dElzQnV0dG9uO1xuICB9XG5cbiAgLy8gbmF2XG4gIGlmIChoYXNOYXYpIHtcbiAgICB2YXIgbmF2Q29udGFpbmVyID0gb3B0aW9ucy5uYXZDb250YWluZXIsXG4gICAgICAgIG5hdkNvbnRhaW5lckhUTUwgPSBvcHRpb25zLm5hdkNvbnRhaW5lciA/IG9wdGlvbnMubmF2Q29udGFpbmVyLm91dGVySFRNTCA6ICcnLFxuICAgICAgICBuYXZJdGVtcyxcbiAgICAgICAgcGFnZXMgPSBhdXRvV2lkdGggPyBzbGlkZUNvdW50IDogZ2V0UGFnZXMoKSxcbiAgICAgICAgcGFnZXNDYWNoZWQgPSAwLFxuICAgICAgICBuYXZDbGlja2VkID0gLTEsXG4gICAgICAgIG5hdkN1cnJlbnRJbmRleCA9IGdldEN1cnJlbnROYXZJbmRleCgpLFxuICAgICAgICBuYXZDdXJyZW50SW5kZXhDYWNoZWQgPSBuYXZDdXJyZW50SW5kZXgsXG4gICAgICAgIG5hdkFjdGl2ZUNsYXNzID0gJ3Rucy1uYXYtYWN0aXZlJyxcbiAgICAgICAgbmF2U3RyID0gJ0Nhcm91c2VsIFBhZ2UgJyxcbiAgICAgICAgbmF2U3RyQ3VycmVudCA9ICcgKEN1cnJlbnQgU2xpZGUpJztcbiAgfVxuXG4gIC8vIGF1dG9wbGF5XG4gIGlmIChoYXNBdXRvcGxheSkge1xuICAgIHZhciBhdXRvcGxheURpcmVjdGlvbiA9IG9wdGlvbnMuYXV0b3BsYXlEaXJlY3Rpb24gPT09ICdmb3J3YXJkJyA/IDEgOiAtMSxcbiAgICAgICAgYXV0b3BsYXlCdXR0b24gPSBvcHRpb25zLmF1dG9wbGF5QnV0dG9uLFxuICAgICAgICBhdXRvcGxheUJ1dHRvbkhUTUwgPSBvcHRpb25zLmF1dG9wbGF5QnV0dG9uID8gb3B0aW9ucy5hdXRvcGxheUJ1dHRvbi5vdXRlckhUTUwgOiAnJyxcbiAgICAgICAgYXV0b3BsYXlIdG1sU3RyaW5ncyA9IFsnPHNwYW4gY2xhc3M9XFwndG5zLXZpc3VhbGx5LWhpZGRlblxcJz4nLCAnIGFuaW1hdGlvbjwvc3Bhbj4nXSxcbiAgICAgICAgYXV0b3BsYXlUaW1lcixcbiAgICAgICAgYW5pbWF0aW5nLFxuICAgICAgICBhdXRvcGxheUhvdmVyUGF1c2VkLFxuICAgICAgICBhdXRvcGxheVVzZXJQYXVzZWQsXG4gICAgICAgIGF1dG9wbGF5VmlzaWJpbGl0eVBhdXNlZDtcbiAgfVxuXG4gIGlmIChoYXNUb3VjaCB8fCBoYXNNb3VzZURyYWcpIHtcbiAgICB2YXIgaW5pdFBvc2l0aW9uID0ge30sXG4gICAgICAgIGxhc3RQb3NpdGlvbiA9IHt9LFxuICAgICAgICB0cmFuc2xhdGVJbml0LFxuICAgICAgICBkaXNYLFxuICAgICAgICBkaXNZLFxuICAgICAgICBwYW5TdGFydCA9IGZhbHNlLFxuICAgICAgICByYWZJbmRleCxcbiAgICAgICAgZ2V0RGlzdCA9IGhvcml6b250YWwgP1xuICAgICAgICAgIGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIGEueCAtIGIueDsgfSA6XG4gICAgICAgICAgZnVuY3Rpb24oYSwgYikgeyByZXR1cm4gYS55IC0gYi55OyB9O1xuICB9XG5cbiAgLy8gZGlzYWJsZSBzbGlkZXIgd2hlbiBzbGlkZWNvdW50IDw9IGl0ZW1zXG4gIGlmICghYXV0b1dpZHRoKSB7IHJlc2V0VmFyaWJsZXNXaGVuRGlzYWJsZShkaXNhYmxlIHx8IGZyZWV6ZSk7IH1cblxuICBpZiAoVFJBTlNGT1JNKSB7XG4gICAgdHJhbnNmb3JtQXR0ciA9IFRSQU5TRk9STTtcbiAgICB0cmFuc2Zvcm1QcmVmaXggPSAndHJhbnNsYXRlJztcblxuICAgIGlmIChIQVMzRFRSQU5TRk9STVMpIHtcbiAgICAgIHRyYW5zZm9ybVByZWZpeCArPSBob3Jpem9udGFsID8gJzNkKCcgOiAnM2QoMHB4LCAnO1xuICAgICAgdHJhbnNmb3JtUG9zdGZpeCA9IGhvcml6b250YWwgPyAnLCAwcHgsIDBweCknIDogJywgMHB4KSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyYW5zZm9ybVByZWZpeCArPSBob3Jpem9udGFsID8gJ1goJyA6ICdZKCc7XG4gICAgICB0cmFuc2Zvcm1Qb3N0Zml4ID0gJyknO1xuICAgIH1cblxuICB9XG5cbiAgaWYgKGNhcm91c2VsKSB7IGNvbnRhaW5lci5jbGFzc05hbWUgPSBjb250YWluZXIuY2xhc3NOYW1lLnJlcGxhY2UoJ3Rucy12cGZpeCcsICcnKTsgfVxuICBpbml0U3RydWN0dXJlKCk7XG4gIGluaXRTaGVldCgpO1xuICBpbml0U2xpZGVyVHJhbnNmb3JtKCk7XG5cbiAgLy8gPT09IENPTU1PTiBGVU5DVElPTlMgPT09IC8vXG4gIGZ1bmN0aW9uIHJlc2V0VmFyaWJsZXNXaGVuRGlzYWJsZSAoY29uZGl0aW9uKSB7XG4gICAgaWYgKGNvbmRpdGlvbikge1xuICAgICAgY29udHJvbHMgPSBuYXYgPSB0b3VjaCA9IG1vdXNlRHJhZyA9IGFycm93S2V5cyA9IGF1dG9wbGF5ID0gYXV0b3BsYXlIb3ZlclBhdXNlID0gYXV0b3BsYXlSZXNldE9uVmlzaWJpbGl0eSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEN1cnJlbnRTbGlkZSAoKSB7XG4gICAgdmFyIHRlbSA9IGNhcm91c2VsID8gaW5kZXggLSBjbG9uZUNvdW50IDogaW5kZXg7XG4gICAgd2hpbGUgKHRlbSA8IDApIHsgdGVtICs9IHNsaWRlQ291bnQ7IH1cbiAgICByZXR1cm4gdGVtJXNsaWRlQ291bnQgKyAxO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0U3RhcnRJbmRleCAoaW5kKSB7XG4gICAgaW5kID0gaW5kID8gTWF0aC5tYXgoMCwgTWF0aC5taW4obG9vcCA/IHNsaWRlQ291bnQgLSAxIDogc2xpZGVDb3VudCAtIGl0ZW1zLCBpbmQpKSA6IDA7XG4gICAgcmV0dXJuIGNhcm91c2VsID8gaW5kICsgY2xvbmVDb3VudCA6IGluZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEFic0luZGV4IChpKSB7XG4gICAgaWYgKGkgPT0gbnVsbCkgeyBpID0gaW5kZXg7IH1cblxuICAgIGlmIChjYXJvdXNlbCkgeyBpIC09IGNsb25lQ291bnQ7IH1cbiAgICB3aGlsZSAoaSA8IDApIHsgaSArPSBzbGlkZUNvdW50OyB9XG5cbiAgICByZXR1cm4gTWF0aC5mbG9vcihpJXNsaWRlQ291bnQpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q3VycmVudE5hdkluZGV4ICgpIHtcbiAgICB2YXIgYWJzSW5kZXggPSBnZXRBYnNJbmRleCgpLFxuICAgICAgICByZXN1bHQ7XG5cbiAgICByZXN1bHQgPSBuYXZBc1RodW1ibmFpbHMgPyBhYnNJbmRleCA6XG4gICAgICBmaXhlZFdpZHRoIHx8IGF1dG9XaWR0aCA/IE1hdGguY2VpbCgoYWJzSW5kZXggKyAxKSAqIHBhZ2VzIC8gc2xpZGVDb3VudCAtIDEpIDpcbiAgICAgICAgICBNYXRoLmZsb29yKGFic0luZGV4IC8gaXRlbXMpO1xuXG4gICAgLy8gc2V0IGFjdGl2ZSBuYXYgdG8gdGhlIGxhc3Qgb25lIHdoZW4gcmVhY2hlcyB0aGUgcmlnaHQgZWRnZVxuICAgIGlmICghbG9vcCAmJiBjYXJvdXNlbCAmJiBpbmRleCA9PT0gaW5kZXhNYXgpIHsgcmVzdWx0ID0gcGFnZXMgLSAxOyB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0SXRlbXNNYXggKCkge1xuICAgIC8vIGZpeGVkV2lkdGggb3IgYXV0b1dpZHRoIHdoaWxlIHZpZXdwb3J0TWF4IGlzIG5vdCBhdmFpbGFibGVcbiAgICBpZiAoYXV0b1dpZHRoIHx8IChmaXhlZFdpZHRoICYmICF2aWV3cG9ydE1heCkpIHtcbiAgICAgIHJldHVybiBzbGlkZUNvdW50IC0gMTtcbiAgICAvLyBtb3N0IGNhc2VzXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBzdHIgPSBmaXhlZFdpZHRoID8gJ2ZpeGVkV2lkdGgnIDogJ2l0ZW1zJyxcbiAgICAgICAgICBhcnIgPSBbXTtcblxuICAgICAgaWYgKGZpeGVkV2lkdGggfHwgb3B0aW9uc1tzdHJdIDwgc2xpZGVDb3VudCkgeyBhcnIucHVzaChvcHRpb25zW3N0cl0pOyB9XG5cbiAgICAgIGlmIChyZXNwb25zaXZlKSB7XG4gICAgICAgIGZvciAodmFyIGJwIGluIHJlc3BvbnNpdmUpIHtcbiAgICAgICAgICB2YXIgdGVtID0gcmVzcG9uc2l2ZVticF1bc3RyXTtcbiAgICAgICAgICBpZiAodGVtICYmIChmaXhlZFdpZHRoIHx8IHRlbSA8IHNsaWRlQ291bnQpKSB7IGFyci5wdXNoKHRlbSk7IH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIWFyci5sZW5ndGgpIHsgYXJyLnB1c2goMCk7IH1cblxuICAgICAgcmV0dXJuIE1hdGguY2VpbChmaXhlZFdpZHRoID8gdmlld3BvcnRNYXggLyBNYXRoLm1pbi5hcHBseShudWxsLCBhcnIpIDogTWF0aC5tYXguYXBwbHkobnVsbCwgYXJyKSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q2xvbmVDb3VudEZvckxvb3AgKCkge1xuICAgIHZhciBpdGVtc01heCA9IGdldEl0ZW1zTWF4KCksXG4gICAgICAgIHJlc3VsdCA9IGNhcm91c2VsID8gTWF0aC5jZWlsKChpdGVtc01heCAqIDUgLSBzbGlkZUNvdW50KS8yKSA6IChpdGVtc01heCAqIDQgLSBzbGlkZUNvdW50KTtcbiAgICByZXN1bHQgPSBNYXRoLm1heChpdGVtc01heCwgcmVzdWx0KTtcblxuICAgIHJldHVybiBoYXNPcHRpb24oJ2VkZ2VQYWRkaW5nJykgPyByZXN1bHQgKyAxIDogcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0V2luZG93V2lkdGggKCkge1xuICAgIHJldHVybiB3aW4uaW5uZXJXaWR0aCB8fCBkb2MuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIHx8IGRvYy5ib2R5LmNsaWVudFdpZHRoO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0SW5zZXJ0UG9zaXRpb24gKHBvcykge1xuICAgIHJldHVybiBwb3MgPT09ICd0b3AnID8gJ2FmdGVyYmVnaW4nIDogJ2JlZm9yZWVuZCc7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRDbGllbnRXaWR0aCAoZWwpIHtcbiAgICBpZiAoZWwgPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICB2YXIgZGl2ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpLCByZWN0LCB3aWR0aDtcbiAgICBlbC5hcHBlbmRDaGlsZChkaXYpO1xuICAgIHJlY3QgPSBkaXYuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgd2lkdGggPSByZWN0LnJpZ2h0IC0gcmVjdC5sZWZ0O1xuICAgIGRpdi5yZW1vdmUoKTtcbiAgICByZXR1cm4gd2lkdGggfHwgZ2V0Q2xpZW50V2lkdGgoZWwucGFyZW50Tm9kZSk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRWaWV3cG9ydFdpZHRoICgpIHtcbiAgICB2YXIgZ2FwID0gZWRnZVBhZGRpbmcgPyBlZGdlUGFkZGluZyAqIDIgLSBndXR0ZXIgOiAwO1xuICAgIHJldHVybiBnZXRDbGllbnRXaWR0aChjb250YWluZXJQYXJlbnQpIC0gZ2FwO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFzT3B0aW9uIChpdGVtKSB7XG4gICAgaWYgKG9wdGlvbnNbaXRlbV0pIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAocmVzcG9uc2l2ZSkge1xuICAgICAgICBmb3IgKHZhciBicCBpbiByZXNwb25zaXZlKSB7XG4gICAgICAgICAgaWYgKHJlc3BvbnNpdmVbYnBdW2l0ZW1dKSB7IHJldHVybiB0cnVlOyB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvLyBnZXQgb3B0aW9uOlxuICAvLyBmaXhlZCB3aWR0aDogdmlld3BvcnQsIGZpeGVkV2lkdGgsIGd1dHRlciA9PiBpdGVtc1xuICAvLyBvdGhlcnM6IHdpbmRvdyB3aWR0aCA9PiBhbGwgdmFyaWFibGVzXG4gIC8vIGFsbDogaXRlbXMgPT4gc2xpZGVCeVxuICBmdW5jdGlvbiBnZXRPcHRpb24gKGl0ZW0sIHd3KSB7XG4gICAgaWYgKHd3ID09IG51bGwpIHsgd3cgPSB3aW5kb3dXaWR0aDsgfVxuXG4gICAgaWYgKGl0ZW0gPT09ICdpdGVtcycgJiYgZml4ZWRXaWR0aCkge1xuICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKHZpZXdwb3J0ICsgZ3V0dGVyKSAvIChmaXhlZFdpZHRoICsgZ3V0dGVyKSkgfHwgMTtcblxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgcmVzdWx0ID0gb3B0aW9uc1tpdGVtXTtcblxuICAgICAgaWYgKHJlc3BvbnNpdmUpIHtcbiAgICAgICAgZm9yICh2YXIgYnAgaW4gcmVzcG9uc2l2ZSkge1xuICAgICAgICAgIC8vIGJwOiBjb252ZXJ0IHN0cmluZyB0byBudW1iZXJcbiAgICAgICAgICBpZiAod3cgPj0gcGFyc2VJbnQoYnApKSB7XG4gICAgICAgICAgICBpZiAoaXRlbSBpbiByZXNwb25zaXZlW2JwXSkgeyByZXN1bHQgPSByZXNwb25zaXZlW2JwXVtpdGVtXTsgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbSA9PT0gJ3NsaWRlQnknICYmIHJlc3VsdCA9PT0gJ3BhZ2UnKSB7IHJlc3VsdCA9IGdldE9wdGlvbignaXRlbXMnKTsgfVxuICAgICAgaWYgKCFjYXJvdXNlbCAmJiAoaXRlbSA9PT0gJ3NsaWRlQnknIHx8IGl0ZW0gPT09ICdpdGVtcycpKSB7IHJlc3VsdCA9IE1hdGguZmxvb3IocmVzdWx0KTsgfVxuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFNsaWRlTWFyZ2luTGVmdCAoaSkge1xuICAgIHJldHVybiBDQUxDID9cbiAgICAgIENBTEMgKyAnKCcgKyBpICogMTAwICsgJyUgLyAnICsgc2xpZGVDb3VudE5ldyArICcpJyA6XG4gICAgICBpICogMTAwIC8gc2xpZGVDb3VudE5ldyArICclJztcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldElubmVyV3JhcHBlclN0eWxlcyAoZWRnZVBhZGRpbmdUZW0sIGd1dHRlclRlbSwgZml4ZWRXaWR0aFRlbSwgc3BlZWRUZW0sIGF1dG9IZWlnaHRCUCkge1xuICAgIHZhciBzdHIgPSAnJztcblxuICAgIGlmIChlZGdlUGFkZGluZ1RlbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YXIgZ2FwID0gZWRnZVBhZGRpbmdUZW07XG4gICAgICBpZiAoZ3V0dGVyVGVtKSB7IGdhcCAtPSBndXR0ZXJUZW07IH1cbiAgICAgIHN0ciA9IGhvcml6b250YWwgP1xuICAgICAgICAnbWFyZ2luOiAwICcgKyBnYXAgKyAncHggMCAnICsgZWRnZVBhZGRpbmdUZW0gKyAncHg7JyA6XG4gICAgICAgICdtYXJnaW46ICcgKyBlZGdlUGFkZGluZ1RlbSArICdweCAwICcgKyBnYXAgKyAncHggMDsnO1xuICAgIH0gZWxzZSBpZiAoZ3V0dGVyVGVtICYmICFmaXhlZFdpZHRoVGVtKSB7XG4gICAgICB2YXIgZ3V0dGVyVGVtVW5pdCA9ICctJyArIGd1dHRlclRlbSArICdweCcsXG4gICAgICAgICAgZGlyID0gaG9yaXpvbnRhbCA/IGd1dHRlclRlbVVuaXQgKyAnIDAgMCcgOiAnMCAnICsgZ3V0dGVyVGVtVW5pdCArICcgMCc7XG4gICAgICBzdHIgPSAnbWFyZ2luOiAwICcgKyBkaXIgKyAnOydcbiAgICB9XG5cbiAgICBpZiAoIWNhcm91c2VsICYmIGF1dG9IZWlnaHRCUCAmJiBUUkFOU0lUSU9ORFVSQVRJT04gJiYgc3BlZWRUZW0pIHsgc3RyICs9IGdldFRyYW5zaXRpb25EdXJhdGlvblN0eWxlKHNwZWVkVGVtKTsgfVxuICAgIHJldHVybiBzdHI7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRDb250YWluZXJXaWR0aCAoZml4ZWRXaWR0aFRlbSwgZ3V0dGVyVGVtLCBpdGVtc1RlbSkge1xuICAgIGlmIChmaXhlZFdpZHRoVGVtKSB7XG4gICAgICByZXR1cm4gKGZpeGVkV2lkdGhUZW0gKyBndXR0ZXJUZW0pICogc2xpZGVDb3VudE5ldyArICdweCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBDQUxDID9cbiAgICAgICAgQ0FMQyArICcoJyArIHNsaWRlQ291bnROZXcgKiAxMDAgKyAnJSAvICcgKyBpdGVtc1RlbSArICcpJyA6XG4gICAgICAgIHNsaWRlQ291bnROZXcgKiAxMDAgLyBpdGVtc1RlbSArICclJztcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRTbGlkZVdpZHRoU3R5bGUgKGZpeGVkV2lkdGhUZW0sIGd1dHRlclRlbSwgaXRlbXNUZW0pIHtcbiAgICB2YXIgd2lkdGg7XG5cbiAgICBpZiAoZml4ZWRXaWR0aFRlbSkge1xuICAgICAgd2lkdGggPSAoZml4ZWRXaWR0aFRlbSArIGd1dHRlclRlbSkgKyAncHgnO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIWNhcm91c2VsKSB7IGl0ZW1zVGVtID0gTWF0aC5mbG9vcihpdGVtc1RlbSk7IH1cbiAgICAgIHZhciBkaXZpZGVuZCA9IGNhcm91c2VsID8gc2xpZGVDb3VudE5ldyA6IGl0ZW1zVGVtO1xuICAgICAgd2lkdGggPSBDQUxDID9cbiAgICAgICAgQ0FMQyArICcoMTAwJSAvICcgKyBkaXZpZGVuZCArICcpJyA6XG4gICAgICAgIDEwMCAvIGRpdmlkZW5kICsgJyUnO1xuICAgIH1cblxuICAgIHdpZHRoID0gJ3dpZHRoOicgKyB3aWR0aDtcblxuICAgIC8vIGlubmVyIHNsaWRlcjogb3ZlcndyaXRlIG91dGVyIHNsaWRlciBzdHlsZXNcbiAgICByZXR1cm4gbmVzdGVkICE9PSAnaW5uZXInID8gd2lkdGggKyAnOycgOiB3aWR0aCArICcgIWltcG9ydGFudDsnO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0U2xpZGVHdXR0ZXJTdHlsZSAoZ3V0dGVyVGVtKSB7XG4gICAgdmFyIHN0ciA9ICcnO1xuXG4gICAgLy8gZ3V0dGVyIG1heWJlIGludGVyZ2VyIHx8IDBcbiAgICAvLyBzbyBjYW4ndCB1c2UgJ2lmIChndXR0ZXIpJ1xuICAgIGlmIChndXR0ZXJUZW0gIT09IGZhbHNlKSB7XG4gICAgICB2YXIgcHJvcCA9IGhvcml6b250YWwgPyAncGFkZGluZy0nIDogJ21hcmdpbi0nLFxuICAgICAgICAgIGRpciA9IGhvcml6b250YWwgPyAncmlnaHQnIDogJ2JvdHRvbSc7XG4gICAgICBzdHIgPSBwcm9wICsgIGRpciArICc6ICcgKyBndXR0ZXJUZW0gKyAncHg7JztcbiAgICB9XG5cbiAgICByZXR1cm4gc3RyO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q1NTUHJlZml4IChuYW1lLCBudW0pIHtcbiAgICB2YXIgcHJlZml4ID0gbmFtZS5zdWJzdHJpbmcoMCwgbmFtZS5sZW5ndGggLSBudW0pLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKHByZWZpeCkgeyBwcmVmaXggPSAnLScgKyBwcmVmaXggKyAnLSc7IH1cblxuICAgIHJldHVybiBwcmVmaXg7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRUcmFuc2l0aW9uRHVyYXRpb25TdHlsZSAoc3BlZWQpIHtcbiAgICByZXR1cm4gZ2V0Q1NTUHJlZml4KFRSQU5TSVRJT05EVVJBVElPTiwgMTgpICsgJ3RyYW5zaXRpb24tZHVyYXRpb246JyArIHNwZWVkIC8gMTAwMCArICdzOyc7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRBbmltYXRpb25EdXJhdGlvblN0eWxlIChzcGVlZCkge1xuICAgIHJldHVybiBnZXRDU1NQcmVmaXgoQU5JTUFUSU9ORFVSQVRJT04sIDE3KSArICdhbmltYXRpb24tZHVyYXRpb246JyArIHNwZWVkIC8gMTAwMCArICdzOyc7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0U3RydWN0dXJlICgpIHtcbiAgICB2YXIgY2xhc3NPdXRlciA9ICd0bnMtb3V0ZXInLFxuICAgICAgICBjbGFzc0lubmVyID0gJ3Rucy1pbm5lcicsXG4gICAgICAgIGhhc0d1dHRlciA9IGhhc09wdGlvbignZ3V0dGVyJyk7XG5cbiAgICBvdXRlcldyYXBwZXIuY2xhc3NOYW1lID0gY2xhc3NPdXRlcjtcbiAgICBpbm5lcldyYXBwZXIuY2xhc3NOYW1lID0gY2xhc3NJbm5lcjtcbiAgICBvdXRlcldyYXBwZXIuaWQgPSBzbGlkZUlkICsgJy1vdyc7XG4gICAgaW5uZXJXcmFwcGVyLmlkID0gc2xpZGVJZCArICctaXcnO1xuXG4gICAgLy8gc2V0IGNvbnRhaW5lciBwcm9wZXJ0aWVzXG4gICAgaWYgKGNvbnRhaW5lci5pZCA9PT0gJycpIHsgY29udGFpbmVyLmlkID0gc2xpZGVJZDsgfVxuICAgIG5ld0NvbnRhaW5lckNsYXNzZXMgKz0gUEVSQ0VOVEFHRUxBWU9VVCB8fCBhdXRvV2lkdGggPyAnIHRucy1zdWJwaXhlbCcgOiAnIHRucy1uby1zdWJwaXhlbCc7XG4gICAgbmV3Q29udGFpbmVyQ2xhc3NlcyArPSBDQUxDID8gJyB0bnMtY2FsYycgOiAnIHRucy1uby1jYWxjJztcbiAgICBpZiAoYXV0b1dpZHRoKSB7IG5ld0NvbnRhaW5lckNsYXNzZXMgKz0gJyB0bnMtYXV0b3dpZHRoJzsgfVxuICAgIG5ld0NvbnRhaW5lckNsYXNzZXMgKz0gJyB0bnMtJyArIG9wdGlvbnMuYXhpcztcbiAgICBjb250YWluZXIuY2xhc3NOYW1lICs9IG5ld0NvbnRhaW5lckNsYXNzZXM7XG5cbiAgICAvLyBhZGQgY29uc3RyYWluIGxheWVyIGZvciBjYXJvdXNlbFxuICAgIGlmIChjYXJvdXNlbCkge1xuICAgICAgbWlkZGxlV3JhcHBlciA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIG1pZGRsZVdyYXBwZXIuaWQgPSBzbGlkZUlkICsgJy1tdyc7XG4gICAgICBtaWRkbGVXcmFwcGVyLmNsYXNzTmFtZSA9ICd0bnMtb3ZoJztcblxuICAgICAgb3V0ZXJXcmFwcGVyLmFwcGVuZENoaWxkKG1pZGRsZVdyYXBwZXIpO1xuICAgICAgbWlkZGxlV3JhcHBlci5hcHBlbmRDaGlsZChpbm5lcldyYXBwZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvdXRlcldyYXBwZXIuYXBwZW5kQ2hpbGQoaW5uZXJXcmFwcGVyKTtcbiAgICB9XG5cbiAgICBpZiAoYXV0b0hlaWdodCkge1xuICAgICAgdmFyIHdwID0gbWlkZGxlV3JhcHBlciA/IG1pZGRsZVdyYXBwZXIgOiBpbm5lcldyYXBwZXI7XG4gICAgICB3cC5jbGFzc05hbWUgKz0gJyB0bnMtYWgnO1xuICAgIH1cblxuICAgIGNvbnRhaW5lclBhcmVudC5pbnNlcnRCZWZvcmUob3V0ZXJXcmFwcGVyLCBjb250YWluZXIpO1xuICAgIGlubmVyV3JhcHBlci5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuXG4gICAgLy8gYWRkIGlkLCBjbGFzcywgYXJpYSBhdHRyaWJ1dGVzXG4gICAgLy8gYmVmb3JlIGNsb25lIHNsaWRlc1xuICAgIGZvckVhY2goc2xpZGVJdGVtcywgZnVuY3Rpb24oaXRlbSwgaSkge1xuICAgICAgYWRkQ2xhc3MoaXRlbSwgJ3Rucy1pdGVtJyk7XG4gICAgICBpZiAoIWl0ZW0uaWQpIHsgaXRlbS5pZCA9IHNsaWRlSWQgKyAnLWl0ZW0nICsgaTsgfVxuICAgICAgaWYgKCFjYXJvdXNlbCAmJiBhbmltYXRlTm9ybWFsKSB7IGFkZENsYXNzKGl0ZW0sIGFuaW1hdGVOb3JtYWwpOyB9XG4gICAgICBzZXRBdHRycyhpdGVtLCB7XG4gICAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJyxcbiAgICAgICAgJ3RhYmluZGV4JzogJy0xJ1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyAjIyBjbG9uZSBzbGlkZXNcbiAgICAvLyBjYXJvdXNlbDogbiArIHNsaWRlcyArIG5cbiAgICAvLyBnYWxsZXJ5OiAgICAgIHNsaWRlcyArIG5cbiAgICBpZiAoY2xvbmVDb3VudCkge1xuICAgICAgdmFyIGZyYWdtZW50QmVmb3JlID0gZG9jLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSxcbiAgICAgICAgICBmcmFnbWVudEFmdGVyID0gZG9jLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuICAgICAgZm9yICh2YXIgaiA9IGNsb25lQ291bnQ7IGotLTspIHtcbiAgICAgICAgdmFyIG51bSA9IGolc2xpZGVDb3VudCxcbiAgICAgICAgICAgIGNsb25lRmlyc3QgPSBzbGlkZUl0ZW1zW251bV0uY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICBhZGRDbGFzcyhjbG9uZUZpcnN0LCBzbGlkZUNsb25lZENsYXNzKTtcbiAgICAgICAgcmVtb3ZlQXR0cnMoY2xvbmVGaXJzdCwgJ2lkJyk7XG4gICAgICAgIGZyYWdtZW50QWZ0ZXIuaW5zZXJ0QmVmb3JlKGNsb25lRmlyc3QsIGZyYWdtZW50QWZ0ZXIuZmlyc3RDaGlsZCk7XG5cbiAgICAgICAgaWYgKGNhcm91c2VsKSB7XG4gICAgICAgICAgdmFyIGNsb25lTGFzdCA9IHNsaWRlSXRlbXNbc2xpZGVDb3VudCAtIDEgLSBudW1dLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgICBhZGRDbGFzcyhjbG9uZUxhc3QsIHNsaWRlQ2xvbmVkQ2xhc3MpO1xuICAgICAgICAgIHJlbW92ZUF0dHJzKGNsb25lTGFzdCwgJ2lkJyk7XG4gICAgICAgICAgZnJhZ21lbnRCZWZvcmUuYXBwZW5kQ2hpbGQoY2xvbmVMYXN0KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb250YWluZXIuaW5zZXJ0QmVmb3JlKGZyYWdtZW50QmVmb3JlLCBjb250YWluZXIuZmlyc3RDaGlsZCk7XG4gICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZnJhZ21lbnRBZnRlcik7XG4gICAgICBzbGlkZUl0ZW1zID0gY29udGFpbmVyLmNoaWxkcmVuO1xuICAgIH1cblxuICB9XG5cbiAgZnVuY3Rpb24gaW5pdFNsaWRlclRyYW5zZm9ybSAoKSB7XG4gICAgLy8gIyMgaW1hZ2VzIGxvYWRlZC9mYWlsZWRcbiAgICBpZiAoaGFzT3B0aW9uKCdhdXRvSGVpZ2h0JykgfHwgYXV0b1dpZHRoIHx8ICFob3Jpem9udGFsKSB7XG4gICAgICB2YXIgaW1ncyA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdpbWcnKTtcblxuICAgICAgLy8gYWRkIGltZyBsb2FkIGV2ZW50IGxpc3RlbmVyXG4gICAgICBmb3JFYWNoKGltZ3MsIGZ1bmN0aW9uKGltZykge1xuICAgICAgICB2YXIgc3JjID0gaW1nLnNyYztcblxuICAgICAgICBpZiAoIWxhenlsb2FkKSB7XG4gICAgICAgICAgLy8gbm90IGRhdGEgaW1nXG4gICAgICAgICAgaWYgKHNyYyAmJiBzcmMuaW5kZXhPZignZGF0YTppbWFnZScpIDwgMCkge1xuICAgICAgICAgICAgaW1nLnNyYyA9ICcnO1xuICAgICAgICAgICAgYWRkRXZlbnRzKGltZywgaW1nRXZlbnRzKTtcbiAgICAgICAgICAgIGFkZENsYXNzKGltZywgJ2xvYWRpbmcnKTtcblxuICAgICAgICAgICAgaW1nLnNyYyA9IHNyYztcbiAgICAgICAgICAvLyBkYXRhIGltZ1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpbWdMb2FkZWQoaW1nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBzZXQgaW1nc0NvbXBsZXRlXG4gICAgICByYWYoZnVuY3Rpb24oKXsgaW1nc0xvYWRlZENoZWNrKGFycmF5RnJvbU5vZGVMaXN0KGltZ3MpLCBmdW5jdGlvbigpIHsgaW1nc0NvbXBsZXRlID0gdHJ1ZTsgfSk7IH0pO1xuXG4gICAgICAvLyByZXNldCBpbWdzIGZvciBhdXRvIGhlaWdodDogY2hlY2sgdmlzaWJsZSBpbWdzIG9ubHlcbiAgICAgIGlmIChoYXNPcHRpb24oJ2F1dG9IZWlnaHQnKSkgeyBpbWdzID0gZ2V0SW1hZ2VBcnJheShpbmRleCwgTWF0aC5taW4oaW5kZXggKyBpdGVtcyAtIDEsIHNsaWRlQ291bnROZXcgLSAxKSk7IH1cblxuICAgICAgbGF6eWxvYWQgPyBpbml0U2xpZGVyVHJhbnNmb3JtU3R5bGVDaGVjaygpIDogcmFmKGZ1bmN0aW9uKCl7IGltZ3NMb2FkZWRDaGVjayhhcnJheUZyb21Ob2RlTGlzdChpbWdzKSwgaW5pdFNsaWRlclRyYW5zZm9ybVN0eWxlQ2hlY2spOyB9KTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBzZXQgY29udGFpbmVyIHRyYW5zZm9ybSBwcm9wZXJ0eVxuICAgICAgaWYgKGNhcm91c2VsKSB7IGRvQ29udGFpbmVyVHJhbnNmb3JtU2lsZW50KCk7IH1cblxuICAgICAgLy8gdXBkYXRlIHNsaWRlciB0b29scyBhbmQgZXZlbnRzXG4gICAgICBpbml0VG9vbHMoKTtcbiAgICAgIGluaXRFdmVudHMoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpbml0U2xpZGVyVHJhbnNmb3JtU3R5bGVDaGVjayAoKSB7XG4gICAgaWYgKGF1dG9XaWR0aCAmJiBzbGlkZUNvdW50ID4gMSkge1xuICAgICAgLy8gY2hlY2sgc3R5bGVzIGFwcGxpY2F0aW9uXG4gICAgICB2YXIgbnVtID0gbG9vcCA/IGluZGV4IDogc2xpZGVDb3VudCAtIDE7XG5cbiAgICAgIChmdW5jdGlvbiBzdHlsZXNBcHBsaWNhdGlvbkNoZWNrKCkge1xuICAgICAgICB2YXIgbGVmdCA9IHNsaWRlSXRlbXNbbnVtXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuICAgICAgICB2YXIgcmlnaHQgPSBzbGlkZUl0ZW1zW251bSAtIDFdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnJpZ2h0O1xuXG4gICAgICAgIChNYXRoLmFicyhsZWZ0IC0gcmlnaHQpIDw9IDEpID9cbiAgICAgICAgICBpbml0U2xpZGVyVHJhbnNmb3JtQ29yZSgpIDpcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7IHN0eWxlc0FwcGxpY2F0aW9uQ2hlY2soKSB9LCAxNik7XG4gICAgICB9KSgpO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIGluaXRTbGlkZXJUcmFuc2Zvcm1Db3JlKCk7XG4gICAgfVxuICB9XG5cblxuICBmdW5jdGlvbiBpbml0U2xpZGVyVHJhbnNmb3JtQ29yZSAoKSB7XG4gICAgLy8gcnVuIEZuKClzIHdoaWNoIGFyZSByZWx5IG9uIGltYWdlIGxvYWRpbmdcbiAgICBpZiAoIWhvcml6b250YWwgfHwgYXV0b1dpZHRoKSB7XG4gICAgICBzZXRTbGlkZVBvc2l0aW9ucygpO1xuXG4gICAgICBpZiAoYXV0b1dpZHRoKSB7XG4gICAgICAgIHJpZ2h0Qm91bmRhcnkgPSBnZXRSaWdodEJvdW5kYXJ5KCk7XG4gICAgICAgIGlmIChmcmVlemFibGUpIHsgZnJlZXplID0gZ2V0RnJlZXplKCk7IH1cbiAgICAgICAgaW5kZXhNYXggPSBnZXRJbmRleE1heCgpOyAvLyA8PSBzbGlkZVBvc2l0aW9ucywgcmlnaHRCb3VuZGFyeSA8PVxuICAgICAgICByZXNldFZhcmlibGVzV2hlbkRpc2FibGUoZGlzYWJsZSB8fCBmcmVlemUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdXBkYXRlQ29udGVudFdyYXBwZXJIZWlnaHQoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzZXQgY29udGFpbmVyIHRyYW5zZm9ybSBwcm9wZXJ0eVxuICAgIGlmIChjYXJvdXNlbCkgeyBkb0NvbnRhaW5lclRyYW5zZm9ybVNpbGVudCgpOyB9XG5cbiAgICAvLyB1cGRhdGUgc2xpZGVyIHRvb2xzIGFuZCBldmVudHNcbiAgICBpbml0VG9vbHMoKTtcbiAgICBpbml0RXZlbnRzKCk7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0U2hlZXQgKCkge1xuICAgIC8vIGdhbGxlcnk6XG4gICAgLy8gc2V0IGFuaW1hdGlvbiBjbGFzc2VzIGFuZCBsZWZ0IHZhbHVlIGZvciBnYWxsZXJ5IHNsaWRlclxuICAgIGlmICghY2Fyb3VzZWwpIHtcbiAgICAgIGZvciAodmFyIGkgPSBpbmRleCwgbCA9IGluZGV4ICsgTWF0aC5taW4oc2xpZGVDb3VudCwgaXRlbXMpOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHZhciBpdGVtID0gc2xpZGVJdGVtc1tpXTtcbiAgICAgICAgaXRlbS5zdHlsZS5sZWZ0ID0gKGkgLSBpbmRleCkgKiAxMDAgLyBpdGVtcyArICclJztcbiAgICAgICAgYWRkQ2xhc3MoaXRlbSwgYW5pbWF0ZUluKTtcbiAgICAgICAgcmVtb3ZlQ2xhc3MoaXRlbSwgYW5pbWF0ZU5vcm1hbCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gIyMjIyBMQVlPVVRcblxuICAgIC8vICMjIElOTElORS1CTE9DSyBWUyBGTE9BVFxuXG4gICAgLy8gIyMgUGVyY2VudGFnZUxheW91dDpcbiAgICAvLyBzbGlkZXM6IGlubGluZS1ibG9ja1xuICAgIC8vIHJlbW92ZSBibGFuayBzcGFjZSBiZXR3ZWVuIHNsaWRlcyBieSBzZXQgZm9udC1zaXplOiAwXG5cbiAgICAvLyAjIyBOb24gUGVyY2VudGFnZUxheW91dDpcbiAgICAvLyBzbGlkZXM6IGZsb2F0XG4gICAgLy8gICAgICAgICBtYXJnaW4tcmlnaHQ6IC0xMDAlXG4gICAgLy8gICAgICAgICBtYXJnaW4tbGVmdDogflxuXG4gICAgLy8gUmVzb3VyY2U6IGh0dHBzOi8vZG9jcy5nb29nbGUuY29tL3NwcmVhZHNoZWV0cy9kLzE0N3VwMjQ1d3dUWGVRWXZlM0JSU0FENG9WY3ZRbXVHc0Z0ZUpPZUE1eE5RL2VkaXQ/dXNwPXNoYXJpbmdcbiAgICBpZiAoaG9yaXpvbnRhbCkge1xuICAgICAgaWYgKFBFUkNFTlRBR0VMQVlPVVQgfHwgYXV0b1dpZHRoKSB7XG4gICAgICAgIGFkZENTU1J1bGUoc2hlZXQsICcjJyArIHNsaWRlSWQgKyAnID4gLnRucy1pdGVtJywgJ2ZvbnQtc2l6ZTonICsgd2luLmdldENvbXB1dGVkU3R5bGUoc2xpZGVJdGVtc1swXSkuZm9udFNpemUgKyAnOycsIGdldENzc1J1bGVzTGVuZ3RoKHNoZWV0KSk7XG4gICAgICAgIGFkZENTU1J1bGUoc2hlZXQsICcjJyArIHNsaWRlSWQsICdmb250LXNpemU6MDsnLCBnZXRDc3NSdWxlc0xlbmd0aChzaGVldCkpO1xuICAgICAgfSBlbHNlIGlmIChjYXJvdXNlbCkge1xuICAgICAgICBmb3JFYWNoKHNsaWRlSXRlbXMsIGZ1bmN0aW9uIChzbGlkZSwgaSkge1xuICAgICAgICAgIHNsaWRlLnN0eWxlLm1hcmdpbkxlZnQgPSBnZXRTbGlkZU1hcmdpbkxlZnQoaSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuXG4gICAgLy8gIyMgQkFTSUMgU1RZTEVTXG4gICAgaWYgKENTU01RKSB7XG4gICAgICAvLyBtaWRkbGUgd3JhcHBlciBzdHlsZVxuICAgICAgaWYgKFRSQU5TSVRJT05EVVJBVElPTikge1xuICAgICAgICB2YXIgc3RyID0gbWlkZGxlV3JhcHBlciAmJiBvcHRpb25zLmF1dG9IZWlnaHQgPyBnZXRUcmFuc2l0aW9uRHVyYXRpb25TdHlsZShvcHRpb25zLnNwZWVkKSA6ICcnO1xuICAgICAgICBhZGRDU1NSdWxlKHNoZWV0LCAnIycgKyBzbGlkZUlkICsgJy1tdycsIHN0ciwgZ2V0Q3NzUnVsZXNMZW5ndGgoc2hlZXQpKTtcbiAgICAgIH1cblxuICAgICAgLy8gaW5uZXIgd3JhcHBlciBzdHlsZXNcbiAgICAgIHN0ciA9IGdldElubmVyV3JhcHBlclN0eWxlcyhvcHRpb25zLmVkZ2VQYWRkaW5nLCBvcHRpb25zLmd1dHRlciwgb3B0aW9ucy5maXhlZFdpZHRoLCBvcHRpb25zLnNwZWVkLCBvcHRpb25zLmF1dG9IZWlnaHQpO1xuICAgICAgYWRkQ1NTUnVsZShzaGVldCwgJyMnICsgc2xpZGVJZCArICctaXcnLCBzdHIsIGdldENzc1J1bGVzTGVuZ3RoKHNoZWV0KSk7XG5cbiAgICAgIC8vIGNvbnRhaW5lciBzdHlsZXNcbiAgICAgIGlmIChjYXJvdXNlbCkge1xuICAgICAgICBzdHIgPSBob3Jpem9udGFsICYmICFhdXRvV2lkdGggPyAnd2lkdGg6JyArIGdldENvbnRhaW5lcldpZHRoKG9wdGlvbnMuZml4ZWRXaWR0aCwgb3B0aW9ucy5ndXR0ZXIsIG9wdGlvbnMuaXRlbXMpICsgJzsnIDogJyc7XG4gICAgICAgIGlmIChUUkFOU0lUSU9ORFVSQVRJT04pIHsgc3RyICs9IGdldFRyYW5zaXRpb25EdXJhdGlvblN0eWxlKHNwZWVkKTsgfVxuICAgICAgICBhZGRDU1NSdWxlKHNoZWV0LCAnIycgKyBzbGlkZUlkLCBzdHIsIGdldENzc1J1bGVzTGVuZ3RoKHNoZWV0KSk7XG4gICAgICB9XG5cbiAgICAgIC8vIHNsaWRlIHN0eWxlc1xuICAgICAgc3RyID0gaG9yaXpvbnRhbCAmJiAhYXV0b1dpZHRoID8gZ2V0U2xpZGVXaWR0aFN0eWxlKG9wdGlvbnMuZml4ZWRXaWR0aCwgb3B0aW9ucy5ndXR0ZXIsIG9wdGlvbnMuaXRlbXMpIDogJyc7XG4gICAgICBpZiAob3B0aW9ucy5ndXR0ZXIpIHsgc3RyICs9IGdldFNsaWRlR3V0dGVyU3R5bGUob3B0aW9ucy5ndXR0ZXIpOyB9XG4gICAgICAvLyBzZXQgZ2FsbGVyeSBpdGVtcyB0cmFuc2l0aW9uLWR1cmF0aW9uXG4gICAgICBpZiAoIWNhcm91c2VsKSB7XG4gICAgICAgIGlmIChUUkFOU0lUSU9ORFVSQVRJT04pIHsgc3RyICs9IGdldFRyYW5zaXRpb25EdXJhdGlvblN0eWxlKHNwZWVkKTsgfVxuICAgICAgICBpZiAoQU5JTUFUSU9ORFVSQVRJT04pIHsgc3RyICs9IGdldEFuaW1hdGlvbkR1cmF0aW9uU3R5bGUoc3BlZWQpOyB9XG4gICAgICB9XG4gICAgICBpZiAoc3RyKSB7IGFkZENTU1J1bGUoc2hlZXQsICcjJyArIHNsaWRlSWQgKyAnID4gLnRucy1pdGVtJywgc3RyLCBnZXRDc3NSdWxlc0xlbmd0aChzaGVldCkpOyB9XG5cbiAgICAvLyBub24gQ1NTIG1lZGlhcXVlcmllczogSUU4XG4gICAgLy8gIyMgdXBkYXRlIGlubmVyIHdyYXBwZXIsIGNvbnRhaW5lciwgc2xpZGVzIGlmIG5lZWRlZFxuICAgIC8vIHNldCBpbmxpbmUgc3R5bGVzIGZvciBpbm5lciB3cmFwcGVyICYgY29udGFpbmVyXG4gICAgLy8gaW5zZXJ0IHN0eWxlc2hlZXQgKG9uZSBsaW5lKSBmb3Igc2xpZGVzIG9ubHkgKHNpbmNlIHNsaWRlcyBhcmUgbWFueSlcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gbWlkZGxlIHdyYXBwZXIgc3R5bGVzXG4gICAgICB1cGRhdGVfY2Fyb3VzZWxfdHJhbnNpdGlvbl9kdXJhdGlvbigpO1xuXG4gICAgICAvLyBpbm5lciB3cmFwcGVyIHN0eWxlc1xuICAgICAgaW5uZXJXcmFwcGVyLnN0eWxlLmNzc1RleHQgPSBnZXRJbm5lcldyYXBwZXJTdHlsZXMoZWRnZVBhZGRpbmcsIGd1dHRlciwgZml4ZWRXaWR0aCwgYXV0b0hlaWdodCk7XG5cbiAgICAgIC8vIGNvbnRhaW5lciBzdHlsZXNcbiAgICAgIGlmIChjYXJvdXNlbCAmJiBob3Jpem9udGFsICYmICFhdXRvV2lkdGgpIHtcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLndpZHRoID0gZ2V0Q29udGFpbmVyV2lkdGgoZml4ZWRXaWR0aCwgZ3V0dGVyLCBpdGVtcyk7XG4gICAgICB9XG5cbiAgICAgIC8vIHNsaWRlIHN0eWxlc1xuICAgICAgdmFyIHN0ciA9IGhvcml6b250YWwgJiYgIWF1dG9XaWR0aCA/IGdldFNsaWRlV2lkdGhTdHlsZShmaXhlZFdpZHRoLCBndXR0ZXIsIGl0ZW1zKSA6ICcnO1xuICAgICAgaWYgKGd1dHRlcikgeyBzdHIgKz0gZ2V0U2xpZGVHdXR0ZXJTdHlsZShndXR0ZXIpOyB9XG5cbiAgICAgIC8vIGFwcGVuZCB0byB0aGUgbGFzdCBsaW5lXG4gICAgICBpZiAoc3RyKSB7IGFkZENTU1J1bGUoc2hlZXQsICcjJyArIHNsaWRlSWQgKyAnID4gLnRucy1pdGVtJywgc3RyLCBnZXRDc3NSdWxlc0xlbmd0aChzaGVldCkpOyB9XG4gICAgfVxuXG4gICAgLy8gIyMgTUVESUFRVUVSSUVTXG4gICAgaWYgKHJlc3BvbnNpdmUgJiYgQ1NTTVEpIHtcbiAgICAgIGZvciAodmFyIGJwIGluIHJlc3BvbnNpdmUpIHtcbiAgICAgICAgLy8gYnA6IGNvbnZlcnQgc3RyaW5nIHRvIG51bWJlclxuICAgICAgICBicCA9IHBhcnNlSW50KGJwKTtcblxuICAgICAgICB2YXIgb3B0cyA9IHJlc3BvbnNpdmVbYnBdLFxuICAgICAgICAgICAgc3RyID0gJycsXG4gICAgICAgICAgICBtaWRkbGVXcmFwcGVyU3RyID0gJycsXG4gICAgICAgICAgICBpbm5lcldyYXBwZXJTdHIgPSAnJyxcbiAgICAgICAgICAgIGNvbnRhaW5lclN0ciA9ICcnLFxuICAgICAgICAgICAgc2xpZGVTdHIgPSAnJyxcbiAgICAgICAgICAgIGl0ZW1zQlAgPSAhYXV0b1dpZHRoID8gZ2V0T3B0aW9uKCdpdGVtcycsIGJwKSA6IG51bGwsXG4gICAgICAgICAgICBmaXhlZFdpZHRoQlAgPSBnZXRPcHRpb24oJ2ZpeGVkV2lkdGgnLCBicCksXG4gICAgICAgICAgICBzcGVlZEJQID0gZ2V0T3B0aW9uKCdzcGVlZCcsIGJwKSxcbiAgICAgICAgICAgIGVkZ2VQYWRkaW5nQlAgPSBnZXRPcHRpb24oJ2VkZ2VQYWRkaW5nJywgYnApLFxuICAgICAgICAgICAgYXV0b0hlaWdodEJQID0gZ2V0T3B0aW9uKCdhdXRvSGVpZ2h0JywgYnApLFxuICAgICAgICAgICAgZ3V0dGVyQlAgPSBnZXRPcHRpb24oJ2d1dHRlcicsIGJwKTtcblxuICAgICAgICAvLyBtaWRkbGUgd3JhcHBlciBzdHJpbmdcbiAgICAgICAgaWYgKFRSQU5TSVRJT05EVVJBVElPTiAmJiBtaWRkbGVXcmFwcGVyICYmIGdldE9wdGlvbignYXV0b0hlaWdodCcsIGJwKSAmJiAnc3BlZWQnIGluIG9wdHMpIHtcbiAgICAgICAgICBtaWRkbGVXcmFwcGVyU3RyID0gJyMnICsgc2xpZGVJZCArICctbXd7JyArIGdldFRyYW5zaXRpb25EdXJhdGlvblN0eWxlKHNwZWVkQlApICsgJ30nO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaW5uZXIgd3JhcHBlciBzdHJpbmdcbiAgICAgICAgaWYgKCdlZGdlUGFkZGluZycgaW4gb3B0cyB8fCAnZ3V0dGVyJyBpbiBvcHRzKSB7XG4gICAgICAgICAgaW5uZXJXcmFwcGVyU3RyID0gJyMnICsgc2xpZGVJZCArICctaXd7JyArIGdldElubmVyV3JhcHBlclN0eWxlcyhlZGdlUGFkZGluZ0JQLCBndXR0ZXJCUCwgZml4ZWRXaWR0aEJQLCBzcGVlZEJQLCBhdXRvSGVpZ2h0QlApICsgJ30nO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29udGFpbmVyIHN0cmluZ1xuICAgICAgICBpZiAoY2Fyb3VzZWwgJiYgaG9yaXpvbnRhbCAmJiAhYXV0b1dpZHRoICYmICgnZml4ZWRXaWR0aCcgaW4gb3B0cyB8fCAnaXRlbXMnIGluIG9wdHMgfHwgKGZpeGVkV2lkdGggJiYgJ2d1dHRlcicgaW4gb3B0cykpKSB7XG4gICAgICAgICAgY29udGFpbmVyU3RyID0gJ3dpZHRoOicgKyBnZXRDb250YWluZXJXaWR0aChmaXhlZFdpZHRoQlAsIGd1dHRlckJQLCBpdGVtc0JQKSArICc7JztcbiAgICAgICAgfVxuICAgICAgICBpZiAoVFJBTlNJVElPTkRVUkFUSU9OICYmICdzcGVlZCcgaW4gb3B0cykge1xuICAgICAgICAgIGNvbnRhaW5lclN0ciArPSBnZXRUcmFuc2l0aW9uRHVyYXRpb25TdHlsZShzcGVlZEJQKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29udGFpbmVyU3RyKSB7XG4gICAgICAgICAgY29udGFpbmVyU3RyID0gJyMnICsgc2xpZGVJZCArICd7JyArIGNvbnRhaW5lclN0ciArICd9JztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNsaWRlIHN0cmluZ1xuICAgICAgICBpZiAoJ2ZpeGVkV2lkdGgnIGluIG9wdHMgfHwgKGZpeGVkV2lkdGggJiYgJ2d1dHRlcicgaW4gb3B0cykgfHwgIWNhcm91c2VsICYmICdpdGVtcycgaW4gb3B0cykge1xuICAgICAgICAgIHNsaWRlU3RyICs9IGdldFNsaWRlV2lkdGhTdHlsZShmaXhlZFdpZHRoQlAsIGd1dHRlckJQLCBpdGVtc0JQKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoJ2d1dHRlcicgaW4gb3B0cykge1xuICAgICAgICAgIHNsaWRlU3RyICs9IGdldFNsaWRlR3V0dGVyU3R5bGUoZ3V0dGVyQlApO1xuICAgICAgICB9XG4gICAgICAgIC8vIHNldCBnYWxsZXJ5IGl0ZW1zIHRyYW5zaXRpb24tZHVyYXRpb25cbiAgICAgICAgaWYgKCFjYXJvdXNlbCAmJiAnc3BlZWQnIGluIG9wdHMpIHtcbiAgICAgICAgICBpZiAoVFJBTlNJVElPTkRVUkFUSU9OKSB7IHNsaWRlU3RyICs9IGdldFRyYW5zaXRpb25EdXJhdGlvblN0eWxlKHNwZWVkQlApOyB9XG4gICAgICAgICAgaWYgKEFOSU1BVElPTkRVUkFUSU9OKSB7IHNsaWRlU3RyICs9IGdldEFuaW1hdGlvbkR1cmF0aW9uU3R5bGUoc3BlZWRCUCk7IH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoc2xpZGVTdHIpIHsgc2xpZGVTdHIgPSAnIycgKyBzbGlkZUlkICsgJyA+IC50bnMtaXRlbXsnICsgc2xpZGVTdHIgKyAnfSc7IH1cblxuICAgICAgICAvLyBhZGQgdXBcbiAgICAgICAgc3RyID0gbWlkZGxlV3JhcHBlclN0ciArIGlubmVyV3JhcHBlclN0ciArIGNvbnRhaW5lclN0ciArIHNsaWRlU3RyO1xuXG4gICAgICAgIGlmIChzdHIpIHtcbiAgICAgICAgICBzaGVldC5pbnNlcnRSdWxlKCdAbWVkaWEgKG1pbi13aWR0aDogJyArIGJwIC8gMTYgKyAnZW0pIHsnICsgc3RyICsgJ30nLCBzaGVldC5jc3NSdWxlcy5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaW5pdFRvb2xzICgpIHtcbiAgICAvLyA9PSBzbGlkZXMgPT1cbiAgICB1cGRhdGVTbGlkZVN0YXR1cygpO1xuXG4gICAgLy8gPT0gbGl2ZSByZWdpb24gPT1cbiAgICBvdXRlcldyYXBwZXIuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgJzxkaXYgY2xhc3M9XCJ0bnMtbGl2ZXJlZ2lvbiB0bnMtdmlzdWFsbHktaGlkZGVuXCIgYXJpYS1saXZlPVwicG9saXRlXCIgYXJpYS1hdG9taWM9XCJ0cnVlXCI+c2xpZGUgPHNwYW4gY2xhc3M9XCJjdXJyZW50XCI+JyArIGdldExpdmVSZWdpb25TdHIoKSArICc8L3NwYW4+ICBvZiAnICsgc2xpZGVDb3VudCArICc8L2Rpdj4nKTtcbiAgICBsaXZlcmVnaW9uQ3VycmVudCA9IG91dGVyV3JhcHBlci5xdWVyeVNlbGVjdG9yKCcudG5zLWxpdmVyZWdpb24gLmN1cnJlbnQnKTtcblxuICAgIC8vID09IGF1dG9wbGF5SW5pdCA9PVxuICAgIGlmIChoYXNBdXRvcGxheSkge1xuICAgICAgdmFyIHR4dCA9IGF1dG9wbGF5ID8gJ3N0b3AnIDogJ3N0YXJ0JztcbiAgICAgIGlmIChhdXRvcGxheUJ1dHRvbikge1xuICAgICAgICBzZXRBdHRycyhhdXRvcGxheUJ1dHRvbiwgeydkYXRhLWFjdGlvbic6IHR4dH0pO1xuICAgICAgfSBlbHNlIGlmIChvcHRpb25zLmF1dG9wbGF5QnV0dG9uT3V0cHV0KSB7XG4gICAgICAgIG91dGVyV3JhcHBlci5pbnNlcnRBZGphY2VudEhUTUwoZ2V0SW5zZXJ0UG9zaXRpb24ob3B0aW9ucy5hdXRvcGxheVBvc2l0aW9uKSwgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGRhdGEtYWN0aW9uPVwiJyArIHR4dCArICdcIj4nICsgYXV0b3BsYXlIdG1sU3RyaW5nc1swXSArIHR4dCArIGF1dG9wbGF5SHRtbFN0cmluZ3NbMV0gKyBhdXRvcGxheVRleHRbMF0gKyAnPC9idXR0b24+Jyk7XG4gICAgICAgIGF1dG9wbGF5QnV0dG9uID0gb3V0ZXJXcmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWFjdGlvbl0nKTtcbiAgICAgIH1cblxuICAgICAgLy8gYWRkIGV2ZW50XG4gICAgICBpZiAoYXV0b3BsYXlCdXR0b24pIHtcbiAgICAgICAgYWRkRXZlbnRzKGF1dG9wbGF5QnV0dG9uLCB7J2NsaWNrJzogdG9nZ2xlQXV0b3BsYXl9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGF1dG9wbGF5KSB7XG4gICAgICAgIHN0YXJ0QXV0b3BsYXkoKTtcbiAgICAgICAgaWYgKGF1dG9wbGF5SG92ZXJQYXVzZSkgeyBhZGRFdmVudHMoY29udGFpbmVyLCBob3ZlckV2ZW50cyk7IH1cbiAgICAgICAgaWYgKGF1dG9wbGF5UmVzZXRPblZpc2liaWxpdHkpIHsgYWRkRXZlbnRzKGNvbnRhaW5lciwgdmlzaWJpbGl0eUV2ZW50KTsgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vID09IG5hdkluaXQgPT1cbiAgICBpZiAoaGFzTmF2KSB7XG4gICAgICB2YXIgaW5pdEluZGV4ID0gIWNhcm91c2VsID8gMCA6IGNsb25lQ291bnQ7XG4gICAgICAvLyBjdXN0b21pemVkIG5hdlxuICAgICAgLy8gd2lsbCBub3QgaGlkZSB0aGUgbmF2cyBpbiBjYXNlIHRoZXkncmUgdGh1bWJuYWlsc1xuICAgICAgaWYgKG5hdkNvbnRhaW5lcikge1xuICAgICAgICBzZXRBdHRycyhuYXZDb250YWluZXIsIHsnYXJpYS1sYWJlbCc6ICdDYXJvdXNlbCBQYWdpbmF0aW9uJ30pO1xuICAgICAgICBuYXZJdGVtcyA9IG5hdkNvbnRhaW5lci5jaGlsZHJlbjtcbiAgICAgICAgZm9yRWFjaChuYXZJdGVtcywgZnVuY3Rpb24oaXRlbSwgaSkge1xuICAgICAgICAgIHNldEF0dHJzKGl0ZW0sIHtcbiAgICAgICAgICAgICdkYXRhLW5hdic6IGksXG4gICAgICAgICAgICAndGFiaW5kZXgnOiAnLTEnLFxuICAgICAgICAgICAgJ2FyaWEtbGFiZWwnOiBuYXZTdHIgKyAoaSArIDEpLFxuICAgICAgICAgICAgJ2FyaWEtY29udHJvbHMnOiBzbGlkZUlkLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgLy8gZ2VuZXJhdGVkIG5hdlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIG5hdkh0bWwgPSAnJyxcbiAgICAgICAgICAgIGhpZGRlblN0ciA9IG5hdkFzVGh1bWJuYWlscyA/ICcnIDogJ3N0eWxlPVwiZGlzcGxheTpub25lXCInO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlQ291bnQ7IGkrKykge1xuICAgICAgICAgIC8vIGhpZGUgbmF2IGl0ZW1zIGJ5IGRlZmF1bHRcbiAgICAgICAgICBuYXZIdG1sICs9ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBkYXRhLW5hdj1cIicgKyBpICsnXCIgdGFiaW5kZXg9XCItMVwiIGFyaWEtY29udHJvbHM9XCInICsgc2xpZGVJZCArICdcIiAnICsgaGlkZGVuU3RyICsgJyBhcmlhLWxhYmVsPVwiJyArIG5hdlN0ciArIChpICsgMSkgKydcIj48L2J1dHRvbj4nO1xuICAgICAgICB9XG4gICAgICAgIG5hdkh0bWwgPSAnPGRpdiBjbGFzcz1cInRucy1uYXZcIiBhcmlhLWxhYmVsPVwiQ2Fyb3VzZWwgUGFnaW5hdGlvblwiPicgKyBuYXZIdG1sICsgJzwvZGl2Pic7XG4gICAgICAgIG91dGVyV3JhcHBlci5pbnNlcnRBZGphY2VudEhUTUwoZ2V0SW5zZXJ0UG9zaXRpb24ob3B0aW9ucy5uYXZQb3NpdGlvbiksIG5hdkh0bWwpO1xuXG4gICAgICAgIG5hdkNvbnRhaW5lciA9IG91dGVyV3JhcHBlci5xdWVyeVNlbGVjdG9yKCcudG5zLW5hdicpO1xuICAgICAgICBuYXZJdGVtcyA9IG5hdkNvbnRhaW5lci5jaGlsZHJlbjtcbiAgICAgIH1cblxuICAgICAgdXBkYXRlTmF2VmlzaWJpbGl0eSgpO1xuXG4gICAgICAvLyBhZGQgdHJhbnNpdGlvblxuICAgICAgaWYgKFRSQU5TSVRJT05EVVJBVElPTikge1xuICAgICAgICB2YXIgcHJlZml4ID0gVFJBTlNJVElPTkRVUkFUSU9OLnN1YnN0cmluZygwLCBUUkFOU0lUSU9ORFVSQVRJT04ubGVuZ3RoIC0gMTgpLnRvTG93ZXJDYXNlKCksXG4gICAgICAgICAgICBzdHIgPSAndHJhbnNpdGlvbjogYWxsICcgKyBzcGVlZCAvIDEwMDAgKyAncyc7XG5cbiAgICAgICAgaWYgKHByZWZpeCkge1xuICAgICAgICAgIHN0ciA9ICctJyArIHByZWZpeCArICctJyArIHN0cjtcbiAgICAgICAgfVxuXG4gICAgICAgIGFkZENTU1J1bGUoc2hlZXQsICdbYXJpYS1jb250cm9sc149JyArIHNsaWRlSWQgKyAnLWl0ZW1dJywgc3RyLCBnZXRDc3NSdWxlc0xlbmd0aChzaGVldCkpO1xuICAgICAgfVxuXG4gICAgICBzZXRBdHRycyhuYXZJdGVtc1tuYXZDdXJyZW50SW5kZXhdLCB7J2FyaWEtbGFiZWwnOiBuYXZTdHIgKyAobmF2Q3VycmVudEluZGV4ICsgMSkgKyBuYXZTdHJDdXJyZW50fSk7XG4gICAgICByZW1vdmVBdHRycyhuYXZJdGVtc1tuYXZDdXJyZW50SW5kZXhdLCAndGFiaW5kZXgnKTtcbiAgICAgIGFkZENsYXNzKG5hdkl0ZW1zW25hdkN1cnJlbnRJbmRleF0sIG5hdkFjdGl2ZUNsYXNzKTtcblxuICAgICAgLy8gYWRkIGV2ZW50c1xuICAgICAgYWRkRXZlbnRzKG5hdkNvbnRhaW5lciwgbmF2RXZlbnRzKTtcbiAgICB9XG5cblxuXG4gICAgLy8gPT0gY29udHJvbHNJbml0ID09XG4gICAgaWYgKGhhc0NvbnRyb2xzKSB7XG4gICAgICBpZiAoIWNvbnRyb2xzQ29udGFpbmVyICYmICghcHJldkJ1dHRvbiB8fCAhbmV4dEJ1dHRvbikpIHtcbiAgICAgICAgb3V0ZXJXcmFwcGVyLmluc2VydEFkamFjZW50SFRNTChnZXRJbnNlcnRQb3NpdGlvbihvcHRpb25zLmNvbnRyb2xzUG9zaXRpb24pLCAnPGRpdiBjbGFzcz1cInRucy1jb250cm9sc1wiIGFyaWEtbGFiZWw9XCJDYXJvdXNlbCBOYXZpZ2F0aW9uXCIgdGFiaW5kZXg9XCIwXCI+PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgZGF0YS1jb250cm9scz1cInByZXZcIiB0YWJpbmRleD1cIi0xXCIgYXJpYS1jb250cm9scz1cIicgKyBzbGlkZUlkICsnXCI+JyArIGNvbnRyb2xzVGV4dFswXSArICc8L2J1dHRvbj48YnV0dG9uIHR5cGU9XCJidXR0b25cIiBkYXRhLWNvbnRyb2xzPVwibmV4dFwiIHRhYmluZGV4PVwiLTFcIiBhcmlhLWNvbnRyb2xzPVwiJyArIHNsaWRlSWQgKydcIj4nICsgY29udHJvbHNUZXh0WzFdICsgJzwvYnV0dG9uPjwvZGl2PicpO1xuXG4gICAgICAgIGNvbnRyb2xzQ29udGFpbmVyID0gb3V0ZXJXcmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy50bnMtY29udHJvbHMnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFwcmV2QnV0dG9uIHx8ICFuZXh0QnV0dG9uKSB7XG4gICAgICAgIHByZXZCdXR0b24gPSBjb250cm9sc0NvbnRhaW5lci5jaGlsZHJlblswXTtcbiAgICAgICAgbmV4dEJ1dHRvbiA9IGNvbnRyb2xzQ29udGFpbmVyLmNoaWxkcmVuWzFdO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9ucy5jb250cm9sc0NvbnRhaW5lcikge1xuICAgICAgICBzZXRBdHRycyhjb250cm9sc0NvbnRhaW5lciwge1xuICAgICAgICAgICdhcmlhLWxhYmVsJzogJ0Nhcm91c2VsIE5hdmlnYXRpb24nLFxuICAgICAgICAgICd0YWJpbmRleCc6ICcwJ1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMuY29udHJvbHNDb250YWluZXIgfHwgKG9wdGlvbnMucHJldkJ1dHRvbiAmJiBvcHRpb25zLm5leHRCdXR0b24pKSB7XG4gICAgICAgIHNldEF0dHJzKFtwcmV2QnV0dG9uLCBuZXh0QnV0dG9uXSwge1xuICAgICAgICAgICdhcmlhLWNvbnRyb2xzJzogc2xpZGVJZCxcbiAgICAgICAgICAndGFiaW5kZXgnOiAnLTEnLFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMuY29udHJvbHNDb250YWluZXIgfHwgKG9wdGlvbnMucHJldkJ1dHRvbiAmJiBvcHRpb25zLm5leHRCdXR0b24pKSB7XG4gICAgICAgIHNldEF0dHJzKHByZXZCdXR0b24sIHsnZGF0YS1jb250cm9scycgOiAncHJldid9KTtcbiAgICAgICAgc2V0QXR0cnMobmV4dEJ1dHRvbiwgeydkYXRhLWNvbnRyb2xzJyA6ICduZXh0J30pO1xuICAgICAgfVxuXG4gICAgICBwcmV2SXNCdXR0b24gPSBpc0J1dHRvbihwcmV2QnV0dG9uKTtcbiAgICAgIG5leHRJc0J1dHRvbiA9IGlzQnV0dG9uKG5leHRCdXR0b24pO1xuXG4gICAgICB1cGRhdGVDb250cm9sc1N0YXR1cygpO1xuXG4gICAgICAvLyBhZGQgZXZlbnRzXG4gICAgICBpZiAoY29udHJvbHNDb250YWluZXIpIHtcbiAgICAgICAgYWRkRXZlbnRzKGNvbnRyb2xzQ29udGFpbmVyLCBjb250cm9sc0V2ZW50cyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhZGRFdmVudHMocHJldkJ1dHRvbiwgY29udHJvbHNFdmVudHMpO1xuICAgICAgICBhZGRFdmVudHMobmV4dEJ1dHRvbiwgY29udHJvbHNFdmVudHMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGhpZGUgdG9vbHMgaWYgbmVlZGVkXG4gICAgZGlzYWJsZVVJKCk7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0RXZlbnRzICgpIHtcbiAgICAvLyBhZGQgZXZlbnRzXG4gICAgaWYgKGNhcm91c2VsICYmIFRSQU5TSVRJT05FTkQpIHtcbiAgICAgIHZhciBldmUgPSB7fTtcbiAgICAgIGV2ZVtUUkFOU0lUSU9ORU5EXSA9IG9uVHJhbnNpdGlvbkVuZDtcbiAgICAgIGFkZEV2ZW50cyhjb250YWluZXIsIGV2ZSk7XG4gICAgfVxuXG4gICAgaWYgKHRvdWNoKSB7IGFkZEV2ZW50cyhjb250YWluZXIsIHRvdWNoRXZlbnRzLCBvcHRpb25zLnByZXZlbnRTY3JvbGxPblRvdWNoKTsgfVxuICAgIGlmIChtb3VzZURyYWcpIHsgYWRkRXZlbnRzKGNvbnRhaW5lciwgZHJhZ0V2ZW50cyk7IH1cbiAgICBpZiAoYXJyb3dLZXlzKSB7IGFkZEV2ZW50cyhkb2MsIGRvY21lbnRLZXlkb3duRXZlbnQpOyB9XG5cbiAgICBpZiAobmVzdGVkID09PSAnaW5uZXInKSB7XG4gICAgICBldmVudHMub24oJ291dGVyUmVzaXplZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVzaXplVGFza3MoKTtcbiAgICAgICAgZXZlbnRzLmVtaXQoJ2lubmVyTG9hZGVkJywgaW5mbygpKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAocmVzcG9uc2l2ZSB8fCBmaXhlZFdpZHRoIHx8IGF1dG9XaWR0aCB8fCBhdXRvSGVpZ2h0IHx8ICFob3Jpem9udGFsKSB7XG4gICAgICBhZGRFdmVudHMod2luLCB7J3Jlc2l6ZSc6IG9uUmVzaXplfSk7XG4gICAgfVxuXG4gICAgaWYgKGF1dG9IZWlnaHQpIHtcbiAgICAgIGlmIChuZXN0ZWQgPT09ICdvdXRlcicpIHtcbiAgICAgICAgZXZlbnRzLm9uKCdpbm5lckxvYWRlZCcsIGRvQXV0b0hlaWdodCk7XG4gICAgICB9IGVsc2UgaWYgKCFkaXNhYmxlKSB7IGRvQXV0b0hlaWdodCgpOyB9XG4gICAgfVxuXG4gICAgZG9MYXp5TG9hZCgpO1xuICAgIGlmIChkaXNhYmxlKSB7IGRpc2FibGVTbGlkZXIoKTsgfSBlbHNlIGlmIChmcmVlemUpIHsgZnJlZXplU2xpZGVyKCk7IH1cblxuICAgIGV2ZW50cy5vbignaW5kZXhDaGFuZ2VkJywgYWRkaXRpb25hbFVwZGF0ZXMpO1xuICAgIGlmIChuZXN0ZWQgPT09ICdpbm5lcicpIHsgZXZlbnRzLmVtaXQoJ2lubmVyTG9hZGVkJywgaW5mbygpKTsgfVxuICAgIGlmICh0eXBlb2Ygb25Jbml0ID09PSAnZnVuY3Rpb24nKSB7IG9uSW5pdChpbmZvKCkpOyB9XG4gICAgaXNPbiA9IHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95ICgpIHtcbiAgICAvLyBzaGVldFxuICAgIHNoZWV0LmRpc2FibGVkID0gdHJ1ZTtcbiAgICBpZiAoc2hlZXQub3duZXJOb2RlKSB7IHNoZWV0Lm93bmVyTm9kZS5yZW1vdmUoKTsgfVxuXG4gICAgLy8gcmVtb3ZlIHdpbiBldmVudCBsaXN0ZW5lcnNcbiAgICByZW1vdmVFdmVudHMod2luLCB7J3Jlc2l6ZSc6IG9uUmVzaXplfSk7XG5cbiAgICAvLyBhcnJvd0tleXMsIGNvbnRyb2xzLCBuYXZcbiAgICBpZiAoYXJyb3dLZXlzKSB7IHJlbW92ZUV2ZW50cyhkb2MsIGRvY21lbnRLZXlkb3duRXZlbnQpOyB9XG4gICAgaWYgKGNvbnRyb2xzQ29udGFpbmVyKSB7IHJlbW92ZUV2ZW50cyhjb250cm9sc0NvbnRhaW5lciwgY29udHJvbHNFdmVudHMpOyB9XG4gICAgaWYgKG5hdkNvbnRhaW5lcikgeyByZW1vdmVFdmVudHMobmF2Q29udGFpbmVyLCBuYXZFdmVudHMpOyB9XG5cbiAgICAvLyBhdXRvcGxheVxuICAgIHJlbW92ZUV2ZW50cyhjb250YWluZXIsIGhvdmVyRXZlbnRzKTtcbiAgICByZW1vdmVFdmVudHMoY29udGFpbmVyLCB2aXNpYmlsaXR5RXZlbnQpO1xuICAgIGlmIChhdXRvcGxheUJ1dHRvbikgeyByZW1vdmVFdmVudHMoYXV0b3BsYXlCdXR0b24sIHsnY2xpY2snOiB0b2dnbGVBdXRvcGxheX0pOyB9XG4gICAgaWYgKGF1dG9wbGF5KSB7IGNsZWFySW50ZXJ2YWwoYXV0b3BsYXlUaW1lcik7IH1cblxuICAgIC8vIGNvbnRhaW5lclxuICAgIGlmIChjYXJvdXNlbCAmJiBUUkFOU0lUSU9ORU5EKSB7XG4gICAgICB2YXIgZXZlID0ge307XG4gICAgICBldmVbVFJBTlNJVElPTkVORF0gPSBvblRyYW5zaXRpb25FbmQ7XG4gICAgICByZW1vdmVFdmVudHMoY29udGFpbmVyLCBldmUpO1xuICAgIH1cbiAgICBpZiAodG91Y2gpIHsgcmVtb3ZlRXZlbnRzKGNvbnRhaW5lciwgdG91Y2hFdmVudHMpOyB9XG4gICAgaWYgKG1vdXNlRHJhZykgeyByZW1vdmVFdmVudHMoY29udGFpbmVyLCBkcmFnRXZlbnRzKTsgfVxuXG4gICAgLy8gY2FjaGUgT2JqZWN0IHZhbHVlcyBpbiBvcHRpb25zICYmIHJlc2V0IEhUTUxcbiAgICB2YXIgaHRtbExpc3QgPSBbY29udGFpbmVySFRNTCwgY29udHJvbHNDb250YWluZXJIVE1MLCBwcmV2QnV0dG9uSFRNTCwgbmV4dEJ1dHRvbkhUTUwsIG5hdkNvbnRhaW5lckhUTUwsIGF1dG9wbGF5QnV0dG9uSFRNTF07XG5cbiAgICB0bnNMaXN0LmZvckVhY2goZnVuY3Rpb24oaXRlbSwgaSkge1xuICAgICAgdmFyIGVsID0gaXRlbSA9PT0gJ2NvbnRhaW5lcicgPyBvdXRlcldyYXBwZXIgOiBvcHRpb25zW2l0ZW1dO1xuXG4gICAgICBpZiAodHlwZW9mIGVsID09PSAnb2JqZWN0JyAmJiBlbCkge1xuICAgICAgICB2YXIgcHJldkVsID0gZWwucHJldmlvdXNFbGVtZW50U2libGluZyA/IGVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgOiBmYWxzZSxcbiAgICAgICAgICAgIHBhcmVudEVsID0gZWwucGFyZW50Tm9kZTtcbiAgICAgICAgZWwub3V0ZXJIVE1MID0gaHRtbExpc3RbaV07XG4gICAgICAgIG9wdGlvbnNbaXRlbV0gPSBwcmV2RWwgPyBwcmV2RWwubmV4dEVsZW1lbnRTaWJsaW5nIDogcGFyZW50RWwuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICB9XG4gICAgfSk7XG5cblxuICAgIC8vIHJlc2V0IHZhcmlhYmxlc1xuICAgIHRuc0xpc3QgPSBhbmltYXRlSW4gPSBhbmltYXRlT3V0ID0gYW5pbWF0ZURlbGF5ID0gYW5pbWF0ZU5vcm1hbCA9IGhvcml6b250YWwgPSBvdXRlcldyYXBwZXIgPSBpbm5lcldyYXBwZXIgPSBjb250YWluZXIgPSBjb250YWluZXJQYXJlbnQgPSBjb250YWluZXJIVE1MID0gc2xpZGVJdGVtcyA9IHNsaWRlQ291bnQgPSBicmVha3BvaW50Wm9uZSA9IHdpbmRvd1dpZHRoID0gYXV0b1dpZHRoID0gZml4ZWRXaWR0aCA9IGVkZ2VQYWRkaW5nID0gZ3V0dGVyID0gdmlld3BvcnQgPSBpdGVtcyA9IHNsaWRlQnkgPSB2aWV3cG9ydE1heCA9IGFycm93S2V5cyA9IHNwZWVkID0gcmV3aW5kID0gbG9vcCA9IGF1dG9IZWlnaHQgPSBzaGVldCA9IGxhenlsb2FkID0gc2xpZGVQb3NpdGlvbnMgPSBzbGlkZUl0ZW1zT3V0ID0gY2xvbmVDb3VudCA9IHNsaWRlQ291bnROZXcgPSBoYXNSaWdodERlYWRab25lID0gcmlnaHRCb3VuZGFyeSA9IHVwZGF0ZUluZGV4QmVmb3JlVHJhbnNmb3JtID0gdHJhbnNmb3JtQXR0ciA9IHRyYW5zZm9ybVByZWZpeCA9IHRyYW5zZm9ybVBvc3RmaXggPSBnZXRJbmRleE1heCA9IGluZGV4ID0gaW5kZXhDYWNoZWQgPSBpbmRleE1pbiA9IGluZGV4TWF4ID0gcmVzaXplVGltZXIgPSBzd2lwZUFuZ2xlID0gbW92ZURpcmVjdGlvbkV4cGVjdGVkID0gcnVubmluZyA9IG9uSW5pdCA9IGV2ZW50cyA9IG5ld0NvbnRhaW5lckNsYXNzZXMgPSBzbGlkZUlkID0gZGlzYWJsZSA9IGRpc2FibGVkID0gZnJlZXphYmxlID0gZnJlZXplID0gZnJvemVuID0gY29udHJvbHNFdmVudHMgPSBuYXZFdmVudHMgPSBob3ZlckV2ZW50cyA9IHZpc2liaWxpdHlFdmVudCA9IGRvY21lbnRLZXlkb3duRXZlbnQgPSB0b3VjaEV2ZW50cyA9IGRyYWdFdmVudHMgPSBoYXNDb250cm9scyA9IGhhc05hdiA9IG5hdkFzVGh1bWJuYWlscyA9IGhhc0F1dG9wbGF5ID0gaGFzVG91Y2ggPSBoYXNNb3VzZURyYWcgPSBzbGlkZUFjdGl2ZUNsYXNzID0gaW1nQ29tcGxldGVDbGFzcyA9IGltZ0V2ZW50cyA9IGltZ3NDb21wbGV0ZSA9IGNvbnRyb2xzID0gY29udHJvbHNUZXh0ID0gY29udHJvbHNDb250YWluZXIgPSBjb250cm9sc0NvbnRhaW5lckhUTUwgPSBwcmV2QnV0dG9uID0gbmV4dEJ1dHRvbiA9IHByZXZJc0J1dHRvbiA9IG5leHRJc0J1dHRvbiA9IG5hdiA9IG5hdkNvbnRhaW5lciA9IG5hdkNvbnRhaW5lckhUTUwgPSBuYXZJdGVtcyA9IHBhZ2VzID0gcGFnZXNDYWNoZWQgPSBuYXZDbGlja2VkID0gbmF2Q3VycmVudEluZGV4ID0gbmF2Q3VycmVudEluZGV4Q2FjaGVkID0gbmF2QWN0aXZlQ2xhc3MgPSBuYXZTdHIgPSBuYXZTdHJDdXJyZW50ID0gYXV0b3BsYXkgPSBhdXRvcGxheVRpbWVvdXQgPSBhdXRvcGxheURpcmVjdGlvbiA9IGF1dG9wbGF5VGV4dCA9IGF1dG9wbGF5SG92ZXJQYXVzZSA9IGF1dG9wbGF5QnV0dG9uID0gYXV0b3BsYXlCdXR0b25IVE1MID0gYXV0b3BsYXlSZXNldE9uVmlzaWJpbGl0eSA9IGF1dG9wbGF5SHRtbFN0cmluZ3MgPSBhdXRvcGxheVRpbWVyID0gYW5pbWF0aW5nID0gYXV0b3BsYXlIb3ZlclBhdXNlZCA9IGF1dG9wbGF5VXNlclBhdXNlZCA9IGF1dG9wbGF5VmlzaWJpbGl0eVBhdXNlZCA9IGluaXRQb3NpdGlvbiA9IGxhc3RQb3NpdGlvbiA9IHRyYW5zbGF0ZUluaXQgPSBkaXNYID0gZGlzWSA9IHBhblN0YXJ0ID0gcmFmSW5kZXggPSBnZXREaXN0ID0gdG91Y2ggPSBtb3VzZURyYWcgPSBudWxsO1xuICAgIC8vIGNoZWNrIHZhcmlhYmxlc1xuICAgIC8vIFthbmltYXRlSW4sIGFuaW1hdGVPdXQsIGFuaW1hdGVEZWxheSwgYW5pbWF0ZU5vcm1hbCwgaG9yaXpvbnRhbCwgb3V0ZXJXcmFwcGVyLCBpbm5lcldyYXBwZXIsIGNvbnRhaW5lciwgY29udGFpbmVyUGFyZW50LCBjb250YWluZXJIVE1MLCBzbGlkZUl0ZW1zLCBzbGlkZUNvdW50LCBicmVha3BvaW50Wm9uZSwgd2luZG93V2lkdGgsIGF1dG9XaWR0aCwgZml4ZWRXaWR0aCwgZWRnZVBhZGRpbmcsIGd1dHRlciwgdmlld3BvcnQsIGl0ZW1zLCBzbGlkZUJ5LCB2aWV3cG9ydE1heCwgYXJyb3dLZXlzLCBzcGVlZCwgcmV3aW5kLCBsb29wLCBhdXRvSGVpZ2h0LCBzaGVldCwgbGF6eWxvYWQsIHNsaWRlUG9zaXRpb25zLCBzbGlkZUl0ZW1zT3V0LCBjbG9uZUNvdW50LCBzbGlkZUNvdW50TmV3LCBoYXNSaWdodERlYWRab25lLCByaWdodEJvdW5kYXJ5LCB1cGRhdGVJbmRleEJlZm9yZVRyYW5zZm9ybSwgdHJhbnNmb3JtQXR0ciwgdHJhbnNmb3JtUHJlZml4LCB0cmFuc2Zvcm1Qb3N0Zml4LCBnZXRJbmRleE1heCwgaW5kZXgsIGluZGV4Q2FjaGVkLCBpbmRleE1pbiwgaW5kZXhNYXgsIHJlc2l6ZVRpbWVyLCBzd2lwZUFuZ2xlLCBtb3ZlRGlyZWN0aW9uRXhwZWN0ZWQsIHJ1bm5pbmcsIG9uSW5pdCwgZXZlbnRzLCBuZXdDb250YWluZXJDbGFzc2VzLCBzbGlkZUlkLCBkaXNhYmxlLCBkaXNhYmxlZCwgZnJlZXphYmxlLCBmcmVlemUsIGZyb3plbiwgY29udHJvbHNFdmVudHMsIG5hdkV2ZW50cywgaG92ZXJFdmVudHMsIHZpc2liaWxpdHlFdmVudCwgZG9jbWVudEtleWRvd25FdmVudCwgdG91Y2hFdmVudHMsIGRyYWdFdmVudHMsIGhhc0NvbnRyb2xzLCBoYXNOYXYsIG5hdkFzVGh1bWJuYWlscywgaGFzQXV0b3BsYXksIGhhc1RvdWNoLCBoYXNNb3VzZURyYWcsIHNsaWRlQWN0aXZlQ2xhc3MsIGltZ0NvbXBsZXRlQ2xhc3MsIGltZ0V2ZW50cywgaW1nc0NvbXBsZXRlLCBjb250cm9scywgY29udHJvbHNUZXh0LCBjb250cm9sc0NvbnRhaW5lciwgY29udHJvbHNDb250YWluZXJIVE1MLCBwcmV2QnV0dG9uLCBuZXh0QnV0dG9uLCBwcmV2SXNCdXR0b24sIG5leHRJc0J1dHRvbiwgbmF2LCBuYXZDb250YWluZXIsIG5hdkNvbnRhaW5lckhUTUwsIG5hdkl0ZW1zLCBwYWdlcywgcGFnZXNDYWNoZWQsIG5hdkNsaWNrZWQsIG5hdkN1cnJlbnRJbmRleCwgbmF2Q3VycmVudEluZGV4Q2FjaGVkLCBuYXZBY3RpdmVDbGFzcywgbmF2U3RyLCBuYXZTdHJDdXJyZW50LCBhdXRvcGxheSwgYXV0b3BsYXlUaW1lb3V0LCBhdXRvcGxheURpcmVjdGlvbiwgYXV0b3BsYXlUZXh0LCBhdXRvcGxheUhvdmVyUGF1c2UsIGF1dG9wbGF5QnV0dG9uLCBhdXRvcGxheUJ1dHRvbkhUTUwsIGF1dG9wbGF5UmVzZXRPblZpc2liaWxpdHksIGF1dG9wbGF5SHRtbFN0cmluZ3MsIGF1dG9wbGF5VGltZXIsIGFuaW1hdGluZywgYXV0b3BsYXlIb3ZlclBhdXNlZCwgYXV0b3BsYXlVc2VyUGF1c2VkLCBhdXRvcGxheVZpc2liaWxpdHlQYXVzZWQsIGluaXRQb3NpdGlvbiwgbGFzdFBvc2l0aW9uLCB0cmFuc2xhdGVJbml0LCBkaXNYLCBkaXNZLCBwYW5TdGFydCwgcmFmSW5kZXgsIGdldERpc3QsIHRvdWNoLCBtb3VzZURyYWcgXS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHsgaWYgKGl0ZW0gIT09IG51bGwpIHsgY29uc29sZS5sb2coaXRlbSk7IH0gfSk7XG5cbiAgICBmb3IgKHZhciBhIGluIHRoaXMpIHtcbiAgICAgIGlmIChhICE9PSAncmVidWlsZCcpIHsgdGhpc1thXSA9IG51bGw7IH1cbiAgICB9XG4gICAgaXNPbiA9IGZhbHNlO1xuICB9XG5cbi8vID09PSBPTiBSRVNJWkUgPT09XG4gIC8vIHJlc3BvbnNpdmUgfHwgZml4ZWRXaWR0aCB8fCBhdXRvV2lkdGggfHwgIWhvcml6b250YWxcbiAgZnVuY3Rpb24gb25SZXNpemUgKGUpIHtcbiAgICByYWYoZnVuY3Rpb24oKXsgcmVzaXplVGFza3MoZ2V0RXZlbnQoZSkpOyB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2l6ZVRhc2tzIChlKSB7XG4gICAgaWYgKCFpc09uKSB7IHJldHVybjsgfVxuICAgIGlmIChuZXN0ZWQgPT09ICdvdXRlcicpIHsgZXZlbnRzLmVtaXQoJ291dGVyUmVzaXplZCcsIGluZm8oZSkpOyB9XG4gICAgd2luZG93V2lkdGggPSBnZXRXaW5kb3dXaWR0aCgpO1xuICAgIHZhciBicENoYW5nZWQsXG4gICAgICAgIGJyZWFrcG9pbnRab25lVGVtID0gYnJlYWtwb2ludFpvbmUsXG4gICAgICAgIG5lZWRDb250YWluZXJUcmFuc2Zvcm0gPSBmYWxzZTtcblxuICAgIGlmIChyZXNwb25zaXZlKSB7XG4gICAgICBzZXRCcmVha3BvaW50Wm9uZSgpO1xuICAgICAgYnBDaGFuZ2VkID0gYnJlYWtwb2ludFpvbmVUZW0gIT09IGJyZWFrcG9pbnRab25lO1xuICAgICAgLy8gaWYgKGhhc1JpZ2h0RGVhZFpvbmUpIHsgbmVlZENvbnRhaW5lclRyYW5zZm9ybSA9IHRydWU7IH0gLy8gKj9cbiAgICAgIGlmIChicENoYW5nZWQpIHsgZXZlbnRzLmVtaXQoJ25ld0JyZWFrcG9pbnRTdGFydCcsIGluZm8oZSkpOyB9XG4gICAgfVxuXG4gICAgdmFyIGluZENoYW5nZWQsXG4gICAgICAgIGl0ZW1zQ2hhbmdlZCxcbiAgICAgICAgaXRlbXNUZW0gPSBpdGVtcyxcbiAgICAgICAgZGlzYWJsZVRlbSA9IGRpc2FibGUsXG4gICAgICAgIGZyZWV6ZVRlbSA9IGZyZWV6ZSxcbiAgICAgICAgYXJyb3dLZXlzVGVtID0gYXJyb3dLZXlzLFxuICAgICAgICBjb250cm9sc1RlbSA9IGNvbnRyb2xzLFxuICAgICAgICBuYXZUZW0gPSBuYXYsXG4gICAgICAgIHRvdWNoVGVtID0gdG91Y2gsXG4gICAgICAgIG1vdXNlRHJhZ1RlbSA9IG1vdXNlRHJhZyxcbiAgICAgICAgYXV0b3BsYXlUZW0gPSBhdXRvcGxheSxcbiAgICAgICAgYXV0b3BsYXlIb3ZlclBhdXNlVGVtID0gYXV0b3BsYXlIb3ZlclBhdXNlLFxuICAgICAgICBhdXRvcGxheVJlc2V0T25WaXNpYmlsaXR5VGVtID0gYXV0b3BsYXlSZXNldE9uVmlzaWJpbGl0eSxcbiAgICAgICAgaW5kZXhUZW0gPSBpbmRleDtcblxuICAgIGlmIChicENoYW5nZWQpIHtcbiAgICAgIHZhciBmaXhlZFdpZHRoVGVtID0gZml4ZWRXaWR0aCxcbiAgICAgICAgICBhdXRvSGVpZ2h0VGVtID0gYXV0b0hlaWdodCxcbiAgICAgICAgICBjb250cm9sc1RleHRUZW0gPSBjb250cm9sc1RleHQsXG4gICAgICAgICAgY2VudGVyVGVtID0gY2VudGVyLFxuICAgICAgICAgIGF1dG9wbGF5VGV4dFRlbSA9IGF1dG9wbGF5VGV4dDtcblxuICAgICAgaWYgKCFDU1NNUSkge1xuICAgICAgICB2YXIgZ3V0dGVyVGVtID0gZ3V0dGVyLFxuICAgICAgICAgICAgZWRnZVBhZGRpbmdUZW0gPSBlZGdlUGFkZGluZztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBnZXQgb3B0aW9uOlxuICAgIC8vIGZpeGVkIHdpZHRoOiB2aWV3cG9ydCwgZml4ZWRXaWR0aCwgZ3V0dGVyID0+IGl0ZW1zXG4gICAgLy8gb3RoZXJzOiB3aW5kb3cgd2lkdGggPT4gYWxsIHZhcmlhYmxlc1xuICAgIC8vIGFsbDogaXRlbXMgPT4gc2xpZGVCeVxuICAgIGFycm93S2V5cyA9IGdldE9wdGlvbignYXJyb3dLZXlzJyk7XG4gICAgY29udHJvbHMgPSBnZXRPcHRpb24oJ2NvbnRyb2xzJyk7XG4gICAgbmF2ID0gZ2V0T3B0aW9uKCduYXYnKTtcbiAgICB0b3VjaCA9IGdldE9wdGlvbigndG91Y2gnKTtcbiAgICBjZW50ZXIgPSBnZXRPcHRpb24oJ2NlbnRlcicpO1xuICAgIG1vdXNlRHJhZyA9IGdldE9wdGlvbignbW91c2VEcmFnJyk7XG4gICAgYXV0b3BsYXkgPSBnZXRPcHRpb24oJ2F1dG9wbGF5Jyk7XG4gICAgYXV0b3BsYXlIb3ZlclBhdXNlID0gZ2V0T3B0aW9uKCdhdXRvcGxheUhvdmVyUGF1c2UnKTtcbiAgICBhdXRvcGxheVJlc2V0T25WaXNpYmlsaXR5ID0gZ2V0T3B0aW9uKCdhdXRvcGxheVJlc2V0T25WaXNpYmlsaXR5Jyk7XG5cbiAgICBpZiAoYnBDaGFuZ2VkKSB7XG4gICAgICBkaXNhYmxlID0gZ2V0T3B0aW9uKCdkaXNhYmxlJyk7XG4gICAgICBmaXhlZFdpZHRoID0gZ2V0T3B0aW9uKCdmaXhlZFdpZHRoJyk7XG4gICAgICBzcGVlZCA9IGdldE9wdGlvbignc3BlZWQnKTtcbiAgICAgIGF1dG9IZWlnaHQgPSBnZXRPcHRpb24oJ2F1dG9IZWlnaHQnKTtcbiAgICAgIGNvbnRyb2xzVGV4dCA9IGdldE9wdGlvbignY29udHJvbHNUZXh0Jyk7XG4gICAgICBhdXRvcGxheVRleHQgPSBnZXRPcHRpb24oJ2F1dG9wbGF5VGV4dCcpO1xuICAgICAgYXV0b3BsYXlUaW1lb3V0ID0gZ2V0T3B0aW9uKCdhdXRvcGxheVRpbWVvdXQnKTtcblxuICAgICAgaWYgKCFDU1NNUSkge1xuICAgICAgICBlZGdlUGFkZGluZyA9IGdldE9wdGlvbignZWRnZVBhZGRpbmcnKTtcbiAgICAgICAgZ3V0dGVyID0gZ2V0T3B0aW9uKCdndXR0ZXInKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gdXBkYXRlIG9wdGlvbnNcbiAgICByZXNldFZhcmlibGVzV2hlbkRpc2FibGUoZGlzYWJsZSk7XG5cbiAgICB2aWV3cG9ydCA9IGdldFZpZXdwb3J0V2lkdGgoKTsgLy8gPD0gZWRnZVBhZGRpbmcsIGd1dHRlclxuICAgIGlmICgoIWhvcml6b250YWwgfHwgYXV0b1dpZHRoKSAmJiAhZGlzYWJsZSkge1xuICAgICAgc2V0U2xpZGVQb3NpdGlvbnMoKTtcbiAgICAgIGlmICghaG9yaXpvbnRhbCkge1xuICAgICAgICB1cGRhdGVDb250ZW50V3JhcHBlckhlaWdodCgpOyAvLyA8PSBzZXRTbGlkZVBvc2l0aW9uc1xuICAgICAgICBuZWVkQ29udGFpbmVyVHJhbnNmb3JtID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGZpeGVkV2lkdGggfHwgYXV0b1dpZHRoKSB7XG4gICAgICByaWdodEJvdW5kYXJ5ID0gZ2V0UmlnaHRCb3VuZGFyeSgpOyAvLyBhdXRvV2lkdGg6IDw9IHZpZXdwb3J0LCBzbGlkZVBvc2l0aW9ucywgZ3V0dGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBmaXhlZFdpZHRoOiA8PSB2aWV3cG9ydCwgZml4ZWRXaWR0aCwgZ3V0dGVyXG4gICAgICBpbmRleE1heCA9IGdldEluZGV4TWF4KCk7IC8vIGF1dG9XaWR0aDogPD0gcmlnaHRCb3VuZGFyeSwgc2xpZGVQb3NpdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZml4ZWRXaWR0aDogPD0gcmlnaHRCb3VuZGFyeSwgZml4ZWRXaWR0aCwgZ3V0dGVyXG4gICAgfVxuXG4gICAgaWYgKGJwQ2hhbmdlZCB8fCBmaXhlZFdpZHRoKSB7XG4gICAgICBpdGVtcyA9IGdldE9wdGlvbignaXRlbXMnKTtcbiAgICAgIHNsaWRlQnkgPSBnZXRPcHRpb24oJ3NsaWRlQnknKTtcbiAgICAgIGl0ZW1zQ2hhbmdlZCA9IGl0ZW1zICE9PSBpdGVtc1RlbTtcblxuICAgICAgaWYgKGl0ZW1zQ2hhbmdlZCkge1xuICAgICAgICBpZiAoIWZpeGVkV2lkdGggJiYgIWF1dG9XaWR0aCkgeyBpbmRleE1heCA9IGdldEluZGV4TWF4KCk7IH0gLy8gPD0gaXRlbXNcbiAgICAgICAgLy8gY2hlY2sgaW5kZXggYmVmb3JlIHRyYW5zZm9ybSBpbiBjYXNlXG4gICAgICAgIC8vIHNsaWRlciByZWFjaCB0aGUgcmlnaHQgZWRnZSB0aGVuIGl0ZW1zIGJlY29tZSBiaWdnZXJcbiAgICAgICAgdXBkYXRlSW5kZXgoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoYnBDaGFuZ2VkKSB7XG4gICAgICBpZiAoZGlzYWJsZSAhPT0gZGlzYWJsZVRlbSkge1xuICAgICAgICBpZiAoZGlzYWJsZSkge1xuICAgICAgICAgIGRpc2FibGVTbGlkZXIoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbmFibGVTbGlkZXIoKTsgLy8gPD0gc2xpZGVQb3NpdGlvbnMsIHJpZ2h0Qm91bmRhcnksIGluZGV4TWF4XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZnJlZXphYmxlICYmIChicENoYW5nZWQgfHwgZml4ZWRXaWR0aCB8fCBhdXRvV2lkdGgpKSB7XG4gICAgICBmcmVlemUgPSBnZXRGcmVlemUoKTsgLy8gPD0gYXV0b1dpZHRoOiBzbGlkZVBvc2l0aW9ucywgZ3V0dGVyLCB2aWV3cG9ydCwgcmlnaHRCb3VuZGFyeVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDw9IGZpeGVkV2lkdGg6IGZpeGVkV2lkdGgsIGd1dHRlciwgcmlnaHRCb3VuZGFyeVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDw9IG90aGVyczogaXRlbXNcblxuICAgICAgaWYgKGZyZWV6ZSAhPT0gZnJlZXplVGVtKSB7XG4gICAgICAgIGlmIChmcmVlemUpIHtcbiAgICAgICAgICBkb0NvbnRhaW5lclRyYW5zZm9ybShnZXRDb250YWluZXJUcmFuc2Zvcm1WYWx1ZShnZXRTdGFydEluZGV4KDApKSk7XG4gICAgICAgICAgZnJlZXplU2xpZGVyKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdW5mcmVlemVTbGlkZXIoKTtcbiAgICAgICAgICBuZWVkQ29udGFpbmVyVHJhbnNmb3JtID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJlc2V0VmFyaWJsZXNXaGVuRGlzYWJsZShkaXNhYmxlIHx8IGZyZWV6ZSk7IC8vIGNvbnRyb2xzLCBuYXYsIHRvdWNoLCBtb3VzZURyYWcsIGFycm93S2V5cywgYXV0b3BsYXksIGF1dG9wbGF5SG92ZXJQYXVzZSwgYXV0b3BsYXlSZXNldE9uVmlzaWJpbGl0eVxuICAgIGlmICghYXV0b3BsYXkpIHsgYXV0b3BsYXlIb3ZlclBhdXNlID0gYXV0b3BsYXlSZXNldE9uVmlzaWJpbGl0eSA9IGZhbHNlOyB9XG5cbiAgICBpZiAoYXJyb3dLZXlzICE9PSBhcnJvd0tleXNUZW0pIHtcbiAgICAgIGFycm93S2V5cyA/XG4gICAgICAgIGFkZEV2ZW50cyhkb2MsIGRvY21lbnRLZXlkb3duRXZlbnQpIDpcbiAgICAgICAgcmVtb3ZlRXZlbnRzKGRvYywgZG9jbWVudEtleWRvd25FdmVudCk7XG4gICAgfVxuICAgIGlmIChjb250cm9scyAhPT0gY29udHJvbHNUZW0pIHtcbiAgICAgIGlmIChjb250cm9scykge1xuICAgICAgICBpZiAoY29udHJvbHNDb250YWluZXIpIHtcbiAgICAgICAgICBzaG93RWxlbWVudChjb250cm9sc0NvbnRhaW5lcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHByZXZCdXR0b24pIHsgc2hvd0VsZW1lbnQocHJldkJ1dHRvbik7IH1cbiAgICAgICAgICBpZiAobmV4dEJ1dHRvbikgeyBzaG93RWxlbWVudChuZXh0QnV0dG9uKTsgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoY29udHJvbHNDb250YWluZXIpIHtcbiAgICAgICAgICBoaWRlRWxlbWVudChjb250cm9sc0NvbnRhaW5lcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHByZXZCdXR0b24pIHsgaGlkZUVsZW1lbnQocHJldkJ1dHRvbik7IH1cbiAgICAgICAgICBpZiAobmV4dEJ1dHRvbikgeyBoaWRlRWxlbWVudChuZXh0QnV0dG9uKTsgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChuYXYgIT09IG5hdlRlbSkge1xuICAgICAgaWYgKG5hdikge1xuICAgICAgICBzaG93RWxlbWVudChuYXZDb250YWluZXIpO1xuICAgICAgICB1cGRhdGVOYXZWaXNpYmlsaXR5KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBoaWRlRWxlbWVudChuYXZDb250YWluZXIpXG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0b3VjaCAhPT0gdG91Y2hUZW0pIHtcbiAgICAgIHRvdWNoID9cbiAgICAgICAgYWRkRXZlbnRzKGNvbnRhaW5lciwgdG91Y2hFdmVudHMsIG9wdGlvbnMucHJldmVudFNjcm9sbE9uVG91Y2gpIDpcbiAgICAgICAgcmVtb3ZlRXZlbnRzKGNvbnRhaW5lciwgdG91Y2hFdmVudHMpO1xuICAgIH1cbiAgICBpZiAobW91c2VEcmFnICE9PSBtb3VzZURyYWdUZW0pIHtcbiAgICAgIG1vdXNlRHJhZyA/XG4gICAgICAgIGFkZEV2ZW50cyhjb250YWluZXIsIGRyYWdFdmVudHMpIDpcbiAgICAgICAgcmVtb3ZlRXZlbnRzKGNvbnRhaW5lciwgZHJhZ0V2ZW50cyk7XG4gICAgfVxuICAgIGlmIChhdXRvcGxheSAhPT0gYXV0b3BsYXlUZW0pIHtcbiAgICAgIGlmIChhdXRvcGxheSkge1xuICAgICAgICBpZiAoYXV0b3BsYXlCdXR0b24pIHsgc2hvd0VsZW1lbnQoYXV0b3BsYXlCdXR0b24pOyB9XG4gICAgICAgIGlmICghYW5pbWF0aW5nICYmICFhdXRvcGxheVVzZXJQYXVzZWQpIHsgc3RhcnRBdXRvcGxheSgpOyB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoYXV0b3BsYXlCdXR0b24pIHsgaGlkZUVsZW1lbnQoYXV0b3BsYXlCdXR0b24pOyB9XG4gICAgICAgIGlmIChhbmltYXRpbmcpIHsgc3RvcEF1dG9wbGF5KCk7IH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGF1dG9wbGF5SG92ZXJQYXVzZSAhPT0gYXV0b3BsYXlIb3ZlclBhdXNlVGVtKSB7XG4gICAgICBhdXRvcGxheUhvdmVyUGF1c2UgP1xuICAgICAgICBhZGRFdmVudHMoY29udGFpbmVyLCBob3ZlckV2ZW50cykgOlxuICAgICAgICByZW1vdmVFdmVudHMoY29udGFpbmVyLCBob3ZlckV2ZW50cyk7XG4gICAgfVxuICAgIGlmIChhdXRvcGxheVJlc2V0T25WaXNpYmlsaXR5ICE9PSBhdXRvcGxheVJlc2V0T25WaXNpYmlsaXR5VGVtKSB7XG4gICAgICBhdXRvcGxheVJlc2V0T25WaXNpYmlsaXR5ID9cbiAgICAgICAgYWRkRXZlbnRzKGRvYywgdmlzaWJpbGl0eUV2ZW50KSA6XG4gICAgICAgIHJlbW92ZUV2ZW50cyhkb2MsIHZpc2liaWxpdHlFdmVudCk7XG4gICAgfVxuXG4gICAgaWYgKGJwQ2hhbmdlZCkge1xuICAgICAgaWYgKGZpeGVkV2lkdGggIT09IGZpeGVkV2lkdGhUZW0gfHwgY2VudGVyICE9PSBjZW50ZXJUZW0pIHsgbmVlZENvbnRhaW5lclRyYW5zZm9ybSA9IHRydWU7IH1cblxuICAgICAgaWYgKGF1dG9IZWlnaHQgIT09IGF1dG9IZWlnaHRUZW0pIHtcbiAgICAgICAgaWYgKCFhdXRvSGVpZ2h0KSB7IGlubmVyV3JhcHBlci5zdHlsZS5oZWlnaHQgPSAnJzsgfVxuICAgICAgfVxuXG4gICAgICBpZiAoY29udHJvbHMgJiYgY29udHJvbHNUZXh0ICE9PSBjb250cm9sc1RleHRUZW0pIHtcbiAgICAgICAgcHJldkJ1dHRvbi5pbm5lckhUTUwgPSBjb250cm9sc1RleHRbMF07XG4gICAgICAgIG5leHRCdXR0b24uaW5uZXJIVE1MID0gY29udHJvbHNUZXh0WzFdO1xuICAgICAgfVxuXG4gICAgICBpZiAoYXV0b3BsYXlCdXR0b24gJiYgYXV0b3BsYXlUZXh0ICE9PSBhdXRvcGxheVRleHRUZW0pIHtcbiAgICAgICAgdmFyIGkgPSBhdXRvcGxheSA/IDEgOiAwLFxuICAgICAgICAgICAgaHRtbCA9IGF1dG9wbGF5QnV0dG9uLmlubmVySFRNTCxcbiAgICAgICAgICAgIGxlbiA9IGh0bWwubGVuZ3RoIC0gYXV0b3BsYXlUZXh0VGVtW2ldLmxlbmd0aDtcbiAgICAgICAgaWYgKGh0bWwuc3Vic3RyaW5nKGxlbikgPT09IGF1dG9wbGF5VGV4dFRlbVtpXSkge1xuICAgICAgICAgIGF1dG9wbGF5QnV0dG9uLmlubmVySFRNTCA9IGh0bWwuc3Vic3RyaW5nKDAsIGxlbikgKyBhdXRvcGxheVRleHRbaV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGNlbnRlciAmJiAoZml4ZWRXaWR0aCB8fCBhdXRvV2lkdGgpKSB7IG5lZWRDb250YWluZXJUcmFuc2Zvcm0gPSB0cnVlOyB9XG4gICAgfVxuXG4gICAgaWYgKGl0ZW1zQ2hhbmdlZCB8fCBmaXhlZFdpZHRoICYmICFhdXRvV2lkdGgpIHtcbiAgICAgIHBhZ2VzID0gZ2V0UGFnZXMoKTtcbiAgICAgIHVwZGF0ZU5hdlZpc2liaWxpdHkoKTtcbiAgICB9XG5cbiAgICBpbmRDaGFuZ2VkID0gaW5kZXggIT09IGluZGV4VGVtO1xuICAgIGlmIChpbmRDaGFuZ2VkKSB7XG4gICAgICBldmVudHMuZW1pdCgnaW5kZXhDaGFuZ2VkJywgaW5mbygpKTtcbiAgICAgIG5lZWRDb250YWluZXJUcmFuc2Zvcm0gPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoaXRlbXNDaGFuZ2VkKSB7XG4gICAgICBpZiAoIWluZENoYW5nZWQpIHsgYWRkaXRpb25hbFVwZGF0ZXMoKTsgfVxuICAgIH0gZWxzZSBpZiAoZml4ZWRXaWR0aCB8fCBhdXRvV2lkdGgpIHtcbiAgICAgIGRvTGF6eUxvYWQoKTtcbiAgICAgIHVwZGF0ZVNsaWRlU3RhdHVzKCk7XG4gICAgICB1cGRhdGVMaXZlUmVnaW9uKCk7XG4gICAgfVxuXG4gICAgaWYgKGl0ZW1zQ2hhbmdlZCAmJiAhY2Fyb3VzZWwpIHsgdXBkYXRlR2FsbGVyeVNsaWRlUG9zaXRpb25zKCk7IH1cblxuICAgIGlmICghZGlzYWJsZSAmJiAhZnJlZXplKSB7XG4gICAgICAvLyBub24tbWVkaWFxdWVyaWVzOiBJRThcbiAgICAgIGlmIChicENoYW5nZWQgJiYgIUNTU01RKSB7XG4gICAgICAgIC8vIG1pZGRsZSB3cmFwcGVyIHN0eWxlc1xuXG4gICAgICAgIC8vIGlubmVyIHdyYXBwZXIgc3R5bGVzXG4gICAgICAgIGlmIChlZGdlUGFkZGluZyAhPT0gZWRnZVBhZGRpbmdUZW0gfHwgZ3V0dGVyICE9PSBndXR0ZXJUZW0pIHtcbiAgICAgICAgICBpbm5lcldyYXBwZXIuc3R5bGUuY3NzVGV4dCA9IGdldElubmVyV3JhcHBlclN0eWxlcyhlZGdlUGFkZGluZywgZ3V0dGVyLCBmaXhlZFdpZHRoLCBzcGVlZCwgYXV0b0hlaWdodCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaG9yaXpvbnRhbCkge1xuICAgICAgICAgIC8vIGNvbnRhaW5lciBzdHlsZXNcbiAgICAgICAgICBpZiAoY2Fyb3VzZWwpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5zdHlsZS53aWR0aCA9IGdldENvbnRhaW5lcldpZHRoKGZpeGVkV2lkdGgsIGd1dHRlciwgaXRlbXMpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIHNsaWRlIHN0eWxlc1xuICAgICAgICAgIHZhciBzdHIgPSBnZXRTbGlkZVdpZHRoU3R5bGUoZml4ZWRXaWR0aCwgZ3V0dGVyLCBpdGVtcykgK1xuICAgICAgICAgICAgICAgICAgICBnZXRTbGlkZUd1dHRlclN0eWxlKGd1dHRlcik7XG5cbiAgICAgICAgICAvLyByZW1vdmUgdGhlIGxhc3QgbGluZSBhbmRcbiAgICAgICAgICAvLyBhZGQgbmV3IHN0eWxlc1xuICAgICAgICAgIHJlbW92ZUNTU1J1bGUoc2hlZXQsIGdldENzc1J1bGVzTGVuZ3RoKHNoZWV0KSAtIDEpO1xuICAgICAgICAgIGFkZENTU1J1bGUoc2hlZXQsICcjJyArIHNsaWRlSWQgKyAnID4gLnRucy1pdGVtJywgc3RyLCBnZXRDc3NSdWxlc0xlbmd0aChzaGVldCkpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGF1dG8gaGVpZ2h0XG4gICAgICBpZiAoYXV0b0hlaWdodCkgeyBkb0F1dG9IZWlnaHQoKTsgfVxuXG4gICAgICBpZiAobmVlZENvbnRhaW5lclRyYW5zZm9ybSkge1xuICAgICAgICBkb0NvbnRhaW5lclRyYW5zZm9ybVNpbGVudCgpO1xuICAgICAgICBpbmRleENhY2hlZCA9IGluZGV4O1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChicENoYW5nZWQpIHsgZXZlbnRzLmVtaXQoJ25ld0JyZWFrcG9pbnRFbmQnLCBpbmZvKGUpKTsgfVxuICB9XG5cblxuXG5cblxuICAvLyA9PT0gSU5JVElBTElaQVRJT04gRlVOQ1RJT05TID09PSAvL1xuICBmdW5jdGlvbiBnZXRGcmVlemUgKCkge1xuICAgIGlmICghZml4ZWRXaWR0aCAmJiAhYXV0b1dpZHRoKSB7XG4gICAgICB2YXIgYSA9IGNlbnRlciA/IGl0ZW1zIC0gKGl0ZW1zIC0gMSkgLyAyIDogaXRlbXM7XG4gICAgICByZXR1cm4gIHNsaWRlQ291bnQgPD0gYTtcbiAgICB9XG5cbiAgICB2YXIgd2lkdGggPSBmaXhlZFdpZHRoID8gKGZpeGVkV2lkdGggKyBndXR0ZXIpICogc2xpZGVDb3VudCA6IHNsaWRlUG9zaXRpb25zW3NsaWRlQ291bnRdLFxuICAgICAgICB2cCA9IGVkZ2VQYWRkaW5nID8gdmlld3BvcnQgKyBlZGdlUGFkZGluZyAqIDIgOiB2aWV3cG9ydCArIGd1dHRlcjtcblxuICAgIGlmIChjZW50ZXIpIHtcbiAgICAgIHZwIC09IGZpeGVkV2lkdGggPyAodmlld3BvcnQgLSBmaXhlZFdpZHRoKSAvIDIgOiAodmlld3BvcnQgLSAoc2xpZGVQb3NpdGlvbnNbaW5kZXggKyAxXSAtIHNsaWRlUG9zaXRpb25zW2luZGV4XSAtIGd1dHRlcikpIC8gMjtcbiAgICB9XG5cbiAgICByZXR1cm4gd2lkdGggPD0gdnA7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRCcmVha3BvaW50Wm9uZSAoKSB7XG4gICAgYnJlYWtwb2ludFpvbmUgPSAwO1xuICAgIGZvciAodmFyIGJwIGluIHJlc3BvbnNpdmUpIHtcbiAgICAgIGJwID0gcGFyc2VJbnQoYnApOyAvLyBjb252ZXJ0IHN0cmluZyB0byBudW1iZXJcbiAgICAgIGlmICh3aW5kb3dXaWR0aCA+PSBicCkgeyBicmVha3BvaW50Wm9uZSA9IGJwOyB9XG4gICAgfVxuICB9XG5cbiAgLy8gKHNsaWRlQnksIGluZGV4TWluLCBpbmRleE1heCkgPT4gaW5kZXhcbiAgdmFyIHVwZGF0ZUluZGV4ID0gKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gbG9vcCA/XG4gICAgICBjYXJvdXNlbCA/XG4gICAgICAgIC8vIGxvb3AgKyBjYXJvdXNlbFxuICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIGxlZnRFZGdlID0gaW5kZXhNaW4sXG4gICAgICAgICAgICAgIHJpZ2h0RWRnZSA9IGluZGV4TWF4O1xuXG4gICAgICAgICAgbGVmdEVkZ2UgKz0gc2xpZGVCeTtcbiAgICAgICAgICByaWdodEVkZ2UgLT0gc2xpZGVCeTtcblxuICAgICAgICAgIC8vIGFkanVzdCBlZGdlcyB3aGVuIGhhcyBlZGdlIHBhZGRpbmdzXG4gICAgICAgICAgLy8gb3IgZml4ZWQtd2lkdGggc2xpZGVyIHdpdGggZXh0cmEgc3BhY2Ugb24gdGhlIHJpZ2h0IHNpZGVcbiAgICAgICAgICBpZiAoZWRnZVBhZGRpbmcpIHtcbiAgICAgICAgICAgIGxlZnRFZGdlICs9IDE7XG4gICAgICAgICAgICByaWdodEVkZ2UgLT0gMTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGZpeGVkV2lkdGgpIHtcbiAgICAgICAgICAgIGlmICgodmlld3BvcnQgKyBndXR0ZXIpJShmaXhlZFdpZHRoICsgZ3V0dGVyKSkgeyByaWdodEVkZ2UgLT0gMTsgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChjbG9uZUNvdW50KSB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPiByaWdodEVkZ2UpIHtcbiAgICAgICAgICAgICAgaW5kZXggLT0gc2xpZGVDb3VudDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPCBsZWZ0RWRnZSkge1xuICAgICAgICAgICAgICBpbmRleCArPSBzbGlkZUNvdW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSA6XG4gICAgICAgIC8vIGxvb3AgKyBnYWxsZXJ5XG4gICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmIChpbmRleCA+IGluZGV4TWF4KSB7XG4gICAgICAgICAgICB3aGlsZSAoaW5kZXggPj0gaW5kZXhNaW4gKyBzbGlkZUNvdW50KSB7IGluZGV4IC09IHNsaWRlQ291bnQ7IH1cbiAgICAgICAgICB9IGVsc2UgaWYgKGluZGV4IDwgaW5kZXhNaW4pIHtcbiAgICAgICAgICAgIHdoaWxlIChpbmRleCA8PSBpbmRleE1heCAtIHNsaWRlQ291bnQpIHsgaW5kZXggKz0gc2xpZGVDb3VudDsgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSA6XG4gICAgICAvLyBub24tbG9vcFxuICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgIGluZGV4ID0gTWF0aC5tYXgoaW5kZXhNaW4sIE1hdGgubWluKGluZGV4TWF4LCBpbmRleCkpO1xuICAgICAgfTtcbiAgfSkoKTtcblxuICBmdW5jdGlvbiBkaXNhYmxlVUkgKCkge1xuICAgIGlmICghYXV0b3BsYXkgJiYgYXV0b3BsYXlCdXR0b24pIHsgaGlkZUVsZW1lbnQoYXV0b3BsYXlCdXR0b24pOyB9XG4gICAgaWYgKCFuYXYgJiYgbmF2Q29udGFpbmVyKSB7IGhpZGVFbGVtZW50KG5hdkNvbnRhaW5lcik7IH1cbiAgICBpZiAoIWNvbnRyb2xzKSB7XG4gICAgICBpZiAoY29udHJvbHNDb250YWluZXIpIHtcbiAgICAgICAgaGlkZUVsZW1lbnQoY29udHJvbHNDb250YWluZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHByZXZCdXR0b24pIHsgaGlkZUVsZW1lbnQocHJldkJ1dHRvbik7IH1cbiAgICAgICAgaWYgKG5leHRCdXR0b24pIHsgaGlkZUVsZW1lbnQobmV4dEJ1dHRvbik7IH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBlbmFibGVVSSAoKSB7XG4gICAgaWYgKGF1dG9wbGF5ICYmIGF1dG9wbGF5QnV0dG9uKSB7IHNob3dFbGVtZW50KGF1dG9wbGF5QnV0dG9uKTsgfVxuICAgIGlmIChuYXYgJiYgbmF2Q29udGFpbmVyKSB7IHNob3dFbGVtZW50KG5hdkNvbnRhaW5lcik7IH1cbiAgICBpZiAoY29udHJvbHMpIHtcbiAgICAgIGlmIChjb250cm9sc0NvbnRhaW5lcikge1xuICAgICAgICBzaG93RWxlbWVudChjb250cm9sc0NvbnRhaW5lcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAocHJldkJ1dHRvbikgeyBzaG93RWxlbWVudChwcmV2QnV0dG9uKTsgfVxuICAgICAgICBpZiAobmV4dEJ1dHRvbikgeyBzaG93RWxlbWVudChuZXh0QnV0dG9uKTsgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGZyZWV6ZVNsaWRlciAoKSB7XG4gICAgaWYgKGZyb3plbikgeyByZXR1cm47IH1cblxuICAgIC8vIHJlbW92ZSBlZGdlIHBhZGRpbmcgZnJvbSBpbm5lciB3cmFwcGVyXG4gICAgaWYgKGVkZ2VQYWRkaW5nKSB7IGlubmVyV3JhcHBlci5zdHlsZS5tYXJnaW4gPSAnMHB4JzsgfVxuXG4gICAgLy8gYWRkIGNsYXNzIHRucy10cmFuc3BhcmVudCB0byBjbG9uZWQgc2xpZGVzXG4gICAgaWYgKGNsb25lQ291bnQpIHtcbiAgICAgIHZhciBzdHIgPSAndG5zLXRyYW5zcGFyZW50JztcbiAgICAgIGZvciAodmFyIGkgPSBjbG9uZUNvdW50OyBpLS07KSB7XG4gICAgICAgIGlmIChjYXJvdXNlbCkgeyBhZGRDbGFzcyhzbGlkZUl0ZW1zW2ldLCBzdHIpOyB9XG4gICAgICAgIGFkZENsYXNzKHNsaWRlSXRlbXNbc2xpZGVDb3VudE5ldyAtIGkgLSAxXSwgc3RyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgdG9vbHNcbiAgICBkaXNhYmxlVUkoKTtcblxuICAgIGZyb3plbiA9IHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiB1bmZyZWV6ZVNsaWRlciAoKSB7XG4gICAgaWYgKCFmcm96ZW4pIHsgcmV0dXJuOyB9XG5cbiAgICAvLyByZXN0b3JlIGVkZ2UgcGFkZGluZyBmb3IgaW5uZXIgd3JhcHBlclxuICAgIC8vIGZvciBtb3JkZXJuIGJyb3dzZXJzXG4gICAgaWYgKGVkZ2VQYWRkaW5nICYmIENTU01RKSB7IGlubmVyV3JhcHBlci5zdHlsZS5tYXJnaW4gPSAnJzsgfVxuXG4gICAgLy8gcmVtb3ZlIGNsYXNzIHRucy10cmFuc3BhcmVudCB0byBjbG9uZWQgc2xpZGVzXG4gICAgaWYgKGNsb25lQ291bnQpIHtcbiAgICAgIHZhciBzdHIgPSAndG5zLXRyYW5zcGFyZW50JztcbiAgICAgIGZvciAodmFyIGkgPSBjbG9uZUNvdW50OyBpLS07KSB7XG4gICAgICAgIGlmIChjYXJvdXNlbCkgeyByZW1vdmVDbGFzcyhzbGlkZUl0ZW1zW2ldLCBzdHIpOyB9XG4gICAgICAgIHJlbW92ZUNsYXNzKHNsaWRlSXRlbXNbc2xpZGVDb3VudE5ldyAtIGkgLSAxXSwgc3RyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgdG9vbHNcbiAgICBlbmFibGVVSSgpO1xuXG4gICAgZnJvemVuID0gZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiBkaXNhYmxlU2xpZGVyICgpIHtcbiAgICBpZiAoZGlzYWJsZWQpIHsgcmV0dXJuOyB9XG5cbiAgICBzaGVldC5kaXNhYmxlZCA9IHRydWU7XG4gICAgY29udGFpbmVyLmNsYXNzTmFtZSA9IGNvbnRhaW5lci5jbGFzc05hbWUucmVwbGFjZShuZXdDb250YWluZXJDbGFzc2VzLnN1YnN0cmluZygxKSwgJycpO1xuICAgIHJlbW92ZUF0dHJzKGNvbnRhaW5lciwgWydzdHlsZSddKTtcbiAgICBpZiAobG9vcCkge1xuICAgICAgZm9yICh2YXIgaiA9IGNsb25lQ291bnQ7IGotLTspIHtcbiAgICAgICAgaWYgKGNhcm91c2VsKSB7IGhpZGVFbGVtZW50KHNsaWRlSXRlbXNbal0pOyB9XG4gICAgICAgIGhpZGVFbGVtZW50KHNsaWRlSXRlbXNbc2xpZGVDb3VudE5ldyAtIGogLSAxXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gdmVydGljYWwgc2xpZGVyXG4gICAgaWYgKCFob3Jpem9udGFsIHx8ICFjYXJvdXNlbCkgeyByZW1vdmVBdHRycyhpbm5lcldyYXBwZXIsIFsnc3R5bGUnXSk7IH1cblxuICAgIC8vIGdhbGxlcnlcbiAgICBpZiAoIWNhcm91c2VsKSB7XG4gICAgICBmb3IgKHZhciBpID0gaW5kZXgsIGwgPSBpbmRleCArIHNsaWRlQ291bnQ7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdmFyIGl0ZW0gPSBzbGlkZUl0ZW1zW2ldO1xuICAgICAgICByZW1vdmVBdHRycyhpdGVtLCBbJ3N0eWxlJ10pO1xuICAgICAgICByZW1vdmVDbGFzcyhpdGVtLCBhbmltYXRlSW4pO1xuICAgICAgICByZW1vdmVDbGFzcyhpdGVtLCBhbmltYXRlTm9ybWFsKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgdG9vbHNcbiAgICBkaXNhYmxlVUkoKTtcblxuICAgIGRpc2FibGVkID0gdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVuYWJsZVNsaWRlciAoKSB7XG4gICAgaWYgKCFkaXNhYmxlZCkgeyByZXR1cm47IH1cblxuICAgIHNoZWV0LmRpc2FibGVkID0gZmFsc2U7XG4gICAgY29udGFpbmVyLmNsYXNzTmFtZSArPSBuZXdDb250YWluZXJDbGFzc2VzO1xuICAgIGRvQ29udGFpbmVyVHJhbnNmb3JtU2lsZW50KCk7XG5cbiAgICBpZiAobG9vcCkge1xuICAgICAgZm9yICh2YXIgaiA9IGNsb25lQ291bnQ7IGotLTspIHtcbiAgICAgICAgaWYgKGNhcm91c2VsKSB7IHNob3dFbGVtZW50KHNsaWRlSXRlbXNbal0pOyB9XG4gICAgICAgIHNob3dFbGVtZW50KHNsaWRlSXRlbXNbc2xpZGVDb3VudE5ldyAtIGogLSAxXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZ2FsbGVyeVxuICAgIGlmICghY2Fyb3VzZWwpIHtcbiAgICAgIGZvciAodmFyIGkgPSBpbmRleCwgbCA9IGluZGV4ICsgc2xpZGVDb3VudDsgaSA8IGw7IGkrKykge1xuICAgICAgICB2YXIgaXRlbSA9IHNsaWRlSXRlbXNbaV0sXG4gICAgICAgICAgICBjbGFzc04gPSBpIDwgaW5kZXggKyBpdGVtcyA/IGFuaW1hdGVJbiA6IGFuaW1hdGVOb3JtYWw7XG4gICAgICAgIGl0ZW0uc3R5bGUubGVmdCA9IChpIC0gaW5kZXgpICogMTAwIC8gaXRlbXMgKyAnJSc7XG4gICAgICAgIGFkZENsYXNzKGl0ZW0sIGNsYXNzTik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIHRvb2xzXG4gICAgZW5hYmxlVUkoKTtcblxuICAgIGRpc2FibGVkID0gZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVMaXZlUmVnaW9uICgpIHtcbiAgICB2YXIgc3RyID0gZ2V0TGl2ZVJlZ2lvblN0cigpO1xuICAgIGlmIChsaXZlcmVnaW9uQ3VycmVudC5pbm5lckhUTUwgIT09IHN0cikgeyBsaXZlcmVnaW9uQ3VycmVudC5pbm5lckhUTUwgPSBzdHI7IH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldExpdmVSZWdpb25TdHIgKCkge1xuICAgIHZhciBhcnIgPSBnZXRWaXNpYmxlU2xpZGVSYW5nZSgpLFxuICAgICAgICBzdGFydCA9IGFyclswXSArIDEsXG4gICAgICAgIGVuZCA9IGFyclsxXSArIDE7XG4gICAgcmV0dXJuIHN0YXJ0ID09PSBlbmQgPyBzdGFydCArICcnIDogc3RhcnQgKyAnIHRvICcgKyBlbmQ7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRWaXNpYmxlU2xpZGVSYW5nZSAodmFsKSB7XG4gICAgaWYgKHZhbCA9PSBudWxsKSB7IHZhbCA9IGdldENvbnRhaW5lclRyYW5zZm9ybVZhbHVlKCk7IH1cbiAgICB2YXIgc3RhcnQgPSBpbmRleCwgZW5kLCByYW5nZXN0YXJ0LCByYW5nZWVuZDtcblxuICAgIC8vIGdldCByYW5nZSBzdGFydCwgcmFuZ2UgZW5kIGZvciBhdXRvV2lkdGggYW5kIGZpeGVkV2lkdGhcbiAgICBpZiAoY2VudGVyIHx8IGVkZ2VQYWRkaW5nKSB7XG4gICAgICBpZiAoYXV0b1dpZHRoIHx8IGZpeGVkV2lkdGgpIHtcbiAgICAgICAgcmFuZ2VzdGFydCA9IC0gKHBhcnNlRmxvYXQodmFsKSArIGVkZ2VQYWRkaW5nKTtcbiAgICAgICAgcmFuZ2VlbmQgPSByYW5nZXN0YXJ0ICsgdmlld3BvcnQgKyBlZGdlUGFkZGluZyAqIDI7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChhdXRvV2lkdGgpIHtcbiAgICAgICAgcmFuZ2VzdGFydCA9IHNsaWRlUG9zaXRpb25zW2luZGV4XTtcbiAgICAgICAgcmFuZ2VlbmQgPSByYW5nZXN0YXJ0ICsgdmlld3BvcnQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZ2V0IHN0YXJ0LCBlbmRcbiAgICAvLyAtIGNoZWNrIGF1dG8gd2lkdGhcbiAgICBpZiAoYXV0b1dpZHRoKSB7XG4gICAgICBzbGlkZVBvc2l0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHBvaW50LCBpKSB7XG4gICAgICAgIGlmIChpIDwgc2xpZGVDb3VudE5ldykge1xuICAgICAgICAgIGlmICgoY2VudGVyIHx8IGVkZ2VQYWRkaW5nKSAmJiBwb2ludCA8PSByYW5nZXN0YXJ0ICsgMC41KSB7IHN0YXJ0ID0gaTsgfVxuICAgICAgICAgIGlmIChyYW5nZWVuZCAtIHBvaW50ID49IDAuNSkgeyBlbmQgPSBpOyB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgLy8gLSBjaGVjayBwZXJjZW50YWdlIHdpZHRoLCBmaXhlZCB3aWR0aFxuICAgIH0gZWxzZSB7XG5cbiAgICAgIGlmIChmaXhlZFdpZHRoKSB7XG4gICAgICAgIHZhciBjZWxsID0gZml4ZWRXaWR0aCArIGd1dHRlcjtcbiAgICAgICAgaWYgKGNlbnRlciB8fCBlZGdlUGFkZGluZykge1xuICAgICAgICAgIHN0YXJ0ID0gTWF0aC5mbG9vcihyYW5nZXN0YXJ0L2NlbGwpO1xuICAgICAgICAgIGVuZCA9IE1hdGguY2VpbChyYW5nZWVuZC9jZWxsIC0gMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZW5kID0gc3RhcnQgKyBNYXRoLmNlaWwodmlld3BvcnQvY2VsbCkgLSAxO1xuICAgICAgICB9XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChjZW50ZXIgfHwgZWRnZVBhZGRpbmcpIHtcbiAgICAgICAgICB2YXIgYSA9IGl0ZW1zIC0gMTtcbiAgICAgICAgICBpZiAoY2VudGVyKSB7XG4gICAgICAgICAgICBzdGFydCAtPSBhIC8gMjtcbiAgICAgICAgICAgIGVuZCA9IGluZGV4ICsgYSAvIDI7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVuZCA9IGluZGV4ICsgYTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoZWRnZVBhZGRpbmcpIHtcbiAgICAgICAgICAgIHZhciBiID0gZWRnZVBhZGRpbmcgKiBpdGVtcyAvIHZpZXdwb3J0O1xuICAgICAgICAgICAgc3RhcnQgLT0gYjtcbiAgICAgICAgICAgIGVuZCArPSBiO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHN0YXJ0ID0gTWF0aC5mbG9vcihzdGFydCk7XG4gICAgICAgICAgZW5kID0gTWF0aC5jZWlsKGVuZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZW5kID0gc3RhcnQgKyBpdGVtcyAtIDE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgc3RhcnQgPSBNYXRoLm1heChzdGFydCwgMCk7XG4gICAgICBlbmQgPSBNYXRoLm1pbihlbmQsIHNsaWRlQ291bnROZXcgLSAxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gW3N0YXJ0LCBlbmRdO1xuICB9XG5cbiAgZnVuY3Rpb24gZG9MYXp5TG9hZCAoKSB7XG4gICAgaWYgKGxhenlsb2FkICYmICFkaXNhYmxlKSB7XG4gICAgICB2YXIgYXJnID0gZ2V0VmlzaWJsZVNsaWRlUmFuZ2UoKTtcbiAgICAgIGFyZy5wdXNoKGxhenlsb2FkU2VsZWN0b3IpO1xuXG4gICAgICBnZXRJbWFnZUFycmF5LmFwcGx5KG51bGwsIGFyZykuZm9yRWFjaChmdW5jdGlvbiAoaW1nKSB7XG4gICAgICAgIGlmICghaGFzQ2xhc3MoaW1nLCBpbWdDb21wbGV0ZUNsYXNzKSkge1xuICAgICAgICAgIC8vIHN0b3AgcHJvcGFnYXRpb24gdHJhbnNpdGlvbmVuZCBldmVudCB0byBjb250YWluZXJcbiAgICAgICAgICB2YXIgZXZlID0ge307XG4gICAgICAgICAgZXZlW1RSQU5TSVRJT05FTkRdID0gZnVuY3Rpb24gKGUpIHsgZS5zdG9wUHJvcGFnYXRpb24oKTsgfTtcbiAgICAgICAgICBhZGRFdmVudHMoaW1nLCBldmUpO1xuXG4gICAgICAgICAgYWRkRXZlbnRzKGltZywgaW1nRXZlbnRzKTtcblxuICAgICAgICAgIC8vIHVwZGF0ZSBzcmNcbiAgICAgICAgICBpbWcuc3JjID0gZ2V0QXR0cihpbWcsICdkYXRhLXNyYycpO1xuXG4gICAgICAgICAgLy8gdXBkYXRlIHNyY3NldFxuICAgICAgICAgIHZhciBzcmNzZXQgPSBnZXRBdHRyKGltZywgJ2RhdGEtc3Jjc2V0Jyk7XG4gICAgICAgICAgaWYgKHNyY3NldCkgeyBpbWcuc3Jjc2V0ID0gc3Jjc2V0OyB9XG5cbiAgICAgICAgICBhZGRDbGFzcyhpbWcsICdsb2FkaW5nJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uSW1nTG9hZGVkIChlKSB7XG4gICAgaW1nTG9hZGVkKGdldFRhcmdldChlKSk7XG4gIH1cblxuICBmdW5jdGlvbiBvbkltZ0ZhaWxlZCAoZSkge1xuICAgIGltZ0ZhaWxlZChnZXRUYXJnZXQoZSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW1nTG9hZGVkIChpbWcpIHtcbiAgICBhZGRDbGFzcyhpbWcsICdsb2FkZWQnKTtcbiAgICBpbWdDb21wbGV0ZWQoaW1nKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGltZ0ZhaWxlZCAoaW1nKSB7XG4gICAgYWRkQ2xhc3MoaW1nLCAnZmFpbGVkJyk7XG4gICAgaW1nQ29tcGxldGVkKGltZyk7XG4gIH1cblxuICBmdW5jdGlvbiBpbWdDb21wbGV0ZWQgKGltZykge1xuICAgIGFkZENsYXNzKGltZywgaW1nQ29tcGxldGVDbGFzcyk7XG4gICAgcmVtb3ZlQ2xhc3MoaW1nLCAnbG9hZGluZycpO1xuICAgIHJlbW92ZUV2ZW50cyhpbWcsIGltZ0V2ZW50cyk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRJbWFnZUFycmF5IChzdGFydCwgZW5kLCBpbWdTZWxlY3Rvcikge1xuICAgIHZhciBpbWdzID0gW107XG4gICAgaWYgKCFpbWdTZWxlY3RvcikgeyBpbWdTZWxlY3RvciA9ICdpbWcnOyB9XG5cbiAgICB3aGlsZSAoc3RhcnQgPD0gZW5kKSB7XG4gICAgICBmb3JFYWNoKHNsaWRlSXRlbXNbc3RhcnRdLnF1ZXJ5U2VsZWN0b3JBbGwoaW1nU2VsZWN0b3IpLCBmdW5jdGlvbiAoaW1nKSB7IGltZ3MucHVzaChpbWcpOyB9KTtcbiAgICAgIHN0YXJ0Kys7XG4gICAgfVxuXG4gICAgcmV0dXJuIGltZ3M7XG4gIH1cblxuICAvLyBjaGVjayBpZiBhbGwgdmlzaWJsZSBpbWFnZXMgYXJlIGxvYWRlZFxuICAvLyBhbmQgdXBkYXRlIGNvbnRhaW5lciBoZWlnaHQgaWYgaXQncyBkb25lXG4gIGZ1bmN0aW9uIGRvQXV0b0hlaWdodCAoKSB7XG4gICAgdmFyIGltZ3MgPSBnZXRJbWFnZUFycmF5LmFwcGx5KG51bGwsIGdldFZpc2libGVTbGlkZVJhbmdlKCkpO1xuICAgIHJhZihmdW5jdGlvbigpeyBpbWdzTG9hZGVkQ2hlY2soaW1ncywgdXBkYXRlSW5uZXJXcmFwcGVySGVpZ2h0KTsgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBpbWdzTG9hZGVkQ2hlY2sgKGltZ3MsIGNiKSB7XG4gICAgLy8gZXhlY3V0ZSBjYWxsYmFjayBmdW5jdGlvbiBpZiBhbGwgaW1hZ2VzIGFyZSBjb21wbGV0ZVxuICAgIGlmIChpbWdzQ29tcGxldGUpIHsgcmV0dXJuIGNiKCk7IH1cblxuICAgIC8vIGNoZWNrIGltYWdlIGNsYXNzZXNcbiAgICBpbWdzLmZvckVhY2goZnVuY3Rpb24gKGltZywgaW5kZXgpIHtcbiAgICAgIGlmICghbGF6eWxvYWQgJiYgaW1nLmNvbXBsZXRlKSB7IGltZ0NvbXBsZXRlZChpbWcpOyB9IC8vIENoZWNrIGltYWdlLmNvbXBsZXRlXG4gICAgICBpZiAoaGFzQ2xhc3MoaW1nLCBpbWdDb21wbGV0ZUNsYXNzKSkgeyBpbWdzLnNwbGljZShpbmRleCwgMSk7IH1cbiAgICB9KTtcblxuICAgIC8vIGV4ZWN1dGUgY2FsbGJhY2sgZnVuY3Rpb24gaWYgc2VsZWN0ZWQgaW1hZ2VzIGFyZSBhbGwgY29tcGxldGVcbiAgICBpZiAoIWltZ3MubGVuZ3RoKSB7IHJldHVybiBjYigpOyB9XG5cbiAgICAvLyBvdGhlcndpc2UgZXhlY3V0ZSB0aGlzIGZ1bmN0aW9uYSBhZ2FpblxuICAgIHJhZihmdW5jdGlvbigpeyBpbWdzTG9hZGVkQ2hlY2soaW1ncywgY2IpOyB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZGl0aW9uYWxVcGRhdGVzICgpIHtcbiAgICBkb0xhenlMb2FkKCk7XG4gICAgdXBkYXRlU2xpZGVTdGF0dXMoKTtcbiAgICB1cGRhdGVMaXZlUmVnaW9uKCk7XG4gICAgdXBkYXRlQ29udHJvbHNTdGF0dXMoKTtcbiAgICB1cGRhdGVOYXZTdGF0dXMoKTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gdXBkYXRlX2Nhcm91c2VsX3RyYW5zaXRpb25fZHVyYXRpb24gKCkge1xuICAgIGlmIChjYXJvdXNlbCAmJiBhdXRvSGVpZ2h0KSB7XG4gICAgICBtaWRkbGVXcmFwcGVyLnN0eWxlW1RSQU5TSVRJT05EVVJBVElPTl0gPSBzcGVlZCAvIDEwMDAgKyAncyc7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TWF4U2xpZGVIZWlnaHQgKHNsaWRlU3RhcnQsIHNsaWRlUmFuZ2UpIHtcbiAgICB2YXIgaGVpZ2h0cyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSBzbGlkZVN0YXJ0LCBsID0gTWF0aC5taW4oc2xpZGVTdGFydCArIHNsaWRlUmFuZ2UsIHNsaWRlQ291bnROZXcpOyBpIDwgbDsgaSsrKSB7XG4gICAgICBoZWlnaHRzLnB1c2goc2xpZGVJdGVtc1tpXS5vZmZzZXRIZWlnaHQpO1xuICAgIH1cblxuICAgIHJldHVybiBNYXRoLm1heC5hcHBseShudWxsLCBoZWlnaHRzKTtcbiAgfVxuXG4gIC8vIHVwZGF0ZSBpbm5lciB3cmFwcGVyIGhlaWdodFxuICAvLyAxLiBnZXQgdGhlIG1heC1oZWlnaHQgb2YgdGhlIHZpc2libGUgc2xpZGVzXG4gIC8vIDIuIHNldCB0cmFuc2l0aW9uRHVyYXRpb24gdG8gc3BlZWRcbiAgLy8gMy4gdXBkYXRlIGlubmVyIHdyYXBwZXIgaGVpZ2h0IHRvIG1heC1oZWlnaHRcbiAgLy8gNC4gc2V0IHRyYW5zaXRpb25EdXJhdGlvbiB0byAwcyBhZnRlciB0cmFuc2l0aW9uIGRvbmVcbiAgZnVuY3Rpb24gdXBkYXRlSW5uZXJXcmFwcGVySGVpZ2h0ICgpIHtcbiAgICB2YXIgbWF4SGVpZ2h0ID0gYXV0b0hlaWdodCA/IGdldE1heFNsaWRlSGVpZ2h0KGluZGV4LCBpdGVtcykgOiBnZXRNYXhTbGlkZUhlaWdodChjbG9uZUNvdW50LCBzbGlkZUNvdW50KSxcbiAgICAgICAgd3AgPSBtaWRkbGVXcmFwcGVyID8gbWlkZGxlV3JhcHBlciA6IGlubmVyV3JhcHBlcjtcblxuICAgIGlmICh3cC5zdHlsZS5oZWlnaHQgIT09IG1heEhlaWdodCkgeyB3cC5zdHlsZS5oZWlnaHQgPSBtYXhIZWlnaHQgKyAncHgnOyB9XG4gIH1cblxuICAvLyBnZXQgdGhlIGRpc3RhbmNlIGZyb20gdGhlIHRvcCBlZGdlIG9mIHRoZSBmaXJzdCBzbGlkZSB0byBlYWNoIHNsaWRlXG4gIC8vIChpbml0KSA9PiBzbGlkZVBvc2l0aW9uc1xuICBmdW5jdGlvbiBzZXRTbGlkZVBvc2l0aW9ucyAoKSB7XG4gICAgc2xpZGVQb3NpdGlvbnMgPSBbMF07XG4gICAgdmFyIGF0dHIgPSBob3Jpem9udGFsID8gJ2xlZnQnIDogJ3RvcCcsXG4gICAgICAgIGF0dHIyID0gaG9yaXpvbnRhbCA/ICdyaWdodCcgOiAnYm90dG9tJyxcbiAgICAgICAgYmFzZSA9IHNsaWRlSXRlbXNbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClbYXR0cl07XG5cbiAgICBmb3JFYWNoKHNsaWRlSXRlbXMsIGZ1bmN0aW9uKGl0ZW0sIGkpIHtcbiAgICAgIC8vIHNraXAgdGhlIGZpcnN0IHNsaWRlXG4gICAgICBpZiAoaSkgeyBzbGlkZVBvc2l0aW9ucy5wdXNoKGl0ZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClbYXR0cl0gLSBiYXNlKTsgfVxuICAgICAgLy8gYWRkIHRoZSBlbmQgZWRnZVxuICAgICAgaWYgKGkgPT09IHNsaWRlQ291bnROZXcgLSAxKSB7IHNsaWRlUG9zaXRpb25zLnB1c2goaXRlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVthdHRyMl0gLSBiYXNlKTsgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gdXBkYXRlIHNsaWRlXG4gIGZ1bmN0aW9uIHVwZGF0ZVNsaWRlU3RhdHVzICgpIHtcbiAgICB2YXIgcmFuZ2UgPSBnZXRWaXNpYmxlU2xpZGVSYW5nZSgpLFxuICAgICAgICBzdGFydCA9IHJhbmdlWzBdLFxuICAgICAgICBlbmQgPSByYW5nZVsxXTtcblxuICAgIGZvckVhY2goc2xpZGVJdGVtcywgZnVuY3Rpb24oaXRlbSwgaSkge1xuICAgICAgLy8gc2hvdyBzbGlkZXNcbiAgICAgIGlmIChpID49IHN0YXJ0ICYmIGkgPD0gZW5kKSB7XG4gICAgICAgIGlmIChoYXNBdHRyKGl0ZW0sICdhcmlhLWhpZGRlbicpKSB7XG4gICAgICAgICAgcmVtb3ZlQXR0cnMoaXRlbSwgWydhcmlhLWhpZGRlbicsICd0YWJpbmRleCddKTtcbiAgICAgICAgICBhZGRDbGFzcyhpdGVtLCBzbGlkZUFjdGl2ZUNsYXNzKTtcbiAgICAgICAgfVxuICAgICAgLy8gaGlkZSBzbGlkZXNcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghaGFzQXR0cihpdGVtLCAnYXJpYS1oaWRkZW4nKSkge1xuICAgICAgICAgIHNldEF0dHJzKGl0ZW0sIHtcbiAgICAgICAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJyxcbiAgICAgICAgICAgICd0YWJpbmRleCc6ICctMSdcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZW1vdmVDbGFzcyhpdGVtLCBzbGlkZUFjdGl2ZUNsYXNzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gZ2FsbGVyeTogdXBkYXRlIHNsaWRlIHBvc2l0aW9uXG4gIGZ1bmN0aW9uIHVwZGF0ZUdhbGxlcnlTbGlkZVBvc2l0aW9ucyAoKSB7XG4gICAgdmFyIGwgPSBpbmRleCArIE1hdGgubWluKHNsaWRlQ291bnQsIGl0ZW1zKTtcbiAgICBmb3IgKHZhciBpID0gc2xpZGVDb3VudE5ldzsgaS0tOykge1xuICAgICAgdmFyIGl0ZW0gPSBzbGlkZUl0ZW1zW2ldO1xuXG4gICAgICBpZiAoaSA+PSBpbmRleCAmJiBpIDwgbCkge1xuICAgICAgICAvLyBhZGQgdHJhbnNpdGlvbnMgdG8gdmlzaWJsZSBzbGlkZXMgd2hlbiBhZGp1c3RpbmcgdGhlaXIgcG9zaXRpb25zXG4gICAgICAgIGFkZENsYXNzKGl0ZW0sICd0bnMtbW92aW5nJyk7XG5cbiAgICAgICAgaXRlbS5zdHlsZS5sZWZ0ID0gKGkgLSBpbmRleCkgKiAxMDAgLyBpdGVtcyArICclJztcbiAgICAgICAgYWRkQ2xhc3MoaXRlbSwgYW5pbWF0ZUluKTtcbiAgICAgICAgcmVtb3ZlQ2xhc3MoaXRlbSwgYW5pbWF0ZU5vcm1hbCk7XG4gICAgICB9IGVsc2UgaWYgKGl0ZW0uc3R5bGUubGVmdCkge1xuICAgICAgICBpdGVtLnN0eWxlLmxlZnQgPSAnJztcbiAgICAgICAgYWRkQ2xhc3MoaXRlbSwgYW5pbWF0ZU5vcm1hbCk7XG4gICAgICAgIHJlbW92ZUNsYXNzKGl0ZW0sIGFuaW1hdGVJbik7XG4gICAgICB9XG5cbiAgICAgIC8vIHJlbW92ZSBvdXRsZXQgYW5pbWF0aW9uXG4gICAgICByZW1vdmVDbGFzcyhpdGVtLCBhbmltYXRlT3V0KTtcbiAgICB9XG5cbiAgICAvLyByZW1vdmluZyAnLnRucy1tb3ZpbmcnXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIGZvckVhY2goc2xpZGVJdGVtcywgZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgcmVtb3ZlQ2xhc3MoZWwsICd0bnMtbW92aW5nJyk7XG4gICAgICB9KTtcbiAgICB9LCAzMDApO1xuICB9XG5cbiAgLy8gc2V0IHRhYmluZGV4IG9uIE5hdlxuICBmdW5jdGlvbiB1cGRhdGVOYXZTdGF0dXMgKCkge1xuICAgIC8vIGdldCBjdXJyZW50IG5hdlxuICAgIGlmIChuYXYpIHtcbiAgICAgIG5hdkN1cnJlbnRJbmRleCA9IG5hdkNsaWNrZWQgPj0gMCA/IG5hdkNsaWNrZWQgOiBnZXRDdXJyZW50TmF2SW5kZXgoKTtcbiAgICAgIG5hdkNsaWNrZWQgPSAtMTtcblxuICAgICAgaWYgKG5hdkN1cnJlbnRJbmRleCAhPT0gbmF2Q3VycmVudEluZGV4Q2FjaGVkKSB7XG4gICAgICAgIHZhciBuYXZQcmV2ID0gbmF2SXRlbXNbbmF2Q3VycmVudEluZGV4Q2FjaGVkXSxcbiAgICAgICAgICAgIG5hdkN1cnJlbnQgPSBuYXZJdGVtc1tuYXZDdXJyZW50SW5kZXhdO1xuXG4gICAgICAgIHNldEF0dHJzKG5hdlByZXYsIHtcbiAgICAgICAgICAndGFiaW5kZXgnOiAnLTEnLFxuICAgICAgICAgICdhcmlhLWxhYmVsJzogbmF2U3RyICsgKG5hdkN1cnJlbnRJbmRleENhY2hlZCArIDEpXG4gICAgICAgIH0pO1xuICAgICAgICByZW1vdmVDbGFzcyhuYXZQcmV2LCBuYXZBY3RpdmVDbGFzcyk7XG5cbiAgICAgICAgc2V0QXR0cnMobmF2Q3VycmVudCwgeydhcmlhLWxhYmVsJzogbmF2U3RyICsgKG5hdkN1cnJlbnRJbmRleCArIDEpICsgbmF2U3RyQ3VycmVudH0pO1xuICAgICAgICByZW1vdmVBdHRycyhuYXZDdXJyZW50LCAndGFiaW5kZXgnKTtcbiAgICAgICAgYWRkQ2xhc3MobmF2Q3VycmVudCwgbmF2QWN0aXZlQ2xhc3MpO1xuXG4gICAgICAgIG5hdkN1cnJlbnRJbmRleENhY2hlZCA9IG5hdkN1cnJlbnRJbmRleDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRMb3dlckNhc2VOb2RlTmFtZSAoZWwpIHtcbiAgICByZXR1cm4gZWwubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzQnV0dG9uIChlbCkge1xuICAgIHJldHVybiBnZXRMb3dlckNhc2VOb2RlTmFtZShlbCkgPT09ICdidXR0b24nO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNBcmlhRGlzYWJsZWQgKGVsKSB7XG4gICAgcmV0dXJuIGVsLmdldEF0dHJpYnV0ZSgnYXJpYS1kaXNhYmxlZCcpID09PSAndHJ1ZSc7XG4gIH1cblxuICBmdW5jdGlvbiBkaXNFbmFibGVFbGVtZW50IChpc0J1dHRvbiwgZWwsIHZhbCkge1xuICAgIGlmIChpc0J1dHRvbikge1xuICAgICAgZWwuZGlzYWJsZWQgPSB2YWw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLnNldEF0dHJpYnV0ZSgnYXJpYS1kaXNhYmxlZCcsIHZhbC50b1N0cmluZygpKTtcbiAgICB9XG4gIH1cblxuICAvLyBzZXQgJ2Rpc2FibGVkJyB0byB0cnVlIG9uIGNvbnRyb2xzIHdoZW4gcmVhY2ggdGhlIGVkZ2VzXG4gIGZ1bmN0aW9uIHVwZGF0ZUNvbnRyb2xzU3RhdHVzICgpIHtcbiAgICBpZiAoIWNvbnRyb2xzIHx8IHJld2luZCB8fCBsb29wKSB7IHJldHVybjsgfVxuXG4gICAgdmFyIHByZXZEaXNhYmxlZCA9IChwcmV2SXNCdXR0b24pID8gcHJldkJ1dHRvbi5kaXNhYmxlZCA6IGlzQXJpYURpc2FibGVkKHByZXZCdXR0b24pLFxuICAgICAgICBuZXh0RGlzYWJsZWQgPSAobmV4dElzQnV0dG9uKSA/IG5leHRCdXR0b24uZGlzYWJsZWQgOiBpc0FyaWFEaXNhYmxlZChuZXh0QnV0dG9uKSxcbiAgICAgICAgZGlzYWJsZVByZXYgPSAoaW5kZXggPD0gaW5kZXhNaW4pID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICBkaXNhYmxlTmV4dCA9ICghcmV3aW5kICYmIGluZGV4ID49IGluZGV4TWF4KSA/IHRydWUgOiBmYWxzZTtcblxuICAgIGlmIChkaXNhYmxlUHJldiAmJiAhcHJldkRpc2FibGVkKSB7XG4gICAgICBkaXNFbmFibGVFbGVtZW50KHByZXZJc0J1dHRvbiwgcHJldkJ1dHRvbiwgdHJ1ZSk7XG4gICAgfVxuICAgIGlmICghZGlzYWJsZVByZXYgJiYgcHJldkRpc2FibGVkKSB7XG4gICAgICBkaXNFbmFibGVFbGVtZW50KHByZXZJc0J1dHRvbiwgcHJldkJ1dHRvbiwgZmFsc2UpO1xuICAgIH1cbiAgICBpZiAoZGlzYWJsZU5leHQgJiYgIW5leHREaXNhYmxlZCkge1xuICAgICAgZGlzRW5hYmxlRWxlbWVudChuZXh0SXNCdXR0b24sIG5leHRCdXR0b24sIHRydWUpO1xuICAgIH1cbiAgICBpZiAoIWRpc2FibGVOZXh0ICYmIG5leHREaXNhYmxlZCkge1xuICAgICAgZGlzRW5hYmxlRWxlbWVudChuZXh0SXNCdXR0b24sIG5leHRCdXR0b24sIGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICAvLyBzZXQgZHVyYXRpb25cbiAgZnVuY3Rpb24gcmVzZXREdXJhdGlvbiAoZWwsIHN0cikge1xuICAgIGlmIChUUkFOU0lUSU9ORFVSQVRJT04pIHsgZWwuc3R5bGVbVFJBTlNJVElPTkRVUkFUSU9OXSA9IHN0cjsgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0U2xpZGVyV2lkdGggKCkge1xuICAgIHJldHVybiBmaXhlZFdpZHRoID8gKGZpeGVkV2lkdGggKyBndXR0ZXIpICogc2xpZGVDb3VudE5ldyA6IHNsaWRlUG9zaXRpb25zW3NsaWRlQ291bnROZXddO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q2VudGVyR2FwIChudW0pIHtcbiAgICBpZiAobnVtID09IG51bGwpIHsgbnVtID0gaW5kZXg7IH1cblxuICAgIHZhciBnYXAgPSBlZGdlUGFkZGluZyA/IGd1dHRlciA6IDA7XG4gICAgcmV0dXJuIGF1dG9XaWR0aCA/ICgodmlld3BvcnQgLSBnYXApIC0gKHNsaWRlUG9zaXRpb25zW251bSArIDFdIC0gc2xpZGVQb3NpdGlvbnNbbnVtXSAtIGd1dHRlcikpLzIgOlxuICAgICAgZml4ZWRXaWR0aCA/ICh2aWV3cG9ydCAtIGZpeGVkV2lkdGgpIC8gMiA6XG4gICAgICAgIChpdGVtcyAtIDEpIC8gMjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFJpZ2h0Qm91bmRhcnkgKCkge1xuICAgIHZhciBnYXAgPSBlZGdlUGFkZGluZyA/IGd1dHRlciA6IDAsXG4gICAgICAgIHJlc3VsdCA9ICh2aWV3cG9ydCArIGdhcCkgLSBnZXRTbGlkZXJXaWR0aCgpO1xuXG4gICAgaWYgKGNlbnRlciAmJiAhbG9vcCkge1xuICAgICAgcmVzdWx0ID0gZml4ZWRXaWR0aCA/IC0gKGZpeGVkV2lkdGggKyBndXR0ZXIpICogKHNsaWRlQ291bnROZXcgLSAxKSAtIGdldENlbnRlckdhcCgpIDpcbiAgICAgICAgZ2V0Q2VudGVyR2FwKHNsaWRlQ291bnROZXcgLSAxKSAtIHNsaWRlUG9zaXRpb25zW3NsaWRlQ291bnROZXcgLSAxXTtcbiAgICB9XG4gICAgaWYgKHJlc3VsdCA+IDApIHsgcmVzdWx0ID0gMDsgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENvbnRhaW5lclRyYW5zZm9ybVZhbHVlIChudW0pIHtcbiAgICBpZiAobnVtID09IG51bGwpIHsgbnVtID0gaW5kZXg7IH1cblxuICAgIHZhciB2YWw7XG4gICAgaWYgKGhvcml6b250YWwgJiYgIWF1dG9XaWR0aCkge1xuICAgICAgaWYgKGZpeGVkV2lkdGgpIHtcbiAgICAgICAgdmFsID0gLSAoZml4ZWRXaWR0aCArIGd1dHRlcikgKiBudW07XG4gICAgICAgIGlmIChjZW50ZXIpIHsgdmFsICs9IGdldENlbnRlckdhcCgpOyB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgZGVub21pbmF0b3IgPSBUUkFOU0ZPUk0gPyBzbGlkZUNvdW50TmV3IDogaXRlbXM7XG4gICAgICAgIGlmIChjZW50ZXIpIHsgbnVtIC09IGdldENlbnRlckdhcCgpOyB9XG4gICAgICAgIHZhbCA9IC0gbnVtICogMTAwIC8gZGVub21pbmF0b3I7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbCA9IC0gc2xpZGVQb3NpdGlvbnNbbnVtXTtcbiAgICAgIGlmIChjZW50ZXIgJiYgYXV0b1dpZHRoKSB7XG4gICAgICAgIHZhbCArPSBnZXRDZW50ZXJHYXAoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaGFzUmlnaHREZWFkWm9uZSkgeyB2YWwgPSBNYXRoLm1heCh2YWwsIHJpZ2h0Qm91bmRhcnkpOyB9XG5cbiAgICB2YWwgKz0gKGhvcml6b250YWwgJiYgIWF1dG9XaWR0aCAmJiAhZml4ZWRXaWR0aCkgPyAnJScgOiAncHgnO1xuXG4gICAgcmV0dXJuIHZhbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRvQ29udGFpbmVyVHJhbnNmb3JtU2lsZW50ICh2YWwpIHtcbiAgICByZXNldER1cmF0aW9uKGNvbnRhaW5lciwgJzBzJyk7XG4gICAgZG9Db250YWluZXJUcmFuc2Zvcm0odmFsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRvQ29udGFpbmVyVHJhbnNmb3JtICh2YWwpIHtcbiAgICBpZiAodmFsID09IG51bGwpIHsgdmFsID0gZ2V0Q29udGFpbmVyVHJhbnNmb3JtVmFsdWUoKTsgfVxuICAgIGNvbnRhaW5lci5zdHlsZVt0cmFuc2Zvcm1BdHRyXSA9IHRyYW5zZm9ybVByZWZpeCArIHZhbCArIHRyYW5zZm9ybVBvc3RmaXg7XG4gIH1cblxuICBmdW5jdGlvbiBhbmltYXRlU2xpZGUgKG51bWJlciwgY2xhc3NPdXQsIGNsYXNzSW4sIGlzT3V0KSB7XG4gICAgdmFyIGwgPSBudW1iZXIgKyBpdGVtcztcbiAgICBpZiAoIWxvb3ApIHsgbCA9IE1hdGgubWluKGwsIHNsaWRlQ291bnROZXcpOyB9XG5cbiAgICBmb3IgKHZhciBpID0gbnVtYmVyOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHZhciBpdGVtID0gc2xpZGVJdGVtc1tpXTtcblxuICAgICAgLy8gc2V0IGl0ZW0gcG9zaXRpb25zXG4gICAgICBpZiAoIWlzT3V0KSB7IGl0ZW0uc3R5bGUubGVmdCA9IChpIC0gaW5kZXgpICogMTAwIC8gaXRlbXMgKyAnJSc7IH1cblxuICAgICAgaWYgKGFuaW1hdGVEZWxheSAmJiBUUkFOU0lUSU9OREVMQVkpIHtcbiAgICAgICAgaXRlbS5zdHlsZVtUUkFOU0lUSU9OREVMQVldID0gaXRlbS5zdHlsZVtBTklNQVRJT05ERUxBWV0gPSBhbmltYXRlRGVsYXkgKiAoaSAtIG51bWJlcikgLyAxMDAwICsgJ3MnO1xuICAgICAgfVxuICAgICAgcmVtb3ZlQ2xhc3MoaXRlbSwgY2xhc3NPdXQpO1xuICAgICAgYWRkQ2xhc3MoaXRlbSwgY2xhc3NJbik7XG5cbiAgICAgIGlmIChpc091dCkgeyBzbGlkZUl0ZW1zT3V0LnB1c2goaXRlbSk7IH1cbiAgICB9XG4gIH1cblxuICAvLyBtYWtlIHRyYW5zZmVyIGFmdGVyIGNsaWNrL2RyYWc6XG4gIC8vIDEuIGNoYW5nZSAndHJhbnNmb3JtJyBwcm9wZXJ0eSBmb3IgbW9yZGVybiBicm93c2Vyc1xuICAvLyAyLiBjaGFuZ2UgJ2xlZnQnIHByb3BlcnR5IGZvciBsZWdhY3kgYnJvd3NlcnNcbiAgdmFyIHRyYW5zZm9ybUNvcmUgPSAoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBjYXJvdXNlbCA/XG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJlc2V0RHVyYXRpb24oY29udGFpbmVyLCAnJyk7XG4gICAgICAgIGlmIChUUkFOU0lUSU9ORFVSQVRJT04gfHwgIXNwZWVkKSB7XG4gICAgICAgICAgLy8gZm9yIG1vcmRlbiBicm93c2VycyB3aXRoIG5vbi16ZXJvIGR1cmF0aW9uIG9yXG4gICAgICAgICAgLy8gemVybyBkdXJhdGlvbiBmb3IgYWxsIGJyb3dzZXJzXG4gICAgICAgICAgZG9Db250YWluZXJUcmFuc2Zvcm0oKTtcbiAgICAgICAgICAvLyBydW4gZmFsbGJhY2sgZnVuY3Rpb24gbWFudWFsbHlcbiAgICAgICAgICAvLyB3aGVuIGR1cmF0aW9uIGlzIDAgLyBjb250YWluZXIgaXMgaGlkZGVuXG4gICAgICAgICAgaWYgKCFzcGVlZCB8fCAhaXNWaXNpYmxlKGNvbnRhaW5lcikpIHsgb25UcmFuc2l0aW9uRW5kKCk7IH1cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGZvciBvbGQgYnJvd3NlciB3aXRoIG5vbi16ZXJvIGR1cmF0aW9uXG4gICAgICAgICAganNUcmFuc2Zvcm0oY29udGFpbmVyLCB0cmFuc2Zvcm1BdHRyLCB0cmFuc2Zvcm1QcmVmaXgsIHRyYW5zZm9ybVBvc3RmaXgsIGdldENvbnRhaW5lclRyYW5zZm9ybVZhbHVlKCksIHNwZWVkLCBvblRyYW5zaXRpb25FbmQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFob3Jpem9udGFsKSB7IHVwZGF0ZUNvbnRlbnRXcmFwcGVySGVpZ2h0KCk7IH1cbiAgICAgIH0gOlxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICBzbGlkZUl0ZW1zT3V0ID0gW107XG5cbiAgICAgICAgdmFyIGV2ZSA9IHt9O1xuICAgICAgICBldmVbVFJBTlNJVElPTkVORF0gPSBldmVbQU5JTUFUSU9ORU5EXSA9IG9uVHJhbnNpdGlvbkVuZDtcbiAgICAgICAgcmVtb3ZlRXZlbnRzKHNsaWRlSXRlbXNbaW5kZXhDYWNoZWRdLCBldmUpO1xuICAgICAgICBhZGRFdmVudHMoc2xpZGVJdGVtc1tpbmRleF0sIGV2ZSk7XG5cbiAgICAgICAgYW5pbWF0ZVNsaWRlKGluZGV4Q2FjaGVkLCBhbmltYXRlSW4sIGFuaW1hdGVPdXQsIHRydWUpO1xuICAgICAgICBhbmltYXRlU2xpZGUoaW5kZXgsIGFuaW1hdGVOb3JtYWwsIGFuaW1hdGVJbik7XG5cbiAgICAgICAgLy8gcnVuIGZhbGxiYWNrIGZ1bmN0aW9uIG1hbnVhbGx5XG4gICAgICAgIC8vIHdoZW4gdHJhbnNpdGlvbiBvciBhbmltYXRpb24gbm90IHN1cHBvcnRlZCAvIGR1cmF0aW9uIGlzIDBcbiAgICAgICAgaWYgKCFUUkFOU0lUSU9ORU5EIHx8ICFBTklNQVRJT05FTkQgfHwgIXNwZWVkIHx8ICFpc1Zpc2libGUoY29udGFpbmVyKSkgeyBvblRyYW5zaXRpb25FbmQoKTsgfVxuICAgICAgfTtcbiAgfSkoKTtcblxuICBmdW5jdGlvbiByZW5kZXIgKGUsIHNsaWRlck1vdmVkKSB7XG4gICAgaWYgKHVwZGF0ZUluZGV4QmVmb3JlVHJhbnNmb3JtKSB7IHVwZGF0ZUluZGV4KCk7IH1cblxuICAgIC8vIHJlbmRlciB3aGVuIHNsaWRlciB3YXMgbW92ZWQgKHRvdWNoIG9yIGRyYWcpIGV2ZW4gdGhvdWdoIGluZGV4IG1heSBub3QgY2hhbmdlXG4gICAgaWYgKGluZGV4ICE9PSBpbmRleENhY2hlZCB8fCBzbGlkZXJNb3ZlZCkge1xuICAgICAgLy8gZXZlbnRzXG4gICAgICBldmVudHMuZW1pdCgnaW5kZXhDaGFuZ2VkJywgaW5mbygpKTtcbiAgICAgIGV2ZW50cy5lbWl0KCd0cmFuc2l0aW9uU3RhcnQnLCBpbmZvKCkpO1xuICAgICAgaWYgKGF1dG9IZWlnaHQpIHsgZG9BdXRvSGVpZ2h0KCk7IH1cblxuICAgICAgLy8gcGF1c2UgYXV0b3BsYXkgd2hlbiBjbGljayBvciBrZXlkb3duIGZyb20gdXNlclxuICAgICAgaWYgKGFuaW1hdGluZyAmJiBlICYmIFsnY2xpY2snLCAna2V5ZG93biddLmluZGV4T2YoZS50eXBlKSA+PSAwKSB7IHN0b3BBdXRvcGxheSgpOyB9XG5cbiAgICAgIHJ1bm5pbmcgPSB0cnVlO1xuICAgICAgdHJhbnNmb3JtQ29yZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIFRyYW5zZmVyIHByZWZpeGVkIHByb3BlcnRpZXMgdG8gdGhlIHNhbWUgZm9ybWF0XG4gICAqIENTUzogLVdlYmtpdC1UcmFuc2Zvcm0gPT4gd2Via2l0dHJhbnNmb3JtXG4gICAqIEpTOiBXZWJraXRUcmFuc2Zvcm0gPT4gd2Via2l0dHJhbnNmb3JtXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgLSBwcm9wZXJ0eVxuICAgKlxuICAgKi9cbiAgZnVuY3Rpb24gc3RyVHJhbnMgKHN0cikge1xuICAgIHJldHVybiBzdHIudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8tL2csICcnKTtcbiAgfVxuXG4gIC8vIEFGVEVSIFRSQU5TRk9STVxuICAvLyBUaGluZ3MgbmVlZCB0byBiZSBkb25lIGFmdGVyIGEgdHJhbnNmZXI6XG4gIC8vIDEuIGNoZWNrIGluZGV4XG4gIC8vIDIuIGFkZCBjbGFzc2VzIHRvIHZpc2libGUgc2xpZGVcbiAgLy8gMy4gZGlzYWJsZSBjb250cm9scyBidXR0b25zIHdoZW4gcmVhY2ggdGhlIGZpcnN0L2xhc3Qgc2xpZGUgaW4gbm9uLWxvb3Agc2xpZGVyXG4gIC8vIDQuIHVwZGF0ZSBuYXYgc3RhdHVzXG4gIC8vIDUuIGxhenlsb2FkIGltYWdlc1xuICAvLyA2LiB1cGRhdGUgY29udGFpbmVyIGhlaWdodFxuICBmdW5jdGlvbiBvblRyYW5zaXRpb25FbmQgKGV2ZW50KSB7XG4gICAgLy8gY2hlY2sgcnVubmluZyBvbiBnYWxsZXJ5IG1vZGVcbiAgICAvLyBtYWtlIHN1cmUgdHJhbnRpb25lbmQvYW5pbWF0aW9uZW5kIGV2ZW50cyBydW4gb25seSBvbmNlXG4gICAgaWYgKGNhcm91c2VsIHx8IHJ1bm5pbmcpIHtcbiAgICAgIGV2ZW50cy5lbWl0KCd0cmFuc2l0aW9uRW5kJywgaW5mbyhldmVudCkpO1xuXG4gICAgICBpZiAoIWNhcm91c2VsICYmIHNsaWRlSXRlbXNPdXQubGVuZ3RoID4gMCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlSXRlbXNPdXQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgaXRlbSA9IHNsaWRlSXRlbXNPdXRbaV07XG4gICAgICAgICAgLy8gc2V0IGl0ZW0gcG9zaXRpb25zXG4gICAgICAgICAgaXRlbS5zdHlsZS5sZWZ0ID0gJyc7XG5cbiAgICAgICAgICBpZiAoQU5JTUFUSU9OREVMQVkgJiYgVFJBTlNJVElPTkRFTEFZKSB7XG4gICAgICAgICAgICBpdGVtLnN0eWxlW0FOSU1BVElPTkRFTEFZXSA9ICcnO1xuICAgICAgICAgICAgaXRlbS5zdHlsZVtUUkFOU0lUSU9OREVMQVldID0gJyc7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlbW92ZUNsYXNzKGl0ZW0sIGFuaW1hdGVPdXQpO1xuICAgICAgICAgIGFkZENsYXNzKGl0ZW0sIGFuaW1hdGVOb3JtYWwpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qIHVwZGF0ZSBzbGlkZXMsIG5hdiwgY29udHJvbHMgYWZ0ZXIgY2hlY2tpbmcgLi4uXG4gICAgICAgKiA9PiBsZWdhY3kgYnJvd3NlcnMgd2hvIGRvbid0IHN1cHBvcnQgJ2V2ZW50J1xuICAgICAgICogICAgaGF2ZSB0byBjaGVjayBldmVudCBmaXJzdCwgb3RoZXJ3aXNlIGV2ZW50LnRhcmdldCB3aWxsIGNhdXNlIGFuIGVycm9yXG4gICAgICAgKiA9PiBvciAnZ2FsbGVyeScgbW9kZTpcbiAgICAgICAqICAgKyBldmVudCB0YXJnZXQgaXMgc2xpZGUgaXRlbVxuICAgICAgICogPT4gb3IgJ2Nhcm91c2VsJyBtb2RlOlxuICAgICAgICogICArIGV2ZW50IHRhcmdldCBpcyBjb250YWluZXIsXG4gICAgICAgKiAgICsgZXZlbnQucHJvcGVydHkgaXMgdGhlIHNhbWUgd2l0aCB0cmFuc2Zvcm0gYXR0cmlidXRlXG4gICAgICAgKi9cbiAgICAgIGlmICghZXZlbnQgfHxcbiAgICAgICAgICAhY2Fyb3VzZWwgJiYgZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUgPT09IGNvbnRhaW5lciB8fFxuICAgICAgICAgIGV2ZW50LnRhcmdldCA9PT0gY29udGFpbmVyICYmIHN0clRyYW5zKGV2ZW50LnByb3BlcnR5TmFtZSkgPT09IHN0clRyYW5zKHRyYW5zZm9ybUF0dHIpKSB7XG5cbiAgICAgICAgaWYgKCF1cGRhdGVJbmRleEJlZm9yZVRyYW5zZm9ybSkge1xuICAgICAgICAgIHZhciBpbmRleFRlbSA9IGluZGV4O1xuICAgICAgICAgIHVwZGF0ZUluZGV4KCk7XG4gICAgICAgICAgaWYgKGluZGV4ICE9PSBpbmRleFRlbSkge1xuICAgICAgICAgICAgZXZlbnRzLmVtaXQoJ2luZGV4Q2hhbmdlZCcsIGluZm8oKSk7XG5cbiAgICAgICAgICAgIGRvQ29udGFpbmVyVHJhbnNmb3JtU2lsZW50KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5lc3RlZCA9PT0gJ2lubmVyJykgeyBldmVudHMuZW1pdCgnaW5uZXJMb2FkZWQnLCBpbmZvKCkpOyB9XG4gICAgICAgIHJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgaW5kZXhDYWNoZWQgPSBpbmRleDtcbiAgICAgIH1cbiAgICB9XG5cbiAgfVxuXG4gIC8vICMgQUNUSU9OU1xuICBmdW5jdGlvbiBnb1RvICh0YXJnZXRJbmRleCwgZSkge1xuICAgIGlmIChmcmVlemUpIHsgcmV0dXJuOyB9XG5cbiAgICAvLyBwcmV2IHNsaWRlQnlcbiAgICBpZiAodGFyZ2V0SW5kZXggPT09ICdwcmV2Jykge1xuICAgICAgb25Db250cm9sc0NsaWNrKGUsIC0xKTtcblxuICAgIC8vIG5leHQgc2xpZGVCeVxuICAgIH0gZWxzZSBpZiAodGFyZ2V0SW5kZXggPT09ICduZXh0Jykge1xuICAgICAgb25Db250cm9sc0NsaWNrKGUsIDEpO1xuXG4gICAgLy8gZ28gdG8gZXhhY3Qgc2xpZGVcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHJ1bm5pbmcpIHtcbiAgICAgICAgaWYgKHByZXZlbnRBY3Rpb25XaGVuUnVubmluZykgeyByZXR1cm47IH0gZWxzZSB7IG9uVHJhbnNpdGlvbkVuZCgpOyB9XG4gICAgICB9XG5cbiAgICAgIHZhciBhYnNJbmRleCA9IGdldEFic0luZGV4KCksXG4gICAgICAgICAgaW5kZXhHYXAgPSAwO1xuXG4gICAgICBpZiAodGFyZ2V0SW5kZXggPT09ICdmaXJzdCcpIHtcbiAgICAgICAgaW5kZXhHYXAgPSAtIGFic0luZGV4O1xuICAgICAgfSBlbHNlIGlmICh0YXJnZXRJbmRleCA9PT0gJ2xhc3QnKSB7XG4gICAgICAgIGluZGV4R2FwID0gY2Fyb3VzZWwgPyBzbGlkZUNvdW50IC0gaXRlbXMgLSBhYnNJbmRleCA6IHNsaWRlQ291bnQgLSAxIC0gYWJzSW5kZXg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodHlwZW9mIHRhcmdldEluZGV4ICE9PSAnbnVtYmVyJykgeyB0YXJnZXRJbmRleCA9IHBhcnNlSW50KHRhcmdldEluZGV4KTsgfVxuXG4gICAgICAgIGlmICghaXNOYU4odGFyZ2V0SW5kZXgpKSB7XG4gICAgICAgICAgLy8gZnJvbSBkaXJlY3RseSBjYWxsZWQgZ29UbyBmdW5jdGlvblxuICAgICAgICAgIGlmICghZSkgeyB0YXJnZXRJbmRleCA9IE1hdGgubWF4KDAsIE1hdGgubWluKHNsaWRlQ291bnQgLSAxLCB0YXJnZXRJbmRleCkpOyB9XG5cbiAgICAgICAgICBpbmRleEdhcCA9IHRhcmdldEluZGV4IC0gYWJzSW5kZXg7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gZ2FsbGVyeTogbWFrZSBzdXJlIG5ldyBwYWdlIHdvbid0IG92ZXJsYXAgd2l0aCBjdXJyZW50IHBhZ2VcbiAgICAgIGlmICghY2Fyb3VzZWwgJiYgaW5kZXhHYXAgJiYgTWF0aC5hYnMoaW5kZXhHYXApIDwgaXRlbXMpIHtcbiAgICAgICAgdmFyIGZhY3RvciA9IGluZGV4R2FwID4gMCA/IDEgOiAtMTtcbiAgICAgICAgaW5kZXhHYXAgKz0gKGluZGV4ICsgaW5kZXhHYXAgLSBzbGlkZUNvdW50KSA+PSBpbmRleE1pbiA/IHNsaWRlQ291bnQgKiBmYWN0b3IgOiBzbGlkZUNvdW50ICogMiAqIGZhY3RvciAqIC0xO1xuICAgICAgfVxuXG4gICAgICBpbmRleCArPSBpbmRleEdhcDtcblxuICAgICAgLy8gbWFrZSBzdXJlIGluZGV4IGlzIGluIHJhbmdlXG4gICAgICBpZiAoY2Fyb3VzZWwgJiYgbG9vcCkge1xuICAgICAgICBpZiAoaW5kZXggPCBpbmRleE1pbikgeyBpbmRleCArPSBzbGlkZUNvdW50OyB9XG4gICAgICAgIGlmIChpbmRleCA+IGluZGV4TWF4KSB7IGluZGV4IC09IHNsaWRlQ291bnQ7IH1cbiAgICAgIH1cblxuICAgICAgLy8gaWYgaW5kZXggaXMgY2hhbmdlZCwgc3RhcnQgcmVuZGVyaW5nXG4gICAgICBpZiAoZ2V0QWJzSW5kZXgoaW5kZXgpICE9PSBnZXRBYnNJbmRleChpbmRleENhY2hlZCkpIHtcbiAgICAgICAgcmVuZGVyKGUpO1xuICAgICAgfVxuXG4gICAgfVxuICB9XG5cbiAgLy8gb24gY29udHJvbHMgY2xpY2tcbiAgZnVuY3Rpb24gb25Db250cm9sc0NsaWNrIChlLCBkaXIpIHtcbiAgICBpZiAocnVubmluZykge1xuICAgICAgaWYgKHByZXZlbnRBY3Rpb25XaGVuUnVubmluZykgeyByZXR1cm47IH0gZWxzZSB7IG9uVHJhbnNpdGlvbkVuZCgpOyB9XG4gICAgfVxuICAgIHZhciBwYXNzRXZlbnRPYmplY3Q7XG5cbiAgICBpZiAoIWRpcikge1xuICAgICAgZSA9IGdldEV2ZW50KGUpO1xuICAgICAgdmFyIHRhcmdldCA9IGdldFRhcmdldChlKTtcblxuICAgICAgd2hpbGUgKHRhcmdldCAhPT0gY29udHJvbHNDb250YWluZXIgJiYgW3ByZXZCdXR0b24sIG5leHRCdXR0b25dLmluZGV4T2YodGFyZ2V0KSA8IDApIHsgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGU7IH1cblxuICAgICAgdmFyIHRhcmdldEluID0gW3ByZXZCdXR0b24sIG5leHRCdXR0b25dLmluZGV4T2YodGFyZ2V0KTtcbiAgICAgIGlmICh0YXJnZXRJbiA+PSAwKSB7XG4gICAgICAgIHBhc3NFdmVudE9iamVjdCA9IHRydWU7XG4gICAgICAgIGRpciA9IHRhcmdldEluID09PSAwID8gLTEgOiAxO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyZXdpbmQpIHtcbiAgICAgIGlmIChpbmRleCA9PT0gaW5kZXhNaW4gJiYgZGlyID09PSAtMSkge1xuICAgICAgICBnb1RvKCdsYXN0JywgZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSBpZiAoaW5kZXggPT09IGluZGV4TWF4ICYmIGRpciA9PT0gMSkge1xuICAgICAgICBnb1RvKCdmaXJzdCcsIGUpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGRpcikge1xuICAgICAgaW5kZXggKz0gc2xpZGVCeSAqIGRpcjtcbiAgICAgIGlmIChhdXRvV2lkdGgpIHsgaW5kZXggPSBNYXRoLmZsb29yKGluZGV4KTsgfVxuICAgICAgLy8gcGFzcyBlIHdoZW4gY2xpY2sgY29udHJvbCBidXR0b25zIG9yIGtleWRvd25cbiAgICAgIHJlbmRlcigocGFzc0V2ZW50T2JqZWN0IHx8IChlICYmIGUudHlwZSA9PT0gJ2tleWRvd24nKSkgPyBlIDogbnVsbCk7XG4gICAgfVxuICB9XG5cbiAgLy8gb24gbmF2IGNsaWNrXG4gIGZ1bmN0aW9uIG9uTmF2Q2xpY2sgKGUpIHtcbiAgICBpZiAocnVubmluZykge1xuICAgICAgaWYgKHByZXZlbnRBY3Rpb25XaGVuUnVubmluZykgeyByZXR1cm47IH0gZWxzZSB7IG9uVHJhbnNpdGlvbkVuZCgpOyB9XG4gICAgfVxuXG4gICAgZSA9IGdldEV2ZW50KGUpO1xuICAgIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoZSksIG5hdkluZGV4O1xuXG4gICAgLy8gZmluZCB0aGUgY2xpY2tlZCBuYXYgaXRlbVxuICAgIHdoaWxlICh0YXJnZXQgIT09IG5hdkNvbnRhaW5lciAmJiAhaGFzQXR0cih0YXJnZXQsICdkYXRhLW5hdicpKSB7IHRhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlOyB9XG4gICAgaWYgKGhhc0F0dHIodGFyZ2V0LCAnZGF0YS1uYXYnKSkge1xuICAgICAgdmFyIG5hdkluZGV4ID0gbmF2Q2xpY2tlZCA9IE51bWJlcihnZXRBdHRyKHRhcmdldCwgJ2RhdGEtbmF2JykpLFxuICAgICAgICAgIHRhcmdldEluZGV4QmFzZSA9IGZpeGVkV2lkdGggfHwgYXV0b1dpZHRoID8gbmF2SW5kZXggKiBzbGlkZUNvdW50IC8gcGFnZXMgOiBuYXZJbmRleCAqIGl0ZW1zLFxuICAgICAgICAgIHRhcmdldEluZGV4ID0gbmF2QXNUaHVtYm5haWxzID8gbmF2SW5kZXggOiBNYXRoLm1pbihNYXRoLmNlaWwodGFyZ2V0SW5kZXhCYXNlKSwgc2xpZGVDb3VudCAtIDEpO1xuICAgICAgZ29Ubyh0YXJnZXRJbmRleCwgZSk7XG5cbiAgICAgIGlmIChuYXZDdXJyZW50SW5kZXggPT09IG5hdkluZGV4KSB7XG4gICAgICAgIGlmIChhbmltYXRpbmcpIHsgc3RvcEF1dG9wbGF5KCk7IH1cbiAgICAgICAgbmF2Q2xpY2tlZCA9IC0xOyAvLyByZXNldCBuYXZDbGlja2VkXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gYXV0b3BsYXkgZnVuY3Rpb25zXG4gIGZ1bmN0aW9uIHNldEF1dG9wbGF5VGltZXIgKCkge1xuICAgIGF1dG9wbGF5VGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICBvbkNvbnRyb2xzQ2xpY2sobnVsbCwgYXV0b3BsYXlEaXJlY3Rpb24pO1xuICAgIH0sIGF1dG9wbGF5VGltZW91dCk7XG5cbiAgICBhbmltYXRpbmcgPSB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gc3RvcEF1dG9wbGF5VGltZXIgKCkge1xuICAgIGNsZWFySW50ZXJ2YWwoYXV0b3BsYXlUaW1lcik7XG4gICAgYW5pbWF0aW5nID0gZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVBdXRvcGxheUJ1dHRvbiAoYWN0aW9uLCB0eHQpIHtcbiAgICBzZXRBdHRycyhhdXRvcGxheUJ1dHRvbiwgeydkYXRhLWFjdGlvbic6IGFjdGlvbn0pO1xuICAgIGF1dG9wbGF5QnV0dG9uLmlubmVySFRNTCA9IGF1dG9wbGF5SHRtbFN0cmluZ3NbMF0gKyBhY3Rpb24gKyBhdXRvcGxheUh0bWxTdHJpbmdzWzFdICsgdHh0O1xuICB9XG5cbiAgZnVuY3Rpb24gc3RhcnRBdXRvcGxheSAoKSB7XG4gICAgc2V0QXV0b3BsYXlUaW1lcigpO1xuICAgIGlmIChhdXRvcGxheUJ1dHRvbikgeyB1cGRhdGVBdXRvcGxheUJ1dHRvbignc3RvcCcsIGF1dG9wbGF5VGV4dFsxXSk7IH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHN0b3BBdXRvcGxheSAoKSB7XG4gICAgc3RvcEF1dG9wbGF5VGltZXIoKTtcbiAgICBpZiAoYXV0b3BsYXlCdXR0b24pIHsgdXBkYXRlQXV0b3BsYXlCdXR0b24oJ3N0YXJ0JywgYXV0b3BsYXlUZXh0WzBdKTsgfVxuICB9XG5cbiAgLy8gcHJvZ3JhbWFpdGNhbGx5IHBsYXkvcGF1c2UgdGhlIHNsaWRlclxuICBmdW5jdGlvbiBwbGF5ICgpIHtcbiAgICBpZiAoYXV0b3BsYXkgJiYgIWFuaW1hdGluZykge1xuICAgICAgc3RhcnRBdXRvcGxheSgpO1xuICAgICAgYXV0b3BsYXlVc2VyUGF1c2VkID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIHBhdXNlICgpIHtcbiAgICBpZiAoYW5pbWF0aW5nKSB7XG4gICAgICBzdG9wQXV0b3BsYXkoKTtcbiAgICAgIGF1dG9wbGF5VXNlclBhdXNlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdG9nZ2xlQXV0b3BsYXkgKCkge1xuICAgIGlmIChhbmltYXRpbmcpIHtcbiAgICAgIHN0b3BBdXRvcGxheSgpO1xuICAgICAgYXV0b3BsYXlVc2VyUGF1c2VkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhcnRBdXRvcGxheSgpO1xuICAgICAgYXV0b3BsYXlVc2VyUGF1c2VkID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25WaXNpYmlsaXR5Q2hhbmdlICgpIHtcbiAgICBpZiAoZG9jLmhpZGRlbikge1xuICAgICAgaWYgKGFuaW1hdGluZykge1xuICAgICAgICBzdG9wQXV0b3BsYXlUaW1lcigpO1xuICAgICAgICBhdXRvcGxheVZpc2liaWxpdHlQYXVzZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoYXV0b3BsYXlWaXNpYmlsaXR5UGF1c2VkKSB7XG4gICAgICBzZXRBdXRvcGxheVRpbWVyKCk7XG4gICAgICBhdXRvcGxheVZpc2liaWxpdHlQYXVzZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBtb3VzZW92ZXJQYXVzZSAoKSB7XG4gICAgaWYgKGFuaW1hdGluZykge1xuICAgICAgc3RvcEF1dG9wbGF5VGltZXIoKTtcbiAgICAgIGF1dG9wbGF5SG92ZXJQYXVzZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG1vdXNlb3V0UmVzdGFydCAoKSB7XG4gICAgaWYgKGF1dG9wbGF5SG92ZXJQYXVzZWQpIHtcbiAgICAgIHNldEF1dG9wbGF5VGltZXIoKTtcbiAgICAgIGF1dG9wbGF5SG92ZXJQYXVzZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvLyBrZXlkb3duIGV2ZW50cyBvbiBkb2N1bWVudFxuICBmdW5jdGlvbiBvbkRvY3VtZW50S2V5ZG93biAoZSkge1xuICAgIGUgPSBnZXRFdmVudChlKTtcbiAgICB2YXIga2V5SW5kZXggPSBbS0VZUy5MRUZULCBLRVlTLlJJR0hUXS5pbmRleE9mKGUua2V5Q29kZSk7XG5cbiAgICBpZiAoa2V5SW5kZXggPj0gMCkge1xuICAgICAgb25Db250cm9sc0NsaWNrKGUsIGtleUluZGV4ID09PSAwID8gLTEgOiAxKTtcbiAgICB9XG4gIH1cblxuICAvLyBvbiBrZXkgY29udHJvbFxuICBmdW5jdGlvbiBvbkNvbnRyb2xzS2V5ZG93biAoZSkge1xuICAgIGUgPSBnZXRFdmVudChlKTtcbiAgICB2YXIga2V5SW5kZXggPSBbS0VZUy5MRUZULCBLRVlTLlJJR0hUXS5pbmRleE9mKGUua2V5Q29kZSk7XG5cbiAgICBpZiAoa2V5SW5kZXggPj0gMCkge1xuICAgICAgaWYgKGtleUluZGV4ID09PSAwKSB7XG4gICAgICAgIGlmICghcHJldkJ1dHRvbi5kaXNhYmxlZCkgeyBvbkNvbnRyb2xzQ2xpY2soZSwgLTEpOyB9XG4gICAgICB9IGVsc2UgaWYgKCFuZXh0QnV0dG9uLmRpc2FibGVkKSB7XG4gICAgICAgIG9uQ29udHJvbHNDbGljayhlLCAxKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBzZXQgZm9jdXNcbiAgZnVuY3Rpb24gc2V0Rm9jdXMgKGVsKSB7XG4gICAgZWwuZm9jdXMoKTtcbiAgfVxuXG4gIC8vIG9uIGtleSBuYXZcbiAgZnVuY3Rpb24gb25OYXZLZXlkb3duIChlKSB7XG4gICAgZSA9IGdldEV2ZW50KGUpO1xuICAgIHZhciBjdXJFbGVtZW50ID0gZG9jLmFjdGl2ZUVsZW1lbnQ7XG4gICAgaWYgKCFoYXNBdHRyKGN1ckVsZW1lbnQsICdkYXRhLW5hdicpKSB7IHJldHVybjsgfVxuXG4gICAgLy8gdmFyIGNvZGUgPSBlLmtleUNvZGUsXG4gICAgdmFyIGtleUluZGV4ID0gW0tFWVMuTEVGVCwgS0VZUy5SSUdIVCwgS0VZUy5FTlRFUiwgS0VZUy5TUEFDRV0uaW5kZXhPZihlLmtleUNvZGUpLFxuICAgICAgICBuYXZJbmRleCA9IE51bWJlcihnZXRBdHRyKGN1ckVsZW1lbnQsICdkYXRhLW5hdicpKTtcblxuICAgIGlmIChrZXlJbmRleCA+PSAwKSB7XG4gICAgICBpZiAoa2V5SW5kZXggPT09IDApIHtcbiAgICAgICAgaWYgKG5hdkluZGV4ID4gMCkgeyBzZXRGb2N1cyhuYXZJdGVtc1tuYXZJbmRleCAtIDFdKTsgfVxuICAgICAgfSBlbHNlIGlmIChrZXlJbmRleCA9PT0gMSkge1xuICAgICAgICBpZiAobmF2SW5kZXggPCBwYWdlcyAtIDEpIHsgc2V0Rm9jdXMobmF2SXRlbXNbbmF2SW5kZXggKyAxXSk7IH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5hdkNsaWNrZWQgPSBuYXZJbmRleDtcbiAgICAgICAgZ29UbyhuYXZJbmRleCwgZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RXZlbnQgKGUpIHtcbiAgICBlID0gZSB8fCB3aW4uZXZlbnQ7XG4gICAgcmV0dXJuIGlzVG91Y2hFdmVudChlKSA/IGUuY2hhbmdlZFRvdWNoZXNbMF0gOiBlO1xuICB9XG4gIGZ1bmN0aW9uIGdldFRhcmdldCAoZSkge1xuICAgIHJldHVybiBlLnRhcmdldCB8fCB3aW4uZXZlbnQuc3JjRWxlbWVudDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzVG91Y2hFdmVudCAoZSkge1xuICAgIHJldHVybiBlLnR5cGUuaW5kZXhPZigndG91Y2gnKSA+PSAwO1xuICB9XG5cbiAgZnVuY3Rpb24gcHJldmVudERlZmF1bHRCZWhhdmlvciAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQgPyBlLnByZXZlbnREZWZhdWx0KCkgOiBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRNb3ZlRGlyZWN0aW9uRXhwZWN0ZWQgKCkge1xuICAgIHJldHVybiBnZXRUb3VjaERpcmVjdGlvbih0b0RlZ3JlZShsYXN0UG9zaXRpb24ueSAtIGluaXRQb3NpdGlvbi55LCBsYXN0UG9zaXRpb24ueCAtIGluaXRQb3NpdGlvbi54KSwgc3dpcGVBbmdsZSkgPT09IG9wdGlvbnMuYXhpcztcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uUGFuU3RhcnQgKGUpIHtcbiAgICBpZiAocnVubmluZykge1xuICAgICAgaWYgKHByZXZlbnRBY3Rpb25XaGVuUnVubmluZykgeyByZXR1cm47IH0gZWxzZSB7IG9uVHJhbnNpdGlvbkVuZCgpOyB9XG4gICAgfVxuXG4gICAgaWYgKGF1dG9wbGF5ICYmIGFuaW1hdGluZykgeyBzdG9wQXV0b3BsYXlUaW1lcigpOyB9XG5cbiAgICBwYW5TdGFydCA9IHRydWU7XG4gICAgaWYgKHJhZkluZGV4KSB7XG4gICAgICBjYWYocmFmSW5kZXgpO1xuICAgICAgcmFmSW5kZXggPSBudWxsO1xuICAgIH1cblxuICAgIHZhciAkID0gZ2V0RXZlbnQoZSk7XG4gICAgZXZlbnRzLmVtaXQoaXNUb3VjaEV2ZW50KGUpID8gJ3RvdWNoU3RhcnQnIDogJ2RyYWdTdGFydCcsIGluZm8oZSkpO1xuXG4gICAgaWYgKCFpc1RvdWNoRXZlbnQoZSkgJiYgWydpbWcnLCAnYSddLmluZGV4T2YoZ2V0TG93ZXJDYXNlTm9kZU5hbWUoZ2V0VGFyZ2V0KGUpKSkgPj0gMCkge1xuICAgICAgcHJldmVudERlZmF1bHRCZWhhdmlvcihlKTtcbiAgICB9XG5cbiAgICBsYXN0UG9zaXRpb24ueCA9IGluaXRQb3NpdGlvbi54ID0gJC5jbGllbnRYO1xuICAgIGxhc3RQb3NpdGlvbi55ID0gaW5pdFBvc2l0aW9uLnkgPSAkLmNsaWVudFk7XG4gICAgaWYgKGNhcm91c2VsKSB7XG4gICAgICB0cmFuc2xhdGVJbml0ID0gcGFyc2VGbG9hdChjb250YWluZXIuc3R5bGVbdHJhbnNmb3JtQXR0cl0ucmVwbGFjZSh0cmFuc2Zvcm1QcmVmaXgsICcnKSk7XG4gICAgICByZXNldER1cmF0aW9uKGNvbnRhaW5lciwgJzBzJyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25QYW5Nb3ZlIChlKSB7XG4gICAgaWYgKHBhblN0YXJ0KSB7XG4gICAgICB2YXIgJCA9IGdldEV2ZW50KGUpO1xuICAgICAgbGFzdFBvc2l0aW9uLnggPSAkLmNsaWVudFg7XG4gICAgICBsYXN0UG9zaXRpb24ueSA9ICQuY2xpZW50WTtcblxuICAgICAgaWYgKGNhcm91c2VsKSB7XG4gICAgICAgIGlmICghcmFmSW5kZXgpIHsgcmFmSW5kZXggPSByYWYoZnVuY3Rpb24oKXsgcGFuVXBkYXRlKGUpOyB9KTsgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG1vdmVEaXJlY3Rpb25FeHBlY3RlZCA9PT0gJz8nKSB7IG1vdmVEaXJlY3Rpb25FeHBlY3RlZCA9IGdldE1vdmVEaXJlY3Rpb25FeHBlY3RlZCgpOyB9XG4gICAgICAgIGlmIChtb3ZlRGlyZWN0aW9uRXhwZWN0ZWQpIHsgcHJldmVudFNjcm9sbCA9IHRydWU7IH1cbiAgICAgIH1cblxuICAgICAgaWYgKCh0eXBlb2YgZS5jYW5jZWxhYmxlICE9PSAnYm9vbGVhbicgfHwgZS5jYW5jZWxhYmxlKSAmJiBwcmV2ZW50U2Nyb2xsKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwYW5VcGRhdGUgKGUpIHtcbiAgICBpZiAoIW1vdmVEaXJlY3Rpb25FeHBlY3RlZCkge1xuICAgICAgcGFuU3RhcnQgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY2FmKHJhZkluZGV4KTtcbiAgICBpZiAocGFuU3RhcnQpIHsgcmFmSW5kZXggPSByYWYoZnVuY3Rpb24oKXsgcGFuVXBkYXRlKGUpOyB9KTsgfVxuXG4gICAgaWYgKG1vdmVEaXJlY3Rpb25FeHBlY3RlZCA9PT0gJz8nKSB7IG1vdmVEaXJlY3Rpb25FeHBlY3RlZCA9IGdldE1vdmVEaXJlY3Rpb25FeHBlY3RlZCgpOyB9XG4gICAgaWYgKG1vdmVEaXJlY3Rpb25FeHBlY3RlZCkge1xuICAgICAgaWYgKCFwcmV2ZW50U2Nyb2xsICYmIGlzVG91Y2hFdmVudChlKSkgeyBwcmV2ZW50U2Nyb2xsID0gdHJ1ZTsgfVxuXG4gICAgICB0cnkge1xuICAgICAgICBpZiAoZS50eXBlKSB7IGV2ZW50cy5lbWl0KGlzVG91Y2hFdmVudChlKSA/ICd0b3VjaE1vdmUnIDogJ2RyYWdNb3ZlJywgaW5mbyhlKSk7IH1cbiAgICAgIH0gY2F0Y2goZXJyKSB7fVxuXG4gICAgICB2YXIgeCA9IHRyYW5zbGF0ZUluaXQsXG4gICAgICAgICAgZGlzdCA9IGdldERpc3QobGFzdFBvc2l0aW9uLCBpbml0UG9zaXRpb24pO1xuICAgICAgaWYgKCFob3Jpem9udGFsIHx8IGZpeGVkV2lkdGggfHwgYXV0b1dpZHRoKSB7XG4gICAgICAgIHggKz0gZGlzdDtcbiAgICAgICAgeCArPSAncHgnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHBlcmNlbnRhZ2VYID0gVFJBTlNGT1JNID8gZGlzdCAqIGl0ZW1zICogMTAwIC8gKCh2aWV3cG9ydCArIGd1dHRlcikgKiBzbGlkZUNvdW50TmV3KTogZGlzdCAqIDEwMCAvICh2aWV3cG9ydCArIGd1dHRlcik7XG4gICAgICAgIHggKz0gcGVyY2VudGFnZVg7XG4gICAgICAgIHggKz0gJyUnO1xuICAgICAgfVxuXG4gICAgICBjb250YWluZXIuc3R5bGVbdHJhbnNmb3JtQXR0cl0gPSB0cmFuc2Zvcm1QcmVmaXggKyB4ICsgdHJhbnNmb3JtUG9zdGZpeDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvblBhbkVuZCAoZSkge1xuICAgIGlmIChwYW5TdGFydCkge1xuICAgICAgaWYgKHJhZkluZGV4KSB7XG4gICAgICAgIGNhZihyYWZJbmRleCk7XG4gICAgICAgIHJhZkluZGV4ID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIGlmIChjYXJvdXNlbCkgeyByZXNldER1cmF0aW9uKGNvbnRhaW5lciwgJycpOyB9XG4gICAgICBwYW5TdGFydCA9IGZhbHNlO1xuXG4gICAgICB2YXIgJCA9IGdldEV2ZW50KGUpO1xuICAgICAgbGFzdFBvc2l0aW9uLnggPSAkLmNsaWVudFg7XG4gICAgICBsYXN0UG9zaXRpb24ueSA9ICQuY2xpZW50WTtcbiAgICAgIHZhciBkaXN0ID0gZ2V0RGlzdChsYXN0UG9zaXRpb24sIGluaXRQb3NpdGlvbik7XG5cbiAgICAgIGlmIChNYXRoLmFicyhkaXN0KSkge1xuICAgICAgICAvLyBkcmFnIHZzIGNsaWNrXG4gICAgICAgIGlmICghaXNUb3VjaEV2ZW50KGUpKSB7XG4gICAgICAgICAgLy8gcHJldmVudCBcImNsaWNrXCJcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGUpO1xuICAgICAgICAgIGFkZEV2ZW50cyh0YXJnZXQsIHsnY2xpY2snOiBmdW5jdGlvbiBwcmV2ZW50Q2xpY2sgKGUpIHtcbiAgICAgICAgICAgIHByZXZlbnREZWZhdWx0QmVoYXZpb3IoZSk7XG4gICAgICAgICAgICByZW1vdmVFdmVudHModGFyZ2V0LCB7J2NsaWNrJzogcHJldmVudENsaWNrfSk7XG4gICAgICAgICAgfX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNhcm91c2VsKSB7XG4gICAgICAgICAgcmFmSW5kZXggPSByYWYoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoaG9yaXpvbnRhbCAmJiAhYXV0b1dpZHRoKSB7XG4gICAgICAgICAgICAgIHZhciBpbmRleE1vdmVkID0gLSBkaXN0ICogaXRlbXMgLyAodmlld3BvcnQgKyBndXR0ZXIpO1xuICAgICAgICAgICAgICBpbmRleE1vdmVkID0gZGlzdCA+IDAgPyBNYXRoLmZsb29yKGluZGV4TW92ZWQpIDogTWF0aC5jZWlsKGluZGV4TW92ZWQpO1xuICAgICAgICAgICAgICBpbmRleCArPSBpbmRleE1vdmVkO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdmFyIG1vdmVkID0gLSAodHJhbnNsYXRlSW5pdCArIGRpc3QpO1xuICAgICAgICAgICAgICBpZiAobW92ZWQgPD0gMCkge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gaW5kZXhNaW47XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAobW92ZWQgPj0gc2xpZGVQb3NpdGlvbnNbc2xpZGVDb3VudE5ldyAtIDFdKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBpbmRleE1heDtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGkgPCBzbGlkZUNvdW50TmV3ICYmIG1vdmVkID49IHNsaWRlUG9zaXRpb25zW2ldKSB7XG4gICAgICAgICAgICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICBpZiAobW92ZWQgPiBzbGlkZVBvc2l0aW9uc1tpXSAmJiBkaXN0IDwgMCkgeyBpbmRleCArPSAxOyB9XG4gICAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlbmRlcihlLCBkaXN0KTtcbiAgICAgICAgICAgIGV2ZW50cy5lbWl0KGlzVG91Y2hFdmVudChlKSA/ICd0b3VjaEVuZCcgOiAnZHJhZ0VuZCcsIGluZm8oZSkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChtb3ZlRGlyZWN0aW9uRXhwZWN0ZWQpIHtcbiAgICAgICAgICAgIG9uQ29udHJvbHNDbGljayhlLCBkaXN0ID4gMCA/IC0xIDogMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gcmVzZXRcbiAgICBpZiAob3B0aW9ucy5wcmV2ZW50U2Nyb2xsT25Ub3VjaCA9PT0gJ2F1dG8nKSB7IHByZXZlbnRTY3JvbGwgPSBmYWxzZTsgfVxuICAgIGlmIChzd2lwZUFuZ2xlKSB7IG1vdmVEaXJlY3Rpb25FeHBlY3RlZCA9ICc/JzsgfVxuICAgIGlmIChhdXRvcGxheSAmJiAhYW5pbWF0aW5nKSB7IHNldEF1dG9wbGF5VGltZXIoKTsgfVxuICB9XG5cbiAgLy8gPT09IFJFU0laRSBGVU5DVElPTlMgPT09IC8vXG4gIC8vIChzbGlkZVBvc2l0aW9ucywgaW5kZXgsIGl0ZW1zKSA9PiB2ZXJ0aWNhbF9jb25lbnRXcmFwcGVyLmhlaWdodFxuICBmdW5jdGlvbiB1cGRhdGVDb250ZW50V3JhcHBlckhlaWdodCAoKSB7XG4gICAgdmFyIHdwID0gbWlkZGxlV3JhcHBlciA/IG1pZGRsZVdyYXBwZXIgOiBpbm5lcldyYXBwZXI7XG4gICAgd3Auc3R5bGUuaGVpZ2h0ID0gc2xpZGVQb3NpdGlvbnNbaW5kZXggKyBpdGVtc10gLSBzbGlkZVBvc2l0aW9uc1tpbmRleF0gKyAncHgnO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0UGFnZXMgKCkge1xuICAgIHZhciByb3VnaCA9IGZpeGVkV2lkdGggPyAoZml4ZWRXaWR0aCArIGd1dHRlcikgKiBzbGlkZUNvdW50IC8gdmlld3BvcnQgOiBzbGlkZUNvdW50IC8gaXRlbXM7XG4gICAgcmV0dXJuIE1hdGgubWluKE1hdGguY2VpbChyb3VnaCksIHNsaWRlQ291bnQpO1xuICB9XG5cbiAgLypcbiAgICogMS4gdXBkYXRlIHZpc2libGUgbmF2IGl0ZW1zIGxpc3RcbiAgICogMi4gYWRkIFwiaGlkZGVuXCIgYXR0cmlidXRlcyB0byBwcmV2aW91cyB2aXNpYmxlIG5hdiBpdGVtc1xuICAgKiAzLiByZW1vdmUgXCJoaWRkZW5cIiBhdHRydWJ1dGVzIHRvIG5ldyB2aXNpYmxlIG5hdiBpdGVtc1xuICAgKi9cbiAgZnVuY3Rpb24gdXBkYXRlTmF2VmlzaWJpbGl0eSAoKSB7XG4gICAgaWYgKCFuYXYgfHwgbmF2QXNUaHVtYm5haWxzKSB7IHJldHVybjsgfVxuXG4gICAgaWYgKHBhZ2VzICE9PSBwYWdlc0NhY2hlZCkge1xuICAgICAgdmFyIG1pbiA9IHBhZ2VzQ2FjaGVkLFxuICAgICAgICAgIG1heCA9IHBhZ2VzLFxuICAgICAgICAgIGZuID0gc2hvd0VsZW1lbnQ7XG5cbiAgICAgIGlmIChwYWdlc0NhY2hlZCA+IHBhZ2VzKSB7XG4gICAgICAgIG1pbiA9IHBhZ2VzO1xuICAgICAgICBtYXggPSBwYWdlc0NhY2hlZDtcbiAgICAgICAgZm4gPSBoaWRlRWxlbWVudDtcbiAgICAgIH1cblxuICAgICAgd2hpbGUgKG1pbiA8IG1heCkge1xuICAgICAgICBmbihuYXZJdGVtc1ttaW5dKTtcbiAgICAgICAgbWluKys7XG4gICAgICB9XG5cbiAgICAgIC8vIGNhY2hlIHBhZ2VzXG4gICAgICBwYWdlc0NhY2hlZCA9IHBhZ2VzO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGluZm8gKGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29udGFpbmVyOiBjb250YWluZXIsXG4gICAgICBzbGlkZUl0ZW1zOiBzbGlkZUl0ZW1zLFxuICAgICAgbmF2Q29udGFpbmVyOiBuYXZDb250YWluZXIsXG4gICAgICBuYXZJdGVtczogbmF2SXRlbXMsXG4gICAgICBjb250cm9sc0NvbnRhaW5lcjogY29udHJvbHNDb250YWluZXIsXG4gICAgICBoYXNDb250cm9sczogaGFzQ29udHJvbHMsXG4gICAgICBwcmV2QnV0dG9uOiBwcmV2QnV0dG9uLFxuICAgICAgbmV4dEJ1dHRvbjogbmV4dEJ1dHRvbixcbiAgICAgIGl0ZW1zOiBpdGVtcyxcbiAgICAgIHNsaWRlQnk6IHNsaWRlQnksXG4gICAgICBjbG9uZUNvdW50OiBjbG9uZUNvdW50LFxuICAgICAgc2xpZGVDb3VudDogc2xpZGVDb3VudCxcbiAgICAgIHNsaWRlQ291bnROZXc6IHNsaWRlQ291bnROZXcsXG4gICAgICBpbmRleDogaW5kZXgsXG4gICAgICBpbmRleENhY2hlZDogaW5kZXhDYWNoZWQsXG4gICAgICBkaXNwbGF5SW5kZXg6IGdldEN1cnJlbnRTbGlkZSgpLFxuICAgICAgbmF2Q3VycmVudEluZGV4OiBuYXZDdXJyZW50SW5kZXgsXG4gICAgICBuYXZDdXJyZW50SW5kZXhDYWNoZWQ6IG5hdkN1cnJlbnRJbmRleENhY2hlZCxcbiAgICAgIHBhZ2VzOiBwYWdlcyxcbiAgICAgIHBhZ2VzQ2FjaGVkOiBwYWdlc0NhY2hlZCxcbiAgICAgIHNoZWV0OiBzaGVldCxcbiAgICAgIGlzT246IGlzT24sXG4gICAgICBldmVudDogZSB8fCB7fSxcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB2ZXJzaW9uOiAnMi45LjMnLFxuICAgIGdldEluZm86IGluZm8sXG4gICAgZXZlbnRzOiBldmVudHMsXG4gICAgZ29UbzogZ29UbyxcbiAgICBwbGF5OiBwbGF5LFxuICAgIHBhdXNlOiBwYXVzZSxcbiAgICBpc09uOiBpc09uLFxuICAgIHVwZGF0ZVNsaWRlckhlaWdodDogdXBkYXRlSW5uZXJXcmFwcGVySGVpZ2h0LFxuICAgIHJlZnJlc2g6IGluaXRTbGlkZXJUcmFuc2Zvcm0sXG4gICAgZGVzdHJveTogZGVzdHJveSxcbiAgICByZWJ1aWxkOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0bnMoZXh0ZW5kKG9wdGlvbnMsIG9wdGlvbnNFbGVtZW50cykpO1xuICAgIH1cbiAgfTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHRpZiAoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcblx0XHRtb2R1bGUucGF0aHMgPSBbXTtcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcblx0XHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUubDtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImlkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XG5cdH1cblx0cmV0dXJuIG1vZHVsZTtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9