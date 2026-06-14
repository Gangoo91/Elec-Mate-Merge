import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Phone, ExternalLink } from 'lucide-react';
import { PageFrame, PageHero, itemVariants } from '@/components/college/primitives';

interface Helpline {
  name: string;
  number: string;
  description: string;
  hours: string;
}

const helplines: Helpline[] = [
  {
    name: 'ACAS (Advisory, Conciliation and Arbitration Service)',
    number: '0300 123 1100',
    description:
      'Free, impartial advice on workplace rights, pay disputes, dismissal, and discrimination. Confidential.',
    hours: 'Mon-Fri 8am-6pm',
  },
  {
    name: 'National Apprenticeship Helpline',
    number: '0800 015 0600',
    description:
      'Government helpline for apprenticeship-specific queries — training issues, employer problems, funding questions. Check gov.uk for the current apprenticeship support contact.',
    hours: 'Mon-Fri 8am-8pm',
  },
  {
    name: 'Citizens Advice',
    number: '0800 144 8848',
    description:
      'Free advice on employment law, benefits, debt, housing, and legal issues. Available in English and Welsh.',
    hours: 'Mon-Fri 9am-5pm',
  },
  {
    name: 'Health and Safety Executive (HSE)',
    number: '0300 003 1747',
    description:
      'Report unsafe working conditions or accidents. Your employer cannot punish you for reporting safety concerns.',
    hours: 'Mon-Fri 8:30am-5pm',
  },
  {
    name: 'HMRC (Pay & Tax Queries)',
    number: '0300 200 3300',
    description:
      'Report National Minimum Wage underpayment, tax code problems, or missing tax/NI contributions. HMRC enforces NMW arrears, including back-pay.',
    hours: 'Mon-Fri 8am-6pm',
  },
];

const mentalHealthLines: Helpline[] = [
  {
    name: 'Samaritans',
    number: '116 123',
    description:
      'Free, confidential emotional support 24 hours a day. You do not have to be suicidal to call.',
    hours: '24/7',
  },
  {
    name: 'Mind Infoline',
    number: '0300 123 3393',
    description:
      'Mental health information and support. Can help you find local services and understand your options. Check mind.org.uk for current opening hours.',
    hours: 'Mon-Fri 9am-6pm',
  },
  {
    name: 'Electrical Industries Charity',
    number: '0800 652 1618',
    description:
      'Support specifically for people in the electrical industry — financial hardship, mental health, career guidance.',
    hours: 'Mon-Fri 9am-5pm',
  },
];

const SupportPage = () => {
  const navigate = useNavigate();
  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <button
          onClick={() => navigate('/apprentice/rights-and-pay')}
          className="inline-flex items-center gap-2 h-11 -ml-2 px-2 rounded-md text-[12px] uppercase tracking-[0.18em] text-white/55 hover:text-white/85 transition-colors touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · Support"
          title="Support & helplines"
          description="Free, confidential help — your employer is never told you've called. Save these numbers now. You'll never know when you or a colleague needs them."
          tone="yellow"
        />
      </motion.div>

      {/* Workplace & Rights Helplines */}
      <div className="space-y-2">
        <div className="flex items-baseline justify-between gap-3 pb-1">
          <div className="space-y-1 min-w-0">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Workplace & Rights
            </span>
          </div>
        </div>

        {helplines.map((line) => (
          <div
            key={line.name}
            className="border-0 bg-transparent sm:rounded-xl sm:border sm:border-white/[0.06] sm:bg-[hsl(0_0%_10%)]"
          >
            <div className="py-4 sm:p-5 space-y-2">
              <h3 className="font-semibold text-sm text-white">{line.name}</h3>
              <a
                href={`tel:${line.number.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 touch-manipulation min-h-[44px]"
              >
                <Phone className="h-4 w-4 text-white" />
                <span className="text-white font-bold text-sm">{line.number}</span>
                <ExternalLink className="h-3 w-3 text-white" />
              </a>
              <p className="text-white text-xs leading-relaxed">{line.description}</p>
              <p className="text-white text-xs">{line.hours}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mental Health */}
      <div className="space-y-2">
        <div className="flex items-baseline justify-between gap-3 pb-1">
          <div className="space-y-1 min-w-0">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Mental Health & Wellbeing
            </span>
          </div>
        </div>

        {mentalHealthLines.map((line) => (
          <div
            key={line.name}
            className="border-0 bg-transparent sm:rounded-xl sm:border sm:border-white/[0.06] sm:bg-[hsl(0_0%_10%)]"
          >
            <div className="py-4 sm:p-5 space-y-2">
              <h3 className="font-semibold text-sm text-white">{line.name}</h3>
              <a
                href={`tel:${line.number.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 touch-manipulation min-h-[44px]"
              >
                <Phone className="h-4 w-4 text-white" />
                <span className="text-white font-bold text-sm">{line.number}</span>
                <ExternalLink className="h-3 w-3 text-white" />
              </a>
              <p className="text-white text-xs leading-relaxed">{line.description}</p>
              <p className="text-white text-xs">{line.hours}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Emergency */}
      <div className="border-0 bg-transparent sm:rounded-xl sm:border sm:border-red-500/25 sm:bg-red-500/[0.04]">
        <div className="py-4 sm:p-5 space-y-3">
          <h3 className="text-red-400 font-bold text-sm">In Immediate Danger?</h3>
          <a
            href="tel:999"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-red-500/20 border border-red-500/30 touch-manipulation min-h-[44px]"
          >
            <Phone className="h-5 w-5 text-red-400" />
            <span className="text-red-400 font-bold text-lg">Call 999</span>
          </a>
          <p className="text-white text-xs">
            For electrical accidents, serious injuries, or any situation where someone is in
            immediate danger. Always call 999 first, then notify your supervisor.
          </p>
        </div>
      </div>
    </PageFrame>
  );
};

export default SupportPage;
