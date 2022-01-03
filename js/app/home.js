Home = (function () {
    function display() {
        Storage.clearState();

        let userData = {
            location: 'Home',
        };
        Storage.saveUserData(userData);

        let content = $("#home-template").html(), template = Handlebars.compile(content);
        $('#divHome').html(template());

        $("#btnLogServiceRequest").click(function () {
            LogRequest.display();
        });
        $("#btnViewRequests").click(function () {
            ViewRequests.display(true);
        });
    }

    return {
        display: display
    };
}());