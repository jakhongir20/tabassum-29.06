const maskPhone = () => {
   const inputsPhone = document.querySelectorAll('input[name="phone"]');

   inputsPhone.forEach((input) => {
      let keyCode;

      const mask = (event) => {
         event.keyCode && (keyCode = event.keyCode);
         let pos = input.selectionStart;

         if (pos < 3) {
            event.preventDefault();
         }
         let matrix = "+998 (__) ___ __ __ ",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = input.value.replace(/\D/g, ""),
            newValue = matrix.replace(/[_\d]/g, (a) => {
               if (i < val.length) {
                  return val.charAt(i++) || def.charAt(i);
               } else {
                  return a;
               }
            });
         i = newValue.indexOf("_");
         if (i !== -1) {
            i < 5 && (i = 3);
            newValue = newValue.slice(0, i);
         }

         let reg = matrix
            .substr(0, input.value.length)
            .replace(/_+/g, (a) => {
               return "\\d{1," + a.length + "}";
            })
            .replace(/[+()]/g, "\\$&");
         reg = new RegExp("^" + reg + "$");
         if (
            !reg.test(input.value) ||
            input.value.length < 5 ||
            (keyCode > 20 && keyCode < 30)
         ) {
            input.value = newValue;
         }
         if (event.type == "blur" && input.value.length < 5) {
            input.value = "";
         }
      };
      input.addEventListener("input", mask, false);
      input.addEventListener("focus", mask, false);
      input.addEventListener("blur", mask, false);
      input.addEventListener("keydown", mask, false);
   });
};
maskPhone();
//------------------ render Doctor
var doctors = [];


   fetch("../data/doctors.json")
   .then((d) => d.json())
   .then((data) => {
      doctors = data.doctors;
      for (let i=0; i<doctors.length; i++){

        const html = `
               <div class="doctors__column">
                 <div class="doctors__item item-doctors">
                   <div class="item-doctors__mainimage"><img class="doctor-image1" src="img/doctors/${doctors[i].imgSrc}.jpg" alt=""></div>
                   <div class="item-doctors__hover">
                     <div class="item-doctors__img"><img class="doctor-image2" src="img/doctors/${doctors[i].imgSrcHover}.jpg" alt=""></div>
                     <div class="item-doctors__content">
                       <div class="item-doctors__label">${doctors[i].name}</div>
                       <div class="item-doctors__text">${doctors[i].prof}</div>
                       <button type="button" onclick="_createPopup(${doctors[i].id})" class="item-doctors__btn ">Записаться</button>
                     </div>
                   </div>
                 </div>
               </div>
      `;
         let j=6;
         if (doctors[i].parent_weight < j){
            document.querySelector('.doctors__row--1')?.insertAdjacentHTML('afterbegin', html)
         }
            document.querySelector('.doctors__row--2')?.insertAdjacentHTML('afterbegin', html)
      }

   })
// .catch(() => console.log("Error data.json"));


// ${i18next.t('doctors.popup.btn')}

//------------------ render Service
var services = [];

fetch("../data/services-data.json")
   .then((d) => d.json())
   .then((data) => {
      services = data.services;
      renderService();
      return new Swiper(".services__slider.swiper-container", {
         slidesPerView: 4,
         centeredSlides: true,
         initialSlide: 1,
         spaceBetween: 60,
         autoHeight: false,
         loop: true,
         autoplay: false,
         speed: 600,
         breakpoints: {
            320: {
               slidesPerView: 1.5,
               spaceBetween: 20,
               allowSlidePrev: true,
               allowSlideNext: true,
               allowTouchMove: true,
            },
            370: {
               slidesPerView: 2,
               spaceBetween: 20,
               allowSlidePrev: true,
               allowSlideNext: true,
               allowTouchMove: true,
            },
            630: {
               slidesPerView: 3,
               spaceBetween: 20,
               allowSlidePrev: true,
               allowSlideNext: true,
               allowTouchMove: true,
            },
            768: {
               slidesPerView: 4,
               spaceBetween: 20,
               allowSlidePrev: true,
               allowSlideNext: true,
               allowTouchMove: true,
            },
            990: {
               slidesPerView: 5,
               spaceBetween: 20,
               allowSlidePrev: true,
               allowSlideNext: true,
            },
         },
      });
   })
// .catch(() => console.log("Error services-data.json"));

const toService = (service) =>
   `
           <div class="services__slide slide-box swiper-slide">
                <img src="img/services/box-img.png" alt="" class="slide-box__topimage">
                <div class="slide-box__image first"><img src="img/services/${service.imgSrc}.png" alt=""></div>
                <div class="slide-box__label">${service.label}</div>
                <div class="slide-box__text"> ${service.texts}</div>
                <a href="catalog.html"  class="slide-box__link">${service.link}</a>
           </div>
   `;

function renderService() {
   const html = services.map(toService).join("");
   document.querySelector("#services-content").innerHTML = html;
}

// ----------- popup ---------------
let body = document.querySelector("body");

function _createPopup(id) {
   const doctor = doctors.find((f) => f.id === id);
   let popup = document.querySelector("#popup");

   if (doctor) {
      popup.classList.add("_active");

      body.classList.add("_lock");
      popup.insertAdjacentHTML(
         "afterbegin",
         `<div class="popup">
                  <div class="popup__body">
                    <button type="button" class="popup__close"><img src="img/close.png" alt=""></button>
                    <div class="popup__image"><img src="img/doctors/${doctor.imgSrcHover}.jpg" alt=""></div>
                    <div class="popup__right">
                      <div class="popup__topcontent">
                        <div class="popup__title">${i18next.t('doctors.popup.title')}<span> ${doctor.name}</span></div>
                        <div class="popup__prof">${doctor.prof}</div>
                        <div class="popup__time">${doctor.time_start} ${doctor.time_end}</div>
                        <div class="popup__days">${doctor.working_days}</div>
                      </div>
                      <div class="popup__main">
                        <div class="popup__form">
                          <form class="pform">
                            <div class="pform__group">
                              <label>${i18next.t('doctors.popup.label1')}</label>
                              <input type="text" name="name" autocomplete="off" id="d-name" placeholder="${i18next.t('doctors.popup.label1')}">
                            </div>
                            <div class="pform__group">
                              <label>${i18next.t('doctors.popup.label2')}</label>
                              <input type="text" id="d-phone" autocomplete="off"  name="phone" placeholder="${i18next.t('doctors.popup.label2')}">
                            </div>
                            <div class="pform__group">
                            <div class="g-recaptcha" id="recaptcha-doctor"  data-sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"></div>
                            </div>
                            <button type="submit" class="pform__btn">${i18next.t('doctors.popup.btn')}</button>
                          </form>
                        </div>
                        <div class="popup__info">
                          ${doctor.description}
                        </div>
                      </div>
                    </div>
                  </div>
               </div>`
      );
      maskPhone()
      setTimeout(() => {
         popup.children[0].classList.add("_active");
      }, 20);

      let popupCloseBtn = document.querySelector(".popup__close");
      popupCloseBtn.addEventListener("click", _closePopup);

      function _closePopup() {
         popup.classList.remove("_active");
         popup.children[0].classList.remove("_active");
         body.classList.remove("_lock");
      }

      popup.addEventListener("click", function (e) {
         if (e.target.children[0]?.classList.contains("_active")) {
            _closePopup();
         }
      });

      //  validation jQuery
      jQuery.validator.setDefaults({
         debug: false,
         success: "valid",
      });

      $(document).ready(function () {
         $(".pform").validate({
            rules: {
               name: {
                  required: true,
                  minlength: 3,
               },
               phone: {
                  required: true,
                  minlength: 19,
               },
            },
            submitHandler: function () {
               var firstname = $("#d-name").val();
               var phone = $("#d-phone").val();
               var formData = {
                  firstname,
                  phone,
               };
               console.log(formData);
            },
         });
      });

      //----- sweetalert ------
      $(".pform__btn").click(function () {
         if ($(".pform").validate().checkForm()) {
            _closePopup();
            return Swal.fire({
               position: "center",
               icon: "success",
               title: i18next.t('doctors.alertTitle'),
               showConfirmButton: false,
               timer: 1500,
            });
         }
      });
   }

   var recaptchaDoctor = document.querySelector("#recaptcha-doctor");
   if (recaptchaDoctor) {
      grecaptcha.render("recaptcha-doctor");
   }
}

// =======================================================================================================
// Validation Contact
jQuery.validator.setDefaults({
   debug: false,
   success: "valid",
});

$(document).ready(function () {
   $(".form").validate({
      rules: {
         name: {
            required: true,
            minlength: 3,
         },
         phone: {
            required: true,
            minlength: 19,
         },
      },
      submitHandler: function () {
         var firstname = $("#name").val();
         var phone = $("#phone").val();
         var formData = {
            firstname,
            phone,
         };
         console.log(formData);
      },
   });
});

//----- sweetalert ------
$(".form__btn").click(function () {
   if ($(".form").validate().checkForm()) {
      return Swal.fire({
         position: "center",
         icon: "success",
         title: i18next.t('contact.alertTitle'),
         showConfirmButton: false,
         timer: 1500,
      });
   }
});

var recaptchaDoctor = document.querySelector("#recaptcha-contact");
if (recaptchaDoctor) {
   // grecaptcha.render("recaptcha-contact");
}


