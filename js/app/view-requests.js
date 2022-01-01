ViewRequests = (function () {
    function display() {
        Util.navigateTo('Home', 'Requests');

        let content = $("#view-requests-template").html(), template = Handlebars.compile(content);
        $('#divRequests').html(template());
    }

    function goBack() {
        Home.display();
        Util.navigateTo('Requests', 'Home');
    }

    return {
        display: display,
        goBack: goBack
    };
}());