

var images = [];

fetch('../data/imageData.json')
   .then(i => i.json())
   .then(img => {
      images = img.images
      renderImage()
   });

const imgHtml = (image) =>
   `
    <a data-fancybox="images" href="img/${image.url}.jpg" class="gallery__item gallery__item--${image.id}"><img src="img/${image.urlprev}.jpg" alt="${image.imgAlt}" class="gallery__img"></a>
   `;

function renderImage(){
   const html = images.map(imgHtml).join('');
   document.querySelector('.gallery').innerHTML = html;
}