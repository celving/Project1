var APIKey = "9e67c1fdc41149f9fdf182a3eabe03a8";

// Here we are building the URL we need to query the database
var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=39.099728&lon=-94.578568&units=imperial&appid=" + APIKey;

  //http://samples.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=b6907d289e10d714a6e88b30761fae22
 
  //https://samples.openweathermap.org/data/2.5/group?id=524901,703448,2643743&units=metric&appid=b6907d289e10d714a6e88b30761fae22
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {

      // Log the queryURL
      console.log(queryURL);

      // Log the resulting object
      console.log(response);
      // Transfer content to HTML
      var newRow = $("<tr>").append(
        $("<td>").text(response.main.temp),
        $("<td>").text(response.main.temp_max),
        $("<td>").text(response.main.temp_min),
        $("<td>").text(response.wind.speed),
        $("<td>").text(response.weather[0].description),
        $("<td>").text(response.main.humidity)
      );
    
      // Append the new row to the table
      $(".WeatherTable").append(newRow);
    });

      