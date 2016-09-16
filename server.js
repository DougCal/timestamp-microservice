var path = require('path');
var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/timestmp.html'));
});

app.get('/:id', function (req, res) {
  
  var time = req.params.id;
  var obj;
  
  if(isNaN(time)){
    var unixTime = Date.parse(time)/1000;
    obj = {
      'unix': unixTime,
      'natural': time
    };
    
  }else{
    var monthNames = [ "January", "February", "March", "April", "May", "June", 
                       "July", "August", "September", "October", "November", "December" ];
    
    var date = new Date(time * 1000);
    var month = monthNames[date.getMonth()];
    var day = date.getDate();
    var year = date.getFullYear();
    
    obj = {
      'unix': time,
      'natural': month + " " + day + ", " + year
    };
  }
  
  res.send(obj);
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('LISTENING');
});