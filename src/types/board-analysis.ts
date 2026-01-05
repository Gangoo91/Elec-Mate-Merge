// UK Consumer Unit Analysis Schema - BS7671 Compliant

export type Conf = "high" | "med" | "low";

export type PictogramType =
  | "SOCKETS" | "LIGHTING" | "COOKER_OVEN" | "HOB" | "SHOWER" | "EV_CHARGER"
  | "SMOKE_ALARM" | "FIRE_ALARM" | "BOILER" | "HEATER" | "OUTDOOR"
  | "GARDEN_ROOM" | "GARAGE" | "OTHER";

export type CircuitType =
  | "ring_final" | "radial_sockets" | "lighting" | "cooker" | "shower"
  | "boiler" | "alarm" | "outdoor" | "ev" | "other";

export type DeviceCategory = "RCBO" | "MCB" | "RCD" | "AFDD" | "UNKNOWN";
export type CurveType = "B" | "C" | "D";
export type RCDType = "AC" | "A" | "F" | "B" | "S";
export type TimeDelay = "S" | "None";

export interface EvidenceField<T> {
  value: T | null;
  conf: Conf;
  evidence: string[];
}

export interface BBox {
  bbox_norm: [number, number, number, number]; // [x1, y1, x2, y2] normalized 0-1
}

export interface Pictogram extends BBox {
  type: PictogramType;
  conf: Conf;
  evidence: string[];
}

export interface DeviceRCD {
  present: EvidenceField<boolean>;
  sens_mA: EvidenceField<number>;
  type: EvidenceField<RCDType | null>;
  time_delay: EvidenceField<TimeDelay | null>;
}

export interface Device {
  category: EvidenceField<DeviceCategory>;
  curve: EvidenceField<CurveType | null>;
  rating_amps: EvidenceField<number>;
  breaking_capacity_kA: EvidenceField<number>;
  rcd: DeviceRCD;
  brand: EvidenceField<string | null>;
  series: EvidenceField<string | null>;
}

export interface CableHint {
  conductor: "TWIN_AND_EARTH_PVC_COPPER" | "UNKNOWN";
  line_csa_mm2: { value: number | null; conf: Conf; basis: string };
  cpc_csa_mm2: { value: number | null; conf: Conf; basis: string };
  notes: string[];
}

export interface Circuit {
  index: number; // 1-based left→right per rail before service block
  label_text: EvidenceField<string | null>;
  device: Device;
  pictograms: Pictogram[];
  legend_bbox_norm: [number, number, number, number] | null;
  device_bbox_norm: [number, number, number, number] | null;
  description_normalised: {
    circuit_type: CircuitType;
    phase: "1P" | "3P" | null;
    area_hint: string | null;
  };
  cable_hint?: CableHint;
}

export interface RCDGroup {
  rcd_slot: number;
  member_slots: number[];
  conf: Conf;
  evidence: string[];
}

export interface AFDDGroup {
  afdd_slot: number;
  member_slots: number[];
  conf: Conf;
  evidence: string[];
}

export interface Groups {
  rcd_groups: RCDGroup[];
  afdd_groups: AFDDGroup[];
}

export interface ServiceBlock {
  main_switch_slot: number | null;
  main_switch_rating: EvidenceField<number>;
  spd_mcb_slot: number | null;
  spd_module_slot: number | null;
  spd_status: EvidenceField<"green_ok" | "red_replace" | null>;
}

export interface Counts {
  ways_physical_total: number;
  ways_circuits_only: number;
  ways_used_incl_rcds: number;
  ways_spare: number;
  ways_blank: number;
}

export interface BoardMetadata {
  estimated_total_ways: EvidenceField<number>;
  orientation_note: EvidenceField<"left_to_right" | "right_to_left" | null>;
  rails: number; // 1 or 2
}

export interface BoardRead {
  brand: EvidenceField<string | null>;
  model: EvidenceField<string | null>;
  main_switch: {
    rating_amps: EvidenceField<number>;
    type: EvidenceField<"DP isolator" | "RCD main" | "other" | null>;
  };
  spd: {
    present: EvidenceField<boolean>;
    status: EvidenceField<"green_ok" | "red_replace" | null>;
    via_mcb: EvidenceField<boolean>;
  };
  board_metadata: BoardMetadata;
  service_block: ServiceBlock;
  groups: Groups;
  circuits: Circuit[];
  counts: Counts;
  conflicts: Array<{ field: string; values: any[]; reason: string }>;
  warnings: string[];
  decisions_log: string[];
  library_version?: string;
  regs_edition?: string;
}

// Wayfinder output (Pass 1)
export interface WayfinderResult {
  board_metadata: BoardMetadata;
  service_block_positions: {
    main_switch_slot: number | null;
    spd_mcb_slot: number | null;
    spd_module_slot: number | null;
  };
  module_classifications: Array<{
    slot: number;
    type: "MCB" | "RCBO" | "RCD" | "AFDD" | "BLANK" | "MAIN_SWITCH" | "SPD_MCB" | "SPD_MODULE";
    conf: Conf;
    evidence: string[];
  }>;
  warnings: string[];
}

// Tile output (Pass 2)
export interface TileResult {
  tile_index: number;
  crop_region: [number, number, number, number]; // [x1, y1, x2, y2] in original image
  circuits: Circuit[];
  warnings: string[];
}

// Context output (Pass 3)
export interface ContextResult {
  brand: EvidenceField<string | null>;
  model: EvidenceField<string | null>;
  main_switch: {
    rating_amps: EvidenceField<number>;
    type: EvidenceField<"DP isolator" | "RCD main" | "other" | null>;
  };
  spd: {
    present: EvidenceField<boolean>;
    status: EvidenceField<"green_ok" | "red_replace" | null>;
    via_mcb: EvidenceField<boolean>;
  };
  groups: Groups;
  warnings: string[];
}
