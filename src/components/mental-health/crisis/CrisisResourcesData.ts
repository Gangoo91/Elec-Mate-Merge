
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
    name: "Emergency Services",
    phone: "999",
    hours: "24/7",
    description: "For immediate danger to life - police, ambulance, fire service",
    type: "emergency"
  },
  {
    name: "Samaritans",
    phone: "116 123",
    hours: "24/7, 365 days",
    description: "Free, confidential emotional support for anyone experiencing distress or despair",
    type: "crisis"
  },
  {
    name: "CALM - Campaign Against Living Miserably",
    phone: "0800 58 58 58",
    hours: "5pm - midnight, 365 days",
    description: "Support for men in the UK who are down or in crisis",
    type: "crisis"
  },
  {
    name: "Mind Infoline",
    phone: "0300 123 3393",
    hours: "9am - 6pm, Mon-Fri",
    description: "Mental health information and signposting to local support services",
    type: "support"
  },
  {
    name: "NHS 111",
    phone: "111",
    hours: "24/7",
    description: "Non-emergency medical help and advice, including mental health support",
    type: "support"
  },
  {
    name: "Construction Industry Helpline",
    phone: "0345 605 1956",
    hours: "8am - 8pm, 7 days",
    description: "Support for construction and trades workers facing hardship or crisis",
    type: "specialty"
  },
  {
    name: "Electrical Industries Charity",
    phone: "0800 652 1618",
    hours: "8am - 8pm, Mon-Fri",
    description: "Practical, emotional and financial support for people from the electrical sector",
    type: "specialty"
  },
  {
    name: "Andy's Man Club Helpline",
    phone: "0800 023 9877",
    hours: "24/7",
    description: "Support for men struggling with mental health - #ITSOKAYTOTALK",
    type: "specialty"
  }
];

export const onlineResources: OnlineResource[] = [
  {
    title: "Mind - Mental Health Support",
    description: "Comprehensive information on mental health problems, treatments, and local support",
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
    title: "Samaritans Self-Help Resources",
    description: "Tools and techniques for managing difficult emotions and thoughts",
    type: "website",
    url: "https://www.samaritans.org/how-we-can-help/if-youre-having-difficult-time/"
  },
  {
    title: "Andy's Man Club",
    description: "Free, non-judgmental talking groups for men across the UK - #ITSOKAYTOTALK",
    type: "website",
    url: "https://andysmanclub.co.uk/"
  },
  {
    title: "CALM Resources",
    description: "Mental health support and resources specifically designed for men",
    type: "website",
    url: "https://www.thecalmzone.net/help/get-help/"
  },
  {
    title: "Mates in Mind",
    description: "Mental wellbeing support for UK construction workers and industry professionals",
    type: "website",
    url: "https://www.matesinmind.org/toolbox-talks/"
  },
  {
    title: "Electrical Industries Charity",
    description: "Comprehensive support services for people from the electrical and energy industries",
    type: "website",
    url: "https://www.electricalcharity.org/"
  },
  {
    title: "Mental Health at Work",
    description: "Resources and toolkits for workplace mental health and employer support",
    type: "website",
    url: "https://www.mentalhealthatwork.org.uk/"
  }
];
