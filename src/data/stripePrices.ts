
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
}

// Define Stripe price IDs for each plan
export const stripePrices = {
  monthly: {
    "apprentice": "price_1RL1wd2RKw5t5RAms8S0sLAt", // £3.99 Apprentice Monthly
    "electrician": "price_1RL1zR2RKw5t5RAmVABR93Zy", // £5.99 Electrical Monthly
    "employer": "price_1RZoZZZZZZZZZZZZ", // Keep placeholder for now
  },
  yearly: {
    "apprentice": "price_1RL2582RKw5t5RAm2qG45wK0", // £39.99 Yearly Apprentice
    "electrician": "price_1RL25t2RKw5t5RAmXYxxJivo", // £59.99 Electrical Yearly
    "employer": "price_1RZpaZZZZZZZZZZZZ", // Keep placeholder for now
  }
};

// Subscription plans data for UI
export const stripePriceData = {
  monthly: [
    {
      id: "apprentice-monthly",
      name: "Apprentice",
      price: "£3.99",
      period: "/month",
      description: "Essential resources for electrical apprentices",
      features: [
        "Complete learning resources",
        "Video lessons library",
        "Study materials",
        "Progress tracking",
        "Basic calculators",
      ],
      notIncluded: [
        "Advanced calculators",
        "Document templates",
        "Project management",
      ],
      popular: false,
      color: "bg-elec-gray",
      priceId: stripePrices.monthly.apprentice,
    },
    {
      id: "electrician-monthly",
      name: "Electrician",
      price: "£5.99",
      period: "/month",
      description: "Enhanced tools for professional electricians",
      features: [
        "All Apprentice features",
        "Full calculator suite",
        "Invoice/estimate templates",
        "Project management tools",
        "Priority support",
      ],
      notIncluded: [
        "Employer dashboard",
      ],
      popular: true,
      color: "bg-elec-gray border-elec-yellow",
      priceId: stripePrices.monthly.electrician,
    },
    {
      id: "employer-monthly",
      name: "Employer",
      price: "£9.99",
      period: "/month",
      description: "Full suite for electrical business owners",
      features: [
        "All Electrician features",
        "Recruitment dashboard",
        "Job posting tools",
        "Team management",
        "Training oversight",
      ],
      notIncluded: [],
      popular: false,
      color: "bg-elec-gray",
      coming: true,
      priceId: stripePrices.monthly.employer,
    },
  ],
  yearly: [
    {
      id: "apprentice-yearly",
      name: "Apprentice",
      price: "£39.99",
      period: "/year",
      description: "Essential resources for electrical apprentices",
      features: [
        "Complete learning resources",
        "Video lessons library",
        "Study materials",
        "Progress tracking",
        "Basic calculators",
      ],
      notIncluded: [
        "Advanced calculators",
        "Document templates",
        "Project management",
      ],
      popular: false,
      color: "bg-elec-gray",
      savings: "Save £7.89 compared to monthly",
      priceId: stripePrices.yearly.apprentice,
    },
    {
      id: "electrician-yearly",
      name: "Electrician",
      price: "£59.99",
      period: "/year",
      description: "Enhanced tools for professional electricians",
      features: [
        "All Apprentice features",
        "Full calculator suite",
        "Invoice/estimate templates",
        "Project management tools",
        "Priority support",
      ],
      notIncluded: [
        "Employer dashboard",
      ],
      popular: true,
      color: "bg-elec-gray border-elec-yellow",
      savings: "Save £11.89 compared to monthly",
      priceId: stripePrices.yearly.electrician,
    },
    {
      id: "employer-yearly",
      name: "Employer",
      price: "£99.99",
      period: "/year",
      description: "Full suite for electrical business owners",
      features: [
        "All Electrician features",
        "Recruitment dashboard",
        "Job posting tools",
        "Team management",
        "Training oversight",
      ],
      notIncluded: [],
      popular: false,
      color: "bg-elec-gray",
      coming: true,
      savings: "Save £19.89 compared to monthly",
      priceId: stripePrices.yearly.employer,
    },
  ],
};
