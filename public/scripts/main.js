import LazyLoad from 'vanilla-lazyload';
import addFavicon from './helpers';
const bowser = require('bowser');

if (bowser.msie) {
  $('.browser').removeClass('hide');
} else if (bowser.msedge && bowser.version < 12) {
  $('.browser').removeClass('hide');
} else if (bowser.chrome && bowser.version < 64) {
  $('.browser').removeClass('hide');
} else if (bowser.firefox && bowser.version < 58) {
  $('.browser').removeClass('hide');
}

// $(document).ready(() => {
new LazyLoad();

var youtube = document.querySelectorAll(".youtube");

for (var i = 0; i < youtube.length; i++) {

  var source = "https://img.youtube.com/vi/" + youtube[i].dataset.embed + "/sddefault.jpg";

  var image = new Image();
  image.src = source;
  image.addEventListener("load", function () {
    youtube[i].appendChild(image);
  }(i));

  youtube[i].addEventListener("click", function () {

    var iframe = document.createElement("iframe");

    iframe.setAttribute("height", "315");
    iframe.setAttribute("allowfullscreen", "");
    iframe.setAttribute("src", "https://www.youtube.com/embed/" + this.dataset.embed + "?rel=0&showinfo=0&autoplay=1");

    this.innerHTML = "";
    this.appendChild(iframe);
  });
};

if (document.cookie.indexOf('cookie_enabled') == -1) {
  $('.header__cookies').removeClass('hide');
}
$('#js-cookie__validate').click(() => {
  if (document.cookie.indexOf('cookie_enabled') == -1) {
    document.cookie = 'cookie_enabled=true; expires=Fri, 3 Aug 2100 20:47:11 UTC; path=/';
    $('.header__cookies').addClass('hide');
  }
});

addFavicon();

// });