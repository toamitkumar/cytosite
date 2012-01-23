jQuery(document).ready(function() {
  jQuery('#assessment_category_code').change(function(){
    var cat_code = $(this).val();
    $.ajax({
      url: '/questions/' + cat_code + "/assessment_questions",
      success: function(data){
        $('#questions').html(data);
      }
    });
  });
});