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
          var url = "http://rawgithub.com/jaylach/" + repo + "/master/package.json";

          $http.get(url)
            .success(function(data, status) {
              $(element).html('<strong>Current:</strong> ' + data.version + '(' + data.stability + ')');
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