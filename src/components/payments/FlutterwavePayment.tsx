"use client";

import { useState } from "react";
import Script from "next/script";

interface FlutterwavePaymentProps {
  amount: number;
  email: string;
  name: string;
  onSuccess: (reference: string) => void;
  onClose: () => void;
}

export default function FlutterwavePayment({
  amount,
  email,
  name,
  onSuccess,
  onClose,
}: FlutterwavePaymentProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    if (typeof (window as any).FlutterwaveCheckout !== 'function') {
      alert("Flutterwave is still loading. Please try again in a moment.");
      return;
    }

    setLoading(true);

    const publicKey = process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY;

    if (!publicKey) {
      alert("Flutterwave Public Key is missing. Please check your environment variables.");
      setLoading(false);
      return;
    }

    (window as any).FlutterwaveCheckout({
      public_key: publicKey,
      tx_ref: "GR-" + Date.now(),
      amount: amount,
      currency: "ZMW",
      payment_options: "card, mobilemoneyzambia",
      customer: {
        email: email,
        name: name,
      },
      customizations: {
        title: "GospelRetunes Premium",
        description: "Payment for Premium Subscription",
        logo: "https://gospelretunes.com/logo.png", // Replace with your actual logo URL if available on production domain
      },
      callback: (data: any) => {
        console.log("Payment successful", data);
        onSuccess(data.transaction_id);
      },
      onclose: () => {
        setLoading(false);
        onClose();
      },
    });
  };

  return (
    <>
      <Script 
        src="https://checkout.flutterwave.com/v3.js" 
        strategy="lazyOnload"
      />
      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full py-3 rounded-full font-bold bg-[#d4a017] text-black shadow-lg shadow-[#d4a017]/20 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Processing..." : "Get Premium"}
      </button>
    </>
  );
}
