/*
This javascript files is only for Logging user activity
Creaded on:12/09/2014 1PM
License:Tychons solutions
*/

function writetologfile(message,pageno) 
{
   
    var isuserlogged = GetLS('Isuserlogged');
    var IMEI = GetLS('IMEI');
    var UUID = GetLS('UUID');

    var CustomerNumber = "";

    if (GetLS('CustomerNumber') != null) {
        CustomerNumber = GetLS('CustomerNumber');
    }
    else {
        CustomerNumber = "";
    }

    var UserProfile = "";

    if (GetLS('UserProfile') == null) {
        UserProfile = "";
    }
    else {
        UserProfile = GetLS('UserProfile');
    }


    if (IMEI == 'undefined' || IMEI == "" || IMEI == null) {
        IMEI = "N/A"
    }

    if (UUID == 'undefined' || UUID == "" || UUID == null) {
        UUID = "N/A"
    }

    if (UserProfile == 'undefined' || UserProfile == "" || UserProfile == null) {
        UserProfile = ""
    }

    if (CustomerNumber == 'undefined' || CustomerNumber == "" || CustomerNumber == null) {
        CustomerNumber = "0"
    }

    if (UserProfile == 'undefined' || UserProfile == "" || UserProfile == null) {
        UserProfile = ""
    }



    $.ajax({
        type: "GET",
        crossDomain: true,
        url: logURL + "custnumber=" + CustomerNumber + "&custname=" + UserProfile + "&description=" + message + "&imeino=" + IMEI + "&uuid=" + UUID + "&deviceencryptedkey=" + encryptedkey + "&splib=" + splib + "&tablelib=" + tablelib,
        dataType: "xml",
        success: function (xmlData) {
            switch (pageno) {
                case 1:
                    //alert('case1');
                    window.location.href = 'products.html';
                    break;

                case 2:
                    //alert('case2');
                    window.location.href = 'products.html';
                    break;

                case 3:
                    //alert('case3');
                    break;

                case 4:
                    //alert('case4');
                    localStorage.clear();
                    droptable();

                    break;

                case 5:
                    //alert('case5');
                    window.location.reload();
                    break;

                case 6:
                    //alert('case6');
                    window.location.href = 'myaccount.html';
                    break;

                case 7:
                    //alert('case7');
                    loadcartitems();
                    // hide the loader

                    $("#loading_pdt").hide();
                    $("#fade").hide();
                    $.mobile.loading("hide");
                    break;

                case 8:
                    accountpage_load();
                    break;

                case 9:
                    //alert('case9');.
                    $("#loading_pdt").hide();
                    $.mobile.loading("hide");
                    navigator.notification.alert('Item Added to cart', null, 'Cart', 'OK');
                    checkinventoryfuncls();
                    break;

                case 10:
                    $("#loading_pdt").hide();
                    $.mobile.loading("hide");
                    product_pageload();
                    break;

                case 11:
                    $.mobile.loading("hide");
                    $("#fade1").hide();
                    $("#shipping_popup").show();
                    break;

                case 12:
                    //alert('case9');.
                    $("#loading_pdt").hide();
                    $.mobile.loading("hide");
                    navigator.notification.alert('Item Added to cart', null, 'Cart', 'OK');
                    break;

                case 13:
                    //alert('case9');.
                    $("#loading_pdt").hide();
                    $("#fade").hide();
                    $.mobile.loading("hide");
                    $("#checkinventory1").hide();
                    navigator.notification.alert('Item Added to cart', null, 'Cart', 'OK');


                    break;
            }

        },
        error: function (data, errorThrown) {
            navigator.notification.alert('Unable to connect server.Please try again later!', null, 'Connection Failed', 'OK');
            $("#loading_pdt").hide();
            $.mobile.loading("hide");
        }
    });
   
}