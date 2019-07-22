function createPlaces(){

    var searchType = $();


    var request = {
        location: centerPoint,
        radius: ["1000"],
        type: searchType
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
        $("<td>").text(place.rating + " stars"),


    );

    $(".resultTable").append(tableRow);

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