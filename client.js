Logger = {

  _types: {
    error: {
      enabled: true,
      color: "red"
    },
    debug: {
      enabled: false,
      color: "grey"
    }
  },

  addType: function(name, color) {
    if (name) {
      this._types[name] = {
        enabled: true,
        color: color
      }
    } 
    else {
      this.log('error', 'Problem with addType method call');
    }
  },

  enableType: function(type) {
    if (!this._types[type]) {
      this._types[type] = {
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
        log('[c="background: #f0f0f0; line-height: 20px; border-radius: 4px; padding: 2px 5px; color: ' + this._types[type].color + '"]' + type + '[c] ' + message );
      } 
      else {
        log('[c="background: #f0f0f0; line-height: 20px; border-radius: 4px; padding: 2px 5px; color: ' + this._types[type].color + '"]' + type + '[c] ' + message  + ' [c="color: grey"]:[c] [c="color: purple"]' + value + '[c]');
      }
    }
  }
};