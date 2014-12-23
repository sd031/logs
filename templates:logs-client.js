this.Logger = {

  _types: {
    error: {
      enabled: true
    },
    debug: {
      enabled: false
    }
  },

  addType: function(name) {
    if (name) {
      this._types[name] = {
        enabled: true
      }
    } else {
      this.log('error', 'Problem with addType method call');
      return false;
    }
  },

  enableType: function(type) {
    if (!this._types[type]) {
      return this._types[type] = {
        enabled: true
      };
    } else {
      return this._types[type].enabled = true;
    }
  },


  disableType: function(type) {
    return this._types[type].enabled = false;
  },


  log: function(type, message, value) {
    if (this._types[type] && this._types[type].enabled) {
      if (!value) {
        console.log(type + " : " + message);
      } else {
        console.log(type + " : " + message  + " : " + value);
      }
    }
  }
  
};