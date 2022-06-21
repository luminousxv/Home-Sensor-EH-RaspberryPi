const express = require("express");
const router = express.Router();
const connection = require("../database/dbconnection");
let bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/co2/average', function(req, res){
    let sql1 = 'select Value from CO2 order by SensorID DESC limit 0, 6';
    let sql2 = 'select Value from CO2 order by SensorID DESC limit 0, 12';
    let sql3 = 'select Value from CO2 order by SensorID DESC limit 0, 36';
    let average = 0;

    connection.query(sql1, function(err, result1){
        if (err){
            res.status(500).json ({
                'code': 500,
                'message': 'DB select Error from CO2 table-one'
            })
            console.log(err);
        }
        else{
            for (let i =0; i < 6; i++){
                average += result1[0].Value;
            }
            let average1 = average/6;
            connection.query(sql2, function(err, result2){
                if (err){
                    res.status(500).json ({
                        'code': 500,
                        'message': 'DB select Error from CO2 table-two'
                    })
                }
                else{
                    average = 0;
                    for (let i =0; i < 6; i++){
                        average += result2[0].Value;
                    }
                    let average2 = average/12;
                    connection.query(sql3, function(err, result3){
                        if (err){
                            res.status(500).json ({
                                'code': 500,
                                'message': 'DB select Error from CO2 table-six'
                            })
                        }
                        else{
                            average = 0;
                            for (let i =0; i < 6; i++){
                                average += result1[0].Value;
                            }
                            let average3 = average/36;
                            res.status(200).json ({
                                'code': 200,
                                'average': {
                                    'one': average1.toFixed(2),
                                    'two': average2.toFixed(2),
                                    'six': average3.toFixed(2)
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})

router.get('/temperature/average', function(req, res){
    let sql1 = 'select Value from Temperature order by SensorID DESC limit 0, 6';
    let sql2 = 'select Value from Temperature order by SensorID DESC limit 0, 12';
    let sql3 = 'select Value from Temperature order by SensorID DESC limit 0, 36';
    let average = 0;

    connection.query(sql1, function(err, result1){
        if (err){
            res.status(500).json ({
                'code': 500,
                'message': 'DB select Error from Temperature table-one'
            })
        }
        else{
            for (let i =0; i < 6; i++){
                average += result1[0].Value;
            }
            let average1 = average/6;
            connection.query(sql2, function(err, result2){
                if (err){
                    res.status(500).json ({
                        'code': 500,
                        'message': 'DB select Error from Temperature table-two'
                    })
                }
                else{
                    average = 0;
                    for (let i =0; i < 6; i++){
                        average += result2[0].Value;
                    }
                    let average2 = average/12;
                    connection.query(sql3, function(err, result3){
                        if (err){
                            res.status(500).json ({
                                'code': 500,
                                'message': 'DB select Error from Temperature table-six'
                            })
                        }
                        else{
                            average = 0;
                            for (let i =0; i < 6; i++){
                                average += result1[0].Value;
                            }
                            let average3 = average/36;
                            res.status(200).json ({
                                'code': 200,
                                'average': {
                                    'one': average1.toFixed(2),
                                    'two': average2.toFixed(2),
                                    'six': average3.toFixed(2)
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})

router.get('/humidity/average', function(req, res){
    let sql1 = 'select Value from Humidity order by SensorID DESC limit 0, 6';
    let sql2 = 'select Value from Humidity order by SensorID DESC limit 0, 12';
    let sql3 = 'select Value from Humidity order by SensorID DESC limit 0, 36';
    let average = 0;

    connection.query(sql1, function(err, result1){
        if (err){
            res.status(500).json ({
                'code': 500,
                'message': 'DB select Error from Humidity table-one'
            })
        }
        else{
            for (let i =0; i < 6; i++){
                average += result1[0].Value;
            }
            let average1 = average/6;
            connection.query(sql2, function(err, result2){
                if (err){
                    res.status(500).json ({
                        'code': 500,
                        'message': 'DB select Error from Humidity table-two'
                    })
                }
                else{
                    average = 0;
                    for (let i =0; i < 6; i++){
                        average += result2[0].Value;
                    }
                    let average2 = average/12;
                    connection.query(sql3, function(err, result3){
                        if (err){
                            res.status(500).json ({
                                'code': 500,
                                'message': 'DB select Error from Humidity table-six'
                            })
                        }
                        else{
                            average = 0;
                            for (let i =0; i < 6; i++){
                                average += result1[0].Value;
                            }
                            let average3 = average/36;
                            res.status(200).json ({
                                'code': 200,
                                'average': {
                                    'one': average1.toFixed(2),
                                    'two': average2.toFixed(2),
                                    'six': average3.toFixed(2)
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})



module.exports = router;