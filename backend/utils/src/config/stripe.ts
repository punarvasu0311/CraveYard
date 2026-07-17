import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// https://docs.stripe.com/api/checkout/sessions (for full stripe docs)