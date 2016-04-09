(function(){
    "use strict";

    var slidesToShow = 1;
    var lastUpdate = 0;
    var NewSections = {

	list: [],
	timestamp: 0
    };

    // for some reason, i dont need this
    // var $ = require('jquery');

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
	var sectionTemplate = require('templates/section');
    
	if(lastUpdate < workingCopy.timestamp) {

	    lastUpdate = workingCopy.timestamp;
	    workingCopy.list.forEach(function(item, index, array) {
		$('.content').slick('slickAdd', sectionTemplate(item));
	    });
	}
    });

    $('button#addSection').click(function(e){
	var now = new Date();
	e.preventDefault();
	SlickRick.addSections(["boom", "bap", now.toUTCString()]);
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

    module.exports = SlickRick;
})();
