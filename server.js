var express =  require('express'),
mysql = require('mysql');
const importer = require('node-mysql-importer');
bodyParser  =  require('body-parser'),
router      =  express.Router(),
app 		=  express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'supermarkets',
    debug    :  false
});


app.use(express.static(__dirname + '/'))


.post('/locations', function(req, res){
    console.log('locations');
    var location = req.body.location;
    console.log(location);
	getSupermarkets(location, res);
})

function getSupermarkets(location, res){
	console.log('getSupermarkets');
	pool.getConnection(function(err,connection){
        if (err) {
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   

        console.log('connected as id ' + connection.threadId);
        console.log(location);
        const query = `SELECT latitude, longitude, SQRT(POW(111.2 * (latitude - ${location.lat}), 2) + POW(111.2 * (${location.lng} - longitude) * COS(latitude / 57.3), 2)) AS distance FROM branches HAVING distance < 50 ORDER BY distance LIMIT 30`

        connection.query(query, function(err, rows, fields){
            connection.release();
            if(!err) {  
            	console.log(rows);
                const markers = rows.map((marker) => {
                    return {
                        position: {
                            lat: marker.latitude,
                            lng: marker.longitude
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



app.listen(8080);

