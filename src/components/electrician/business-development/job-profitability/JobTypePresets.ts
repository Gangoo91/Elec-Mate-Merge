export interface JobPreset {
  id: string;
  name: string;
  category: string;
  description: string;
  defaults: {
    labourHours: number;
    hourlyRate: number;
    overheadPercentage: number;
    desiredProfitMargin: number;
  };
}

export const jobTypePresets: JobPreset[] = [
  // Domestic Work
  {
    id: "domestic-socket",
    name: "Additional Socket Installation",
    category: "Domestic",
    description: "Standard single socket addition with cable run",
    defaults: {
      labourHours: 2,
      hourlyRate: 45,
      overheadPercentage: 20,
      desiredProfitMargin: 25
    }
  },
  {
    id: "domestic-lighting",
    name: "Lighting Circuit Installation",
    category: "Domestic",
    description: "New lighting circuit with multiple points",
    defaults: {
      labourHours: 6,
      hourlyRate: 45,
      overheadPercentage: 20,
      desiredProfitMargin: 25
    }
  },
  {
    id: "domestic-cooker",
    name: "Cooker Circuit Installation",
    category: "Domestic",
    description: "Dedicated cooker circuit with isolation switch",
    defaults: {
      labourHours: 4,
      hourlyRate: 45,
      overheadPercentage: 20,
      desiredProfitMargin: 25
    }
  },
  {
    id: "domestic-shower",
    name: "Electric Shower Installation",
    category: "Domestic",
    description: "New shower circuit with RCD protection",
    defaults: {
      labourHours: 5,
      hourlyRate: 45,
      overheadPercentage: 20,
      desiredProfitMargin: 25
    }
  },
  {
    id: "domestic-consumer-unit",
    name: "Consumer Unit Replacement",
    category: "Domestic",
    description: "Full CU upgrade with testing",
    defaults: {
      labourHours: 8,
      hourlyRate: 45,
      overheadPercentage: 20,
      desiredProfitMargin: 25
    }
  },
  
  // Commercial Work
  {
    id: "commercial-lighting",
    name: "Commercial Lighting Installation",
    category: "Commercial",
    description: "LED lighting system with emergency lighting",
    defaults: {
      labourHours: 12,
      hourlyRate: 55,
      overheadPercentage: 18,
      desiredProfitMargin: 20
    }
  },
  {
    id: "commercial-power",
    name: "Commercial Power Distribution",
    category: "Commercial",
    description: "Three-phase distribution board installation",
    defaults: {
      labourHours: 16,
      hourlyRate: 55,
      overheadPercentage: 18,
      desiredProfitMargin: 20
    }
  },
  {
    id: "commercial-fire-alarm",
    name: "Fire Alarm System",
    category: "Commercial",
    description: "Conventional fire alarm system installation",
    defaults: {
      labourHours: 20,
      hourlyRate: 60,
      overheadPercentage: 18,
      desiredProfitMargin: 22
    }
  },
  
  // Industrial Work
  {
    id: "industrial-motor",
    name: "Motor Control Installation",
    category: "Industrial",
    description: "Motor starter and control panel installation",
    defaults: {
      labourHours: 10,
      hourlyRate: 65,
      overheadPercentage: 15,
      desiredProfitMargin: 18
    }
  },
  {
    id: "industrial-panel",
    name: "Control Panel Wiring",
    category: "Industrial",
    description: "Industrial control panel and PLC wiring",
    defaults: {
      labourHours: 24,
      hourlyRate: 65,
      overheadPercentage: 15,
      desiredProfitMargin: 18
    }
  },
  
  // Testing & Inspection
  {
    id: "eicr-domestic",
    name: "Domestic EICR",
    category: "Testing",
    description: "Electrical Installation Condition Report",
    defaults: {
      labourHours: 4,
      hourlyRate: 50,
      overheadPercentage: 15,
      desiredProfitMargin: 30
    }
  },
  {
    id: "eicr-commercial",
    name: "Commercial EICR",
    category: "Testing",
    description: "Commercial electrical testing and certification",
    defaults: {
      labourHours: 8,
      hourlyRate: 55,
      overheadPercentage: 15,
      desiredProfitMargin: 25
    }
  },
  {
    id: "pat-testing",
    name: "PAT Testing",
    category: "Testing",
    description: "Portable appliance testing service",
    defaults: {
      labourHours: 6,
      hourlyRate: 40,
      overheadPercentage: 15,
      desiredProfitMargin: 35
    }
  }
];

export const getJobPresetsByCategory = () => {
  const categories = ['All', ...Array.from(new Set(jobTypePresets.map(preset => preset.category)))];
  return categories;
};

export const getJobPresetOptions = (category?: string) => {
  const filteredPresets = category && category !== 'All' 
    ? jobTypePresets.filter(preset => preset.category === category)
    : jobTypePresets;
    
  return filteredPresets.map(preset => ({
    value: preset.id,
    label: preset.name,
    category: preset.category,
    description: preset.description
  }));
};