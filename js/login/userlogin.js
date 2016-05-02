/*
This javascript files is only for login pages functions
Creaded on:22/07/2014 12:05PM
License:Tychons solutions
*/

function backtoindexpage() 
{
    var c_page = GetLS('page');
    var result = c_page.split(","), new_page;
    changepage(result[result.length-1]);
    if (result.length == 1) {
        new_page = c_page.replace(result[result.length - 1], "");
        SetLS('page', new_page);
    } else {
        new_page = c_page.replace(',' + result[result.length - 1], "");
        SetLS('page', new_page);
    }
} 


function login() 
{
    var c_page = GetLS('page');

    if (c_page != null ) 
    {
        if (c_page.indexOf(',') > -1) {
            var result = c_page.split(",");
            if (result[result.length - 1] !== "newlogin") {
                SetLS('page', c_page + ",newlogin");
            }
        }
        else 
        {
            SetLS('page', 'newlogin');
        }
    }
    else {
        SetLS('page', 'newlogin');
    }
    var isuserlogged = GetLS('Isuserlogged');
    if (isuserlogged == 'yes') 
    {
        var result = c_page.split(",");
        if (result[result.length - 1] != 'home');
        {
            SetLS('page', c_page + ",home");
        }
        window.location.href = 'products.html';
    }
    else 
    {
        window.location.href = 'login.html';
    }

}

//This function handled user log in 

function submitButton(page) 
{
    var accountno = $("#txtaccno").val().trim();
    var username = $("#txtuser").val().trim();
    var password = $("#txtpwd").val().trim();
    var numbers = /^[0-9]+$/;
    
    var branch_code = GetLS('Current_branch');
    if (accountno == "") {
      
        navigator.notification.alert('Please enter account no.', null, 'Authentication', 'OK');
        return false;
    }

    else if (!numbers.test(accountno)) {
       
       navigator.notification.alert('Please enter valid account no.', null, 'Authentication', 'OK');
        $("#txtaccno").val('');
        return false;
    }
    else if (username == "") {

        navigator.notification.alert('Please Enter Username.', null, 'Authentication', 'OK');
        return false;
    }
    else if (password == "") {

        navigator.notification.alert('Please enter password.', null, 'Authentication', 'OK');
        return false;
    }

    $("#loading_pdt").show();
    $.mobile.loading("show", {
        text: "Loading,Please Wait...",
        textVisible: true,
        theme: "a",
        textonly: true,
        html: "<span class='ui-bar ui-overlay-a ui-corner-all' style='text-align:center;background:#ccc'><img src='images/ajax-loader.gif'/><br/><h2 style='color:#304589'>Loading please wait...</h2></span>"

    });

 
        $.ajax({
            type: "GET",
            crossDomain: true,
            url: loginURL + "?uname=" + username + "&pwd=" + password + "&accountnumber=" + accountno + "&deviceencryptedkey=" + encryptedkey + "&loginfrom=Mobile Application &splib=" + splib + "&tablelib=" + tablelib,
            dataType: "xml",
            success: function (xmlData) {
                var dbinsert = window.openDatabase("blackman", "1.0", "blackman", 2 * 1024 * 1024);       /* opening local database */

                dbinsert.transaction(function insertdetails(tx) {
                    tx.executeSql('CREATE TABLE IF NOT EXISTS userinfo (id INTEGER PRIMARY KEY AUTOINCREMENT,CompanyNumber,CustomerNumber VARCHAR UNIQUE,UserName,UserProfile,UserPhoneAreaCode,UserPhonePrefix,UserPhoneSuffix,UserFaxAreaCode,UserFaxPrefix,UserFaxSuffix,UserEMail,MethodOfShipment,OrderStatusCode,BranchNumber,ShipfromBranchNumber,CheckStockStatus,LastAccessMonth,DayOfLastAccess,YearLastAccessed,LastAccessTime,LastUpdateMonth,LastUpdateDay,LastUpdateYear,ShippedShipCode,OurTruckShipCode,PickupShipCode,UserIDOfMaintenance,CustomerMailingAddress1,CustomerMailingAddress2,CustomerMailingAddress3,CustomerShippingAddress1,CustomerShippingAddress2,CustomerShippingAddress3,CustomerMailingCity,CustomerShippingCity,CustomerMailingState,CustomerShippingState,CustomerMainMailingZipCode,CustomerMainShippingZipCode,CustomerTelephoneAreaCode,CustomerTelephonePrefixNumber,CustomerTelephoneSuffixNumber,CreditHoldFlag,DeliveryChargeFlag,ContractInEffectFlag,CreditLimitAmount,CustTaxExemptionNumber,CustTaxExemptFlag,CustStatementPrintCode,GSTTaxExemptCode,AverageDaysToPay,PreferredMethodOfShipment,ShipCode,ShipCodeLockFlag,PickingSeq)');
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
                    var obj = JSON.parse(resultJSON);
                    var IsValid = obj.IsValid;
                    var CompanyNumber = obj.CompanyNumber;

                    if (CompanyNumber != '' && CompanyNumber != 'undefined') {
                        var CompanyNumber = obj.CompanyNumber;
                        var CustomerNumber = obj.CustomerNumber;
                        var UserName = obj.UserName;
                        var UserProfile = obj.UserProfile;
                        var UserPhoneAreaCode = obj.UserPhoneAreaCode;
                        var UserPhonePrefix = obj.UserPhonePrefix;
                        var UserPhoneSuffix = obj.UserPhoneSuffix;
                        var UserFaxAreaCode = obj.UserFaxAreaCode;
                        var UserFaxPrefix = obj.UserFaxPrefix;
                        var UserFaxSuffix = obj.UserFaxSuffix;
                        var UserEMail = obj.UserEMail;
                        var MethodOfShipment = obj.MethodOfShipment;
                        var OrderStatusCode = obj.OrderStatusCode;
                        var BranchNumber = obj.BranchNumber;
                        var ShipfromBranchNumber = obj.ShipfromBranchNumber;
                        var CheckStockStatus = obj.CheckStockStatus;
                        var LastAccessMonth = obj.LastAccessMonth;
                        var DayOfLastAccess = obj.DayOfLastAccess;
                        var YearLastAccessed = obj.YearLastAccessed;
                        var LastAccessTime = obj.LastAccessTime;
                        var LastUpdateMonth = obj.LastUpdateMonth;
                        var LastUpdateDay = obj.LastUpdateDay;
                        var LastUpdateYear = obj.LastUpdateYear;
                        var ShippedShipCode = obj.ShippedShipCode;
                        var OurTruckShipCode = obj.OurTruckShipCode;
                        var PickupShipCode = obj.PickupShipCode;
                        var UserIDOfMaintenance = obj.UserIDOfMaintenance;

                        // New fields added on 10/09/2014 3PM

                        var CustomerMailingAddress1 = obj.CustomerMailingAddress1;
                        var CustomerMailingAddress2 = obj.CustomerMailingAddress2;
                        var CustomerMailingAddress3 = obj.CustomerMailingAddress3;
                        var CustomerShippingAddress1 = obj.CustomerShippingAddress1;
                        var CustomerShippingAddress2 = obj.CustomerShippingAddress2;
                        var CustomerShippingAddress3 = obj.CustomerShippingAddress3;
                        var CustomerMailingCity = obj.CustomerMailingCity;
                        var CustomerShippingCity = obj.CustomerShippingCity;
                        var CustomerMailingState = obj.CustomerMailingState;
                        var CustomerShippingState = obj.CustomerShippingState;
                        var CustomerMainMailingZipCode = obj.CustomerMainMailingZipCode;
                        var CustomerMainShippingZipCode = obj.CustomerMainShippingZipCode;
                        var CustomerTelephoneAreaCode = obj.CustomerTelephoneAreaCode;
                        var CustomerTelephonePrefixNumber = obj.CustomerTelephonePrefixNumber;
                        var CustomerTelephoneSuffixNumber = obj.CustomerTelephoneSuffixNumber;
                        var CreditHoldFlag = obj.CreditHoldFlag;
                        var DeliveryChargeFlag = obj.DeliveryChargeFlag;
                        var ContractInEffectFlag = obj.ContractInEffectFlag;
                        var CreditLimitAmount = obj.CreditLimitAmount;
                        var CustTaxExemptionNumber = obj.CustTaxExemptionNumber;
                        var CustTaxExemptFlag = obj.CustTaxExemptFlag;
                        var CustStatementPrintCode = obj.CustStatementPrintCode;
                        var GSTTaxExemptCode = obj.GSTTaxExemptCode;
                        var AverageDaysToPay = obj.AverageDaysToPay;
                        var PreferredMethodOfShipment = obj.PreferredMethodOfShipment;
                        var ShipCode = obj.ShipCode;
                        var ShipCodeLockFlag = obj.ShipCodeLockFlag;
                        var PickingSeq = obj.PickingSeq;
                        var AccessTokenKey = obj.AccessTokenKey;

                        var SALESPERSONID = obj.SALESPERSONID;
                        SetLS('salesmanid', SALESPERSONID);

                        SetLS('AccessTokenKey', AccessTokenKey);
                        SetLS('UserID', UserIDOfMaintenance);
                        SetLS('UserProfile', UserProfile);
                        SetLS('CustomerNumber', CustomerNumber);
                        SetLS('Zipcode', CustomerMainShippingZipCode);
                        SetLS('UserName', UserName);
                        SetLS('CustomerShippingState', CustomerShippingState);
                        SetLS('ShippingMethod', PreferredMethodOfShipment);

                        var defaultbranchname = GetLS('default_branchname');
                        var defaultbranchcode = GetLS('default_branchcode');
                        if (IsValid == 'True') 
                        {
                            var qry = 'INSERT INTO userinfo (CompanyNumber,CustomerNumber,UserName,UserProfile,UserPhoneAreaCode,UserPhonePrefix,UserPhoneSuffix,UserFaxAreaCode,UserFaxPrefix,UserFaxSuffix,UserEMail,MethodOfShipment,OrderStatusCode,BranchNumber,ShipfromBranchNumber,CheckStockStatus,LastAccessMonth,DayOfLastAccess,YearLastAccessed,LastAccessTime,LastUpdateMonth,LastUpdateDay,LastUpdateYear,ShippedShipCode,OurTruckShipCode,PickupShipCode,UserIDOfMaintenance,CustomerMailingAddress1,CustomerMailingAddress2,CustomerMailingAddress3,CustomerShippingAddress1,CustomerShippingAddress2,CustomerShippingAddress3,CustomerMailingCity,CustomerShippingCity,CustomerMailingState,CustomerShippingState,CustomerMainMailingZipCode,CustomerMainShippingZipCode,CustomerTelephoneAreaCode,CustomerTelephonePrefixNumber,CustomerTelephoneSuffixNumber,CreditHoldFlag,DeliveryChargeFlag,ContractInEffectFlag,CreditLimitAmount,CustTaxExemptionNumber,CustTaxExemptFlag,CustStatementPrintCode,GSTTaxExemptCode,AverageDaysToPay,PreferredMethodOfShipment,ShipCode,ShipCodeLockFlag,PickingSeq)'
                          + 'VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
                            tx.executeSql(qry, [CompanyNumber, CustomerNumber, UserName, UserProfile, UserPhoneAreaCode, UserPhonePrefix, UserPhoneSuffix, UserFaxAreaCode, UserFaxPrefix, UserFaxSuffix, UserEMail, MethodOfShipment, OrderStatusCode, BranchNumber, ShipfromBranchNumber, CheckStockStatus, LastAccessMonth, DayOfLastAccess, YearLastAccessed, LastAccessTime, LastUpdateMonth, LastUpdateDay, LastUpdateYear, ShippedShipCode, OurTruckShipCode, PickupShipCode, UserIDOfMaintenance, CustomerMailingAddress1, CustomerMailingAddress2, CustomerMailingAddress3, CustomerShippingAddress1, CustomerShippingAddress2, CustomerShippingAddress3, CustomerMailingCity, CustomerShippingCity, CustomerMailingState, CustomerShippingState, CustomerMainMailingZipCode, CustomerMainShippingZipCode, CustomerTelephoneAreaCode, CustomerTelephonePrefixNumber, CustomerTelephoneSuffixNumber, CreditHoldFlag, DeliveryChargeFlag, ContractInEffectFlag, CreditLimitAmount, CustTaxExemptionNumber, CustTaxExemptFlag, CustStatementPrintCode, GSTTaxExemptCode, AverageDaysToPay, PreferredMethodOfShipment, ShipCode, ShipCodeLockFlag, PickingSeq]);
                            if (page == 1) {
                                SetLS('Isuserlogged', 'yes');
                                var getbranchname = GetLS('default_branchname2');
                                var getbranchcode = GetLS('default_branchcode2');

                                if (getbranchcode != null && getbranchcode != "") {

                                    SetLS('default_branchcode', getbranchcode);
                                    SetLS('Current_branch', getbranchcode);
                                    SetLS('default_branchname', getbranchname);
                                    writetologfile("User Logged in", 1);
                                }
                                else
                                {
                                    writetologfile("User Logged in", 2);
                                }
                            }
                            else if (page == 2)
                            {
                                SetLS('Isuserlogged', 'yes');
                                isuserlogged = 'yes'; //global variable;
                                user_ID = GetLS('UserID');
                                UserID = GetLS('UserID');
                                UserProfile = GetLS('UserProfile');
                                isuserlogged = GetLS('Isuserlogged');
                                customerno = GetLS('CustomerNumber');
                                UserName = GetLS('UserName');

                                $(".exitbtn").show();
                                $(".hide").show();
                                $(".loginpopup").hide();
                                $(".signinbtn").hide();
                                $("#fade").hide();
                                $("#fadelogin").hide();
                                var sectioncode = GetLS('SEC_CODE');
                                pdtimgkitchendivdisplay1(GetLS('F_Sectioncode'), GetLS('F_Groupcode'), GetLS('F_Categorycode'));
                            }
                        }
                        else
                        {
                            navigator.notification.alert('Invalid Username Or Password.', null, 'Authentication', 'OK');
                            SetLS('Isuserlogged', 'No');
                            $("#loading_pdt").hide();
                            $.mobile.loading("hide");
                            $("#fadelogin").hide();
                        }
                    }
                }, errorCB);

            }, error: function (data, errorThrown) {
                navigator.notification.alert('Unable to connect server.Please try again later!', null, 'Connection Failed', 'OK');
                $("#loading_pdt").hide();
                $.mobile.loading("hide");
            }

        });
    
}


function errorCB() {
    navigator.notification.alert('Database error!.Please Contact administrator', null, 'Alert', 'OK');

    $("#loading_pdt").hide();
    $("#fade").hide();
    $.mobile.loading("hide");
}

//Function for user logout

function exit() 
{
   navigator.notification.confirm('Are you sure want to logout?', onConfirmExit, 'Logout', ['Yes', 'No']);
   //onConfirmExit(1); // development
}

function onConfirmExit(buttonIndex) 
{
    if (buttonIndex == 1) 
    {
        var isuserlogged = GetLS('Isuserlogged');
        if (isuserlogged == 'yes') 
        {
            var AccessTokenKey = GetLS('AccessTokenKey');
            $("#loading_pdt").show();
            $.mobile.loading("show", 
            {
                text: "Loading,Please Wait...",
                textVisible: true,
                theme: "a",
                textonly: true,
                html: "<span class='ui-bar ui-overlay-a ui-corner-all' style='text-align:center;background:#ccc;font-size:12px'><img src='images/ajax-loader.gif'/><br/><h style='color:#304589'>Please wait...</h></span>"

            });


            $.ajax({
                type: "GET",
                crossDomain: true,
                url: logoutURL + "accesstoken=" + AccessTokenKey,
                dataType: "xml",
                success: function (xmlData) {
                    document.cookie = "AlphanumericToken" + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
                    localStorage.clear();
                    writetologfile("User Logged out", 4);

                }, error: function (data, errorThrown) {
                    navigator.notification.alert('Unable to connect server.Please try again later!', null, 'Connection Failed', 'OK');
                    $("#loading_pdt").hide();
                    $.mobile.loading("hide");
                }
            });

        }
        else 
        {  
            window.location.href = 'index.html';
        }
    }
}