/*
This javascript files is only for general functions
Creaded on:22/07/2014 12:05PM
License:Tychons solutions
*/
function maxLengthCheck(object) {
    if (object.value.length > object.maxLength)
        object.value = object.value.slice(0, object.maxLength)
}
function ConvertNameToUpperCase(Textbox) {
    if (Textbox === "username") {
        var Username = $("#txtuser").val().trim();
        var ConvertToUppercase = Username.toUpperCase();
        $("#txtuser").val(ConvertToUppercase);
    }
    else {
        var Password = $("#txtpwd").val().trim();
        var ConvertToUppercase = Password.toUpperCase();
        $("#txtpwd").val(ConvertToUppercase);
    }

}

function setencryptedkey() {

    $("#fade").show();

    $.mobile.loading("show", {
        text: "Loading,Please Wait...",
        textVisible: true,
        theme: "a",
        textonly: true,
        html: "<span class='ui-bar ui-overlay-a ui-corner-all' style='text-align:center;background:#ccc'><img src='images/ajax-loader.gif'/><br/><p style='color:#304589;font-weight:bold'>Please Wait...</p></span>"

    });

    $.ajax({
        type: "GET",
        crossDomain: true,
        url: encryptedkeyURL,
        dataType: "xml",
        success: function (xmlData) {

            var xmlString;
            if (window.ActiveXObject) {
                xmlString = xmlData.xml;
            }
            else {
                xmlString = (new XMLSerializer()).serializeToString(xmlData);
            }
            var xmlDoc = $.parseXML(xmlString);
            var $xml = $(xmlDoc);
            var $Name = $xml.find('return');
            var resultJSON = $Name.text();
            var json = $.parseJSON(resultJSON);
            var DeviceEncrptedKey = json.DeviceEncrptedKey;
            var AlphanumericToken = json.AlphanumericToken;

            if (DeviceEncrptedKey !== "" && DeviceEncrptedKey !== null) {

                setLS('encryptedkey', DeviceEncrptedKey);
                setCookie("AlphanumericToken", AlphanumericToken);
                SecretPhrase = getCookie("AlphanumericToken");
                setLS('encryptedkey', DeviceEncrptedKey);
                encryptedkey = getLS('encryptedkey');
                $("#fade").hide();
                productPageLoad2();
            }

        },
        error: function (data, errorThrown) {
            navigator.notification.alert('Unable to connect server.Please try again later!', null, 'Connection Failed', 'OK');
            $.mobile.loading("hide");
            $("#fade").hide();
        }
    });
}

// function to store value to cookie

function setCookie(cname, cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + (5000 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

//Function to delete all the cookies

function deleteCookies() {
    document.cookie = "AlphanumericToken" + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
}

// Function to delete all the cookies values

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}


function loadstatedetails() {
    var create = window.openDatabase("blackman", "1.0", "blackman", 2 * 1024 * 1024);
    create.transaction(function createTableDB(tx) {
        tx.executeSql('DROP TABLE IF EXISTS states');
        tx.executeSql('CREATE TABLE IF NOT EXISTS states (id INTEGER PRIMARY KEY AUTOINCREMENT,Statename,Statecode)');
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('Alabama', 'AL')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('Alaska', 'AK')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('Arizona', 'AZ')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('Arkansas', 'AR')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('California', 'CA')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('Colorado', 'CO')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('Connecticut', 'CT')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('District of Columbia', 'DC')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('Delaware', 'DE')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('Florida', 'FL')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('Georgia', 'GA')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('Hawaii', 'HI')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('Iowa', 'IA')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('Idaho', 'ID')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('Illinois', 'IL')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('Indiana', 'IN')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('Kansas', 'KS')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('Kentucky', 'KY')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('Louisiana', 'LA')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('Massachusetts', 'MA')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('Maryland', 'MD')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('Maine', 'ME')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('Michigan', 'MI')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('Minnesota', 'MN')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('Missouri', 'MO')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('Mississippi', 'MS')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('Montana', 'MT')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('North Carolina', 'NC')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('North Dakota', 'ND')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('Nebraska', 'NE')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('New Hampshire', 'NH')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('New Jersey', 'NJ')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('New Mexico', 'NM')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('Nevada', 'NV')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('New York', 'NY')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('Ohio', 'OH')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('Oklahoma', 'OK')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('Oregon', 'OR')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('Pennsylvania', 'PA')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('Rhode Island', 'RI')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('South Carolina', 'SC')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('South Dakota', 'SD')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('Tennessee', 'TN')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('Texas', 'TX')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('Utah', 'UT')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('Virginia', 'VA')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('Vermont', 'VT')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('Washington', 'WA')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('Wisconsin', 'WI')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('West Virginia', 'WV')");
        tx.executeSql("INSERT INTO states (Statename,Statecode) VALUES ('Wyoming', 'WY')");
    });
}

$(function () {
    $('#locationfinder1').click(function () {
        $('.white_contentlistnew').toggle();
        $('.white_contentlistnew1').hide();
        $('#light').hide();
        $('#lightdirection').hide();
        loadmenu(1);
    })
});



function showShowRooms() {

    $("#mapbody").addClass('mapbody');
    if ($(window).height() > 800) {
        $("#white_contentlistnew1").css("height", "650px");

    }
    else {
        $("#white_contentlistnew1").css("min-height", "340px");
    }

    var showRoom = getLS('Showroom'), html;
    if (showRoom === 'all') {
        html = "<div class='empty'></div>";
        html = html + "<div style='background: #fff;'>"; //1
        html = html + "<div style='border-bottom: 1px solid #CCCCCC; height: 25px;margin-top: 25px;'>"; //2
        html = html + "<p class='p-contentlist'>";
        html = html + "List of Branches</p>";
        html = html + "</div>";
        html = html + "<div class='innerpopup' style='font-size:12px'>";
        for (var f = 0; f < locations.length; f++) {

            var address_split = locations[f][4].split(',');


            html = html + "<div class='popdiv'>";
            html = html + "<table class='tableclass'>";
            html = html + "<tr style='width: 220px;'>";
            html = html + "<td>";
            html = html + "<table>";
            html = html + "<tr style='width: 220px;'>";
            html = html + " <td style='width: 40px'>";
            html = html + "<img src='images/showroom.png' width='20px' height='20px' />";
            html = html + "</td>";
            html = html + " <td style='width: 220px'>";
            html = html + "<span style='color:#304589'>" + locations[f][0] + "</span>";
            html = html + "</td>";
            html = html + " </tr>";

            html = html + "<tr style='width: 220px;'>";
            html = html + " <td style='width: 40px'>";
            html = html + "<img src='images/address.png' width='20px' height='20px' />";
            html = html + "</td>";
            html = html + " <td style='width: 220px'>";
            html = html + "<span style='color:#304589'>" + address_split[0] + "</br>" + address_split[1];
            html = html + "</td>";
            html = html + " </tr>";
            html = html + "</table>";
            html = html + "</td>";
            html = html + " <td style='width: 30px'>";
            html = html + "<span><a onclick=checkinventorynew('" + locations[f][3] + "','" + f + "')><img src='images/checkinventory.png' width='26px' height='26px' style='margin-top:6px;cursor:pointer'/></a></span>";
            html = html + "</td>";
            html = html + " </tr>";
            html = html + "</table>";
            html = html + "</div>";

        }
        html = html + "<div class='submitdiv' style='height:5px'></div>";
        html = html + "</div>"; //2
        html = html + "</div>"; //1
        document.getElementById("white_contentlistnew1").innerHTML = html;

        $('#white_contentlistnew1').toggle();
        $('#white_contentlistnew').hide();
        $('#lightdirection').hide();
        $('#light').hide();
        $('.popdiv').css('display', 'block');
    }
    else {

        html = "<div class='empty'></div>";
        html = html + "<div style='background: #fff;'>";
        html = html + "<div style='border-bottom: 1px solid #CCCCCC; height: 25px;margin-top: 25px;'>";
        html = html + "<p class='p-contentlist' >";
        html = html + "List of Branches</p>";
        html = html + "</div>";
        html = html + "<div class='innerpopup' style='font-size:12px'>";

        for (var k = 0; k < changedValues.length; k++) {

            var address_split = changedValues[k][5].split(',');


            html = html + "<div class='popdiv'>";
            html = html + "<table class='tableclass'>";
            html = html + "<tr style='width: 100%;'>";
            html = html + " <td class='widthtd' >";

            html = html + " <table>";
            html = html + "<tr>";
            html = html + " <td>";
            html = html + "<img src='images/showroom.png' width='20px' height='20px' />";
            html = html + "</td>"

            html = html + " <td>";
            html = html + "<span style='color:#304589'>" + changedValues[k][0] + "</span>";
            html = html + "</td>";
            html = html + "</tr>";

            html = html + "<tr style='width: 220px;'>";
            html = html + " <td style='width: 40px'>";
            html = html + "<img src='images/address.png' width='20px' height='20px'/>";
            html = html + "</td>";

            html = html + " <td style='width: 220px'>";
            html = html + "<span style='color:#304589'>" + address_split[0] + "</br>" + address_split[1] + "</span><span  style='margin-left: 30px; font-weight: bold; color: green;'>" + changedValues[k][3] + "&nbsp;mi</span>";
            html = html + "</td>";
            html = html + " </tr>";
            html = html + "</table>";
            html = html + "</td>";

            html = html + " <td style='width:15%;'>";
            html = html + "<span><a onclick=checkinventorysearch('" + changedValues[k][10] + "','" + k + "')><img src='images/checkinventory.png' width='26px' height='26px' style='margin-top:6px;cursor:pointer'/></a><a onclick='getdirections(" + k + ",1,1);'><img src='images/getdirections1.png' width='26px' height='26px' style='margin-top:6px;cursor:pointer'/></a></span>";
            html = html + "</td>";

            html = html + " </tr>";
            html = html + "</table>";
            html = html + "</div>";
        }

        html = html + "<div class='submitdiv' style='height:5px'></div>";
        html = html + "</div>";
        html = html + "</div>";
        document.getElementById("white_contentlistnew1").innerHTML = html;

        $('#white_contentlistnew1').toggle();
        $('#white_contentlistnew').hide();
        $('#lightdirection').hide();
        $('#light').hide();
        $('.popdiv').css('display', 'block');
    }
}

function findbranch(page) {
    // clearfilters();
    var c_page = getLS('page');
    var result = c_page.split(",");
    switch (page) {
        case 1:

            if (result[result.length - 1] !== 'index');
            {
                setLS('page', c_page + ",home");
            }
            break;
        case 2:

            if (result[result.length - 1] !== 'products');
            {
                setLS('page', c_page + ",products");
            }

            break;
        case 3:

            if (result[result.length - 1] !== 'cart');
            {
                setLS('page', c_page + ",cart");
            }
            break;
        case 4:

            if (result[result.length - 1] !== 'account');
            {
                setLS('page', c_page + ",account");
            }
            break;
    }

    window.location.href = 'index.html';

}
function toggle_visibilityclose1() {
    document.getElementById('white_contentlistnew1').style.display = 'none';
    $("#fade").hide();
}
function listbox() {
    document.getElementById('lightlist').style.display = 'block';
}

function product(page) {
    var c_page = getLS('page');
    var result = c_page.split(",");
    switch (page) {
        case 1:
            if (result[result.length - 1] !== 'index');
            {
                setLS('page', c_page + ",home");
            }
            break;
        case 2:

            if (result[result.length - 1] !== 'products');
            {
                setLS('page', c_page + ",products");
            }
            break;
        case 3:

            if (result[result.length - 1] !== 'cart');
            {
                setLS('page', c_page + ",cart");
            }
            break;
        case 4:

            if (result[result.length - 1] !== 'account');
            {
                setLS('page', c_page + ",account");
            }
            break;
    }

    window.location.href = 'products.html';

}

function findcart(page) {
    var c_page = getLS('page');
    var result = c_page.split(",");
    switch (page) {
        case 1:

            if (result[result.length - 1] !== 'index');
            {
                setLS('page', c_page + ",home");
            }
            break;
        case 2:

            if (result[result.length - 1] !== 'products');
            {
                setLS('page', c_page + ",products");
            }

            break;
        case 3:

            if (result[result.length - 1] !== 'cart');
            {
                setLS('page', c_page + ",cart");
            }
            break;
        case 4:

            if (result[result.length - 1] !== 'account');
            {
                setLS('page', c_page + ",account");
            }
            break;
    }
    window.location.href = 'cart.html';
}

function findaccount(page) {
    var c_page = getLS('page');
    var result = c_page.split(",");
    switch (page) {
        case 1:
            if (result[result.length - 1] !== 'index');
            {
                setLS('page', c_page + ",home");
            }
            break;
        case 2:

            if (result[result.length - 1] !== 'products');
            {
                setLS('page', c_page + ",products");
            }

            break;
        case 3:

            if (result[result.length - 1] !== 'cart');
            {
                setLS('page', c_page + ",cart");
            }
            break;
        case 4:

            if (result[result.length - 1] !== 'account');
            {
                setLS('page', c_page + ",account");
            }
            break;
    }
    window.location.href = 'myaccount.html';

}

function toggle_directionclose() {
    $("body").addClass('globalbodyclass');
    var c_page = getLS('page');
    var result = c_page.split(","), new_page;
    if (result.length === 1) {
        new_page = c_page.replace(result[result.length - 1], "");
        setLS('page', new_page);
    } else {
        new_page = c_page.replace(',' + result[result.length - 1], "");
        setLS('page', new_page);
    }

    document.getElementById('lightdirection').style.display = 'none';
    document.getElementById('fade').style.display = 'none';
}
function popuphide() {
    document.getElementById('lightdirection').style.display = 'none';
    document.getElementById('light').style.display = 'none';
    document.getElementById('white_contentlistnew1').style.display = 'none';
}

function index1() {
    document.getElementById('login_inner1').style.display = 'none';
    document.getElementById('loading').style.display = 'block';
    setTimeout(function () {
        document.getElementById('loading').style.display = 'none';
        window.location.href = 'index.html';
    }, 1000);

}

function droptable() {
    var create = window.openDatabase("blackman", "1.0", "blackman", 2 * 1024 * 1024);
    create.transaction(function createTableDB(tx) {
        tx.executeSql('DROP TABLE IF EXISTS userinfo');
        tx.executeSql('DROP TABLE IF EXISTS  branchinfo');
        tx.executeSql('DROP TABLE IF EXISTS  iteminfo');
        tx.executeSql('DROP TABLE IF EXISTS  cartitems');
        tx.executeSql('DROP TABLE IF EXISTS  kdcartitems');
        tx.executeSql('DROP TABLE IF EXISTS  sectioninfo');

        window.location.href = 'products.html';
    });
}

function loadmenu(pageno) {
    var isuserlogged = getLS('Isuserlogged');
    var username = "";
    if (getLS('UserName') !== null) {
        username = getLS('UserName');
    }
    var html = "";
    html = html + '<div class="innerpopup">';
    html = html + '<div class="empty">';
    html = html + '</div>';
    if (isuserlogged === 'yes') {
        html = html + '<div class="popdiv" onclick="findaccount(' + pageno + ')">';
        html = html + '<table class="tableclass" style="border: none;">';
        html = html + '<tr style="width: 220px; text-align: left">';
        html = html + '<td style="width: 35px">';
        html = html + '<img src="images/user.png" style="width: 37px; height: 37px;margin-left: -2px;" />';
        html = html + '</td>';
        html = html + '<td>';
        html = html + '<span class="p-menu" >Hi, ' + username + '</span>';
        html = html + '</td>';
        html = html + '</tr>';
        html = html + '</table>';
        html = html + '</div>';
        html = html + '<hr />';
    }
    else {
        html = html + '<div class="popdiv">';
        html = html + '<table class="tableclass" style="border: none;">';
        html = html + '<tr style="width: 220px; text-align: left">';
        html = html + '<td style="width: 35px">';
        html = html + '<img src="images/user.png" style="width: 37px; height: 37px;margin-left: -2px;" />';
        html = html + '</td>';
        html = html + '<td>';
        html = html + '<span class="p-menu" >Hi, Guest</span>';
        html = html + '</td>';
        html = html + '<td style="text-align: right;padding-right: 12px;">';
        html = html + '<span class="p-menu" ><a class="p-menu" href="#" onclick="login()" >[Login Now]</a></span>';
        html = html + '</td>';
        html = html + '</tr>';
        html = html + '</table>';
        html = html + '</div>';
        html = html + '<hr />';
    }

    html = html + '<div class="popdiv"  onclick="product(' + pageno + ')">';
    html = html + '<table class="tableclass" style="border: none;">';
    html = html + '<tr style="width: 220px; text-align: left">';
    html = html + '<td style="width: 35px">';
    html = html + '<img src="images/products.png" style="width: 32px; height: 32px" />';
    html = html + '</td>';
    html = html + '<td>';
    html = html + '<span class="p-menu">Product Categories</span>';
    html = html + '</td>';
    html = html + '</tr>';
    html = html + '</table>';
    html = html + '</div>';
    html = html + '<hr />';


    html = html + '<div class="popdiv" onclick="findbranch(' + pageno + ')">';
    html = html + '<table class="tableclass" style="border: none;">';
    html = html + '<tr style="width: 220px; text-align: left">';
    html = html + '<td style="width: 35px">';
    html = html + '<img src="images/findshowroom.png" style="width: 32px; height: 32px" />';
    html = html + '</td>';
    html = html + '<td>';
    html = html + '<span class="p-menu" >Find Branch</span>';
    html = html + '</td>';
    html = html + '</tr>';
    html = html + '</table>';
    html = html + '</div>';
    html = html + '<hr />';

    html = html + '<div class="popdiv" onclick="findcart(' + pageno + ')">';
    html = html + '<table class="tableclass" style="border: none;">';
    html = html + '<tr style="width: 220px; text-align: left">';
    html = html + '<td style="width: 35px">';
    html = html + '<img src="images/cart.png" style="width: 32px; height: 32px" />';
    html = html + '</td>';
    html = html + '<td>';
    html = html + '<span class="p-menu" >Cart</span>';
    html = html + '</td>';
    html = html + '</tr>';
    html = html + '</table>';
    html = html + '</div>';
    html = html + '<hr />';
    html = html + '<div class="popdiv" style="height:48px"  onclick="findaccount(' + pageno + ')">';
    html = html + '<table class="tableclass" style="border: none;">';
    html = html + '<tr style="width: 220px; text-align: left">';
    html = html + '<td style="width: 35px">';
    html = html + '<img src="images/myaccount.png" style="width: 32px; height: 32px" />';
    html = html + '</td>';
    html = html + '<td>';
    html = html + '<span class="p-menu" >My Account</span>';
    html = html + '</td>';
    html = html + '</tr>';
    html = html + '</table>';
    html = html + '</div>';
    html = html + '</div>';


    $("#white_contentlistnew").html(html);
}

function home(pageno) {
    window.location.href = 'index.html';
}
