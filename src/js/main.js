//= ../../bower_components/jquery/dist/jquery.min.js
//= ../../bower_components/owl.carousel/dist/owl.carousel.js
//= ../../bower_components/slick-carousel/slick/slick.js
//= ../../bower_components/ion.rangeSlider/js/ion.rangeSlider.js
//= ../../bower_components/magnific-popup/dist/jquery.magnific-popup.js
//= ../../bower_components/sly/dist/sly.min.js

"use strict";


function zoomPopUp(item) {
    $(item).magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        image: {
            verticalFit: true
        },
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300, // don't foget to change the duration also in CSS
            opener: function(element) {
                return element.find('img');
            }
        }

    });
}

function owlFun(sliderName, items, rangeItem, auto_width, responsItem_768, autoWidth768, dots) {

    var itemsNum = 0;

    var owl = $(sliderName);

    owl.on('initialized.owl.carousel', function(event) {
        var itemCount = event.item.count;
        var size = event.page.size;
        var dragLength = 100 / (itemCount / size);

        $(rangeItem).ionRangeSlider({
            type: "single",
            min: 1,
            max: itemCount - (size - 1),
            keyboard: true,
            step: 1,
            onChange: function(data) {
                // owl.trigger('changed.owl.carousel', [???]);
                owlTo = (data.from) - 1;

                console.log("Позиция ползунка: " + owlTo);
                owl.trigger('to.owl.carousel', [owlTo, 500, true]);

            }
        });

        $('.irs-slider.single').css('width', dragLength + "%");
    });

    owl.owlCarousel({
        loop: false,
        margin: 30,
        nav: true,
        dots: false,
        slideBy: 1,
        items: items,
        autoWidth: auto_width,
        center: false,
        responsiveClass: true,
        responsive: {

            320: {
                items: 1,
                dots: dots
            },

            480: {
                items: 1,
                dots: dots
            },

            768: {
                items: responsItem_768,
                dots: dots

            },

            1023: {
                items: 4,
                autoWidth:autoWidth768,
                dots: false
            }
        }
    });
}

function owlGraphFunction() {

    var logoCarousel = $(".company");
    var graph = $(".graph img");
    graph.hide();
    graph.eq(0).show();


    logoCarousel.owlCarousel({
        items: 1,
        loop: false,
        dots: true,
        nav: true,
        responsive: {
            320: {
                items: 1,
            },

            480: {
                items: 1
            },

            768: {
                items: 1
            },

            1023: {
                items: 1
            }
        }
    });

    logoCarousel.on("changed.owl.carousel", function(e) {
        var currentIndex = e.item.index;
        var currentSlide = $(e.target).find(".owl-item").eq(currentIndex);
        var pictureDataIndex = currentSlide.find('img').data('index');
        graph.hide();
        graph.eq(pictureDataIndex).fadeIn();
    });
}



function menu() {
    $(".hamburger").click(function(e) {
        e.preventDefault();

        $(this).toggleClass("is-active");
        $('body').toggleClass('open-menu');
        $('.header__bottom').toggleClass('header__bottom_open');
    });
}

function FixedSidebar() {
    if ($(window).width() < 1024) {
        var fixed = $('.fixed');
        var areaTop = $('.header');

        if ($(window).scrollTop() >= areaTop.height()) {
            $('.header').addClass('fixed');
        } else if ($(window).scrollTop() < areaTop.height()) {
            $('.header').removeClass('fixed');
        }
    }
}

$(function() {
    FixedSidebar();
    menu();
    zoomPopUp('.zoom-gallery');
    zoomPopUp('.achieve-gallery');
    owlGraphFunction();

    owlFun('.reviews__slider', 4, '.reviews__input_range', false, 4, false, true);
    owlFun('.achieve__slider', 3, '.achieve__input_range', false, 2, true, true);


    $('.clients__slider').slick({
        slidesToShow: 6,
        autoplay: true,
        autoplaySpeed: 1500,
        arrow: true,
        responsive: [{
            breakpoint: 1023,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: false,
                arrow: false,
                dots: true
            }
        }, {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: false,
                dots: true
            }
        }]

    });

    $(window).scroll(function() {
        if ($(this).scrollTop() != 0) {
            $('.to-top').fadeIn();
        } else {
            $('.to-top').fadeOut();
        }

        FixedSidebar();
    });

    $('.to-top').click(function() {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
    });


    $('.js-scrollToEl').on('click', function(e) {
        e.preventDefault();

        $('.hamburger').removeClass("is-active");
        $('.header__bottom').removeClass('header__bottom_open');

        var to = $($(this).attr('href'));

        $('body,html').animate({
            scrollTop: to.offset().top,
        }, 800);

    });
});
