var ruLangValidationMessages = {
   required: "Требуется заполнение",
   remote: "Исправьте это поле.",
   phone: "Пожалуйста, введите правилный адрес электронной почты.",
   url: "Пожалуйста, введите корректный адрес.",
   date: "Пожалуйста, введите правильную дату.",
   dateISO: "Please enter a valid date (ISO).",
   number: "Пожалуйста, введите корректное число.",
   digits: "Пожалуйста, вводите только цифры.",
   equalTo: "Пожалуйста, введите то же значение еще раз.",
   maxlength: $.validator.format("Пожалуйста, введите не более {0} символов."),
   minlength: $.validator.format("Пожалуйста, введите не менее {0} символов."),
   rangelength: $.validator.format("Введите значение от {0} до {1} символов."),
   range: $.validator.format("Введите значение от {0} до {1}."),
   max: $.validator.format("Введите значение, меньшее или равное {0}."),
   min: $.validator.format("Введите значение больше или равное {0}."),
   step: $.validator.format("Введите число, кратное {0}.")
};

var uzLangValidationMessages = {

   required: "To'ldirish talab qilinadi",
   remote: "Iltimos, ushbu maydonni tuzating.",
   phone: "Iltimos amaldagi e-pochta manzilingizni kiriting.",
   url: "Iltimos, to'gri URL manzilini kiriting.",
   date: "Iltimos, to'g'ri sanani kiriting.",
   dateISO: "Please enter a valid date (ISO).",
   number: "Iltimos, to'g'ri raqamni kiriting.",
   digits: "Iltimos, faqat raqamlarni kiriting.",
   equalTo: "Iltimos, yana bir xil qiymatni kiriting.",
   maxlength: $.validator.format("Iltimos, kamida {0} ta belgini kiriting."),
   minlength: $.validator.format("Kamida {0} ta belgi kiriting."),
   rangelength: $.validator.format("{0} va {1} ta belgidan iborat qiymatni kiriting."),
   range: $.validator.format("Iltimos, {0} va {1} oralig'idagi qiymatni kiriting."),
   max: $.validator.format("Iltimos, {0} dan kam yoki unga teng qiymatni kiriting."),
   min: $.validator.format("Iltimos, {0} dan katta yoki unga teng qiymatni kiriting."),
   step: $.validator.format("Iltimos, {0} raqamini kiriting.")
};

$('.language__link').click(function (e) {
   e.preventDefault()
})

function retranslateTitles() {
   $.each($('body [title]'), function (key, element) {
      if ($(element).attr('data-titleText'))
         $(element).attr('title', `${i18next.t($(element).attr('data-titleText'))}`)
            .attr('data-original-title', `${i18next.t($(element).attr('data-titleText'))}`)
   });
}

function changeLang(selectedLang) {
   if (selectedLang) {
      window.Cookies.set("_culture", selectedLang);
      //$("#changeLanguage").attr("data-i18n", `commons.langs.${selectedLang}Lang`);
      // $("#currentLangIcon").removeClass("flag-icon flag-icon-uz flag-icon-ru").addClass(`flag-icon flag-icon-${selectedLang}`)
      window.i18next.changeLanguage(selectedLang, function (err, t) {
         // $.extend($.validator.messages, window[`${selectedLang}LangValidationMessages`])
         $('body').localize();
         // retranslateTitles();
      });
   }
}

$(document).ready(function () {
   window.i18next.use(window.i18nextXHRBackend).init({
         selectorAttr: "",
         lng: Cookies.get("_culture"),
         fallbackLng: false,
         backend: {loadPath: "../localization/app-{{lng}}.json"},
         detection: {
            order: ['querystring', 'cookie'],
            caches: ['cookie']
         },
         returnObjects: true
      },
      function (err, t) {
         window.jqueryI18next.init(window.i18next, $, {
            optionsAttr: 'i18n-options',
            useOptionsAttr: true,
            parseDefaultValueFromContent: true
         });
      }
   );

   window.i18next.on('initialized',
      function (options) {
         window.i18next.changeLanguage(Cookies.get("_culture"),
            function (err, t) {
               setTimeout(function () {
                  let currentLanguage = window.Cookies.get("_culture");
                  if (!currentLanguage)
                     changeLang("ru");
                  else changeLang(currentLanguage);
               });
            });
      }
   );

   $.ajax({
      url: "https://maps.googleapis.com/maps/api/place/details/json?language=ru&placeid=ChIJWeSvNLb1rjgRZRxlgmOm1WA&key=AIzaSyDguAJ3Fy5_7telKiZkSXhJUlgDCkj46Q8",
      // url: "https://www.google.com/maps/place/41%C2%B018'40.3%22N+69%C2%B018'51.7%22E/@41.311206,69.314369,16z/data=!4m5!3m4!1s0x0:0x0!8m2!3d41.311206!4d69.314369",
      type: "GET",
      success: function (response) {
         storyRender(response);
         renderFooter(response)
      },
      error: function (xhr, ajaxOptions, thrownError) {
         console.log(thrownError);
      }
   });

})


function storyRender(data) {
   for (let i = 3; i < data.result.reviews.length; i++) {
      const html = `<div class="row">
                        <div class="story">
                           <div class="story__name">${data.result.reviews[i].author_name}</div>
                           <div class="story__text"><h3 class="rating heading-tertiary u-margin-bottom-small"></h3>
                              <p >${data.result.reviews[i].text}</p></div>
                        </div>
                    </div>`;
      document.querySelector('.section-stories').insertAdjacentHTML('beforeend', html)
   }
}

function initMap() {
   // debugger;
   // The location of flag
   var flag = {
      "lat": 41.3112195,
      "lng": 69.3142914
   };
   // The marker, positioned at flag
   // var marker = new google.maps.Marker({position: flag, map: map});

   var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: flag,
      mapTypeId: "terrain",
      streetViewControl: true,
      styles: [
         {
            "featureType": "all",
            "elementType": "all",
            "stylers": [
               {
                  "saturation": "32"
               },
               {
                  "lightness": "-3"
               },
               {
                  "visibility": "on"
               },
               {
                  "weight": "1.18"
               }
            ]
         },
         {
            "featureType": "administrative",
            "elementType": "labels",
            "stylers": [
               {
                  // "visibility": "off"
               }
            ]
         },
         {
            "featureType": "landscape",
            "elementType": "labels",
            "stylers": [
               {
                  // "visibility": "off"
               }
            ]
         },
         {
            "featureType": "landscape.man_made",
            "elementType": "all",
            "stylers": [
               {
                  "saturation": "-70"
               },
               {
                  "lightness": "14"
               }
            ]
         },
         {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [
               {
                  "visibility": "off"
               }
            ]
         },
         {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
               {
                  // "visibility": "off"
               }
            ]
         },
         {
            "featureType": "transit",
            "elementType": "labels",
            "stylers": [
               {
                  "visibility": "off"
               }
            ]
         },
         {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
               {
                  "saturation": "100"
               },
               {
                  "lightness": "-14"
               }
            ]
         },
         {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [
               {
                  "visibility": "off"
               },
               {
                  "lightness": "12"
               }
            ]
         }
      ],
   });
   const svgMarker = {
      path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
      fillColor: "blue",
      fillOpacity: 0.6,
      strokeWeight: 0,
      rotation: 0,
      scale: 2,
      anchor: new google.maps.Point(15, 30),
   };
   const image = "./img/map-image.svg";
   var marker = new google.maps.Marker(
      {
         position: flag,
         map: map,
         draggable: true,
         title: "Click to zoom",
         animation: google.maps.Animation.DROP,
         icon: image,
         // icon: svgMarker,
      }
   );
   const flightPlanCoordinates = [
      {lat: 41.30556379742413, lng: 69.30684673340023},
      {lat: 41.30862633622823, lng: 69.3113957595598},
      {lat: 41.31320375760532, lng: 69.31435691809763},
      {lat: 41.31678165895653, lng: 69.31654560049515}
   ];
   const flightPath = new google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: "#FFA35C",
      strokeOpacity: 2.0,
      strokeWeight: 3,
   });
   flightPath.setMap(map);
   map.addListener("center_changed", () => {
      window.setTimeout(() => {
         map.panTo(marker.getPosition());
      }, 3000);
   });
   marker.addListener("click", () => {
      map.setZoom(18);
      map.setCenter(marker.getPosition());
   });
}

initMap()

// render Footer
function renderFooter(data) {
   const html = `
            <div class="footer__column">
               <div class="footer__timework">
                  <div class="footer__title" data-i18n="footer.titleWork">Working hours</div>
                  <p>${data.result.opening_hours.weekday_text[0]}</p>
                  <p>${data.result.opening_hours.weekday_text[1]}</p>
                  <p>${data.result.opening_hours.weekday_text[2]}</p>
                  <p>${data.result.opening_hours.weekday_text[3]}</p>
                  <p>${data.result.opening_hours.weekday_text[4]}</p>
                  <p>${data.result.opening_hours.weekday_text[5]}</p>
                  <p>воскресенье: <span class="close">Закрыто</span></p>
               </div>
            </div>
            <div class="footer__column">
               <div class="footer__contacts">
                  <div class="footer__title" data-i18n="footer.titleContacts">Contacts</div>
                  <a href="" class="footer__phone">${data.result.international_phone_number}</a>
                  <a href="" class="footer__gmail">lorem@gmail.com</a>
                  <div class="footer__text">${data.result.formatted_address}</div>
               </div>
            </div>
   `;
   document.querySelector('.footer__row').insertAdjacentHTML('beforeend', html)
}

$(".navigation__item--lang .language__link").on("click", function () {
   var $this = $(this)
   $this.siblings(".selected").removeClass("selected")
   $this.addClass("selected")
   var selectedLang = $this.text()
   var currentLanguage = $this.data("language");
   changeLang(currentLanguage);
});


//---------------------------------
var demoJson = {
   "demo": {
      "form": {
         "name": {
            "ru": "ФИО",
            "uz": "FISH",
         },
         "phone": {
            "ru": "Номер телефона",
            "uz": "Telefon nomer",
         }
      }
   }
};

(function () {
   this.I18n = function (defaultLang) {
      var lang = defaultLang || 'uz';
      this.language = lang;

      (function (i18n) {
         i18n.contents = demoJson;
         i18n.contents.prop = function (key) {
            var result = this;
            var keyArr = key.split('.');
            for (var index = 0; index < keyArr.length; index++) {
               var prop = keyArr[index];
               result = result[prop];
            }
            return result;
         };
         i18n.localize();
      })(this);
   };

   this.I18n.prototype.hasCachedContents = function () {
      return this.contents !== undefined;
   };

   this.I18n.prototype.lang = function (lang) {
      if (typeof lang === 'string') {
         this.language = lang;
      }
      this.localize();
      return this.language;
   };

   this.I18n.prototype.localize = function () {
      var contents = this.contents;
      if (!this.hasCachedContents()) {
         return;
      }
      var dfs = function (node, keys, results) {
         var isLeaf = function (node) {
            for (var prop in node) {
               if (node.hasOwnProperty(prop)) {
                  if (typeof node[prop] === 'string') {
                     return true;
                  }
               }
            }
         }
         for (var prop in node) {
            if (node.hasOwnProperty(prop) && typeof node[prop] === 'object') {
               var myKey = keys.slice();
               myKey.push(prop);
               if (isLeaf(node[prop])) {
                  //results.push(myKey.reduce((prev, current) => prev + '.' + current));	//not supported in older mobile broweser
                  results.push(myKey.reduce(function (previousValue, currentValue, currentIndex, array) {
                     return previousValue + '.' + currentValue;
                  }));
               } else {
                  dfs(node[prop], myKey, results);
               }
            }
         }
         return results;
      };
      var keys = dfs(contents, [], []);
      for (var index = 0; index < keys.length; index++) {
         var key = keys[index];
         if (contents.prop(key).hasOwnProperty(this.language)) {
            $('[data-i18n="' + key + '"]').text(contents.prop(key)[this.language]);
            $('[data-i18n-placeholder="' + key + '"]').attr('placeholder', contents.prop(key)[this.language]);
            $('[data-i18n-value="' + key + '"]').attr('value', contents.prop(key)[this.language]);
         } else {
            $('[data-i18n="' + key + '"]').text(contents.prop(key)['uz']);
            $('[data-i18n-placeholder="' + key + '"]').attr('placeholder', contents.prop(key)['uz']);
            $('[data-i18n-value="' + key + '"]').attr('value', contents.prop(key)['uz']);
         }
      }
   };

}).apply(window);

$(document).ready(function () {

   var i18n = new I18n();
   i18n.localize();
   $('.lang-picker #english').addClass('selected');

   $('.navigation__item--lang .language__link--ru').on('click', function () {
      i18n.lang('ru');
      selectLang($(this));
   })
   $('.navigation__item--lang .language__link--uz').on('click', function () {
      i18n.lang('uz');
      selectLang($(this));
   })

   function selectLang(picker) {
      $('.navigation__item--lang a').removeClass('selected');
      picker.addClass('selected');
   }
});

function changeLang(selectedLang) {
   if (selectedLang) {
      window.Cookies.set("_culture", selectedLang);
      // $("#changeLanguage").attr("data-i18n", `commons.langs.${selectedLang}Lang`);
      // $("#currentLangIcon").removeClass("flag-icon flag-icon-uz flag-icon-ru").addClass(`flag-icon flag-icon-${selectedLang}`)
      window.i18next.changeLanguage(selectedLang, function (err, t) {
         $.extend($.validator.messages, window[`${selectedLang}LangValidationMessages`])
         $('body').localize();
         retranslateFormValidMessages();
         // retranslateTitles();
      });
   }
}

function retranslateFormValidMessages() {
   $.each($('form'), function (indexForm, form) {
      $.each($(form).validate().elements(), function (indexElement, element) {
         if ($(form).find('span.error').length > 0) {
            if ($(element).hasClass("error"))
               console.log('has error')
            $(element).addClass('has-content');
            $(form).validate().element($(element));
         }
      })
   })
}

$(document).ready(function () {
   $('nav a[href^="#"]').click(function () {
      let target = $(this).attr("href");
      body.classList.remove('_lock')
      $("html, body").animate(
         {
            scrollTop: $(target).offset().top,
         },
         1500
      );
      $('.navigation__nav').removeClass('_opacity')
      $('.navigation__background').removeClass('_scale0')
      $('.navigation__button').removeClass('._checked')
      $('.navigation__icon').removeClass('_checkspan')
      return false;
   });
   $('.navigation__button').click(function () {
      body.classList.toggle('_lock')
      $('.navigation__nav').toggleClass('_opacity');
      $('.navigation__background').toggleClass('_scale0');
      $(this).toggleClass('._checked')
      $('.navigation__icon').toggleClass('_checkspan')
   })

});