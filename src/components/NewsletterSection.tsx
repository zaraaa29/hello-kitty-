import React, { useState } from 'react';
import { Check, Mail } from 'lucide-react';
import { RibbonBowIcon } from './DecorMotifs';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    setStatus('success');
    setErrorMsg('');
    setEmail('');
  };

  return (
    <section className="py-12 sm:py-16 bg-[#FFF9F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#FCE4EC]/65 border border-[#F8C8DC] px-6 py-12 sm:px-12 sm:py-14 text-center">
          <div className="max-w-xl mx-auto">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#FFF9F7] border border-[#F8C8DC] text-[#E63950] mb-4">
              <RibbonBowIcon className="w-5 h-4" />
            </div>

            <h2 className="font-display text-2xl sm:text-4xl font-semibold text-[#2B1920] mb-3 text-balance">
              Join the Hello Kitty Club!
            </h2>

            <p className="text-sm sm:text-base text-[#5C434B] leading-relaxed mb-7">
              Early access to limited-edition Sanrio drops, sweet restock alerts, and an instant 10% welcome gift on your first order.
            </p>

            {status === 'success' ? (
              <div className="inline-flex flex-col sm:flex-row items-center gap-2.5 bg-[#FFF9F7] border border-[#F8C8DC] rounded-2xl px-6 py-4 text-sm text-[#2B1920]">
                <Check className="w-4 h-4 text-[#E63950] shrink-0" />
                <span>
                  Welcome to the club ♡ Use code{' '}
                  <strong className="font-semibold text-[#E63950]">HELLOCLUB10</strong> at checkout for 10% off.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-[#6E515B] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === 'error') setStatus('idle');
                      }}
                      placeholder="you@example.com"
                      aria-label="Email address"
                      className="w-full h-12 pl-10 pr-4 rounded-full bg-[#FFF9F7] border border-[#F8C8DC] text-sm text-[#2B1920] placeholder:text-[#6E515B]/70 focus:outline-none focus:border-[#E63950]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="h-12 px-6 rounded-full bg-[#E63950] hover:bg-[#C8253C] text-white text-sm font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Join Club
                  </button>
                </div>
                {status === 'error' && (
                  <p className="mt-2.5 text-xs font-medium text-[#C8253C]">{errorMsg}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
