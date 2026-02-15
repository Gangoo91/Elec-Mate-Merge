import { Card, CardContent } from '@/components/ui/card';
import { SmartBackButton } from '@/components/ui/smart-back-button';
import { Phone, ExternalLink } from 'lucide-react';

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
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Support & Helplines
        </h1>
      </div>

      {/* Intro */}
      <Card className="border-orange-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-orange-400" />
            <h2 className="text-lg font-semibold text-white">
              Free, Confidential Help
            </h2>
          </div>
          <p className="text-white text-sm leading-relaxed">
            All of these services are free and confidential. Your employer will not
            be told you have called. Seeking help is a sign of strength, not weakness.
            Save these numbers in your phone — you never know when you or a colleague
            might need them.
          </p>
        </CardContent>
      </Card>

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
    </div>
  );
};

export default SupportPage;
