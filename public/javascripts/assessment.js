jQuery(document).ready(function() {

  jQuery('.jqTransformSelectWrapper li a').click(function(){
    var cat_code = $('#assessment_category_code').val();
    $.ajax({
      url: '/questions/' + cat_code + "/assessment_questions",
      success: function(data){
        $('#questions').html(data);
      }
    });
  });

jQuery('.jqTransformSelectWrapper').width(310);
jQuery('.jqTransformSelectWrapper ul').width(308);

jQuery('#admin_link a').addClass("selected");


});