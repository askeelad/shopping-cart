import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: any, res: NextResponse) {
  let totalPrice = await req.json();
  totalPrice = totalPrice.totalPrice * 100;
  totalPrice = parseInt(totalPrice);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalPrice,
    currency: "USD",
    metadata: { numberOfItem: "" },
  });

  if (paymentIntent.client_secret == null) {
    throw Error("Stripe failed to createpayment intent");
  }
  console.log(paymentIntent.client_secret);
  return new NextResponse(JSON.stringify(paymentIntent.client_secret), {
    status: 200,
  });
}
