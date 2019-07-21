function initMap() {

    var map;



    // Funtions made to covert meters to miles, and miles to meters 
    function convertToMiles(meters) {
        var miles = meters * 0.000621371;

        return miles;

    };

    function convertToMeters(miles) {
        var meters = miles * 1609.344;

        return meters;
    };

    var firstAddress;
    var secondAddress;
    var addressArray = [];

    $('#addressSubmit').on('click', function () {
        event.preventDefault();
        firstAddress = $('#userInput').val().trim();
        secondAddress = $('#friendInput').val().trim();
        addressArray.push(firstAddress, secondAddress);
        $('#userInput').val("");
        $('#friendInput').val("");
        logAddresses();

    });


    map = new google.maps.Map(document.getElementById('googleMap'), {
        center: { lat: 39.09973, lng: -94.57857 },
        zoom: 10
    });


    var geocoder = new google.maps.Geocoder();

    var lat1;
    var lng1;
    var lat2;
    var lng2;
    var centerMarker = [];

    function logAddresses() {



        var addressConverterOne = geocoder.geocode({ 'address': firstAddress }, function (results, status) {

            console.log(status);
            var marker;
            lat1 = results[0].geometry.viewport.na.j;
            lng1 = results[0].geometry.viewport.ga.j;
            centerMarker.push(lat1, lng1);
            var geoAddress = { lat: lat1, lng: lng1 };
            marker1 = new google.maps.Marker({ position: geoAddress, map: map });

            $('#userInput').val("");
            $('#userInput').empty();

        });

        var addressConverterTwo = geocoder.geocode({ 'address': secondAddress }, function (results, status) {

            console.log("GEOCODER STATUS: " + status);
            var marker;
            lat2 = results[0].geometry.viewport.na.j;
            lng2 = results[0].geometry.viewport.ga.j;
            centerMarker.push(lat2, lng2);
            var geoAddress = { lat: lat2, lng: lng2 };
            marker2 = new google.maps.Marker({ position: geoAddress, map: map });

            $('#userInput').val("");
            $('#userInput').empty();

            findCenter();
        });




        addressArray = [];
        console.log(centerMarker);

        function findCenter() {
            var _kCord = new google.maps.LatLng(centerMarker[0], centerMarker[1]);
            var _pCord = new google.maps.LatLng(centerMarker[2], centerMarker[3]);

            var centerPosition = google.maps.geometry.spherical.interpolate(_kCord, _pCord, 0.5);

            var halfwayMarker = new google.maps.Marker({ position: centerPosition, map: map });
        };









    };







};