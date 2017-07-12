/**
 * Created by yanchao on 5/19/17.
 */
//using express with node js
var express = require('express');

//initialize app as an express application
var app = express();


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*var ipaddress = '127.0.0.1';*/

app.use(express.static(__dirname+'/public/assignment'));

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

require('./assignment/app')(app);