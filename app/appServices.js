myApp.service("routingService", function() {
	
	this.setView = function(routing, vm)
	
	{
	    if(routing == "#/")
	       {
	        vm.showHomeTitlePage = true;
	        vm.titlePage = false;
	        vm.showComingSoon = false;
	        vm.showSection = true;
	        vm.show404Error = false;
	        vm.showLogo = true;
	        vm.showSubscribe = true;
	        vm.showFooter = true;
	       }
	       else if (routing == "#/comingSoon")
	       {
	        vm.showHomeTitlePage = false;
	        vm.titlePage = false;
	        vm.showComingSoon = true;
	        vm.showSection = false;
	        vm.show404Error = false;
	        vm.showLogo = false;
	        vm.showSubscribe = false;
	        vm.showFooter = false;
	       }
	       else if (routing == "#/404Error")
	       {
	        vm.showHomeTitlePage = false;
	        vm.titlePage = false;
	        vm.showComingSoon = false;
	        vm.showSection = false;
	        vm.show404Error = true;
	        vm.showLogo = false;
	        vm.showSubscribe = false;
	        vm.showFooter = false;
	       }
	       else if (routing == "#/shopCart" || routing == "#/checkout")
	       {
	        vm.showHomeTitlePage = false;
	        vm.titlePage = false;
	        vm.showComingSoon = false;
	        vm.showSection = true;
	        vm.show404Error = false;
	        vm.showLogo = true;
	        vm.showSubscribe = true;
	        vm.showFooter = true;
	       }
	       else if (routing == "#/history")
	       {
	        vm.showHomeTitlePage = false;
	        vm.titlePage = false;
	        vm.showComingSoon = false;
	        vm.showSection = true;
	        vm.show404Error = false;
	        vm.showLogo = false;
	        vm.showSubscribe = false;
	        vm.showFooter = true;
	       }
	       else
	       {
	        vm.showHomeTitlePage = false;
	        vm.titlePage = false;
	        vm.showComingSoon = false;
	        vm.showSection = true;
	        vm.show404Error = false;
	        vm.showLogo = true;
	        vm.showSubscribe = false;
	        vm.showFooter = true;
	       }
	}

});



myApp.service("initService", function() {

	this.initLoading = function($timeout) {
     /*[ Load page ]
        ===========================================================*/
        try {
            $(".animsition").animsition({
                inClass: 'fade-in',
                outClass: 'fade-out',
                inDuration: 1500,
                outDuration: 800,
                linkElement: '.animsition-link',
                loading: true,
                loadingParentElement: 'html',
                loadingClass: 'animsition-loading-1',
                loadingInner: '<div class="loader05"></div>',
                timeout: false,
                timeoutCountdown: 5000,
                onLoadEvent: true,
                browser: [ 'animation-duration', '-webkit-animation-duration'],
                overlay : false,
                overlayClass : 'animsition-overlay-slide',
                overlayParentElement : 'html',
                transition: function(url){ window.location.href = url; }
            });
        } catch(er) {console.log(er);}

        $timeout( function(){
            $(".animsition-loading-1").remove();
        }, 1000);
	}


	this.initSlick = function() {


	        /*==================================================================
	        [ Slick2 ]*/
	        $('.wrap-slick2').each(function(){
	            $(this).find('.slick2').slick({
	              slidesToShow: 1,
	              slidesToScroll: 1,
	              infinite: false,
	              autoplay: false,
	              autoplaySpeed: 6000,
	              arrows: true,
	              appendArrows: $(this).find('.wrap-arrow-slick2'),
	              prevArrow:'<button class="arrow-slick2 prev-slick2"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
	              nextArrow:'<button class="arrow-slick2 next-slick2"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',  
	          });
	        });
	   
	        /*==================================================================
	        [ Slick3 ]*/
	        $('.wrap-slick3').each(function(){
	            var wrapSlick3 = $(this);
	            var slick3 = $(this).find('.slick3');

	            var delay = 100;
	            var itemSlick3 = $(slick3).find('.item-slick3');
	            var layerSlick3 = $(slick3).find('.layer-slick3');
	            var actionSlick3 = [];
	            

	            $(slick3).on('init', function(){
	                var layerCurrentItem = $(itemSlick3[0]).find('.layer-slick3');

	                for(var i=0; i<actionSlick3.length; i++) {
	                    clearTimeout(actionSlick3[i]);
	                }

	                $(layerSlick3).each(function(){
	                    $(this).removeClass($(this).data('appear') + ' visible-true');
	                });

	                for(var i=0; i<layerCurrentItem.length; i++) {

	                    if($(layerCurrentItem[i]).data('delay') != null) {
	                      delay = $(layerCurrentItem[i]).data('delay');
	                    }

	                    actionSlick3[i] = setTimeout(function(index) {
	                        $(layerCurrentItem[index]).addClass($(layerCurrentItem[index]).data('appear') + ' visible-true');
	                    },delay,i); 
	                }        
	            });


	            var showDot = false;
	            if($(wrapSlick3).find('.wrap-slick3-dots').length > 0) {
	                showDot = true;
	            }

	            var showArrow = false;
	            if($(wrapSlick3).find('.wrap-slick3-arrows').length > 0) {
	                showArrow = true;
	            }

	            $(wrapSlick3).find('.slick3').slick({
	                pauseOnFocus: false,
	                pauseOnHover: false,
	                slidesToShow: 1,
	                slidesToScroll: 1,
	                fade: false,
	                infinite: false,
	                autoplay: true,
	                autoplaySpeed: 6000,
	                arrows: showArrow,
	                appendArrows: $(wrapSlick3).find('.wrap-slick3-arrows'),
	                prevArrow: $(wrapSlick3).find('.prev-slick3'),
	                nextArrow: $(wrapSlick3).find('.next-slick3'),
	                dots: showDot,
	                appendDots: $(wrapSlick3).find('.wrap-slick3-dots'),
	                dotsClass:'slick3-dots',
	                customPaging: function(slick, index) {
	                    return '<div></div>';
	                },
	            });

	            $(slick3).on('afterChange', function(event, slick, currentSlide){ 

	                var layerCurrentItem = $(itemSlick3[currentSlide]).find('.layer-slick3');

	                for(var i=0; i<actionSlick3.length; i++) {
	                    clearTimeout(actionSlick3[i]);
	                }

	                $(layerSlick3).each(function(){
	                    $(this).removeClass($(this).data('appear') + ' visible-true');
	                });

	                for(var i=0; i<layerCurrentItem.length; i++) {

	                    if($(layerCurrentItem[i]).data('delay') != null) {
	                      delay = $(layerCurrentItem[i]).data('delay');
	                    }

	                    actionSlick3[i] = setTimeout(function(index) {
	                        $(layerCurrentItem[index]).addClass($(layerCurrentItem[index]).data('appear') + ' visible-true');
	                    },delay,i); 
	                }
	                         
	            });

	        });

	         /*==================================================================
	        [ Slick4 ]*/
	        $('.wrap-slick4').each(function(){
	            var wrapSlick4 = $(this);
	            var slick4 = $(this).find('.slick4');
	    

	            var showDot = false;
	            if($(wrapSlick4).find('.wrap-dot-slick4').length > 0) {
	                showDot = true;
	            }

	            var showArrow = false;
	            if($(wrapSlick4).find('.wrap-arrow-slick4').length > 0) {
	                showArrow = true;
	            }

	            $(wrapSlick4).find('.slick4').slick({
	                pauseOnFocus: false,
	                pauseOnHover: false,
	                slidesToShow: 3,
	                slidesToScroll: 3,
	                fade: false,
	                infinite: false,
	                autoplay: false,
	                autoplaySpeed: 6000,
	                arrows: showArrow,
	                appendArrows: $(wrapSlick4).find('.wrap-arrow-slick4'),
	                prevArrow: $(wrapSlick4).find('.prev-slick4'),
	                nextArrow: $(wrapSlick4).find('.next-slick4'),
	                dots: showDot,
	                appendDots: $(wrapSlick4).find('.wrap-dot-slick4'),
	                dotsClass:'dots-slick4',
	                customPaging: function(slick, index) {
	                    return '<div></div>';
	                },
	                responsive: [
	                    {
	                      breakpoint: 1900,
	                      settings: {
	                        slidesToShow: 3,
	                        slidesToScroll: 3
	                      }
	                    },
	                    {
	                      breakpoint: 1400,
	                      settings: {
	                        slidesToShow: 2,
	                        slidesToScroll: 2
	                      }
	                    },
	                    {
	                      breakpoint: 991,
	                      settings: {
	                        slidesToShow: 3,
	                        slidesToScroll: 3
	                      }
	                    },
	                    {
	                      breakpoint: 767,
	                      settings: {
	                        slidesToShow: 2,
	                        slidesToScroll: 2
	                      }
	                    },
	                    {
	                      breakpoint: 575,
	                      settings: {
	                        slidesToShow: 1,
	                        slidesToScroll: 1
	                      }
	                    }
	                ]

	            });

	        });

	         /*==================================================================
	        [ Slick5 ]*/
	        $('.wrap-slick5').each(function(){
	            var wrapSlick = $(this);
	            var slick = $(this).find('.slick5');
	    

	            var showDot = false;
	            if($(wrapSlick).find('.wrap-dot-slick5').length > 0) {
	                showDot = true;
	            }

	            var showArrow = false;
	            if($(wrapSlick).find('.wrap-arrow-slick5').length > 0) {
	                showArrow = true;
	            }

	            $(wrapSlick).find('.slick5').slick({
	                pauseOnFocus: false,
	                pauseOnHover: false,
	                slidesToShow: 6,
	                slidesToScroll: 6,
	                fade: false,
	                infinite: false,
	                autoplay: false,
	                autoplaySpeed: 6000,
	                arrows: showArrow,
	                appendArrows: $(wrapSlick).find('.wrap-arrow-slick5'),
	                prevArrow: $(wrapSlick).find('.prev-slick5'),
	                nextArrow: $(wrapSlick).find('.next-slick5'),
	                dots: showDot,
	                appendDots: $(wrapSlick).find('.wrap-dot-slick5'),
	                dotsClass:'slick5-dots',
	                customPaging: function(slick, index) {
	                    return '<div></div>';
	                },
	                responsive: [
	                    {
	                      breakpoint: 1900,
	                      settings: {
	                        slidesToShow: 6,
	                        slidesToScroll: 6
	                      }
	                    },
	                    {
	                      breakpoint: 1680,
	                      settings: {
	                        slidesToShow: 5,
	                        slidesToScroll: 5
	                      }
	                    },
	                    {
	                      breakpoint: 1420,
	                      settings: {
	                        slidesToShow: 4,
	                        slidesToScroll: 4
	                      }
	                    },
	                    {
	                      breakpoint: 991,
	                      settings: {
	                        slidesToShow: 3,
	                        slidesToScroll: 3
	                      }
	                    },
	                    {
	                      breakpoint: 767,
	                      settings: {
	                        slidesToShow: 2,
	                        slidesToScroll: 2
	                      }
	                    },
	                    {
	                      breakpoint: 575,
	                      settings: {
	                        slidesToShow: 1,
	                        slidesToScroll: 1
	                      }
	                    }
	                ]

	            });

	        });


	        /*==================================================================
	        [ Slick6 ]*/
	        $('.wrap-slick6').each(function(){
	            var wrapSlick = $(this);
	            var slick = $(this).find('.slick6');
	    

	            var showDot = false;
	            if($(wrapSlick).find('.wrap-dot-slick6').length > 0) {
	                showDot = true;
	            }

	            var showArrow = false;
	            if($(wrapSlick).find('.wrap-arrow-slick6').length > 0) {
	                showArrow = true;
	            }

	            $(wrapSlick).find('.slick6').slick({
	                pauseOnFocus: false,
	                pauseOnHover: false,
	                slidesToShow: 3,
	                slidesToScroll: 3,
	                fade: false,
	                infinite: false,
	                autoplay: false,
	                autoplaySpeed: 6000,
	                arrows: showArrow,
	                appendArrows: $(wrapSlick).find('.wrap-arrow-slick6'),
	                prevArrow: $(wrapSlick).find('.prev-slick6'),
	                nextArrow: $(wrapSlick).find('.next-slick6'),
	                dots: showDot,
	                appendDots: $(wrapSlick).find('.wrap-dot-slick6'),
	                dotsClass:'slick6-dots',
	                customPaging: function(slick, index) {
	                    return '<div></div>';
	                },
	                responsive: [
	                    {
	                      breakpoint: 1199,
	                      settings: {
	                        slidesToShow: 2,
	                        slidesToScroll: 2
	                      }
	                    },
	                    {
	                      breakpoint: 991,
	                      settings: {
	                        slidesToShow: 2,
	                        slidesToScroll: 2
	                      }
	                    },
	                    {
	                      breakpoint: 767,
	                      settings: {
	                        slidesToShow: 3,
	                        slidesToScroll: 3
	                      }
	                    },
	                    {
	                      breakpoint: 575,
	                      settings: {
	                        slidesToShow: 2,
	                        slidesToScroll: 2
	                      }
	                    },
	                    {
	                      breakpoint: 480,
	                      settings: {
	                        slidesToShow: 1,
	                        slidesToScroll: 1
	                      }
	                    }
	                ]

	            });

	        });

	        /*==================================================================
	        [ Slick7 ]*/
	        $('.wrap-slick7').each(function(){
	            var wrapSlick = $(this);
	            var slick = $(this).find('.slick7');
	    

	            var showDot = false;
	            if($(wrapSlick).find('.wrap-dot-slick7').length > 0) {
	                showDot = true;
	            }

	            var showArrow = false;
	            if($(wrapSlick).find('.wrap-arrow-slick7').length > 0) {
	                showArrow = true;
	            }

	            $(wrapSlick).find('.slick7').slick({
	                pauseOnFocus: false,
	                pauseOnHover: false,
	                slidesToShow: 2,
	                slidesToScroll: 2,
	                fade: false,
	                infinite: false,
	                autoplay: false,
	                autoplaySpeed: 6000,
	                arrows: showArrow,
	                appendArrows: $(wrapSlick).find('.wrap-arrow-slick7'),
	                prevArrow: $(wrapSlick).find('.prev-slick7'),
	                nextArrow: $(wrapSlick).find('.next-slick7'),
	                dots: showDot,
	                appendDots: $(wrapSlick).find('.wrap-dot-slick7'),
	                dotsClass:'slick7-dots',
	                customPaging: function(slick, index) {
	                    return '<div></div>';
	                },
	                responsive: [
	                    {
	                      breakpoint: 1199,
	                      settings: {
	                        slidesToShow: 2,
	                        slidesToScroll: 2
	                      }
	                    },
	                    {
	                      breakpoint: 991,
	                      settings: {
	                        slidesToShow: 1,
	                        slidesToScroll: 1
	                      }
	                    },
	                    {
	                      breakpoint: 767,
	                      settings: {
	                        slidesToShow: 1,
	                        slidesToScroll: 1
	                      }
	                    },
	                    {
	                      breakpoint: 575,
	                      settings: {
	                        slidesToShow: 1,
	                        slidesToScroll: 1
	                      }
	                    }
	                ]

	            });

	        });

	         /*==================================================================
	        [ Slick8 ]*/
	        $('.wrap-slick8').each(function(){
	            var wrapSlick = $(this);
	            var slick = $(this).find('.slick8');
	    

	            var showDot = false;
	            if($(wrapSlick).find('.wrap-dot-slick8').length > 0) {
	                showDot = true;
	            }

	            var showArrow = false;
	            if($(wrapSlick).find('.wrap-arrow-slick8').length > 0) {
	                showArrow = true;
	            }

	            $(wrapSlick).find('.slick8').slick({
	                pauseOnFocus: false,
	                pauseOnHover: false,
	                slidesToShow: 3,
	                slidesToScroll: 3,
	                fade: false,
	                infinite: false,
	                autoplay: false,
	                autoplaySpeed: 6000,
	                arrows: showArrow,
	                appendArrows: $(wrapSlick).find('.wrap-arrow-slick8'),
	                prevArrow: $(wrapSlick).find('.prev-slick8'),
	                nextArrow: $(wrapSlick).find('.next-slick8'),
	                dots: showDot,
	                appendDots: $(wrapSlick).find('.wrap-dot-slick8'),
	                dotsClass:'slick8-dots',
	                customPaging: function(slick, index) {
	                    return '<div></div>';
	                },
	                responsive: [
	                    {
	                      breakpoint: 1199,
	                      settings: {
	                        slidesToShow: 2,
	                        slidesToScroll: 2
	                      }
	                    },
	                    {
	                      breakpoint: 991,
	                      settings: {
	                        slidesToShow: 2,
	                        slidesToScroll: 2
	                      }
	                    },
	                    {
	                      breakpoint: 767,
	                      settings: {
	                        slidesToShow: 1,
	                        slidesToScroll: 1
	                      }
	                    },
	                    {
	                      breakpoint: 575,
	                      settings: {
	                        slidesToShow: 1,
	                        slidesToScroll: 1
	                      }
	                    }
	                ]

	            });

	        });

	           /*==================================================================
	        [ Slick9 ]*/
	        $('.wrap-slick9').each(function(){
	            $(this).find('.slick9').slick({
	              slidesToShow: 4,
	              slidesToScroll: 4,
	              infinite: false,
	              autoplay: false,
	              autoplaySpeed: 6000,
	              arrows: true,
	              appendArrows: $(this).find('.wrap-arrow-slick9'),
	              prevArrow:'<button class="arrow-slick9 prev-slick9"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
	              nextArrow:'<button class="arrow-slick9 next-slick9"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',  
	              responsive: [
	                    {
	                      breakpoint: 1199,
	                      settings: {
	                        slidesToShow: 4,
	                        slidesToScroll: 4
	                      }
	                    },
	                    {
	                      breakpoint: 991,
	                      settings: {
	                        slidesToShow: 3,
	                        slidesToScroll: 3
	                      }
	                    },
	                    {
	                      breakpoint: 767,
	                      settings: {
	                        slidesToShow: 2,
	                        slidesToScroll: 2
	                      }
	                    },
	                    {
	                      breakpoint: 575,
	                      settings: {
	                        slidesToShow: 1,
	                        slidesToScroll: 1
	                      }
	                    }
	                ]
	          });
	        }, 200 );


	}

	this.initHeader = function() {
	    /*==================================================================
	        [ Fixed Header ]*/
	        try {
	            var headerDesktop = $('.container-menu-desktop');
	            var wrapMenu = $('.wrap-menu-desktop');

	            if($('.top-bar').length > 0) {
	                var posWrapHeader = $('.top-bar').height();
	            }
	            else {
	                var posWrapHeader = 0;
	            }
	            

	            if($(window).scrollTop() > posWrapHeader) {
	                $(headerDesktop).addClass('fix-menu-desktop');
	                $(wrapMenu).css('top',0); 
	            }  
	            else {
	                $(headerDesktop).removeClass('fix-menu-desktop');
	                $(wrapMenu).css('top',posWrapHeader - $(this).scrollTop()); 
	            }

	            $(window).on('scroll',function(){
	                if($(this).scrollTop() > posWrapHeader) {
	                    $(headerDesktop).addClass('fix-menu-desktop');
	                    $(wrapMenu).css('top',0); 
	                }  
	                else {
	                    $(headerDesktop).removeClass('fix-menu-desktop');
	                    $(wrapMenu).css('top',posWrapHeader - $(this).scrollTop()); 
	                } 
	            });
	        } catch(er) {console.log(er);}
	     /*==================================================================
	        [ Cart header ]*/
	        try {
	            // $('.wrap-menu-click').each(function(){
	            //     var wrapMenuClick = $(this);

	            //     $(wrapMenuClick).find('.menu-cart-click').on('click', function(e){
	            //         e.stopPropagation();

	            //        if($(this).hasClass('showed')) {
	            //            $(wrapMenuClick).find('.menu-cart-click').removeClass('show-menu-click showed');
	            //        }
	            //        else {
	            //           $(this).addClass('show-menu-click showed');
	            //        }
	            //     });

	            //     $(wrapMenuClick).find('.menu-click-child').on('click', function(e){

	            //         e.stopPropagation();

	            //     }); 
	            // });

	        //     $('#cart_header_ic').on('click', function()
	        //     {

 					   // if($('#menu-cart-ic').hasClass('showed'))
 					   // {
	        //                $('#menu-cart-ic').removeClass('show-menu-click showed');
	        //            }
	        //            else
	        //            {
	        //               $('#menu-cart-ic').addClass('show-menu-click showed');
	        //            }
	        //     });

	        //     $('#check_out_btn').on('click', function(){
	        //         $('#menu-cart-ic').removeClass('show-menu-click showed');
	        //     });

	            // $('#check_out_btn').on('click', function(){
	            //     $('.wrap-menu-click').find('.menu-cart-click').removeClass('show-menu-click showed');
	            // });

	            // $(window).on('click', function(){
	            //     $('.wrap-menu-click').find('.menu-cart-click').removeClass('show-menu-click showed');
	            // })
	        } catch(er) {console.log(er);}   

	        /*==================================================================
	        [ Menu mobile ]*/
	        try {
	            $('.btn-show-menu-mobile').on('click', function(){
	                $(this).toggleClass('is-active');
	                $('.menu-mobile').slideToggle();
	            });

	            $('.menu-mobile').on('click', function(){
	                $('.btn-show-menu-mobile').toggleClass('is-active');
	                $('.menu-mobile').slideToggle();
	            });

	            var arrowMainMenu = $('.arrow-main-menu-m');

	            for(var i=0; i<arrowMainMenu.length; i++){
	                $(arrowMainMenu[i]).on('click', function(){
	                    $(this).parent().find('.sub-menu-m').slideToggle();
	                    $(this).toggleClass('turn-arrow-main-menu-m');
	                })
	            }

	            $(window).on('resize',function(){
	                if($(window).width() >= 992){
	                    if($('.menu-mobile').css('display') === 'block') {
	                        $('.menu-mobile').css('display','none');
	                        $('.btn-show-menu-mobile').toggleClass('is-active');
	                    }

	                    $('.sub-menu-m').each(function(){
	                        if($(this).css('display') === 'block') { 
	                            $(this).css('display','none');
	                            $(arrowMainMenu).removeClass('turn-arrow-main-menu-m');
	                        }
	                    });
	                        
	                }
	            });
	        } catch(er) {console.log(er);}
	            



	       /*==================================================================
	       [ Show / hide modal search ]*/

	       try {
	            $('.js-show-modal-search').on('click', function(){
	                $('.modal-search-header').addClass('show-modal-search');
	                $(this).css('opacity','0');
	            });

	            $('.js-hide-modal-search').on('click', function(){
	                $('.modal-search-header').removeClass('show-modal-search');
	                $('.js-show-modal-search').css('opacity','1');
	            });

	            $('.input-search').on('click', function(e){
	                e.stopPropagation();
	            });
	        } catch(er) {console.log(er);}

	}

	this.initSelect = function() {
	    /*==================================================================
	        [ Select2 ]*/
	        try {
	            $(".js-select2").each(function(){
	                $(this).select2({
	                    minimumResultsForSearch: 20,
	                    dropdownParent: $(this).next('.dropDownSelect2')
	                });
	            });
	        } catch(er) {console.log(er);}

	}

	this.initRevoSlider = function() {
	/*==================================================================
	        [ Revo1 ]*/
	        var screenH1 = 0;
	        var offsetArrow1 = 0;
	        if ($(window).width() >= 992) {
	            screenH1 = $(window).height();
	            offsetArrow1 = 120;
	        }
	        else {
	            screenH1 = $(window).height() - 70;
	            offsetArrow1 = 30;
	        }

	        jQuery('#rev_slider_1').show().revolution({
	            
	            responsiveLevels: [1900, 992, 768, 576],
	            gridwidth:[1900, 992, 768, 576],
	            minHeight: screenH1,
	            delay: 7000,

	            sliderLayout: 'fullwidth',
	            spinner: 'spinner2',

	            navigation: {

	                keyboardNavigation: 'on',
	                keyboard_direction: 'horizontal',
	                onHoverStop: 'off',

	                touch: {
	 
	                    touchenabled: 'on',
	                    swipe_threshold: 75,
	                    swipe_min_touches: 1,
	                    swipe_direction: 'horizontal',
	                    drag_block_vertical: true
	             
	                },
	 
	                arrows: {
	                    enable: true,
	                    style: 'gyges',
	                    hide_onmobile: true,
	                    hide_onleave: true,
	                    left: {
	                        container: 'slider',
	                        h_align: 'left',
	                        v_align: 'center',
	                        h_offset: offsetArrow1,
	                        v_offset: 0
	                    },
	             
	                    right: {
	                        container: 'slider',
	                        h_align: 'right',
	                        v_align: 'center',
	                        h_offset: offsetArrow1,
	                        v_offset: 0
	                    }
	                },
	 
	                bullets: {
	                    enable: false,
	                    style: 'uranus',
	                    tmp: '<span class="tp-bullet-inner"></span>',
	                    hide_onleave: false,
	                    h_align: 'center',
	                    v_align: 'bottom',
	                    h_offset: 0,
	                    v_offset: 50,
	                    space: 10
	                }
	            }
	        });


	        /*==================================================================
	        [ Revo2 ]*/
	        var screenH2 = 0;
	        var offsetArrow2 = 0;
	        if ($(window).width() >= 992) {
	            screenH2 = $(window).height() - 123;
	            offsetArrow2 = 100;
	        }
	        else {
	            screenH2 = $(window).height() - 70;
	            offsetArrow2 = 20;
	        }

	        if($(window).height() < 768 && $(window).width() >= 992) {
	           screenH2 = $(window).height() - 90;
	        }

	        jQuery('#rev_slider_2').show().revolution({
	            
	            responsiveLevels: [1900, 992, 768, 576],
	            gridwidth:[1900, 992, 768, 576],
	            minHeight: screenH2,
	            delay: 7000,

	            sliderLayout: 'fullwidth',
	            spinner: 'spinner2',

	            navigation: {

	                keyboardNavigation: 'on',
	                keyboard_direction: 'horizontal',
	                onHoverStop: 'off',

	                touch: {
	 
	                    touchenabled: 'on',
	                    swipe_threshold: 75,
	                    swipe_min_touches: 1,
	                    swipe_direction: 'horizontal',
	                    drag_block_vertical: true
	             
	                },
	 
	                arrows: {
	                    enable: false,
	                    style: 'gyges',
	                    hide_onmobile: true,
	                    hide_onleave: true,
	                    left: {
	                        container: 'slider',
	                        h_align: 'left',
	                        v_align: 'center',
	                        h_offset: offsetArrow2,
	                        v_offset: 0
	                    },
	             
	                    right: {
	                        container: 'slider',
	                        h_align: 'right',
	                        v_align: 'center',
	                        h_offset: offsetArrow2,
	                        v_offset: 0
	                    }
	                },
	 
	                bullets: {
	                    enable: true,
	                    style: 'persephone',
	                    tmp: '<div class="tp-bullet-inner"></div>',
	                    hide_onleave: false,
	                    h_align: 'center',
	                    v_align: 'bottom',
	                    h_offset: 0,
	                    v_offset: 40,
	                    space: 12
	                }
	            }
	        });


	        /*==================================================================
	        [ Revo3 ]*/
	        var screenH3 = 0;
	        var offsetArrow3 = 0;
	        if ($(window).width() >= 992) {
	            screenH3 = $(window).height();
	            offsetArrow3 = 120;
	        }
	        else {
	            screenH3 = $(window).height() - 70;
	            offsetArrow3 = 30;
	        }

	        jQuery('#rev_slider_3').show().revolution({
	            
	            responsiveLevels: [1200, 992, 768, 576],
	            gridwidth:[1200, 992, 768, 576],
	            minHeight: screenH3,
	            delay: 7000,

	            sliderLayout: 'fullwidth',
	            spinner: 'spinner2',

	            navigation: {

	                keyboardNavigation: 'on',
	                keyboard_direction: 'horizontal',
	                onHoverStop: 'off',

	                touch: {
	 
	                    touchenabled: 'on',
	                    swipe_threshold: 75,
	                    swipe_min_touches: 1,
	                    swipe_direction: 'horizontal',
	                    drag_block_vertical: true
	             
	                },
	 
	                arrows: {
	                    enable: false,
	                    style: 'gyges',
	                    hide_onmobile: true,
	                    hide_onleave: true,
	                    left: {
	                        container: 'slider',
	                        h_align: 'left',
	                        v_align: 'center',
	                        h_offset: offsetArrow3,
	                        v_offset: 0
	                    },
	             
	                    right: {
	                        container: 'slider',
	                        h_align: 'right',
	                        v_align: 'center',
	                        h_offset: offsetArrow3,
	                        v_offset: 0
	                    }
	                },
	 
	                bullets: {
	                    enable: true,
	                    style: 'hephaistos',
	                    tmp: '<span class="tp-bullet-inner"></span>',
	                    hide_onleave: false,
	                    h_align: 'center',
	                    v_align: 'bottom',
	                    h_offset: 0,
	                    v_offset: 50,
	                    space: 16
	                }
	            }
	        });



	        /*==================================================================
	        [ Revo4 ]*/
	        var screenH4 = 0;
	        var offsetArrow4 = 0;

	        var offsetBullet4 = [0,0];
	        var directionBullet4 = 'horizontal';
	        var alignBullet4 = ['center','bottom']

	        if ($(window).width() >= 992) {
	            screenH4 = $(window).height() - 123;
	            offsetArrow4 = 100;

	            offsetBullet4 = [120,0];
	            directionBullet4 = 'vertical';
	            alignBullet4 = ['right','center']
	        }
	        else {
	            screenH4 = $(window).height() - 70;
	            offsetArrow4 = 20;

	            offsetBullet4 = [0,20];
	            directionBullet4 = 'horizontal';
	            alignBullet4 = ['center','bottom']
	        }

	        if($(window).height() < 768 && $(window).width() >= 992) {
	           screenH4 = $(window).height() - 90;
	        }

	        jQuery('#rev_slider_4').show().revolution({
	            
	            responsiveLevels: [1900, 992, 768, 576],
	            gridwidth:[1900, 992, 768, 576],
	            minHeight: screenH4,
	            delay: 7000,

	            sliderLayout: 'fullwidth',
	            spinner: 'spinner2',

	            navigation: {

	                keyboardNavigation: 'on',
	                keyboard_direction: 'horizontal',
	                onHoverStop: 'off',

	                touch: {
	 
	                    touchenabled: 'on',
	                    swipe_threshold: 75,
	                    swipe_min_touches: 1,
	                    swipe_direction: 'horizontal',
	                    drag_block_vertical: true
	             
	                },
	 
	                arrows: {
	                    enable: false,
	                    style: 'gyges',
	                    hide_onmobile: true,
	                    hide_onleave: true,
	                    left: {
	                        container: 'slider',
	                        h_align: 'left',
	                        v_align: 'center',
	                        h_offset: offsetArrow4,
	                        v_offset: 0
	                    },
	             
	                    right: {
	                        container: 'slider',
	                        h_align: 'right',
	                        v_align: 'center',
	                        h_offset: offsetArrow4,
	                        v_offset: 0
	                    }
	                },
	 
	                bullets: {
	                    enable: true,
	                    style: 'hermes',
	                    direction: directionBullet4,
	                    tmp: '<div class="tp-bullet-inner"></div>',
	                    hide_onleave: false,
	                    h_align: alignBullet4[0],
	                    v_align: alignBullet4[1],
	                    h_offset: offsetBullet4[0],
	                    v_offset: offsetBullet4[1],
	                    space: 12
	                }
	            }
	        });

	        /*==================================================================
	        [ Revo5 ]*/
	        var screenH5 = 0;
	        var offsetArrow5 = 0;
	        var offsetBullet5 = 0;
	        if ($(window).width() >= 992) {
	            screenH5 = $(window).height();
	            offsetArrow5 = 120;
	            offsetBullet5 = 50;
	        }
	        else {
	            screenH5 = $(window).height() - 70;
	            offsetArrow5 = 30;
	            offsetBullet5 = 20;
	        }

	        jQuery('#rev_slider_5').show().revolution({
	            
	            responsiveLevels: [1900, 1200, 768, 576],
	            gridwidth:[1900, 1200, 768, 576],
	            minHeight: screenH5,
	            delay: 7000,

	            sliderLayout: 'fullwidth',
	            spinner: 'spinner2',

	            navigation: {

	                keyboardNavigation: 'on',
	                keyboard_direction: 'horizontal',
	                onHoverStop: 'off',

	                touch: {
	 
	                    touchenabled: 'on',
	                    swipe_threshold: 75,
	                    swipe_min_touches: 1,
	                    swipe_direction: 'horizontal',
	                    drag_block_vertical: true
	             
	                },
	 
	                arrows: {
	                    enable: false,
	                    style: 'gyges',
	                    hide_onmobile: true,
	                    hide_onleave: true,
	                    left: {
	                        container: 'slider',
	                        h_align: 'left',
	                        v_align: 'center',
	                        h_offset: offsetArrow5,
	                        v_offset: 0
	                    },
	             
	                    right: {
	                        container: 'slider',
	                        h_align: 'right',
	                        v_align: 'center',
	                        h_offset: offsetArrow5,
	                        v_offset: 0
	                    }
	                },
	 
	                bullets: {
	                    enable: true,
	                    style: 'hephaistos',
	                    tmp: '<span class="tp-bullet-inner"></span>',
	                    hide_onleave: false,
	                    h_align: 'center',
	                    v_align: 'bottom',
	                    h_offset: 0,
	                    v_offset: offsetBullet5,
	                    space: 10
	                }
	            }
	        });


	        /*==================================================================
	        [ Revo6 ]*/
	        var screenH6 = 0;
	        var offsetArrow6 = 0;
	        if ($(window).width() >= 992) {
	            screenH6 = $(window).height() - 123;
	            offsetArrow6 = 100;
	        }
	        else {
	            screenH6 = $(window).height() - 70;
	            offsetArrow6 = 20;
	        }

	        if($(window).height() < 768 && $(window).width() >= 992) {
	           screenH6 = $(window).height() - 90;
	        }

	        jQuery('#rev_slider_6').show().revolution({
	            
	            responsiveLevels: [1200, 992, 768, 576],
	            gridwidth:[1200, 992, 768, 576],
	            minHeight: screenH6,
	            delay: 7000,

	            sliderLayout: 'fullwidth',
	            spinner: 'spinner2',

	            navigation: {

	                keyboardNavigation: 'on',
	                keyboard_direction: 'horizontal',
	                onHoverStop: 'off',

	                touch: {
	 
	                    touchenabled: 'on',
	                    swipe_threshold: 75,
	                    swipe_min_touches: 1,
	                    swipe_direction: 'horizontal',
	                    drag_block_vertical: true
	             
	                },
	 
	                arrows: {
	                    enable: false,
	                    style: 'gyges',
	                    hide_onmobile: true,
	                    hide_onleave: true,
	                    left: {
	                        container: 'slider',
	                        h_align: 'left',
	                        v_align: 'center',
	                        h_offset: offsetArrow6,
	                        v_offset: 0
	                    },
	             
	                    right: {
	                        container: 'slider',
	                        h_align: 'right',
	                        v_align: 'center',
	                        h_offset: offsetArrow6,
	                        v_offset: 0
	                    }
	                },
	 
	                bullets: {
	                    enable: true,
	                    style: 'hephaistos',
	                    tmp: '<span class="tp-bullet-inner"></span>',
	                    hide_onleave: false,
	                    h_align: 'center',
	                    v_align: 'bottom',
	                    h_offset: 0,
	                    v_offset: 50,
	                    space: 10
	                }
	            }
	        });


	}

	this.initBackToTop = function() {
	    /*[ Back to top ]
	    ===========================================================*/
	    try {
	        var windowH = $(window).height()/2;

	        $(window).on('scroll',function(){
	            if ($(this).scrollTop() > windowH) {
	                $("#myBtn").css('display','flex');
	            } else {
	                $("#myBtn").css('display','none');
	            }
	        });

	        $('#myBtn').on("click", function(){
	            $('html, body').animate({scrollTop: 0}, 300);
	        });
	    } catch(er) {console.log(er);}
	}


	this.initGallery = function() {
	    /*==================================================================
	    [ Isotope ]*/
	    try {
	        var $topeContainer = $('.isotope-grid');
	        var $filter = $('.filter-tope-group');

	        // filter items on button click
	        $filter.each(function () {
	            $filter.on('click', 'button', function () {
	                var filterValue = $(this).attr('data-filter');
	                $topeContainer.isotope({filter: filterValue});
	            });
	            
	        });

	        // init Isotope
	        $(window).on('load', function () {
	            var $grid = $topeContainer.each(function () {
	                $(this).isotope({
	                    itemSelector: '.isotope-item',
	                    layoutMode: 'masonry',
	                    percentPosition: true,
	                    animationEngine : 'best-available',
	                    masonry: {
	                        columnWidth: '.isotope-item'
	                    }
	                });
	            });

	        });

	        var isotopeButton = $('.filter-tope-group button');

	        $('.gallery-lb.isotope-grid-gallery').each(function() {
                    $(this).find('.js-show-gallery').magnificPopup({
                        type: 'image',
                        gallery: {
                            enabled:true
                        },
                        mainClass: 'mfp-fade'
                    });
                });

	        $(isotopeButton).each(function(){
	            $(this).on('click', function(){
	                for(var i=0; i<isotopeButton.length; i++) {
	                    $(isotopeButton[i]).removeClass('how-active1');
	                }

	                $(this).addClass('how-active1');


	                if($(this).data('filter') === "*") {
	                    $('.isotope-grid-gallery .isotope-item .js-gallery').addClass('js-show-gallery');
	                    
	                    $('.gallery-lb.isotope-grid-gallery').each(function() {
	                        $(this).find('.js-show-gallery').magnificPopup({
	                            type: 'image',
	                            gallery: {
	                                enabled:true
	                            },
	                            mainClass: 'mfp-fade'
	                        });
	                    });
	                }
	                else {
	                    $('.isotope-grid-gallery .isotope-item .js-gallery').removeClass('js-show-gallery');
	                    $('.isotope-grid-gallery ' + $(this).data('filter') + ' .js-gallery').addClass('js-show-gallery');

	                    $('.gallery-lb.isotope-grid-gallery').each(function() {
	                        $(this).find('.js-show-gallery').magnificPopup({
	                            type: 'image',
	                            gallery: {
	                                enabled:true
	                            },
	                            mainClass: 'mfp-fade'
	                        });
	                    });
	                }
	            });
	        });
	    } catch(er) {console.log(er);}
	}

	this.initProducts = function() {
	    /*==================================================================
	    [ Noui ]*/
	    try {
	        var filterBar = document.getElementById('filter-bar');
	        var fromValue = Number($('#value-lower').html());
	        var toValue = Number($('#value-upper').html());

	        noUiSlider.create(filterBar, {
	            start: [ fromValue, toValue ],
	            connect: true,
	            range: {
	                'min': fromValue,
	                'max': toValue
	            }
	        });

	        var skipValues = [
	        document.getElementById('value-lower'),
	        document.getElementById('value-upper')
	        ];

	        filterBar.noUiSlider.on('update', function( values, handle ) {
	            skipValues[handle].innerHTML = Math.round(values[handle]) ;
	        });
	    } catch(er) {console.log(er);}

	    /*==================================================================
	    [ Sweetalert ]*/
	    try {
	        $('.js-addwish-b1, .js-addwish1').on('click', function(e){
	            e.preventDefault();
	        });

	        $('.js-addwish-b1').each(function(){
	            var nameProduct = $(this).parent().parent().find('.js-name1').html();
	            $(this).on('click', function(){

	            	if($(this).hasClass( "js-addedwish-b1" ))
	            	{
						swal(nameProduct, "is removed from your Favorite List!", "success");
						$(this).removeClass('js-addedwish-b1');
	            		$(this).addClass('js-addwish-b1');

	            	}
	            	else
	            	{
	            		swal(nameProduct, "is added to your Favorite List!", "success");
	            		$(this).addClass('js-addedwish-b1');
	            		$(this).removeClass('js-addwish-b1');
	            	}

	            });
	        });

	          $('.js-addedwish-b1').each(function(){
	            var nameProduct = $(this).parent().parent().find('.js-name1').html();
	            $(this).on('click', function(){

	            	if($(this).hasClass( "js-addedwish-b1" ))
	            	{
						swal(nameProduct, "is removed from your Favorite List!", "success");
						$(this).removeClass('js-addedwish-b1');
	            		$(this).addClass('js-addwish-b1');

	            	}
	            	else
	            	{
	            		swal(nameProduct, "is added to your Favorite List!", "success");
	            		$(this).addClass('js-addedwish-b1');
	            		$(this).removeClass('js-addwish-b1');
	            	}

	            });
	        });

	        $('.js-addcart-b1').each(function(){
	            var nameProduct = $(this).parent().parent().find('.js-name1').html();
	            $(this).on('click', function(e){
	                e.preventDefault();
	                swal(nameProduct, "is added to cart !", "success");
	            });
	        });


	        /*---------------------------------------------*/
	        $('.js-addwish1').each(function(){
	            var nameProduct = $(this).parent().find('.js-name2').html();
	            $(this).on('click', function(){

	                if($(this).hasClass( "js-addedwish1" ))
	            	{
						swal(nameProduct, "is removed from your Favorite List!", "success");
						$(this).removeClass('js-addedwish1');
	            		$(this).addClass('js-addwish1');

	            	}
	            	else
	            	{
	            		swal(nameProduct, "is added to your Favorite List!", "success");
	            		$(this).addClass('js-addedwish1');
	            		$(this).removeClass('js-addwish1');
	            	}

	           //     $(this).addClass('js-addedwish1');
	              //  $(this).off('click');
	            });
	        });

	        $('.js-addcart1').each(function(){
	           // var nameProduct = $(this).parent().parent().parent().find('.js-name1').html();
	            
	            $(this).on('click', function(e){
	                e.preventDefault();
	                var productQuantity = $(this).parent().parent().find('.num-product').val();
	                var nameProduct = $(this).parent().parent().parent().parent().find('.js-name1').html();
	                swal(productQuantity + " " + nameProduct + "(s)", " added to cart !", "success");
	            });
	        });

	        $('.js-addcart2').each(function(){
	            var nameProduct = $(this).parent().parent().parent().find('.js-name2').html();
	            $(this).on('click', function(e){
	                e.preventDefault();
	                var productQuantity = $(this).parent().parent().find('.num-product').val();
	                swal(productQuantity + " " + nameProduct + "(s)", " added to cart !", "success");
	            });
	        });

	    } catch(er) {console.log(er);}

	    /*==================================================================
	    [ Show grid / list ]*/
	    try {
	        $('.js-show-grid').on('click', function(){
	            $(this).addClass('menu-active');
	            $('.js-show-list').removeClass('menu-active');

	            $('.shop-grid').fadeIn();
	            $('.shop-list').hide();
	        });

	        $('.js-show-list').on('click', function(){
	            $(this).addClass('menu-active');
	            $('.js-show-grid').removeClass('menu-active');

	            $('.shop-list').fadeIn();
	            $('.shop-grid').hide();
	        });
	    } catch(er) {console.log(er);}
	}

	this.initAddProducts = function() {
	    /*==================================================================
	    [ +/- num product ]*/
	    try {
	        $('.btn-num-product-down').on('click', function(){
	            var numProduct = Number($(this).next().val());
	            if(numProduct > 0) $(this).next().val(numProduct - 1);
	        });

	        $('.btn-num-product-up').on('click', function(){
	            var numProduct = Number($(this).prev().val());
	            $(this).prev().val(numProduct + 1);
	        });
	    } catch(er) {console.log(er);}

	    $('.js-addcart-wishlist').each(function(){
            var nameProduct = $(this).parent().parent().parent().find('.js-name1').html();
            $(this).on('click', function(e){
                e.preventDefault();
                var productQuantity = $(this).parent().parent().parent().find('.num-product').val();
                swal(productQuantity + " " + nameProduct + "(s)", " added to cart !", "success");
            });
	     });
	}

	this.initProgressBar = function() {
	    /*==================================================================
	    [ Progress bar ]*/
	    try {
	        var progressItem = $('.progress-item');
	        var progressDone = false;

	        $(window).on('scroll',function(){
	            progressItem.each(function(){
	                var per = Number($(this).data('percent'));
	                var inner = $(this).children('.progress-inner');

	                if($(window).scrollTop() + $(window).height() > $(this).offset().top && per > 0) { 
	                    $(this).data('percent','0');  
	                    inner.html(per + "%"); 
	                    inner.animate({width: per + "%"},1500);
	                }
	            });
	        });
	    } catch(er) {console.log(er);}
	}


	this.initProductSlider = function(array) {

	     $('#slide100-01').slide100({
	            autoPlay: "false",
	            timeAuto: 3000,
	            deLay: 400,

	            linkIMG: array,

	            linkThumb: array
	        });
	}

	this.initCountDown = function() {

	    /*==================================================================
	    [ Countdown ]*/
	    try {
	        $('.coutdown100').each(function(){
	            if($(this).data('year') != null){
	                var year = Number($(this).data('year'));
	            }
	            else {var year = 0;}

	            if($(this).data('month') != null){
	                var month = Number($(this).data('month'));
	            }
	            else {var month = 0;}

	            if($(this).data('date') != null){
	                var date = Number($(this).data('date'));
	            }
	            else {var date = 0;}

	            if($(this).data('hours') != null){
	                var hours = Number($(this).data('hours'));
	            }
	            else {var hours = 0}

	            if($(this).data('minutes') != null){
	                var minutes = Number($(this).data('minutes'));
	            }
	            else {var minutes = 0;}

	            if($(this).data('seconds') != null){
	                var seconds = Number($(this).data('seconds'));
	            }
	            else {var seconds = 0;}

	            if($(this).data('timezone') != null && $(this).data('timezone') != "auto"){
	                var timeZ = $(this).data('timezone');
	            }
	            else {var timeZ = "";}


	            $(this).countdown100({
	                /*Set Endtime here*/
	                /*Endtime must be > current time*/
	                endtimeYear: year,
	                endtimeMonth: month,
	                endtimeDate: date,
	                endtimeHours: hours,
	                endtimeMinutes: minutes,
	                endtimeSeconds: seconds,
	                timeZone: timeZ
	                // ex:  timeZone: "America/New_York"
	                //go to " http://momentjs.com/timezone/ " to get timezone
	            });
	        });
	            
	    } catch(er) {console.log(er);}
	}

	this.initVideos = function() {

	    /*==================================================================
	    [ Video ]*/
	    try {
	        $('.btn-play').on('click', function(ev) {
	            $('.wrap-iframe-video').children('iframe')[0].src += "rel=0&autoplay=1";

	            $('.wrap-iframe-video').addClass('show-video');
	            
	            $(this).fadeOut();
	            ev.preventDefault();
	        });
	    } catch(er) {console.log(er);}
	}

	this.initMagnificPopUp = function() {
	    /*==================================================================
	    [ Magnific-Popup ]*/
	    try {
	        $('.gallery-lb').each(function() {
	            $(this).find('.js-show-gallery').magnificPopup({
	                type: 'image',
	                gallery: {
	                    enabled:true
	                },
	                mainClass: 'mfp-fade'
	            });
	        });
	    } catch(er) {console.log(er);}
	}

	this.initRating = function() {

	    /*==================================================================
	    [ Rating ]*/
	    try {
	       $('.wrap-rating').each(function(){
	            var item = $(this).find('.item-rating');
	            var rated = -1;
	            var input = $(this).find('input');
	            $(input).val(0);

	            $(item).on('mouseenter', function(){
	                var index = item.index(this);
	                var i = 0;
	                for(i=0; i<=index; i++) {
	                    $(item[i]).removeClass('fa-star-o');
	                    $(item[i]).addClass('fa-star');
	                }

	                for(var j=i; j<item.length; j++) {
	                    $(item[j]).addClass('fa-star-o');
	                    $(item[j]).removeClass('fa-star');
	                }
	            });

	            $(item).on('click', function(){
	                var index = item.index(this);
	                rated = index;
	                $(input).val(index+1);
	            });

	            $(this).on('mouseleave', function(){
	                var i = 0;
	                for(i=0; i<=rated; i++) {
	                    $(item[i]).removeClass('fa-star-o');
	                    $(item[i]).addClass('fa-star');
	                }

	                for(var j=i; j<item.length; j++) {
	                    $(item[j]).addClass('fa-star-o');
	                    $(item[j]).removeClass('fa-star');
	                }
	            });
	        });
	    } catch(er) {console.log(er);}
	}

	this.initChoosePay = function() {

	    /*==================================================================
	    [ Chose pay ]*/
	    try {
	        $("#radio1").on('change', function(){
	            if ($(this).is(":checked")) {
	                $('.content-payment').slideDown(300);
	                $('.content-paypal').slideUp(300);
	            }
	        });

	        $("#radio2").on('change', function(){
	            if ($(this).is(":checked")) {
	                $('.content-payment').slideUp(300);
	                $('.content-paypal').slideDown(300);
	            }
	        });
	    } catch(er) {console.log(er);}
	}

	this.initParallax100 = function() {

	    /*==================================================================
	    [ Parallax100 ]*/
	    try {
	        $('.parallax100').parallax100();
	    } catch(er) {console.log(er);}
	}

	this.initPerfectScrollbar = function() {

	    /*==================================================================
	    [ Perfect scrollbar ]*/
	    try {
	        $('.js-pscroll').each(function(){
	            $(this).css('position','relative');
	            $(this).css('overflow','hidden');
	            var ps = new PerfectScrollbar(this, {
	                wheelSpeed: 1,
	                scrollingThreshold: 1000,
	                wheelPropagation: false,
	            });

	            $(window).on('resize', function(){
	                ps.update();
	            })
	        });
	    } catch(er) {console.log(er);}
	}

	this.initCounterUp = function() {

	    /*==================================================================
	    [ Counter up ]*/
	    try {
	        $('.counter').counterUp({
	            delay: 10,
	            time: 1000
	        });
	    } catch(er) {console.log(er);}
	}

	this.initShowHideReplyCmt = function() {

	    /*==================================================================
	    [ Show/hide Reply cmt ]*/
	    try {
	        $('.js-show-reply-cmt').on('click', function(e){
	            e.preventDefault();
	            $(this).parent().parent().parent().find('.js-reply-cmt').show();
	            $(this).addClass('how-active2');
	        });

	        $('.js-hide-reply-cmt').on('click', function(e){
	            e.preventDefault();
	            $(this).parent().parent().hide();
	            $(this).parent().parent().parent().find('.js-show-reply-cmt').removeClass('how-active2');
	        });
	    } catch(er) {console.log(er);}
	}

	this.initShowHidePanel = function() {
	    /*==================================================================
	    [ Show/hide panel1 ]*/
	    try {
	        $('.js-toggle-panel1').on('click', function(){
	            $(this).parent().parent().find('.js-panel1').slideToggle();
	        });
	        $('.js-toggle-panel2').on('click', function(){
	            $(this).parent().parent().find('.js-panel2').slideToggle();
	        });
	    } catch(er) {console.log(er);}

	}

	this.initDatePickers = function(isLoggedIn)
	{
		if(isLoggedIn)
		{
		 	$( "#datepicker_logged_in" ).datepicker({
		      showOtherMonths: true,
		      selectOtherMonths: true,
		      minDate: 0,
		      maxDate: "+1M",
		      onSelect: function(date)
		      {
		        $('#timepicker_logged_in').timepicker("destroy");

		      	if(new Date(date).getDay() != new Date().getDay())
		      	{
					$('#timepicker_logged_in').timepicker({
				        timeFormat: 'h:mm p',
				        interval: 30,
				        defaultTime: 'now',
				        dynamic: false,
				        dropdown: true,
				        scrollbar: true
			    	});
		      	}
		      	else
		      	{
		      		$('#timepicker_logged_in').timepicker({
				        timeFormat: 'h:mm p',
				        interval: 30,
				        minTime: new Date(),
				        defaultTime: 'now',
				        dynamic: false,
				        dropdown: true,
				        scrollbar: true
			    	});
		      	}
		    	
		        },
		    });

		    $( "#datepicker_logged_in" ).datepicker( "option", "showAnim", "blind" );
		    $("#datepicker_logged_in").datepicker().datepicker("setDate", new Date());
		  
		    $('#timepicker_logged_in').timepicker({
		        timeFormat: 'h:mm p',
		        interval: 30,
		        minTime: new Date(),
		     //   maxTime: '6:00pm',
		        defaultTime: 'now',
		     //   startTime: '10:00',
		        dynamic: false,
		        dropdown: true,
		        scrollbar: true
		    });
		}
		else
		{
			$( "#datepicker_logged_out" ).datepicker({
		      showOtherMonths: true,
		      selectOtherMonths: true,
		      minDate: 0,
		      maxDate: "+1M",
		      onSelect: function(date) 
		      {

		      	$('#timepicker_logged_out').timepicker("destroy");

		      	if(new Date(date).getDay() != new Date().getDay())
		      	{
					$('#timepicker_logged_out').timepicker({
				        timeFormat: 'h:mm p',
				        interval: 30,
				        defaultTime: 'now',
				        dynamic: false,
				        dropdown: true,
				        scrollbar: true
			    	});
		      	}
		      	else
		      	{
		      		$('#timepicker_logged_out').timepicker({
				        timeFormat: 'h:mm p',
				        interval: 30,
				        minTime: new Date(),
				        defaultTime: 'now',
				        dynamic: false,
				        dropdown: true,
				        scrollbar: true
			    	});
		      	}
		      	
		            
		        },
		    });

		    $( "#datepicker_logged_out" ).datepicker( "option", "showAnim", "blind" );
		    $("#datepicker_logged_out").datepicker().datepicker("setDate", new Date());
		  
		    $('#timepicker_logged_out').timepicker({
		        timeFormat: 'h:mm p',
		        interval: 30,
		        minTime: new Date(),
		     //   maxTime: '6:00pm',
		        defaultTime: 'now',
		     //   startTime: '10:00',
		        dynamic: false,
		        dropdown: true,
		        scrollbar: true
		    });
		}
	}


});

myApp.service("dataService", function(httpClient, $timeout, $q) {

	var categories = [];
	var subCategories = [];
	var basket_items = {};

	this.isLoggedIn = function($scope)
	{
        if($.cookie('user_token') && localStorage.userProfile)
        {
            $scope.$emit('setUserProfile', JSON.parse(localStorage.userProfile));
            return true;
        }
        else
        {
            $scope.$emit('setUserProfile', false);
            return false;
        }
	}

    this.showAlert = function(type, msg, divToScroll, timeout, time)
    {

    	$("#"+divToScroll+"_content").addClass("alert-"+type);
    	$("#"+divToScroll+"_content").html(msg);
    	 $("#"+divToScroll+"_content").show();

        var elementToScrollTo = jQuery("#"+divToScroll);
	    $("html,body").animate({
	            scrollTop: elementToScrollTo.offset().top - 175
	        }, 1000);
	    var time = time || 5000;
	    if(timeout){
            $timeout(function(){
                $("#"+divToScroll+"_content").hide();
            }, time);
        }
        
    }

	this.callApi = function(api, params, method, ajax){
        var d = $q.defer(); 

        if(method == "post")
        {
 			httpClient.post(api, params, ajax).then(function(data, response)
 			{
            	d.resolve(data, response)
       		},
	        function(err)
	        {
	            d.reject(err)
	        });
        }
        else
        {
 			httpClient.get(api, params, ajax).then(function(data, response)
 			{
            	d.resolve(data, response)
	        },
	        function(err) 
	        {
	            d.reject(err)
	        });
        }
       
        return d.promise;
    }

    this.getAddresses = function(params){
        var d = $q.defer(); 

            httpClient
                .get("management/api/clients/getAddresses", params).then
                (
                	function(data, response)
	                {
		                if(data && data.documents)
		                {
			                d.resolve(data, response)
		                }
	            	},
	                function(err)
	                {
	                	d.reject(err)
	            	}
            	);
       
        return d.promise;    

    }

    this.getSubCategories = function(params){
        var d = $q.defer(); 

            httpClient
                .get("management/api/categories", params).then
                (
                	function(data, response)
	                {
		                if(data && data.documents)
		                {
		                	subCategories = data;
			                d.resolve(data, response)
		                }
	            	},
	                function(err)
	                {
	                	d.reject(err)
	            	}
            	);
       
        return d.promise;    

    }

    this.getCategories = function(){
        var d = $q.defer(); 
        if(categories.length == 0)
        {
            httpClient
                .get("management/api/categories", {publishStatus: "Published"}).then(function(data, response){
                if(data && data.documents){
                    var cats = data.documents;
                    for(var i = 0; i < cats.length; i++){
                        cats[i]["encodedName"] = encodeURIComponent(cats[i].menu);
                    }

                }
                categories = cats;
                d.resolve(categories, response)
            },
            function(err) {
                d.reject(err)
            });
        }else
        {
            d.resolve(categories, null);            
        }
        return d.promise;    
    }

    this.getProducts = function(params){

        var d = $q.defer(); 

        httpClient
            .get("management/api/products", params).then(function(data, response)
            {
	            if(data && data.documents)
	            {
	            	for(var i = 0; i < data.documents.length; i++)
        			{
        				if(!data.documents[i]["priceOffer"] && data.documents[i]["discount"])
			            {
							data.documents[i]["priceOffer"] = data.documents[i]["discount"];
			            }
        			}

	                d.resolve(data, response)
	            }
	        },
	        function(err)
	        {
	            d.reject(err)
	        });
	        return d.promise;    
    }

    this.getProductByKey = function(params){

        var d = $q.defer(); 

        httpClient
            .get("management/api/getItemByKey", params).then(function(data, response)
            {
	            if(data)
	            {
	                d.resolve(data, response)
	            }
	        },
	        function(err)
	        {
	            d.reject(err)
	        });
	        return d.promise;    
    }

    this.getSubCats = function(params){

        var d = $q.defer(); 

        httpClient
            .get("management/api/getCategoryByKey", params).then(function(data, response)
            {
	            if(data)
	            {
	                d.resolve(data, response)
	            }
	        },
	        function(err)
	        {
	            d.reject(err)
	        });
	        return d.promise;    
    }

    this.addToFavorites = function(params){

        var d = $q.defer(); 

        httpClient
            .get("management/api/clients/FavoriteList", params).then(function(data, response)
            {
	            if(data)
	            {
	                d.resolve(data, response)
	            }
	        },
	        function(err)
	        {
	            d.reject(err)
	        });
	        return d.promise;    
    }

    this.getFavoriteListKeys = function(params){

        var d = $q.defer(); 

        httpClient
            .get("management/api/clients/FavoriteList", params).then(function(data, response)
            {
	            if(data)
	            {
	                d.resolve(data, response)
	            }
	        },
	        function(err)
	        {
	            d.reject(err)
	        });
	        return d.promise;    
    }

    // this.emptyBasket = function($scope)
    // {
    //     this.setBasketItems({}, $scope);
    // }

    this.emptyBasket = function($scope)
    {
    	var obj = {};
    	obj["items"] = [];
        this.setBasketItems(obj, $scope);
    }

    this.getBasketItems = function()
    {
        if(localStorage.basket_items)
        {
             return JSON.parse(localStorage.basket_items);
        }
        else
        {
        	var obj = {};
        	obj["items"] = [];
            return obj;
        }
       
    }

    // this.updateBasket = function(inputId, product, $scope)
    // {
    // 	delete product.description;
    // 	delete product.$$hashKey;
    // 	if(product.action) delete product.action; 
    // 	if(product.attachments) delete product.attachments;
    // 	if(product.versionNumber) delete product.versionNumber;  
    // 	if(product.promotion) delete product.promotion;
    // 	if(product.publish) delete product.publish;
    //     product["quantity"] = $(inputId).val();
    //     basket_items = this.getBasketItems();
    //     basket_items[product.key] = product;

    //     this.setBasketItems(basket_items, $scope);
    // }

    this.updateBasket = function(product, $scope)
    {
    	delete product.description;
    	delete product.$$hashKey;
    	if(product.action) delete product.action; 
    	if(product.attachments) delete product.attachments;
    	if(product.versionNumber) delete product.versionNumber;  
    	if(product.promotion) delete product.promotion;
    	if(product.publish) delete product.publish;

        basket_items = this.getBasketItems();

        if(!basket_items["items"])
        {
        	basket_items["items"] = [];
        }
        basket_items["items"].push(product);

        this.setBasketItems(basket_items, $scope);
    }

    this.setBasketItems = function(basket_items, $scope)
    {
        localStorage.basket_items = JSON.stringify(basket_items);
        var objInfo = this.calc_total();
        $scope.$emit('updateBasketItems', objInfo);
    }


    this.calc_total = function()
    {
        var added_products = this.getBasketItems();
        var total_amount = 0;
        var total_items = 0;

        var items = added_products.items;

        for(var i = 0; i < items.length; i++)
        {
        	if(items[i].portion && items[i].portion == "half")
        	{
        		var total_item_amount = parseFloat(items[i].quantity) * parseFloat(items[i].halfPortionPrice);
        	}
        	else
        	{
        		var total_item_amount = parseFloat(items[i].quantity) * parseFloat(items[i].price);
        	}
            
            total_amount = parseFloat(total_amount) + parseFloat(total_item_amount);
            total_items = total_items + parseFloat(items[i].quantity);
        }

        total_amount = Math.round(total_amount * 100) / 100;
        items_counter = total_items;

        var objInfo = 
        {
        	total_amount: total_amount,
        	items_counter: items_counter
        }

        return objInfo;
        
    }

    // this.calc_total = function()
    // {
    //     var added_products = this.getBasketItems();
    //     var total_amount = 0;
    //     var total_items = 0;

    //     for(var key in added_products)
    //     {
    //     	if(added_products[key].priceOffer)
    //     	{
    //     		var total_item_amount = parseFloat(added_products[key].quantity) * parseFloat(added_products[key].priceOffer);
    //     	}
    //     	else
    //     	{
    //     		var total_item_amount = parseFloat(added_products[key].quantity) * parseFloat(added_products[key].price);
    //     	}
            
    //         total_amount = parseFloat(total_amount) + parseFloat(total_item_amount);
    //         total_items = total_items + parseFloat(added_products[key].quantity);
    //     }

    //     total_amount = Math.round(total_amount * 100) / 100;
    //     items_counter = total_items;

    //     var objInfo = 
    //     {
    //     	total_amount: total_amount,
    //     	items_counter: items_counter
    //     }

    //     return objInfo;
        
    // }

  //   this.getBasketItemsArray = function()
  //   {
  //   	var basket_items = this.getBasketItems();
  //   	var my_basket_products = [];
		// for(var item in basket_items)
		// {
  //           my_basket_products.push(basket_items[item]);
  //       }

  //       return my_basket_products;
  //   }

    this.getBasketItemsArray = function()
    {
    	var basket_items = this.getBasketItems();
        return basket_items.items;
    }

    this.removeProduct = function(product, $scope)
    {
    	var basket_items = this.getBasketItems();
    	basket_items.items = _.without(basket_items.items, _.findWhere(basket_items.items, {timestamp: product.timestamp}));
    	//basket_items.items.splice(basket_items.items.indexOf(product.creationDate), 1);
        this.setBasketItems(basket_items, $scope);
   
    }

    this.editProduct = function(product, $scope)
    {
    	var basket_items = this.getBasketItems();
    	
    	var index = _.findIndex(basket_items.items, { timestamp: product.timestamp });
		basket_items.items[index] = product;

    	//basket_items.items.splice(basket_items.items.indexOf(product.creationDate), 1);
        this.setBasketItems(basket_items, $scope);
   
    }
    

});

