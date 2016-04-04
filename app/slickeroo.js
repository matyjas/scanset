"use strict";

$(document).ready(function(){
    $('.content').slick({
	"centerMode": true,
	"centerPadding": '5%',
	"infinite": true,
	"initialSlide": 1,
	"mobileFirst": true,
	"respondsTo": "window",
	"slidesToShow": 1
    });

    $('button#addSection').click(function(e){
	var now = new Date();
	var section = '<section class="object">' + now.toUTCString() +'</section>';
	e.preventDefault();
	$('.content').slick('slickAdd', "<p>yeaah</p>");
    });
});

