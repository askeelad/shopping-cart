import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const handler = async (req: NextRequest, res: NextResponse) => {
  console.log(req.body);
  let totalPrice = 111;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 11,
    currency: "USD",
    metadata: { numberOfItem: "" },
  });

  if (paymentIntent.client_secret == null) {
    throw Error("Stripe failed to createpayment intent");
  }
  return new NextResponse(paymentIntent.client_secret, { status: 400 });
};

export default handler;
