'use strict';

var Module = require('module');
var r = Module.prototype.require;

function blacklist(config) {

  var logger = config.logger || console.log;

  function requireBlacklist(path) {

    var path = arguments[0];

    if (config && config.modules) {
      var rule = config.modules[path];
      switch(rule) {
        case 2:
          var err = new Error('Access to package ' + path + ' is restricted');
          err.name = 'require-blacklist';
          throw err;
        case 1:
          logger('Access to package ' + path + ' was attempted');
      }
    }

    return r.apply(this, arguments);
  };

  if (config.patchGlobal) {
    Module.prototype.require = requireBlacklist;
  }

  return requireBlacklist;
}

module.exports = blacklist;
