// Off-Grid System Presets for common UK scenarios

export interface OffGridPreset {
  name: string;
  description: string;
  scenario: string;
  dailyConsumption: string;
  peakSunHours: string;
  autonomyDays: string;
  systemVoltage: string;
  panelWattage: string;
  batteryCapacity: string;
  batteryVoltage: string;
  depthOfDischarge: string;
  systemEfficiency: string;
}

export const OFFGRID_PRESETS: OffGridPreset[] = [
  {
    name: "Small Cabin",
    description: "Basic lighting, phone charging, small fridge",
    scenario: "Remote cabin with minimal electrical needs",
    dailyConsumption: "5",
    peakSunHours: "3.5",
    autonomyDays: "3",
    systemVoltage: "12",
    panelWattage: "400",
    batteryCapacity: "100",
    batteryVoltage: "12",
    depthOfDischarge: "80",
    systemEfficiency: "85"
  },
  {
    name: "Workshop/Shed",
    description: "Power tools, lighting, workbench equipment",
    scenario: "Garden workshop needing occasional power tools",
    dailyConsumption: "8",
    peakSunHours: "3.5",
    autonomyDays: "2",
    systemVoltage: "24",
    panelWattage: "400",
    batteryCapacity: "200",
    batteryVoltage: "12",
    depthOfDischarge: "80",
    systemEfficiency: "85"
  },
  {
    name: "Holiday Home",
    description: "Full appliances, TV, computer, kitchen equipment",
    scenario: "Weekend retreat with modern amenities",
    dailyConsumption: "15",
    peakSunHours: "3.5",
    autonomyDays: "4",
    systemVoltage: "48",
    panelWattage: "400",
    batteryCapacity: "200",
    batteryVoltage: "12",
    depthOfDischarge: "80",
    systemEfficiency: "85"
  },
  {
    name: "Caravan/RV",
    description: "Mobile off-grid setup for touring",
    scenario: "Self-contained vehicle with all essentials",
    dailyConsumption: "6",
    peakSunHours: "4",
    autonomyDays: "2",
    systemVoltage: "12",
    panelWattage: "200",
    batteryCapacity: "100",
    batteryVoltage: "12",
    depthOfDischarge: "80",
    systemEfficiency: "80"
  },
  {
    name: "Farm Outbuilding",
    description: "Agricultural building with equipment needs",
    scenario: "Barn or stable requiring reliable power",
    dailyConsumption: "12",
    peakSunHours: "3.5",
    autonomyDays: "3",
    systemVoltage: "24",
    panelWattage: "400",
    batteryCapacity: "200",
    batteryVoltage: "12",
    depthOfDischarge: "80",
    systemEfficiency: "85"
  }
];

export const getPresetByName = (name: string): OffGridPreset | undefined => {
  return OFFGRID_PRESETS.find(preset => preset.name === name);
};