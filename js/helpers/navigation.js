/*
This javascript files is only for Navigation functions
Creaded on:28/08/2014 03:20PM
License:Tychons solutions
*/

function onConfirmExit(buttonIndex) {
    if (buttonIndex == 1) {
        navigator.app.exitApp();
    }
  
}

function onConfirmlogout(buttonIndex) {
    if (buttonIndex == 1) {
        localStorage.clear();
        droptable();
        window.location.href = 'index.html';
    }
}

function changepage(page) {
    switch (page) {
        case 'home':

            window.location.href = 'index.html';

            break;

        case 'index':

            var isuserlogged = GetLS('Isuserlogged');
            //alert(isuserlogged);
            if (isuserlogged == 'yes')
            {
                navigator.notification.confirm('Are you sure want to logout?', onConfirmlogout, 'Logout', ['Yes', 'No']);
            }
            else {
                navigator.app.exitApp();
               // navigator.notification.confirm('Are you sure want to quit application?', onConfirmExit, 'Quit Application', ['Yes', 'No']);
            }

            break;

        case 'newlogin':

            //window.history.back()

            //navigator.app.backHistory();

            window.location.href = 'index.html';

            //history.go(-1);

            break;

        case 'indexpage':

            backtoindexpage();

            break;

        case 'FilterPopUp':

            filterbackbtn();

            break;

        case 'scan':

            backpagekitchen();

            break;

        case 'products':

            window.location.href = 'products.html';

            break;

        case 'cart':

            window.location.href = 'cart.html';

            break;

        case 'account':

            window.location.href = 'myaccount.html';

            break;

        case 'sections':

            pdtimgkitchendivdisplaynew1back();

            break;

        case 'productlist':

            backpage1();

            break;

        case 'filter':

            pdtimgkitchendivdisplaynew1back();

            break;

        case 'filter2':

            pdtimgkitchendivdisplaynew2back();

            break;

        case 'filter3':

            pdtimgkitchendivdisplaynew3back();

            break;

        case 'filterresult':

            pdoductpagereload();

            break;

        case 'loginpopup':

            loginclose();

            break;

        case 'clickmarker':

            toggle_visibilityclose();

            break;

        case 'getdirections':

            toggle_directionclose();

            break;

        case 'addressbook':

            addressbookcls();

            break;

        case 'accpopup':

            addressbookcls();

            break;

        case 'terms':

            terms_conditioncls();

            break;

        case 'filterselection':

            filter();
            $("#default_div").show();
            $(".searchdiv").show();
            break;

        case 'submitpopup':

            submitclose();

            break;

        case 'checkinventory':

            checkinventoryfuncls();

            break;

        case 'estimateshipping':

            estomatepopupclose();

            break;

    }
}


function TestBack() {
    var c_page = GetLS('page');
    var result = c_page.split(",");
    changepage(result[result.length - 1]);
    if (result.length == 1) {
        var new_page = c_page.replace(result[result.length - 1], "");
        SetLS('page', new_page);
    } else {
        var new_page = c_page.replace(',' + result[result.length - 1], "");
        SetLS('page', new_page);
    }
}