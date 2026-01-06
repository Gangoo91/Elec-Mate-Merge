
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

// Define Stripe price IDs for each plan
export const stripePrices = {
  monthly: {
    "apprentice": "price_1SmUef2RKw5t5RAmRIMTWTqU",  // £4.99 Apprentice Monthly
    "electrician": "price_1RhteS2RKw5t5RAmzRbaTE8U", // £9.99 Electrician Monthly
    "employer": "price_1SlyAT2RKw5t5RAmUmTRGimH",    // £29.99 Employer Monthly
  },
  yearly: {
    "apprentice": "price_1SmUfK2RKw5t5RAml6bj1I77",  // £49.99 Apprentice Yearly
    "electrician": "price_1RhtiS2RKw5t5RAmha0s6PJA", // £99.99 Electrician Yearly
    "employer": "price_1SlyB82RKw5t5RAmN447YJUW",    // £299.99 Employer Yearly
  }
};

// Subscription plans data for UI
export const stripePriceData = {
  monthly: [
    {
      id: "apprentice-monthly",
      name: "Apprentice",
      price: "£4.99",
      period: "/month",
      description: "Ace your exams and fast-track your career",
      features: [
        "AM2 exam preparation & practice tests",
        "Level 2 & 3 apprentice courses",
        "BS 7671 18th Edition guides",
        "HNC electrical modules",
        "Full calculator suite",
        "Progress tracking & analytics",
        "Regulation quick search",
        "Interactive guidance tools",
      ],
      notIncluded: [
        "AI Design & Maintenance Agents",
        "Inspection & Testing tools",
        "Employer features",
      ],
      popular: false,
      color: "bg-gradient-to-br from-elec-gray to-elec-dark",
      priceId: stripePrices.monthly.apprentice,
    },
    {
      id: "electrician-monthly",
      name: "Electrician",
      price: "£9.99",
      period: "/month",
      description: "AI-powered tools that save you hours every day",
      features: [
        "Everything in Apprentice",
        "AI Design Agent - circuits in minutes",
        "AI Maintenance Agent - schedules",
        "EICR & EIC certificates",
        "AI board scanner",
        "RAMS & site safety docs",
        "Team briefs generator",
        "Quote & invoice builder",
        "Job management",
        "Customer database",
      ],
      notIncluded: [
        "Employer Dashboard",
        "Team Management",
      ],
      popular: true,
      color: "bg-gradient-to-br from-elec-gray to-elec-dark",
      priceId: stripePrices.monthly.electrician,
    },
    {
      id: "employer-monthly",
      name: "Employer",
      price: "£29.99",
      period: "/month",
      description: "Run your electrical business efficiently",
      features: [
        "Everything in Electrician",
        "Employer dashboard & analytics",
        "Team management (up to 5 users)",
        "Job board & assignments",
        "Finance hub & reporting",
        "Safety hub (RAMS & incidents)",
        "Talent pool & recruitment",
        "Timesheets & leave tracking",
        "Client portal access",
        "Team discount for electricians",
      ],
      notIncluded: [],
      popular: false,
      color: "bg-gradient-to-br from-elec-gray to-elec-dark",
      priceId: stripePrices.monthly.employer,
    },
    {
      id: "enterprise-monthly",
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For larger teams and organisations",
      features: [
        "Everything in Employer",
        "Unlimited team members",
        "Dedicated account manager",
        "Custom onboarding & training",
        "Volume discounts",
        "Priority support",
        "API access",
        "Custom integrations",
      ],
      notIncluded: [],
      popular: false,
      color: "bg-gradient-to-br from-elec-gray to-elec-dark",
      priceId: "",
      enterprise: true,
      contactEmail: "info@elec-mate.com",
    },
  ],
  yearly: [
    {
      id: "apprentice-yearly",
      name: "Apprentice",
      price: "£49.99",
      period: "/year",
      description: "Ace your exams and fast-track your career",
      features: [
        "AM2 exam preparation & practice tests",
        "Level 2 & 3 apprentice courses",
        "BS 7671 18th Edition guides",
        "HNC electrical modules",
        "Full calculator suite",
        "Progress tracking & analytics",
        "Regulation quick search",
        "Interactive guidance tools",
      ],
      notIncluded: [
        "AI Design & Maintenance Agents",
        "Inspection & Testing tools",
        "Employer features",
      ],
      popular: false,
      color: "bg-gradient-to-br from-elec-gray to-elec-dark",
      savings: "Save £9.89 vs monthly",
      priceId: stripePrices.yearly.apprentice,
    },
    {
      id: "electrician-yearly",
      name: "Electrician",
      price: "£99.99",
      period: "/year",
      description: "AI-powered tools that save you hours every day",
      features: [
        "Everything in Apprentice",
        "AI Design Agent - circuits in minutes",
        "AI Maintenance Agent - schedules",
        "EICR & EIC certificates",
        "AI board scanner",
        "RAMS & site safety docs",
        "Team briefs generator",
        "Quote & invoice builder",
        "Job management",
        "Customer database",
      ],
      notIncluded: [
        "Employer Dashboard",
        "Team Management",
      ],
      popular: true,
      color: "bg-gradient-to-br from-elec-gray to-elec-dark",
      savings: "Save £19.89 vs monthly",
      priceId: stripePrices.yearly.electrician,
    },
    {
      id: "employer-yearly",
      name: "Employer",
      price: "£299.99",
      period: "/year",
      description: "Run your electrical business efficiently",
      features: [
        "Everything in Electrician",
        "Employer dashboard & analytics",
        "Team management (up to 5 users)",
        "Job board & assignments",
        "Finance hub & reporting",
        "Safety hub (RAMS & incidents)",
        "Talent pool & recruitment",
        "Timesheets & leave tracking",
        "Client portal access",
        "Team discount for electricians",
      ],
      notIncluded: [],
      popular: false,
      color: "bg-gradient-to-br from-elec-gray to-elec-dark",
      savings: "Save £59.89 vs monthly",
      priceId: stripePrices.yearly.employer,
    },
    {
      id: "enterprise-yearly",
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For larger teams and organisations",
      features: [
        "Everything in Employer",
        "Unlimited team members",
        "Dedicated account manager",
        "Custom onboarding & training",
        "Volume discounts",
        "Priority support",
        "API access",
        "Custom integrations",
      ],
      notIncluded: [],
      popular: false,
      color: "bg-gradient-to-br from-elec-gray to-elec-dark",
      priceId: "",
      enterprise: true,
      contactEmail: "info@elec-mate.com",
    },
  ],
};
