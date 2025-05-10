
import { MaterialItem } from "../types";

export const generateDefaultScopeOfWork = (jobType: string, data: any): string => {
  switch (jobType) {
    case "rewire":
      return `Complete rewire of ${data.bedrooms} bedroom ${data.propertyType} with ${data.floors} floors. Includes new consumer unit, ring mains, lighting circuits, and all necessary testing and certification.`;
    case "eicr":
      return `Detailed electrical inspection and testing of all circuits in ${data.bedrooms} bedroom ${data.propertyType}. Provision of comprehensive EICR documentation highlighting any defects or recommendations.`;
    case "consumer_unit":
      return `Supply and installation of new consumer unit with appropriate RCDs and MCBs. Testing of all circuits and provision of installation certificate.`;
    case "ev_charger":
      return `Supply and installation of EV charging point including all necessary wiring, circuit protection, and testing. Includes registration with the appropriate scheme for compliance.`;
    case "lighting":
      return `Supply and installation of LED lighting system throughout the property. Includes all wiring, fixtures, and dimmer switches as required.`;
    case "smart_home":
      return `Installation of smart home system including hub, lighting controls, and integration with existing electrical systems. Includes setup and testing.`;
    case "fire_alarm":
      return `Design and installation of fire alarm system with central panel, smoke and heat detectors throughout the property. Includes certification and user training.`;
    case "maintenance":
      return `Annual maintenance contract including quarterly inspections, PAT testing, emergency callout service, and minor repairs as required.`;
    default:
      return "";
  }
};

export const getDefaultMaterialsForJobType = (jobType: string): MaterialItem[] => {
  switch (jobType) {
    case "rewire":
      return [
        { id: 1, description: "Consumer Unit", quantity: 1, unitPrice: 120 },
        { id: 2, description: "Twin Sockets", quantity: 10, unitPrice: 8 },
        { id: 3, description: "Cable (100m roll)", quantity: 2, unitPrice: 45 }
      ];
    case "eicr":
      return [
        { id: 1, description: "EICR Certificate", quantity: 1, unitPrice: 15 },
        { id: 2, description: "Minor Remedial Works", quantity: 1, unitPrice: 50 }
      ];
    case "consumer_unit":
      return [
        { id: 1, description: "Metal Consumer Unit", quantity: 1, unitPrice: 120 },
        { id: 2, description: "MCBs", quantity: 6, unitPrice: 5 },
        { id: 3, description: "RCDs", quantity: 2, unitPrice: 25 }
      ];
    case "ev_charger":
      return [
        { id: 1, description: "EV Charger Unit", quantity: 1, unitPrice: 350 },
        { id: 2, description: "SWA Cable (per meter)", quantity: 10, unitPrice: 4 },
        { id: 3, description: "Dedicated MCB", quantity: 1, unitPrice: 15 }
      ];
    case "lighting":
      return [
        { id: 1, description: "LED Downlights", quantity: 8, unitPrice: 12 },
        { id: 2, description: "LED Drivers", quantity: 8, unitPrice: 8 },
        { id: 3, description: "Dimmer Switch", quantity: 2, unitPrice: 25 }
      ];
    case "smart_home":
      return [
        { id: 1, description: "Smart Hub", quantity: 1, unitPrice: 150 },
        { id: 2, description: "Smart Light Switches", quantity: 5, unitPrice: 35 },
        { id: 3, description: "WiFi Extender", quantity: 1, unitPrice: 45 }
      ];
    case "fire_alarm":
      return [
        { id: 1, description: "Fire Alarm Panel", quantity: 1, unitPrice: 220 },
        { id: 2, description: "Smoke Detectors", quantity: 6, unitPrice: 28 },
        { id: 3, description: "Heat Detectors", quantity: 2, unitPrice: 32 },
        { id: 4, description: "Fire Resistant Cable (m)", quantity: 50, unitPrice: 2 }
      ];
    case "maintenance":
      return [
        { id: 1, description: "Quarterly Inspection", quantity: 4, unitPrice: 120 },
        { id: 2, description: "Emergency Callout", quantity: 2, unitPrice: 150 },
        { id: 3, description: "PAT Testing (per item)", quantity: 25, unitPrice: 3 }
      ];
    default:
      return [
        { id: 1, description: "Consumer Unit", quantity: 1, unitPrice: 120 },
        { id: 2, description: "Twin Sockets", quantity: 10, unitPrice: 8 }
      ];
  }
};

export const calculateLabourDays = (jobType: string, bedrooms: string): number => {
  switch (jobType) {
    case "rewire":
      return Number(bedrooms) * 1.5;
    case "eicr":
      return Number(bedrooms) * 0.5;
    case "consumer_unit":
      return 1;
    case "ev_charger":
      return 0.5;
    case "lighting":
      return 1;
    case "smart_home":
      return 1.5;
    case "fire_alarm":
      return 2;
    case "maintenance":
      return 6; // Annual total (quarterly visits)
    default:
      return 1;
  }
};
