// This file contains additional materials to complete the 400+ item database
// These will be imported and merged with the existing commonMaterials

import { MaterialItem } from "@/types/quote";

export const additionalMaterials: MaterialItem[] = [
  // =============== DISTRIBUTION (60 items) - Extended ===============
  // Additional MCBs
  {
    id: "mcb-10a-b",
    name: "10A Type B MCB",
    category: "distribution",
    subcategory: "MCBs",
    unit: "each",
    defaultPrice: 8.75,
    code: "MCB10B"
  },
  {
    id: "mcb-25a-b",
    name: "25A Type B MCB",
    category: "distribution",
    subcategory: "MCBs",
    unit: "each",
    defaultPrice: 12.50,
    code: "MCB25B"
  },
  {
    id: "mcb-63a-b",
    name: "63A Type B MCB",
    category: "distribution",
    subcategory: "MCBs",
    unit: "each",
    defaultPrice: 25.50,
    code: "MCB63B"
  },
  {
    id: "mcb-6a-c",
    name: "6A Type C MCB",
    category: "distribution",
    subcategory: "MCBs",
    unit: "each",
    defaultPrice: 9.50,
    code: "MCB6C"
  },
  {
    id: "mcb-16a-c",
    name: "16A Type C MCB",
    category: "distribution",
    subcategory: "MCBs",
    unit: "each",
    defaultPrice: 10.25,
    code: "MCB16C"
  },
  {
    id: "mcb-32a-c",
    name: "32A Type C MCB",
    category: "distribution",
    subcategory: "MCBs",
    unit: "each",
    defaultPrice: 14.50,
    code: "MCB32C"
  },

  // Additional RCBOs
  {
    id: "rcbo-6a",
    name: "6A 30mA RCBO",
    category: "distribution",
    subcategory: "RCBOs",
    unit: "each",
    defaultPrice: 25.50,
    code: "RCBO6"
  },
  {
    id: "rcbo-10a",
    name: "10A 30mA RCBO",
    category: "distribution",
    subcategory: "RCBOs",
    unit: "each",
    defaultPrice: 26.50,
    code: "RCBO10"
  },
  {
    id: "rcbo-16a",
    name: "16A 30mA RCBO",
    category: "distribution",
    subcategory: "RCBOs",
    unit: "each",
    defaultPrice: 27.50,
    code: "RCBO16"
  },
  {
    id: "rcbo-40a",
    name: "40A 30mA RCBO",
    category: "distribution",
    subcategory: "RCBOs",
    unit: "each",
    defaultPrice: 35.50,
    code: "RCBO40"
  },

  // Surge Protectors
  {
    id: "surge-type1",
    name: "Type 1 Surge Protector",
    category: "distribution",
    subcategory: "Surge Protectors",
    unit: "each",
    defaultPrice: 185.00,
    code: "SPD1"
  },
  {
    id: "surge-type2",
    name: "Type 2 Surge Protector",
    category: "distribution",
    subcategory: "Surge Protectors",
    unit: "each",
    defaultPrice: 125.00,
    code: "SPD2"
  },

  // Contactors
  {
    id: "contactor-25a",
    name: "25A 3 Pole Contactor",
    category: "distribution",
    subcategory: "Contactors",
    unit: "each",
    defaultPrice: 45.00,
    code: "CONT25A"
  },
  {
    id: "contactor-40a",
    name: "40A 3 Pole Contactor",
    category: "distribution",
    subcategory: "Contactors",
    unit: "each",
    defaultPrice: 65.00,
    code: "CONT40A"
  },

  // Distribution Boards
  {
    id: "db-12way",
    name: "12 Way Distribution Board",
    category: "distribution",
    subcategory: "Distribution Boards",
    unit: "each",
    defaultPrice: 145.00,
    code: "DB12W"
  },
  {
    id: "db-24way",
    name: "24 Way Distribution Board",
    category: "distribution",
    subcategory: "Distribution Boards",
    unit: "each",
    defaultPrice: 285.00,
    code: "DB24W"
  },

  // =============== LIGHTING (40 items) ===============
  // LED Strip & Track
  {
    id: "led-strip-5m",
    name: "5m LED Strip 24V (Warm White)",
    category: "lighting",
    subcategory: "Strip Lighting",
    unit: "each",
    defaultPrice: 35.00,
    code: "LEDSTRIP5M"
  },
  {
    id: "led-driver-24v",
    name: "24V LED Driver 60W",
    category: "lighting",
    subcategory: "Strip Lighting",
    unit: "each",
    defaultPrice: 28.50,
    code: "LEDDRV24V"
  },
  {
    id: "track-system-2m",
    name: "2m Track Lighting System",
    category: "lighting",
    subcategory: "Track Lighting",
    unit: "each",
    defaultPrice: 85.00,
    code: "TRACK2M"
  },
  {
    id: "track-spotlight",
    name: "Track Spotlight 15W LED",
    category: "lighting",
    subcategory: "Track Lighting",
    unit: "each",
    defaultPrice: 32.50,
    code: "TRACKSPOT"
  },

  // Emergency Lighting
  {
    id: "emergency-exit-led",
    name: "LED Emergency Exit Sign",
    category: "lighting",
    subcategory: "Emergency Lighting",
    unit: "each",
    defaultPrice: 45.00,
    code: "EMERGEXIT"
  },
  {
    id: "emergency-bulkhead",
    name: "Emergency Bulkhead 3W LED",
    category: "lighting",
    subcategory: "Emergency Lighting",
    unit: "each",
    defaultPrice: 55.00,
    code: "EMERGBULK"
  },
  {
    id: "emergency-downlight",
    name: "Emergency LED Downlight 3W",
    category: "lighting",
    subcategory: "Emergency Lighting",
    unit: "each",
    defaultPrice: 65.00,
    code: "EMERGDOWN"
  },

  // Smart Lighting
  {
    id: "smart-bulb-e27",
    name: "Smart LED Bulb E27 9W",
    category: "lighting",
    subcategory: "Smart Lighting",
    unit: "each",
    defaultPrice: 25.00,
    code: "SMARTBULB"
  },
  {
    id: "smart-spotlight",
    name: "Smart GU10 Spotlight 5W",
    category: "lighting",
    subcategory: "Smart Lighting",
    unit: "each",
    defaultPrice: 18.50,
    code: "SMARTGU10"
  },

  // Outdoor Lighting
  {
    id: "flood-led-50w",
    name: "50W LED Floodlight",
    category: "lighting",
    subcategory: "Outdoor Lighting",
    unit: "each",
    defaultPrice: 45.00,
    code: "FLOOD50W"
  },
  {
    id: "bollard-led",
    name: "LED Bollard Light 10W",
    category: "lighting",
    subcategory: "Outdoor Lighting",
    unit: "each",
    defaultPrice: 125.00,
    code: "BOLLARD10W"
  },
  {
    id: "wall-light-up-down",
    name: "Up/Down Wall Light 20W",
    category: "lighting",
    subcategory: "Wall Lights",
    unit: "each",
    defaultPrice: 85.00,
    code: "WALLUPDOWN"
  },

  // =============== FIRE SAFETY & DETECTION (30 items) ===============
  {
    id: "smoke-optical",
    name: "Optical Smoke Detector",
    category: "fire-safety",
    subcategory: "Smoke Detectors",
    unit: "each",
    defaultPrice: 25.00,
    code: "SMOKEOPT"
  },
  {
    id: "smoke-ionisation",
    name: "Ionisation Smoke Detector",
    category: "fire-safety",
    subcategory: "Smoke Detectors",
    unit: "each",
    defaultPrice: 22.50,
    code: "SMOKEION"
  },
  {
    id: "heat-detector-fixed",
    name: "Fixed Temperature Heat Detector",
    category: "fire-safety",
    subcategory: "Heat Detectors",
    unit: "each",
    defaultPrice: 18.50,
    code: "HEATFIX"
  },
  {
    id: "heat-detector-ror",
    name: "Rate of Rise Heat Detector",
    category: "fire-safety",
    subcategory: "Heat Detectors",
    unit: "each",
    defaultPrice: 28.50,
    code: "HEATROR"
  },
  {
    id: "fire-panel-2zone",
    name: "2 Zone Fire Alarm Panel",
    category: "fire-safety",
    subcategory: "Fire Alarm Panels",
    unit: "each",
    defaultPrice: 185.00,
    code: "FIREPANEL2Z"
  },
  {
    id: "fire-panel-8zone",
    name: "8 Zone Fire Alarm Panel",
    category: "fire-safety",
    subcategory: "Fire Alarm Panels",
    unit: "each",
    defaultPrice: 485.00,
    code: "FIREPANEL8Z"
  },
  {
    id: "call-point-break",
    name: "Break Glass Call Point",
    category: "fire-safety",
    subcategory: "Call Points",
    unit: "each",
    defaultPrice: 15.50,
    code: "CALLPOINT"
  },
  {
    id: "sounder-strobe",
    name: "Sounder Strobe Beacon",
    category: "fire-safety",
    subcategory: "Sounders & Strobes",
    unit: "each",
    defaultPrice: 35.00,
    code: "SOUNDSTB"
  },
  {
    id: "co-detector",
    name: "Carbon Monoxide Detector",
    category: "fire-safety",
    subcategory: "CO Detectors",
    unit: "each",
    defaultPrice: 32.50,
    code: "CODETECT"
  },

  // =============== EV CHARGING (25 items) ===============
  {
    id: "ev-charger-7kw",
    name: "7kW Type 2 EV Charger",
    category: "ev-charging",
    subcategory: "EV Charge Points",
    unit: "each",
    defaultPrice: 485.00,
    code: "EVCP7KW"
  },
  {
    id: "ev-charger-22kw",
    name: "22kW 3Phase EV Charger",
    category: "ev-charging",
    subcategory: "EV Charge Points",
    unit: "each",
    defaultPrice: 1250.00,
    code: "EVCP22KW"
  },
  {
    id: "ev-charger-smart",
    name: "Smart WiFi EV Charger 7kW",
    category: "ev-charging",
    subcategory: "Smart Chargers",
    unit: "each",
    defaultPrice: 685.00,
    code: "EVCPSMART"
  },
  {
    id: "ev-cable-type2",
    name: "Type 2 EV Charging Cable 5m",
    category: "ev-charging",
    subcategory: "Type 2 Cables",
    unit: "each",
    defaultPrice: 185.00,
    code: "EVCABT2"
  },
  {
    id: "ev-isolator-40a",
    name: "40A EV Isolator Switch",
    category: "ev-charging",
    subcategory: "EV Isolators",
    unit: "each",
    defaultPrice: 65.00,
    code: "EVISO40A"
  },
  {
    id: "ev-earth-rod",
    name: "Earth Rod for EV Installation",
    category: "ev-charging",
    subcategory: "Earth Electrodes",
    unit: "each",
    defaultPrice: 25.00,
    code: "EVEARTH"
  },
  {
    id: "ev-load-manager",
    name: "EV Load Management Unit",
    category: "ev-charging",
    subcategory: "Load Management",
    unit: "each",
    defaultPrice: 285.00,
    code: "EVLOADMGR"
  },

  // =============== SECURITY & ACCESS CONTROL (30 items) ===============
  {
    id: "door-entry-audio",
    name: "Audio Door Entry System",
    category: "security",
    subcategory: "Door Entry Systems",
    unit: "each",
    defaultPrice: 125.00,
    code: "DOORAUDIO"
  },
  {
    id: "door-entry-video",
    name: "Video Door Entry System",
    category: "security",
    subcategory: "Door Entry Systems",
    unit: "each",
    defaultPrice: 285.00,
    code: "DOORVIDEO"
  },
  {
    id: "cctv-camera-dome",
    name: "4MP IP Dome Camera",
    category: "security",
    subcategory: "CCTV Systems",
    unit: "each",
    defaultPrice: 125.00,
    code: "CCTVDOME"
  },
  {
    id: "cctv-camera-bullet",
    name: "4MP IP Bullet Camera",
    category: "security",
    subcategory: "CCTV Systems",
    unit: "each",
    defaultPrice: 105.00,
    code: "CCTVBULLET"
  },
  {
    id: "cctv-nvr-8ch",
    name: "8 Channel NVR 2TB",
    category: "security",
    subcategory: "CCTV Systems",
    unit: "each",
    defaultPrice: 385.00,
    code: "CCTVNVR8"
  },
  {
    id: "alarm-panel-8zone",
    name: "8 Zone Alarm Panel",
    category: "security",
    subcategory: "Burglar Alarms",
    unit: "each",
    defaultPrice: 185.00,
    code: "ALARMPANEL"
  },
  {
    id: "pir-detector",
    name: "PIR Motion Detector",
    category: "security",
    subcategory: "PIR Sensors",
    unit: "each",
    defaultPrice: 25.00,
    code: "PIRDETECT"
  },
  {
    id: "door-contact",
    name: "Magnetic Door Contact",
    category: "security",
    subcategory: "Door Contacts",
    unit: "each",
    defaultPrice: 15.50,
    code: "DOORCONTACT"
  },
  {
    id: "keypad-access",
    name: "Digital Access Keypad",
    category: "security",
    subcategory: "Access Keypads",
    unit: "each",
    defaultPrice: 85.00,
    code: "KEYPAD"
  },

  // =============== RENEWABLE ENERGY (25 items) ===============
  {
    id: "solar-panel-400w",
    name: "400W Monocrystalline Solar Panel",
    category: "renewable-energy",
    subcategory: "Solar Panels",
    unit: "each",
    defaultPrice: 185.00,
    code: "SOLAR400W"
  },
  {
    id: "solar-inverter-3kw",
    name: "3kW String Inverter",
    category: "renewable-energy",
    subcategory: "Inverters",
    unit: "each",
    defaultPrice: 485.00,
    code: "INV3KW"
  },
  {
    id: "solar-inverter-5kw",
    name: "5kW Hybrid Inverter",
    category: "renewable-energy",
    subcategory: "Inverters",
    unit: "each",
    defaultPrice: 1250.00,
    code: "INV5KWHYB"
  },
  {
    id: "battery-10kwh",
    name: "10kWh Lithium Battery",
    category: "renewable-energy",
    subcategory: "Battery Storage",
    unit: "each",
    defaultPrice: 2850.00,
    code: "BATT10KWH"
  },
  {
    id: "pv-isolator-dc",
    name: "DC PV Isolator Switch",
    category: "renewable-energy",
    subcategory: "DC Isolators",
    unit: "each",
    defaultPrice: 85.00,
    code: "PVISODC"
  },
  {
    id: "generation-meter",
    name: "Generation Meter (Export)",
    category: "renewable-energy",
    subcategory: "Generation Meters",
    unit: "each",
    defaultPrice: 125.00,
    code: "GENMETER"
  },
  {
    id: "solar-mounting",
    name: "Solar Panel Mounting Kit",
    category: "renewable-energy",
    subcategory: "Mounting Systems",
    unit: "each",
    defaultPrice: 45.00,
    code: "SOLARMOUNT"
  },

  // =============== HEATING & HVAC (10 items) ===============
  {
    id: "electric-rad-1kw",
    name: "1kW Electric Radiator",
    category: "heating",
    subcategory: "Electric Radiators",
    unit: "each",
    defaultPrice: 125.00,
    code: "ERAD1KW"
  },
  {
    id: "electric-rad-2kw",
    name: "2kW Electric Radiator",
    category: "heating",
    subcategory: "Electric Radiators",
    unit: "each",
    defaultPrice: 185.00,
    code: "ERAD2KW"
  },
  {
    id: "ufh-mat-150w",
    name: "150W/m² Underfloor Heating Mat",
    category: "heating",
    subcategory: "Underfloor Heating",
    unit: "m²",
    defaultPrice: 45.00,
    code: "UFHMAT150"
  },
  {
    id: "ufh-thermostat",
    name: "UFH Digital Thermostat",
    category: "heating",
    subcategory: "Thermostats",
    unit: "each",
    defaultPrice: 85.00,
    code: "UFHTHERM"
  },
  {
    id: "immersion-3kw",
    name: "3kW Immersion Heater",
    category: "heating",
    subcategory: "Immersion Heaters",
    unit: "each",
    defaultPrice: 65.00,
    code: "IMMERS3KW"
  },

  // =============== CONTAINMENT (20 items) ===============
  {
    id: "conduit-20mm",
    name: "20mm PVC Conduit (3m)",
    category: "containment",
    subcategory: "Conduit",
    unit: "each",
    defaultPrice: 4.50,
    code: "COND20MM"
  },
  {
    id: "conduit-25mm",
    name: "25mm PVC Conduit (3m)",
    category: "containment",
    subcategory: "Conduit",
    unit: "each",
    defaultPrice: 6.50,
    code: "COND25MM"
  },
  {
    id: "trunking-50x50",
    name: "50x50mm Trunking (2m)",
    category: "containment",
    subcategory: "Trunking",
    unit: "each",
    defaultPrice: 12.50,
    code: "TRUNK5050"
  },
  {
    id: "trunking-100x50",
    name: "100x50mm Trunking (2m)",
    category: "containment",
    subcategory: "Trunking",
    unit: "each",
    defaultPrice: 18.50,
    code: "TRUNK10050"
  },
  {
    id: "cable-tray-300mm",
    name: "300mm Perforated Cable Tray",
    category: "containment",
    subcategory: "Cable Tray",
    unit: "metre",
    defaultPrice: 25.00,
    code: "TRAY300"
  },
  {
    id: "cable-clips-6mm",
    name: "6mm Cable Clips (Pack 100)",
    category: "containment",
    subcategory: "Clips & Fixings",
    unit: "pack",
    defaultPrice: 8.50,
    code: "CLIP6MM"
  },

  // =============== DATA & COMMUNICATIONS (20 items) ===============
  {
    id: "network-switch-8port",
    name: "8 Port Gigabit Switch",
    category: "data-comms",
    subcategory: "Network Equipment",
    unit: "each",
    defaultPrice: 45.00,
    code: "NETSWI8P"
  },
  {
    id: "wifi-access-point",
    name: "WiFi 6 Access Point",
    category: "data-comms",
    subcategory: "Wi-Fi Access Points",
    unit: "each",
    defaultPrice: 125.00,
    code: "WIFIAP6"
  },
  {
    id: "patch-panel-24port",
    name: "24 Port Cat6 Patch Panel",
    category: "data-comms",
    subcategory: "Patch Panels",
    unit: "each",
    defaultPrice: 65.00,
    code: "PATCH24P"
  },
  {
    id: "network-cabinet-6u",
    name: "6U Network Wall Cabinet",
    category: "data-comms",
    subcategory: "Network Cabinets",
    unit: "each",
    defaultPrice: 185.00,
    code: "NETCAB6U"
  },
  {
    id: "rj45-connector",
    name: "RJ45 Connector (Pack 50)",
    category: "data-comms",
    subcategory: "RJ45 Connectors",
    unit: "pack",
    defaultPrice: 25.00,
    code: "RJ45PACK"
  },

  // =============== TESTING & CERTIFICATION (15 items) ===============
  {
    id: "test-multifunction",
    name: "Multifunction Tester",
    category: "testing",
    subcategory: "Testing Equipment",
    unit: "each",
    defaultPrice: 1850.00,
    code: "TESTMULTI"
  },
  {
    id: "test-pat",
    name: "PAT Testing Equipment",
    category: "testing",
    subcategory: "PAT Testing",
    unit: "each",
    defaultPrice: 485.00,
    code: "TESTPAT"
  },
  {
    id: "test-rcd",
    name: "RCD Test Socket",
    category: "testing",
    subcategory: "RCD Testing",
    unit: "each",
    defaultPrice: 125.00,
    code: "TESTRCD"
  },
  {
    id: "cert-eicr",
    name: "EICR Certificate Pad",
    category: "testing",
    subcategory: "Certificates",
    unit: "each",
    defaultPrice: 15.50,
    code: "CERTEICR"
  },
  {
    id: "cert-eic",
    name: "EIC Certificate Pad",
    category: "testing",
    subcategory: "Certificates",
    unit: "each",
    defaultPrice: 15.50,
    code: "CERTEIC"
  },

  // =============== SAFETY & PPE (15 items) ===============
  {
    id: "hard-hat-white",
    name: "White Safety Hard Hat",
    category: "safety-ppe",
    subcategory: "Hard Hats",
    unit: "each",
    defaultPrice: 15.50,
    code: "HATWHITE"
  },
  {
    id: "safety-boots-s3",
    name: "S3 Safety Boots (Size 9)",
    category: "safety-ppe",
    subcategory: "Safety Boots",
    unit: "pair",
    defaultPrice: 85.00,
    code: "BOOTS3S9"
  },
  {
    id: "hi-vis-vest",
    name: "Hi-Vis Vest Orange",
    category: "safety-ppe",
    subcategory: "High Vis Clothing",
    unit: "each",
    defaultPrice: 12.50,
    code: "HIVEST"
  },
  {
    id: "voltage-tester",
    name: "Voltage Tester 12-1000V",
    category: "safety-ppe",
    subcategory: "Voltage Testers",
    unit: "each",
    defaultPrice: 65.00,
    code: "VOLTTEST"
  },
  {
    id: "lockout-kit",
    name: "Electrical Lockout Kit",
    category: "safety-ppe",
    subcategory: "Lockout Devices",
    unit: "each",
    defaultPrice: 125.00,
    code: "LOCKOUT"
  }
];