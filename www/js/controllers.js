angular.module('app.controllers', [])

.controller('HomeNotaController', function($scope,$state,notaService,$ionicLoading, $ionicPopover, $ionicPopup){

  $scope.allNotas = function () {
    notaService.obterNotas().then(function (dados) {
      $scope.notas = dados;
    }).catch(function (erro) {
      console.log(erro);
    });
  };


  $scope.pesquisaNotas = function() {
     notaService.searchNotas($scope.valor).then(function (dados){
      $scope.notas = dados;
    }).catch(function(erro){
      console.log(erro);
    })

  }

  $scope.openNota = function (id) {
    $state.go("editNota", { "id": id });
  }

  $scope.allNotas();

})
.controller('ManterNotaController', function($scope,$state,notaService,$ionicLoading, $ionicPopover, $ionicPopup, $stateParams){
  $scope.nota = $stateParams.id ? {} : {status: "Ativa", tipo: "publica"};
 
  if ($stateParams.id) {
      notaService.getNota($stateParams.id).then(function (dados) {
        $scope.nota = dados;
      })
      .catch(function (erro) {
        console.log(erro);
      });
  }

  $scope.salvar = function () {
    _loanding();
    $scope.nota.status = $scope.nota.status.toLowerCase();
    notaService.salvarNota($scope.nota).then(function (dados) {
      $ionicLoading.hide();
      $scope.nota = {};
      $scope.showAlert(dados.msg);
      $state.go("home");
    })
      .catch(function (erro) {
        $ionicLoading.hide();
        console.log(erro);
      });
  };

 $scope.showConfirm = function() {  
     var confirmPopup = $ionicPopup.confirm({
       title: 'Deletar',
       template: 'Deseja realmente excluir essa nota?',
       cancelText: 'Cancelar',
     });
     confirmPopup.then(function(res) {
       if(res) {
         $scope.deletaNota($scope.nota.id);
       } else {
       }
     });
   }

 $scope.deletaNota = function (id) {
   notaService.deleta(id).then(function (dados) {
     $ionicLoading.hide();
     $scope.nota = {};
      $scope.showAlert("Nota deletada com sucesso!");
     $state.go("home");
   })
     .catch(function (erro) {
       $ionicLoading.hide();
       console.log(erro);
     });
 }

  $scope.showAlert = function(texto) { 
      var alertPopup = $ionicPopup.alert({
         title: 'Aviso',
         template: texto
      });

      alertPopup.then(function(res) {
      });
  };

  $scope.mudaStatus = function (status) {
    $scope.nota.status = status;
    $scope.popover.hide();
  }

  $scope.mudaTipo = function (tipo) {
    $scope.nota.tipo = tipo;
  }

  function _loanding() {
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
  }

  $ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope,
  }).then(function (popover) {
    $scope.popover = popover;
  });


})
