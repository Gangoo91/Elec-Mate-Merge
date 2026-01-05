// Pre-configured circuit templates for common electrical installations
// Based on BS 7671:2018+A2:2022 requirements

export interface CircuitTemplateData {
  // Circuit identification
  circuitDesignation: string;
  circuitReference: string;
  
  // Protection
  protectiveDeviceType: string;
  protectiveDeviceRating: string;
  protectiveDeviceBs: string;
  
  // Cables
  cableType: string;
  cableCsa: string;
  cableReferenceMethod: string;
  
  // Circuit parameters
  maxDemand: string;
  designCurrent: string;
  voltageDrop: string;
  
  // Test results (typical values - user should verify)
  r1r2: string;
  zs: string;
  maxZs: string;
  insulation: string;
  polarity: string;
  rcd: string;
}

export interface CircuitTemplate {
  id: string;
  name: string;
  description: string;
  category: 'domestic' | 'commercial' | 'industrial';
  icon: string;
  templateData: CircuitTemplateData;
}

export const CIRCUIT_TEMPLATES: CircuitTemplate[] = [
  // ========== DOMESTIC CIRCUITS ==========
  {
    id: 'domestic-ring-main-32a',
    name: '32A Ring Main',
    description: 'Standard socket outlet ring circuit for domestic properties',
    category: 'domestic',
    icon: '🔌',
    templateData: {
      circuitDesignation: 'Ground Floor Sockets',
      circuitReference: 'C1',
      protectiveDeviceType: 'MCB',
      protectiveDeviceRating: '32A',
      protectiveDeviceBs: 'BS EN 60898',
      cableType: '70°C Thermoplastic',
      cableCsa: '2.5mm²',
      cableReferenceMethod: 'C (Clipped Direct)',
      maxDemand: '26A',
      designCurrent: '20A',
      voltageDrop: '3.5V',
      r1r2: '0.70Ω',
      zs: '0.85Ω',
      maxZs: '1.37Ω',
      insulation: '>200MΩ',
      polarity: 'Correct',
      rcd: '30mA / 28ms'
    }
  },
  {
    id: 'domestic-lighting-6a',
    name: '6A Lighting Circuit',
    description: 'Standard lighting circuit for domestic properties',
    category: 'domestic',
    icon: '💡',
    templateData: {
      circuitDesignation: 'Ground Floor Lighting',
      circuitReference: 'C2',
      protectiveDeviceType: 'MCB',
      protectiveDeviceRating: '6A',
      protectiveDeviceBs: 'BS EN 60898',
      cableType: '70°C Thermoplastic',
      cableCsa: '1.5mm²',
      cableReferenceMethod: 'C (Clipped Direct)',
      maxDemand: '4A',
      designCurrent: '3A',
      voltageDrop: '2.1V',
      r1r2: '1.20Ω',
      zs: '1.35Ω',
      maxZs: '7.28Ω',
      insulation: '>200MΩ',
      polarity: 'Correct',
      rcd: 'N/A'
    }
  },
  {
    id: 'domestic-cooker-32a',
    name: '32A Cooker Circuit',
    description: 'Electric cooker circuit with control unit',
    category: 'domestic',
    icon: '🍳',
    templateData: {
      circuitDesignation: 'Cooker',
      circuitReference: 'C3',
      protectiveDeviceType: 'MCB',
      protectiveDeviceRating: '32A',
      protectiveDeviceBs: 'BS EN 60898',
      cableType: '70°C Thermoplastic',
      cableCsa: '6mm²',
      cableReferenceMethod: 'C (Clipped Direct)',
      maxDemand: '28A',
      designCurrent: '26A',
      voltageDrop: '4.2V',
      r1r2: '0.28Ω',
      zs: '0.42Ω',
      maxZs: '1.37Ω',
      insulation: '>200MΩ',
      polarity: 'Correct',
      rcd: 'N/A'
    }
  },
  {
    id: 'domestic-shower-40a',
    name: '40A Shower Circuit',
    description: 'Electric shower circuit 8.5-9.5kW',
    category: 'domestic',
    icon: '🚿',
    templateData: {
      circuitDesignation: 'Electric Shower',
      circuitReference: 'C4',
      protectiveDeviceType: 'MCB',
      protectiveDeviceRating: '40A',
      protectiveDeviceBs: 'BS EN 60898',
      cableType: '70°C Thermoplastic',
      cableCsa: '10mm²',
      cableReferenceMethod: 'C (Clipped Direct)',
      maxDemand: '38A',
      designCurrent: '37A',
      voltageDrop: '5.8V',
      r1r2: '0.17Ω',
      zs: '0.31Ω',
      maxZs: '1.09Ω',
      insulation: '>200MΩ',
      polarity: 'Correct',
      rcd: '30mA / 26ms'
    }
  },
  {
    id: 'domestic-immersion-16a',
    name: '16A Immersion Heater',
    description: 'Immersion heater circuit with timer control',
    category: 'domestic',
    icon: '🌡️',
    templateData: {
      circuitDesignation: 'Immersion Heater',
      circuitReference: 'C5',
      protectiveDeviceType: 'MCB',
      protectiveDeviceRating: '16A',
      protectiveDeviceBs: 'BS EN 60898',
      cableType: '70°C Thermoplastic',
      cableCsa: '2.5mm²',
      cableReferenceMethod: 'C (Clipped Direct)',
      maxDemand: '13A',
      designCurrent: '13A',
      voltageDrop: '3.2V',
      r1r2: '0.70Ω',
      zs: '0.84Ω',
      maxZs: '2.73Ω',
      insulation: '>200MΩ',
      polarity: 'Correct',
      rcd: 'N/A'
    }
  },
  {
    id: 'domestic-garage-20a',
    name: '20A Garage Supply',
    description: 'Dedicated garage/outbuilding supply',
    category: 'domestic',
    icon: '🏠',
    templateData: {
      circuitDesignation: 'Garage Supply',
      circuitReference: 'C6',
      protectiveDeviceType: 'MCB',
      protectiveDeviceRating: '20A',
      protectiveDeviceBs: 'BS EN 60898',
      cableType: 'SWA',
      cableCsa: '4mm²',
      cableReferenceMethod: 'D (Direct in Ground)',
      maxDemand: '16A',
      designCurrent: '16A',
      voltageDrop: '4.5V',
      r1r2: '0.42Ω',
      zs: '0.56Ω',
      maxZs: '2.19Ω',
      insulation: '>200MΩ',
      polarity: 'Correct',
      rcd: '30mA / 25ms'
    }
  },
  {
    id: 'domestic-smoke-alarms-6a',
    name: '6A Smoke Alarms',
    description: 'Interconnected smoke alarm system',
    category: 'domestic',
    icon: '🔔',
    templateData: {
      circuitDesignation: 'Smoke Detection System',
      circuitReference: 'C7',
      protectiveDeviceType: 'MCB',
      protectiveDeviceRating: '6A',
      protectiveDeviceBs: 'BS EN 60898',
      cableType: 'Fire Resistant',
      cableCsa: '1.5mm²',
      cableReferenceMethod: 'C (Clipped Direct)',
      maxDemand: '1A',
      designCurrent: '0.5A',
      voltageDrop: '0.8V',
      r1r2: '1.20Ω',
      zs: '1.34Ω',
      maxZs: '7.28Ω',
      insulation: '>200MΩ',
      polarity: 'Correct',
      rcd: 'N/A'
    }
  },

  // ========== COMMERCIAL CIRCUITS ==========
  {
    id: 'commercial-3phase-distribution',
    name: '3-Phase Distribution Board',
    description: 'Three-phase supply to distribution board',
    category: 'commercial',
    icon: '⚡',
    templateData: {
      circuitDesignation: 'Sub-Main Distribution',
      circuitReference: 'SM1',
      protectiveDeviceType: 'MCCB',
      protectiveDeviceRating: '63A',
      protectiveDeviceBs: 'BS EN 60947-2',
      cableType: 'SWA',
      cableCsa: '25mm²',
      cableReferenceMethod: 'F (On cable tray)',
      maxDemand: '55A',
      designCurrent: '50A',
      voltageDrop: '4.8V',
      r1r2: '0.08Ω',
      zs: '0.22Ω',
      maxZs: '0.35Ω',
      insulation: '>200MΩ',
      polarity: 'Correct',
      rcd: 'N/A'
    }
  },
  {
    id: 'commercial-emergency-lighting',
    name: 'Emergency Lighting',
    description: 'Emergency lighting system with central battery',
    category: 'commercial',
    icon: '🚨',
    templateData: {
      circuitDesignation: 'Emergency Lighting',
      circuitReference: 'EM1',
      protectiveDeviceType: 'MCB',
      protectiveDeviceRating: '10A',
      protectiveDeviceBs: 'BS EN 60898',
      cableType: 'Fire Resistant',
      cableCsa: '1.5mm²',
      cableReferenceMethod: 'C (Clipped Direct)',
      maxDemand: '6A',
      designCurrent: '5A',
      voltageDrop: '2.8V',
      r1r2: '1.20Ω',
      zs: '1.34Ω',
      maxZs: '4.37Ω',
      insulation: '>200MΩ',
      polarity: 'Correct',
      rcd: 'N/A'
    }
  },
  {
    id: 'commercial-fire-alarm',
    name: 'Fire Alarm System',
    description: 'Addressable fire alarm panel circuit',
    category: 'commercial',
    icon: '🔥',
    templateData: {
      circuitDesignation: 'Fire Alarm Panel',
      circuitReference: 'FA1',
      protectiveDeviceType: 'MCB',
      protectiveDeviceRating: '6A',
      protectiveDeviceBs: 'BS EN 60898',
      cableType: 'Fire Resistant',
      cableCsa: '1.5mm²',
      cableReferenceMethod: 'C (Clipped Direct)',
      maxDemand: '3A',
      designCurrent: '2A',
      voltageDrop: '1.5V',
      r1r2: '1.20Ω',
      zs: '1.34Ω',
      maxZs: '7.28Ω',
      insulation: '>200MΩ',
      polarity: 'Correct',
      rcd: 'N/A'
    }
  },
  {
    id: 'commercial-hvac-20a',
    name: '20A HVAC Unit',
    description: 'Air conditioning/ventilation unit supply',
    category: 'commercial',
    icon: '❄️',
    templateData: {
      circuitDesignation: 'HVAC Unit',
      circuitReference: 'HV1',
      protectiveDeviceType: 'MCB',
      protectiveDeviceRating: '20A',
      protectiveDeviceBs: 'BS EN 60898',
      cableType: 'SWA',
      cableCsa: '4mm²',
      cableReferenceMethod: 'F (On cable tray)',
      maxDemand: '16A',
      designCurrent: '15A',
      voltageDrop: '3.8V',
      r1r2: '0.42Ω',
      zs: '0.56Ω',
      maxZs: '2.19Ω',
      insulation: '>200MΩ',
      polarity: 'Correct',
      rcd: 'N/A'
    }
  },
  {
    id: 'commercial-office-sockets',
    name: '32A Office Sockets',
    description: 'Socket outlets for office equipment',
    category: 'commercial',
    icon: '🖥️',
    templateData: {
      circuitDesignation: 'Office Floor Sockets',
      circuitReference: 'OF1',
      protectiveDeviceType: 'RCBO',
      protectiveDeviceRating: '32A',
      protectiveDeviceBs: 'BS EN 61009',
      cableType: '70°C Thermoplastic',
      cableCsa: '4mm²',
      cableReferenceMethod: 'B (In conduit)',
      maxDemand: '24A',
      designCurrent: '20A',
      voltageDrop: '4.2V',
      r1r2: '0.42Ω',
      zs: '0.56Ω',
      maxZs: '1.37Ω',
      insulation: '>200MΩ',
      polarity: 'Correct',
      rcd: '30mA / 27ms'
    }
  },

  // ========== INDUSTRIAL CIRCUITS ==========
  {
    id: 'industrial-motor-20hp',
    name: '20HP Motor Circuit',
    description: 'Three-phase motor with DOL starter',
    category: 'industrial',
    icon: '⚙️',
    templateData: {
      circuitDesignation: '20HP DOL Motor',
      circuitReference: 'M1',
      protectiveDeviceType: 'MCCB',
      protectiveDeviceRating: '32A',
      protectiveDeviceBs: 'BS EN 60947-2',
      cableType: 'SWA',
      cableCsa: '10mm²',
      cableReferenceMethod: 'F (On cable tray)',
      maxDemand: '28A',
      designCurrent: '25A',
      voltageDrop: '5.2V',
      r1r2: '0.17Ω',
      zs: '0.31Ω',
      maxZs: '0.58Ω',
      insulation: '>200MΩ',
      polarity: 'Correct',
      rcd: 'N/A'
    }
  },
  {
    id: 'industrial-machinery-panel',
    name: 'Machinery Control Panel',
    description: 'Industrial machinery control panel supply',
    category: 'industrial',
    icon: '🏭',
    templateData: {
      circuitDesignation: 'Machine Control Panel',
      circuitReference: 'CP1',
      protectiveDeviceType: 'MCCB',
      protectiveDeviceRating: '100A',
      protectiveDeviceBs: 'BS EN 60947-2',
      cableType: 'SWA',
      cableCsa: '50mm²',
      cableReferenceMethod: 'F (On cable tray)',
      maxDemand: '85A',
      designCurrent: '80A',
      voltageDrop: '6.5V',
      r1r2: '0.04Ω',
      zs: '0.18Ω',
      maxZs: '0.29Ω',
      insulation: '>200MΩ',
      polarity: 'Correct',
      rcd: 'N/A'
    }
  },
  {
    id: 'industrial-welding-63a',
    name: '63A Welding Bay',
    description: 'Electric welding equipment supply',
    category: 'industrial',
    icon: '🔧',
    templateData: {
      circuitDesignation: 'Welding Bay',
      circuitReference: 'WB1',
      protectiveDeviceType: 'MCCB',
      protectiveDeviceRating: '63A',
      protectiveDeviceBs: 'BS EN 60947-2',
      cableType: 'SWA',
      cableCsa: '16mm²',
      cableReferenceMethod: 'F (On cable tray)',
      maxDemand: '55A',
      designCurrent: '50A',
      voltageDrop: '7.2V',
      r1r2: '0.11Ω',
      zs: '0.25Ω',
      maxZs: '0.35Ω',
      insulation: '>200MΩ',
      polarity: 'Correct',
      rcd: 'N/A'
    }
  },
  {
    id: 'industrial-conveyor-motor',
    name: 'Conveyor Motor 7.5kW',
    description: 'Three-phase conveyor motor circuit',
    category: 'industrial',
    icon: '📦',
    templateData: {
      circuitDesignation: 'Conveyor Motor',
      circuitReference: 'CV1',
      protectiveDeviceType: 'MCCB',
      protectiveDeviceRating: '25A',
      protectiveDeviceBs: 'BS EN 60947-2',
      cableType: 'SWA',
      cableCsa: '6mm²',
      cableReferenceMethod: 'F (On cable tray)',
      maxDemand: '20A',
      designCurrent: '18A',
      voltageDrop: '4.5V',
      r1r2: '0.28Ω',
      zs: '0.42Ω',
      maxZs: '0.67Ω',
      insulation: '>200MΩ',
      polarity: 'Correct',
      rcd: 'N/A'
    }
  },
  {
    id: 'industrial-compressor-15kw',
    name: '15kW Air Compressor',
    description: 'Industrial air compressor with star-delta starter',
    category: 'industrial',
    icon: '💨',
    templateData: {
      circuitDesignation: 'Air Compressor',
      circuitReference: 'AC1',
      protectiveDeviceType: 'MCCB',
      protectiveDeviceRating: '40A',
      protectiveDeviceBs: 'BS EN 60947-2',
      cableType: 'SWA',
      cableCsa: '16mm²',
      cableReferenceMethod: 'F (On cable tray)',
      maxDemand: '35A',
      designCurrent: '32A',
      voltageDrop: '5.8V',
      r1r2: '0.11Ω',
      zs: '0.25Ω',
      maxZs: '0.46Ω',
      insulation: '>200MΩ',
      polarity: 'Correct',
      rcd: 'N/A'
    }
  }
];

// Helper function to get templates by category
export const getTemplatesByCategory = (category: 'domestic' | 'commercial' | 'industrial') => {
  return CIRCUIT_TEMPLATES.filter(t => t.category === category);
};

// Helper function to search templates
export const searchTemplates = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return CIRCUIT_TEMPLATES.filter(
    t => t.name.toLowerCase().includes(lowerQuery) || 
         t.description.toLowerCase().includes(lowerQuery)
  );
};
