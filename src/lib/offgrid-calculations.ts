// Off-Grid System Calculation Logic and Cost Assumptions

export interface OffGridResult {
  requiredSolarCapacity: number;
  requiredBatteryCapacity: number;
  numberOfPanels: number;
  numberOfBatteries: number;
  inverterSize: number;
  chargeControllerSize: number;
  systemCost: number;
  dailyEnergyBalance: number;
  autonomyDays: number;
  costBreakdown: CostBreakdown;
  recommendations: string[];
  warnings: string[];
  systemRating: 'excellent' | 'good' | 'adequate' | 'marginal' | 'inadequate';
}

export interface CostBreakdown {
  panels: number;
  batteries: number;
  inverter: number;
  chargeController: number;
  wiring: number;
  mounting: number;
  installation: number;
  total: number;
}

// 2025 UK Cost Assumptions (including VAT)
export const COST_ASSUMPTIONS = {
  solarPanel: 0.65, // £/W - Quality panels with 25yr warranty
  batteryLithium: 8.5, // £/Ah/V - LiFePO4 batteries
  batteryAGM: 4.2, // £/Ah/V - AGM deep cycle
  inverterPure: 120, // £/kW - Pure sine wave inverter
  chargeController: 55, // £/A - MPPT charge controller
  wiringPercent: 0.08, // 8% of component cost
  mountingPercent: 0.12, // 12% of panel cost
  installationPercent: 0.15, // 15% of total for professional install
  vatRate: 0.05 // 5% VAT on solar installations in UK
};

export const calculateOffGridSystem = (inputs: {
  dailyConsumption: number;
  peakSunHours: number;
  autonomyDays: number;
  systemVoltage: number;
  panelWattage: number;
  batteryCapacity: number;
  batteryVoltage: number;
  depthOfDischarge: number;
  systemEfficiency: number;
  batteryType?: 'lithium' | 'agm';
}): OffGridResult => {
  const {
    dailyConsumption,
    peakSunHours,
    autonomyDays,
    systemVoltage,
    panelWattage,
    batteryCapacity,
    batteryVoltage,
    depthOfDischarge,
    systemEfficiency,
    batteryType = 'lithium'
  } = inputs;

  const efficiency = systemEfficiency / 100;
  const dod = depthOfDischarge / 100;

  // Solar calculations with safety margins
  const requiredSolarCapacity = (dailyConsumption / peakSunHours) / efficiency;
  const numberOfPanels = Math.ceil(requiredSolarCapacity * 1000 / panelWattage);
  const actualSolarCapacity = numberOfPanels * panelWattage / 1000;

  // Battery calculations
  const requiredBatteryCapacity = (dailyConsumption * autonomyDays * 1000) / (systemVoltage * dod);
  const usableBatteryCapacity = batteryCapacity * dod;
  const numberOfBatteries = Math.ceil(requiredBatteryCapacity / usableBatteryCapacity);
  const totalBatteryCapacity = numberOfBatteries * batteryCapacity;

  // Component sizing (with safety margins)
  const inverterSize = dailyConsumption * 1.25; // 25% oversizing for peak loads
  const chargeControllerSize = (numberOfPanels * panelWattage) * 1.25 / systemVoltage;

  // Energy balance
  const actualSolarGeneration = numberOfPanels * panelWattage * peakSunHours / 1000;
  const dailyEnergyBalance = actualSolarGeneration - dailyConsumption;

  // Cost calculations
  const panelCost = numberOfPanels * panelWattage * COST_ASSUMPTIONS.solarPanel;
  const batteryCost = numberOfBatteries * batteryCapacity * batteryVoltage * 
    (batteryType === 'lithium' ? COST_ASSUMPTIONS.batteryLithium : COST_ASSUMPTIONS.batteryAGM);
  const inverterCost = inverterSize * COST_ASSUMPTIONS.inverterPure;
  const controllerCost = chargeControllerSize * COST_ASSUMPTIONS.chargeController;
  const wiringCost = (panelCost + batteryCost + inverterCost + controllerCost) * COST_ASSUMPTIONS.wiringPercent;
  const mountingCost = panelCost * COST_ASSUMPTIONS.mountingPercent;
  
  const subtotal = panelCost + batteryCost + inverterCost + controllerCost + wiringCost + mountingCost;
  const installationCost = subtotal * COST_ASSUMPTIONS.installationPercent;
  const totalPreVAT = subtotal + installationCost;
  const vatAmount = totalPreVAT * COST_ASSUMPTIONS.vatRate;
  const systemCost = totalPreVAT + vatAmount;

  const costBreakdown: CostBreakdown = {
    panels: panelCost,
    batteries: batteryCost,
    inverter: inverterCost,
    chargeController: controllerCost,
    wiring: wiringCost,
    mounting: mountingCost,
    installation: installationCost,
    total: systemCost
  };

  // Generate recommendations and warnings
  const recommendations: string[] = [];
  const warnings: string[] = [];

  // System rating logic
  let systemRating: OffGridResult['systemRating'] = 'adequate';
  
  if (dailyEnergyBalance < 0) {
    warnings.push("System will not meet daily energy needs - increase solar capacity");
    systemRating = 'inadequate';
  } else if (dailyEnergyBalance < dailyConsumption * 0.1) {
    warnings.push("Very tight energy margin - consider adding more panels");
    systemRating = 'marginal';
  } else if (dailyEnergyBalance > dailyConsumption * 0.3) {
    recommendations.push("Excellent energy margin provides buffer for cloudy periods");
    systemRating = dailyEnergyBalance > dailyConsumption * 0.5 ? 'excellent' : 'good';
  }

  if (autonomyDays < 2) {
    warnings.push("Low autonomy - system may struggle during extended cloudy periods");
  } else if (autonomyDays >= 4) {
    recommendations.push("Good autonomy provides security during poor weather");
  }

  if (systemVoltage === 12 && dailyConsumption > 8) {
    recommendations.push("Consider 24V or 48V system for better efficiency at this power level");
  }

  if (systemEfficiency < 80) {
    warnings.push("Low system efficiency - check component specifications");
  }

  if (depthOfDischarge > 80 && batteryType === 'agm') {
    warnings.push("Deep discharge reduces AGM battery life - consider lithium batteries");
  }

  // UK-specific recommendations
  if (peakSunHours > 4.5) {
    recommendations.push("Optimistic sun hours for UK - consider reducing to 3-4 hours");
  }

  recommendations.push(`${batteryType === 'lithium' ? 'LiFePO4' : 'AGM'} batteries selected - ${batteryType === 'lithium' ? 'excellent choice for longevity' : 'cost-effective option'}`);
  
  return {
    requiredSolarCapacity,
    requiredBatteryCapacity,
    numberOfPanels,
    numberOfBatteries,
    inverterSize,
    chargeControllerSize,
    systemCost,
    dailyEnergyBalance,
    autonomyDays,
    costBreakdown,
    recommendations,
    warnings,
    systemRating
  };
};