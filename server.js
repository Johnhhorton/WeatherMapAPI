var http = require('http'),
  url = require('url'),
  port = 8080;

/*
*@desc Makes a call to the WeatherMap API based on the input city
*@params string: city, function: callback
*@usage WeatherMapAPIRequest('Tampa,fl', function(data){});
*@result passes JSON object with city data to the callback function.
*/
function WeatherMapAPIRequest(city, callback) {

  var options = {
    hostname: "api.openweathermap.org",
    port: 80,
    path: "/data/2.5/weather" + '?q=' + city + '&units=imperial',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  httpRequest(options).then(callback, function(error){
    console.error("http request failed with error: " + error);

  });
};

/*
*@desc Performs https requests based on options passed.  To be used as an
*    example of a promise.  Only used for JSON responses.
*@params object: options - http request options.
*@returns parsed JSON from request.
*/
function httpRequest(options) {

  return new Promise(function(fulfill, reject) {

    var request = http.request(options, function(response) {

      var data = '';
      response.setEncoding('utf8');

      response.on('data', function(chunk) {
        data += chunk;
      });

      response.on('end', function() {
          fulfill(JSON.parse(data));
      });

    });

    request.on('error', function(error) {
      reject(error.message);
    });

    request.end();

  });

}


function ServerRequestHandler(req, res) {

  //prevents extra api calls when browser sends request for favicon.
  if (req.url !== '/favicon.ico') {

    var city;

    var parsedUrl = url.parse(req.url, true)
    params = parsedUrl.query;

    if (params.city) {
      city = params.city;
    } else {
      city = 'tampa,fl'; //Defaults to Tampa
    }

    WeatherMapAPIRequest(city, function(data) {

      var temp = {
        currentTemperature: data.main.temp
      };

      res.writeHead(200, {
        "Content-Type": "application/json"
      });

      res.end(JSON.stringify(temp));

    });

  } else {

    res.writeHead(404, {
      "Content-Type": "application/json"
    });

    res.end("404: resource not found");

  }
};

//Create HTTP server and pass requests handling function
var server = http.createServer(ServerRequestHandler).listen(port);

module.exports = {
  WeatherMapAPIRequest: WeatherMapAPIRequest
};
