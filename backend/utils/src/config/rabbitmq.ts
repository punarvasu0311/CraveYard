import amqp from "amqplib";

let channel: amqp.Channel;

export const connectRabbitMQ = async () => {
  const connection = await amqp.connect(process.env.RABBITMQ_URL!);//Initiates TCP connection to RabbitMQ broker

  channel = await connection.createChannel();//channel is created using established connection
  // Queue Idempotency
  await channel.assertQueue(process.env.PAYMENT_QUEUE!, {// if payment queue doesnt exist create one else do nothing,this ensure payment queue is created at very beginning
    durable: true, //durable means the queue survives even broker restarts
  });

  console.log("🐇 connected To Rabbitmq");
};

export const getChannel = () => channel;
