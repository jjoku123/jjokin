
const amqp = require("amqplib");

const msg = {file: "compse140.o"}
connect();

async function connect()
{
    try
    {
      const connection = await amqp.connect("amqp://localhost:5672") 
      const channel = await connection.createChannel();
      const result = await channel.assertQueue("compse140.o");

      var n = 0;
      // Every three seconds sends Msg_{n} three times to queue compse140.o
      while(n < 3 )
      {
         var x = n.toString();
         var mesg = "Msg_" +{x}
         console.log(mesg);
         n++;
       
         setInterval(         
          ()=> channel.sendToQueue("compse140.o", Buffer.from(JSON.stringify(mesg))),
          3 *1000
          );
      }
      
    }
    catch(ex)
    {
      console.error(ex)
    }
}

