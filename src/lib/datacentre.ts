export interface DataCentreInputs {
  itLoad: number;
  redundancy: string;
  coolingMethod: string;
  coolingRatio: number;
  lightsAndMisc: number;
  upsBatteryHours: number;
  upsEfficiency: number;
  powerRedundancy: string;
  coolingRedundancy: string;
  energyCost: number;
  carbonFactor: number;
  designMargin: number;
  facilityType: string;
  climateZone: string;
}

export interface DataCentreResults {
  // Load calculations
  totalItLoad: number;
  coolingLoad: number;
  lightsLoad: number;
  totalFacilityLoad: number;
  
  // Infrastructure sizing
  upsCapacity: number;
  generatorCapacity: number;
  batteryCapacity: number;
  coolingCapacity: number;
  
  // Efficiency metrics
  pue: number;
  dcie: number;
  
  // Annual consumption
  annualKwh: number;
  annualCost: number;
  annualCo2e: number;
  
  // Capacity planning
  capacityHeadroom: number;
  maxItLoadCapacity: number;
  
  // Cost breakdown
  estimatedCapitalCost: number;
  annualOperatingCost: number;
  
  // Compliance & recommendations
  complianceStatus: Array<{
    standard: string;
    status: 'compliant' | 'warning' | 'non-compliant';
    message: string;
  }>;
  
  recommendations: Array<{
    category: string;
    priority: 'high' | 'medium' | 'low';
    message: string;
    impact: string;
  }>;
}

export const redundancyOptions = [
  { value: "n", label: "N (No Redundancy)" },
  { value: "n+1", label: "N+1 (Single Redundancy)" },
  { value: "2n", label: "2N (Full Redundancy)" },
  { value: "2n+1", label: "2N+1 (Beyond Redundancy)" }
];

export const coolingMethodOptions = [
  { value: "air", label: "Air Cooled CRAC/CRAH" },
  { value: "water", label: "Water Cooled Chiller" },
  { value: "dx", label: "Direct Expansion (DX)" },
  { value: "free", label: "Free Cooling" },
  { value: "immersion", label: "Immersion Cooling" }
];

export const facilityTypeOptions = [
  { value: "enterprise", label: "Enterprise Data Centre" },
  { value: "colocation", label: "Colocation Facility" },
  { value: "edge", label: "Edge Data Centre" },
  { value: "hyperscale", label: "Hyperscale Facility" },
  { value: "micro", label: "Micro Data Centre" }
];

export const climateZoneOptions = [
  { value: "temperate", label: "Temperate (UK)" },
  { value: "cold", label: "Cold Climate" },
  { value: "hot", label: "Hot Climate" },
  { value: "humid", label: "Hot & Humid" }
];

export function calculateDataCentre(inputs: DataCentreInputs): DataCentreResults {
  const {
    itLoad,
    redundancy,
    coolingMethod,
    coolingRatio,
    lightsAndMisc,
    upsBatteryHours,
    upsEfficiency,
    powerRedundancy,
    coolingRedundancy,
    energyCost,
    carbonFactor,
    designMargin,
    facilityType,
    climateZone
  } = inputs;

  // Redundancy multipliers
  const getRedundancyMultiplier = (level: string) => {
    switch (level) {
      case "n": return 1;
      case "n+1": return 1.25;
      case "2n": return 2;
      case "2n+1": return 2.25;
      default: return 1;
    }
  };

  const powerRedundancyMultiplier = getRedundancyMultiplier(powerRedundancy);
  const coolingRedundancyMultiplier = getRedundancyMultiplier(coolingRedundancy);

  // Load calculations
  const totalItLoad = itLoad * powerRedundancyMultiplier;
  
  // Cooling efficiency by method
  const getCoolingEfficiency = (method: string, climate: string) => {
    const baseRatios = {
      air: 1.5,
      water: 1.2,
      dx: 1.4,
      free: 0.8,
      immersion: 0.1
    };
    
    const climateModifier = climate === "temperate" ? 0.9 : 
                           climate === "cold" ? 0.8 : 1.1;
    
    return (baseRatios[method as keyof typeof baseRatios] || 1.5) * climateModifier;
  };

  const adjustedCoolingRatio = getCoolingEfficiency(coolingMethod, climateZone);
  const coolingLoad = totalItLoad * adjustedCoolingRatio * coolingRedundancyMultiplier;
  const lightsLoad = totalItLoad * (lightsAndMisc / 100);
  const totalFacilityLoad = totalItLoad + coolingLoad + lightsLoad;

  // Infrastructure sizing with design margin
  const marginMultiplier = 1 + (designMargin / 100);
  const upsCapacity = (totalFacilityLoad / (upsEfficiency / 100)) * marginMultiplier;
  const generatorCapacity = upsCapacity * 1.25; // Starting loads
  const batteryCapacity = totalFacilityLoad * (upsBatteryHours / 60);
  const coolingCapacity = coolingLoad * marginMultiplier;

  // Efficiency metrics
  const pue = totalFacilityLoad / totalItLoad;
  const dcie = (totalItLoad / totalFacilityLoad) * 100;

  // Annual calculations (assuming 8760 hours/year)
  const annualKwh = totalFacilityLoad * 8760;
  const annualCost = annualKwh * energyCost;
  const annualCo2e = annualKwh * carbonFactor;

  // Capacity planning
  const capacityHeadroom = ((upsCapacity - totalFacilityLoad) / upsCapacity) * 100;
  const maxItLoadCapacity = (upsCapacity * (upsEfficiency / 100) * (totalItLoad / totalFacilityLoad)) / powerRedundancyMultiplier;

  // Cost estimation
  const getCapitalCostPerKw = (type: string) => {
    const costs = {
      enterprise: 15000,
      colocation: 18000,
      edge: 12000,
      hyperscale: 20000,
      micro: 10000
    };
    return costs[type as keyof typeof costs] || 15000;
  };

  const capitalCostPerKw = getCapitalCostPerKw(facilityType);
  const estimatedCapitalCost = (upsCapacity / 1000) * capitalCostPerKw;
  const annualOperatingCost = annualCost + (estimatedCapitalCost * 0.05); // 5% of capex for O&M

  // Compliance checks
  const complianceStatus: Array<{
    standard: string;
    status: 'compliant' | 'warning' | 'non-compliant';
    message: string;
  }> = [
    {
      standard: "BS EN 50600",
      status: (pue <= 2.0 && redundancy !== "n") ? 'compliant' : 'warning',
      message: pue <= 2.0 ? "PUE within efficient range" : "PUE above 2.0 - consider efficiency improvements"
    },
    {
      standard: "TIA-942",
      status: (redundancy === "2n" || redundancy === "2n+1") ? 'compliant' : 'warning',
      message: redundancy === "n" ? "No redundancy - single point of failure risk" : 
               redundancy === "n+1" ? "Basic redundancy - consider 2N for critical loads" : "Full redundancy achieved"
    },
    {
      standard: "ASHRAE TC 9.9",
      status: (coolingMethod === "free" || pue <= 1.5) ? 'compliant' : 'warning',
      message: pue <= 1.3 ? "Excellent efficiency" : pue <= 1.5 ? "Good efficiency" : "Consider efficiency improvements"
    }
  ];

  // Recommendations
  const recommendations = [];

  if (pue > 1.8) {
    recommendations.push({
      category: "Efficiency",
      priority: "high" as const,
      message: "PUE is high - consider hot/cold aisle containment, variable speed drives, or free cooling",
      impact: `Could reduce annual costs by £${(annualCost * 0.2).toLocaleString()}`
    });
  }

  if (capacityHeadroom < 20) {
    recommendations.push({
      category: "Capacity",
      priority: "high" as const,
      message: "Low capacity headroom - plan for infrastructure expansion",
      impact: "Risk of capacity constraints with growth"
    });
  }

  if (redundancy === "n") {
    recommendations.push({
      category: "Resilience",
      priority: "high" as const,
      message: "No redundancy increases downtime risk - consider N+1 minimum",
      impact: "Single point of failure could cause complete outage"
    });
  }

  if (coolingMethod === "air" && climateZone === "temperate") {
    recommendations.push({
      category: "Efficiency",
      priority: "medium" as const,
      message: "Consider free cooling in temperate climate",
      impact: `Potential 30% cooling energy reduction = £${(annualCost * 0.3 * (coolingLoad / totalFacilityLoad)).toLocaleString()} annually`
    });
  }

  if (batteryCapacity / totalFacilityLoad < 0.25) {
    recommendations.push({
      category: "Resilience",
      priority: "medium" as const,
      message: "Short battery runtime - consider extending for generator start reliability",
      impact: "Risk during generator maintenance or extended outages"
    });
  }

  return {
    totalItLoad,
    coolingLoad,
    lightsLoad,
    totalFacilityLoad,
    upsCapacity,
    generatorCapacity,
    batteryCapacity,
    coolingCapacity,
    pue,
    dcie,
    annualKwh,
    annualCost,
    annualCo2e,
    capacityHeadroom,
    maxItLoadCapacity,
    estimatedCapitalCost,
    annualOperatingCost,
    complianceStatus,
    recommendations
  };
}