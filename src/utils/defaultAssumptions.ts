import type { PropertyType } from '@/types/siteVisit';

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

export function getDefaultAssumptions(propertyType?: PropertyType): string {
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

  return lines.map((l) => `- ${l}`).join('\n');
}
