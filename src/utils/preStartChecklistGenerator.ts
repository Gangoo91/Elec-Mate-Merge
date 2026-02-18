import type { SiteVisit } from '@/types/siteVisit';
import type { PreStartChecklistItem } from '@/types/siteVisit';

/**
 * Generates a pre-start checklist from site visit data.
 * Standard items always present + conditional items from prompts and room types.
 */
export function generatePreStartChecklist(visit: SiteVisit): PreStartChecklistItem[] {
  const items: PreStartChecklistItem[] = [];
  let order = 0;

  const add = (
    category: string,
    description: string,
    required: boolean,
    source: PreStartChecklistItem['source']
  ) => {
    items.push({
      id: crypto.randomUUID(),
      category,
      description,
      checked: false,
      required,
      source,
    });
    order++;
  };

  // ── Standard items (always present) ──
  add('Safety', 'Confirm safe isolation procedure', true, 'standard');
  add('Safety', 'PPE available and in good condition', true, 'standard');
  add('Safety', 'First aid kit on site', true, 'standard');
  add('Site Setup', 'Dust sheets and protection in place', true, 'standard');
  add('Site Setup', 'Client informed of work schedule', true, 'standard');
  add('Site Setup', 'Access confirmed and keys/codes obtained', true, 'standard');
  add('Tools', 'Voltage tester proven (GS38 compliant)', true, 'standard');
  add('Tools', 'Required tools and test equipment on site', true, 'standard');
  add('Documentation', 'Job scope and drawings reviewed', false, 'standard');
  add('Documentation', 'Permit to work (if required)', false, 'standard');

  // ── Conditional items from prompt responses ──
  const getResponse = (key: string): string | undefined =>
    visit.prompts.find((p) => p.promptKey === key)?.response;

  // Asbestos
  const asbestos = getResponse('asbestos_risk');
  if (asbestos && asbestos !== 'No — confirmed') {
    add('Safety', 'Asbestos survey completed / reviewed', true, 'prompt');
    if (asbestos === 'Yes — survey required') {
      add('Safety', 'Do NOT proceed until asbestos survey is complete', true, 'prompt');
    }
  }

  // Bathroom bonding
  const hasBathroom = visit.rooms.some((r) => ['bathroom', 'en_suite'].includes(r.roomType));
  if (hasBathroom) {
    add('Compliance', 'Check supplementary bonding (Reg 701.415.2)', true, 'prompt');
    add('Compliance', 'Confirm bathroom zone classifications', false, 'prompt');
  }

  // Loft
  const hasLoft = visit.rooms.some((r) => r.roomType === 'loft');
  if (hasLoft) {
    add('Access', 'Loft ladder / access equipment available', true, 'room');
    add('Safety', 'Loft lighting adequate for working', false, 'room');

    const insulation = getResponse('loft_insulation');
    if (insulation?.includes('Spray foam')) {
      add('Safety', 'Spray foam present — check cable routing constraints', true, 'prompt');
    }
  }

  // EV charger
  const evCapacity = getResponse('ev_capacity');
  if (evCapacity === 'Yes') {
    add('Compliance', 'DNO notification submitted for EV installation', true, 'prompt');
    add('Compliance', 'Confirm adequate supply capacity for EV charger', true, 'prompt');
  }

  // Outdoor / garden
  const hasOutdoor = visit.rooms.some((r) => ['garage', 'garden_external'].includes(r.roomType));
  if (hasOutdoor) {
    add('Site Conditions', 'Check weather conditions for external works', false, 'room');
    add('Safety', 'RCD protection for outdoor circuits confirmed', true, 'room');
  }

  // Consumer unit
  const cuType = getResponse('cu_type');
  if (cuType?.includes('Plastic') && cuType.includes('replaced')) {
    add(
      'Materials',
      'Replacement consumer unit on site (metal clad, BS EN 61439-3)',
      true,
      'prompt'
    );
  }

  // Earthing
  const earthing = getResponse('earthing_arrangement');
  if (earthing === 'TT') {
    add('Compliance', 'TT earthing — confirm electrode resistance acceptable', true, 'prompt');
  }
  if (earthing === 'Unknown') {
    add('Testing', 'Identify earthing arrangement before starting', true, 'prompt');
  }

  return items;
}
