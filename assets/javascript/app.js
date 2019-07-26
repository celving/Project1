var spotCategory = "restaurant"



// Funtions made to covert meters to miles, and miles to meters 
function convertToMiles(meters) {
    var miles = meters * 0.000621371;

    return miles;

};

function convertToMeters(miles) {
    var meters = miles * 1609.344;

    return meters;
};



$(document).ready(function () {

    var searchRadiusVar = Math.floor(convertToMeters(parseInt($("#locationRadius").val()))).toString();


    $("#restaurant-button").on("click", function () {
        spotCategory = "restaurant"
    });

    $("#cafe-button").on("click", function () {
        spotCategory = "cafe"
    });

    $("#bar-button").on("click", function () {
        spotCategory = "bar"
    });



    function initMap() {

        var map;

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

            var userMarkerIcon = "https://img.icons8.com/ios-filled/50/000000/user-location.png";
            var centerPosition;
            var weatherLat;
            var weatherLng;

            var addressConverterOne = geocoder.geocode({ 'address': firstAddress }, function (results, status) {

                console.log(status);
                var marker;
                lat1 = results[0].geometry.viewport.na.j;
                lng1 = results[0].geometry.viewport.ga.j;
                centerMarker.push(lat1, lng1);
                var geoAddress = { lat: lat1, lng: lng1 };
                marker1 = new google.maps.Marker({ position: geoAddress, map: map, icon: userMarkerIcon });

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
                marker2 = new google.maps.Marker({ position: geoAddress, map: map, icon: userMarkerIcon });

                $('#userInput').val("");
                $('#userInput').empty();

                findCenter();

                createPlaces(centerPosition);
            });




            addressArray = [];
            console.log(centerMarker);

            function findCenter() {
                var _kCord = new google.maps.LatLng(centerMarker[0], centerMarker[1]);
                var _pCord = new google.maps.LatLng(centerMarker[2], centerMarker[3]);

                centerPosition = google.maps.geometry.spherical.interpolate(_kCord, _pCord, 0.5);

                weatherLat = (centerPosition.lat());
                weatherLng = (centerPosition.lng());


                function weather() {

                    var APIKey = "9e67c1fdc41149f9fdf182a3eabe03a8";

                    // Here we are building the URL we need to query the database
                    var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + weatherLat + "&lon=" + weatherLng + "&units=imperial&appid=" + APIKey;


                    $.ajax({
                        url: queryURL,
                        method: "GET"
                    })
                        // We store all of the retrieved data inside of an object called "response"
                        .then(function (response) {

                            // Log the queryURL
                            console.log(queryURL);

                            // Log the resulting object
                            console.log(response);
                            // Transfer content to HTML

                            var temperature = Math.ceil(response.main.temp);
                            var mintemp = Math.ceil(response.main.temp_min);
                            var maxtemp = Math.ceil(response.main.temp_max);
                            var wind = Math.ceil(response.wind.speed);
                            var humid = Math.ceil(response.main.humidity);
                            var newRow = $("<tr>").append(
                                $("<td>").text(temperature),
                                $("<td>").text(maxtemp),
                                $("<td>").text(mintemp),
                                $("<td>").text(wind),
                                $("<td>").text(response.weather[0].description),
                                $("<td>").text(humid)
                            );

                            // Append the new row to the table
                            $(".WeatherTable").append(newRow);
                        });

                }


                weather();
            };


            function createPlaces(place) {

                var searchRadius = searchRadiusVar;

                var request = {
                    location: place,
                    radius: searchRadius,
                    type: spotCategory
                };

                service = new google.maps.places.PlacesService(map);

                service.nearbySearch(request, function (results, status) {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        for (var i = 0; i < 10; i++) {
                            createMarker(results[i]);
                            makeRow(results[i]);
                        }

                        map.setCenter(results[0].geometry.location);
                    };
                });

            };

            function makeRow(place) {
                var tableRow = $("<tr>").append(
                    $("<td>").text(place.name),
                    $("<td>").text(place.vicinity),
                );

                $(".resultTable").append(tableRow);

            };

            function createMarker(place) {
                var marker = new google.maps.Marker({
                    map: map,
                    position: place.geometry.location,
                    animation: google.maps.Animation.DROP
                });

                google.maps.event.addListener(marker, 'click', function () {
                    infowindow.setContent(place.name);
                    infowindow.open(map, this);
                });
            };







        };


        function initAutocompleteuser() {
            // Create the autocomplete object, restricting the search predictions to
            // geographical location types.
            autocomplete = new google.maps.places.Autocomplete(
                document.getElementById('userInput'), { types: ['geocode'] });

            // Avoid paying for data that you don't need by restricting the set of
            // place fields that are returned to just the address components.
            autocomplete.setFields(['address_component']);

        }

        function initAutocompletefriend() {
            // Create the autocomplete object, restricting the search predictions to
            // geographical location types.
            autocomplete = new google.maps.places.Autocomplete(
                document.getElementById('friendInput'), { types: ['geocode'] });

            // Avoid paying for data that you don't need by restricting the set of
            // place fields that are returned to just the address components.
            autocomplete.setFields(['address_component']);

        }


        initAutocompleteuser();
        initAutocompletefriend();



    };



    initMap();

});

