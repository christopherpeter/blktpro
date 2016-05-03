
//Live URL

var encryptedkeyURL = "https://www.blackmancommercialaccounts.com/axis2/services/BMCDeviceEncrytedKey/deviceEncryptedkey";
var loginURL = "https://www.blackmancommercialaccounts.com/axis2/services/BMCLoginWS/loginCall";
var logoutURL = "https://www.blackmancommercialaccounts.com/axis2/services/BMCLogoutWS/logOut?";
var branchURL = "https://www.blackmancommercialaccounts.com/BMCBranchList.xml";
var productsearchURL2 = "https://www.blackmancommercialaccounts.com/axis2/services/BMCITMSearchWS/getItemsByProduct?";
var logURL = "https://www.blackmancommercialaccounts.com/axis2/services/BMCLogEntryWS/insertLog?";
var shippingaddressURL = "https://www.blackmancommercialaccounts.com/axis2/services/BMCUpdateShippingWS/callUpdate?";
var gettaxfromzipcodeURL = "https://www.blackmancommercialaccounts.com/axis2/services/BMCTaxRateWS/getTaxRate?zip=";
var newproductlistpage1 = "https://www.blackmancommercialaccounts.com/axis2/services/BMCCBTSecLevelSCode/getSectionCodes";

//Develpment URL

var salesorderURL = "https://www.blackmancommercialaccounts.com/axis2/services/BMCSalesOrderWS_DEV/submitOrder?";
var orderhistory1URL = "https://www.blackmancommercialaccounts.com/axis2/services/BMCSOHeaderWSMOB_DEV/getOrders?";
var orderhistoryItems = "https://www.blackmancommercialaccounts.com/axis2/services/BMCSOItemsWS_DEV/getOrderItems?";
var AdvancedSearchURL = "https://www.blackmancommercialaccounts.com/axis2/services/BMCAdvanceSearchWSDev/getItemsByVendor?";

//Live URL
//var salesorderURL = "https://www.blackmancommercialaccounts.com/axis2/services/BMCSalesOrderWS/submitOrder?";
//var orderhistory1URL = "https://www.blackmancommercialaccounts.com/axis2/services/BMCSOHeaderWS/getOrders?";
//var orderhistoryItems = "https://www.blackmancommercialaccounts.com/axis2/services/BMCSOItemsWS/getOrderItems?";

var PriceServiceURL = "https://www.blackmancommercialaccounts.com/axis2/services/BMCInsertNetPrice/insertNetPrice?";


var FreightRateServiceURL = "https://www.blackmancommercialaccounts.com/axis2/services/ShippingURL/getShippingdetails?";
var RateServiceURL = "https://www.blackmancommercialaccounts.com/axis2/services/ShippingURL/getShippingdetails2?";
var CurrentBalanceURL = "https://www.blackmancommercialaccounts.com/axis2/services/BMCAccountReceivableWP/accountReceive?";
var productScanURL = "https://www.blackmancommercialaccounts.com/axis2/services/BMCItemScanWS/getItemscan?";
var CurrentBalance2URL = "https://www.blackmancommercialaccounts.com/axis2/services/BMCCBItemsWS/getOrderItems?";
var branchavailablelistURL = "https://www.blackmancommercialaccounts.com/axis2/services/BMCItmBranchListWS/getItmBranchList?ItemNumber=";
var AttributeURL = "https://www.blackmancommercialaccounts.com/axis2/services/BMCAttributesWS/getAttributes?";
var ShippingAddressEntryURL = "https://www.blackmancommercialaccounts.com/axis2/services/BMCShipAddrWS/addShipAddr?";
var BranchMatrixURL = "https://www.blackmancommercialaccounts.com/axis2/services/BMCWebOrderingBranchList/getBranchlist?";
var AppFeedbackURL = "https://www.blackmancommercialaccounts.com/axis2/services/BMCAPPFeedBackWS/appFeedback?";

//old
//var getsectionURL = "https://www.blackmancommercialaccounts.com/axis2/services/BMCSCode2WS/getSectionCodes1?StartIndex=1&EndIndex=22";
//var groupcodeURL = "https://www.blackmancommercialaccounts.com/axis2/services/BMCGCodeWS/getGroupCodes";
//var categoryURL = "https://www.blackmancommercialaccounts.com/axis2/services/BMCCategoryWS/getCategoryList";
//var filtersearchURL = "https://www.blackmancommercialaccounts.com/axis2/services/BMCItmByUserWS/getItemsByUser?";
//var productsearchURL1 = "https://www.blackmancommercialaccounts.com/axis2/services/BMCSearchWS/getItemsByProduct?";

//New
var getsectionURL = "https://www.blackmancommercialaccounts.com/axis2/services/BMCCBTSCode2WS/getSectionCodes1?StartIndex=1&EndIndex=500";
var groupcodeURL = "https://www.blackmancommercialaccounts.com/axis2/services/BMCCBTGCodeWS/getGroupCodes";
var categoryURL = "https://www.blackmancommercialaccounts.com/axis2/services/BMCCBTCategoryWS/getCategoryList";
var NewCategoryServiceURL = "https://www.blackmancommercialaccounts.com/axis2/services/BMCCategoryDetails/getCategoryDetails?";
//var filtersearchURL = "https://www.blackmancommercialaccounts.com/axis2/services/BMCCBTItmByUserWS/getItemsByUser?";
var filtersearchURL = "https://www.blackmancommercialaccounts.com/axis2/services/BMCCBTItemByUserDev/getItemsByUser?";
var productsearchURL1 = "https://www.blackmancommercialaccounts.com/axis2/services/BMCCBTSearchWS/getItemsByProduct?";
var FilterOptionsURL = "https://www.blackmancommercialaccounts.com/axis2/services/BMCItemFilter/getItemList?"
var FilterValueURL = "https://www.blackmancommercialaccounts.com/axis2/services/BMCItemAttributeValue/getValue?";
var FilterProductsURL = "https://www.blackmancommercialaccounts.com/axis2/services/BMCItmByAttrWS/getItemsByAttr?";


var NewFilterAttributesURL = "https://www.blackmancommercialaccounts.com/axis2/services/BMCAttributes/getFilterAttributes?";
var NewFilterAttributesVauesURL = "https://www.blackmancommercialaccounts.com/axis2/services/BMCAttributeValues/getAttributeValues?";
var NewFilterProductsResultsURL = "https://www.blackmancommercialaccounts.com/axis2/services/BMCAllProducts/getAllProducts?";

var splib = "TYCHLIB";
var tablelib = "TYCHLIB";
var orderedbyname = "BTP";
var initials = "WOE";

//Image path url
var imagepath = "https://www.blackmancommercialaccounts.com/Categories/";  //Center category imagepath
var productimagepath = "https://www.blackmancommercialaccounts.com/productimages/"; //Product image path

var TotalProductCount = 10;
var ToNextCount = parseInt(TotalProductCount,10) - 1;


//Global Variables

var pricetax = 0;
var shippingcharges = 0;
var defaultbranchcode = "100";
var defaultbranchname = "BLACKMAN - WAREHOUSE";
var SecretPhrase = getCookie("AlphanumericToken");

function getCookie(cname) 
{
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}

//Function To set Localstorage

function setLS(Key, Value)
{
    //var EncryptedValue = CryptoJS.AES.encrypt(Value.toString(), SecretPhrase);
    localStorage.setItem(Key, Value);
}

//Function To get Localstorage value

function getLS(Key) {
    if (localStorage.getItem(Key) == null || localStorage.getItem(Key) == "") {
        return null;
    }
    else {
        //var OriginalValue = CryptoJS.AES.decrypt(localStorage.getItem(Key), SecretPhrase).toString(CryptoJS.enc.Utf8);
        var OriginalValue = localStorage.getItem(Key);
        return OriginalValue;
    }
}


//Function to remove an item from locat storage

function removeLS(Key) {
    localStorage.removeItem(Key);
}


var encryptedkey = getLS('encryptedkey');

var AccessTokenKey = "";
if (getLS('AccessTokenKey') == null || getLS('AccessTokenKey') == "") {
    AccessTokenKey = "";
}
else {

    AccessTokenKey = getLS('AccessTokenKey');
}


function onOnline() {
    location.reload();
}

function onOffline() {
    navigator.notification.alert('Please check your internet settings and try again !', null, 'Internet Failure', 'OK');
}