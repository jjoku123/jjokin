const http = require('http');
const fs = require('fs');
var request = require('request');
//for os uptime
const os = require('os');
const { disconnect } = require('process');
//diskpace
const exec = require('child_process').exec;


const port  = 8000;



var server = http.createServer(function (req, res){
 
  if(req.method === "GET")
  {
    
   var body ="";
    //Create and save status message
    getMessage(function(fullmessage){
      
      saveFile(fullmessage);

      body = fullmessage;

    });

  req.on("data", chunk => {
      
    });
    
  req.on("end",function(){
      res.writeHead(200,{"Content-type": "text/plain"});
      res.end(body);
     });
    
    }
})

server.listen(port, () => {
  
}); 


//Functions

function uptime(){
  var time;
  time = os.uptime();
  return time;
}


function sendDataToStorage(postData) {
  var Options = {
        uri: 'http://storage:8080/log',
        body: postData,
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        }
    }
    request(Options, function (error, response) {
        console.log(error,response.body);
        return;
    });
}


function getMessage(callback) {
  
  fs.statfs('/', (err,stats) => {
    
  var freespace = '';
    if(err){
      console.log('Error', err);
      return;
    }
    
    freespace = stats.ffree/100;
    var fullmessage ='';
    
    fullmessage = "Timestamp2: uptime " + uptime()/3600 + " hours, free disk in root: "
    + freespace + " Mbytes";
   
    callback(fullmessage);
   });
  }


function saveFile(msg){
   
   sendDataToStorage(msg);

   fs.writeFile("/app/vStorage", msg + "\r\n", {flag: 'a+'}, function(err){
          if(err) {
            return console.log(err);
        }
      });
    
  }

 
