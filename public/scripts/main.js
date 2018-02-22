import device from 'current-device';
/*var sm = require('sitemap')
    , fs = require('fs');
*/
const generateMeta = (rel, size, href) => {
  var meta = document.createElement('meta');
  meta.setAttribute('rel', rel);
  meta.setAttribute('sizes', size);
  meta.setAttribute('href', href);
  meta.setAttribute('type', 'image/png');
  document.getElementsByTagName('head')[0].appendChild(meta);
}

// For Android and iOS
if( (device.ios() && (device.mobile() || device.tablet())) ||
  (device.androidPhone() || device.androidTablet())) {
  generateMeta('apple-touch-icon', '180x180', 'images/favicon/favicon_180x180.png');// iPhone 6+ iOS 8
  generateMeta('apple-touch-icon', '167x167', 'images/favicon/favicon_167x167.png');// iPad pro retina
  generateMeta('apple-touch-icon', '152x152', 'images/favicon/favicon_152x152.png');// iPad retina iOS 7
  generateMeta('apple-touch-icon', '144x144', 'images/favicon/favicon_144x144.png');// iPad retina iOS 6
  generateMeta('apple-touch-icon', '120x120', 'images/favicon/favicon_120x120.png');// iPhone retina iOS 7
  generateMeta('apple-touch-icon', '114x114', 'images/favicon/favicon_114x114.png');// iPhone retina iOS 6
  generateMeta('apple-touch-icon', '76x76', 'images/favicon/favicon_76x76.png');// iPad iOS 7
  generateMeta('apple-touch-icon', '72x72', 'images/favicon/favicon_72x72.png');// iPad iOS 6
  generateMeta('apple-touch-icon', '60x60', 'images/favicon/favicon_60x60.png');// iPhone iOS 7
  generateMeta('apple-touch-icon', '57x57', 'images/favicon/favicon_57x57.png');// iPhone iOS 6
  generateMeta('apple-touch-icon-precomposed', '57x57', 'images/favicon/favicon_57x57.png');
}

// For tile windows
if(device.windows()) {
  /*
  <meta name="application-name" content="My app">
  <meta name="msapplication-TileImage" content="images/favicon/favicon-144.png">
  <meta name="msapplication-TileColor" content="#2A2A2A">
   */
  // Small Windows 8 Star Screen Icon
  generateMeta('icon', '128x128', 'images/favicon/favicon_128x128.png');
  // IE10 Metro tile for pinned site
  generateMeta('icon', '144x144', 'images/favicon/favicon_144x144.png');
  // Medium Windows 8 Start Screen Icon
  generateMeta('icon', '270x270', 'images/favicon/favicon_270x270.png');
  // Wide Windows 8 Start Screen Icon
  generateMeta('icon', '558x270', 'images/favicon/favicon_558x270.png');
  // Large Windows 8 Start Screen Icon
  generateMeta('icon', '558x558', 'images/favicon/favicon_558x558.png');
}
// For TV
if(device.television()) {
  generateMeta('icon', '96x96', 'images/favicon/favicon_96x96.png');
}
// Chrome for android
if(device.android()) {
  generateMeta('icon', '196x196', 'images/favicon/favicon_196x196.png');
}
// Opera
generateMeta('icon', '228x228', 'images/favicon/favicon_228x228.png');


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

});