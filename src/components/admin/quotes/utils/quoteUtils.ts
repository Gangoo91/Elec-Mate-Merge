
import { QuoteFormData, MaterialItem } from "../types";

// UK-specific default materials for different job types with more variation
export const getDefaultMaterialsForJobType = (jobType: string): MaterialItem[] => {
  // Add some randomization to prevent identical quotes
  const priceVariation = () => 0.85 + Math.random() * 0.3; // ±15% price variation
  const quantityVariation = (base: number) => Math.max(1, Math.round(base * (0.9 + Math.random() * 0.2)));

  const materialSets: Record<string, MaterialItem[]> = {
    rewire: [
      { id: 1, description: "18th Edition Consumer Unit (12-way RCBO)", quantity: 1, unitPrice: Math.round(145 * priceVariation()) },
      { id: 2, description: "Type B MCBs (Various Ratings)", quantity: quantityVariation(8), unitPrice: Math.round(18 * priceVariation()) },
      { id: 3, description: "30mA RCD Protection Device", quantity: quantityVariation(2), unitPrice: Math.round(35 * priceVariation()) },
      { id: 4, description: "2.5mm² T&E Cable - Socket Circuits (100m)", quantity: quantityVariation(3), unitPrice: Math.round(85 * priceVariation()) },
      { id: 5, description: "1.5mm² T&E Cable - Lighting Circuits (100m)", quantity: quantityVariation(2), unitPrice: Math.round(65 * priceVariation()) },
      { id: 6, description: "13A Socket Outlets (MK Logic Plus)", quantity: quantityVariation(12), unitPrice: Math.round(8 * priceVariation()) },
      { id: 7, description: "Light Switches (1&2 Gang)", quantity: quantityVariation(8), unitPrice: Math.round(12 * priceVariation()) },
      { id: 8, description: "LED Downlight Fittings (IP65)", quantity: quantityVariation(10), unitPrice: Math.round(22 * priceVariation()) },
      { id: 9, description: "Earth Bonding Cable 10mm²", quantity: quantityVariation(20), unitPrice: Math.round(3.50 * priceVariation()) },
      { id: 10, description: "Mounting Hardware & Accessories", quantity: quantityVariation(20), unitPrice: Math.round(2 * priceVariation()) }
    ],
    "fuse-box-upgrade": [
      { id: 1, description: "18th Edition Consumer Unit (10-way)", quantity: 1, unitPrice: Math.round(125 * priceVariation()) },
      { id: 2, description: "Type B MCBs (Mixed Ratings)", quantity: quantityVariation(6), unitPrice: Math.round(18 * priceVariation()) },
      { id: 3, description: "RCD Protection (30mA, 63A)", quantity: 1, unitPrice: Math.round(35 * priceVariation()) },
      { id: 4, description: "Main Switch (100A DP)", quantity: 1, unitPrice: Math.round(25 * priceVariation()) },
      { id: 5, description: "Meter Tails 25mm² (Per Metre)", quantity: quantityVariation(2), unitPrice: Math.round(15 * priceVariation()) },
      { id: 6, description: "Earth Cable 16mm²", quantity: quantityVariation(5), unitPrice: Math.round(4 * priceVariation()) },
      { id: 7, description: "Labels & Documentation Kit", quantity: 1, unitPrice: Math.round(8 * priceVariation()) }
    ],
    "socket-installation": [
      { id: 1, description: "13A Twin Socket Outlets (White)", quantity: quantityVariation(4), unitPrice: Math.round(12 * priceVariation()) },
      { id: 2, description: "2.5mm² T&E Cable (Per Metre)", quantity: quantityVariation(25), unitPrice: Math.round(0.85 * priceVariation()) },
      { id: 3, description: "35mm Back Boxes (Metal)", quantity: quantityVariation(4), unitPrice: Math.round(2.50 * priceVariation()) },
      { id: 4, description: "Conduit & Protection", quantity: quantityVariation(10), unitPrice: Math.round(3 * priceVariation()) },
      { id: 5, description: "Cable Clips & Fixings", quantity: quantityVariation(20), unitPrice: Math.round(0.50 * priceVariation()) }
    ],
    "lighting-installation": [
      { id: 1, description: "LED Downlights (IP65 Fire Rated)", quantity: quantityVariation(6), unitPrice: Math.round(18 * priceVariation()) },
      { id: 2, description: "1.5mm² T&E Cable (Per Metre)", quantity: quantityVariation(50), unitPrice: Math.round(0.65 * priceVariation()) },
      { id: 3, description: "Light Switches (1 Gang 2-Way)", quantity: quantityVariation(3), unitPrice: Math.round(12 * priceVariation()) },
      { id: 4, description: "Junction Boxes (Maintenance Free)", quantity: quantityVariation(4), unitPrice: Math.round(3 * priceVariation()) },
      { id: 5, description: "Ceiling Fixings & Hardware", quantity: quantityVariation(6), unitPrice: Math.round(2 * priceVariation()) }
    ],
    "electric-shower": [
      { id: 1, description: "Electric Shower Unit (9.5kW)", quantity: 1, unitPrice: Math.round(185 * priceVariation()) },
      { id: 2, description: "10mm² Shower Cable (Per Metre)", quantity: quantityVariation(15), unitPrice: Math.round(8 * priceVariation()) },
      { id: 3, description: "45A Switch & Neon Indicator", quantity: 1, unitPrice: Math.round(28 * priceVariation()) },
      { id: 4, description: "40A MCB Type B", quantity: 1, unitPrice: Math.round(22 * priceVariation()) },
      { id: 5, description: "Isolator Switch (Pull Cord)", quantity: 1, unitPrice: Math.round(15 * priceVariation()) }
    ],
    "electric-car-charger": [
      { id: 1, description: "7kW EV Charging Point (Tethered)", quantity: 1, unitPrice: Math.round(485 * priceVariation()) },
      { id: 2, description: "6mm² SWA Cable (Per Metre)", quantity: quantityVariation(20), unitPrice: Math.round(12 * priceVariation()) },
      { id: 3, description: "32A Type B MCB", quantity: 1, unitPrice: Math.round(22 * priceVariation()) },
      { id: 4, description: "Type A RCD (30mA, 40A)", quantity: 1, unitPrice: Math.round(45 * priceVariation()) },
      { id: 5, description: "External Mounting & Fixings", quantity: 1, unitPrice: Math.round(35 * priceVariation()) }
    ]
  };

  return materialSets[jobType] || materialSets.rewire;
};

// Generate UK-compliant scope of work with more variation
export const generateDefaultScopeOfWork = (jobType: string, formData: QuoteFormData): string => {
  const propertyAge = Math.random() > 0.5 ? "modern" : "traditional";
  const accessNote = Math.random() > 0.7 ? "\n• Additional access considerations may apply" : "";
  
  const scopes: Record<string, string> = {
    rewire: `Complete electrical rewire of ${formData.bedrooms}-bedroom ${propertyAge} ${formData.propertyType} including:
• Remove existing wiring and install new 18th Edition consumer unit
• Install new lighting circuits using 1.5mm² T&E cable to BS 7671
• Install new socket circuits using 2.5mm² T&E cable with RCD protection  
• Fit new socket outlets, light switches, and ceiling points throughout
• Main and supplementary earth bonding to gas and water services
• Full electrical testing, inspection, and certification
• Notification to Building Control under Part P regulations
• All work completed to BS 7671:2018+A2:2022 standards${accessNote}`,

    "fuse-box-upgrade": `Consumer unit upgrade for ${propertyAge} property including:
• Safe isolation and removal of existing fuse box/consumer unit
• Install new 18th Edition consumer unit with RCBO or split-load RCD protection
• Connect and test all existing circuits with full inspection
• Issue Electrical Installation Certificate and Schedule of Test Results
• Building Control notification under Part P regulations
• Upgrade main earthing and bonding where required
• All work compliant with current BS 7671:2018+A2:2022${accessNote}`,

    "socket-installation": `Additional socket outlet installation including:
• Professional cable routing using appropriate installation methods
• Install socket outlets to BS 1363 standards with proper earthing
• Connect to existing ring circuit or install new dedicated circuit
• Full testing and inspection of new installation including R1+R2 and RCD tests
• Issue Minor Electrical Installation Works Certificate
• Ensure compliance with BS 7671 wiring regulations${accessNote}`,

    "lighting-installation": `New lighting installation for ${propertyAge} property including:
• Install energy-efficient LED downlights with appropriate IP ratings
• New switching arrangements with proper cable installation methods
• Connect to existing lighting circuits or install new circuit as required
• Full testing including earth continuity, insulation resistance, and polarity
• Issue Minor Electrical Installation Works Certificate  
• All fittings meet current energy efficiency standards${accessNote}`,

    "electric-shower": `Electric shower installation including:
• Install new dedicated 10mm² circuit from consumer unit with appropriate protection
• Fit 45A double pole isolating switch with neon indicator
• Professional shower unit installation with commissioning and testing
• Supplementary bonding installation where required by regulations
• Full testing and issue Electrical Installation Certificate for new circuit
• Building Control notification and compliance with Part P regulations${accessNote}`,

    "electric-car-charger": `Electric vehicle charging point installation including:
• Install new dedicated 32A circuit with Type A RCD protection for EV charging
• Mount weatherproof charging unit with appropriate cable management
• Complete earthing and bonding arrangements to manufacturer specifications
• Full commissioning, testing, and demonstration of charging operation
• Issue installation certificate and warranty documentation
• Building Control notification and OLEV compliance where applicable${accessNote}`
  };

  return scopes[jobType] || scopes.rewire;
};

// Calculate labour days with more realistic variations
export const calculateLabourDays = (jobType: string, bedrooms: string): number => {
  const bedroomCount = parseInt(bedrooms) || 3;
  const complexityFactor = 0.9 + Math.random() * 0.2; // ±10% variation for property complexity
  
  const baseDays: Record<string, number> = {
    rewire: Math.max(5, bedroomCount * 1.8 + 2), // Minimum 5 days for rewire
    "fuse-box-upgrade": 1,
    "socket-installation": 0.5,
    "lighting-installation": 1,
    "electric-shower": 1,
    "electric-car-charger": 1
  };

  const calculatedDays = (baseDays[jobType] || 1) * complexityFactor;
  return Math.round(calculatedDays * 4) / 4; // Round to nearest quarter day
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

// Generate unique quote reference with variation
export const generateQuoteReference = (): string => {
  const prefix = 'QT';
  const timestamp = Date.now().toString().substring(7);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}-${timestamp}${random}`;
};
