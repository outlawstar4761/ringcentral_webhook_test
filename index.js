const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const LIVEPORT = 2290;
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// app.use(require('morgan')('combined'));


function _parseRequest(req,res,next){
  console.log(req.body);
  res.send(req.body);
}

app.post('/',_parseRequest);


app.listen(LIVEPORT,()=>{
  console.log('Listening on port: ' + LIVEPORT);
});
