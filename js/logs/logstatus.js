/*
This javascript files is only for Logging user activity
Creaded on:12/09/2014 1PM
License:Tychons solutions
*/

// JquerySelectorVariable
var JQFade = $("#fade"), JQLoadingPage = $("#loadingPdt");
function writeToLogFile(message, pageno) {
    var IMEI = getLS('IMEI');
    var UUID = getLS('UUID');
    var CustomerNumber = getLS('CustomerNumber');
    if (CustomerNumber === null) { CustomerNumber = ""; }
    var UserProfile = getLS('UserProfile');
    if (UserProfile === null) { UserProfile = ""; }
    if (IMEI === 'undefined' || IMEI === "" || IMEI === null) {
        IMEI = "N/A"
    }
    if (UUID === 'undefined' || UUID === "" || UUID === null) {
        UUID = "N/A"
    }
    if (UserProfile === 'undefined' || UserProfile === "" || UserProfile === null) {
        UserProfile = ""
    }
    if (CustomerNumber === 'undefined' || CustomerNumber === "" || CustomerNumber === null) {
        CustomerNumber = "0"
    }
    if (UserProfile === 'undefined' || UserProfile === "" || UserProfile === null) {
        UserProfile = ""
    }
    $.ajax({
        type: "GET",
        crossDomain: true,
        url: BlackmanApplicationServices.logURL + "custnumber=" + CustomerNumber + "&custname=" + UserProfile + "&description=" + message + "&imeino=" + IMEI + "&uuid=" + UUID + "&deviceencryptedkey=" + encryptedkey + "&splib=" + BlackmanApplicationVariables.splib + "&tablelib=" + BlackmanApplicationVariables.tablelib,
        dataType: "xml",
        success: function (xmlData) {
            switch (pageno) {
                case 1:
                    window.location.href = 'products.html';
                    break;
                case 2:
                    window.location.href = 'products.html';
                    break;
                case 3:
                    break;
                case 4:
                    localStorage.clear();
                    droptable();
                    break;
                case 5:
                    window.location.reload();
                    break;
                case 6:
                    window.location.href = 'myaccount.html';
                    break;
                case 7:
                    loadCartItems();     
                    JQLoadingPage.hide();
                    JQFade.hide();
                    $.mobile.loading("hide");
                    break;
                case 8:
                    accountPageLoad();
                    break;
                case 9:
                    JQLoadingPage.hide();
                    $.mobile.loading("hide");
                    navigator.notification.alert('Item Added to cart', null, 'Cart', 'OK');
                    checkInventoryFunCls();
                    break;
                case 10:
                    JQLoadingPage.hide();
                    $.mobile.loading("hide");
                    productPageLoad();
                    break;
                case 11:
                    $.mobile.loading("hide");
                    $("#fade1").hide();
                    $("#shipping_popup").show();
                    break;
                case 12:
                    JQLoadingPage.hide();
                    $.mobile.loading("hide");
                    navigator.notification.alert('Item Added to cart', null, 'Cart', 'OK');
                    break;
                case 13:
                    JQLoadingPage.hide();
                    JQFade.hide();
                    $.mobile.loading("hide");
                    $("#checkinventory1").hide();
                    navigator.notification.alert('Item Added to cart', null, 'Cart', 'OK');
                    break;
            }
        },
        error: function () {
            navigator.notification.alert('Unable to connect server.Please try again later!', null, 'Connection Failed', 'OK');
            JQLoadingPage.hide();
            $.mobile.loading("hide");
        }
    });
}