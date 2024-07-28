import Stripe from "stripe";
import CheckoutForm from "./CheckoutForm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const PaymentIntent = async ({ price }: { price: number }) => {
  let totalPrice = 111;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: price,
    currency: "USD",
    metadata: { numberOfItem: "" },
  });

  if (paymentIntent.client_secret == null) {
    throw Error("Stripe failed to createpayment intent");
  }
  return (
    <CheckoutForm
      clientSecret={paymentIntent.client_secret}
      totalPrice={price}
    />
  );
};

export default PaymentIntent;
