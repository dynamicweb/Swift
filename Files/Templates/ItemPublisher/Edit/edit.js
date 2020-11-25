if (typeof (Dynamicweb) == 'undefined') {
    var Dynamicweb = new Object();
}

if (typeof (Dynamicweb.Items) == 'undefined') {
    Dynamicweb.Items = new Object();
}

Dynamicweb.Items.ItemPublishing = function () {
    this._validation = null;
}

Dynamicweb.Items.ItemPublishing._instance = null;

Dynamicweb.Items.ItemPublishing.get_current = function () {
    if (!Dynamicweb.Items.ItemPublishing._instance) {
        Dynamicweb.Items.ItemPublishing._instance = new Dynamicweb.Items.ItemPublishing();
    }

    return Dynamicweb.Items.ItemPublishing._instance;
}

Dynamicweb.Items.ItemPublishing.prototype.initialize = function () {
	var buttons = $$('.item-edit-field-group-button-collapse');

	for (var i = 0; i < buttons.length; i++) {
		Event.observe(buttons[i], 'click', function (e) {
			var elm = Event.element(e);
			elm.next('.item-edit-field-group-content').toggleClassName('collapsed');
			elm.toggleClassName('collapsed');
		});
    }
}