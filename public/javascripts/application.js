// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

$(document).ready(function() {
    //find all form with class jqtransform and apply the plugin
    $("form.jqtransform").jqTransform();

    $("#UserSettings").dialog({
      autoOpen: false,
      show: "blind",
      hide: "blind",
      position: getOffset($('.welcome'), 785, 20),
      closeText: 'close',
      draggable: false,
      resizeable: false,
      dialogClass: 'modal_container',
      width: '100px',
      closeOnEscape: false,
      open: function(event, ui){
        $(".ui-dialog-titlebar-close").remove();
        $(".ui-dialog-titlebar").remove();
        $(this).css('min-height', '0px');
        $(this).css('height', '60px');
      }
    });

    $("#AdminMenu").dialog({
      autoOpen: false,
      show: "blind",
      hide: "blind",
      position: getOffset($('.welcome'), 748, 58),
      closeText: 'close',
      draggable: false,
      resizeable: false,
      dialogClass: 'modal_container',
      width: '130px',
      closeOnEscape: false,
      open: function(event, ui){
        $(".ui-dialog-titlebar-close").remove();
        $(".ui-dialog-titlebar").remove();
        $(this).css('min-height', '0px');
        $(this).css('height', '100px');
      }
    });

    $('.user_det').click(function(){
      if($('#UserSettings').is(":visible")) {
        $( "#UserSettings" ).dialog("close");
      } else {
        if($('#AdminMenu').is(":visible")) {
          $( "#AdminMenu" ).dialog("close");
        }
        $( "#UserSettings" ).dialog("open");
      }
      return false;
    });

    $('#admin_link').click(function(){
      if($('#AdminMenu').is(":visible")) {
        $( "#AdminMenu" ).dialog("close");
      } else {
        if($('#UserSettings').is(":visible")) {
          $( "#UserSettings" ).dialog("close");
        }
        $( "#AdminMenu" ).dialog("open");
      }
      return false;
    });
  
});

function getOffset(el, offsetLeft, offsetTop) {
    var left = el.position().left;
    var top = el.position().top;
    return [left + offsetLeft, top + offsetTop];
}
