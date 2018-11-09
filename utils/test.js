var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };
  
  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };
  
  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
  
    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  
  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
  
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };
  
  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
  
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };
  
  var moduleKeywords = ['extended', 'included'];
  
  /**
   * For the parts of this code adapted from http://arcturo.github.com/library/coffeescript/03_classes.html
   * below is the required copyright notice.
   * Copyright (c) 2011 Alexander MacCaw (info@eribium.org)
   * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
   * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
   *
   * @export
   * @class Module
   */
  
  var Module = function () {
    function Module() {
      classCallCheck(this, Module);
    }
  
    createClass(Module, null, [{
      key: 'extends',
  
      // Extend the base object itself like a static method
      value: function _extends$$1(obj) {
        for (var key in obj) {
          if (moduleKeywords.indexOf === -1) {
            this[key] = obj[key];
          }
        }
        obj.extended && obj.extended.apply(this);
        return this;
      }
  
      // Include methods on the object prototype
  
    }, {
      key: 'includes',
      value: function includes(obj) {
        for (var key in obj) {
          if (moduleKeywords.indexOf === -1) {
            this.prototype[key] = obj[key];
          }
        }
        obj.included && obj.included.apply(this);
        return this;
      }
  
      // Add methods on this prototype that point to another method
      // on another object's prototype.
  
    }, {
      key: 'delegate',
      value: function delegate() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
  
        var target = args.pop();
        for (var i in args) {
          var source = args[i];
          this.prototype[source] = target.prototype[source];
        }
      }
  
      // Create an alias for a function
  
    }, {
      key: 'aliasFunction',
      value: function aliasFunction(to, from) {
        var _this = this;
  
        this.prototype[to] = function () {
          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
  
          _this.prototype[from].apply(_this, args);
        };
      }
  
      // Create an alias for a property
  
    }, {
      key: 'aliasProperty',
      value: function aliasProperty(to, from) {
        Object.defineProperty(this.prototype, to, {
          get: function get$$1() {
            return this[from];
          },
          set: function set$$1(val) {
            this[from] = val;
          }
        });
      }
  
      // Execute a function in the context of the object,
      // and pass a reference to the object's prototype.
  
    }, {
      key: 'included',
      value: function included(func) {
        func.call(this, this.prototype);
      }
    }]);
    return Module;
  }();
  
  function noop() {}
  
  /**
   *
   *
   * @export
   * @class Util
   */
  var Util = function () {
    function Util() {
      classCallCheck(this, Util);
    }
  
    createClass(Util, null, [{
      key: "uniqid",
      value: function uniqid() {
        var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 7;
  
        return Math.random().toString(35).substr(2, len);
      }
  
      // Helper function that extends one object with all the properies of other objects
  
    }, {
      key: "extend",
      value: function extend(obj) {
        var dest = obj;
  
        for (var _len = arguments.length, src = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          src[_key - 1] = arguments[_key];
        }
  
        for (var i in src) {
          var copy = src[i];
          for (var prop in copy) {
            if (copy.hasOwnProperty(prop)) {
              dest[prop] = copy[prop];
            }
          }
        }
  
        return dest;
      }
  
      // In order to stay true to the latest spec, RGB values must be clamped between 0 and 255. If we don't do this, weird things happen.
  
    }, {
      key: "clampRGB",
      value: function clampRGB(val) {
        if (val < 0) {
          return 0;
        }
        if (val > 255) {
          return 255;
        }
  
        return val;
      }
    }, {
      key: "copyAttributes",
      value: function copyAttributes(from, to) {
        var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  
        for (var i in from.attributes) {
          var attr = from.attributes[i];
          if (opts.except && opts.except.indexOf(attr.nodeName) !== -1) {
            continue;
          }
          to.setAttribute(attr.nodeName, attr.nodeValue);
        }
      }
  
      // Support for browsers that don't know Uint8Array (such as IE9)
  
    }, {
      key: "dataArray",
      value: function dataArray() {
        var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  
        if (Uint8ClampedArray) {
          return new Uint8ClampedArray(length);
        }
        return new Array(length);
      }
    }]);
    return Util;
  }();
  
  /**
   * Various image analysis methods
   *
   * @export
   * @class Analyze
   */
  var Analyze = function () {
    function Analyze(c) {
      classCallCheck(this, Analyze);
  
      this.c = c;
    }
  
    // @return {Object} Hash of RGB channels and the occurrence of each value
  
    /**
     * Calculates the number of occurrences of each color value throughout the image.
     *
     *
     * @returns {Object} Hash of RGB channels and the occurrences of each value
     * @memberof Analyze
     */
  
  
    createClass(Analyze, [{
      key: "calculateLevels",
      value: function calculateLevels() {
        var levels = {
          r: {},
          g: {},
          b: {}
          // Initialize all values to 0 first so there are no data gaps
        };for (var i = 0; i <= 255; i++) {
          levels.r[i] = 0;
          levels.g[i] = 0;
          levels.b[i] = 0;
        }
  
        // Iterate through each pixel block and increment the level counters
        for (var _i = 0, j = this.c.pixelData.length; _i < j; _i += 4) {
          levels.r[this.c.pixelData[_i]]++;
          levels.g[this.c.pixelData[_i + 1]]++;
          levels.b[this.c.pixelData[_i + 2]]++;
        }
  
        // Normalize all of the numbers by converting them to percentages between
        // 0 and 1.0
        var numPixels = this.c.pixelData.length / 4;
  
        for (var _i2 = 0; _i2 <= 255; _i2++) {
          levels.r[_i2] /= numPixels;
          levels.g[_i2] /= numPixels;
          levels.b[_i2] /= numPixels;
        }
        return levels;
      }
    }]);
    return Analyze;
  }();
  
  /**
   * Event system that can be used to register callbacks that get fired during certain times in the render process.
   *
   * @export
   * @class Event
   */
  var Event = function () {
    function Event() {
      classCallCheck(this, Event);
    }
  
    createClass(Event, null, [{
      key: 'trigger',
  
  
      /**
       * Trigger an event.
       *
       * @static
       * @param { Caman } target Instance of Caman emitting the event.
       * @param { String } type The event type.
       * @param { Object } [data=null] Extra data to send with the event.
       * @memberof Event
       */
      value: function trigger(target, type) {
        var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  
        if (this.events[type] && this.events[type].length) {
          for (var i in this.events[type]) {
            var event = this.events[type][i];
            if (event.target === null || target.id === event.target.id) {
              event.fn.call(target, data);
            }
          }
        }
      }
  
      /**
       * Listen for an event. Optionally bind the listen to a single instance or all instances.
       *
       * @static
       * @overload listen(target, type, fn)
       * Listen for events emitted from a particular Caman instance.
       * @param { Caman } target The instance to listen to.
       * @param { String } type The type of event to listen for.
       * @param { Function } fn The function to call when the event occurs.
       *
       * @overload listen(type, fn)
       * Listen for an event from all Caman instances.
       * @param { String } type The type of event to listen for.
       * @param { Function } fn The function to call when the event occurs.
       * @memberof Event
       */
  
      // All of the supported event types
  
    }, {
      key: 'listen',
      value: function listen(target, type, fn) {
        // Adjust arguments if target is omitted
        if (typeof target === 'string') {
          var _type = target;
          var _fn = type;
  
          target = null;
          type = _type;
  
          fn = _fn;
        }
  
        // Validation
        if (this.types.indexOf(type) === -1) {
          return false;
        }
  
        if (!this.events[type]) {
          this.events[type] = [];
        }
        this.events[type].push({ target: target, fn: fn });
        return true;
      }
    }, {
      key: 'once',
      value: function once(target, type, fn) {
        var _this = this;
        function on() {
          _this.off(target, type, on);
          fn.apply(_this, arguments);
        }
        on.fn = fn;
        this.listen(target, type, on);
      }
    }, {
      key: 'off',
      value: function off(target, type, fn) {
        if (!arguments.length) {
          this.events = Object.create(null);
          return;
        }
        // Adjust arguments if target is omitted
        if (typeof target === 'string') {
          var _type = target;
          var _fn = type;
  
          target = null;
          type = _type;
  
          fn = _fn;
        }
  
        var cbs = this.events[type];
        if (!cbs) {
          return;
        }
  
        if (!fn) {
          this.events[type] = null;
        } else {
          // specific handler
          var cb = void 0;
          var i = cbs.length;
          while (i--) {
            cb = cbs[i];
            if (cb === fn || cb.fn === fn) {
              cbs.splice(i, 1);
              break;
            }
          }
        }
      }
    }]);
    return Event;
  }();
  
  Object.defineProperty(Event, 'events', {
    enumerable: true,
    writable: true,
    value: {}
  });
  Object.defineProperty(Event, 'types', {
    enumerable: true,
    writable: true,
    value: ['processStart', 'processComplete', 'renderStart', 'renderFinished', 'blockStarted', 'blockFinished', '_pixelDataReady']
  });
  
  var Config = {
    // Debug mode enables console logging.
    DEBUG: false,
    // All of the different render operatives
    FILTER_TYPE: {
      Single: 1,
      Kernel: 2,
      LayerDequeue: 3,
      LayerFinished: 4,
      LoadOverlay: 5,
      Plugin: 6
    }
  };
  
  /**
   * Simple console logger class that can be toggled on and off based on Caman.DEBUG
   *
   * @class Logger
   */
  
  var Logger = function Logger() {
    var _this = this;
  
    classCallCheck(this, Logger);
  
    var logLevel = ['log', 'info', 'warn', 'error'];
  
    var _loop = function _loop(i) {
      var name = logLevel[i];
      _this[name] = function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
  
        {
          return;
        }
        try {
          console[name].apply(console, args);
        } catch (e) {
          // We're probably using IE9 or earlier
          console[name](args);
        }
      };
    };
  
    for (var i in logLevel) {
      _loop(i);
    }
    this.debug = this.log;
  };
  
  var Log = new Logger();
  
  /**
   * Stores and registers standalone plugins
   *
   * @export
   * @class Plugin
   */
  var Plugin = function () {
    function Plugin() {
      classCallCheck(this, Plugin);
    }
  
    createClass(Plugin, null, [{
      key: "register",
      value: function register(name, plugin) {
        this.plugins[name] = plugin;
      }
    }, {
      key: "execute",
      value: function execute(context, name, args) {
        this.plugins[name].apply(context, args);
      }
    }]);
    return Plugin;
  }();
  
  Object.defineProperty(Plugin, "plugins", {
    enumerable: true,
    writable: true,
    value: {}
  });
  
  /**
   * Represents a single Pixel in an image.
   *
   * @export
   * @class Pixel
   */
  var Pixel = function () {
    createClass(Pixel, null, [{
      key: 'coordinatesToLocation',
      value: function coordinatesToLocation(x, y, width) {
        return (y * width + x) * 4;
      }
    }, {
      key: 'locationToCoordinates',
      value: function locationToCoordinates(loc, width) {
        var y = Math.floor(loc / (width * 4));
        var x = loc % (width * 4) / 4;
  
        return { x: x, y: y };
      }
    }]);
  
    function Pixel() {
      var r = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var g = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var b = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 255;
      var c = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      classCallCheck(this, Pixel);
  
      this.loc = 0;
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a;
      this.c = c;
    }
  
    createClass(Pixel, [{
      key: 'setContext',
      value: function setContext(c) {
        this.c = c;
      }
  
      // Retrieves the X, Y location of the current pixel. The origin is at the bottom left corner of the image, like a normal coordinate system.
  
    }, {
      key: 'locationXY',
      value: function locationXY() {
        if (!this.c) {
          throw new Error('Requires a CamanJS context');
        }
        var y = this.c.dimensions.height - Math.floor(this.loc / (this.c.dimensions.width * 4));
        var x = this.loc % (this.c.dimensions.width * 4) / 4;
  
        return { x: x, y: y };
      }
    }, {
      key: 'pixelAtLocation',
      value: function pixelAtLocation(loc) {
        if (!this.c) {
          throw new Error('Requires a CamanJS context');
        }
  
        return new Pixel(this.c.pixelData[loc], this.c.pixelData[loc + 1], this.c.pixelData[loc + 2], this.c.pixelData[loc + 3], this.c);
      }
  
      // Returns an RGBA object for a pixel whose location is specified in relation to the current pixel.
  
    }, {
      key: 'getPixelRelative',
      value: function getPixelRelative(horiz, vert) {
        if (!this.c) {
          throw new Error('Requires a CamanJS context');
        }
  
        // We invert the vert_offset in order to make the coordinate system non-inverted. In laymans terms: -1 means down and +1 means up.
        var newLoc = this.loc + this.c.dimensions.width * 4 * (vert * -1) + 4 * horiz;
  
        if (newLoc > this.c.pixelData.length || newLoc < 0) {
          return new Pixel(0, 0, 0, 255, this.c);
        }
  
        return this.pixelAtLocation(newLoc);
      }
  
      // The counterpart to getPixelRelative, this updates the value of a pixel whose location is specified in relation to the current pixel.
  
    }, {
      key: 'getPixel',
  
  
      // Gets an RGBA object for an arbitrary pixel in the canvas specified by absolute X, Y coordinates
      value: function getPixel(x, y) {
        if (!this.c) {
          throw new Error('Requires a CamanJS context');
        }
  
        var loc = this.coordinatesToLocation(x, y, this.width);
        return this.pixelAtLocation(loc);
      }
  
      // Updates the pixel at the given X, Y coordinate
  
    }, {
      key: 'putPixel',
      value: function putPixel(x, y, rgba) {
        if (!this.c) {
          throw new Error('Requires a CamanJS context');
        }
  
        var loc = this.coordinatesToLocation(x, y, this.width);
  
        this.c.pixelData[loc] = rgba.r;
        this.c.pixelData[loc + 1] = rgba.g;
        this.c.pixelData[loc + 2] = rgba.b;
        this.c.pixelData[loc + 3] = rgba.a;
      }
    }, {
      key: 'toString',
      value: function toString() {
        this.toKey();
      }
    }, {
      key: 'toHex',
      value: function toHex() {
        var includeAlpha = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  
        var hex = '#' + this.r.toString(16) + this.g.toString(16) + this.b.toString(16);
  
        if (includeAlpha) {
          hex += this.a.toString(16);
        }
        return hex;
      }
    }], [{
      key: 'putPixelRelative',
      value: function putPixelRelative(horiz, vert, rgba) {
        if (!this.c) {
          throw new Error('Requires a CamanJS context');
        }
  
        var newLoc = this.loc + this.c.dimensions.width * 4 * (vert * -1) + 4 * horiz;
  
        if (newLoc > this.c.pixelData.length || newLoc < 0) {
          return;
        }
  
        this.c.pixelData[newLoc] = rgba.r;
        this.c.pixelData[newLoc + 1] = rgba.g;
        this.c.pixelData[newLoc + 2] = rgba.b;
        this.c.pixelData[newLoc + 3] = rgba.a;
  
        return true;
      }
    }]);
    return Pixel;
  }();
  
  /**
   * Handles all of the various rendering methods in Caman. Most of the image modification happens here. A new Renderer object is created for every render operation.
   *
   * @export
   * @class Renderer
   */
  
  var Renderer = function () {
    function Renderer(c) {
      classCallCheck(this, Renderer);
  
      this.c = c;
      this.renderQueue = [];
      this.modPixelData = null;
    }
    // The number of blocks to split the image into during the render process to simulate concurrency. This also helps the browser manage the (possibly) long running render jobs.
  
  
    createClass(Renderer, [{
      key: 'add',
      value: function add(job) {
        if (!job) {
          return;
        }
        this.renderQueue.push(job);
      }
  
      // Grabs the next operation from the render queue and passes it to Renderer for execution
  
    }, {
      key: 'processNext',
      value: function processNext() {
        // If the queue is empty, fire the finished callback
        if (this.renderQueue.length === 0) {
          Event.trigger(this, 'renderFinished');
          this.finishedFn && this.finishedFn.call(this.c);
          return this;
        }
        this.currentJob = this.renderQueue.shift();
  
        switch (this.currentJob.type) {
          case Config.FILTER_TYPE.LayerDequeue:
            var layer = this.c.canvasQueue.shift();
            this.c.executeLayer(layer);
            this.processNext();
            break;
          case Config.FILTER_TYPE.LayerFinished:
            this.c.applyCurrentLayer();
            this.c.popContext();
            this.processNext();
            break;
          case Config.FILTER_TYPE.LoadOverlay:
            this.loadOverlay(this.currentJob.layer, this.currentJob.src);
            break;
          case Config.FILTER_TYPE.Plugin:
            this.executePlugin();
            break;
          default:
            this.executeFilter();
        }
      }
    }, {
      key: 'execute',
      value: function execute(camanInstance, callback) {
        var _this = this;
  
        this.finishedFn = callback;
        Event.listen(camanInstance, '_pixelDataReady', function () {
          _this.modPixelData = Util.dataArray(_this.c.pixelData.length);
          _this.processNext();
        });
      }
    }, {
      key: 'eachBlock',
      value: function eachBlock(fn) {
        var _this2 = this;
  
        // Prepare all the required render data
        this.blocksDone = 0;
  
        var n = this.c.pixelData.length;
        var blockPixelLength = Math.floor(n / 4 / Renderer.Blocks);
        var blockN = blockPixelLength * 4;
        var lastBlockN = blockN + n / 4 % Renderer.Blocks * 4;
  
        var _loop = function _loop(i) {
          var start = i * blockN;
          var end = start + (i === Renderer.Blocks - 1 ? lastBlockN : blockN);
          setTimeout(function () {
            fn.call(_this2, i, start, end);
          }, 0);
        };
  
        for (var i = 0; i < Renderer.Blocks; i++) {
          _loop(i);
        }
      }
  
      // The core of the image rendering, this function executes the provided filter.
      // NOTE: this does not write the updated pixel data to the canvas. That happens when all filters are finished rendering in order to be as fast as possible.
  
    }, {
      key: 'executeFilter',
      value: function executeFilter() {
        Event.trigger(this.c, 'processStart', this.currentJob);
  
        if (this.currentJob.type === Config.FILTER_TYPE.Single) {
          this.eachBlock(this.renderBlock);
        } else {
          this.eachBlock(this.renderKernel);
        }
      }
  
      // Executes a standalone plugin
  
    }, {
      key: 'executePlugin',
      value: function executePlugin() {
        Log.debug('Executing plugin ' + this.currentJob.plugin);
        Plugin.execute(this.c, this.currentJob.plugin, this.currentJob.args);
        Log.debug('Plugin ' + this.currentJob.plugin + ' finished!');
  
        this.processNext();
      }
  
      // Renders a single block of the canvas with the current filter function
  
    }, {
      key: 'renderBlock',
      value: function renderBlock(bnum, start, end) {
        Log.debug('Block #' + bnum + ' - Filter: ' + this.currentJob.name + ', Start: ' + start + ', End: ' + end);
        Event.trigger(this.c, 'blockStarted', {
          blockNum: bnum,
          totalBlocks: Renderer.Blocks,
          startPixel: start,
          endPixel: end
        });
  
        var pixel = new Pixel();
        pixel.setContext(this.c);
  
        for (var i = start; i < end; i += 4) {
          pixel.loc = i;
  
          pixel.r = this.c.pixelData[i];
          pixel.g = this.c.pixelData[i + 1];
          pixel.b = this.c.pixelData[i + 2];
          pixel.a = this.c.pixelData[i + 3];
  
          this.currentJob.processFn(pixel);
  
          this.c.pixelData[i] = Util.clampRGB(pixel.r);
          this.c.pixelData[i + 1] = Util.clampRGB(pixel.g);
          this.c.pixelData[i + 2] = Util.clampRGB(pixel.b);
          this.c.pixelData[i + 3] = Util.clampRGB(pixel.a);
        }
  
        this.blockFinished(bnum);
      }
  
      // Applies an image kernel to the canvas
  
    }, {
      key: 'renderKernel',
      value: function renderKernel(bnum, start, end) {
        var bias = this.currentJob.bias;
        var divisor = this.currentJob.divisor;
        var n = this.c.pixelData.length;
  
        var adjust = this.currentJob.adjust;
        var adjustSize = Math.sqrt(adjust.length);
  
        var kernel = [];
  
        Log.debug('Rendering kernel - Filter: ' + this.currentJob.name);
  
        start = Math.max(start, this.c.dimensions.width * 4 * ((adjustSize - 1) / 2));
        end = Math.min(end, n - this.c.dimensions.width * 4 * ((adjustSize - 1) / 2));
  
        var builder = (adjustSize - 1) / 2;
  
        var pixel = new Pixel();
        pixel.setContext(this.c);
  
        for (var i = start; i < end; i += 4) {
          pixel.loc = i;
          var builderIndex = 0;
  
          for (var j = -builder; j <= builder; j++) {
            for (var k = builder; k >= -builder; k--) {
              var p = pixel.getPixelRelative(j, k);
              kernel[builderIndex * 3] = p.r;
              kernel[builderIndex * 3 + 1] = p.g;
              kernel[builderIndex * 3 + 2] = p.b;
              builderIndex++;
            }
          }
  
          var res = this.processKernel(adjust, kernel, divisor, bias);
  
          this.modPixelData[i] = Util.clampRGB(res.r);
          this.modPixelData[i + 1] = Util.clampRGB(res.g);
          this.modPixelData[i + 2] = Util.clampRGB(res.b);
          this.modPixelData[i + 3] = this.c.pixelData[i + 3];
        }
  
        this.blockFinished(bnum);
      }
  
      // Called when a single block is finished rendering. Once all blocks are done, we signal that this filter is finished rendering and continue to the next step.
  
    }, {
      key: 'blockFinished',
      value: function blockFinished(bnum) {
        if (bnum >= 0) {
          Log.debug('Block #' + bnum + ' finished! Filter: ' + this.currentJob.name);
        }
        this.blocksDone++;
  
        Event.trigger(this.c, 'blockFinished', {
          blockNum: bnum,
          blocksFinished: this.blocksDone,
          totalBlocks: Renderer.Blocks
        });
  
        if (this.blocksDone === Renderer.Blocks) {
          if (this.currentJob.type === Config.FILTER_TYPE.Kernel) {
            for (var i = 0; i < this.c.pixelData.length; i++) {
              this.c.pixelData[i] = this.modPixelData[i];
            }
          }
  
          if (bnum >= 0) {
            Log.debug('Filter ' + this.currentJob.name + ' finished!');
          }
          Event.trigger(this.c, 'processComplete', this.currentJob);
          this.processNext();
        }
      }
  
      // The "filter function" for kernel adjustments.
  
    }, {
      key: 'processKernel',
      value: function processKernel(adjust, kernel, divisor, bias) {
        var val = {
          r: 0,
          g: 0,
          b: 0
        };
        for (var i = 0; i < adjust.length; i++) {
          val.r += adjust[i] * kernel[i * 3];
          val.g += adjust[i] * kernel[i * 3 + 1];
          val.b += adjust[i] * kernel[i * 3 + 2];
        }
  
        val.r = val.r / divisor + bias;
        val.g = val.g / divisor + bias;
        val.b = val.b / divisor + bias;
        return val;
      }
    }]);
    return Renderer;
  }();
  
  Object.defineProperty(Renderer, 'Blocks', {
    enumerable: true,
    writable: true,
    value: 4
  });
  
  /**
   * Built-in layer blenders. Many of these mimic Photoshop blend modes.
   *
   * @export
   * @class Blender
   */
  var Blender = function () {
    function Blender() {
      classCallCheck(this, Blender);
    }
  
    createClass(Blender, null, [{
      key: "register",
  
      /**
       * Registers a blender. Can be used to add your own blenders outside of the core library, if needed.
       *
       * @static
       * @param { String } name Name of the blender.
       * @param { Function } func The blender function.
       * @memberof Blender
       */
      value: function register(name, func) {
        this.blenders[name] = func;
      }
  
      /**
       * Executes a blender to combine a layer with its parent.
       *
       * @static
       * @param { String } name Name of the blending function to invoke.
       * @param { Object } rgbaLayer RGBA object of the current pixel from the layer.
       * @param { Object } rgbaParent RGBA object of the corresponding pixel in the parent layer.
       * @returns { Object } RGBA object representing the blended pixel.
       * @memberof Blender
       */
  
    }, {
      key: "execute",
      value: function execute(name, rgbaLayer, rgbaParent) {
        return this.blenders[name](rgbaLayer, rgbaParent);
      }
    }]);
    return Blender;
  }();
  
  Object.defineProperty(Blender, "blenders", {
    enumerable: true,
    writable: true,
    value: {}
  });
  
  /**
   * The entire layering system for Caman resides in this file. Layers get their own canvasLayer object which is created when newLayer() is called. For extensive information regarding the specifics of how the layering system works, there is an in-depth blog post on this very topic.
   * Instead of copying the entirety of that post, I'll simply point you towards the [blog link](http://blog.meltingice.net/programming/implementing-layers-camanjs).
   * However, the gist of the layering system is that, for each layer, it creates a new canvas element and then either copies the parent layer's data or applies a solid color to the new layer. After some (optional) effects are applied, the layer is blended back into the parent canvas layer using one of many different blending algorithms.
   * You can also load an image (local or remote, with a proxy) into a canvas layer, which is useful if you want to add textures to an image.
   *
   * @export
   * @class Layer
   */
  
  var Layer = function () {
    function Layer(c) {
      classCallCheck(this, Layer);
  
      // Compatibility
      this.c = c;
      this.filter = c;
  
      this.options = {
        blendingMode: 'normal',
        opacity: 1.0
  
        // Each layer gets its own unique ID
      };this.layerID = Util.uniqid();
  
      // Create the canvas for this layer
      // this.canvas = document.createElement('canvas')
  
      // this.canvas.width = this.c.dimensions.width
      // this.canvas.height = this.c.dimensions.height
  
      // this.context = this.canvas.getContext('2d')
      // this.context.createImageData(this.canvas.width, this.canvas.height)
      // this.imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
      // this.pixelData = this.imageData.data
  
      this.width = this.c.dimensions.width;
      this.height = this.c.dimensions.height;
      this.pixelData = new Uint8ClampedArray(this.c.pixelData.length);
    }
  
    // If you want to create nested layers
  
  
    createClass(Layer, [{
      key: 'newLayer',
      value: function newLayer(cb) {
        this.c.newLayer(cb);
      }
  
      // Sets the blending mode of this layer. The mode is the name of a blender function.
  
    }, {
      key: 'setBlendingMode',
      value: function setBlendingMode(mode) {
        this.options.blendingMode = mode;
        return this;
      }
  
      // Sets the opacity of this layer. This affects how much of this layer is applied to the parent layer at render time.
  
    }, {
      key: 'opacity',
      value: function opacity(_opacity) {
        this.options.opacity = _opacity / 100;
        return this;
      }
  
      // Copies the contents of the parent layer to this layer
  
    }, {
      key: 'copyParent',
      value: function copyParent() {
        var parentData = this.pixelData;
        for (var i = 0; i < this.c.pixelData.length; i += 4) {
          this.pixelData[i] = parentData[i];
          this.pixelData[i + 1] = parentData[i + 1];
          this.pixelData[i + 2] = parentData[i + 2];
          this.pixelData[i + 3] = parentData[i + 3];
        }
        return this;
      }
  
      // Fills this layer width a single color
  
    }, {
      key: 'fillColor',
      value: function fillColor() {
        this.c.fillColor.apply(this.c, arguments);
      }
  
      // Takes the contents of this layer and applies them to the parent layer at render time. This should never be called explicitly by the user.
  
    }, {
      key: 'applyToParent',
      value: function applyToParent() {
        var parentData = this.c.pixelStack[this.c.pixelStack.length - 1];
        var layerData = this.c.pixelData;
  
        for (var i = 0; i < layerData.length; i += 4) {
          var rgbaParent = {
            r: parentData[i],
            g: parentData[i + 1],
            b: parentData[i + 2],
            a: parentData[i + 3]
          };
          var rgbaLayer = {
            r: layerData[i],
            g: layerData[i + 1],
            b: layerData[i + 2],
            a: layerData[i + 3]
          };
  
          var result = Blender.execute(this.options.blendingMode, rgbaLayer, rgbaParent);
          result.r = Util.clampRGB(result.r);
          result.g = Util.clampRGB(result.g);
          result.b = Util.clampRGB(result.b);
          if (!result.a) {
            result.a = rgbaLayer.a;
          }
  
          parentData[i] = rgbaParent.r - (rgbaParent.r - result.r) * (this.options.opacity * (result.a / 255));
          parentData[i + 1] = rgbaParent.g - (rgbaParent.g - result.g) * (this.options.opacity * (result.a / 255));
          parentData[i + 2] = rgbaParent.b - (rgbaParent.b - result.b) * (this.options.opacity * (result.a / 255));
        }
      }
    }]);
    return Layer;
  }();
  
  /**
   * Here it begins. Caman is defined.
   * There are many different initialization for Caman, which are described on the [Guides](http://camanjs.com/guides).
   * Initialization is tricky because we need to make sure everything we need is actually fully loaded in the DOM before proceeding. When initialized on an image, we need to make sure that the image is done loading before converting it to a canvas element and writing the pixel data. If we do this prematurely, the browser will throw a DOM Error, and chaos will ensue. In the event that we initialize Caman on a canvas element while specifying an image URL, we need to create a new image element, load the image, then continue with initialization.
   * The main goal for Caman was simplicity, so all of this is handled transparently to the end-user.
   *
   * @export
   * @class Caman
   * @extends {Module}
   */
  
  var Caman = function (_Module) {
    inherits(Caman, _Module);
    createClass(Caman, null, [{
      key: 'toString',
  
  
      // Custom toString()
      // @return [String] Version and release information.
  
      // The current version.
      value: function toString() {
        return 'Version ' + Caman.version.release + ', Released ' + Caman.version.date;
      }
  
      /**
       * The Caman function.
       * @param { String } canvasId The canvas-id of the canvas component.
       * @param { Number } width The width of the canvas component.
       * @param { Number } height The height of the canvas component.
       * @return [Caman] Initialized Caman instance.
       * @memberof Caman
       */
  
  
      // @property [Boolean] Allow reverting the canvas?
      // If your JS process is running out of memory, disabling
      // this could help drastically.
  
    }]);
  
    function Caman() {
      var _ret;
  
      classCallCheck(this, Caman);
  
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
  
      // args[0]: canvasId
      // args[1]: width,
      // args[2]: height
      // args[3]: callback function
      if (args.length === 0) {
        throw new Error('Invalid arguments');
      }
  
      // const id = args[0]
      var _this2 = possibleConstructorReturn(this, (Caman.__proto__ || Object.getPrototypeOf(Caman)).call(this));
  
      var callback = args[3];
      if (typeof callback !== 'function') {
        callback = noop;
      }
  
      // Every instance gets a unique ID.
      _this2.id = Util.uniqid();
      _this2.initializedPixelData = _this2.originalPixelData = null;
  
      _this2.pixelStack = []; // Stores the pixel layers
      _this2.layerStack = []; // Stores all of the layers waiting to be rendered
      _this2.canvasQueue = []; // Stores all of the canvases to be processed
      _this2.currentLayer = null;
  
      _this2.analyze = new Analyze(_this2);
      _this2.renderer = new Renderer(_this2);
  
      // make sure you do everything in onReady callback
      _this2.parseArguments(args);
      _this2.initCanvas();
  
      return _ret = _this2, possibleConstructorReturn(_this2, _ret);
    }
  
    /**
     * Parses the arguments given to the Caman function, and sets the appropriate properties on this instance.
     *
     * @param { Array } args Array of arguments passed to Caman.
     * @memberof Caman
     */
  
  
    createClass(Caman, [{
      key: 'parseArguments',
      value: function parseArguments(args) {
        // args[0]: canvasId
        // args[1]: width,
        // args[2]: height
        // args[3]: callback function
        if (args.length === 0) {
          throw new Error('Invalid arguments given');
        }
  
        // First argument is always our canvas/image
        if (typeof args[0] !== 'string') {
          throw new Error('You must pass the canvas-id as the first argument.');
        }
        this.canvas = args[0];
        if (typeof args[1] !== 'number' || typeof args[2] !== 'number') {
          throw new Error('You must pass the width and height of the canvas component.');
        }
        this.width = args[1];
        this.height = args[2];
        this.callback = typeof args[3] === 'function' ? args[3] : noop;
      }
  
      // Initialization function for browser and canvas objects
  
    }, {
      key: 'initCanvas',
      value: function initCanvas() {
        this.context = wx.createCanvasContext(this.canvas);
        this.finishInit();
      }
  
      /**
       * Final step of initialization. We finish setting up our canvas element, and we draw the image to the canvas (if applicable).
       *
       * @memberof Caman
       */
  
    }, {
      key: 'finishInit',
      value: function finishInit() {
        if (!this.context) {
          this.context = wx.createCanvasContext(this.canvas);
        }
  
        this.originalWidth = this.preScaledWidth = this.width;
        this.originalHeight = this.preScaledHeight = this.height;
  
        var _this = this;
        wx.canvasGetImageData({
          canvasId: _this.canvas,
          x: 0,
          y: 0,
          width: _this.width,
          height: _this.height,
          success: function success(res) {
            _this.pixelData = res.data;
            Event.trigger(_this, '_pixelDataReady');
            if (Caman.allowRevert) {
              _this.initializedPixelData = Util.dataArray(_this.pixelData.length);
              _this.originalPixelData = Util.dataArray(_this.pixelData.length);
  
              for (var i = 0; i < _this.pixelData.length; i++) {
                var pixel = _this.pixelData[i];
                _this.initializedPixelData[i] = pixel;
                _this.originalPixelData[i] = pixel;
              }
            }
          }
        });
  
        this.dimensions = {
          width: this.width,
          height: this.height
        };
  
        this.callback(this);
  
        // Reset the callback so re-initialization doesn't trigger it again.
        this.callback = noop;
      }
  
      /**
       * Reset the canvas pixels to the original state at initialization.
       *
       * @memberof Caman
       */
  
    }, {
      key: 'resetOriginalPixelData',
      value: function resetOriginalPixelData() {
        if (!Caman.allowRevert) {
          throw new Error('Revert disabled');
        }
  
        this.originalPixelData = Util.dataArray(this.pixelData.length);
        for (var i = 0; i < this.pixelData.length; i++) {
          var pixel = this.pixelData[i];
          this.originalPixelData[i] = pixel;
        }
      }
  
      /**
       * Begins the rendering process. This will execute all of the filter functions called either since initialization or the previous render.
       *
       * @param { Function } [callback=noop] Function to call when rendering is finished.
       * @memberof Caman
       */
  
    }, {
      key: 'render',
      value: function render() {
        var _this3 = this;
  
        var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;
  
        Event.trigger(this, 'renderStart');
        this.renderer.execute(this, function () {
          var _this = _this3;
          wx.canvasPutImageData({
            canvasId: _this.canvas,
            data: _this.pixelData,
            x: 0,
            y: 0,
            width: _this.width,
            height: _this.height,
            success: function success() {
              callback.call(_this);
            }
          });
        });
      }
  
      /**
       * Completely resets the canvas back to it's original state.
       * Any size adjustments will also be reset.
       *
       * @memberof Caman
       */
  
    }, {
      key: 'reset',
      value: function reset() {
        for (var i = 0; i < this.initializedPixelData.length; i++) {
          var pixel = this.initializedPixelData[i];
          this.pixelData[i] = pixel;
        }
        var _this = this;
        wx.canvasPutImageData({
          canvasId: _this.canvas,
          data: this.pixelData,
          x: 0,
          y: 0,
          width: _this.width,
          height: _this.height
        });
      }
  
      /**
       * Pushes the filter callback that modifies the RGBA object into the
      # render queue.
       *
       * @param { String } name Name of the filter function.
       * @param { Function } processFn  The Filter function.
       * @returns { Caman }
       * @memberof Caman
       */
  
    }, {
      key: 'process',
      value: function process(name, processFn) {
        this.renderer.add({
          type: Config.FILTER_TYPE.Single,
          name: name,
          processFn: processFn
        });
        return this;
      }
  
      /**
       * Pushes the kernel into the render queue.
       *
       * @param { String } name The name of the kernel.
       * @param { Array } adjust The convolution kernel represented as a 1D array.
       * @param { Number } [divisor=null] The divisor for the convolution.
       * @param {number} [bias=0] The bias for the convolution.
       * @returns { Caman }
       * @memberof Caman
       */
  
    }, {
      key: 'processKernel',
      value: function processKernel(name, adjust) {
        var divisor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var bias = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  
        if (!divisor) {
          divisor = 0;
          for (var i = 0; i <= adjust.length; i++) {
            divisor += adjust[i];
          }
        }
  
        this.renderer.add({
          type: Config.FILTER_TYPE.Kernel,
          name: name,
          adjust: adjust,
          divisor: divisor,
          bias: bias
        });
  
        return this;
      }
  
      /**
       * Adds a standalone plugin into the render queue.
       *
       * @param { String } plugin Name of the plugin.
       * @param { Array } args Array of arguments to pass to the plugin.
       * @returns { Caman }
       * @memberof Caman
       */
  
    }, {
      key: 'processPlugin',
      value: function processPlugin(plugin, args) {
        this.renderer.add({
          type: Config.FILTER_TYPE.Plugin,
          plugin: plugin,
          args: args
        });
  
        return this;
      }
  
      /**
       * Pushes a new layer operation into the render queue and calls the layer
      # callback.
       *
       * @param { Function } callback  Function that is executed within the context of the layer.
       * All filter and adjustment functions for the layer will be executed inside of this function.
       * @returns { Caman }
       * @memberof Caman
       */
  
    }, {
      key: 'newLayer',
      value: function newLayer(callback) {
        var _this4 = this;
  
        Event.listen(this, '_pixelDataReady', function () {
          var layer = new Layer(_this4);
          _this4.canvasQueue.push(layer);
          _this4.renderer.add({
            type: Config.FILTER_TYPE.LayerDequeue
          });
  
          callback.call(layer);
  
          _this4.renderer.add({
            type: Config.FILTER_TYPE.LayerFinished
          });
        });
        return this;
      }
  
      /**
       * Pushes the layer context and moves to the next operation.
       *
       * @param { Layer } layer The layer to execute.
       * @memberof Caman
       */
  
    }, {
      key: 'executeLayer',
      value: function executeLayer(layer) {
        this.pushContext(layer);
      }
  
      /**
       * Set all of the relevant data to the new layer.
       *
       * @param { Layer } layer The layer whose context we want to switch to.
       * @memberof Caman
       */
  
    }, {
      key: 'pushContext',
      value: function pushContext(layer) {
        this.layerStack.push(this.currentLayer);
        this.pixelStack.push(this.pixelData);
        this.currentLayer = layer;
        this.pixelData = layer.pixelData;
      }
  
      // Restore the previous layer context.
  
    }, {
      key: 'popContext',
      value: function popContext() {
        this.pixelData = this.pixelStack.pop();
        this.currentLayer = this.layerStack.pop();
      }
  
      // Applies the current layer to its parent layer.
  
    }, {
      key: 'applyCurrentLayer',
      value: function applyCurrentLayer() {
        this.currentLayer.applyToParent();
      }
    }]);
    return Caman;
  }(Module);
  
  Object.defineProperty(Caman, 'version', {
    enumerable: true,
    writable: true,
    value: {
      release: '1.0.0',
      date: '6/08/2018' }
  });
  Object.defineProperty(Caman, 'allowRevert', {
    enumerable: true,
    writable: true,
    value: true
  });
  
  /**
   * Responsible for registering and storing all of the filters.
   *
   * @export
   * @class Filter
   */
  
  var Filter = function () {
    function Filter() {
      classCallCheck(this, Filter);
    }
  
    createClass(Filter, null, [{
      key: 'register',
  
      /**
       * Registers a filter function.
       *
       * @static
       * @param { String } name The name of the filter.
       * @param { Function } filterFunc The filter function.
       * @memberof Filter
       */
      value: function register(name, filterFunc) {
        Caman.prototype[name] = filterFunc;
      }
    }]);
    return Filter;
  }();
  
  /**
   *
   *
   * @export
   * @param {*} Blender
   */
  function registerBlender(Blender) {
    // Directly apply the child layer's pixels to the parent layer with no special changes
    Blender.register('normal', function (rgbaLayer, rgbaParent) {
      return {
        r: rgbaLayer.r,
        g: rgbaLayer.g,
        b: rgbaLayer.b
      };
    });
  
    // Apply the child to the parent by multiplying the color values. This generally creates contrast.
    Blender.register('multiply', function (rgbaLayer, rgbaParent) {
      return {
        r: rgbaLayer.r * rgbaParent.r / 255,
        g: rgbaLayer.g * rgbaParent.g / 255,
        b: rgbaLayer.b * rgbaParent.b / 255
      };
    });
  
    Blender.register('screen', function (rgbaLayer, rgbaParent) {
      return {
        r: 255 - (255 - rgbaLayer.r) * (255 - rgbaParent.r) / 255,
        g: 255 - (255 - rgbaLayer.g) * (255 - rgbaParent.g) / 255,
        b: 255 - (255 - rgbaLayer.b) * (255 - rgbaParent.b) / 255
      };
    });
  
    Blender.register('overlay', function (rgbaLayer, rgbaParent) {
      var result = {};
      result.r = rgbaParent.r > 128 ? 255 - 2 * (255 - rgbaLayer.r) * (255 - rgbaParent.r) / 255 : rgbaParent.r * rgbaLayer.r * 2 / 255;
      result.g = rgbaParent.g > 128 ? 255 - 2 * (255 - rgbaLayer.g) * (255 - rgbaParent.g) / 255 : rgbaParent.g * rgbaLayer.g * 2 / 255;
      result.b = rgbaParent.b > 128 ? 255 - 2 * (255 - rgbaLayer.b) * (255 - rgbaParent.b) / 255 : rgbaParent.b * rgbaLayer.b * 2 / 255;
  
      return result;
    });
  
    Blender.register('difference', function (rgbaLayer, rgbaParent) {
      return {
        r: rgbaLayer.r - rgbaParent.r,
        g: rgbaLayer.g - rgbaParent.g,
        b: rgbaLayer.b - rgbaParent.b
      };
    });
  
    Blender.register('addition', function (rgbaLayer, rgbaParent) {
      return {
        r: rgbaParent.r + rgbaLayer.r,
        g: rgbaParent.g + rgbaLayer.g,
        b: rgbaParent.b + rgbaLayer.b
      };
    });
  
    Blender.register('exclusion', function (rgbaLayer, rgbaParent) {
      return {
        r: 128 - 2 * (rgbaParent.r - 128) * (rgbaLayer.r - 128) / 255,
        g: 128 - 2 * (rgbaParent.g - 128) * (rgbaLayer.g - 128) / 255,
        b: 128 - 2 * (rgbaParent.b - 128) * (rgbaLayer.b - 128) / 255
      };
    });
  
    Blender.register('softLight', function (rgbaLayer, rgbaParent) {
      var result = {};
  
      result.r = rgbaParent.r > 128 ? 255 - (255 - rgbaParent.r) * (255 - (rgbaLayer.r - 128)) / 255 : rgbaParent.r * (rgbaLayer.r + 128) / 255;
  
      result.g = rgbaParent.g > 128 ? 255 - (255 - rgbaParent.g) * (255 - (rgbaLayer.g - 128)) / 255 : rgbaParent.g * (rgbaLayer.g + 128) / 255;
  
      result.b = rgbaParent.b > 128 ? 255 - (255 - rgbaParent.b) * (255 - (rgbaLayer.b - 128)) / 255 : rgbaParent.b * (rgbaLayer.b + 128) / 255;
  
      return result;
    });
  
    Blender.register('lighten', function (rgbaLayer, rgbaParent) {
      return {
        r: rgbaParent.r > rgbaLayer.r ? rgbaParent.r : rgbaLayer.r,
        g: rgbaParent.g > rgbaLayer.g ? rgbaParent.g : rgbaLayer.g,
        b: rgbaParent.b > rgbaLayer.b ? rgbaParent.b : rgbaLayer.b
      };
    });
  
    Blender.register('darken', function (rgbaLayer, rgbaParent) {
      return {
        r: rgbaParent.r > rgbaLayer.r ? rgbaLayer.r : rgbaParent.r,
        g: rgbaParent.g > rgbaLayer.g ? rgbaLayer.g : rgbaParent.g,
        b: rgbaParent.b > rgbaLayer.b ? rgbaLayer.b : rgbaParent.b
      };
    });
  }
  
  /**
   * Tons of color conversion utility functions.
   *
   * @export
   * @class Convert
   */
  var Convert = function () {
    function Convert() {
      classCallCheck(this, Convert);
    }
  
    createClass(Convert, null, [{
      key: 'hexToRGB',
  
      /**
       * Converts the hex representation of a color to RGB values.
       * Hex value can optionally start with the hash (#).
       *
       * @static
       * @param { String } hex The colors hex value
       * @returns { Object } The RGB representation
       * @memberof Convert
       */
      value: function hexToRGB(hex) {
        if (hex.charAt(0) === '#') {
          hex = hex.substr(1);
        }
        var r = parseInt(hex.substr(0, 2), 16);
        var g = parseInt(hex.substr(2, 2), 16);
        var b = parseInt(hex.substr(4, 2), 16);
        return { r: r, g: g, b: b };
      }
  
      /**
       * Converts an RGB color to HSL.
       * Assumes r, g, and b are in the set [0, 255] and
       * returns h, s, and l in the set [0, 1].
       *
       * @static
       * @param { Number } r Red channel
       * @param { Number } g Green channel
       * @param { Number } b Blue channel
       * @return { Array } The HSL representation
       * @memberof Convert
       */
  
    }, {
      key: 'rgbToHSL',
      value: function rgbToHSL(r, g, b) {
        if ((typeof r === 'undefined' ? 'undefined' : _typeof(r)) === 'object') {
          g = r.g;
          b = r.b;
          r = r.r;
        }
  
        r /= 255;
        g /= 255;
        b /= 255;
  
        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);
        var l = (max + min) / 2;
        var h = void 0,
            s = void 0;
        if (max === min) {
          h = s = 0;
        } else {
          var d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  
          if (max === r) {
            h = (g - b) / d + g < b ? 6 : 0;
          } else if (max === g) {
            h = (b - r) / d + 2;
          } else if (max === b) {
            h = (r - g) / d + 4;
          }
  
          h /= 6;
        }
        return { h: h, s: s, l: l };
      }
  
      /**
       * onverts an HSL color value to RGB. Conversion formula adapted from http://en.wikipedia.org/wiki/HSL_color_space.
       * Assumes h, s, and l are contained in the set [0, 1] and returns r, g, and b in the set [0, 255].
       *
       * @static
       * @param { Number } h The hue
       * @param { Number } s The saturation
       * @param { Number } l The lightness
       * @returns { Object } The RGB representation
       * @memberof Convert
       */
  
    }, {
      key: 'hslToRGB',
      value: function hslToRGB(h, s, l) {
        var r = void 0,
            g = void 0,
            b = void 0,
            p = void 0,
            q = void 0;
        if ((typeof h === 'undefined' ? 'undefined' : _typeof(h)) === 'object') {
          s = h.s;
          l = h.l;
          h = h.h;
        }
        if (s === 0) {
          r = g = b = l;
        } else {
          q = l < 0.5 ? l * (1 + s) : l + s - l * s;
          p = 2 * l - q;
  
          r = this.hueToRGB(p, q, h + 1 / 3);
          g = this.hueToRGB(p, q, h);
          b = this.hueToRGB(p, q, h - 1 / 3);
        }
        return {
          r: r * 255,
          g: g * 255,
          b: b * 255
        };
      }
  
      /**
       * Converts from the hue color space back to RGB.
       *
       * @static
       * @param { Number } p
       * @param { Number } q
       * @param { Number } t
       * @returns { Number } RGB value
       * @memberof Convert
       */
  
    }, {
      key: 'hueToRGB',
      value: function hueToRGB(p, q, t) {
        if (t < 0) {
          t += 1;
        }
        if (t > 1) {
          t -= 1;
        }
        if (t < 1 / 6) {
          return p + (q - p) * 6 * t;
        }
        if (t < 1 / 2) {
          return q;
        }
        if (t < 2 / 3) {
          return p + (q - p) * (2 / 3 - t) * 6;
        }
        return p;
      }
  
      /**
       * Converts an RGB color value to HSV. Conversion formula adapted from {http://en.wikipedia.org/wiki/HSV_color_space}.
       * Assumes r, g, and b are contained in the set [0, 255] and returns h, s, and v in the set [0, 1].
       *
       * @static
       * @param {*} r The red color value
       * @param {*} g The green color value
       * @param {*} b The blue color value
       * @returns { Object } The HSV representation
       * @memberof Convert
       */
  
    }, {
      key: 'rgbToHSV',
      value: function rgbToHSV(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
  
        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);
        var v = max;
        var d = max - min;
  
        var s = max === 0 ? 0 : d / max;
        var h = void 0;
        if (max === min) {
          h = 0;
        } else {
          if (max === r) {
            h = (g - b) / d + g < b ? 6 : 0;
          } else if (max === g) {
            h = (b - r) / d + 2;
          } else if (max === b) {
            h = (r - g) / d + 4;
          }
          h /= 6;
        }
  
        return { h: h, s: s, v: v };
      }
  
      /**
       * Converts an HSV color value to RGB. Conversion formula adapted from http://en.wikipedia.org/wiki/HSV_color_space.
       * Assumes h, s, and v are contained in the set [0, 1] and returns r, g, and b in the set [0, 255].
       *
       * @static
       * @param { Number } h The hue
       * @param { Number } s The saturation
       * @param { Number } v The value
       * @returns { Object } The RGB representation
       * @memberof Convert
       */
  
    }, {
      key: 'hsvToRGB',
      value: function hsvToRGB(h, s, v) {
        var i = Math.floor(h * 6);
        var f = h * 6 - i;
        var p = v * (1 - s);
        var q = v * (1 - f * s);
        var t = v * (1 - (1 - f) * s);
  
        var r = void 0,
            g = void 0,
            b = void 0;
        switch (i % 6) {
          case 0:
            r = v;
            g = t;
            b = p;
            break;
          case 1:
            r = q;
            g = v;
            b = p;
            break;
          case 2:
            r = p;
            g = v;
            b = t;
            break;
          case 3:
            r = p;
            g = q;
            b = v;
            break;
          case 4:
            r = t;
            g = p;
            b = v;
            break;
          case 5:
            r = v;
            g = p;
            b = q;
            break;
        }
  
        return {
          r: Math.floor(r * 255),
          g: Math.floor(g * 255),
          b: Math.floor(b * 255)
        };
      }
  
      /**
       * Converts a RGB color value to the XYZ color space. Formulas are based on http://en.wikipedia.org/wiki/SRGB assuming that RGB values are sRGB.
       * Assumes r, g, and b are contained in the set [0, 255] and returns x, y, and z.
       *
       * @static
       * @param { Number } r The red color value
       * @param { Number } g The green color value
       * @param { Number } b The blue color value
       * @returns { Object } The XYZ representation
       * @memberof Convert
       */
  
    }, {
      key: 'rgbToXYZ',
      value: function rgbToXYZ(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
  
        if (r > 0.04045) {
          r = Math.pow((r + 0.055) / 1.055, 2.4);
        } else {
          r /= 12.92;
        }
  
        if (g > 0.04045) {
          g = Math.pow((g + 0.055) / 1.055, 2.4);
        } else {
          g /= 12.92;
        }
  
        if (b > 0.04045) {
          b = Math.pow((b + 0.055) / 1.055, 2.4);
        } else {
          b /= 12.92;
        }
  
        var x = r * 0.4124 + g * 0.3576 + b * 0.1805;
        var y = r * 0.2126 + g * 0.7152 + b * 0.0722;
        var z = r * 0.0193 + g * 0.1192 + b * 0.9505;
  
        return {
          x: x * 100,
          y: y * 100,
          z: z * 100
        };
      }
  
      /**
       * Converts a XYZ color value to the sRGB color space. Formulas are based on http://en.wikipedia.org/wiki/SRGB and the resulting RGB value will be in the sRGB color space.
       * Assumes x, y and z values are whatever they are and returns r, g and b in the set [0, 255].
       *
       * @static
       * @param { Number } x The X value
       * @param { Number } y The Y value
       * @param { Number } z The Z value
       * @returns { Object } The RGB representation
       * @memberof Convert
       */
  
    }, {
      key: 'xyzToRGB',
      value: function xyzToRGB(x, y, z) {
        x /= 100;
        y /= 100;
        z /= 100;
  
        var r = 3.2406 * x + -1.5372 * y + -0.4986 * z;
        var g = -0.9689 * x + 1.8758 * y + 0.0415 * z;
        var b = 0.0557 * x + -0.2040 * y + 1.0570 * z;
  
        if (r > 0.0031308) {
          r = 1.055 * Math.pow(r, 0.4166666667) - 0.055;
        } else {
          r *= 12.92;
        }
  
        if (g > 0.0031308) {
          g = 1.055 * Math.pow(g, 0.4166666667) - 0.055;
        } else {
          g *= 12.92;
        }
  
        if (b > 0.0031308) {
          b = 1.055 * Math.pow(b, 0.4166666667) - 0.055;
        } else {
          b *= 12.92;
        }
  
        return {
          r: r * 255,
          g: g * 255,
          b: b * 255
        };
      }
  
      /**
       * Converts a XYZ color value to the CIELAB color space. Formulas are based on http://en.wikipedia.org/wiki/Lab_color_space The reference white point used in the conversion is D65.
       * Assumes x, y and z values are whatever they are and returns L*, a* and b* values
       *
       * @static
       * @param { Number } x The X value
       * @param { Number } y The Y value
       * @param { Number } z The Z value
       * @returns { Object } The Lab representation
       * @memberof Convert
       */
  
    }, {
      key: 'xyzToLab',
      value: function xyzToLab(x, y, z) {
        if ((typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object') {
          y = x.y;
          z = x.z;
          x = x.x;
        }
  
        var whiteX = 95.047;
        var whiteY = 100.0;
        var whiteZ = 108.883;
  
        x /= whiteX;
        y /= whiteY;
        z /= whiteZ;
  
        if (x > 0.008856451679) {
          x = Math.pow(x, 0.3333333333);
        } else {
          x = 7.787037037 * x + 0.1379310345;
        }
  
        if (y > 0.008856451679) {
          y = Math.pow(y, 0.3333333333);
        } else {
          y = 7.787037037 * y + 0.1379310345;
        }
  
        if (z > 0.008856451679) {
          z = Math.pow(z, 0.3333333333);
        } else {
          z = 7.787037037 * z + 0.1379310345;
        }
  
        var l = 116 * y - 16;
        var a = 500 * (x - y);
        var b = 200 * (y - z);
  
        return { l: l, a: a, b: b };
      }
  
      /**
       * Converts a L*, a*, b* color values from the CIELAB color space to the XYZ color space. Formulas are based on http://en.wikipedia.org/wiki/Lab_color_space The reference white point used in the conversion is D65.
       * Assumes L*, a* and b* values are whatever they are and returns x, y and z values.
       *
       * @static
       * @param {*} l The L* value
       * @param {*} a The a* value
       * @param {*} b The b* value
       * @returns  { Object } The XYZ representation
       * @memberof Convert
       */
  
    }, {
      key: 'labToXYZ',
      value: function labToXYZ(l, a, b) {
        if ((typeof l === 'undefined' ? 'undefined' : _typeof(l)) === 'object') {
          a = l.a;
          b = l.b;
          l = l.l;
        }
  
        var y = (l + 16) / 116;
        var x = y + a / 500;
        var z = y - b / 200;
  
        if (x > 0.2068965517) {
          x = x * x * x;
        } else {
          x = 0.1284185493 * (x - 0.1379310345);
        }
        if (y > 0.2068965517) {
          y = y * y * y;
        } else {
          y = 0.1284185493 * (y - 0.1379310345);
        }
        if (z > 0.2068965517) {
          z = z * z * z;
        } else {
          z = 0.1284185493 * (z - 0.1379310345);
        }
  
        // D65 reference white point
        return {
          x: x * 95.047,
          y: y * 100.0,
          z: z * 108.883
        };
      }
  
      /**
       * Converts L*, a*, b* back to RGB values.
       * @see Convert.rgbToXYZ
       * @see Convert.xyzToLab
       *
       * @static
       * @param {*} r The red color value
       * @param {*} g The green color value
       * @param {*} b The blue color value
       * @memberof Convert
       */
  
    }, {
      key: 'rgbToLab',
      value: function rgbToLab(r, g, b) {
        if ((typeof r === 'undefined' ? 'undefined' : _typeof(r)) === 'object') {
          g = r.g;
          b = r.b;
          r = r.r;
        }
  
        var xyz = this.rgbToXYZ(r, g, b);
        return this.xyzToLab(xyz);
      }
    }]);
    return Convert;
  }();
  
  /**
   * Various math-heavy helpers that are used throughout CamanJS.
   *
   * @export
   * @class Calculate
   */
  var Calculate = function () {
    function Calculate() {
      classCallCheck(this, Calculate);
    }
  
    createClass(Calculate, null, [{
      key: 'distance',
  
      /**
       * Calculates the distance between two points.
       *
       * @static
       * @param { Number } x1 1st point x-coordinate.
       * @param { Number } y1 1st point y-coordinate.
       * @param { Number } x2 2nd point x-coordinate.
       * @param { Number } y2 2nd point y-coordinate.
       * @returns { Number } The distance between the two points.
       * @memberof Calculate
       */
      value: function distance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      }
  
      /**
       * Generates a pseudorandom number that lies within the max - mix range. The number can be either an integer or a float depending on what the user specifies.
       *
       * @static
       * @param { Number } min The lower bound (inclusive).
       * @param { Number } max The upper bound (inclusive).
       * @param { Boolean } getFloat Return a Float or a rounded Integer?
       * @returns { Number } The pseudorandom number, either as a float or integer.
       * @memberof Calculate
       */
  
    }, {
      key: 'randomRange',
      value: function randomRange(min, max) {
        var getFloat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  
        var rand = min + Math.random() * (max - min);
        if (getFloat) {
          return rand.toFixed(getFloat);
        } else {
          return Math.round(rand);
        }
      }
  
      /**
       * Calculates the luminance of a single pixel using a special weighted sum.
       *
       * @static
       * @param { Object } rgba RGBA object describing a single pixel.
       * @returns { Number } The luminance value of the pixel.
       * @memberof Calculate
       */
  
    }, {
      key: 'luminance',
      value: function luminance(rgba) {
        return 0.299 * rgba.r + 0.587 * rgba.g + 0.114 * rgba.b;
      }
  
      /**
       * Generates a bezier curve given a start and end point, with control points in between.
       * Can also optionally bound the y values between a low and high bound.
       * This is different than most bezier curve functions because it attempts to construct it in such a way that we can use it more like a simple input -> output system, or a one-to-one function.
       * In other words we can provide an input color value, and immediately receive an output modified color value.
       * Note that, by design, this does not force X values to be in the range [0..255]. This is to generalize the function a bit more. If you give it a starting X value that isn't 0, and/or a ending X value that isn't 255, you may run into problems with your filter!
       *
       *
       * @static
       * @param { Array } controlPoints 2-item arrays describing the x, y coordinates of the control points. Minimum two.
       * @param { Number } [lowBound=0] Minimum possible value for any y-value in the curve.
       * @param { Number } [highBound=255] Maximum possible value for any y-value in the curve.
       * @returns { Array } Array whose index represents every x-value between start and end, and value represents the corresponding y-value.
       * @memberof Calculate
       */
  
    }, {
      key: 'bezier',
      value: function bezier(controlPoints) {
        var lowBound = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var highBound = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 255;
  
        if (controlPoints.length < 2) {
          throw new Error('Invalid number of arguments to bezier');
        }
  
        var bezier = {};
        var lerp = function lerp(a, b, t) {
          return a * (1 - t) + b * t;
        };
        var clamp = function clamp(a, min, max) {
          return Math.min(Math.max(a, min), max);
        };
  
        for (var i = 0; i < 1000; i++) {
          var t = i / 1000;
          var prev = controlPoints;
  
          while (prev.length > 1) {
            var next = [];
            for (var j = 0; j <= prev.length - 2; j++) {
              next.push([lerp(prev[j][0], prev[j + 1][0], t), lerp(prev[j][1], prev[j + 1][1], t)]);
            }
            prev = next;
          }
  
          bezier[Math.round(prev[0][0])] = Math.round(clamp(prev[0][1], lowBound, highBound));
        }
  
        var endX = controlPoints[controlPoints.length - 1][0];
        bezier = Calculate.missingValues(bezier, endX);
  
        // Edge case
        if (!bezier[endX]) {
          bezier[endX] = bezier[endX - 1];
        }
  
        return bezier;
      }
  
      /**
       * Calculates possible missing values from a given value array. Note that this returns a copy and does not mutate the original. In case no values are missing the original array is returned as that is convenient.
       *
       * @static
       * @param { Array } 2-item arrays describing the x, y coordinates of the control points.
       * @param { Number } end x value of the array (maximum)
       * @return { Array } Array whose index represents every x-value between start and end, and value represents the corresponding y-value.
       * @memberof Calculate
       */
  
    }, {
      key: 'missingValues',
      value: function missingValues(values, endX) {
        // Do a search for missing values in the bezier array and use linear
        // interpolation to approximate their values
        if (Object.keys(values).length < endX + 1) {
          var ret = {};
          var leftCoord = void 0,
              rightCoord = void 0;
          for (var i = 0; i <= endX; i++) {
            if (values[i]) {
              ret[i] = values[i];
            } else {
              leftCoord = [i - 1, ret[i - 1]];
              // Find the first value to the right. Ideally this loop will break
              // very quickly.
              for (var j = i; j <= endX; j++) {
                if (values[j]) {
                  rightCoord = [j, values[j]];
                  break;
                }
              }
              ret[i] = leftCoord[1] + (rightCoord[1] - leftCoord[1]) / (rightCoord[0] - leftCoord[0]) * (i - leftCoord[0]);
            }
          }
          return ret;
        }
        return values;
      }
    }]);
    return Calculate;
  }();
  
  // The filters define all of the built-in functionality that comes with Caman (as opposed to being  provided by a plugin). All of these filters are ratherbasic, but are extremely powerful when many are combined. For information on creating plugins, check out the [Plugin Creation](http://camanjs.com/docs/plugin-creation) page, and for information on using the plugins, check out the [Built-In Functionality(http://camanjs.com/docs/built-in) page.
  
  /**
   *
   *
   * @export
   * @param {*} Filter
   */
  function registerFilter(Filter) {
    /*
    * Fill Color
    * Fills the canvas with a single solid color.
    * Arguments: Can take either separate R, G, and B values as arguments, or a single hex color value.
    */
    Filter.register('fillColor', function () {
      var color = void 0;
      if (arguments.length === 1) {
        color = Convert.hexToRGB(arguments.length <= 0 ? undefined : arguments[0]);
      } else {
        color = {
          r: arguments.length <= 0 ? undefined : arguments[0],
          g: arguments.length <= 1 ? undefined : arguments[1],
          b: arguments.length <= 2 ? undefined : arguments[2]
        };
      }
      return this.process('fillColor', function (rgba) {
        rgba.r = color.r;
        rgba.g = color.g;
        rgba.b = color.b;
        rgba.a = 255;
        return rgba;
      });
    });
  
    /*
    * Brightness
    * Simple brightness adjustment.
    * Arguments: Range is -100 to 100. Values < 0 will darken image while values > 0 will brighten.
    */
    Filter.register('brightness', function (adjust) {
      adjust = Math.floor(255 * (adjust / 100));
      return this.process('brightness', function (rgba) {
        rgba.r += adjust;
        rgba.g += adjust;
        rgba.b += adjust;
        return rgba;
      });
    });
  
    /*
    * Saturation
    * Adjusts the color saturation of the image.
    * Arguments: Range is -100 to 100. Values < 0 will desaturate the image while values > 0 will saturate it.
    * If you want to completely desaturate the image, using the greyscale filter is highly recommended because it will yield better results.
    */
    Filter.register('saturation', function (adjust) {
      adjust *= -0.01;
      return this.process('saturation', function (rgba) {
        var max = Math.max(rgba.r, rgba.g, rgba.b);
  
        if (rgba.r !== max) {
          rgba.r += (max - rgba.r) * adjust;
        }
        if (rgba.g !== max) {
          rgba.g += (max - rgba.g) * adjust;
        }
        if (rgba.b !== max) {
          rgba.b += (max - rgba.b) * adjust;
        }
  
        return rgba;
      });
    });
  
    /*
    * Vibrance
    * Similar to saturation, but adjusts the saturation levels in a slightly smarter, more subtle way.
    * Vibrance will attempt to boost colors that are less saturated more and boost already saturated colors less, while saturation boosts all colors by the same level.
    * Arguments: Range is -100 to 100. Values < 0 will desaturate the image while values > 0 will saturate it.
    * If you want to completely desaturate the image, using the greyscale filter is highly recommended because it will yield better results.
    */
    Filter.register('vibrance', function (adjust) {
      adjust *= -1;
      return this.process('vibrance', function (rgba) {
        var max = Math.max(rgba.r, rgba.g, rgba.b);
        var avg = (rgba.r + rgba.g + rgba.b) / 3;
        var amt = Math.abs(max - avg) * 2 / 255 * adjust / 100;
  
        if (rgba.r !== max) {
          rgba.r += (max - rgba.r) * amt;
        }
        if (rgba.g !== max) {
          rgba.g += (max - rgba.g) * amt;
        }
        if (rgba.b !== max) {
          rgba.b += (max - rgba.b) * amt;
        }
  
        return rgba;
      });
    });
  
    /*
    * Greyscale
    * An improved greyscale function that should make prettier results than simply using the saturation filter to remove color. It does so by using factors that directly relate to how the human eye perceves color and values. There are no arguments, it simply makes the image greyscale with no in-between.
    * Algorithm adopted from http://www.phpied.com/image-fun/
    */
    Filter.register('greyscale', function () {
      return this.process('greyscale', function (rgba) {
        var avg = Calculate.luminance(rgba);
        rgba.r = avg;
        rgba.g = avg;
        rgba.b = avg;
        return rgba;
      });
    });
  
    /*
    * Contrast
    * Increases or decreases the color contrast of the image.
    * Arguments: Range is -100 to 100. Values < 0 will decrease contrast while values > 0 will increase contrast.
    * The contrast adjustment values are a bit sensitive. While unrestricted, sane adjustment values are usually around 5-10.
    */
    Filter.register('contrast', function (adjust) {
      adjust = Math.pow((adjust + 100) / 100, 2);
      return this.process('contrast', function (rgba) {
        // Red channel
        rgba.r /= 255;
        rgba.r -= 0.5;
        rgba.r *= adjust;
        rgba.r += 0.5;
        rgba.r *= 255;
  
        // Green channel
        rgba.g /= 255;
        rgba.g -= 0.5;
        rgba.g *= adjust;
        rgba.g += 0.5;
        rgba.g *= 255;
  
        // Blue channel
        rgba.b /= 255;
        rgba.b -= 0.5;
        rgba.b *= adjust;
        rgba.b += 0.5;
        rgba.b *= 255;
  
        return rgba;
      });
    });
  
    /*
    * Hue
    * Adjusts the hue of the image. It can be used to shift the colors in an image in a uniform fashion. If you are unfamiliar with Hue, I recommend reading this [Wikipedia article](http://en.wikipedia.org/wiki/Hue).
    * Arguments: Range is 0 to 100
    * Sometimes, Hue is expressed in the range of 0 to 360. If that's the terminology you're used to, think of 0 to 100 representing the percentage of Hue shift in the 0 to 360 range.
    */
    Filter.register('hue', function (adjust) {
      return this.process('hue', function (rgba) {
        var hsv = Convert.rgbToHSV(rgba.r, rgba.g, rgba.b);
  
        var h = hsv.h * 100;
        h += Math.abs(adjust);
        h = h % 100;
        h /= 100;
        hsv.h = h;
  
        var _Convert$hsvToRGB = Convert.hsvToRGB(hsv.h, hsv.s, hsv.v),
            r = _Convert$hsvToRGB.r,
            g = _Convert$hsvToRGB.g,
            b = _Convert$hsvToRGB.b;
  
        rgba.r = r;
        rgba.g = g;
        rgba.b = b;
  
        return rgba;
      });
    });
  
    /*
    * Colorize
    * Uniformly shifts the colors in an image towards the given color. The adjustment range is from 0 to 100. The higher the value, the closer the colors in the image shift towards the given adjustment color.
    * Arguments: This filter is polymorphic and can take two different sets of arguments. Either a hex color string and an adjustment value, or RGB colors and an adjustment value.
    */
    Filter.register('colorize', function () {
      var rgb = void 0,
          level = void 0;
      if (arguments.length === 2) {
        rgb = Convert.hexToRGB(arguments.length <= 0 ? undefined : arguments[0]);
        level = arguments.length <= 1 ? undefined : arguments[1];
      } else if (arguments.length === 4) {
        rgb = {
          r: arguments.length <= 0 ? undefined : arguments[0],
          g: arguments.length <= 1 ? undefined : arguments[1],
          b: arguments.length <= 2 ? undefined : arguments[2]
        };
        level = arguments.length <= 3 ? undefined : arguments[3];
      }
  
      return this.process('colorize', function (rgba) {
        rgba.r -= (rgba.r - rgb.r) * (level / 100);
        rgba.g -= (rgba.g - rgb.g) * (level / 100);
        rgba.b -= (rgba.b - rgb.b) * (level / 100);
        return rgba;
      });
    });
  
    /*
    * Invert
    * Inverts all colors in the image by subtracting each color channel value from 255. No arguments.
    */
    Filter.register('invert', function () {
      return this.process('invert', function (rgba) {
        rgba.r = 255 - rgba.r;
        rgba.g = 255 - rgba.g;
        rgba.b = 255 - rgba.b;
        return rgba;
      });
    });
  
    /*
    * Sepia
    * Applies an adjustable sepia filter to the image.
    * Arguments: Assumes adjustment is between 0 and 100, which represents how much the sepia filter is applied.
    */
    Filter.register('sepia', function () {
      var adjust = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
  
      adjust /= 100;
      return this.process('sepia', function (rgba) {
        // All three color channels have special conversion factors that
        // define what sepia is. Here we adjust each channel individually,
        // with the twist that you can partially apply the sepia filter.
        rgba.r = Math.min(255, rgba.r * (1 - 0.607 * adjust) + rgba.g * (0.769 * adjust) + rgba.b * (0.189 * adjust));
        rgba.g = Math.min(255, rgba.r * (0.349 * adjust) + rgba.g * (1 - 0.314 * adjust) + rgba.b * (0.168 * adjust));
        rgba.b = Math.min(255, rgba.r * (0.272 * adjust) + rgba.g * (0.534 * adjust) + rgba.b * (1 - 0.869 * adjust));
        return rgba;
      });
    });
  
    /*
    * Gamma
    * Adjusts the gamma of the image.
    * Arguments: Range is from 0 to infinity, although sane values are from 0 to 4 or 5.
    * Values between 0 and 1 will lessen the contrast while values greater than 1 will increase it.
    */
    Filter.register('gamma', function (adjust) {
      return this.process('gamma', function (rgba) {
        rgba.r = Math.pow(rgba.r / 255, adjust) * 255;
        rgba.g = Math.pow(rgba.g / 255, adjust) * 255;
        rgba.b = Math.pow(rgba.b / 255, adjust) * 255;
        return rgba;
      });
    });
  
    /*
    * Noise
    * Adds noise to the image on a scale from 1 - 100. However, the scale isn't constrained, so you can specify a value > 100 if you want a LOT of noise.
    */
    Filter.register('noise', function (adjust) {
      adjust = Math.abs(adjust) * 2.55;
  
      return this.process('noise', function (rgba) {
        var rand = Calculate.randomRange(adjust * -1, adjust);
        rgba.r += rand;
        rgba.g += rand;
        rgba.b += rand;
        return rgba;
      });
    });
  
    /*
    * Clip
    * Clips a color to max values when it falls outside of the specified range.
    * Arguments: supplied value should be between 0 and 100.
    */
    Filter.register('clip', function (adjust) {
      adjust = Math.abs(adjust) * 2.55;
  
      return this.process('clip', function (rgba) {
        if (rgba.r > 255 - adjust) {
          rgba.r = 255;
        } else if (rgba.r < adjust) {
          rgba.r = 0;
        }
  
        if (rgba.g > 255 - adjust) {
          rgba.g = 255;
        } else if (rgba.g < adjust) {
          rgba.g = 0;
        }
  
        if (rgba.b > 255 - adjust) {
          rgba.b = 255;
        } else if (rgba.b < adjust) {
          rgba.b = 0;
        }
  
        return rgba;
      });
    });
  
    /*
    * Channels
    * Lets you modify the intensity of any combination of red, green, or blue channels individually.
    * Arguments: Must be given at least one color channel to adjust in order to work.
    * Options format (must specify 1 - 3 colors):
    * {
    *   red: 20,
    *   green: -5,
    *   blue: -40
    * }
    */
    Filter.register('channels', function (options) {
      if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') {
        return this;
      }
      for (var chan in options) {
        if (options.hasOwnProperty(chan)) {
          if (options[chan] === 0) {
            delete options[chan];
            continue;
          }
          options[chan] /= 100;
        }
      }
      if (options.length === 0) {
        return this;
      }
  
      return this.process('channels', function (rgba) {
        if (options.red) {
          if (options.red > 0) {
            rgba.r += (255 - rgba.r) * options.red;
          } else {
            rgba.r -= rgba.r * Math.abs(options.red);
          }
        }
        if (options.green) {
          if (options.green > 0) {
            rgba.g += (255 - rgba.g) * options.green;
          } else {
            rgba.g -= rgba.g * Math.abs(options.green);
          }
        }
        if (options.blue) {
          if (options.blue > 0) {
            rgba.b += (255 - rgba.b) * options.blue;
          } else {
            rgba.b -= rgba.b * Math.abs(options.blue);
          }
        }
  
        return rgba;
      });
    });
  
    /*
    * Curves
    * Curves implementation using Bezier curve equation. If you're familiar with the Curves functionality in Photoshop, this works in a very similar fashion.
    * Arguments:
    * chan - [r, g, b, rgb]
    * cps - [x, y]* (curve control points, min. 2; 0 - 255)
    * algo - function (optional)
    *
    * The first argument represents the channels you wish to modify with the filter. It can be an array of channels or a string (for a single channel). The rest of the arguments are 2-element arrays that represent point coordinates. They are specified in the same order as shown in this image to the right. The coordinates are in the range of 0 to 255 for both X and Y values.
    * It is possible to pass the function an optional function describing which curve algorithm to use.
    * It defaults to bezier.
    * The x-axis represents the input value for a single channel, while the y-axis represents the output value.
    */
    Filter.register('curves', function (chans) {
      for (var _len = arguments.length, cps = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        cps[_key - 1] = arguments[_key];
      }
  
      var last = cps[cps.length - 1];
      var algo = void 0;
      if (typeof last === 'function') {
        algo = last;
        cps.pop();
      } else if (typeof last === 'string') {
        algo = Calculate[last];
        cps.pop();
      } else {
        algo = Calculate.bezier;
      }
  
      // If channels are in a string, split to an array
      if (typeof chans === 'string') {
        chans = chans.split('');
      }
      if (chans[0] === 'v') {
        chans = ['r', 'g', 'b'];
      }
  
      if (cps.length < 2) {
        // might want to give a warning now
        throw new Error('Invalid number of arguments to curves filter');
      }
  
      // Generate a curve
      var bezier = algo(cps, 0, 255);
  
      // If the curve starts after x = 0, initialize it with a flat line
      // until the curve begins.
      var start = cps[0];
      if (start[0] > 0) {
        for (var i = 0; i < start[0]; i++) {
          bezier[i] = start[1];
        }
      }
  
      var end = cps[cps.length - 1];
      if (end[0] < 255) {
        for (var _i = end[0]; _i <= 255; _i++) {
          bezier[_i] = end[1];
        }
      }
  
      return this.process('curves', function (rgba) {
        // Now that we have the bezier curve, we do a basic hashmap lookup
        // to find and replace color values.
        for (var _i2 = 0; _i2 < chans.length; _i2++) {
          rgba[chans[_i2]] = bezier[rgba[chans[_i2]]];
        }
        return rgba;
      });
    });
  
    /*
    * Exposure
    * Adjusts the exposure of the image by using the curves function.
    * Arguments: Range is -100 to 100. Values < 0 will decrease exposure while values > 0 will increase exposure.
    */
    Filter.register('exposure', function (adjust) {
      var p = Math.abs(adjust) / 100;
  
      var ctrl1 = [0, 255 * p];
      var ctrl2 = [255 - 255 * p, 255];
  
      if (adjust < 0) {
        ctrl1 = ctrl1.reverse();
        ctrl2 = ctrl2.reverse();
      }
      return this.curves('rgb', [0, 0], ctrl1, ctrl2, [255, 255]);
    });
  }
  
  var vignetteFilters = {
    brightness: function brightness(rgba, amt, opts) {
      rgba.r = rgba.r - rgba.r * amt * opts.strength;
      rgba.g = rgba.g - rgba.g * amt * opts.strength;
      rgba.b = rgba.b - rgba.b * amt * opts.strength;
      return rgba;
    },
    gamma: function gamma(rgba, amt, opts) {
      rgba.r = Math.pow(rgba.r / 255, Math.max(10 * amt * opts.strength, 1)) * 255;
      rgba.g = Math.pow(rgba.g / 255, Math.max(10 * amt * opts.strength, 1)) * 255;
      rgba.b = Math.pow(rgba.b / 255, Math.max(10 * amt * opts.strength, 1)) * 255;
      return rgba;
    },
    colorize: function colorize(rgba, amt, opts) {
      rgba.r -= (rgba.r - opts.color.r) * amt;
      rgba.g -= (rgba.g - opts.color.g) * amt;
      rgba.b -= (rgba.b - opts.color.b) * amt;
      return rgba;
    }
  };
  
  /**
   *
   *
   * @export
   * @param {*} Filter
   */
  function registerCameraFilter(Filter) {
    Filter.register('vignette', function (size) {
      var strength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 60;
  
      var bezier = void 0,
          center = void 0,
          end = void 0,
          start = void 0;
  
      if (typeof size === 'string' && size.substr(-1) === '%') {
        if (this.dimensions.height > this.dimensions.width) {
          size = this.dimensions.width * (parseInt(size.substr(0, size.length - 1), 10) / 100);
        } else {
          size = this.dimensions.height * (parseInt(size.substr(0, size.length - 1), 10) / 100);
        }
      }
      strength /= 100;
      center = [this.dimensions.width / 2, this.dimensions.height / 2];
      start = Math.sqrt(Math.pow(center[0], 2) + Math.pow(center[1], 2));
      end = start - size;
      bezier = Calculate.bezier([0, 1], [30, 30], [70, 60], [100, 80]);
      this.process('vignette', function (rgba) {
        var dist, div, loc;
        loc = rgba.locationXY();
        dist = Calculate.distance(loc.x, loc.y, center[0], center[1]);
        if (dist > end) {
          div = Math.max(1, bezier[Math.round((dist - end) / size * 100)] / 10 * strength);
          rgba.r = Math.pow(rgba.r / 255, div) * 255;
          rgba.g = Math.pow(rgba.g / 255, div) * 255;
          rgba.b = Math.pow(rgba.b / 255, div) * 255;
        }
        return rgba;
      });
    });
  
    Filter.register('rectangularVignette', function (opts) {
      var defaults$$1 = void 0,
          dim = void 0,
          percent = void 0,
          size = void 0,
          _i = void 0,
          _len = void 0,
          _ref = void 0;
      defaults$$1 = {
        strength: 50,
        cornerRadius: 0,
        method: 'brightness',
        color: {
          r: 0,
          g: 0,
          b: 0
        }
      };
      opts = Util.extend(defaults$$1, opts);
      if (!opts.size) {
        return this;
      } else if (typeof opts.size === 'string') {
        percent = parseInt(opts.size, 10) / 100;
        opts.size = {
          width: this.dimensions.width * percent,
          height: this.dimensions.height * percent
        };
      } else if (_typeof(opts.size) === 'object') {
        _ref = ['width', 'height'];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          dim = _ref[_i];
          if (typeof opts.size[dim] === 'string') {
            opts.size[dim] = this.dimensions[dim] * (parseInt(opts.size[dim], 10) / 100);
          }
        }
      } else if (opts.size === 'number') {
        size = opts.size;
        opts.size = {
          width: size,
          height: size
        };
      }
      if (typeof opts.cornerRadius === 'string') {
        opts.cornerRadius = opts.size.width / 2 * (parseInt(opts.cornerRadius, 10) / 100);
      }
      opts.strength /= 100;
      opts.size.width = Math.floor(opts.size.width);
      opts.size.height = Math.floor(opts.size.height);
      opts.image = {
        width: this.dimensions.width,
        height: this.dimensions.height
      };
      if (opts.method === 'colorize' && typeof opts.color === 'string') {
        opts.color = Convert.hexToRGB(opts.color);
      }
      opts.coords = {
        left: (this.dimensions.width - opts.size.width) / 2,
        right: this.dimensions.width - opts.coords.left,
        bottom: (this.dimensions.height - opts.size.height) / 2,
        top: this.dimensions.height - opts.coords.bottom
      };
      opts.corners = [{
        x: opts.coords.left + opts.cornerRadius,
        y: opts.coords.top - opts.cornerRadius
      }, {
        x: opts.coords.right - opts.cornerRadius,
        y: opts.coords.top - opts.cornerRadius
      }, {
        x: opts.coords.right - opts.cornerRadius,
        y: opts.coords.bottom + opts.cornerRadius
      }, {
        x: opts.coords.left + opts.cornerRadius,
        y: opts.coords.bottom + opts.cornerRadius
      }];
      opts.maxDist = Calculate.distance(0, 0, opts.corners[3].x, opts.corners[3].y) - opts.cornerRadius;
      this.process('rectangularVignette', function (rgba) {
        var amt, loc, radialDist;
        loc = rgba.locationXY();
        if (loc.x > opts.corners[0].x && loc.x < opts.corners[1].x && loc.y > opts.coords.bottom && loc.y < opts.coords.top) {
          return rgba;
        }
        if (loc.x > opts.coords.left && loc.x < opts.coords.right && loc.y > opts.corners[3].y && loc.y < opts.corners[2].y) {
          return rgba;
        }
        if (loc.x > opts.corners[0].x && loc.x < opts.corners[1].x && loc.y > opts.coords.top) {
          amt = (loc.y - opts.coords.top) / opts.maxDist;
        } else if (loc.y > opts.corners[2].y && loc.y < opts.corners[1].y && loc.x > opts.coords.right) {
          amt = (loc.x - opts.coords.right) / opts.maxDist;
        } else if (loc.x > opts.corners[0].x && loc.x < opts.corners[1].x && loc.y < opts.coords.bottom) {
          amt = (opts.coords.bottom - loc.y) / opts.maxDist;
        } else if (loc.y > opts.corners[2].y && loc.y < opts.corners[1].y && loc.x < opts.coords.left) {
          amt = (opts.coords.left - loc.x) / opts.maxDist;
        } else if (loc.x <= opts.corners[0].x && loc.y >= opts.corners[0].y) {
          radialDist = Calculate.distance(loc.x, loc.y, opts.corners[0].x, opts.corners[0].y);
          amt = (radialDist - opts.cornerRadius) / opts.maxDist;
        } else if (loc.x >= opts.corners[1].x && loc.y >= opts.corners[1].y) {
          radialDist = Calculate.distance(loc.x, loc.y, opts.corners[1].x, opts.corners[1].y);
          amt = (radialDist - opts.cornerRadius) / opts.maxDist;
        } else if (loc.x >= opts.corners[2].x && loc.y <= opts.corers[2].y) {
          radialDist = Calculate.distance(loc.x, loc.y, opts.corners[2].x, opts.corners[2].y);
          amt = (radialDist - opts.cornerRadius) / opts.maxDist;
        } else if (loc.x <= opts.corners[3].x && loc.y <= opts.corners[3].y) {
          radialDist = Calculate.distance(loc.x, loc.y, opts.corners[3].x, opts.corners[3].y);
          amt = (radialDist - opts.cornerRadius) / opts.maxDist;
        }
        if (amt < 0) {
          return rgba;
        }
        return vignetteFilters[opts.method](rgba, amt, opts);
      });
    });
  }
  
  function registerBlurFilter(Filter) {
    Filter.register('boxBlur', function () {
      this.processKernel('Box Blur', [1, 1, 1, 1, 1, 1, 1, 1, 1]);
    });
  
    Filter.register('heavyRadialBlur', function () {
      this.processKernel('Heavy Radial Blur', [0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0]);
    });
  
    Filter.register('gaussianBlur', function () {
      this.processKernel('Gaussian Blur', [1, 4, 6, 4, 1, 4, 16, 24, 16, 4, 6, 24, 36, 24, 6, 4, 16, 24, 16, 4, 1, 4, 6, 4, 1]);
    });
  
    Filter.register('motionBlur', function (degrees) {
      var kernel = void 0;
      if (degrees === 0 || degrees === 180) {
        kernel = [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0];
      } else if (degrees > 0 && degrees < 90 || degrees > 180 && degrees < 270) {
        kernel = [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0];
      } else if (degrees === 90 || degrees === 270) {
        kernel = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      } else {
        kernel = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
      }
      this.processKernel('Motion Blur', kernel);
    });
  
    Filter.register('sharpen', function () {
      var amt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
  
      amt /= 100;
      this.processKernel('Sharpen', [0, -amt, 0, -amt, 4 * amt + 1, -amt, 0, -amt, 0]);
    });
  }
  
  function registerPosterizeFilter(Filter) {
    Filter.register('posterize', function (adjust) {
      var numOfAreas, numOfValues;
      numOfAreas = 256 / adjust;
      numOfValues = 255 / (adjust - 1);
      this.process('posterize', function (rgba) {
        rgba.r = Math.floor(Math.floor(rgba.r / numOfAreas) * numOfValues);
        rgba.g = Math.floor(Math.floor(rgba.g / numOfAreas) * numOfValues);
        rgba.b = Math.floor(Math.floor(rgba.b / numOfAreas) * numOfValues);
        return rgba;
      });
    });
  }
  
  /**
   * some preset filters
   *
   * @export
   * @param {*} Filter
   */
  function registerPresetFilter(Filter) {
    Filter.register('vintage', function () {
      var vignette = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  
      this.greyscale();
      this.contrast(5);
      this.noise(3);
      this.sepia(100);
      this.channels({ red: 8, blue: 2, green: 4 });
      this.gamma(0.87);
  
      if (vignette) {
        this.vignette('40%', 30);
      }
    });
  
    Filter.register('lomo', function () {
      var vignette = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  
      this.brightness(15);
      this.exposure(15);
      this.curves('rgb', [0, 0], [200, 0], [155, 255], [255, 255]);
      this.saturation(-20);
      this.gamma(1.8);
      if (vignette) {
        this.vignette('50%', 60);
      }
      this.brightness(5);
    });
  
    // FIXME:sharpen
    Filter.register('clarity', function () {
      var grey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  
      this.vibrance(20);
      this.curves('rgb', [5, 0], [130, 150], [190, 220], [250, 255]);
      this.sharpen(15);
      this.vignette('45%', 20);
      if (grey) {
        this.greyscale();
        this.contrast(4);
      }
      return this;
    });
  
    Filter.register('sinCity', function () {
      this.contrast(100);
      this.brightness(15);
      this.exposure(10);
      this.posterize(80);
      this.clip(30);
      this.greyscale();
    });
  
    Filter.register('sunrise', function () {
      var vignette = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  
      this.exposure(3.5);
      this.saturation(-5);
      this.vibrance(50);
      this.sepia(60);
      this.colorize('#e87b22', 10);
      this.channels({
        red: 8,
        blue: 8
      });
      this.contrast(5);
      this.gamma(1.2);
      if (vignette) {
        this.vignette('55%', 25);
      }
    });
  
    Filter.register('crossProcess', function () {
      this.exposure(5);
      this.colorize('#e87b22', 4);
      this.sepia(20);
      this.channels({
        blue: 8,
        red: 3
      });
      this.curves('b', [0, 0], [100, 150], [180, 180], [255, 255]);
      this.contrast(15);
      this.vibrance(75);
      this.gamma(1.6);
    });
  
    Filter.register('orangePeel', function () {
      this.curves('rgb', [0, 0], [100, 50], [140, 200], [255, 255]);
      this.vibrance(-30);
      this.saturation(-30);
      this.colorize('#ff9000', 30);
      this.contrast(-5);
      this.gamma(1.4);
    });
  
    Filter.register('love', function () {
      this.brightness(5);
      this.exposure(8);
      this.contrast(4);
      this.colorize('#c42007', 30);
      this.vibrance(50);
      this.gamma(1.3);
    });
  
    Filter.register('grungy', function () {
      var vignette = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  
      this.gamma(1.5);
      this.clip(25);
      this.saturation(-60);
      this.contrast(5);
      this.noise(5);
      if (vignette) {
        this.vignette('50%', 30);
      }
    });
    // FIXME:sharpen
    Filter.register('jarques', function () {
      this.saturation(-35);
      this.curves('b', [20, 0], [90, 120], [186, 144], [255, 230]);
      this.curves('r', [0, 0], [144, 90], [138, 120], [255, 255]);
      this.curves('g', [10, 0], [115, 105], [148, 100], [255, 248]);
      this.curves('rgb', [0, 0], [120, 100], [128, 140], [255, 255]);
      this.sharpen(20);
    });
  
    Filter.register('pinhole', function () {
      var vignette = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  
      this.greyscale();
      this.sepia(10);
      this.exposure(10);
      this.contrast(15);
      if (vignette) {
        this.vignette('60%', 35);
      }
    });
  
    Filter.register('oldBoot', function () {
      var vignette = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  
      this.saturation(-20);
      this.vibrance(-50);
      this.gamma(1.1);
      this.sepia(30);
      this.channels({
        red: -10,
        blue: 5
      });
      this.curves('rgb', [0, 0], [80, 50], [128, 230], [255, 255]);
      if (vignette) {
        this.vignette('60%', 30);
      }
    });
  
    Filter.register('glowingSun', function () {
      var vignette = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  
      this.brightness(10);
      this.newLayer(function () {
        this.setBlendingMode('multiply');
        this.opacity(80);
        this.copyParent();
        this.filter.gamma(0.8);
        this.filter.contrast(50);
        this.filter.exposure(10);
      });
      this.newLayer(function () {
        this.setBlendingMode('softLight');
        this.opacity(80);
        this.fillColor('#f49600');
      });
      this.exposure(20);
      this.gamma(0.8);
      if (vignette) {
        this.vignette('45%', 20);
      }
    });
  
    Filter.register('hazyDays', function () {
      var vignette = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  
      this.gamma(1.2);
      this.newLayer(function () {
        this.setBlendingMode('overlay');
        this.opacity(60);
        this.copyParent();
        this.filter.channels({
          red: 5
        });
        this.filter.stackBlur(15);
      });
      this.newLayer(function () {
        this.setBlendingMode('addition');
        this.opacity(40);
        this.fillColor('#6899ba');
      });
      this.newLayer(function () {
        this.setBlendingMode('multiply');
        this.opacity(35);
        this.copyParent();
        this.filter.brightness(40);
        this.filter.vibrance(40);
        this.filter.exposure(30);
        this.filter.contrast(15);
        this.filter.curves('r', [0, 40], [128, 128], [128, 128], [255, 215]);
        this.filter.curves('g', [0, 40], [128, 128], [128, 128], [255, 215]);
        this.filter.curves('b', [0, 40], [128, 128], [128, 128], [255, 215]);
        this.filter.stackBlur(5);
      });
      this.curves('r', [20, 0], [128, 158], [128, 128], [235, 255]);
      this.curves('g', [20, 0], [128, 128], [128, 128], [235, 255]);
      this.curves('b', [20, 0], [128, 108], [128, 128], [235, 255]);
      if (vignette) {
        this.vignette('45%', 20);
      }
    });
  
    Filter.register('herMajesty', function () {
      this.brightness(40);
      this.colorize('#ea1c5d', 10);
      this.curves('b', [0, 10], [128, 180], [190, 190], [255, 255]);
      this.newLayer(function () {
        this.setBlendingMode('overlay');
        this.opacity(50);
        this.copyParent();
        this.filter.gamma(0.7);
        this.newLayer(function () {
          this.setBlendingMode('normal');
          this.opacity(60);
          this.fillColor('#ea1c5d');
        });
      });
      this.newLayer(function () {
        this.setBlendingMode('multiply');
        this.opacity(60);
        this.copyParent();
        this.filter.saturation(50);
        this.filter.hue(90);
        this.filter.contrast(10);
      });
      this.gamma(1.4);
      this.vibrance(-30);
      this.newLayer(function () {
        this.opacity(10);
        this.fillColor('#e5f0ff');
      });
      return this;
    });
  
    Filter.register('nostalgia', function () {
      var vignette = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  
      this.saturation(20);
      this.gamma(1.4);
      this.greyscale();
      this.contrast(5);
      this.sepia(100);
      this.channels({
        red: 8,
        blue: 2,
        green: 4
      });
      this.gamma(0.8);
      this.contrast(5);
      this.exposure(10);
      this.newLayer(function () {
        this.setBlendingMode('overlay');
        this.copyParent();
        this.opacity(55);
        this.filter.stackBlur(10);
      });
      if (vignette) {
        this.vignette('50%', 30);
      }
    });
  
    Filter.register('hemingway', function () {
      this.greyscale();
      this.contrast(10);
      this.gamma(0.9);
      this.newLayer(function () {
        this.setBlendingMode('multiply');
        this.opacity(40);
        this.copyParent();
        this.filter.exposure(15);
        this.filter.contrast(15);
        this.filter.channels({
          green: 10,
          red: 5
        });
      });
      this.sepia(30);
      this.curves('rgb', [0, 10], [120, 90], [180, 200], [235, 255]);
      this.channels({
        red: 5,
        green: -2
      });
      this.exposure(15);
    });
  
    // FIXME: sharpen
    Filter.register('concentrate', function () {
      this.sharpen(40);
      this.saturation(-50);
      this.channels({
        red: 3
      });
      this.newLayer(function () {
        this.setBlendingMode('multiply');
        this.opacity(80);
        this.copyParent();
        this.filter.sharpen(5);
        this.filter.contrast(50);
        this.filter.exposure(10);
        this.filter.channels({
          blue: 5
        });
      });
      this.brightness(10);
    });
  }
  
  /*
  StackBlur - a fast almost Gaussian Blur For Canvas v0.31 modified for CamanJS
  Version:   0.31
  Author:    Mario Klingemann
  Contact:   mario@quasimondo.com
  Website:  http://www.quasimondo.com/StackBlurForCanvas
  Twitter:  @quasimondo
  Modified By: Ryan LeFevre (@meltingice)
  In case you find this class useful - especially in commercial projects -
  I am not totally unhappy for a small donation to my PayPal account
  mario@quasimondo.de
  Or support me on flattr:
  https://flattr.com/thing/72791/StackBlur-a-fast-almost-Gaussian-Blur-Effect-for-CanvasJavascript
  Copyright (c) 2010 Mario Klingemann
  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation
  files (the "Software"), to deal in the Software without
  restriction, including without limitation the rights to use,
  copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the
  Software is furnished to do so, subject to the following
  conditions:
  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
  OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
  WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
  OTHER DEALINGS IN THE SOFTWARE.
   */
  
  var BlurStack = void 0,
      mulTable = void 0,
      shgTable = void 0;
  mulTable = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259];
  shgTable = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];
  BlurStack = function BlurStack() {
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 0;
    this.next = null;
  };
  
  function registerStackBlurPlugin(Plugin) {
    Plugin.register('stackBlur', function (radius) {
      var bInSum = void 0,
          bOutSum = void 0,
          bSum = void 0,
          div = void 0,
          gInSum = void 0,
          gOutSum = void 0,
          gSum = void 0,
          height = void 0,
          heightMinus1 = void 0,
          i = void 0,
          mulSum = void 0,
          p = void 0,
          pb = void 0,
          pg = void 0,
          pixels = void 0,
          pr = void 0,
          rInSum = void 0,
          rOutSum = void 0,
          rSum = void 0,
          radiusPlus1 = void 0,
          rbs = void 0,
          shgSum = void 0,
          stack = void 0,
          stackEnd = void 0,
          stackIn = void 0,
          stackOut = void 0,
          stackStart = void 0,
          sumFactor = void 0,
          width = void 0,
          widthMinus1 = void 0,
          x = void 0,
          y = void 0,
          yi = void 0,
          yp = void 0,
          yw = void 0,
          _i = void 0,
          _j = void 0,
          _k = void 0,
          _l = void 0,
          _m = void 0,
          _n = void 0,
          _o = void 0,
          _p = void 0,
          _q = void 0;
      if (isNaN(radius) || radius < 1) {
        return;
      }
      radius |= 0;
      pixels = this.pixelData;
      width = this.dimensions.width;
      height = this.dimensions.height;
      div = radius + radius + 1;
      widthMinus1 = width - 1;
      heightMinus1 = height - 1;
      radiusPlus1 = radius + 1;
      sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;
      stackStart = new BlurStack();
      stack = stackStart;
      for (i = _i = 1; div >= 1 ? _i < div : _i > div; i = div >= 1 ? ++_i : --_i) {
        stack = stack.next = new BlurStack();
        if (i === radiusPlus1) {
          stackEnd = stack;
        }
      }
      stack.next = stackStart;
      stackIn = null;
      stackOut = null;
      yw = yi = 0;
      mulSum = mulTable[radius];
      shgSum = shgTable[radius];
      for (y = _j = 0; height >= 0 ? _j < height : _j > height; y = height >= 0 ? ++_j : --_j) {
        rInSum = gInSum = bInSum = rSum = gSum = bSum = 0;
        rOutSum = radiusPlus1 * (pr = pixels[yi]);
        gOutSum = radiusPlus1 * (pg = pixels[yi + 1]);
        bOutSum = radiusPlus1 * (pb = pixels[yi + 2]);
        rSum += sumFactor * pr;
        gSum += sumFactor * pg;
        bSum += sumFactor * pb;
        stack = stackStart;
        for (i = _k = 0; radiusPlus1 >= 0 ? _k < radiusPlus1 : _k > radiusPlus1; i = radiusPlus1 >= 0 ? ++_k : --_k) {
          stack.r = pr;
          stack.g = pg;
          stack.b = pb;
          stack = stack.next;
        }
        for (i = _l = 1; radiusPlus1 >= 1 ? _l < radiusPlus1 : _l > radiusPlus1; i = radiusPlus1 >= 1 ? ++_l : --_l) {
          p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
          rSum += (stack.r = pr = pixels[p]) * (rbs = radiusPlus1 - i);
          gSum += (stack.g = pg = pixels[p + 1]) * rbs;
          bSum += (stack.b = pb = pixels[p + 2]) * rbs;
          rInSum += pr;
          gInSum += pg;
          bInSum += pb;
          stack = stack.next;
        }
        stackIn = stackStart;
        stackOut = stackEnd;
        for (x = _m = 0; width >= 0 ? _m < width : _m > width; x = width >= 0 ? ++_m : --_m) {
          pixels[yi] = rSum * mulSum >> shgSum;
          pixels[yi + 1] = gSum * mulSum >> shgSum;
          pixels[yi + 2] = bSum * mulSum >> shgSum;
          rSum -= rOutSum;
          gSum -= gOutSum;
          bSum -= bOutSum;
          rOutSum -= stackIn.r;
          gOutSum -= stackIn.g;
          bOutSum -= stackIn.b;
          p = yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1) << 2;
          rInSum += stackIn.r = pixels[p];
          gInSum += stackIn.g = pixels[p + 1];
          bInSum += stackIn.b = pixels[p + 2];
          rSum += rInSum;
          gSum += gInSum;
          bSum += bInSum;
          stackIn = stackIn.next;
          rOutSum += pr = stackOut.r;
          gOutSum += pg = stackOut.g;
          bOutSum += pb = stackOut.b;
          rInSum -= pr;
          gInSum -= pg;
          bInSum -= pb;
          stackOut = stackOut.next;
          yi += 4;
        }
        yw += width;
      }
      for (x = _n = 0; width >= 0 ? _n < width : _n > width; x = width >= 0 ? ++_n : --_n) {
        gInSum = bInSum = rInSum = gSum = bSum = rSum = 0;
        yi = x << 2;
        rOutSum = radiusPlus1 * (pr = pixels[yi]);
        gOutSum = radiusPlus1 * (pg = pixels[yi + 1]);
        bOutSum = radiusPlus1 * (pb = pixels[yi + 2]);
        rSum += sumFactor * pr;
        gSum += sumFactor * pg;
        bSum += sumFactor * pb;
        stack = stackStart;
        for (i = _o = 0; radiusPlus1 >= 0 ? _o < radiusPlus1 : _o > radiusPlus1; i = radiusPlus1 >= 0 ? ++_o : --_o) {
          stack.r = pr;
          stack.g = pg;
          stack.b = pb;
          stack = stack.next;
        }
        yp = width;
        for (i = _p = 1; radius >= 1 ? _p <= radius : _p >= radius; i = radius >= 1 ? ++_p : --_p) {
          yi = yp + x << 2;
          rSum += (stack.r = pr = pixels[yi]) * (rbs = radiusPlus1 - i);
          gSum += (stack.g = pg = pixels[yi + 1]) * rbs;
          bSum += (stack.b = pb = pixels[yi + 2]) * rbs;
          rInSum += pr;
          gInSum += pg;
          bInSum += pb;
          stack = stack.next;
          if (i < heightMinus1) {
            yp += width;
          }
        }
        yi = x;
        stackIn = stackStart;
        stackOut = stackEnd;
        for (y = _q = 0; height >= 0 ? _q < height : _q > height; y = height >= 0 ? ++_q : --_q) {
          p = yi << 2;
          pixels[p] = rSum * mulSum >> shgSum;
          pixels[p + 1] = gSum * mulSum >> shgSum;
          pixels[p + 2] = bSum * mulSum >> shgSum;
          rSum -= rOutSum;
          gSum -= gOutSum;
          bSum -= bOutSum;
          rOutSum -= stackIn.r;
          gOutSum -= stackIn.g;
          bOutSum -= stackIn.b;
          p = x + ((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width << 2;
          rSum += rInSum += stackIn.r = pixels[p];
          gSum += gInSum += stackIn.g = pixels[p + 1];
          bSum += bInSum += stackIn.b = pixels[p + 2];
          stackIn = stackIn.next;
          rOutSum += pr = stackOut.r;
          gOutSum += pg = stackOut.g;
          bOutSum += pb = stackOut.b;
          rInSum -= pr;
          gInSum -= pg;
          bInSum -= pb;
          stackOut = stackOut.next;
          yi += width;
        }
      }
      return this;
    });
  }
  
  function registerStackBlurFilter(Filter) {
    Filter.register('stackBlur', function (radius) {
      this.processPlugin('stackBlur', [radius]);
    });
  }
  
  function registerPlugin(Plugin) {
    registerStackBlurPlugin(Plugin);
  }
  
  function registerPluginFilter(Filter) {
    registerCameraFilter(Filter);
    registerBlurFilter(Filter);
    registerPosterizeFilter(Filter);
    registerPresetFilter(Filter);
    registerStackBlurFilter(Filter);
  }
  
  // wechat mini program env
  if (typeof wx === 'undefined') {
    throw new Error('Wechat-CamanJS can only run in wechat mini program');
  }
  registerBlender(Blender);
  registerFilter(Filter);
  
  registerPlugin(Plugin);
  registerPluginFilter(Filter);
  
  export default Caman;