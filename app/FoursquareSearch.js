
// todos
// use URL API to rewrite URL without auth token
// save auth token to local storage
// use explore API as well as search

(function(){
    "use strict";

    var Bacon = require('baconjs');
    
    function foursquareAuth (spec) {

	var secrets = require('secrets');
	
	// the root of our hierarchy
	var that = spec;

	var authUrlTemplate = require('templates/fsqAuthUrl');

	// for userless access
	that.client_id = secrets.FSQ_CLIENT_ID;
	that.client_secret = secrets.FSQ_CLIENT_SECRET;

	// or maybe there is an OAuth token laying around somewhere
	that.oauth_token = document.URL.split("#access_token=")[1];    

	that.current_url = document.URL;

	$("#foursquare-controls").on('click', function (event) {
	    document.location = authUrlTemplate(that);
	});

	return that;
    }

    var positionToLL = function (position) {
	return position.coords.latitude.toString()
	    .concat(",", position.coords.longitude.toString());
    };
    
    var FSQ = {
	
	search: function search(params) {

	    var that = foursquareAuth({});

	    var venueLimit = 5;
		
	    var returns;

	    var urlTemplate = require('templates/fsqSearchUrl'); 

	    params.limit = venueLimit;

	    if (that.oauth_token) {

		params.hasOauthToken = true;
		params.oauth_token = that.oauth_token;

	    } else {

		params.client_id = that.client_id;
		params.client_secret = that.client_secret;
	    }

	    if (("query" in params) && 
		(params.query.trim().length > 0)) {
		params.hasQuery = true;
	    }

	    if ("ll" in params) {
		params.hasLatLong = true;
		params.intent = "checkin";
	    } else if (("position" in params) &&
		       ("coords" in params.position)) {
		params.hasLatLong = true;
		params.intent = "checkin";
		params.ll = positionToLL(params.position);
	    } else {
		params.intent = "global";
	    }

	    if (params.hasQuery || params.hasLatLong) {
		returns = Bacon.fromPromise($.ajax(
		    urlTemplate(params)));
	    } else {
		returns = Bacon.once({});
	    }

	    return returns;
	},

	checkin: function (venueId) {

	    var that = foursquareAuth({});	
	    
	    var checkinUrlTemplate = require('templates/fsqCheckin');

	    var checkinUrl = checkinUrlTemplate(that);
	    
	    $.ajax({
		type: "POST",
		url : checkinUrl,
		data : { 
		    "venueId" : venueId,
		    "oauth_token" : that.oauth_token
		},
		success: function (data, textStatus, jqXHR) { console.log (data); }
	    });
	}
    };
    
    module.exports = FSQ;
})();
