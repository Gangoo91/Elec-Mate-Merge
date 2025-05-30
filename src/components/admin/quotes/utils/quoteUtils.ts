
import { QuoteFormData, MaterialItem } from "../types";

// UK-specific default materials for different job types
export const getDefaultMaterialsForJobType = (jobType: string): MaterialItem[] => {
  const materialSets: Record<string, MaterialItem[]> = {
    rewire: [
      { id: 1, description: "18th Edition Consumer Unit (12-way)", quantity: 1, unitPrice: 145 },
      { id: 2, description: "Type B MCBs (6A-32A)", quantity: 8, unitPrice: 18 },
      { id: 3, description: "RCD Protection (30mA)", quantity: 2, unitPrice: 35 },
      { id: 4, description: "2.5mm² T&E Cable (100m)", quantity: 3, unitPrice: 85 },
      { id: 5, description: "1.5mm² T&E Cable (100m)", quantity: 2, unitPrice: 65 },
      { id: 6, description: "13A Socket Outlets (MK Logic)", quantity: 12, unitPrice: 8 },
      { id: 7, description: "Light Switches (1&2 Gang)", quantity: 8, unitPrice: 12 },
      { id: 8, description: "Ceiling Roses & Accessories", quantity: 10, unitPrice: 4 },
      { id: 9, description: "Earth Bonding Cable 10mm²", quantity: 20, unitPrice: 3.50 },
      { id: 10, description: "Back Boxes & Mounting Hardware", quantity: 20, unitPrice: 2 }
    ],
    "fuse-box-upgrade": [
      { id: 1, description: "18th Edition Consumer Unit (10-way)", quantity: 1, unitPrice: 125 },
      { id: 2, description: "Type B MCBs (Various Ratings)", quantity: 6, unitPrice: 18 },
      { id: 3, description: "RCD Protection (30mA, 63A)", quantity: 1, unitPrice: 35 },
      { id: 4, description: "Main Switch (100A)", quantity: 1, unitPrice: 25 },
      { id: 5, description: "Meter Tails 25mm²", quantity: 2, unitPrice: 15 },
      { id: 6, description: "Earth Cable 16mm²", quantity: 5, unitPrice: 4 },
      { id: 7, description: "Labels & Documentation", quantity: 1, unitPrice: 8 }
    ],
    "socket-installation": [
      { id: 1, description: "13A Twin Socket Outlets", quantity: 4, unitPrice: 12 },
      { id: 2, description: "2.5mm² T&E Cable", quantity: 25, unitPrice: 22 },
      { id: 3, description: "35mm Back Boxes", quantity: 4, unitPrice: 2.50 },
      { id: 4, description: "Conduit & Accessories", quantity: 10, unitPrice: 3 },
      { id: 5, description: "Cable Clips & Fixings", quantity: 20, unitPrice: 0.50 }
    ],
    "lighting-installation": [
      { id: 1, description: "LED Downlights (IP65)", quantity: 6, unitPrice: 18 },
      { id: 2, description: "1.5mm² T&E Cable", quantity: 50, unitPrice: 32 },
      { id: 3, description: "Light Switches (1 Gang)", quantity: 3, unitPrice: 12 },
      { id: 4, description: "Junction Boxes", quantity: 4, unitPrice: 3 },
      { id: 5, description: "Ceiling Fixings", quantity: 6, unitPrice: 2 }
    ],
    "electric-shower": [
      { id: 1, description: "Electric Shower Unit (9.5kW)", quantity: 1, unitPrice: 185 },
      { id: 2, description: "10mm² Shower Cable", quantity: 15, unitPrice: 8 },
      { id: 3, description: "45A Switch & Neon", quantity: 1, unitPrice: 28 },
      { id: 4, description: "40A MCB Type B", quantity: 1, unitPrice: 22 },
      { id: 5, description: "Isolator Switch (Pull Cord)", quantity: 1, unitPrice: 15 }
    ],
    "electric-car-charger": [
      { id: 1, description: "7kW EV Charging Point", quantity: 1, unitPrice: 485 },
      { id: 2, description: "6mm² SWA Cable", quantity: 20, unitPrice: 12 },
      { id: 3, description: "32A Type B MCB", quantity: 1, unitPrice: 22 },
      { id: 4, description: "Type A RCD (30mA)", quantity: 1, unitPrice: 45 },
      { id: 5, description: "External Mounting Kit", quantity: 1, unitPrice: 35 }
    ]
  };

  return materialSets[jobType] || materialSets.rewire;
};

// Generate UK-compliant scope of work
export const generateDefaultScopeOfWork = (jobType: string, formData: QuoteFormData): string => {
  const scopes: Record<string, string> = {
    rewire: `Complete rewire of ${formData.bedrooms}-bedroom ${formData.propertyType} including:
• Installation of new 18th Edition consumer unit with RCD protection
• Full rewiring to all rooms using appropriate cable sizes (BS 7671)
• Installation of new socket outlets, light switches, and ceiling points
• Earth bonding to gas and water services
• Full electrical installation certificate and test results
• Compliance with Part P Building Regulations
• All work carried out to BS 7671:2018+A2:2022 standards`,

    "fuse-box-upgrade": `Upgrade of existing consumer unit including:
• Remove old fuse box/consumer unit
• Install new 18th Edition consumer unit with RCD protection
• Connect existing circuits with testing and inspection
• Issue Electrical Installation Certificate
• Notify Building Control under Part P regulations
• All work compliant with BS 7671:2018+A2:2022`,

    "socket-installation": `Installation of additional 13A socket outlets including:
• Cable routing and installation using appropriate methods
• Installation of socket outlets to BS 1363 standards
• Connection to existing circuits or new circuit installation
• Testing and inspection of new installation
• Minor Electrical Installation Works Certificate
• Compliance with BS 7671 requirements`,

    "lighting-installation": `Installation of new lighting system including:
• Installation of LED downlights with appropriate IP rating
• New switching arrangements and cable installation
• Connection to existing or new lighting circuits
• Testing of installation including earth continuity
• Minor Electrical Installation Works Certificate
• Energy efficient LED lighting to reduce consumption`,

    "electric-shower": `Installation of electric shower including:
• New dedicated circuit from consumer unit (typically 10mm²)
• Installation of 45A double pole switch with neon indicator
• Shower unit installation and commissioning
• Supplementary bonding if required
• Electrical Installation Certificate for new circuit
• Part P notification and Building Control compliance`,

    "electric-car-charger": `Installation of electric vehicle charging point including:
• New dedicated 32A circuit installation
• Type A RCD protection for EV charging
• External weatherproof charging unit installation
• Earthing and bonding arrangements
• Full testing and commissioning
• OLEV compliance and certification if applicable
• Building Control notification under Part P`
  };

  return scopes[jobType] || scopes.rewire;
};

// Calculate labour days based on UK typical completion times
export const calculateLabourDays = (jobType: string, bedrooms: string): number => {
  const bedroomCount = parseInt(bedrooms) || 3;
  
  const labourCalculations: Record<string, number> = {
    rewire: Math.max(5, bedroomCount * 1.8 + 2), // Minimum 5 days for rewire
    "fuse-box-upgrade": 1,
    "socket-installation": 0.5,
    "lighting-installation": 1,
    "electric-shower": 1,
    "electric-car-charger": 1
  };

  return labourCalculations[jobType] || 1;
};

// UK postcode validation
export const validateUKPostcode = (postcode: string): boolean => {
  const ukPostcodeRegex = /^[A-Z]{1,2}[0-9R][0-9A-Z]? [0-9][ABD-HJLNP-UW-Z]{2}$/i;
  return ukPostcodeRegex.test(postcode.trim().toUpperCase());
};

// Format UK currency
export const formatUKCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP'
  }).format(amount);
};

// Generate unique quote reference
export const generateQuoteReference = (): string => {
  const prefix = 'QT';
  const timestamp = Date.now().toString().substring(7);
  const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
  return `${prefix}-${timestamp}${random}`;
};
