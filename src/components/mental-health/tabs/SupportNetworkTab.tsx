import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink, MessageSquare, Phone, PhoneCall } from 'lucide-react';

const quickContacts = [
  {
    name: 'Samaritans',
    phone: '116123',
    displayPhone: '116 123',
    availability: '24/7, 365 days',
    description: 'Free confidential listening support at any hour.',
    icon: PhoneCall,
    href: 'tel:116123',
  },
  {
    name: 'Shout',
    phone: '85258',
    displayPhone: 'Text SHOUT to 85258',
    availability: '24/7 text support',
    description: 'Text-based support if talking feels harder right now.',
    icon: MessageSquare,
    href: 'sms:85258?body=SHOUT',
  },
  {
    name: 'NHS 111',
    phone: '111',
    displayPhone: '111 (Option 2)',
    availability: '24/7 mental health',
    description: 'Urgent mental health advice and local NHS signposting.',
    icon: Phone,
    href: 'tel:111',
  },
];

const industryContacts = [
  {
    name: 'Electrical Industries Charity',
    phone: '01895 823 726',
    href: 'tel:01895823726',
    description: 'Support for electrical workers and families, including financial and emotional help.',
  },
  {
    name: 'Mates in Mind',
    phone: '0203 510 5960',
    href: 'tel:02035105960',
    description: 'Trade-focused mental health support across construction and related industries.',
  },
  {
    name: 'Lighthouse Charity',
    phone: '0345 605 1956',
    href: 'tel:03456051956',
    description: '24/7 help for construction workers and their families.',
  },
];

const onlineResources = [
  {
    name: 'NHS Talking Therapies',
    url: 'https://www.nhs.uk/mental-health/talking-therapies-medicine-treatments/talking-therapies-and-counselling/',
    description: 'Free psychological therapies through the NHS.',
  },
  {
    name: "Andy's Man Club",
    url: 'https://andysmanclub.co.uk',
    description: 'Free weekly peer support groups for men.',
  },
  {
    name: 'CALM',
    url: 'https://www.thecalmzone.net',
    description: 'Support for anyone feeling overwhelmed or in crisis.',
  },
  {
    name: 'Hub of Hope',
    url: 'https://hubofhope.co.uk',
    description: 'Search local mental health services near you.',
  },
  {
    name: 'Mental Health Mates',
    url: 'https://mentalhealthmates.co.uk',
    description: 'Peer support walks and communities.',
  },
];

const SupportNetworkTab = () => {
  return (
    <div className="space-y-6">
      <div className="border-t border-white/10 pt-5">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
          Support Network
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Talk to someone, today.</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-white/72">
          This is the place for real support options, not more admin. Start with the fastest way to
          talk, then use trade-specific or longer-term help if that fits better.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {quickContacts.map((contact) => {
          const Icon = contact.icon;
          return (
            <a key={contact.name} href={contact.href} className="block">
              <div className="flex h-full flex-col border-t border-white/10 pt-5 transition-colors hover:opacity-100">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-sm text-white/55">{contact.availability}</p>
                  <h3 className="mt-1 text-lg font-semibold text-white">{contact.name}</h3>
                  <p className="mt-1 text-base font-medium text-elec-yellow">{contact.displayPhone}</p>
                  <p className="mt-3 text-sm leading-6 text-white/72">{contact.description}</p>
              </div>
            </a>
          );
        })}
      </div>

      <section className="border-t border-amber-500/20 pt-5">
        <h3 className="text-xl font-medium text-white">Built for the trade</h3>
        <div className="mt-4 space-y-3">
          {industryContacts.map((contact) => (
            <div
              key={contact.name}
              className="flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="max-w-xl">
                <h3 className="font-medium text-white">{contact.name}</h3>
                <p className="mt-1 text-sm leading-6 text-white/72">{contact.description}</p>
              </div>
              <Button asChild variant="outline" className="border-amber-400/25 text-white hover:bg-amber-500/10">
                <a href={contact.href}>{contact.phone}</a>
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 pt-5">
        <h3 className="text-xl font-medium text-white">Keep useful links close</h3>
        <div className="mt-4 space-y-2">
          {onlineResources.map((resource) => (
            <a
              key={resource.name}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between border-b border-white/10 py-4 transition-colors hover:opacity-100"
            >
              <div className="pr-4">
                <h3 className="font-medium text-white">{resource.name}</h3>
                <p className="mt-1 text-sm leading-6 text-white/72">{resource.description}</p>
              </div>
              <ExternalLink className="h-4 w-4 shrink-0 text-white/55" />
            </a>
          ))}
        </div>
      </section>

      <div className="border-t border-red-500/20 pt-4">
        <p className="text-sm leading-6 text-white/78">
          If you feel unsafe or at immediate risk, skip this section and go straight to crisis
          support. Call <a href="tel:999" className="font-semibold text-red-300">999</a>, call{' '}
          <a href="tel:116123" className="font-semibold text-red-300">116 123</a>, or text SHOUT to{' '}
          <span className="font-semibold text-red-300">85258</span>.
        </p>
        <div className="mt-3 flex items-center gap-2 text-sm text-red-200">
          <span>Fastest route to help matters most.</span>
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};

export default SupportNetworkTab;
