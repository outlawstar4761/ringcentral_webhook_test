const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const LIVEPORT = 2290;
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// app.use(require('morgan')('combined'));

app.use(function(req, res, next) {
  res.header("Validation-Token",req.headers['validation-token']);
  next();
});


function _parseRequest(req,res,next){
  console.log(req.body);
  // console.log(req.body.body.parties); an array. Each element if an object with a missedCall Property
  res.send(req.body);
}
function _returnHeaders(req,res,next){
  res.send(req.headers)
}

app.post('/',_parseRequest);
app.get('/',_returnHeaders);


app.listen(LIVEPORT,()=>{
  console.log('Listening on port: ' + LIVEPORT);
});
