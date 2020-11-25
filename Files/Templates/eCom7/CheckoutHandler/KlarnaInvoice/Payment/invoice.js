var KlarnaInvoice = function(){
    this.baseURL = null;
    this.pclassid = null;
    this.currentTerm = null;
}

KlarnaInvoice.prototype.showTerm = function(pclassid, termId){
    this.pclassid = pclassid;
    this.hideCurrentTerm();
    this.currentTerm = termId;
    this.showCurrentTerm();
}

KlarnaInvoice.prototype.showCurrentTerm = function(){
    if(this.currentTerm){
        var term = document.getElementById(this.currentTerm);
        if(term){
            term.style.display = "block";
        }
    }
}

KlarnaInvoice.prototype.hideCurrentTerm = function(){
    if(this.currentTerm){
        var term = document.getElementById(this.currentTerm);
        if(term){
            term.style.display = "none";
        }
    }
}

KlarnaInvoice.prototype.stateCancel = function(){
    document.getElementById("PClassId").value = 0;
    document.getElementById("KlarnaState").value = "Cancel";
    document.getElementById('PaymentForm').submit();
}

KlarnaInvoice.prototype.statePayment = function(){
    if(this.pclassid != null){
        document.getElementById("PClassId").value = this.pclassid;
        document.getElementById("KlarnaState").value = "Payment";
        document.getElementById('PaymentForm').submit();
    }
    else{
        alert("Select a payment method");
    }
}

KlarnaInvoice.prototype.statePaymentDE = function(){
    if(this.pclassid != null){
        if (this.pclassid != '-1' && !document.getElementById("ConsentPrivacyPolicy").checked){
            alert("You should confirm with consent privacy policy");
            return;
        }

        document.getElementById("PClassId").value = this.pclassid;
        document.getElementById("KlarnaState").value = "Payment";
        document.getElementById('PaymentForm').submit();
    }
    else{
        alert("Select a payment method");
    }
}

// Providing Swedish customers functionality to fetch their address(es) that is approved by Klarna
KlarnaInvoice.prototype.GetAddress = function(){
    var pno = document.getElementById("CustomerPNO").value;
    if (!pno){
        alert("Social security number is required.");
        return;
    }

    var toggleWaiter = function (dStyle) {
        dStyle = dStyle || "";
        var loader = document.getElementById('loadingDiv');
        if (!loader) {
            return;
        }

        loader.style.display = dStyle;
    }

    var xhr = new XMLHttpRequest();
    xhr.onloadstart = function () {
        toggleWaiter();
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) {
            return;
        }

        toggleWaiter("none");
        if (xhr.status != 200) {
            alert('Something went wrong...');
            return;
        }

        var address;
        try {
            address = JSON.parse(xhr.responseText);
            if (!address) {
                throw new DOMException();
            }
        } catch (e) {
            alert('Something went wrong...');
            return;
        }

        if (address.Error) {
            alert(address.Error);
            return;
        }

        // Update fields which got value from the API
        if (document.getElementById('CustomerFirstName') && address.FirstName) {
            document.getElementById('CustomerFirstName').value = address.FirstName;
        }
        if (document.getElementById('CustomerLastName') && address.LastName) {
            document.getElementById('CustomerLastName').value = address.LastName;
        }
        if (document.getElementById('CustomerCity') && address.City) {
            document.getElementById('CustomerCity').value = address.City;
        }
        if (document.getElementById('CustomerAddress') && address.Street) {
            document.getElementById('CustomerAddress').value = address.Street;
        }
        if (document.getElementById('CustomerHouseNumber') && address.HouseNumber) {
            document.getElementById('CustomerHouseNumber').value = address.HouseNumber;
        }
        if (document.getElementById('CustomerZip') && address.ZipCode) {
            document.getElementById('CustomerZip').value = address.ZipCode;
        }
        if (document.getElementById('CustomerPhone') && address.PhoneNumber) {
            document.getElementById('CustomerPhone').value = address.PhoneNumber;
        }
        if (document.getElementById('CustomerCell') && address.CellPhoneNumber) {
            document.getElementById('CustomerCell').value = address.CellPhoneNumber;
        }
        if (document.getElementById('CustomerEmail') && address.Email) {
            document.getElementById('CustomerEmail').value = address.Email;
        }
    }

    xhr.open('GET', this.baseURL + "&	KlarnaState=GetAddress&CustomerPNO=" + pno, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
}