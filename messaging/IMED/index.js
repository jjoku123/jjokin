const amqp = require("amqplib");

const msg = {file: "compse140.i"}
connect();

async function connect()
{
    try
    {
      const connection = await amqp.connect("amqp://localhost:5672") 
      const channel = await connection.createChannel();
      const result = await channel.assertQueue("compse140.o"); 
       
      //Consumes "compse140.o" queue
      channel.consume("compse140.o", message => {
        // Sends to "compse140.i"queue
          channel.sendToQueue("compse140.i", Buffer.from(JSON.stringify(msg)))
      })
       
    }
    catch(ex)
    {
      console.error(ex)
    }
}