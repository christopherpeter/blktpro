/*
This javascript files is only for general functions
Creaded on:22/07/2014 12:05PM
License:Tychons solutions
*/

//Globalvalues for the JS

AccessTokenKey = getLS('AccessTokenKey');
if (AccessTokenKey === null) {
    AccessTokenKey = "";
}
CustomerNumber = getLS('CustomerNumber');
if (CustomerNumber === null) {
    CustomerNumber = "";
}
userID = getLS('UserID');
if (userID === null) {
    userID = "";
}
UserProfile = getLS('UserProfile');
if (UserProfile === null) {
    UserProfile = "";
}

isuserlogged = getLS('Isuserlogged');
UserName = getLS('UserName');
if (UserName === null) {

    UserName = "";
}
Isvalid = 'N';
if (isuserlogged === 'yes') {
    Isvalid = "Y";
}


//Function for handling submit button in the cart page

function submitcart() {

    var ordercode = "O";
    var OrderChargeorCashCode = $("#ddorder").val();

    if (OrderChargeorCashCode === '0') {
        navigator.notification.alert('Please select the mode of payment!', null, 'Order Alert', 'OK');
        return false;
    }

    var OrderMethodOfShipment = $("#ddshippment1").val();
    var shipfrombranchnumber = 0;
    if (OrderMethodOfShipment === 'P') {
        shipfrombranchnumber = getLS('branchcodenumber');

    }
    else {
        shipfrombranchnumber = 100;
    }

    $("#submitpopup").hide();

    $("#fade2").show();

    $.mobile.loading("show", {
        text: "Loading,Please Wait...",
        textVisible: true,
        theme: "a",
        textonly: true,
        html: "<span class='ui-bar ui-overlay-a ui-corner-all' style='text-align:center;background:#ccc'><img src='images/ajax-loader.gif'/><br/><p style='color:#304589;font-weight:bold'>Please Wait...</p></span>"

    });

    //var TotalCartWeight = getLS('Totalcartweight');
    var ShipViaDescription = getLS('ShipViaDescription');
    var Ourstatuscode = "N";
    //var OrderEnteredAsType = "A";
    //var OrderAgeCode = 2;
    //var ShipToAddressFlag = "Y";
    var TaxableFlag = '';
    var pricetax = BlackmanApplicationVariables.SettingsPricetax, shippingcharges = BlackmanApplicationVariables.SettingsShippingcharges;
    if (pricetax !== 0 && pricetax !== null) {
        TaxableFlag = 'Y';
    }
    else {
        TaxableFlag = 'N';
    }
    var salesmanid = "";
    if (getLS('salesmanid') !== "" && getLS('salesmanid') !== null) {
        salesmanid = getLS('salesmanid');
    }
    else {
        salesmanid = "";
    }

    var CountofLineItems = Totalitems;
    //var TaxPercent = pricetax;
    //var OrderTaxAmount = getLS('CartTotalTax');
    var SubtotalAmount = getLS('CartTotalamount');
    var OtherChargesTotalAmount = parseFloat(shippingcharges);
    var CostTotalAmount = parseFloat(SubtotalAmount) + parseFloat(shippingcharges);

    var UserIDofMaintenance = getLS('UserID');

    //var OrderFillTypeCode = "I";
    //var TaxableAmount = getLS('CartTotalamountWithTax');
    //var NonTaxableAmount = getLS('CartTotalamount');
    //var RouteInUseTag = "L";
    //var DiscountPercent = "0";
    var initials = "WOE";

    var jobnumber = "";
    var jobname = "";
    var BuyFromBranchNumber = getLS('branchcodenumber');
    //Bind data for Order table

    var param1 = '{"orderdata1":{';
    param1 = param1 + '"customernumber":"' + CustomerNumber + '",';
    param1 = param1 + '"branchnumber":"' + BuyFromBranchNumber + '",';
    param1 = param1 + '"ordermethodofshipment":"' + OrderMethodOfShipment + '",';
    param1 = param1 + '"orderchargeorcashcode":"' + OrderChargeorCashCode + '",';
    param1 = param1 + '"ourstatuscode" : "' + Ourstatuscode + '",';

    param1 = param1 + '"countoflineitems":"' + CountofLineItems + '",';
    param1 = param1 + '"taxpercent":"0",';
    param1 = param1 + '"ordertaxamount":"0",';
    param1 = param1 + '"subtotalamount":"' + SubtotalAmount + '",';
    param1 = param1 + '"otherchargestotalamount":"' + OtherChargesTotalAmount + '",';

    param1 = param1 + '"shipviadescription":"' + ShipViaDescription + '",';
    param1 = param1 + '"jobname":"' + jobname + '",';
    param1 = param1 + '"totalinvoiceamount":"' + CostTotalAmount + '",';
    param1 = param1 + '"ordercode":"' + ordercode + '",';
    param1 = param1 + '"shipfrombranchnumber":"' + shipfrombranchnumber + '",';
    param1 = param1 + '"jobnumber":"' + jobnumber + '",';
    param1 = param1 + '"salesmanid" : "' + salesmanid + '",';
    param1 = param1 + '"orderedbyname" : "' + orderedbyname + '",';
    param1 = param1 + '"initials":"' + initials + '"';
    param1 = param1 + '}}';


    var query1 = "select selectedbranch,RequiredQuantity,ItemUnitPriceAmount,OurProductNumber,OurItemNumber,ItemStockingUnitOfMeasure from cartitems"; //For trade professional




    var param2 = '{"orderdata2":[';
    var showproduct = window.openDatabase("blackman", "1.0", "blackman", 2 * 1024 * 1024);
    showproduct.transaction(function showitemsbyid(tx) {
        tx.executeSql(query1, [], function successitem(txx, res) {

            if (res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {

                    var ss = res.rows.item(i);
                    //var LineItemSequenceNumber = parseInt(i + 1, 10);
                    var OurProductNumber = ss.OurProductNumber;
                    var OurItemNumber = ss.OurItemNumber;
                    var ItemPricingUnitofMeasure = ss.ItemStockingUnitOfMeasure; //doubt
                    var QuantityOrdered = ss.RequiredQuantity;
                    var ItemUnitPriceAmount = ss.ItemUnitPriceAmount;
                    //var ExtendedPriceAmount = QuantityOrdered * ItemUnitPriceAmount;
                    //var OrderLineItemType = "S";
                    //var LineItemPriceSourceCode = "I";
                    //var LineItemCostSourceCode = "I";
                    var LineItemQuantityOrderedUnitOfMeasure = ss.ItemStockingUnitOfMeasure; //doubt
                    var selectedbranch = ss.selectedbranch;
                    //var OrderStatusCode = "O";


                    if (i !== res.rows.length - 1) {

                        param2 = param2 + '{'

                        param2 = param2 + '"customernumber":"' + CustomerNumber + '",';
                        param2 = param2 + '"ourproductnumber":"' + OurProductNumber + '",';
                        param2 = param2 + '"ouritemnumber":"' + OurItemNumber + '",';
                        param2 = param2 + '"itempricingunitofmeasure":"' + ItemPricingUnitofMeasure + '",';

                        param2 = param2 + '"branchnumber":"' + selectedbranch + '",';
                        param2 = param2 + '"quantityordered":"' + QuantityOrdered + '",';
                        param2 = param2 + '"itemunitpriceamount":"' + parseFloat(ItemUnitPriceAmount).toFixed(2) + '",';
                        param2 = param2 + '"useridofmaintenance":"' + UserIDofMaintenance + '",';


                        param2 = param2 + '"lineitemquantityorderedunitofmeasure":"' + LineItemQuantityOrderedUnitOfMeasure + '",';
                        param2 = param2 + '"ordermethodofshipment":"' + OrderMethodOfShipment + '",';
                        param2 = param2 + '"orderchargeorcashcode":"' + OrderChargeorCashCode + '",';
                        param2 = param2 + '"shipfrombranchnumber":"' + shipfrombranchnumber + '",';


                        param2 = param2 + '"quantitybackordered":"0",';
                        param2 = param2 + '"quantityshipped":"' + QuantityOrdered + '"';

                        param2 = param2 + '},'
                    }
                    else {

                        param2 = param2 + '{'

                        param2 = param2 + '"customernumber":"' + CustomerNumber + '",';
                        param2 = param2 + '"ourproductnumber":"' + OurProductNumber + '",';
                        param2 = param2 + '"ouritemnumber":"' + OurItemNumber + '",';
                        param2 = param2 + '"itempricingunitofmeasure":"' + ItemPricingUnitofMeasure + '",';

                        param2 = param2 + '"branchnumber":"' + selectedbranch + '",';
                        param2 = param2 + '"quantityordered":"' + QuantityOrdered + '",';
                        param2 = param2 + '"itemunitpriceamount":"' + parseFloat(ItemUnitPriceAmount).toFixed(2) + '",';
                        param2 = param2 + '"useridofmaintenance":"' + UserIDofMaintenance + '",';

                        param2 = param2 + '"lineitemquantityorderedunitofmeasure":"' + LineItemQuantityOrderedUnitOfMeasure + '",';
                        param2 = param2 + '"ordermethodofshipment":"' + OrderMethodOfShipment + '",';
                        param2 = param2 + '"orderchargeorcashcode":"' + OrderChargeorCashCode + '",';
                        param2 = param2 + '"shipfrombranchnumber":"' + shipfrombranchnumber + '",';

                        param2 = param2 + '"quantitybackordered":"0",';
                        param2 = param2 + '"quantityshipped":"' + QuantityOrdered + '"';


                        param2 = param2 + '}'
                    }

                }
                param2 = param2 + ']}'
            }


            sendsummitorder(param1, param2);
        });
    });
}


function sendsummitorder(param1, param2) {

    //-------------------------------------------
    //Forming New Parameter

    var ShippingMethod = getLS('ShippingMethod');
    var name = UserName;
    var street = ""; var city = ""; var state = ""; var postcode = "";

    if (ShippingMethod !== 'P') {

        if (getLS('Toaddress') === null || getLS('Toaddress') === "") {
            street = "";
        }
        else {
            street = getLS('Toaddress');
        }

        if (getLS('Tocity') === null || getLS('Tocity') === "") {
            city = "";
        }
        else {
            city = getLS('Tocity');
        }

        if (getLS('Tostate') === null || getLS('Tostate') === "") {
            state = "";
        }
        else {
            state = getLS('Tostate');
        }

        if (getLS('Tozip') === null || getLS('Tozip') === "") {
            postcode = "";
        }
        else {
            postcode = getLS('Tozip');
        }

    }
    else {
        name = "";; street = ""; city = ""; state = ""; postcode = "";
    }

    var param3 = "";

    param3 = '{"orderdata3":{';

    param3 = param3 + '"custno":"' + CustomerNumber + '",';
    param3 = param3 + '"shippingaddress1":"' + name + '",';
    param3 = param3 + '"shippingaddress2":"' + street + '",';
    param3 = param3 + '"shippingaddress3":"",';
    param3 = param3 + '"shippingcity":"' + city + '",';
    param3 = param3 + '"shippingstate":"' + state + '",';
    param3 = param3 + '"shippingzipcode":"' + postcode + '"';
    param3 = param3 + '}}';


    //--------------------------------------------


    var isuserlogged = getLS('Isuserlogged');
    var UserProfile = getLS('UserProfile');
    if (isuserlogged === 'yes') {
        $.ajax({
            type: "GET",
            crossDomain: true,
            url: BlackmanApplicationServices.salesorderURL + "passValue1=" + param1 + "&passValue2=" + param2 + "&passValue3=" + param3 + "&UserId=" + UserProfile + "&deviceencryptedkey=" + encryptedkey + "&accesstoken=" + AccessTokenKey + "&splib=" + BlackmanApplicationVariables.splib + "&tablelib=" + BlackmanApplicationVariables.tablelib,
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
                var ordernumber = json.OrderNumber;
                if (json.Inserted === "Success") {

                    navigator.notification.alert('Thank you, Your order request has been successfully submitted.The order number is ' + ordernumber + '. Your order may be viewed under "My Account - Order History".', null, 'Order Information', 'OK');
                    var query = "DROP TABLE IF EXISTS  cartitems";

                    var create = window.openDatabase("blackman", "1.0", "blackman", 2 * 1024 * 1024);
                    create.transaction(function createTableDB(tx) {
                        tx.executeSql(query);

                    });

                    $("#loadingPdt").hide();
                    $.mobile.loading("hide");
                    document.getElementById('submitpopup').style.display = 'none';
                    $("#fade").hide();
                    writeToLogFile("User has submitted an order.[Orderno:" + ordernumber + "]", 7);

                }
                else {

                    navigator.notification.alert('Order Submission Failed! Please try again.', null, 'Order Failed', 'OK');
                    $("#fade2").hide();
                    $.mobile.loading("hide");
                    document.getElementById('submitpopup').style.display = 'none';
                    $("#fade").hide();
                    writeToLogFile("User has submitted an order.[Failed]", 3);

                }

            },
            error: function () {
                navigator.notification.alert('Unable to connect server.Please try again later.', null, 'Connection Failed', 'OK');
                $("#fade2").hide();
                $.mobile.loading("hide");
                $("#submitpopup").show();
                document.getElementById('submitpopup').style.display = 'none';
                $("#fade").hide();
            }
        });
    }
}


function submitpopup() {

    var pricetax = BlackmanApplicationVariables.SettingsPricetax, shippingcharges = BlackmanApplicationVariables.SettingsShippingcharges;
   
    // Newly added on 12-01-2014
    var cartread = window.openDatabase("blackman", "1.0", "blackman", 2 * 1024 * 1024);       /* opening local database */
    cartread.transaction(function carinsertdetails(tx) {

        var output = "";
        var query3 = "SELECT sum(TotalPrice) as Estimatedtotal,sum(Totalweight) as FullTotalweight FROM cartitems";

        tx.executeSql(query3, [], function successitem(txx, result) {

            if (result.rows.length > 0) {
                for (var i = 0; i < result.rows.length; i++) {
                    var ss = result.rows.item(i);
                    var Estimatedtotal = ss.Estimatedtotal;
                    var TotalWeight = ss.FullTotalweight;
                    var GrandTotal = Estimatedtotal + parseFloat(shippingcharges);
                    var Tax = Estimatedtotal * (parseFloat(pricetax) / 100);
                    var Pricewithtax = GrandTotal + Tax;

                    setLS('CartTotalamount', Estimatedtotal.toFixed(2));
                    setLS('CartTotalTax', Tax.toFixed(2));
                    setLS('CartTotalamountWithTax', Pricewithtax.toFixed(2));

                    output = output + '<table class="footertable">';
                    output = output + '<tr>';
                    output = output + '<td style="font-weight: bold; vertical-align: top; width: 15%; color: #304589; border-right: 1px solid #808080">';
                    output = output + 'Order Summary';
                    output = output + '</td>';
                    output = output + '<td style="width: 55%">';
                    output = output + '<table style="width: 100%">';
                    output = output + '<tr>';
                    output = output + '<td style="width:48%">';
                    output = output + 'Subtotal';
                    output = output + '</td>';
                    output = output + '<td style="width:52%">';
                    output = output + ': $' + Estimatedtotal.toFixed(2);
                    output = output + '</td>';
                    output = output + '</tr>';
                    if (pricetax !== 0 && pricetax !== "") {
                        output = output + '<tr>';
                        output = output + '<td>';
                        output = output + 'Estimated Tax (' + pricetax + '%)';
                        output = output + '</td>';
                        output = output + '<td>';
                        output = output + ': $' + Tax.toFixed(2) + " (Approx)";
                        output = output + '</td>';
                        output = output + '</tr>';
                    }
                    else {
                        output = output + '<tr>';
                        output = output + '<td>';
                        output = output + 'Estimated Tax (0%)';
                        output = output + '</td>';
                        output = output + '<td>';
                        output = output + ': $0.00';
                        output = output + '</td>';
                        output = output + '</tr>';
                    }
                    if (getLS('ShippingMethod') !== "O" && getLS('ShippingMethod') !== "P") {
                        output = output + '<tr>';
                        output = output + '<td>';
                        output = output + 'Estimated Shipping';
                        output = output + '</td>';
                        output = output + '<td>';
                        output = output + ': $<label id="lblshipping">' + shippingcharges + '<lable>';
                        output = output + '</td>';
                        output = output + '</tr>';
                    }
                    output = output + '</table>';
                    output = output + '</td>';
                    output = output + '<td style="width: 30%; vertical-align: top; text-align: right;">';
                    output = output + '<table style="width: 100%">';
                    output = output + '<tr>';
                    output = output + '<td style="font-weight: bold; color: #304589;width: 100%;">';
                    output = output + 'Estimated Total:';
                    output = output + '</td>';

                    output = output + '<td style="width: 50%;">';
                    output = output + '$' + Pricewithtax.toFixed(2);
                    output = output + '</td>';
                    output = output + '</tr>';
                    output = output + '</table>';
                    output = output + '</td>';
                    output = output + '</table>';

                }

                $("#div_cartitems1").html(output);
            }

        });

    });


    var OrderMethodOfShipment = $("#ddshippment1").val();
    var cPage = getLS('page');
    var result = cPage.split(",");
    if (OrderMethodOfShipment === "D") {

        if (result[result.length - 1] !== "submitpopup") {
            setLS('page', cPage + ",submitpopup");
        }

        $("#shipping_popup").hide();
        $("#fade").show();
        $("#submitpopup").show();

    }
    else if (OrderMethodOfShipment === "O") {

        if (result[result.length - 1] !== "submitpopup") {
            setLS('page', cPage + ",submitpopup");
        }

        $("#shipping_popup").hide();
        $("#fade").show();
        $("#submitpopup").show();

    }
    else if (OrderMethodOfShipment === "P") {
        var pickupbranch = $("#ddpickupbranch").val();
        if (pickupbranch === 0) {
            navigator.notification.alert('Please select your Pickup branch..!', null, 'Alert', 'OK');
            return false;
        }

        if (result[result.length - 1] !== "submitpopup") {
            setLS('page', cPage + ",submitpopup");
        }
        $("#shipping_popup").hide();
        $("#fade").show();
        $("#submitpopup").show();

    }
    else if (OrderMethodOfShipment === "S") {
        var serviceOption = $("#ddserviceoption").val();

        if (serviceOption === 0) {
            navigator.notification.alert('Please select UPS Shipping Service..!', null, 'Alert', 'OK');
            return false;
        }

        if (result[result.length - 1] !== "submitpopup") {
            setLS('page', cPage + ",submitpopup");
        }
        $("#shipping_popup").hide();
        $("#fade").show();
        $("#submitpopup").show();
    }


}

function onConfirmCancelOrder(buttonIndex) {
    if (buttonIndex === 1) {
        var cPage = getLS('page');
        var result = cPage.split(","), newPage;
        if (result.length === 1) {
            newPage = cPage.replace(result[result.length - 1], "");
            setLS('page', newPage);
        } else {
            newPage = cPage.replace('estimateshipping,' + result[result.length - 1], "");
            setLS('page', newPage);
        }

        document.getElementById('submitpopup').style.display = 'none';
        $("#fade").hide();
    }
}

function submitclose() {

    navigator.notification.confirm('Are you sure want to cancel your order submission?', onConfirmCancelOrder, 'Logout', ['Yes', 'No']);

}