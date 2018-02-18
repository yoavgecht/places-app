var express =  require('express'),
mysql = require('mysql');
const importer = require('node-mysql-importer');
const port = process.env.PORT || 9080;
bodyParser  =  require('body-parser'),
router      =  express.Router(),
app 		=  express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
console.log("SERVER STARTED");

if(port == 8080){
        var pool      =    mysql.createPool({
        host     : 'placesdb.ceryqjmnlczp.eu-central-1.rds.amazonaws.com',
        port     : '3306',
        user     : 'yoavgecht',
        password : 'Annapurna13',
        database : 'placesdb'
    });
    console.log('AWS');

} else if(process.env.PORT) {
        var pool      =    mysql.createPool({
        connectionLimit : 100, //important
        host     : 'us-cdbr-iron-east-05.cleardb.net',
        user     : 'b303389f03eb1b',
        password : '9f9c997f',
        database : 'heroku_0a52093442b2f9b',
        debug    :  false
    });

    console.log('HEROKU');
} else {
        var pool      =    mysql.createPool({
        connectionLimit : 100, //important
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'destinationsDB',
        debug    :  false
    });
    console.log('LOCAL');
}




app.use(express.static(__dirname + '/build')) 




.get('/api/fetch-destination', (req, res) => {
    console.log('fetching destinations from db');
    var location = req.body.location;
    console.log(location);
	fetchDestination(location, res);
})

.post('/api/add-destination', (req, res) => {
    console.log('adding a destination to db');
    var location = req.body.location;
    console.log(location);
	addDestination(location, res);
})

.get('*', (req, res) => {
    console.log('GET  *')
    res.sendFile(__dirname + '/build/index.html');
})

addDestination = (location, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        } 
        console.log('connected as id ' + connection.threadId);

        var query1 = "SELECT * from ?? where ?? = ? AND ?? = ? OR ?? = ?";
        var inserts1 = ['destinations', 'latitude', location.lat.toPrecision(8), 'longitude', location.lng.toPrecision(8), 'placeName', location.locationName.toString()];
        query1 = mysql.format(query1, inserts1);
        console.log('query1', query1);

        var query2 =  "INSERT INTO ?? (placeName, longitude, latitude, placePhoto) VALUES (?, ?, ?, ?)";
        var inserts2 = ['destinations', location.locationName.toString(), location.lng, location.lat, location.placePhoto];
        query2 = mysql.format(query2, inserts2);
        
        connection.query(query1, function(err, rows, fields){
            connection.release();
            if(!err) {
                console.log('rows', rows);
                console.log('rows length', rows.length);  
            	if(rows.length > 0){
                    console.log(rows);
                    console.log('User already chose this place');
                    res.send('recordExists');
                } else {
                     console.log('QUERY 2 --->');
                      connection.query(query2, function(err, rows, fields){
                          if(!err) {
                             connection.query(query1, function(err, rows, fields){
                                  console.log(rows);
                                  res.json(rows);
                             })
                          } else {
                           console.log(err);
                           res.send('error'); 
                          }
                      });
                }
            } else {
                console.log(err);
                res.send('error');

            }           
        });
    })
}

function fetchDestination(location, res){
	console.log('fetchDestination');
	pool.getConnection(function(err, connection){
        if (err) {
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   

        console.log('connected as id ' + connection.threadId);
        console.log(location);
        const query = "SELECT * from destinations";
        // const query = `SELECT name, latitude, longitude, SQRT(POW(111.2 * (latitude - ${location.lat}), 2) + POW(111.2 * (${location.lng} - longitude) * COS(latitude / 57.3), 2)) AS distance FROM branches HAVING distance < 50 ORDER BY distance LIMIT 10`

        connection.query(query, function(err, rows, fields){
            connection.release();
            if(!err) {  
                const markers = rows.map((marker) => {
                    console.log('MARKER: ', marker);
                    return {
                        position: {
                            lat: marker.latitude,
                            lng: marker.longitude,
                            placeName: marker.placeName,
                            placePhoto: marker.placePhoto
                        }
                    }
                })
                console.log('markers:', markers)
                res.send(markers);
            } else {
                console.log(err);
            }           
        });

        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     
        });
  });

}



app.listen(port);

