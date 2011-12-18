jQuery(document).ready(function() {
  jQuery('#mycarousel').jcarousel({
    scroll: 1,
    animation: 3000,
    auto: 2,
    wrap: 'circular',
    itemFallbackDimension: 300
  });
});