import { Button } from '@/components/ui/button';
import { Check, ChevronRight, Crown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { trackMilestone } from '@/lib/sentry';

// One-off Stripe payment link — fulfilled automatically by the
// lifetime-fulfilment poller (grants employer tier = access all areas,
// cancels any existing Stripe subscription). Web only: external payment
// links are not allowed inside the iOS/Android builds.
const LIFETIME_PAYMENT_URL = 'https://buy.stripe.com/bJe6oAf7cgLOcet0gSbjW0c';

const INCLUDED = [
  'Everything built — all 19 certificate types, quotes, invoices, AI tools and 70+ calculators',
  'Employer Hub — team, timesheets, job management, purchase orders and client CRM',
  'Study Centre — 46+ courses and 6,000+ practice questions',
  'Every new feature we ever ship, forever',
  'No renewal, no price rises, no subscription — one payment and it is yours',
];

const LifetimeCard = () => {
  const { user } = useAuth();

  const handleBuy = () => {
    trackMilestone('Lifetime Checkout Opened', { price: '499.99' });
    const url = user?.email
      ? `${LIFETIME_PAYMENT_URL}?prefilled_email=${encodeURIComponent(user.email)}`
      : LIFETIME_PAYMENT_URL;
    window.location.assign(url);
  };

  return (
    <section className="relative rounded-3xl border border-elec-yellow/35 overflow-hidden shadow-[0_0_60px_-20px_rgba(250,204,21,0.25)]">
      {/* Gold wash + top accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(250,204,21,0.10),transparent_55%)] pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-elec-yellow to-transparent" />

      <div className="relative p-5 sm:p-8">
        {/* Top row: offer left, CTA right */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12">
          <div className="flex-1 min-w-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-elec-yellow text-black text-[10px] font-bold uppercase tracking-[0.14em]">
              <Crown className="h-3 w-3 fill-current" />
              Access all areas
            </span>
            <h3 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
              Own Elec-Mate. Forever.
            </h3>
            <div className="mt-2 flex items-baseline gap-2.5 flex-wrap">
              <span className="text-5xl sm:text-6xl font-extrabold tracking-tight text-elec-yellow leading-none">
                £499.99
              </span>
              <span className="text-sm sm:text-base text-white/80 font-medium">
                one payment — never pay again
              </span>
            </div>
          </div>

          <div className="lg:w-72 flex-shrink-0">
            <Button
              onClick={handleBuy}
              className="w-full h-12 sm:h-14 text-base font-bold rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 text-black shadow-[0_16px_40px_-12px_rgba(250,204,21,0.55)] active:scale-[0.98] touch-manipulation transition-all"
            >
              Own it for life
              <ChevronRight className="ml-1.5 h-5 w-5" />
            </Button>
            <p className="mt-3 text-[11px] text-white/60 leading-relaxed text-center">
              Secure Stripe checkout. Your account upgrades automatically and any existing
              subscription is cancelled for you.
            </p>
          </div>
        </div>

        {/* What's included — two columns on desktop */}
        <div className="mt-6 pt-6 border-t border-white/[0.08] grid gap-x-10 gap-y-3 sm:grid-cols-2">
          {INCLUDED.map((feature, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div className="w-[18px] h-[18px] rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="h-3 w-3 text-elec-yellow" />
              </div>
              <span className="text-[13px] sm:text-sm text-white/90 leading-snug">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LifetimeCard;
