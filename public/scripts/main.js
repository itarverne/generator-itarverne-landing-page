import addFavicon from './helpers';

$(document).ready(() => {
  $(document).foundation();

  if(document.cookie.indexOf('cookie_enabled') == -1)
  {
    $('.callout').removeClass('hide');        
  }
  $('#cookie__validate').click(() => {
    if(document.cookie.indexOf('cookie_enabled') == -1)
    {
      document.cookie = 'cookie_enabled=true; expires=Fri, 3 Aug 2100 20:47:11 UTC; path=/';  
      $('.callout').addClass('hide');         
    }
  });

  addFavicon();

});