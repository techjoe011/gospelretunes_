import Navbar from '@/components/Navbar';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0500] text-[#f5e6d3] african-pattern">
      <Navbar />
      <main className="pt-32 pb-20 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 gradient-text">Privacy Policy</h1>
        <div className="space-y-6 text-zinc-400 leading-relaxed bg-zinc-900/30 p-8 rounded-3xl border border-white/5 backdrop-blur-sm">
          <p>
            At GospelRetunes, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.
          </p>
          <h2 className="text-2xl font-bold text-[#d4a017]">Information Collection</h2>
          <p>
            We collect information when you register on our site, log in to your account, make a purchase, or subscribe to our newsletter.
          </p>
          <h2 className="text-2xl font-bold text-[#d4a017]">How We Use Your Information</h2>
          <p>
            The information we collect may be used to personalize your experience, improve our website, and process transactions.
          </p>
          <p>
            Last updated: March 6, 2026
          </p>
        </div>
      </main>
    </div>
  );
}
