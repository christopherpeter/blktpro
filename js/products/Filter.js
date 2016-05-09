/*
This javascript files is only for products
Creaded on:22/07/2014 12:05PM
License:Tychons solutions
*/

// JquerySelectorVariable

var JQFilterSelectionDiv = $("#filterselctiondiv");

//Globalvalues for the JS
var GlobalFilterArray = [];
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


var branch_id = getLS('default_branchcode');
function filterselection1() {

    var c_page = getLS('page');
    var result = c_page.split(",");
    if (result[result.length - 1] !== "FilterPopUp") {
        setLS('page', c_page + ",FilterPopUp");
    }
    if (getLS('IsNewFilterAttributes') === 'Yes') {
        GlobalFilterArray.length = 0;
        $.mobile.loading("show",
        {
            text: "Please Wait...",
            textVisible: true,
            theme: "a",
            textonly: true,
            html: "<span class='ui-bar ui-overlay-a ui-corner-all' style='text-align:center;background:#ccc'><img src='images/ajax-loader.gif'/><br/><h2 style='color:#304589'>Please Wait...</h2></span>"

        });
        $("#loading_pdt").show();


        var ServiceURL = "";

        var showMoreProducts = getLS('showmoreproducts');

        if (showMoreProducts === 'filter' || showMoreProducts === 'filterproducts') {
            var fSectionCode = getLS('F_Sectioncode');
            var fGroupCode = getLS('F_Groupcode');
            var fCategoryCode = getLS('F_Categorycode');

            ServiceURL = BlackmanApplicationServices.FilterOptionsURL + 'sectionId=' + fSectionCode + '&HEADSECID=&groupId=' + fGroupCode + '&categoryId=' + fCategoryCode + '&splib=' + splib + '&tablelib=' + tablelib;
        }
        else {
            var searchType = getLS('SearchType');
            var searchText = getLS('LS_SearchText');
            ServiceURL = BlackmanApplicationServices.NewFilterAttributesURL + 'SEARCHTYPE=' + searchType + '&SEARCHTXT=' + searchText.toUpperCase() + '&BRANCHCODE=' + branch_id + '&deviceencryptedkey=' + encryptedkey + '&splib=' + splib + '&tablelib=' + tablelib;
        }

        $.ajax({
            type: "GET",
            crossDomain: true,
            url: ServiceURL,
            dataType: "xml",
            success: function (xmlData) {
                var xmlString;
                if (window.ActiveXObject) {
                    xmlString = xmlData.xml;
                }
                else {
                    xmlString = (new XMLSerializer()).serializeToString(xmlData);
                }
                var namespace = 'http://bm.tyc.com';
                var parser = new DOMParser(); // Webkit, IE has its own
                var xml = parser.parseFromString(xmlString, "text/xml");
                var xmlreturndata = xml.getElementsByTagNameNS(namespace, 'return')[0]; // returns the first aws:year element
                var jsontext = xmlreturndata.firstChild.textContent;
                var finalresult = "{" + jsontext + "}";
                var outputresult = $.parseJSON(finalresult);
                var list = "";

                if (showMoreProducts === 'filter') {
                    list = outputresult.BMCItemFilter;
                }
                else {
                    list = outputresult.BMCAttributes;
                }


                var output = '';
                if (list.length > 0) {
                    $.each(list, function (i, item) {
                        var AttributeNames = item.AttributeNames.split(",");
                        if (AttributeNames.length - 1 > 0) {
                            for (var m = 0; m <= AttributeNames.length - 1; m++) {
                                GlobalFilterArray.push(AttributeNames[m]);
                                output = output + '<div>';
                                output = output + "<div onclick=\"Filterdiv('" + AttributeNames[m] + "')\" id='Filterhead_" + AttributeNames[m].replace(/ /g, "").replace(/\//g, "_") + "' class='odd'>";
                                output = output + '<div style="margin: 8px 10px 10px 10px;font-size: 13px;">';
                                output = output + '<img src="css/images/filterplus.png" style="float: left; width: 25px" />';
                                output = output + AttributeNames[m] + '</div>';
                                output = output + '</div>';
                                output = output + '<div id="filterdiv_' + AttributeNames[m].replace(/ /g, "").replace(/\//g, "_") + '" style="display: none; overflow-y: scroll;">';
                                output = output + '</div>';
                                output = output + '</div>';
                            }
                        }
                        else {
                            output = output + "<div style='text-align:center;margin-top:50px;color:red;font-family:calibri'>No Filters</div>";

                        }

                    });

                    JQFilterSelectionDiv.html(output);
                    JQFilterSelectionDiv.show();
                    $.mobile.loading("hide");
                    $("#loading_pdt").hide();
                    $(".pdtloadlistdiv").hide();
                    $(".tableproducts1filter").show();
                    $(".cleardivivfilter").show();
                }
                else {

                    JQFilterSelectionDiv.html("<div style='Text-align:center;margin-top:50px;color:red;font-family:calibri'>No Filters</div>");
                    JQFilterSelectionDiv.show();
                    $.mobile.loading("hide");
                    $("#loading_pdt").hide();
                    $(".pdtloadlistdiv").hide();
                    $(".tableproducts1filter").show();
                    $(".cleardivivfilter").show();
                }

                setLS('IsNewFilterAttributes', 'No');

            }, error: function () {
                $.mobile.loading("hide");
                $("#loading_pdt").hide();
                navigator.notification.alert('Unable to connect server.Please try again later!', null, 'Connection Failed', 'OK');
                $(".pdtloadlistdiv").hide();
                $(".tableproducts1filter").show();
                $(".cleardivivfilter").show();

            }
        });
    }
    else {
        JQFilterSelectionDiv.show();
        $.mobile.loading("hide");
        $("#loading_pdt").hide();
        $(".pdtloadlistdiv").hide();
        $(".tableproducts1filter").show();
        $(".cleardivivfilter").show();
    }
}

function Filterdiv(Divid) {
    if ($("#filterdiv_" + Divid.replace(/ /g, "").replace(/\//g, "_") + ":empty").length) {
        //Empty div
        $.mobile.loading("show",
       {
           text: "Please Wait...",
           textVisible: true,
           theme: "a",
           textonly: true,
           html: "<span class='ui-bar ui-overlay-a ui-corner-all' style='text-align:center;background:#ccc'><img src='images/ajax-loader.gif'/><br/><h2 style='color:#304589'>Please Wait...</h2></span>"

       });
        $("#loading_pdt").show();


        var ServiceURL = "";

        if (getLS('showmoreproducts') === 'filter') {
            ServiceURL = BlackmanApplicationServices.FilterValueURL + "sectionId=" + getLS("F_Sectioncode") + "&HEADSECID=&groupId=" + getLS("F_Groupcode") + "&categoryId=" + getLS("F_Categorycode") + "&attributeName=" + Divid + "&userId=&deviceencryptedkey=" + getLS('encryptedkey') + "&accesstoken=&splib=" + splib + "&tablelib=" + tablelib;
        }
        else {
            ServiceURL = BlackmanApplicationServices.NewFilterAttributesVauesURL + "SEARCHTYPE=" + getLS("SearchType") + "&SEARCHTXT=" + getLS("LS_SearchText").toUpperCase() + "&ATTRNAME=" + Divid + "&BRANCHCODE=" + branch_id + "&deviceencryptedkey=" + encryptedkey + "&splib=" + splib + "&TABLELIB=" + tablelib;
        }


        $.ajax({
            type: "GET",
            crossDomain: true,
            url: ServiceURL,
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
                var list = outputresult.BMCOrders;
                var output = '';

                if (list.length > 0) {
                    output = output + '<ul style="list-style:none;font-size: 12px;">';
                    $.each(list, function (i, item) {
                        var ATTRIBUTEVALUE = item.ATTRIBUTEVALUE;
                        output = output + '<li>';
                        output = output + '<input class="' + Divid.replace(/ /g, "").replace(/\//g, "_") + ' Clearallfilters" type="checkbox" value="' + ATTRIBUTEVALUE + '" style="width: 5%;" />';
                        output = output + '<a href="" style="color: #808080;width: 75%; font-weight: bold; text-decoration: none;vertical-align:top">';
                        output = output + ATTRIBUTEVALUE;
                        output = output + '</a>';
                        output = output + '</li>';

                    });

                    output = output + '</ul>';

                    Divid = Divid.replace(/ /g, "").replace(/\//g, "_");
                    $("#filterdiv_" + Divid).html(output);
                    var img = $("#Filterhead_" + Divid).children().children().attr('src');

                    if (img === "css/images/filterplus.png") {
                        $("#Filterhead_" + Divid).children().children().attr("src", "css/images/filterminus.png");
                        $("#filterdiv_" + Divid).slideToggle();
                    }
                    if (img === "css/images/filterminus.png") {
                        $("#Filterhead_" + Divid).children().children().attr("src", "css/images/filterplus.png");
                        $("#filterdiv_" + Divid).slideToggle();

                    }
                    $("#filterdiv_" + Divid).show();
                    $.mobile.loading("hide");
                    $("#loading_pdt").hide();
                }
                else {
                    $("#filterdiv_" + Divid).html("<div style='Text-align:center;margin-top:50px;color:red;font-family:calibri'>No Filters</div>");
                    $("#filterdiv_" + Divid).show();
                    $.mobile.loading("hide");
                    $("#loading_pdt").hide();

                }

            }, error: function () {
                $.mobile.loading("hide");
                $("#loading_pdt").hide();
                navigator.notification.alert('Unable to connect server.Please try again later!', null, 'Connection Failed', 'OK');


            }
        });
    }
    else {
        //Div is Non-empty
        Divid = Divid.replace(/ /g, "").replace(/\//g, "_");
        var img = $("#Filterhead_" + Divid).children().children().attr('src');

        if (img === "css/images/filterplus.png") {
            $("#Filterhead_" + Divid).children().children().attr("src", "css/images/filterminus.png");
            $("#filterdiv_" + Divid).slideToggle();
        }
        if (img === "css/images/filterminus.png") {
            $("#Filterhead_" + Divid).children().children().attr("src", "css/images/filterplus.png");
            $("#filterdiv_" + Divid).slideToggle();

        }
        $("#filterdiv_" + Divid).show();
    }

}

function filterbackbtn() {
    $(".pdtloadlistdiv").show();
    JQFilterSelectionDiv.hide();
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
    var valuefilter = getLS('showmoreproducts');

    if (valuefilter === "search") {
        //pdtimgkitchendivdisplaynew1back()
        //alert();
    }
    else {
        pdtimgkitchendivdisplay(getLS('F_Sectioncode'), getLS('F_Groupcode'), getLS('F_Categorycode'), getLS('breadlist1'));
    }
}

var AttributeName = "";
var AttributeValue = "";

function SubmitFilterProducts() {
    AttributeName = "";
    AttributeValue = "";

    for (var i = 0; i <= GlobalFilterArray.length - 1; i++) {

        $('input:checkbox.' + GlobalFilterArray[i].replace(/ /g, "").replace(/\//g, "_")).each(function () {
            var ThisVal = (this.checked ? $(this).val() : "");
            if (ThisVal !== "" && ThisVal !== null) {
                if (AttributeName.length !== 0) {
                    AttributeName = AttributeName + "," + GlobalFilterArray[i];
                }
                else {
                    AttributeName = GlobalFilterArray[i];
                }

                if (AttributeValue.length !== 0) {
                    AttributeValue = AttributeValue + "," + ThisVal;
                }
                else {
                    AttributeValue = ThisVal;
                }

            }
        });
    }

    if (AttributeName !== "" || AttributeValue !== "") {

        GetProductsBasedOnFilter(AttributeName, AttributeValue, 1, 10);
    }
    else {
        navigator.notification.alert('No Filters Applied..!', null, 'Alert', 'OK');
    }
}

function ClearAllCheckedFilter() {
    $('.Clearallfilters').attr('checked', false); // Unchecks i
}

function GetProductsBasedOnFilter(AttributeName, AttributeValue, FromCount, ToCount) {
    $.mobile.loading("show",
    {
        text: "Please Wait...",
        textVisible: true,
        theme: "a",
        textonly: true,
        html: "<span class='ui-bar ui-overlay-a ui-corner-all' style='text-align:center;background:#ccc'><img src='images/ajax-loader.gif'/><br/><h2 style='color:#304589'>Please Wait...</h2></span>"

    });
    $("#loading_pdt").show();

    var branch_code = getLS('default_branchcode');

    var ServiceURL = "";

    if (getLS('showmoreproducts') === 'filter') {
        ServiceURL = BlackmanApplicationServices.FilterProductsURL + "SectionCode=" + getLS('F_Sectioncode') + "&HEADSECID=&GroupCode=" + getLS('F_Groupcode') + "&CategoryCode=" + getLS('F_Categorycode') + "&AttrName=" + AttributeName + "&AttrValue=" + AttributeValue + "&StartIndex=" + FromCount + "&EndIndex=" + ToCount + "&brchcode=" + branch_code + "&cusno=" + customerno + "&username=" + UserProfile + "&deviceencryptedkey=" + encryptedkey + "&accesstoken=" + AccessTokenKey + "&splib=" + splib + "&tablelib=" + tablelib;
    }
    else {
        ServiceURL = BlackmanApplicationServices.NewFilterProductsResultsURL + "StartIndex=" + FromCount + "&EndIndex=" + ToCount + "&cusno=" + customerno + "&SEARCHTYPE=" + getLS("SearchType") + "&SEARCHTXT=" + getLS("LS_SearchText").toUpperCase() + "&ATTRNAME=" + AttributeName.replace(",", "','") + "&ATTRVALUE=" + AttributeValue.replace(",", "','") + "&BRANCHCODE=" + branch_id + "&username=" + UserProfile + "&accesstoken=" + AccessTokenKey + "&deviceencryptedkey=" + encryptedkey + "&splib=" + splib + "&tablelib=" + tablelib + "&timestamp=" + Math.random();
    }



    $.ajax({
        type: "GET",
        crossDomain: true,
        url: ServiceURL,
        dataType: "xml",
        success: function (xmlData) {
            var dbinsert = window.openDatabase("blackman", "1.0", "blackman", 2 * 1024 * 1024);       /* opening local database */
            dbinsert.transaction(function branchdetails(tx) {

                if (FromCount === 1) {
                    tx.executeSql('DROP TABLE IF EXISTS  iteminfo');
                }
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

                        if (ItemUnitPriceAmount === 0 || ItemUnitPriceAmount === "0" || ItemUnitPriceAmount === "" || ItemUnitPriceAmount === null || ItemUnitPriceAmount === "CNF") {
                            ItemUnitPriceAmount = "0";
                        }

                        var qry = 'INSERT INTO iteminfo (OurItemNumber,OurProductNumber,ItemOrProductDescription,ItemStockingUnitOfMeasure,InventoryItemWeight,PRODUCTIMAGE,AVAILABLEQUNTY,ItemUnitPriceAmount,BRANCH,STOCK) VALUES (?,?,?,?,?,?,?,?,?,?)';

                        tx.executeSql(qry, [OurItemNumber, OurProductNumber, ItemOrProductDescription, ItemStockingUnitOfMeasure, InventoryItemWeight, PRODUCTIMAGE, AVAILABLEQUNTY, ItemUnitPriceAmount, BRANCH, STOCK]);

                    });
                }
                setLS('product_count', 10);
                setLS('showmoreproducts', 'filterproducts');
                loadsectionproductscontents("Yes");

            }, errorCB);
        }, error: function () {
            navigator.notification.alert('Unable to connect server.Please try again later!', null, 'Connection Failed', 'OK');
            $.mobile.loading("hide");
            $("#loading_pdt").hide();
        }
    });
}

