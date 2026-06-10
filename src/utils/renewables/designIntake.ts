/**
 * Renewable Design Suite — AI intake client.
 *
 * Sends the job description plus compact kit catalogues (single source of
 * truth: src/data databases, loaded on demand so the landing page stays
 * light) to the intake function. The AI only ever picks ids from the
 * catalogues; the deterministic engine verifies everything it proposes.
 * Proposal → state resolution lives in designProposalResolvers.ts.
 */

import { supabase } from '@/integrations/supabase/client';
import { FunctionsHttpError } from '@supabase/supabase-js';
import type { BatteryDesignState, EVDesignState, HeatPumpDesignState } from './designEngine';

export type DesignTechnology = 'solar' | 'battery' | 'ev' | 'heat-pump';

const TECHNOLOGIES: readonly DesignTechnology[] = ['solar', 'battery', 'ev', 'heat-pump'];

export interface DesignProposal {
  technology: DesignTechnology;
  notes: string[];
  solar?: {
    panelId: string | null;
    inverterId: string | null;
    targetKwp: number;
    dcRunM?: number;
    acRunM?: number;
    batteryKw?: number;
    dnoExportKw?: number;
    systemCost?: number;
    specificYield?: number;
  };
  battery?: Partial<BatteryDesignState>;
  ev?: {
    chargerId: string | null;
    chargerKw: number;
    numChargers: number;
    diversityPct?: number;
    spareKw?: number;
    earthing?: EVDesignState['earthing'];
  };
  heatPump?: Partial<HeatPumpDesignState>;
}

const INTAKE_TIMEOUT_MS = 45000;

async function buildCatalogues() {
  // Loaded on demand — ~110 KB of kit data must not ship with the landing page.
  const [{ SOLAR_PANELS }, { SOLAR_INVERTERS }, { EV_CHARGERS }] = await Promise.all([
    import('@/data/solarPanelDatabase'),
    import('@/data/solarInverterDatabase'),
    import('@/data/evChargerDatabase'),
  ]);
  return {
    panels: SOLAR_PANELS.map((p) => ({
      id: p.id,
      label: `${p.make} ${p.model} — ${p.wattage} Wp, Voc ${p.voc} V, ${p.cellType}`,
    })),
    inverters: SOLAR_INVERTERS.map((i) => ({
      id: i.id,
      label: `${i.make} ${i.model} — ${i.ratedPowerAc} kW AC, ${i.phases}-phase, ${i.mpptCount} MPPT${i.hybridCapable ? ', hybrid' : ''}`,
    })),
    chargers: EV_CHARGERS.map((c) => ({
      id: c.id,
      label: `${c.make} ${c.model} — ${c.powerOptions.join('/')} kW, ${c.connection}${c.ozevApproved ? ', OZEV' : ''}`,
    })),
  };
}

export async function requestDesignProposal(description: string): Promise<DesignProposal> {
  const catalogues = await buildCatalogues();

  const invoke = supabase.functions.invoke('renewable-design-intake', {
    body: { description, ...catalogues },
  });
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(
      () => reject(new Error('Taking too long — try again in a moment.')),
      INTAKE_TIMEOUT_MS
    )
  );
  const { data, error } = await Promise.race([invoke, timeout]);

  if (error) {
    // Non-2xx responses arrive as FunctionsHttpError with the real message in
    // the response body, not on error.message.
    if (error instanceof FunctionsHttpError) {
      const body = await error.context.json().catch(() => null);
      throw new Error(body?.error || 'Design intake failed');
    }
    throw new Error(error.message || 'Design intake failed');
  }
  if (data?.error) throw new Error(data.error);

  const proposal = data?.proposal as DesignProposal | undefined;
  if (!proposal || !TECHNOLOGIES.includes(proposal.technology)) {
    throw new Error('Could not work out the technology — try describing the job differently.');
  }
  if (!Array.isArray(proposal.notes)) proposal.notes = [];
  return proposal;
}

export const designerPathFor = (t: DesignTechnology) => `/electrician/renewables/design/${t}`;
