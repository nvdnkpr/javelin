(function() {
  define(['directives/baseDirective'], function(baseDirective) {
    var directiveName = 'cgNpmVersion';
    
    /*
     *  NpmVersionDirective
     */
    var NpmVersionDirective = function($http) {
      return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          var repo = attrs['repo'];
          var url = "https://raw.github.com/jaylach/" + repo + "/master/package.json";

          $http.get(url)
            .success(function(data, status) {
              $(element).html('<string>Current:</strong> ' + data);
            })
            .error(function(data, status) {
              console.log(data);
            });
        } 
      }
    };

    // Minification-safe injection
    NpmVersionDirective.$inject = [ '$http' ]

    // Register our directive
    baseDirective.directive(directiveName, NpmVersionDirective);
  });
})();