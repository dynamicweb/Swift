const BackInStockNotification = function (){
	return{
		SubmitNotification(formId, modalId, notifiedMessageId, notificationButtonId){
			const form = document.getElementById(formId);
			if(!form.reportValidity()) return;

			const formData = new FormData(form);
			const modal = bootstrap.Modal.getInstance(document.getElementById(modalId));
			const notifiedMessage = document.getElementById(notifiedMessageId);
			const notificationButton = document.getElementById(notificationButtonId);

			fetch(form.getAttribute("action"), {
				method: 'POST',
				body: formData
			})
				.then(function () {
					modal.hide();
					notifiedMessage.classList.remove("d-none");
					notificationButton.classList.add("d-none");
				});
		}
	}
}();

export { BackInStockNotification };
