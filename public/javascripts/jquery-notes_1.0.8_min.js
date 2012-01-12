/*----------------------------------------
 * jQuery Notes 1.0.8
------------------------------------------
 * Autor		Lukas Rydygel
 * Version		1.0.8
 * Date			26.05.2010
 * Copyright		2010 - Lukas Rydygel
 * Agency		SquareFlower Websolutions
----------------------------------------*/

(function($) {

    $.fn.jQueryNotes = function(settings) {

	/**
	 * @description
	 * settings for the plugin
	 */
	settings = jQuery.extend({
	    minWidth: 50,
	    minHeight: 50,
	    maxWidth: '',
	    maxHeight: '',
	    aspectRatio: false,
	    allowAdd: true,
	    allowEdit: true,
	    allowDelete: true,
	    allowHide: true,
	    allowReload: true,
	    allowLink: true,
	    allowAuthor: true,
	    dateFormat: 'Y/D/M H:I',
	    hideNotes: false,
	    loadNotes: true,
	    helper: '',
	    maxNotes: null,
	    operator: 'jquery-notes_php/notes.php'
	}, settings);

	/**
	 * @description
	 * plugin object
	 */
	var ID = {};

	/**
	 * @description
	 * gets properties for matched objects
	 *
	 * @param required	: int pointer
	 *
	 * @return		: none
	 */
	var _getProperties = function(pointer) {

	    var image = $('#jquery-notes_'+pointer+' img');

	    ID.timeout;
	    ID.firstLoad = true;
	    ID.add = false;
	    ID.edit = false;
	    ID.set = false;
	    ID.move = false;
	    ID.image = image.attr('src');
	    ID.width = image.width();
	    ID.height = image.height();
	    ID.left = image.offset().left;
	    ID.top = image.offset().top;

	}

	/**
	 * @description
	 * configurates the settings
	 *
	 * @param required	: int pointer
	 *
	 * @return		: none
	 */
	var _configSettings = function(pointer) {

	    ID.minWidth = (settings.minWidth.toString().match('%')) ? _percentToPixel(pointer, settings.minWidth, 'width') : ID.minWidth = settings.minWidth;

	    if (ID.minWidth > ID.width) {

		ID.minWidth = ID.width;
		ID.maxWidth = ''

	    } else {

		ID.maxWidth = (settings.maxWidth.toString().match('%')) ? _percentToPixel(pointer, settings.maxWidth, 'width') : ID.maxWidth = settings.maxWidth;
		ID.maxWidth = (ID.maxWidth > ID.width) ? ID.width : ID.maxWidth;

	    }

	    ID.minHeight = (settings.minHeight.toString().match('%')) ? _percentToPixel(pointer, settings.minHeight, 'height') : ID.minHeight = settings.minHeight;

	    if (ID.minHeight > ID.height) {

		ID.minHeight = ID.height;
		ID.maxHeight = ''

	    } else {

		ID.maxHeight = (settings.maxHeight.toString().match('%')) ? _percentToPixel(pointer, settings.maxHeight, 'height') : ID.maxHeight = settings.maxHeight;
		ID.maxHeight = (ID.maxHeight > ID.height) ? ID.height : ID.maxHeight;

	    }

	    ID.aspectRatio = (settings.aspectRatio) ? ID.minWidth/ID.minHeight : false;

	}

	/**
	 * @description
	 * initial the plugin and forced to load image
	 *
	 * @param required	: obj matchedObj
	 *
	 * @return		: none
	 */
	var _initPlugin = function(matchedObj) {

	    var timestamp = new Date().getTime();

	    var src = $(matchedObj).attr('src');

	    $(matchedObj).attr({
		src: src+'?timestamp='+timestamp
	    });

	    $(matchedObj).one('load', function() {

		$(this).attr({
		    src: src
		});

		var pointer = $('.jquery-notes-container').length;
		pointer++;

		ID = {};

		_setContainer(this, pointer);

		_getProperties(pointer);

		_configSettings(pointer);

		_createHtml(pointer);

		_getNotes(pointer);

	    });

	}

	/**
	 * @description
	 * the matched object gets a container
	 *
	 * @param required	: obj matchedObj
	 * @param required	: int pointer
	 *
	 * @return		: none
	 */
	var _setContainer = function(matchedObj, pointer) {

	    var cssClass = $(matchedObj).attr('class');

	    var style = $(matchedObj).attr('style');

	    $(matchedObj).wrap('<div id="jquery-notes_'+pointer+'" class="jquery-notes-container clearfix" />').removeAttr('class', 'style').css({
		padding: 0,
		margin: 0,
		border: 'none',
		outline: 'none',
		background: 'none'
	    });

	    $('#jquery-notes_'+pointer).addClass(cssClass).addClass(settings.helper).attr({
		style: style
	    });

	}

	/**
	 * @description
	 * creates the html
	 *
	 * @param required	: int pointer
	 *
	 * @return		: none
	 */
	var _createHtml = function(pointer) {

	    $('#jquery-notes_'+pointer+' img').wrap('<div class="notes clearfix" />');

	    $('#jquery-notes_'+pointer+' .notes').append('<div class="layer"></div><div class="loading"><div class="message"></div></div>');

	    $('#jquery-notes_'+pointer+' .notes .loading').css({
		marginTop: ((ID.height/2)-13)+'px'
	    })

	    $('#jquery-notes_'+pointer+' .notes').mousedown(function(event) {
		_addNote(pointer, event);
	    }).mouseup(function(event) {
		_setNote(pointer, event);
	    });

	    $('#jquery-notes_'+pointer).append('<div class="controller clearfix" />').width(ID.width);

	    var html = '';

	    html += '<a href="javascript:void(0);" class="counter" title="0 notes" />';

	    html += (settings.allowAdd) ? '<a href="javascript:void(0);" class="add-note" title="add" />' : '';

	    html += (settings.allowHide && settings.loadNotes) ? '<a href="javascript:void(0);" class="hide-notes" title="hide" />' : '';

	    html += (settings.allowReload && settings.loadNotes) ? '<a href="javascript:void(0);" class="reload-notes" title="reload" />' : '';

	    $('#jquery-notes_'+pointer+' .controller').append(html);

	    $('#jquery-notes_'+pointer+' .add-note').click(function() {
		_startAdd(pointer);
	    });

	    $('#jquery-notes_'+pointer+' .hide-notes').click(function() {
		_hideNotes(pointer);
	    });

	    $('#jquery-notes_'+pointer+' .reload-notes').click(function() {
		_reload(pointer);
	    });

	    _removeLink(pointer);

	}

	/**
	 * @description
	 * removes a surrounding link
	 *
	 * @param required	: int pointer
	 *
	 * @return		: none
	 */
	var _removeLink = function(pointer) {

	    var wrapperLink = $('#jquery-notes_'+pointer).parent('a');

	    if (wrapperLink.length == 1) {

		$('#jquery-notes_'+pointer+' .controller').append('<a href="'+$(wrapperLink).attr('href')+'" class="link" title="link" />');

		$('#jquery-notes_'+pointer).unwrap();

	    }

	}

	/**
	 * @description
	 * counts the notes of an image
	 *
	 * @param required	: int pointer
	 *
	 * @return		: none
	 */
	var _countNotes = function(pointer) {
	    return $('#jquery-notes_'+pointer+' .notes').children('.note').length;
	}

	/**
	 * @description
	 * start loading
	 *
	 * @param required	: int pointer
	 * @param required	: string message
	 *
	 * @return		: none
	 */
	var _startLoading = function(pointer, message) {

	    $('#jquery-notes_'+pointer+' .notes .layer').fadeIn('middle');
	    $('#jquery-notes_'+pointer+' .notes .loading').fadeIn('middle');
	    $('#jquery-notes_'+pointer+' .notes .loading .message').text(message);

	}

	/**
	 * @description
	 * stop loading
	 *
	 * @param required	: int pointer
	 *
	 * @return		: none
	 */
	var _stopLoading = function(pointer) {

	    ID.timeout = undefined;

	    (ID.timeout != undefined) ? clearTimeout(ID.timeout) : '';

	    ID.timeout = setTimeout(function() {

		ID.timeout = undefined;

		$('#jquery-notes_'+pointer+' .notes .layer').fadeOut('middle');
		$('#jquery-notes_'+pointer+' .notes .loading').fadeOut('middle');
		$('#jquery-notes_'+pointer+' .notes .loading .message').text('');

	    }, 1000);

	}

	/**
	 * @description
	 * gets all notes of an image
	 *
	 * @param required	: int pointer
	 *
	 * @return		: none
	 */
	var _getNotes = function(pointer) {

	    if (settings.loadNotes) {

		$.ajax({
		    url: settings.operator + '/' + jQuery('#image_id').val(),
		    global: false,
		    timeout: 15000,
		    dataType: 'json',
		    beforeSend: function() {
			(ID.firstLoad) ? _startLoading(pointer, 'loading notes') : '';
		    },
		    success: function(data) {
			if (data) {
			    firstLoad = false;
			    $.each(data, function() {
				_printNote(pointer, this);
			    });
			    var counter = _countNotes(pointer);
			    $('#jquery-notes_'+pointer+' .controller .counter').attr('title', function() {
				return (counter == 1) ? counter+' note' : counter+' notes';
			    });
			    (counter >= settings.maxNotes && settings.maxNotes != null) ? $('#jquery-notes_'+pointer+' .add-note').hide() : $('#jquery-notes_'+pointer+' .add-note').show();
			    (settings.hideNotes) ? _hideNotes(pointer) : '';
			}

			_stopLoading(pointer);

		    }
		});

	    } else {
		_stopLoading(pointer);
	    }

	}

	/**
	 * @description
	 * prints a note
	 *
	 * @param required	: int pointer
	 * @param required	: obj note
	 *
	 * @return		: none
	 */
	var _printNote = function(pointer, note) {

	    var html = '<div id="n_'+pointer+'-'+note.ID+'" class="note"><div class="border"><div class="bg">'

	    html += '</div></div></div><div id="t_'+pointer+'-'+note.ID+'" class="text"><span class="txt">';

	    html += (note.NOTE != '') ? note.NOTE : note.LINK;

	    html += '</span>';

	    html += (note.AUTHOR != '' && settings.allowAuthor) ? '<span class="author"> - '+note.AUTHOR+'</span>' : '';

	    html += (note.DATE != '' && settings.dateFormat != '') ? '<span class="date">'+_formatDate(note.DATE)+'</span>' : '';

	    html += '</div>';

	    $('#jquery-notes_'+pointer+' .notes').append(html);

	    if (settings.allowDelete || settings.allowEdit) {

		$('#jquery-notes_'+pointer+' .notes #n_'+pointer+'-'+note.ID).mousedown(function(e) {

		    $(this).mouseup(function() {

			$(this).unbind('mouseup');

			(e.button == 2) ?  _openSettings(pointer, note.ID) : null;

		    });

		})[0].oncontextmenu = function() {
		    return false;
		}

	    }

	    var position = {
		'left': _percentToPixel(pointer, note.LEFT, 'left'),
		'top': _percentToPixel(pointer, note.TOP, 'top'),
		'width': _percentToPixel(pointer, note.WIDTH, 'width'),
		'height': _percentToPixel(pointer, note.HEIGHT, 'height')
	    };

	    $('#jquery-notes_'+pointer+' .notes #n_'+pointer+'-'+note.ID).css({
		left: position.left+'px',
		top: position.top+'px',
		width: position.width+'px',
		height: position.height+'px'
	    }).hover(function() {
		_focusOnNote(pointer, note.ID);
	    }, function() {
		_focusOffNote(pointer, note.ID);
	    });

	    $('#jquery-notes_'+pointer+' .notes #t_'+pointer+'-'+note.ID).css({
		left: position.left+'px',
		top: (parseFloat(position.top)+parseFloat(position.height))+'px'
	    });

	}

	/**
	 * @description
	 * focus on a note
	 *
	 * @param required	: int pointer
	 * @param required	: int id
	 *
	 * @return		: none
	 */
	var _focusOnNote = function(pointer, id) {

	    if (!ID.add && !ID.edit) {

		$('#jquery-notes_'+pointer+' .notes .note').addClass('offFocus');

		if (id != undefined) {

		    $('#jquery-notes_'+pointer+' .notes #n_'+pointer+'-'+id).removeClass('offFocus').addClass('onFocus');

		    $('#jquery-notes_'+pointer+' .notes #t_'+pointer+'-'+id).show().index(9990);

		}

	    }

	}

	/**
	 * @description
	 * focus off a note
	 *
	 * @param required	: int pointer
	 * @param required	: int id
	 *
	 * @return		: none
	 */
	var _focusOffNote = function(pointer, id) {

	    if (!ID.add && !ID.edit) {

		$('#jquery-notes_'+pointer+' .notes .note').removeClass('offFocus');

		if (id != undefined) {

		    $('#jquery-notes_'+pointer+' .notes #n_'+pointer+'-'+id).removeClass('onFocus');

		    $('#jquery-notes_'+pointer+' .notes #t_'+pointer+'-'+id).hide().index('auto');

		}

	    }

	}

	/**
	 * @description
	 * add a new note
	 *
	 * @param required	: int pointer
	 * @param required	: obj event
	 *
	 * @return		: none
	 */
	var _addNote = function(pointer, event) {

	    if (ID.add && !ID.set) {

		ID.set = true;
		ID.move = true;

		var position = {};

		position.left = event.pageX-ID.left;
		position.top = event.pageY-ID.top;

		$('#jquery-notes_'+pointer+' .notes').append('<div class="note select"><div class="border"><div class="bg"></div></div></div>');

		position.maxLeft = ID.width-ID.minWidth;
		position.maxTop = ID.height-ID.minHeight;

		position.left = (position.left > position.maxLeft) ? position.maxLeft : position.left;
		position.top = (position.top > position.maxTop) ? position.maxTop : position.top;

		$('#jquery-notes_'+pointer+' .notes .select').css({
		    width: ID.minWidth,
		    height: ID.minHeight,
		    left: position.left,
		    top: position.top,
		    cursor: 'move'
		}).draggable({
		    containment: 'parent',
		    cursor: 'move'
		}).resizable({
		    containment: 'parent',
		    minWidth: ID.minWidth,
		    minHeight: ID.minHeight,
		    maxWidth: ID.maxWidth,
		    maxHeight: ID.maxHeight,
		    aspectRatio: ID.aspectRatio,
		    handles: 'ne, se, sw, nw'
		});

	    }

	}

	/**
	 * @description
	 * set a new note
	 *
	 * @param required	: int pointer
	 * @param required	: obj event
	 *
	 * @return		: none
	 */
	var _setNote = function(pointer, event) {

	    if (ID.add && ID.set && ID.move) {

		ID.move = false;

		var html = '<div class="text-box">';

		html += (settings.allowAuthor) ? '<input type="text" name="author" value="" /><br />' : '';

		html += '<textarea name="note"></textarea><br />';

		html += '<a href="javascript:void(0);" class="save-note" title="save note"></a><a href="javascript:void(0);" class="cancel-note" title="cancel"></a></div>';

		$('#jquery-notes_'+pointer+' .notes .select').append(html);

		_inputFocus(pointer);

		$('#jquery-notes_'+pointer+' .notes .select .text-box .save-note').click(function() {
		    _saveNote(pointer, null, 'add');
		});

		$('#jquery-notes_'+pointer+' .notes .select .text-box .cancel-note').click(function() {

		    $('#jquery-notes_'+pointer+' .controller .cancel-note').removeClass('cancel-note').attr({
			title: 'add note'
		    });

		    _abort(pointer);

		});

	    }

	}

	/**
	 * @description
	 * input focus behaviour
	 *
	 * @param required	: int pointer
	 *
	 * @return		: none
	 */
	var _inputFocus = function(pointer) {

	    $('#jquery-notes_'+pointer+' .notes .select input[name="link"]').focusout(function() {
		($(this).val() == '') ? $(this).val('http://') : null;
	    });

	}

	/**
	 * @description
	 * save a note
	 *
	 * @param required	: int pointer
	 * @param required	: int id
	 *
	 * @return		: none
	 */
	var _saveNote = function(pointer, id, operation) {

	    var note = $('#jquery-notes_'+pointer+' .notes .select .text-box textarea').val();
	    var link = $('#jquery-notes_'+pointer+' .notes .select .text-box input[name="link"]').val();
	    var author = $('#jquery-notes_'+pointer+' .notes .select .text-box input[name="author"]').val();

	    link = (link == undefined) ? '' : link;
	    author = (author == undefined) ? '' : author;

	    var position = _getNotePosition(pointer);

	    $.ajax({
		url: settings.operator,
		global: false,
		timeout: 15000,
		type: 'POST',
		beforeSend: function() {
		    (id == undefined) ? _startLoading(pointer, 'saving note') : _startLoading(pointer, 'editing note');
		},
		data: 'tag[image_id]='+jQuery('#image_id').val()+
                  '&tag[left]='+position.left+'&tag[top]='+position.top+
                  '&tag[width]='+position.width+'&tag[height]='+position.height+
                  '&tag[note]='+note,
		success: function(data) {
		    if (data) {
			$('#jquery-notes_'+pointer+' .controller .cancel-note').removeClass('cancel-note').attr({
			    title: 'add note'
			});
			_reload(pointer);
		    } else {
			_stopLoading(pointer);
			alert('Can\'t save note.');
		    }
		}
	    });

	}

	/**
	 * @description
	 * delete a note
	 *
	 * @param required	: int pointer
	 * @param required	: int id
	 *
	 * @return		: none
	 */
	var _deleteNote = function(pointer, id) {
	    if (settings.allowDelete) {
		$.ajax({
		    url: settings.operator + '/' + id,
		    global: false,
		    timeout: 15000,
		    type: 'DELETE',
		    beforeSend: function() {
			_startLoading(pointer, 'deleting note');
		    },
		    success: function(data) {

			_stopLoading(pointer);

			(data) ? _reload(pointer) : alert('Can\'t delete note.');

		    }
		});

	    }

	}

	/**
	 * @description
	 * start adding a note
	 *
	 * @param required	: int pointer
	 *
	 * @return		: none
	 */
	var _startAdd = function(pointer) {

	    if (settings.allowAdd && (_countNotes(pointer) < settings.maxNotes || settings.maxNotes == null)) {

		if (ID.add) {

		    $('#jquery-notes_'+pointer+' .controller .cancel-note').removeClass('cancel-note').attr({
			title: 'add note'
		    });

		    _abort(pointer);

		} else if (!ID.add && !ID.edit) {

		    _abort(pointer);

		    _focusOnNote(pointer);

		    ID.add = true;

		    $('#jquery-notes_'+pointer+' .controller .add-note').addClass('cancel-note').attr({
			title: 'cancel'
		    });

		}

	    }

	}

	/**
	 * @description
	 * opens note settings
	 *
	 * @param required	: int pointer
	 * @param required	: int id
	 *
	 * @return		: none
	 */
	var _openSettings = function(pointer, id) {

	    if ((settings.allowEdit || settings.allowDelete) && !ID.edit && !ID.add) {

		ID.edit = true;

		$('#jquery-notes_'+pointer+' .notes #n_'+pointer+'-'+id).addClass('select');

		var note = $('#jquery-notes_'+pointer+' .notes #t_'+pointer+'-'+id+' .txt').text();
		var author = $('#jquery-notes_'+pointer+' .notes #t_'+pointer+'-'+id+' .author').text();

		author = author.substr(3, author.length);

		$('#jquery-notes_'+pointer+' .notes #t_'+pointer+'-'+id).remove();
		$('#jquery-notes_'+pointer+' .notes #n_'+pointer+'-'+id+' .border .bg a').remove();

		var html = '';

		html += '<div class="text-box">';

		if (settings.allowEdit) {

		    html += (settings.allowAuthor) ? '<input type="text" name="author" value="'+author+'" /><br />' : '';

		    html += '<textarea name="note">'+note+'</textarea><br />';

		    html += '<a href="javascript:void(0);" class="edit-note" title="edit" />';

		}

		html += '<a href="javascript:void(0);" class="cancel-note" title="cancel" />';

		html += (settings.allowDelete) ? '<a href="javascript:void(0);" class="delete-note" title="delete" />' : '';

		html += '</div>';

		$('#jquery-notes_'+pointer+' .notes .select').append(html);

		_inputFocus(pointer);

		$('#jquery-notes_'+pointer+' .notes .select').draggable({
		    containment: 'parent',
		    cursor: 'move'
		}).resizable({
		    containment: 'parent',
		    minWidth: ID.minWidth,
		    minHeight: ID.minHeight,
		    maxWidth: ID.maxWidth,
		    maxHeight: ID.maxHeight,
		    aspectRatio: ID.aspectRatio,
		    handles: 'ne, se, sw, nw'
		});

		$('#jquery-notes_'+pointer+' .notes .select .text-box .edit-note').click(function() {
		    _saveNote(pointer, id, 'edit');
		});

		$('#jquery-notes_'+pointer+' .notes .select .text-box .cancel-note').click(function() {
		    _reload(pointer);
		});

		$('#jquery-notes_'+pointer+' .notes .select .text-box .delete-note').click(function() {
		    _deleteNote(pointer, id);
		});

	    }

	}

	/**
	 * @description
	 * hides notes
	 *
	 * @param required	: int pointer
	 *
	 * @return		: none
	 */
	var _hideNotes = function(pointer) {

	    if (!ID.add && !ID.edit) {

		if ($('#jquery-notes_'+pointer+' .controller .hide-notes').hasClass('show-notes')) {

		    $('#jquery-notes_'+pointer+' .notes .note').css({
			visibility: 'visible'
		    });

		    $('#jquery-notes_'+pointer+' .controller .hide-notes').removeClass('show-notes').attr({
			title: 'hide notes'
		    });

		} else {

		    $('#jquery-notes_'+pointer+' .notes .note').css({
			visibility: 'hidden'
		    });

		    $('#jquery-notes_'+pointer+' .controller .hide-notes').addClass('show-notes').attr({
			title: 'show notes'
		    });

		}

	    }

	}

	/**
	 * @description
	 * reload notes
	 *
	 * @param required	: int pointer
	 *
	 * @return		: none
	 */
	var _reload = function(pointer) {

	    $('#jquery-notes_'+pointer+' .notes .note').remove();
	    $('#jquery-notes_'+pointer+' .notes .text').remove();

	    _getProperties(pointer);

	    _getNotes(pointer);

	}

	/**
	 * @description
	 * cencel and reset
	 *
	 * @param required	: int pointer
	 *
	 * @return		: none
	 */
	var _abort = function(pointer) {

	    $('#jquery-notes_'+pointer+' .notes .select').remove();

	    _getProperties(pointer);

	    _focusOffNote(pointer);

	}

	/**
	 * @description
	 * formats the date
	 *
	 * @param required	: array date
	 *
	 * @return		: string
	 */
	var _formatDate = function(date) {

	    var string = settings.dateFormat;

	    string = string.replace('Y', date.Y);
	    string = string.replace('M', date.M);
	    string = string.replace('D', date.D);
	    string = string.replace('H', date.H);
	    string = string.replace('I', date.I);

	    return string;

	}

	/**
	 * @description
	 * gets the position of a selcted note
	 *
	 * @param required	: int pointer
	 *
	 * @return		: obj
	 */
	var _getNotePosition = function(pointer) {

	    return {
		'left': _pixelToPercent(pointer, $('#jquery-notes_'+pointer+' .notes .select').css('left'), 'left'),
		'top': _pixelToPercent(pointer, $('#jquery-notes_'+pointer+' .notes .select').css('top'), 'top'),
		'width': _pixelToPercent(pointer, $('#jquery-notes_'+pointer+' .notes .select').css('width'), 'width'),
		'height': _pixelToPercent(pointer, $('#jquery-notes_'+pointer+' .notes .select').css('height'), 'height')
	    };

	}

	/**
	 * @description
	 * transforms pixel to percent
	 *
	 * @param required	: int pointer
	 * @param required	: int pixel
	 * @param required	: string type
	 *
	 * @return		: float
	 */
	var _pixelToPercent = function(pointer, pixel, type) {

	    pixel = parseInt(pixel.toString().replace('px', ''));

	    switch (type) {

		case 'left':
		case 'width':
		    var percent = (100/ID.width)*pixel;
		break;
		case 'top':
		case 'height':
		    var percent = (100/ID.height)*pixel;
		break;

	    }

	    return percent;

	}

	/**
	 * @description
	 * transforms percent to pixel
	 *
	 * @param required	: int pointer
	 * @param required	: float percent
	 * @param required	: string type
	 *
	 * @return		: int
	 */
	var _percentToPixel = function(pointer, percent, type) {

	    percent = parseFloat(percent.toString().replace('%', ''));

	    switch (type) {

		case 'left':
		case 'width':
		    var pixel = (percent/100)*ID.width;
		break;
		case 'top':
		case 'height':
		    var pixel = (percent/100)*ID.height;
		break;

	    }

	    return pixel;

	}

	/**
	 * @description
	 * initialize the plugin
	 */
	$(this).each(function() {
	    _initPlugin(this);
	});

    };

})(jQuery);