const request = require('request');

var searchDestinations = (country, city, callback) => {
    console.log('city', city);
    console.log('country', country);
    if(city.split(" ").length > 2 || city.indexOf('-') !== -1) city = city.split('-')[0];
    request({
        url: `https://www.lonelyplanet.com/search.json?q=${city}`,
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