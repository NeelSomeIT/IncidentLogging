Storage = (function () {
    function restoreState() {
        if (getUserData() === null) {
            Home.display();
        } else {
            Home.display();
            setTimeout(function () {
                var userData = getUserData();
                window[userData.location].display();
            }, 500);

        }
    }

    function saveUserData(userData) {
        var data = JSON.stringify(userData);
        window.localStorage.setItem('userData', data);
    }

    function getUserData() {
        return eval(JSON.parse(window.localStorage.getItem('userData')));
    }

    function clearUserData() {
        window.sessionStorage.removeItem('userData');
    }

    function saveProcessData(userData) {
        var data = JSON.stringify(userData);
        window.localStorage.setItem('processData', data);
    }

    function getProcessData() {
        return eval(JSON.parse(window.localStorage.getItem('processData')));
    }

    function clearProcessData() {
        window.localStorage.removeItem('processData');
    }

    function clearState() {
        window.localStorage.clear();
    }

    return {
        restoreState: restoreState,
        saveUserData: saveUserData,
        getUserData: getUserData,
        saveProcessData: saveProcessData,
        getProcessData: getProcessData,
        clearProcessData: clearProcessData,
        clearUserData: clearUserData,
        clearState: clearState
    };
}());
