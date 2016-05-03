/*
This javascript files is only for Find branch functions
Creaded on:22/07/2014 12:05PM
License:Tychons solutions
*/

// Find branch pageload function

function onbodyload() 
{
    var encryptedKey = getLS('encryptedkey');

    if(encryptedKey === null)
    {
       setencryptedkey();
    }
    else 
    {
       loadallbranches_tolocalDB(); // function to save all the branches details to localDB
    }
   
}

//Read all the branches information and inserting it to the Localsqllite table

function loadallbranches_tolocalDB() 
{
    
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
                    var Faxnumber = '', ManagerName = '', Email='';


                    if (BranchCode === defaultbranchcode) 
                    {
                        var defaultBranchCode = getLS('default_branchcode');
                        if (defaultBranchCode === "" || defaultBranchCode === null)
                        {
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
                create_locationarray();
            }, errorCB);
        }, error: function() 
        {
            $("#loading").hide();
            $.mobile.loading("hide");
            navigator.notification.alert('Unable to connect server.Please try again later!', null, 'Internet Failure', 'OK');
            
        }

    });
}

//Forming array based on the contents from the branchinfo

var locations = [];

function create_locationarray() 
{
    var Getbranches = window.openDatabase("blackman", "1.0", "blackman", 2 * 1024 * 1024);
    Getbranches.transaction(function getallbranches(tx) {
        tx.executeSql('select * from branchinfo', [], function branchsucces(txx, res) {

            for (var i = 0; i < res.rows.length; i++) {
                var ss = res.rows.item(i);
                var s_array = [];
                // Pushing contents to first array
                s_array.push(ss.BranchName + "-" + ss.BranchCode, ss.Latitude, ss.Longitude, ss.BranchCode, ss.Address, ss.PhoneNumber, ss.Faxnumber, ss.Managername, ss.Email + "]");
                locations.push(s_array);
            }

            var get_GpsLocation = getLS('get_gpslocation');

            if (get_GpsLocation === 'yes') {
                loadGPS_locations();
            }
            else if (get_GpsLocation === 'notfound') {

                mapinitialize();
            }
            else {
                if (navigator.geolocation) {
                    var options =
                    {
                        enableHighAccuracy: true,
                        timeout: 20000,
                        maximumAge: 30000
                    };

                    navigator.geolocation.getCurrentPosition(success, error, options);

                }
                else {
                    
                     navigator.notification.alert('GPS not supported', null, 'Alert', 'OK');
                }
            }
        });
    });
}

//Success function called after successful retrieval of userlocation using GPS

function success(position) 
{
    // Store the GPS lattitude and Longitude location in the Local Storage

    setLS('GPS_lat', position.coords.latitude.toFixed(6));
    setLS('GPS_lon', position.coords.longitude.toFixed(6));

    var message = "User GPS Latitude Position : " + position.coords.latitude + ", Longitude Position:" + position.coords.longitude;
    writetologfile(message, 3);
    setLS('Default', 2);
    setLS('get_gpslocation', 'yes');
    setLS('Showroom', 'none');  //old branch place
    loadGPS_locations();
}

//error function called after error in Getting GPS Locations

function error(error) 
{
    var message = "";
    // Check for known errors
    switch (error.code) 
    {
        case error.PERMISSION_DENIED:
            message = "This website does not have permission to use " +
                      "the Geolocation API";
            writetologfile(message, 3);
            break;
        case error.POSITION_UNAVAILABLE:
            message = "Your current location couldn't be determined.Kindly check if the location services are enabled in settings.";
            writetologfile(message, 3);
            break;
        case error.PERMISSION_DENIED_TIMEOUT:
            message = "Your current location couldn't be determined.Kindly check if the location services are enabled in settings.";
            writetologfile(message, 3);
            break;
    }
    if (message == "") 
    {
        var strErrorCode = error.code.toString();
        message = "Your current location couldn't be determined.Kindly check if the location services are enabled in settings.";
        writetologfile(message, 3);
    }
    navigator.notification.alert(message, null, 'Alert', 'OK');
    mapinitialize();
}

//Read the location array and map the branches to the map

var changedValues = [];

function mapinitialize() 
{

    setLS('Default', 3);
    setLS('Showroom', 'all');  //old branch place

    var map = new google.maps.Map(document.getElementById('map_canvas'),
        {
            zoom: 8,
            center: new google.maps.LatLng(40.71, -74.0059), // Show map to center :Newyork locations
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
    var infowindow = new google.maps.InfoWindow();
    var marker, i;
    for (i = 0; i < locations.length; i++) 
    {

        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map,
            icon: 'images/marker.png'
        });
        google.maps.event.addListener(marker, 'click', (function (marker, i) 
        {
            return function () 
            {
                clickmarker(i);

            }
        })(marker, i));

        google.maps.event.addListener(map, "tilesloaded", function () 
        {
            document.getElementById('loading').style.display = 'none';
            $.mobile.loading("hide");
        });
    }
    if (getLS('textboxval') != "" && getLS('textboxval') != null) 
    {
        $("#txtsearch_branch").val(getLS('textboxval'));
        localStorage.removeItem('textboxval');
        localStorage.removeItem('Showroom');
        search_branch();
    }
    
}

// Function to handle search branch

function search_branch() 
{
    var branchtxt = document.getElementById('txtsearch_branch').value;
    if (branchtxt != "") {
        setLS('Showroom', 'none');
        writetologfile("User Branch Search :" + branchtxt, 3);
    }
    else {
         navigator.notification.alert('Please enter your address.', null, 'Alert', 'OK');
     }

   // changedValues.length = 0;
    changedValues.splice(0, changedValues.length)
    // Code to get Latitude and Longitude positions of user searched text

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': branchtxt }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            lat = results[0].geometry.location.lat();
            lng = results[0].geometry.location.lng();

            var output = lat + "@" + lng;

            var res = output.split("@");
            var lat1 = res[0];
            var lon1 = res[1];

            setLS('Default', 1);
            setLS('location', branchtxt);
            setLS('Source_lat', lat1);
            setLS('Source_lon', lon1);

            for (var i = 0; i < locations.length; i++)
            {
                var lat2 = locations[i][1];
                var lon2 = locations[i][2];

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
                if (unit === "N") { dist = dist * 0.8684 }

                var distance_in_KM = (dist / 1.6).toFixed(2);
                if (distance_in_KM <= 20) {
                    changedValues.push([locations[i][0], locations[i][1], locations[i][2], distance_in_KM, 1, locations[i][4], locations[i][5], locations[i][6], locations[i][7], locations[i][8], locations[i][3]])
                }

            }

            changedValues.sort(sortfunc);
            setLS('Showroom', 'none');
            //Ramkumar0909

            search_mapinitialize(2); // Load results to map



        }
        else 
        {
            //alert('No nearest branches found!.Showing all the branches.');
            navigator.notification.alert('No nearest branches found!.Showing all the branches.', null, 'Alert', 'OK');
            var map = new google.maps.Map(document.getElementById('map_canvas'),
        {
            zoom: 8,
            center: new google.maps.LatLng(40.71, -74.0059), // Show map to center :Newyork locations
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
            var infowindow = new google.maps.InfoWindow();
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


function sortfunc(a, b) 
{
    return a[3] - b[3];
}

//Funation for loading only branches near to user locations

function search_mapinitialize(load) 
{
    if (changedValues.length != 0) 
    {
        
        if (changedValues[0][3] <= 0.1) 
        {
            loadmap2(load);
        }
        else 
        {
            loadmap1(load);
        }
    }
    else {

       //navigator.notification.alert('No nearest branches found!.Showing all the branches.', null, 'Alert', 'OK');
       setLS('get_gpslocation', 'notfound');
       mapinitialize();
    }

}

function loadmap1(load) 
{
    var lat1;
    var lon1;
    if (load == 1) 
    {


        if (getLS('GPS_lat') != null) 
        {
            lat1 = getLS('GPS_lat');
        }
        if (getLS('GPS_lon') != null) {
            lon1 = getLS('GPS_lon');
        }

        setLS('map_number', 2);
    }
    else if (load == 2) {
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
        if (contentStringCal != infowindow.getContent()) {
            infowindow.setContent(contentStringCal);
            infowindow.open(map, this);
        }
        //otherwise trigger mouseover to open the infowindow
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
                }
            })(marker, i));
        }
        else {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(changedValues[i][1], changedValues[i][2]),
                map: map,
                icon: 'images/marker.png'
            });
            google.maps.event.addListener(marker, 'click', (function (marker, i) 
            {
                return function () 
                {
                    clickmarker1(i);
                }
            })(marker, i));

            google.maps.event.addListener(map, "tilesloaded", function () 
            {
                document.getElementById('loading').style.display = 'none';
                $.mobile.loading("hide");
            });
        }
    }

}


function loadmap2(load) 
{
    var lat1;
    var lon1;
    if (load == 1) 
    {
        if (getLS('GPS_lat') != null) {
            lat1 = getLS('GPS_lat');
        }
        if (getLS('GPS_lon') != null) {
            lon1 = getLS('GPS_lon');
        }

        setLS('map_number', 2);
    }
    else if (load == 2) 
    {
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
        if (contentStringCal != infowindow.getContent()) {
            infowindow.setContent(contentStringCal);
            infowindow.open(map, this);
        }
        //otherwise trigger mouseover to open the infowindow
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
    for (i = 0; i < changedValues.length; i++) 
    {
        if (i == 0) 
        {

            marker = new google.maps.Marker({
                position: new google.maps.LatLng(changedValues[i][1], changedValues[i][2]),
                map: map,
                icon: 'images/green-dot.png'
            });

            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    clickmarker2(i);
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
                return function () 
                {
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

//Function: when user clicks branck ballon in the map

function clickmarker(i) 
{

    $("body").removeClass('globalbodyclass');
    $("#mapbody").removeClass('mapbody');
    var c_page = getLS('page');
    var result = c_page.split(",");
    if (result[result.length - 1] != "clickmarker") {
        setLS('page', c_page + ",clickmarker");
    }

    var address_split = locations[i][4].split(',');
    var branch_name = locations[i][0];
    var branch_id = locations[i][3];

    setLS('default_branchname2', branch_name);
    setLS('default_branchcode2', branch_id);

    var html = '<div style="background: none repeat scroll 0 0 #304589; float: left; height: 32px;width: 100%;color:#fff">';
    html = html + '<div style="width: 88%; float: left">';
    html = html + '<p class="p-content" style="font-weight:bold;font-size:19px">';
    html = html + 'Branch Information';
    html = html + '</p>';
    html = html + '</div>';
    html = html + '<div style="float: right; margin-top: 1px; width: 12%;">';
    html = html + '<a href="#" onclick="toggle_visibilityclose()">';
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
    html = html + address_split[0] + "</br>" + address_split[1];
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

var branchNameNew, branchIdNew;
function checkinventorynew(branch_id, id) 
{
    branchNameNew = locations[id][0];
    branchIdNew = locations[id][3];

    setLS('default_branchname2', branchNameNew);
    setLS('default_branchcode2', branchIdNew);
    checkinventory(branchIdNew);
}

function checkinventorysearch(branch_id, id) 
{
    branchNameNew = changedValues[id][0];
    branchIdNew = changedValues[id][10];

    setLS('default_branchname2', branchNameNew);
    setLS('default_branchcode2', branchIdNew);

    checkinventory(branchIdNew);
}


//Function: when user clicks branck ballon in the map

function clickmarker1(i) 
{

    $("body").removeClass('globalbodyclass');
    $("#mapbody").removeClass('mapbody');
    var c_page = getLS('page');
    var result = c_page.split(",");
    if (result[result.length - 1] != "clickmarker") {
        setLS('page', c_page + ",clickmarker");
    }

    var branch_name = changedValues[i][0];
    var branch_id = changedValues[i][10];

    setLS('default_branchname2', branch_name);
    setLS('default_branchcode2', branch_id);



    var mapno = getLS('map_number');
    var address_split = changedValues[i][5].split(',');

    var html = '<div style="background: none repeat scroll 0 0 #304589; float: left; height: 32px;width: 100%;color:#fff">';
    html = html + '<div style="width: 88%; float: left">';
    html = html + '<p class="p-content" style="font-weight:bold;font-size:19px">';
    html = html + 'Branch Information';
    html = html + '</p>';
    html = html + '</div>';
    html = html + '<div style="float: right; margin-top: 1px; width: 12%;">';
    html = html + '<a href="#" onclick="toggle_visibilityclose()">';
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
    html = html + address_split[0] + "</br>" + address_split[1];
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
    html = html + '<a style="margin-left: 1px;" onclick="getdirections( ' + i + ',1,' + mapno + ');">Get Direction</a>';
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

function clickmarker2(i) 
{

    $("body").removeClass('globalbodyclass');
    $("#mapbody").removeClass('mapbody');
    var c_page = getLS('page');
    var result = c_page.split(",");
    if (result[result.length - 1] != "clickmarker") 
    {
        setLS('page', c_page + ",clickmarker");
    }
  
    var mapno = getLS('map_number');

    var branch_name = changedValues[i][0];
    var branch_id = changedValues[i][10];

    setLS('default_branchname2', branch_name);
    setLS('default_branchcode2', branch_id);


    var address_split = changedValues[i][5].split(',');
    var html = '<div style="background: none repeat scroll 0 0 #304589; float: left; height: 32px;width: 100%;color:#fff">';
    html = html + '<div style="width: 88%; float: left">';
    html = html + '<p class="p-content" style="font-weight:bold;font-size:19px">';
    html = html + 'Branch Information';
    html = html + '</p>';
    html = html + '</div>';
    html = html + '<div style="float: right; margin-top: 1px; width: 12%;">';
    html = html + '<a href="#" onclick="toggle_visibilityclose()">';
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
    html = html + address_split[0] + "</br>" + address_split[1];
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


function toggle_visibilityclose() 
{
    $("body").addClass('globalbodyclass');
    var c_page = getLS('page');
    var result = c_page.split(","), new_page;
    if (result.length === 1) {
        new_page = c_page.replace(result[result.length - 1], "");
        setLS('page', new_page);
    } else {
        new_page = c_page.replace(',' + result[result.length - 1], "");
        setLS('page', new_page);
    }

    $("#light").hide();
    $("#fade").hide();
    // location.reload();
}
function mapdirection(mode) {
    var load = getLS('Default');
    getdirections(mapno, mode, load);
}


window.onresize = function () 
{

    if (getLS('Default') === 3) {
        mapinitialize();
    }
    else if (getLS('Default') === 1) {
        search_mapinitialize(2);
    }
    else if (getLS('Default') === 2) {
        search_mapinitialize(1);
    }
};



function getdirections(g, maptype, load) 
{
    $("#mapbody").removeClass('mapbody');
    var c_page = getLS('page');
    var result = c_page.split(",");
    if (result[result.length - 1] != "getdirections") {
        setLS('page', c_page + ",getdirections");
    }

    var Source_lat;
    var Source_lon;
    if (load === 1) {
        Source_lat = getLS('Source_lat');
        Source_lon = getLS('Source_lon');
    }
    else if (load === 2) {

        if (getLS('GPS_lat') != null) {
            Source_lat = getLS('GPS_lat');
        }

        if (getLS('GPS_lon') != null) {
            Source_lon = getLS('GPS_lon');
        }

    }
    var destination_location = changedValues[g][5];
    var destination_lat = changedValues[g][1];
    var destination_lon = changedValues[g][2];

    setLS('mapno', g);

    var directionDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;


    directionsDisplay = new google.maps.DirectionsRenderer();
    var latlng = new google.maps.LatLng(destination_lat, destination_lon);
    var mapOptions =
    {
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: latlng
    }
    map = new google.maps.Map(document.getElementById('map_results'), mapOptions); //map_canvas
    directionsDisplay.setMap(map);
    $('#text_results').empty();
    directionsDisplay.setPanel(document.getElementById("text_results"));  //directionPanel

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
        if (status === google.maps.DirectionsStatus.OK) 
        {
           directionsDisplay.setDirections(response);
        }
       else
        {
            navigator.notification.alert('No Routes Found', null, 'Branch Direction', 'OK');
            $("#text_results").html("<p style='text-align:center;color:red;margin-top: 30%;'>No Routes Found</p>");
            $("#text_results").show();
        }
    });

    document.getElementById('lightdirection').style.display = 'block';
    document.getElementById('light').style.display = 'none';
    document.getElementById('fade').style.display = 'block';
    document.getElementById('white_contentlistnew1').style.display = 'none';
}

//Function for mapping filter branches to the map

function loadGPS_locations() 
{
    setLS('Showroom', 'none');  //old branch place
    changedValues.length = 0;

    var lat1, lon1;

    if (getLS('GPS_lat') != null) {
        lat1 = getLS('GPS_lat');
    }

    if (getLS('GPS_lon') != null) {
        lon1 = getLS('GPS_lon');
    }


    setLS('Default', 2);

    for (i = 0; i < locations.length; i++) 
    {
        var lat2 = locations[i][1];
        var lon2 = locations[i][2];

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
        if (unit === "N") { dist = dist * 0.8684 }

        var distance_in_KM = (dist / 1.6).toFixed(2);
        if (distance_in_KM <= 20) {
            changedValues.push([locations[i][0], locations[i][1], locations[i][2], distance_in_KM, 1, locations[i][4], locations[i][5], locations[i][6], locations[i][7], locations[i][8]])
        }
    }

    changedValues.sort(sortfunc);
    setLS('Showroom', 'none');
    var html = "<div class='empty'></div>";
    html = html + "<div style='background: #fff;'>";
    html = html + "<div style='border-bottom: 1px solid #CCCCCC; height: 25px;margin-top: 25px;'>";
    html = html + "<p class='p-contentlist' >";
    html = html + "List of Branches</p>";
    html = html + "</div>";
    html = html + "<div class='innerpopup' style='font-size:12px'>";

    for (var k = 0; k < changedValues.length; k++) {
        var address_split = changedValues[k][5].split(',');
        html = html + "<div class='popdiv'>";
        html = html + "<table class='tableclass'>";
        html = html + "<tr style='width:100%;'>";
        html = html + " <td style='width:85%;'>";

        html = html + " <table>";
        html = html + "<tr>";
        html = html + " <td>";
        html = html + "<img src='images/showroom.png' width='20px' height='20px' />";
        html = html + "</td>"

        html = html + " <td>";
        html = html + "<span style='color:#304589'>" + changedValues[k][0] + "</span>";
        html = html + "</td>"
        html = html + "</tr>";

        html = html + "<tr style='width: 220px;'>";
        html = html + " <td style='width: 40px'>";
        html = html + "<img src='images/address.png' width='20px' height='20px'/>";
        html = html + "</td>"

        html = html + " <td style='width: 220px'>";
        html = html + "<span style='color:#304589'>" + address_split[0] + "</br>" + address_split[1] + "</span><span  style='margin-left: 30px; font-weight: bold; color: green;'>" + changedValues[k][3] + "&nbsp;mi</span>";
        html = html + "</td>"
        html = html + " </tr>"
        html = html + "</table>";
        html = html + "</td>"

        html = html + " <td style='width:15%;'>";
        //html = html + "<span><a onclick='getdirections(" + k + ",1,2);'><img src='images/getdirections1.png' width='26px' height='26px' style='margin-top:6px;cursor:pointer'/></a></span>";
        html = html + "<span><a onclick=checkinventorysearch('" + changedValues[k][10] + "','" + k + "')><img src='images/checkinventory.png' width='26px' height='26px' style='margin-top:6px;cursor:pointer'/></a><a onclick='getdirections(" + k + ",1,2);'><img src='images/getdirections1.png' width='26px' height='26px' style='margin-top:6px;cursor:pointer'/></a></span>";
        html = html + "</td>"
        html = html + " </tr>"
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


//function to handle manual GPS search

function manualsearch() {
    localStorage.removeItem('get_gpslocation');
    loadallbranches_tolocalDB();
}



