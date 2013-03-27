'use strict';

define([], function(){
    return ['version', function(version) {
        return function(scope, elm, attrs) {
            elm.text(version);
        };
    }];
});