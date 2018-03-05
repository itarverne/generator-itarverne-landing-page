import addFavicon from './helpers';
const bowser = require('bowser');

if (bowser.msie && bowser.version < 11) {
  $('.browser').removeClass('hide');
} else if (bowser.chrome && bowser.version < 64) {
  $('.browser').removeClass('hide');
} else if (bowser.firefox  && bowser.version < 58) {
  $('.browser').removeClass('hide');
}

$(document).ready(() => {
  $(document).foundation();

  if(document.cookie.indexOf('cookie_enabled') == -1)
  {
    $('.callout').removeClass('hide');        
  }
  $('#js-cookie__validate').click(() => {
    if(document.cookie.indexOf('cookie_enabled') == -1)
    {
      document.cookie = 'cookie_enabled=true; expires=Fri, 3 Aug 2100 20:47:11 UTC; path=/';  
      $('.callout').addClass('hide');         
    }
  });

  addFavicon();

});