﻿/*
This javascript files is only for products
Creaded on:22/07/2014 12:05PM
License:Tychons solutions
*/

//Globalvalues for the JS

var AccessTokenKey = GetLS('AccessTokenKey');
var customerno = GetLS('CustomerNumber');
var user_ID = GetLS('UserID');
var UserProfile = GetLS('UserProfile');
var UserName = GetLS('UserName');
var isuserlogged = GetLS('Isuserlogged');
var Isvalid = "";
if (isuserlogged == 'yes') {
    Isvalid = "Y";
}
else {
    Isvalid = "N";
}


//Function to load section code to the table sectionifo


function ChangeUserBranch()
{
    findbranch(2);
}

function loadsectionfilter() {

    var view = GetLS("viewimg");

    if (view == 'yes') {

        $.ajax({
            type: "GET",
            crossDomain: true,
            url: NewCategoryServiceURL + "hsCode=&secCode=&groupCode=&catCode=&deviceEncryptedkey=" + encryptedkey + "&spLib=" + splib + "&tableLib=" + tablelib,
            dataType: "xml",
            success: function (xmlData) {
                var Sectioninsert = window.openDatabase("blackman", "1.0", "blackman", 2 * 1024 * 1024);       /* opening local database */
                Sectioninsert.transaction(function secdetails(tx) {
                    tx.executeSql('DROP TABLE IF EXISTS  sectioninfo'); // drop existing table
                    tx.executeSql('CREATE TABLE IF NOT EXISTS sectioninfo (id INTEGER PRIMARY KEY AUTOINCREMENT,HSCODE,SECTION,DESCRIPTION,GROUPCOUNT)');
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
                    var list = output.BMCCategoryDetails;
                    $.each(list, function (i, item) {
                        var SECTION = item.SECTIONCODE;
                        var DESCRIPTION = item.DESCRIPTION;
                        var HSCODE = item.HEADSECTIONCODE;
                        var GROUPCOUNT = item.GROUPCOUNT;
                        var query = 'INSERT INTO sectioninfo (HSCODE,SECTION,DESCRIPTION,GROUPCOUNT)'
                                 + 'VALUES (?,?,?,?)';
                        tx.executeSql(query, [HSCODE, SECTION, DESCRIPTION, GROUPCOUNT]);

                    });
                    SetLS("cat_oldcount", "0");
                    loadsections();
                }, errorCB);

            }, error: function (data, errorThrown) {
                navigator.notification.alert('Unable to connect server.Please try again later!', null, 'Connection Failed', 'OK');

                $.mobile.loading("hide");
                $("#loading_pdt").hide();
            }
        });
    }
    else if (view = 'no') {

        $.ajax({
            type: "GET",
            crossDomain: true,
            url: NewCategoryServiceURL + "hsCode=&secCode=&groupCode=&catCode=&deviceEncryptedkey=" + encryptedkey + "&spLib=" + splib + "&tableLib=" + tablelib,
            dataType: "xml",
            success: function (xmlData) {
                var Sectioninsert = window.openDatabase("blackman", "1.0", "blackman", 2 * 1024 * 1024);       /* opening local database */
                Sectioninsert.transaction(function secdetails(tx) {
                    tx.executeSql('DROP TABLE IF EXISTS  sectioninfo'); // drop existing table
                    tx.executeSql('CREATE TABLE IF NOT EXISTS sectioninfo (id INTEGER PRIMARY KEY AUTOINCREMENT,HSCODE,SECTION,DESCRIPTION,GROUPCOUNT)');
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
                    var list = output.BMCCategoryDetails;
                    $.each(list, function (i, item) {
                        var SECTION = item.SECTIONCODE;
                        var DESCRIPTION = item.DESCRIPTION;
                        var GROUPCOUNT = item.GROUPCOUNT;
                        var HSCODE = item.HEADSECTIONCODE;

                        var query = 'INSERT INTO sectioninfo (HSCODE,SECTION,DESCRIPTION,GROUPCOUNT)'
                                     + 'VALUES (?,?,?,?)';
                        tx.executeSql(query, [HSCODE,SECTION, DESCRIPTION, GROUPCOUNT]);

                    });
                    SetLS("cat_oldcount", "0");
                    loadsections();
                }, errorCB);

            }, error: function (data, errorThrown) {

                //navigator.notification.alert('Unable to connect server.Please try again later!', null, 'Connection Failed', 'OK');
                //alert('Unable to connect server.Please try again later!');
                $.mobile.loading("hide");
                $("#loading_pdt").hide();
                navigator.notification.alert('Unable to connect server.Please try again later!', null, 'Connection Failed', 'OK');
            }
        });
    }
}


//Function to read the sectioninfo table contents and added it to the filter

function loadsections() {
    loadsectionimages();
}

function CheckAspectRatio(imageid) {

    var image = document.getElementById(imageid);
    var imgwidth = image.width;
    var imgheight = image.height;
    var divwidth = $(".mainpagepdt").width();
    var divheight = $(".mainpagepdt").height();

    Width = divwidth; //retrieve current window width
    if (imgheight > divheight) {
        Height = divheight; //retrieve current window height
    }
    else {
        Height = imgheight;
    }
    var widthRatio = parseFloat(imgwidth / Width).toFixed(2);
    var heightRatio = parseFloat(imgheight / Height).toFixed(2);
    var ratio = Math.max(widthRatio, heightRatio);
    var newWidth = parseInt(imgwidth / ratio);
    var newHeight = parseInt(imgheight / ratio);

    if (imgheight > divheight) {
        $("#" + imageid).css("margin-top", parseInt((Height - newHeight) / 2) + "px");
        $("#" + imageid).css("margin-left", parseInt((Width - newWidth) / 2) + "px");
    }
    else {
        $("#" + imageid).css("margin-top", parseInt((divheight - newHeight) / 2) + "px");
    }

    $("#" + imageid).css("width", parseInt(newWidth) + "px");
    $("#" + imageid).css("height", parseInt(newHeight - 2) + "px");

}



// This function will fire when user clicks section name in filter

function filterkitchen(sectioncode, x) {
    var divdisplaystatus = $("#kitchendiv" + sectioncode).css('display');
    if (divdisplaystatus == "none") {
        $(".sidearrowimagedown" + sectioncode).show();
        $(".sidearrowimage" + sectioncode).hide();

    } else {

        $(".sidearrowimagedown" + sectioncode).hide();
        $(".sidearrowimage" + sectioncode).show();
    }
    $.mobile.loading("show", {
        text: "Loading,Please Wait...",
        textVisible: true,
        theme: "a",
        textonly: true,
        html: "<span class='ui-bar ui-overlay-a ui-corner-all' style='text-align:center;background:#ccc'><img src='images/ajax-loader.gif'/><br/><h2 style='color:#304589'>Please Wait...</h2></span>"

    });
    $("#loading_pdt").show();

    SetLS('Filter_sectioncode', sectioncode);
    SetLS('Filter_sectionname', $(x).text());
    SetLS('Filter_groupname', null);
    SetLS('Filter_categoryname', null);

    $.ajax({
        type: "GET",
        crossDomain: true,
        url: groupcodeURL + "?SCode=" + sectioncode + "&deviceencryptedkey=" + encryptedkey + "&splib=" + splib + "&tablelib=" + tablelib,
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
            var list = output.BMCGroupCode;
            if (output.BMCGroupCode.length > 0) // Check the count of groups available
            {
                var html = "";
                html = html + '<div class="innerpopup">';
                html = html + '<div class="empty">';
                html = html + '</div>';
                $.each(list, function (i, item) {
                    var GROUPCODE = item.GROUPCODE;
                    var DESCRIPTION = item.DESCRIPTION;
                    var CATAGORYCOUNT = item.CATAGORYCOUNT;

                    html = html + "<div class='innerpopup'>";
                    html = html + "<div class='empty'>";
                    html = html + "</div>";
                    html = html + "<div class='popdiv'>";
                    html = html + "<table class='tableclass' style='background-color: #F9F9F9;border-color: #F9F9F9;'>";
                    html = html + "<tr style='width: 220px; text-align:left'>";
                    html = html + "<td>";
                    html = html + "<span class='filtertxt' onclick=filterkitchensub('" + sectioncode + "','" + GROUPCODE + "',this)>";
                    html = html + "<img src='images/ListRightArrow.png' style='width: 16px; height: 15px; float: left; margin-left: 9px;padding:3px;margin-top:0px' class='filterkitchensubimg" + sectioncode + GROUPCODE + "' /> <img src='images/ListRightArrowdown.png' style='width: 16px; height: 21px; float: left; margin-left: 9px;display:none;padding:3px;margin-top:-5px' class='filterkitchensubimgdown" + sectioncode + GROUPCODE + "' />";
                    html = html + DESCRIPTION + "</span><span class='filtertxt'>(" + CATAGORYCOUNT + ")</span>";
                    html = html + "<div id='kitchensubdiv" + sectioncode + GROUPCODE + "' class='filterkitchensub'>";
                    html = html + "</div>";
                    html = html + "</td>";
                    html = html + "</tr>";
                    html = html + "</table>";
                    html = html + "</div>";
                    html = html + "</div>";

                });
                html = html + '</div>';
                $("#kitchendiv" + sectioncode).html(html);
                $("#kitchendiv" + sectioncode).slideToggle();
                $.mobile.loading("hide");
                $("#loading_pdt").hide();

            }
            else {
                // If no groups available get the products using section code

                filterkitchenproduts(sectioncode);
            }

        }, error: function (data, errorThrown) {

            navigator.notification.alert('Unable to connect server.Please try again later!', null, 'Connection Failed', 'OK');

            $.mobile.loading("hide");
        }
    });
}

// This function will fire when a section has no sub groups in it

function filterkitchenproduts(sectioncode) {
    $.mobile.loading("show", {
        text: "Loading,Please Wait...",
        textVisible: true,
        theme: "a",
        textonly: true,
        html: "<span class='ui-bar ui-overlay-a ui-corner-all' style='text-align:center;background:#ccc'><img src='images/ajax-loader.gif'/><br/><h2 style='color:#304589'>Please Wait...</h2></span>"

    });
    $("#loading_pdt").show();
    SetLS('showmoreproducts', 'filter');
    writetologfile("Filter Search=Section:" + GetLS('Filter_sectionname'), 3);
    pdtimgkitchendivdisplay1(sectioncode, "", "");
}

// This function will fire when user clicks group name in filter

function filterkitchensub(sectioncode, groupcode, x) {
    var divdisplaystatus1 = $("#kitchensubdiv" + sectioncode + groupcode).css('display');

    if (divdisplaystatus1 == "none") {
        $(".filterkitchensubimgdown" + sectioncode + groupcode).show();
        $(".filterkitchensubimg" + sectioncode + groupcode).hide();

    } else {

        $(".filterkitchensubimgdown" + sectioncode + groupcode).hide();
        $(".filterkitchensubimg" + sectioncode + groupcode).show();
    }

    $.mobile.loading("show", {
        text: "Loading,Please Wait...",
        textVisible: true,
        theme: "a",
        textonly: true,
        html: "<span class='ui-bar ui-overlay-a ui-corner-all' style='text-align:center;background:#ccc'><img src='images/ajax-loader.gif'/><br/><h2 style='color:#304589'>Please Wait...</h2></span>"

    });
    $("#loading_pdt").show();
    SetLS('Filter_groupcode', groupcode);
    SetLS('Filter_groupname', $(x).text());
    SetLS('Filter_categoryname', null);
    $.ajax({
        type: "GET",
        crossDomain: true,
        url: categoryURL + "?SCode=" + sectioncode + "&GCode=" + groupcode + "&deviceencryptedkey=" + encryptedkey + "&splib=" + splib + "&tablelib=" + tablelib,
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
            var list = output.BMCCategory;
            if (output.BMCCategory.length > 0) // Check the count of Cateogory available
            {
                var html = "";

                html = html + "<div class='innerpopup'>";
                html = html + "<div class='empty'>";
                html = html + "</div>";
                $.each(list, function (i, item) {
                    var CATEGORYCODE = item.CATEGORYCODE;
                    var DESCRIPTION = item.DESCRIPTION;
                    html = html + "<div class='popdiv'>";
                    html = html + "<table class='tableclass' style='background-color: #F9F9F9;border-color: #F9F9F9;'>";
                    html = html + "<tr style='width: 220px; text-align: left'>";
                    html = html + "<td>";
                    html = html + "<span class='filtertxt' onclick=displayfilterproducts('" + sectioncode + "','" + groupcode + "','" + CATEGORYCODE + "',this)>";
                    html = html + "<img src='images/ListRightArrow.png' style='width: 16px; height: 15px; float: left; margin-left: 20px;padding:3px;margin-top:0px' />";
                    html = html + DESCRIPTION + "</span>";
                    html = html + "</td>";
                    html = html + "</tr>";
                    html = html + "</table>";
                    html = html + "</div>";
                });
                html = html + "</div>";
                $("#kitchensubdiv" + sectioncode + groupcode).html(html);
                $("#kitchensubdiv" + sectioncode + groupcode).slideToggle();
                $.mobile.loading("hide");
                $("#loading_pdt").hide();
            }
            else {

                filterkitchensub_products(sectioncode, groupcode);
            }

        }, error: function (data, errorThrown) {

            navigator.notification.alert('Unable to connect server.Please try again later!', null, 'Connection Failed', 'OK');

            $.mobile.loading("hide");
            $("#loading_pdt").hide();
        }
    });
}

// This function will fire when a group doesnt have categories 

function filterkitchensub_products(sectioncode, groupcode) {
    $.mobile.loading("show", {
        text: "Loading,Please Wait...",
        textVisible: true,
        theme: "a",
        textonly: true,
        html: "<span class='ui-bar ui-overlay-a ui-corner-all' style='text-align:center;background:#ccc'><img src='images/ajax-loader.gif'/><br/><h2 style='color:#304589'>Please Wait...</h2></span>"

    });
    $("#loading_pdt").show();
    SetLS('showmoreproducts', 'filter');
    writetologfile("Filter Search=Section:" + GetLS('Filter_sectionname') + "Group:" + GetLS('Filter_groupname'), 3);
    pdtimgkitchendivdisplay1(sectioncode, groupcode, "");
}

// This function will fire when user clicks category name in filter

function displayfilterproducts(sectioncode, groupcode, categorycode, x) {
    $.mobile.loading("show", {
        text: "Loading,Please Wait...",
        textVisible: true,
        theme: "a",
        textonly: true,
        html: "<span class='ui-bar ui-overlay-a ui-corner-all' style='text-align:center;background:#ccc'><img src='images/ajax-loader.gif'/><br/><h2 style='color:#304589'>Please Wait...</h2></span>"

    });

    SetLS('Filter_categorycode', categorycode);
    SetLS('Filter_categoryname', $(x).text());
    $("#loading_pdt").show();

    SetLS('showmoreproducts', 'filter');
    SetLS('filterbackbutton', 'filter');
    writetologfile("Filter Search=Section:" + GetLS('Filter_sectionname') + "Group:" + GetLS('Filter_groupname') + "Category:" + GetLS('Filter_categoryname'), 3);
    pdtimgkitchendivdisplay1(sectioncode, groupcode, categorycode);

}

// This function is used for loading more categories in the filter

function loadmorecategories() {
    loadsections();
}

// This is used to read the sectioninfo table contents and used to form 3x4 grid view
var totalgridlength = 0;
function loadsectionimages() {

    if ($(window).height() > 900) {
        $("#prdtsectionimges").css("min-height", "1000px");
        totalgridlength = 27;
    }
    else {
        $("#prdtsectionimges").css("min-height", "450px");
        totalgridlength = 12;

    }

    var showitems = window.openDatabase("blackman", "1.0", "blackman", 2 * 1024 * 1024);
    showitems.transaction(function showitemsbybranch(tx) {
        var html = "";
        tx.executeSql('SELECT * FROM sectioninfo', [], function itembranchsucce(tx, results)
        {
            SetLS("TotalSections", results.rows.length);
        });
        tx.executeSql('SELECT * FROM sectioninfo WHERE id between 1 and ' + totalgridlength, [], function itembranchsucces(txx, res) {
            var count = 0;
            html = html + "<div class='tableproducts'>";
            for (var i = 0; i < res.rows.length; i++) {
                var ss = res.rows.item(i);
                var id = ss.id;
                var SECTIONCODE = ss.SECTION;
                var DESCRIPTION = ss.DESCRIPTION;
                var HSCODE = ss.HSCODE;
                if (count % 3 == 0) {
                    if (Count = 0) {
                        //html = html + "<tr class='trclasspdt'>";
                        html = html + "<div class='pdtimg' style='float:left;margin-left: 1%;margin-top: 1%;'>";

                        if (SECTIONCODE == "FILTERS") {
                            html = html + "<img onerror=\"imgError(this);\" src='" + imagepath + HSCODE + ".jpg' style='width:27%;' onclick=\"pdtimgkitchendivdisplaynew1('" + HSCODE + "','" + SECTIONCODE + "','" + DESCRIPTION + "')\"  />";
                        }
                        else {
                            html = html + "<img onerror='imgError(this);' src='" + imagepath + HSCODE + ".jpg' style='width:70%;padding:5%'   onclick=\"pdtimgkitchendivdisplaynew1('" + HSCODE + "','" + SECTIONCODE + "','" + DESCRIPTION + "')\" />";
                        }


                        html = html + "<p class='pdt-content' style='text-align: center;font-size:11px'>";
                        html = html + DESCRIPTION + "</p>";
                        html = html + "</div>";
                    }
                    else {

                        html = html + "<div class='pdtimg' style='float:left;margin-left: 1%;margin-top: 1%;'>";


                        if (SECTIONCODE == "FILTERS") {
                            html = html + "<img onerror='imgError(this);' src='" + imagepath + HSCODE + ".jpg' style='width:27%'   onclick=\"pdtimgkitchendivdisplaynew1('" + HSCODE + "','" + SECTIONCODE + "','" + DESCRIPTION + "')\" />";
                        }
                        else {
                            html = html + "<img onerror='imgError(this);' src='" + imagepath + HSCODE + ".jpg' class='productimagesizedisplay'    onclick=\"pdtimgkitchendivdisplaynew1('" + HSCODE + "','" + SECTIONCODE + "','" + DESCRIPTION + "')\" />";
                        }

                        html = html + "<p class='pdt-content' style='text-align: center;font-size:11px'>";
                        html = html + DESCRIPTION + "</p>";
                        html = html + "</div>";
                    }

                }
                else {
                    html = html + "<div class='pdtimg' style='float:left;margin-left:1%;margin-top: 1%;'>";

                    if (SECTIONCODE == "FILTERS") {
                        html = html + "<img onerror='imgError(this);' src='" + imagepath + HSCODE + ".jpg' style='width:27%'   onclick=\"pdtimgkitchendivdisplaynew1('" + HSCODE + "','" + SECTIONCODE + "','" + DESCRIPTION + "')\" />";
                    }
                    else {
                        html = html + "<img onerror='imgError(this);' src='" + imagepath + HSCODE + ".jpg' class='productimagesizedisplay'   onclick=\"pdtimgkitchendivdisplaynew1('" + HSCODE + "','" + SECTIONCODE + "','" + DESCRIPTION + "')\" />";
                    }
                    html = html + "<p class='pdt-content' style='text-align: center;font-size:11px'>";
                    html = html + DESCRIPTION + "</p>";
                    html = html + "</div>";
                }

                count++;

            }

            html = html + "</div>";
            SetLS("images_oldcount", totalgridlength);
            document.getElementById("prdtsectionimges").innerHTML = html;
            $.mobile.loading("hide");
            $("#loading_pdt").hide();
        });
    });
}

//This function is used for handling swipe next function

function product_next() {

    var count = GetLS("images_oldcount");
    var from = parseInt(count) + 1;
    var to = parseInt(count) + totalgridlength;
    var where = from + ' and ' + to;

    var showitems = window.openDatabase("blackman", "1.0", "blackman", 2 * 1024 * 1024);
    showitems.transaction(function showitemsbybranch(tx) {
        var html = "";

        tx.executeSql('SELECT * FROM sectioninfo WHERE id between ' + where, [], function itembranchsucces(txx, res) {
            var count = 0;
            html = html + "<div class='tableproducts'>";
            for (var i = 0; i < res.rows.length; i++) {
                var ss = res.rows.item(i);
                var id = ss.id;
                var SECTIONCODE = ss.SECTION;
                var HSCODE = ss.HSCODE;
                var DESCRIPTION = ss.DESCRIPTION;

                if (count % 3 == 0) {
                    if (Count = 0) {
                        //html = html + "<tr class='trclasspdt'>";
                        html = html + "<div class='pdtimg' style='float:left;margin-left:1%;margin-top: 1%;'>";

                        if (SECTIONCODE == "FILTERS") {
                            html = html + "<img onerror='imgError(this);' src='" + imagepath + HSCODE + ".jpg' style='width:27%'  onclick=\"pdtimgkitchendivdisplaynew1('" + HSCODE + "','" + SECTIONCODE + "','" + DESCRIPTION + "')\" />";
                        }
                        else {
                            html = html + "<img onerror='imgError(this);' src='" + imagepath + HSCODE + ".jpg' style='width:70%;padding:5%'  onclick=\"pdtimgkitchendivdisplaynew1('" + HSCODE + "','" + SECTIONCODE + "','" + DESCRIPTION + "')\" />";
                        }

                        html = html + "<p class='pdt-content' style='text-align: center;font-size:11px'>";
                        html = html + DESCRIPTION + "</p>";
                        html = html + "</div>";
                    }
                    else {
                        //html = html + "</tr>";
                        //html = html + "<tr class='trclasspdt'>";
                        html = html + "<div class='pdtimg' style='float:left;margin-left:1%;margin-top: 1%;'>";
                        if (SECTIONCODE == "FILTERS") {
                            html = html + "<img onerror='imgError(this);' src='" + imagepath + HSCODE + ".jpg' style='width:27%'  onclick=\"pdtimgkitchendivdisplaynew1('" + HSCODE + "','" + SECTIONCODE + "','" + DESCRIPTION + "')\" />";
                        }
                        else {
                            html = html + "<img onerror='imgError(this);' src='" + imagepath + HSCODE + ".jpg' class='productimagesizedisplay'   onclick=\"pdtimgkitchendivdisplaynew1('" + HSCODE + "','" + SECTIONCODE + "','" + DESCRIPTION + "')\" />";
                        }
                        // html = html + "<img onerror='imgError(this);' src='" + imagepath + SECTION + ".jpg' style='width:70%'  onclick=pdtimgkitchendivdisplay('" + SECTION + "'); />";

                        html = html + "<p class='pdt-content' style='text-align: center;font-size:11px'>";
                        html = html + DESCRIPTION + "</p>";
                        html = html + "</div>";
                    }

                }
                else {
                    html = html + "<div class='pdtimg' style='float:left;margin-left:1%;margin-top: 1%;'>";

                    if (SECTIONCODE == "FILTERS") {
                        html = html + "<img onerror='imgError(this);' src='" + imagepath + HSCODE + ".jpg' style='width:27%'  onclick=\"pdtimgkitchendivdisplaynew1('" + HSCODE + "','" + SECTIONCODE + "','" + DESCRIPTION + "')\" />";
                    }
                    else {
                        html = html + "<img onerror='imgError(this);' src='" + imagepath + HSCODE + ".jpg' class='productimagesizedisplay'  onclick=\"pdtimgkitchendivdisplaynew1('" + HSCODE + "','" + SECTIONCODE + "','" + DESCRIPTION + "')\" />";
                    }

                    html = html + "<p class='pdt-content' style='text-align: center;font-size:11px'>";
                    html = html + DESCRIPTION + "</p>";
                    html = html + "</div>";
                }

                count++;

            }

            html = html + "</div>";
            SetLS("images_oldcount", to);
            document.getElementById("prdtsectionimges").innerHTML = html;
            $.mobile.loading("hide");
            $("#loading_pdt").hide();
        });
    });
}

//This function is used for handling swipe previous function

function product_previous() {
    var count = GetLS("images_oldcount");
    var from = parseInt(count) - totalgridlength - (totalgridlength - 1);
    var to = parseInt(count) - totalgridlength;
    var where = from + ' and ' + to;

    if (to > 0) {
        var showitems = window.openDatabase("blackman", "1.0", "blackman", 2 * 1024 * 1024);
        showitems.transaction(function showitemsbybranch(tx) {
            var html = "";

            tx.executeSql('SELECT * FROM sectioninfo WHERE id between ' + where, [], function itembranchsucces(txx, res) {
                var count = 0;
                html = html + "<div class='tableproducts'>";
                for (var i = 0; i < res.rows.length; i++) {
                    var ss = res.rows.item(i);
                    var id = ss.id;
                    var SECTIONCODE = ss.SECTION;
                    var HSCODE = ss.HSCODE;
                    var DESCRIPTION = ss.DESCRIPTION;

                    if (count % 3 == 0) {
                        if (Count = 0) {
                            //html = html + "<tr class='trclasspdt'>";
                            html = html + "<div class='pdtimg' style='float:left;margin-left: 1%;margin-top: 1%;'>";

                            if (SECTIONCODE == "FILTERS") {
                                html = html + "<img onerror='imgError(this);' src='" + imagepath + HSCODE + ".jpg' style='width:27%;'  onclick=\"pdtimgkitchendivdisplaynew1('" + HSCODE + "','" + SECTIONCODE + "','" + DESCRIPTION + "')\" />";
                            }
                            else {
                                html = html + "<img onerror='imgError(this);' src='" + imagepath + HSCODE + ".jpg' style='width:70%;padding:5%'   onclick=\"pdtimgkitchendivdisplaynew1('" + HSCODE + "','" + SECTIONCODE + "','" + DESCRIPTION + "')\" />";
                            }


                            html = html + "<p class='pdt-content' style='text-align: center;font-size:11px'>";
                            html = html + DESCRIPTION + "</p>";
                            html = html + "</div>";
                        }
                        else {
                            //html = html + "</tr>";
                            //html = html + "<tr class='trclasspdt'>";
                            html = html + "<div class='pdtimg' style='float:left;margin-left: 1%;margin-top: 1%;'>";


                            if (SECTIONCODE == "FILTERS") {
                                html = html + "<img onerror='imgError(this);' src='" + imagepath + HSCODE + ".jpg' style='width:27%'   onclick=\"pdtimgkitchendivdisplaynew1('" + HSCODE + "','" + SECTIONCODE + "','" + DESCRIPTION + "')\" />";
                            }
                            else {
                                html = html + "<img onerror='imgError(this);' src='" + imagepath + HSCODE + ".jpg' class='productimagesizedisplay'    onclick=\"pdtimgkitchendivdisplaynew1('" + HSCODE + "','" + SECTIONCODE + "','" + DESCRIPTION + "')\" />";
                            }

                            html = html + "<p class='pdt-content' style='text-align: center;font-size:11px'>";
                            html = html + DESCRIPTION + "</p>";
                            html = html + "</div>";
                        }

                    }
                    else {
                        html = html + "<div class='pdtimg' style='float:left;margin-left:1%;margin-top: 1%;'>";

                        if (SECTIONCODE == "FILTERS") {
                            html = html + "<img onerror='imgError(this);' src='" + imagepath + HSCODE + ".jpg' style='width:27%'   onclick=\"pdtimgkitchendivdisplaynew1('" + HSCODE + "','" + SECTIONCODE + "','" + DESCRIPTION + "')\" />";
                        }
                        else {
                            html = html + "<img onerror='imgError(this);' src='" + imagepath + HSCODE + ".jpg' class='productimagesizedisplay'   onclick=\"pdtimgkitchendivdisplaynew1('" + HSCODE + "','" + SECTIONCODE + "','" + DESCRIPTION + "')\" />";
                        }
                        html = html + "<p class='pdt-content' style='text-align: center;font-size:11px'>";
                        html = html + DESCRIPTION + "</p>";
                        html = html + "</div>";
                    }

                    count++;

                }

                html = html + "</div>";
                SetLS("images_oldcount", to);
                document.getElementById("prdtsectionimges").innerHTML = html;
                $.mobile.loading("hide");
                $("#loading_pdt").hide();
            });
        });
    }
}

// This funtion is called when user opt for manual search by giving product name, based on categories

function product_search() {
    GlobalItemsList.length = 0;
    var c_page = GetLS("page");
    var result = c_page.split(",");
    if (result[result.length - 1] != "sections") {
        SetLS("page", c_page + ",sections");
    }
    var from_count = 1;
    var to_count = TotalProductCount;

    var searchtext = $("#txtpdtsrch").val().trim();
    if (searchtext == "" || searchtext == null) {

        navigator.notification.alert('Please Enter Product Name.', null, 'Alert', 'OK');

        return false;
    }
    SetLS("breadcrumb", "search");
    SetLS("LS_SearchText", searchtext);
    $("#loading_pdt").show();
    $.mobile.loading("show", {
        text: "Loading,Please Wait...",
        textVisible: true,
        theme: "a",
        textonly: true,
        html: "<span class='ui-bar ui-overlay-a ui-corner-all' style='text-align:center;background:#ccc'><img src='images/ajax-loader.gif'/><br/><h2 style='color:#304589'>Loading Products...</h2></span>"

    });
    SetLS('showmoreproducts', 'search');
    var branch_id = GetLS('default_branchcode');

    searchtext = searchtext.split(" ");
    var result = "";
    for (var i = 0; i < searchtext.length; i++) {

        if (i == searchtext.length - 1) {
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
        url: AdvancedSearchURL + "BranchCode=" + branch_id + "&StartIndex=" + from_count + "&EndIndex=" + to_count + "&SEARCHTYPE=PROD1&SEARCHTEXT=" + searchtext + "&cusno=" + customerno + "&username=" + UserProfile + "&deviceencryptedkey=" + encryptedkey + "&accesstoken=" + AccessTokenKey + "&splib=" + splib + "&tablelib=" + tablelib + "&timestamp=" + Math.random(),
        dataType: "xml",
        success: function (xmlData) {
            var dbinsert = window.openDatabase("blackman", "1.0", "blackman", 2 * 1024 * 1024);       /* opening local database */
            dbinsert.transaction(function branchdetails(tx)
            {
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

                var resultJSON = $Name.text();
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

                        if (ItemUnitPriceAmount == 0 || ItemUnitPriceAmount == "0" || ItemUnitPriceAmount == "" || ItemUnitPriceAmount == null || ItemUnitPriceAmount == "CNF") {
                            ItemUnitPriceAmount = "0";
                        }

                        var qry = 'INSERT INTO iteminfo (OurItemNumber,OurProductNumber,ItemOrProductDescription,ItemStockingUnitOfMeasure,InventoryItemWeight,PRODUCTIMAGE,AVAILABLEQUNTY,ItemUnitPriceAmount,BRANCH,STOCK) VALUES (?,?,?,?,?,?,?,?,?,?)';

                        tx.executeSql(qry, [OurItemNumber, OurProductNumber, ItemOrProductDescription, ItemStockingUnitOfMeasure, InventoryItemWeight, PRODUCTIMAGE, AVAILABLEQUNTY, ItemUnitPriceAmount, BRANCH, STOCK]);

                    });

                    SetLS("product_count", to_count);
                    SetLS("IsNewFilterAttributes", "Yes");
                    SetLS("SearchType", "PROD1");
                    writetologfile("User searched for product " + searchtext + ".It has results.", 3);
                    loadsectionproductscontents("Yes");
                }
                else {
                    SetLS("IsNewFilterAttributes", "Yes");
                    loadsecondproductservice();

                }
            }, errorCB);
        }, error: function (data, errorThrown) {

            navigator.notification.alert('Unable to connect server.Please try again later!', null, 'Connection Failed', 'OK');
            $.mobile.loading("hide");
            $("#loading_pdt").hide();
        }


    });
    SetLS("F_Categorycode","");
    SetLS("F_Groupcode","");
    SetLS("F_Sectioncode","");
}

// Function for products serach on all the products

function loadsecondproductservice() {
    GlobalItemsList.length = 0;
    var c_page = GetLS("page");
    var result = c_page.split(",");
    if (result[result.length - 1] != "sections") {
        SetLS("page", c_page + ",sections");
    }

    var searchtext = $("#txtpdtsrch").val().trim();

    searchtext = searchtext.split(" ");
    var result = "";
    for (var i = 0; i < searchtext.length; i++) {

        if (i == searchtext.length - 1) {
            result = result + searchtext[i];
        }
        else {
            result = result + searchtext[i] + "@";
        }

    }
    searchtext = result;

    $("#loading_pdt").show();
    $.mobile.loading("show", {
        text: "Loading,Please Wait...",
        textVisible: true,
        theme: "a",
        textonly: true,
        html: "<span class='ui-bar ui-overlay-a ui-corner-all' style='text-align:center;background:#ccc'><img src='images/ajax-loader.gif'/><br/><h2 style='color:#304589'>Loading Products...</h2></span>"

    });
    SetLS("showmoreproducts", "search");
    var branch_id = GetLS('default_branchcode');

    var from_count = 1;
    var to_count = TotalProductCount;

    $.ajax({
        type: "GET",
        crossDomain: true,
        url: AdvancedSearchURL + "BranchCode=" + branch_id + "&StartIndex=" + from_count + "&EndIndex=" + to_count + "&SEARCHTYPE=PROD2&SEARCHTEXT=" + searchtext + "&cusno=" + customerno + "&username=" + UserProfile + "&deviceencryptedkey=" + encryptedkey + "&accesstoken=" + AccessTokenKey + "&splib=" + splib + "&tablelib=" + tablelib + "&timestamp=" + Math.random(),
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

                var resultJSON = $Name.text();
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

                        if (ItemUnitPriceAmount == 0 || ItemUnitPriceAmount == "0" || ItemUnitPriceAmount == "" || ItemUnitPriceAmount == null || ItemUnitPriceAmount == "CNF") {
                            ItemUnitPriceAmount = "0";
                        }

                        var qry = 'INSERT INTO iteminfo (OurItemNumber,OurProductNumber,ItemOrProductDescription,ItemStockingUnitOfMeasure,InventoryItemWeight,PRODUCTIMAGE,AVAILABLEQUNTY,ItemUnitPriceAmount,BRANCH,STOCK) VALUES (?,?,?,?,?,?,?,?,?,?)';

                        tx.executeSql(qry, [OurItemNumber, OurProductNumber, ItemOrProductDescription, ItemStockingUnitOfMeasure, InventoryItemWeight, PRODUCTIMAGE, AVAILABLEQUNTY, ItemUnitPriceAmount, BRANCH, STOCK]);

                    });

                    SetLS("product_count", to_count);
                    SetLS("SearchType", "PROD2");
                    loadsectionproductscontents("Yes");
                }

                else {
                    writetologfile("User searched for product " + searchtext + ".It has no results.", 3);
                    loadsectionproductscontents("Yes");
                }
            }, errorCB);
        }, error: function (data, errorThrown) {

            navigator.notification.alert('Unable to connect server.Please try again later!', null, 'Connection Failed', 'OK');

            $.mobile.loading("hide");
            $("#loading_pdt").hide();
        }
    });
}


// Function to handle broken images

function imgError(image) {
    image.onerror = "";
    image.src = "images/no_image.jpg";
    return true;
}

function checkimageexistance(image) {

    var check = true;
    var img = new Image();

    img.src = image;

    $(img).error(function () {
        check = false;
    });

    return check;
}

//This function is used for clearing filters

function clearfilters() {
    localStorage.removeItem('Filter_sectioncode');
    localStorage.removeItem('Filter_groupcode');
    localStorage.removeItem('Filter_categorycode');
    localStorage.removeItem('Filter_sectionname');
    localStorage.removeItem('Filter_groupname');
    localStorage.removeItem('Filter_categoryname');
    var message = "Cleared All filters";
    writetologfile(message, 5);
}
function pdtimgkitchendivdisplaynew1(HSCODE,Sectioncode,description) {
    description = description.replace(/_/g, " ");
    SetLS("breadlist1", description);
    SetLS("F_HSCODE", HSCODE);
    var c_page = GetLS("page");
    var result = c_page.split(",");
    if (result[result.length - 1] != "filter") {
        SetLS("page", c_page + ",filter");
    }

    $("#list1products").html("");
    $("#loading_pdt").show();
    $.mobile.loading("show",
    {
        text: "Please Wait...",
        textVisible: true,
        theme: "a",
        textonly: true,
        html: "<span class='ui-bar ui-overlay-a ui-corner-all' style='text-align:center;background:#ccc'><img src='images/ajax-loader.gif'/><br/><h2 style='color:#304589'>Please Wait...</h2></span>"

    });

    StartIndex = 1;
    EndIndex = 500;
    $.ajax({
        type: "GET",
        crossDomain: true,
       // url: newproductlistpage1 + "?StartIndex=" + StartIndex + "&EndIndex=" + EndIndex + "&SecName=" + description + "&deviceencryptedkey=" + encryptedkey + "&splib=" + splib + "&tablelib=" + tablelib,
        url: NewCategoryServiceURL + "hsCode=" + HSCODE + "&secCode=" + Sectioncode + "&groupCode=&catCode=&deviceEncryptedkey=" + encryptedkey + "&spLib=" + splib + "&tableLib=" + tablelib,
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
            var list = output.BMCCategoryDetails;
            if (output.BMCCategoryDetails.length > 0) // Check the count of Cateogory available
            {
                var html = "";
                html = html + '<div class="breadcrumstyle" style="width:100%;display:block">';
                html = html + '<div style="text-align:left;float:left" onclick="pdtimgkitchendivdisplaynew1back()">   <img src="images/arrow_previous.png" /></div><div id="sectionpath" style="margin-top: 10px;font-weight:bold;color:#304589;font-size: 10px;" class="sectionpath1" onclick="breadcrumlist1()">';
                html = html + '' + description + '</div>';
                html = html + ' </div>';
                //   html = html + "  <div style='text-align:left;margin-left:20px' onclick='pdtimgkitchendivdisplaynew1back()'>   <img src='images/backproduct.png' /></div>";

                html = html + " <ul style='color:#304589;font-size:13px;font-weight:bold;width:100%;line-height:35PX;padding:0px;margin-top: 1px;'>";
                $.each(list, function (i, item) {
                    var SECTIONCODE = item.SECTIONCODE;
                    var DESCRIPTION = item.DESCRIPTION;
                    var GROUPCOUNT = item.GROUPCOUNT;

                    var DESCRIPTION1 = DESCRIPTION.replace(/ /g, '_').replace(/'/g,'');
                        
                    //html = html + " <li  onclick=\"pdtimgkitchendivdisplaynew2('" + SECTIONCODE + "','" + DESCRIPTION1 + "','" + description + "')\">" + DESCRIPTION + " (" + GROUPCOUNT + ")</li>";
                    html = html + '<div>';
                    if (GROUPCOUNT > 0 && SECTIONCODE != "" && SECTIONCODE != null)
                    {
                        html = html + "<div onclick=\"pdtimgkitchendivdisplaynew2('" + HSCODE + "','" + SECTIONCODE + "','" + DESCRIPTION1 + "')\"  class='odd'>";
                        html = html + '<div style="margin: 4px 10px 10px 10px;  font-size: 12px;">';
                        html = html + DESCRIPTION + '(' + GROUPCOUNT + ')';
                    }
                    else
                    {

                        SetLS("breadlist2", "");
                        SetLS("breadlist3", "");
                        html = html + "<div onclick=\"pdtimgkitchendivdisplay('" + SECTIONCODE + "','','','" + DESCRIPTION1 + "')\"  class='odd'>";
                        html = html + '<div style="margin: 4px 10px 10px 10px;  font-size: 12px;">';
                        html = html + DESCRIPTION;
                    }
                   
                    html = html + '<img src="images/ListRightArrow.png" style="float: right; width: 25px;margin-top: 4px;" /></div>';
                    html = html + '</div>';
                    html = html + '</div>';


                });
                html = html + " </ul>";
                $("#list1products").html(html);
                $("#loading_pdt").hide();
                $.mobile.loading("hide");

            }
            else {
                html = html + '<div class="breadcrumstyle" style="width:100%;display:block">';
                html = html + '<div style="text-align:left;" onclick="pdtimgkitchendivdisplaynew1back()">   <img src="images/arrow_previous.png" /></div><div id="sectionpath" style="margin-top: 10px;font-weight:bold;color:#304589;  font-size: 10px;" class="sectionpath1" onclick="breadcrumlist1()">';
                html = html + '' + description + '</div>';
                html = html + ' </div>';
                //  html = html + "  <div style='text-align:left;margin-left:20px' onclick='pdtimgkitchendivdisplaynew1back()'>   <img src='images/save_button.png' /></div>";
                html = html + " <div><No Groups Found</div>";

                $("#list1products").html(html);
                $("#loading_pdt").hide();
                $.mobile.loading("hide");
            }

        }, error: function (data, errorThrown) {

            navigator.notification.alert('Unable to connect server.Please try again later!', null, 'Connection Failed', 'OK');
            $("#loading_pdt").hide();
            $.mobile.loading("hide");

        }
    });

    $("#loaditems123").hide();
    $("#prdtsectionimges").hide();
    $("#sectiondiv").hide();
    $(".srchdivimg").hide();
    $("#navigationdiv").hide();
    $("#list1products").show();
    $("#backbuttongrid").hide();
    $("#filterdiv").show();
}
function pdtimgkitchendivdisplaynew1back() {
    $(".tableproducts1filter").hide();
    $(".cleardivivfilter").hide();
    $("#filterselctiondiv").hide();
    $("#loaditems123").hide();
    
    $("#prdtsectionimges").show();
    $("#sectiondiv").show();
    $(".searchdiv").show();
    $(".srchdivimg").show();
    $("#navigationdiv").show();
    $("#list1products").hide();
    $("#list2products").hide();
    $("#list3products").hide();
    $("#backbuttongrid").hide();
    $(".breadcrumstylefilter").hide();
    $("#default_div").show();

    var c_page = GetLS("page");
    var result = c_page.split(",");
    if (result.length == 1) {
        var new_page = c_page.replace(result[result.length - 1], "");
        SetLS("page", new_page);
    } else {
        var new_page = c_page.replace(',' + result[result.length - 1], "");
        SetLS("page", new_page);
    }


}
function pdtimgkitchendivdisplaynew2(HSCODE,sectioncode, newDESCRIPTION) {
    newDESCRIPTION = newDESCRIPTION.replace(/_/g, " ");
    SetLS("breadlist2", newDESCRIPTION);
    var c_page = GetLS("page");
    var result = c_page.split(",");
    if (result[result.length - 1] != "filter2") {
        SetLS("page", c_page + ",filter2");
    }

    $("#list2products").html("");
    $("#loading_pdt").show();
    $.mobile.loading("show",
    {
        text: "Please Wait...",
        textVisible: true,
        theme: "a",
        textonly: true,
        html: "<span class='ui-bar ui-overlay-a ui-corner-all' style='text-align:center;background:#ccc'><img src='images/ajax-loader.gif'/><br/><h2 style='color:#304589'>Please Wait...</h2></span>"

    });

    $.ajax({
        type: "GET",
        crossDomain: true,
       // url: groupcodeURL + "?SCode=" + sectioncode + "&deviceencryptedkey=" + encryptedkey + "&splib=" + splib + "&tablelib=" + tablelib + "&timestamp=" + Math.random(),
        url: NewCategoryServiceURL + "hsCode=" + HSCODE + "&secCode=" + sectioncode + "&groupCode=&catCode=&deviceEncryptedkey=" + encryptedkey + "&spLib=" + splib + "&tableLib=" + tablelib,
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
            var list = output.BMCCategoryDetails;
            if (output.BMCCategoryDetails.length > 0) // Check the count of Cateogory available
            {
                var html = "";
                html = html + '<div class="breadcrumstyle" style="width:100%;display:block">';
                html = html + '<div style="text-align:left;float:left" onclick="pdtimgkitchendivdisplaynew2back()">   <img src="images/arrow_previous.png" /></div><div id="sectionpath" style="margin-top: 4px;font-weight:bold;color:#304589  ;font-size: 10px;float:left" class="sectionpath1" onclick="breadcrumlist2()">';
                html = html + '' + GetLS('breadlist1') + '</div><div onclick="breadcrumlist2()" style="margin-top: 4px;font-weight:bold;color:#304589  ;font-size: 10px;" class="sectionpath1"><img src="images/next.png" style="width:9px" class="nxtimgclass" />' + newDESCRIPTION + '</div>';
                html = html + ' </div>';


                // html = html + "  <div style='text-align:left;margin-left:20px' onclick='pdtimgkitchendivdisplaynew2back()'>   <img src='images/backproduct.png' /></div>";

                html = html + " <ul style='color:#304589;font-size:13px;font-weight:bold;width:100%;line-height:35PX;padding:0px;margin-top: 1px;'>";
                $.each(list, function (i, item) {
                    var GROUPCODE = item.GROUPCODE;
                    var DESCRIPTION = item.DESCRIPTION;
                    var CATAGORYCOUNT = item.CATAGORYCOUNTs;

                    var DESCRIPTION1 = DESCRIPTION.replace(/ /g, '_').replace(/'/g,'');;

                    //html = html + " <li onclick=\"productlistingfinal('" + sectioncode + "','" + GROUPCODE + "','" + DESCRIPTION1 + "','" + newDESCRIPTION + "','" + descriptioncat + "')\">" + DESCRIPTION + " (" + CATAGORYCOUNT + ")</li>";
                    html = html + '<div>';

                    if (CATAGORYCOUNT > 0 && GROUPCODE != "" && GROUPCODE != null) {
                        html = html + "<div onclick=\"productlistingfinal('" + HSCODE + "','" + sectioncode + "','" + GROUPCODE + "','" + DESCRIPTION1 + "')\"  class='odd'>";
                        html = html + '<div style="margin: 4px 10px 10px 10px;  font-size: 12px;">';
                        html = html + DESCRIPTION + '(' + CATAGORYCOUNT + ')';
                    }
                    else {

                        SetLS("breadlist3", "");
                        html = html + "<div onclick=\"pdtimgkitchendivdisplay('" + sectioncode + "','" + GROUPCODE + "','','" + DESCRIPTION1 + "')\"  class='odd'>";
                        html = html + '<div style="margin: 4px 10px 10px 10px;  font-size: 12px;">';
                        html = html + DESCRIPTION;
                    }



                    html = html + '<img src="images/ListRightArrow.png" style="float: right; width: 25px;margin-top: 4px;" /></div>';
                    html = html + '</div>';
                    html = html + '</div>';


                });
                html = html + " </ul>";
                $("#list2products").html(html);
                SetLS("IsNewFilterAttributes", "Yes");
                $("#loading_pdt").hide();
                $.mobile.loading("hide");
            }
            else {
                html = html + '<div class="breadcrumstyle" style="width:100%;display:block">';
                html = html + '<div style="text-align:left;" onclick="pdtimgkitchendivdisplaynew1back()">   <img src="images/arrow_previous.png" /></div><div id="sectionpath" style="margin-top: 10px;font-weight:bold;color:#304589;  font-size: 10px;" class="sectionpath1" onclick="breadcrumlist1()">';
                html = html + '' + description + '</div>';
                html = html + ' </div>';
                //  html = html + "  <div style='text-align:left;margin-left:20px' onclick='pdtimgkitchendivdisplaynew1back()'>   <img src='images/save_button.png' /></div>";
                html = html + " <div><No Groups Found</div>";
                $("#list2products").html(html);
                SetLS("IsNewFilterAttributes", "Yes");
                $("#loading_pdt").hide();
                $.mobile.loading("hide");
            }

        }, error: function (data, errorThrown) {

            navigator.notification.alert('Unable to connect server.Please try again later!', null, 'Connection Failed', 'OK');
            $("#loading_pdt").hide();
            $.mobile.loading("hide");

        }
    });
    $("#prdtsectionimges").hide();
    $("#sectiondiv").hide();
    $(".srchdivimg").hide();
    $("#navigationdiv").hide();
    $("#list1products").hide();
    $("#list2products").show();
}
function pdtimgkitchendivdisplaynew2back() {
    $("#prdtsectionimges").hide();
    $("#sectiondiv").hide();
    $(".srchdivimg").hide();
    $("#sectionpath").html("<span>" + GetLS("breadlist1") + "</span>")
    $("#navigationdiv").hide();
    $("#list1products").show();
    $("#list2products").hide();
    $("#list3products").hide();
    $(".breadcrumstyle").show();
    $("#breadcrumstyle").hide();
    $(".breadcrumstylefilter").hide();
    $("#default_div").show();
    var c_page = GetLS("page");
    var result = c_page.split(",");
    if (result.length == 1) {
        var new_page = c_page.replace(result[result.length - 1], "");
        SetLS("page", new_page);
    } else {
        var new_page = c_page.replace(',' + result[result.length - 1], "");
        SetLS("page", new_page);
    }
}


function productlistingfinal(HSCODE, sectioncode, groupcode, DESCRIPTIONlast) {
    var DESCRIPTIONlast = DESCRIPTIONlast.replace(/_/g, ' ');
    SetLS("breadlist3", DESCRIPTIONlast);
    var c_page = GetLS("page");
    var result = c_page.split(",");
    if (result[result.length - 1] != "filter3") {
        SetLS("page", c_page + ",filter3");
    }

    $("#list3products").html("");
    $("#loading_pdt").show();
    $.mobile.loading("show",
    {
        text: "Please Wait...",
        textVisible: true,
        theme: "a",
        textonly: true,
        html: "<span class='ui-bar ui-overlay-a ui-corner-all' style='text-align:center;background:#ccc'><img src='images/ajax-loader.gif'/><br/><h2 style='color:#304589'>Please Wait...</h2></span>"

    });
    DESCRIPTIONlast = DESCRIPTIONlast.replace(/_/g, " ");
    $.ajax({
        type: "GET",
        crossDomain: true,
        url: NewCategoryServiceURL + "hsCode=" + HSCODE + "&secCode=" + sectioncode + "&groupCode=" + groupcode + "&catCode=&deviceEncryptedkey=" + encryptedkey + "&spLib=" + splib + "&tableLib=" + tablelib,
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
            var list = output.BMCCategoryDetails;

           
            if (output.BMCCategoryDetails.length > 0) // Check the count of Cateogory available
            {
                var html = "";

                html = html + '<div class="breadcrumstyle" style="width:100%;display:block">';
                html = html + '<div style="text-align:left;float:left" onclick="pdtimgkitchendivdisplaynew3back()">   <img src="images/arrow_previous.png" /></div><div id="sectionpath" style="margin-top: 4px;font-weight:bold;color:#304589;  font-size: 10px;line-height:18px;float:left" class="sectionpath1" onclick="breadcrumlist1()">';
                html = html + '' + GetLS('breadlist1') + '</div><div  style="margin-top: 4px;font-weight:bold;color:#304589;float:left;  font-size: 10px;line-height:18px" class="sectionpath1" onclick="breadcrumlist2()"><img src="images/next.png" style="width:9px" class="nxtimgclass" />' + GetLS('breadlist2') + '</div><div  style="margin-top: 4px;font-weight:bold;color:#304589;float:left;  font-size: 10px;line-height:18px" class="sectionpath1" onclick="breadcrumlist3()"><img src="images/next.png" style="width:9px" class="nxtimgclass" />' + DESCRIPTIONlast + '</div>';
                html = html + ' </div>';



                html = html + " <ul style='color:#304589;font-size:13px;font-weight:bold;width:100%;line-height:35PX;padding:0px;margin-top: 1px;'>";
                $.each(list, function (i, item)
                {
                    var CATEGORYCODE = item.CATEGORYCODE;
                    var DESCRIPTION = item.DESCRIPTION;
                    DESCRIPTION = DESCRIPTION.replace(/'/g, "");
                    html = html + '<div>';
                    html = html + "<div onclick=\"pdtimgkitchendivdisplay('" + sectioncode + "','" + groupcode + "','" + CATEGORYCODE + "','" + DESCRIPTION + "')\"  class='odd'>";
                    html = html + '<div style="margin: 4px 10px 10px 10px;  font-size: 12px;">';

                    html = html + DESCRIPTION;
                    html = html + '<img src="images/ListRightArrow.png" style="float: right; width: 25px;margin-top: 4px;" /></div>';
                    html = html + '</div>';
                    html = html + '</div>';


                });
                html = html + "</div>";
                $("#list3products").html(html);
                SetLS("IsNewFilterAttributes", "Yes");
                $("#loading_pdt").hide();
                $.mobile.loading("hide");
            }
            else {

                $("#list3products").html(html);
                SetLS("IsNewFilterAttributes", "Yes");
                $("#loading_pdt").hide();
                $.mobile.loading("hide");
            }

        }, error: function (data, errorThrown) {

            navigator.notification.alert('Unable to connect server.Please try again later!', null, 'Connection Failed', 'OK');
            $("#loading_pdt").hide();
            $.mobile.loading("hide");
        }
    });
    $("#prdtsectionimges").hide();
    $("#sectiondiv").hide();
    $(".srchdivimg").hide();
    $("#navigationdiv").hide();
    $("#list1products").hide();
    $("#list2products").hide();
    $("#list3products").show();
    $("#backbuttongrid").hide();
    $(".breadcrumstyle").show();
   

}
function pdtimgkitchendivdisplaynew3back() {
    $("#prdtsectionimges").hide();
    $("#sectiondiv").hide();
    $(".srchdivimg").hide();
    $("#navigationdiv").hide();
    $("#list1products").hide();
    $("#list3products").hide();
    $("#list2products").show();
    $("#default_div").show();
    $("#backbuttongrid").hide();
    $(".breadcrumstyle").show();
    $(".breadcrumstylefilter").hide();
    var c_page = GetLS("page");
    var result = c_page.split(",");
    if (result.length == 1) {
        var new_page = c_page.replace(result[result.length - 1], "");
        SetLS("page", new_page);
    } else {
        var new_page = c_page.replace(',' + result[result.length - 1], "");
        SetLS("page", new_page);
    }
}

function backbuttongrid() {
    $("#prdtsectionimges").show();
    $("#sectiondiv").hide();
    $(".srchdivimg").show();
    $("#navigationdiv").show();
    $("#list1products").hide();
    $("#backbuttongrid").hide();

}


function breadcrumlist1() {
    $("#loaditems123").hide();
    $("#filterdiv").show();
    $(".tableproducts1filter").hide();
    $(".cleardivivfilter").hide();
    $("#filterselctiondiv").hide();

    pdtimgkitchendivdisplaynew1back();
}
function breadcrumlist2() {
    $(".tableproducts1filter").hide();
    $(".cleardivivfilter").hide();
    $("#filterselctiondiv").hide();

    $("#loaditems123").hide();
    $("#filterdiv").show();
    pdtimgkitchendivdisplaynew2back();
}
function breadcrumlist3() {
    $(".tableproducts1filter").hide();
    $(".cleardivivfilter").hide();
    $("#filterselctiondiv").hide();
    
    $("#loaditems123").hide();
    $("#filterdiv").show();
    pdtimgkitchendivdisplaynew3back();
}
function breadcrumlist4() {
    $("#filterdiv").show();
    $("#loaditems123").hide();
    pdoductpagereload();
}