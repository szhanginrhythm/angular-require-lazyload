define([
	'angular',
	'filters',
	'services',
	'directives',
	'controllers',
    'config'
	], function (angular, filters, services, directives, controllers, config) {
		'use strict';

		return angular.module('myApp',
            ['myApp.controllers', 'myApp.filters', 'myApp.services', 'myApp.directives'],
            function ($controllerProvider, $compileProvider, $provide, $filterProvider) {
            config.setAllProviders({
                controllerProvider: $controllerProvider,
                compileProvider: $compileProvider,
                provide: $provide,
                filterProvider: $filterProvider
            });
        });

});
