/**
 * Headline figures for the Professional Tool Guide, DERIVED from the data.
 *
 * 🔴 These were hardcoded in the page as "131 tools across 6 categories". The
 * real figure is 77 — the copy had drifted from the data and nobody could tell,
 * because the number was a string in the JSX rather than a count of anything.
 * A guide that overstates its own contents by 70% on the first line is the one
 * claim on the page a reader can check instantly.
 *
 * Derive, never retype. If someone adds a tool the figures follow.
 */
import { handToolSections } from './handToolsData';
import { powerToolSections } from './powerToolsData';
import { testInstruments } from './testEquipmentData';
import { ppeItems } from './ppeData';
import { suppliers } from './suppliersData';
import type { Tool } from './types';

const sectionTools = (sections: { tools: Tool[] }[]): Tool[] => sections.flatMap((s) => s.tools);

export const HAND_TOOLS = sectionTools(handToolSections);
export const POWER_TOOLS = sectionTools(powerToolSections);

/** Every item a reader would call "a tool": bench, cordless, test and PPE. */
export const TOOL_COUNT =
  HAND_TOOLS.length + POWER_TOOLS.length + testInstruments.length + ppeItems.length;

/** Of those, the ones tagged `essential` — the "what do I buy first" answer. */
export const ESSENTIAL_COUNT =
  HAND_TOOLS.filter((t) => t.priority === 'essential').length +
  POWER_TOOLS.filter((t) => t.priority === 'essential').length;

export const SUPPLIER_COUNT = suppliers.length;
export const CATEGORY_COUNT = 6;
