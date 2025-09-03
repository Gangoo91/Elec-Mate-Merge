export interface AppliancePreset {
  name: string;
  powerW: number;
  standbyW: number;
  usageMode: "hoursPerDay" | "cyclesPerWeek";
  hoursPerDay?: number;
  cycleHours?: number;
  cyclesPerWeek?: number;
  category?: string;
}

export interface EnvironmentPresets {
  [key: string]: {
    name: string;
    categories: {
      [key: string]: {
        name: string;
        appliances: Record<string, AppliancePreset>;
      };
    };
  };
}

export const environmentPresets: EnvironmentPresets = {
  domestic: {
    name: "Domestic",
    categories: {
      kitchen: {
        name: "Kitchen Appliances",
        appliances: {
          oven: { name: "Electric Oven", powerW: 2400, standbyW: 0, usageMode: "hoursPerDay", hoursPerDay: 1.0 },
          hob: { name: "Electric Hob", powerW: 2000, standbyW: 0, usageMode: "hoursPerDay", hoursPerDay: 0.8 },
          microwave: { name: "Microwave", powerW: 800, standbyW: 3, usageMode: "hoursPerDay", hoursPerDay: 0.3 },
          airfryer: { name: "Air Fryer", powerW: 1500, standbyW: 0, usageMode: "hoursPerDay", hoursPerDay: 0.5 },
          kettle: { name: "Kettle", powerW: 3000, standbyW: 0, usageMode: "hoursPerDay", hoursPerDay: 0.2 },
          toaster: { name: "Toaster", powerW: 1200, standbyW: 0, usageMode: "hoursPerDay", hoursPerDay: 0.1 },
          dishwasher: { name: "Dishwasher", powerW: 1800, standbyW: 2, usageMode: "cyclesPerWeek", cycleHours: 1.0, cyclesPerWeek: 3 },
          fridge: { name: "Fridge/Freezer", powerW: 150, standbyW: 0, usageMode: "hoursPerDay", hoursPerDay: 24 },
          freezer: { name: "Chest Freezer", powerW: 120, standbyW: 0, usageMode: "hoursPerDay", hoursPerDay: 24 },
          blender: { name: "Blender", powerW: 500, standbyW: 0, usageMode: "hoursPerDay", hoursPerDay: 0.1 }
        }
      },
      laundry: {
        name: "Laundry & Cleaning",
        appliances: {
          washingmachine: { name: "Washing Machine", powerW: 700, standbyW: 2, usageMode: "cyclesPerWeek", cycleHours: 1.5, cyclesPerWeek: 4 },
          tumbledryer: { name: "Tumble Dryer", powerW: 2500, standbyW: 2, usageMode: "cyclesPerWeek", cycleHours: 1.0, cyclesPerWeek: 3 },
          washerdryer: { name: "Washer-Dryer", powerW: 2200, standbyW: 3, usageMode: "cyclesPerWeek", cycleHours: 2.5, cyclesPerWeek: 3 },
          iron: { name: "Iron", powerW: 2000, standbyW: 0, usageMode: "hoursPerDay", hoursPerDay: 0.3 },
          vacuum: { name: "Vacuum Cleaner", powerW: 1400, standbyW: 0, usageMode: "hoursPerDay", hoursPerDay: 0.3 }
        }
      },
      entertainment: {
        name: "Entertainment & Computing",
        appliances: {
          tv: { name: "LED TV 50\"", powerW: 100, standbyW: 10, usageMode: "hoursPerDay", hoursPerDay: 4 },
          tv_large: { name: "OLED TV 65\"", powerW: 180, standbyW: 15, usageMode: "hoursPerDay", hoursPerDay: 4 },
          soundbar: { name: "Soundbar", powerW: 40, standbyW: 8, usageMode: "hoursPerDay", hoursPerDay: 4 },
          games_console: { name: "Games Console", powerW: 120, standbyW: 12, usageMode: "hoursPerDay", hoursPerDay: 2 },
          laptop: { name: "Laptop", powerW: 65, standbyW: 2, usageMode: "hoursPerDay", hoursPerDay: 6 },
          desktop: { name: "Desktop PC", powerW: 300, standbyW: 5, usageMode: "hoursPerDay", hoursPerDay: 4 },
          router: { name: "WiFi Router", powerW: 12, standbyW: 0, usageMode: "hoursPerDay", hoursPerDay: 24 }
        }
      },
      comfort: {
        name: "Heating & Comfort",
        appliances: {
          heater_portable: { name: "Portable Heater", powerW: 2000, standbyW: 0, usageMode: "hoursPerDay", hoursPerDay: 3 },
          fan_tower: { name: "Tower Fan", powerW: 45, standbyW: 0, usageMode: "hoursPerDay", hoursPerDay: 4 },
          air_conditioner: { name: "Portable AC", powerW: 1000, standbyW: 5, usageMode: "hoursPerDay", hoursPerDay: 2 },
          dehumidifier: { name: "Dehumidifier", powerW: 350, standbyW: 3, usageMode: "hoursPerDay", hoursPerDay: 8 },
          electric_blanket: { name: "Electric Blanket", powerW: 100, standbyW: 0, usageMode: "hoursPerDay", hoursPerDay: 6 }
        }
      }
    }
  },
  commercial: {
    name: "Commercial",
    categories: {
      office: {
        name: "Office Equipment",
        appliances: {
          workstation: { name: "Office Workstation", powerW: 200, standbyW: 10, usageMode: "hoursPerDay", hoursPerDay: 8 },
          printer_laser: { name: "Laser Printer", powerW: 600, standbyW: 15, usageMode: "hoursPerDay", hoursPerDay: 1 },
          photocopier: { name: "Office Photocopier", powerW: 1200, standbyW: 50, usageMode: "hoursPerDay", hoursPerDay: 2 },
          server: { name: "Small Server", powerW: 400, standbyW: 0, usageMode: "hoursPerDay", hoursPerDay: 24 },
          projector: { name: "Meeting Room Projector", powerW: 250, standbyW: 8, usageMode: "hoursPerDay", hoursPerDay: 2 },
          shredder: { name: "Paper Shredder", powerW: 200, standbyW: 2, usageMode: "hoursPerDay", hoursPerDay: 0.5 }
        }
      },
      retail: {
        name: "Retail Equipment",
        appliances: {
          till: { name: "Electronic Till", powerW: 150, standbyW: 5, usageMode: "hoursPerDay", hoursPerDay: 10 },
          pos_terminal: { name: "POS Terminal", powerW: 50, standbyW: 3, usageMode: "hoursPerDay", hoursPerDay: 10 },
          barcode_scanner: { name: "Barcode Scanner", powerW: 5, standbyW: 2, usageMode: "hoursPerDay", hoursPerDay: 8 },
          display_fridge: { name: "Display Refrigerator", powerW: 300, standbyW: 0, usageMode: "hoursPerDay", hoursPerDay: 24 },
          security_camera: { name: "Security Camera", powerW: 15, standbyW: 0, usageMode: "hoursPerDay", hoursPerDay: 24 },
          led_signage: { name: "LED Signage", powerW: 100, standbyW: 0, usageMode: "hoursPerDay", hoursPerDay: 12 }
        }
      },
      catering: {
        name: "Commercial Catering",
        appliances: {
          commercial_oven: { name: "Commercial Oven", powerW: 5000, standbyW: 50, usageMode: "hoursPerDay", hoursPerDay: 6 },
          fryer: { name: "Deep Fat Fryer", powerW: 3000, standbyW: 0, usageMode: "hoursPerDay", hoursPerDay: 4 },
          grill: { name: "Commercial Grill", powerW: 2500, standbyW: 0, usageMode: "hoursPerDay", hoursPerDay: 4 },
          coffee_machine: { name: "Commercial Coffee Machine", powerW: 1500, standbyW: 50, usageMode: "hoursPerDay", hoursPerDay: 8 },
          dishwasher_commercial: { name: "Commercial Dishwasher", powerW: 3500, standbyW: 20, usageMode: "cyclesPerWeek", cycleHours: 0.5, cyclesPerWeek: 20 },
          walk_in_freezer: { name: "Walk-in Freezer", powerW: 2000, standbyW: 0, usageMode: "hoursPerDay", hoursPerDay: 24 }
        }
      }
    }
  },
  industrial: {
    name: "Industrial",
    categories: {
      motors: {
        name: "Motors & Drives",
        appliances: {
          motor_small: { name: "3-Phase Motor 5.5kW", powerW: 5500, standbyW: 0, usageMode: "hoursPerDay", hoursPerDay: 8 },
          motor_medium: { name: "3-Phase Motor 15kW", powerW: 15000, standbyW: 0, usageMode: "hoursPerDay", hoursPerDay: 8 },
          motor_large: { name: "3-Phase Motor 37kW", powerW: 37000, standbyW: 0, usageMode: "hoursPerDay", hoursPerDay: 16 },
          compressor: { name: "Air Compressor 11kW", powerW: 11000, standbyW: 50, usageMode: "hoursPerDay", hoursPerDay: 6 },
          pump: { name: "Industrial Pump 7.5kW", powerW: 7500, standbyW: 0, usageMode: "hoursPerDay", hoursPerDay: 12 },
          conveyor: { name: "Conveyor System", powerW: 2200, standbyW: 10, usageMode: "hoursPerDay", hoursPerDay: 16 }
        }
      },
      heating: {
        name: "Industrial Heating",
        appliances: {
          furnace: { name: "Electric Furnace 50kW", powerW: 50000, standbyW: 200, usageMode: "hoursPerDay", hoursPerDay: 12 },
          kiln: { name: "Industrial Kiln 25kW", powerW: 25000, standbyW: 100, usageMode: "hoursPerDay", hoursPerDay: 8 },
          heater_industrial: { name: "Space Heater 10kW", powerW: 10000, standbyW: 50, usageMode: "hoursPerDay", hoursPerDay: 8 },
          drying_oven: { name: "Drying Oven 15kW", powerW: 15000, standbyW: 75, usageMode: "hoursPerDay", hoursPerDay: 6 }
        }
      },
      machinery: {
        name: "Manufacturing Equipment",
        appliances: {
          cnc_machine: { name: "CNC Machine", powerW: 12000, standbyW: 100, usageMode: "hoursPerDay", hoursPerDay: 16 },
          welding_station: { name: "Welding Station", powerW: 8000, standbyW: 20, usageMode: "hoursPerDay", hoursPerDay: 4 },
          press: { name: "Hydraulic Press", powerW: 18000, standbyW: 50, usageMode: "hoursPerDay", hoursPerDay: 6 },
          lathe: { name: "Industrial Lathe", powerW: 9000, standbyW: 30, usageMode: "hoursPerDay", hoursPerDay: 8 },
          grinder: { name: "Industrial Grinder", powerW: 4000, standbyW: 0, usageMode: "hoursPerDay", hoursPerDay: 4 }
        }
      },
      lighting: {
        name: "Industrial Lighting",
        appliances: {
          led_highbay: { name: "LED High Bay Light", powerW: 150, standbyW: 0, usageMode: "hoursPerDay", hoursPerDay: 12 },
          fluorescent_old: { name: "T8 Fluorescent Fitting", powerW: 72, standbyW: 8, usageMode: "hoursPerDay", hoursPerDay: 12 },
          flood_light: { name: "LED Flood Light", powerW: 200, standbyW: 0, usageMode: "hoursPerDay", hoursPerDay: 12 },
          emergency_lighting: { name: "Emergency Lighting", powerW: 8, standbyW: 2, usageMode: "hoursPerDay", hoursPerDay: 24 }
        }
      }
    }
  }
};

// Utility function to get all appliances for an environment
export const getAppliancesForEnvironment = (environment: string): Record<string, AppliancePreset> => {
  const env = environmentPresets[environment];
  if (!env) return {};
  
  const allAppliances: Record<string, AppliancePreset> = {};
  
  Object.entries(env.categories).forEach(([categoryKey, category]) => {
    Object.entries(category.appliances).forEach(([applianceKey, appliance]) => {
      allAppliances[`${categoryKey}_${applianceKey}`] = {
        ...appliance,
        category: category.name
      };
    });
  });
  
  return allAppliances;
};

// Utility function to get categories for an environment
export const getCategoriesForEnvironment = (environment: string): Array<{ key: string; name: string }> => {
  const env = environmentPresets[environment];
  if (!env) return [];
  
  return Object.entries(env.categories).map(([key, category]) => ({
    key,
    name: category.name
  }));
};

// Utility function to get appliances for a specific category
export const getAppliancesForCategory = (environment: string, categoryKey: string): Record<string, AppliancePreset> => {
  const env = environmentPresets[environment];
  if (!env || !env.categories[categoryKey]) return {};
  
  const category = env.categories[categoryKey];
  const appliances: Record<string, AppliancePreset> = {};
  
  Object.entries(category.appliances).forEach(([applianceKey, appliance]) => {
    appliances[`${categoryKey}_${applianceKey}`] = {
      ...appliance,
      category: category.name
    };
  });
  
  return appliances;
};