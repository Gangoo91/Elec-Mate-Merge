// GENERATED from src/constants/minorWorksOptions.ts — regenerate with
//   node scripts/gen-minor-works-labels.mjs
// The Minor Works form stores option VALUES ('twin-earth', 'eal-level3'); the
// certificate must print the LABELS ('Twin & Earth', 'EAL Level 3'). Until
// 30 Sep 2026 the raw values were printed on every issued certificate.

export const MW_LABELS = {
  "WORK_TYPE": {
    "addition": "Addition to Existing Circuit",
    "alteration": "Alteration to Existing Circuit",
    "replacement": "Replacement of Equipment",
    "new": "New Circuit",
    "repair": "Repair",
    "other": "Other"
  },
  "CIRCUIT_TYPE": {
    "radial": "Radial Circuit",
    "ring": "Ring Final Circuit"
  },
  "CABLE_TYPE": {
    "twin-earth": "Twin & Earth",
    "3-core-earth": "3 Core + Earth",
    "flex": "Flex",
    "singles-pvc": "Singles PVC",
    "singles-lsf": "Singles LSF",
    "swa-pvc": "SWA PVC",
    "swa-xlpe": "SWA XLPE",
    "armoured-singles": "Armoured Singles",
    "micc": "MICC",
    "fire-resistant": "Fire Resistant",
    "data-cable": "Data Cable",
    "coax": "Coax",
    "other": "Other"
  },
  "INSTALLATION_METHOD": {
    "clipped-direct": "Clipped Direct",
    "surface-conduit": "Surface Conduit",
    "concealed-conduit": "Concealed Conduit",
    "surface-trunking": "Surface Trunking",
    "flush-trunking": "Flush Trunking",
    "cable-tray": "Cable Tray",
    "cable-basket": "Cable Basket",
    "under-plaster": "Under Plaster",
    "thermally-insulated": "Thermally Insulated",
    "accessible-floor": "Accessible Floor Void",
    "ceiling-void": "Ceiling Void",
    "buried-direct": "Buried Direct",
    "in-duct": "In Duct",
    "other": "Other"
  },
  "REFERENCE_METHOD": {
    "100": "100",
    "101": "101",
    "102": "102",
    "103": "103",
    "A": "A",
    "B": "B",
    "C": "C",
    "D": "D",
    "E": "E",
    "F": "F",
    "G": "G",
    "M": "M",
    "N/A": "N/A",
    "LIM": "LIM"
  },
  "PROTECTIVE_DEVICE_TYPE": {
    "mcb-type-a": "MCB Type A",
    "mcb-type-b": "MCB Type B",
    "mcb-type-c": "MCB Type C",
    "mcb-type-d": "MCB Type D",
    "rcbo-type-ac": "RCBO Type AC",
    "rcbo-type-a": "RCBO Type A",
    "rcbo-type-f": "RCBO Type F",
    "rcbo-type-b": "RCBO Type B",
    "fuse-bs88": "Fuse BS 88-2",
    "fuse-bs88-3": "Fuse BS 88-3",
    "fuse-bs3036": "Fuse BS 3036",
    "fuse-bs1361": "Fuse BS 1361",
    "fuse-bs1362": "Fuse BS 1362",
    "mccb": "MCCB",
    "other": "Other"
  },
  "QUALIFICATION": {
    "nvq3": "NVQ Level 3",
    "nvq3-2357": "City & Guilds 2357",
    "city-guilds-2391": "City & Guilds 2391",
    "city-guilds-2382": "City & Guilds 2382",
    "city-guilds-2394": "City & Guilds 2394",
    "city-guilds-2395": "City & Guilds 2395",
    "eal-level3": "EAL Level 3",
    "eal-2391": "EAL 2391 Equivalent",
    "am2": "AM2/AM2S",
    "jib-approved": "JIB Approved Electrician",
    "other": "Other"
  },
  "SCHEME_PROVIDER": {
    "niceic": "NICEIC",
    "napit": "NAPIT",
    "elecsa": "ELECSA",
    "stroma": "Stroma",
    "bpec": "BPEC",
    "certass": "Certass",
    "oftec": "OFTEC",
    "eca": "ECA",
    "select": "SELECT",
    "none": "None",
    "other": "Other"
  },
  "EARTHING_ARRANGEMENT": {
    "TN-C-S": "TN-C-S (PME)",
    "TN-S": "TN-S",
    "TT": "TT",
    "IT": "IT"
  },
  "RCD_TYPE": {
    "AC": "Type AC",
    "A": "Type A",
    "F": "Type F",
    "B": "Type B"
  }
} as const;

type MapName = keyof typeof MW_LABELS;

/** Label for a stored option value; unknown or free-typed values pass through untouched. */
export function mwLabel(map: MapName, value: unknown): string {
  const v = String(value ?? '').trim();
  if (!v) return '';
  const table = MW_LABELS[map] as Record<string, string>;
  return table[v] ?? table[v.toLowerCase()] ?? v;
}

/** Scheme provider for printing: blank when none / not registered. */
export function mwSchemeLabel(value: unknown): string {
  const v = String(value ?? '').trim();
  if (!v || /^(none|not registered|n\/a)$/i.test(v)) return '';
  return mwLabel('SCHEME_PROVIDER', v);
}
