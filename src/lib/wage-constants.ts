// 2025 UK Minimum Wage Rates and Enhanced Regional Multipliers
export const MINIMUM_WAGE_RATES = {
  apprentice: 7.55,
  aged18to20: 10.00,
  aged21plus: 12.21, // National Living Wage
  lastUpdated: "April 2025"
};

// Updated 2025 regional multipliers reflecting cost of living and market demand
export const REGIONAL_MULTIPLIERS = {
  london: 1.35, // Increased due to living costs and demand
  southeast: 1.20, // Increased reflecting commuter belt costs
  scotland: 1.08, // Slight increase for major cities
  northwest: 1.02, // Manchester/Liverpool premium
  yorkshire: 1.02, // Leeds/Sheffield adjustment
  wales: 0.98, // Regional adjustment
  southwest: 1.05, // Bristol/Bath premium
  eastMidlands: 1.00, // Baseline
  westMidlands: 1.00, // Birmingham area
  northeast: 0.95, // Lower cost regions
  other: 0.95
};

export const ANNUAL_HOUR_ESTIMATES = {
  fullTime: 2000, // 40 hours * 50 weeks
  standardWork: 1750, // 35 hours * 50 weeks
  partTime: 1200 // 24 hours * 50 weeks
};