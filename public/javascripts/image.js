jQuery(document).ready(function() {
  $("#image_"+$("#image_id").val()).load(function() {
    if($(this).width() > 950) {
      $(this).width("950");
      $(this).height("633");
    }
  });
  var edit_notes = $('#edit_notes').val() == "true";
  $('.jquery-note_1-1').jQueryNotes({
    operator: '/tags',
    maxNotes: 25,
    allowAuthor: false,
    allowEdit: edit_notes,
    allowHide: false,
    allowAdd: edit_notes,
    allowDelete: edit_notes,
    allowLinks: false,
    loadNotes: false
  });
});