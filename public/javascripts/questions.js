jQuery(document).ready(function() {
  jQuery('#questionsTable').dataTable({
    "aoColumns": [{"bSortable": true}, {"bSortable": true},
      {"bSortable": true}, {"bSortable": true}, {"bSortable": false}]
  });
});