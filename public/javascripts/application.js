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

    /**************************Galleriffic begins****************************************/
    // We only want these styles applied when javascript is enabled
    try {
      $('div.content').css('display', 'block');

      // Initially set opacity on thumbs and add
      // additional styling for hover effect on thumbs
      var onMouseOutOpacity = 0.67;
      $('#thumbs ul.thumbs li, div.navigation a.pageLink').opacityrollover({
        mouseOutOpacity:   onMouseOutOpacity,
        mouseOverOpacity:  1.0,
        fadeSpeed:         'fast',
        exemptionSelector: '.selected'
      });
      var gallery = $('#thumbs').galleriffic({
            delay:                     2500,
            numThumbs:                 10,
            preloadAhead:              10,
            enableTopPager:            false,
            enableBottomPager:         false,
            imageContainerSel:         '#slideshow',
            controlsContainerSel:      '#controls',
            captionContainerSel:       '#caption',
            loadingContainerSel:       '#loading',
            renderSSControls:          true,
            renderNavControls:         true,
            playLinkText:              'Play Slideshow',
            pauseLinkText:             'Pause Slideshow',
            prevLinkText:              '&lsaquo; Previous Photo',
            nextLinkText:              'Next Photo &rsaquo;',
            nextPageLinkText:          'Next &rsaquo;',
            prevPageLinkText:          '&lsaquo; Prev',
            enableHistory:             true,
            autoStart:                 false,
            syncTransitions:           true,
            defaultTransitionDuration: 500,
            onSlideChange:             function(prevIndex, nextIndex) {
              // 'this' refers to the gallery, which is an extension of $('#thumbs')
              this.find('ul.thumbs').children()
                .eq(prevIndex).fadeTo('fast', onMouseOutOpacity).end()
                .eq(nextIndex).fadeTo('fast', 1.0);

              // Update the photo index display
              this.$captionContainer.find('div.photo-index')
                .html('Photo '+ (nextIndex+1) +' of '+ this.data.length);
            },
            onPageTransitionOut:       function(callback) {
              this.fadeTo('fast', 0.0, callback);
            },
            onPageTransitionIn:        function() {
              var prevPageLink = this.find('a.prev').css('visibility', 'hidden');
              var nextPageLink = this.find('a.next').css('visibility', 'hidden');
              
              // Show appropriate next / prev page links
              if (this.displayedPage > 0)
                prevPageLink.css('visibility', 'visible');

              var lastPage = this.getNumPages() - 1;
              if (this.displayedPage < lastPage)
                nextPageLink.css('visibility', 'visible');

              this.fadeTo('fast', 1.0);
            }
          });

          /**************** Event handlers for custom next / prev page links **********************/

          gallery.find('a.prev').click(function(e) {
            gallery.previousPage();
            e.preventDefault();
          });

          gallery.find('a.next').click(function(e) {
            gallery.nextPage();
            e.preventDefault();
          });
          /******************Galleriffic end*****************************************************/
        } catch(e) {}
});

function getOffset(el, offsetLeft, offsetTop) {
    var left = el.position().left;
    var top = el.position().top;
    return [left + offsetLeft, top + offsetTop];
}
