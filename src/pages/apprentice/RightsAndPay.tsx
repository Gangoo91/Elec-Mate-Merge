import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, ChevronRight, Heart } from 'lucide-react';
import { SmartBackButton } from '@/components/ui/smart-back-button';

interface Section {
  title: string;
  slug: string;
  icon: string;
  colour: string;
  border: string;
  readTime: string;
}

const sections: Section[] = [
  {
    title: 'Wages & Pay',
    slug: 'wages',
    icon: '💷',
    colour: 'text-green-400',
    border: 'border-green-500/30',
    readTime: '8 min read',
  },
  {
    title: 'Your Rights',
    slug: 'your-rights',
    icon: '🛡',
    colour: 'text-blue-400',
    border: 'border-blue-500/30',
    readTime: '7 min read',
  },
  {
    title: 'Support & Helplines',
    slug: 'support',
    icon: '📞',
    colour: 'text-orange-400',
    border: 'border-orange-500/30',
    readTime: '6 min read',
  },
  {
    title: 'Tools & Templates',
    slug: 'tools',
    icon: '🧮',
    colour: 'text-purple-400',
    border: 'border-purple-500/30',
    readTime: '5 min read',
  },
];

const RightsAndPay = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Apprenticeship Rights & Pay
        </h1>
      </div>

      {/* Intro Card */}
      <Card className="border-elec-yellow/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-white">Know Your Rights</h2>
          <p className="text-white text-sm leading-relaxed">
            Your apprenticeship should be a positive learning experience. Understanding your
            legal rights, wage entitlements, and where to get help ensures you are treated
            fairly throughout your{' '}
            <span className="font-bold text-elec-yellow">entire apprenticeship</span>.
          </p>

          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <h3 className="text-green-400 font-semibold text-sm mb-3">Key Facts</h3>
            <ul className="space-y-2">
              {[
                'You should NEVER pay for your apprenticeship training',
                'Minimum wage: £7.55/hr (2025/26), rising to £8.00 from April 2026',
                '28 days paid holiday per year (including bank holidays)',
                'Free training, materials, and End Point Assessment',
                'Free, confidential support is always available',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-white"
                >
                  <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Section Header */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-elec-yellow" />
        <h2 className="text-base font-semibold text-white">Explore Sections</h2>
      </div>

      {/* Section Cards */}
      <div className="space-y-2">
        {sections.map((section) => (
          <button
            key={section.slug}
            onClick={() =>
              navigate(`/apprentice/rights-and-pay/${section.slug}`)
            }
            className={`w-full flex items-center gap-3 p-4 rounded-lg bg-white/5 ${section.border} border
              touch-manipulation active:scale-[0.98] transition-transform min-h-[44px] text-left`}
          >
            <span className="text-xl flex-shrink-0">{section.icon}</span>
            <div className="flex-1 min-w-0">
              <span className={`font-medium text-sm ${section.colour}`}>
                {section.title}
              </span>
              <p className="text-white text-xs mt-0.5">{section.readTime}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-white flex-shrink-0" />
          </button>
        ))}
      </div>

      {/* Footer */}
      <Card className="border-white/10 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="h-4 w-4 text-green-400" />
            <h3 className="text-sm font-semibold text-green-400">Remember</h3>
          </div>
          <p className="text-white text-xs leading-relaxed">
            Your apprenticeship should be a positive learning experience. While challenges are
            normal, exploitation, unsafe conditions, or unfair treatment are not. Do not suffer
            in silence — help is available and using it shows strength, not weakness.
          </p>
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
            <p className="text-white text-xs">
              <strong className="text-red-400">In immediate danger?</strong> Call 999. For
              non-emergency support, call ACAS on 0300 123 1100 (free, confidential).
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RightsAndPay;
