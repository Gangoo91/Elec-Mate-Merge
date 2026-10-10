import ExternalLinkCards from '@/components/mental-health/ExternalLinkCards';
import {
  ContactButton,
  ContactRow,
  WB_LIST,
  WellbeingIntro,
  WellbeingNote,
  WellbeingSection,
} from '@/components/mental-health/wellbeingUi';

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
    cta: '0800 652 1618',
    href: 'tel:08006521618',
    description:
      'Free support for electrical workers and families — emotional, practical and financial. 9am–5pm, Mon–Fri.',
  },
  {
    name: 'Lighthouse Charity',
    cta: '0345 605 1956',
    href: 'tel:03456051956',
    description: '24/7 helpline for construction workers and their families.',
  },
  {
    name: 'Mates in Mind',
    cta: 'Visit',
    href: 'https://www.matesinmind.org/',
    isLink: true,
    description:
      'Workplace mental health for construction — training, toolbox talks and resources for crews.',
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
      <WellbeingIntro
        label="Support network"
        title="Talk to someone, today"
        description="Real support, not more admin. Start with the fastest way to talk, then trade-specific or longer-term help if that fits better."
      />

      <WellbeingNote tone="red">
        <span className="font-semibold text-red-300">Not safe right now? </span>
        Call{' '}
        <a href="tel:999" className="font-semibold text-red-300 underline underline-offset-2">
          999
        </a>
        , call Samaritans on{' '}
        <a href="tel:116123" className="font-semibold text-red-300 underline underline-offset-2">
          116 123
        </a>
        , or text SHOUT to <span className="font-semibold text-red-300">85258</span>.
      </WellbeingNote>

      <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-2 xl:gap-6">
        <WellbeingSection title="Talk now" className="min-w-0">
          <ul className={WB_LIST}>
            {quickContacts.map((c) => (
              <ContactRow
                key={c.name}
                title={c.name}
                detail={`${c.availability}. ${c.description}`}
                action={
                  <ContactButton
                    href={c.href}
                    kind={c.isSms ? 'text' : 'call'}
                    label={c.displayPhone.replace(/^Text /, '')}
                    ariaLabel={`${c.isSms ? 'Text' : 'Call'} ${c.name} on ${c.displayPhone}`}
                  />
                }
              />
            ))}
          </ul>
        </WellbeingSection>

        <WellbeingSection title="Built for the trade" className="min-w-0">
          <ul className={WB_LIST}>
            {industryContacts.map((c) => (
              <ContactRow
                key={c.name}
                title={c.name}
                detail={c.description}
                action={
                  <ContactButton
                    href={c.href}
                    kind={c.isLink ? 'visit' : 'call'}
                    label={c.cta}
                    ariaLabel={`${c.isLink ? 'Visit' : 'Call'} ${c.name}`}
                  />
                }
              />
            ))}
          </ul>
        </WellbeingSection>
      </div>

      <WellbeingSection title="Keep useful links close">
        <ExternalLinkCards
          items={onlineResources.map((r) => ({
            title: r.name,
            description: r.description,
            url: r.url,
          }))}
        />
      </WellbeingSection>
    </div>
  );
};

export default SupportNetworkTab;
