// Professional Tool Guide — Type Definitions

export interface RawlPlug {
  colour: string;
  colourHex: string;
  drillBit: string;
  screwSize: string;
  loadBrick: string;
  loadBlock: string;
  wallTypes: string;
}

export interface BoltNutSize {
  metric: string;
  spannerSize: string;
  pitch: string;
  commonUses: string;
}

export interface BoltType {
  name: string;
  headType: string;
  description: string;
  whenToUse: string;
  commonSizes: string;
}

export interface CableGland {
  size: string;
  cableODRange: string;
  commonCables: string;
  material: string;
  ipRating: string;
}

export interface ConduitSize {
  size: string;
  cableCapacity: string;
  commonAccessories: string;
  standard: string;
}

export interface TrunkingSize {
  size: string;
  cableCapacity: string;
  commonUses: string;
  accessories: string;
}

export interface SurfaceFixing {
  surface: string;
  colour: string;
  methods: {
    name: string;
    maxLoad: string;
    description: string;
    tip: string;
  }[];
}

export interface ScrewHeadType {
  name: string;
  driverSizes: string;
  identificationTip: string;
  commonUses: string;
}

export interface ScrewCategory {
  name: string;
  description: string;
  whenToUse: string;
  commonSizes: string;
}

export interface FixingsSubSection {
  id: string;
  title: string;
  tip?: string;
}

export interface Tool {
  name: string;
  description: string;
  price: string;
  priority: "essential" | "recommended" | "nice-to-have";
  standard?: string;
  brands: string[];
  apprenticeTip?: string;
}

export interface ToolSubSection {
  id: string;
  title: string;
  tools: Tool[];
}

export interface TestInstrument {
  name: string;
  description: string;
  price: string;
  tier: "basic" | "professional";
  functions?: string[];
  brands: string[];
  calibration?: string;
  apprenticeTip?: string;
}

export interface MFTFunction {
  test: string;
  purpose: string;
  acceptableRange: string;
  standard: string;
}

export interface PPEItem {
  name: string;
  description: string;
  standard: string;
  replacementFrequency: string;
  price: string;
  group: "daily" | "task-specific";
  apprenticeTip?: string;
}

export interface Supplier {
  name: string;
  url: string;
  description: string;
  bestFor: string;
  tradeAccount: boolean;
  deliveryInfo: string;
}

export interface BuyingGuide {
  category: string;
  bestSuppliers: string[];
  tip: string;
}

export interface VanStockItem {
  item: string;
  quantity: string;
  approxCost: string;
  notes: string;
}

export type ActiveCategory =
  | "fixings"
  | "hand-tools"
  | "power-tools"
  | "test-equipment"
  | "ppe"
  | "suppliers"
  | null;
