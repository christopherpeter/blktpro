/*
This javascript files is only for Navigation functions
Creaded on:28/08/2014 03:20PM
License:Tychons solutions
*/

function onConfirmExit(buttonIndex) {
    if (buttonIndex === 1) {
        navigator.app.exitApp();
    }

}

function onConfirmlogout(buttonIndex) {
    if (buttonIndex === 1) {
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

            var isuserlogged = getLS('Isuserlogged');
            //alert(isuserlogged);
            if (isuserlogged === 'yes') {
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

            filterBackBtn();

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

            pdtImgKitchenDivDisplayNew1Back();

            break;

        case 'productlist':

            backPage1();

            break;

        case 'filter':

            pdtImgKitchenDivDisplayNew1Back();

            break;

        case 'filter2':

            pdtImgKitchenDivDisplayNew2Back();

            break;

        case 'filter3':

            pdtImgKitchenDivDisplayNew3Back();

            break;

        case 'filterresult':

            pdoductpagereload();

            break;

        case 'loginpopup':

            loginclose();

            break;

        case 'clickmarker':

            toggleVisibilityClose();

            break;

        case 'getdirections':

            toggleDirectionClose();

            break;

        case 'addressbook':

            addressBookCls();

            break;

        case 'accpopup':

            addressBookCls();

            break;

        case 'terms':

            termsConditionCls();

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

            checkInventoryFunCls();

            break;

        case 'estimateshipping':

            estimatePopupClose();

            break;

    }
}
