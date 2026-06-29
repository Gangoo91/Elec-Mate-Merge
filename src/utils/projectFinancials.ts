/**
 * Project financials — the single source of truth for a project's economics.
 *
 * Every surface (detail hero, completed-projects archive, pipeline cards,
 * "needs attention" nudges) computes its numbers from this one pure function,
 * so revenue / cost / profit / effective hourly are defined identically
 * everywhere. Inputs are primitives the caller already has from
 * useProjectEntities (quote/invoice totals), useExpensesStorage (spend) and
 * the project's time sessions.
 */

export type RevenueSource = 'invoiced' | 'quoted' | 'estimated' | 'none';

export interface ProjectFinancials {
  /** Best available headline value for the job. */
  revenue: number;
  revenueSource: RevenueSource;
  /** Direct cash costs logged against the job (expenses). */
  materials: number;
  /** Hours logged on the job. */
  hours: number;
  /** revenue − materials (a sole trader's own labour isn't a cash cost). */
  grossProfit: number;
  /** grossProfit / revenue, as a %. null when there's no revenue yet. */
  marginPct: number | null;
  /** What the job actually earned per hour worked. The killer sole-trader metric. */
  effectiveHourly: number | null;
}

export interface ProjectFinancialsInput {
  invoiceTotal: number;
  quoteTotal: number;
  estimatedValue?: number | null;
  /** Total expenses (materials etc.) logged against the project. */
  expenses: number;
  /** Total time logged on the project, in seconds. */
  totalSeconds: number;
}

export function computeProjectFinancials(input: ProjectFinancialsInput): ProjectFinancials {
  const { invoiceTotal, quoteTotal, estimatedValue, expenses, totalSeconds } = input;

  let revenue = 0;
  let revenueSource: RevenueSource = 'none';
  if (invoiceTotal > 0) {
    revenue = invoiceTotal;
    revenueSource = 'invoiced';
  } else if (quoteTotal > 0) {
    revenue = quoteTotal;
    revenueSource = 'quoted';
  } else if (estimatedValue && estimatedValue > 0) {
    revenue = estimatedValue;
    revenueSource = 'estimated';
  }

  const materials = Math.max(0, expenses || 0);
  const hours = Math.max(0, (totalSeconds || 0) / 3600);
  const grossProfit = revenue - materials;
  const marginPct = revenue > 0 ? (grossProfit / revenue) * 100 : null;
  const effectiveHourly = hours > 0 ? grossProfit / hours : null;

  return { revenue, revenueSource, materials, hours, grossProfit, marginPct, effectiveHourly };
}

const REVENUE_SOURCE_LABEL: Record<RevenueSource, string> = {
  invoiced: 'Invoiced',
  quoted: 'Quoted',
  estimated: 'Estimated',
  none: 'No value yet',
};

export const revenueSourceLabel = (s: RevenueSource): string => REVENUE_SOURCE_LABEL[s];
