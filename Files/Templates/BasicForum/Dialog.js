if (typeof (Forum) == 'undefined') {
	var Forum = new Object();
}

Forum.Dialog = new Object();

Forum.Dialog.show = function(id, params) {
	var w = 0, h = 0;
	var left = -1, top = -1;
	var bodyWidth = 0, bodyHeight = 0;
	var d = document.getElementById(id);
	
	if (d) {
		if (!params) params = {};
		
		Forum.Dialog.get_Overlay().style.display = 'block';
				
		if (params.width) {
			d.style.width = params.width + 'px';
			w = params.width;
		}
		
		if (params.height) {
			d.style.height = params.height + 'px';
			h = params.height;
		}
		
		d.style.display = 'block';
		
		if (!w) w = d.clientWidth;
		if (!h) h = d.clientHeight;
		
		if (document.body.scrollHeight > document.body.offsetHeight)
        {
			bodyWidth = document.body.scrollWidth;
            bodyHeight = document.body.scrollHeight;
        } else {
			bodyWidth = document.body.offsetWidth;
			bodyHeight = document.body.offsetHeight;
        }

        if (params.top) top = params.top;
		if (params.left) left = params.left;
		
		if (left < 0) {
			left = parseInt((bodyWidth - w) / 2);
			if (left < 0) left = 100;
        }
		
		if (top < 0) {
			top = parseInt((bodyHeight - h) / 2);
			if (top < 0) top = 100;
		}
            		
		d.style.top = top + 'px';
		d.style.left = left + 'px';;
				
		if(params.onShow) {
			params.onShow();
		}
	}
}

Forum.Dialog.hide = function(id) {
	var d = document.getElementById(id);
	
	if (d) {
		Forum.Dialog.get_Overlay().style.display = 'none';
		d.style.display = 'none';
	}
}

Forum.Dialog.get_Overlay = function() {
	var ret = null;
	var id = 'ForumDialogOverlay';
	
	ret = document.getElementById(id);
	if (!ret) {
		ret = document.createElement('DIV');
		
		ret.id = id;
		ret.className = 'forum-dialog-overlay';
		ret.style.display = 'none';
		
		document.body.appendChild(ret);
	}
	
	return ret;
}