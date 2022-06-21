const express = require("express");
const router = express.Router();
const connection = require("../database/dbconnection");
let bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/sensor', function(req, res){
    let sql1 = 'select Value from CO2 order by SensorID DESC limit 0, 1';
    let sql2 = 'select Value from Temperature order by SensorID DESC limit 0, 1';
    let sql3 = 'select Value from Humidity order by SensorID DESC limit 0, 1';

    connection.query(sql1, function(err, result1){
        if (err){
            res.status(500).json ({
                'code': 500,
                'message': 'DB select Error from CO2 table'
            })
        }
        else{
            connection.query(sql2, function(err, result2){
                if (err){
                    res.status(500).json ({
                        'code': 500,
                        'message': 'DB select Error from Temperature table'
                    })
                }
                else{
                    connection.query(sql3, function (err, result3){
                        if (err){
                            res.status(500).json ({
                                'code': 500,
                                'message': 'DB select Error from Temperature table'
                            })
                        }
                        else{
                            res.status(200).json ({
                                'code': 200,
                                'CO2': result1[0].Value,
                                'Temperature': result2[0].Value,
                                'Humidity': result3[0].Value
                            })
                        }
                    })
                }
            })
        }
    })
})


module.exports = router;