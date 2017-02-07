/**
 * Created by JaeYoungHwang on 2017-01-11.
 */

var fs = require('fs');
var ejs = require('ejs');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var requestToServer = require('request');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('Javascript'));
app.use(express.static('CSS'));

// Connecting the oneM2M Web Tester page.
app.post('/localTestingNode', function (request, response2) {

    var resultObj = request.body;
    var requestInfoObject = resultObj['requestInfo'];
    var resourceName = requestInfoObject['tesecasestring'];

    console.log(resourceName);

    requestToServer({
        url :'http://192.168.81.133:62590/TesterNode',
        method : 'POST',
        json: true,
        body: {
            "TestCase" : resourceName
        }},function(error, response ,body) {
        console.log("Entering the original server");

        var jsonObject  = new Object( );
        jsonObject.result = response.body;
        if(error) {
            response2.status(200).send(jsonObject);
        } else {
            response2.status(200).send(jsonObject);
        }
    });
});

// Connecting the oneM2M Web Tester page.
app.get('/TitanWebTesting', function (request, response) {
    fs.readFile('TitanTestingView.ejs', 'utf-8', function (error, data) {
        response.status(200).end(ejs.render(data));
    });
});

// Server start
http.createServer(app).listen(62590, function () {
    console.log('Server running port at ' + 'http://127.0.0.1:62590');
});