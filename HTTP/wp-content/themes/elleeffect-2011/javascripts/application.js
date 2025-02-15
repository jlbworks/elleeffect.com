// (function ($) {
// 	// VERTICALLY ALIGN FUNCTION
// 	$.fn.vAlign = function() {
// 		return this.each(function(i){
// 	
// 			
// 	
// 			var ah = $(this).height();
// 			var ph = $(this).parent().height();
// 			var mh = (ph - ah) / 2;
// 			$(this).css('margin-top', mh);
// 			$(this).css('margin-bottom', "-" + mh);
// 			
// 			console.log('class:', $(this).attr('class'));
// 			console.log('this.height:', $(this).height());
// 			console.log('parent.height:', $(this).parent().height());
// 			console.log('parent.parent.height:', $(this).parent().parent().height());
// 			console.log('parent.parent.parent.height:', $(this).parent().parent().parent().height());
// 			console.log('parent.parent.parent.parent.height:', $(this).parent().parent().parent().parent().height());
// 		});
// 	};
// })(jQuery);

$.fn.vCenter = function() {
	return this.each(function(i){
		var h = $(this).height();
		var oh = $(this).outerHeight();
		var mt = (h + (oh - h)) / 2;
		$(this).css("margin-top", "-" + mt + "px");
		$(this).css("top", "50%");
		$(this).css("position", "absolute");	
	});	
};
$.fn.hCenter = function() {
	return this.each(function(i){
		var w = $(this).width();
		var ow = $(this).outerWidth();	
		var ml = (w + (ow - w)) / 2;	
		$(this).css("margin-left", "-" + ml + "px");
		$(this).css("left", "50%");
		$(this).css("position", "absolute");
	});
};
$.fn.wait = function(time, type) {
    time = time || 1000;
    type = type || "fx";
    return this.queue(type, function() {
        var self = this;
        setTimeout(function() {
            $(self).dequeue();
        }, time);
    });
};

$(document).ready(function() {
	
	// Apply a full size bg to the document if there is one assigned to the body.
	var bg = $('body').css('background-image').replace(/^url|[\(\)]/g, '');
	$('body').css('background-image', 'none');
	$.backstretch(bg, {speed: 800});
	
	
	// On info-page pages, h and v center the post. (does it on page resize, in case the page does resize)
	$('body.info-page, body.splash-page').resize(function(event) {
		var w = parseInt($('.post').css('position', 'absolute').width(), 10);
		$('.post').css('position', 'relative').width(w + 10).vCenter().hCenter();
	}).resize();
	var $body = $('body.info-page, body.splash-page, body.gallery-view-page').resize(function(event) {
		var w = 0;
        // $('#header > *, #header .menu').not('#access').each(function(index) {
		$('#header > *, #header .menu').not('#access').each(function(index) {
			if ($(this).css('display') != "none")
			{
    			console.log('adding width', $(this).outerWidth(), this, $(this).css('display'));
                w += $(this).outerWidth();
			}
		});
        var $header = $('#header');
        
        // w = $header.width();
        
        // console.log("header width: " , $('#header').width(), w);
        
        // $('#header').hCenter();
        $('#header').width(w+50).hCenter();
        
	});
	
	setTimeout(function(){ $body.resize(); }, 10);

	// Apply classnames to navigation. WP doesn't by default give us the permalink of the pages as a class,
	// so we'll add it here. 
	$('#access .menu a').each(function(index) {
	  $(this).add($(this).parent()).addClass($(this).text().dasherize().toLowerCase());
	});
	
	// If the post has an image add a class to its container.
	$('.post img').parents('.post').addClass('has-image');
	
    // // // // // // // // // // // // // // // // 
    // Splash page
    // // // // // // // // // // // // // // // // 
    
    $('body.splash-page #body img').vCenter().hCenter();
    
    // // // // // // // // // // // // // // // // 
    // Gallery List page
    // // // // // // // // // // // // // // // // 
    
    // $('body.gallery-list-page #text-block').prepend($('#header'));
    
    var text_block = $('<div />');
    var text_block_position = $('<li />');

    $('body.gallery-list-page').each(function(index) {
        text_block.append($('#header'));
        text_block.append($('.post'));
        $('#body').prepend(text_block);
        $('#menu-block-gallery-nav').append(text_block_position);
    });
    
    $('body.gallery-list-page').resize(function(event) {
        text_block.css('position', 'absolute');
        var offset = text_block_position.offset();
        text_block.css('left', offset.left);
        text_block.css('top', offset.top);
	}).resize();
    
    $('#body .block-gallery-nav .menu-item').hover(function() {
        
        $('a', this).first().animate({opacity:0.3}, 300);
        $('li.sub-menu-item a', this).fadeIn(400);
        
    }, function() {
        
        $('a', this).first().animate({opacity:1}, 100);
        $('li.sub-menu-item a', this).fadeOut('fast');

    }).each(function(index) {
        
        $('li.sub-menu-item a', this).fadeOut(0);
        
    });;
	
	// // // // // // // // // // // // // // // // 
	// Gallery VIEW page
	// // // // // // // // // // // // // // // // 
	
	if (typeof(window['swfobject']) != "undefined") {
	    var params = {
	        scale: 'noscale',
	        align: 'tl',
	        wmode: 'transparent',
            bgcolor: '#ffffff'
	    };
	    var flashvars = {
	        xmlDataPath: GALLERIES_PATH
	    };
	    
    	swfobject.embedSWF(THEME_ROOT + "/swf/elleviewer.swf", "elleviewer", "100%", "100%", "9.0.0", "expressInstall.swf", flashvars, params);
	}

    // on resize, set the size of the swf
	$('body.gallery-view-page').resize(function(event) {
	    
	    var h = $(window).height() - $('#header').height();
        // console.log(' >> resize. avail height: ', h)
        $('#elleviewer-container').height(h);
	}).resize();
	
});
