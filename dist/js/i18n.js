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

// --------- i18n --------------
$('.header__lang--link').click(function (e) {
   e.preventDefault()
})

function changeLang(selectedLang) {
   if (selectedLang) {
      window.Cookies.set("_culture", selectedLang);
      //$("#changeLanguage").attr("data-i18n", `commons.langs.${selectedLang}Lang`);
      // $("#currentLangIcon").removeClass("flag-icon flag-icon-uz flag-icon-ru").addClass(`flag-icon flag-icon-${selectedLang}`)
      window.i18next.changeLanguage(selectedLang, function (err, t) {
         $.extend($.validator.messages, window[`${selectedLang}LangValidationMessages`])
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
      backend: { loadPath: "../localization/app-{{lng}}.json" },
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
})

$(".header__lang .header__lang--link").on("click", function () {
   var $this = $(this)
   $this.siblings(".selected").removeClass("selected")
   $this.addClass("selected")
   var selectedLang = $this.text()
   var currentLanguage = $this.data("language");
   changeLang(currentLanguage);
});


//------------- for inputs i18n --------------------
var demoJson = {
   "demo": {
      "form": {
         "name": {
            "ru": "Ф.И.О",
            "uz": "F.I.SH",
         },
         "phone": {
            "ru": "Номер для связи",
            "uz": "Telefon raqam",
         }
      }
   }
};

(function () {
   this.I18n = function (defaultLang) {
      var lang = defaultLang || 'ru';
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

   $('.header__lang .header__lang--link-ru').on('click', function () {
      i18n.lang('ru');
      selectLang($(this));
   })
   $('.header__lang .header__lang--link-uz').on('click', function () {
      i18n.lang('uz');
      selectLang($(this));
   })

   function selectLang(picker) {
      $('.header__lang a').removeClass('selected');
      picker.addClass('selected');
   }
});