define(['services/myService2'], function (myService2) {
    return ['MyCtrl2', ['$scope', 'myService2', function($scope, myService2) {
        $scope.welcomeMessage = myService2.getMsg();
    }]];
});