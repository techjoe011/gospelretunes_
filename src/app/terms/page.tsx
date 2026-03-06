import Navbar from '@/components/Navbar';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0a0500] text-[#f5e6d3] african-pattern">
      <Navbar />
      <main className="pt-32 pb-20 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 gradient-text">Terms of Service</h1>
        <div className="space-y-6 text-zinc-400 leading-relaxed bg-zinc-900/30 p-8 rounded-3xl border border-white/5 backdrop-blur-sm">
          <p>
            Welcome to GospelRetunes. By accessing or using our services, you agree to comply with and be bound by the following terms.
          </p>
          <h2 className="text-2xl font-bold text-[#d4a017]">Use of Service</h2>
          <p>
            You may use our platform for personal, non-commercial purposes in accordance with these Terms.
          </p>
          <h2 className="text-2xl font-bold text-[#d4a017]">Premium Subscriptions</h2>
          <p>
            Premium features are available for a fee (currently K150/month). Payments are processed securely via Flutterwave.
          </p>
          <h2 className="text-2xl font-bold text-[#d4a017]">User Conduct</h2>
          <p>
            You agree not to use the service for any unlawful activities or in violation of intellectual property rights.
          </p>
          <p>
            Last updated: March 6, 2026
          </p>
        </div>
      </main>
    </div>
  );
}
