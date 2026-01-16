import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, Sparkles, Building2, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface PricingTier {
  name: string;
  icon: React.ReactNode;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
  gradient: string;
  buttonClass: string;
  disabled?: boolean;
}

const tiers: PricingTier[] = [
  {
    name: 'Apprentice',
    icon: <GraduationCap className="w-5 h-5" />,
    price: '£4.99',
    period: '/month',
    description: 'Everything you need to pass your exams.',
    features: [
      'Level 2 & 3 courses',
      '6,800+ practice questions',
      'AM2 exam preparation',
      'Progress tracking',
      'Mental Health Hub',
      'Elec-ID credential',
    ],
    cta: 'Start Free Trial',
    gradient: 'from-blue-500/10 to-blue-600/5',
    buttonClass: 'bg-blue-500 hover:bg-blue-400 text-white',
  },
  {
    name: 'Electrician',
    icon: <Sparkles className="w-5 h-5" />,
    price: '£9.99',
    period: '/month',
    description: 'Everything for professional electrical work.',
    features: [
      'Everything in Apprentice',
      'Inspection Suite (EICR, EIC)',
      'All 8 AI Agents',
      'Voice quotes in 2 mins',
      '50+ calculators',
      'AI Board Scanner',
    ],
    cta: 'Start Free Trial',
    popular: true,
    gradient: 'from-yellow-500/15 to-amber-500/5',
    buttonClass: 'bg-yellow-500 hover:bg-yellow-400 text-black',
  },
  {
    name: 'Employer',
    icon: <Building2 className="w-5 h-5" />,
    price: '£29.99',
    period: '/month',
    description: 'Manage your team and grow your business.',
    features: [
      'Everything in Electrician',
      'Team management (20)',
      'Job allocation & tracking',
      'Team analytics',
      'Apprentice progress',
      'Company branding',
    ],
    cta: 'Coming Soon',
    gradient: 'from-purple-500/10 to-purple-600/5',
    buttonClass: 'bg-purple-500/50 text-white/70 cursor-not-allowed',
    disabled: true,
  },
];

export const PricingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="w-full py-12 sm:py-20 bg-black">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Simple, Transparent Pricing
          </h2>
          <p className="text-white/50 max-w-lg mx-auto text-sm sm:text-base">
            All plans include a 7-day free trial. No card required.
          </p>
        </motion.div>

        {/* Mobile: Horizontal scroll, Desktop: Grid */}
        <div className="sm:hidden -mx-5 px-5">
          <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
            {tiers.map((tier) => (
              <div key={tier.name} className="snap-start flex-shrink-0 w-[280px]">
                <PricingCard tier={tier} />
              </div>
            ))}
          </div>
          <p className="text-center text-white/30 text-[10px] mt-3 uppercase tracking-wider">Swipe for more</p>
        </div>

        <motion.div
          className="hidden sm:grid sm:grid-cols-3 gap-4 lg:gap-6"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {tiers.map((tier) => (
            <PricingCard key={tier.name} tier={tier} />
          ))}
        </motion.div>

        {/* Trust note */}
        <motion.p
          className="text-center text-white/30 text-xs mt-6 sm:mt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          Cancel anytime. Prices exclude VAT.
        </motion.p>
      </div>
    </section>
  );
};

const PricingCard = ({ tier }: { tier: PricingTier }) => (
  <div
    className={`relative rounded-xl p-5 sm:p-6 bg-gradient-to-br ${tier.gradient} border ${
      tier.popular ? 'border-yellow-500/30' : 'border-white/[0.06]'
    } h-full flex flex-col`}
  >
    {tier.popular && (
      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-yellow-500 text-black text-[10px] sm:text-xs font-semibold">
        Most Popular
      </div>
    )}

    <div className="flex items-center gap-2.5 mb-3">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
        tier.popular ? 'bg-yellow-500/20 text-yellow-400' : 'bg-white/10 text-white'
      }`}>
        {tier.icon}
      </div>
      <h3 className="text-lg font-bold text-white">{tier.name}</h3>
    </div>

    <div className="mb-3">
      <span className="text-3xl sm:text-4xl font-bold text-white">{tier.price}</span>
      <span className="text-white/40 text-sm">{tier.period}</span>
    </div>

    <p className="text-white/50 text-sm mb-4">{tier.description}</p>

    <Link to={tier.disabled ? '#' : '/auth/signup'} className="block mb-4">
      <Button
        size="lg"
        className={`w-full h-12 sm:h-14 font-semibold touch-manipulation ${tier.buttonClass}`}
        disabled={tier.disabled}
      >
        {tier.cta}
      </Button>
    </Link>

    <div className="space-y-2.5 mt-auto">
      {tier.features.map((feature, featureIndex) => (
        <div key={featureIndex} className="flex items-start gap-2.5">
          <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
            tier.popular ? 'text-yellow-400/80' : 'text-green-400/80'
          }`} />
          <span className="text-xs sm:text-sm text-white/60">{feature}</span>
        </div>
      ))}
    </div>
  </div>
);
