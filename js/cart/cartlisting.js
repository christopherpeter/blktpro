/*
This javascript files is only for general functions
Creaded on:22/07/2014 12:05PM
License:Tychons solutions
*/

// JquerySelectorVariable

var ddJQbranch = $("#ddbranch"), ddJQServiceOption = $("#ddserviceoption"), JQShipCharge = $("#shipcharge"), JQCartItems = $("#div_cartitems"), LblJQTotalItems = $("#lbltotalitems"), JQFromBranch = $("#frmbranch");

// Globalvalues for the JS


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

// function to load shipping address details()

function loadShippingAddress() {
    var output = "";
    var tempOutput = "";
    var showproduct = window.openDatabase("blackman", "1.0", "blackman", 2 * 1024 * 1024);
    showproduct.transaction(function showitemsbyid(tx) {
        tx.executeSql('select CustomerShippingAddress1,CustomerShippingCity,CustomerShippingState,CustomerMainShippingZipCode from userinfo', [], function successitem(txx, res) {

            output = output + '<div style="width: 96%; background: #304589;margin-top:5px; margin-left: 5px; height: 30px">';
            output = output + '<div style="color: #fff; font-size: 19px !important; font-weight: bold; margin-left: 2px;';
            output = output + 'margin-top: 0; text-align: center; width: 100%;">';
            output = output + '<div style="width: 76%; float: left; margin-left: 30px; margin-top: 3px;">';
            output = output + 'Shipping Details';
            output = output + '</div>';
            output = output + '<div>';
            output = output + '<img src="images/close_square_white.png" style="width: 30px; height: 30px; cursor: pointer;';
            output = output + 'border-radius: 10px; margin-top: 0" onclick="addressBookCls()" /></div>';
            output = output + '</div>';
            output = output + '</div>';
            tempOutput = output;
            for (var i = 0; i < res.rows.length; i++) {
                var ss = res.rows.item(i);
                var address1 = ss.CustomerShippingAddress1;
                var addresscity = ss.CustomerShippingCity;
                var addressstate = ss.CustomerShippingState;
                var addresszip = ss.CustomerMainShippingZipCode;



                output = output + '<div style="margin-top: 5px;padding: 5px;">';
                output = output + '<table>';
                output = output + '<tr>';
                output = output + '<td style="margin-left: 4px">';
                output = output + address1;
                output = output + '</td>';
                output = output + '</tr>';
                output = output + '<tr>';
                output = output + '<td style="margin-left: 4px">';
                output = output + addresscity;
                output = output + '</td>';
                output = output + '</tr>';
                output = output + '<tr>';
                output = output + '<td style="margin-left: 4px">';
                output = output + addressstate + '-' + addresszip;
                output = output + '</td>';
                output = output + '</tr>';
                output = output + '</table>';
                output = output + '<table>';
                output = output + '<tr>';
                output = output + '<td style="font-weight: bold; color: #304589; margin-left: 4px">';
                output = output + 'Export Compliance';
                output = output + '</td>';
                output = output + '</tr>';
                output = output + '<tr>';
                output = output + '<td style="margin-left: 4px">';
                output = output + 'Item will not be exported after purchase';
                output = output + '</td>';
                output = output + '</tr>';
                output = output + '</table>';
                output = output + '</div>';
            }

            if (tempOutput === output) {
                output = output + '<div style="margin-top: 5px;padding: 5px;">';
                output = output + '<p style="text-align:center">';
                output = output + 'No Details Found';
                output = output + '</p>';
                output = output + '</div>';
                $("#addressbook").html(output);
            }
            else {
                $("#addressbook").html(output);
            }
        });
    });
}



function setTax() {
    if (isuserlogged === 'yes') {
        var zipcode = getLS('Zipcode'), pricetax = BlackmanApplicationVariables.SettingsPricetax;
        $.ajax({
            type: "GET",
            crossDomain: true,
            url: BlackmanApplicationServices.gettaxfromzipcodeURL + zipcode + "&splib=" + BlackmanApplicationVariables.splib + "&tablelib=" + BlackmanApplicationVariables.tablelib,
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
                var finalresult = "{" + resultJSON + "}";
                var output = $.parseJSON(finalresult);
                var list = output.BMCTaxRate;
                var html = "";
                if (output.BMCTaxRate.length > 0) {
                    $.each(list, function (i, item) {
                        var TaxPercentage = item.TaxPercentage;
                        if (TaxPercentage !== "" && TaxPercentage !== null) {
                            pricetax = TaxPercentage; // binding user zipcode -tax

                            writeToLogFile("Tax Rate for Zipcode[" + zipcode + "] is " + pricetax, 7);
                        }
                        else {

                            pricetax = 0; // binding user zipcode -tax
                            writeToLogFile("Tax Rate for Zipcode[" + zipcode + "] is " + pricetax, 7);
                        }

                    });
                }
                else {
                    pricetax = 0; // binding user zipcode -tax
                    writeToLogFile("Tax Rate for Zipcode[" + zipcode + "] is " + pricetax, 7);
                }

            }, error: function () {

                $.mobile.loading("hide");
                $("#loadingPdt").hide();
                navigator.notification.alert('Unable to connect server.Please try again later!', null, 'Connection Failed', 'OK');
            }
        });
    }
    else {
        loadCartItems();
        $.mobile.loading("hide");
        $("#loadingPdt").hide();
    }
}



// Page Load event for cart

function cartPageLoad() {

    $("#loadingPdt").show();
    setLS('ShippingMethod', "S");
    setLS('ShipViaDescription', "UPS");

    $.mobile.loading("show", {
        text: "Loading,Please Wait...",
        textVisible: true,
        theme: "a",
        textonly: true,
        html: "<span class='ui-bar ui-overlay-a ui-corner-all' style='text-align:center;background:#ccc'><img src='images/ajax-loader.gif'/><br/><p style='color:#304589;font-weight:bold'>Please Wait...</p></span>"

    });

    var shippingMethod = getLS('ShippingMethod');
    if (shippingMethod !== '' || shippingMethod !== null) {
        $('#ddshippment1').val(shippingMethod);
    }
    else {
        $('#ddshippment1').val('0');
    }
    setTax();
    loadShippingAddress();
}


// Function to load cart items

var Totalitems;

function loadCartItems() {
    var pricetax = BlackmanApplicationVariables.SettingsPricetax, shippingcharges = BlackmanApplicationVariables.SettingsShippingcharges;
    var cartread = window.openDatabase("blackman", "1.0", "blackman", 2 * 1024 * 1024);       /* opening local database */
    cartread.transaction(function carinsertdetails(tx) {
        var query1 = "CREATE TABLE IF NOT EXISTS cartitems (id INTEGER PRIMARY KEY AUTOINCREMENT,Product_ID,OurItemNumber,OurProductNumber,ItemOrProductDescription,ItemStockingUnitOfMeasure,InventoryItemWeight,PRODUCTIMAGE,AVAILABLEQUNTY,ItemUnitPriceAmount,BRANCH,STOCK,RequiredQuantity,TotalPrice,Totalweight,selectedbranch)";
        var query2 = "select PRODUCTIMAGE,id,OurItemNumber,AVAILABLEQUNTY,ItemOrProductDescription,ItemUnitPriceAmount,RequiredQuantity,TotalPrice from cartitems";

        tx.executeSql(query1);
        tx.executeSql(query2, [], function successitem(txx, res) {
            var html = "<div style='margin-top:138px'>";
            var cartitemscount = 0, totalcartitems;

            if (res.rows.length > 0) {
                cartitemscount = res.rows.length;

                for (var i = 0; i < res.rows.length; i++) {
                    var ss = res.rows.item(i);
                    var id = ss.id;
                    var ReplacementCostUnitPriceCompany = 0;
                    var ItemOrProductDescription = ss.ItemOrProductDescription;
                    var OurListUnitPriceCompany = ss.ItemUnitPriceAmount;
                    var RequiredQuantity = ss.RequiredQuantity;
                    var TotalPrice = ss.TotalPrice;
                    var AVAILABLEQUNTY = ss.AVAILABLEQUNTY;
                    var PRODUCTIMAGE = ss.PRODUCTIMAGE;

                    html = html + '<div style="margin-top: 9px;">';
                    html = html + '<table class="tablecart" style="margin-bottom: -20px; margin-top: -6px;">';
                    html = html + '<tr>';
                    if (ReplacementCostUnitPriceCompany > 0) {
                        html = html + '<td class="pdtimg" style="width: 30%">';
                    }
                    else {
                        html = html + '<td class="pdtimg" style="vertical-align: top; width: 30%">';
                    }
                    html = html + '<table>';
                    html = html + '<tr>';
                    html = html + '<td>';
                    html = html + '<img onerror="imgError(this);" src="' + BlackmanApplicationVariables.productimagepath + PRODUCTIMAGE + '" class="cartpdt" />';
                    html = html + '</td>';
                    html = html + '</tr>';
                    html = html + '</table>';
                    html = html + '</td>';
                    html = html + '<td class="pdtimg" style="vertical-align: top; width: 70%">';
                    html = html + '<table>';
                    html = html + '<tr>';
                    html = html + '<td style="font-weight: bold">';
                    html = html + ItemOrProductDescription;
                    html = html + '</td>';
                    html = html + '<td style="vertical-align:top">';
                    html = html + '<img style="width: 16px; height: 16px; float: right;" src="images/slideshowcls.png" onclick=removecartitem(' + id + ') />';
                    html = html + '</td>';
                    html = html + '</tr>';
                    html = html + '<tr>';
                    html = html + '<td style="font-weight: bold; color: #304589; width: 100%">';
                    html = html + 'Qty:<input id="' + id + '-' + AVAILABLEQUNTY + '" oninput="maxLengthCheck(this)" min="1" max="99" maxlength="2" type="number" onchange="handleChangeAddToCart(this,' + RequiredQuantity + ');" style="text-align: center; width: 30px;';
                    html = html + 'height: 20px; margin-left: 5px; margin-right: 5px" value="' + RequiredQuantity + '"  />$' + parseFloat(OurListUnitPriceCompany).toFixed(2) + '/each';
                    html = html + '</td>';
                    html = html + '</tr>';
                    html = html + '<tr>';
                    html = html + '<td class="available">';
                    html = html + '<img src="images/yestick.png" style="width: 20px; height: 20px; vertical-align: bottom;';
                    html = html + 'margin-right: 2px" /><label>Available</label><label style="margin-left: 10px">Taxable:</label>';
                    if (pricetax !== 0 && pricetax !== "") {
                        html = html + '<label class="itemselecttax">';
                        html = html + 'Yes</label>';
                    }
                    else {
                        html = html + '<label class="itemselecttax">';
                        html = html + 'No</label>';
                    }

                    html = html + '</td>';
                    html = html + '</tr>';
                    if (ReplacementCostUnitPriceCompany > 0) {
                        html = html + '<tr>';
                        html = html + '<td style="font-weight: bold; color: #304589; width: 100%">';
                        html = html + 'Includes Repair & Replacement Coverage [$' + ReplacementCostUnitPriceCompany + '/each]';
                        html = html + '</td>';
                        html = html + '</tr>';
                    }
                    html = html + '<tr>';
                    html = html + '<td style="font-weight: bold; color: #304589; width: 60%">';
                    html = html + 'Item SubTotal: $' + parseFloat(TotalPrice).toFixed(2);
                    html = html + '</td>';
                    html = html + '</tr>';
                    html = html + '</table>';
                    html = html + '</td';
                    html = html + '</tr>';
                    html = html + '</table>';
                    html = html + '</div>';
                    html = html + '<hr style="margin-top: 20px;" />';
                }
                html = html + '<div>';
                html = html + '<table class="tablecart" style="height: 360px">';
                html = html + '</table>';
                html = html + '</div></div>';

                Totalitems = res.rows.length;

                if (res.rows.length === 1) {
                    totalcartitems = "Cart- " + res.rows.length + " item";
                }
                else {
                    totalcartitems = "Cart- " + res.rows.length + " items";
                }
                JQCartItems.html(html);
                LblJQTotalItems.html(totalcartitems);
            }
            else {

                html = html + '<div>';
                html = html + '<table class="tablecart" style="height: 360px">';
                html = html + '<tr>';
                html = html + '<td style="text-align: center;color: red;">';
                html = html + '<p>No items in the cart.<p>';
                html = html + '<td>';
                html = html + '</tr>';
                html = html + '</table>';
                html = html + '</div></div>';
                Totalitems = 0;
                totalcartitems = "Cart- 0 items";
                $("#div_cartfooter").html("");
            }

            JQCartItems.html(html);
            LblJQTotalItems.html(totalcartitems);

            // Code for Cart footer calculation
            if (cartitemscount > 0) {
                var output = "";

                var query3 = "SELECT sum(TotalPrice) as Estimatedtotal,sum(Totalweight) as FullTotalweight FROM cartitems";


                tx.executeSql(query3, [], function successitem(txx, result) {
                    if (result.rows.length > 0) {
                        for (var i = 0; i < result.rows.length; i++) {

                            var ss = result.rows.item(i);
                            var Estimatedtotal = ss.Estimatedtotal;
                            var TotalWeight = ss.FullTotalweight;
                            var GrandTotal = Estimatedtotal + parseInt(shippingcharges, 10);
                            var Tax = Estimatedtotal * (parseFloat(pricetax) / 100);
                            var Pricewithtax = GrandTotal + Tax;

                            setLS('Totalcartweight', TotalWeight);
                            setLS('CartTotalamount', Estimatedtotal.toFixed(2));
                            setLS('CartTotalTax', Tax.toFixed(2));
                            setLS('CartTotalamountWithTax', Pricewithtax.toFixed(2));
     
                            output = output + '<table class="footertable">';
                            output = output + '<tr>';
                            output = output + '<td style="font-weight: bold; vertical-align: top; width: 15%; color: #304589; border-right: 1px solid #808080">';
                            output = output + 'Order Summary';
                            output = output + '</td>';
                            output = output + '<td style="width: 70%">';
                            output = output + '<table>';
                            output = output + '<tr>';
                            output = output + '<td style="width:125px">';
                            output = output + 'Subtotal :';
                            output = output + '</td>';
                            output = output + '<td >';
                            output = output + ' $' + Estimatedtotal.toFixed(2);
                            output = output + '</td>';
                            output = output + '</tr>';
                            if (pricetax !== 0 && pricetax !== "") {
                                output = output + '<tr>';
                                output = output + '<td style="width:125px">';
                                output = output + 'Estimated Tax (' + pricetax + '%):';
                                output = output + '</td>';
                                output = output + '<td>';
                                output = output + ' $' + Tax.toFixed(2) + "(Approx)";
                                output = output + '</td>';
                                output = output + '</tr>';
                            }
                            else {
                                output = output + '<tr>';
                                output = output + '<td style="width:125px">';
                                output = output + 'Estimated Tax (0%) :';
                                output = output + '</td>';
                                output = output + '<td>';
                                output = output + ' $0.00';
                                output = output + '</td>';
                                output = output + '</tr>';
                            }
                            output = output + '<tr>';
                            output = output + '<td style="font-weight: bold; color: #304589;width: 125px;">';
                            output = output + 'Estimated Total:';
                            output = output + '</td>';

                            output = output + '<td style="width: 50%;">';
                            output = output + '$' + Pricewithtax.toFixed(2);
                            output = output + '</td>';
                            output = output + '</tr>';
                            output = output + '</table>';
                            output = output + '</td>';
                            output = output + '<td style="width: 15%; text-align: right;">';
                            output = output + '<table style="width: 100%">';

                            output = output + '<tr>';
                            output = output + '<td>';
                            output = output + '<td onclick="estimateshipping();" style="width: 100%; text-align: center; cursor: pointer">';
                            output = output + '<img src="images/submitbtn.png" class="sbbtn" />';
                            output = output + '</td>';
                            output = output + '</tr>';
                            output = output + '</table>';
                            output = output + '</td>';
                            output = output + '</table>';

                        }
                        $("#div_cartfooter").html(output);
                    }

                });
            }
        });


    }, errorCB);

}

// Function to remove item from the cart
var globalCartId = "";
function removecartitem(id) {
    globalCartId = id;
    navigator.notification.confirm('Are you sure want to remove this product from cart?', onConfirmRemoveCart, 'Cart', ['Yes', 'No']);


}

function onConfirmRemoveCart(buttonIndex) {
    var id = globalCartId;
    if (buttonIndex === 1) {
        $("#loadingPdt").show();

        $.mobile.loading("show", {
            text: "Loading,Please Wait...",
            textVisible: true,
            theme: "a",
            textonly: true,
            html: "<span class='ui-bar ui-overlay-a ui-corner-all' style='text-align:center;background:#ccc'><img src='images/ajax-loader.gif'/><br/><p style='color:#304589;font-weight:bold'>Please Wait...</p></span>"

        });


        var cartread = window.openDatabase("blackman", "1.0", "blackman", 2 * 1024 * 1024);       /* opening local database */
        cartread.transaction(function carinsertdetails(tx) {

            var query5 = "select ItemOrProductDescription from cartitems where id=" + id;

            tx.executeSql(query5, [], function successitem(txx, res) {
                for (var i = 0; i < res.rows.length; i++) {
                    var ss = res.rows.item(i);
                    var ItemOrProductDescription = ss.ItemOrProductDescription;
                }
                writeToLogFile(" User has deleted item " + ItemOrProductDescription + " from the cart", 7);
            });
            var query6 = "DELETE FROM cartitems where id=?";

            tx.executeSql(query6, [id]);

        }, errorCB);
    }
}


function errorCB2() {
    navigator.notification.alert('error', null, 'Alert', 'OK');
}

$(function () {
    $('#locationfindercart').click(function () {
        $('.white_contentlistnewpdt').toggle();
        $('.addressbook').hide();
        loadmenuCart(3)
    })
});

function loadmenuCart(pageno) {
    UserName = getLS('UserName');
    var html = "";
    html = html + '<div class="innerpopup">';
    html = html + '<div class="empty">';
    html = html + '</div>';
    if (isuserlogged === 'yes') {
        html = html + '<div class="popdiv" onclick="findaccount(' + pageno + ')">';
        html = html + '<table class="tableclass" style="border: none;width:100%">';
        html = html + '<tr style="width: 220px; text-align: left">';
        html = html + '<td style="width: 35px">';
        html = html + '<img src="images/user.png" style="width: 37px; height: 37px;margin-left: -2px;" />';
        html = html + '</td>';
        html = html + '<td>';
        html = html + '<span class="p-menu" >Hi, ' + UserName + '</span>';
        html = html + '</td>';
        html = html + '</tr>';
        html = html + '</table>';
        html = html + '</div>';
        html = html + '<hr />';
    }
    else {
        html = html + '<div class="popdiv">';
        html = html + '<table class="tableclass" style="border: none;width:100%">';
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

    html = html + '<div class="popdiv" onclick="product(' + pageno + ')">';
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


    html = html + '<div class="popdiv" onclick="findBranch(' + pageno + ')">';
    html = html + '<table class="tableclass" style="border: none;">';
    html = html + '<tr style="width: 220px; text-align: left">';
    html = html + '<td style="width: 35px">';
    html = html + '<img src="images/findshowroom.png" style="width: 32px; height: 32px" />';
    html = html + '</td>';
    html = html + '<td>';
    html = html + '<span class="p-menu">Find Branch</span>';
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
    html = html + '<span class="p-menu">Cart</span>';
    html = html + '</td>';
    html = html + '</tr>';
    html = html + '</table>';
    html = html + '</div>';
    html = html + '<hr />';
    html = html + '<div class="popdiv" style="height: 48px;" onclick="findaccount(' + pageno + ')">';
    html = html + '<table class="tableclass" style="border: none;">';
    html = html + '<tr style="width: 220px; text-align: left">';
    html = html + '<td style="width: 35px">';
    html = html + '<img src="images/myaccount.png" style="width: 32px; height: 32px" />';
    html = html + '</td>';
    html = html + '<td>';
    html = html + '<span class="p-menu">My Account</span>';
    html = html + '</td>';
    html = html + '</tr>';
    html = html + '</table>';
    html = html + '</div>';
    html = html + '</div>';
    $("#white_contentlistnewpdt").html(html);
}


function addressBook() {
    var cPage = getLS('page');
    var result = cPage.split(",");
    if (result[result.length - 1] !== "addressbook") {
        setLS('page', cPage + ",addressbook");
    }
    $('.addressbook').show();
    $('.white_contentlistnewpdt').hide();
    $('#fade').show();

}
function addressBookCls() {

    var cPage = getLS('page');
    var result = cPage.split(","), newPage;
    if (result.length === 1) {
        newPage = cPage.replace(result[result.length - 1], "");
        setLS('page', newPage);
    } else {
        newPage = cPage.replace(',' + result[result.length - 1], "");
        setLS('page', newPage);
    }
    $('.addressbook').hide();
    $('#fade').hide();
}

// Function for validating product quantity entered by user


var globalItemid = "";
var globalValue = "";


function handleChangeAddToCart(input, initialvalue) {
    var id = $(input).attr('id');
    var value = input.value;
    globalValue = value;
    var tempValue = initialvalue;
    var quantity = id.split("-");
    var aval = quantity[1]; // Available quantity
    var itemid = quantity[0]; // Product id
    globalItemid = itemid;
    if (value === "" || value === null || parseInt(value, 10) <= 0) {

        navigator.notification.alert('Enter valid quantity.', null, 'Alert', 'OK');
        $("#" + id).focus();
        input.value = tempValue;
        return false;
    }
    else if (isNaN(value) === true) {
        navigator.notification.alert('Enter only numeric values.', null, 'Alert', 'OK');
        $("#" + id).focus();
        input.value = tempValue;
        return false;
    }
    else if (parseInt(value, 10) > parseInt(aval, 10)) {
        navigator.notification.alert('The quantity entered is not available currently.\nTotal quantity available in stock is ' + quantity[1] + '.', null, 'Alert', 'OK');
        $("#" + id).focus();
        input.value = tempValue;
        return false;
    }
    navigator.notification.confirm('Are you sure want to modify the quantity?', onConfirmModifyCart, 'Cart', ['Yes', 'No']);

}


function onConfirmModifyCart(buttonIndex) {
    // Show the loader
    var value = globalValue;
    var itemid = globalItemid; // Product id

    if (buttonIndex === 1) {
        $("#loadingPdt").show();

        $.mobile.loading("show", {
            text: "Loading,Please Wait...",
            textVisible: true,
            theme: "a",
            textonly: true,
            html: "<span class='ui-bar ui-overlay-a ui-corner-all' style='text-align:center;background:#ccc'><img src='images/ajax-loader.gif'/><br/><p style='color:#304589;font-weight:bold'>Please Wait...</p></span>"

        });
        var cartread1 = window.openDatabase("blackman", "1.0", "blackman", 2 * 1024 * 1024);       /* opening local database */
        cartread1.transaction(function carinsertdetails(tx) {
            var query4 = "select Totalweight,InventoryItemWeight,ItemOrProductDescription,ItemUnitPriceAmount  FROM cartitems where id=" + itemid;

            tx.executeSql(query4, [], function successitem(txx, result) {
                for (var i = 0; i < result.rows.length; i++) {
                    var ss = result.rows.item(i);
                    var OurListUnitPriceCompany = ss.ItemUnitPriceAmount;
                    var ReplacementCostUnitPriceCompany = 0;
                    var ItemOrProductDescription = ss.ItemOrProductDescription;
                    var Totalweight = ss.Totalweight;
                    var InventoryItemWeight = ss.InventoryItemWeight;
                }
                var OurListUnitPriceCompany1 = parseFloat(OurListUnitPriceCompany) + parseFloat(ReplacementCostUnitPriceCompany);
                var Totalprice = value * OurListUnitPriceCompany1.toFixed(2);
                var totalweight = parseFloat(InventoryItemWeight) * value;

                var query5 = "update cartitems set RequiredQuantity=?,Totalprice=?, Totalweight=? where id=?";

                tx.executeSql(query5, [value, Totalprice, totalweight, itemid]);

                writeToLogFile(" User has modified the item " + ItemOrProductDescription + " in the cart.", 7);

            });

        }, errorCB);
    }
}


function estimateshipping() {
    var cPage = getLS('page');
    var result = cPage.split(",");
    if (result[result.length - 1] !== 'estimateshipping') {
        setLS('page', cPage + ",estimateshipping");
    }

    var TotalCartWeight = getLS('Totalcartweight');
    if (TotalCartWeight <= 0) {
        TotalCartWeight = 1;
    }



    var html = "";
    html = html + '<div id="fade1" style="display:none" class="black_overlay">';
    html = html + '</div>';
    html = html + '<div style="color: #fff;background:#304589; height: 35px;font-size: 19px !important; font-weight: bold; margin-top: 0; text-align: center; width: 100%;">';
    html = html + '<div style="float: left;margin-left: 10px;margin-top: 5px">';
    html = html + 'My Shipment Information';
    html = html + '</div>';
    html = html + '<div style="position: absolute; right: 10px;">';
    html = html + '<img src="images/close_square_white.png" style="width: 30px;height: 30px;cursor: pointer;border-radius: 10px;margin-top: 2px;" onclick="estimatePopupClose()" />';
    html = html + '</div>';
    html = html + '</div>';
    html = html + '<div style="padding: 0 0 0 21px;">';

    html = html + '<p class="tabcontent1" style="margin-left: 0">';
    html = html + 'Preferred method of shipment :';
    html = html + '</p>';
    html = html + '<select id="ddshippment1" onchange=getShippingInfo(); style="width:90%;">';
    html = html + '<option value="O">Our Truck</option>';
    html = html + '<option value="P">Pickup</option>';
    html = html + '<option value="S" selected>UPS Service</option>';
    html = html + '</select>';
    html = html + '<p id="frmbranch" class="tabcontent1" style="margin-left: 0">';
    html = html + ' Buy from branch :';
    html = html + '</br><span style="font-size:12px">[Nearest branch will be selected by default]</span>';
    html = html + '</p>';
    html = html + '<select id="ddbranch" onchange="branchcodenumberset()" style="width:90%;"></select>';
    if (TotalCartWeight >= 96) {
        html = html + '<p id="UPS" class="tabcontent1" style="margin-left: 0">';
        html = html + 'UPS freight service :';
        html = html + '</p>';
        html = html + '<select id="ddserviceoption" onchange="Estimate()" style="width:90%;">';
        html = html + '<option value="0">Select</option>';
        html = html + '<option value="308">UPS Freight LTL</option>';
        // html = html + '<option value="309">UPS Freight LTL - Guaranteed</option>';
        // html = html + '<option value="334">UPS Freight LTL - Guaranteed A.M</option>';
        html = html + '</select>';
    }
    else {
        html = html + '<p id="UPS" class="tabcontent1" style="margin-left: 0">';
        html = html + 'UPS shipping service :';
        html = html + '</p>';
        html = html + '<select id="ddserviceoption" onchange="Estimate()" style="width:90%;">';
        html = html + '<option value="0">Select</option>';
        html = html + '<option value="03">UPS Ground</option>';
        // html = html + '<option value="12">UPS 3 Day Select</option>';
        // html = html + '<option value="02">UPS 2nd Day Air</option>';
        // html = html + '<option value="13">UPS Next Day Air Saver</option>';
        // html = html + '<option value="01">UPS Next Day Air</option>';
        html = html + '</select>';
    }
    html = html + '<p id="shipadddr" class="tabcontent1" style="margin-left: 0">';
    html = html + 'Shipping address :';
    html = html + '</p>';
    html = html + '<div id="div_address1"></div>';
    html = html + '<div id="div_address2"></div>';

    html = html + '<p id="shipcharge" class="tabcontent1" style="margin-left: 0;display:none;">';
    html = html + 'Estimated shipping charge : $<span id="shipchargeval"></span>';
    html = html + '</p>';
    html = html + '<div id="Divuploadimage" style="margin-top: 15px;float: right;margin-right: 10%;">';
    html = html + '<img id="Img1" onclick="submitpopup()"  src="images/continue.png" />';
    html = html + '</div>';
    html = html + '</div>';

    $("#shipping_popup").html(html);

    var showproduct = window.openDatabase("blackman", "1.0", "blackman", 2 * 1024 * 1024);
    showproduct.transaction(function showitemsbyid(tx) {

        tx.executeSql('select UserName,CustomerShippingAddress1,CustomerShippingCity,CustomerShippingState,CustomerMainShippingZipCode from userinfo', [], function successitem(txx, res) {
            var address1, addresscity, addressstate, addresszip, username;
            for (var i = 0; i < res.rows.length; i++) {
                var ss = res.rows.item(i);
                address1 = ss.CustomerShippingAddress1;
                addresscity = ss.CustomerShippingCity;
                addressstate = ss.CustomerShippingState;
                addresszip = ss.CustomerMainShippingZipCode;
                username = ss.UserName;

                setLS('Toaddress', address1);
                setLS('Tocity', addresscity);
                setLS('Tostate', addressstate);
                setLS('Tozip', addresszip);
                setLS('UserName', username);

                setLS('NearestBranchAddress', address1 + "," + addresscity + "," + addressstate + "-" + addresszip);
                setLS('NearestBranchAddress1', address1 + "@" + addresscity + "," + addressstate + "-" + addresszip);
            }

            $("#div_address1").html(address1);
            $("#div_address2").html(addresscity + "," + addressstate + "-" + addresszip);
        });

    });

    loadnearestbranch();
    // $("#shipping_popup").show();

    ddJQbranch.html("<option value='O'>Please Wait</option>");
    /* New code */
    $("#fade1").show();

    $.mobile.loading("show", {
        text: "Loading,Please Wait...",
        textVisible: true,
        theme: "a",
        textonly: true,
        html: "<span class='ui-bar ui-overlay-a ui-corner-all' style='text-align:center;background:#ccc'><img src='images/ajax-loader.gif'/><br/><p style='color:#304589;font-weight:bold'>Please Wait...</p></span>"

    });

    $("#fade").show();
}

function branchcodenumberset() {
    setLS('branchcodenumber', ddJQbranch.val());

    if (getLS('ShippingMethod') === "P") {
        loadnewpickupAddress(ddJQbranch.val());
    }
}


function loadnewpickupAddress(branchno) {

    var encryptedkey = getLS('encryptedkey');


    $.ajax({
        type: "GET",
        crossDomain: true,
        url: BlackmanApplicationServices.BranchMatrixURL + "deviceencryptedkey=" + encryptedkey + "&branchtype=&branchcode=" + branchno + "&splib=" + BlackmanApplicationVariables.splib + "&tablelib=" + BlackmanApplicationVariables.tablelib,
        dataType: "xml",
        success: function (xmlData) {

            var xmlString;
            if (window.ActiveXObject) {
                xmlString = xmlData.xml;
            }
            else {
                xmlString = (new XMLSerializer()).serializeToString(xmlData);
            }
            var namespace = 'http://tyc.com';
            var parser = new DOMParser(); // Webkit, IE has its own
            var xml = parser.parseFromString(xmlString, "text/xml");
            var xmlreturndata = xml.getElementsByTagNameNS(namespace, 'return')[0]; // returns the first aws:year element
            var resultJSON = xmlreturndata.firstChild.textContent;

            var finalresult = "{" + resultJSON + "}";

            var output = $.parseJSON(finalresult);
            var list = output.BRANCHLIST;

            $.each(list, function (i, ss) {
                $("#div_address1").html(ss.BRANCHSHIPPINGADDRESS1 + ss.BRANCHSHIPPINGADDRESS2 + ss.BRANCHSHIPPINGADDRESS3);
                $("#div_address2").html(ss.BRANCHSHIPPINGCITY + "," + ss.BRANCHSHIPPINGSTATE + "-" + ss.BRANCHMAINSHIPPINGZIPCODE);

            });


        }, error: function () {
            $("#servererror").show();
            $('html,body').animate({ scrollTop: 0 }, 800);
        }

    });
}



function loadnearestbranch() {


    var PreferredType = "";
    var MethodofShippment = getLS('ShippingMethod');

    if (MethodofShippment === "O") {
        PreferredType = 'type1';
    }
    else if (MethodofShippment === "P") {
        PreferredType = 'type3';
    }
    else if (MethodofShippment === "S") {
        PreferredType = 'type5';
    }

    $.ajax({
        type: "GET",
        crossDomain: true,
        url: BlackmanApplicationServices.BranchMatrixURL + "deviceencryptedkey=" + encryptedkey + "&branchtype=" + PreferredType + "&branchcode=&splib=" + BlackmanApplicationVariables.splib + "&tablelib=" + BlackmanApplicationVariables.tablelib,
        dataType: "xml",
        success: function (xmlData) {
            var dbinsert = window.openDatabase("blackman", "1.0", "blackman", 2 * 1024 * 1024);       /* opening local database */
            dbinsert.transaction(function branchdetails(tx) {
                tx.executeSql('DROP TABLE IF EXISTS  branchmatrix');
                tx.executeSql('CREATE TABLE IF NOT EXISTS branchmatrix (id INTEGER PRIMARY KEY AUTOINCREMENT,BranchName VARCHAR UNIQUE,BranchCode,Latitude,Longitude,Address)');

                var xmlString;
                if (window.ActiveXObject) {
                    xmlString = xmlData.xml;
                }
                else {
                    xmlString = (new XMLSerializer()).serializeToString(xmlData);
                }
                var namespace = 'http://tyc.com';
                var parser = new DOMParser(); // Webkit, IE has its own
                var xml = parser.parseFromString(xmlString, "text/xml");
                var xmlreturndata = xml.getElementsByTagNameNS(namespace, 'return')[0]; // returns the first aws:year element
                var resultJSON = xmlreturndata.firstChild.textContent;
                var finalresult = "{" + resultJSON + "}";
                var output = $.parseJSON(finalresult.replace(/(\r\n|\n|\r)/g, ""));
                var list = output.BRANCHLIST;

                $.each(list, function (i, ss) {

                    var BranchName = ss.BRANCHNAME;
                    var BranchCode = ss.BRANCHNUMBER;
                    var Latitude = ss.LATITUDE;
                    var Longitude = ss.LOGITUDE;
                    var fulladdress1 = ss.BRANCHSHIPPINGADDRESS1 + " " + ss.BRANCHSHIPPINGADDRESS2 + " " + ss.BRANCHSHIPPINGADDRESS3;
                    var Address = fulladdress1 + " @ " + ss.BRANCHSHIPPINGCITY + "," + ss.BRANCHSHIPPINGSTATE + "-" + ss.BRANCHMAINSHIPPINGZIPCODE;

                    var qry = 'INSERT OR IGNORE INTO branchmatrix (BranchName,BranchCode,Latitude,Longitude,Address)'
                          + 'VALUES (?,?,?,?,?)';

                    tx.executeSql(qry, [BranchName, BranchCode, Latitude, Longitude, Address]);
                });
                loadtodropdown();
            }, errorCB);

        }, error: function () {
            document.getElementById("ddbranch").innerHTML = "";
            $("#servererror").show();
            $("#shipping_popup").show();
            $('html,body').animate({ scrollTop: 0 }, 800);
        }

    });

}

var ChangedValuesLatest = [];

function loadtodropdown() {
    var branchtxt = "";
    if (getLS('NearestBranchAddress') === null || getLS('NearestBranchAddress') === "") {
        branchtxt = "";
    }
    else {
        branchtxt = getLS('NearestBranchAddress');
    }

    var lat1 = "", lon1 = "", lat, lng;

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': branchtxt }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            lat = results[0].geometry.location.lat();
            lng = results[0].geometry.location.lng();
            var output = lat + "@" + lng;

            var res = output.split("@");
            lat1 = res[0];
            lon1 = res[1];
            findnearestLocations(lat1, lon1);
        }
    });

}

function findnearestLocations(lat1, lon1) {
    var dbinsert = window.openDatabase("blackman", "1.0", "blackman", 2 * 1024 * 1024); /* opening local database */
    dbinsert.transaction(function branchdetails(tx) {
        tx.executeSql('select id,BranchName,Latitude,Longitude,BranchCode,Address from branchmatrix', [], function successitem(txx, res) {

            var html = "";
            for (var i = 0; i < res.rows.length; i++) {
                var ss = res.rows.item(i);
                var lat2 = ss.Latitude;
                var lon2 = ss.Longitude;


                html = html + "<option value='" + ss.BranchCode + "' selected>" + ss.BranchName + "</option>";

                var radlat1 = Math.PI * lat1 / 180;
                var radlat2 = Math.PI * lat2 / 180;
                var radlon1 = Math.PI * lon1 / 180;
                var radlon2 = Math.PI * lon2 / 180;
                var theta = (lon1) - (lon2);
                var unit = 'K';
                var radtheta = Math.PI * theta / 180;
                var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                dist = Math.acos(dist);
                dist = dist * 180 / Math.PI;
                dist = dist * 60 * 1.1515;
                if (unit === "K") { dist = dist * 1.609344 }

                var distanceInKM = (dist / 1.6).toFixed(2);
                if (distanceInKM <= 100) {
                    ChangedValuesLatest.push([ss.BranchCode, ss.BranchName, distanceInKM, ss.Address]);

                }

            }
            ddJQbranch.html(html);
            $("#shipping_popup").show();
            $("#submitpopup").hide();
            ChangedValuesLatest.sort(SortByName);
            setLS('branchcodenumber', ChangedValuesLatest[0][0]);
            ddJQbranch.val(ChangedValuesLatest[0][0]); // select the nearest branch
            var addsplit;
            if (getLS('ShippingMethod') === 'P') {
                addsplit = ChangedValuesLatest[0][3].split("@");
                $("#div_address1").html(addsplit[0]);
                $("#div_address2").html(addsplit[1]);
                $("#shipadddr").html("Pick up branch address :");
            }
            else {
                var nearestBranchAddress1 = getLS('NearestBranchAddress1');
                var branchtxt = '';

                if (nearestBranchAddress1 !== null || nearestBranchAddress1 !== "") {
                    branchtxt = nearestBranchAddress1;
                }

                addsplit = branchtxt.split("@");

                $("#div_address1").html(addsplit[0]);
                $("#div_address2").html(addsplit[1]);
                $("#shipadddr").html("Shipping address:");
            }
        });
    }, errorCB);

    $("#fade1").hide();
    $.mobile.loading("hide");
}

function SortByName(a, b) {
    var aName = a[2];
    var bName = b[2];
    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}

function getShippingInfo() {
    var OrderMethodOfShipment = $("#ddshippment1").val();
    setLS('ShippingMethod', OrderMethodOfShipment);
    var shippingcharges = BlackmanApplicationVariables.SettingsShippingcharges;
    if (OrderMethodOfShipment === "O") {
        shippingcharges = 0;
        JQFromBranch.html("Buy from branch :</br><span style='font-size:12px'>[Nearest branch will be selected by default]</span>");
        $("#UPS").hide();
        ddJQServiceOption.hide();
        ddJQbranch.show();
        $("#div_address1").show();
        $("#div_address2").show();
        $("#shipadddr").show();
        JQFromBranch.show();
        JQShipCharge.hide();
        setLS('ShipViaDescription', "Our Truck");
    }
    else if (OrderMethodOfShipment === "P") {
        shippingcharges = 0;
        JQFromBranch.html("Pick up branch : </br><span style='font-size:12px'>[Nearest branch will be selected by default]</span>");
        $("#UPS").hide();
        ddJQServiceOption.hide();
        ddJQbranch.show();
        $("#div_address1").show();
        $("#div_address2").show();
        $("#shipadddr").show();
        JQFromBranch.show();
        JQShipCharge.hide();
        setLS('ShipViaDescription', "Pick Up");

    }
    else if (OrderMethodOfShipment === "S") {
        shippingcharges = 0;
        JQFromBranch.html("Buy from branch : </br><span style='font-size:12px'>[Nearest branch will be selected by default]</span>");
        $("#UPS").show();
        ddJQServiceOption.val(0);
        ddJQServiceOption.show();
        ddJQbranch.show();
        $("#div_address1").show();
        $("#div_address2").show();
        $("#shipadddr").show();
        JQFromBranch.show();
        JQShipCharge.hide();
        setLS('ShipViaDescription', "UPS");

    }
    loadnearestbranch(); // BranchMatrix Depends on shipping method
}


function estimatePopupClose() {
    var cPage = getLS('page');
    var result = cPage.split(","), newPage;
    if (result.length === 1) {
        newPage = cPage.replace(result[result.length - 1], "");
        setLS('page', newPage);
    } else {
        newPage = cPage.replace(',' + result[result.length - 1], "");
        setLS('page', newPage);
    }
    $("#shipping_popup").hide();
    $("#fade").hide();
}

function Estimate() {
    var ServiceOptioncode = ddJQServiceOption.val();

    var BillOptionCode = "10";

    var Toaddress1 = getLS('Toaddress');
    var addressSplit = Toaddress1.split(" ");
    var Toaddress = addressSplit[0] + ',' + addressSplit[1] + ',' + addressSplit[2];


    var Tocity = getLS('Tocity');
    var Tostate = getLS('CustomerShippingState');
    var Tozip = getLS('Tozip');
    var Payshipname = getLS('UserID');


    var FromAddress1 = "900,SYLVAN,AVE";
    var frompostalcode = "11705";
    var fromstate = "NY";
    var fromcity = "BAYPORT";

    // Shipvia Description
    if (ServiceOptioncode !== 0) {

        switch (ServiceOptioncode) {
            case "308":
                setLS('ShipViaDescription', "UPS Freight - LTL");
                break;
            case "309":
                setLS('ShipViaDescription', "UPS Freight LTL - Guaranteed");
                break;
            case "334":
                setLS('ShipViaDescription', "UPS Freight LTL - Guaranteed A.M");
                break;
            case "14":
                setLS('ShipViaDescription', "United Parcel Service - Next Day Air Early AM");
                break;
            case "03":
                setLS('ShipViaDescription', "United Parcel Service - Ground");
                break;
            case "12":
                setLS('ShipViaDescription', "United Parcel Service - 3 Day Select");
                break;
            case "02":
                setLS('ShipViaDescription', "United Parcel Service - 2nd Day Air");
                break;
            case "13":
                setLS('ShipViaDescription', "United Parcel Service - Next Day Air Saver");
                break;
            case "01":
                setLS('ShipViaDescription', "United Parcel Service - NextDayAir");
                break;

        }
    }


    var TotalCartWeight = getLS('Totalcartweight');
    if (TotalCartWeight <= 0) {
        TotalCartWeight = 1;
    }

    if (ServiceOptioncode === 0) {
        navigator.notification.alert('Please Select UPS Service Code!', null, 'Alert', 'OK');
        $("#uploadimage").hide();
        return false;
    }
    var EstimateserviceURL = "";
    if (TotalCartWeight >= 96) {
        EstimateserviceURL = BlackmanApplicationServices.FreightRateServiceURL + "Fromaddress=" + FromAddress1 + "&Fromcity=" + null + "&frmpostalcode=" + frompostalcode + "&fromstate=" + fromstate + "&fromcountry=US&toaddress=" + Toaddress + "&tocity=" + Tocity + "&topostalcode=" + Tozip + "&tostate=" + Tostate + "&tocountry=US&shipattentionname=" + Payshipname + "&payaatentionname=" + Payshipname + "&servicecode=" + ServiceOptioncode + "&billoptioncode=" + BillOptionCode + "&PackageWeight=" + TotalCartWeight + "&splib=" + BlackmanApplicationVariables.splib + "&tablelib=" + BlackmanApplicationVariables.tablelib;
    }
    else {
        EstimateserviceURL = BlackmanApplicationServices.RateServiceURL + "Fromaddress=" + FromAddress1 + "&Fromcity=" + null + "&frmpostalcode=" + frompostalcode + "&fromstate=" + fromstate + "&fromcountry=US&toaddress=" + Toaddress + "&tocity=" + Tocity + "&topostalcode=" + Tozip + "&tostate=" + Tostate + "&tocountry=US&servicecode=" + ServiceOptioncode + "&packwght=" + TotalCartWeight + "&splib=" + BlackmanApplicationVariables.splib + "&tablelib=" + BlackmanApplicationVariables.tablelib;
    }


    $("#shipping_popup").hide();
    $("#fade1").show();

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
        url: EstimateserviceURL,
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
            var resultJ = resultJSON.replace(/\\/g, '');

            var res1 = resultJ.replace(']"', "]");
            res1 = res1.replace(']"', "]");

            var res2 = res1.replace('"[', "[");
            res2 = res2.replace('"[', "[");

            var output = $.parseJSON(res2), list;
            if (TotalCartWeight >= 96) {
                list = output.GetShippingChargesResult;
            }
            else {
                list = output.GetShippingCharges2Result;
            }
            $.each(list, function (i, item) {
                var shipcharge = item.ShippingCharges;
                var amount = shipcharge.replace('USD', "");
                if (isNaN(amount)) {
                    JQShipCharge.html("<span id='shipchargeval' style='Color:red'>UPS service is unable to quote for this shipping address. Please check and try again.</span>");
                    ddJQServiceOption.val(0);

                    $.mobile.loading("hide");
                    $("#fade1").hide();
                    $("#shipping_popup").show();
                    JQShipCharge.show();
                }
                else {
                    BlackmanApplicationVariables.SettingsShippingcharges = amount;
                    JQShipCharge.show();
                    $("#shipping_popup").show();
                    JQShipCharge.html("Estimated Shipping Charge : $<span id='shipchargeval'></span>");
                    $("#shipchargeval").text(amount);
                    writeToLogFile("Shipping Charge is $" + amount, 11);
                }
                // loadcartitems();
            });

        },
        error: function () {
            ddJQServiceOption.val(0);
            navigator.notification.alert('Unable to connect server.Please try again later!', null, 'Connection Failed', 'OK');
            $("#shipping_popup").show();
            $("#fade1").hide();
            $.mobile.loading("hide");
        }
    });
}