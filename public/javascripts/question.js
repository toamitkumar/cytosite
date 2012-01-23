jQuery(document).ready(function() {
  jQuery('#option' + jQuery('#correct_option_indx').val()).attr('checked', true);

  var edit_notes = $('#edit_notes').val() == "true";
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
});