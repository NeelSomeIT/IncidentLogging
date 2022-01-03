ViewRequests = (function () {
    function display(navigation) {
        if(navigation)
            Util.navigateTo('Home', 'Requests');

        let content = $("#view-requests-template").html(), template = Handlebars.compile(content);
        $('#divRequests').html(template(mockData));
    }

    function goBack() {
        Home.display();
        Util.navigateTo('Requests', 'Home');
    }

    function mockData(){
        return [{title:"Electricity (Equipment Damage and Exposure)", status: "Unassigned", address:"432 Sandpiper Dr, City, Johannesbury, 2000"},
        {title:"Electricity (Equipment Damage and Exposure)", status: "Unassigned", address:"432 Sandpiper Dr, City, Johannesbury, 2000"},
        {title:"Electricity (Equipment Damage and Exposure)", status: "Unassigned", address:"432 Sandpiper Dr, City, Johannesbury, 2000"},
        {title:"Electricity (Equipment Damage and Exposure)", status: "Unassigned", address:"432 Sandpiper Dr, City, Johannesbury, 2000"},
        {title:"Electricity (Equipment Damage and Exposure)", status: "Unassigned", address:"432 Sandpiper Dr, City, Johannesbury, 2000"}];
    }

    return {
        display: display,
        goBack: goBack
    };
}());