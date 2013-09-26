require.config({
  baseUrl: 'scripts',
  paths: {
    /* Libs */
    angular: 'https://ajax.googleapis.com/ajax/libs/angularjs/1.0.8/angular.min',
    bootstrap: 'http://netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min',    
    jquery: 'http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min',
    /* Application */
    app: 'app/app'
  },
  shim: {
    angular: {
      exports: 'angular',
      deps: [ 'jquery' ]
    },
    bootstrap: [ 'jquery' ],
    jquery: {
      exports: '$'
    }
  }
});

require([ 'angular', 'jquery', 'app' ], function(angular, $) {
  angular.bootstrap(document, [ 'app' ]);

  var $win = $(window);
  var $nav = $('.navbar');
  $win.scroll(function() {
    if ( $win.scrollTop() > ($nav.offset().top + 70) ) {
      $nav.addClass('navbar-fixed-top navbar-inverse');
    }
    if ( $win.scrollTop() < 25 ) {
      $nav.removeClass('navbar-fixed-top navbar-inverse');
    }
  });
});