function ShowLinks() {
    var position = window.location.search.indexOf('showLinks=true');
    if (position > 0) {
        document.getElementById('showLinks').style.display = 'block';
    }
};

window.onload = function () {
    ShowLinks();
};

function SendProposalByEmail() {
    new Ajax.Request('/default.aspx?CatalogPublishingcmd=createAttachment', {
        onSuccess: function (response) {
            $('FM_Attachments').value = response.responseText;
            setDialogVisibility(true);
        }
    });
};

function getIntDel() {
    if (document.getElementById('FM_PriceDelimiterInt') != null)
        return document.getElementById('FM_PriceDelimiterInt').value;
    else
        return "";
}

function getDecDel() {
    if (document.getElementById('FM_PriceDelimiterDec') != null)
        return document.getElementById('FM_PriceDelimiterDec').value;
    else
        return "";
}

function OnLoad() {
    //code for prototype 

    try {
        ShowLinks();
        //set default value for each "price" input
        $$('input.price').each(
				    function (n)
				    { n.setValue(n.defaultValue) })
        //set default value for each "quantity" input
        $$('input.quantity').each(
				    function (n)
				    { n.setValue(n.defaultValue) })
        //set default value
        $('TotalPrice').value = $('TotalPrice').defaultValue;
    }
    //code for jQuery
    catch (err) {
        //set default value for each "price" input
        $('input.price').each(
				    function (n) {
				        $(this)[0].value = $(this)[0].defaultValue;
				    })
        //set default value for each "quantity" input
        $('input.quantity').each(
				    function (n) {
				        $(this)[0].value = $(this)[0].defaultValue;
				    })
        //set default value
        $('input#TotalPrice')[0].value = $('input#TotalPrice')[0].defaultValue;
    }
}
//recalculate 
function Recalc(el) {
    try {
        var total = 0, priceInfo = new Dynamicweb.eCom.PriceHelper(getIntDel(), getDecDel());

        $$('input.price').each(
				        function (n) {
				            var val = priceInfo.Parse(n.value);
				            if (!isNaN(val)) {
				                total += val;
				                if (el && el.id == n.id) n.value = priceInfo.Format(val);
				            }
				            else alert("wrong number " + n.value);
				        }
                    );
        $('TotalPrice').value = priceInfo.Format(total);
    }
    catch (err) {
        var total = 0;
        $('input.price').each(
				    function (n) {
				        var val = priceInfo.Parse($(this)[0].value);
				        if (!isNaN(val)) total += priceInfo.Format(val);
				        else alert("wrong number " + $(this)[0].value)
				    });
        $('input#TotalPrice')[0].value = priceInfo.Format(total);
    }
}

function RecalcPrice(el) {
    priceInfo = new Dynamicweb.eCom.PriceHelper(getIntDel(), getDecDel());
    var priceId = "c" + el.id.substring(1);
    price = document.getElementById(priceId);
    price.value = priceInfo.Format(priceInfo.Parse(price.defaultValue) / el.defaultValue * el.value);
    Recalc(price);
}