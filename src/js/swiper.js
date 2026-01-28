// Swiper Initialization
// Handles all Swiper carousel/slider functionality

// Hero Swiper
const heroSwiper = new Swiper('.heroSwiper', {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    speed: 800,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

// Bedroom Collection Swiper
const bedroomSwiper = new Swiper('.bedroomSwiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    speed: 500,
    navigation: {
        nextEl: '.bedroom-swiper-next',
        prevEl: '.bedroom-swiper-prev',
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 2.5,
            spaceBetween: 24,
        },
    },
});

// Testimonials Swiper
const testimonialsSwiper = new Swiper('.testimonialsSwiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    speed: 500,
    navigation: {
        nextEl: '.testimonials-next',
        prevEl: '.testimonials-prev',
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 24,
        },
    },
});
