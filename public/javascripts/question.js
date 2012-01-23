jQuery(document).ready(function() {
  jQuery('#option' + jQuery('#correct_option_indx').val()).attr('checked', true);

  $('.jquery-note_1-1').jQueryNotes({
    operator: '/tags',
    maxNotes: 10,
    allowAuthor: false,
    allowEdit: false,
    allowHide: false,
    allowAdd: false,
    allowDelete: false,
    allowReload: false,
    allowLinks: false
  });

  jQuery('#question_category_code').change(function(){
    var cat_code = $(this).val();
    $.ajax({
      url: '/images/' + cat_code + "/category_images",
      success: function(data){
        $('#image').html(data);
      }
    });
  });

  jQuery('#submit_answer').click(function(){
    var question_id = $(this).attr('question_id');
    var option = $("input[@name=options]:checked").val();
    $.ajax({
      url: '/questions/' + question_id + "/correct_answer?option=" + option,
      success: function(data){
        $('#explanation').html(data);
        $('#submit_answer').remove();
      }
    });
  });

});