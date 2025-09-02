export interface MarineInputs {
  vesselType: string;
  vesselLength: number;
  systemVoltage: number;
  
  // Load calculations
  navigationLights: number;
  cabinLights: number;
  galleyLoad: number;
  freshWaterPump: number;
  bilgePump: number;
  ventilationFans: number;
  electronics: number;
  winch: number;
  additionalLoad: number;
  
  // Usage patterns
  dailyUsageHours: number;
  motoring: number; // percentage of time motoring
  anchored: number; // percentage of time anchored
  
  // Battery specifications
  batteryType: string;
  batteryVoltage: number;
  maxDischarge: number; // percentage
  
  // Charging systems
  alternatorRating: number;
  solarPanels: number;
  windGenerator: number;
  shoreCharger: number;
  
  // Cable specifications
  cableLength: number;
  voltageDropLimit: number;
  
  // Environmental
  temperature: number;
  saltwaterExposure: boolean;
}

export interface MarineResults {
  // Load analysis
  totalContinuousLoad: number;
  totalIntermittentLoad: number;
  peakLoad: number;
  dailyEnergyConsumption: number;
  
  // Battery sizing
  requiredBatteryCapacity: number;
  recommendedBatteryCapacity: number;
  batteryBankVoltage: number;
  numberOfBatteries: number;
  
  // Charging analysis
  totalChargingCapacity: number;
  chargingDeficit: number;
  timeToFullCharge: number;
  energyBalance: number;
  
  // Inverter sizing
  recommendedInverterSize: number;
  inverterType: string;
  
  // Cable sizing
  recommendedCableSize: number;
  actualVoltageDropPercentage: number;
  cableType: string;
  
  // Safety & compliance
  complianceChecks: Array<{
    regulation: string;
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

export const vesselTypeOptions = [
  { value: "yacht", label: "Motor Yacht" },
  { value: "sailing", label: "Sailing Yacht" },
  { value: "fishing", label: "Fishing Vessel" },
  { value: "commercial", label: "Commercial Vessel" },
  { value: "workboat", label: "Work Boat" }
];

export const batteryTypeOptions = [
  { value: "lead-acid", label: "Lead Acid (Flooded)" },
  { value: "agm", label: "AGM (Absorbed Glass Mat)" },
  { value: "gel", label: "Gel Cell" },
  { value: "lithium", label: "Lithium Ion (LiFePO4)" }
];

export const systemVoltageOptions = [
  { value: 12, label: "12V DC" },
  { value: 24, label: "24V DC" },
  { value: 48, label: "48V DC" }
];

export function calculateMarine(inputs: MarineInputs): MarineResults {
  const {
    vesselType,
    vesselLength,
    systemVoltage,
    navigationLights,
    cabinLights,
    galleyLoad,
    freshWaterPump,
    bilgePump,
    ventilationFans,
    electronics,
    winch,
    additionalLoad,
    dailyUsageHours,
    motoring,
    anchored,
    batteryType,
    batteryVoltage,
    maxDischarge,
    alternatorRating,
    solarPanels,
    windGenerator,
    shoreCharger,
    cableLength,
    voltageDropLimit,
    temperature,
    saltwaterExposure
  } = inputs;

  // Load analysis
  const continuousLoads = navigationLights + cabinLights + electronics + ventilationFans;
  const intermittentLoads = galleyLoad + freshWaterPump + bilgePump + winch + additionalLoad;
  const totalContinuousLoad = continuousLoads;
  const totalIntermittentLoad = intermittentLoads;
  const peakLoad = totalContinuousLoad + totalIntermittentLoad;

  // Daily energy consumption (Ah)
  const continuousAh = (totalContinuousLoad * dailyUsageHours) / systemVoltage;
  const intermittentAh = (totalIntermittentLoad * (dailyUsageHours * 0.3)) / systemVoltage; // Assume 30% duty cycle
  const dailyEnergyConsumption = continuousAh + intermittentAh;

  // Battery sizing with Peukert effect and temperature compensation
  const getBatteryDepthOfDischarge = (type: string) => {
    const dod = {
      "lead-acid": 50,
      "agm": 80,
      "gel": 80,
      "lithium": 90
    };
    return dod[type as keyof typeof dod] || 50;
  };

  const temperatureFactor = 1 + ((20 - temperature) * 0.008); // Temperature derating
  const autonomyDays = vesselType === "commercial" ? 3 : 2; // Safety margin
  
  const usableDepth = Math.min(maxDischarge, getBatteryDepthOfDischarge(batteryType)) / 100;
  const requiredBatteryCapacity = (dailyEnergyConsumption * autonomyDays * temperatureFactor) / usableDepth;
  
  // Round up to nearest 50Ah for practical battery sizing
  const recommendedBatteryCapacity = Math.ceil(requiredBatteryCapacity / 50) * 50;
  
  // Battery bank configuration
  const batteryBankVoltage = batteryVoltage;
  const numberOfBatteries = Math.ceil(recommendedBatteryCapacity / 100); // Assume 100Ah nominal per battery

  // Charging analysis
  const totalChargingCapacity = alternatorRating + solarPanels + windGenerator + shoreCharger;
  const chargingDeficit = dailyEnergyConsumption - (totalChargingCapacity * 0.8 * (dailyUsageHours * 0.5)); // 80% efficiency, 50% of day charging
  const timeToFullCharge = recommendedBatteryCapacity / (totalChargingCapacity * 0.8);
  const energyBalance = totalChargingCapacity * 8 - dailyEnergyConsumption; // 8 hours average charging per day

  // Inverter sizing (125% of peak AC load for safety margin)
  const acLoads = galleyLoad + cabinLights; // Assume some loads are AC
  const recommendedInverterSize = Math.ceil((acLoads * 1.25) / 100) * 100;
  const inverterType = recommendedInverterSize > 1000 ? "Pure Sine Wave" : "Modified Sine Wave";

  // Cable sizing calculation
  const calculateCableSize = () => {
    const current = peakLoad / systemVoltage;
    const resistance = (systemVoltage * voltageDropLimit / 100) / current;
    const cableResistance = resistance / (2 * cableLength / 1000); // Round trip in km
    
    // Marine cable sizes (mm²) and their resistance (mΩ/m)
    const cableSizes = [
      { size: 1.5, resistance: 12.1 },
      { size: 2.5, resistance: 7.41 },
      { size: 4, resistance: 4.61 },
      { size: 6, resistance: 3.08 },
      { size: 10, resistance: 1.83 },
      { size: 16, resistance: 1.15 },
      { size: 25, resistance: 0.727 },
      { size: 35, resistance: 0.524 },
      { size: 50, resistance: 0.387 },
      { size: 70, resistance: 0.268 },
      { size: 95, resistance: 0.193 }
    ];

    const suitableCable = cableSizes.find(cable => cable.resistance <= cableResistance);
    const selectedCable = suitableCable || cableSizes[cableSizes.length - 1];
    
    const actualVoltageDrop = (current * selectedCable.resistance * 2 * cableLength / 1000) / systemVoltage * 100;
    
    return {
      size: selectedCable.size,
      voltageDropPercentage: actualVoltageDrop
    };
  };

  const cableCalc = calculateCableSize();
  const recommendedCableSize = cableCalc.size;
  const actualVoltageDropPercentage = cableCalc.voltageDropPercentage;
  const cableType = saltwaterExposure ? "Tinned Copper Marine Grade" : "Standard Marine Cable";

  // Compliance checks
  const complianceChecks: Array<{
    regulation: string;
    status: 'compliant' | 'warning' | 'non-compliant';
    message: string;
  }> = [
    {
      regulation: "ISO 13297 (Small Craft Electrical Systems)",
      status: (systemVoltage <= 50 && actualVoltageDropPercentage <= voltageDropLimit) ? 'compliant' : 'warning',
      message: systemVoltage <= 50 ? "Voltage within safe extra-low voltage range" : "Voltage exceeds SELV limits"
    },
    {
      regulation: "ABYC E-11 (AC & DC Electrical Systems)",
      status: (actualVoltageDropPercentage <= 10) ? 'compliant' : 'non-compliant',
      message: actualVoltageDropPercentage <= 3 ? "Excellent voltage drop" : 
               actualVoltageDropPercentage <= 10 ? "Acceptable voltage drop" : "Voltage drop exceeds 10% limit"
    },
    {
      regulation: "RCD Protection (IEC 60364-7-709)",
      status: saltwaterExposure ? 'warning' : 'compliant',
      message: saltwaterExposure ? "RCD protection essential for saltwater environment" : "Standard protection adequate"
    },
    {
      regulation: "Battery Ventilation",
      status: (batteryType === "lithium" || vesselLength > 12) ? 'compliant' : 'warning',
      message: batteryType === "lead-acid" ? "Ensure adequate ventilation for lead-acid batteries" : "LiFePO4 batteries have minimal gas emission"
    }
  ];

  // Recommendations
  const recommendations = [];

  if (chargingDeficit > 0) {
    recommendations.push({
      category: "Charging",
      priority: "high" as const,
      message: `Charging deficit of ${chargingDeficit.toFixed(1)}Ah per day - increase charging capacity`,
      impact: "Risk of battery discharge during extended trips"
    });
  }

  if (energyBalance < dailyEnergyConsumption * 0.2) {
    recommendations.push({
      category: "Energy Management",
      priority: "medium" as const,
      message: "Low energy surplus - consider adding solar panels or wind generation",
      impact: "Limited reserve capacity for unexpected consumption"
    });
  }

  if (batteryType === "lead-acid" && vesselType === "yacht") {
    recommendations.push({
      category: "Battery Technology",
      priority: "medium" as const,
      message: "Consider upgrading to LiFePO4 batteries for better performance and longevity",
      impact: "50% weight reduction and 3x longer lifespan"
    });
  }

  if (actualVoltageDropPercentage > 3) {
    recommendations.push({
      category: "Cable Sizing",
      priority: "medium" as const,
      message: "Consider larger cable size to reduce voltage drop",
      impact: "Improved equipment performance and efficiency"
    });
  }

  if (saltwaterExposure && !vesselType.includes("commercial")) {
    recommendations.push({
      category: "Corrosion Protection",
      priority: "high" as const,
      message: "Install galvanic isolator and use tinned copper wiring throughout",
      impact: "Prevention of galvanic corrosion and extended system life"
    });
  }

  if (peakLoad / systemVoltage > 100) {
    recommendations.push({
      category: "System Voltage",
      priority: "high" as const,
      message: "Consider upgrading to 24V or 48V system to reduce current and cable sizes",
      impact: "Reduced cable costs and improved efficiency"
    });
  }

  return {
    totalContinuousLoad,
    totalIntermittentLoad,
    peakLoad,
    dailyEnergyConsumption,
    requiredBatteryCapacity,
    recommendedBatteryCapacity,
    batteryBankVoltage,
    numberOfBatteries,
    totalChargingCapacity,
    chargingDeficit,
    timeToFullCharge,
    energyBalance,
    recommendedInverterSize,
    inverterType,
    recommendedCableSize,
    actualVoltageDropPercentage,
    cableType,
    complianceChecks,
    recommendations
  };
}