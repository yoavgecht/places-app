const request = require('request');

var getExperienses = (country, city, callback) => {
    request({
        url: `https://www.lonelyplanet.com/api/${country}/${city}/experiences.json`,
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

module.exports.getExperienses = getExperienses;