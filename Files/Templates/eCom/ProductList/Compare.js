var Compare = new Object;
var maxCompareCount = 10;

Compare.add = function (compareid, name, url) {
    for (var i = 0; i < maxCompareCount; i++) {
        var key = "p" + i;
        var value = Compare.readCookie(key);
        if (value) {
            if (value.split('|')[0] == compareid) {
                //alert("Product already there....");
                Compare.writecompare();
                return;
            }
        } else {
            Compare.createCookie(key, compareid + '|' + escape(name) + '|' + escape(url), null);
            Compare.writecompare();
            return;
        }
    }
    alert("You cannot add any more products. Max is " + maxCompareCount);
}

Compare.remove = function (compareid) {
    var value = "";
    for (var i = 0; i < (maxCompareCount - 1); i++)
        value += "|";

    //var value = "|||||||||"
    var values = value.split('|')
    for (var i = 0; i < maxCompareCount; i++) {
        var key = "p" + i;
        var value = Compare.readCookie(key);
        if (value) {
            if (value.split('|')[0] != compareid) {
                values[i] = value;
            }
        }
    }
    Compare.removeall();
    for (var i = 0; i < values.length; i++) {
        var key = "p" + i;
        if (values[i]) {
            Compare.createCookie(key, values[i], null);
        }
    }
    Compare.writecompare();
}

Compare.removeall = function () {
    for (var i = 0; i < maxCompareCount; i++) {
        var key = "p" + i;
        Compare.eraseCookie(key);
    }
    Compare.writecompare();
}

Compare.writecompare = function () {
    var html = "";
    var rows = "";
    for (var i = 0; i < maxCompareCount; i++) {
        var key = "p" + i;
        var value = Compare.readCookie(key);
        if (value) {
            rows += Compare.row(value.split('|')[0], value.split('|')[1], value.split('|')[2]);
        }
    }
    if (rows) {
        html += "<strong>Compare</strong>";
        html += "<div id=\"smallcart_empty\">";
        html += "<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" class=\"t1\">";
        html += rows;
        html += "</table>";
        html += "<br />";
        html += "<a href=\"javascript:Compare.removeall();\">Remove all</a>&nbsp;&nbsp;&nbsp;";
        html += "<a href=\"javascript:Compare.compare(" + pageID + ");\">Compare</a>";
    }
    if (document.getElementById("compare")) {
        document.getElementById("compare").innerHTML = html;
    }
}

Compare.row = function (compareid, name, url) {
    var html = "";
    html += "<tr>";
    html += "<td><a href=\"" + unescape(url) + "\">" + unescape(name) + "</a></td>";
    html += "<td></td>";
    html += "<td><a href=\"javascript:Compare.remove('" + compareid + "')\">x</a></td>";
    html += "</tr>";
    return html;
}


Compare.createCookie = function (name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

Compare.readCookie = function (name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

Compare.eraseCookie = function (name) {
    Compare.createCookie(name, "", -1);
}

Compare.compare = function (pageid) {
    var ids = "";
    for (var i = 0; i < maxCompareCount; i++) {
        var key = "p" + i;
        var value = Compare.readCookie(key);
        if (value) {
            if (ids != "") {
                ids += ",";
            }
            ids += value.split('|')[0];
        }
    }
    if (ids) {
        location = "/Default.aspx?ID=" + pageid + "&Compare=" + ids;
    }
}