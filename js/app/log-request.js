LogRequest = (function () {
    let lat = 0;
    let long = 0;

    function display() {
        var userData = Storage.getUserData();
        userData.location = 'LogRequest';
        Storage.saveUserData(userData);

        Util.navigateTo('Home', 'Requests');

        let content = $("#log-request-template").html(), template = Handlebars.compile(content);
        $('#divRequests').html(template());

        init();
    }

    function init() {
        Util.initValidation('#form-log-request');

        let serviceGroups = [
            { id: 'CityPark', text: 'City Parks' },
            { id: 'Electricity', text: 'Electricity' },
            { id: 'LawEnforcement', text: 'Law Enforcement' },
            { id: 'Potholes', text: 'Potholes' },
        ];
        let services = [
            { serviceGroup: 'CityPark', id: 0, text: 'Bin Cleaning' },
            { serviceGroup: 'CityPark', id: 1, text: 'Pest Control' },
            { serviceGroup: 'CityPark', id: 2, text: 'Branch Removal' },
            { serviceGroup: 'CityPark', id: 3, text: 'Mowing' },
            { serviceGroup: 'Electricity', id: 4, text: 'Wires and Down' },
            { serviceGroup: 'LawEnforcement', id: 5, text: 'Graffiti' },
            { serviceGroup: 'LawEnforcement', id: 6, text: 'Noise Nuisance' },
            { serviceGroup: 'LawEnforcement', id: 7, text: 'Illegal Dumping' },
            { serviceGroup: 'Potholes', id: 8, text: 'Repair a pothole' },
        ];

        $("#cmbServiceGroup").select2({ data: serviceGroups }).trigger("change");
        $("#cmbService").select2().trigger("change");

        $("#cmbServiceGroup").change(function () {
            $(this).trigger("blur");

            let selectedServiceGroup = Util.findAllById(services, 'serviceGroup', $(this).val());

            $('#cmbService').prop('disabled', false);
            $('#cmbService').empty();
            $("#cmbService").select2({ data: selectedServiceGroup }).trigger("change");
            $("#cmbService").change(function () {
                $(this).trigger("blur");
            });
        });
    }

    function validate() {
        var valid = $("#form-log-request").valid();

        if (valid) {
            submit();
        }
    }

    function submit() {
        let streetAddress = ($('input[name="txtStreetAddress"').val() === 'Not available') ? '' : $('input[name="txtStreetAddress"').val() + ', ';
        let suburb = ($('input[name="txtSuburb"').val() === 'Not available') ? '' : $('input[name="txtSuburb"').val() + ', ';
        let city = ($('input[name="txtCity"').val() === 'Not available') ? '' : $('input[name="txtCity"').val() + ', ';
        let postalCode = ($('input[name="txtPostalCode"').val() === 'Not available') ? '' : $('input[name="txtPostalCode"').val();

        let displayAddress = streetAddress + suburb + city + postalCode;

        var serviceGroup = $('#cmbServiceGroup').select2('data')[0].text;
        var service = $('#cmbService').select2('data')[0].text;

        let url = 'https://prod-138.westeurope.logic.azure.com:443/workflows/f9844b7d66f947c7839c1873329e1c6b/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=IbCTzjQ0JoIizxcSBsVJ0ILsGkY5rdDY97DKO6hxrrM';
        let payLoad = {
            ServiceType: "Service Delivery",
            ServiceGroup: serviceGroup,
            Service: service,
            FaultDescription: $('input[name="txtFaultDesc"').val(),
            Address: displayAddress,
            Latitude: lat,
            Longitude: long
        };

        WebApi.ajaxRequest('POST', url, payLoad, function (result) {
            Swal.fire(
                'Incident successfully submitted', 'Incident number logged is: #1234568', 'success'
            ).then((result) => {
                setTimeout(function () {
                    goBack();
                }, 150);
            });
        });
    }

    function clear() {
        let content = $("#log-request-template").html(), template = Handlebars.compile(content);
        $('#divRequests').html(template());

        init();
    }

    function goBack() {
        Home.display();
        Util.navigateTo('Requests', 'Home');
    }

    function getMap() {
        $('#map').css('height', '250px');
        $('#map').css('margin-bottom', '15px');

        let apiKey = 'AlBs3TW_XRFswwFQQIzqmz3VYih4O82OF1nRqNsQSKjz2euksVAtqFhfZH5Yvppk';
        var map = new Microsoft.Maps.Map('#map', {
            credentials: apiKey
        });

        //Request the user's location
        navigator.geolocation.getCurrentPosition(function (position) {
            var loc = new Microsoft.Maps.Location(
                position.coords.latitude,
                position.coords.longitude);

            //Add a pushpin at the user's location.
            var pin = new Microsoft.Maps.Pushpin(loc);
            map.entities.push(pin);

            //Center the map on the user's location.
            map.setView({ center: loc, zoom: 15 });

            lat = position.coords.latitude;
            long = position.coords.longitude;

            let url = 'http://dev.virtualearth.net/REST/v1/Locations/' + position.coords.latitude + ',' + position.coords.longitude + '?o=json&key=' + apiKey
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
        validate: validate,
        goBack: goBack,
        clear: clear,
        getMap: getMap
    };
}());