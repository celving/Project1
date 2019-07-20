var APIKey = "9e67c1fdc41149f9fdf182a3eabe03a8";

// Here we are building the URL we need to query the database
var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=" + APIKey;

  //http://samples.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=b6907d289e10d714a6e88b30761fae22
 

 $.ajax({
     url: queryURL,
    method: "GET"
 }).then(function (response) {

   console.log(response);
 });