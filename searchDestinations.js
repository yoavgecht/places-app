const request = require('request');

var searchDestinations = (country, city, callback) => {
    console.log('city', city);
    console.log('country', country);
    var cleanedCity = city.replace(/-/g, ' ');
    var cleanedCountry = country.replace(/-/g, ' ');
    console.log('cityClean', cleanedCity);
    console.log('countryClean', cleanedCountry);
    request({
        url: `https://www.lonelyplanet.com/search.json?q=${cleanedCity}`,
        json: true 
    }, (error, response, body) => {
        if(error) {
            callback('Unable to connect to Google servers');
        } else if(response.statusCode === 400) {
             callback('Unable to fetch Experienses');
        } else if(response.statusCode === 200) {
            callback(undefined, body);
        }
     });
}

module.exports.searchDestinations = searchDestinations;