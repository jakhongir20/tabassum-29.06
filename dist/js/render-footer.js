//------------------ render Footer
function renderFooter(data) {
   const html = `   
      <div class="footer__column">
        <div class="footer__title" data-i18n="footer.titleWork">Рабочие часы:</div>
        <div class="footer__time time-footer">
               <p>${data.result.opening_hours.weekday_text[0]}</p>
                  <p>${data.result.opening_hours.weekday_text[1]}</p>
                  <p>${data.result.opening_hours.weekday_text[2]}</p>
                  <p>${data.result.opening_hours.weekday_text[3]}</p>
                  <p>${data.result.opening_hours.weekday_text[4]}</p>
                  <p>${data.result.opening_hours.weekday_text[5]}</p>
          <div>
            <p>Воскресенье</p>
            <span class="yesterday"> Выходной</span>
          </div>
        </div>
      </div>
      <div class="footer__column">
        <div class="footer__title" data-i18n="footer.titleContacts">Контакты:</div>
        <a href="tel:998935552212" class="footer__text">${data.result.international_phone_number}</a>
        <a href="emailto:loren@gmail.com" class="footer__text">loren@gmail.com</a>
        <p class="footer__text">${data.result.formatted_address}</p>
        <div class="footer__social">
        <ul class="social-footer__list">
                  <li><a href="" class="social__link"><i class="fab fa-facebook-square"></i></a></li>
                  <li><a href="" class="social__link"><i class="fab fa-instagram"></i></a></li>
                  <li><a href="" class="social__link"><i class="fab fa-youtube"></i></a></li>
                  <li><a href="" class="social__link"><i class="fab fa-telegram"></i></a></li>
               </ul>
        </div>
      </div>
   `;
   document.querySelector(".footer__row").insertAdjacentHTML("beforeend", html);
}
