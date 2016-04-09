
// todo
// use local storage to persist auth token, query, and loc flag
// if logged in, change login button to user profile info 
// add footer with link to logout, privacy policy, etc
// handle a user not sharing location
// cloudflare

(function() {
    "use strict";

    var fsq = require('FoursquareSearch');
    var floc = require('Location').forlocation;
    var Bacon = require('baconjs');
    var addSections = require('slickeroo').addSections;

    var keyUpStream = $("input[type=search]")
	.asEventStream("keyup")
	.throttle(200);

    var searchStream = $("input[type=search]")
	.asEventStream("search");

    var queryStream = keyUpStream
	.merge(searchStream)
	.map( function (event) {
	    return $(event.target).val();
	})
	.toProperty("");

    var loc = $("input[type=checkbox]")
	.asEventStream("click")
	.map(".target.checked") // Bacon shorthand for props in object
	.flatMapLatest( function (checked) {
	    
	    var locEventStream;
	    if(checked) {
		locEventStream = floc.watch();
	    } else {
		locEventStream = {};
	    }
	    return locEventStream;
	})
	.toProperty({});

    // takes query term and loc to foursquare api
    Bacon.combineTemplate({
	query : queryStream,
	position : loc })
	.skipDuplicates()
	.flatMapLatest(function(input) {
	    return fsq.search(input);
	})
    	.filter(".response") // Bacon shorthand for props in object
	.onValue(function(data){
	    addSections(data.response.venues);
	});
})();
