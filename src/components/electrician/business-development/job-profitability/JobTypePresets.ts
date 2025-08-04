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
  // Domestic Work - First Fix
  {
    id: "domestic-first-fix-2bed",
    name: "First Fix - 2-3 Bed House",
    category: "Domestic - First Fix",
    description: "Cable installation and back boxes before plastering",
    defaults: {
      labourHours: 24,
      hourlyRate: 45,
      overheadPercentage: 20,
      desiredProfitMargin: 25
    }
  },
  {
    id: "domestic-first-fix-4bed",
    name: "First Fix - 4-5 Bed House",
    category: "Domestic - First Fix",
    description: "Cable installation for larger property first fix",
    defaults: {
      labourHours: 36,
      hourlyRate: 45,
      overheadPercentage: 20,
      desiredProfitMargin: 25
    }
  },
  {
    id: "domestic-first-fix-extension",
    name: "First Fix - Extension/New Build",
    category: "Domestic - First Fix",
    description: "First fix wiring for extension or new build",
    defaults: {
      labourHours: 16,
      hourlyRate: 45,
      overheadPercentage: 20,
      desiredProfitMargin: 25
    }
  },
  
  // Domestic Work - Second Fix
  {
    id: "domestic-second-fix-2bed",
    name: "Second Fix - 2-3 Bed House",
    category: "Domestic - Second Fix",
    description: "Final connections, fittings, and testing",
    defaults: {
      labourHours: 20,
      hourlyRate: 45,
      overheadPercentage: 20,
      desiredProfitMargin: 25
    }
  },
  {
    id: "domestic-second-fix-4bed",
    name: "Second Fix - 4-5 Bed House", 
    category: "Domestic - Second Fix",
    description: "Second fix for larger property including testing",
    defaults: {
      labourHours: 30,
      hourlyRate: 45,
      overheadPercentage: 20,
      desiredProfitMargin: 25
    }
  },
  {
    id: "domestic-second-fix-extension",
    name: "Second Fix - Extension/New Build",
    category: "Domestic - Second Fix", 
    description: "Second fix for extension including testing and certification",
    defaults: {
      labourHours: 12,
      hourlyRate: 45,
      overheadPercentage: 20,
      desiredProfitMargin: 25
    }
  },

  // Domestic Work - Complete Rewires
  {
    id: "domestic-full-rewire-2bed",
    name: "Full House Rewire (2-3 Bed)",
    category: "Domestic - Complete Rewires",
    description: "Complete rewire including CU, circuits, and testing",
    defaults: {
      labourHours: 40,
      hourlyRate: 45,
      overheadPercentage: 20,
      desiredProfitMargin: 25
    }
  },
  {
    id: "domestic-full-rewire-4bed",
    name: "Full House Rewire (4-5 Bed)",
    category: "Domestic - Complete Rewires",
    description: "Complete rewire for larger property including CU upgrade",
    defaults: {
      labourHours: 60,
      hourlyRate: 45,
      overheadPercentage: 20,
      desiredProfitMargin: 25
    }
  },
  {
    id: "domestic-second-fix",
    name: "Second Fix Wiring",
    category: "Domestic",
    description: "Socket/switch installation and testing after decoration",
    defaults: {
      labourHours: 16,
      hourlyRate: 45,
      overheadPercentage: 20,
      desiredProfitMargin: 25
    }
  },
  {
    id: "domestic-partial-rewire",
    name: "Partial Rewire",
    category: "Domestic",
    description: "Rewire of specific circuits (kitchen/bathroom)",
    defaults: {
      labourHours: 20,
      hourlyRate: 45,
      overheadPercentage: 20,
      desiredProfitMargin: 25
    }
  },

  // Domestic Work - Specific Installations
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
    description: "Full CU upgrade with testing and certification",
    defaults: {
      labourHours: 8,
      hourlyRate: 45,
      overheadPercentage: 20,
      desiredProfitMargin: 25
    }
  },
  {
    id: "domestic-ev-charger",
    name: "EV Charger Installation",
    category: "Domestic",
    description: "Electric vehicle charging point with dedicated circuit",
    defaults: {
      labourHours: 6,
      hourlyRate: 50,
      overheadPercentage: 20,
      desiredProfitMargin: 25
    }
  },
  {
    id: "domestic-outdoor-socket",
    name: "Outdoor Socket & Lighting",
    category: "Domestic",
    description: "External power and lighting with weatherproof fittings",
    defaults: {
      labourHours: 4,
      hourlyRate: 45,
      overheadPercentage: 20,
      desiredProfitMargin: 25
    }
  },
  {
    id: "domestic-smoke-alarms",
    name: "Smoke Alarm Installation",
    category: "Domestic",
    description: "Mains powered smoke detectors with battery backup",
    defaults: {
      labourHours: 3,
      hourlyRate: 45,
      overheadPercentage: 20,
      desiredProfitMargin: 30
    }
  },

  // Commercial Work - Offices & Retail
  {
    id: "commercial-office-fit-out",
    name: "Office Fit-Out Electrical",
    category: "Commercial",
    description: "Complete electrical installation for office space",
    defaults: {
      labourHours: 80,
      hourlyRate: 55,
      overheadPercentage: 18,
      desiredProfitMargin: 20
    }
  },
  {
    id: "commercial-retail-lighting",
    name: "Retail Lighting System",
    category: "Commercial",
    description: "Track lighting and display lighting installation",
    defaults: {
      labourHours: 16,
      hourlyRate: 55,
      overheadPercentage: 18,
      desiredProfitMargin: 20
    }
  },
  {
    id: "commercial-kitchen",
    name: "Commercial Kitchen Electrical",
    category: "Commercial",
    description: "Kitchen equipment circuits and ventilation controls",
    defaults: {
      labourHours: 24,
      hourlyRate: 60,
      overheadPercentage: 18,
      desiredProfitMargin: 22
    }
  },
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
  {
    id: "commercial-emergency-lighting",
    name: "Emergency Lighting System",
    category: "Commercial",
    description: "Emergency lighting with central battery system",
    defaults: {
      labourHours: 12,
      hourlyRate: 55,
      overheadPercentage: 18,
      desiredProfitMargin: 22
    }
  },
  {
    id: "commercial-data-cabling",
    name: "Data Cabling Installation",
    category: "Commercial",
    description: "Cat6 data cabling and network infrastructure",
    defaults: {
      labourHours: 10,
      hourlyRate: 50,
      overheadPercentage: 18,
      desiredProfitMargin: 25
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
  {
    id: "industrial-machinery",
    name: "Machinery Installation",
    category: "Industrial",
    description: "Factory machinery electrical connections",
    defaults: {
      labourHours: 16,
      hourlyRate: 65,
      overheadPercentage: 15,
      desiredProfitMargin: 18
    }
  },
  {
    id: "industrial-distribution",
    name: "Industrial Distribution Board",
    category: "Industrial",
    description: "High current distribution panel installation",
    defaults: {
      labourHours: 20,
      hourlyRate: 65,
      overheadPercentage: 15,
      desiredProfitMargin: 18
    }
  },
  {
    id: "industrial-lighting",
    name: "Industrial Lighting",
    category: "Industrial",
    description: "High bay LED lighting for warehouses/factories",
    defaults: {
      labourHours: 12,
      hourlyRate: 60,
      overheadPercentage: 15,
      desiredProfitMargin: 20
    }
  },
  {
    id: "industrial-earthing",
    name: "Earthing & Bonding System",
    category: "Industrial",
    description: "Earth electrode and equipotential bonding",
    defaults: {
      labourHours: 8,
      hourlyRate: 60,
      overheadPercentage: 15,
      desiredProfitMargin: 22
    }
  },

  // Testing & Inspection
  {
    id: "eicr-domestic",
    name: "Domestic EICR",
    category: "Testing",
    description: "Electrical Installation Condition Report for homes",
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
    id: "eicr-industrial",
    name: "Industrial EICR",
    category: "Testing",
    description: "Industrial installation condition report",
    defaults: {
      labourHours: 12,
      hourlyRate: 60,
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
  },
  {
    id: "electrical-testing",
    name: "Electrical Installation Testing",
    category: "Testing",
    description: "Initial verification testing for new installations",
    defaults: {
      labourHours: 4,
      hourlyRate: 50,
      overheadPercentage: 15,
      desiredProfitMargin: 30
    }
  },
  {
    id: "periodic-inspection",
    name: "Periodic Inspection",
    category: "Testing",
    description: "Routine electrical safety inspection",
    defaults: {
      labourHours: 6,
      hourlyRate: 50,
      overheadPercentage: 15,
      desiredProfitMargin: 28
    }
  },

  // Maintenance & Repairs
  {
    id: "maintenance-fault-finding",
    name: "Fault Finding & Repair",
    category: "Maintenance",
    description: "Electrical fault diagnosis and repair work",
    defaults: {
      labourHours: 3,
      hourlyRate: 55,
      overheadPercentage: 18,
      desiredProfitMargin: 35
    }
  },
  {
    id: "maintenance-emergency-call",
    name: "Emergency Call-Out",
    category: "Maintenance",
    description: "Out-of-hours emergency electrical repair",
    defaults: {
      labourHours: 2,
      hourlyRate: 75,
      overheadPercentage: 20,
      desiredProfitMargin: 40
    }
  },
  {
    id: "maintenance-planned",
    name: "Planned Maintenance",
    category: "Maintenance",
    description: "Routine electrical maintenance and checks",
    defaults: {
      labourHours: 4,
      hourlyRate: 50,
      overheadPercentage: 18,
      desiredProfitMargin: 25
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