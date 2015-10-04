# WeatherMap API Test
Simple API example that pulls temperature data for a specified city

##Setup

Install Node Modules

`> npm install`

Test

`> npm test`

Start Server

`> npm start`

##Usage

The server will listen on `localhost:8080`.  Any calls to the server will respond with the temperature data for Tampa, fl by default.

The server accepts a parameter of `?city={city}` where the server will respond with the current temperature of that city.
> Example: `http://localhost:8080/?city=Orlando,fl`
