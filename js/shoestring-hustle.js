if (window.location.pathname.indexOf('pages/edit') > -1 || window.location.pathname.indexOf('pages/new') > -1) {
	// we're in the editor
	
} else {
	// it's showtime
	var shel = function(id) {
		return document.getElementById(id);
	}
	var addEvent = function(el, event, fn) {
		if (el.addEventListener) {
			el.addEventListener(event, fn, false);
		} else {
			el.attachEvent("on" + event, function() {
				return(fn.call(el, window.event));   
			});
		}
	}
	
	var stylesheets = document.styleSheets;
	var length = stylesheets.length;
	for (var i = 0; i < stylesheets.length; i++) {
		if (stylesheets[i].href != null)
			stylesheets[i].disabled = stylesheets[i].href.indexOf('admin-styles') > -1 ? true : false; 
	}

	var wd = {},
		fbb = {},
		form_status = false,
		form_bucket_trigger = shel('form_bucket_trigger'),
		form_bucket_box = shel('form_bucket_box'),
		form_bucket_close = shel('form_bucket_close'),
		form_bucket_box_in = shel('form_bucket_box_in'),
		form_bucket_box_intro = shel('form_bucket_box_intro'),
		form_bucket = shel('form_bucket'),
		progress_bar = shel('progress_bar'),
		progress_bar_in = shel('progress_bar_in'),
		form_secure = shel('form_secure'),
		image_trigger = shel('image_trigger');

	document.body.appendChild(form_bucket);

	if (window.location.protocol == 'https:') {
		form_secure.style.display = 'block';
	}

	form_bucket.style.backgroundColor = 'rgba(255,255,255,.92)';

	if (form_bucket_trigger != null) {
		var button_style = window.getComputedStyle(form_bucket_trigger, null);
		var forms = document.forms;
		if (forms.length != 1) {
			alert('Forms error');
		} else {
			var button = forms[0].getElementsByTagName('button');
			button[0].style.backgroundColor = button_style['background-color'];
			button[0].style.color = button_style['color'];
			button[0].style.borderTopColor = button_style['border-top-color'];
			button[0].style.borderRightColor = button_style['border-right-color'];
			button[0].style.borderBottomColor = button_style['border-bottom-color'];
			button[0].style.borderLeftColor = button_style['border-left-color'];
			button[0].style.borderTopStyle = button_style['border-top-style'];
			button[0].style.borderRightStyle = button_style['border-right-style'];
			button[0].style.borderBottomStyle = button_style['border-bottom-style'];
			button[0].style.borderLeftStyle = button_style['border-left-style'];
			button[0].style.borderTopWidth = button_style['border-top-width'];
			button[0].style.borderRightWidth = button_style['border-right-width'];
			button[0].style.borderBottomWidth = button_style['border-bottom-width'];
			button[0].style.borderLeftWidth = button_style['border-left-width'];
			button[0].style.borderTopRightRadius = button_style['border-top-right-radius'];
			button[0].style.borderBottomRightRadius = button_style['border-bottom-right-radius'];
			button[0].style.borderBottomLeftRadius = button_style['border-bottom-left-radius'];
			button[0].style.borderTopLeftRadius = button_style['border-top-left-radius'];
		}
	}

	form_bucket_close.style.borderRadius = '30px';
	form_bucket_close.style.borderStyle = 'solid';
	form_bucket_close.style.borderWidth = '1px';
	form_bucket_close.style.borderColor = '#999';
	form_bucket_close.innerHTML = '&#10005;';
	form_bucket_close.style.color = '#999';
	form_bucket_close.style.padding = '3px 5px';
	form_bucket_close.style.width = 'auto';
	form_bucket_close.style.display = 'inline-block';
	form_bucket_close.style.position = 'absolute';
	form_bucket_close.style.right = '10px';
	form_bucket_close.style.top = '10px';
	form_bucket_close.style.lineHeight = '1';
	form_bucket_close.style.verticalAlign = 'middle';
	form_bucket_close.style.cursor = 'pointer';

	progress_bar.style.display = 'block';

	var getWD = function() {
		wd = {
			x: window.innerWidth,
			y: window.innerHeight,
		};
	}
	var getFBB = function() {
		fbb = {
			x: form_bucket_box.offsetWidth,
			y: form_bucket_box.offsetHeight
		}
	}

	var setForm = function() {
		getWD();

		form_bucket.style.position = 'fixed';
		form_bucket.style.left = 0;
		form_bucket.style.top = 0;
		form_bucket.style.height = 0;
		form_bucket.style.zIndex = 1001;

		form_bucket_box.style.display = 'block';
		form_bucket_box.style.position = 'fixed';
		form_bucket_box.style.left = '-100%';

		getFBB();
	}
	setForm();

	var sizeForm = function() {
		getWD();
		getFBB();
		form_bucket.style.width = wd.x+'px';
		var ml = -(fbb.x / 2);
		var mt = -(fbb.y / 2);
		form_bucket_box.style.left = '50%';
		form_bucket_box.style.top = '50%';
		form_bucket_box.style.marginLeft = ml+'px';
		form_bucket_box.style.marginTop = mt+'px';

		form_bucket.style.height = wd.y+'px';
	}


	var fadeHide = function() {
		if (window.requestAnimationFrame) {
			form_bucket_box.style.opacity = 1;
			form_bucket.style.opacity = 1;
			(function fadeIn() {
				var val = parseFloat(form_bucket_box.style.opacity);
				if ((val -= .1) < 0) {
					form_bucket_box.style.left = '-200%';
					form_bucket.style.height = '0px';
				} else {
					form_bucket_box.style.opacity = val;
					form_bucket.style.opacity = val;
					window.requestAnimationFrame(fadeIn);
				}
			})();
		} else {
			form_bucket_box.style.left = '-200%';
		}
	}
	var fadeShow = function(el, display) {
		if (window.requestAnimationFrame) {
			form_bucket_box.style.opacity = 0;
			form_bucket.style.opacity = 0;
			(function fadeOut() {
				var val = parseFloat(form_bucket_box.style.opacity);
				if (!((val += .1) > 1)) {
					form_bucket_box.style.opacity = val;
					form_bucket.style.opacity = val;
					window.requestAnimationFrame(fadeOut);
				}
			})();
		}
	}

	var showForm = function(e) {
		e.preventDefault();
		sizeForm();
		fadeShow();
		form_status = true;
	}
	var resizeForm = function() {
		if (form_status) {
			sizeForm();
		}
	}
	addEvent(window, 'resize', resizeForm);

	addEvent(form_bucket_trigger, 'click', showForm);
	addEvent(image_trigger, 'click', showForm);

	var hideForm = function(e) {
		form_status = false;
		fadeHide();
//		form_bucket_box.style.left = '-200%';
//		form_bucket.style.height = '0px';
	}

	addEvent(form_bucket_close, 'click', hideForm);

	if (window.MutationObserver) {
		var mauticform_demosignup_message = shel('mauticform_demosignup_message');

		var observer = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				progress_bar_in.style.width = '100%';
				progress_bar_in.style.borderRadius = '20px';
				form_bucket_box_intro.style.display = 'none';
			});    
		});

		var config = { attributes: true, childList: true, characterData: true };

		observer.observe(mauticform_demosignup_message, config);
	}

}