export interface ConsumerUnitData {
  brand: string;
  model: string;
  ways: number;
  mainSwitchRating: number;
  rcdOptions: string[];
  features: string[];
  priceRange: { min: number; max: number };
  availability: "excellent" | "good" | "limited";
  recommendedFor: string[];
  requiredComponents: string[];
  suppliers: string[];
}

export const CONSUMER_UNIT_DATABASE: Record<string, ConsumerUnitData> = {
  "hager-8way-63a": {
    brand: "Hager",
    model: "VML863C",
    ways: 8,
    mainSwitchRating: 63,
    rcdOptions: ["30mA RCBO", "30mA RCD + MCB"],
    features: ["Metal clad", "Type A RCD", "SPD ready"],
    priceRange: { min: 120, max: 180 },
    availability: "excellent",
    recommendedFor: ["domestic", "small commercial"],
    requiredComponents: ["Main switch", "RCD/RCBO", "MCB", "SPD"],
    suppliers: ["CEF", "Electrical2Go", "City Electrical Factors"]
  },
  "schneider-12way-80a": {
    brand: "Schneider",
    model: "KQ12B080",
    ways: 12,
    mainSwitchRating: 80,
    rcdOptions: ["30mA RCBO", "30mA RCD + MCB", "Type B RCD"],
    features: ["Metal consumer unit", "Easy Connect", "Phase barrier"],
    priceRange: { min: 180, max: 250 },
    availability: "good",
    recommendedFor: ["domestic", "commercial"],
    requiredComponents: ["Main switch", "RCD/RCBO", "MCB", "SPD", "Neutral links"],
    suppliers: ["CEF", "Rexel", "Screwfix Trade"]
  },
  "mk-16way-100a": {
    brand: "MK Electric",
    model: "Sentry MK7516S",
    ways: 16,
    mainSwitchRating: 100,
    rcdOptions: ["30mA RCBO", "30mA RCD + MCB", "Time delay RCD"],
    features: ["Steel enclosure", "Surge protection", "Arc fault detection ready"],
    priceRange: { min: 280, max: 380 },
    availability: "good",
    recommendedFor: ["large domestic", "commercial", "industrial"],
    requiredComponents: ["Main switch", "RCD/RCBO", "MCB", "SPD", "AFDD", "Neutral/Earth bars"],
    suppliers: ["CEF", "Electrical2Go", "TLC Direct"]
  },
  "fusebox-18way-125a": {
    brand: "FuseBox",
    model: "F2018M-125",
    ways: 18,
    mainSwitchRating: 125,
    rcdOptions: ["30mA RCBO", "S-Type RCD", "Selective RCD"],
    features: ["Metal clad", "IP4X rated", "Fire retardant"],
    priceRange: { min: 320, max: 420 },
    availability: "good",
    recommendedFor: ["commercial", "industrial", "large installations"],
    requiredComponents: ["Main switch", "RCD/RCBO", "MCB", "SPD", "Isolators"],
    suppliers: ["CEF", "Rexel", "Electrical Wholesaler"]
  }
};

export const CABLE_PRICING_DATABASE = {
  "1.5mm2-te": {
    size: "1.5mm²",
    type: "T&E",
    priceRange: { min: 45, max: 85 },
    unit: "100m",
    suppliers: ["CEF", "Screwfix", "Electrical2Go"],
    installationComplexity: "low"
  },
  "2.5mm2-te": {
    size: "2.5mm²",
    type: "T&E",
    priceRange: { min: 65, max: 120 },
    unit: "100m",
    suppliers: ["CEF", "Screwfix", "Electrical2Go"],
    installationComplexity: "low"
  },
  "4mm2-te": {
    size: "4mm²",
    type: "T&E",
    priceRange: { min: 95, max: 180 },
    unit: "100m",
    suppliers: ["CEF", "Rexel", "TLC Direct"],
    installationComplexity: "medium"
  },
  "6mm2-te": {
    size: "6mm²",
    type: "T&E",
    priceRange: { min: 140, max: 250 },
    unit: "100m",
    suppliers: ["CEF", "Rexel", "Electrical2Go"],
    installationComplexity: "medium"
  },
  "10mm2-te": {
    size: "10mm²",
    type: "T&E",
    priceRange: { min: 220, max: 380 },
    unit: "100m",
    suppliers: ["CEF", "Rexel", "TLC Direct"],
    installationComplexity: "high"
  },
  "2.5mm2-swa": {
    size: "2.5mm²",
    type: "SWA",
    priceRange: { min: 180, max: 320 },
    unit: "100m",
    suppliers: ["CEF", "Rexel", "Cable Solutions"],
    installationComplexity: "high"
  },
  "4mm2-swa": {
    size: "4mm²",
    type: "SWA",
    priceRange: { min: 250, max: 450 },
    unit: "100m",
    suppliers: ["CEF", "Rexel", "Cable Solutions"],
    installationComplexity: "high"
  }
};

export function getRecommendedConsumerUnit(totalCircuits: number, mainSwitchRating: number): ConsumerUnitData[] {
  const minWays = totalCircuits + 2; // Extra ways for future expansion
  
  return Object.values(CONSUMER_UNIT_DATABASE)
    .filter(unit => unit.ways >= minWays && unit.mainSwitchRating >= mainSwitchRating)
    .sort((a, b) => a.priceRange.min - b.priceRange.min);
}

export function getCablePricing(size: string, type: string) {
  const key = `${size.toLowerCase()}-${type.toLowerCase()}`;
  return CABLE_PRICING_DATABASE[key as keyof typeof CABLE_PRICING_DATABASE];
}