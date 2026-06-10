/**
 * AI proposal → designer state resolvers.
 *
 * Separate from designIntake.ts on purpose: these need the full kit databases
 * (panel/inverter/charger lookups by id), which the designer pages already
 * load — but the Design Suite landing page must not pull ~110 KB of kit data
 * just to render a textarea. designIntake.ts builds its catalogues via
 * dynamic import instead.
 *
 * Every numeric field is positivity-guarded: the model returns 0 for
 * "unstated" and can hallucinate negatives/strings — the deterministic engine
 * must never run checks on those.
 */

import { SOLAR_PANELS } from '@/data/solarPanelDatabase';
import { SOLAR_INVERTERS } from '@/data/solarInverterDatabase';
import { EV_CHARGERS } from '@/data/evChargerDatabase';
import {
  defaultSolarDesign,
  defaultBatteryDesign,
  defaultEVDesign,
  defaultHeatPumpDesign,
  type SolarDesignState,
  type BatteryDesignState,
  type EVDesignState,
  type HeatPumpDesignState,
} from './designEngine';
import type { DesignProposal } from './designIntake';

/** Finite and strictly positive, else the fallback. */
const pos = (n: unknown, fallback: number): number =>
  typeof n === 'number' && Number.isFinite(n) && n > 0 ? n : fallback;

export function solarStateFromProposal(p: DesignProposal): {
  state: SolarDesignState;
  panelId: string;
  inverterId: string;
} {
  const d = defaultSolarDesign();
  const s = p.solar;
  if (!s) return { state: d, panelId: '', inverterId: '' };
  const panel = s.panelId ? (SOLAR_PANELS.find((x) => x.id === s.panelId) ?? null) : null;
  const inverter = s.inverterId
    ? (SOLAR_INVERTERS.find((x) => x.id === s.inverterId) ?? null)
    : null;
  return {
    state: {
      ...d,
      panel,
      inverter,
      targetKwp: pos(s.targetKwp, d.targetKwp),
      dcRunM: pos(s.dcRunM, d.dcRunM),
      acRunM: pos(s.acRunM, d.acRunM),
      batteryKw: pos(s.batteryKw, 0),
      dnoExportKw: pos(s.dnoExportKw, d.dnoExportKw),
      systemCost: pos(s.systemCost, 0),
      specificYield: pos(s.specificYield, d.specificYield),
    },
    panelId: panel?.id ?? '',
    inverterId: inverter?.id ?? '',
  };
}

export function batteryStateFromProposal(p: DesignProposal): BatteryDesignState {
  const d = defaultBatteryDesign();
  const b = p.battery;
  if (!b) return d;
  // Whitelist-copy known fields — never spread model output into state.
  return {
    ...d,
    batteryMake: typeof b.batteryMake === 'string' ? b.batteryMake.slice(0, 60) : '',
    batteryModel: typeof b.batteryModel === 'string' ? b.batteryModel.slice(0, 60) : '',
    usableKwh: pos(b.usableKwh, d.usableKwh),
    maxChargeKw: pos(b.maxChargeKw, pos(b.inverterKw, d.maxChargeKw)),
    coupling: b.coupling === 'dc-hybrid' ? 'dc-hybrid' : 'ac',
    inverterKw: pos(b.inverterKw, d.inverterKw),
    dailyUsageKwh: pos(b.dailyUsageKwh, d.dailyUsageKwh),
    pvInverterKw: pos(b.pvInverterKw, 0),
    dnoExportKw: pos(b.dnoExportKw, d.dnoExportKw),
    phases: b.phases === 3 ? 3 : 1,
  };
}

export function evStateFromProposal(p: DesignProposal): EVDesignState {
  const d = defaultEVDesign();
  const e = p.ev;
  if (!e) return d;
  const charger = e.chargerId ? (EV_CHARGERS.find((c) => c.id === e.chargerId) ?? null) : null;
  return {
    ...d,
    charger,
    chargerKw: pos(e.chargerKw, charger?.powerOptions[0] ?? d.chargerKw),
    numChargers: Math.min(50, Math.max(1, Math.round(pos(e.numChargers, 1)))),
    diversityPct: Math.min(100, pos(e.diversityPct, d.diversityPct)),
    spareKw: pos(e.spareKw, d.spareKw),
    earthing:
      e.earthing === 'pme-od' || e.earthing === 'matt-e' || e.earthing === 'tt' ? e.earthing : '',
  };
}

export function heatPumpStateFromProposal(p: DesignProposal): HeatPumpDesignState {
  const d = defaultHeatPumpDesign();
  const h = p.heatPump;
  if (!h) return d;
  return {
    ...d,
    floorArea: pos(h.floorArea, d.floorArea),
    heatLossFactor: pos(h.heatLossFactor, d.heatLossFactor),
    dhwKw: pos(h.dhwKw, d.dhwKw),
    scop: pos(h.scop, d.scop),
    phases: h.phases === 3 ? 3 : 1,
  };
}
