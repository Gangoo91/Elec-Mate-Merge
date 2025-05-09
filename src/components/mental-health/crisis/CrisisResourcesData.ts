
// Types for crisis resources data
export interface EmergencyContact {
  name: string;
  phone: string;
  hours: string;
  description: string;
}

export interface OnlineResource {
  title: string;
  description: string;
  type: 'document' | 'video' | 'article' | 'website';
  url?: string;
}

// Data for crisis resources
export const emergencyContacts: EmergencyContact[] = [
  {
    name: "Samaritans",
    phone: "116 123",
    hours: "24/7",
    description: "Free, confidential emotional support for anyone experiencing distress or despair"
  },
  {
    name: "Construction Industry Helpline",
    phone: "0345 605 1956",
    hours: "8am - 8pm, 7 days",
    description: "Support for construction and trades workers facing hardship or crisis"
  },
  {
    name: "CALM - Campaign Against Living Miserably",
    phone: "0800 58 58 58",
    hours: "5pm - midnight, 365 days",
    description: "Support for men in the UK who are down or in crisis"
  },
  {
    name: "Mind Infoline",
    phone: "0300 123 3393",
    hours: "9am - 6pm, Mon-Fri",
    description: "Mental health information and signposting to local support"
  },
  {
    name: "Electrical Industries Charity",
    phone: "0800 652 1618",
    hours: "8am - 8pm, Mon-Fri",
    description: "Support for people from the electrical and energy sector"
  }
];

export const onlineResources: OnlineResource[] = [
  {
    title: "Mind - Mental Health Support",
    description: "Information on mental health problems, where to get help and how to support someone",
    type: "website",
    url: "https://www.mind.org.uk/information-support/"
  },
  {
    title: "NHS Mental Health Services",
    description: "NHS guidance on accessing urgent and non-urgent mental health support",
    type: "website",
    url: "https://www.nhs.uk/mental-health/"
  },
  {
    title: "Andy's Man Club",
    description: "Free, non-judgmental talking groups for men - #ITSOKAYTOTALK",
    type: "website",
    url: "https://andysmanclub.co.uk/"
  },
  {
    title: "CALM - Campaign Against Living Miserably",
    description: "Support for men in the UK who are down or in crisis",
    type: "website",
    url: "https://www.thecalmzone.net/"
  },
  {
    title: "Mental Health at Work",
    description: "Resources, toolkits and support for workplace mental health",
    type: "website",
    url: "https://www.mentalhealthatwork.org.uk/"
  },
  {
    title: "Electrical Industries Charity",
    description: "Support services specifically for people from the electrical sector",
    type: "website",
    url: "https://www.electricalcharity.org/"
  }
];
