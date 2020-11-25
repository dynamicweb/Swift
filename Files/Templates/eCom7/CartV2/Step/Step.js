function updateCart() {
	var form = document.getElementById('ordersubmit');
	var field = document.createElement('input');
	field.type = 'hidden';
	field.name = 'CartV2.GotoStep1';
	field.id = 'CartV2.GotoStep1';
	field.value = 'Update';
	form.appendChild(field);
	form.submit();
}