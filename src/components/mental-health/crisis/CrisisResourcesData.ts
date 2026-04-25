// Types for crisis resources data
export interface EmergencyContact {
  name: string;
  phone: string;
  hours: string;
  description: string;
  type: 'emergency' | 'crisis' | 'support' | 'specialty';
}

export interface OnlineResource {
  title: string;
  description: string;
  type: 'document' | 'video' | 'article' | 'website';
  url?: string;
}

// Updated data with accurate UK crisis resources
export const emergencyContacts: EmergencyContact[] = [
  {
    name: 'Emergency Services',
    phone: '999',
    hours: '24/7',
    description: 'For immediate danger to life - police, ambulance, fire service',
    type: 'emergency',
  },
  {
    name: 'Samaritans',
    phone: '116 123',
    hours: '24/7, 365 days',
    description: 'Free, confidential emotional support for anyone experiencing distress or despair',
    type: 'crisis',
  },
  {
    name: 'CALM - Campaign Against Living Miserably',
    phone: '0800 58 58 58',
    hours: '5pm - midnight, 365 days',
    description: 'Support for men in the UK who are down or in crisis',
    type: 'crisis',
  },
  {
    name: 'Mind Infoline',
    phone: '0300 123 3393',
    hours: '9am - 6pm, Mon-Fri',
    description: 'Mental health information and signposting to local support services',
    type: 'support',
  },
  {
    name: 'NHS 111',
    phone: '111',
    hours: '24/7',
    description: 'Non-emergency medical help and advice, including mental health support',
    type: 'support',
  },
  {
    name: 'Construction Industry Helpline',
    phone: '0345 605 1956',
    hours: '8am - 8pm, 7 days',
    description: 'Support for construction and trades workers facing hardship or crisis',
    type: 'specialty',
  },
  {
    name: 'Electrical Industries Charity',
    phone: '0800 652 1618',
    hours: '8am - 8pm, Mon-Fri',
    description: 'Practical, emotional and financial support for people from the electrical sector',
    type: 'specialty',
  },
  {
    name: "Andy's Man Club Helpline",
    phone: '0800 023 9877',
    hours: '24/7',
    description: 'Support for men struggling with mental health - #ITSOKAYTOTALK',
    type: 'specialty',
  },
  {
    name: 'SHOUT — text crisis support',
    phone: '85258',
    hours: '24/7',
    description: 'Free, anonymous text-based crisis support. Text SHOUT to 85258. Useful when you cannot or do not want to talk.',
    type: 'crisis',
  },
  {
    name: 'MoneyHelper',
    phone: '0800 011 3797',
    hours: '8am - 6pm, Mon-Fri',
    description: 'Free, government-backed money guidance. Pricing pressure and bills are a common driver of distress in the trade.',
    type: 'specialty',
  },
  {
    name: 'StepChange Debt Charity',
    phone: '0800 138 1111',
    hours: '8am - 8pm, Mon-Fri / 8am - 4pm, Sat',
    description: 'Free, confidential debt advice. The most common silent stressor on sole traders.',
    type: 'specialty',
  },
  {
    name: 'Citizens Advice',
    phone: '0800 144 8848',
    hours: '9am - 5pm, Mon-Fri',
    description: 'Free advice on benefits, work, debt, housing and consumer rights. Independent, impartial, confidential.',
    type: 'support',
  },
];

export const onlineResources: OnlineResource[] = [
  {
    title: 'Mind - Mental Health Support',
    description:
      'Comprehensive information on mental health problems, treatments, and local support',
    type: 'website',
    url: 'https://www.mind.org.uk/information-support/',
  },
  {
    title: 'NHS Mental Health Services',
    description: 'NHS guidance on accessing urgent and non-urgent mental health support',
    type: 'website',
    url: 'https://www.nhs.uk/mental-health/',
  },
  {
    title: 'Samaritans Self-Help Resources',
    description: 'Tools and techniques for managing difficult emotions and thoughts',
    type: 'website',
    url: 'https://www.samaritans.org/how-we-can-help/if-youre-having-difficult-time/',
  },
  {
    title: "Andy's Man Club",
    description: 'Free, non-judgmental talking groups for men across the UK - #ITSOKAYTOTALK',
    type: 'website',
    url: 'https://andysmanclub.co.uk/',
  },
  {
    title: 'CALM Resources',
    description: 'Mental health support and resources specifically designed for men',
    type: 'website',
    url: 'https://www.thecalmzone.net/help/get-help/',
  },
  {
    title: 'Mates in Mind',
    description: 'Mental wellbeing support for UK construction workers and industry professionals',
    type: 'website',
    url: 'https://www.matesinmind.org/toolbox-talks/',
  },
  {
    title: 'Electrical Industries Charity',
    description:
      'Comprehensive support services for people from the electrical and energy industries',
    type: 'website',
    url: 'https://www.electricalcharity.org/',
  },
  {
    title: 'Mental Health at Work',
    description: 'Resources and toolkits for workplace mental health and employer support',
    type: 'website',
    url: 'https://www.mentalhealthatwork.org.uk/',
  },
  {
    title: 'Hub of Hope',
    description: 'Find local mental health support near you — therapists, peer groups, charities filtered by need.',
    type: 'website',
    url: 'https://hubofhope.co.uk/',
  },
  {
    title: 'Construction Sport',
    description: 'Free monthly social walks, runs and football matches for construction workers — peer support without sitting in a circle.',
    type: 'website',
    url: 'https://www.constructionsport.co.uk/',
  },
  {
    title: 'Lighthouse Construction Industry Charity',
    description: '24/7 helpline plus financial, legal and emotional aid grants for construction and tradespeople in crisis.',
    type: 'website',
    url: 'https://www.lighthouseclub.org/',
  },
];
