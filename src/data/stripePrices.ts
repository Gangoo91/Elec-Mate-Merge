export interface PlanDetails {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  notIncluded: string[];
  popular: boolean;
  color: string;
  priceId: string;
  savings?: string;
  coming?: boolean;
  enterprise?: boolean;
  contactEmail?: string;
}

// Native App Store / Google Play fallback prices (shown when RevenueCat can't load StoreKit prices)
export const nativePriceData = {
  monthly: [
    {
      id: 'apprentice-monthly',
      name: 'Apprentice',
      price: '£6.99',
      period: '/month',
      description: 'Study guides, calculators & exam prep for apprentices',
      features: [
        '2,000+ practice questions',
        'AM2 exam preparation',
        'Level 2 & 3 apprentice courses',
        'BS 7671 18th Edition guides',
        '50+ electrical calculators',
        'OJT logbook tracking',
        'Flashcards & mock exams',
        'Progress tracking',
      ],
      notIncluded: ['8 AI Specialist Agents', 'Inspection & Testing suite'],
      popular: false,
      color: 'bg-gradient-to-br from-elec-gray to-elec-dark',
      priceId: '',
    },
    {
      id: 'electrician-monthly',
      name: 'Electrician',
      price: '£14.99',
      period: '/month',
      description: 'Certs, testing, quoting & AI agents for qualified sparks',
      features: [
        'Everything in Apprentice',
        '8 AI Specialist Agents',
        'Inspection & Testing suite',
        'AI board scanner',
        'Quote & invoice builder',
        'Live material pricing',
        'RAMS generator',
        'Customer management',
      ],
      notIncluded: [],
      popular: true,
      color: 'bg-gradient-to-br from-elec-gray to-elec-dark',
      priceId: '',
    },
  ],
  yearly: [
    {
      id: 'apprentice-yearly',
      name: 'Apprentice',
      price: '£69.99',
      period: '/year',
      description: 'Study guides, calculators & exam prep for apprentices',
      features: [
        '2,000+ practice questions',
        'AM2 exam preparation',
        'Level 2 & 3 apprentice courses',
        'BS 7671 18th Edition guides',
        '50+ electrical calculators',
        'OJT logbook tracking',
        'Flashcards & mock exams',
        'Progress tracking',
      ],
      notIncluded: ['8 AI Specialist Agents', 'Inspection & Testing suite'],
      popular: false,
      color: 'bg-gradient-to-br from-elec-gray to-elec-dark',
      savings: 'Save £13.89 vs monthly',
      priceId: '',
    },
    {
      id: 'electrician-yearly',
      name: 'Electrician',
      price: '£149.99',
      period: '/year',
      description: 'Certs, testing, quoting & AI agents for qualified sparks',
      features: [
        'Everything in Apprentice',
        '8 AI Specialist Agents',
        'Inspection & Testing suite',
        'AI board scanner',
        'Quote & invoice builder',
        'Live material pricing',
        'RAMS generator',
        'Customer management',
      ],
      notIncluded: [],
      popular: true,
      color: 'bg-gradient-to-br from-elec-gray to-elec-dark',
      savings: 'Save £29.89 vs monthly',
      priceId: '',
    },
  ],
};

// Define Stripe price IDs for each plan
export const stripePrices = {
  monthly: {
    apprentice: 'price_1SmUef2RKw5t5RAmRIMTWTqU', // £4.99 Apprentice Monthly (web)
    electrician: 'price_1SqJVr2RKw5t5RAmaiTGelLN', // £9.99 Electrician Monthly (web)
    business_ai: 'price_1T6DUx2RKw5t5RAmpb177NJV', // £29.99 Business AI Monthly
    employer: 'price_1SlyAT2RKw5t5RAmUmTRGimH', // £29.99 Employer Monthly (will become £49.99)
  },
  yearly: {
    apprentice: 'price_1SmUfK2RKw5t5RAml6bj1I77', // £49.99 Apprentice Yearly (web)
    electrician: 'price_1SqJVs2RKw5t5RAmVeD2QVsb', // £99.99 Electrician Yearly (web)
    business_ai: 'price_1T6DUy2RKw5t5RAmo9HgAukW', // £299.99 Business AI Yearly
    employer: 'price_1SlyB82RKw5t5RAmN447YJUW', // £299.99 Employer Yearly (will become £499.99)
  },
};

// Subscription plans data for UI
// NOTE: Employer plan is hidden for launch - only Apprentice and Electrician available
export const stripePriceData = {
  monthly: [
    {
      id: 'apprentice-monthly',
      name: 'Apprentice',
      price: '£4.99',
      period: '/month',
      description: 'Study guides, calculators & exam prep for apprentices',
      features: [
        '2,000+ practice questions',
        'AM2 exam preparation',
        'Level 2 & 3 apprentice courses',
        'BS 7671 18th Edition guides',
        '50+ electrical calculators',
        'OJT logbook tracking',
        'Flashcards & mock exams',
        'Progress tracking',
      ],
      notIncluded: ['8 AI Specialist Agents', 'Inspection & Testing suite'],
      popular: false,
      color: 'bg-gradient-to-br from-elec-gray to-elec-dark',
      priceId: stripePrices.monthly.apprentice,
    },
    {
      id: 'electrician-monthly',
      name: 'Electrician',
      price: '£9.99',
      period: '/month',
      description: 'Certs, testing, quoting & AI agents for qualified sparks',
      features: [
        'Everything in Apprentice',
        '8 AI Specialist Agents',
        'Inspection & Testing suite',
        'AI board scanner',
        'Quote & invoice builder',
        'Live material pricing',
        'RAMS generator',
        'Customer management',
      ],
      notIncluded: [],
      popular: true,
      color: 'bg-gradient-to-br from-elec-gray to-elec-dark',
      priceId: stripePrices.monthly.electrician,
    },
    {
      id: 'business-ai-monthly',
      name: 'Business AI',
      price: '£29.99',
      period: '/month',
      description: 'Your AI assistant handles admin so you can focus on the tools',
      features: [
        'Everything in Electrician',
        'Mate — your AI assistant on WhatsApp',
        'Email lead monitoring (Gmail/Outlook)',
        'Automated invoice chasing',
        'Morning briefing daily',
        'Quote drafting & follow-up',
        'Certificate delivery automation',
        'BS 7671 knowledge base on WhatsApp',
      ],
      notIncluded: [],
      popular: false,
      color: 'bg-gradient-to-br from-elec-gray to-elec-dark',
      priceId: stripePrices.monthly.business_ai,
      coming: true,
    },
    {
      id: 'employer-monthly',
      name: 'Employer',
      price: '£49.99',
      period: '/month',
      description: 'Team management, AI assistant & business tools',
      features: [
        'Everything in Business AI',
        'Team GPS & job tracking',
        'Team management (up to 5)',
        'Job packs & assignments',
        'Timesheets & scheduling',
        'Safety hub & incidents',
        'Finance hub & reporting',
        'Talent pool access',
      ],
      notIncluded: [],
      popular: false,
      color: 'bg-gradient-to-br from-elec-gray to-elec-dark',
      priceId: stripePrices.monthly.employer,
      coming: true,
    },
  ],
  yearly: [
    {
      id: 'apprentice-yearly',
      name: 'Apprentice',
      price: '£49.99',
      period: '/year',
      description: 'Study guides, calculators & exam prep for apprentices',
      features: [
        '2,000+ practice questions',
        'AM2 exam preparation',
        'Level 2 & 3 apprentice courses',
        'BS 7671 18th Edition guides',
        '50+ electrical calculators',
        'OJT logbook tracking',
        'Flashcards & mock exams',
        'Progress tracking',
      ],
      notIncluded: ['8 AI Specialist Agents', 'Inspection & Testing suite'],
      popular: false,
      color: 'bg-gradient-to-br from-elec-gray to-elec-dark',
      savings: 'Save £9.89 vs monthly',
      priceId: stripePrices.yearly.apprentice,
    },
    {
      id: 'electrician-yearly',
      name: 'Electrician',
      price: '£99.99',
      period: '/year',
      description: 'Certs, testing, quoting & AI agents for qualified sparks',
      features: [
        'Everything in Apprentice',
        '8 AI Specialist Agents',
        'Inspection & Testing suite',
        'AI board scanner',
        'Quote & invoice builder',
        'Live material pricing',
        'RAMS generator',
        'Customer management',
      ],
      notIncluded: [],
      popular: true,
      color: 'bg-gradient-to-br from-elec-gray to-elec-dark',
      savings: 'Save £19.89 vs monthly',
      priceId: stripePrices.yearly.electrician,
    },
    {
      id: 'business-ai-yearly',
      name: 'Business AI',
      price: '£299.99',
      period: '/year',
      description: 'Your AI assistant handles admin so you can focus on the tools',
      features: [
        'Everything in Electrician',
        'Mate — your AI assistant on WhatsApp',
        'Email lead monitoring (Gmail/Outlook)',
        'Automated invoice chasing',
        'Morning briefing daily',
        'Quote drafting & follow-up',
        'Certificate delivery automation',
        'BS 7671 knowledge base on WhatsApp',
      ],
      notIncluded: [],
      popular: false,
      color: 'bg-gradient-to-br from-elec-gray to-elec-dark',
      savings: 'Save £59.89 vs monthly',
      priceId: stripePrices.yearly.business_ai,
      coming: true,
    },
    {
      id: 'employer-yearly',
      name: 'Employer',
      price: '£499.99',
      period: '/year',
      description: 'Team management, AI assistant & business tools',
      features: [
        'Everything in Business AI',
        'Team GPS & job tracking',
        'Team management (up to 5)',
        'Job packs & assignments',
        'Timesheets & scheduling',
        'Safety hub & incidents',
        'Finance hub & reporting',
        'Talent pool access',
      ],
      notIncluded: [],
      popular: false,
      color: 'bg-gradient-to-br from-elec-gray to-elec-dark',
      savings: 'Save £99.89 vs monthly',
      priceId: stripePrices.yearly.employer,
      coming: true,
    },
  ],
};
