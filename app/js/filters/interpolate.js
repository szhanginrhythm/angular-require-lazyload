define([], function(){
    return ['interpolate', ['version', function(version){
        return function(text) {
		    return String(text).replace(/\%VERSION\%/mg, version);
        };
    }]];
});