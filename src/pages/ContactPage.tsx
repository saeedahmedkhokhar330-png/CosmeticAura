import { CheckCircle2, Mail, MapPin, Phone } from 'lucide-react';
import { FormEvent, useState } from 'react';

export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-10 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-5 space-y-6">
          <div>
            <p className="text-xs font-medium tracking-wider text-[#b9305c] mb-3">Get in Touch</p>
            <h1 className="font-display text-4xl font-semibold text-[#2b1e24] text-balance">
              We are here to help you find your shade.
            </h1>
            <p className="text-sm sm:text-base text-[#614b54] mt-3 leading-relaxed">
              Questions about skin suitability, order tracking, or gifting? Send a quick note to
              our studio team.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            <div className="neu-surface rounded-2xl p-4 flex items-center gap-4">
              <div className="neu-btn w-10 h-10 rounded-xl flex items-center justify-center text-[#c63664] shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-[#876b76]">Email</p>
                <p className="text-sm font-semibold text-[#2b1e24]">care@auracosmetics.studio</p>
              </div>
            </div>

            <div className="neu-surface rounded-2xl p-4 flex items-center gap-4">
              <div className="neu-btn w-10 h-10 rounded-xl flex items-center justify-center text-[#c63664] shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-[#876b76]">Concierge</p>
                <p className="text-sm font-semibold text-[#2b1e24] tabular-nums">+1 (415) 890-2410</p>
              </div>
            </div>

            <div className="neu-surface rounded-2xl p-4 flex items-center gap-4">
              <div className="neu-btn w-10 h-10 rounded-xl flex items-center justify-center text-[#c63664] shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-[#876b76]">Studio Hours</p>
                <p className="text-sm font-semibold text-[#2b1e24]">Mon – Sat, 9:00 AM – 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 neu-surface rounded-[2rem] p-7 sm:p-10">
          {submitted ? (
            <div className="py-10 text-center space-y-4">
              <div className="neu-btn w-14 h-14 rounded-full flex items-center justify-center mx-auto text-[#c63664]">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-[#2b1e24]">
                Message Received
              </h2>
              <p className="text-sm text-[#614b54] max-w-sm mx-auto">
                Thank you, {name}. Our beauty specialist will reply to {email} within one business
                day.
              </p>
              <button
                type="button"
                onClick={() => {
                  setName('');
                  setEmail('');
                  setMessage('');
                  setSubmitted(false);
                }}
                className="neu-pink-gradient px-6 py-3 rounded-full text-sm font-semibold cursor-pointer"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h2 className="font-display text-2xl font-semibold text-[#2b1e24]">
                Send a Message
              </h2>

              <div>
                <label htmlFor="contact-name" className="block text-xs font-semibold text-[#5e4952] mb-2">
                  Full Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ayesha Khan"
                  className="w-full neu-inset rounded-2xl px-4 py-3 text-sm text-[#2b1e24] placeholder:text-[#876b76] focus:outline-none focus:ring-2 focus:ring-[#c63664]"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-semibold text-[#5e4952] mb-2">
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full neu-inset rounded-2xl px-4 py-3 text-sm text-[#2b1e24] placeholder:text-[#876b76] focus:outline-none focus:ring-2 focus:ring-[#c63664]"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-semibold text-[#5e4952] mb-2">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help with your skincare or shade choice?"
                  className="w-full neu-inset rounded-2xl px-4 py-3 text-sm text-[#2b1e24] placeholder:text-[#876b76] focus:outline-none focus:ring-2 focus:ring-[#c63664] resize-none"
                />
              </div>

              <button
                type="submit"
                className="neu-pink-gradient px-8 py-3.5 rounded-full text-sm font-semibold cursor-pointer"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
