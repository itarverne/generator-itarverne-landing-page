import addFavicon from './helpers';
import LazyLoad from 'vanilla-lazyload';
const bowser = require('bowser');

if (bowser.msie) {
  $('.browser').removeClass('hide');
} else if (bowser.msedge && bowser.version < 12) {
  $('.browser').removeClass('hide');
} else if (bowser.chrome && bowser.version < 64) {
  $('.browser').removeClass('hide');
} else if (bowser.firefox  && bowser.version < 58) {
  $('.browser').removeClass('hide');
}

$(document).ready(() => {
  new LazyLoad();

  $(document).foundation();

  if(document.cookie.indexOf('cookie_enabled') == -1)
  {
    $('.header__cookies').removeClass('hide');        
  }
  $('#js-cookie__validate').click(() => {
    if(document.cookie.indexOf('cookie_enabled') == -1)
    {
      document.cookie = 'cookie_enabled=true; expires=Fri, 3 Aug 2100 20:47:11 UTC; path=/';  
      $('.header__cookies').addClass('hide');         
    }
  });

  addFavicon();

});