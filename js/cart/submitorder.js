/*
This javascript files is only for general functions
Creaded on:22/07/2014 12:05PM
License:Tychons solutions
*/

//Globalvalues for the JS

var AccessTokenKey = GetLS('AccessTokenKey');
if (AccessTokenKey == null) { AccessTokenKey = ""; }
var CustomerNumber = GetLS('CustomerNumber');
if (CustomerNumber == null) { CustomerNumber = ""; }
var user_ID = GetLS('UserID');
if (user_ID == null) { user_ID = ""; }
var UserProfile = GetLS('UserProfile');
if (UserProfile == null) { UserProfile = ""; }
var isuserlogged = GetLS('Isuserlogged');
var UserName = GetLS('UserName');
if (UserName == null) { UserName = ""; }
var Isvalid = "";
if (isuserlogged == 'yes') {
    Isvalid = "Y";
}
else {
    Isvalid = "N";
}


//Function for handling submit button in the cart page

function submitcart() {

    var ordercode = "O";
    var JobName = "";
    var OrderChargeorCashCode = $("#ddorder").val();

    if (OrderChargeorCashCode == "0")
    {
        navigator.notification.alert('Please select the mode of payment!', null, 'Order Alert', 'OK');
        return false;
    }

    var OrderMethodOfShipment = $("#ddshippment1").val();
    var shipfrombranchnumber = 0;
    if (OrderMethodOfShipment == "P") {
        shipfrombranchnumber = GetLS('branchcodenumber');

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

    var BranchNumber = GetLS('default_branchcode');
    var TotalCartWeight = GetLS("Totalcartweight");
    var ShipViaDescription = GetLS("ShipViaDescription");
    var Ourstatuscode = "N";
    var OrderEnteredAsType = "A";
    var OrderAgeCode = 2;
    var Order = "O";
    var ShipToAddressFlag = "Y";
    if (pricetax != 0 && pricetax != null) {
        var TaxableFlag = "Y";
    }
    else {
        var TaxableFlag = "N";
    }
    var salesmanid = "";
    if (GetLS('salesmanid') != "" && GetLS('salesmanid') != null) {
        salesmanid = GetLS('salesmanid');
    }
    else {
        salesmanid = "";
    }

    var CountofLineItems = Totalitems;
    var TaxPercent = pricetax;
    var OrderTaxAmount = TotalTax;
    var SubtotalAmount = Totalamount;
    var OtherChargesTotalAmount = parseFloat(shippingcharges);
    var CostTotalAmount = parseFloat(SubtotalAmount) + parseFloat(shippingcharges);

    var UserIDofMaintenance = GetLS('UserID');

    var OrderFillTypeCode = "I";
    var TaxableAmount = Totalamount_withtax;
    var NonTaxableAmount = Totalamount;
    var RouteInUseTag = "L";
    var DiscountPercent = "0";
    var initials = "WOE";

    var jobnumber = "";
    var jobname = "";
    var BuyFromBranchNumber = GetLS('branchcodenumber');
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
                    var LineItemSequenceNumber = parseInt(i + 1);
                    var OurProductNumber = ss.OurProductNumber;
                    var OurItemNumber = ss.OurItemNumber;
                    var ItemPricingUnitofMeasure = ss.ItemStockingUnitOfMeasure; //doubt
                    var QuantityOrdered = ss.RequiredQuantity;
                    var ItemUnitPriceAmount = ss.ItemUnitPriceAmount;
                    var ExtendedPriceAmount = QuantityOrdered * ItemUnitPriceAmount;
                    var OrderLineItemType = "S";
                    var LineItemPriceSourceCode = "I";
                    var LineItemCostSourceCode = "I";
                    var LineItemQuantityOrderedUnitOfMeasure = ss.ItemStockingUnitOfMeasure; //doubt
                    var selectedbranch = ss.selectedbranch;
                    var OrderStatusCode = "O";


                    if (i != res.rows.length - 1) {

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


function sendsummitorder(param1, param2)
{

    //-------------------------------------------
    //Forming New Parameter

    var ShippingMethod = GetLS("ShippingMethod");
    var name = UserName;
    var street = ""; var city = ""; var state = ""; var postcode = "";

    if (ShippingMethod != "P") 
    {

        if (GetLS('Toaddress') == null || GetLS('Toaddress') == "") {
            street = "";
        }
        else {
            street = GetLS('Toaddress');
        }

        if (GetLS('Tocity') == null || GetLS('Tocity') == "") {
            city = "";
        }
        else {
            city = GetLS('Tocity');
        }
      
        if (GetLS('Tostate') == null || GetLS('Tostate') == "") {
            state = "";
        }
        else {
            state = GetLS('Tostate');
        }

        if (GetLS('Tozip') == null || GetLS('Tozip') == "") {
            postcode = "";
        }
        else {
            postcode = GetLS('Tozip');
        }

    }
    else 
    {
        name = ""; ; street = ""; city = ""; state = ""; postcode = "";
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


    var isuserlogged = GetLS('Isuserlogged');
    var UserProfile = GetLS('UserProfile');
    if (isuserlogged == 'yes') {
        $.ajax({
            type: "GET",
            crossDomain: true,
            url: salesorderURL + "passValue1=" + param1 + "&passValue2=" + param2 + "&passValue3=" + param3 + "&UserId=" + UserProfile + "&deviceencryptedkey=" + encryptedkey + "&accesstoken=" + AccessTokenKey + "&splib=" + splib + "&tablelib=" + tablelib,
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
                if (json.Inserted == "Success")
                {

                    navigator.notification.alert('Thank you, Your order request has been successfully submitted.The order number is ' + ordernumber + '. Your order may be viewed under "My Account - Order History".', null, 'Order Information', 'OK');
                    var query = "DROP TABLE IF EXISTS  cartitems";                    
  
                    var create = window.openDatabase("blackman", "1.0", "blackman", 2 * 1024 * 1024);
                    create.transaction(function createTableDB(tx)
                    {
                        tx.executeSql(query);

                    });

                    $("#loading_pdt").hide();
                    $.mobile.loading("hide");
                    document.getElementById('submitpopup').style.display = 'none';
                    $("#fade").hide();
                    writetologfile("User has submitted an order.[Orderno:" + ordernumber + "]", 7);

                }
                else
                {
             
                    navigator.notification.alert('Order Submission Failed! Please try again.', null, 'Order Failed', 'OK');
                    $("#fade2").hide();
                    $.mobile.loading("hide");
                    document.getElementById('submitpopup').style.display = 'none';
                    $("#fade").hide();
                    writetologfile("User has submitted an order.[Failed]", 3);
                   
                }

            },
            error: function (data, errorThrown)
            {
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


    // Newly added on 12-01-2014
    var cartread = window.openDatabase("blackman", "1.0", "blackman", 2 * 1024 * 1024);       /* opening local database */
    cartread.transaction(function carinsertdetails(tx) {

        var output = "";
        var query3 = "SELECT sum(TotalPrice) as Estimatedtotal,sum(Totalweight) as FullTotalweight FROM cartitems";
        
        tx.executeSql(query3, [], function successitem(txx, result)
        {

            if (result.rows.length > 0) {
                for (var i = 0; i < result.rows.length; i++) {
                    var ss = result.rows.item(i);
                    var Estimatedtotal = ss.Estimatedtotal;
                    var TotalWeight = ss.FullTotalweight;
                    var GrandTotal = Estimatedtotal + parseFloat(shippingcharges);
                    var Tax = Estimatedtotal * (parseFloat(pricetax) / 100);
                    var Pricewithtax = GrandTotal + Tax;


                    //Assinging the values to global variables

                    Totalamount = Estimatedtotal.toFixed(2);
                    TotalTax = Tax.toFixed(2);
                    Totalamount_withtax = Pricewithtax.toFixed(2);


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
                    if (pricetax != 0 && pricetax != "") {
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
                    if (GetLS('ShippingMethod') != "O" && GetLS('ShippingMethod') != "P") {
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

    if (OrderMethodOfShipment == "D") {
        var c_page = GetLS("page");
        var result = c_page.split(",");
        if (result[result.length - 1] != "submitpopup") {
            SetLS("page", c_page + ",submitpopup");
        }

        $("#shipping_popup").hide();
        $("#fade").show();
        $("#submitpopup").show();

    }
    else if (OrderMethodOfShipment == "O") {
        var c_page = GetLS("page");
        var result = c_page.split(",");
        if (result[result.length - 1] != "submitpopup") {
            SetLS("page", c_page + ",submitpopup");
        }

        $("#shipping_popup").hide();
        $("#fade").show();
        $("#submitpopup").show();

    }
    else if (OrderMethodOfShipment == "P") {
        var pickupbranch = $("#ddpickupbranch").val();

        if (pickupbranch == 0) {
            navigator.notification.alert('Please select your Pickup branch..!', null, 'Alert', 'OK');
            return false;
        }
        
        var c_page = GetLS("page");
        var result = c_page.split(",");
        if (result[result.length - 1] != "submitpopup") {
            SetLS("page", c_page + ",submitpopup");
        }
        $("#shipping_popup").hide();
        $("#fade").show();
        $("#submitpopup").show();

    }
    else if (OrderMethodOfShipment == "S") {
        var serviceOption = $("#ddserviceoption").val();

        if (serviceOption == 0) {
            navigator.notification.alert('Please select UPS Shipping Service..!', null, 'Alert', 'OK');
            return false;
        }

        
        var c_page = GetLS("page");
        var result = c_page.split(",");
        if (result[result.length - 1] != "submitpopup") {
            SetLS("page", c_page + ",submitpopup");
        }
        $("#shipping_popup").hide();
        $("#fade").show();
        $("#submitpopup").show();
    }


}

function onConfirmCancelOrder(buttonIndex) 
{
    if (buttonIndex == 1) 
    {
        var c_page = GetLS("page");
        var result = c_page.split(",");
        if (result.length == 1) {
            var new_page = c_page.replace(result[result.length - 1], "");
            SetLS("page", new_page);
        } else {
            var new_page = c_page.replace('estimateshipping,' + result[result.length - 1], "");

            SetLS("page", new_page);
        }

        document.getElementById('submitpopup').style.display = 'none';
        $("#fade").hide();
    }
}

function submitclose() 
{

    navigator.notification.confirm('Are you sure want to cancel your order submission?', onConfirmCancelOrder, 'Logout', ['Yes', 'No']);
    
}