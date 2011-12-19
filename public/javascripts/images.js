jQuery(document).ready(function() {
  jQuery('#categories').change(function(){
    document.location.href = document.location.href + '?category_code=' + $(this).val();
  });
});