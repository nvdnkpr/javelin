(function() {
  define(function(require) {
    var angular = require('angular');

    // Require modules
    require('directives/baseDirective');
    require('directives/npmVersionDirective');

    return angular.module('app', [ 'app/directives' ]);
  });
})();