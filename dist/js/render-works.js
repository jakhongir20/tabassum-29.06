// render works ------------------------------
var works = [];

fetch("../data/galery.json")
   .then((d) => d.json())
   .then((data) => {
      works = data.images;
      renderWorks();
   })
   .catch(() => console.log("Error galery.json"));


const toWorks = (item) =>
   `
   <div class="works__grid works__grid--${item.id}">
      <div class="works__item item-works">
      <div class="item-works__image"><img src="img/reviews/${item.imgSrc}.png" alt=""></div>
      <a href="${item.youtubeSrc ? item.youtubeSrc : item.bigImageSrc}" data-fancybox class="item-works__play">
         <i class="${item.play ? item.play : item.zoom}"></i>
      </a>
      </div>
   </div>
   `;

// img/reviews/${item.play ? item.play : item.zoom}.png"
function renderWorks() {
   const html = works.map(toWorks).join("");
   document.querySelector(".works__content").innerHTML = html;
}

//----------------------- i18n -----------------
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
})

$(".header__lang .header__lang--link").on("click", function (e) {
   e.preventDefault()
   var $this = $(this)
   $this.siblings(".selected").removeClass("selected")
   $this.addClass("selected")
   var selectedLang = $this.text()
   var currentLanguage = $this.data("language");
   changeLang(currentLanguage);
});