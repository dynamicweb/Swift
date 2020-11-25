function submitForm() {
    var checker = true;
	
	//Obsolete - September 2008
	//Use the new validation engine from backend instead.
    // if (document.getElementById("EcomOrderCustomerName").value.length == 0) {
        // checker = false;
        // alert("You didn't enter your name");
        // document.getElementById("EcomOrderCustomerName").style.backgroundColor = "#ccc";
        // document.getElementById("EcomOrderCustomerName").focus();
    // } else if (document.getElementById("EcomOrderCustomerAddress").value.length == 0) {
        // checker = false;
        // alert("You didn't enter your address");
        // document.getElementById("EcomOrderCustomerAddress").style.backgroundColor = "#ccc";
        // document.getElementById("EcomOrderCustomerAddress").focus();
    // } else if (document.getElementById("EcomOrderCustomerZip").value.length == 0) {
        // checker = false;
        // alert("You didn't enter your zipcode");
        // document.getElementById("EcomOrderCustomerZip").style.backgroundColor = "#ccc";
        // document.getElementById("EcomOrderCustomerZip").focus();
    // } else if (document.getElementById("EcomOrderCustomerCity").value.length == 0) {
        // checker = false;
        // alert("You didn't enter your city");
        // document.getElementById("EcomOrderCustomerCity").style.backgroundColor = "#ccc";
        // document.getElementById("EcomOrderCustomerCity").focus();
    // } else if (document.getElementById("EcomOrderCustomerEmail").value.length == 0) {
        // checker = false;
        // alert("You didn't enter your email");
        // document.getElementById("EcomOrderCustomerEmail").style.backgroundColor = "#ccc";
        // document.getElementById("EcomOrderCustomerEmail").focus();
    // }
    
    if (checker) {
        document.submitUserData.submit();
    }
}

function toggleVisibility(element) {
    if (document.getElementById(element).className == 'visibilityHidden') {
        document.getElementById(element).className = 'visibilityVisible';
    } else {
        document.getElementById(element).className = 'visibilityHidden';
    }
}

function toggleDisplay(element) {
    if (document.getElementById(element).className == 'displayNone') {
        document.getElementById(element).className = 'displayBlock';
    } else {
        document.getElementById(element).className = 'displayNone';
    }
}

function setDialogVisibility(isVisible, formAction) {
    if (formAction != null && formAction.length > 0) {
        document.getElementById('frmSubscriptionSettings').action = formAction;
    }

    if (isVisible) {
        CatalogPublishing.Dialog.show('divSubscriptionSettings', { top: 300, onShow: function () {
            var txEmail = document.getElementById('txEmail').focus();
        }
        });
    } else {
        CatalogPublishing.Dialog.hide('divSubscriptionSettings');
    }
}