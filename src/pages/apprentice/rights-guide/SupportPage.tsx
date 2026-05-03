import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Phone, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';

interface Helpline {
  name: string;
  number: string;
  description: string;
  colour: string;
  border: string;
  hours: string;
}

const helplines: Helpline[] = [
  {
    name: 'ACAS (Advisory, Conciliation and Arbitration Service)',
    number: '0300 123 1100',
    description:
      'Free, impartial advice on workplace rights, pay disputes, dismissal, and discrimination. Confidential.',
    colour: 'text-blue-400',
    border: 'border-blue-500/20',
    hours: 'Mon-Fri 8am-6pm',
  },
  {
    name: 'National Apprenticeship Helpline',
    number: '0800 015 0600',
    description:
      'Government helpline for apprenticeship-specific queries — training issues, employer problems, funding questions.',
    colour: 'text-green-400',
    border: 'border-green-500/20',
    hours: 'Mon-Fri 8am-8pm',
  },
  {
    name: 'Citizens Advice',
    number: '0800 144 8848',
    description:
      'Free advice on employment law, benefits, debt, housing, and legal issues. Available in English and Welsh.',
    colour: 'text-orange-400',
    border: 'border-orange-500/20',
    hours: 'Mon-Fri 9am-5pm',
  },
  {
    name: 'Health and Safety Executive (HSE)',
    number: '0300 003 1747',
    description:
      'Report unsafe working conditions or accidents. Your employer cannot punish you for reporting safety concerns.',
    colour: 'text-red-400',
    border: 'border-red-500/20',
    hours: 'Mon-Fri 8:30am-5pm',
  },
  {
    name: 'HMRC (Pay & Tax Queries)',
    number: '0300 200 3300',
    description:
      'Report National Minimum Wage underpayment, tax code problems, or missing tax/NI contributions.',
    colour: 'text-purple-400',
    border: 'border-purple-500/20',
    hours: 'Mon-Fri 8am-6pm',
  },
];

const mentalHealthLines: Helpline[] = [
  {
    name: 'Samaritans',
    number: '116 123',
    description:
      'Free, confidential emotional support 24 hours a day. You do not have to be suicidal to call.',
    colour: 'text-green-400',
    border: 'border-green-500/20',
    hours: '24/7',
  },
  {
    name: 'Mind Infoline',
    number: '0300 123 3393',
    description:
      'Mental health information and support. Can help you find local services and understand your options.',
    colour: 'text-blue-400',
    border: 'border-blue-500/20',
    hours: 'Mon-Fri 9am-6pm',
  },
  {
    name: 'Electrical Industries Charity',
    number: '0800 652 1618',
    description:
      'Support specifically for people in the electrical industry — financial hardship, mental health, career guidance.',
    colour: 'text-elec-yellow',
    border: 'border-elec-yellow/20',
    hours: 'Mon-Fri 9am-5pm',
  },
];

const SupportPage = () => {
  const navigate = useNavigate();
  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <Button
          variant="ghost"
          onClick={() => navigate('/apprentice/rights-and-pay')}
          className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] -ml-2 h-11 touch-manipulation"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
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
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-400" />
          <h2 className="text-base font-semibold text-white">
            Workplace & Rights
          </h2>
        </div>

        {helplines.map((line) => (
          <Card key={line.name} className={`${line.border} bg-white/5`}>
            <CardContent className="p-4 space-y-2">
              <h3 className={`font-semibold text-sm ${line.colour}`}>
                {line.name}
              </h3>
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
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mental Health */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <h2 className="text-base font-semibold text-white">
            Mental Health & Wellbeing
          </h2>
        </div>

        {mentalHealthLines.map((line) => (
          <Card key={line.name} className={`${line.border} bg-white/5`}>
            <CardContent className="p-4 space-y-2">
              <h3 className={`font-semibold text-sm ${line.colour}`}>
                {line.name}
              </h3>
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
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Emergency */}
      <Card className="border-red-500/20 bg-red-500/5">
        <CardContent className="p-4 space-y-3">
          <h3 className="text-red-400 font-bold text-sm">In Immediate Danger?</h3>
          <a
            href="tel:999"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-red-500/20 border border-red-500/30 touch-manipulation min-h-[44px]"
          >
            <Phone className="h-5 w-5 text-red-400" />
            <span className="text-red-400 font-bold text-lg">Call 999</span>
          </a>
          <p className="text-white text-xs">
            For electrical accidents, serious injuries, or any situation where someone
            is in immediate danger. Always call 999 first, then notify your supervisor.
          </p>
        </CardContent>
      </Card>
    </PageFrame>
  );
};

export default SupportPage;
