"use strict";

var slidesToShow = 1;
var lastUpdate = 0;
var NewSections = {

    list: [],
    timestamp: 0
};

$('.content').slick({
    "centerMode": true,
    "centerPadding": '5%',
    "infinite": true,
    "initialSlide": 1,
    "mobileFirst": true,
    "respondsTo": "window",
    "slidesToShow": slidesToShow,
    "touchThreshold": 5
});

$('.content').on('afterChange', function(event, slick, currentSlide) {

    // copy by value
    var workingCopy = Object.assign({}, NewSections);

    if(lastUpdate < workingCopy.timestamp) {

	lastUpdate = workingCopy.timestamp;
	workingCopy.list.forEach(function(item, index, array) {
	    $('.content').slick('slickAdd', "<section class='object'>" + item + "</section>");
	});
    }
});

var SlickRick = {

    addSections: function addSections(listOfObjects){

	var newSections = {
	    list: listOfObjects,
	    timestamp: Date.now()
	};
	// transactional like
	NewSections = newSections;
    }
};

module.export = SlickRick;
