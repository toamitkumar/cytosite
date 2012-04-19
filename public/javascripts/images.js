jQuery(document).ready(function() {
  jQuery('div.jqTransformSelectWrapper ul li a').click(function(){
    var categoryCode = jQuery('#categories').val();
    document.location.href = document.location.href + '?category_code=' + categoryCode;
  });

  jQuery('#image_link a').addClass("selected");
});