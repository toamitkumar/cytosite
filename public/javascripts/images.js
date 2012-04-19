jQuery(document).ready(function() {
  jQuery('#categories').change(function(){
    document.location.href = document.location.href + '?category_code=' + $(this).val();
  });

  jQuery('#admin_link a').addClass("selected");
});