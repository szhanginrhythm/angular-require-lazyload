define([], function () {
    return ['MyCtrl1', ['$scope', 'version', function($scope, version) {
        $scope.scopedAppVersion = version;
    }]];
});