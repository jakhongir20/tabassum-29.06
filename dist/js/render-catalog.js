
// render catalog items ------------------------------
var items = [];

fetch("../data/catalog-items.json")
  .then((d) => d.json())
  .then((data) => {
    items = data.catalog_items;
    renderItems();

  })
  .catch(() => console.log("Error catalog-items.json"));


const toItems = (item) => `
  <div class="item-filter">
  <input type="checkbox"  class="items__type-input" id="label-id-${item.id}" data-item_name="${item.text}" />
    <label for="label-id-${item.id}" class="items__type">${item.text}</label>
  </div>
`;

function renderItems() {
  const html = items.map(toItems).join("");
  document.querySelector(".items").innerHTML = html;
}

// render catalog services ------------------------------
var catalog_services = [];

fetch("../data/catalog-services.json")
  .then((d) => d.json())
  .then((data) => {
    catalog_services = data.catalog_services;
    renderCatalogServices(catalog_services);
  })
  .catch(() => console.log("Error catalog-services.json"));


// let i = 0;
const toCatalogServices = (service) =>
  `
    <div class="catalog-content__column">
      <div class="cards">
        <div class="cards__label">${service.procedure_name}</div>
        <div class="cards__text">${service.parent_name}</div>
        <div class="cards__price"><span>${currency(service.price, { separator: ' ', pattern: '#' }).format()}</span>сум</div>
      </div>
    </div>
  `;

function renderCatalogServices(catalog_services_item) {
  const html = catalog_services_item.map(toCatalogServices).join("");
  document.querySelector(".catalog-content__row").innerHTML = html;
}

// search 
document.querySelector('#search').oninput = function () {
  let val = this.value.toLowerCase().trim();
  renderCatalogServices(catalog_services);
  let cardText = document.querySelectorAll('.catalog-content__row .catalog-content__column')
   $('.items__type-input').prop('checked', false)
  if (val != '') {
    cardText.forEach(function (elem) {
      if (elem.innerText.toLowerCase().search(val) == -1) {
        elem.classList.add('hide')
         $('.catalog-empty').removeClass('hide')
      } else {
        elem.classList.remove('hide')
         $('.catalog-empty').addClass('hide')
      }
    })
  } else {
    cardText.forEach(function (elem) {
      elem.classList.remove('hide')
       $('.catalog-empty').addClass('hide')
    })
  }
}

// =======================================================================================================
// filter items
var checkedItems = [];

function renderFilteredItems(){
    // debugger;
    // filtered
    if(checkedItems.length>0){
        var catalog_services_items = catalog_services.filter(f=> checkedItems.includes(f.parent_name.toLowerCase()))
        // var search_text = $('#search').val();
        // var catalog_services_searched_items = catalog_services.filter(f=>f.procedure_name.contains(search_text) || f.parent_name.contains(search_text));
        renderCatalogServices(catalog_services_items.sort(sortByWeight));
        console.log('items');
    }
    //all
    else{
        renderCatalogServices(catalog_services);
    }
}

function sortByWeight(a, b){
    return ((a.parent_weight < b.parent_weight) ? -1 : ((a.parent_weight > b.parent_weight) ? 1 : 0));
}

// =======================================================================================================
// download PDF
window.onload = function () {
  document.getElementById("download")
    .addEventListener("click", () => {
      const content = this.document.querySelector('.catalog-content')
      console.log(content);
      var opt = {
        margin: 1,
        filename: 'tabassum-file.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      html2pdf().from(content).set(opt).save();
    });

    $('.items__type-input').change(function (){
        //get all checked items
        checkedItems = [];
        $('.items__type-input:checked').each(function (){checkedItems.push($(this).attr('data-item_name').toLowerCase())});
        renderFilteredItems();
    });

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

$(".header__lang .header__lang--link").on("click", function (e) {
   e.preventDefault()
   var $this = $(this)
   $this.siblings(".selected").removeClass("selected")
   $this.addClass("selected")
   var selectedLang = $this.text()
   var currentLanguage = $this.data("language");
   changeLang(currentLanguage);
});


