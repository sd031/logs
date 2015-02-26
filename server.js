var clivas = Npm.require('clivas')
      util = Npm.require('util');

this.Logger = {

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
        if (_.isObject(message)) {
          clivas.line("{" + this._types[type].color + ": [" + type + "]}");
          console.log(message)
        } 
        else {
          clivas.line("{" + this._types[type].color + ": [" + type + "]}{white: " + message + "}");
        }
      } 
      else {
        if (_.isObject(value)) {
          clivas.line("{" + this._types[type].color + ": [" + type + "]}{white: " + message + "}");
          console.log(value);
        } 
        else {
          clivas.line("{" + this._types[type].color + ": [" + type + "]}{white: " + message + "} :{magenta: " + value + "}");
        }
      }
    }
  }

};