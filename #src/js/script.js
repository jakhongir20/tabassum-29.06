



// ==========================================

$(".icon-menu").click(function (event) {
  event.preventDefault();
  $(this).toggleClass("_active");
  $('.header__actions').toggleClass("_active");
  $("body").toggleClass("_lock");
});

// =======================================================================================================
// (function () {
//   let navLinks = $("header ul li a"),
//     // navM = $('nav').height(),
//     navM = 40,
//     section = $("section"),
//     documentEl = $(document);

//   documentEl.on("scroll", function () {
//     let currentScrollPage = documentEl.scrollTop();

//     section.each(function () {
//       let self = $(this);
//       if (
//         self.offset().top < currentScrollPage + navM &&
//         currentScrollPage + navM < self.offset().top + self.outerHeight()
//       ) {
//         let targetClass = "." + self.attr("class") + "-page";
//         navLinks.removeClass("_active");
//         $(targetClass).addClass("_active");
//       }
//     });
//   });
// })();
$(document).ready(function () {
  $(' a[href^="#"]').click(function () {
    $('body').removeClass('_lock')
    $('.header__actions').removeClass('_active')
    $('.icon-menu').removeClass('_active')
    let target = $(this).attr("href");
    $("html, body").animate(
      {
        scrollTop: $(target).offset().top,
      },
      650
    );
    // $('nav a[href^="#"]').removeClass('_active');
    // $(this).addClass('_active')
    return false;
  });
});


// =======================================================================================================


// =======================================================================================================

