var Cart = function () { }
                                                         

Cart.prototype.UpdateCart = async function (e) {
    var clickedButton = e.currentTarget;
    var clickedButtonWidth = clickedButton.offsetWidth + "px";

    clickedButton.setAttribute("data-content", clickedButton.innerHTML);
    clickedButton.style.minWidth = clickedButtonWidth;
    clickedButton.classList.add("disabled");
    clickedButton.disabled = true;
	clickedButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><title>circle-notch</title><g fill="#ffffff"><path d="M288 24.103v8.169a11.995 11.995 0 0 0 9.698 11.768C396.638 63.425 472 150.461 472 256c0 118.663-96.055 216-216 216-118.663 0-216-96.055-216-216 0-104.534 74.546-192.509 174.297-211.978A11.993 11.993 0 0 0 224 32.253v-8.147c0-7.523-6.845-13.193-14.237-11.798C94.472 34.048 7.364 135.575 8.004 257.332c.72 137.052 111.477 246.956 248.531 246.667C393.255 503.711 504 392.789 504 256c0-121.187-86.924-222.067-201.824-243.704C294.807 10.908 288 16.604 288 24.103z"></path></g></svg>';

    var form = clickedButton.closest("form");
    let formData = new FormData(form);
    var fetchOptions = {
        method: 'POST',
        body: formData
    };
    let response = await fetch(form.action, fetchOptions);

    if (response.ok) {
        Cart.Success(response, clickedButton);
    } else {
        Cart.Error(response, clickedButton);
    }
}

Cart.prototype.Success = async function (response, clickedButton) {
    clickedButton.classList.remove("disabled");
    clickedButton.disabled = false;
    clickedButton.innerHTML = clickedButton.getAttribute("data-content");
    clickedButton.setAttribute("data-content", "");

    let html = await response.text().then(function (text) {
        return text;
    });

    var totalQuantity = html != undefined ? html : 0;
    document.querySelectorAll(".js-cart-qty").forEach(function (el) {
        el.innerHTML = totalQuantity;
    })
}

Cart.prototype.Error = async function (response, clickedButton) {
    clickedButton.classList.remove("disabled");
    clickedButton.disabled = false;
	clickedButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><title>circle-notch</title><g fill="#ffffff"><path d="M288 24.103v8.169a11.995 11.995 0 0 0 9.698 11.768C396.638 63.425 472 150.461 472 256c0 118.663-96.055 216-216 216-118.663 0-216-96.055-216-216 0-104.534 74.546-192.509 174.297-211.978A11.993 11.993 0 0 0 224 32.253v-8.147c0-7.523-6.845-13.193-14.237-11.798C94.472 34.048 7.364 135.575 8.004 257.332c.72 137.052 111.477 246.956 248.531 246.667C393.255 503.711 504 392.789 504 256c0-121.187-86.924-222.067-201.824-243.704C294.807 10.908 288 16.604 288 24.103z"></path></g></svg>';
}

var Cart = new Cart();
