const express = require("express");
const router = express.Router();
const connection = require("../database/dbconnection");
let bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
let moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

router.post('/rpi/co2', function(req, res){
    let value = req.body.value;
    let sql1 = 'insert into CO2 (Time, Value) values (?, ?)';
    let time  = moment().format('YYYY-MM-DD HH:mm:ss');
    let params = [time, value];

    connection.query(sql1, params, function(err, result){
        if (err){
            res.status(500).json ({
                'code': 500,
                'message': 'DB insert Error from CO2 table'
            });
        }
        else{
            res.status(200).json ({
                'code': 200,
                'message': 'CO2 테이블에 insert 되었습니다.'
            });
        }
    })
})

router.post('/rpi/temperature', function(req, res){
    let value = req.body.value;
    let sql1 = 'insert into Temperature (Time, Value) values (?, ?)';
    let time  = moment().format('YYYY-MM-DD HH:mm:ss');
    let params = [time, value];

    connection.query(sql1, params, function(err, result){
        if (err){
            res.status(500).json ({
                'code': 500,
                'message': 'DB insert Error from Temperature table'
            });
        }
        else{
            res.status(200).json ({
                'code': 200,
                'message': 'CO2 테이블에 insert 되었습니다.'
            });
        }
    })
})

router.post('/rpi/humidity', function (req, res){
    let value = req.body.value;
    let sql1 = 'insert into Humidity (Time, Value) values (?, ?)';
    let time  = moment().format('YYYY-MM-DD HH:mm:ss');
    let params = [time, value];

    connection.query(sql1, params, function(err, result){
        if (err){
            res.status(500).json ({
                'code': 500,
                'message': 'DB insert Error from Humidity table'
            });
        }
        else{
            res.status(200).json ({
                'code': 200,
                'message': 'CO2 테이블에 insert 되었습니다.'
            });
        }
    })

})

module.exports = router;