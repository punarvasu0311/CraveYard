import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});
// for full docs
// https://razorpay.com/docs/partners/technology-partners/onboard-businesses/onboarding-sdk?search-string=verify%20payment%20signature#3-verify-payment-signature
