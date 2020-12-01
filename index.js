const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const LIVEPORT = 2290;
const AUTH_TOKEN = '1234';

//'jlivingston@ensafe.com'

const emailData = {
  to:['jjwatson@ensafe.com'],
  subject:'Telephony Event Notification',
  msg_name:'ringcentral_api_event',
  body:'Generated with node'
};
const _buildEmailBody(data){
  return `
  <h4>A Telephony Disconnect Event has occured</h4>
  <b>To</b>
  <pre>${data.parties[0].to}</pre>
  <b>From</b>
  <pre>${data.parties[0].from}</pre>
  `;
}


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
axios.defaults.headers.common['auth_token'] = AUTH_TOKEN;
// app.use(require('morgan')('combined'));

app.use(function(req, res, next) {
  res.header("Validation-Token",req.headers['validation-token']);
  next();
});


function _parseRequest(req,res,next){
  console.log(req.body.body);
  if(req.body.body.parties[0].status.code === 'Disconnected'){
      emailData.body = _buildEmailBody(req.body.body);
      _emailResults(emailData);
  }
  // req.body.body.parties[0].
  // console.log(req.body.body.parties); an array. Each element if an object with a missedCall Property
  res.send(req.body);
}
function _returnHeaders(req,res,next){
  res.send(req.headers)
}
function _emailResults(body){
  axios.post('https://api.outlawdesigns.io:9667/send',body).then((r)=>{
    console.log(r.data);
  }).catch(console.error);
}

app.post('/',_parseRequest);
app.get('/',_returnHeaders);


app.listen(LIVEPORT,()=>{
  console.log('Listening on port: ' + LIVEPORT);
});
