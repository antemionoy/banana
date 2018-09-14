//= ../../bower_components/jquery/dist/jquery.min.js
//= ../../bower_components/owl.carousel/dist/owl.carousel.js
//= ../../bower_components/slick-carousel/slick/slick.js
//= ../../bower_components/ion.rangeSlider/js/ion.rangeSlider.js
//= ../../bower_components/magnific-popup/dist/jquery.magnific-popup.js
//= ../../bower_components/sly/dist/sly.min.js

"use strict";


function zoomPopUp() {
    $('.zoom-gallery').magnificPopup({
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

function owlFun(sliderName, items, rangeItem, auto_width) {

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


    //Слайдер
    owl.owlCarousel({
        loop: false,
        margin: 30,
        nav: true,
        dots: false,
        slideBy: 1,
        items: items,
        autoWidth: auto_width,
        center: false,
        responsiveClass: true
    });

    console.log('sliderItem');


    // owl.on('dragged.owl.carousel', function(event) {
    //     var itemCount = event.item.count;
    //     var size = event.page.size;
    //     var curItem = event.item.index + 1;
    //     var dragLength = 100 / (itemCount / size);
    //     console.log(curItem);
    //     $("#range").data("ionRangeSlider").update({ from: curItem });
    //     $('.irs-slider.single').css('width', dragLength + "%");
    // });

    // owl.on('resized.owl.carousel', function(event) {
    //     var itemCount = event.item.count;
    //     var size = event.page.size;
    //     var curItem = event.item.index + 1;
    //     var dragLength = 100 / (itemCount / size);
    //     $("#range").data("ionRangeSlider").update({
    //         max: itemCount - (size - 1),
    //         from: curItem
    //     });
    //     $('.irs-slider.single').css('width', dragLength + "%");
    // });
}

function init_map() {
    var myOptions = {
        zoom: 13,
        scrollwheel: false,
        // draggable: false,
        center: new google.maps.LatLng(60.159938, 30.552295),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('gmap_canvas'), myOptions);

    iconSrc = window.location.origin = '/img/marker.png';

    ms0 = new google.maps.Marker({
        position: new google.maps.LatLng(60.159938, 30.552295),
        map: map,
        icon: 'img/marker.png'
    });
}


function owlGraphFunction() {

    var logoCarousel = $(".company");
    var graph = $(".graph img");
    graph.hide();
    graph.eq(0).show();


    logoCarousel.owlCarousel({
        items: 1,
        loop: true,
        dots: false,
        nav: true,
        autoplay: 4000
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

    $(".hamburger").click(function() {
        $(this).toggleClass("is-active");
        $(this).closest('header').find('.header__bottom').toggleClass('header__bottom--active');
    });

    $('.menu__link').click(function() {
        $('.header__bottom').removeClass('header__bottom--active');
        $('.hamburger').toggleClass("is-active");
    });
}

$(function() {
    menu();
    zoomPopUp();
    owlGraphFunction();

    owlFun('.reviews__slider', 4, '.reviews__input_range', false);
    owlFun('.achieve__slider', 3, '.achieve__input_range', false);

    if (typeof(google) != 'undefined') {
        google.maps.event.addDomListener(window, 'load', init_map);
    }

    $('.clients__slider').slick({
        slidesToShow: 6,
        autoplay: true,
        autoplaySpeed: 1500
    });

    // $('.clients__slider').owlCarousel({
    //     items: 6,
    //     autoplay: true
    //  });

    $('.js-scrollToEl').on('click', function(e) {
        e.preventDefault();

        var to = $($(this).attr('href'));

        $('body,html').animate({
            scrollTop: to.offset().top,
        }, 800);

    });
});