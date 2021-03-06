var vm = require('vm');

var assert = require('assert-plus');
var _ = require('underscore');

// -----
//  Context
// -----

// Context()
var Context = function Context(data) {
  data = data || {};
  
  var keys = _.keys(data);

  var context = {};
  _.each(keys, function(key) {
    context[key] = data[key];
  });

  return context; 
}; //- Context()

// get()
Context.get = function(node, data, globals) {
  assert.object(node, 'node');
  assert.object(data, 'data');
  assert.object(globals, 'globals');

  var context = {};

  if ( globals != null ) {
    context.global = globals;
  }

  // Set our configuration
  var configs = _.where(node.body, { type: 'CONFIG' });
  context.config = _.reduce(configs, function(obj, cfg) {
    if ( node.type === 'ARRAY' ) {
      if ( cfg.config === 'named' ) {
        throw new Error('Array types must be named!');
      }
    }

    obj[cfg.config] = cfg.value;
    return obj;
  }, {});

  // Set our "this" scope
  if ( node.source != null ) {
    var nodeCtx = node.context || 'THIS';
    if ( nodeCtx === 'GLOBAL' ) {
      // Copy properties from global to here
      context.this = new Context(globals[node.source]);
    }
    else if ( nodeCtx === 'THIS' ) {
      if ( node.type === 'PROPERTY' ) {
        context.this = new Context(data);
      }
      else {
        context.this = new Context(data[node.source]);
      }
    }
  } 
  else {
    context.this = new Context(data);
  }

  // Find any scripts
  var scripts = _.where(node.body, { type: 'SCRIPT' });
  scripts = _.pluck(scripts, 'script');

  // Get our context for this VM
  var sandbox = {
    node: {
      source: node.source,
      name: node.name,
      value: context.this[node.name]
    },
    locals: context.global,
    parent: context.this,
    console: console
  };

  // Run our scripts
  _.each(scripts, function(script) {
    var result = vm.runInNewContext(script, sandbox);
    if ( result != null ) {
      context.this[node.name] = result;
    }
  });

  return context;
}; //- get()

// Exports
module.exports = Context;