import Stripe from "stripe";
import CheckoutForm from "./_components/CheckoutForm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const PaymentIntent = async () => {
  let totalPrice = 111;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 111,
    currency: "USD",
    metadata: { numberOfItem: "" },
  });

  if (paymentIntent.client_secret == null) {
    throw Error("Stripe failed to createpayment intent");
  }
  return (
    <CheckoutForm clientSecret={paymentIntent.client_secret} totalPrice={111} />
  );
};

export default PaymentIntent;
