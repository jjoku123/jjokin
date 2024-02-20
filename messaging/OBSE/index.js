const amqp = require("amqplib");


connect();

async function connect()
{
    try
    {
      const connection = await amqp.connect("amqp://localhost:5672") 
      const channel = await connection.createChannel();
      const result1 = await channel.assertQueue("compse140.o");
      
      //Consumes "compse140.o" queue from rabbitmq
      channel.consume("compse140.o", message => {
          
          const input = JSON.parse(message.content.toString());
      })
      console.log("waiting for messages compse140.o");

      //Consumes "compse140.i" queue 
      const result2 = await channel.assertQueue("compse140.i");
      channel.consume("compse140.i", message => {
        
        const input = JSON.parse(message.content.toString());
    })
    console.log("waiting for messages compse140.i");
      
    }
    catch(ex)
    {
      console.error(ex)
    }
}
