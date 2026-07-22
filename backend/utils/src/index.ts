import express from "express";
import dotenv from "dotenv";
import { v2 as cloudinary } from 'cloudinary'
import cors from "cors";
import uploadRoutes from "./routes/cloudinary.js";
import { connectRabbitMQ } from "./config/rabbitmq.js";
import paymentRoutes from "./routes/payment.js";


dotenv.config()

connectRabbitMQ();

const app = express();

app.use(cors());

app.use(express.json({ limit: "50mb" })); //img string is very larges and express rejectes it,so irrespective of size it accpets 50mb only
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_SECRET_KEY } = process.env;

if (!CLOUD_NAME || !CLOUD_API_KEY || !CLOUD_SECRET_KEY) {
  throw new Error("Missing Cloudinary environment variables");
}

cloudinary.config({ 
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_SECRET_KEY,
});

app.use("/api", uploadRoutes);
app.use("/api/payment", paymentRoutes);

const PORT = process.env.PORT || 5003;

app.listen(PORT as number, "0.0.0.0", () => {
  console.log(`Utils service is running on port ${PORT}`);
});