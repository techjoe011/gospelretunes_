import Navbar from '@/components/Navbar';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0a0500] text-[#f5e6d3] african-pattern">
      <Navbar />
      <main className="pt-32 pb-20 px-4 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-8 gradient-text">Contact Us</h1>
        <p className="text-zinc-400 mb-12 max-w-2xl mx-auto">
          Have questions or need support? We&apos;d love to hear from you. Get in touch with the GospelRetunes team through any of the channels below.
        </p>
        
        <div className="grid md:grid-cols-2 gap-12 text-left mb-20">
          <div className="bg-zinc-900/40 border border-[#d4a017]/10 p-8 rounded-3xl backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6 text-[#d4a017]">Send us a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Your Name</label>
                <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 focus:border-[#d4a017] outline-none transition-colors" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Email Address</label>
                <input type="email" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 focus:border-[#d4a017] outline-none transition-colors" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Subject</label>
                <select className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 focus:border-[#d4a017] outline-none transition-colors appearance-none">
                  <option>General Inquiry</option>
                  <option>Artist Submission</option>
                  <option>Technical Support</option>
                  <option>Business Partnership</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Message</label>
                <textarea className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2 h-32 focus:border-[#d4a017] outline-none transition-colors resize-none" placeholder="How can we help you?"></textarea>
              </div>
              <button className="w-full bg-[#d4a017] text-black font-bold py-3 rounded-full hover:scale-105 transition-transform">
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-6 text-[#d4a017]">Get in Touch</h2>
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-zinc-900/30 border border-white/5 hover:border-[#d4a017]/30 transition-colors">
              <div className="w-12 h-12 bg-[#d4a017]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="h-6 w-6 text-[#d4a017]" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Email Us</h3>
                <p className="text-zinc-500 text-sm">support@gospelretunes.com</p>
                <p className="text-zinc-500 text-sm">artists@gospelretunes.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-2xl bg-zinc-900/30 border border-white/5 hover:border-[#d4a017]/30 transition-colors">
              <div className="w-12 h-12 bg-[#d4a017]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone className="h-6 w-6 text-[#d4a017]" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Call Us</h3>
                <p className="text-zinc-500 text-sm">+260 970 000000</p>
                <p className="text-zinc-500 text-sm">Mon-Fri, 8am-5pm CAT</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-2xl bg-zinc-900/30 border border-white/5 hover:border-[#d4a017]/30 transition-colors">
              <div className="w-12 h-12 bg-[#d4a017]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="h-6 w-6 text-[#d4a017]" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Our Office</h3>
                <p className="text-zinc-500 text-sm">Lusaka, Zambia</p>
                <p className="text-zinc-500 text-sm">Main Street, Central Plaza</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
