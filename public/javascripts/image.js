jQuery(document).ready(function() {
  var edit_notes = $('#edit_notes').val() == "true";
  $('.jquery-note_1-1').jQueryNotes({
    operator: '/tags',
    maxNotes: 25,
    allowAuthor: false,
    allowEdit: edit_notes,
    allowHide: false,
    allowAdd: edit_notes,
    allowDelete: edit_notes,
    allowLinks: false
  });
});