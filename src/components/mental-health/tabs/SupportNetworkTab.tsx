import {
  PageHero,
  SectionHeader,
  ListCard,
  ListRow,
  Pill,
} from '@/components/college/primitives';

const PHONE_PRIMARY =
  'inline-flex items-center gap-1.5 h-11 px-4 rounded-full bg-elec-yellow/15 text-elec-yellow border border-elec-yellow/25 text-[13px] font-semibold touch-manipulation';
const PHONE_SECONDARY =
  'inline-flex items-center gap-1.5 h-11 px-4 rounded-full bg-white/[0.06] text-white border border-white/[0.1] text-[13px] font-semibold touch-manipulation';

const quickContacts = [
  {
    name: 'Samaritans',
    phone: '116123',
    displayPhone: '116 123',
    availability: '24/7, 365 days',
    description: 'Free confidential listening support at any hour.',
    href: 'tel:116123',
    isSms: false,
  },
  {
    name: 'Shout',
    phone: '85258',
    displayPhone: 'Text 85258',
    availability: '24/7 text support',
    description: 'Text-based support if talking feels harder right now.',
    href: 'sms:85258?body=SHOUT',
    isSms: true,
  },
  {
    name: 'NHS 111',
    phone: '111',
    displayPhone: '111 (Option 2)',
    availability: '24/7 mental health',
    description: 'Urgent mental health advice and local NHS signposting.',
    href: 'tel:111',
    isSms: false,
  },
];

const industryContacts = [
  {
    name: 'Electrical Industries Charity',
    phone: '01895 823 726',
    href: 'tel:01895823726',
    description:
      'Support for electrical workers and families, including financial and emotional help.',
  },
  {
    name: 'Mates in Mind',
    phone: '0203 510 5960',
    href: 'tel:02035105960',
    description:
      'Trade-focused mental health support across construction and related industries.',
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
    <div className="space-y-8 sm:space-y-10">
      <PageHero
        eyebrow="Support network"
        title="Talk to someone, today."
        description="This is the place for real support options, not more admin. Start with the fastest way to talk, then use trade-specific or longer-term help if that fits better."
        tone="emerald"
      />

      <div className="space-y-3">
        <SectionHeader eyebrow="Fastest help" title="Talk now" />
        <ListCard>
          {quickContacts.map((c) => (
            <ListRow
              key={c.name}
              accent="emerald"
              title={c.name}
              subtitle={`${c.availability} · ${c.description}`}
              trailing={
                <a
                  href={c.href}
                  className={PHONE_PRIMARY}
                  aria-label={`${c.isSms ? 'Text' : 'Call'} ${c.name}`}
                >
                  {c.displayPhone}
                </a>
              }
            />
          ))}
        </ListCard>
      </div>

      <div className="space-y-3">
        <SectionHeader eyebrow="Trade-focused" title="Built for the trade" />
        <ListCard>
          {industryContacts.map((c) => (
            <ListRow
              key={c.name}
              accent="amber"
              title={c.name}
              subtitle={c.description}
              trailing={
                <a href={c.href} className={PHONE_SECONDARY} aria-label={`Call ${c.name}`}>
                  {c.phone}
                </a>
              }
            />
          ))}
        </ListCard>
      </div>

      <div className="space-y-3">
        <SectionHeader eyebrow="Online" title="Keep useful links close" />
        <ListCard>
          {onlineResources.map((r) => (
            <ListRow
              key={r.name}
              accent="cyan"
              title={r.name}
              subtitle={r.description}
              trailing={<Pill tone="cyan">Open</Pill>}
              onClick={() => window.open(r.url, '_blank', 'noopener,noreferrer')}
            />
          ))}
        </ListCard>
      </div>

      <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <Pill tone="red">Crisis</Pill>
          <p className="text-[13px] text-white leading-relaxed">
            If you feel unsafe or at immediate risk, skip this section and go straight to crisis
            support. Call{' '}
            <a href="tel:999" className="font-semibold text-red-400">
              999
            </a>
            , call{' '}
            <a href="tel:116123" className="font-semibold text-red-400">
              116 123
            </a>
            , or text SHOUT to{' '}
            <span className="font-semibold text-red-400">85258</span>. Fastest route to help matters
            most.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SupportNetworkTab;
