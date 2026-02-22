import type { PropertyType, SiteVisit } from '@/types/siteVisit';

const COMMON = [
  'Price excludes making good / decoration',
  'Existing cabling assumed in good condition unless noted',
  'Access available during normal working hours',
  'Any additional work discovered will be quoted separately',
  'Waste removal included',
  'Works to comply with BS 7671:2018+A3:2024 (18th Edition)',
];

const RESIDENTIAL = [
  'Building control notification included where required',
  'Price based on single visit unless stated otherwise',
  'Customer to ensure clear access to all work areas',
];

const COMMERCIAL = [
  'Asbestos survey to be provided by client prior to works',
  'Fire alarm / emergency lighting isolation coordinated with building management',
  'Out-of-hours working charged at premium rate if required',
  'Client to provide access passes / security clearance',
];

const INDUSTRIAL = [
  'Permit to work system to be followed on site',
  'Hazardous area certification by client where applicable',
  'Isolation procedures agreed with site management prior to works',
  'PPE provided by contractor',
  'Client to confirm safe working clearances',
];

/**
 * Generate default assumptions, optionally enriched by captured site visit data.
 */
export function getDefaultAssumptions(propertyType?: PropertyType, visit?: SiteVisit): string {
  const lines = [...COMMON];

  switch (propertyType) {
    case 'commercial':
      lines.push(...COMMERCIAL);
      break;
    case 'industrial':
      lines.push(...INDUSTRIAL);
      break;
    case 'residential':
    default:
      lines.push(...RESIDENTIAL);
      break;
  }

  // Context-aware assumptions based on captured data
  if (visit) {
    const promptAnswer = (key: string) => visit.prompts.find((p) => p.promptKey === key)?.response;
    const roomTypes = visit.rooms.map((r) => r.roomType);
    const allItems = visit.rooms.flatMap((r) => r.items);

    // Shower circuit assumption
    const showerKw = promptAnswer('shower_kw');
    if (showerKw && showerKw !== 'No electric shower') {
      lines.push(`Dedicated shower circuit rated for ${showerKw} electric shower`);
    }

    // EV / DNO assumptions
    const evCapacity = promptAnswer('ev_capacity');
    const hasEvItem = allItems.some((i) => i.itemType === 'ev_charger');
    if (evCapacity === 'Yes' || hasEvItem) {
      lines.push('DNO notification required for EV charger installation (>3.68 kW)');
      lines.push('EV charger location subject to site survey confirmation');
    }

    // Loft access assumption
    if (roomTypes.includes('loft')) {
      lines.push('Adequate loft access required — client to confirm ladder/hatch availability');
    }

    // External route assumption
    if (roomTypes.includes('garden_external') || roomTypes.includes('garage')) {
      lines.push('External cable route subject to survey — SWA or suitable containment');
    }

    // Three phase balanced loading
    const supplyType = promptAnswer('supply_type');
    if (supplyType === 'Three phase') {
      lines.push('Load balancing across all three phases assumed in design');
    }
  }

  return lines.map((l) => `- ${l}`).join('\n');
}
