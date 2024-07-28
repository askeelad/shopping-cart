"use client";

import { formatCurrency } from "@/lib/formatters";
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { itemProps } from "@/types/cart";
import ChekoutItems from "./ChekoutItems";
import { useSelector } from "react-redux";
import { stateProps } from "@/types/cart";
import { useSearchParams } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);
const CheckoutForm = () => {
  const searchParams = useSearchParams();
  const clientSecret = searchParams.get("py") || undefined;
  const { numberOfItem, itemArray } = useSelector(
    (state: stateProps) => state.cart
  );

  let totalPrice = 0;
  itemArray.map((item: itemProps) => {
    totalPrice += item.price * item.quantity;
  });
  return (
    <>
      <div className="flex justify-center text-center text-4xl">Checkout</div>
      <div className="max-w-5xl w-full mx-auto py-5">
        {itemArray.map((item: itemProps) => (
          <ChekoutItems item={item} />
        ))}
      </div>
      <div className="max-w-5xl w-full mx-auto space-y-8">
        <Elements options={{ clientSecret }} stripe={stripePromise}>
          <Form price={totalPrice} />
        </Elements>
      </div>
    </>
  );
};

export default CheckoutForm;

function Form({ price }: { price: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [showPurchaseButton, setShowPurchaseButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState<string>();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (stripe == null || elements == null || email == null) return;

    setIsLoading(true);

    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/purchase-success`,
        },
      })
      .then(({ error }) => {
        if (error.type === "card_error" || error.type === "validation_error") {
          setErrorMessage(error.message as string);
        } else {
          setErrorMessage("An Unknown Error Occured");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        {errorMessage && <div className="text-destructive">{errorMessage}</div>}
        <PaymentElement onReady={() => setShowPurchaseButton(true)} />
        <div className="mt-4">
          <LinkAuthenticationElement
            onChange={(e) => setEmail(e.value.email)}
          />
        </div>
        {showPurchaseButton && (
          <button
            className="w-full bg-emerald-500 rounded-full mt-4"
            disabled={stripe == null || elements == null || isLoading}
          >
            {isLoading
              ? "Purchasing..."
              : `Purchase - ${formatCurrency(price)}`}
          </button>
        )}
      </div>
    </form>
  );
}
