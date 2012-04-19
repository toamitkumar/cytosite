jQuery(document).ready(function() {
  jQuery('div.jqTransformSelectWrapper ul li a').click(function(){
    var categoryCode = jQuery('#categories').val();
    document.location.href = document.location.href + '?category_code=' + categoryCode;
  });

  jQuery('#admin_link a').addClass("selected");
});