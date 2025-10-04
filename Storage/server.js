const express = require('express');

//file serving
const fs = require('fs');

const app = express();

app.get('/log', (req, res) => {

 const logfile = fs.readFile("/app/storagex.log",(err,logfile)=>{
  if(err){
    res.send(404).end("File not found");
  }
  res.set("Content-Type","text/plain");
  res.send(logfile);

});
});

app.post('/log', (req, res) => {
 
  var body ="";

  req.on('data',function(chunk)
  {
    body +=chunk;
 
    fs.writeFile("/app/storagex.log", body, {flag: 'a+'}, function(err){
          if(err) {
            return console.log(err);
          }
        });
    
  
    console.log('Request to write in logfile arrived');
  });

 res.set("Content-Type","text/plain");
 res.send("Logfile updated");
});

app.listen(8080, () => {
  console.log('REST API server running on port 8080');
}); 