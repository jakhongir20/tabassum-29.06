// Sliders:

const reviewSlide = new Swiper('.review__slider.swiper-container', {
   slidesPerView: 4,
   // autoHeight: false,
   allowSlidePrev: false,
   allowSlideNext: false,
   allowTouchMove: false,
   autoplay: false,
   // slidesPerGroup: 1,
   centeredSlides: false,
   initialSlide: 1,
   slidesPerColumn: 1,
   spaceBetween: 40,
   loop: false,
   speed: 600,
   navigation: {
      // nextEl: ".slider__body .swiper-button-next",
      // prevEl: ".slider__body .swiper-button-prev",
   },
   breakpoints: {
      320: {
         slidesPerView: 1.5,
         spaceBetween: 20,
         allowSlidePrev: true,
         allowSlideNext: true,
         allowTouchMove: true
      },
      370: {
         slidesPerView: 1.5,
         spaceBetween: 20,
         allowSlidePrev: true,
         allowSlideNext: true,
         allowTouchMove: true,
         delay: 5000,
      },
      630: {
         slidesPerView: 2,
         spaceBetween: 20,
         allowSlidePrev: true,
         allowSlideNext: true,
         allowTouchMove: true,
      },
      768: {
         slidesPerView: 3,
         spaceBetween: 20,
         allowSlidePrev: true,
         allowSlideNext: true,
         allowTouchMove: true,
         autoplay: {
            delay: 5000,
         },
      },
      990: {
         slidesPerView: 4,
         spaceBetween: 20,
         allowSlidePrev: false,
         allowSlideNext: false,
      },
   }
});
