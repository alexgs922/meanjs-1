(function () {

	angular.module('nuevo', ['ui.router', 'abFiltros', 'abComponentes', 'servicios'])
		.config(function ($stateProvider) {
			$stateProvider
				.state('nuevo', {
					url: '/nuevo',
					template: '<ab-nuevo></ab-nuevo>'
				})
		})
		.component('abNuevo', {
			templateUrl: './estados/nuevo/nuevo.html',
			controller: function (movimientosService, maestrosService) {
				var vm = this;
				vm.nuevoMovimiento = {
					esIngreso: 1,
					esGasto: 0,
					importe: 0,
					fecha: new Date()
				};

                //vm.maestros = maestros_service.categorias;
                
				// llamamos a un metodo de carga asíncrono
				maestrosService.gettingCategorias
					.then(function (result) {
						// en un futuro llegarán los datos de forma asíncrona
						vm.maestros = result.data;
					});

				// la función que invoca el usuario es también asíncrona
				vm.guardarMovimiento = function () {
					movimientosService.postingMovimiento(vm.nuevoMovimiento)
						.then(function (result) {
							// en un futuro confirmarán el guardado
							vm.nuevoMovimiento.importe = 0;
						}, function (err) {
							// avisar al usuario del error
							console.error(error);
							vm.nuevoMovimiento.importe = -9999;
						});
				}
			}
		})

}());
