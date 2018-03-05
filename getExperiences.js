const request = require('request');

var getExperienses = (country, city, uri, callback) => {
    console.log('uri', uri);
    if(uri){
        request({
        url: `https://www.lonelyplanet.com/api/${uri}/experiences.json`,
        json: true 
    }, (error, response, body) => {
        if(error) {
            callback('Unable to connect to Google servers');
        } else if(response.statusCode === 400) {
             callback('Unable to fetch Experiences');
        } else if(response.statusCode === 200 && response.body.length > 0) {
            callback(undefined, body);
        } else {
            callback(undefined, []);
        }
     });
    } else {
        request({
        url: `https://www.lonelyplanet.com/api/${country}/${city}/experiences.json`,
        json: true 
    }, (error, response, body) => {
        if(error) {
            callback('Unable to connect to Google servers');
        } else if(response.statusCode === 400) {
             callback('Unable to fetch Experienses');
        } else if(response.statusCode === 200 && response.body.length > 0) {
            callback(undefined, body);
        } else {
            callback(undefined, []);
        }
     });
    } 
}

module.exports.getExperienses = getExperienses;