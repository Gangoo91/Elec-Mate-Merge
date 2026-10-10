/**
 * IET On-Site Guide, Appendix A, Table A2 — Allowances for diversity.
 * GENERATED from src/utils/diversity-table-a2.ts (transcribed from the printed
 * OSG pages 151–152, ELE-1423) — edit there, not here. Used by Mate
 * (tasks-ai-assistant): Table A2's rows are not in the facets RAG, and Mate
 * was answering "10 A + 40% of the remainder" for socket circuits (10 Oct 2026).
 */

type PremisesType = 'household' | 'shops' | 'hotels';

export type A2Row =
  | 'lighting'
  | 'heatingAndPower'
  | 'cooking'
  | 'motors'
  | 'waterHeatersInstantaneous'
  | 'waterHeatersThermostatic'
  | 'floorWarming'
  | 'thermalStorage'
  | 'standardCircuits'
  | 'socketsAndStationary';

export const A2_ROW_LABELS: Record<A2Row, string> = {
  lighting: '1 · Lighting',
  heatingAndPower: '2 · Heating and power (final circuits not listed below)',
  cooking: '3 · Cooking appliances',
  motors: '4 · Motors (other than lift motors)',
  waterHeatersInstantaneous: '5 · Water heaters (instantaneous type)',
  waterHeatersThermostatic: '6 · Water heaters (thermostatically controlled)',
  floorWarming: '7 · Floor warming installations',
  thermalStorage: '8 · Thermal storage space heating installations',
  standardCircuits: '9 · Standard final circuits (Appendix H)',
  socketsAndStationary: '10 · Socket-outlets and stationary equipment',
};

export const A2_TEXT: Record<A2Row, Record<PremisesType, string>> = {
  lighting: {
    household: '66% of total current demand',
    shops: '90% of total current demand',
    hotels: '75% of total current demand',
  },
  heatingAndPower: {
    household:
      '100% of total current demand up to 10 A + 50% of any current demand in excess of 10 A',
    shops: '100% f.l. of largest appliance + 75% f.l. of remaining appliances',
    hotels:
      '100% f.l. of largest appliance + 80% f.l. of second largest appliance + 60% f.l. of remaining appliances',
  },
  cooking: {
    household:
      '10 A + 30% f.l. of connected cooking appliances in excess of 10 A + 5 A if a socket-outlet is incorporated in the control unit',
    shops:
      '100% f.l. of largest appliance + 80% f.l. of second largest appliance + 60% f.l. of remaining appliances',
    hotels:
      '100% f.l. of largest appliance + 80% f.l. of second largest appliance + 60% f.l. of remaining appliances',
  },
  motors: {
    household: 'Not applicable',
    shops:
      '100% f.l. of largest motor + 80% f.l. of second largest motor + 60% f.l. of remaining motors',
    hotels: '100% f.l. of largest motor + 50% f.l. of remaining motors',
  },
  waterHeatersInstantaneous: {
    household:
      '100% f.l. of largest appliance + 100% f.l. of second largest appliance + 25% f.l. of remaining appliances',
    shops:
      '100% f.l. of largest appliance + 100% f.l. of second largest appliance + 25% f.l. of remaining appliances',
    hotels:
      '100% f.l. of largest appliance + 100% f.l. of second largest appliance + 25% f.l. of remaining appliances',
  },
  waterHeatersThermostatic: {
    household: 'No diversity allowable',
    shops: 'No diversity allowable',
    hotels: 'No diversity allowable',
  },
  floorWarming: {
    household: 'No diversity allowable',
    shops: 'No diversity allowable',
    hotels: 'No diversity allowable',
  },
  thermalStorage: {
    household: 'No diversity allowable',
    shops: 'No diversity allowable',
    hotels: 'No diversity allowable',
  },
  standardCircuits: {
    household:
      '100% of current demand of largest circuit + 40% of current demand of every other circuit',
    shops:
      '100% of current demand of largest circuit + 50% of current demand of every other circuit',
    hotels:
      '100% of current demand of largest circuit + 50% of current demand of every other circuit',
  },
  socketsAndStationary: {
    household:
      '100% of current demand of largest point of utilization + 40% of current demand of every other point of utilization',
    shops:
      '100% of current demand of largest point of utilization + 70% of current demand of every other point of utilization',
    hotels:
      '100% of current demand of largest point of utilization + 75% of current demand of every other point in main rooms (dining rooms etc.) + 40% of current demand of every other point of utilization',
  },
};

/** Table A2 as plain lines for a prompt, with the OSG's own caution. */
export function tableA2ForPrompt(): string {
  const rows = (Object.keys(A2_ROW_LABELS) as A2Row[]).map(
    (r) =>
      `${A2_ROW_LABELS[r]}: household — ${A2_TEXT[r].household}; small shops/stores/offices — ${A2_TEXT[r].shops}; small hotels/guest houses — ${A2_TEXT[r].hotels}`
  );
  return [
    'OSG Appendix A, Table A2 — Allowances for diversity (verified transcription; cite as "OSG Table A2"):',
    ...rows,
    'Applied to the total current demand of the equipment the installation supplies. The OSG notes Table A2 has not been updated for some time and the values may be increased or decreased by the designer.',
  ].join('\n');
}
