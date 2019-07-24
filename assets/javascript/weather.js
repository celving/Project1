
function weather(){

  var APIKey = "9e67c1fdc41149f9fdf182a3eabe03a8";
  
  // Here we are building the URL we need to query the database
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=39.099728&lon=-94.578568&units=imperial&appid=" + APIKey;
  
    
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
  
    