const ProductExport = function () {
	let recipientsCount = 0;

	var settings = {
		emailFieldLabel: "And also to",
		downloadLinkLabel: "Send download link",
		noneLabel: "none"
	};

	return {
		init: function (customSettings) {
			settings = customSettings;
		},

		AddRecipent: function(clickedButton) {
			const container = clickedButton.closest(".js-recipients");
			const fieldToCopy = container.querySelector(".js-recipient-field").cloneNode(true);

			clickedButton.classList.add("d-none");
			fieldToCopy.querySelector(".js-recipient-add-btn").classList.remove("d-none");
			fieldToCopy.querySelector("input").id = "EmailRecipientExtra" + recipientsCount;
			fieldToCopy.querySelector("input").value = "";
			fieldToCopy.querySelector("label").for = "EmailRecipientExtra" + recipientsCount;
			fieldToCopy.querySelector("label").innerHTML = settings.emailFieldLabel;

			recipientsCount++;

			container.appendChild(fieldToCopy);

			container.lastChild.querySelector("input").focus();
		},

		SetEmailAddresses: async function(clickedButton) {
			var emails = [];
			var form = clickedButton.closest(".js-product-export-form");

			form.querySelectorAll(".js-recipient-field").forEach(function (field) {
				emails.push(field.querySelector("input").value.replace(" ", ""));
			});

			var fetchOptions = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(emails)
			};

			form.querySelector(".js-download-images-warning").classList.add("d-none");
			form.querySelector(".js-download-success").classList.add("d-none");

			clickedButton.disabled = true;
			clickedButton.innerHTML = '<div style="animation: preloader-spin 2s infinite linear;" class="preloader-spin"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><title>circle-notch</title><g fill="#ffffff"><path d="M288 24.103v8.169a11.995 11.995 0 0 0 9.698 11.768C396.638 63.425 472 150.461 472 256c0 118.663-96.055 216-216 216-118.663 0-216-96.055-216-216 0-104.534 74.546-192.509 174.297-211.978A11.993 11.993 0 0 0 224 32.253v-8.147c0-7.523-6.845-13.193-14.237-11.798C94.472 34.048 7.364 135.575 8.004 257.332c.72 137.052 111.477 246.956 248.531 246.667C393.255 503.711 504 392.789 504 256c0-121.187-86.924-222.067-201.824-243.704C294.807 10.908 288 16.604 288 24.103z"></path></g></svg></div>';

			let response = await fetch("/dwapi/users/createrecipients", fetchOptions);

			if (response.ok) {
				let inputText = await response.json().then(function (text) {
					return text;
				});

				let emailsArray = inputText;
				const recipiens = form.querySelector(".js-recipient-tokens");
				recipiens.innerHTML = "";

				emailsArray.forEach(function (email) {
					var inputElement = document.createElement('input');
					inputElement.name = "RecipientTokens";
					inputElement.type = "hidden";
					inputElement.value = email;
					recipiens.appendChild(inputElement);
				});

				swift.ProductExport.StartDownload(clickedButton);
			} else {
				clickedButton.disabled = false;
				clickedButton.innerHTML = settings.downloadLinkLabel;
			}
		},

		StartDownload: async function (clickedButton) {
			var form = clickedButton.closest('.js-product-export-form');
			let formData = new FormData(form);
			const newParams = new URLSearchParams(formData); //Get parameters from the form
			var url = new URL(form.action);	//Get the url from the form
			var newUrl = url.origin + url.pathname + "?" + newParams.toString(); //Create url with the new parameters

			var emailField = form.querySelector(".js-recipient-email");
			clickedButton.innerHTML = settings.downloadLinkLabel;
			clickedButton.disabled = false;

			if (emailField.value == "") {
				emailField.classList.add("is-invalid");
			} else {
				emailField.classList.remove("is-invalid");

				let response = await fetch(newUrl);

				if (response.ok) {
					form.querySelector(".js-download-success").classList.remove("d-none");

					return false;
				} else {
					form.querySelector(".js-download-images-warning").classList.remove("d-none");

					return false;
				}
			}
		},

		UpdateSelector: function(clickedButton) {
			const dropdown = clickedButton.closest(".js-dropdown");
			const dropdownBtn = dropdown.querySelector(".js-dropdown-btn");

			let arr = [];
			dropdown.querySelectorAll('input:checked').forEach(function (field) {
				if (field.value != "") {
					if (field.getAttribute("data-short-name")) {
						arr.push(field.getAttribute("data-short-name"));
					}
				} else {
					field.checked = false;
				}
			});

			arr = arr.length === 0 ? "None" : arr;

			dropdownBtn.innerHTML = arr.toString().replaceAll(",", ", ") + " ";
		},

		SelectAllOptions: function(clickedButton) {
			const dropdown = clickedButton.closest(".js-dropdown");
			const dropdownBtn = dropdown.querySelector(".js-dropdown-btn");
			const allIsChecked = clickedButton.querySelector('input').checked;

			let arr = [];
			dropdown.querySelectorAll('input').forEach(function (field) {
				if (field.value != "") {
					if (allIsChecked) {
						field.checked = true;
						arr.push(field.getAttribute("data-short-name"));
					} else {
						field.checked = false;
					}
				}
			});
			arr = arr.length === 0 ? "None" : arr;

			if (!allIsChecked) {
				dropdownBtn.innerHTML = settings.noneLabel;
			} else {
				dropdownBtn.innerHTML = arr.toString().replaceAll(",", ", ") + " ";
			}
		},

		DeSelectAllOptions: function(clickedButton) {
			const dropdown = clickedButton.closest(".js-dropdown");
			const dropdownBtn = dropdown.querySelector(".js-dropdown-btn");

			dropdown.querySelectorAll('input').forEach(function (field) {
				if (field.value != "") {
					field.checked = false;
				}
			});

			dropdownBtn.innerHTML = settings.noneLabel;
		}
	}
}();

export { ProductExport };
