// Off-Grid System Calculation Logic and Cost Assumptions

export interface EfficiencyChainStep {
  stage: string;
  efficiency: number;
  lossKwh: number;
}

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
  efficiencyChain: EfficiencyChainStep[];
  overallEfficiency: number;
  wireLossWarning: string | null;
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
  vatRate: 0.05, // 5% VAT on solar installations in UK
};

// Temperature derating factors for battery capacity
// Batteries lose capacity in cold conditions — important for UK outdoor installations
const TEMP_DERATING: Record<string, Record<string, number>> = {
  lithium: {
    indoor: 1.0, // 20°C nominal
    sheltered: 0.95, // 5-15°C
    outdoor: 0.9, // 0-5°C winter average
  },
  agm: {
    indoor: 1.0,
    sheltered: 0.9, // AGM more affected by cold
    outdoor: 0.8, // Significant capacity loss below 5°C
  },
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
  peakPowerKw?: number;
  batteryLocation?: 'indoor' | 'sheltered' | 'outdoor';
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
    batteryType = 'lithium',
    peakPowerKw,
    batteryLocation = 'sheltered',
  } = inputs;

  const efficiency = systemEfficiency / 100;
  const dod = depthOfDischarge / 100;

  // Temperature derating for battery capacity
  const tempDerate = TEMP_DERATING[batteryType]?.[batteryLocation] ?? 1.0;

  // Solar calculations with safety margins
  const requiredSolarCapacity = dailyConsumption / peakSunHours / efficiency;
  const numberOfPanels = Math.ceil((requiredSolarCapacity * 1000) / panelWattage);
  const actualSolarCapacity = (numberOfPanels * panelWattage) / 1000;

  // Battery calculations — derate capacity for temperature
  const effectiveBatteryCapacity = batteryCapacity * tempDerate;
  const requiredBatteryCapacity = (dailyConsumption * autonomyDays * 1000) / (systemVoltage * dod);
  const usableBatteryCapacity = effectiveBatteryCapacity * dod;
  const numberOfBatteries = Math.ceil(requiredBatteryCapacity / usableBatteryCapacity);
  const totalBatteryCapacity = numberOfBatteries * batteryCapacity;

  // Inverter sizing: from peak power draw (kW), NOT daily energy (kWh)
  // peakPowerKw is the maximum instantaneous load the system must support
  // Falls back to a rough estimate if not provided: dailyConsumption / 6 (assumes 6h avg usage)
  const estimatedPeakKw = peakPowerKw ?? dailyConsumption / 6;
  const inverterSize = estimatedPeakKw * 1.25; // 25% oversizing for surge/inrush

  const chargeControllerSize = (numberOfPanels * panelWattage * 1.25) / systemVoltage;

  // Energy balance
  const actualSolarGeneration = (numberOfPanels * panelWattage * peakSunHours) / 1000;
  const dailyEnergyBalance = actualSolarGeneration - dailyConsumption;

  // Cost calculations
  const panelCost = numberOfPanels * panelWattage * COST_ASSUMPTIONS.solarPanel;
  const batteryCost =
    numberOfBatteries *
    batteryCapacity *
    batteryVoltage *
    (batteryType === 'lithium' ? COST_ASSUMPTIONS.batteryLithium : COST_ASSUMPTIONS.batteryAGM);
  const inverterCost = inverterSize * COST_ASSUMPTIONS.inverterPure;
  const controllerCost = chargeControllerSize * COST_ASSUMPTIONS.chargeController;
  const wiringCost =
    (panelCost + batteryCost + inverterCost + controllerCost) * COST_ASSUMPTIONS.wiringPercent;
  const mountingCost = panelCost * COST_ASSUMPTIONS.mountingPercent;

  const subtotal =
    panelCost + batteryCost + inverterCost + controllerCost + wiringCost + mountingCost;
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
    total: systemCost,
  };

  // Generate recommendations and warnings
  const recommendations: string[] = [];
  const warnings: string[] = [];

  // System rating logic
  let systemRating: OffGridResult['systemRating'] = 'adequate';

  if (dailyEnergyBalance < 0) {
    warnings.push('System will not meet daily energy needs — increase solar capacity');
    systemRating = 'inadequate';
  } else if (dailyEnergyBalance < dailyConsumption * 0.1) {
    warnings.push('Very tight energy margin — consider adding more panels');
    systemRating = 'marginal';
  } else if (dailyEnergyBalance > dailyConsumption * 0.3) {
    recommendations.push('Excellent energy margin provides buffer for cloudy periods');
    systemRating = dailyEnergyBalance > dailyConsumption * 0.5 ? 'excellent' : 'good';
  }

  if (autonomyDays < 2) {
    warnings.push('Low autonomy — system may struggle during extended cloudy periods');
  } else if (autonomyDays >= 4) {
    recommendations.push('Good autonomy provides security during poor weather');
  }

  if (systemVoltage === 12 && dailyConsumption > 8) {
    recommendations.push('Consider 24V or 48V system for better efficiency at this power level');
  }

  if (systemEfficiency < 80) {
    warnings.push('Low system efficiency — check component specifications');
  }

  if (depthOfDischarge > 80 && batteryType === 'agm') {
    warnings.push('Deep discharge reduces AGM battery life — consider lithium batteries');
  }

  // Temperature derating warning
  if (batteryLocation === 'outdoor') {
    warnings.push(
      `Outdoor battery placement: ${batteryType === 'lithium' ? '10%' : '20%'} capacity derating applied for cold weather`
    );
  }

  // UK-specific recommendations
  if (peakSunHours > 4.5) {
    recommendations.push('Optimistic sun hours for UK — consider reducing to 3–4 hours');
  }

  recommendations.push(
    `${batteryType === 'lithium' ? 'LiFePO4' : 'AGM'} batteries selected — ${batteryType === 'lithium' ? 'excellent choice for longevity' : 'cost-effective option'}`
  );

  // Efficiency chain — show where energy is lost from panel to load
  const panelSoilingMismatch = 0.97; // 3% soiling + mismatch
  const controllerEfficiency = 0.95; // MPPT tracking losses
  const batteryRoundTrip = (batteryType === 'lithium' ? 98 : 85) / 100;
  const inverterEfficiency = 0.93; // Typical pure sine wave
  const wireLoss = systemVoltage <= 12 ? 0.95 : systemVoltage <= 24 ? 0.97 : 0.99;

  const grossDaily = actualSolarGeneration;
  const afterPanel = grossDaily * panelSoilingMismatch;
  const afterController = afterPanel * controllerEfficiency;
  const afterBattery = afterController * batteryRoundTrip;
  const afterInverter = afterBattery * inverterEfficiency;
  const afterWire = afterInverter * wireLoss;

  const efficiencyChain: EfficiencyChainStep[] = [
    {
      stage: 'Panel (soiling/mismatch)',
      efficiency: panelSoilingMismatch * 100,
      lossKwh: grossDaily - afterPanel,
    },
    {
      stage: 'Charge controller (MPPT)',
      efficiency: controllerEfficiency * 100,
      lossKwh: afterPanel - afterController,
    },
    {
      stage: `Battery (${batteryType === 'lithium' ? 'LiFePO4' : 'AGM'})`,
      efficiency: batteryRoundTrip * 100,
      lossKwh: afterController - afterBattery,
    },
    {
      stage: 'Inverter (pure sine)',
      efficiency: inverterEfficiency * 100,
      lossKwh: afterBattery - afterInverter,
    },
    { stage: 'Wiring losses', efficiency: wireLoss * 100, lossKwh: afterInverter - afterWire },
  ];
  const overallEfficiency =
    panelSoilingMismatch *
    controllerEfficiency *
    batteryRoundTrip *
    inverterEfficiency *
    wireLoss *
    100;

  // Wire loss warning for low-voltage systems
  let wireLossWarning: string | null = null;
  if (systemVoltage <= 12 && dailyConsumption > 5) {
    wireLossWarning =
      '12V systems have high cable currents. Use short, heavy-gauge cables to minimise voltage drop. Consider upgrading to 24V or 48V.';
  } else if (systemVoltage <= 24 && dailyConsumption > 15) {
    wireLossWarning =
      '24V system with high load — check cable sizing carefully. 48V would reduce wire losses significantly.';
  }

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
    efficiencyChain,
    overallEfficiency,
    wireLossWarning,
    recommendations,
    warnings,
    systemRating,
  };
};
