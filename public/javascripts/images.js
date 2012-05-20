jQuery(document).ready(function() {

	$("a.thumb").click(function() {
		var that = $(this);
    addCaption(that);
    addAdminEditLink(that.attr("data-link"));
    updateImageId(that);
	});

  jkmegamenu.definemenu("megaanchor1", "megamenu1", "click");

  jQuery('#image_link a').addClass("selected");

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
      numThumbs:                 9,
      preloadAhead:              9,
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
      enableHistory:             false,
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

        addAdminEditLink(this.find("ul.thumbs > li.selected a").attr("data-link"));
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
      },
      onTransitionIn: function(newSlide, newCaption, isSync) {
        var editAllowed = $('#editAllowed').val() == "true"; 
        $("a.advance-link img").jQueryNotes({
          operator: '/tags',
          maxNotes: 25,
          allowAuthor: false,
          allowEdit: editAllowed,
          allowHide: false,
          allowAdd: editAllowed,
          allowDelete: editAllowed,
          allowLinks: false,
          loadNotes: true
        });
        newSlide.fadeTo(this.getDefaultTransitionDuration(isSync), 1.0);
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

function addCaption(dataCaptionLink) {
  var data = JSON.parse(dataCaptionLink.attr("data-caption"));
  $("#image-name").html(data.name);
  $("#image-descr").html(data.descr);
  $("#image-cat").html(data.category);
}

function addAdminEditLink(imageEditLink) {
  if(imageEditLink != "") {
    $("#tagImage").attr("href", imageEditLink);
  }
}

function updateImageId(dataCaptionLink) {
  var data = JSON.parse(dataCaptionLink.attr("data-caption"));

  $("#image_id").val(data.id);
}