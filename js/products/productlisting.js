/*
This javascript files is only for Products
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
user_ID = getLS('UserID');
if (user_ID === null) {
    user_ID = "";
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


$(document).ready(function () {
    setLS('viewimg', 'no');   //added on 1/12/2014
    $("#viewoff").click(function () {
        var message = "View Image turned ON";
        writetologfile(message, 3);
        $('#viewoff').show();
        setLS('viewimg', 'no');
        if ($(".pdtimgkitchendivdisplay1").css('display') !== "none") {
            loadsectionproductscontents("Yes");

        } else {
            loadsectionfilter();
        }
    });
    $("#viewon").click(function () {
        $('#viewoff').show();
        $('#viewon').hide();
        var message = "View Image turned OFF";
        writetologfile(message, 3);

        if ($(".pdtimgkitchendivdisplay1").css('display') !== "none") {
            loadsectionproductscontents("Yes");

        } else {
            loadsectionfilter();
        }
    });
});
function backpage() {
    window.location.href = "products.html";
}
function backpage1() {

    var c_page = getLS('page');
    var result = c_page.split(","), new_page;
    if (result.length === 1) {
        new_page = c_page.replace(result[result.length - 1], "");
        setLS('page', new_page);
    } else {
        new_page = c_page.replace(',' + result[result.length - 1], "");
        setLS('page', new_page);
    }

    $('#pdt').show();
    $('#productdesc').hide();
    $('#white_contentlistnewpdt').toggle();
    $(".pdtimgkitchendivdisplay1").show();
    ProductOverview();
}
function terms_condition() {
    var c_page = getLS('page');
    var result = c_page.split(",");
    if (result[result.length - 1] !== "terms") {
        setLS('page', c_page + ",terms");
    }

    $('.terms_condition').show();
    $('#fade').show();
}
function terms_conditioncls() {
    var c_page = getLS('page');
    var result = c_page.split(","), new_page;
    if (result.length === 1) {
        new_page = c_page.replace(result[result.length - 1], "");
        setLS('page', new_page);
    } else {
        new_page = c_page.replace(',' + result[result.length - 1], "");
        setLS('page', new_page);
    }

    $('.terms_condition').hide();
    $('#fade').hide();
}

// Function to show details of user selected product

function pdtdesc(itemid) {
    $("#loading_pdt").show();

    $.mobile.loading("show", {
        text: "Loading,Please Wait...",
        textVisible: true,
        theme: "a",
        textonly: true,
        html: "<span class='ui-bar ui-overlay-a ui-corner-all' style='text-align:center;background:#ccc'><img src='images/ajax-loader.gif'/><br/><h2 style='color:#304589'>Loading Products...</h2></span>"

    });

    var branch_code = getLS('default_branchcode');

    $.ajax({
        type: "GET",
        crossDomain: true,
        url: productScanURL + "itemno=" + itemid + "&branchcode=" + branch_code + "&cusno=" + CustomerNumber + "&username=" + UserProfile + "&deviceencryptedkey=" + encryptedkey + "&accesstoken=" + AccessTokenKey + "&splib=" + splib + "&tablelib=" + tablelib,
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
                var resultJSON = $Name.text().replace(/\t/g, '');
                //var resultJSON = $Name.text();
                var finalresult = "{" + resultJSON + "}";
                var output = $.parseJSON(finalresult);
                var list = output.BMCItms;

                var description = [];
                if (output.BMCItms.length > 0) {
                    var html = "";
                    $.each(list, function (i, item) {
                        var ItemOrProductDescription = item.ItemOrProductDescription;
                        var ItemUnitPriceAmount = item.ItemUnitPriceAmount;
                        var AVAILABLEQUNTY = item.AVAILABLEQUNTY;
                        var ItemStockingUnitOfMeasure = item.ItemStockingUnitOfMeasure;
                        var OurItemNumber = item.OurItemNumber;
                        var ItemVendorManufacturerIDNumber = item.ItemVendorManufacturerIDNumber;
                        var itemno = item.ItemVendorManufacturerIDNumber;
                        var PRODUCTIMAGE = item.PRODUCTIMAGE;
                        var Brand = item.Brand;
                        var InventoryItemWeight = item.InventoryItemWeight;
                        var OurProductNumber = item.OurProductNumber;

                        //Feature
                        var FEATURE1 = item.FEATURE1;
                        var FEATURE2 = item.FEATURE2;
                        var FEATURE3 = item.FEATURE3;
                        var FEATURE4 = item.FEATURE4;
                        var FEATURE5 = item.FEATURE5;
                        var FEATURE6 = item.FEATURE6;
                        var FEATURE7 = item.FEATURE7;
                        var FEATURE8 = item.FEATURE8;
                        var FEATURE9 = item.FEATURE9;
                        var FEATURE10 = item.FEATURE10;
                        var FEATURE11 = item.FEATURE11;
                        var FEATURE12 = item.FEATURE12;
                        var FEATURE13 = item.FEATURE13;
                        var FEATURE14 = item.FEATURE14;
                        var FEATURE15 = item.FEATURE15;
                        var FEATURE16 = item.FEATURE16;
                        var FEATURE17 = item.FEATURE17;
                        var FEATURE18 = item.FEATURE18;
                        var FEATURE19 = item.FEATURE19;
                        var FEATURE20 = item.FEATURE20;

                        description.push(FEATURE1);
                        description.push(FEATURE2);
                        description.push(FEATURE3);
                        description.push(FEATURE4);
                        description.push(FEATURE5);
                        description.push(FEATURE6);
                        description.push(FEATURE7);
                        description.push(FEATURE8);
                        description.push(FEATURE9);
                        description.push(FEATURE10);
                        description.push(FEATURE11);
                        description.push(FEATURE12);
                        description.push(FEATURE13);
                        description.push(FEATURE14);
                        description.push(FEATURE15);
                        description.push(FEATURE16);
                        description.push(FEATURE17);
                        description.push(FEATURE18);
                        description.push(FEATURE19);
                        description.push(FEATURE20);


                        html = html + '<div style="width: 48%;margin: 0 auto;"><img onerror="imgError(this);" style="margin-top: 122px;" class="imgdescdtl" src="' + productimagepath + PRODUCTIMAGE + '" onclick="storetolocal(' + OurItemNumber + ')" /></div>';

                        html = html + '<div style="width: 95%;"><label style="font-weight: bold;color: #304589; margin-left: -2px;">';
                        html = html + '<b>' + ItemOrProductDescription + '</b>';
                        html = html + '</label>';
                        html = html + '<br>';
                        if (isuserlogged === 'yes' && AVAILABLEQUNTY !== '0' && AVAILABLEQUNTY !== "") {
                            if (ItemUnitPriceAmount !== "" && ItemUnitPriceAmount !== "0" && ItemUnitPriceAmount !== 'CNF' && ItemUnitPriceAmount !== 0) {

                                html = html + '<div style="width: 95%;"><label style="font-weight: bold;color: #304589; margin-left: -2px;">';
                                html = html + '<b>Price : $' + parseFloat(ItemUnitPriceAmount).toFixed(2) + '/each</b></label></div>';
                                html = html + '<table style="margin-left: -5px">';
                                html = html + '<tr>';
                                html = html + '<td id="show_qty" style="font-weight: bold; color: #304589; width: 100%">';
                                html = html + 'Qty:<input type="number" onchange="handleChange(this);" oninput="maxLengthCheck(this)" min="1" max="99" maxlength="2" id="Idnumber-' + AVAILABLEQUNTY + '" style="text-align: center; width: 35px; height: 20px; margin-left: 10px;';
                                html = html + 'margin-right: 5px" value="1" type="number" />';
                                html = html + '</td>';
                                html = html + '<td id="show_addcart">';
                                html = html + '<a href="#" onclick=addtocart(2,"' + OurItemNumber + '","Idnumber-' + AVAILABLEQUNTY + '");><img style="width: 100px; height: 30px; cursor: pointer" src="images/add_to_cart.png" /></a>';
                                html = html + '</td>';
                                html = html + '<td id="show_addcart">';
                                html = html + '<a href="#" onclick=checkinventoryfun(' + OurItemNumber + '); ><img style="width: 100px; height: 30px; cursor: pointer" src="images/check_availability.png" /></a>';
                                html = html + '</td>';
                            }

                        }

                        html = html + '</tr>';
                        html = html + '<tr>';
                        html = html + '<td class="available">';
                        html = html + '<input type="hidden" id="backing6" />';
                        html = html + '</td>';
                        html = html + '</tr>';
                        html = html + '</table>';
                        html = html + '</div>';

                        var desc = "";
                        desc = desc + '<div style="border:1px solid #ccc;">';
                        if (description.length >= 0) {
                            desc = desc + '<ul>';
                            var regex = /[a-zA-Z]/;
                            var count = 0;
                            for (var m = 0; m < description.length; m++) {
                                if (description[m] !== "" && description[m] !== null && regex.test(description[m])) {
                                    desc = desc + '<li>';
                                    desc = desc + '<p style="padding:5px">' + description[m] + '.</p>';
                                    desc = desc + '</li>';
                                    count++;
                                }
                            }
                            desc = desc + '</ul>';
                            if (count === 0) {
                                desc = '<div style="border:1px solid #ccc;"><div style="min-height:70px;text-align:center;color:red;margin-top: 50px">No Description Available</div>';
                            }
                        }
                        else {
                            desc = desc + '<div style="min-height:70px;text-align:center;color:red;margin-top: 50px">No Description Available</div>';
                        }

                        desc = desc + '</div>';

                        var menu = "";

                        menu = menu + '<div class="addclass" id="lblProductdiv" style="width: 50%; float: left;  height: 40px;';
                        menu = menu + 'text-align: center; line-height: 36px; padding: 0;" onclick="ProductOverview()">';
                        menu = menu + '<label style="cursor: pointer;font-size: 17px;">';
                        menu = menu + 'Product Overview </label>';
                        menu = menu + '</div>';
                        menu = menu + '<div class="backgroundcolor"  onclick="Specification(' + OurItemNumber + ')" id="lblSpecificationdiv" style="width: 50%; float: left; ';
                        menu = menu + 'height: 40px; text-align: center; line-height: 36px; padding: 0;">';
                        menu = menu + '<label style="width: 50%;margin-left:5%;font-size: 17px;" >';
                        menu = menu + 'Specification</label>';
                        menu = menu + '</div>';



                        $("#tpmenu").html(menu);



                        setLS('pItemOrProductDescription', ItemOrProductDescription);
                        setLS('pOurProductNumber', OurProductNumber);
                        setLS('pOurItemNumber', OurItemNumber);
                        setLS('pInventoryItemWeight', InventoryItemWeight);
                        setLS('pItemVendorManufacturerIDNumber', ItemVendorManufacturerIDNumber);
                        setLS('pBrand', Brand);

                        $("#prdtdesc").html(html);
                        $("#productdesc").show();
                        $(".pdtimgkitchendivdisplay1").hide();
                        $("#pdtoverview").html(desc);

                        $.mobile.loading("hide");
                        $("#loading_pdt").hide();
                    });
                }
            }
            catch (e) {
                navigator.notification.alert(e, null, 'Connection Failed', 'OK');
                $.mobile.loading("hide");
                $("#loading_pdt").hide();
            }

        }, error: function (data, errorThrown) {
            navigator.notification.alert('Unable to connect server.Please try again later!', null, 'Connection Failed', 'OK');
            $.mobile.loading("hide");
            $("#loading_pdt").hide();
        }
    });
}

function loginclose() {
    var c_page = getLS('page');
    var result = c_page.split(","), new_page;
    if (result.length === 1) {
        new_page = c_page.replace(result[result.length - 1], "");
        setLS('page', new_page);
    } else {
        new_page = c_page.replace(',' + result[result.length - 1], "");
        setLS('page', new_page);
    }

    document.getElementById('loginpopup').style.display = 'none';
    $("#fade").hide();
}

//Page load function for product categories

function product_pageload() {
    var encryptedkey = getLS('encryptedkey');

    if (encryptedkey === null) {
        setencryptedkey();
    }
    else {

        productPageLoad2(); // function to save all the branches details to localDB
    }
}

function productPageLoad2() {
    var defaultBranchCode = getLS('default_branchcode');
    if (defaultBranchCode === "" || defaultBranchCode === null) {
        setLS('default_branchcode', defaultbranchcode);
        setLS('default_branchname', defaultbranchname);
        setLS('default_branchcode1', defaultbranchcode);
        setLS('default_branchname1', defaultbranchname);
    }

    $("#loading_pdt").show();

    $.mobile.loading("show", {
        text: "Loading,Please Wait...",
        textVisible: true,
        theme: "a",
        textonly: true,
        html: "<span class='ui-bar ui-overlay-a ui-corner-all' style='text-align:center;background:#ccc'><img src='images/ajax-loader.gif'/><br/><h2 style='color:#304589'>Loading Products...</h2></span>"

    });
    var branchname = getLS('default_branchname');
    var branch_id = getLS('default_branchcode');
    var BranchName1 = getLS('default_branchname');

    $("#current_branch").html(BranchName1);
    $("#lblbranchname").html("&nbsp;[" + BranchName1 + "]");
    loadsectionfilter();
}


//Function for handling login popup in product page

function submitlogin() {
    var accountno = $("#txtaccno").val().trim();
    var username = $("#txtuser").val().trim();
    var password = $("#txtpwd").val().trim();
    var numbers = /^[0-9]+$/;

    var branch_code = getLS('Current_branch');
    if (accountno === "") {

        navigator.notification.alert('Please enter account no.', null, 'Authentication', 'OK');
        return false;
    }

    else if (!numbers.test(accountno)) {

        navigator.notification.alert('Please enter valid account no.', null, 'Authentication', 'OK');
        $("#txtaccno").val('');
        return false;
    }
    else if (username === "") {
        navigator.notification.alert('Please enter username.', null, 'Authentication', 'OK');

        return false;
    }
    else if (password === "") {

        navigator.notification.alert('Please enter password.', null, 'Authentication', 'OK');
        return false;
    }
    $("#fadelogin").show();
    submitButton('2');

}

//Function for validating product quantity entered by user

function handleChange(input) {

}

function loginpopup() {
    var c_page = getLS('page');
    var result = c_page.split(",");
    if (result[result.length - 1] !== 'loginpopup') {
        setLS('page', c_page + ",loginpopup");
    }
    $("#fade").show();
    $("#loginpopup").show();
}

function pdtimgkitchendivdisplay2() {
    $("#filterdiv").hide();
    $(".searchdiv").hide();
    $(".pdtimgkitchendivdisplay2").show();
    $(".pdtimgdivdisplay").hide();
}
function pdtimgkitchendivdisplay3() {
    $("#filterdiv").hide();
    $(".searchdiv").hide();
    $(".pdtimgkitchendivdisplay3").show();
    $(".pdtimgdivdisplay").hide();
}
function pdtimgkitchendivdisplay4() {
    $("#filterdiv").hide();
    $(".searchdiv").hide();
    $(".pdtimgkitchendivdisplay4").show();
    $(".pdtimgdivdisplay").hide();
}
function filter() {
    $("#default_div").show();
    $(".searchdiv ").show();
    $("#filterdiv").show();
    $("#backdiv").show();
    $("#kitchendiv").hide();
    $("#bathroomdiv").hide();
    $("#storagediv").hide();
    $("#Lightdiv").hide();
    $("#kitchensubdiv").hide();
    $(".pdtimgkitchendivdisplay1").hide();
    $(".pdtimgkitchendivdisplay2").hide();
    $(".pdtimgkitchendivdisplay3").hide();
    $(".pdtimgkitchendivdisplay4").hide();
    $("#backbuttongrid").hide();
    $("#img_previous").hide();
    $("#img_next").hide();
    setLS('secname', null);

    var c_page = getLS('page');
    var result = c_page.split(",");
    if (result[result.length - 1] !== 'filter') {
        setLS('page', c_page + ",filter");
    }
}
function filterout() {
    $("#filterdiv").hide();
}

function filterbathrrom() {
    document.getElementById('kitchendiv').style.display = 'none';
    $("#bathroomdiv").slideToggle();
    document.getElementById('storagediv').style.display = 'none';
    document.getElementById('Lightdiv').style.display = 'none';
    document.getElementById('kitchensubdiv').style.display = 'none';

}

function filterstorage() {
    document.getElementById('kitchendiv').style.display = 'none';
    document.getElementById('bathroomdiv').style.display = 'none';
    $("#storagediv").slideToggle();
    document.getElementById('Lightdiv').style.display = 'none';
    document.getElementById('kitchensubdiv').style.display = 'none';

}
function filterlight() {
    document.getElementById('kitchendiv').style.display = 'none';
    document.getElementById('bathroomdiv').style.display = 'none';
    document.getElementById('storagediv').style.display = 'none';
    $("#Lightdiv").slideToggle();
    document.getElementById('kitchensubdiv').style.display = 'none';

}

function backcategory() {

    var c_page = getLS('page');
    var result = c_page.split(","), new_page;
    if (result.length === 1) {
        new_page = c_page.replace(result[result.length - 1], "");
        setLS('page', new_page);
    } else {
        new_page = c_page.replace(',' + result[result.length - 1], "");
        setLS('page', new_page);
    }

    $(".pdtimgdivdisplay").show();
    $("#filterdiv").slideToggle();
    $(".pdtimgdivdisplay").show();
    $(".pdtimgkitchendivdisplay1").hide();
    $(".pdtimgkitchendivdisplay2").hide();
    $(".pdtimgkitchendivdisplay3").hide();
    $(".pdtimgkitchendivdisplay4").hide();
    $("#backdiv").show();
    $("#kitchendiv").hide();
    $("#bathroomdiv").hide();
    $("#storagediv").hide();
    $("#Lightdiv").hide();

    $("#kitchensubdiv").hide();

    loadsectionfilter();
}
function backcategorypdt() {
    filter();
    $(".searchdiv").show();
    $("#default_div").show();
}

$(function () {
    $('#locationfinder_product').click(function () {
        $('.white_contentlistnewpdt').toggle();
        loadmenu_product(2);
    })

});

//Function to be called after user selected check inventory button in branch information pop up

function checkinventory(branch_id) {

    if (isuserlogged === 'yes') {
        var getBranchName = getLS('default_branchname2');
        var getBranchCode = getLS('default_branchcode2');

        setLS('default_branchcode', getBranchCode);
        setLS('Current_branch', getBranchCode);
        setLS('default_branchname', getBranchName);
        writetologfile("Checked inventory-Branch Name: " + getBranchName, 1);
    }
    else {
        var c_page = getLS('page');
        var result = c_page.split(",");
        if (result[result.length - 1] !== 'newlogin') {
            setLS('page', c_page + ",newlogin");
        }

        $("#loading_pdt").hide();
        $.mobile.loading("hide");
        window.location.href = 'login.html';
    }

}


// This Function is used to get the products based on section,gropucode and category code and load the contents to table iteminfo

function pdtimgkitchendivdisplay(sec, group, cate, id) {
    setLS('breadlast', id.replace(/_/g, " "));
    $("#descriptioncat").html(id.replace(/_/g, " "));
    setLS('IsNewFilterAttributes', 'Yes');
    pdtimgkitchendivdisplay1(sec, group, cate);
}



function pdtimgkitchendivdisplay1(sectioncode, groupcode, categorycode) {
    $("#filternavigation").show();
    var from_count, to_count, path, filterbackbutton, c_page, result, linkimage, branch_code, sectionname, groupname, sectname, categoryname, sectionname1;
    from_count = 1;
    to_count = TotalProductCount;

    setLS('F_Sectioncode', sectioncode);
    setLS('F_Groupcode', groupcode);
    setLS('F_Categorycode', categorycode);

    localStorage.removeItem('breadcrumb');
    setLS('currentview', getLS('viewimg'));
    myFuncCalls = 0;
    filterbackbutton = getLS('filterbackbutton');
    $("#txtpdtsrch").val("");
    c_page = getLS('page');
    result = c_page.split(",");
    if (filterbackbutton === 'filter') {

        if (result[result.length - 1] !== "filterselection") {
            setLS('page', c_page + ",filterselection");
        }
    }
    else {

        if (result[result.length - 1] !== "filterresult") {
            setLS('page', c_page + ",filterresult");
        }
    }

    setLS('filterbackbutton', 'none');
    setLS('showmoreproducts', 'filter');
    branch_code = getLS('default_branchcode');
    sectionname = getLS('Filter_sectionname');
    groupname = getLS('Filter_groupname');
    categoryname = getLS('Filter_categoryname');
    sectionname1 = getLS('F_HSCODE');
    sectname = "";

    if (sectionname1 !== "" && sectionname1 !== null && sectionname1 !== 'null') {
        sectname = sectionname1;
    }
    else {
        sectname = "";
    }

    linkimage = '<img src="images/next.png" class="linkimgpath">';

    path = "<span>" + sectionname + "</span>";
    if (groupname !== null && groupname !== 'null') {
        path = path + linkimage + "<span>" + groupname + "</span>";
    }

    if (categoryname !== null && categoryname !== 'null') {
        path = path + linkimage + "<span>" + categoryname + "</span>";
    }

    setLS('SEC_CODE', sectioncode);
    $("#loading_pdt").show();

    $.mobile.loading("show", {
        text: "Loading,Please Wait...",
        textVisible: true,
        theme: "a",
        textonly: true,
        html: "<span class='ui-bar ui-overlay-a ui-corner-all' style='text-align:center;background:#ccc'><img src='images/ajax-loader.gif'/><br/><h2 style='color:#304589'>Loading Products...</h2></span>"

    });

    GlobalItemsList.length = 0;
    $.ajax({
        type: "GET",
        crossDomain: true,
        url: filtersearchURL + "SecName=" + sectname + "&SectionCode=" + sectioncode + "&GroupCode=" + groupcode + "&CategoryCode=" + categorycode + "&StartIndex=" + from_count + "&EndIndex=" + to_count + "&brchcode=" + branch_code + "&cusno=" + CustomerNumber + "&username=" + UserProfile + "&deviceencryptedkey=" + encryptedkey + "&accesstoken=" + AccessTokenKey + "&splib=" + splib + "&tablelib=" + tablelib + "&timestamp=" + Math.random(),
        dataType: "xml",
        success: function (xmlData) {
            var dbinsert = window.openDatabase("blackman", "1.0", "blackman", 2 * 1024 * 1024);       /* opening local database */
            dbinsert.transaction(function branchdetails(tx) {
                tx.executeSql('DROP TABLE IF EXISTS  iteminfo');
                tx.executeSql('CREATE TABLE IF NOT EXISTS iteminfo (id INTEGER PRIMARY KEY AUTOINCREMENT,OurItemNumber,OurProductNumber,ItemOrProductDescription,ItemStockingUnitOfMeasure,InventoryItemWeight,PRODUCTIMAGE,AVAILABLEQUNTY,ItemUnitPriceAmount,BRANCH,STOCK)');
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
                var resultJSON = $Name.text().replace(/\t/g, '');
                var finalresult = "{" + resultJSON + "}";
                var output = $.parseJSON(finalresult);
                var list = output.BMCItms;
                var html = "";
                if (output.BMCItms.length > 0) {
                    $.each(list, function (i, item) {
                        var OurItemNumber = item.OurItemNumber;
                        var OurProductNumber = item.OurProductNumber;
                        var ItemOrProductDescription = item.ItemOrProductDescription;
                        var ItemStockingUnitOfMeasure = item.ItemStockingUnitOfMeasure;
                        var InventoryItemWeight = item.InventoryItemWeight;
                        var PRODUCTIMAGE = item.PRODUCTIMAGE;
                        var AVAILABLEQUNTY = item.AVAILABLEQUNTY;
                        var ItemUnitPriceAmount = item.ItemUnitPriceAmount;
                        var BRANCH = item.BRANCH;
                        var STOCK = item.STOCK;
                        GlobalItemsList.push(OurItemNumber);
                        if (ItemUnitPriceAmount === 0 || ItemUnitPriceAmount === "0" || ItemUnitPriceAmount === "" || ItemUnitPriceAmount === null || ItemUnitPriceAmount === "CNF") {
                            ItemUnitPriceAmount = "0";
                        }

                        var qry = 'INSERT INTO iteminfo (OurItemNumber,OurProductNumber,ItemOrProductDescription,ItemStockingUnitOfMeasure,InventoryItemWeight,PRODUCTIMAGE,AVAILABLEQUNTY,ItemUnitPriceAmount,BRANCH,STOCK) VALUES (?,?,?,?,?,?,?,?,?,?)';

                        tx.executeSql(qry, [OurItemNumber, OurProductNumber, ItemOrProductDescription, ItemStockingUnitOfMeasure, InventoryItemWeight, PRODUCTIMAGE, AVAILABLEQUNTY, ItemUnitPriceAmount, BRANCH, STOCK]);

                    });
                }
                setLS('product_count', to_count);
                loadsectionproductscontents('Yes');

            }, errorCB);
        }, error: function (data, errorThrown) {
            navigator.notification.alert('Unable to connect server.Please try again later!', null, 'Connection Failed', 'OK');
            $.mobile.loading("hide");
            $("#loading_pdt").hide();
        }
    });
}

// This  function is used to get the products from the Iteminfo table and display it to the user

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

var myFuncCalls = 0;

function loadsectionproductscontents(FirstLoad) {

    var breadlist1 = getLS('breadlist1');
    var breadlist2 = getLS('breadlist2');
    var breadlist3 = getLS('breadlist3');
    var breadlast = getLS('breadlast');


    htmltext = "";

    htmltext = htmltext + '<div id="mybackbuttoncustom" style="text-align:left;float:left" onclick="pdoductpagereload()">   <img src="images/arrow_previous.png" /></div>';
    htmltext = htmltext + '<div id="notsearch"  style="margin-top: 8px;font-weight:bold;color:#304589;font-size:10px" >';
    if (breadlist1 !== "") {
        htmltext = htmltext + '<span id="breadlist1" style="font-size:10px" onclick="breadcrumlist1()">' + breadlist1 + '</span><img src="images/next.png" style="width:9px" class="nxtimgclass" />';
    }
    if (breadlist2 !== "") {
        htmltext = htmltext + '<span id="breadlist2" style="font-size:10px" onclick="breadcrumlist2()">' + breadlist2 + '</span><img src="images/next.png" style="width:9px" class="nxtimgclass" />';
    }
    if (breadlist3 !== "") {
        htmltext = htmltext + '<span id="breadlist3" style="font-size:10px" onclick="breadcrumlist3()">' + breadlist3 + '</span><img src="images/next.png" style="width:9px" class="nxtimgclass" />';
    }
    htmltext = htmltext + '<span id="breadlistlast" style="font-size:10px" onclick="breadcrumlist4()"> ' + breadlast + '</span></div>';
    htmltext = htmltext + '<div id="search"  style="margin-top: 8px;font-weight:bold;color:#304589;font-size:12px" > <label id="breadlistsearch" style="font-size:14px"/></div>';
    $(".breadcrumstylefilter").html(htmltext);
    $(".breadcrumstylefilter").show();
    $("#notsearch").show();
    $("#search").hide();
    myFuncCalls = 0;

    var view = getLS('viewimg');
    var limit = getLS('product_count');

    if (getLS('breadcrumb') === 'search') {
        var searchtext = $("#txtpdtsrch").val().trim();
        if (searchtext === "" || searchtext === null) {
            navigator.notification.alert('Please enter product name.', null, 'Alert', 'OK');

            return false;
        }
        document.getElementById("breadlistsearch").innerHTML = "Search text : " + searchtext;

        $("#notsearch").hide();
        $("#search").show();
        $("#mybackbuttoncustom").attr("onclick", "pdtimgkitchendivdisplaynew1back()");

    }
    var showitems = window.openDatabase("blackman", "1.0", "blackman", 2 * 1024 * 1024);
    showitems.transaction(function showitemsbybranch(tx) {
        var html = '';

        if (getLS('Isuserlogged') === 'yes') {
            html = html + '<table  id="filternavigation" style="width:100%;background:#304589;text-align:center;color:#fff;height: 36px" > <tr><td style="text-decoration:underline;" onclick="filterselection1()"><img src="images/filte.png" style="width: 20px; height: 20px; margin-bottom: -3px;margin-left:4px;margin-top:4px;float:left" /><label  class="signinbtn1" style="float: left; font-size: 12px; margin-top: 7px">FILTERS</label></td></tr></table>';
        }
        else {
            html = html + '<table  id="filternavigation" style="width:100%;background:#304589;color:#fff;height: 36px" > <tr><td style="text-decoration:underline;width:48%;float:left" onclick="filterselection1()"><img src="images/filte.png" style="width: 20px; height: 20px; margin-bottom: -3px;margin-left:4px;margin-top:4px;float:left" /><label  class="signinbtn1" style="float: left; font-size: 12px; margin-top: 7px">FILTERS</label></td><td style="text-decoration:underline;width:50%;float:right">          <label onclick="loginpopup()" class="signinbtn" style="font-size: 12px; margin-top: 7px"><img src="images/lock.png" style="width: 14px; height: 14px; margin-bottom: -2px;" /> SIGN IN TO GET PRICES</label></td></tr></table>';
        }

        tx.executeSql('select * from iteminfo', [], function itembranchsucces(txx, res) {
            if (res.rows.length) {

                html = html + '<table class="tableproducts1" style="border:none;width:100%;">';

                var imageexistrowcount = 0;


                for (var i = 0; i < res.rows.length; i++) {
                    var ss = res.rows.item(i);
                    var itemid = ss.id;
                    var itemname = ss.ItemOrProductDescription;
                    var OurListUnitPriceCompany = ss.ItemUnitPriceAmount;
                    var OurItemNumber = ss.OurItemNumber;
                    var AVAILABLEQUNTY = ss.AVAILABLEQUNTY;
                    var PRODUCTIMAGE = ss.PRODUCTIMAGE;
                    var STOCK = ss.STOCK;

                    html = html + '<tr><td style="border: 1px solid #ccc;"><table><td>';
                    html = html + '<tr  class="trclasspdt">';
                    html = html + '<td onclick="storetolocal(' + OurItemNumber + ')"  class="pdtimg" style="width:30%;vertical-align: top;border:none">';
                    html = html + '<img onerror="imgError(this);" src="' + productimagepath + PRODUCTIMAGE + '" class="imgpdtpdt" style="border:none;" />';
                    html = html + '</td>';
                    html = html + '<td  class="pdtimg lineheight" style="border-right:none;vertical-align:top;width:70%;border:none;font-size: 14px;"><table><tr><td><label><b class="positionleftalign">' + itemname + '</b></label><br />';
                    html = html + '<label style="float:left;width:100%">Item # ' + OurItemNumber + '</label>';
                    html = html + '<br />';
                    if (isuserlogged === 'yes') {
                        if (AVAILABLEQUNTY !== '0' && AVAILABLEQUNTY !== "" && STOCK !== "N") {
                            if (OurListUnitPriceCompany !== "" && OurListUnitPriceCompany !== "0" && OurListUnitPriceCompany !== 'CNF' && OurListUnitPriceCompany !== 0) {
                                html = html + '<label id="lblship"  style="color:green;font-size: 13px">Ready To Ship</label>';
                            }
                        }
                        else {

                            if (OurListUnitPriceCompany !== "" && AVAILABLEQUNTY >= 0 && OurListUnitPriceCompany !== "0" && OurListUnitPriceCompany !== 'CNF' && OurListUnitPriceCompany !== 0) {
                                var branch_id = getLS('default_branchcode');
                                if (branch_id !== 100) {
                                    html = html + '<label id="lblship" style="color:Red;font-size: 13px">Out Of Stock [Available In WareHouse]</label>';
                                }
                                else {
                                    html = html + '<label id="lblship" style="color:Red;font-size: 13px">Out Of Stock</label>';
                                }
                            }

                        }
                    }

                    html = html + '</td></tr>';

                    if (isuserlogged === 'yes' && AVAILABLEQUNTY !== '0' && AVAILABLEQUNTY !== "") {
                        var textboxid = 'Idnumber' + i + '-' + AVAILABLEQUNTY + '';

                        if (OurListUnitPriceCompany !== "" && OurListUnitPriceCompany !== "0" && OurListUnitPriceCompany !== 'CNF' && OurListUnitPriceCompany !== 0) {

                            html = html + '</table> ';
                            html = html + '<label class="hide" style="margin-left:3px">Price : $' + parseFloat(OurListUnitPriceCompany).toFixed(2) + '</label> ';
                            html = html + '</td>';
                            html = html + '<td onclick="storetolocal(' + OurItemNumber + ')" style="padding-top: 40px;" >';
                            html = html + '<img src="images/ListRightArrow.png" style="width:26px;height:26px;float: right;margin-right: 20px;"/>';
                            html = html + '</td>';
                            html = html + '</tr>';
                            html = html + '<tr><td><table style="margin: 0 auto;"><tr><td><label class="hide" style="float:left;font-size: 15px;margin-left:1px">Qty : </label><div style="float:left;margin-left:2px;margin-top:-2px"><input id="' + textboxid + '" maxlength="2" oninput="maxLengthCheck(this)" min="1" max="99" class="hide" onchange="handleChange(this);" style="text-align:center;width: 30px;height:16px;" value="1" /> </div> </td></tr></table></td><td><table><tr><td><a href="#" onclick=checkinventoryfun(' + OurItemNumber + '); ><img class="cartimg hide"  src="images/check_availability.png" style="height:auto" /></a></td><td><a href="#" onclick=addtocart(1,"' + OurItemNumber + '","' + textboxid + '"); ><img class="cartimg hide"  src="images/add_to_cart.png" style="height:auto" /></td></tr></table></td></tr>';
                            html = html + '</table></td></tr>';
                        }
                        else {
                            html = html + '</table> ';
                            html = html + '<div style="width: 100%;color: black;font-size: 12px;margin-left:3px"><label class="hide lbl_' + OurItemNumber + '" style="font-weight:bold;margin-left: 3px;">';
                            html = html + '<img class="imagemtop" src="images/textbox-loader.gif" style="width: 16px;height: 16px;float: left;">Loading Price...</label></div>'; //TextBoxLoader
                            html = html + '</td>';
                            html = html + '<td onclick="storetolocal(' + OurItemNumber + ')" >';
                            html = html + '<img src="images/ListRightArrow.png" style="width:26px;height:26px;float: right;margin-right: 20px;"/>';
                            html = html + '</td>';
                            html = html + '</tr>';
                            html = html + '</table></td></tr>';
                        }


                    }
                    else if (isuserlogged === 'yes') {

                        html = html + '</table> ';
                        html = html + '</td>';
                        html = html + '<td onclick="storetolocal(' + OurItemNumber + ')" >';
                        html = html + '<img src="images/ListRightArrow.png" style="width:26px;height:26px;float: right;margin-right: 20px;"/>';
                        html = html + '</td>';
                        html = html + '</tr>';
                        html = html + '</table></td></tr>';
                    }
                    else {
                        html = html + '</table> ';
                        html = html + '</td>';
                        html = html + '<td onclick="storetolocal(' + OurItemNumber + ')" >';
                        html = html + '<img src="images/ListRightArrow.png" style="width:26px;height:26px;float: right;margin-right: 20px;"/>';
                        html = html + '</td>';
                        html = html + '</tr>';
                        html = html + '</table></td></tr>';
                    }

                }
                html = html + '</table>';
                if (res.rows.length >= limit) //show or hide loadmorebutton
                {

                    html = html + '<div style="width:100%;text-align:center;padding: 10px 0px 10px 0px;">';
                    html = html + '<a href="javascript:void(0)" onclick="loadmoreproducts()"><img src="images/show_more.png" style="width:165px;height:30px; margin-bottom:-3px;"/><a>';
                    html = html + '</div>';
                }

                $(".pdtloadlistdiv").show();
                $("#filterselctiondiv").hide();
                $(".tableproducts1filter").hide();
                $(".cleardivivfilter").hide();
                $("#loaditems123").html(html);
                $("#filternavigation").show();
                $("#loading_pdt").hide();
                $.mobile.loading("hide");

                if (isuserlogged === "yes") {
                    if (FirstLoad === "Yes") {
                        ShowUserPrices();
                    }
                }

            }
            else {
                html = html + "<div style='margin-bottom:45%;margin-top:45%;width: 100%;text-align: center;color: red;font-family: calibri;font-size: 16px;'>";
                html = html + "<span>No products found.</span></div>";

                $("#loaditems123").html(html);
                $("#filternavigation").hide();
                $(".tableproducts1filter").hide();
                $(".cleardivivfilter").hide();
                $("#filterselctiondiv").hide();
                $("#loading_pdt").hide();
                $.mobile.loading("hide");
            }

        });

    });

    $("#loaditems123").show();
    $("#filterdiv").hide();
    $(".searchdiv").hide();
    $(".pdtimgkitchendivdisplay1").show();
    $(".pdtimgdivdisplay").hide();
    $("#default_div").hide();
    $(".pdtimgkitchendivdisplay1").css('margin-top', '0px');

    if (isuserlogged === 'yes') {
        $(".hide").show();
        $(".signinbtn").hide();
    }
    else {
        $(".hide").hide();
        $(".signinbtn").show();
    }

}
var GlobalItemsList = [];
function ShowUserPrices() {

    var showitems = window.openDatabase("blackman", "1.0", "blackman", 2 * 1024 * 1024);
    //Update the global variable values
    AccessTokenKey = getLS('AccessTokenKey');
    if (AccessTokenKey === null) { AccessTokenKey = ""; }
    CustomerNumber = getLS('CustomerNumber');
    if (CustomerNumber === null) { CustomerNumber = ""; }
    user_ID = getLS('UserID');
    if (user_ID === null) { user_ID = ""; }
    UserProfile = getLS('UserProfile');
    if (UserProfile === null) { UserProfile = ""; }
    isuserlogged = getLS('Isuserlogged');
    UserName = getLS('UserName');
    if (UserName === null) { UserName = ""; }
    Isvalid = 'N';
    if (isuserlogged === 'yes') { Isvalid = "Y"; }

    $.ajax({
        type: "GET",
        crossDomain: true,
        url: PriceServiceURL + 'cusno=' + CustomerNumber + '&itemno=' + GlobalItemsList.join(","),
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
            var xmlreturndata = xml.firstChild;
            var data = getNodeText(xmlreturndata);
            var finalresult = "{" + data + "}";
            var outputresult = $.parseJSON(finalresult);
            var list = outputresult.BMCPrice;
            if (outputresult.BMCPrice.length > 0) {
                showitems.transaction(function showitemsbybranch(tx) {

                    $.each(list, function (i, item) {
                        var ItemNumber = item.ItemNumber;
                        var ListPrice = item.NetPrice;

                        qry = 'UPDATE iteminfo SET ItemUnitPriceAmount=' + ListPrice + ' WHERE OurItemNumber=?';
                        //alert(qry);
                        tx.executeSql(qry, [ItemNumber]);

                    });
                });

                loadsectionproductscontents("No"); //Show the prices

            }

        }, error: function (data, errorThrown) {
            $("#unabletoconnectserver").show();
            $('html,body').animate({ scrollTop: 0 }, 800);
        }
    });

}

function getNodeText(xmlNode) {
    if (!xmlNode) return '';
    if (typeof (xmlNode.textContent) !== "undefined") return xmlNode.textContent;
    return xmlNode.firstChild.nodeValue;
}

function imgErrortest(image) {
    myFuncCalls++;
    var count = getLS('testcount');

    if (2 * count === myFuncCalls) {


        html = "";
        html = html + "<div style='margin-bottom:45%;margin-top:45%;width: 100%;text-align: center;color: red;font-family: calibri;font-size: 16px;'>";
        html = html + "<span>No products found.</span></div>";
        myFuncCalls = 0;
        $("#loaditems123").html(html);
    }

}




// Function to show more products

function loadmoreproducts() {
    GlobalItemsList.length = 0;
    var AccessTokenKey = "";
    if (getLS('AccessTokenKey') === null || getLS('AccessTokenKey') === "") {
        AccessTokenKey = "";
    }
    else {
        AccessTokenKey = getLS('AccessTokenKey');
    }
    var product_count, from_count, to_count;
    var showmoreproducts = getLS('showmoreproducts');
    if (showmoreproducts === 'filter') {

        $("#loading_pdt").show();
        $.mobile.loading("show", {
            text: "Loading,Please Wait...",
            textVisible: true,
            theme: "a",
            textonly: true,
            html: "<span class='ui-bar ui-overlay-a ui-corner-all' style='text-align:center;background:#ccc'><img src='images/ajax-loader.gif'/><br/><h2 style='color:#304589'>Loading Products...</h2></span>"

        });

        var branch_code = getLS('default_branchcode');
        var sectioncode = getLS('F_Sectioncode');
        var GroupCode = getLS('F_Groupcode');
        var CategoryCode = getLS('F_Categorycode'), sectioncode1, GroupCode1, CategoryCode1;

        if (sectioncode !== null && sectioncode !== "" && sectioncode !== 'null') {
            sectioncode1 = sectioncode;
            GroupCode1 = GroupCode;
            CategoryCode1 = CategoryCode;
        }
        else {
            sectioncode1 = getLS('SEC_CODE');;
            GroupCode1 = "";
            CategoryCode1 = "";
        }
        product_count = getLS('product_count');
        from_count = parseInt(product_count, 10) + 1;
        to_count = parseInt(from_count, 10) + ToNextCount;

        var sectionname1 = getLS('F_HSCODE');
        var sectname = "";
        if (sectionname1 !== "" && sectionname1 !== null && sectionname1 !== 'null') {
            sectname = sectionname1;
        }
        else {
            sectname = "";
        }

        $.ajax({
            type: "GET",
            crossDomain: true,
            url: filtersearchURL + "SecName=" + sectname + "&SectionCode=" + sectioncode1 + "&GroupCode=" + GroupCode1 + "&CategoryCode=" + CategoryCode1 + "&StartIndex=" + from_count + "&EndIndex=" + to_count + "&brchcode=" + branch_code + "&cusno=" + CustomerNumber + "&username=" + UserProfile + "&deviceencryptedkey=" + encryptedkey + "&accesstoken=" + AccessTokenKey + "&splib=" + splib + "&tablelib=" + tablelib,
            dataType: "xml",
            success: function (xmlData) {
                var dbinsert = window.openDatabase("blackman", "1.0", "blackman", 2 * 1024 * 1024);       /* opening local database */
                dbinsert.transaction(function branchdetails(tx) {
                    tx.executeSql('CREATE TABLE IF NOT EXISTS iteminfo (id INTEGER PRIMARY KEY AUTOINCREMENT,OurItemNumber,OurProductNumber,ItemOrProductDescription,ItemStockingUnitOfMeasure,InventoryItemWeight,PRODUCTIMAGE,AVAILABLEQUNTY,ItemUnitPriceAmount,BRANCH,STOCK)');
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

                    var resultJSON = $Name.text().replace(/\t/g, '');
                    var finalresult = "{" + resultJSON + "}";
                    var output = $.parseJSON(finalresult);
                    var list = output.BMCItms;
                    var html = "";
                    if (output.BMCItms.length > 0) {
                        $.each(list, function (i, item) {
                            var OurItemNumber = item.OurItemNumber;
                            var OurProductNumber = item.OurProductNumber;
                            var ItemOrProductDescription = item.ItemOrProductDescription;
                            var ItemStockingUnitOfMeasure = item.ItemStockingUnitOfMeasure;
                            var InventoryItemWeight = item.InventoryItemWeight;
                            var PRODUCTIMAGE = item.PRODUCTIMAGE;
                            var AVAILABLEQUNTY = item.AVAILABLEQUNTY;
                            var ItemUnitPriceAmount = item.ItemUnitPriceAmount;
                            var BRANCH = item.BRANCH;
                            var STOCK = item.STOCK;

                            GlobalItemsList.push(OurItemNumber);

                            if (ItemUnitPriceAmount === 0 || ItemUnitPriceAmount === "0" || ItemUnitPriceAmount === "" || ItemUnitPriceAmount == null || ItemUnitPriceAmount === "CNF") {
                                ItemUnitPriceAmount = "0";
                            }
                            var qry = 'INSERT INTO iteminfo (OurItemNumber,OurProductNumber,ItemOrProductDescription,ItemStockingUnitOfMeasure,InventoryItemWeight,PRODUCTIMAGE,AVAILABLEQUNTY,ItemUnitPriceAmount,BRANCH,STOCK) VALUES (?,?,?,?,?,?,?,?,?,?)';

                            tx.executeSql(qry, [OurItemNumber, OurProductNumber, ItemOrProductDescription, ItemStockingUnitOfMeasure, InventoryItemWeight, PRODUCTIMAGE, AVAILABLEQUNTY, ItemUnitPriceAmount, BRANCH, STOCK]);
                        });
                    }
                    setLS('product_count', to_count);
                    loadsectionproductscontents('Yes');
                }, errorCB);
            }, error: function (data, errorThrown) {
                navigator.notification.alert('Unable to connect server.Please try again later!', null, 'Connection Failed', 'OK');
                $.mobile.loading("hide");
                $("#loading_pdt").hide();
            }
        });
    }
    else if (showmoreproducts === 'filterproducts') {
        product_count = getLS('product_count');
        FromCount = parseInt(product_count, 10) + 1;
        ToCount = parseInt(product_count, 10) + TotalProductCount;
        GetProductsBasedOnFilter(AttributeName, AttributeValue, FromCount, ToCount)
    }
    else {

        $("#loading_pdt").show();
        $.mobile.loading("show", {
            text: "Loading,Please Wait...",
            textVisible: true,
            theme: "a",
            textonly: true,
            html: "<span class='ui-bar ui-overlay-a ui-corner-all' style='text-align:center;background:#ccc'><img src='images/ajax-loader.gif'/><br/><h2 style='color:#304589'>Loading Products...</h2></span>"

        });

        product_count = getLS('product_count');
        from_count = parseInt(product_count, 10) + 1;
        to_count = parseInt(from_count, 10) + ToNextCount;
        var branch_id = getLS('default_branchcode');
        var searchtext = $("#txtpdtsrch").val().trim();

        searchtext = searchtext.split(" ");
        var result = "";
        for (var i = 0; i < searchtext.length; i++) {

            if (i === searchtext.length - 1) {
                result = result + searchtext[i];
            }
            else {
                result = result + searchtext[i] + "@";
            }

        }
        searchtext = result;

        $.ajax({
            type: "GET",
            crossDomain: true,
            //url: productsearchURL1 + "BranchCode=" + branch_id + "&Isvalid=" + Isvalid + "&StartIndex=" + from_count + "&EndIndex=" + to_count + "&Product=" + searchtext + "&cusno=" + CustomerNumber + "&username=" + UserProfile + "&deviceencryptedkey=" + encryptedkey + "&accesstoken=" + AccessTokenKey + "&splib=" + splib + "&tablelib=" + tablelib,
            url: AdvancedSearchURL + "BranchCode=" + branch_id + "&StartIndex=" + from_count + "&EndIndex=" + to_count + "&SEARCHTYPE=PROD1&SEARCHTEXT=" + searchtext + "&cusno=" + CustomerNumber + "&username=" + UserProfile + "&deviceencryptedkey=" + encryptedkey + "&accesstoken=" + AccessTokenKey + "&splib=" + splib + "&tablelib=" + tablelib + "&timestamp=" + Math.random(),
            dataType: "xml",
            success: function (xmlData) {
                var dbinsert = window.openDatabase("blackman", "1.0", "blackman", 2 * 1024 * 1024);       /* opening local database */
                dbinsert.transaction(function branchdetails(tx) {
                    tx.executeSql('CREATE TABLE IF NOT EXISTS iteminfo (id INTEGER PRIMARY KEY AUTOINCREMENT,OurItemNumber,OurProductNumber,ItemOrProductDescription,ItemStockingUnitOfMeasure,InventoryItemWeight,PRODUCTIMAGE,AVAILABLEQUNTY,ItemUnitPriceAmount,BRANCH,STOCK)');
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

                    var resultJSON = $Name.text().replace(/\t/g, '');
                    var finalresult = "{" + resultJSON + "}";
                    var output = $.parseJSON(finalresult);
                    var list = output.BMCItms;
                    var html = "";
                    if (output.BMCItms.length > 0) {

                        $.each(list, function (i, item) {

                            var OurItemNumber = item.OurItemNumber;
                            GlobalItemsList.push(OurItemNumber);
                            var OurProductNumber = item.OurProductNumber;
                            var ItemOrProductDescription = item.ItemOrProductDescription;
                            var ItemStockingUnitOfMeasure = item.ItemStockingUnitOfMeasure;
                            var InventoryItemWeight = item.InventoryItemWeight;
                            var PRODUCTIMAGE = item.PRODUCTIMAGE;
                            var AVAILABLEQUNTY = item.AVAILABLEQUNTY;
                            var ItemUnitPriceAmount = item.ItemUnitPriceAmount;
                            var BRANCH = item.BRANCH;
                            var STOCK = item.STOCK;

                            if (ItemUnitPriceAmount === 0 || ItemUnitPriceAmount === "0" || ItemUnitPriceAmount === "" || ItemUnitPriceAmount == null || ItemUnitPriceAmount === "CNF") {
                                ItemUnitPriceAmount = "0";
                            }
                            var qry = 'INSERT INTO iteminfo (OurItemNumber,OurProductNumber,ItemOrProductDescription,ItemStockingUnitOfMeasure,InventoryItemWeight,PRODUCTIMAGE,AVAILABLEQUNTY,ItemUnitPriceAmount,BRANCH,STOCK) VALUES (?,?,?,?,?,?,?,?,?,?)';

                            tx.executeSql(qry, [OurItemNumber, OurProductNumber, ItemOrProductDescription, ItemStockingUnitOfMeasure, InventoryItemWeight, PRODUCTIMAGE, AVAILABLEQUNTY, ItemUnitPriceAmount, BRANCH, STOCK]);


                        });
                        setLS('product_count', to_count);
                        loadsectionproductscontents('Yes');
                    }
                    else {
                        loadmoreprodutsbyusingsecondservice();
                    }

                }, errorCB);
            }, error: function (data, errorThrown) {
                navigator.notification.alert('Unable to connect server.Please try again later!', null, 'Connection Failed', 'OK');
                $.mobile.loading("hide");
                $("#loading_pdt").hide();
            }
        });

    }
}


function loadmoreprodutsbyusingsecondservice() {
    GlobalItemsList.length = 0;
    var product_count = getLS('product_count');
    var from_count = parseInt(product_count, 10) + 1;
    var to_count = parseInt(from_count, 10) + ToNextCount;
    var branch_id = getLS('default_branchcode');

    var searchtext = $("#txtpdtsrch").val().trim();
    searchtext = searchtext.split(" ");
    var result = "";
    for (var i = 0; i < searchtext.length; i++) {

        if (i === searchtext.length - 1) {
            result = result + searchtext[i];
        }
        else {
            result = result + searchtext[i] + "@";
        }

    }
    searchtext = result;

    $.ajax({
        type: "GET",
        crossDomain: true,
        url: AdvancedSearchURL + "BranchCode=" + branch_id + "&StartIndex=" + from_count + "&EndIndex=" + to_count + "&SEARCHTYPE=PROD2&SEARCHTEXT=" + searchtext + "&cusno=" + CustomerNumber + "&username=" + UserProfile + "&deviceencryptedkey=" + encryptedkey + "&accesstoken=" + AccessTokenKey + "&splib=" + splib + "&tablelib=" + tablelib + "&timestamp=" + Math.random(),
        dataType: "xml",
        success: function (xmlData) {
            var dbinsert = window.openDatabase("blackman", "1.0", "blackman", 2 * 1024 * 1024);       /* opening local database */
            dbinsert.transaction(function branchdetails(tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS iteminfo (id INTEGER PRIMARY KEY AUTOINCREMENT,OurItemNumber,OurProductNumber,ItemOrProductDescription,ItemStockingUnitOfMeasure,InventoryItemWeight,PRODUCTIMAGE,AVAILABLEQUNTY,ItemUnitPriceAmount,BRANCH,STOCK)');
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

                var resultJSON = $Name.text().replace(/\t/g, '');
                var finalresult = "{" + resultJSON + "}";
                var output = $.parseJSON(finalresult);
                var list = output.BMCItms;
                var html = "";
                if (output.BMCItms.length > 0) {
                    $.each(list, function (i, item) {
                        var OurItemNumber = item.OurItemNumber;
                        GlobalItemsList.push(OurItemNumber);
                        var OurProductNumber = item.OurProductNumber;
                        var ItemOrProductDescription = item.ItemOrProductDescription;
                        var ItemStockingUnitOfMeasure = item.ItemStockingUnitOfMeasure;
                        var InventoryItemWeight = item.InventoryItemWeight;
                        var PRODUCTIMAGE = item.PRODUCTIMAGE;
                        var AVAILABLEQUNTY = item.AVAILABLEQUNTY;
                        var ItemUnitPriceAmount = item.ItemUnitPriceAmount;
                        var BRANCH = item.BRANCH;
                        var STOCK = item.STOCK;

                        if (ItemUnitPriceAmount === 0 || ItemUnitPriceAmount === "0" || ItemUnitPriceAmount === "" || ItemUnitPriceAmount == null || ItemUnitPriceAmount === "CNF") {
                            ItemUnitPriceAmount = "0";
                        }
                        var qry = 'INSERT INTO iteminfo (OurItemNumber,OurProductNumber,ItemOrProductDescription,ItemStockingUnitOfMeasure,InventoryItemWeight,PRODUCTIMAGE,AVAILABLEQUNTY,ItemUnitPriceAmount,BRANCH,STOCK) VALUES (?,?,?,?,?,?,?,?,?,?)';

                        tx.executeSql(qry, [OurItemNumber, OurProductNumber, ItemOrProductDescription, ItemStockingUnitOfMeasure, InventoryItemWeight, PRODUCTIMAGE, AVAILABLEQUNTY, ItemUnitPriceAmount, BRANCH, STOCK]);

                    });
                }

                setLS('product_count', to_count);
                loadsectionproductscontents('Yes');

            }, errorCB);
        }, error: function (data, errorThrown) {
            navigator.notification.alert('Unable to connect server.Please try again later!', null, 'Connection Failed', 'OK');
            $.mobile.loading("hide");
            $("#loading_pdt").hide();
        }
    });
}



function errorCB() {
    navigator.notification.alert('Database error!.Please Contact administrator', null, 'Alert', 'OK');

    $("#loading_pdt").hide();
    $("#fade").hide();
    $.mobile.loading("hide");
}

// Product details page function

function storetolocal(id) {
    var c_page = getLS('page');
    var result = c_page.split(",");
    if (result[result.length - 1] !== 'productlist') {
        setLS('page', c_page + ",productlist");
    }

    // window.location.href = "productdesc.html";


    $("#productdesc").show();
    pdtdesc(id);
    $("#pdt").hide();
    var isuserlogged = getLS('Isuserlogged');
    if (isuserlogged === 'yes') {
        $("#show_addcart").show();
        $("#show_price").show();
        $("#show_qty").show();

    }
    else {
        $("#show_addcart").hide();
        $("#show_price").hide();
        $("#show_qty").hide();

    }

}

// This function is used to load the default branch (or) Fired when user clicked "cross mark(x)" next to current branch name.

function loaddefaultbranchdetails() {

    $("#loading_pdt").show();
    $.mobile.loading("show",
    {
        text: "Please Wait...",
        textVisible: true,
        theme: "a",
        textonly: true,
        html: "<span class='ui-bar ui-overlay-a ui-corner-all' style='text-align:center;background:#ccc'><img src='images/ajax-loader.gif'/><br/><h2 style='color:#304589'>Please Wait...</h2></span>"

    });

    var branch_id = getLS('default_branchcode1');
    var BranchName = getLS('default_branchname1');
    setLS('default_branchname', BranchName);
    setLS('default_branchcode', branch_id);

    var BranchName1 = getLS('default_branchname1');
    $("#current_branch").html(BranchName1);
    var message = "User selected default branch";
    writetologfile(message, 10);
}


//Function for handling Addtocart button

function addtocart(page, ItemNumber, textboxid) {
    var quantity = $("#" + textboxid).val();
    var quantity123 = textboxid.split("-");
    var aval = quantity123[1]; // Available quantity
    var itemid = quantity123[0]; //Product id


    var RepairReplacementCoverage = 0;
    var message = " added to cart";

    var selectedbranch = "";

    if (page === 1 || page === 2) {
        selectedbranch = getLS('default_branchcode');
    }


    var carinsert = window.openDatabase("blackman", "1.0", "blackman", 2 * 1024 * 1024);       /* opening local database */
    carinsert.transaction(function carinsertdetails(tx) {

        tx.executeSql('CREATE TABLE IF NOT EXISTS cartitems (id INTEGER PRIMARY KEY AUTOINCREMENT,Product_ID,OurItemNumber,OurProductNumber,ItemOrProductDescription,ItemStockingUnitOfMeasure,InventoryItemWeight,PRODUCTIMAGE,AVAILABLEQUNTY,ItemUnitPriceAmount,BRANCH,STOCK,RequiredQuantity,TotalPrice,Totalweight,selectedbranch)');
        tx.executeSql('select OurItemNumber from cartitems where OurItemNumber=?', [ItemNumber], function successitem(txx, results) {
            if (results.rows.length === 0) {
                if (quantity === "" || quantity === null || parseInt(quantity, 10) <= 0) {
                    navigator.notification.alert('Enter valid quantity!', null, 'Alert', 'OK');
                    $("#" + textboxid).focus();
                    return false;
                }
                else if (isNaN(quantity) === true) {
                    navigator.notification.alert('Enter only numeric values!', null, 'Alert', 'OK');
                    $("#" + textboxid).focus();
                    return false;
                }
                else if (parseInt(quantity, 10) > parseInt(aval, 10)) {
                    navigator.notification.alert('The quantity entered is not available currently.\nTotal quantity available in stock is ' + quantity123[1] + '.', null, 'Alert', 'OK');
                    $("#" + textboxid).focus();
                    return false;
                }
                else {
                    $("#loading_pdt").show();
                    $.mobile.loading("show",
                    {
                        text: "Please Wait...",
                        textVisible: true,
                        theme: "a",
                        textonly: true,
                        html: "<span class='ui-bar ui-overlay-a ui-corner-all' style='text-align:center;background:#ccc'><img src='images/ajax-loader.gif'/><br/><h2 style='color:#304589'>Please Wait...</h2></span>"

                    });

                    tx.executeSql('select * from iteminfo where OurItemNumber=? LIMIT 1', [ItemNumber], function successitem(txx, res) {
                        for (var i = 0; i < res.rows.length; i++) {
                            var ss = res.rows.item(i);
                            var OurItemNumber = ss.OurItemNumber;
                            var OurProductNumber = ss.OurProductNumber;
                            var ItemOrProductDescription = ss.ItemOrProductDescription;
                            var ItemStockingUnitOfMeasure = ss.ItemStockingUnitOfMeasure;
                            var InventoryItemWeight = ss.InventoryItemWeight;
                            var PRODUCTIMAGE = ss.PRODUCTIMAGE;
                            var AVAILABLEQUNTY = ss.AVAILABLEQUNTY;
                            var OurListUnitPriceCompany = ss.ItemUnitPriceAmount;
                            var BRANCH = ss.BRANCH;
                            var STOCK = ss.STOCK;
                            var RepairReplacementCoverage = 0;
                            var ReplacementCostUnitPriceCompany = "";
                            var totalweight = parseFloat(InventoryItemWeight) * quantity;

                            if (RepairReplacementCoverage === 0) {
                                ReplacementCostUnitPriceCompany = 0;
                            }

                            var OurListUnitPriceCompany1 = parseFloat(OurListUnitPriceCompany) + parseFloat(ReplacementCostUnitPriceCompany);

                            var Totalprice = quantity * OurListUnitPriceCompany1.toFixed(2);

                            var qry = 'INSERT INTO cartitems (Product_ID,OurItemNumber,OurProductNumber,ItemOrProductDescription,ItemStockingUnitOfMeasure,InventoryItemWeight,PRODUCTIMAGE,AVAILABLEQUNTY,ItemUnitPriceAmount,BRANCH,STOCK,RequiredQuantity,TotalPrice,Totalweight,selectedbranch) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
                            tx.executeSql(qry, [ItemNumber, OurItemNumber, OurProductNumber, ItemOrProductDescription, ItemStockingUnitOfMeasure, InventoryItemWeight, PRODUCTIMAGE, AVAILABLEQUNTY, OurListUnitPriceCompany, BRANCH, STOCK, quantity, Totalprice, totalweight, selectedbranch]);
                            writetologfile("Quantity:" + quantity + "," + ItemOrProductDescription + message, 9);
                        }
                    });
                }
            }
            else {
                navigator.notification.alert('Item already added to cart', null, 'Cart', 'OK');
            }
        });
    }, errorCB);
}


function loadproductimage(id) {

    $("#loading_pdt").hide();
    $.mobile.loading("hide");

    $('#' + id).show();

}

function loadmenu_product(pageno) {
    var isuserlogged = getLS('Isuserlogged');

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
        html = html + '<span class="p-menu" >Hi, ' + username + '</span>';
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
    //html = html + '<hr />';
    html = html + '</div>';
    $("#white_contentlistnewpdt").html(html);
}

function inventoryaddtocart(ItemNumber) {
    var quantity = $("#txtinventory").val();
    var checked_branchno = $('input:radio[name=branches]:checked').val();
    var split_data = checked_branchno.split('_');
    var branch = split_data[0];
    var aval = split_data[1];
    var message = " added to cart";
    if (split_data[1] !== 0 && split_data[1] >= 0) {
        var carinsert = window.openDatabase("blackman", "1.0", "blackman", 2 * 1024 * 1024);       /* opening local database */
        carinsert.transaction(function carinsertdetails(tx) {
            var query1 = 'CREATE TABLE IF NOT EXISTS cartitems (id INTEGER PRIMARY KEY AUTOINCREMENT,Product_ID,OurItemNumber,OurProductNumber,ItemOrProductDescription,ItemStockingUnitOfMeasure,InventoryItemWeight,PRODUCTIMAGE,AVAILABLEQUNTY,ItemUnitPriceAmount,BRANCH,STOCK,RequiredQuantity,TotalPrice,Totalweight,selectedbranch)';
            var query2 = 'select OurItemNumber from cartitems where OurItemNumber="' + ItemNumber + '"';


            tx.executeSql(query1);
            tx.executeSql(query2, [], function successitem(txx, results) {
                if (results.rows.length === 0) {

                    if (quantity === "" || quantity === null || parseInt(quantity, 10) <= 0) {
                        navigator.notification.alert('Enter valid quantity!', null, 'Alert', 'OK');
                        $("#txtinventory").focus();
                        return false;
                    }
                    else if (isNaN(quantity) === true) {
                        navigator.notification.alert('Enter only numeric values!', null, 'Alert', 'OK');
                        $("#txtinventory").focus();
                        return false;
                    }
                    else if (parseInt(quantity, 10) > parseInt(aval, 10)) {
                        navigator.notification.alert('The quantity entered is not available currently.\nTotal quantity available in stock is ' + aval + '.', null, 'Alert', 'OK');
                        $("#txtinventory").focus();
                        return false;
                    }
                    else {
                        tx.executeSql('select * from iteminfo where OurItemNumber="' + ItemNumber + '" LIMIT 1', [], function successitem(txx, res) {

                            if (res.rows.length > 0) {
                                $("#loading_pdt").show();

                                $.mobile.loading("show",
                                {
                                    text: "Please Wait...",
                                    textVisible: true,
                                    theme: "a",
                                    textonly: true,
                                    html: "<span class='ui-bar ui-overlay-a ui-corner-all' style='text-align:center;background:#ccc'><img src='images/ajax-loader.gif'/><br/><h2 style='color:#304589'>Please Wait...</h2></span>"

                                });

                                for (var i = 0; i < res.rows.length; i++) {


                                    var ss = res.rows.item(i);
                                    var OurItemNumber = ss.OurItemNumber;
                                    var OurProductNumber = ss.OurProductNumber;
                                    var ItemOrProductDescription = ss.ItemOrProductDescription;
                                    var ItemStockingUnitOfMeasure = ss.ItemStockingUnitOfMeasure;
                                    var InventoryItemWeight = ss.InventoryItemWeight;
                                    var PRODUCTIMAGE = ss.PRODUCTIMAGE;
                                    var AVAILABLEQUNTY = ss.AVAILABLEQUNTY;
                                    var OurListUnitPriceCompany = ss.ItemUnitPriceAmount;
                                    var BRANCH = ss.BRANCH;
                                    var STOCK = ss.STOCK;
                                    var RepairReplacementCoverage = 0;
                                    var ReplacementCostUnitPriceCompany = "";
                                    var totalweight = parseFloat(InventoryItemWeight) * quantity;

                                    if (RepairReplacementCoverage === 0) {
                                        ReplacementCostUnitPriceCompany = 0;
                                    }

                                    var OurListUnitPriceCompany1 = parseFloat(OurListUnitPriceCompany) + parseFloat(ReplacementCostUnitPriceCompany);

                                    var Totalprice = quantity * OurListUnitPriceCompany1.toFixed(2);

                                    var qry = 'INSERT INTO cartitems (Product_ID,OurItemNumber,OurProductNumber,ItemOrProductDescription,ItemStockingUnitOfMeasure,InventoryItemWeight,PRODUCTIMAGE,AVAILABLEQUNTY,ItemUnitPriceAmount,BRANCH,STOCK,RequiredQuantity,TotalPrice,Totalweight,selectedbranch) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

                                    tx.executeSql(qry, [ItemNumber, OurItemNumber, OurProductNumber, ItemOrProductDescription, ItemStockingUnitOfMeasure, InventoryItemWeight, PRODUCTIMAGE, aval, OurListUnitPriceCompany, BRANCH, STOCK, quantity, Totalprice, totalweight, branch]);
                                    writetologfile("Quantity:" + quantity + "," + ItemOrProductDescription + message, 9);
                                }
                            }
                        });
                    }
                }
                else {
                    navigator.notification.alert('Item already added to cart', null, 'Cart', 'OK');

                }
            });
        }, errorCB);
    }
    else {
        navigator.notification.alert('Please select a branch with available quantity', null, 'Cart', 'OK');
    }

}

function selectradio(id) {
    $("#radio_" + id).prop("checked", true)
}


function checkinventoryfun(ItemNumber) {

    var screenTop = $(document).scrollTop();
    $('#checkinventory1').css('margin-top', screenTop);
    $("#checkinventory").html("<div style='Text-align:center;margin-top:50px;color:#304589;font-family:calibri'><p><b>Please Wait</b></p></div>");

    var c_page = getLS('page');
    var result = c_page.split(",");
    if (result[result.length - 1] !== "checkinventory") {
        setLS('page', c_page + ",checkinventory");
    }


    $.ajax({
        type: "GET",
        crossDomain: true,
        url: branchavailablelistURL + ItemNumber + "&splib=" + splib + "&tablelib=" + tablelib,
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
            var jsontext = xmlreturndata.firstChild.textContent;
            var finalresult = "{" + jsontext + "}";
            var outputresult = $.parseJSON(finalresult);
            var list = outputresult.BMCItmBranchList;
            var output = '';
            if (list.length > 0) {


                output = output + '<div style="margin-left: 5px;height: 327px;overflow: auto;font-size:10px">';
                output = output + '<table>';



                $.each(list, function (i, item) {
                    var BRANCHNUMBER = item.BRANCHNUMBER;
                    var BRANCHNAME = item.BRANCHNAME;
                    var AVAILQUANTITY = item.Quantity;

                    if (BRANCHNUMBER === defaultbranchcode) {
                        if (AVAILQUANTITY !== 0 && AVAILQUANTITY !== "" && AVAILQUANTITY !== null) {
                            output = output + '<tr><td><input type="radio" id="radio_' + i + '" checked name="branches" style="width:13px;left:15px !important" value="' + BRANCHNUMBER + '_' + AVAILQUANTITY + '"/></td><td style="width:180px"><label onclick="selectradio(' + i + ')" style="margin-right:10px;float:left;line-height:25px;margin-left:2px;">' + BRANCHNAME + '</label></td><td><b style="color:green">- ' + AVAILQUANTITY + ' Item(s)</b></td></tr>';
                        }
                        else {
                            output = output + '<tr><td><input type="radio" id="radio_' + i + '" checked  name="branches" style="width:13px;left:15px !important" value="' + BRANCHNUMBER + '_' + AVAILQUANTITY + '"/></td><td style="width:180px"><label onclick="selectradio(' + i + ')" style="margin-right:10px;float:left;line-height:25px;margin-left: 2px;">' + BRANCHNAME + '</label></td><td><b style="color:red">- Not Available</b></td></tr>';
                        }
                    }
                    else {

                        if (AVAILQUANTITY !== 0 && AVAILQUANTITY !== "" && AVAILQUANTITY !== null) {
                            output = output + '<tr><td><input type="radio" id="radio_' + i + '"  name="branches" style="width:13px;left:15px !important" value="' + BRANCHNUMBER + '_' + AVAILQUANTITY + '"/></td><td style="width:180px"><label onclick="selectradio(' + i + ')" style="margin-right:10px;float:left;line-height:25px;margin-left: 2px;">' + BRANCHNAME + '</label></td><td><b style="color:green">- ' + AVAILQUANTITY + ' Item(s)</b></td></tr>';
                        }
                        else {
                            output = output + '<tr><td><input type="radio" id="radio_' + i + '"  name="branches" style="width:13px;left:15px !important" value="' + BRANCHNUMBER + '_' + AVAILQUANTITY + '"/></td><td style="width:180px"><label onclick="selectradio(' + i + ')" style="margin-right:10px;float:left;line-height:25px;margin-left: 2px;">' + BRANCHNAME + '</label></td><td><b style="color:red">- Not Available</b></td></tr>';
                        }
                    }


                });

                output = output + '</table>';
                output = output + '</div>';
                output = output + '<div id="div_cartfooter" class="footer" style="bottom: 0;position: absolute;width: 100%;left: 0;">';
                output = output + '<table>';
                output = output + '<tr style="width:100%">';
                output = output + '<td style="width:20%"><label style="color:#304589;font-weight:bold">Quantity:</label></td><td style="width:20%"><input id="txtinventory"  onkeypress="return keypressInventory(event)" oninput="maxLengthCheck(this)" min="1" max="99" maxlength="2" style="text-align: center;" type="number" value="1"/></td>';
                output = output + '<td style="margin-top: 5px;float: right;"><img class=" hide" onclick="inventoryaddtocart(' + ItemNumber + ')"  src="images/add_to_cart.png" style="height:auto;" /></td>';
                output = output + '</tr>';
                output = output + '</table>';

                $("#checkinventory").html(output);
            }
            else {
                $("#checkinventory").html("<div style='Text-align:center;margin-top:50px;color:red;font-family:calibri'><p><b>Item not available in other branches</b></p></div>");
            }


        }, error: function (data, errorThrown) {

            navigator.notification.alert('Unable to connect server.Please try again later!', null, 'Connection Failed', 'OK');

        }
    });


    $("#checkinventory1").show();
    $("#fade").show();

}

function keypressInventory(e) {
    if (e.keyCode === 13) {
        $('#txtinventory').blur(); //remove the focus from the textbox,that will automatically close the device keypad.
    }
}
function checkinventoryfuncls() {

    var c_page = getLS('page');
    var result = c_page.split(","), new_page;
    if (result.length === 1) {
        new_page = c_page.replace(result[result.length - 1], "");
        setLS('page', new_page);
    } else {
        new_page = c_page.replace(',' + result[result.length - 1], "");
        setLS('page', new_page);
    }


    $("#checkinventory1").hide();
    $("#fade").hide();
}

function Specification(itemno) {

    $("#specificationdiv").html(' <div style="width:100%;height: 155px;margin-top:40px;text-align:center;"><img src="images/27.GIF" /></div>');
    $("#termsconditionid").hide();


    $.ajax({
        type: "GET",
        crossDomain: true,
        url: AttributeURL + "itemno=" + itemno + "&username=" + UserProfile + "&deviceencryptedkey=" + encryptedkey + "=&accesstoken=" + AccessTokenKey + "&splib=" + splib + "&tablelib=" + tablelib,
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
                var resultJSON = $Name.text().replace(/\t/g, '');
                var finalresult = "{" + resultJSON + "}";
                var output = $.parseJSON(finalresult);
                var list = output.BMCAttributes;
                var html = "";
                var attributeslabel = [];
                var attributesvalue = [];
                if (output.BMCAttributes.length > 0) {
                    var html = "";
                    $.each(list, function (i, item) {
                        //Attributes Label

                        var AttributeLabel1 = item.AttributeLabel1;
                        attributeslabel.push(AttributeLabel1);
                        var AttributeLabel2 = item.AttributeLabel2;
                        attributeslabel.push(AttributeLabel2);
                        var AttributeLabel3 = item.AttributeLabel3;
                        attributeslabel.push(AttributeLabel3);
                        var AttributeLabel4 = item.AttributeLabel4;
                        attributeslabel.push(AttributeLabel4);
                        var AttributeLabel5 = item.AttributeLabel5;
                        attributeslabel.push(AttributeLabel5);

                        var AttributeLabel6 = item.AttributeLabel6;
                        attributeslabel.push(AttributeLabel6);
                        var AttributeLabel7 = item.AttributeLabel7;
                        attributeslabel.push(AttributeLabel7);
                        var AttributeLabel8 = item.AttributeLabel8;
                        attributeslabel.push(AttributeLabel8);
                        var AttributeLabel9 = item.AttributeLabel9;
                        attributeslabel.push(AttributeLabel9);
                        var AttributeLabel10 = item.AttributeLabel10;
                        attributeslabel.push(AttributeLabel10);

                        var AttributeLabel11 = item.AttributeLabel11;
                        attributeslabel.push(AttributeLabel11);
                        var AttributeLabel12 = item.AttributeLabel12;
                        attributeslabel.push(AttributeLabel12);
                        var AttributeLabel13 = item.AttributeLabel13;
                        attributeslabel.push(AttributeLabel13);
                        var AttributeLabel14 = item.AttributeLabel14;
                        attributeslabel.push(AttributeLabel14);
                        var AttributeLabel15 = item.AttributeLabel15;
                        attributeslabel.push(AttributeLabel15);

                        var AttributeLabel16 = item.AttributeLabel16;
                        attributeslabel.push(AttributeLabel16);
                        var AttributeLabel17 = item.AttributeLabel17;
                        attributeslabel.push(AttributeLabel17);
                        var AttributeLabel18 = item.AttributeLabel18;
                        attributeslabel.push(AttributeLabel18);
                        var AttributeLabel19 = item.AttributeLabel19;
                        attributeslabel.push(AttributeLabel19);
                        var AttributeLabel20 = item.AttributeLabel20;
                        attributeslabel.push(AttributeLabel20);

                        var AttributeLabel21 = item.AttributeLabel21;
                        attributeslabel.push(AttributeLabel21);
                        var AttributeLabel22 = item.AttributeLabel22;
                        attributeslabel.push(AttributeLabel22);
                        var AttributeLabel23 = item.AttributeLabel23;
                        attributeslabel.push(AttributeLabel23);
                        var AttributeLabel24 = item.AttributeLabel24;
                        attributeslabel.push(AttributeLabel24);
                        var AttributeLabel25 = item.AttributeLabel25;
                        attributeslabel.push(AttributeLabel25);

                        var AttributeLabel26 = item.AttributeLabel26;
                        attributeslabel.push(AttributeLabel26);
                        var AttributeLabel27 = item.AttributeLabel27;
                        attributeslabel.push(AttributeLabel27);
                        var AttributeLabel28 = item.AttributeLabel28;
                        attributeslabel.push(AttributeLabel28);
                        var AttributeLabel29 = item.AttributeLabel29;
                        attributeslabel.push(AttributeLabel29);
                        var AttributeLabel30 = item.AttributeLabel30;
                        attributeslabel.push(AttributeLabel30);

                        var AttributeLabel31 = item.AttributeLabel31;
                        attributeslabel.push(AttributeLabel31);
                        // var AttributeLabel32 = item.AttributeLabel32;
                        // attributeslabel.push(AttributeLabel32);


                        //Attributes Value

                        var attributesvalue1 = item.AttributeVALUE1;
                        attributesvalue.push(attributesvalue1);
                        var attributesvalue2 = item.AttributeVALUE2;
                        attributesvalue.push(attributesvalue2);
                        var attributesvalue3 = item.AttributeVALUE3;
                        attributesvalue.push(attributesvalue3);
                        var attributesvalue4 = item.AttributeVALUE4;
                        attributesvalue.push(attributesvalue4);
                        var attributesvalue5 = item.AttributeVALUE5;
                        attributesvalue.push(attributesvalue5);

                        var attributesvalue6 = item.AttributeVALUE6;
                        attributesvalue.push(attributesvalue6);
                        var attributesvalue7 = item.AttributeVALUE7;
                        attributesvalue.push(attributesvalue7);
                        var attributesvalue8 = item.AttributeVALUE8;
                        attributesvalue.push(attributesvalue8);
                        var attributesvalue9 = item.AttributeVALUE9;
                        attributesvalue.push(attributesvalue9);
                        var attributesvalue10 = item.AttributeVALUE10;
                        attributesvalue.push(attributesvalue10);

                        var attributesvalue11 = item.AttributeVALUE11;
                        attributesvalue.push(attributesvalue11);
                        var attributesvalue12 = item.AttributeVALUE12;
                        attributesvalue.push(attributesvalue12);
                        var attributesvalue13 = item.AttributeVALUE13;
                        attributesvalue.push(attributesvalue13);
                        var attributesvalue14 = item.AttributeVALUE14;
                        attributesvalue.push(attributesvalue14);
                        var attributesvalue15 = item.AttributeVALUE15;
                        attributesvalue.push(attributesvalue15);

                        var attributesvalue16 = item.AttributeVALUE16;
                        attributesvalue.push(attributesvalue16);
                        var attributesvalue17 = item.AttributeVALUE17;
                        attributesvalue.push(attributesvalue17);
                        var attributesvalue18 = item.AttributeVALUE18;
                        attributesvalue.push(attributesvalue18);
                        var attributesvalue19 = item.AttributeVALUE19;
                        attributesvalue.push(attributesvalue19);
                        var attributesvalue20 = item.AttributeVALUE20;
                        attributesvalue.push(attributesvalue20);

                        var attributesvalue21 = item.AttributeVALUE21;
                        attributesvalue.push(attributesvalue21);
                        var attributesvalue22 = item.AttributeVALUE22;
                        attributesvalue.push(attributesvalue22);
                        var attributesvalue23 = item.AttributeVALUE23;
                        attributesvalue.push(attributesvalue23);
                        var attributesvalue24 = item.AttributeVALUE24;
                        attributesvalue.push(attributesvalue24);
                        var attributesvalue25 = item.AttributeVALUE25;
                        attributesvalue.push(attributesvalue25);

                        var attributesvalue26 = item.AttributeVALUE26;
                        attributesvalue.push(attributesvalue26);
                        var attributesvalue27 = item.AttributeVALUE27;
                        attributesvalue.push(attributesvalue27);
                        var attributesvalue28 = item.AttributeVALUE28;
                        attributesvalue.push(attributesvalue28);
                        var attributesvalue29 = item.AttributeVALUE29;
                        attributesvalue.push(attributesvalue29);
                        var attributesvalue30 = item.AttributeVALUE30;
                        attributesvalue.push(attributesvalue30);

                        var attributesvalue31 = item.AttributeVALUE31;
                        attributesvalue.push(attributesvalue31);
                        //var attributesvalue32 = item.AttributeVALUE32;
                        //attributesvalue.push(attributesvalue32);

                        var regex = /[a-zA-Z]/;
                        var ItemOrProductDescription = getLS('pItemOrProductDescription');
                        var OurProductNumber = getLS('pOurProductNumber');
                        var OurItemNumber = getLS('pOurItemNumber');
                        var InventoryItemWeight = getLS('pInventoryItemWeight');
                        var ItemVendorManufacturerIDNumber = getLS('pItemVendorManufacturerIDNumber');
                        var Brand = getLS('pBrand');



                        var attrib = '';
                        if (attributesvalue.length >= 0 && attributeslabel.length >= 0) {
                            attrib = attrib + '<table id="spectable" style="width:100%">';

                            attrib = attrib + '<tr>';
                            attrib = attrib + '<td><b>Item Number</b></td>  <td><span>#' + OurItemNumber + '</span></td>';
                            attrib = attrib + '</tr>';

                            attrib = attrib + '<tr>';
                            attrib = attrib + '<td><b>Item Name</b></td>  <td><span>' + ItemOrProductDescription + '</span></td>';
                            attrib = attrib + '</tr>';

                            attrib = attrib + '<tr>';
                            attrib = attrib + '<td><b>Product Number</b></td>  <td><span>' + OurProductNumber + '</span></td>';
                            attrib = attrib + '</tr>';

                            attrib = attrib + '<tr>';
                            attrib = attrib + '<td><b>Manufacturer Number</b></td>  <td><span>' + ItemVendorManufacturerIDNumber + '</span></td>';
                            attrib = attrib + '</tr>';

                            attrib = attrib + '<tr>';
                            attrib = attrib + '<td><b>Vendor Name</b></td>  <td><span>' + Brand + '</span></td>';
                            attrib = attrib + '</tr>';


                            attrib = attrib + '<tr>';
                            attrib = attrib + '<td><b>Item Weight</b></td>  <td><span>' + parseFloat(InventoryItemWeight).toFixed(2) + ' Kg(s)</span></td>';
                            attrib = attrib + '</tr>';
                            var count = 0;

                            for (var a = 0; a < attributeslabel.length; a++) {

                                if (attributesvalue[a] !== "" && attributesvalue[a] !== null && regex.test(attributesvalue[a])) {

                                    if (a % 2 === 0) {
                                        attrib = attrib + '<tr>';
                                        attrib = attrib + '<td><b>' + attributeslabel[a] + '</b></td>  <td><span>' + attributesvalue[a] + '</span></td>';
                                        attrib = attrib + '</tr>';
                                        count++;
                                    }
                                    else {
                                        attrib = attrib + '<tr>';
                                        attrib = attrib + '<td><b>' + attributeslabel[a] + '</b></td>  <td><span>' + attributesvalue[a] + '</span></td>';
                                        attrib = attrib + '</tr>';
                                        count++;
                                    }
                                }

                            }

                            attrib = attrib + '</table>';
                        }
                        else {
                            attrib = attrib + '<div style="min-height:70px;text-align:center;color:red;margin-top: 50px">No Specifications Available</div>';
                        }
                        $("#specificationdiv").html(attrib);
                        $("#termsconditionid").show();
                    });
                }
            }
            catch (e) {
                navigator.notification.alert(e, null, 'Alert', 'OK');
                $.mobile.loading("hide");
                $("#loading_pdt").hide();
            }


        }, error: function (data, errorThrown) {
            navigator.notification.alert('Unable to connect server.Please try again later!', null, 'Connection Failed', 'OK');
            $.mobile.loading("hide");
            $("#loading_pdt").hide();
        }

    });

    $("#specificationdiv").show();
    $("#pdtoverview").hide();
    $("#lblSpecificationdiv").addClass('addclass');
    $("#lblProductdiv").removeClass('addclass');
    $("#lblProductdiv").addClass('backgroundcolor');
    $("#lblSpecificationdiv").removeClass('backgroundcolor');
}
function ProductOverview() {

    //$("#lblSpecificationdiv").addClass('addclass');
    $("#lblSpecificationdiv").removeClass('addclass');
    $("#lblSpecificationdiv").addClass('backgroundcolor');
    $("#lblProductdiv").addClass('addclass');
    $("#lblProductdiv").removeClass('backgroundcolor');
    $("#specificationdiv").hide();
    $("#pdtoverview").show();
}
//<img src="images/backarrownew.png" onclick="pdoductpagereload()" style="float:left"/>
function pdoductpagereload() {
    $("#filterdiv").show();
    $(".searchdiv").show();
    $(".pdtimgkitchendivdisplay1").hide();
    $(".pdtimgdivdisplay").hide();
    $("#default_div").show();
    $(".pdtloadlistdiv").show();
    $("#filterselctiondiv").hide();
    $(".tableproducts1filter").hide();
    $(".cleardivivfilter").hide();

    var c_page = getLS('page');
    var result = c_page.split(","), new_page;
    if (result.length === 1) {
        new_page = c_page.replace(result[result.length - 1], "");
        setLS('page', new_page);
    } else {
        new_page = c_page.replace(',' + result[result.length - 1], "");
        setLS('page', new_page);
    }
    // $(".pdtimgkitchendivdisplay1").css('margin-top', '0px');
}
function navigationclick() {
    $("#prdtsectionimges").hide();
    $("#sectiondiv").show();
    $(".srchdivimg").hide();
    $("#navigationdiv").hide();
    $("#backbuttongrid").show();
}
