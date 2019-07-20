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

    $('#addressSubmit').on('click', function () {
        event.preventDefault();
        firstAddress = $('#userInput').val().trim();
        logFirstAddress();



    });
    console.log(firstAddress);
    console.log(google);


    map = new google.maps.Map(document.getElementById('googleMap'), {
        center: { lat: 39.09973, lng: -94.57857 },
        zoom: 10
    });

    console.log(map);
    var geocoder = new google.maps.Geocoder();

    function logFirstAddress() {

        var addressConverter = geocoder.geocode({ 'address': firstAddress }, function (results, status) {

            console.log(status);
            var marker;
            var lat = results[0].geometry.viewport.na.j;
            var lng = results[0].geometry.viewport.ga.j;
            var geoAddress = { lat: lat, lng: lng };
            marker = new google.maps.Marker({ position: geoAddress, map: map });

            $('#userInput').val("");
            $('#userInput').empty();



        });












    };



};