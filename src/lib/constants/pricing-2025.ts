// 2025 UK Electrician Pricing Constants and Market Rates
// Updated for current market conditions and inflation

export const MARKET_RATES_2025 = {
  // Hourly rates by experience level (UK regional averages)
  hourlyRates: {
    apprentice: { min: 12.21, max: 18.00, typical: 15.00 }, // Based on 2025 minimum wage
    improver: { min: 18.00, max: 25.00, typical: 22.00 },
    qualified: { min: 24.00, max: 35.00, typical: 28.00 },
    experienced: { min: 30.00, max: 45.00, typical: 38.00 },
    specialist: { min: 40.00, max: 65.00, typical: 52.00 }
  },

  // Regional multipliers for 2025
  regionalMultipliers: {
    london: 1.35, // Increased from 1.25 due to living costs
    southeast: 1.20, // Increased from 1.15
    scotland: 1.08, // Increased from 1.05
    northwest: 1.02, // Slight increase
    yorkshire: 1.02, // Slight increase
    wales: 0.98,
    southwest: 1.05,
    eastMidlands: 1.00,
    westMidlands: 1.00,
    northeast: 0.95,
    other: 0.95
  },

  // Material cost increases 2025
  materialInflation: {
    copper: 1.12, // 12% increase due to global supply
    steel: 1.08, // 8% increase
    plastic: 1.15, // 15% increase due to oil prices
    general: 1.10 // 10% average across all materials
  },

  // Updated business costs for 2025
  businessCosts: {
    // Professional fees (annual)
    niceicMembership: 450, // Up from 350
    ecaMembership: 520, // Up from 420
    publicLiabilityInsurance: 850, // Up from 650
    toolInsurance: 180, // Up from 150
    
    // Vehicle costs (annual)
    commercialInsurance: 1200, // Up from 900
    fuel: 2800, // Significant increase
    maintenance: 800, // Up from 600
    vehicleAllowance: 4000, // Up from 3500
    
    // Equipment (annual amortization)
    multifunctionTester: 120, // £600 over 5 years
    patTester: 80, // £400 over 5 years
    thermalCamera: 200, // £1000 over 5 years
    toolsReplacement: 600, // Up from 400
    
    // Software & subscriptions (annual)
    eicrsoftware: 180, // Up from 150
    cloudStorage: 60, // Up from 40
    businessApps: 240, // Up from 180
    
    // Training & certification (annual)
    continuousTraining: 400, // Up from 300
    certification: 200, // Up from 150
  },

  // Tax and National Insurance 2025/26
  taxRates: {
    personalAllowance: 12570, // Frozen until 2028
    basicRateThreshold: 37700, // Frozen until 2028
    basicRate: 20,
    higherRate: 40,
    niThreshold: 12570, // Employee
    niRate: 12, // Employee
    employerNiThreshold: 9100,
    employerNiRate: 13.8,
    vatThreshold: 90000, // 2025/26 threshold
    vatRate: 20
  },

  // Minimum wage rates 2025 (April rates)
  minimumWages: {
    apprentice: 7.55,
    aged18to20: 10.00,
    aged21plus: 12.21, // National Living Wage
    lastUpdated: "April 2025"
  }
};

// Utility functions for calculations
export const calculateRegionalRate = (baseRate: number, region: keyof typeof MARKET_RATES_2025.regionalMultipliers): number => {
  return baseRate * MARKET_RATES_2025.regionalMultipliers[region];
};

export const calculateMaterialCost = (baseCost: number, materialType: keyof typeof MARKET_RATES_2025.materialInflation): number => {
  return baseCost * MARKET_RATES_2025.materialInflation[materialType];
};

export const getRecommendedHourlyRate = (experienceLevel: keyof typeof MARKET_RATES_2025.hourlyRates, region: string = 'other'): number => {
  const baseRate = MARKET_RATES_2025.hourlyRates[experienceLevel].typical;
  const regionKey = region as keyof typeof MARKET_RATES_2025.regionalMultipliers;
  return calculateRegionalRate(baseRate, regionKey);
};