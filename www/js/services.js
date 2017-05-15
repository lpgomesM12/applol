angular.module('app.services', [])
.service('notaService', function($http,$q){

  var service = {};
	var url = "http://localhost:3000/api/v1/notas";

  service.getNota = function(id){
         return $q(function(resolve,reject) {
         $http.get(url + "/" +id + ".json")
         .success(function(dados) {
           resolve(dados);
         })
         .error(function(erro){
           reject({erro});
         });
       });
   };

 service.obterNotas = function(){
         return $q(function(resolve,reject) {
         $http.get(url + ".json")
         .success(function(dados) {
           resolve(dados);
         })
         .error(function(erro){
           reject({erro});
         });
       });
   };
   
  service.searchNotas = function(valor){
         var params = {q: valor}
         return $q(function(resolve,reject) {
         $http.get(url + ".json", {params})
         .success(function(dados) {
           resolve(dados);
         })
         .error(function(erro){
           reject({erro});
         });
       });
   };


 service.salvarNota = function (nota) { 

   if (nota.id) {
     return $q(function (resolve, reject) {
       $http.put(url + "/" + nota.id + ".json", nota)
         .success(function (dados) {
           resolve(dados);
         })
         .error(function (erro) {
           reject({ erro });
         });
     }
     );

   } else {

     return $q(function (resolve, reject) {
       $http.post(url + ".json", nota)
         .success(function (dados) {
           resolve(dados);
         })
         .error(function (erro) {
           reject({ erro });
         });
       }
     );
    }
  };

 service.deleta = function(id){
         return $q(function(resolve,reject) {
         $http.delete(url + "/" +id + ".json")
         .success(function(dados) {
           resolve(dados);
         })
         .error(function(erro){
           reject({erro});
         });
       });
   };


return service;


});
