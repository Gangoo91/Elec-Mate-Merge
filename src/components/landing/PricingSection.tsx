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
}

const tiers: PricingTier[] = [
  {
    name: 'Apprentice',
    icon: <GraduationCap className="w-6 h-6" />,
    price: '£4.99',
    period: '/month',
    description: 'Everything you need to pass your exams and qualify.',
    features: [
      'Level 2 & 3 courses',
      '6,800+ practice questions',
      'AM2 exam preparation',
      'Progress tracking & streaks',
      'Mental Health Hub',
      'Career progression tools',
      'Elec-ID credential',
    ],
    cta: 'Start Free Trial',
    gradient: 'from-blue-500/10 to-blue-600/5',
    buttonClass: 'bg-blue-500 hover:bg-blue-400 text-white',
  },
  {
    name: 'Electrician',
    icon: <Sparkles className="w-6 h-6" />,
    price: '£9.99',
    period: '/month',
    description: 'Everything you need for professional electrical work.',
    features: [
      'Everything in Apprentice',
      'Inspection Suite (EICR, EIC, MW)',
      'All 8 AI Agents',
      'Voice quotes & invoices in 2 mins',
      '50+ electrical calculators',
      'AI Board Scanner',
      'Fault finding codes',
      'Elec-ID credential',
    ],
    cta: 'Start Free Trial',
    popular: true,
    gradient: 'from-yellow-500/20 to-amber-500/10',
    buttonClass: 'bg-yellow-500 hover:bg-yellow-400 text-black',
  },
  {
    name: 'Employer',
    icon: <Building2 className="w-6 h-6" />,
    price: '£29.99',
    period: '/month',
    description: 'Manage your team and grow your electrical business.',
    features: [
      'Everything in Electrician',
      'Team management (up to 20)',
      'Job allocation & tracking',
      'Team performance analytics',
      'Apprentice progress monitoring',
      'Company branding on certs',
      'Elec-ID credential',
    ],
    cta: 'Coming Soon',
    gradient: 'from-purple-500/10 to-purple-600/5',
    buttonClass: 'bg-purple-500 hover:bg-purple-400 text-white',
  },
];

export const PricingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section ref={ref} className="w-full py-16 sm:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include a 7-day free trial.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              className={`relative rounded-2xl p-6 lg:p-8 bg-gradient-to-br ${tier.gradient} border ${
                tier.popular ? 'border-yellow-500/50' : 'border-white/10'
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-yellow-500 text-black text-xs font-semibold">
                  Most Popular
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  tier.popular ? 'bg-yellow-500/20 text-yellow-400' : 'bg-white/10 text-white'
                }`}>
                  {tier.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{tier.name}</h3>
              </div>

              <div className="mb-4">
                <span className="text-4xl font-bold text-white">{tier.price}</span>
                <span className="text-white/60">{tier.period}</span>
              </div>

              <p className="text-white/70 text-sm mb-6">{tier.description}</p>

              <Link to="/auth/signup" className="block mb-6">
                <Button
                  size="lg"
                  className={`w-full h-14 font-semibold touch-manipulation ${tier.buttonClass}`}
                >
                  {tier.cta}
                </Button>
              </Link>

              <div className="space-y-3">
                {tier.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 ${
                      tier.popular ? 'text-yellow-400' : 'text-green-400'
                    }`} />
                    <span className="text-sm text-white/80">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust note */}
        <motion.p
          className="text-center text-white/50 text-sm mt-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          No card required to start. Cancel anytime. Prices exclude VAT.
        </motion.p>
      </div>
    </section>
  );
};
