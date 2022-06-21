const express = require("express");
const router = express.Router();
const connection = require("../database/dbconnection");
let bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/temperature/get-data/', function(req, res){
    let sql1 = 'select Time, Value from Temperature order by SensorID DESC limit 0, 36';

    connection.query(sql1, function(err, result){
        if (err){
            res.status(500).json ({
                'code': 500,
                'message': 'DB select Error from Temperature table'
            })
            console.log(err);
        }
        else{
            res.status(200).json ({
                'data': result 
            });
        }
    })
})

router.get('/humidity/get-data/', function(req, res){
    let sql1 = 'select Time, Value from Humidity order by SensorID DESC limit 0, 36';

    connection.query(sql1, function(err, result){
        if (err){
            res.status(500).json ({
                'code': 500,
                'message': 'DB select Error from CO2 table'
            })
            console.log(err);
        }
        else{
            res.status(200).json ({
                'data': result 
            });
        }
    })
})

router.get('/co2/get-data/', function(req, res){
    let sql1 = 'select Time, Value from CO2 order by SensorID DESC limit 0, 36';

    connection.query(sql1, function(err, result){
        if (err){
            res.status(500).json ({
                'code': 500,
                'message': 'DB select Error from CO2 table'
            })
            console.log(err);
        }
        else{
            res.status(200).json ({
                'data': result 
            });
        }
    })
})

module.exports = router;
