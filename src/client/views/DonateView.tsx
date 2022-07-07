import * as React from "react";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

const DonateView = () => {
  const nav = useNavigate();
  // hook into our conntected client-end stripe context provider
  // which we'll use to tokenize a person's card
  const stripe = useStripe();

  // hook into the individual element or elements they give us for CC info
  const elements = useElements();

  const [amount, setAmount] = React.useState<number>(0);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // if our hooks failed to consume a provider's context
    // we should prolly not run any of this function
    if (!stripe || !elements || amount <= 0 || amount > 999999) {
      alert("Please enter a valid value amount between 0 and 999999");

      return;
    }

    // get the card's sensitive information safely from the Stripe context
    const cardElement = elements.getElement(CardElement);

    // use the cardElement data to create a payment method with their card
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement!,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      // POST the created payment method to our own endpoint
      const res = await fetch("/api/Donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, paymentMethod: paymentMethod }),
      });
      const successfulPayment = await res.json();
      console.log(successfulPayment);
      nav(`/Blogs`);
    }
  };

  return (
    <div className="border border-primary border-2 p-2 m-2" style={{ backgroundColor: `#F5F5DC` }}>
      <form>
        <div>Donation Amount</div>
        <input className="form-control my-2" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
        <CardElement />
        <button onClick={handleSubmit} className="btn btn-primary mt-2">
          Donate to Me! So I Can Make More Blogs
        </button>
      </form>
    </div>
  );
};

export default DonateView;
