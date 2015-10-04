var expect = require('chai').expect;
var app = require('../server.js');
var request = require('request');

describe('Weather API', function() {
  describe('WeatherMapAPIRequest()', function() {
    it('Should receive JSON weather data for a city', function(done) {
      var returnData;
      app.WeatherMapAPIRequest('tampa,fl', function(data) {
        returnData = data;
        done();
        expect(returnData).to.contain('main');
      });
    });
  });
});
describe('Node App HTTP server', function() {
  describe('request to any route', function() {
    var url = "http://localhost:8080";
    var tampaUrl = "http://localhost:8080?city=tampa,fl";
    var newYorkUrl = "http://localhost:8080?city=orlando,fl";
    var tampaTemp;
    var newYorkTemp;

    it('Should return status 200', function(done) {
      request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
    it('Should return json object with current temperature for city', function(done) {
      request(url, function(error, response, body) {
        var data = JSON.parse(body);
        done();
        expect(response.body.currentTemperature).to.exist;

      });
    });
    it('Should return json object with current temperature for Tampa', function(done) {
      request(tampaUrl, function(error, response, body) {
        var data = JSON.parse(body);
        tampaTemp = data;
        done();
        expect(response.body.currentTemperature).to.exist;

      });
    });
    it('Should return json object with current temperature for NewYork', function(done) {
      request(newYorkUrl, function(error, response, body) {
        var data = JSON.parse(body);
        newYorkTemp = data;
        done();
        expect(response.body.currentTemperature).to.exist;

      });

    });
  });
});
