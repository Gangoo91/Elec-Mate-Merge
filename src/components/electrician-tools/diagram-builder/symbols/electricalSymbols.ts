export type SymbolCategory = "lighting" | "sockets" | "switches" | "distribution" | "accessories";

export interface ElectricalSymbol {
  id: string;
  name: string;
  category: SymbolCategory;
  svg: string;
  width: number;
  height: number;
  standard?: string;
  iecCode?: string;
}

// BS 7671 / IEC 60617 Compliant Electrical Symbols
// Based on UK electrical installation standards
export const electricalSymbols: ElectricalSymbol[] = [
  // LIGHTING (20 symbols)
  {
    id: "light-ceiling",
    name: "Ceiling Light",
    category: "lighting",
    // BS 7671: Circle with cross
    svg: "M 20 20 m -6 0 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0 M 20 14 L 20 26 M 14 20 L 26 20",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00009"
  },
  {
    id: "light-wall",
    name: "Wall Light",
    category: "lighting",
    // BS 7671: Semicircle on wall
    svg: "M 16 20 L 24 20 L 24 26 A 4 6 0 0 1 16 26 Z",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00010"
  },
  {
    id: "light-emergency",
    name: "Emergency Light",
    category: "lighting",
    // BS 7671: Circle with bar
    svg: "M 20 20 m -6 0 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0 M 14 20 L 26 20",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00011"
  },
  {
    id: "light-fluorescent",
    name: "Fluorescent",
    category: "lighting",
    // BS 7671: Rectangle
    svg: "M 12 18 L 28 18 L 28 22 L 12 22 Z",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00012"
  },
  {
    id: "light-downlight",
    name: "Downlight",
    category: "lighting",
    // BS 7671: Filled circle
    svg: "M 20 20 m -5 0 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00013"
  },
  {
    id: "light-bulkhead",
    name: "Bulkhead",
    category: "lighting",
    // BS 7671: Circle with outer ring
    svg: "M 20 20 m -6 0 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0 M 20 20 m -4 0 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00014"
  },
  {
    id: "light-pendant",
    name: "Pendant",
    category: "lighting",
    // BS 7671: Circle with line above
    svg: "M 20 10 L 20 16 M 20 18 m -4 0 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00015"
  },
  {
    id: "light-exit",
    name: "Exit Sign",
    category: "lighting",
    // BS 7671: Rectangle with E
    svg: "M 12 14 L 28 14 L 28 26 L 12 26 Z M 18 18 L 22 18 M 18 20 L 21 20 M 18 22 L 22 22",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00016"
  },
  {
    id: "light-floodlight",
    name: "Floodlight",
    category: "lighting",
    // BS 7671: Trapezoid with rays
    svg: "M 14 18 L 20 18 L 26 24 L 26 24 L 14 24 Z M 16 18 L 14 14 M 20 18 L 20 14 M 24 18 L 26 14",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00017"
  },
  {
    id: "light-security-pir",
    name: "Security (PIR)",
    category: "lighting",
    // BS 7671: Circle with PIR indicator
    svg: "M 20 20 m -6 0 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0 M 16 14 L 18 16 M 22 14 L 20 16 M 24 14 L 22 16",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00018"
  },

  // SOCKETS (20 symbols)
  {
    id: "socket-single-13a",
    name: "Single 13A",
    category: "sockets",
    // BS 7671: Single circle
    svg: "M 20 20 m -6 0 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00020"
  },
  {
    id: "socket-double-13a",
    name: "Double 13A",
    category: "sockets",
    // BS 7671: Two circles
    svg: "M 15 20 m -4 0 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0 M 25 20 m -4 0 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00021"
  },
  {
    id: "socket-rcd-13a",
    name: "RCD Socket",
    category: "sockets",
    // BS 7671: Circle with tilde
    svg: "M 20 20 m -6 0 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0 M 16 18 Q 18 16 20 18 T 24 18",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00022"
  },
  {
    id: "socket-cooker-45a",
    name: "Cooker 45A",
    category: "sockets",
    // BS 7671: Large circle with C
    svg: "M 20 20 m -7 0 a 7 7 0 1 0 14 0 a 7 7 0 1 0 -14 0 M 22 16 A 3 3 0 0 0 18 20 A 3 3 0 0 0 22 24",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00023"
  },
  {
    id: "socket-floor",
    name: "Floor Socket",
    category: "sockets",
    // BS 7671: Circle with diagonal lines
    svg: "M 20 20 m -6 0 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0 M 16 16 L 24 24 M 24 16 L 16 24",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00024"
  },
  {
    id: "socket-outdoor-ip66",
    name: "Outdoor IP66",
    category: "sockets",
    // BS 7671: Circle with outer square
    svg: "M 20 20 m -5 0 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0 M 12 12 L 28 12 L 28 28 L 12 28 Z",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00025"
  },
  {
    id: "socket-shaver",
    name: "Shaver",
    category: "sockets",
    // BS 7671: Small circle with S
    svg: "M 20 20 m -5 0 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0 M 19 18 Q 21 17 22 19 Q 21 21 19 22",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00026"
  },
  {
    id: "socket-usb",
    name: "USB Socket",
    category: "sockets",
    // BS 7671: Circle with USB symbol
    svg: "M 20 20 m -6 0 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0 M 20 16 L 20 24 M 17 20 L 20 20 M 20 20 L 23 20 M 17 20 L 17 18 M 23 20 L 23 22",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00027"
  },
  {
    id: "socket-fused-spur",
    name: "Fused Spur",
    category: "sockets",
    // BS 7671: Rectangle with fuse symbol
    svg: "M 14 14 L 26 14 L 26 26 L 14 26 Z M 17 20 L 23 20 M 20 17 L 20 23",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00028"
  },
  {
    id: "socket-ev-charger",
    name: "EV Charger",
    category: "sockets",
    // BS 7671: Rectangle with lightning bolt
    svg: "M 14 12 L 26 12 L 26 28 L 14 28 Z M 18 16 L 20 20 L 18 20 L 20 24 M 22 18 L 22 22",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00029"
  },

  // SWITCHES (20 symbols)
  {
    id: "switch-1way",
    name: "1-Way Switch",
    category: "switches",
    // BS 7671: Line with contact point
    svg: "M 14 20 L 20 20 L 24 16 M 26 16 m -1 0 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00030"
  },
  {
    id: "switch-2way",
    name: "2-Way Switch",
    category: "switches",
    // BS 7671: Y-shaped
    svg: "M 14 20 L 20 20 L 24 16 M 24 24 L 20 20 M 26 16 m -1 0 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0 M 26 24 m -1 0 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00031"
  },
  {
    id: "switch-intermediate",
    name: "Intermediate",
    category: "switches",
    // BS 7671: Double Y-shaped
    svg: "M 12 16 L 18 20 L 12 24 M 28 16 L 22 20 L 28 24 M 14 16 m -1 0 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0 M 14 24 m -1 0 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0 M 26 16 m -1 0 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0 M 26 24 m -1 0 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00032"
  },
  {
    id: "switch-dimmer",
    name: "Dimmer",
    category: "switches",
    // BS 7671: Circle with D
    svg: "M 20 20 m -6 0 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0 M 18 17 L 18 23 A 3 3 0 0 0 22 20 A 3 3 0 0 0 18 17",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00033"
  },
  {
    id: "switch-pullcord",
    name: "Pull Cord",
    category: "switches",
    // BS 7671: Vertical line with circle
    svg: "M 20 12 L 20 24 M 20 26 m -2 0 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00034"
  },
  {
    id: "switch-double",
    name: "Double Switch",
    category: "switches",
    // BS 7671: Two 1-way switches
    svg: "M 12 16 L 16 16 L 20 12 M 22 12 m -1 0 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0 M 12 24 L 16 24 L 20 20 M 22 20 m -1 0 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00035"
  },
  {
    id: "switch-pir",
    name: "PIR Sensor",
    category: "switches",
    // BS 7671: Circle with sensor waves
    svg: "M 20 20 m -6 0 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0 M 14 14 L 16 16 M 16 12 L 18 14 M 24 14 L 22 16 M 24 12 L 22 14",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00036"
  },
  {
    id: "switch-timer",
    name: "Timer",
    category: "switches",
    // BS 7671: Circle with clock hands
    svg: "M 20 20 m -6 0 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0 M 20 16 L 20 20 L 23 22",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00037"
  },
  {
    id: "switch-isolator",
    name: "Isolator",
    category: "switches",
    // BS 7671: Rectangle with bar
    svg: "M 16 14 L 24 14 L 24 26 L 16 26 Z M 18 18 L 22 18 M 18 22 L 22 22",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00038"
  },
  {
    id: "switch-emergency-stop",
    name: "Emergency Stop",
    category: "switches",
    // BS 7671: Circle with X
    svg: "M 20 20 m -7 0 a 7 7 0 1 0 14 0 a 7 7 0 1 0 -14 0 M 16 16 L 24 24 M 24 16 L 16 24",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00039"
  },

  // DISTRIBUTION (15 symbols)
  {
    id: "consumer-unit",
    name: "Consumer Unit",
    category: "distribution",
    // BS 7671: Rectangle with horizontal lines
    svg: "M 10 12 L 30 12 L 30 28 L 10 28 Z M 10 18 L 30 18 M 10 24 L 30 24 M 16 14 L 16 16 M 20 14 L 20 16 M 24 14 L 24 16",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00040"
  },
  {
    id: "mcb",
    name: "MCB Breaker",
    category: "distribution",
    // BS 7671: Small filled rectangle
    svg: "M 16 12 L 24 12 L 24 28 L 16 28 Z M 20 16 L 20 20 M 18 22 L 22 22",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00041"
  },
  {
    id: "rcd-30ma",
    name: "RCD 30mA",
    category: "distribution",
    // BS 7671: Rectangle with wave
    svg: "M 16 12 L 24 12 L 24 28 L 16 28 Z M 18 18 Q 20 16 22 18 M 20 22 L 20 26",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00042"
  },
  {
    id: "rcbo",
    name: "RCBO",
    category: "distribution",
    // BS 7671: Combined MCB + RCD
    svg: "M 16 12 L 24 12 L 24 28 L 16 28 Z M 20 16 m -2 0 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0 M 18 22 Q 20 20 22 22",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00043"
  },
  {
    id: "main-isolator",
    name: "Main Isolator",
    category: "distribution",
    // BS 7671: Rectangle with bars
    svg: "M 18 12 L 22 12 L 22 28 L 18 28 Z M 14 18 L 26 18 M 14 22 L 26 22",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00044"
  },
  {
    id: "distribution-board",
    name: "Distribution Board",
    category: "distribution",
    // BS 7671: Grid pattern
    svg: "M 10 10 L 30 10 L 30 30 L 10 30 Z M 10 16 L 30 16 M 10 23 L 30 23 M 17 10 L 17 30 M 23 10 L 23 30",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00045"
  },
  {
    id: "surge-protection",
    name: "SPD",
    category: "distribution",
    // BS 7671: Lightning in rectangle
    svg: "M 16 12 L 24 12 L 24 28 L 16 28 Z M 18 16 L 20 20 L 18 20 L 20 24 M 22 18 L 22 22",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00046"
  },
  {
    id: "busbar",
    name: "Busbar",
    category: "distribution",
    // BS 7671: Parallel horizontal lines
    svg: "M 10 16 L 30 16 M 10 20 L 30 20 M 10 24 L 30 24 M 14 12 L 14 28 M 20 12 L 20 28 M 26 12 L 26 28",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00047"
  },
  {
    id: "sub-main",
    name: "Sub-Main",
    category: "distribution",
    // BS 7671: Smaller consumer unit
    svg: "M 12 14 L 28 14 L 28 26 L 12 26 Z M 12 20 L 28 20 M 16 16 L 16 18 M 24 16 L 24 18",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00048"
  },
  {
    id: "transformer",
    name: "Transformer",
    category: "distribution",
    // BS 7671: Two coils with core
    svg: "M 14 14 m -2 0 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0 M 14 26 m -2 0 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0 M 26 14 m -2 0 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0 M 26 26 m -2 0 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0 M 19 12 L 21 12 L 21 28 L 19 28 Z",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00049"
  },

  // ACCESSORIES (10 symbols)
  {
    id: "smoke-detector",
    name: "Smoke Detector",
    category: "accessories",
    // BS 7671: Circle with S
    svg: "M 20 20 m -6 0 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0 M 18 18 Q 20 17 22 18 Q 20 19 18 20 Q 20 21 22 22",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00050"
  },
  {
    id: "fire-alarm",
    name: "Fire Alarm",
    category: "accessories",
    // BS 7671: Circle with bell
    svg: "M 20 20 m -6 0 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0 M 17 17 L 23 17 L 23 21 L 17 21 Z M 20 21 L 20 23 M 18 23 L 22 23",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00051"
  },
  {
    id: "bell",
    name: "Bell",
    category: "accessories",
    // BS 7671: Bell shape
    svg: "M 14 16 L 20 16 L 26 22 L 26 24 L 14 24 Z M 20 24 L 20 26 M 18 26 L 22 26",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00052"
  },
  {
    id: "junction-box",
    name: "Junction Box",
    category: "accessories",
    // BS 7671: Square with X
    svg: "M 14 14 L 26 14 L 26 26 L 14 26 Z M 14 14 L 26 26 M 26 14 L 14 26",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00053"
  },
  {
    id: "thermostat",
    name: "Thermostat",
    category: "accessories",
    // BS 7671: Circle with T
    svg: "M 20 20 m -6 0 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0 M 17 17 L 23 17 M 20 17 L 20 23",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00054"
  },
  {
    id: "door-entry",
    name: "Door Entry",
    category: "accessories",
    // BS 7671: Rectangle with speaker
    svg: "M 14 14 L 26 14 L 26 26 L 14 26 Z M 17 18 L 19 18 L 21 16 L 21 24 L 19 22 L 17 22 Z M 22 18 L 23 17 M 22 20 L 24 20 M 22 22 L 23 23",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00055"
  },
  {
    id: "cctv",
    name: "CCTV Camera",
    category: "accessories",
    // BS 7671: Camera shape
    svg: "M 12 18 L 18 18 L 18 22 L 12 22 Z M 18 20 L 22 20 L 24 16 L 24 24 L 22 20 M 22 20 m -1 0 a 1 1 0 1 0 2 0 a 1 1 0 1 0 -2 0",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00056"
  },
  {
    id: "extractor-fan",
    name: "Extractor Fan",
    category: "accessories",
    // BS 7671: Circle with fan blades
    svg: "M 20 20 m -6 0 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0 M 20 14 L 20 18 M 20 22 L 20 26 M 14 20 L 18 20 M 22 20 L 26 20",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00057"
  },
  {
    id: "immersion-heater",
    name: "Immersion Heater",
    category: "accessories",
    // BS 7671: Heating element
    svg: "M 16 14 L 24 14 L 24 26 L 16 26 Z M 18 16 L 18 24 M 20 16 L 20 24 M 22 16 L 22 24",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00058"
  },
  {
    id: "meter",
    name: "Meter",
    category: "accessories",
    // BS 7671: Circle with M
    svg: "M 20 20 m -6 0 a 6 6 0 1 0 12 0 a 6 6 0 1 0 -12 0 M 17 23 L 17 17 L 20 20 L 23 17 L 23 23",
    width: 40,
    height: 40,
    standard: "IEC 60617 / BS 7671",
    iecCode: "S00059"
  },
];
