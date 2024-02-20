const http = require('http');
const fs = require('fs');


var first = true;

const port = 8000;


var server = http.createServer(function (req, res) {   //  - creating server

  if(req.method === "POST")
  {
    var body ="";
    req.on('data',function(chunk)
    {
      body +=chunk;


    //Remote address and port
    var str = req.client.remoteAddress + ":" + req.client.remotePort  +" ";

    //
    if(body !="STOP")
    {
      var logmsg = body + str + "\n";
    }
    else
    {
      var logmsg = body + "\n";
    }

    //Clears log file
    if(first)
    {
      fs.writeFile("/app/logs/service2.log","",function(){

      });

      first = false;
    }
    //Writes log message
    fs.writeFile("/app/logs/service2.log", logmsg, {flag: 'a+'}, function(err){
      if(err) {
        return console.log(err);
    }

    });

    if(body == "STOP")
    {

       server.close();
    }
   });

    req.on("end",function(){
      res.writeHead(200,{"Content-type": "text/plain"});

      res.end(body);
     });
  }


});

server.listen(port);
