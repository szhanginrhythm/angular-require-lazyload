define([], function(){

    var $controllerProvider,
        $compileProvider,
        $provide,
        $filterProvider;

    function setControllerProvider(provider) {
        $controllerProvider = provider;
    }

    function setCompileProvider(provider) {
        $compileProvider = provider;
    }

    function setProvide(provider) {
        $provide = provider;
    }

    function setFilterProvider(provider) {
        $filterProvider = provider;
    }

    function setAllProviders(providers) {
        if (providers.controllerProvider) {
            $controllerProvider = providers.controllerProvider;
        }
        if (providers.compileProvider) {
            $compileProvider = providers.compileProvider;
        }
        if (providers.provide) {
            $provide = providers.provide;
        }
        if (providers.filterProvider) {
            $filterProvider = providers.filterProvider;
        }
    }

    function registerFactory(factory) {
        if (!$provide) {
            throw new Error('$provide has not been set');
        }
        $provide.factory.apply(null, factory);
    }

    function registerFilter(filter) {
        if (!$filterProvider) {
            throw new Error('$filterProvider has not been set');
        }
        $filterProvider.register.apply(null, filter);
    }

    function registerDirective(directive) {
        if (!$compileProvider) {
            throw new Error('$compileProvider has not been set');
        }
        $compileProvider.directive.apply(null, directive);
    }

    function registerController(controller) {
        if (!$controllerProvider) {
            throw new Error('$controllerProvider has not been set');
        }
        $controllerProvider.register.apply(null, controller);
    }

    function getResolveRoute(settingObj) {
        var settings = {
            templateUrl:'',
            controllerName: '',
            controllerFile: '',
            serviceFiles: [],
            directiveFiles: [],
            filterFiles: []
        };

        $.extend(settings, settingObj);

        if (!settings.templateUrl || !settings.controllerName || !settings.controllerFile) {
            throw new Error('config.getResolveRoute parameter error, lack of one or more following require settings: templateUrl, controllerName, controllerFile.');
        }

        var resolveConfig = {};

        resolveConfig.templateUrl = settings.templateUrl;

        resolveConfig.controller = settings.controllerName;

        resolveConfig.resolve = {
            delay: function($q, $rootScope) {
                var defer = $q.defer(),
                    allDps = [],
                    svcLength = settings.serviceFiles.length,
                    dirLength = settings.directiveFiles.length,
                    fltLength = settings.filterFiles.length;

                allDps = allDps.concat(settings.serviceFiles, settings.directiveFiles, settings.filterFiles, settings.controllerFile);

                require(allDps, function() {
                    //put arguments in one loop because arguments is actually not an array even we can use it like arguments[index].
                    //We want to pass argument objects in register functions.
                    angular.forEach(arguments, function(argument, index){
                        if (index < svcLength) {
                            registerFactory(argument);
                        } else if (index >= svcLength && index < svcLength+dirLength) {
                            registerDirective(argument);
                        } else if (index >= svcLength+dirLength && index < svcLength+dirLength+fltLength) {
                            registerFilter(argument);
                        } else {
                            registerController(argument);
                        }
                    });

                    defer.resolve();
                    $rootScope.$apply();
                });

                return defer.promise;
            }
        }

        return resolveConfig;
    }

    return {
        setControllerProvider: setControllerProvider,
        setCompileProvider: setCompileProvider,
        setFilterProvider: setFilterProvider,
        setProvide: setProvide,
        setAllProviders: setAllProviders,
        registerFactory: registerFactory,
        registerFilter: registerFilter,
        registerDirective: registerDirective,
        registerController: registerController,
        getResolveRoute: getResolveRoute
    }
});