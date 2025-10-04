const http = require('http');
const fs = require('fs');
var request = require('request');


//for os uptime
const os = require('os');
//diskpace
const exec = require('child_process').exec;

const port  = 8000;


var server = http.createServer(function (req, res){


 if(req.method === "GET")
  {
    var body ="";
    var discspace ="";
    discspace = getDiskSpace();

    body = "Timestamp2: uptime " + uptime()/3600 + "hours, free disk in root: "
    + discspace  + " Mbytes";

    // Send POST to Storage
    sendDataToStorage(body);

    // Write record to vStorage
    fs.writeFile("/app/vStorage.log", body, {flag: 'a+'}, function(err){
          if(err) {
            return console.log(err);
        }
      });

     req.on("data", chunk => {
      body += chunk.toString();
    });

  }

  req.on("end",function(){
      res.writeHead(200,{"Content-type": "text/plain"});
      console.log(body);
      res.end(body);
     });

})

server.listen(port, () => {
  console.log('Service2 server running on port 8000');
}); 



//Functions

function uptime(){
  var time;
  time = os.uptime();
  return time;
}


 function getDiskSpace() {

  fs.statfs('/', (err,stats) => {
    
  var freespace = '';
    if(err){
      console.log('Error', err);
      return;
    }
    console.log('Free space Service2:', stats.ffree);
    freespace = stats.ffree;

    return freespace;
   });
  
  
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