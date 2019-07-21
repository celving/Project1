function createPlaces(){

    var searchType = $()


    var request = {
        location: midAddress,
        radius: ["1000"],
        type: [searchType]
    };

    service = new google.maps.places.PlacesService(map);

    service.nearbySearch(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }

            map.setCenter(results[0].geometry.location);
        };
    });

};

function createMarker(place) {
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
};