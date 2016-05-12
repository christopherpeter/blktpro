/*
This javascript files is only for Find branch functions
Creaded on:22/07/2014 12:05PM
License:Tychons solutions
*/

var locations = [];
var changedValues = [];
var textJQResults = $("#text_results");

//Function for mapping filter branches to the map
function loadGPSLocations() {
    'use strict';
    setLS('Showroom', 'none');  //old branch place
    changedValues.length = 0;
    var lat1, lon1;
    if (getLS('GPS_lat') !== null) {
        lat1 = getLS('GPS_lat');
    }
    if (getLS('GPS_lon') !== null) {
        lon1 = getLS('GPS_lon');
    }
    setLS('Default', 2);
    var lat2, lon2, radlat1, radlat2, theta, unit, radtheta, dist, distanceInKM;
    for (var i = 0; i < locations.length; i++) {
        lat2 = locations[i][1];
        lon2 = locations[i][2];
        radlat1 = Math.PI * lat1 / 180;
        radlat2 = Math.PI * lat2 / 180;
        theta = (lon1) - (lon2);
        unit = 'K';
        radtheta = Math.PI * theta / 180;
        dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit === "K") { dist = dist * 1.609344 }
        if (unit === "N") { dist = dist * 0.8684 }
        distanceInKM = (dist / 1.6).toFixed(2);
        if (distanceInKM <= 20) {
            changedValues.push([locations[i][0], locations[i][1], locations[i][2], distanceInKM, 1, locations[i][4], locations[i][5], locations[i][6], locations[i][7], locations[i][8]])
        }
    }
    changedValues.sort(sortFunc);
    setLS('Showroom', 'none');
    var html = "<div class='empty'></div>";
    html = html + "<div style='background: #fff;'>";
    html = html + "<div style='border-bottom: 1px solid #CCCCCC; height: 25px;margin-top: 25px;'>";
    html = html + "<p class='p-contentlist' >";
    html = html + "List of Branches</p>";
    html = html + "</div>";
    html = html + "<div class='innerpopup' style='font-size:12px'>";
    for (var k = 0; k < changedValues.length; k++) {
        var addressSplit = changedValues[k][5].split(',');
        html = html + "<div class='popdiv'>";
        html = html + "<table class='tableclass'>";
        html = html + "<tr style='width:100%;'>";
        html = html + " <td style='width:85%;'>";
        html = html + " <table>";
        html = html + "<tr>";
        html = html + " <td>";
        html = html + "<img src='images/showroom.png' width='20px' height='20px' />";
        html = html + "</td>";
        html = html + " <td>";
        html = html + "<span style='color:#304589'>" + changedValues[k][0] + "</span>";
        html = html + "</td>"
        html = html + "</tr>";
        html = html + "<tr style='width: 220px;'>";
        html = html + " <td style='width: 40px'>";
        html = html + "<img src='images/address.png' width='20px' height='20px'/>";
        html = html + "</td>";
        html = html + " <td style='width: 220px'>";
        html = html + "<span style='color:#304589'>" + addressSplit[0] + "</br>" + addressSplit[1] + "</span><span  style='margin-left: 30px; font-weight: bold; color: green;'>" + changedValues[k][3] + "&nbsp;mi</span>";
        html = html + "</td>";
        html = html + " </tr>";
        html = html + "</table>";
        html = html + "</td>";
        html = html + " <td style='width:15%;'>";        
        html = html + "<span><a onclick=checkinventorysearch('" + changedValues[k][10] + "','" + k + "')><img src='images/checkinventory.png' width='26px' height='26px' style='margin-top:6px;cursor:pointer'/></a><a onclick='getDirections(" + k + ",1,2);'><img src='images/getdirections1.png' width='26px' height='26px' style='margin-top:6px;cursor:pointer'/></a></span>";
        html = html + "</td>";
        html = html + " </tr>";
        html = html + "</table>";
        html = html + "</div>";
    }
    html = html + "<div class='submitdiv' style='height:5px'></div>";
    html = html + "</div>";
    html = html + "</div>";
    search_mapinitialize(1); // Load results to map
    document.getElementById("white_contentlistnew1").innerHTML = html;
    document.getElementById('light').style.display = 'none';
    document.getElementById('white_contentlistnew1').style.display = 'none';
}

//Function: when user clicks branck ballon in the map
function clickmarker(i) {
    $("body").removeClass('globalbodyclass');
    $("#mapbody").removeClass('mapbody');
    var cPage = getLS('page');
    var result = cPage.split(',');
    if (result[result.length - 1] !== 'clickmarker') {
        setLS('page', cPage + ",clickmarker");
    }
    var addressSplit = locations[i][4].split(',');
    var branchName = locations[i][0];
    var branchId = locations[i][3];
    setLS('default_branchname2', branchName);
    setLS('default_branchcode2', branchId);
    var html = '<div style="background: none repeat scroll 0 0 #304589; float: left; height: 32px;width: 100%;color:#fff">';
    html = html + '<div style="width: 88%; float: left">';
    html = html + '<p class="p-content" style="font-weight:bold;font-size:19px">';
    html = html + 'Branch Information';
    html = html + '</p>';
    html = html + '</div>';
    html = html + '<div style="float: right; margin-top: 1px; width: 12%;">';
    html = html + '<a href="#" onclick="toggleVisibilityClose()">';
    html = html + '<img src="images/close_square_white.png" style="height: 30px; width: 30px;border-radius:10px" alt="" /></a></div>';
    html = html + '</div>';
    html = html + '<div class="innerpopup1" style="float: left">';
    html = html + '<div class="popdiv">';
    html = html + '<table class="tableclass">';
    html = html + '<tr class="trpop">';
    html = html + '<td>';
    html = html + '</td>';
    html = html + '</tr>';
    html = html + '<tr style="width: 220px; text-align: left;">';
    html = html + '<td style="width: 220px">';
    html = html + locations[i][0];
    html = html + '<br />';
    html = html + addressSplit[0] + "</br>" + addressSplit[1];
    html = html + '</td>';
    html = html + '</tr>';
    html = html + '</table>';
    html = html + '</div>';
    html = html + '<div class="popdiv">';
    html = html + '<table class="tableclass">';
    html = html + '<tr class="trpop">';
    html = html + '<td class="tabcontent" style="width:86px;">';
    html = html + 'Phone';
    html = html + '</td>';
    html = html + '<td style="width: 111px;">';
    html = html + locations[i][5];
    html = html + '</td>';
    html = html + '<td>';
    html = html + '<a href="tel:' + locations[i][5] + '"><img src="images/phone.png" style="margin-top: 5px;" /></a>';
    html = html + '</td>';
    html = html + '</tr>';
    html = html + '</table>';
    html = html + '</div>';
    html = html + '<div class="popdiv">';
    html = html + '<table class="tableclass">';
    html = html + '<tr class="trpop">';
    html = html + '<td class="tdpop" style="width: 39px;" onclick="login()">';
    html = html + '<img src="images/checkinventory.png" style="width:33px"/>';
    html = html + '</td>';
    html = html + '<td class="tabcontent" style="cursor:pointer" onclick="checkinventory(' + locations[i][3] + ')">';
    html = html + 'Check Location Inventory';
    html = html + '</td>';
    html = html + '</tr>';
    html = html + '</table>';
    html = html + '</div>';
    html = html + '<div class="popdiv">';
    html = html + '<table class="tableclass">';
    html = html + '<tr class="trpop">';
    html = html + '<td class="tdpop">';
    html = html + '<img src="images/placeorder.png" style="width:35px"/>';
    html = html + '</td>';
    html = html + '<td class="tabcontent" style="cursor:pointer" onclick="checkinventory(' + locations[i][3] + ')">';
    html = html + 'Place Order';
    html = html + '</td>';
    html = html + '</tr>';
    html = html + '</tr>';
    html = html + '</table>';
    html = html + '</div>';
    html = html + '</div>';
    document.getElementById("light").innerHTML = html;
    document.getElementById('light').style.display = 'block';
    document.getElementById('fade').style.display = 'block';
    document.getElementById('lightdirection').style.display = 'none';
    document.getElementById('white_contentlistnew').style.display = 'none';
    document.getElementById('white_contentlistnew1').style.display = 'none';
}

function sortFunc(a, b) {
    return a[3] - b[3];
}

//Funation for loading only branches near to user locations
function search_mapinitialize(load) {
    if (changedValues.length !== 0) {
        if (changedValues[0][3] <= 0.1) {
            loadMap2(load);
        }
        else{ loadMap1(load); }
    }
    else {
        navigator.notification.alert('No nearest branches found!.Showing all the branches.', null, 'Alert', 'OK');
        setLS('get_gpslocation', 'notfound');
        mapInitialize();
    }
}

function loadMap1(load) {
    var lat1;
    var lon1;
    if (load === 1) {
        if (getLS('GPS_lat') !== null) {
            lat1 = getLS('GPS_lat');
        }
        if (getLS('GPS_lon') !== null) {
            lon1 = getLS('GPS_lon');
        }
        setLS('map_number', 2);
    }
    else if (load === 2) {
        lat1 = getLS('Source_lat');
        lon1 = getLS('Source_lon');
        setLS('map_number', 1);
    }
    var map = new google.maps.Map(document.getElementById('map_canvas'),
        {
            zoom: 9,
            center: new google.maps.LatLng(lat1, lon1),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
    var infowindow = new google.maps.InfoWindow();
    var marker, i;
    var contentStringCal = '<div id="content">' +
                              '<div id="bodyContent">' +
                                 '<b>You are here</b>' +
                              '</div>' +
                           '</div>';
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat1, lon1),
        map: map,
        icon: 'images/green-dot.png'
    });
    google.maps.event.addListener(marker, 'mouseover', function () {
        if (contentStringCal !== infowindow.getContent()) {
            infowindow.setContent(contentStringCal);
            infowindow.open(map, this);
        }
        else {
            google.maps.event.trigger(marker, 'mouseover');
        }
    });
    google.maps.event.addListener(marker, 'mouseout', function () // Close info window on mouseover
    {
        infowindow.setContent('');
        infowindow.close();
    });
    google.maps.event.addListener(infowindow, 'closeclick', function () {
        infowindow.setContent('');
    });
    for (i = 0; i < changedValues.length; i++) {
        if (i === 0) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(changedValues[i][1], changedValues[i][2]),
                map: map,
                icon: 'images/blue_marker.png'
            });
            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    clickmarker1(i);
                };
            })(marker, i));
        }
        else {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(changedValues[i][1], changedValues[i][2]),
                map: map,
                icon: 'images/marker.png'
            });
            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    clickmarker1(i);
                }
            })(marker, i));

            google.maps.event.addListener(map, "tilesloaded", function () {
                document.getElementById('loading').style.display = 'none';
                $.mobile.loading("hide");
            });
        }
    }
}

function loadMap2(load) {
    var lat1;
    var lon1;
    if (load === 1) {
        if (getLS('GPS_lat') !== null) {
            lat1 = getLS('GPS_lat');
        }
        if (getLS('GPS_lon') !== null) {
            lon1 = getLS('GPS_lon');
        }
        setLS('map_number', 2);
    }
    else if (load === 2) {
        lat1 = getLS('Source_lat');
        lon1 = getLS('Source_lon');
        setLS('map_number', 1);
    }
    var map = new google.maps.Map(document.getElementById('map_canvas'),
        {
            zoom: 9,
            center: new google.maps.LatLng(lat1, lon1),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
    var infowindow = new google.maps.InfoWindow();
    var marker, i;
    var contentStringCal = '<div id="content">' +
                              '<div id="bodyContent">' +
                                 '<b>You are here</b>' +
                              '</div>' +
                           '</div>';
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat1, lon1),
        map: map,
        icon: 'images/green-dot.png'
    });
    google.maps.event.addListener(marker, 'mouseover', function () {
        if (contentStringCal !== infowindow.getContent()) {
            infowindow.setContent(contentStringCal);
            infowindow.open(map, this);
        }
        else {
            google.maps.event.trigger(marker, 'mouseover');
        }
    });
    google.maps.event.addListener(marker, 'mouseout', function () // Close info window on mouseover
    {
        infowindow.setContent('');
        infowindow.close();
    });
    google.maps.event.addListener(infowindow, 'closeclick', function () {
        infowindow.setContent('');
    });
    for (i = 0; i < changedValues.length; i++) {
        if (i === 0) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(changedValues[i][1], changedValues[i][2]),
                map: map,
                icon: 'images/green-dot.png'
            });
            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    clickMarker2(i);
                }
            })(marker, i));
        }
        else {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(changedValues[i][1], changedValues[i][2]),
                map: map,
                icon: 'images/marker.png'
            });
            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    clickmarker1(i);
                }
            })(marker, i));
            google.maps.event.addListener(map, "tilesloaded", function () {
                document.getElementById('loading').style.display = 'none';
                $.mobile.loading("hide");
            });
        }
    }
}

// Function to handle search branch
function SearchBranch() {
    var branchtxt = document.getElementById('txtsearch_branch').value;
    if (branchtxt !== "") {
        setLS('Showroom', 'none');
        writeToLogFile("User Branch Search :" + branchtxt, 3);
    }
    else {
        navigator.notification.alert('Please enter your address.', null, 'Alert', 'OK');
    }
    changedValues.splice(0, changedValues.length);
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': branchtxt }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            var lat = results[0].geometry.location.lat();
            var lng = results[0].geometry.location.lng();
            var output = lat + "@" + lng;
            var res = output.split("@");
            var lat1 = res[0];
            var lon1 = res[1];
            setLS('Default', 1);
            setLS('location', branchtxt);
            setLS('Source_lat', lat1);
            setLS('Source_lon', lon1);
            var lat2, lon2, radlat1, radlat2, theta, unit, radtheta, dist;
            for (var i = 0; i < locations.length; i++) {
                lat2 = locations[i][1];
                lon2 = locations[i][2];
                radlat1 = Math.PI * lat1 / 180;
                radlat2 = Math.PI * lat2 / 180;
                theta = (lon1) - (lon2);
                unit = 'K';
                radtheta = Math.PI * theta / 180;
                dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                dist = Math.acos(dist);
                dist = dist * 180 / Math.PI;
                dist = dist * 60 * 1.1515;
                if (unit === "K") { dist = dist * 1.609344 }
                if (unit === "N") { dist = dist * 0.8684 }
                var distanceInKM = (dist / 1.6).toFixed(2);
                if (distanceInKM <= 20) {
                    changedValues.push([locations[i][0], locations[i][1], locations[i][2], distanceInKM, 1, locations[i][4], locations[i][5], locations[i][6], locations[i][7], locations[i][8], locations[i][3]])
                }
            }
            changedValues.sort(sortFunc);
            setLS('Showroom', 'none');
            search_mapinitialize(2);
        }
        else {
            navigator.notification.alert('No nearest branches found!.Showing all the branches.', null, 'Alert', 'OK');
            var map = new google.maps.Map(document.getElementById('map_canvas'),
        {
            zoom: 8,
            center: new google.maps.LatLng(40.71, -74.0059), // Show map to center :Newyork locations
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
            //var infowindow = new google.maps.InfoWindow();
            var marker, j;
            for (j = 0; j < locations.length; j++) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(locations[j][1], locations[j][2]),
                    map: map,
                    icon: 'images/marker.png'
                });
                google.maps.event.addListener(marker, 'click', (function (marker, j) {
                    return function () {
                        clickmarker(j);
                    }
                })(marker, j));
                google.maps.event.addListener(map, "tilesloaded", function () {
                    document.getElementById('loading').style.display = 'none';
                    $.mobile.loading("hide");
                });
            }
        }
    });
    document.getElementById('light').style.display = 'none';
    document.getElementById('white_contentlistnew1').style.display = 'none';
    $('input').blur();
}

//Read the location array and map the branches to the map
function mapInitialize() {
    setLS('Default', 3);
    setLS('Showroom', 'all');  //old branch place
    var map = new google.maps.Map(document.getElementById('map_canvas'),
        {
            zoom: 8,
            center: new google.maps.LatLng(40.71, -74.0059), // Show map to center :Newyork locations
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
    //var infowindow = new google.maps.InfoWindow();
    var marker, i;
    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map,
            icon: 'images/marker.png'
        });
        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                clickmarker(i);
            }
        })(marker, i));
        google.maps.event.addListener(map, "tilesloaded", function () {
            document.getElementById('loading').style.display = 'none';
            $.mobile.loading("hide");
        });
    }
    if (getLS('textboxval') !== "" && getLS('textboxval') !== null) {
        $("#txtsearch_branch").val(getLS('textboxval'));
        localStorage.removeItem('textboxval');
        localStorage.removeItem('Showroom');
        SearchBranch();
    }
}

//Forming array based on the contents from the branchinfo
function CreateLocationArray() {
    var Getbranches = window.openDatabase("blackman", "1.0", "blackman", 2 * 1024 * 1024);
    Getbranches.transaction(function getallbranches(tx) {
        tx.executeSql('select * from branchinfo', [], function branchsucces(txx, res) {
            for (var i = 0; i < res.rows.length; i++) {
                var ss = res.rows.item(i);
                var s_array = [];
                s_array.push(ss.BranchName + "-" + ss.BranchCode, ss.Latitude, ss.Longitude, ss.BranchCode, ss.Address, ss.PhoneNumber, ss.Faxnumber, ss.Managername, ss.Email + "]");
                locations.push(s_array);
            }
            var get_GpsLocation = getLS('get_gpslocation');
            if (get_GpsLocation === 'yes') {
                loadGPSLocations();
            }
            else if (get_GpsLocation === 'notfound') {
                mapInitialize();
            }
            else {
                if (navigator.geolocation) {
                    var options =
                    {
                        enableHighAccuracy: true,
                        timeout: 20000,
                        maximumAge: 30000
                    };
                    navigator.geolocation.getCurrentPosition(success, Maperror, options);
                }
                else {
                    navigator.notification.alert('GPS not supported', null, 'Alert', 'OK');
                }
            }
        });
    });
}

function loadAllBranchesToLocalDB() {
    document.getElementById('loading').style.display = 'block';
    $.mobile.loading("show", {
        text: "Loading,Please Wait...",
        textVisible: true,
        theme: "a",
        textonly: true,
        html: "<span class='ui-bar ui-overlay-a ui-corner-all' style='text-align:center;background:#ccc;font-size:12px'><img src='images/ajax-loader.gif'/><br/><h style='color:#304589'>Locating stores near you...</h></span>"
    });
    $.ajax({
        type: "GET",
        crossDomain: true,
        url: BlackmanApplicationServices.branchURL,
        dataType: "xml",
        success: function (xmlData) {
            var dbinsert = window.openDatabase("blackman", "1.0", "blackman", 2 * 1024 * 1024);       /* opening local database */
            dbinsert.transaction(function branchdetails(tx) {
                tx.executeSql('DROP TABLE IF EXISTS  branchinfo');
                var TableQuery = 'CREATE TABLE IF NOT EXISTS branchinfo (id INTEGER PRIMARY KEY AUTOINCREMENT,BranchName VARCHAR UNIQUE,BranchCode,Latitude,Longitude,Address,PhoneNumber,Faxnumber,Managername,Email)';
                tx.executeSql(TableQuery);
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
                var BranchName, BranchCode, Latitude, Longitude, Address, PhoneNumber, Faxnumber='', ManagerName='', Email='';
                $.each(list, function (i, item) {
                    BranchName = item.BranchName;
                    BranchCode = item.BranchCode;
                    Latitude = item.Latitude;
                    Longitude = item.Longitude;
                    vAddress = item.Address;
                    PhoneNumber = item.PhoneNumber;              
                    if (BranchCode === BlackmanApplicationVariables.defaultbranchcode) {
                        var defaultBranchCode = getLS('default_branchcode');
                        if (defaultBranchCode === "" || defaultBranchCode === null) {
                            setLS('default_branchcode', BranchCode);
                            setLS('default_branchname', BranchName);
                            setLS('default_branchcode1', BranchCode);
                            setLS('default_branchname1', BranchName);
                        }
                    }
                    var qry = 'INSERT OR IGNORE INTO branchinfo (BranchName,BranchCode,Latitude,Longitude,Address,PhoneNumber,Faxnumber,Managername,Email)'
                          + 'VALUES (?,?,?,?,?,?,?,?,?)';
                    tx.executeSql(qry, [BranchName, BranchCode, Latitude, Longitude, Address, PhoneNumber, Faxnumber, ManagerName, Email]);
                });
                CreateLocationArray();
            }, errorCB);
        }, error: function () {
            $("#loading").hide();
            $.mobile.loading("hide");
            navigator.notification.alert('Unable to connect server.Please try again later!', null, 'Internet Failure', 'OK');
        }
    });
}

function onbodyload() {
    var encryptedKey = getLS('encryptedkey');
    if (encryptedKey === null) {
        setEncryptedKey();
    }
    else {
        loadAllBranchesToLocalDB();
    }
}

function success(position) {
    setLS('GPS_lat', position.coords.latitude.toFixed(6));
    setLS('GPS_lon', position.coords.longitude.toFixed(6));
    var message = "User GPS Latitude Position : " + position.coords.latitude + ", Longitude Position:" + position.coords.longitude;
    writeToLogFile(message, 3);
    setLS('Default', 2);
    setLS('get_gpslocation', 'yes');
    setLS('Showroom', 'none');  //old branch place
    loadGPSLocations();
}

//error function called after error in Getting GPS Locations
function Maperror(error) {
    var message = "";
    // Check for known errors
    switch (error.code) {
        case error.PERMISSION_DENIED:
            message = "This website does not have permission to use " +
                      "the Geolocation API";
            writeToLogFile(message, 3);
            break;
        case error.POSITION_UNAVAILABLE:
            message = "Your current location couldn't be determined.Kindly check if the location services are enabled in settings.";
            writeToLogFile(message, 3);
            break;
        case error.PERMISSION_DENIED_TIMEOUT:
            message = "Your current location couldn't be determined.Kindly check if the location services are enabled in settings.";
            writeToLogFile(message, 3);
            break;
    }
    if (message === "") {
        //var strErrorCode = error.code.toString();
        message = "Your current location couldn't be determined.Kindly check if the location services are enabled in settings.";
        writeToLogFile(message, 3);
    }
    navigator.notification.alert(message, null, 'Alert', 'OK');
    mapInitialize();
}

var branchNameNew, branchIdNew;
function checkinventorynew(branchId, id) {
    branchNameNew = locations[id][0];
    branchIdNew = locations[id][3];
    setLS('default_branchname2', branchNameNew);
    setLS('default_branchcode2', branchIdNew);
    checkinventory(branchIdNew);
}

function checkinventorysearch(branchId, id) {
    branchNameNew = changedValues[id][0];
    branchIdNew = changedValues[id][10];
    setLS('default_branchname2', branchNameNew);
    setLS('default_branchcode2', branchIdNew);
    checkinventory(branchIdNew);
}

//Function: when user clicks branck ballon in the map
function clickmarker1(i) {
    $("body").removeClass('globalbodyclass');
    $("#mapbody").removeClass('mapbody');
    var cPage = getLS('page');
    var result = cPage.split(",");
    if (result[result.length - 1] !== "clickmarker") {
        setLS('page', cPage + ",clickmarker");
    }
    var branchName = changedValues[i][0];
    var branchId = changedValues[i][10];
    setLS('default_branchname2', branchName);
    setLS('default_branchcode2', branchId);
    var mapno = getLS('map_number');
    var addressSplit = changedValues[i][5].split(',');
    var html = '<div style="background: none repeat scroll 0 0 #304589; float: left; height: 32px;width: 100%;color:#fff">';
    html = html + '<div style="width: 88%; float: left">';
    html = html + '<p class="p-content" style="font-weight:bold;font-size:19px">';
    html = html + 'Branch Information';
    html = html + '</p>';
    html = html + '</div>';
    html = html + '<div style="float: right; margin-top: 1px; width: 12%;">';
    html = html + '<a href="#" onclick="toggleVisibilityClose()">';
    html = html + '<img src="images/close_square_white.png" style="height: 30px; width: 30px;border-radius:10px" alt="" /></a></div>';
    html = html + '</div>';
    html = html + '<div class="innerpopup1" style="float: left">';
    html = html + '<div class="popdiv">';
    html = html + '<table class="tableclass">';
    html = html + '<tr class="trpop">';
    html = html + '<td>';
    html = html + '</td>';
    html = html + '</tr>';
    html = html + '<tr style="width: 220px; text-align: left;">';
    html = html + '<td style="width: 220px">';
    html = html + changedValues[i][0] + "</br>";
    html = html + addressSplit[0] + "</br>" + addressSplit[1];
    html = html + '</td>';
    html = html + '</tr>';
    html = html + '</table>';
    html = html + '</div>';
    html = html + '<div class="popdiv">';
    html = html + '<table class="tableclass">';
    html = html + '<tr class="trpop">';
    html = html + '<td class="tabcontent" style="width:86px;">';
    html = html + 'Phone';
    html = html + '</td>';
    html = html + '<td style="  width: 111px;">';
    html = html + changedValues[i][6];
    html = html + '</td>';
    html = html + '<td>';
    html = html + '<a href="tel:' + changedValues[i][6] + '"><img src="images/phone.png" style="margin-top: 5px;"/></a>';
    html = html + '</td>';
    html = html + '</tr>';
    html = html + '</table>';
    html = html + '</div>';
    html = html + '<div class="popdiv">';
    html = html + '<table class="tableclass">';
    html = html + '<tr class="trpop">';
    html = html + '<td class="tabcontent" style="width:82px">';
    html = html + 'Distance';
    html = html + '</td>';
    html = html + '<td>';
    html = html + changedValues[i][3] + "&nbspmi";
    html = html + '</td>';
    html = html + '</tr>';
    html = html + '</table>';
    html = html + '</div>';
    html = html + '<div class="popdiv">';
    html = html + '<table class="tableclass">';
    html = html + '<tr class="trpop">';
    html = html + '<td style=" width: 39px;">';
    html = html + '<img src="images/getdirections.png"  style="width:33px;"/>';
    html = html + '</td>';
    html = html + '<td class="tabcontent" style="cursor:pointer">';
    html = html + '<a style="margin-left: 1px;" onclick="getDirections( ' + i + ',1,' + mapno + ');">Get Direction</a>';
    html = html + '</td>';
    html = html + '</tr>';
    html = html + '</table>';
    html = html + '</div>';
    html = html + '<div class="popdiv">';
    html = html + '<table class="tableclass">';
    html = html + '<tr class="trpop">';
    html = html + '<td style="width: 39px;">';
    html = html + '<img src="images/checkinventory.png"  style="width:35px"/>';
    html = html + '</td>';
    html = html + '<td class="tabcontent" style="cursor:pointer" onclick="checkinventory(' + changedValues[i][10] + ')">';
    html = html + 'Check Location Inventory';
    html = html + '</td>';
    html = html + '</tr>';
    html = html + '</table>';
    html = html + '</div>';
    html = html + '<div class="popdiv">';
    html = html + '<table class="tableclass">';
    html = html + '<tr class="trpop">';
    html = html + '<td style=" width: 39px;">';
    html = html + '<img src="images/placeorder.png"  style="width:35px"/>';
    html = html + '</td>';
    html = html + '<td class="tabcontent" style="cursor:pointer" onclick="checkinventory(' + changedValues[i][10] + ')">';
    html = html + 'Place Order';
    html = html + '</td>';
    html = html + '</tr>';
    html = html + '</table>';
    html = html + '</div>';
    html = html + '</div>';
    document.getElementById("light").innerHTML = html;
    document.getElementById('fade').style.display = 'block';
    document.getElementById('light').style.display = 'block';
    document.getElementById('lightdirection').style.display = 'none';
    document.getElementById('white_contentlistnew').style.display = 'none';
    document.getElementById('white_contentlistnew1').style.display = 'none';
}

//Function: when user clicks branck ballon in the map
function clickMarker2(i) {
    $("body").removeClass('globalbodyclass');
    $("#mapbody").removeClass('mapbody');
    var cPage = getLS('page');
    var result = cPage.split(",");
    if (result[result.length - 1] !== "clickmarker") {
        setLS('page', cPage + ",clickmarker");
    }
    var mapno = getLS('map_number');
    var branchName = changedValues[i][0];
    var branchId = changedValues[i][10];
    setLS('default_branchname2', branchName);
    setLS('default_branchcode2', branchId);
    var addressSplit = changedValues[i][5].split(',');
    var html = '<div style="background: none repeat scroll 0 0 #304589; float: left; height: 32px;width: 100%;color:#fff">';
    html = html + '<div style="width: 88%; float: left">';
    html = html + '<p class="p-content" style="font-weight:bold;font-size:19px">';
    html = html + 'Branch Information';
    html = html + '</p>';
    html = html + '</div>';
    html = html + '<div style="float: right; margin-top: 1px; width: 12%;">';
    html = html + '<a href="#" onclick="toggleVisibilityClose()">';
    html = html + '<img src="images/close_square_white.png" style="height: 30px; width: 30px;border-radius:10px" alt="" /></a></div>';
    html = html + '</div>';
    html = html + '<div class="innerpopup1" style="float: left">';
    html = html + '<div class="popdiv">';
    html = html + '<table class="tableclass">';
    html = html + '<tr class="trpop">';
    html = html + '<td>';
    html = html + '</td>';
    html = html + '</tr>';
    html = html + '<tr style="width: 220px; text-align: left;">';
    html = html + '<td style="width: 220px">';
    html = html + changedValues[i][0] + "</br>";
    html = html + addressSplit[0] + "</br>" + addressSplit[1];
    html = html + '</td>';
    html = html + '</tr>';
    html = html + '</table>';
    html = html + '</div>';
    html = html + '<div class="popdiv">';
    html = html + '<table class="tableclass">';
    html = html + '<tr class="trpop">';
    html = html + '<td class="tabcontent" style="width:86px;">';
    html = html + 'Phone';
    html = html + '</td>';
    html = html + '<td style="  width: 111px;">';
    html = html + changedValues[i][6];
    html = html + '</td>';
    html = html + '<td>';
    html = html + '<a href="tel:' + changedValues[i][6] + '"><img src="images/phone.png" style="margin-top: 5px;"/></a>';
    html = html + '</td>';
    html = html + '</tr>';
    html = html + '</table>';
    html = html + '</div>';
    html = html + '<div class="popdiv">';
    html = html + '<table class="tableclass">';
    html = html + '<tr class="trpop">';
    html = html + '<td class="tabcontent" style="width:82px">';
    html = html + 'Distance';
    html = html + '</td>';
    html = html + '<td>';
    html = html + changedValues[i][3] + "&nbspmi";
    html = html + '</td>';
    html = html + '</tr>';
    html = html + '</table>';
    html = html + '</div>';
    html = html + '<div class="popdiv">';
    html = html + '<table class="tableclass">';
    html = html + '<tr class="trpop">';
    html = html + '<td style="width: 39px;">';
    html = html + '<img src="images/checkinventory.png"  style="width:35px"/>';
    html = html + '</td>';
    html = html + '<td class="tabcontent" style="cursor:pointer" onclick="checkinventory(' + changedValues[i][10] + ')">';
    html = html + 'Check Location Inventory';
    html = html + '</td>';
    html = html + '</tr>';
    html = html + '</table>';
    html = html + '</div>';
    html = html + '<div class="popdiv">';
    html = html + '<table class="tableclass">';
    html = html + '<tr class="trpop">';
    html = html + '<td style=" width: 39px;">';
    html = html + '<img src="images/placeorder.png"  style="width:35px"/>';
    html = html + '</td>';
    html = html + '<td class="tabcontent" style="cursor:pointer"onclick="checkinventory(' + changedValues[i][10] + ')">';
    html = html + 'Place Order';
    html = html + '</td>';
    html = html + '</tr>';
    html = html + '</table>';
    html = html + '</div>';
    html = html + '</div>';
    document.getElementById('fade').style.display = 'block';
    document.getElementById("light").innerHTML = html;
    document.getElementById('light').style.display = 'block';
    document.getElementById('lightdirection').style.display = 'none';
    document.getElementById('white_contentlistnew').style.display = 'none';
    document.getElementById('white_contentlistnew1').style.display = 'none';
}

function toggleVisibilityClose() {
    $("body").addClass('globalbodyclass');
    var cPage = getLS('page');
    var result = cPage.split(","), newPage;
    if (result.length === 1) {
        newPage = cPage.replace(result[result.length - 1], "");
        setLS('page', newPage);
    } else {
        newPage = cPage.replace(',' + result[result.length - 1], "");
        setLS('page', newPage);
    }
    $("#light").hide();
    $("#fade").hide();
}
function mapDirection(mode) {
    var load = getLS('Default');
    var mapno = getLS('mapno');
    getDirections(mapno, mode, load);
}

window.onresize = function () {
    if (getLS('Default') === 3) {
        mapInitialize();
    }
    else if (getLS('Default') === 1) {
        search_mapinitialize(2);
    }
    else if (getLS('Default') === 2) {
        search_mapinitialize(1);
    }
};

function getDirections(g, maptype, load) {
    $("#mapbody").removeClass('mapbody');
    var cPage = getLS('page');
    var result = cPage.split(",");
    if (result[result.length - 1] !== "getdirections") {
        setLS('page', cPage + ",getdirections");
    }
    var Source_lat;
    var Source_lon;
    if (load === 1) {
        Source_lat = getLS('Source_lat');
        Source_lon = getLS('Source_lon');
    }
    else if (load === 2) {
        if (getLS('GPS_lat') !== null) {
            Source_lat = getLS('GPS_lat');
        }
        if (getLS('GPS_lon') !== null) {
            Source_lon = getLS('GPS_lon');
        }
    }
    var destination_location = changedValues[g][5];
    var destination_lat = changedValues[g][1];
    var destination_lon = changedValues[g][2];
    setLS('mapno', g);
    var directionsService = new google.maps.DirectionsService();
    var map;
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var latlng = new google.maps.LatLng(destination_lat, destination_lon);
    var mapOptions =
    {
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: latlng
    }
    map = new google.maps.Map(document.getElementById('map_results'), mapOptions);
    directionsDisplay.setMap(map);
    $('#text_results').empty();
    directionsDisplay.setPanel(document.getElementById("text_results"));
    var start = Source_lat + "," + Source_lon;
    var end = destination_lat + ',' + destination_lon;
    var mode;
    switch (maptype) {
        case 1: //Driving
            mode = google.maps.DirectionsTravelMode.DRIVING;
            break;
        case 2: // bicycle
            mode = google.maps.DirectionsTravelMode.BICYCLING;
            break;

        case 3:  //Walking
            mode = google.maps.DirectionsTravelMode.WALKING;
            break;

        case 4:  //Transit
            mode = google.maps.DirectionsTravelMode.TRANSIT;
            break;
    }
    var request =
    {
        origin: start,
        destination: end,
        travelMode: mode
    };
    directionsService.route(request, function (response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
        else {
            navigator.notification.alert('No Routes Found', null, 'Branch Direction', 'OK');
            textJQResults.html("<p style='text-align:center;color:red;margin-top: 30%;'>No Routes Found</p>");
            textJQResults.show();
        }
    });
    document.getElementById('lightdirection').style.display = 'block';
    document.getElementById('light').style.display = 'none';
    document.getElementById('fade').style.display = 'block';
    document.getElementById('white_contentlistnew1').style.display = 'none';
}

//function to handle manual GPS search
function manualSearch() {
    localStorage.removeItem('get_gpslocation');
    loadAllBranchesToLocalDB();
}



