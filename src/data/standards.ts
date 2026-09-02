export interface Standard {
  code: string;
  title: string;
  description: string;
  scope: string;
  useCases: string[];
  keyPoints: string[];
  sections: string[];
  notes?: string;
}

export const ukElectricalStandards: Standard[] = [
  {
    code: 'BS 7671:2018+A4:2026',
    title: 'Requirements for Electrical Installations',
    description: 'IET Wiring Regulations - 18th Edition (Amendment 4)',
    scope:
      'Covers design, installation, inspection and testing of electrical installations in buildings up to 1000V AC',
    useCases: [
      'Cable sizing calculations',
      'Earthing and bonding requirements',
      'Circuit protection design',
      'Installation methods and clearances',
    ],
    keyPoints: [
      'Fundamental principles for safety',
      'Design requirements and calculations',
      'Installation methods and practices',
      'Inspection and testing procedures',
    ],
    sections: [
      'Part 4 - Protection for Safety',
      'Chapter 52 - Selection and erection of wiring systems',
      'Appendix 4 - Current-carrying capacity and voltage drop',
      'Chapter 41 - Protection against electric shock',
    ],
    notes: 'Primary standard for electrical installations in the UK',
  },
  {
    code: 'BS EN 60898-1:2019',
    title: 'Circuit-breakers for overcurrent protection',
    description: 'MCB standards, ratings and characteristics',
    scope: 'Specifies requirements for AC circuit-breakers for household and similar installations',
    useCases: [
      'MCB selection and sizing',
      'Breaking capacity calculations',
      'Trip curve characteristics',
      'Installation and coordination',
    ],
    keyPoints: [
      'Breaking capacity requirements (6kA, 10kA)',
      'Trip characteristics (B, C, D curves)',
      'Rated currents and voltages',
      'Testing and performance standards',
    ],
    sections: [
      'Breaking capacity requirements',
      'Trip characteristics (B, C, D curves)',
      'Installation and testing requirements',
      'Coordination with other devices',
    ],
    notes: 'Essential for protective device selection',
  },
  {
    code: 'BS EN 61008-1:2012',
    title: 'Residual current operated circuit-breakers',
    description: 'RCD standards and requirements',
    scope: 'Covers RCDs without integral overcurrent protection for AC applications',
    useCases: [
      'RCD selection and sizing',
      'Earth fault protection',
      'Additional protection requirements',
      'Testing procedures',
    ],
    keyPoints: [
      'Trip current ratings (30mA, 100mA, 300mA)',
      'Trip time requirements (instantaneous, time-delayed)',
      'Breaking capacity specifications',
      'Testing and maintenance procedures',
    ],
    sections: [
      'Trip current ratings (30mA, 100mA, 300mA)',
      'Trip time requirements',
      'Testing procedures',
      'Installation requirements',
    ],
    notes: 'Critical for earth fault protection and safety',
  },
  {
    code: 'BS EN 61439-3:2012',
    title: 'Low-voltage switchgear and controlgear assemblies',
    description: 'Distribution boards and consumer units',
    scope:
      'Requirements for low-voltage switchgear assemblies intended for use by ordinary persons',
    useCases: [
      'Consumer unit design',
      'Distribution board layout',
      'Enclosure requirements',
      'Safety and accessibility',
    ],
    keyPoints: [
      'Enclosure and construction requirements',
      'Safety and accessibility standards',
      'Temperature rise limits',
      'Short-circuit and earth fault protection',
    ],
    sections: [
      'General requirements',
      'Design verification',
      'Routine tests',
      'Safety requirements',
    ],
    notes: 'Applies to domestic and commercial distribution equipment',
  },
];

export const voltageDropLimits = [
  {
    circuit: 'Lighting circuits',
    limit: '3%',
    reference: 'BS 7671 - 525.202 / Appendix 4 Table 4Ab',
    application: 'All lighting installations',
    calculation: 'At design current under normal conditions',
  },
  {
    circuit: 'Power circuits',
    limit: '5%',
    reference: 'BS 7671 - 525.202 / Appendix 4 Table 4Ab',
    application: 'Socket outlets and fixed equipment',
    calculation: 'At design current under normal conditions',
  },
  {
    circuit: 'Fixed heating',
    limit: '5%',
    reference: 'BS 7671 - 525.202 / Appendix 4 Table 4Ab',
    application: 'Electric heating installations',
    calculation: 'At design current including diversity',
  },
];

// ELE-1390 — single source of truth for the standard string printed on
// certificates. Lived only in eicJsonFormatter, so the EICR formatter emitted
// the raw stored code ('BS7671') instead of a readable standard. Both now
// import this so they cannot drift apart again.
//
// New certs default to the current amendment (A4:2026). The legacy 'BS7671'
// code maps to A3:2024 deliberately: a cert designed and certified under
// Amendment 3 must keep stating A3 and must not be retrospectively relabelled.
export function formatDesignStandard(value: unknown): string {
  const v = String(value || '').trim();
  switch (v) {
    case '':
    case 'BS7671-A4':
      return 'BS 7671:2018+A4:2026';
    case 'BS7671':
      return 'BS 7671:2018+A3:2024';
    case 'other':
      return 'Other';
    default:
      return v;
  }
}

// ELE-1390 — the EICR form stores the amendment as a code ('amd4-2026') and the
// live PDF template renders it directly, so certificates were printing the raw
// code. Map it to the published amendment designation. Empty is returned as ''
// so the template's own `| default: "A4:2026"` still applies.
export function formatBsAmendment(value: unknown): string {
  const v = String(value || '').trim();
  if (!v) return '';
  const codes: Record<string, string> = {
    'amd1-2020': 'A1:2020',
    'amd2-2022': 'A2:2022',
    'amd3-2024': 'A3:2024',
    'amd4-2026': 'A4:2026',
  };
  // Values already stored in a readable form (e.g. 'BS 7671:2018+A2:2022') pass through.
  return codes[v] ?? v;
}
