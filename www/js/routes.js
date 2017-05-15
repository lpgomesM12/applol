angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {


 $stateProvider
     .state('home', {
         url: '/home',
         cache: false,
         templateUrl: 'templates/home.html',
         controller: 'HomeNotaController'
     })
     .state('nota', {
         url: '/nota',
         templateUrl: 'templates/note.html',
         controller: 'ManterNotaController'
     })
     .state('editNota', {
         url: '/nota/:id',
         templateUrl: 'templates/note.html',
         controller: 'ManterNotaController'
     })

 $urlRouterProvider.otherwise('/home');

});
