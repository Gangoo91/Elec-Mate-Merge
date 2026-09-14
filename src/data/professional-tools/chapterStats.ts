/**
 * The stat row at the top of each chapter page — derived, never typed.
 *
 * Same rule as `counts.ts`: the hub used to claim "131 tools" against 77 in the
 * data because the figure was a string in the JSX. Every number here is counted
 * from the arrays the page goes on to render, so a chapter cannot advertise a
 * total it does not show.
 */
import { handToolSections } from './handToolsData';
import { powerToolSections } from './powerToolsData';
import { testInstruments, mftFunctions } from './testEquipmentData';
import { ppeItems } from './ppeData';
import { suppliers, buyingGuides } from './suppliersData';
import {
  rawlPlugs,
  boltNutSizes,
  cableGlands,
  conduitSizes,
  trunkingSizes,
  screwHeadTypes,
  vanStockEssentials,
} from './fixingsData';
import type { Tool } from './types';

export interface ChapterStat {
  label: string;
  value: string;
  /** Highlight the figure that answers "what do I buy first". */
  accent?: boolean;
}

const flat = (sections: { tools: Tool[] }[]) => sections.flatMap((s) => s.tools);
const essentials = (tools: Tool[]) => tools.filter((t) => t.priority === 'essential').length;

const hand = flat(handToolSections);
const power = flat(powerToolSections);

export const CHAPTER_STATS: Record<string, ChapterStat[]> = {
  fixings: [
    {
      label: 'Reference rows',
      value: String(
        rawlPlugs.length +
          boltNutSizes.length +
          cableGlands.length +
          conduitSizes.length +
          trunkingSizes.length +
          screwHeadTypes.length
      ),
      accent: true,
    },
    { label: 'Tables', value: '10' },
    { label: 'Van stock', value: String(vanStockEssentials.length) },
  ],
  'hand-tools': [
    { label: 'Tools', value: String(hand.length), accent: true },
    { label: 'Essential', value: String(essentials(hand)) },
    { label: 'Groups', value: String(handToolSections.length) },
  ],
  'power-tools': [
    { label: 'Tools', value: String(power.length), accent: true },
    { label: 'Essential', value: String(essentials(power)) },
    { label: 'Groups', value: String(powerToolSections.length) },
  ],
  'test-equipment': [
    { label: 'Instruments', value: String(testInstruments.length), accent: true },
    {
      label: 'Entry level',
      value: String(testInstruments.filter((t) => t.tier === 'basic').length),
    },
    { label: 'MFT tests', value: String(mftFunctions.length) },
  ],
  ppe: [
    { label: 'Items', value: String(ppeItems.length), accent: true },
    { label: 'Every day', value: String(ppeItems.filter((i) => i.group === 'daily').length) },
    {
      label: 'Task-specific',
      value: String(ppeItems.filter((i) => i.group === 'task-specific').length),
    },
  ],
  suppliers: [
    { label: 'Suppliers', value: String(suppliers.length), accent: true },
    { label: 'Trade accounts', value: String(suppliers.filter((s) => s.tradeAccount).length) },
    { label: 'Buying guides', value: String(buyingGuides.length) },
  ],
};
