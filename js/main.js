document.createElement("section");
document.createElement("header");
document.createElement("footer");
document.createElement("article");
document.createElement("aside");
document.createElement("nav");



var windowheight, windowwidth;




// Progress bar plugin
(function ($) {
	
	
	$.fn.loading = function () {
		var DEFAULTS = {
			backgroundColor: '#b3cef6',
			progressColor: '#4b86db',
			percent: 0,
			duration: 1000
		};	
		
		$(this).each(function () {
			var $target  = $(this);

			var opts = {
			backgroundColor: $target.data('color') ? $target.data('color').split(',')[0] : DEFAULTS.backgroundColor,
			progressColor: $target.data('color') ? $target.data('color').split(',')[1] : DEFAULTS.progressColor,
			percent: $target.data('percent') ? $target.data('percent') : DEFAULTS.percent,
			duration: $target.data('duration') ? $target.data('duration') : DEFAULTS.duration
			};
			// console.log(opts);
	
			$target.append('<div class="background"></div><div class="rotate"></div><div class="left"></div><div class="right"></div><div class=""><span>' + opts.percent + '</span></div>');
	
			$target.find('.background').css('background-color', opts.backgroundColor);
			$target.find('.left').css('background-color', opts.backgroundColor);
			$target.find('.rotate').css('background-color', opts.progressColor);
			$target.find('.right').css('background-color', opts.progressColor);
	
			var $rotate = $target.find('.rotate');
			setTimeout(function () {	
				$rotate.css({
					'transition': 'transform ' + opts.duration + 'ms linear',
					'transform': 'rotate(' + opts.percent * 3.6 + 'deg)'
				});
			},1);		

			if (opts.percent > 50) {
				var animationRight = 'toggle ' + (opts.duration / opts.percent * 50) + 'ms step-end';
				var animationLeft = 'toggle ' + (opts.duration / opts.percent * 50) + 'ms step-start';  
				$target.find('.right').css({
					animation: animationRight,
					opacity: 1
				});
				$target.find('.left').css({
					animation: animationLeft,
					opacity: 0
				});
			} 
		});
	}
})(jQuery);

$(function(){
	
	var bouncing = $("#animatebounce");
     bounce();
	function bounce() {
		bouncing.animate({
		top: "+=3"
		}, 500, function() {
		bouncing.animate({
		top: "-=3"
		}, 500, function() {
		bounce();
		})
		});
	}
	
	 function keepFading($obj) {
        $obj.fadeToggle(400, function () {
            keepFading($obj);
        });
    }
    keepFading($(".bulbraise"));
    windowwidth = $(window).width();
    /* Menu */
    $('.menu').on('click', function(){
	 
	
		if($(this).hasClass('active')){
			
            $('nav').animate({left:'-320px'},500);
            $('.overlay').fadeOut();
			$(this).removeClass('active')
	
		}
		else{
			
            $('nav').animate({left:'0'},500);
			$(this).addClass('active');
            $('.overlay').fadeIn();
        }
	
	});
    
    /* /Menu */
    if(windowwidth >= 768) {
      $(".progress-bar").loading();
    }
    /* Card detail Carousel */
    $("#carddetails-owl-demo").owlCarousel({
 
     
      autoplay:true,
    autoplayTimeout:4000,
    autoplayHoverPause:true,
      autoplaySpeed: 1000,
       loop:true,
    margin:10,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
 
  });
    /* /Card detail Carousel */
    
    /* leaderboard Carousel */
    $("#leaderboard-owl-demo").owlCarousel({
 
     
      /*autoplay:true,
    autoplayTimeout:4000,
    autoplayHoverPause:true,
      autoplaySpeed: 1000,*/
       loop:true,
    nav:true,
        margin:0,
    responsive:{
        0:{
            items:1
        },
        1024:{
            items:2,
            margin:2
        },
        1280:{
            items:4,
            loop: false,
			nav: false,
			pullDrag: false
        }
    }
 
  });
    
    var carousel = $('#leaderboard-owl-demo').data('owlCarousel');
            carousel._width = $('#leaderboard-owl-demo').width();
            carousel.invalidate('width');
            carousel.refresh();
    /* /leaderboard Carousel */
    
    
    
    valuemeter();
    tabs();
    
    
});

function tabs() {
 
         
    $("ul.tab li").click(function(){
       
	 var x = $(this).index();
		$(this).parents(".my_managerpoints").find(".tabdetail").eq(x).show().siblings(".tabdetail").hide();
		$(this).addClass("selected").siblings("ul.tab li").removeClass("selected");
			
  });
     
    $('ul.tab li').eq(0).click();
    
};

/* Value meter */
function valuemeter(){
    $(".valuemeter h2").click(function(){
        
        if(windowwidth < 768) {
        var _this = $(this);
            if($(_this).hasClass("active"))
				{
					$(_this).parent().find('.accorddetail').slideUp();
                    $(_this).removeClass("active");
				}
				else{
					$(_this).parent().find('.accorddetail').slideDown();
					$(_this).addClass('active');
                    setTimeout(function(){
                        
						$(".progress-bar").loading();
					},1000)
					
				}
        }
});
}
    
    /* /Value meter */

$(window).resize(function () {
    if (this.resizeTO) clearTimeout(this.resizeTO);
    this.resizeTO = setTimeout(function () {
        $(this).trigger('resizeEnd');
    }, 600);
});



$(window).bind('resizeEnd', function () {
    windowwidth = $(window).width();
    if (windowwidth >= 768) {
        $(".progress-bar").loading();
		 $(".accorddetail").removeAttr("style");
		 $('.accorddetail').show();
    }
    /*else{
       $('.accorddetail').hide();
    }*/
    
     var carousel = $('#leaderboard-owl-demo').data('owlCarousel');
            carousel._width = $('#leaderboard-owl-demo').width();
            carousel.invalidate('width');
            carousel.refresh();
});


