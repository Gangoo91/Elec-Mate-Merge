export type SymbolCategory = "lighting" | "sockets" | "switches" | "distribution" | "accessories";

export interface ElectricalSymbol {
  id: string;
  name: string;
  category: SymbolCategory;
  svg: string;
  width: number;
  height: number;
}

export const electricalSymbols: ElectricalSymbol[] = [
  // LIGHTING
  {
    id: "light-ceiling",
    name: "Ceiling Light",
    category: "lighting",
    svg: "M 20 15 L 20 20 M 15 20 L 25 20 M 20 20 L 20 25 M 12 25 L 28 25",
    width: 40,
    height: 40,
  },
  {
    id: "light-wall",
    name: "Wall Light",
    category: "lighting",
    svg: "M 15 20 L 25 20 M 20 15 L 20 25 M 15 15 L 15 25 L 25 25 L 25 15 Z",
    width: 40,
    height: 40,
  },
  {
    id: "light-emergency",
    name: "Emergency Light",
    category: "lighting",
    svg: "M 20 10 L 20 30 M 12 20 L 28 20 M 15 15 L 25 15 M 15 25 L 25 25 M 10 18 L 10 22 M 30 18 L 30 22",
    width: 40,
    height: 40,
  },
  {
    id: "light-fluorescent",
    name: "Fluorescent Light",
    category: "lighting",
    svg: "M 10 18 L 30 18 M 10 22 L 30 22 M 10 18 L 10 22 M 30 18 L 30 22",
    width: 40,
    height: 40,
  },

  // SOCKETS
  {
    id: "socket-single",
    name: "Single Socket",
    category: "sockets",
    svg: "M 12 12 L 28 12 L 28 28 L 12 28 Z M 17 16 L 17 20 M 23 16 L 23 20 M 17 24 L 23 24",
    width: 40,
    height: 40,
  },
  {
    id: "socket-double",
    name: "Double Socket",
    category: "sockets",
    svg: "M 8 12 L 32 12 L 32 28 L 8 28 Z M 13 16 L 13 20 M 16 16 L 16 20 M 24 16 L 24 20 M 27 16 L 27 20 M 13 24 L 16 24 M 24 24 L 27 24",
    width: 40,
    height: 40,
  },
  {
    id: "socket-rcd",
    name: "RCD Protected Socket",
    category: "sockets",
    svg: "M 12 12 L 28 12 L 28 28 L 12 28 Z M 17 16 L 17 20 M 23 16 L 23 20 M 17 24 L 23 24 M 20 8 L 20 12",
    width: 40,
    height: 40,
  },
  {
    id: "socket-cooker",
    name: "Cooker Socket",
    category: "sockets",
    svg: "M 10 10 L 30 10 L 30 30 L 10 30 Z M 15 15 L 15 25 M 20 15 L 20 25 M 25 15 L 25 25",
    width: 40,
    height: 40,
  },

  // SWITCHES
  {
    id: "switch-1way",
    name: "1-Way Switch",
    category: "switches",
    svg: "M 12 12 L 28 12 L 28 28 L 12 28 Z M 16 20 L 24 16",
    width: 40,
    height: 40,
  },
  {
    id: "switch-2way",
    name: "2-Way Switch",
    category: "switches",
    svg: "M 12 12 L 28 12 L 28 28 L 12 28 Z M 16 18 L 24 14 M 16 22 L 24 26",
    width: 40,
    height: 40,
  },
  {
    id: "switch-dimmer",
    name: "Dimmer Switch",
    category: "switches",
    svg: "M 12 12 L 28 12 L 28 28 L 12 28 Z M 20 20 m -4 0 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0",
    width: 40,
    height: 40,
  },
  {
    id: "switch-pullcord",
    name: "Pull Cord Switch",
    category: "switches",
    svg: "M 18 10 L 22 10 L 22 18 L 18 18 Z M 20 18 L 20 28 M 18 28 m 0 0 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0",
    width: 40,
    height: 40,
  },

  // DISTRIBUTION
  {
    id: "consumer-unit",
    name: "Consumer Unit",
    category: "distribution",
    svg: "M 8 10 L 32 10 L 32 30 L 8 30 Z M 8 18 L 32 18 M 14 14 L 14 16 M 20 14 L 20 16 M 26 14 L 26 16",
    width: 40,
    height: 40,
  },
  {
    id: "mcb",
    name: "MCB",
    category: "distribution",
    svg: "M 15 10 L 25 10 L 25 30 L 15 30 Z M 20 14 L 20 18 M 18 20 L 22 20 M 20 22 L 20 26",
    width: 40,
    height: 40,
  },
  {
    id: "rcd",
    name: "RCD",
    category: "distribution",
    svg: "M 15 10 L 25 10 L 25 30 L 15 30 Z M 20 16 m -3 0 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0 M 20 22 L 20 26",
    width: 40,
    height: 40,
  },
  {
    id: "isolator",
    name: "Isolator",
    category: "distribution",
    svg: "M 18 10 L 22 10 L 22 30 L 18 30 Z M 14 18 L 26 18 M 14 22 L 26 22",
    width: 40,
    height: 40,
  },

  // ACCESSORIES
  {
    id: "junction-box",
    name: "Junction Box",
    category: "accessories",
    svg: "M 15 15 L 25 15 L 25 25 L 15 25 Z M 20 15 L 20 25 M 15 20 L 25 20",
    width: 40,
    height: 40,
  },
  {
    id: "smoke-detector",
    name: "Smoke Detector",
    category: "accessories",
    svg: "M 20 20 m -8 0 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0 M 20 16 L 20 24 M 16 20 L 24 20",
    width: 40,
    height: 40,
  },
  {
    id: "earth-point",
    name: "Earth Point",
    category: "accessories",
    svg: "M 20 12 L 20 20 M 14 20 L 26 20 M 16 24 L 24 24 M 18 28 L 22 28",
    width: 40,
    height: 40,
  },
  {
    id: "fan",
    name: "Extractor Fan",
    category: "accessories",
    svg: "M 20 20 m -8 0 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0 M 16 16 L 24 24 M 24 16 L 16 24",
    width: 40,
    height: 40,
  },
];
