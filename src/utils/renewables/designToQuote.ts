/**
 * Design → Quote handoff.
 *
 * Turns a finished design into a quote draft (the quote builder's existing
 * draft-recovery flow picks it up — same pattern as the certificate handoff).
 * Kit lines carry real quantities and descriptions from the design; prices
 * are deliberately left at 0 for the electrician to fill from the material
 * search — the designer knows the kit, not the merchant's price today.
 */

import { draftStorage } from '@/utils/draftStorage';
import type { QuoteItem } from '@/types/quote';
import type {
  SolarDesignState,
  SolarDesignOutput,
  BatteryDesignState,
  EVDesignState,
  HeatPumpDesignState,
  HeatPumpDesignOutput,
} from './designEngine';

const line = (
  description: string,
  quantity: number,
  unit: string,
  category: QuoteItem['category']
): QuoteItem => ({
  id: crypto.randomUUID(),
  description,
  quantity,
  unit,
  unitPrice: 0,
  totalPrice: 0,
  category,
});

const labourLine = (description: string) => line(description, 1, 'job', 'labour');

function stageQuoteDraft(title: string, description: string, items: QuoteItem[]): boolean {
  return draftStorage.saveDraft('quote', null, {
    jobDetails: { title, description },
    items,
  });
}

export const QUOTE_BUILDER_PATH = '/electrician/quote-builder/create';

export function solarDesignToQuote(s: SolarDesignState, out: SolarDesignOutput): boolean {
  if (!s.panel || !s.inverter || !out.plan) return false;
  const plan = out.plan;
  const items: QuoteItem[] = [
    line(
      `${s.panel.make} ${s.panel.model} solar panel (${s.panel.wattage} Wp)`,
      plan.panelCount,
      'each',
      'materials'
    ),
    line(
      `${s.inverter.make} ${s.inverter.model} inverter (${s.inverter.ratedPowerAc} kW)`,
      1,
      'each',
      'materials'
    ),
    line('PV mounting kit, DC cabling, isolators & consumables', 1, 'set', 'materials'),
    labourLine(
      `Solar PV installation & commissioning — ${plan.kwp} kWp, ${plan.strings} string${plan.strings > 1 ? 's' : ''}`
    ),
  ];
  if (s.batteryKw > 0) {
    items.splice(
      2,
      0,
      line(`Battery storage system (${s.batteryKw} kW inverter)`, 1, 'each', 'materials')
    );
  }
  return stageQuoteDraft(
    `${plan.kwp} kWp solar PV installation`,
    `${plan.panelCount} × ${s.panel.make} ${s.panel.model} across ${plan.strings} string${plan.strings > 1 ? 's' : ''}, ${s.inverter.make} ${s.inverter.model} inverter.`,
    items
  );
}

export function batteryDesignToQuote(s: BatteryDesignState): boolean {
  const name =
    [s.batteryMake, s.batteryModel].filter(Boolean).join(' ') || 'Battery storage system';
  return stageQuoteDraft(
    `${s.usableKwh} kWh battery storage installation`,
    `${name}, ${s.usableKwh} kWh usable, ${s.coupling === 'ac' ? 'AC-coupled' : 'DC-coupled hybrid'}.`,
    [
      line(`${name} (${s.usableKwh} kWh usable)`, 1, 'each', 'materials'),
      line('Isolation, protective devices, cabling & consumables', 1, 'set', 'materials'),
      labourLine('Battery storage installation & commissioning'),
    ]
  );
}

export function evDesignToQuote(s: EVDesignState): boolean {
  const name = s.charger ? `${s.charger.make} ${s.charger.model}` : 'EV charge point';
  return stageQuoteDraft(
    `EV charge point installation${s.numChargers > 1 ? ` × ${s.numChargers}` : ''}`,
    `${s.numChargers} × ${name} @ ${s.chargerKw} kW.`,
    [
      line(`${name} (${s.chargerKw} kW)`, s.numChargers, 'each', 'materials'),
      line('Supply cable, protective devices & consumables', 1, 'set', 'materials'),
      ...(s.earthing === 'tt'
        ? [line('TT earth electrode & enclosure', 1, 'set', 'materials')]
        : []),
      labourLine(
        `EV charge point installation & commissioning${s.numChargers > 1 ? ` — ${s.numChargers} points` : ''}`
      ),
    ]
  );
}

export function heatPumpDesignToQuote(s: HeatPumpDesignState, out: HeatPumpDesignOutput): boolean {
  return stageQuoteDraft(
    'Heat pump electrical supply installation',
    `Dedicated supply for a ~${out.thermalKw} kWth heat pump (≈${out.electricalKw} kW electrical demand).`,
    [
      line('Dedicated supply cable, protective device & isolation', 1, 'set', 'materials'),
      labourLine('Heat pump electrical supply installation & testing'),
    ]
  );
}
