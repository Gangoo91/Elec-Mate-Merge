/**
 * spdData.ts
 * Database of common Surge Protection Device (SPD) manufacturers, models,
 * locations, and rated kA values for MobileSelectPicker bottom sheets.
 *
 * Used across EICR, EIC, Testing Only, and Minor Works circuit editors.
 */

import { type SelectOption } from '@/components/ui/mobile-select-picker';

// ── SPD Makes ─────────────────────────────────────────────────────────────

export const SPD_MAKES: SelectOption[] = [
  { value: 'Hager', label: 'Hager' },
  { value: 'Schneider Electric', label: 'Schneider Electric' },
  { value: 'Eaton', label: 'Eaton' },
  { value: 'ABB', label: 'ABB' },
  { value: 'Wylex', label: 'Wylex' },
  { value: 'Contactum', label: 'Contactum' },
  { value: 'Lewden', label: 'Lewden' },
  { value: 'Chint', label: 'Chint' },
  { value: 'Fusebox', label: 'Fusebox' },
  { value: 'BG', label: 'BG' },
  { value: 'MK', label: 'MK' },
  { value: 'Crabtree', label: 'Crabtree' },
  { value: 'Europa', label: 'Europa' },
  { value: 'OBO Bettermann', label: 'OBO Bettermann' },
  { value: 'DEHNguard', label: 'DEHNguard' },
  { value: 'Phoenix Contact', label: 'Phoenix Contact' },
  { value: 'Weidmüller', label: 'Weidmüller' },
  { value: 'Raycap', label: 'Raycap' },
  { value: 'Finder', label: 'Finder' },
  { value: 'Saltek', label: 'Saltek' },
];

// ── SPD Models (grouped by make) ──────────────────────────────────────────

const HAGER_MODELS: SelectOption[] = [
  { value: 'SPN115', label: 'SPN115', description: 'Type 2, 15kA' },
  { value: 'SPN125', label: 'SPN125', description: 'Type 2, 25kA' },
  { value: 'SPN140', label: 'SPN140', description: 'Type 2, 40kA' },
  { value: 'SPN240', label: 'SPN240', description: 'Type 2, 40kA (2P)' },
  { value: 'SPN415', label: 'SPN415', description: 'Type 2, 15kA (3P+N)' },
  { value: 'SPN440', label: 'SPN440', description: 'Type 2, 40kA (3P+N)' },
  { value: 'SPA401', label: 'SPA401', description: 'Type 1+2, 12.5kA' },
  { value: 'SPA801', label: 'SPA801', description: 'Type 1+2, 25kA' },
];

const SCHNEIDER_MODELS: SelectOption[] = [
  { value: 'A9L16382', label: 'A9L16382', description: 'iQuick PRD 40r, Type 2' },
  { value: 'A9L16634', label: 'A9L16634', description: 'iPRD 40r, Type 2 (3P+N)' },
  { value: 'A9L15687', label: 'A9L15687', description: 'iPRD 8r, Type 2' },
  { value: 'A9L16297', label: 'A9L16297', description: 'iPRD 20r, Type 2' },
  { value: 'A9L08100', label: 'A9L08100', description: 'iPRF1 12.5r, Type 1+2' },
  { value: 'A9L65501', label: 'A9L65501', description: 'PRD1 25r, Type 1+2' },
];

const EATON_MODELS: SelectOption[] = [
  { value: 'SPPVR12/2', label: 'SPPVR12/2', description: 'Type 2, 20kA' },
  { value: 'SPPVRT12/2', label: 'SPPVRT12/2', description: 'Type 1+2, 12.5kA' },
  { value: 'SPPVRT25/2', label: 'SPPVRT25/2', description: 'Type 1+2, 25kA' },
  { value: 'SPBT12/280/1', label: 'SPBT12/280/1', description: 'Type 1+2, 12.5kA' },
  { value: 'SPBT12/280/3+1', label: 'SPBT12/280/3+1', description: 'Type 1+2, 12.5kA (3P+N)' },
];

const ABB_MODELS: SelectOption[] = [
  { value: 'OVR T2 40-275', label: 'OVR T2 40-275', description: 'Type 2, 40kA' },
  { value: 'OVR T2 15-275', label: 'OVR T2 15-275', description: 'Type 2, 15kA' },
  { value: 'OVR T1+2 12.5-275', label: 'OVR T1+2 12.5-275', description: 'Type 1+2, 12.5kA' },
  { value: 'OVR T1+2 25-275', label: 'OVR T1+2 25-275', description: 'Type 1+2, 25kA' },
];

const WYLEX_MODELS: SelectOption[] = [
  { value: 'NMSPD1245', label: 'NMSPD1245', description: 'Type 2, 45kA' },
  { value: 'NMSPD2P40', label: 'NMSPD2P40', description: 'Type 2, 40kA' },
];

const FUSEBOX_MODELS: SelectOption[] = [
  { value: 'T2SPD1P', label: 'T2SPD1P', description: 'Type 2, 20kA (SP)' },
  { value: 'T2SPD3P', label: 'T2SPD3P', description: 'Type 2, 20kA (3P+N)' },
  { value: 'T2SPD40', label: 'T2SPD40', description: 'Type 2, 40kA' },
];

const CONTACTUM_MODELS: SelectOption[] = [
  { value: 'CSPD2-40/1', label: 'CSPD2-40/1', description: 'Type 2, 40kA' },
  { value: 'CSPD2-40/3', label: 'CSPD2-40/3', description: 'Type 2, 40kA (3P+N)' },
];

const LEWDEN_MODELS: SelectOption[] = [
  { value: 'SRG1VCU', label: 'SRG1VCU', description: 'Type 2, 40kA' },
  { value: 'SRG1VCU-KIT', label: 'SRG1VCU-KIT', description: 'Type 2, 40kA kit' },
];

const CHINT_MODELS: SelectOption[] = [
  { value: 'NL1-40', label: 'NL1-40', description: 'Type 2, 40kA' },
  { value: 'NL1-15', label: 'NL1-15', description: 'Type 2, 15kA' },
];

const BG_MODELS: SelectOption[] = [
  { value: 'CUSPT2', label: 'CUSPT2', description: 'Type 2, 40kA' },
  { value: 'CUSPT2SP', label: 'CUSPT2SP', description: 'Type 2, 20kA (SP)' },
];

/** Get models for a given make, or return a generic list */
export function getSpdModelsForMake(make: string): SelectOption[] {
  const map: Record<string, SelectOption[]> = {
    'Hager': HAGER_MODELS,
    'Schneider Electric': SCHNEIDER_MODELS,
    'Eaton': EATON_MODELS,
    'ABB': ABB_MODELS,
    'Wylex': WYLEX_MODELS,
    'Fusebox': FUSEBOX_MODELS,
    'Contactum': CONTACTUM_MODELS,
    'Lewden': LEWDEN_MODELS,
    'Chint': CHINT_MODELS,
    'BG': BG_MODELS,
  };
  return map[make] || [];
}

// ── SPD Locations ─────────────────────────────────────────────────────────

export const SPD_LOCATIONS: SelectOption[] = [
  { value: 'Main DB', label: 'Main DB' },
  { value: 'Sub DB', label: 'Sub DB' },
  { value: 'Consumer Unit', label: 'Consumer Unit' },
  { value: 'Distribution Board', label: 'Distribution Board' },
  { value: 'Origin', label: 'Origin' },
  { value: 'Meter Tails', label: 'Meter Tails' },
  { value: 'Garage DB', label: 'Garage DB' },
  { value: 'Outbuilding DB', label: 'Outbuilding DB' },
  { value: 'EV Charger DB', label: 'EV Charger DB' },
  { value: 'Solar PV DB', label: 'Solar PV DB' },
];

// ── SPD Rated kA ──────────────────────────────────────────────────────────

export const SPD_RATED_KA: SelectOption[] = [
  { value: '5', label: '5 kA' },
  { value: '8', label: '8 kA' },
  { value: '10', label: '10 kA' },
  { value: '12.5', label: '12.5 kA' },
  { value: '15', label: '15 kA' },
  { value: '20', label: '20 kA' },
  { value: '25', label: '25 kA' },
  { value: '40', label: '40 kA' },
  { value: '50', label: '50 kA' },
  { value: '65', label: '65 kA' },
  { value: '100', label: '100 kA' },
];
