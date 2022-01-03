ViewRequestDetails = (function () {
    function display() {
        //Util.navigateTo('Home', 'Requests');
        let details = mockData();

        let content = $("#view-request-details-template").html(), template = Handlebars.compile(content);
        $('#divRequests').html(template(details));

        getMap(details.latitude, details.longitude);
    }

    function goBack() {
        ViewRequests.display(false);
        //Util.navigateTo('Requests', 'Home');
    }

    function mockData(){
        return {title:"Electricity (Equipment Damage and Exposure)", status: "Unassigned", address:"432 Sandpiper Dr, City, Johannesbury, 2000",
        service:"No power",latitude: -33, longitude: 19, assignedTo: "", faultDescription:"Substation blown", comments:"Some comment", customer: "Neeleshan Thanthony", 
        attachments:"", timeOnSite: "", timeEmployeesDispatched:"", timeResolved:"", employeeLocation:"", employeeAlternateLocation:"",
        date:"01-01-2022"};
    }

    function getMap(lat, long) {
        $('#map').css('height', '250px');
        $('#map').css('margin-bottom', '15px');

        let apiKey = 'AlBs3TW_XRFswwFQQIzqmz3VYih4O82OF1nRqNsQSKjz2euksVAtqFhfZH5Yvppk';
        var map = new Microsoft.Maps.Map('#map', {
            credentials: apiKey
        });

        //Request the user's location
        navigator.geolocation.getCurrentPosition(function (position) {
            position.coords.latitude = lat;
            position.coords.longitude = long;
            var loc = new Microsoft.Maps.Location(
                lat,
                long);

            //Add a pushpin at the user's location.
            var pin = new Microsoft.Maps.Pushpin(loc);
            map.entities.push(pin);

            //Center the map on the user's location.
            map.setView({ center: loc, zoom: 15 });

            lat = position.coords.latitude;
            long = position.coords.longitude;

            let url = 'http://dev.virtualearth.net/REST/v1/Locations/' + lat + ',' + long + '?o=json&key=' + apiKey
            WebApi.ajaxRequest('GET', url, null, function (result) {
                try {
                    let locationSet = result.resourceSets[0].resources[0].address;

                    if (locationSet.addressLine !== undefined) {
                        $('input[name="txtStreetAddress"').val(locationSet.addressLine);
                    } else {
                        $('input[name="txtStreetAddress"').val('Not available');
                    }
                    if (locationSet.neighborhood !== undefined) {
                        $('input[name="txtSuburb"').val(locationSet.neighborhood);
                    } else {
                        $('input[name="txtSuburb"').val('Not available');
                    }
                    if (locationSet.locality !== undefined) {
                        $('input[name="txtCity"').val(locationSet.locality);
                    } else {
                        $('input[name="txtCity"').val('Not available');
                    }
                    if (locationSet.postalCode !== undefined) {
                        $('input[name="txtPostalCode"').val(locationSet.postalCode);
                    } else {
                        $('input[name="txtPostalCode"').val('Not available');
                    }
                } catch (ex) {
                    console.log(ex);
                }
            });

        }, function (error) {
            Swal.fire('Location could not be found', 'Please ensure you have given the application permissions to the location and that your location is turned on.', 'error');
        }, { enableHighAccuracy: true, timeout: 5000, maximumAge: 200 });
    }

    return {
        display: display,
        goBack: goBack
    };
}());