"use client";

import Navbar from '@/components/Navbar';
import { Check } from 'lucide-react';
import FlutterwavePayment from '@/components/payments/FlutterwavePayment';
import { useUser, SignInButton } from '@clerk/nextjs';
import { useState } from 'react';

export default function PremiumPage() {
  const { user, isSignedIn, isLoaded } = useUser();
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const plans = [
    { 
      name: 'Free', 
      price: 'K0', 
      features: ['Ad-supported streaming', 'Standard audio quality'] 
    },
    { 
      name: 'Premium', 
      price: 'K150', 
      amount: 150,
      features: ['Ad-free experience', 'High-quality audio', 'Offline playback', 'Exclusive releases'] 
    },
  ];

  const handlePaymentSuccess = (transactionId: string) => {
    console.log("Payment successful with ID:", transactionId);
    setPaymentSuccess(true);
    // In a real app, you would verify the transaction on the backend
    // and update the user's subscription status in Supabase.
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-[#0a0500] text-[#f5e6d3] pb-20 african-pattern">
        <Navbar />
        <main className="pt-32 px-4 max-w-7xl mx-auto text-center">
          <div className="bg-zinc-900/40 border border-[#d4a017]/50 p-12 rounded-3xl max-w-2xl mx-auto backdrop-blur-sm">
            <div className="w-20 h-20 bg-[#d4a017] rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-black" />
            </div>
            <h1 className="text-4xl font-bold mb-4 gradient-text">Welcome to Premium!</h1>
            <p className="text-zinc-300 text-lg mb-8">
              Your payment was successful. You now have full access to all GospelRetunes Premium features.
            </p>
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-[#d4a017] text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform"
            >
              Start Listening
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0500] text-[#f5e6d3] pb-20 african-pattern">
      <Navbar />
      <main className="pt-24 md:pt-32 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black mb-4 gradient-text uppercase tracking-tighter">Premium</h1>
          <p className="text-zinc-500 text-lg">Choose the plan that fits your spirit.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {plans.map((plan) => (
            <div key={plan.name} className="p-8 rounded-3xl bg-zinc-900/40 border border-[#d4a017]/10 hover:border-[#d4a017]/50 transition-colors backdrop-blur-sm flex flex-col">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2 text-[#f5e6d3]">{plan.name}</h2>
                <div className="text-3xl font-bold mb-6 text-[#d4a017]">
                  {plan.price}
                  <span className="text-sm text-zinc-500 font-normal">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-zinc-300">
                      <Check className="h-5 w-5 text-[#d4a017]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {plan.name === 'Premium' ? (
                isLoaded && isSignedIn ? (
                  <FlutterwavePayment 
                    amount={plan.amount!} 
                    email={user.primaryEmailAddress?.emailAddress || ""}
                    name={user.fullName || "GospelRetunes User"}
                    onSuccess={handlePaymentSuccess}
                    onClose={() => console.log("Payment closed")}
                  />
                ) : (
                  <SignInButton mode="modal">
                    <button className="w-full py-3 rounded-full font-bold bg-[#d4a017] text-black shadow-lg shadow-[#d4a017]/20 hover:scale-105 transition-all">
                      Log in to Get Premium
                    </button>
                  </SignInButton>
                )
              ) : (
                <button className="w-full py-3 rounded-full font-bold bg-white/5 border border-white/10 text-[#f5e6d3] cursor-default">
                  Current Plan
                </button>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
