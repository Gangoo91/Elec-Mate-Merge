/**
 * ELE-1943: a circuit design's materials as quote lines, so the office never
 * re-keys cable sizes and devices from a PDF into a quote.
 *
 * Quantities come from the design itself (each circuit's cable run and
 * protective device). Prices are the designer's own indicative figures
 * (cost-calculator, standard tier), the same numbers the results screen shows,
 * and every line says to check them with the supplier.
 */
import { computeCircuitCost } from '@/components/electrician-tools/circuit-designer/cost-calculator';

export interface DesignQuoteLine {
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  note?: string;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

interface CircuitLike {
  cableType?: string;
  cableSize?: number | string;
  cpcSize?: number | string;
  cableLength?: number | string;
  protectionDevice?: { type?: string; curve?: string; rating?: number | string; kaRating?: number };
  rcdProtected?: boolean;
}

function deviceLabel(c: CircuitLike): string | null {
  const d = c.protectionDevice;
  const rating = Number(d?.rating ?? 0);
  if (!rating) return null;
  const type = String(d?.type ?? 'MCB').toUpperCase();
  const curve = d?.curve ? ` Type ${String(d.curve).toUpperCase()}` : '';
  const ka = d?.kaRating ? ` (${d.kaRating}kA)` : '';
  return `${rating}A${curve} ${type}${ka}`;
}

function cableLabel(c: CircuitLike): string | null {
  const type = String(c.cableType ?? '').trim();
  if (type) return type;
  const size = Number(c.cableSize ?? 0);
  return size ? `${size}mm² cable` : null;
}

export function designQuoteLines(
  design: { circuits?: unknown } | null | undefined
): DesignQuoteLine[] {
  const circuits = (Array.isArray(design?.circuits) ? design!.circuits : []) as CircuitLike[];
  if (!circuits.length) return [];

  const cables = new Map<string, { metres: number; cost: number }>();
  const devices = new Map<string, { count: number; cost: number }>();

  for (const c of circuits) {
    const cost = computeCircuitCost(c, 'standard');
    const cable = cableLabel(c);
    const metres = Number(c.cableLength ?? 0);
    if (cable && metres > 0) {
      const prev = cables.get(cable) ?? { metres: 0, cost: 0 };
      cables.set(cable, { metres: prev.metres + metres, cost: prev.cost + cost.cable });
    }
    const device = deviceLabel(c);
    if (device) {
      const prev = devices.get(device) ?? { count: 0, cost: 0 };
      devices.set(device, { count: prev.count + 1, cost: prev.cost + cost.protection });
    }
  }

  const note = 'From the design. Indicative price: check with your supplier.';
  const lines: DesignQuoteLine[] = [];
  for (const [label, v] of cables) {
    lines.push({
      description: label,
      quantity: Math.ceil(v.metres),
      unit: 'm',
      unitPrice: v.metres ? round2(v.cost / v.metres) : 0,
      note,
    });
  }
  for (const [label, v] of devices) {
    lines.push({
      description: label,
      quantity: v.count,
      unit: 'each',
      unitPrice: v.count ? round2(v.cost / v.count) : 0,
      note,
    });
  }
  lines.push({
    description: 'Glands, connectors and fixings',
    quantity: circuits.length,
    unit: 'circuit',
    unitPrice: round2(computeCircuitCost({}, 'standard').fixed),
    note,
  });
  return lines;
}
