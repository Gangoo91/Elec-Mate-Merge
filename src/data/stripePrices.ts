
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
      description: "Essential learning tools for electrical apprentices",
      features: [
        "Full Study Centre (AM2, HNC, BS 7671)",
        "Apprentice courses & modules",
        "Progress tracking & milestones",
        "Basic electrical calculators",
        "Regulation search",
        "CV Builder",
      ],
      notIncluded: [
        "Inspection & Testing (EIC/EICR)",
        "Quote & Invoice Builder",
        "Live material pricing",
        "Employer Dashboard",
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
      description: "Complete toolkit for qualified electricians",
      features: [
        "Full Study Centre (AM2, HNC, BS 7671)",
        "All electrical calculators",
        "Quote & Invoice Builder",
        "EIC/EICR Forms",
        "Installation Planner",
        "Live material pricing",
        "Fault finding assistant",
        "CV Builder",
        "Regulation search",
        "Progress tracking",
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
      description: "Full suite for electrical business owners",
      features: [
        "Everything in Electrician",
        "Employer Dashboard",
        "Team Management (up to 5 users)",
        "Job Board & Assignments",
        "Finance Hub",
        "Safety Hub (RAMS, Incidents)",
        "Talent Pool & Recruitment",
        "Timesheets & Leave Management",
        "Client Portal",
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
      description: "For teams of 5+ employees",
      features: [
        "Everything in Employer",
        "Unlimited team members",
        "Dedicated account manager",
        "Custom onboarding",
        "Volume discounts for electricians",
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
      description: "Essential learning tools for electrical apprentices",
      features: [
        "Full Study Centre (AM2, HNC, BS 7671)",
        "Apprentice courses & modules",
        "Progress tracking & milestones",
        "Basic electrical calculators",
        "Regulation search",
        "CV Builder",
      ],
      notIncluded: [
        "Inspection & Testing (EIC/EICR)",
        "Quote & Invoice Builder",
        "Live material pricing",
        "Employer Dashboard",
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
      description: "Complete toolkit for qualified electricians",
      features: [
        "Full Study Centre (AM2, HNC, BS 7671)",
        "All electrical calculators",
        "Quote & Invoice Builder",
        "EIC/EICR Forms",
        "Installation Planner",
        "Live material pricing",
        "Fault finding assistant",
        "CV Builder",
        "Regulation search",
        "Progress tracking",
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
      description: "Full suite for electrical business owners",
      features: [
        "Everything in Electrician",
        "Employer Dashboard",
        "Team Management (up to 5 users)",
        "Job Board & Assignments",
        "Finance Hub",
        "Safety Hub (RAMS, Incidents)",
        "Talent Pool & Recruitment",
        "Timesheets & Leave Management",
        "Client Portal",
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
      description: "For teams of 5+ employees",
      features: [
        "Everything in Employer",
        "Unlimited team members",
        "Dedicated account manager",
        "Custom onboarding",
        "Volume discounts for electricians",
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
