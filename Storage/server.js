const express = require('express');

const fs = require('fs');

const app = express();


//Sends logfile
app.get('/log', (req, res) => {

 const logfile = fs.readFile("/app/storage.log",(err,logfile)=>{
  if(err){
    res.send(404).end("File not found");
  }
  res.set("Content-Type","text/plain");
  res.send(logfile);

});
});
//Updates logfile
app.post('/log', (req, res) => {
 
  var body ="";

  req.on('data',function(chunk)
  {
    body +=chunk;
 
    fs.writeFile("/app/storage.log", body + "\r\n", {flag: 'a+'}, function(err){
          if(err) {
            return console.log(err);
          }
        });
    
  });

 res.set("Content-Type","text/plain");
 res.sendStatus(200);
});

app.listen(8080, () => {
  
}); 