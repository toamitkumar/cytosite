jQuery(document).ready(function() {
  $('.jquery-note_1-1').jQueryNotes({
    operator: '/tags',
    maxNotes: 10,
    allowAuthor: false,
    allowEdit: false,
    allowHide: false,
    allowLinks: false
  });
});