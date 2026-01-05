
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
    "desktop": "price_1RhtdT2RKw5t5RAmv6b2xE6p", // £6.99 Desktop Price Monthly
    "employer": "price_1SlyAT2RKw5t5RAmUmTRGimH", // £29.99 Employer Monthly
  },
  yearly: {
    "desktop": "price_1Rhtgl2RKw5t5RAmkQVKVnKn", // £69.99 Desktop Price Yearly
    "employer": "price_1SlyB82RKw5t5RAmN447YJUW", // £299.99 Employer Yearly
  }
};

// Subscription plans data for UI
export const stripePriceData = {
  monthly: [
    {
      id: "desktop-monthly",
      name: "Desktop Price",
      price: "£6.99",
      period: "/month",
      description: "Complete access for electricians and apprentices",
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
      priceId: stripePrices.monthly.desktop,
    },
    {
      id: "employer-monthly",
      name: "Employer",
      price: "£29.99",
      period: "/month",
      description: "Full suite for electrical business owners",
      features: [
        "Everything in Desktop Price",
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
      id: "desktop-yearly",
      name: "Desktop Price",
      price: "£69.99",
      period: "/year",
      description: "Complete access for electricians and apprentices",
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
      savings: "Save £14 vs monthly",
      priceId: stripePrices.yearly.desktop,
    },
    {
      id: "employer-yearly",
      name: "Employer",
      price: "£299.99",
      period: "/year",
      description: "Full suite for electrical business owners",
      features: [
        "Everything in Desktop Price",
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
      savings: "Save £60 vs monthly",
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
