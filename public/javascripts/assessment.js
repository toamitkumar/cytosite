jQuery(document).ready(function() {

  jQuery('#assessment_category_code').change(function(){
    var cat_code = $(this).val();
    alert(cat_code);
    $.ajax({
      url: '/questions/' + cat_code + "/assessment_questions",
      success: function(data){
        alert('success');
        $('#questions').html(data);
      }
    });
  });

jQuery('#assessment_link a').addClass("selected");


});