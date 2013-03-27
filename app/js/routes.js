define(['angular', 'app', 'config'], function(angular, app, config) {
	'use strict';

	return app.config(['$routeProvider', function($routeProvider) {

//Demo to show how to get route manually registered.
//		$routeProvider.when('/view2', {
//			templateUrl: 'app/partials/partial2.html',
//			controller: 'MyCtrl2',
//            resolve: {
//                delay: function($q, $rootScope) {
//                    var defer = $q.defer();
//                    require(['controllers/myCtrl2', 'services/myService2', 'directives/version'], function() {
//                        config.registerController(arguments[0]);
//                        config.registerFactory(arguments[1]);
//                        config.registerDirective(arguments[2]);
//                        defer.resolve();
//                        $rootScope.$apply();
//                    });
//                    return defer.promise;
//                }
//            }
//		});
        $routeProvider.when('/view1',
            config.getResolveRoute({
                templateUrl:'app/partials/partial1.html',
                controllerName: 'MyCtrl1',
                controllerFile: 'controllers/myCtrl1'
            })
        );

        $routeProvider.when('/view2',
            config.getResolveRoute({
                    templateUrl:'app/partials/partial2.html',
                    controllerName: 'MyCtrl2',
                    controllerFile: 'controllers/myCtrl2',
                    serviceFiles: ['services/myService2'],
                    directiveFiles: ['directives/version'],
                    filterFiles: ['filters/interpolate']
                })
        );

		$routeProvider.otherwise({redirectTo: '/view1'});
	}]);

});