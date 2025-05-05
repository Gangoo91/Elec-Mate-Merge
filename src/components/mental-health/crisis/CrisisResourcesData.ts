
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
    name: "Electrical Trades Crisis Line",
    phone: "0800 123 4567",
    hours: "24/7",
    description: "Immediate support for electrical trade workers in crisis"
  },
  {
    name: "Samaritans",
    phone: "116 123",
    hours: "24/7",
    description: "Confidential emotional support for anyone in distress"
  },
  {
    name: "Construction Industry Helpline",
    phone: "0345 605 1956",
    hours: "8am - 8pm, 7 days",
    description: "Support for construction workers facing hardship or crisis"
  }
];

export const onlineResources: OnlineResource[] = [
  {
    title: "Mind - Mental Health Crisis Support",
    description: "Information on what to do in a mental health crisis situation",
    type: "website",
    url: "https://www.mind.org.uk/information-support/guides-to-support-and-services/crisis-services/getting-help-in-a-crisis/"
  },
  {
    title: "NHS Mental Health Crisis Resources",
    description: "NHS guidance on accessing urgent mental health support",
    type: "website",
    url: "https://www.nhs.uk/nhs-services/mental-health-services/where-to-get-urgent-help-for-mental-health/"
  },
  {
    title: "Andy's Man Club",
    description: "Free, non-judgmental talking groups for men - #ITSOKAYTOTALK",
    type: "website",
    url: "https://andysmanclub.co.uk/"
  },
  {
    title: "CALM - Campaign Against Living Miserably",
    description: "Support for men in the UK, of any age, who are down or in crisis",
    type: "website",
    url: "https://www.thecalmzone.net/"
  },
  {
    title: "Shout Crisis Text Line",
    description: "Text 'SHOUT' to 85258 for free 24/7 mental health support",
    type: "website",
    url: "https://giveusashout.org/"
  }
];
