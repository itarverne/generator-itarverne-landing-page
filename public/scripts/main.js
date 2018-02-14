const device = require('current-device').default;

if(device.ios()) {
  var meta = document.createElement('meta');
  meta.setAttribute('rel', 'apple-touch-icon');
  meta.setAttribute('size', '152x152');
  meta.setAttribute('href', 'images/favicon/favicon_152x152.png');
  document.getElementsByTagName('head')[0].appendChild(meta);
}

$(document).ready(function(){
  $(document).foundation();

  if(document.cookie.indexOf('cookie_enabled') == -1)
  {
    $('.callout').removeClass('hide');        
  }
  $('#cookie__validate').click(function(){
    if(document.cookie.indexOf('cookie_enabled') == -1)
    {
      document.cookie = 'cookie_enabled=true; expires=Fri, 3 Aug 2100 20:47:11 UTC; path=/';  
      $('.callout').addClass('hide');         
    }
  });

});