/*
This javascript files is only for order history functions
Creaded on:23/09/2014 7:30PM
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


function Loadorderhistory() 
{
    if (isuserlogged == 'yes') 
    {
            $.ajax({
                type: "GET",
                crossDomain: true,
                url: orderhistory1URL + "CustNumber=" + CustomerNumber + "&ordercode=O&StartIndex=1&EndIndex=10&UserId=" + UserProfile + "&deviceencryptedkey=" + encryptedkey + "&accesstoken=" + AccessTokenKey + "&splib=" + splib + "&tablelib=" + tablelib,
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
                    var list = output.BMCOrders;

                    if (output.BMCOrders.length > 0) {
                        var output = "";
                        $.each(list, function (i, item) {
                            var OrderNumber = item.OrderNumber;
                            var OrderDate = item.OrderDate;
                            var ShippedDate = item.ShippedDate;
                            var CountOfLineItems = item.CountOfLineItems;
                            var OrderStatusCode = item.OrderStatusCode;
                            var TotalInvoiceAmount = item.TotalInvoiceAmount;

                            output = output + '<div id="div' + OrderNumber + '" style="background: none repeat scroll 0 0 #fff; margin-left: 5px;';
                            output = output + 'margin-top: 5px; border-bottom: 1px solid #ccc; width: 99%;">';
                            output = output + '<div>';
                            output = output + '<table style="width: 100%">';
                            output = output + '<tr>';
                            output = output + '<td style="width: 52%">';
                            output = output + '<table>';
                            output = output + '<tr>';
                            output = output + '<td>';
                            output = output + 'Order Date : ' + OrderDate;
                            output = output + '</td>';
                            output = output + '</tr>';
                            if (OrderStatusCode != "O" && OrderStatusCode != "" && OrderStatusCode != null) 
                            {
                                if (ShippedDate != '0/0/00'  && ShippedDate !="" && ShippedDate != null) 
                                {
                                    output = output + '<tr>';
                                    output = output + '<td>';
                                    output = output + 'Shipped Date : ' + ShippedDate;
                                    output = output + '</td>';
                                    output = output + '</tr>';
                                }
                            }
                            output = output + '<tr>';
                            output = output + '<td>';
                            output = output + 'Order # : ' + OrderNumber;
                            output = output + '</td>';
                            output = output + '</tr>';
                            output = output + '</table>';
                            output = output + '</td>';
                            if (OrderStatusCode == "O" || OrderStatusCode == "" || OrderStatusCode == null) 
                            {
                                output = output + '<td style="width: 24%;">';
                                output = output + '<img src="images/blue.png" style="width: 15px; height: 15px; padding: 1px" />';
                                output = output + '<label class="tickclass" style="vertical-align: top;">Open</label>';
                                output = output + '</td>';
                            }
                            else if (OrderStatusCode == "I") 
                            {
                                output = output + '<td style="width: 24%;">';
                                output = output + '<img src="images/green.png" style="width: 15px; height: 15px; padding: 1px" /><label';
                                output = output + 'class="tickclass" style="vertical-align: top;">Invoiced</label>';
                                output = output + '</td>';
                            }
                            else if (OrderStatusCode == "R") {
                                output = output + '<td style="width: 24%;">';
                                output = output + '<img src="images/green.png" style="width: 15px; height: 15px; padding: 1px" /><label';
                                output = output + 'class="tickclass" style="vertical-align: top;">Reviewed</label>';
                                output = output + '</td>';
                            }
                            else if (OrderStatusCode == "P") {
                                output = output + '<td style="width: 24%;">';
                                output = output + '<img src="images/brown.png" style="width: 15px; height: 15px; padding: 1px" /><label';
                                output = output + 'class="tickclass" style="vertical-align: top;">Priced</label>';
                                output = output + '</td>';
                            }
                            else if (OrderStatusCode == "C") {
                                output = output + '<td style="width: 24%;">';
                                output = output + '<img src="images/yellow.png" style="width: 15px; height: 15px; padding: 1px" /><label';
                                output = output + 'class="tickclass" style="vertical-align: top;">Changed</label>';
                                output = output + '</td>';
                            }
                            else if (OrderStatusCode == "K") {
                                output = output + '<td style="width: 24%;">';
                                output = output + '<img src="images/orange.png" style="width: 15px; height: 15px; padding: 1px" /><label';
                                output = output + 'class="tickclass" style="vertical-align: top;">Reserved</label>';
                                output = output + '</td>';
                            }
                            else if (OrderStatusCode == "N") {
                                output = output + '<td style="width: 24%;">';
                                output = output + '<img src="images/red.png" style="width: 15px; height: 15px; padding: 1px" /><label';
                                output = output + 'class="tickclass" style="vertical-align: top;" >Pending</label>';
                                output = output + '</td>';
                            }
                            output = output + '<td style="width: 19%;">';
                            output = output + '<div onclick=showinnerdiv("' + OrderNumber + '") class="itemselect1">';
                            output = output + '<label>';
                            if (CountOfLineItems > 1)
                            {
                                output = output + CountOfLineItems + ' items</label><br />';
                            }
                            else
                            {
                                output = output + CountOfLineItems + ' item</label><br />';
                            }
                            output = output + '<label>';
                            output = output + '$' + TotalInvoiceAmount + '</label>';
                            output = output + '</div>';
                            output = output + '</td>';
                            output = output + '</tr>';
                            output = output + '</table>';
                            output = output + '<div id="innerdiv' + OrderNumber + '" style="display: none; width: 100%;" >';  //innerdiv
                            output = output + '<div style="text-align: center;"> <img src="images/276.GIF" /></div>';
                            output = output + '</div>';
                            output = output + '</div>';
                            output = output + '</div>';

                        });

                        $("#orderclick").html(output);
                        $("#loading_pdt").hide();
                        $.mobile.loading("hide");
                    }
                    else 
                    {
                        $("#orderclick").html("<div style='text-align: center;padding: 31px;background-color: #fff;color:red'><span>No Orders Found</span></div>");
                        $("#loading_pdt").hide();
                        $.mobile.loading("hide");
                    }


                },
                error: function (data, errorThrown) {
                    

                    $("#loading_pdt").hide();
                    $.mobile.loading("hide");
                    navigator.notification.alert('Unable to connect server.Please try again later!', null, 'Connection Failed', 'OK');

                }
            });
    }
    else 
    {
        
        $("#orderclick").html("<div style='text-align: center;padding: 31px;background-color: #fff;'><span style='color:red'>Please log in to see your order history</span></div>");
        $("#loading_pdt").hide();
        $.mobile.loading("hide");
    }
}

function showinnerdiv(OrderNumber)
{

    $.ajax({
        type: "GET",
        crossDomain: true,
        url: orderhistoryItems + "OrderNum=" + OrderNumber + "&UserId=" + UserProfile + "&deviceencryptedkey=" + encryptedkey + "&accesstoken=" + AccessTokenKey + "&splib=" + splib + "&tablelib=" + tablelib,
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
            var list = output.BMCOrderItems;

            if (output.BMCOrderItems.length > 0) {
                var outputHtml = '<table class="itempdtimgdown" style="width: 100%;">';
                $.each(list, function (i, item) {
                    var OurItemNumber = item.OURITEMNUMBER;
                    var QuantityOrdered = item.QUANTITYORDERED;
                    var TotalPrice = item.TOTALPRICE;
                    var ProductName = item.PRODUCTNAME;
                    var PRODUCTIMAGE = item.PRODUCTIMAGE;

                  
                    outputHtml += '<tr>';
                    outputHtml += '<td>';
                    outputHtml += '<table class="tablecart">';
                    outputHtml += '<tr>';
                    outputHtml += '<td class="pdtimg" style="vertical-align: top; width: 20%">';
                    outputHtml += '<table>';
                    outputHtml += '<tr>';
                    outputHtml += '<td>';
                    outputHtml += '<img onerror="imgError(this);" src="' + productimagepath + PRODUCTIMAGE + '" class="cartpdt imgsizewidth" />';
                    outputHtml += '</td>';
                    outputHtml += '</tr>';
                    outputHtml += '</table>';
                    outputHtml += '</td>';
                    outputHtml += '<td class="pdtimg" style="vertical-align: top; width: 60%">';
                    outputHtml += '<table>';
                    outputHtml += '<tr>';
                    outputHtml += '<td style="font-weight: bold; width: 100%">';
                    outputHtml += ProductName;
                    outputHtml += '</td>';
                    outputHtml += '</tr>';
                    outputHtml += '<tr>';
                    outputHtml += '<td style="width: 25%;">';
                    outputHtml += 'Item Number : #' + OurItemNumber;
                    outputHtml += '</td>';
                    outputHtml += '</tr>';
                    outputHtml += '<tr>';
                    outputHtml += '<td style="font-weight: bold; color: #304589; width: 60%">';
                    outputHtml += 'Total Cost : $' + parseFloat(TotalPrice).toFixed(2);
                    outputHtml += '</td>';
                    outputHtml += '</tr>';
                    outputHtml += '</table>';
                    outputHtml += '</td>';
                    outputHtml += '<td style="width: 20%;">';
                    outputHtml += '<div class="itemselect">';
                    outputHtml += '<label>';
                    outputHtml += 'QTY : ' + QuantityOrdered + '</label>';
                    outputHtml += '</div>';
                    outputHtml += '</td>';
                    outputHtml += '</tr>';
                    outputHtml += '</table>';
                    outputHtml += '</td>';
                    outputHtml += '</tr>';


                });

                outputHtml += '</table>';
                $("#innerdiv" + OrderNumber).html(outputHtml);
            }
            else {

                $("#innerdiv" + OrderNumber).html("<div style='color: red;text-align: center;padding: 0px 0px 10px 3px;'>No items found</div>");
            }

        },
        error: function (data, errorThrown) {
            navigator.notification.alert('Unable to connect server.Please try again later!', null, 'Connection Failed', 'OK');
            $("#loading_pdt").hide();
            $.mobile.loading("hide");
        }
    });
  
  
  $("#innerdiv"+OrderNumber).slideToggle();
}

function invoiceclick()
{
    if (isuserlogged == 'yes')
    {
        $("#loading_pdt").show();

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
            url: CurrentBalanceURL + "Cmpynbr=&Division=&Region=&Brnbr=&Custnbr=" + CustomerNumber + "&CustCRRep=",
            success: function (xmlData)
            {
                var xmlString;
                if (window.ActiveXObject)
                {
                    xmlString = xmlData.xml;
                }
                else
                {
                    xmlString = (new XMLSerializer()).serializeToString(xmlData);
                }
                var namespace = 'http://tyc.com';
                var parser = new DOMParser(); // Webkit, IE has its own
                var xml = parser.parseFromString(xmlString, "text/xml");
                var xmlreturndata = xml.getElementsByTagNameNS(namespace, 'return')[0]; // returns the first aws:year element
                var jsontext = xmlreturndata.firstChild.textContent;
                var finalresult = "{" + jsontext + "}";
                var outputresult = $.parseJSON(finalresult);
                var list = outputresult.RESULTS;

                if (outputresult.RESULTS.length > 0)
                {
                    $.each(list, function (i, item)
                    {
                        switch (i) {
                            case 0:
                                if (item.Current == "" || item.Current == null || item.Current == 0 || item.Current == '0') {
                                    item.Current = '0.00';
                                }

                                $("#Current_Span").text("$" + item.Current);
                                break;

                            case 1:
                                if (item.ThirtyDays == "" || item.ThirtyDays == null || item.ThirtyDays == 0 || item.ThirtyDays == '0') {
                                    item.ThirtyDays = '0.00';
                                }
                                $("#30_Span").text("$" + item.ThirtyDays);
                                break;

                            case 2:
                                if (item.SixtyDays == "" || item.SixtyDays == null || item.SixtyDays == 0 || item.SixtyDays == '0') {
                                    item.SixtyDays = '0.00';
                                }
                                $("#60_Span").text("$" + item.SixtyDays);
                                break;

                            case 3:
                                if (item.NinetyDays == "" || item.NinetyDays == null || item.NinetyDays == 0 || item.NinetyDays == '0') {
                                    item.NinetyDays = '0.00';
                                }
                                $("#90_Span").text("$" + item.NinetyDays);
                                break;

                            case 4:
                                if (item.TotalDue == "" || item.TotalDue == null || item.TotalDue == 0 || item.TotalDue == '0') {
                                    item.TotalDue = '0.00';
                                }
                                $("#Total_Span").text("$" + item.TotalDue);
                                break;

                            case 5:
                                if (item.MTDPurchases == "" || item.MTDPurchases == null || item.MTDPurchases == 0 || item.MTDPurchases == '0') {
                                    item.MTDPurchases = '0.00';
                                }
                                $("#MTD_Span").text("$" + item.MTDPurchases);
                                break;

                            case 6:

                                if (item.FutureDue == "" || item.FutureDue == null || item.FutureDue == 0 || item.FutureDue == '0') {
                                    item.FutureDue = '0.00';
                                }
                                $("#FutureDue_Span").text("$" + item.FutureDue);
                                break;

                            case 7:

                                if (item.TotalOwed == "" || item.TotalOwed == null || item.TotalOwed == 0 || item.TotalOwed == '0') {
                                    item.TotalOwed = '0.00';
                                }
                                $("#TotalOwed_Span").text("$" + item.TotalOwed);
                                break;

                            case 8:

                                if (item.AverageDaysToPay == "" || item.AverageDaysToPay == null || item.AverageDaysToPay == 0 || item.AverageDaysToPay == '0') {
                                    item.AverageDaysToPay = '0';
                                }
                                $("#AvgDays_Span").text(item.AverageDaysToPay);
                                break;
                        }

                    });

                    $('#invoiceclick').show();
                    $("#loading_pdt").hide();
                    $.mobile.loading("hide");

                }
                else
                {
                    $("#invoiceclick").html("<div style='text-align: center;padding-top: 10%;background-color: #fff;color: red;font-size: 14px;'><span>No balances found.</span></div>");
                    $("#cur_footer").hide();
                    $("#loading_pdt").hide();
                    $.mobile.loading("hide");
                }
            },
            error: function (data, errorThrown)
            {
                navigator.notification.alert('Unable to connect server.Please try again later!', null, 'Connection Failed', 'OK');
                $("#loading_pdt").hide();
                $.mobile.loading("hide");
                $("#cur_footer").hide();
            }
        });

        $('#orderclick').hide();
        $('.footer').show();
        $('#invoiceclick').show();
        $('#lblorderhis').css("background", "#304589");
        $('#lblinvoice').css("background", "#838FB8");
    }
    else 
    {
        // For Guest User
        $("#invoiceclick").html("<div style='text-align: center;padding: 31px;background-color: #fff;'><span style='color:red'>Please log in to see your current balance</span></div>");
        $('#orderclick').hide();
        $('.footer').hide();
        $('#invoiceclick').show();
        $('#lblorderhis').css("background", "#304589");
        $('#lblinvoice').css("background", "#838FB8");
    
    }

}

function tableinvoice(invoiceno)
{
    $.ajax({
        type: "GET",
        crossDomain: true,
        url: CurrentBalance2URL + "invoiceno=" + invoiceno + "&custno=" + CustomerNumber + "&UserId=" + UserProfile + "&deviceencryptedkey=" + encryptedkey + "&accesstoken=" + AccessTokenKey + "&splib=" + splib + "&tablelib=" + tablelib,
        dataType: "xml",
        success: function (xmlData) {
            try {
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
                var list = output.BMCOrderItems;

                if (output.BMCOrderItems.length > 0) {
                    var html = '<table style="width:100%">';
                    $.each(list, function (i, item) {
                        var OurItemNumber = item.OURITEMNUMBER;
                        var QuantityOrdered = item.QUANTITYORDERED;
                        var TotalPrice = item.TOTALPRICE;
                        var ProductName = item.PRODUCTNAME;
                        var PRODUCTIMAGE = item.PRODUCTIMAGE;

                        html = html + '<tr>';
                        html = html + '<td>';
                        html = html + '<table class="tablecart">';
                        html = html + '<tr>';
                        html = html + '<td class="pdtimg" style="vertical-align: top; width: 20%">';
                        html = html + '<table>';
                        html = html + '<tr>';
                        html = html + '<td>';
                        html = html + '<img onerror="imgError(this);" src="' + productimagepath + PRODUCTIMAGE + '" class="cartpdt imgsizewidth" />';
                        html = html + '</td>';
                        html = html + '</tr>';
                        html = html + '</table>';
                        html = html + '</td>';
                        html = html + '<td class="pdtimg" style="vertical-align: top; width: 60%">';
                        html = html + '<table>';
                        html = html + '<tr>';
                        html = html + '<td style="font-weight: bold; color: #304589; width: 60%">';
                        html = html + 'Item Number: #' + OurItemNumber;
                        html = html + '</td>';
                        html = html + '</tr>';
                        html = html + '<tr>';
                        html = html + '<td style="font-weight: bold; width: 100%">';
                        html = html + ProductName;
                        html = html + '</td>';
                        html = html + '</tr>';

                        html = html + '<tr>';
                        html = html + '<td style="font-weight: bold; color: #304589; width: 60%">';
                        html = html + 'Total Cost: $' + TotalPrice;
                        html = html + '</td>';
                        html = html + '</tr>';
                        html = html + '</table>';
                        html = html + '</td>';
                        html = html + '<td style="width: 20%;">';
                        html = html + '<div class="itemselect">';
                        html = html + '<label>';
                        html = html + 'QTY : ' + QuantityOrdered + '</label>';
                        html = html + '</div>';
                        html = html + '</td>';
                        html = html + '</tr>';
                        html = html + '</table>';
                        html = html + '</td>';
                        html = html + '</tr>';


                    });

                    html = html + '</table>';
                    $('#tableinvoice_' + invoiceno).html(html);
                    //$('#tableinvoice_' + orderno).slideToggle();
                }
                else {
                    $('#tableinvoice_' + invoiceno).html("<div style='color: red;text-align: center;padding: 0px 0px 10px 3px;'>No items found</div>");
                }
            }
            catch (e) {
                //$('#tableinvoice_' + invoiceno).html("<div style='color: red;text-align: center;padding: 0px 0px 10px 3px;'>" + e + "</div>");
                $('#tableinvoice_' + invoiceno).html("<div style='color: red;text-align: center;padding: 0px 0px 10px 3px;'>No items found</div>");
            }
        },
        error: function (data, errorThrown) {
            navigator.notification.alert('Unable to connect server.Please try again later!', null, 'Connection Failed', 'OK');
            $("#loading_pdt").hide();
            $.mobile.loading("hide");
        }
    });

    $('#tableinvoice_' + invoiceno).slideToggle();
}