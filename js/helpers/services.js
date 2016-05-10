

var BlackmanApplicationServices = {
  "encryptedkeyURL": "https://www.blackmancommercialaccounts.com/axis2/services/BMCDeviceEncrytedKey/deviceEncryptedkey",
  "loginURL": "https://www.blackmancommercialaccounts.com/axis2/services/BMCLoginWS/loginCall",
  "logoutURL": "https://www.blackmancommercialaccounts.com/axis2/services/BMCLogoutWS/logOut?",
  "branchURL": "https://www.blackmancommercialaccounts.com/BMCBranchList.xml",
  // productsearchURL2: "https://www.blackmancommercialaccounts.com/axis2/services/BMCITMSearchWS/getItemsByProduct?",
  "logURL" : "https://www.blackmancommercialaccounts.com/axis2/services/BMCLogEntryWS/insertLog?",
  "shippingaddressURL" : "https://www.blackmancommercialaccounts.com/axis2/services/BMCUpdateShippingWS/callUpdate?",
  "gettaxfromzipcodeURL" : "https://www.blackmancommercialaccounts.com/axis2/services/BMCTaxRateWS/getTaxRate?zip=",
  // newproductlistpage1 : "https://www.blackmancommercialaccounts.com/axis2/services/BMCCBTSecLevelSCode/getSectionCodes",
  // Develpment URL
  "salesorderURL" : "https://www.blackmancommercialaccounts.com/axis2/services/BMCSalesOrderWS_DEV/submitOrder?",
  "orderhistory1URL" : "https://www.blackmancommercialaccounts.com/axis2/services/BMCSOHeaderWSMOB_DEV/getOrders?",
  "orderhistoryItems" : "https://www.blackmancommercialaccounts.com/axis2/services/BMCSOItemsWS_DEV/getOrderItems?",
  "AdvancedSearchURL" : "https://www.blackmancommercialaccounts.com/axis2/services/BMCAdvanceSearchWSDev/getItemsByVendor?",
  // Live URL
  // "salesorderURL" : "https://www.blackmancommercialaccounts.com/axis2/services/BMCSalesOrderWS/submitOrder?",
  // "orderhistory1URL" : "https://www.blackmancommercialaccounts.com/axis2/services/BMCSOHeaderWS/getOrders?",
  // "orderhistoryItems" : "https://www.blackmancommercialaccounts.com/axis2/services/BMCSOItemsWS/getOrderItems?",
  "PriceServiceURL" : "https://www.blackmancommercialaccounts.com/axis2/services/BMCInsertNetPrice/insertNetPrice?",
  "FreightRateServiceURL" : "https://www.blackmancommercialaccounts.com/axis2/services/ShippingURL/getShippingdetails?",
  "RateServiceURL" : "https://www.blackmancommercialaccounts.com/axis2/services/ShippingURL/getShippingdetails2?",
  "CurrentBalanceURL" : "https://www.blackmancommercialaccounts.com/axis2/services/BMCAccountReceivableWP/accountReceive?",
  "productScanURL" : "https://www.blackmancommercialaccounts.com/axis2/services/BMCItemScanWS/getItemscan?",
  "CurrentBalance2URL" : "https://www.blackmancommercialaccounts.com/axis2/services/BMCCBItemsWS/getOrderItems?",
  "branchavailablelistURL" : "https://www.blackmancommercialaccounts.com/axis2/services/BMCItmBranchListWS/getItmBranchList?ItemNumber=",
  "AttributeURL" : "https://www.blackmancommercialaccounts.com/axis2/services/BMCAttributesWS/getAttributes?",
  // "ShippingAddressEntryURL" : "https://www.blackmancommercialaccounts.com/axis2/services/BMCShipAddrWS/addShipAddr?",
  "BranchMatrixURL" : "https://www.blackmancommercialaccounts.com/axis2/services/BMCWebOrderingBranchList/getBranchlist?",
  "AppFeedbackURL" : "https://www.blackmancommercialaccounts.com/axis2/services/BMCAPPFeedBackWS/appFeedback?",
  // "getsectionURL" : "https://www.blackmancommercialaccounts.com/axis2/services/BMCCBTSCode2WS/getSectionCodes1?StartIndex=1&EndIndex=500",
  // "groupcodeURL" : "https://www.blackmancommercialaccounts.com/axis2/services/BMCCBTGCodeWS/getGroupCodes",
  "categoryURL" : "https://www.blackmancommercialaccounts.com/axis2/services/BMCCBTCategoryWS/getCategoryList",
  "NewCategoryServiceURL" : "https://www.blackmancommercialaccounts.com/axis2/services/BMCCategoryDetails/getCategoryDetails?",
  // "filtersearchURL" : "https://www.blackmancommercialaccounts.com/axis2/services/BMCCBTItmByUserWS/getItemsByUser?",
  "filtersearchURL" : "https://www.blackmancommercialaccounts.com/axis2/services/BMCCBTItemByUserDev/getItemsByUser?",
  "productsearchURL1" : "https://www.blackmancommercialaccounts.com/axis2/services/BMCCBTSearchWS/getItemsByProduct?",
  "FilterOptionsURL" : "https://www.blackmancommercialaccounts.com/axis2/services/BMCItemFilter/getItemList?",
  "FilterValueURL" : "https://www.blackmancommercialaccounts.com/axis2/services/BMCItemAttributeValue/getValue?",
  "FilterProductsURL" : "https://www.blackmancommercialaccounts.com/axis2/services/BMCItmByAttrWS/getItemsByAttr?",
  "NewFilterAttributesURL" : "https://www.blackmancommercialaccounts.com/axis2/services/BMCAttributes/getFilterAttributes?",
  "NewFilterAttributesVauesURL": "https://www.blackmancommercialaccounts.com/axis2/services/BMCAttributeValues/getAttributeValues?",
  "NewFilterProductsResultsURL" : "https://www.blackmancommercialaccounts.com/axis2/services/BMCAllProducts/getAllProducts?"
}

var AccessTokenKey, CustomerNumber, userID, UserProfile, isuserlogged, UserName, Isvalid;

// Global Variables
var BlackmanApplicationVariables = {
  SettingsPricetax : 0,
  SettingsShippingcharges : 0,
  defaultbranchcode : "100",
  defaultbranchname : "BLACKMAN - WAREHOUSE",  
  splib : "TYCHLIB",
  tablelib : "TYCHLIB",
  imagepath : "https://www.blackmancommercialaccounts.com/Categories/", //Center category imagepat
  productimagepath : "https://www.blackmancommercialaccounts.com/productimages/", //Product image path
  TotalProductCount : 10,
  ToNextCount: parseInt(BlackmanApplicationVariables.TotalProductCount, 10) - 1,
}


function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(name) !== -1) return c.substring(name.length, c.length);
    }
    return "";
}

// function to store value to cookie

function setCookie(cname, cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + (5000 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}


// Function To set Localstorage
var SecretPhrase = getCookie("AlphanumericToken");
function setLS(Key, Value) {
    // var EncryptedValue = CryptoJS.AES.encrypt(Value.toString(), SecretPhrase);
    localStorage.setItem(Key, Value);
}

// Function To get Localstorage value

function getLS(Key) {
    if (localStorage.getItem(Key) === null || localStorage.getItem(Key) === "") {
        return null;
    }
    else {
        //var OriginalValue = CryptoJS.AES.decrypt(localStorage.getItem(Key), SecretPhrase).toString(CryptoJS.enc.Utf8);
        var OriginalValue = localStorage.getItem(Key);
        return OriginalValue;
    }
}

// Function to remove an item from locat storage

function removeLS(Key) {
    localStorage.removeItem(Key);
}


var encryptedkey = getLS('encryptedkey');
if (AccessTokenKey === null || AccessTokenKey === "") {
    AccessTokenKey = "";
}
else {

    AccessTokenKey = getLS('AccessTokenKey');
}
