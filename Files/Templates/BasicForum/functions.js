	if(typeof(BasicForum) == 'undefined') {
		BasicForum = new Object();
	}

	BasicForum.editPostValidate = function (form) {
	    var ret = true;
	    var frmName = document.getElementById('frmName');
	    var frmAuthor = document.getElementById('frmAuthor');
	    var frmAuthorEmail = document.getElementById('frmAuthorEmail');

	    if (frmAuthor) {
	        ret = frmAuthor.value.length > 0;
	        if (!ret) {
	            alert(forumTemplatesText.AuthorRequiredText);
	            frmAuthor.focus();
	        }
	    }

	    if (frmAuthorEmail) {
	        ret = frmAuthorEmail.value.length <= 0;
	        if (!ret) {
	            if (!IsValidEmail(frmAuthorEmail.value)) {
	                alert(forumTemplatesText.InvalidEmailAddressText);
	                frmAuthorEmail.focus();
	            }
	            else {
	                ret = true;
	            }
	        }
	    }

	    if (ret && frmName) {
	        ret = frmName.value.length > 0;
	        if (!ret) {
	            alert(forumTemplatesText.NameRequiredText);
	            frmName.focus();
	        }
	    }

	    if (ret && form) {
	        form.action = document.getElementById('PostAction').value;
	    } else {
	        ret = false;
	    }

	    return ret;
	}
	
	BasicForum.addQuote = function(editorName){
		var txrHeading = document.getElementById('originalHeading');
		var txrMessage = document.getElementById('originalMessage');	
		var oEditor = FCKeditorAPI.GetInstance(editorName) ;
		if(oEditor){
			oEditor.InsertHtml('<div class="forum-quote">' +  
				'<div class="forum-quote-head" >' + txrHeading.innerHTML +  '</div>' + 
				'<div class="forum-quote-text" ><blockquote>' + txrMessage.innerHTML  + '</blockquote></div></div>');
		}
	}
	
	
// Multiple file selector by Stickman -- http://www.the-stickman.com 
// Used by the multifile upload feature
function MultiSelector(list_target, max) {
	this.list_target = list_target;
	this.count = 0;
	this.id = 0;
	
	if(max) {
		this.max = max;
	} else {
		this.max = -1;
	};
	
	this.addElement = function(element) {
		if(element.tagName == 'INPUT' && element.type == 'file') {
			element.name = 'file_' + this.id++;
			element.multi_selector = this;
			
			element.onchange = function() {
				var new_element = document.createElement('input');
				
				new_element.type = 'file';
				this.parentNode.insertBefore(new_element, this);
				this.multi_selector.addElement(new_element);
				this.multi_selector.addListRow(this);
				
				this.style.position = 'absolute';
				this.style.left = '-1000px';
			}
			
			if(this.max != -1 && this.count >= this.max) {
				element.disabled = true;
			}
			
			this.count++;
			this.current_element = element;
		} 
	}
	
	this.addListRow = function(element) {
		var new_row = document.createElement('div');
		var file_name = document.createElement('div');
		var new_row_button = document.createElement('a');
		var new_row_clear = document.createElement('div');
		
		new_row.element = element;
		new_row.className = 'forum-post-file';
	
		new_row_button.setAttribute('href', 'javascript:void(0);');
		new_row_button.setAttribute('title', forumTemplatesText.PostDeleteFileText);
		
		new_row_button.className = 'file-delete';
				
		new_row_button.appendChild(document.createTextNode(' '));
		
		new_row_button.onclick = function() {
			this.parentNode.element.parentNode.removeChild(this.parentNode.element);
			this.parentNode.parentNode.removeChild(this.parentNode);
			this.parentNode.element.multi_selector.count--;
			this.parentNode.element.multi_selector.current_element.disabled = false;
			
			if (this.parentNode.element.multi_selector.count <= 1) {
			
				this.parentNode.element.multi_selector.list_target.style.display = 'none';
			}
			
			return false;
		}
		
		file_name.className = 'file-name';
		file_name.setAttribute('title', element.value);
		
		file_name.appendChild(document.createTextNode(element.value));
		
		new_row_clear.className = 'forum-post-clear';
		
		new_row.appendChild(file_name);
		new_row.appendChild(new_row_button);
		new_row.appendChild(new_row_clear);
		
		this.list_target.appendChild(new_row);
		
		this.list_target.style.display = 'block';
	}
}

	function bfManagementVisibility(id, isVisible) {
		var elm = document.getElementById(id);
		
		if (elm) {
			elm.style.visibility = (isVisible ? 'visible' : 'hidden');
		}
	}
	
	function bfComfirmDelete() {
	    return confirm(forumTemplatesText.ThreadDeleteText);
}

function setSubscriptionDialogVisibility(isVisible, formAction) {
    if (formAction != null && formAction.length > 0) {
        document.getElementById('frmSubscriptionSettings').action = formAction;
    }

    if (isVisible) {
        Forum.Dialog.show('divSubscriptionSettings', { top: 300, onShow: function () {
            var txEmail = document.getElementById('txEmail').focus();
        }
        });
    } else {
        Forum.Dialog.hide('divSubscriptionSettings');
    }
}

function removeStoredFile(filename) {
    var element = document.getElementById(filename);
    element.parentNode.removeChild(element);
}

function IsValidEmail(value) {
    var ret = false;
    var re = /([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})/;
    ret = value.match(re) != null;
    return ret;
}
