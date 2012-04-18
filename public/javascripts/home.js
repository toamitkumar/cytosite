jQuery(document).ready(function() {

  jQuery('#mycarousel').jcarousel({
    scroll: 1,
    animation: 3000,
    auto: 1,
    wrap: 'circular',
    itemFallbackDimension: 300
  });

  jQuery('#home_link a').addClass("selected");
});