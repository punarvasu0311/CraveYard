import { getChannel } from "./rabbitmq.js";

export const publishPaymentSuccess = async (payload: {
  orderId: string;
  paymentId: string;
  provider: "razorpay" | "stripe";
}) => {
  const channel = getChannel();

  channel.sendToQueue(
    process.env.PAYMENT_QUEUE!, //it tells the queue to which this message should be sent
    Buffer.from(
      JSON.stringify({
        type: "PAYMENT_SUCCESS",
        data: payload,
      })
    ),
    { persistent: true } // it tells to store message in disk so that even rabbitmq crashes before consumer takes it,message wont be lost
  );
};
