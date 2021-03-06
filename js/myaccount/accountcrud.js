﻿/*
This javascript files is only for accounts
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


function accountpage_load() {

    $("#loading_pdt").show();

    $.mobile.loading("show", {
        text: "Loading,Please Wait...",
        textVisible: true,
        theme: "a",
        textonly: true,
        html: "<span class='ui-bar ui-overlay-a ui-corner-all' style='text-align:center;background:#ccc'><img src='images/ajax-loader.gif'/><br/><p style='color:#304589;font-weight:bold'>Please Wait...</p></span>"

    });

    $("#lblusername").html(UserName);
    $("#lblCustomerNumber").html(CustomerNumber);

    var branch_id = GetLS('default_branchcode');

    var ShippingMethod = GetLS("ShippingMethod");
    $("#ddshippment").val(ShippingMethod);

    var showproduct = window.openDatabase("blackman", "1.0", "blackman", 2 * 1024 * 1024);
    showproduct.transaction(function showitemsbyid(tx) {

        tx.executeSql('select CustomerTelephoneAreaCode,CustomerTelephonePrefixNumber,CustomerTelephoneSuffixNumber,CustomerShippingAddress1,CustomerShippingCity,CustomerShippingState,CustomerMainShippingZipCode from userinfo', [], function successitem(txx, res) {

            for (var i = 0; i < res.rows.length; i++) {
                var ss = res.rows.item(i);
                var address1 = ss.CustomerShippingAddress1;
                var addresscity = ss.CustomerShippingCity;
                var addressstate = ss.CustomerShippingState;
                var addresszip = ss.CustomerMainShippingZipCode;
                var CustomerTelephoneAreaCode = ss.CustomerTelephoneAreaCode;
                var CustomerTelephonePrefixNumber = ss.CustomerTelephonePrefixNumber;
                var CustomerTelephoneSuffixNumber = ss.CustomerTelephoneSuffixNumber;

                $("#txtaddress").val(address1);
                $("#txtcity").val(addresscity);
                $("#txtstate").val(addressstate);
                $("#txtpincode").val(addresszip);
                $("#txtphonenumber").val(CustomerTelephoneAreaCode + '-' + CustomerTelephonePrefixNumber + '-' + CustomerTelephoneSuffixNumber);

                $("#div_address1").html(address1);
                $("#div_address2").html(addresscity + "," + addressstate + "-" + addresszip);

            }
        });


        tx.executeSql('select Statename,Statecode from states', [], function successitem(txx, res) {
            var html = "";
            for (var i = 0; i < res.rows.length; i++) {
                var ss = res.rows.item(i);
                var Statename = ss.Statename;
                var Statecode = ss.Statecode;
                var CustomerShippingState = GetLS('CustomerShippingState');


                if (Statecode == CustomerShippingState) {
                    html = html + "<option value='" + Statecode + "' selected>" + Statename + "</option>";
                }
                else {
                    html = html + "<option value='" + Statecode + "'>" + Statename + "</option>";
                }
            }

            $("#ddstate").html(html);

        });


        tx.executeSql('select id,BranchName,BranchCode from branchinfo', [], function successitem(txx, res) {
            var html = "";
            for (var i = 0; i < res.rows.length; i++) {
                var ss = res.rows.item(i);
                var BranchName = ss.BranchName;
                var BranchCode = ss.BranchCode;
                var id = ss.id;
                if (branch_id == BranchCode) {
                    html = html + "<option value='" + BranchCode + "' selected>" + BranchName + "</option>";
                }
                else {
                    html = html + "<option value='" + BranchCode + "'>" + BranchName + "</option>";
                }
            }

            document.getElementById("branch_list").innerHTML = html;


        });

        var branch_code = "'" + GetLS('default_branchcode') + "'";

        tx.executeSql('select id,Address,BranchName,BranchCode,email,PhoneNumber from branchinfo where BranchCode=' + branch_code, [], function successitem(txx, res) {
            var data = "";
            var branchdata = "";
            for (var i = 0; i < res.rows.length; i++) {
                var ss = res.rows.item(i);
                var BranchName = ss.BranchName;
                var BranchCode = ss.BranchCode;
                // var email = ss.Email;
                var PhoneNumber = ss.PhoneNumber;
                var Address = ss.Address;

                branchdata = BranchName;

                data = data + '<div style="margin-left: 0px; ">';
                data = data + BranchName;
                data = data + '</div>';
                data = data + '<div style="margin-left: 0px; font-size: 14px; font-weight: normal">';
                data = data + Address;
                data = data + '</div>';
                data = data + '<div style="margin-left: 0px; font-size: 14px; font-weight: normal">';
                data = data + '<a style="text-decoration: none; color: #304589" href="Tel: ' + PhoneNumber + '">' + PhoneNumber;
                data = data + '<img style="height: 13px; margin-top: -2px; vertical-align: middle; width: 13px; margin-left: 10px" src="images/phone.png" />';
                data = data + '</a></div>';

            }

            document.getElementById("loadmainbranchaddress").innerHTML = data;
            document.getElementById("loadmainbranchaddress_edit").innerHTML = data;
            document.getElementById("loadbranchname_txt").innerHTML = branchdata;
        });


    });

    Loadorderhistory();
}
function loadallbranches_tolocalDB_account() {
 
       $.ajax({
        type: "GET",
        crossDomain: true,
        url: branchURL,
        dataType: "xml",
        success: function (xmlData) {
            var dbinsert = window.openDatabase("blackman", "1.0", "blackman", 2 * 1024 * 1024);       /* opening local database */

            dbinsert.transaction(function branchdetails(tx) {
                tx.executeSql('DROP TABLE IF EXISTS  branchinfo');
                tx.executeSql('CREATE TABLE IF NOT EXISTS branchinfo (id INTEGER PRIMARY KEY AUTOINCREMENT,BranchName VARCHAR UNIQUE,BranchCode,Latitude,Longitude,Address,PhoneNumber,Faxnumber,Managername,Email)');
                var xmlString;
                if (window.ActiveXObject) {
                    xmlString = xmlData.xml;
                }
                else {
                    xmlString = (new XMLSerializer()).serializeToString(xmlData);
                }

                var xmlDoc = $.parseXML(xmlString);
                var $xml = $(xmlDoc);
                var $Name = $xml.find('BMC');

                var resultJSON = $Name.text();

                var finalresult = "{" + resultJSON + "}";

                var output = $.parseJSON(finalresult);
                var list = output.BMCBranches;
                var ouput_string;
                $.each(list, function (i, item) {
                    var BranchName = item.BranchName;
                    var BranchCode = item.BranchCode;
                    var Latitude = item.Latitude;
                    var Longitude = item.Longitude;
                    var Address = item.Address;
                    var PhoneNumber = item.PhoneNumber;
                    var Faxnumber = "";
                    var ManagerName = "";
                    var Email = "";


                    if (BranchCode == defaultbranchcode)
                    {
                       
                        if (GetLS("default_branchcode") == "" || GetLS("default_branchcode") == null) {
                            
                            SetLS("default_branchcode", BranchCode);
                            SetLS("default_branchname", BranchName);
                            SetLS("default_branchcode1", BranchCode);
                            SetLS("default_branchname1", BranchName);
                        }
                    }

                    var qry = 'INSERT OR IGNORE INTO branchinfo (BranchName,BranchCode,Latitude,Longitude,Address,PhoneNumber,Faxnumber,Managername,Email)'
                          + 'VALUES (?,?,?,?,?,?,?,?,?)';

                    tx.executeSql(qry, [BranchName, BranchCode, Latitude, Longitude, Address, PhoneNumber, Faxnumber, ManagerName, Email]);

                });
                
            }, errorCB);
        }, error: function (data, errorThrown)
        {
            navigator.notification.alert('Unable to connect server.Please try again later!', null, 'Internet Failure', 'OK');
        }

    });
}

function submitfeedback()
{
    if (isuserlogged == 'yes')
    {
        var appname = "";
        if (orderedbyname == "BTP") {
            appname = "TP";
        }
        else {
            appname = "KD";
        }

        var feedback = $("#txtfeedback").val();

        var re = /^[ A-Za-z0-9'.,-]*$/
        if (feedback == "" || feedback == null) {

            navigator.notification.alert('Please enter valid feedback.', null, 'Account Feedback', 'OK');

            return false;
        }
        else if (re.test(feedback)) {
            var encryptedkey = GetLS('encryptedkey');
            var UserProfile = GetLS('UserProfile');

            $.ajax({
                type: "GET",
                crossDomain: true,
                url: AppFeedbackURL + "userid=" + UserProfile + "&feedback=GoodApplcation&appname=" + appname + "&deviceencryptedkey=" + encryptedkey + "&splib=" + splib + "&tablelib=" + tablelib,
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
                    if (json.IsUpdated == "True") {

                        navigator.notification.alert('Thanks.Your Feedback has been submitted.!', null, 'Account Feedback', 'OK');
                    }
                    else {

                        navigator.notification.alert('Unable to submit your feedback.Please try again later.!', null, 'Account Feedback', 'OK');


                    }
                },
                error: function (data, errorThrown) {
                    navigator.notification.alert('Unable to connect server.Please try again later!', null, 'Connection Failed', 'OK');


                    $("#edit_fade").hide();
                    $.mobile.loading("hide");
                    $("#loading_pdt").hide();
                    writetologfile("Error in updating user shipping details", 3);
                }
            });
        }
        else {
            navigator.notification.alert('Please do not use any special characters!', null, 'Account Feedback', 'OK');

            return false;
        }


    }
    else {

        navigator.notification.alert('You must log in to write feedback..!', null, 'Account Feedback', 'OK');

    }
}


function savebranch() {

    var branch_code = $("#branch_list").val();
    var branch_name = $("#branch_list option:selected").text();

    SetLS("default_branchcode", branch_code);
    SetLS("default_branchname", branch_name);
    SetLS("default_branchcode1", branch_code);
    SetLS("default_branchname1", branch_name);

    var address1 = $("#txtaddress").val();
    var addresscity = $("#txtcity").val();
    var addressstate = $("#ddstate").val();
    var addresszip = $("#txtpincode").val();
    var phonenumber = $("#txtphonenumber").val();
    var shippement = $("#ddshippment").val();
    var mobile = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
    var zipcodeval = /[^\s\da-z\-]/i;
    var name = /^[A-Za-z]*$/;

    if (address1 == "") {
        $("#txtaddress").focus();

        navigator.notification.alert('Please enter your address.', null, 'Alert', 'OK');
        return false;
    }
    else if (addresscity == "") {
        $("#txtcity").focus();

        navigator.notification.alert('Please enter your city.', null, 'Alert', 'OK');
        return false;
    }
    else if (addresszip == "") {
        $("#txtpincode").focus();

        navigator.notification.alert('Please enter your zipcode.', null, 'Alert', 'OK');
        return false;
    }
    else if (true === zipcodeval.test(addresszip)) {
        $("#txtpincode").focus();

        navigator.notification.alert('Please enter valid zipcode.', null, 'Alert', 'OK');
        return false;
    }

    else if (document.getElementById("txtpincode").value.length != 5) {
        $("#txtpincode").focus();
        navigator.notification.alert('Please enter 5 digit zipcode.', null, 'Alert', 'OK');

        return false;
    }
    else if (phonenumber == "") {
        $("#txtphonenumber").focus();
        navigator.notification.alert('Please Enter Your Phone Number.', null, 'Alert', 'OK');

        return false;
    }
    else if (!mobile.test(phonenumber)) {
        $("#txtphonenumber").focus();
        navigator.notification.alert('Phone number format should be xxx-xxx-xxxx', null, 'Alert', 'OK');

        return false;
    }
    else {
        updateshippingaddress(address1, addresscity, addressstate, addresszip, phonenumber, shippement);
    }


}

// Function to update this valid details to the server

function updateshippingaddress(address1, addresscity, addressstate, addresszip, phonenumber, shippement) {
    $("#edit_fade").show();

    $.mobile.loading("show", {
        text: "Loading,Please Wait...",
        textVisible: true,
        theme: "a",
        textonly: true,
        html: "<span class='ui-bar ui-overlay-a ui-corner-all' style='text-align:center;background:#ccc'><img src='images/ajax-loader.gif'/><br/><p style='color:#304589;font-weight:bold'>Please Wait...</p></span>"

    });


    var Fullphonenumber = phonenumber.split('-');
    var CustomerTelephoneAreaCode = Fullphonenumber[0];
    var CustomerTelephonePrefixNumber = Fullphonenumber[1];
    var CustomerTelephoneSuffixNumber = Fullphonenumber[2];

    if (isuserlogged == 'yes')
    {
        var UserProfile = GetLS('UserProfile');
        var CustomerNumber = GetLS('CustomerNumber');
        $.ajax({
            type: "GET",
            crossDomain: true,
            url: shippingaddressURL + "CustNum=" + CustomerNumber + "&ShippingAddress1=" + address1 + "&ShippingAddress2=&ShippingAddress3=&ShippingCity=" + addresscity + "&ShippingState=" + addressstate + "&ShippingZip=" + addresszip + "&AreaCode=" + CustomerTelephoneAreaCode + "&TelePrefix=" + CustomerTelephonePrefixNumber + "&TeleSuffix=" + CustomerTelephoneSuffixNumber + "&prefMethdOfShip=" + shippement + "&UserId=" + UserProfile + "&deviceencryptedkey=" + encryptedkey + "&accesstoken=" + AccessTokenKey + "&splib=" + splib + "&tablelib=" + tablelib,
            dataType: "xml",
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

                var xmlDoc = $.parseXML(xmlString);

                var $xml = $(xmlDoc);
                var $Name = $xml.find('return');

                var resultJSON = $Name.text();
                var json = $.parseJSON(resultJSON);
                if (json.IsUpdated == "True")
                {
                    var showproduct = window.openDatabase("blackman", "1.0", "blackman", 2 * 1024 * 1024);
                    showproduct.transaction(function showitemsbyid(tx)
                    {
                        var query = "update userinfo set CustomerTelephoneAreaCode=" + CustomerTelephoneAreaCode + ",CustomerTelephonePrefixNumber=" + CustomerTelephonePrefixNumber + ",CustomerTelephoneSuffixNumber=" + CustomerTelephoneSuffixNumber + ", CustomerShippingAddress1='" + address1 + "', CustomerShippingCity='" + addresscity + "', CustomerShippingState='" + addressstate + "', CustomerMainShippingZipCode='" + addresszip + "' where CustomerNumber=" + CustomerNumber;
                        tx.executeSql(query);
                        SetLS("CustomerShippingState", addressstate);
                        SetLS("Toaddress", address1);
                        SetLS("Tocity", addresscity);
                        SetLS("Tostate", addressstate);
                        SetLS("Tozip", addresszip);

                        $('.addressbook').hide();
                        navigator.notification.alert('User Information Updated!', null, 'Account', 'OK');
                        $.mobile.loading("hide");
                        $("#loading_pdt").hide();
                        $("#edit_fade").hide();
                        $('#fade').hide();
                        writetologfile("User has updated his shipping details", 8);
                    }, errorCB);

                }
                else
                {
                    writetologfile("Error in updating user shipping details", 3);
                    navigator.notification.alert('User Information Is Not Updated!', null, 'Account', 'OK');
                    $.mobile.loading("hide");
                    $("#loading_pdt").hide();
                    $('#fade').hide();
                    $("#edit_fade").hide();
                }
            },
            error: function (data, errorThrown) {
                navigator.notification.alert('Unable to connect server.Please try again later!', null, 'Connection Failed', 'OK');


                $("#edit_fade").hide();
                $.mobile.loading("hide");
                $("#loading_pdt").hide();
                writetologfile("Error in updating user shipping details", 3);
            }
        });


    }

}
function tableinvoice1() {
    $('.tableinvoice1').slideToggle();
    $('.tableinvoice2').hide();
    $('.tableinvoice3').hide();
}
function tableinvoice2() {
    $('.tableinvoice2').slideToggle();
    $('.tableinvoice1').hide();
    $('.tableinvoice3').hide();
}
function tableinvoice3() {
    $('.tableinvoice3').slideToggle();
    $('.tableinvoice1').hide();
    $('.tableinvoice2').hide();
}
function feedback() {
    $('.contact').hide();
    $('.feedbk').hide();
    $('.feedbk1').show();
}
function feedbackrtn() {
    $('.contact').hide();
    $('.contact1').show();
    $('.feedbk').show();
    $('.feedbk1').hide();
}


function Device() {
    $('.contact').hide();
    $('.device').hide();
    $('.device1').show();
}
function Devicertn() {
    $('.contact').hide();
    $('.contact1').show();
    $('.device').show();
    $('.device1').hide();
}


function contactcls() {
    $('.contact1').show();
    $('.contact').hide();
}

function contactus() {
    $('.contact1').hide();
    $('.contact').show();
    $('.feedbk1').hide();

}


function contactusrtn() {
    $('.contact1').show();
    $('.contact').hide();

}


function editaddress() {

    $('.addressdetail').hide();
    $('.addressdetailedit').show();
}
function saveaddress() {
    $('.addressdetail').show();
    $('.addressdetailedit').hide();
}
function addressbookcls() {
    $('.addressbook').hide();
    $('#fade').hide();
}

function backcategorypdt1() {
    $('#itempdtimg').hide();
    $('#itempdtimg8').hide();
    $('#itempdtimg2').hide();
    $('#itempdtimg4').hide();
    $('#fade').hide();
}
function orderclick() {
    $('#orderclick').show();
    $('#invoiceclick').hide();
    $('#lblorderhis').css("background", "#838FB8");
    $('#lblinvoice').css("background", "#304589");
    $('#divimg1').show();
    $('#divimg2').hide();
    $('#divimg3').hide();
    $('.footer').hide();
}

function table1() {
    $('#new1').slideToggle();
    $('#new2').hide();
    $('#new3').hide();
}
function table2() {
    $('#new2').slideToggle();
    $('#new1').hide();
    $('#new3').hide();
}
function table3() {
    $('#new3').slideToggle();
    $('#new2').hide();
    $('#new1').hide();
}


function fullorderview() {

    $('#divimg1').hide();
    $('#divimg2').show();
    $('#orderclick').hide();
}

$(function () {
    $('#locationfinder').click(function () {

        $('.white_contentlistnewpdt').toggle();
        loadmenu_account(4);
    })
});
function addressbook() {
    var c_page = GetLS("page");
    var result = c_page.split(",");
    if (result[result.length - 1] != "accpopup") {
        SetLS("page", c_page + ",accpopup");
    }
    saveaddress();
    feedbackrtn();
    $('#fade').show();
    $('.addressbook').toggle();
    $('.white_contentlistnewpdt').hide();
}


function loadmenu_account(pageno)
{
    var html = "";
    html = html + '<div class="innerpopup">';
    html = html + '<div class="empty">';
    html = html + '</div>';
    if (isuserlogged == 'yes') {
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
        html = html + '<span class="p-menu" >Hi, Guest,</span>';
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
    

    html = html + '<div class="popdiv" onclick="findbranch(' + pageno + ')">';
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


