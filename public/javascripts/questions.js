jQuery(document).ready(function() {


  jQuery('#admin_link a').addClass("selected");

  jQuery('#questionsTable').dataTable({
    "aoColumns": [{"bSortable": true}, {"bSortable": true},
      {"bSortable": true}, {"bSortable": false}]
  });


});