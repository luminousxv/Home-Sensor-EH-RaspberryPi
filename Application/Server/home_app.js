const express  = require('express');
const app = express();
let bodyParser = require("body-parser");

app.use(bodyParser.json({
    limit: "50mb"
}));
app.use(bodyParser.urlencoded({ 
    limit: "50mb",
    extended: true
}));

let sensorRouter = require('./home_routes/sensor');
app.use('/Home-Sensor', sensorRouter);

let averageRouter = require('./home_routes/average');
app.use('/Home-Sensor', averageRouter);

let rpiRouter = require('./home_routes/rpi');
app.use('/Home-Sensor', rpiRouter);

let dataRouter = require('./home_routes/get_data');
app.use('/Home-Sensor', dataRouter);

let server = app.listen(8080, function(){
    console.log('Server on...')
});