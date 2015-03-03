var util = Npm.require('util');

Logger = {

  _offset: 0,
  _offsetPin: 0,
  _lastClear: 0,
  _shouldFlush: true,
  _shouldResetCursor: false,
  _linesCache: [],
  _whitespace: Array(1000).join(' '),
  _canvasStream: process.stdout,
  _syntax: /\{([^:\}]+)(?::([^\{\}]*))?\}/g,

  _alias: {},

  _styles: {
    bold: ['\x1B[1m',  '\x1B[22m'],
    italic: ['\x1B[3m',  '\x1B[23m'],
    underline: ['\x1B[4m',  '\x1B[24m'],
    inverse: ['\x1B[7m',  '\x1B[27m'],
    white: ['\x1B[37m', '\x1B[39m'],
    grey: ['\x1B[90m', '\x1B[39m'],
    black: ['\x1B[30m', '\x1B[39m'],
    blue: ['\x1B[34m', '\x1B[39m'],
    cyan: ['\x1B[36m', '\x1B[39m'],
    green: ['\x1B[32m', '\x1B[39m'],
    magenta: ['\x1B[35m', '\x1B[39m'],
    red: ['\x1B[31m', '\x1B[39m'],
    yellow: ['\x1B[33m', '\x1B[39m']
  },

  _types: {
    error: {
      color: "red",
      enabled: true
    },
    debug: {
      color: "cyan",
      enabled: false
    }
  },

  alias: function(name, value) {
    this._linesCache = [], self = this;
    if (typeof name === 'object') {
      Object.keys(name).forEach(function(key) {
        self.alias(key, name[key]);
      });
      return;
    }
    this._alias[name] = typeof value === 'string' ? value.split('+') : [value];
  },

  flush: function(bool) {
    this._shouldFlush = bool;
    if (this._shouldFlush !== false && this._canvasStream.clearScreenDown) {
      this._canvasStream.clearScreenDown(); 
    }
  },

  cursor: function(bool) {
    if (bool === false) {
      this._shouldResetCursor = true;
      this._canvasStream.write('\x1B[?25l');
    } else {
      this._canvasStream.write('\x1B[?25h');
    }
  },

  clear: function(wait) {
    if (Date.now() - lastClear < wait) {
      return false;
    }
    this._lastClear = Date.now();
    if (this._canvasStream.moveCursor) {
      this._canvasStream.moveCursor(0, -offset);  
    }
    if (this._shouldFlush && this._canvasStream.clearScreenDown) {
      this._canvasStream.clearScreenDown(); 
    }
    this._offset = this._offsetPin;
    return true;
  },

  write: function(line) {
    var self = this;

    var syntaxReplace = function(value, head) {
      if (self._alias[head]) {
        return self._alias[head].reduce(syntaxReplace, value);
      }
      var num = parseInt(head,10);
      if (num) return value+self._whitespace.slice(0, Math.max(num-value.length,0));
      if (!self._styles[head]) return value;
      return self._styles[head][0]+value+self._styles[head][1];
    }

    var syntaxReplaceAll = function(_, heads, value) {
      return heads.split('+').reduce(syntaxReplace, value || '');
    }

    if (!Buffer.isBuffer(line)) {
      line = util.format.apply(util, arguments);
      line = line.replace(this._syntax, syntaxReplace).replace(this._syntax, syntaxReplaceAll);
    }

    this._canvasStream.write(line);
  },

  line: function(line) {
    this._offset++;
    line += '\n';

    if (arguments.length === 1 && this._linesCache[this._offset] && this._linesCache[this._offset][0] === line) {
      this._canvasStream.write(linesCache[this._offset][1]);
      return this._linesCache[this._offset][1];
    }
    if (arguments.length === 1) {
      this._linesCache[this._offset] = [line, this.write(line)];
      return this._linesCache[this._offset][1];
    }

    return this.write(line);
  },

  pin: function(pos) {
    if (pos === true || pos === undefined) return this.pin(this._offset);
    if (pos === false) return this.pin(0);
    this._offsetPin = pos;
  },

  addType: function(name, color) {
    if (name && color) {
      this._types[name] = {
        color: color,
        enabled: true
      }
    } 
    else {
      this.log('error', 'Problem with addType method call');
    }
  },

  enableType: function(type) {
    if (!this._types[type]) {
      this._types[type] = {
        color: "blue",
        enabled: true
      };
    } 
    else {
      this._types[type].enabled = true;
    }
  },


  disableType: function(type) {
    this._types[type].enabled = false;
  },


  log: function(type, message, value) {
    if (this._types[type] && this._types[type].enabled) {
      if (!value) {
        if (_.isObject(message) && !(message instanceof Date)) {
          this.line("{" + this._types[type].color + ": [" + type + "]}");
          console.log(util.inspect(message, false, null));
        } 
        else {
          this.line("{" + this._types[type].color + ": [" + type + "]}{white: " + message + "}");
        }
      } 
      else {
        if (_.isObject(value) && !(value instanceof Date)) {
          this.line("{" + this._types[type].color + ": [" + type + "]}{white: " + message + "}");
          console.log(util.inspect(value, false, null));
        } 
        else {
          this.line("{" + this._types[type].color + ": [" + type + "]}{white: " + message + "} :{magenta: " + value + "}");
        }
      }
    }
  },

  rawLog: function(value) {
    this.line(value);
  }
};