
// todo
// handle errors
// use geo_options

(function(){
    "use strict";

    var Bacon = require('baconjs');
    
    var that = {};

    var watchers = [];
    
    var removeWatcher = function (watchId) {
	navigator.geolocation.clearWatch(watchId);
    };

    that.watch = function () {

	return Bacon.fromBinder( function (sink) {

	    var watchId = 
		navigator.geolocation
		.watchPosition( function (position) {
		    sink(position);
		});

	    watchers.push(watchId);

	    return function () {
		removeWatcher(watchId);
		var index = watchers.indexOf(watchId);
		watchers.splice(index, 1);
	    };
	});
    };

    that.unwatch = function () {

	watchers
	    .forEach( function (watchId) {
		removeWatcher(watchId);
	    });

	watchers = [];
    };
	
    var FL = {

	forlocation: that
    };
    
    module.exports = FL;
})();
