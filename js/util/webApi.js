WebApi = (function () {
    var webApiUrl = '';
    var appUrl = '';

    function ajaxRequest(type, functionCall, payLoad, callback) {
        if (payLoad !== null) {
            Util.startLoader();
            $.ajax({
                type: type,
                url: webApiUrl + functionCall,
                contentType: "application/json",
                dataType: "json",
                crossDomain: true,
                data: JSON.stringify(payLoad),
                beforeSend: function (xhr) {
                    if (user !== undefined)
                        xhr.setRequestHeader('Authorization', 'Bearer ' + user.token);
                },
                success: function (result) {
                    callback(result);
                },
                failure: function (result) {
                    console.log(result);
                    errorNotification(result);
                },
                error: function (result) {
                    console.log(result);
                    callback(result);
                    //errorNotification(result);
                },
                complete: function (data) {
                    Util.stopLoader();
                }
            });
        } else {
            Util.startLoader();
            $.ajax({
                type: type,
                url: webApiUrl + functionCall,
                contentType: "application/json",
                dataType: "json",
                crossDomain: true,
                beforeSend: function (xhr) {
                    if (user !== undefined)
                        xhr.setRequestHeader('Authorization', 'Bearer ' + user.token);
                },
                success: function (result) {
                    callback(result);
                },
                failure: function (result) {
                    console.log(result);
                    errorNotification(result);
                },
                error: function (result) {
                    console.log(result);
                    errorNotification(result);
                },
                complete: function (data) {
                    Util.stopLoader();
                }
            });
        }
    }

    function ajaxRequestNoLoader(type, functionCall, payLoad, callback) {
        if (payLoad !== null) {
            //Util.startLoader();
            $.ajax({
                type: type,
                url: webApiUrl + functionCall,
                contentType: "application/json",
                dataType: "json",
                crossDomain: true,
                data: JSON.stringify(payLoad),
                beforeSend: function (xhr) {
                    if (user !== undefined)
                        xhr.setRequestHeader('Authorization', 'Bearer ' + user.token);
                },
                success: function (result) {
                    callback(result);
                },
                failure: function (result) {
                    console.log(result);
                    errorNotification(result);
                },
                error: function (result) {
                    console.log(result);
                    errorNotification(result);
                },
                complete: function (data) {
                    //Util.stopLoader();
                }
            });
        } else {
            //Util.startLoader();
            $.ajax({
                type: type,
                url: webApiUrl + functionCall,
                contentType: "application/json",
                dataType: "json",
                crossDomain: true,
                beforeSend: function (xhr) {
                    if (user !== undefined)
                        xhr.setRequestHeader('Authorization', 'Bearer ' + user.token);
                },
                success: function (result) {
                    callback(result);
                },
                failure: function (result) {
                    console.log(result);
                    errorNotification(result);
                },
                error: function (result) {
                    console.log(result);
                    errorNotification(result);
                },
                complete: function (data) {
                    //Util.stopLoader();
                }
            });
        }
    }

    function errorNotification(data) {
        var defaultMessage = 'An error has occured, please check your internet connection or contact the Ez Innovations Team';
        if (data.hasOwnProperty('responseJSON')) {
            if (data.responseJSON !== undefined) {
                if (data.responseJSON.message != undefined) {
                    defaultMessage = data.responseJSON.message;
                } else {
                    defaultMessage = data.responseJSON.status + ' - ' + data.responseJSON.title;
                }

            }
        } else if (data.hasOwnProperty('responseText')) {
            defaultMessage = data.responseText;
        }

        var options = {
            style: 'bar',
            message: defaultMessage,
            type: 'danger',
            position: 'top'
        };
        $('body').pgNotification(options).show();

        //if (data.status === 401) {
        //    setTimeout(function () {
        //        window.location.replace('/login.html');
        //    }, 4000);
        //}
    }

    return {
        ajaxRequest: ajaxRequest,
        ajaxRequestNoLoader: ajaxRequestNoLoader,
        webApiUrl: webApiUrl,
        appUrl: appUrl,
        errorNotification: errorNotification
    };
}());